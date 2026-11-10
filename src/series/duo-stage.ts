import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { looks, type CharacterId } from './characters';

/**
 * 首页的小星球：小念和爸爸站在上面待机、眨眼、看向手指，点一下就跳一跳。
 * 与 bodyverse 的 RunLab3D 同一套模型、卡通着色、描边、镜头和星球；每个领域用 `decorate` 摆自己的道具。
 */

export const PLANET_RADIUS = 5;
const up = new THREE.Vector3(0, 1, 0);
const runFacing = 0.9;
const runDirection = new THREE.Vector3(Math.sin(runFacing), 0, Math.cos(runFacing));
const spinAxis = new THREE.Vector3().crossVectors(up, runDirection).normalize();
const damp = (from: number, to: number, rate: number, dt: number): number => to + (from - to) * Math.exp(-rate * dt);

let gradient: THREE.DataTexture | undefined;
function toonGradient(): THREE.DataTexture {
  if (gradient) return gradient;
  const tones = new Uint8Array([90, 90, 90, 255, 170, 170, 170, 255, 255, 255, 255, 255]);
  gradient = new THREE.DataTexture(tones, 3, 1, THREE.RGBAFormat);
  gradient.minFilter = THREE.NearestFilter;
  gradient.magFilter = THREE.NearestFilter;
  gradient.needsUpdate = true;
  return gradient;
}

export const toon = (color: string): THREE.MeshToonMaterial => new THREE.MeshToonMaterial({ color, gradientMap: toonGradient() });

