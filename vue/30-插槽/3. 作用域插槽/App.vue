<template>
    <div>
        <!-- 作用域插槽 -->

        <!--
            假设这个场景，数据是放在组件内的，数据是一致的，但是结构是不一样的
            这样的话，在父组件编写的插槽结构就无法读取子组件的数据了，这时候就会报错
        -->

        <List>
            <!--
                想要使用插槽中绑定的数据,就需要将内容结构放入template
                然后通过scope这个属性（自定义起名），得到插槽中绑定的数据（一个对象）
                最后通过scopeName.listdata获取插槽数据
            -->
            <template scope="yww">
                <ul>
                    <li v-for="(item, index) in yww.listData" :key="index">{{item}}</li>
                </ul>
            </template>
            <!--
                或者是直接获取插槽数据，不用获取对象也可以
            -->
            <template scope={listData}>
                <ul>
                    <li v-for="(item, index) in yww.listData" :key="index">{{item}}</li>
                </ul>
            </template>
        </List>



    </div>
</template>

<script>
import List from './List'

export default {
    name: 'App',
    components: {List}
}
</script>


