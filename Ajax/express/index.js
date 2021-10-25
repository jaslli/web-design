// 先使用 npm install express 将依赖引入

// 1. 引入express
const express = require('express');

// 2. 创建应用对象
const app = express();

// 3. 创建路由规则
app.get('/',(request, response) => {
    response.send('Hello World!');
});

// 4. 设置监听端口，启动服务
app.listen(8000, () => {
    console.log("服务已经启动，8000端口监听中")
});

// 5. 使用  node index.js   启动