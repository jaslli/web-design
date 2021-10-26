
<template>
    <!-- 组件的结构 -->
    <div>
        <h2>学校名称： {{schoolName}}</h2>
        <h2>学校地址： {{address}}</h2>
    </div>
</template>


<script>
// 默认暴露，暴露之后通过import引入该组件就可以使用了
export default {
    naem: 'School',
    data() {
        return {
            schoolName: '学校',
            address: '中国'
        }
    },
}
</script>


<style>

</style>