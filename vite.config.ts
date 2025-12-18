import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueDevTools from 'vite-plugin-vue-devtools';
import { SourceMapUploadVitePlugin } from "@cloudcare/vite-plugin-sourcemap";


// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: true, 
  },
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    SourceMapUploadVitePlugin({
      applicationId: "self", //  观测云应用 appid
      apiKey: "Id6Jcnv7oa5A1Vr93qQGfBUDsZ8YtMO4", // open apikey
      server: "https://openapi.guance.com", // 站点对应 openapi 地址
      filepaths: ["dist/"], // 需要搜索的目录，可以是文件或者文件目录
      logLevel: "verbose", // 日志打印级别
      root: '/', // 需要上传的相对目录对应的跟目录
      env: "production", // 观测云 应用的 env
      version: "1.0.0", // 观测云应用的 version
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
