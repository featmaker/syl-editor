# Vue 与 Vuex

## 一、实验介绍

### 1.1 实验内容

​	我们的项目是基于 Vue.js 开发的，同时将会配合 Vuex 进行全局状态管理。所以这一节的主要内容是介绍Vue的基础知识，Vuex 的作用与使用方法，通过我们的项目讲解，让大家对这两者有一个全面的认识，并熟悉它们的用法。本文档部分内容源于Vue.js 官方文档。

​	本文档中提到的所有知识点，都是随后的项目编码中将会使用的，所以请大家务必掌握这个实验的内容。

### 1.2 实验知识点

+ Vue 基础知识
+ Vuex 基础知识

### 1.3 实验环境
+ 实验楼在线 Liunx 环境  
+ Xfce终端
+ 新版 Firefox 浏览器

最好使用之前搭建好的环境继续实验。


## 二、Vue 基础

这一节介绍Vue的相关基础知识，同时也是项目中将会使用到的知识点，每一个知识点，我都会用一个小例子来实际操作，希望大家能够快速入门。

### 2.1 模版语法

* 文本插值

  通常使用两对大括号来进行文本的插值操作。使用起来非常简单方便。

  ```Html
  <span>Hello: {{ name }}</span>
  ```

  在第一个实验中，项目运行成功时的欢迎页面，应用了文本插值的语法。

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3366timestamp1501641622284.png/wm)

  在大括号中，我们还可以使用简单的javascript表达式，比如算术操作，三元运算等。

  ```Html
  {{ number + 1 }}
  {{ ok ? 'YES' : 'NO' }}
  {{ message.split('').reverse().join('') }}
  ```

* HTML 插值

  文本插值通常只能插入纯文本内容，如果想要插入html代码并显示正确的效果，则可以使用 `v-html` 指令。

  ```Html
  <div v-html="rawHtml"></div>
  ```

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3366timestamp1501641992703.png/wm)

* 属性

  在html标签的属性中，因为不能使用 `{{ }}` 这种写法，所以可以使用 `v-bind` 来绑定属性，此指令的简写形式为 :attr 。

  ```html
  <div v-bind:id="myid"></div>	#简写形式为 :id
  ```

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3366timestamp1501642549235.png/wm)

### 2.2 Class 与 Style 绑定

* Class绑定

  Class 也是属于一个标签的属性，所以如果需要对他进行操作，首先需要使用 `v-bind:class` ，然后你就可以像普通属性那样操作 class 了，不过对 class 的操作还有其他方式。

  对象语法：

  ```Html
  <div v-bind:class="{ active: isActive }"></div>		#简写形式为 :class
  ```

  当数据 `isActive` 为 ture 时，此 div 的类名为 active。

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3366timestamp1501643447674.png/wm)

  由于传的是对象，所以可以在对象中放入多个属性，从而实现多个类名动态切换。

  ```html
  <div v-bind:class="{ active: isActive, success: status, xxx:xxx }"></div>
  ```

   数组语法：即将上面的对象替换为数组，从而实现多个class的绑定。

  ```html
  <div v-bind:class="[ active, status, xxx ]"></div>
  ```

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3366timestamp1501643973607.png/wm)

* Style 绑定

  同理，需要对 style 使用 `v-bing` 指令。绑定 style 也支持两种方式。

  对象语法：

  ```html
  <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
  ```

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3366timestamp1501644340684.png/wm)

  数组语法：

  ```html
  <div v-bind:style="[baseStyles, overridingStyles]">
  ```

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3366timestamp1501644892330.png/wm)

### 2.3 条件渲染

与普通条件判断类似，在 Vue 中，可以使用指令： `v-if` 来判断一个元素是否显示，使用很简单。

```html
<div v-if="isShow"></div>
```

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3366timestamp1501653479754.png/wm)

如果 `isShow` 为 true 时，这个 div 元素将会在页面上显示，如果为 false， 则这个元素在页面上完全不可见，甚至查看网页源码时，都没有它的影子。是真实的条件渲染。

