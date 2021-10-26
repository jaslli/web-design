# vue-router简介

vue的一个插件库，专门实现单页面WEB应用。

# 使用路由器

1. 下载路由插件

   ```bash
    npm install vue-router
   ```

2. 创建路由器(./src/router/index.js)

   ```js
   // 该文件专门用于创建整个应用的服务器

   import VueRouter from 'vue-router';

   // 引入组件
   import About from '../component/About'
   import Home from '../component/Home'

   // 创建并暴露一个路由器
   export default new VueRouter({
       routes: [
           {
               path: '/about',
               component: About
           },
           {
               path: '/home',
               component: Home
           }
       ]
   });
   ```

3. 在主文件(main.js)中导入并使用该插件，并将暴露的路由器导入

   ```js
   import Vue from 'vue'
   import App from './App.vue'
   // 引入vue-router插件
   import VueRouter from 'vue-router'
   // 引入创建好的路由器
   import router from './router/index'
   Vue.config.productionTip = false

   // 使用vue-router插件
   Vue.use(VueRouter)

   new Vue({
     render: h => h(App),
     router: router
   }).$mount('#app')
   ```

4. 改变跳转页面的方式

   ```html
             <!-- 原始方法跳转 -->
             <!-- <a class="active" href="./about.html">About</a> -->
             <!-- <a href="./home.html">Home</a> -->

             <!-- 使用router跳转 -->
       <!-- 使用router-link代替a标签，使用to属性代替href属性 -->
       <!-- active-class用来表示激活时的特效 -->
             <router-link active-class="active" to="/about">About</router-link>
             <router-link active-class="active" to="/home">Home</router-link>
   ```

5. 指定组件的呈现位置

   ```html
    <router-view></router-view>
   ```

> 每个需要切换的组件都有自己的`$route`属性，里面存储着自己的路由信息。
>
> 每一个组件也会存储整个应用唯一的`$router`属性。

# 多级路由

配置路由。

```js
import VueRouter from 'vue-router';

import About from '../pages/About'
import Home from '../pages/Home'

export default new VueRouter({
    routes: [
        {
            path: '/about',
            component: About,
            // 使用children,为这个一级路由配置二级路由
            children: [{
                // 注意这个位置是不需要添加 / 的
                path: 'child',
                component: Child,
            }]
        },
        {
            path: '/home',
            component: Home
        }
    ]
});
```

配置路由跳转链接。

```html
 <router-link active-class="active" to="/home/child">Child</router-link>
```

# 路由的query参数

该参数主要是用于父路由给子路由进行传递参数使用的。

- 传递参数

  ```html
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <!-- 对to参数进行绑定，然后里面用反引号``开始拼接 -->
   <router-link :to="`/home/Child?id=${item.id}&name=${item.name}`">Child</router-link>

   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link :to="{
          path: '/home/child',
          query: {
            id: item.id,
            name: item.name
            }
     }">
      Child
     </router-link>
  ```

- 接收参数

  ```html
   <!-- 使用$route.query获取参数 -->
   {{$route.query.id}}
   {{$route.query.name}}
  ```

# 命名路由

可以为每个路由起一个名字，然后通过名字来简化一些长URL的跳转。

```js
import VueRouter from 'vue-router';
import About from '../pages/About'
import Home from '../pages/Home'

export default new VueRouter({
    routes: [
        {
            name: 'hello',
            path: '/about',
            component: About,
            children: [{
                path: '/about',
                component: About,
            }]
        },
        {
            path: '/home',
            component: Home
        }
    ]
});
```

简化的路径就可以这样写。

```html
 <router-link :to="{name: hello}">Child</router-link>
```
