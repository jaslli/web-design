/*
    axios的请求会出现跨域，一般通过后端解决，也可以通过代理服务器解决
        1. nginx    反向代理
        2. vue-cli  配置代理服务器
 */

module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
        }
    },
    lintOnSave: false,
    // 开启代理服务器（方式一）
    // devServer: {
    //     // 当前端口号是8080,服务器端口是5000
    //     // 所以vue中的请求都请求8080就能通过这个代理服务器转发到5000
    //     proxy: 'http://localhost:5000'
    // }
    // 开启代理服务器（方式一）
    devServer: {
        // 请求的前缀带了api就会转发
        proxy: {
            'api': {
                target: 'http://localhost:5000',
                // 这个配置会帮你把这个前缀给去掉
                //  http://localhost:8080/api/student
                // 到达之后是   http://localhost:5000/student
                pathRewrite: {'^/api':''},
                // 用于支持websocket
                ws: true,
                // true表示后端获得的请求会显示是后端端口的5000
                // false表示后端获得的请求会显示是vue前端端口的8080
                changeOrigin: true
            }
        }
    }
}