# vuex 使用

## 一、实验介绍

### 1.1 实验内容
前一个实验中，我带领大家完成了编辑器项目的参数配置编写。让大家对整个项目有了一个大致的了解。这一节我们继续深入项目，学习 vuex 的使用方法，并在我们的项目中顺利工作。这部分内容严格来说，也应该是数据配置的内容，但是 vuex 比较重要，需要介绍的内容较多，所以单独拿出一个实验来讲解。

### 1.2 实验知识点

+ 全局状态管理
+ vuex 在项目中的使用

### 1.3 实验环境
+ 实验楼在线编程环境
+ sublime 文本编辑器
+ Xfce终端

### 1.4 适合人群
对 vuex 有一定的了解，知道vuex是作用什么。


## 二、vuex 核心概念

在之前的实验中，我有介绍过vuex的基本概念，将它比作一个中央仓库，存储着全部组件的全部共享状态。本节将继续深入学习vuex的核心概念，了解它是如何管理这些状态。

每一个 Vuex 应用的核心就是 store（仓库）。"store" 基本上就是一个容器，它包含着你的应用中大部分的**状态(state)**。Vuex 和单纯的全局对象有以下两点不同：

* Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
* 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交(commit) mutations**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

创建一个简单的 store 实例化对象：

```js
const store = new Vuex.Store({
  state: {
    count: 99
  },
  mutations: {
    add (state) {
      state.count++
    }
  }
})
```

Vuex 的核心核心概念主要包括： `State`，`Mutations`，`Actions`。

### 2.1 State 数据源

如官方所介绍，Vuex 使用单一状态树，即-使用一个对象就可以包含全部的应用层级状态，每个组件内部仅需使用 store 的一个示例，就可共享和操作全局的状态。而 state 就是 store 存放状态的对象。考虑到项目中组件较多，如果每个组件内部都采用实例化 store 示例，将是比较繁琐的工作。因此，vuex 提供了可以从根组件直接注入的方式，其下全部子组件会自动注入 store 示例，可以在各个组件内部直接访问：`this.$store.state.xxx`。

Store 对象是全局状态的数据源，而state则是数据源中，保存数据的那一部分。

在组件中获取 store 实例中 state 状态数据，最简单的方式是通过计算属性来获取：

```js
// 子组件
<template>
	<div> {{ count }} </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    count: function() {
      return this.$store.state.count
    }
  } 
}
</script>
```

在任何子组件中，都可通过这种方式获得 state 中存储的 count 的值，因为 vue 双向数据绑定的特性，一处改变，处处改变，同时触发 DOM 更新，页面也能及时展示最新数据。前提是在根组件中注入了 store 实例对象，后文会告诉你如何注入。

虽然理论上可以将任何数据放在 vuex 中，但是为了使状态更加显式和代码更容易调试，建议你尽量只把需要共享的数据使用 vuex 管理。

### 2.2 Mutations 变更

在 vuex 中，想要更改 store 中数据状态的唯一方式是通过提交 mutation。mutation 与事件类似，每个mutation包含了事件类型，和一个回调函数。真正执行状态变更的操作就是在这个回调函数中进行，它的第一个参数一般是一个 state ，即上文中提到的 state 数据源。

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

想要提交一个类型为 `increment` 的 `mutation` ，需要使用 `store.commit('increment')` 这种方式来使 store 中状态做变更。在提交 mutation 时，还可以传入额外的参数，被称为 `载荷`。一般来说，载荷是一个对象，可以一次传入多个数据，在 mutation 中可以提取出来再操作。

```js
  mutations: {
    increment (state, payload) {
      // 变更状态
      state.count += payload.number
      state.name += payload.name
    }
  }
......
store.commit('increment', {
  number: 1,
  name: 'add'
})
```

为了使 mutations 可以看起来一目了然，我们往往将motation的事件类型声明为常量，使用方法如下：

```
// mutation-types.js
export const INCREMENT = 'INCREMENT'

// store.js
import { INCREMENT } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [INCREMENT] (state) {
      // mutate state
    }
  }
})
```

在我们的项目中，也将采用这种方式来声明 `mutation` 事件类型。

## 三、vuex 项目实战

## 四、实验总结