/** 屏幕空间的反向外壳：宽度恒定、跟着蒙皮动的卡通描边 */
function outlineMaterial(): THREE.MeshBasicMaterial {
  const material = new THREE.MeshBasicMaterial({ color: '#3b2618', side: THREE.BackSide });
  material.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <project_vertex>', `#include <project_vertex>
      vec2 outlineDir = normalize((projectionMatrix * vec4(transformedNormal, 0.0)).xy + 1e-5);
      gl_Position.xy += outlineDir * 0.007 * gl_Position.w;`);
  };
  return material;
}

interface Rig {
  root: THREE.Group;
  meshes: THREE.Object3D[];
  mixer: THREE.AnimationMixer;
  actions: Record<string, THREE.AnimationAction>;
  oneShot: THREE.AnimationAction | null;
  head: THREE.Bone;
  neck: THREE.Bone;
  torso: THREE.Bone;
  skin: THREE.MeshToonMaterial | null;
  face: THREE.MeshToonMaterial | null;
  faceBase: THREE.Color;
  nextBlink: number;
  gaze: THREE.Vector2;
  /** 上一帧动画里的头和脖子姿态：mixer 不会重写没变化的骨骼，转头的偏移要手动撤回 */
  headPose: THREE.Quaternion;
  neckPose: THREE.Quaternion;
  headScale: number;
  facing: number;
  breath: number;
}

function addGlasses(head: THREE.Bone, face: THREE.Box3): void {
  const width = face.max.x - face.min.x;
  const ring = width * 0.18;
  const y = face.min.y + (face.max.y - face.min.y) * 0.35;
  const z = face.max.z + ring * 0.2;
  const frame = toon('#24242c');
  const glasses = new THREE.Group();
  for (const side of [1, -1]) {
    const lens = new THREE.Mesh(new THREE.TorusGeometry(ring, ring * 0.16, 8, 28), frame);
    lens.position.set(side * width * 0.3, y, z);
    glasses.add(lens);
  }
  const bridge = new THREE.Mesh(new THREE.CylinderGeometry(ring * 0.12, ring * 0.12, width * 0.6 - ring * 2, 6), frame);
  bridge.rotation.z = Math.PI / 2;
  bridge.position.set(0, y + ring * 0.2, z);
  glasses.add(bridge);
  head.attach(glasses);
}

function buildRig(gltf: GLTF, who: CharacterId, x: number, facing: number): Rig {
  const model = cloneSkinned(gltf.scene);
  const root = new THREE.Group();
  root.add(model);
  const look = looks[who];
  const palette: Record<string, string> = look.palette;
  const meshes: THREE.SkinnedMesh[] = [];
  model.traverse(object => {
    if ((object as THREE.SkinnedMesh).isSkinnedMesh) meshes.push(object as THREE.SkinnedMesh);
  });

  const outline = outlineMaterial();
  let skin: THREE.MeshToonMaterial | null = null;
  let face: THREE.MeshToonMaterial | null = null;
  let skinMesh: THREE.SkinnedMesh | null = null;
  let faceMesh: THREE.SkinnedMesh | null = null;
  for (const mesh of meshes) {
    const name = (mesh.material as THREE.Material).name;
    const material = toon(palette[name] ?? '#cccccc');
    mesh.material = material;
    mesh.frustumCulled = false;
    if (name === 'Skin') { skin = material; skinMesh = mesh; }
    if (name === 'Face') { face = material; faceMesh = mesh; }
    const hull = mesh.clone();
    hull.material = outline;
    mesh.parent?.add(hull);
  }

  const mixer = new THREE.AnimationMixer(model);
  const actions: Record<string, THREE.AnimationAction> = {};
  for (const clip of gltf.animations) actions[clip.name] = mixer.clipAction(clip);
  actions.Idle?.play();
  mixer.update(0);
  model.getObjectByName('Head')?.scale.setScalar(look.headScale);
  model.updateMatrixWorld(true);
  for (const mesh of meshes) mesh.skeleton.update();
  const rawBox = new THREE.Box3().setFromObject(model);
  const scale = look.height / (rawBox.max.y - rawBox.min.y);
  model.scale.setScalar(scale);
  model.position.y = -rawBox.min.y * scale;
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(model);

  const bone = (name: string): THREE.Bone => {
    const found = model.getObjectByName(name);
    if (!found) throw new Error(`角色骨骼缺失：${name}`);
    return found as THREE.Bone;
  };
  const head = bone('Head');
  const headPos = head.getWorldPosition(new THREE.Vector3());
  const headH = box.max.y - headPos.y;
  const headCenter = headPos.clone().addScaledVector(up, headH * 0.5);

  // 两颊的腮红，粘在头骨上
  const cheekMat = new THREE.MeshBasicMaterial({ color: '#ff6f86', transparent: true, opacity: 0.2, depthWrite: false });
  const ray = new THREE.Raycaster();
  const targets: THREE.Object3D[] = skinMesh ? [skinMesh] : meshes;
  for (const side of [1, -1]) {
    const y = headPos.y + headH * 0.3;
    const cx = side * headH * 0.3;
    ray.set(new THREE.Vector3(cx, y, box.max.z + 1), new THREE.Vector3(0, 0, -1));
    const point = ray.intersectObjects(targets, false)[0]?.point ?? new THREE.Vector3(cx, y, headCenter.z + headH * 0.45);
    const out = point.clone().sub(headCenter).normalize();
    const cheek = new THREE.Mesh(new THREE.CircleGeometry(headH * 0.085, 24), cheekMat);
    cheek.scale.set(1.25, 0.8, 1);
    cheek.position.copy(point).addScaledVector(out, headH * 0.012);
    cheek.lookAt(point.clone().addScaledVector(out, 1));
    cheek.renderOrder = 2;
    head.attach(cheek);
  }
  if (look.glasses && faceMesh) addGlasses(head, new THREE.Box3().setFromObject(faceMesh));

  root.position.set(x, 0.05, 0);
  root.rotation.y = facing;
  const neck = bone('Neck');
  return {
    root, meshes, mixer, actions, oneShot: null, head, neck, torso: bone('Torso'),
    skin, face, faceBase: (face as THREE.MeshToonMaterial | null)?.color.clone() ?? new THREE.Color(),
    nextBlink: 1 + Math.random() * 2, gaze: new THREE.Vector2(),
    headPose: head.quaternion.clone(), neckPose: neck.quaternion.clone(), headScale: look.headScale, facing,
    breath: Math.random() * Math.PI * 2,
  };
}

function playOnce(rig: Rig, clip: string): void {
  const action = rig.actions[clip];
  const idle = rig.actions.Idle;
  if (!action || !idle) return;
  rig.oneShot?.fadeOut(0.1);
  action.reset().setLoop(THREE.LoopOnce, 1).fadeIn(0.15).play();
  action.clampWhenFinished = true;
  idle.fadeOut(0.15);
  rig.oneShot = action;
}

function seeded(seed: number): () => number {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function onSurface(object: THREE.Object3D, angle: number, side: number, lift = 0): THREE.Object3D {
  const normal = up.clone().multiplyScalar(Math.cos(angle)).addScaledVector(runDirection, Math.sin(angle)).addScaledVector(spinAxis, side).normalize();
  object.position.copy(normal).multiplyScalar(PLANET_RADIUS + lift);
  object.quaternion.setFromUnitVectors(up, normal);
  return object;
}

/** 与 bodyverse 同一颗小星球：草地、小路、树、蘑菇、花和石子 */
function buildPlanet(): THREE.Group {
  const random = seeded(7);
  const planet = new THREE.Group();
  planet.add(new THREE.Mesh(new THREE.SphereGeometry(PLANET_RADIUS, 64, 40), toon('#8ed46b')));
  const path = new THREE.Mesh(new THREE.TorusGeometry(PLANET_RADIUS - 0.94, 1, 10, 160), toon('#f6dca4'));
  path.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), spinAxis);
  planet.add(path);

  const trunkMat = toon('#a8714a');
  const leafMats = ['#4fb35a', '#6cc56a', '#3f9e57'].map(toon);
  const flowerMats = ['#ff7aa2', '#ffd23f', '#ffffff', '#b38cff'].map(toon);
  const capMat = toon('#ff5a4f');
  const dotMat = toon('#fff7ec');
  const stemMat = toon('#fff0d6');
  const pebbleMat = toon('#d9c08a');

  for (let i = 0; i < 16; i += 1) {
    const tree = new THREE.Group();
    const height = 0.45 + random() * 0.35;
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, height, 8), trunkMat);
    trunk.position.y = height / 2;
    tree.add(trunk);
    const leaves = leafMats[i % leafMats.length];
    if (random() > 0.4) {
      const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(0.38 + random() * 0.18, 1), leaves);
      crown.position.y = height + 0.25;
      tree.add(crown);
    } else {
      for (let k = 0; k < 3; k += 1) {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(0.42 - k * 0.1, 0.5, 9), leaves);
        cone.position.y = height + 0.1 + k * 0.28;
        tree.add(cone);
      }
    }
    tree.scale.setScalar(0.9 + random() * 0.6);
    planet.add(onSurface(tree, (i / 16) * Math.PI * 2 + random() * 0.2, 0.32 + random() * 0.5));
  }

  for (let i = 0; i < 7; i += 1) {
    const mushroom = new THREE.Group();
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.16, 8), stemMat);
    stem.position.y = 0.08;
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), capMat);
    cap.position.y = 0.15;
    mushroom.add(stem, cap);
    for (let k = 0; k < 3; k += 1) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), dotMat);
      const a = (k / 3) * Math.PI * 2;
      dot.position.set(Math.cos(a) * 0.08, 0.26, Math.sin(a) * 0.08);
      mushroom.add(dot);
    }
    planet.add(onSurface(mushroom, random() * Math.PI * 2, (random() > 0.5 ? 1 : -1) * (0.2 + random() * 0.15)));
  }

  for (let i = 0; i < 36; i += 1) {
    const flower = new THREE.Group();
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.14, 4), leafMats[0]);
    stem.position.y = 0.07;
    const bloom = new THREE.Mesh(new THREE.IcosahedronGeometry(0.05, 0), flowerMats[i % flowerMats.length]);
    bloom.position.y = 0.15;
    flower.add(stem, bloom);
    planet.add(onSurface(flower, random() * Math.PI * 2, (random() > 0.45 ? 1 : -1) * (0.13 + random() * 0.5)));
  }

  for (let i = 0; i < 18; i += 1) {
    const pebble = new THREE.Mesh(new THREE.DodecahedronGeometry(0.05 + random() * 0.04, 0), pebbleMat);
    pebble.scale.y = 0.45;
    planet.add(onSurface(pebble, random() * Math.PI * 2, (random() - 0.5) * 0.12, 0.04));
  }
  return planet;
}

function buildCloud(random: () => number): THREE.Group {
  const cloud = new THREE.Group();
  const material = toon('#ffffff');
  for (let i = 0; i < 4; i += 1) {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.45 + random() * 0.3, 16, 12), material);
    puff.position.set(i * 0.55 - 0.8, (i % 2) * 0.2, random() * 0.2);
    cloud.add(puff);
  }
  return cloud;
}

/** 给每个领域摆道具用的小工具 */
export interface DuoKit {
  scene: THREE.Scene;
  toon: typeof toon;
  /** 立在星球表面：x、z 是俯视下的位置（小念和爸爸站在原点附近） */
  plant(object: THREE.Object3D, x: number, z: number): void;
  /** 每帧调用：t 是秒，dt 是这一帧的秒数（已按「减少动态效果」放慢） */
  onFrame(update: (t: number, dt: number) => void): void;
}

export interface DuoOptions {
  /** 读屏用的一句话 */
  label: string;
  decorate?: (kit: DuoKit) => void;
  /** 点到小念或爸爸；不传就只让他们跳一下 */
  onTap?: () => void;
}

export interface DuoStage {
  /** 两人一起跳一下（或欢呼） */
  cheer(): void;
  destroy(): void;
}

let model: Promise<GLTF> | undefined;
function loadModel(): Promise<GLTF> {
  model ??= new GLTFLoader().loadAsync(`${import.meta.env.BASE_URL}models/character.glb`).catch((error: unknown) => {
    model = undefined;
    throw error;
  });
  return model;
}

export async function mountDuo(host: HTMLElement, options: DuoOptions): Promise<DuoStage> {
  const gltf = await loadModel();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const canvas = renderer.domElement;
  canvas.className = 'duo-canvas';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', options.label);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
  camera.position.set(0.6, 1.85, 6.2);
  scene.add(new THREE.HemisphereLight('#ffffff', '#ffd9b0', 1.6));
  const sun = new THREE.DirectionalLight('#ffffff', 2.1);
  sun.position.set(3, 6, 5);
  scene.add(sun);

  const planet = buildPlanet();
  const world = new THREE.Group();
  world.position.y = -PLANET_RADIUS;
  world.add(planet);
  scene.add(world);
  const random = seeded(11);
  const clouds = [[-5, 3.6, -9], [1, 4.4, -11], [6, 3.2, -10], [-1.5, 2.6, -8]].map(([x, y, z]) => {
    const cloud = buildCloud(random);
    cloud.position.set(x, y, z);
    scene.add(cloud);
    return cloud;
  });
  const sunDisc = new THREE.Mesh(new THREE.CircleGeometry(1.1, 40), new THREE.MeshBasicMaterial({ color: '#ffe27a' }));
  sunDisc.position.set(-4.5, 4.6, -14);
  const sunGlow = new THREE.Mesh(new THREE.CircleGeometry(1.6, 40), new THREE.MeshBasicMaterial({ color: '#fff3c4', transparent: true, opacity: 0.6 }));
  sunGlow.position.set(-4.5, 4.6, -14.1);
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.42, 32), new THREE.MeshBasicMaterial({ color: '#2f5a1f', transparent: true, opacity: 0.22, depthWrite: false }));
  shadow.position.set(0, 0.07, 0);
  shadow.rotation.x = -Math.PI / 2;
  scene.add(sunDisc, sunGlow, shadow);

  const rigs = [buildRig(gltf, 'nian', 0.5, -0.25), buildRig(gltf, 'dad', -0.6, 0.55)];
  for (const rig of rigs) {
    scene.add(rig.root);
    rig.mixer.addEventListener('finished', event => {
      if (event.action !== rig.oneShot) return;
      rig.oneShot.fadeOut(0.3);
      rig.oneShot = null;
      rig.actions.Idle?.reset().fadeIn(0.3).play();
    });
  }

  const updates: ((t: number, dt: number) => void)[] = [];
  options.decorate?.({
    scene,
    toon,
    plant(object, x, z) {
      const h = Math.sqrt(Math.max(PLANET_RADIUS ** 2 - x * x - z * z, 0));
      const normal = new THREE.Vector3(x, h, z).normalize();
      object.position.copy(normal).multiplyScalar(PLANET_RADIUS).add(new THREE.Vector3(0, -PLANET_RADIUS, 0));
      object.quaternion.setFromUnitVectors(up, normal);
      scene.add(object);
    },
    onFrame(update) { updates.push(update); },
  });

  const lift = 0.35;
  const target = new THREE.Vector3(0, 0.95 + lift, 0);
  camera.lookAt(target);
  const pointer = new THREE.Vector2();
  const aim = new THREE.Vector2();
  const ray = new THREE.Raycaster();
  let cue = 0;

  function hitRig(event: PointerEvent): boolean {
    const rect = canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    return ray.intersectObjects(rigs.map(rig => rig.root), true).length > 0;
  }
  const onMove = (event: PointerEvent): void => {
    const rect = canvas.getBoundingClientRect();
    aim.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    if (event.pointerType === 'mouse') canvas.style.cursor = hitRig(event) ? 'pointer' : '';
  };
  const onLeave = (): void => { aim.set(0, 0); };
  const onClick = (event: PointerEvent): void => {
    if (!hitRig(event)) return;
    if (options.onTap) options.onTap();
    else stage.cheer();
  };
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerleave', onLeave);
  canvas.addEventListener('click', onClick as EventListener);

  function resize(): void {
    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    // 页面在后台时动画循环不跑，先画一帧静止画面
    if (!frame) renderer.render(scene, camera);
  }

  const clock = new THREE.Clock();
  let frame = 0;
  let visible = false;
  function tick(): void {
    frame = 0;
    if (!visible) return;
    const raw = Math.min(clock.getDelta(), 0.1);
    const dt = raw * (reduced ? 0.6 : 1);
    const time = clock.elapsedTime;
    pointer.x = damp(pointer.x, reduced ? 0 : aim.x, 6, raw);
    pointer.y = damp(pointer.y, reduced ? 0 : aim.y, 6, raw);

    const portrait = host.clientWidth < host.clientHeight * 0.95;
    camera.position.set(
      damp(camera.position.x, 0.6 + pointer.x * 0.3, 3, raw),
      damp(camera.position.y, 1.5 + lift + pointer.y * 0.15 + (portrait ? 0.25 : 0), 3, raw),
      portrait ? 7.3 : 6.2,
    );
    camera.lookAt(target);

    for (const rig of rigs) {
      rig.head.quaternion.copy(rig.headPose);
      rig.neck.quaternion.copy(rig.neckPose);
      rig.mixer.update(dt);
      rig.head.scale.setScalar(rig.headScale);
      rig.headPose.copy(rig.head.quaternion);
      rig.neckPose.copy(rig.neck.quaternion);
      rig.root.rotation.y = damp(rig.root.rotation.y, rig.facing, 5, raw);
      // 看向孩子的手指，但不往下低头：按钮在下面，一低头脸就看不见了
      rig.gaze.x = damp(rig.gaze.x, THREE.MathUtils.clamp(0.1 - rig.root.rotation.y + pointer.x * 0.6, -0.75, 0.75), 6, raw);
      rig.gaze.y = damp(rig.gaze.y, THREE.MathUtils.clamp(pointer.y * 0.15 + 0.12, 0, 0.3), 6, raw);
      rig.neck.rotateY(rig.gaze.x * 0.35);
      rig.head.rotateY(rig.gaze.x * 0.65);
      rig.head.rotateX(-rig.gaze.y);
      rig.breath += dt * (Math.PI * 2 / 3.6);
      const chest = 1 + 0.025 * (1 - Math.cos(rig.breath)) / 2;
      rig.torso.scale.set(chest, 1, chest);
      rig.neck.scale.set(1 / chest, 1, 1 / chest);
      if (time > rig.nextBlink + 0.12) rig.nextBlink = time + 2 + Math.random() * 3;
      rig.face?.color.copy(time > rig.nextBlink && rig.skin ? rig.skin.color : rig.faceBase);
    }
    for (const cloud of clouds) {
      cloud.position.x -= dt * 0.08;
      if (cloud.position.x < -9) cloud.position.x = 9;
    }
    for (const update of updates) update(time, dt);
    renderer.render(scene, camera);
    frame = requestAnimationFrame(tick);
  }
  function play(on: boolean): void {
    visible = on && document.visibilityState !== 'hidden';
    if (visible && !frame) {
      clock.getDelta();
      frame = requestAnimationFrame(tick);
    }
  }

  const sizes = new ResizeObserver(resize);
  sizes.observe(host);
  let inView = true;
  const seen = new IntersectionObserver(entries => {
    inView = entries.some(entry => entry.isIntersecting);
    play(inView);
  });
  seen.observe(host);
  const onVisibility = (): void => play(inView);
  document.addEventListener('visibilitychange', onVisibility);
  resize();
  host.append(canvas);
  play(true);

  const stage: DuoStage = {
    cheer() {
      cue += 1;
      rigs.forEach((rig, i) => playOnce(rig, (cue + i) % 2 ? 'Jump' : 'Victory'));
    },
    destroy() {
      visible = false;
      cancelAnimationFrame(frame);
      sizes.disconnect();
      seen.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.remove();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
  return stage;
}
