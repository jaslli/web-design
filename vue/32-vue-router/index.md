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

# query参数

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





# params参数

该参数的作用与`query`参数差不多，都是为了子组件传递参数。

- 传递参数

  1. 首先需要去路由器中给路径绑定参数

     ```js
     import VueRouter from 'vue-router';
     import About from '../pages/About'
     import Home from '../pages/Home'
     
     export default new VueRouter({
         routes: [
             {
                 // 给路径绑定id和name两个参数
                 name: 'hello',
                 path: '/about/:id/:name',
                 component: About
             },
             {
                 path: '/home',
                 component: Home
             }
         ]
     });
     ```

  2. 跳转时携带参数

     ```html
      <!-- 跳转并携带params参数，to的字符串写法 -->
      <!-- 对to参数进行绑定，然后里面用反引号``开始拼接 -->
      <router-link :to="`/about/Child/${item.id}/${item.name}`">About</router-link>
     
     <!-- 跳转并携带params参数，to的对象写法 -->
     <!-- 这里需要注意的是，不能使用path属性，必须要使用命名的路由，不然会跳转失败的 -->
      <router-link :to="{
             path: 'hello',
             params: {
               id: item.id,
               name: item.name
             }
        }">
         About
        </router-link>
     ```

- 接收参数

  ```html
   <!-- 使用$route.params获取参数 -->
       {{$route.params.id}}
       {{$route.params.name}}
  ```





# 路由的props配置

## 对象写法（固定的值，不常用）

1. 首先去路由器配置`props`参数。

   ```js
   import VueRouter from 'vue-router';
   import About from '../pages/About'
   import Home from '../pages/Home'
   
   export default new VueRouter({
       routes: [
           {
               path: '/home',
               component: Home,
               // 值为对象，把该对象的键值对以Props的形式传递给Home组件
               props: {
                   a: 1,
                   b: 'hello'
               }
           }
       ]
   });
   ```

2. 然后在`Home`组件中就能接收到该值。

   ```vue
   <template>
       <h2>我是Home的内容</h2>
       <span>a：{{a}}</span>
       <span>b：{{b}}</span>
   </template>
   
   <script>
   export default {
       name: 'Home',
       props: ['a','b']
   }
   </script>
   ```

   

## 布尔值写法

1. 首先去路由器配置`props`参数。

   ```js
   import VueRouter from 'vue-router';
   import About from '../pages/About'
   import Home from '../pages/Home'
   
   export default new VueRouter({
       routes: [
           {
               name: hello,
               path: '/home',
               component: Home,
               // 值为布尔值，true表示把该路由收到的所有params参数以props的形式传给Home组件
               props: true
           }
       ]
   });
   ```
   
2. 然后在`Home`组件中就能接收到该值。

   ```vue
   <template>
       <h2>我是Home的内容</h2>
       <span>a：{{a}}</span>
       <span>b：{{b}}</span>
   </template>
   
   <script>
   export default {
       name: 'Home',
       // 接收父组件传递的params参数，具体传递方式参考上述的params参数小节
       // 只能接收params的参数
       props: ['id','name']
       // 之前的使用方式		this.$route.params.id
   }
   </script>
   ```



# 函数写法

1. 首先去路由器配置`props`参数。

   ```js
   import VueRouter from 'vue-router';
   import About from '../pages/About'
   import Home from '../pages/Home'
   
   export default new VueRouter({
       routes: [
           {
               name: hello,
               path: '/home',
               component: Home,
               // 值为函数，返回一个参数对象，有个默认的参数，$route，一个使用组件的路由
               props($route) {
                   return {
                   	id:$route.query.id,
                       name:$route.query.name
                   }
               }
               
               // 简约写法
               props({query}) {
                   return {
                   	id:query.id,
                       name:query.name
                   }
               }
                                
               // 更简约写法
               props({query:{id,name}}) {
                   return { id, name}
               }
   
           }
       ]
   });
   ```
   
