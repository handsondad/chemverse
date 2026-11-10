/** 单独放一个文件：页面先问一句能不能画 3D，再按需加载 three.js */
export function canUseWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl2') ?? canvas.getContext('webgl')));
  } catch {
    return false;
  }
}
