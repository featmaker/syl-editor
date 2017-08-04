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

想要提交一个类型为 `increment` 的 `mutation` ，需要使用 `store.commit('increment')` 这种方式来使 `store` 中状态做变更。在提交 `mutation` 时，还可以传入额外的参数，被称为 `载荷`。一般来说，载荷是一个对象，可以一次传入多个数据，在 `mutation` 中可以提取出来再操作。

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

> 注意：在一个 mutation 中，回调函数必须是同步函数，因为在回调函数中进行的状态更改是不可被追踪的。

为了使 mutations 可以看起来一目了然，我们往往将 `mutation` 的事件类型声明为常量，使用方法如下：

```js
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

将所有常量存放在单独的文件中，便于管理和查看。在我们的项目中，也将采用这种方式来声明 `mutation` 事件类型。

### 2.3 Action 动作

其实官方文档也没有说这个 Action 的中文是什么，我这里称为动作可能不太严谨，大家可以了解他的作用再理解它的含义。

前面说过，我们想要更改 store 的数据，只能通过commit 的方式提交一个对应的 mutation，在具体的mutation中，可以接受 state 和 payload 连个参数，然后修改 state 的数据。但是 mutation 中的回调函数必须是同步函数，即不可包含异步操作。

Action 与 mutation 类似，但是它具有以下两个特点：

> 1. Action 提交的是 mutation，而不是直接变更状态
> 2. Action 中可以包含任意的异步操作

Action 的使用方式同 mutation 类似：

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

上面的代码，可能很容易看出 action 是如何调用 mutation 。一个 action 就是一个函数，它的第一个参数接受一个与 store 实例具有相同方法和属性的 context 对象，所以当调用 `context.commit('increment')`时，其实作用与 `store.commit('increment')` 作用是相同的。如果你对 ES6 有一定的了解，知道解构这个概念，那么我们就可以利用参数解构的方式，简写为如下形式：

```js
actions: {
  //使用参数解构
  increment ({ commit }) {
    commit('increment')
  }
}
```

那么如何在组件中使用呢？答案是 `store.dispatch('name')` 。比如在我们的单文件组件内部，你可以这样使用：

```js
this.$store.dispatch('increment')
```

这样做叫做分发 `action` ，再通过 `action` 去提交 `mutation`，最后在 `mutation` 中修改 `store` 中的状态。

为什么需要使用分发 `action` 提交 `mutation`，而不是直接分发 `mutation` 直接修改？原因是因为二者最大的一个区别是：`mutation` 回调函数中，不能包含异步操作，所有代码都必须是同步的。而在 `action` 的函数中，可以包含异步操作，在异步操作完成之后，再去提交 `mutation` 执行同步操作，这样就可以弥补 `mutation` 的缺点。

```js
actions: {
  asyncAction ({ commit }) {
    //执行异步操作
    $.post('url', function(data) {
      if(data.status == 'success') {
        //异步操作完成后提交 mutation
        commit('increment')
      }
    })
  }
}
```

在分发 `action` 的同时，也可以传入载荷(payload)，同提交 `mutation` 类似。

```js
// payload = { number: 1, name: 'shiyanlou'}
this.$store.dispatch('increment', payload)
```

## 三、vuex 项目实战

本节内容将以我们的项目为基础，配置和编写适用于我们项目的 Vuex ，来管理整个项目的状态。

首先，需要先安装 vuex。通过 vue-cli 安装的项目并没有安装 vuex ，所以需要自己手动安装。

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3397timestamp1501817324668.png/wm)

安装完成之后，就可以开始使用 vuex 了。

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3397timestamp1501823426817.png/wm)

新建目录结构如上图。从文件名可以看出其对应的作用，下面一一介绍。

### 3.1 Action 文件

即图中的 `action.js` 。里面存放着各个 action，每个 action 都对应着一个 mutation。我先贴出源码，再讲解：

```js
export default {
  	//展示下拉框
    showDropList({ commit }, data) {
        commit('SHOW_DROP_LIST', data)
    },
  	//更新编辑区内容
    updateContent({ commit }, data) {
        commit('UPDATE_CONTENT', data)
    },
  	//更新选择的值
    updateSelectValue({ commit }, data) {
        commit('UPDATE_SELECTED_VALUE', data)
    },
  	//更新菜单状态
    updateMenuStatus({ commit }, data) {
        commit('UPDATE_MENU_STATUS', data)
    },
  	//执行命令
    execCommand({ commit }, data) {
        commit('EXEC_COMMAND', data)
    },
  	//获取节点位置
    getNodePosition({ commit }, data) {
        commit('NODE_POSITION', data)
    },
  	//切换视图
    changeView({ commit }, data) {
        commit('CHANGE_VIEW', data)
    }
}
```

* 展示下拉框

  在上一个实验中，在 menu 配置文件中有提到过，有些菜单项是包含下拉框的，所有会有一个 `dropList：true`  的配置。这个 action 就是用来管理那些具有下拉框的菜单，控制是否展示下拉框。

* 更新编辑区内容

  当我们做了任何操作时，都相当于更新了编辑区的内容。不过这里主要应对的是查看源码的情况。当在普通视图模式下，我们编辑了内容，这时你可以点击查看源码的菜单项，那么视图就会切换到源码模式。因为两个模式都是使用的同一份内容，所以当发生视图切换时，需要更新 store 中的 content 的值。在源码视图中修改的代码，也需要更新 content 后才能在普通视图下看到效果。下图是二者的关系：

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3397timestamp1501825724530.png/wm)

* 更新选择的值

  每一项可选择的菜单项，都包含了一个 value 属性，代表当前选中的值，利用它，我们可以对选中的项做 active 状态显示。如下图所示：

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3397timestamp1501826798820.png/wm)

  当选择字体的时候，我们选择了`宋体` 。那么下次打次打开下框的时候，上次选择的值将会变为 `active` 状态。

* 更新菜单的状态

  很多情况下，我们都需要更新菜单的状态。比如点击了某个菜单项，那么这个菜单项将会执行相关操作，然后变为 active 状态，再次点击时，取消 active 状态。当视图切换到源码视图时，将只能允许普通文本操作，同时禁用上方除第一个菜单项以外的全部菜单。这些场景都是需要更新菜单的状态。

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3397timestamp1501827367156.png/wm)

* 执行命令

  根据菜单项的功能和 action ，向 DOM 发出执行命令，使相关文本更改样式。这是本项目的重要知识点，后续实验会详细讲解。

* 获取节点位置

  在设计阶段，为了更好的支持组件化，我没有选择将下拉框和菜单项混在一起，而是分为两部分：`menubar` 和 `droplist` 。所以在显示下拉框的时候，需要做一些位置的处理，比如当我要选择字体时，点击字体菜单，此时，我需要获取当前这个菜单项相对于整个文档的绝对位置，然后，将字体下拉框使用绝对定位的方式，放到合适的位置，这样看起来的效果就和普通下拉框效果没什么差异了。

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3397timestamp1501828883405.png/wm)

  如上图所示，我们首先确定字体菜单项的位置，获取它的左下角距离页面左端的距离，和距离顶部的距离。得到这个数据之后，因为下拉框采用了绝对定位的方式，所以只需要将它的左上角的位置设置为之前左下脚的位置，就可正常显示，当然，这个位置你也可以自己调整。

* 切换试图
  前面已经提到过，就是在普通视图和源码视图之间切换，每次切换都伴随着内容的更新操作。
### 3.2 Mutations-types

为了让整个项目的mutation可以很方便的查看和管理，我们将全部的 Mutation 事件类型的名字使用常量来代替，并将它们单独存放在一个文件中，对外提供导出接口。

```json
export const SHOW_DROP_LIST = 'SHOW_DROP_LIST'
export const UPDATE_CONTENT = 'UPDATE_CONTENT'
export const UPDATE_SELECTED_VALUE = 'UPDATE_SELECTED_VALUE'
export const UPDATE_MENU_STATUS = 'UPDATE_MENU_STATUS'
export const EXEC_COMMAND = 'EXEC_COMMAND'
export const CHANGE_VIEW = 'CHANGE_VIEW'
export const NODE_POSITION = 'NODE_POSITION'
```

在 action 中提交的 mutation 的名字，和这里的名字是保持一致的。

### 3.3 Mutation

在这个文件中，定义了很多 mutation 用于改变 store 中的数据。在 action 中提交的 mutation 都将在这里真正生效。

首先，我们需要需要从`mutations-types` 中导入 mutation 的事件名称。这里使用对象结构的方式操作：

```js
import {
    SHOW_DROP_LIST,
    UPDATE_CONTENT,
    UPDATE_SELECTED_VALUE,
    UPDATE_MENU_STATUS,
    EXEC_COMMAND,
    SET_FULLSCREEN,
    NODE_POSITION,
    CHANGE_VIEW
} from './mutations-types'
```

即使在 types 中定义了很多名字，我们也能只取到所需要的，而不是全部导入。

接下来定义处理每个事件类型的回调函数。

* SHOW_DROP_LIST

  ```js
  [SHOW_DROP_LIST]({ menuBar }, data) {
    for (let menu in menuBar) {
      if (menuBar[menu].showDropList !== undefined) {
        if (data && data.name === menu) {
          menuBar[menu].showDropList = data.display
        } else {
          menuBar[menu].showDropList = false
        }
      }
    }
  }
  ```

  如果你不知道这种写法是什么意思，可以先看一下前面的内容。这个函数接受了两个参数，第一个是 `menuBar` ，这代表是菜单栏对象，这个对象中包括了全部的菜单项，其中的每个菜单项最多包含三个属性：`value`、`showDropList`、`status`。分别代表这项菜单的值，下拉框展示状态，自身的状态（是否为active）。至于它是怎么来的，后面会讲解，现在先了解它的作用。第二个参数就是所说的载荷(payload)。顾名思义，这个 mutation 的主要作用是更新菜单栏的下拉框展示状态，那么 data 的结构为：

  ```js
  data = {
    name: 'some menu',
    showDropList: true/false
  }
  ```

  data 对象指明了需要修改下拉框展示状态的菜单名字，同时给出这个该菜单下拉框的展示状态。

  然后我们从菜单栏对象中遍历所有菜单项，如果这个菜单项的名字等于data中的名字，判断这个菜单是否存在下拉框，如果存在，就将此菜单项的下拉框展示状态修改为 data 中的状态。同时，其他的菜单项的下拉框状态一律修改为 false，这样可以保证页面上始终只会存在一个下拉框展示，其他的都会隐藏。

* UPDATE_CONTENT

  ```JS
  [UPDATE_CONTENT](state, data) {
  	state.content = data
  }
  ```

* UPDATE_MENU_STATUS

  ```js
  [UPDATE_MENU_STATUS]({ menuBar }, data) {
          if ('all' in data) {
              for (let menu in menuBar) {
                  menuBar[menu].status = data.all
              }
              return
          }
          for (let name in data) {
              if (menuBar[name].showStatus) {
                  menuBar[name].status = data[name]
              } else {
                  menuBar[name].status = 'default'
              }
          }
      }
  ```

  更新菜单状态，这里是指菜单项。同 `SHOW_DROP_LIST` 类似，都接受两个参数，然后更新相关的状态。这里的 data 可以支持两种方式更新菜单状态，一种是更新全部，一种是更新某一个菜单项。

  ```js
  //更新全部菜单
  data = {
    all: 'status'
  }
  //更新某个菜单
  data = {
    menu: 'status'
  }
  ```

  所以首先需要判断到底是哪一种更新方式。

  如果是更新某一个菜单，那么还需要判断这个菜单项的 `showStatus` 是否为 true 。因为有些菜单项是不展示状态的，如果不展示状态则将它的状态设置为 `default` 。

* UPDATE_SELECTED_VALUE

  ```js
  [UPDATE_SELECTED_VALUE]({ menuBar }, data) {
          menuBar[data.name].value = data.value
      }
  ```

* EXEC_COMMAND

  ```js
  [EXEC_COMMAND](state, data) {
          state.command = data
      }
  ```

* CHANGE_VIEW

  ```JS
  [CHANGE_VIEW](state, data) {
          state.sourceView = data
      }
  ```

* NODE_POSITION

  ```js
  [NODE_POSITION](state, data) {
          state.position = {
              top: data.top,
              right: data.right,
              bottom: data.bottom + document.body.scrollTop,
              left: data.left
          }
      }
  ```

  获取节点元素的位置，state 的 position 对象保存着位置信息，data 也是一个保存着位置信息的对象。二者结构一致。有一点需要注意的就是，在获取元素的 bottom 数据的时候，需要特殊处理下，因为通过 js 获取到的 bottom 的值，是相对于整个框口而言，即当前元素距离窗口顶部的距离，而我们需要的是当前元素相对于真个网页顶部的距离，所以需要加上当前框口的滚动距离，可通过 `document.body.scrollTop` 来获取，最后将两者相加，就可以得到该元素相对于网页顶部的绝对距离。

* 模块导出
  将上面的 mutation 导出：

  ```js
  export default {
  	xxxxxx
  	xxxxxx..
  }
  ```
### 3.4 Index

这个文件是保存数据的地方，状态数据的改变最终都作用到里面的数据。 store 对象的实例也由这个文件导出。

首先，我们需要导入一些依赖模块：

```js
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'	
import actions from './action'
import Menu from '../config/menu'
import Config from '../config/index'
```

依赖模块包括刚才编写的两个文件，以及配置文件。

```js
Vue.use(Vuex)	//这一句很重要，在 vue 中使用 vuex
let menuBar = {};		//菜单栏对象
let menu = Menu.getMenu();		//获取全部菜单项配置信息
let config = Config.getConfig();	//获取全部配置项
let viewMenu = config.viewMenu;		//获取可见的菜单项
```

之前在 mutation 中使用到的 menuBar 就是在这里定义的。接下来进一步丰富菜单栏的数据：

```js
viewMenu.forEach(function(name) {
    menuBar[name] = {}
    //是否有下拉框
    if (menu[name].dropList) {
        menuBar[name].value = ''
        menuBar[name].showDropList = false
    } else {
      	//是否展示状态
        if (menu[name].showStatus) {
            menuBar[name].showStatus = true
        }
        menuBar[name].status = 'default'
    }
})
```

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3397timestamp1501836875714.png/wm)

这里要注意一点，下拉框中的 value 不是必须的，可有可无。上面的操作之后，菜单栏对象 menuBar 就具备了一定的数据，通过它，就可以改变每个菜单的下拉框展示状态，以及菜单项的状态展示。

最后，生成 store 对象的实例，并将所有的数据放入其中的 state 对象，同时加入 actions 和 mutations。

```js
export default new Vuex.Store({
    state: {
      	//编辑区内容
        content: config.container.content,
      	//菜单栏对象，包含菜单项状态数据
        menuBar,
      	//是否源码视图
        sourceView: false,
      	//执行的命令
        command: {
            name: '',
            value: ''
        },
      	//存放位置信息
        position: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        }
    },
    actions,
    mutations,
})
```

以上所有操作完成之后，我们的 vuex 就配置完成了。不过目前还不能在组件中使用，因为还没将它注入到组件中去。前面的实验中有说过，在组件中使用 vuex 的方式有两种，一种是在每个单独的组件中都实例化一个 store 对象，然后对 store 实例对象进行操作。另外一种方式是通过在根组件处注入 store 实例，其下所有子组件可通过 `this.$stor` 来访问到 store 实例对象，并进行操作。推荐使用第二种方式，更加简单方便。

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3397timestamp1501838087047.png/wm)

进入上图所在文件，可以看到，这里就是根组件所在的文件，我们只需要在这里注入 store 实例，那么所有子组件都可以访问到。

首先将 store 实例导入到此文件，在文件上方，添加一行代码：

```js
import store from './store/index'
```

将 store 注入 Vue 根组件中：

```js
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    store	//注入 store
})
```

至此，我们关于 vuex 的前期配置工作就完成了，在任何子组件中，都可以访问到 store 中的数据。

## 四、实验总结

本次实验的主要内容是介绍 Vuex 的相关知识，首先介绍了 Vuex 的三个核心概念： state，mutation，action。分别讲解了他们的作用和使用方法，并配有实例操作。让你对 vuex 的概念更加熟悉和理解。接下来以我们的项目为基础，开始配置Vuex来管理项目中的菜单和编辑区的状态，通过实际代码的编写，做到知识的即学即用，对vuex 掌握更加牢固。同时，你对我们的项目的结构和特性进一步了解，为后续实验做好铺垫。

vuex 的知识点不多，只要你理解了它的原理和几个核心概念，就可以快速掌握并应用到项目中。希望本次实验能够对你有所帮助，如果学习过程中有任何问题或者文档有任何不足之处，欢迎随时在课程评论中交流指出，大家一起学习进步。