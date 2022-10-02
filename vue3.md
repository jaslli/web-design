# setup函数

1. vue3中增添的一个函数，顾名思义，是一个设置函数，主要的目的就是为了代替之前date，methods等函数，用来设置变量和方法的一个函数。

 	2. 组件中所有需要使用的数据，方法，都需要配置在setup函数里面
 	3. setup函数有两种返回值
     - 返回一个对象，这个对象包含了定义的属性，方法等
     - 返回一个渲染函数，可以自定义渲染内容
 	4. vue2中的配置可以访问到setup函数里的数据，但是setup无法访问到vue2的配置数据，因为setup使用不了this来访问当前的数据和方法

使用例子

```vue
<template>
  <div>
    开始组件
  </div>
  <button @click="sayHello">点击</button>
</template>


<script>

  export default {
    name: 'App',
    setup() {
      let name = 'hello world'

      function sayHello() {
        console.log('hello world')
      }
      return {
        name,
        sayHello
      }
    }
  }

</script>
```



- setup函数是在beforeCreate之前执行的，它是用不了this来获取到当前对象的

-  setup函数是有两个参数的，props和context

  1. props，是外部组件传入的参数

     ```vue
     <template>
       <div>
         {{ person.name }}
       </div>
     </template>
     <script>
       import { reactive } from 'vue'
       export default {
         name: 'App',
         props: ['msg'],
         setup(props) {
           console.log(msg)
           let person = reactive({
             name: 'me',
             age: 18
           })
           return {
             person
           }
         }
       }
     
     </script>
     ```

  2. context，上下文，是一个简单的对象，比较常用的是下面这三个属性

     - `attrs`，这个值是一个对象，里面是外部组件传入，且没有在props中声明的参数，相当于vue2中的`this.$attrs`
     - `slots`，这个值是外部组件传入的插槽内容，相当于vue2中的`this.$slots`
     - `emit`，分发自定义事件的函数，相当于vue2中的`this.$emit`



# ref函数和reactive函数

1. vue3中的setup函数设置的数据，不是响应式的，即你用方法改变了一个数据，但是这个数据的变化是不会被察觉到的，vue上的数据也不会进行改变，这跟vue2是有区别的，所以需要我们手动的去设置响应式的数据。
2. 设置响应式的数据需要用到`ref`和`reactive`这两个函数。

## ref函数

- ref函数是用来定义一个响应式数据的

- ref函数可以用来定义一个变量或者是定义一个对象

- ref函数定义的变量或者对象，都会被封装成一个ref对象，所以定义好的ref函数的取值就要读取到对象中的`.value`，当然模板读取就可以省略掉

- 使用ref函数前，得先从vue中导入这个函数

  > import { ref } from 'vue'

```vue
<template>
  <div>
    {{ name }}
  </div>
  <button @click="updateName">点击修改上面的名字</button>
</template>
<script>
  import { ref } from 'vue'
  export default {
    name: 'App',
    // 这样子修改，点击了按钮之后，上述模板的值改变了，但是页面不会重新渲染
    // setup() {
    //   let name = 'hello world'

    //   function updateName() {
    //     name = 'hello myself'
    //   }
    //   return {
    //     name,
    //     updateName
    //   }
    // }
    setup() {
      let name = ref('hello world')
      function updateName() {
        name.value = 'hello myself'
      }
      return {
        name,
        updateName
      }
    }
  }
</script>
```



## reactive函数

- 这个函数的作用与ref函数类似，是用来定义一个响应式的数据，该数据只能是一个对象或者是数组，如果用reactive函数去定义一个响应式的基本数据类型，就会报错

- reactive函数接收数据之后，会将数据封装，并返回一个代理对象

- 使用reactive函数之前，需要从vue中导入

  > import { reactive } from 'vue'

```vue
<template>
  <div>
    {{ person.name }}
  </div>
  <div>
    {{ person.age }}
  </div>
  <button @click="updateName">点击修改上面的名字</button>
</template>
<script>
  import { reactive } from 'vue'
  export default {
    name: 'App',
    setup() {
      let person = reactive({
        name: 'me',
        age: 18
      })
      function updateName() {
        person.name = 'you'
        person.age = 23
      }
      return {
        person,
        updateName
      }
    }
  }

</script>
```



# 计算属性（computed）

- vue3中的计算属性，也可以使用vue2的方式，但是还是不建议的
- 使用计算属性还需要从vue中引入函数

