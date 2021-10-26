<template>
    <div>
        <button @click="getInfo"></button>
    </div>
</template>

<script>

//  引入前需要先下载axios
//  npm install axios
import axios from 'axios';

export default {
    name: 'App',
    methods: {
        getInfo() {
            // 服务端端口为5000，会发生跨域
            // axios.get('http://localhost:5000/student').then(
            //     response => {console.log(response.data);},
            //     error => {console.log(error.message);}
            // )

            // 配置了代理服务器之后，请求当前的8080端口，代理会帮你转发
            // 需要注意的是，当前目录存在这个student的文件，就会先返回这个student文件，不会进行代理请求
            axios.get('http://localhost:8080/student').then(
                response => {console.log(response.data);},
                error => {console.log(error.message);}
            )
        }
    }
}
</script>

<style>

</style>