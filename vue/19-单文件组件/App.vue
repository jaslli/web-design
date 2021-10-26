<template>
    <School></School>
    <Student></Student>
</template>

<script>

// 使用组件前先将暴露的组件引入,然后注册好就能使用了
import School from './School.vue'
import Student from './Student.vue'

export default {
    name: 'APP',
    components: {
        School,
        Student
    }
}
</script>

<style>

</style>