```vue
<template>
  <div>
    名字： {{ person.name }}
  </div>
  <div>
    年龄： {{ person.age }}
  </div>
  <div>
    计算属性得到的个人信息{{ personInfo }}
  </div>
</template>
<script>
  import { reactive, computed } from 'vue'
  export default {
    name: 'App',
    setup() {
      let person = reactive({
        name: 'me',
        age: 18
      })
      // 计算属性,简写模式,当前值为只读
      let personInfo = computed(() => {
        return person.name + person.age
      })
      // 完整写法是需要写set和get方法的
      let personInfo1 = computed({
        get() {},
        set(value) {}
      })
      return {
        person,
        personInfo
      }
    }
  }

</script>
```

# 监视函数（watch）

- 使用监视函数，需要先从vue中引入
- 监视函数有三个值
  1. 监视的变量
  2. 监视变化的函数
  3. 配置
- 监视reactive定义的数据时，无法获得正确的`oldValue`，但是ref函数定义的数据就可以，不过使用ref来定义一个对象，也是借用reactive，所以也无法获得正确的`oldValue`
- 当watch监视的是reactive定义的数据时，是强制开启深度监视的，无法通过`deep: false`配置来关闭
- 当watch监视的是reactive数据中的一个对象属性，即下述的特殊情况，是需要开启深度监视才能监视里面的该对象的变化

```vue
<template>
  <div>
    当前求和为：  {{ sum }}
  </div>
  <button @click="sum++">点我自增</button>
  <div>
    当前消息为：  {{ msg }}
  </div>
  <button @click="msg+='!'">点我消息会增加一个感叹号</button>

  <div>
    当前人的名字为：  {{ person.name }}
  </div>
  <button @click="person.name+='!'">点我名字会增加一个感叹号</button>
  <div>
    当前人的年龄为为：  {{ person.age }}
  </div>
  <button @click="person.age++">点我年龄会自增</button>
</template>
<script>
  import { reactive, ref, watch } from 'vue'
  export default {
    name: 'App',
    setup() {
      let sum = ref(0)
      let sum1 = ref(0)
      let msg = ref('helo world')
      let person = reactive({
        name: 'me',
        age: 18,
        job: {
          le: {
            type: 'you'
          }
        }
      })

      // 监视函数

      // 监视函数的配置
      watch(sum1, (newValue, oldValue) => {
        console.log('当前的值变化',newValue, oldValue)
      },{ immediate: true })


      // 情况一，监视ref定义的一个响应式数据
      watch(sum, (newValue, oldValue) => {
        console.log('当前的值变化',newValue, oldValue)
      })
      // 情况二，监视ref定义的多个响应式数据
      // 此时的newValue和oldValue是数组，记录了两个值的变化值
      watch([sum, msg], (newValue, oldValue) => {
        console.log('sum或msg变化了',newValue, oldValue)
      })
      // 情况三，监视reactive定义的响应式对象
      // 无法获得正确的oldValue，但是ref函数定义的数据就可以
      watch(person,(newValue, oldValue) => {
        console.log('人的信息变化了',newValue, oldValue)
      })
      // 情况四，监视reactive定义对象中的其中一个属性
      // 不能使用person.name，需要使用()=> person.name
      watch(() => person.name, (newValue, oldValue) => {
        console.log('人的名字变化了',newValue, oldValue)
      })
      // 特殊情况，监视reactive定义对象中的一个对象的变化
      // 只检测该对象是无法检测到对象中属性的变化的，需要开启deep: true配置
      watch(() => person.job, (newValue, oldValue) => {
        console.log('人的工作变化了',newValue, oldValue)
      },{deep: true})
      return {
        sum,
        msg,
        person
      }
    }
  }

</script>
```



# watchEffect函数

- 这个函数也能用来做监视，不过不能指定监视的对象，它的参数只有一个回调函数
- watchEffect函数默认开启深度监视
- 该函数监视的对象取决于你在回调函数中使用的数据，即使该数据是很深层次的数据，也能检测到变化

```
<template>
  <div>
    当前求和为：  {{ sum }}
  </div>
  <button @click="sum++">点我自增</button>
  <div>
    当前消息为：  {{ msg }}
  </div>
  <button @click="msg+='!'">点我消息会增加一个感叹号</button>

  <div>
    当前人的名字为：  {{ person.name }}
  </div>
  <button @click="person.name+='!'">点我名字会增加一个感叹号</button>
  <div>
    当前人的年龄为为：  {{ person.age }}
  </div>
  <button @click="person.age++">点我年龄会自增</button>
</template>
<script>
  import { reactive, ref, watchEffect } from 'vue'
  export default {
    name: 'App',
    setup() {
      let sum = ref(0)
      let msg = ref('helo world')
      let person = reactive({
        name: 'me',
        age: 18,
        job: {
          le: {
            type: 'you'
          }
        }
      })

      // watchEffect函数
      // 更注重执行过程，没有什么数据返回
      watchEffect(() => {
        let k = sum
        let t = person.age
        console.log('sum值或者是person.age的值发生了变化')
      })

      return {
        sum,
        msg,
        person
      }
    }
  }

</script>
```

