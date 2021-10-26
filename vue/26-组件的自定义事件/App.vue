<template>
    <div>
        <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
        <School :getSchoolName="getSchoolName"/>

        <!-- 通过父组件给子组件绑定自定义事件实现： 子给父传递数据 -->
        <Student v-on:ywww="getStudentName"/>
        <Student @ywww="getStudentName"/>

        <!-- 通过ref绑定组件，然后通过this.$refs.student.$on给组件绑定自定义事件 -->
        <Student ref="student"/>
    </div>
</template>

<script>

import School from './School'
import Student from './Student'

export default {
    name: 'App',
    components: {School, Student},
    methods: {
        getSchoolName(name) {
            console.log("APP收到了学校的名字", name);
        },
        getStudentName(name) {
            console.log("APP收到了学生的名字",name);
        }
    },
    mounted() {
        // 给该组件引用绑定一个ywww的自定义事件
        this.$refs.student.$on('ywww',this.getStudentName);

        // 给该组件引用绑定一个ywww的自定义事件(一次性的)
        //this.$refs.student.$once('ywww',this.getStudentName);
    },
}
</script>

<style>

</style>