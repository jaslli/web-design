import Vue from 'vue'
import MessageComponent from './Message.vue'

// 创建一个实例
const getInstance = () => {
    // 通过使用extend获得构造器，在通过构造器获取实例
    const constructor = Vue.extend(MessageComponent)
    const instance = new constructor();
    // 将实例挂载到虚拟的div对象上，并将该虚拟dom对象挂载到body后面
    instance.$mount(document.createElement("div"));
    document.body.appendChild(instance.$el)
    // 返回实例
    return instance
}

// 单例模式
let instance;
const Message = options => {
    // 获取实例对象
    if (!instance) instance = getInstance()
    instance.add(options)
}

// 注册Message组件到Vue原型中
Message.install = Vue => {
    Vue.prototype.$message = Message
}

export default Message