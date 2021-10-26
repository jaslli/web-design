<template>
    <!--
    <ul>
        <li v-for="(item, index) in listData" :key="index">{{item}}</li>
    </ul>
    -->

    <!-- 定义插槽，里面的内容是默认值 -->
    <slot>默认值，传入内容就会显示默认值</slot>
</template>

<script>
export default {
    name: 'List',
    // 接受父组件传的数据列表
    props: ['listData']
}
</script>

<style>

</style>