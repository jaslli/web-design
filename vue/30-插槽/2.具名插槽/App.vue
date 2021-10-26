<template>
    <div>
        <!-- 具名插槽 -->

        <!-- 然后给内容标记插入到哪个插槽 -->
        <List>
            <!-- 通过slot属性标记 -->
            <ul slot="test">
                <li v-for="(item, index) in listdata" :key="index">{{item}}</li>
            </ul>
        </List>


        <List>
            <!-- 使用template的v-slot属性也能标记,不过v-slot只能在template中使用 -->
            <template v-slot:test>
                <ul>
                    <li v-for="(item, index) in listdata" :key="index">{{item}}</li>
                </ul>
            </template>
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


