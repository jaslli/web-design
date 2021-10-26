<template>
    <div>
        <h2>学生姓名： {{studentName}}</h2>
        <h2>学生年龄： {{age}}</h2>
        <button @click="sendStudentName"></button>
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
    },methods: {
        sendStudentName() {
            // 触发事件总线上的(School绑定的)的自定义事件hello,从而触发School上的回调函数
            this.$bus.$emit('hello','Hello School');
        }
    }
}
</script>

<style>
</style>

