// 模拟服务端的请求

const express = require('express');
const app = express();


// 处理GET请求
app.get('/server', (request, response) => {
    // 设置请求头，表示允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send("Hello World!");
});

// 处理POST请求
app.post('/server', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send("Hello World! POST");
})

app.listen(8000, () => {
    console.log("服务已经启动");
});