与 `v-if` 相类似的一个指令是 `v-show` ，它们的相似之处在于，二者都是控制页面上的元素是否可见，前者是真实操作dom元素是否存在，后者只是简单的将元素从页面上隐藏，通过修改元素的css样式： `display:none;`，从而达到隐藏目的，元素仍然存在于dom结构。用法同 `v-if` 基本相同，这里不再举例。

### 2.4 列表渲染

使用指令 `v-for` 可以循环渲染指定的数据集，数据集可以是数组或者对象。使用方法如下图：

```html
    <div class="todo-list">
      <span v-for="item in lists" >{{ item.name }}</span>
    </div>
```

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3366timestamp1501655732916.png/wm)

上面的代码将会在 class 的 div 中渲染2个 span 元素。

### 2.5 事件监听

在vue中，同样可以使用指令来实现事件的监听与处理。使用指令：`v-on:event ` 。

```html
<button type="button" v-on:click="hello()">点击我</button>
```

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3392timestamp1501656746391.png/wm)

注意，我们写的方法，是存放在 `methods` 这个对象中，我们自定义的大部分方法都存放在这个对象中，需要的时候可以直接调用，如上图，这个按钮监听了 `click` 事件，当点击操作发生时，将会在 `menthods` 中去寻找对应的方法并执行。多个方法的写法如下：

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3392timestamp1501657137383.png/wm)

在调用方法的时候，你也可以向方法传递参数，就像普通调用一样。

### 2.6 计算属性／观察属性

前面介绍过，在文本插值过程中，我们可以在 `{{ }}` 中执行单句的 javascript 语句。比如像下面这样的情况：

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

上面的代码作用是：将 message 的文字反转显示。虽然操作很简单，但是这样做，导致了在模版中加入了过多的逻辑，是的看起来不是那么简洁，也不方便维护，对于这样的情况，我们可以使用Vue的计算属性。使用方式如下图：

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3392timestamp1501659001223.png/wm)

计算属性是一个叫做 `computed` 的对象，里面保存着数据对象，同 data 类似，不过每一项数据的值都是一个函数，这个函数返回一个结果，在实际使用过程中，同 `data` 的数据使用方法相同，在 script 中，可以通过 `this.xx` 来得到数据，在模版中，可直接使用。注意，computed 中的数据不能和 data 中的数据出现同名情况。通过这样的方式，我们的模版就可以变的更加简洁了。同时两份数据都可以使用：

```html
<div id="example">
  {{ msg }}
  {{ message }}
</div>
```

计算属性，一般来说是在页面第一次加载过程中就进行处理，计算完成之后，就会返回新的结果。

Vue.js 还提供了一个叫做观察属性，即可以观察Vue实例上的数据变动，当数据发生变动时，你可以做一些操作。

```Html
<input type="text" name="" v-model="content" placeholder="">
```

上面的代码意思是有一个输入框，它的值与 `content` 绑定。当我们修改 `input` 的值时，`content` 的值也会相应修改。

有了观察属性，我们就可以监听 `content` 的变化，并作出反应。

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3392timestamp1501661087626.png/wm)

首先，在data() 数据中定义了一个content 属性。因为input控件的值与 content 绑定，所以，在 input 的任何改变，content 的值也会相应改变，同时，我们添加了一个 watch 属性，它的值是一个对象，其中的每一项代表了正在观察的数据，这里观察的就是 content。content 的值是一个函数，这个函数接受一个参数，这个参数就是最新修改的值，这里代码的作用就是判断 content 的长度，如果 content 的值长度小于6为，则弹出提示信息。

观察属性的主要作用就是监听数据的变化，并作出对应的后续操作，我们的项目中将会用到这个特性。

### 2.7 组件

组件(component)是 Vue 最强大的功能之一。组件可以帮助你扩展基本的 HTML 元素，以封装可重用代码。在较高层面上，组件是 Vue 编译器附加行为后的自定义元素。在某些情况下，组件也可以是原生 HTML 元素的形式，以特定的 `is` 特性扩展。

