// 插件主要是为了增强vue，能使用更多的组件，而不是自己重复造轮子
// 这里展示一下自定义的组件
export default {
    install() {
        console.log("调用了插件的install函数")
    }
}


/**
 * 自定义之后，去主要的main.js中引入该插件
 *      import plugins from '....'
 * 然后应用插件(vue会帮组调用这个install函数)
 *      Vue.use(plugins)
 */