import * as THREE from 'three';
import { mountDuo, type DuoKit, type DuoStage } from '../series/duo-stage';

/** 化学奇遇记的小星球：在系列同一颗星球上，摆几只冒泡的烧瓶、几块晶体，头顶飘着水分子、二氧化碳和一个原子。 */

function flask(kit: DuoKit, liquid: string, size: number): THREE.Group {
  const group = new THREE.Group();
  const glass = kit.toon('#e9f8fb');
  glass.transparent = true;
  glass.opacity = 0.55;
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.2, 0.28, 20), glass);
  body.position.y = 0.14;
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.14, 16), glass);
  neck.position.y = 0.34;
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.058, 0.014, 8, 20), kit.toon('#ffffff'));
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.41;
  const fill = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.185, 0.13, 20), kit.toon(liquid));
  fill.position.y = 0.07;
  group.add(fill, body, neck, rim);
  group.scale.setScalar(size);
  return group;
}

function beaker(kit: DuoKit, liquid: string, size: number): THREE.Group {
  const group = new THREE.Group();
  const glass = kit.toon('#e9f8fb');
  glass.transparent = true;
  glass.opacity = 0.5;
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.14, 0.32, 24, 1, true), glass);
  wall.position.y = 0.16;
  const fill = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.13, 0.17, 24), kit.toon(liquid));
  fill.position.y = 0.09;
  group.add(fill, wall);
  group.scale.setScalar(size);
  return group;
}

function crystal(kit: DuoKit, color: string): THREE.Group {
  const group = new THREE.Group();
  const material = kit.toon(color);
  [[0, 0.16, 0, 0.13], [0.11, 0.09, 0.04, 0.08], [-0.09, 0.08, -0.03, 0.07]].forEach(([x, y, z, r]) => {
    const piece = new THREE.Mesh(new THREE.OctahedronGeometry(r, 0), material);
    piece.scale.y = 1.7;
    piece.position.set(x, y, z);
    group.add(piece);
  });
  return group;
}

function ball(kit: DuoKit, color: string, r: number, at: [number, number, number]): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 14), kit.toon(color));
  mesh.position.set(...at);
  return mesh;
}

function stick(kit: DuoKit, from: THREE.Vector3, to: THREE.Vector3): THREE.Mesh {
  const length = from.distanceTo(to);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, length, 8), kit.toon('#f3efe6'));
  mesh.position.copy(from).lerp(to, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), to.clone().sub(from).normalize());
  return mesh;
}

function water(kit: DuoKit): THREE.Group {
  const group = new THREE.Group();
  const angle = (104.5 / 2) * (Math.PI / 180);
  const o = new THREE.Vector3();
  const hs = [-1, 1].map(side => new THREE.Vector3(Math.sin(angle) * side * 0.28, -Math.cos(angle) * 0.28, 0));
  group.add(ball(kit, '#ff6b6b', 0.16, [0, 0, 0]));
  for (const h of hs) group.add(stick(kit, o, h), ball(kit, '#ffffff', 0.1, [h.x, h.y, h.z]));
  return group;
}

function carbonDioxide(kit: DuoKit): THREE.Group {
  const group = new THREE.Group();
  group.add(ball(kit, '#555b66', 0.13, [0, 0, 0]));
  for (const side of [-1, 1]) {
    const at = new THREE.Vector3(side * 0.3, 0, 0);
    group.add(stick(kit, new THREE.Vector3(), at), ball(kit, '#ff6b6b', 0.14, [at.x, 0, 0]));
  }
  return group;
}

function atom(kit: DuoKit): { group: THREE.Group; electrons: { mesh: THREE.Mesh; ring: number; phase: number }[] } {
  const group = new THREE.Group();
  group.add(ball(kit, '#ffb347', 0.1, [0, 0, 0]));
  const ringMat = kit.toon('#6cc4ff');
  const rings = [0, 1].map(i => {
    const ring = new THREE.Group();
    ring.rotation.set(Math.PI / 2 + (i ? 0.9 : -0.9), 0, i ? 0.5 : -0.5);
    ring.add(new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.012, 6, 48), ringMat));
    group.add(ring);
    return ring;
  });
  const electrons = [0, 1].map(i => {
    const mesh = ball(kit, '#3d7bff', 0.045, [0.34, 0, 0]);
    rings[i].add(mesh);
    return { mesh, ring: i, phase: i * Math.PI };
  });
  return { group, electrons };
}

function decorate(kit: DuoKit): void {
  // 镜头里只看得见星球顶上窄窄一圈，道具都挨着两人摆
  const greenFlask = flask(kit, '#7bd389', 1.2);
  const pinkFlask = flask(kit, '#ff8fb1', 0.95);
  const blueBeaker = beaker(kit, '#6cc4ff', 1.25);
  kit.plant(greenFlask, 1.1, -0.15);
  kit.plant(blueBeaker, -1.25, -0.05);
  kit.plant(pinkFlask, -1.6, -0.7);
  kit.plant(crystal(kit, '#b48cff'), -0.95, 0.55);
  kit.plant(crystal(kit, '#7fd6e0'), 1.0, 0.5);

  // 烧瓶口冒出的小泡泡：一边升一边变小
  const bubbleMat = kit.toon('#ffffff');
  bubbleMat.transparent = true;
  bubbleMat.opacity = 0.85;
  const vents = [{ from: greenFlask, top: 0.45 }, { from: blueBeaker, top: 0.3 }];
  const bubbles = vents.flatMap(({ from, top }, v) => [0, 1, 2].map(i => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), bubbleMat);
    kit.scene.add(mesh);
    from.updateWorldMatrix(true, false);
    const base = from.localToWorld(new THREE.Vector3(0, top, 0));
    return { mesh, base, offset: i / 3 + v * 0.17 };
  }));

  const floaters = [
    { object: water(kit), at: new THREE.Vector3(-1.9, 1.95, -1.1), spin: 0.5 },
    { object: carbonDioxide(kit), at: new THREE.Vector3(1.35, 2.45, -1.8), spin: -0.4 },
  ];
  const orbit = atom(kit);
  floaters.push({ object: orbit.group, at: new THREE.Vector3(-0.15, 2.75, -2.4), spin: 0.25 });
  floaters.forEach(({ object, at }) => {
    object.position.copy(at);
    kit.scene.add(object);
  });

  kit.onFrame((t, dt) => {
    floaters.forEach(({ object, at, spin }, i) => {
      object.rotation.y += dt * spin;
      object.position.y = at.y + Math.sin(t * 1.1 + i * 2) * 0.08;
    });
    for (const electron of orbit.electrons) {
      electron.phase += dt * 2.4;
      electron.mesh.position.set(Math.cos(electron.phase) * 0.34, Math.sin(electron.phase) * 0.34, 0);
    }
    for (const bubble of bubbles) {
      const k = (t * 0.45 + bubble.offset) % 1;
      bubble.mesh.position.set(bubble.base.x + Math.sin(k * 9 + bubble.offset * 7) * 0.03, bubble.base.y + k * 0.5, bubble.base.z);
      bubble.mesh.scale.setScalar(Math.min(1, k * 6) * (1 - k * 0.6));
    }
  });
}

export function mountChemPlanet(host: HTMLElement, onTap: () => void): Promise<DuoStage> {
  return mountDuo(host, { label: '小念和爸爸站在化学小星球上，旁边的烧瓶在冒泡；点他们会接着聊', decorate, onTap });
}
