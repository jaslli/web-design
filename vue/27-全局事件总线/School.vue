
<template>
    <div>
        <h2>学校名称： {{schoolName}}</h2>
        <h2>学校地址： {{address}}</h2>
        <button @click="sendSchoolName">把学校名给APP</button>
    </div>
</template>


<script>
export default {
    naem: 'School',
    data() {
        return {
            schoolName: '学校',
            address: '中国'
        }
    },
    mounted() {
        // 给事件总线绑定一个hello的自定义事件
        this.$bus.$on('hello', (data) =>{
            console.log("School组件，收到了数据" + data)
        })
    },
    beforeDestroy() {
        this.$bus.$off('hello');
    },
}
</script>


<style>

</style>