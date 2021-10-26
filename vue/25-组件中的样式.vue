<template>
</template>

<script>
export default {

}
</script>


<style>
/*
    这里的style写的样式，会出现与其他组件混合的问题。
        比如在本组件写入 .demo 的样式，其他组件也可能会写 .demo 的样式
        这样就会出现冲突，很容易把本组件的样式给覆盖掉
    所以要使用scoped来限制样式只在本组件中生效
*/

</style>

<style scoped></style>

<style lang='css'>
    /*
        这里的lang代表可以选择的，默认是css，也可以选择less来编写样式
            如果使用less来编写，需要先安装依赖
                npm install less-loader
            不过要注意，vue-cli中使用的webpack的版本不一定是最新的
                默认下载的less-loader是最新的，可能会出现版本兼容问题，
                可以自己选用兼容的less-loader的版本下载
    */
</style>