/**
 * 「奇遇记」系列的两位主角：小念和爸爸。
 * 身体奇遇记、化学奇遇记……每个领域的站点都用同一份形象，配色、身高、头身比与 bodyverse 完全一致。
 */
export type CharacterId = 'nian' | 'dad';

export const characterNames: Record<CharacterId, string> = { nian: '小念', dad: '爸爸' };

export interface Look {
  /** 键名就是 3D 模型里的材质名 */
  palette: Record<'Skin' | 'Shirt' | 'Pants' | 'Belt' | 'Face' | 'Hair', string>;
  /** 站立身高（3D 世界单位） */
  height: number;
  /** 原模型是大头卡通，头小一点显得更像大人 */
  headScale: number;
  glasses: boolean;
}

export const looks: Record<CharacterId, Look> = {
  nian: {
    palette: { Skin: '#f5c9a6', Shirt: '#ff8a5c', Pants: '#3d6fd6', Belt: '#2b3f80', Face: '#3a2418', Hair: '#5a3a22' },
    height: 1.3, headScale: 1, glasses: false,
  },
  dad: {
    palette: { Skin: '#eab892', Shirt: '#3f78c9', Pants: '#4a4d5c', Belt: '#2a2c36', Face: '#2e1d14', Hair: '#2a1c14' },
    height: 1.85, headScale: 0.8, glasses: true,
  },
};