以实验楼网站为例，每个网页都可以看成是一个大的组件，他由更多小多组件组合而成。

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3392timestamp1501665477736.png/wm)

上图中框出的部分，都可以看作是一个个组件，他们共同构建起了整个页面。这里主要介绍单文件组件，即每一个组件都是一个单独的文件，因为项目中将会大量使用这种方式的组件。结合我们现有的项目，我们可以理解一下使用方式。

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3392timestamp1501664900152.png/wm)

从图中可以看出，这个名叫 `hello.vue` 的文件，他的父级目录为 `components`，可以看出这是一个存放组件的目录，如果还有其他的组件，它们也应该放在这个位置。

接着图的右边，我把内容分为了三个部分，上方的 `templete`，中间的 `script` ，下方的 `style` 。基本上所有的组件文件都是这样的结构，前面介绍的基本语法，都是在 `templete` 和 `script` 中进行操作，`style` 是用来对这个组件的样式进行调节的。注意在 `style` 标签中，有一个 `scoped` 的字符串，如果添加了这个单词，那么你写的样式代码就只会在这个组件文件中生效，即限制了css的作用域。如果没有这个单词，那么你写的样式代码将会影响到整个页面，其他组件的样式也会受到影响，所以为了保证样式的正确使用，一般建议加上 `scoped` 这个单词，除非你的目的就是写全局的样式。

如何使用这个组件呢？

因为我的这个示例项目安装了 vue-router ，所以需要在router目录下去查看，用法都是一样的，大家看一眼就知道怎么使用了。

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3392timestamp1501666562713.png/wm)

首先，通过 `import` 的方式将组件导入目的文件，随后在这个文件 component 属性中，添加上需要使用的组件名称就行了。如果有不懂的地方，后面还将大量使用这个方式，所以不必担心，这里先做了解。

以上内容便是对Vue的一些基础用法作了讲解，每个知识点都有示例截图，这里讲到的东西，也是后面会用到的东西，希望大家能够掌握。

## 三、Vuex基础

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

其实，说的通俗一点，就是Vuex相当于一个中央仓库，里面保存了这个项目的全部组件的共享状态，比如A组件中有一个 status 的状态，B组件中也有一个 status 的状态，两个状态必须保持一致，即这两个组件的状态是共享的。此时，如果不使用Vuex，如果A组件中，将status的值作了修改，对于B组件来说，是完全不知情的，就导致了两个组件的状态不一致，一个组件状态的更新不能及时通知其他相关组件，所以就需要一个第三方的仓库来管理这些共享的状态，而Vuex的作用就是相当于第三方仓库。

Vuex可以看作是一个中央仓库，保存个各个组件的共享状态，还是刚才的例子，此时，仓库中保存了两个组件的共享状态：status。如果A组件想要对status的值作修改，它必须通过提交请求的方式来告诉仓库，我想要改变status的值，请你处理一下，仓库收到请求后，更新仓库中status的值，然后通知所有使用了这个状态的组件status的值修改了，也包括A、B组件，各个组件收到通知后，会将各自的status值也更新，从而出发相应视图更新，同理，B组件也可以完成相同的操作。这样就解决了不同组件间状态共享的问题。

在实际使用过程中，得益于Vue的数据绑定特性，以上过程只需要简单几步就可以完成。大致的实现原理和作用就是这些。

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3392timestamp1501670313899.png/wm)

## 四、实验总结

本次实验主要是以基础理论讲解，包含了Vue基础语法的使用，每个知识点都配有相关的使用示例，协助你理解。文档中使用了很多截图，很多需要动手敲代码的地方，希望你能实际动手，而不是总是粘贴复制。本节内容较多，所介绍的内容也是后续实验需要用到了，需要你多花点时间学习理解。如果想要更加深入的学习Vue 和 Vuex ，可以前往他们的官网网站，查看更加详细的文档说明。有任何学习上的问题，欢迎在课程评论中指出，欢迎一起交流讨论。

