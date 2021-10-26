<template>
    <!--
        ref属性
            1. 被用来给元素或子组件注册引用信息（id的替代者）
            2. 在组件上加入id属性，会在组件的template的div上添加id,就会获得template中的内容
            3. 要是在组件上加入ref属性，就会获得VueComponent，即组件的实例对象
            4. 获取引用 this.$refs.xxx
    -->







    <div>
        <!-- 用ref属性来代替id -->
        <!-- <div v-text="msg" id="title"></div> -->
        <div v-text="msg" ref="title"></div>
        <button @click="showDom">点击在控制台输出上方的DOM元素</button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            msg: '正在学习Vue!',
        }
    },
    methods: {
        showDom() {
            // 一般操纵DOM时都是这么获取的，不过vue定义了一个新的方式
            // console.log(document.getElementById('title'))
            // 此处的this指的是该vc组件，从refs的属性中选取title，既可以获得
            console.log(this.$refs.title)
        }
    },
}
</script>

<style>

</style>