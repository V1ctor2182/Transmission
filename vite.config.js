import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: { host: '127.0.0.1', port: 5180, strictPort: true, open: false },
  build: {
    // worldmap 是 @svg-maps/world 的 256 国轮廓静态数据(~1.2MB),已单独分包、独立缓存;
    // 提高阈值只为静音对这一块的通用告警(应用代码已从 1.4MB 降到 ~86KB)。
    // 后续可选:对地图做 dynamic import 懒加载(登录/引导不需要它),但需处理工作台首帧地图占位。
    chunkSizeWarningLimit: 1300,
    rollupOptions: {
      output: {
        // 分包:把大块的真实世界地图数据 + 第三方库拆出主包,降低首屏单块体积
        manualChunks (id) {
          if (id.includes('@svg-maps')) return 'worldmap'   // 256 国轮廓数据,最大单块
          if (id.includes('node_modules')) return 'vendor'  // vue 等运行时
        },
      },
    },
  },
})
