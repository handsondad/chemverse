import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    restoreMocks: true,
    // 首个页面测试要冷加载整套课程和周期表，单线程跑在忙碌的 Windows 机器上会超过默认的 5 秒
    testTimeout: 15000,
  },
});