2. 然后在`Home`组件中就能接收到该值。

   ```vue
   <template>
       <h2>我是Home的内容</h2>
       <span>a：{{a}}</span>
       <span>b：{{b}}</span>
   </template>
   
   <script>
   export default {
       name: 'Home',
       // 路由器中配置的是query的参数，所以传递的参数要传递query的
       props: ['id','name']
   }
   </script>
   ```



# 路由器的replace属性

正常的模式是存在历史记录的，每次点击切换都能通过浏览器的前进按钮或者是后退按钮访问之前的浏览纪录（路由）。

如果使用`replace`的模式，就代表记录只有一条，每次都会用新的记录代替掉旧的记录，并不会存储旧的记录。



```html
	<!-- 完整的写法  -->
	<router-link :replace='true' :to="{name: hello}">Home</router-link>
	<!-- 简写  -->
	<router-link replace :to="{name: hello}">Home</router-link>
```



# 编程式路由导航

## 路由的跳转

不借助`router-link`的跳转方式，比如在按钮上实现跳转。

```vue
<template>
    <h2>我是Home的内容</h2>
    <ul>
        <li v-for="item in list" :key="item.id">
            {{item.name}}
            <button @click='push(item)'>push跳转</button>
            <button @click='replace(item)'>replace跳转</button>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            list:[]
        }
    },
    methods: {
        // push模式的跳转，使用了路由器的push函数，内容与之前的一样
        push(item) {
            this.$router.push({
                name: 'hello',
                query: {
                    id: item.id,
                    name: item.name
                }
            })
        },
        // replace模式的跳转，使用了路由器的replace函数
        replace(item) {
            this.$router.replace({
                name: 'hello',
                query: {
                    id: item.id,
                    name: item.name
                }
            })
        }
    }
}
</script>
```



## 路由的前进与后退

```vue
<template>
    <h2>我是Home的内容</h2>
    <ul>
        <li v-for="item in list" :key="item.id">
            {{item.name}}
            <button @click='push(item)'>push跳转</button>
            <button @click='replace(item)'>replace跳转</button>
            <button @click='back'>历史前进</button>
            <button @click='forward'>历史后退</button>
            <button @click='go'>测试go</button>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            list:[]
        }
    },
    methods: {
        ...省略了跳转的方法
        // 使用路由器的back函数进行历史后退
        back() {
            this.$router.back()
        },
        // 使用路由器的forward函数进行历史前进
        forward() {
            this.$router.forward()
        },
        // 使用路由器的go函数进行历史跳转
        go() {
            // 正数代表前进，负数代表后退，数字大小代表步数
            this.$router.go(2)
        }
    }
}
</script>
```





# 缓存路由组件

路由切换，被切走的组件是会被销毁的，所以会存在一些体验上的问题，比如在某个组件输入了表单，切走了之后回来，因为组件被销毁了，又要重新输入，是很影响体验的，所以需要让某个路由不被销毁。

```html
	<!-- 组件展示的时候给它套一层keep-alive标签，这样就能将目标路由缓存下来 -->
	<!-- 不过一般不会缓存所有的路由，所有搭配include属性指定哪些组件是要缓存的 -->
	<!-- include属性写的是组件名 -->
	

	<!-- 缓存一个 -->
	<keep-alive include="About">	
		<router-view></router-view>	
	</keep-alive>

	<!-- 缓存多个 -->
	<keep-alive :include="['Home','About']">
		<router-view></router-view>	
	</keep-alive>
```





# 路由的两个特殊的生命周期钩子

```vue
<template>
    <h2>我是Home的内容</h2>

    <!--
        在一些场景，希望把组件给缓存
        假如组件会有一些任务在执行，切走了路由之后，
        组件还是会继续执行任务不糊停止，vue不希望这样
        于是就出现了两个路由的特殊的生命周期函数

        1. activated
        2. deactivated

        激活的意思就代表是否正在使用该路由
    -->

</template>

<script>
export default {
    name: 'Home',
    activated() {
        console('Home组件被激活了')
    },
    deactivated() {
        console('Home组件失去激活')
    }
}
</script>

<style>

</style>
```



