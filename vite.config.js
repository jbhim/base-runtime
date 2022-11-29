import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import customBuildPlugin from './plugin/customBuildPlugin.js'
import externalGlobals from 'rollup-plugin-external-globals'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), customBuildPlugin({
        src: ['cdn/vue-router.global.prod.js', 'cdn/vue.runtime.global.prod.js'],
        dest: 'dist'
    }), Inspect({
        build: true,
        outputDir: '.vite-inspect'
    })],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@lib': fileURLToPath(new URL('./lib', import.meta.url)),
            '@matedata': fileURLToPath(new URL('./src/matedata', import.meta.url)),
            '@views': fileURLToPath(new URL('./src/views', import.meta.url))
        }
    },
    build: {
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue', 'vue-router', '@matedata', '@lib'],
            plugins: [
                externalGlobals({
                    vue: 'Vue',
                    'vue-router': 'VueRouter',
                    '@matedata': 'window.matedata',
                    '@lib': 'AppLaunch'
                })
            ]
        }
    }
})
