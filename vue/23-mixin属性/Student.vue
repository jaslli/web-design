<template>

    <!--
        mixin 混入
            可以把多个组件共用的配置属性提取成一个js混入对象
            使用方式
                1. 定义混入对象（JS文件），并将其暴露
                    export const hunhe = {
                        data() {...},
                        methods: {},
                        ...
                    }
                2. 使用混入
                    - 局部混入
                        在组件中先导入混入对象
                        import {hunhe} from '...'
                        然后使用mixins: [hunhe]属性配置
                    - 全局混入（不推荐）
                        在全局的main.js中导入混入对象
                        import {hunhe} from '...'
                        然后使用Vue.mixin(hunhe)这样全局的组件都会有其中配置
                3. 关于混入的冲突
                    如果混入的属性与原文件的属性出现冲突，那会先按照本组件的配置为主
    -->

    <div>
        <span @click='showInfo'>学生姓名： {{name}}</span>
        <span>学生年龄： {{age}}</span>
    </div>
</template>

<script>

import {hunhe} from './mixin'

export default {
    data() {
        return {
            name: "yww",
            age: 20
        }
    },
    // 假设这个方法是和其他组件的一样，就可以把这个属性提取到外部的js文件
    // 之后引入这个文件就能达到复用了
    // methods: {
    //     showInfo() {
    //         alert(this.name)
    //     }
    // }
    mixins: [hunhe]
}
</script>

<style>

</style>