# vue3的生命周期

- vue3的生命周期函数和vue2差不多，只有最后一组不一样，因为vue3已经不使用销毁这个概念了，现在用的是卸载

- vue3的生命周期的图可以参考官网

![vue3生命周期](https://cn.vuejs.org/assets/lifecycle.16e4c08e.png)





# 自定义hook函数

- hook本质是一个函数，把setup函数中的使用的数据和方法进行了封装，组合式API

比如下面封装一个获取鼠标坐标的函数。

```js
import { reactive, onMounted, onBeforeMount } from "vue"
export default function() {
  // 鼠标坐标的数据
  let point = reactive({
    x: 0,
    y: 0
  })
  // 鼠标保存
  function savePoint(event) {
    point.x = event.pageX
    point.y = event.pageY
    console.log(event.pageX, event.pageY)
  }
  // 鼠标点击的生命周期钩子
  // 当挂载之后获取鼠标坐标
  onMounted(() => {
    window.addEventListener('click',savePoint)
  })
  // 当卸载之后移除这个click事件
  onBeforeMount(() => {
    window.removeEventListener('click',savePoint)
  })
  return point
}
```

```vue
<template>
  <div>
    当前点击时鼠标的坐标为： x: {{point.x}} y: {{point.y}}
  </div>
</template>
<script>
  import { userPoint } from '../src/hooks/test'
  export default {
    name: 'App',
    setup() {
      let point = userPoint()
      return {
        point
      }
    }
  }

</script>
```



# toRef函数

- toRef函数会创建一个ref对象，其value值指向另一个对象中的某个属性
- 常用情况是，重新定义了一个变量去接收一个响应式数据，但是这个变量不是响应式的，所以失去了响应式

- 使用了toRef函数，实际上读取的是person的属性，有点像建立一个连接

```vue
<template>
  <div>
    当前人的名字为：  {{ name }}
  </div>
  <button @click="name+='!'">点我名字会增加一个感叹号</button>
  <div>
    当前人的年龄为为：  {{ age }}
  </div>
  <button @click="age++">点我年龄会自增</button>
  <div>
    person的属性其实为： {{person.name}}  {{person.age}}
  </div>
</template>
<script>
  import { reactive, toRef } from 'vue'
  export default {
    name: 'App',
    setup() {
      let person = reactive({
        name: 'me',
        age: 18,
        job: {
          le: {
            type: 'you'
          }
        }
      })

      // toRef实际上读取的是person的属性，有点像建立一个连接
      // 上述的person属性改了，也会影响到toRef的value
      // 获取person对象中的name属性
      // let name = toRef(person, 'name')
      // 获取person对象中的name属性
      // let age = toRef(person, 'age')

      // 返回一个对象，这样会失去响应式
      // 因为重新定义变量，所以会失去响应式
      // return {
      //   name: person.name,
      //   age: person.age
      // }
      // 虽然这样写name和age有响应，但是click事件改的其实不是person的属性，是新创建的ref的属性
      // return {
      //   name: ref(person.name),
      //   age: ref(person.age)
      // }
      
      // 实际用法
      // return {
      //   name：toRef(person, 'name'),
      //   age: toRef(person, 'age'),
      //   person
      // }

      // 比较简洁的写法
      return {
        person,
        // 由于不能返回对象，所以可以在后面添加属性
        ...toRef(person)
      }
    }
  }

</script>
```



# shallowReactive和shallowRef

- shallow顾名思义，浅的，这里表示的就是浅层次的
- 这两个是用来定义浅层测的响应式数据的
- shallowReactive只处理对象最外层的响应式数据
- shallowRef只处理基本数据类型的响应式，不处理对象的响应式



# readonly和shallowReadonly

- readonly让一个响应式数据变为一个只读的数据，而且是深只读
- shallowReadonly让一个响应式数据变为只读的，是浅只读
- 浅只读表示对象的第一层次的数据不能修改，但是深层次的数据依然还存在着响应式
- 这两个函数主要目的是为了保证数据不被修改



# toRaw和markRaw

- Raw意思可以理解为原始的，ref和reactive表示的是将数据变为可响应式的数据，toRaw就是将可响应式的数据转化为原始的数据
- toRaw只能处理reactive生成的响应式对象，而ref生成的数据是不能够处理的
- markRaw表示为将某个数据标记为原始数据，后续的处理中是不会将这个数据变成响应式的数据的



# customRef

- 创建一个自定义的ref，并对其依赖项跟踪和更新触发进行显形控制
- 这个API的参数是一个函数，该函数需要返回get和set方法
- 传入的函数里面有两个参数
  - track，这个函数用于通知vue去追踪数据的改变，如果不使用，即使数据改变了也不会返回到模板当中
  - trigger，这个函数是用于通知vue去重新解析模板
- 有点类似于计算属性，主要是用于自己去写ref的监听逻辑

```js
      // 改变数据后一秒钟，才会去更改响应式数据
      function myRef(value) {
        // 控制一个全局定时器，避免定时器开多导致的数据问题
        let timer
        // track  通知vue去追踪value的变化
        // trigger  通知vue去重新解析模板
        return customRef((track, trigger) => {
          return {
            get() {
              console.log(`有人读取数据，当前数据为${value}`)
              track()
              return value
            },
            set(newValue) {
              clearTimeout(timer)
              timer = setTimeout(() => {
                value = newValue
                console.log(`有人更改数据，更改后的数据为${value}`)
                trigger()
              }, 1000)
            }
          }
        })
      }

      let text = myRef('hello world')
```



# provide和inject

- 这两个API主要是用于实现给后代组件传递数据

- 在当前组件当中使用provide去提供一个数据

  ```js
  setup() {
  	let car = reactive({
          name: 'll',
          price: 40
      })	
      provide('car', car)
  }
  ```

- 在子组件当中去获取数据

  ```
  setup() {
  	let car = inject('car')
  }
  ```



# 判断响应式数据的有关的API

- isRef， 检查一个数据是否为一个ref对象
- isReactive，检查一个数据是否是有reactive去创建的
- isReadonly，检查一个数据是否有readonly创建的
- isProxy，检查一个数据是否有reactive或者是readonly创建的



# 组合式API

- vue2中的模式是配置式的API，vue3推荐的是组合式的API。

- 着两种方式有点类似于面向过程和面向对象的思路。



# vue3中新的组件

## Fragment

- vue2中，组件必须有一个根标签
- vue3中，组件可以没有根标签，内部会将多个标签包含在一个Fragment虚拟元素当中

## Teleport

- Teleport组件可以将当中的html结构移动到指定的位置
- 比如将深层次的组件html的结构直接移动到body的标签下面

```vue
  <Teleport to="body">
    <div>
      需要移动的内容
    </div>
  </Teleport>
```

## Suspense

等待异步组件时渲染的备用内容

- 引入异步组件

  ```js
  import { defineAsyncComponent } from 'vue'
  const Child = defineAsyncComponent(() => import('./components/Child.vue'))
  ```

- 使用Suspense组件

  ```vue
  <template>
  	<div>
          当前组件
          <Suspense>
             <!-- 需要展示的结构 --> 
      		<template v-slot:default>
      			<Child/>
      		</template>
  			<!-- 在加载Child时，替代Child展示的结构 -->
              <template v-slot:fallback>
      			当前的Child组件还在加载中
      		</template>
      	</Suspense>
      </div>
  </template>
  ```



# 全局配置

之前在vue2中配置全局的API和配置的时候，使用了Vue的方法，但是vue3中是没有Vue的。

```js
//注册全局组件
Vue.component('MyButton', {
  data: () => ({
    count: 0
  }),
  template: '<button @click="count++">Clicked {{ count }} times.</button>'
})

//注册全局指令
Vue.directive('focus', {
  inserted: el => el.focus()
}
```

现在vue3为了解决这个问题，就调整了一下配置的方法。vue3中把Vue中的一些方法转移到应用实例app上了。

|   vue2的全局API（Vue）   |    Vue3的实例API（app）     |
| :----------------------: | :-------------------------: |
|     Vue.config.xxxx      |       app.config.xxxx       |
| Vue.config.productionTip |           移除了            |
|      Vue.component       |        app.component        |
|      Vue.directive       |        app.directive        |
|        Vue.mixin         |          app.mixin          |
|         Vue.use          |           app.use           |
|      Vue.prototype       | app.config.globalProperties |



