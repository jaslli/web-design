<template>

    <!--
        - 使用props属性可以使组件接受外部的数据，使每个组件展示的数据都不一样
        - 传入的数据，尽量不要更改，vue底层会检测你对props的修改，如果进行了修改
            就会发出警告，如果真的需要修改，可以在data中创建一个副本，
            然后复制传入的值进行修改即可
    -->

    <div>
        <h1>{{msg}}</h1>
    <!-- 如果在data定义了这三个数据，那每次调用这个组件都会是固定的信息 -->
        <h2>学生姓名： {{name}} </h2>
        <h2>学生性别： {{sex}}  </h2>
        <h2>学生年龄： {{age}}  </h2>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '我正在学习Vue'
        }
    },
    /* 1. 简单的接收方法
        使用组件时传入数值，使用props属性来接收传入的数值，就可以使用了
            <xxx name="李四" sex="男" age="20"></xxx>   使用组件时传入值
            props: ['name', 'age', 'sex']               使用props接收值
        但是这样会出现一个问题。
            <xxx name="李四" sex="男" age="20"></xxx>
            <h2>学生年龄： {{age + 1}}  </h2>       显示201
        因为这里传入的是字符串，如果去掉双引号就会报错，但是这样传入的字符串就不能按照数值运算了
        所以需要给属性进行绑定，这样之后的运算就可以按照数值进行了
            <xxx name="李四" sex="男" :age="20"></xxx>   给age加入个v-bind
            <h2>学生年龄： {{age + 1}}  </h2>        显示21
    */
    //  props: ['name', 'age', 'sex']



    /* 2. 限制接收的方法
            限定接收的数据的数据类型
            这样虽然显示也是字符串相加，但是控制台时会有警告，告诉你接收数据错误
                props: {
                    name: String,
                    age: Number,
                    sex: String
                }
    */


    /*
        3. 比较好的写法
            - type表示数据的类型
            - required: true    表示这个值时必须传入的，不传入就会报错
            - default: 99       表示没传入该值就给该值赋予一个99的默认值
        这里不用v-bind绑定传入年龄，结果会跟第二种方法一样，会在控制台出现警告，结果也只会是字符串相加
    */
    props: {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            default: 99
        },
        sex: {
            type: String,
            required: true
        }
    }

}
</script>

<style>

</style>