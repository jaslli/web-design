<template>
    <div>
        <h2>学生姓名： {{studentName}}</h2>
        <h2>学生年龄： {{age}}</h2>
        <button @click="sendStudentName">把学校名给APP</button>
        <button @click="unbind">把学校名给APP</button>
    </div>
</template>

<script>
export default {
    name: 'Student',
    data() {
        return {
            studentName: 'yww',
            age: 20
        }
    },
    methods: {
        sendStudentName(name) {
            // 触发本组件绑定的ywww事件
            this.$emit('ywww',name);
        },
        unbind() {
            // 通过$of来解绑一个自定义的事件
            this.$off('ywww')
            // 通过$of来解绑多个自定义的事件
            this.$off(['ywww, yww'])
            // 通过$off来解绑所有事件
            this.$off()
        }
    }
}
</script>

<style>
</style>

