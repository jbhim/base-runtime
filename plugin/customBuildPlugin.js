import { cpSync } from 'fs'
import { resolve } from 'path'

export default () => {
    return {
        name: 'custom-build-plugin.js',
        apply: 'build', // 构建期间调用
        transformIndexHtml (html) {
            let replaceHtml = html.replace(
                '</head>',
                `<link rel="stylesheet" href="/style.css">
</head>`).replace('<title>Vite App</title>', `<title>Vite App</title>
      <script src="/vue.runtime.global.prod.js"></script>
      <script src="/vue-router.global.prod.js"></script>
    <script src="/matedata.umd.js"></script>
    <script src="/applaunch.umd.js"></script>`)
            return replaceHtml
        },
        closeBundle () {
            console.log('closeBundle')
            cpSync(resolve('cdn/vue.runtime.global.prod.js'), resolve('dist/vue.runtime.global.prod.js'))
            cpSync(resolve('cdn/vue-router.global.prod.js'), resolve('dist/vue-router.global.prod.js'))
        }
    }
}
