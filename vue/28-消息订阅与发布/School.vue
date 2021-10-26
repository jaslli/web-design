
<template>
    <div>
        <h2>学校名称： {{schoolName}}</h2>
        <h2>学校地址： {{address}}</h2>
        <button @click="sendSchoolName">把学校名给APP</button>
    </div>
</template>


<script>

//  使用前先下载这个js
//  propsnpm install pubsub-js
import pubsub from 'pubsub.js';

export default {

    naem: 'School',
    data() {
        return {
            schoolName: '学校',
            address: '中国',
            pubId: ''
        }
    },
    mounted() {
        // 订阅消息
        // function有两个参数，msgName是消息名，data是消息的内容
        this.pubId = pubsub.subscribe('hello', (msgNamea,data) => {
            console.log("有人发布了hello消息，hello消息的回调执行了");
        })
    },
    beforeDestroy() {
        // 组件销毁之前取消订阅
        pubsub.unsubscribe(pubId);
    }
}
</script>


<style>

</style>