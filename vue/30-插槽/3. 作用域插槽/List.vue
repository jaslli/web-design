<template>
    <!-- 给插槽绑定一个listData,这样的就能让插槽的使用者获得数据了 -->
    <slot :listData="listdata">默认值的内容</slot>
</template>

<script>
export default {
    name: 'List',
    data() {
        return {
            listdata: ['1','2','3','4','5','6','7','8']
        }
    }
}
</script>

<style>

</style>