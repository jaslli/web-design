<template>
    <!-- 可以给插槽起名字，然后通过名字来给插槽插入内容 -->
    <slot>默认值，传入内容就会显示默认值</slot>
    <slot name="test">默认值，传入内容就会显示默认值</slot>
</template>

<script>
export default {
    name: 'List'
}
</script>

<style>

</style>