# 路由守卫

路由守卫主要的目的是为了限制路由的跳转，比如某些路由是不允许普通用户跳转的，类似于vue组件里的权限控制。

为路由器配置路由守卫。

## 前置路由守卫

```js
import VueRouter from 'vue-router';
import About from '../pages/About'
import Home from '../pages/Home'

const router = new VueRouter({
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

// 全局前置路由守卫（即初始化和每次路由切换之前都会被调用）
/*
    默认三个参数
        1. to       目标路由的信息
        2. from     来自的路由信息
        3. next     放行函数，在守卫中使用了该函数才能允许路由跳转
*/
router.beforeEach((to, from, next) => {
    // 假设你去的Home的路由，如果存储的token不是yww，就不能放行
    if (to.path === '/home') {
        if (localStorage.getItem('token') === 'yww') {
            next()
        } else {
            alert('无权限查看该内容')
        }
    } else {
        next()
    }
})

export default router
```



## 配置路由是否需要校验

```js
import VueRouter from 'vue-router';
import About from '../pages/About'
import Home from '../pages/Home'

const router = new VueRouter({
    routes: [
        {
            path: '/about',
            component: About,
            // 使用meta就能让路由查看到该信息，然后路由守卫中进行判断即可
            meta: {isAuth: true}
        },
        {
            path: '/home',
            component: Home
        }
    ]
});

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
    // 前面配置的isAuth为真就是需要判定权限的路由，此时进行判定即可
    if (to.meta.isAuth) {
        if (localStorage.getItem('token') === 'yww') {
            next()
        } else {
            alert('无权限查看该内容')
        }
    } else {
        next()
    }
})

export default router
```





## 后置路由守卫

```js
import VueRouter from 'vue-router';
import About from '../pages/About'
import Home from '../pages/Home'

const router = new VueRouter({
    routes: [
        {
            path: '/about',
            component: About,
            // 使用meta就能让路由查看到该信息，比如设置给页面标题
            meta: {title: '这是About组件'}
        },
        {
            path: '/home',
            component: Home，
            meta: {title: '这是Home组件'}
        }
    ]
});

// 全局后置路由守卫(即初始化时和每次路由切换之后被调用)
// to和from参数和前置路由守卫一样
// 作用并不是很大，可以切换一些独有的路由信息，比如网页标题等
router.afterEach((to, from) => {
    document.title = to.meta.title || 'yww'
})


export default router
```



## 独享路由守卫

```js
import VueRouter from 'vue-router';
import About from '../pages/About'
import Home from '../pages/Home'

const router = new VueRouter({
    routes: [
        {
            path: '/about',
            component: About,
            // 独享的路由守卫是没有后置的
            beforeEnter: (to, from, next) {
            	console.log('about的前置路由守卫触发')
        		next()
        	}
        },
        {
            path: '/home',
            component: Home
        }
    ]
});



export default router
```





## 组件路由守卫

```vue
<template>
    <h2>我是Home的内容</h2>
</template>

<script>
export default {
    name: 'Home',
    methods: {
        // 注意是通过路由规则，比如直接使用组件展示是不会触发这两个路由守卫的
        
        // 通过路由规则进入之前会触发
        beforeRouteEnter (to, from, next) {
            console.log('进入Home组件之前触发')
            next()
        },
        // 通过路由规则离开之前会触发
        beforeRouteLeave (to, from, next) {
            console.log('离开Home组件之前触发')
            next()
        }
    }
}
</script>

<style>

</style>
```





# 路由器的模式

```js
import VueRouter from 'vue-router';
import About from '../pages/About'
import Home from '../pages/Home'

const router = new VueRouter({
    /**
     * 路由的模式有两种
     *  1. hash			兼容性相对好
     *  2. history		兼容性相对差
     *      - 默认是hash模式，即路由路径中会携带#号，这样的路径发送请求会忽略掉#之后的路径
     *      - history模式是没有带#号的
     */
    mode: 'hash',
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


export default router
```

