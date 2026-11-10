/** 课件、封面这些放在 public/lessons/ 下的文件地址 */
export function lessonAsset(path: string): string {
  return `${import.meta.env.BASE_URL}lessons/${path}`;
}
