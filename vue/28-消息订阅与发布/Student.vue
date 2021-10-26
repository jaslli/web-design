<template>
    <div>
        <h2>学生姓名： {{studentName}}</h2>
        <h2>学生年龄： {{age}}</h2>
        <button @click="sendStudentName"></button>
    </div>
</template>

<script>

//  使用前先下载这个js
//  propsnpm install pubsub-js
import pubsub from 'pubsub.js';

export default {
    name: 'Student',
    data() {
        return {
            studentName: 'yww',
            age: 20
        }
    },methods: {
        sendStudentName() {
            // 给hello订阅发布了消息
            pubsub.publish('hello','hello world!');
        }
    }
}
</script>

<style>
</style>

