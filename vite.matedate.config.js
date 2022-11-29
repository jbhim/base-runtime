import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@lib': fileURLToPath(new URL('./lib', import.meta.url)),
            '@matedata': fileURLToPath(new URL('./src/matedata', import.meta.url)),
            '@views': fileURLToPath(new URL('./src/views', import.meta.url))
        }
    }, build: {
        emptyOutDir: false,
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: fileURLToPath(new URL('./src/matedata/index.js', import.meta.url)),
            name: 'matedata',
            // the proper extensions will be added
            fileName: 'matedata',
            formats: ['umd']
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue', 'vue-router'],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue',
                    'vue-router': 'VueRouter'
                }
            }
        }
    }
})
