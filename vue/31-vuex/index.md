
# Vuex简介

专门在Vue中是实现集中式状态（数据）管理的一个Vue插件，对vue 应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任组件间通信。

> 就比如之前的全局事件总线，实现数据的读是很简单的，但是想要修改就会很困难，使用vuex就会简单很多。

# 什么时候使用Vuex

1. 多个组件依赖于同一状态
2. 来自不同组件的行为需要变更同一状态

# Vuex的工作原理

![vuex](./../vuex.png)

# 安装Vuex

1. 下载插件

   ```bash
    npm install vuex
   ```

2. 创建`store`，在根目录下创建要给store目录，里面创建一个`index.js`

   ```js
   // 该文件用于创建Vuex中核心的store

       // 引入Vuex
       import Vuex from 'vuex'
    // 引入Vue
    import Vue from 'vue'
    // 应用Vuex
    // 因为要先应用Vues才能加载完这个index.js，所以不能放到main.js中
    Vue.use(Vues)

       // 准备actions-用于响应组件的动作
       const actions = {}
       // 准备mutations-用于操作数据（state）
       const mutations = {}
       // 准备state-用于存储数据
       const state = {}


       //创建store并暴露store
       /*
        const store = new Vuex.Store({
               actions,
               mutations,
               state
           })
           export default store
       */
       export default new Vuex.Store({
           actions,
           mutations,
           state
       })

   ```

3. 在脚手架中的`main.js`中引入并使用`vuex`

   ```js
   import Vue from 'vue'``
   import App from './App.vue'
   // 引入store
   import store from './store/index.js'

   Vue.config.productionTip = false

   new Vue({
       render: h => h(App),
       store
   }).$mount('#app')

   ```

# 使用

1. 先给`store`注册一个变量。

   ```js
   import Vuex from 'vuex'
   import Vue from 'vue'
   Vue.use(Vues)

       // 准备actions-用于响应组件的动作
       const actions = {}
       // 准备mutations-用于操作数据（state）
       const mutations = {}
       // 准备state-用于存储数据
       const state = {
           sum: 0
       }

       export default new Vuex.Store({
           actions,
           mutations,
           state
       })
   ```

2. 为这个变量定义一个响应（actions）与一个操作（mutations）

   ```js
   import Vuex from 'vuex'
   import Vue from 'vue'
   Vue.use(Vues)

       // 准备actions-用于响应组件的动作
       const actions = {
           // 默认会有两个参数
           add(context, value) {
               context.commit('ADD',value)
           }
       }
       // 准备mutations-用于操作数据（state）
       const mutations = {
           // 默认两个参数
           ADD(state, value) {
               state.sum += value
           }
       }
       // 准备state-用于存储数据
       const state = {
           sum: 0
       }


       export default new Vuex.Store({
           actions,
           mutations,
           state
       })
   ```

3. 组件中的使用

   ```vue
   <template>
    <!--获取state中的数据-->
    <span>{{$store.state.sum}}</span>
   </template>

   <script>
       export default {
           data() {return {}},
           methods: {
               increment() {
                   // 触发actions中的add响应
                   this.$store.dispatch('add',1)
               }
           }
       }
   </script>
   ```

# getters配置

1. 配置

   ```js
   import Vuex from 'vuex'
   import Vue from 'vue'
   Vue.use(Vues)

       // 准备actions-用于响应组件的动作
       const actions = {
           // 默认会有两个参数
           add(context, value) {
               context.commit('ADD',value)
           }
       }
       // 准备mutations-用于操作数据（state）
       const mutations = {
           // 默认两个参数
           ADD(state, value) {
               state.sum += value
           }
       }
       // 准备state-用于存储数据
       const state = {
           sum: 0
       }
       // 准备getters-用于对state中的数据进行加工
       const getters = {
           bigSum(state) {
               return state.sum * 100;
           }
       }


       export default new Vuex.Store({
           actions,
           mutations,
           state
       })
   ```

2. 使用

   ```vue
   <template>
    <!--获取getters的数据-->
    <span>{{$store.getters.bigSum}}</span>
   </template>

   <script>
       export default {
           data() {return {}},
           methods: {}
       }
   </script>
   ```

> getters类似于计算属性，主要是处理一种复杂而且想复用的计算。

# mapState和mapGetters

```vue
<template>
 <span>{{$store.state.sum}}</span>
 <span>{{$store.state.sum}}</span>
 <span>{{$store.state.sum}}</span>
 <span>{{$store.state.sum}}</span>
</template>

<script>
    export default {
        data() {return {}}
    }
</script>
```

每次获取这个`state`中的数据都很麻烦，vue是倡导模板要简介的，所以可以放入到计算属性当中。

```vue
<template>
 <!--这样使用计算属性就会很简介了-->
 <span>{{value}}</span>
 <span>{{value}}</span>
 <span>{{value}}</span>
 <span>{{value}}</span>
</template>

<script>
    export default {
        data() {return {}},
        computed: {
            value() {
                return this.$store.state.sum
            }
        }
    }
</script>
```

所以可以使用`Vuex`中一个配置`mapState`，借助`mapState`生成计算属性。

1. 对象写法

   ```vue
   <template>
    <!--这样使用计算属性就会很简介了-->
    <span>{{value}}</span>
    <span>{{value}}</span>
    <span>{{value}}</span>
    <span>{{value}}</span>
   </template>

   <script>
       // 引入mapState（映射状态）
       import {mapState} from 'vuex'
       export default {
           data() {return {}},
           computed: {
               // 配置映射，可以写多组,因为是会返回函数的
               // 所以这样写可以为computed属性中赋值mapState里面的函数
               ...mapState({value:'sum'})
           }
       }
   </script>
   ```

2. 数组写法

   ```vue
   <template>
    <span>{{sum}}</span>
    <span>{{sum}}</span>
    <span>{{sum}}</span>
    <span>{{sum}}</span>
   </template>

   <script>
       import {mapState} from 'vuex'
       export default {
           data() {return {}},
           computed: {
               ...mapState(['sum'])
           }
       }
   </script>
   ```

`mapGetters`跟`mapState`差不多，这个主要是为了getter服务。

```vue
<template>
 <span>{{sum}}</span>
 <span>{{sum}}</span>
 <span>{{sum}}</span>
 <span>{{sum}}</span>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data() {return {}},
        computed: {
            // 对象写法
            ...mapGetters({bigSum: 'bigSum'})
            // 数组写法
            ...mapGetters(['bigSum'])
        }
    }
</script>
```
