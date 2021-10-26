<template>
    <div>
        <!-- 默认插槽 -->
        <!--
            标签里面也是可以写html的，vue也会解析，但是不指定解析之后放在哪里
            所以需要在List定义一个存放的位置
        -->
        <!-- 常规传入，但是需要自定义时就会出现要修改组件内容的情况 -->
        <!-- <List :listData="listdata"></List> -->

        <!-- 插槽的形式就不需要传递数据给子组件了，这里可以直接使用父组件的数据 -->
        <List>
            <ul>
                <li v-for="(item, index) in listdata" :key="index">{{item}}</li>
            </ul>
        </List>
    </div>
</template>

<script>
import List from './List'

export default {
    name: 'App',
    components: {List},
    data() {
        return {
            listdata: ['1','2','3','4','5','6','7','8']
        }
    }
}
</script>



<style>
/*
    关于插槽的样式
        - 插槽的样式是可以写到父组件的，因为是解析完了才会插入到子组件
        - 当然写到子组件也是可以的，在父组件中解析完插入到子组件，也是可以应用子组件中的样式的
 */
</style>