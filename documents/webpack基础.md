# Webpack基础

## 一、实验介绍

### 1.1 实验内容

​	因为我们是采用 vue-cli 的方式快速搭建了项目，所以一般情况下，除了我们自己编写的业务代码外，是不需要关心其他事情的，比如资源依赖载入，代码打包、编译等，在本项目中，也是如此；但是作为一个前端项目，我觉得还是有必要介绍一下关于构建工具的相关内容，也许这个项目中用的不多，但在很多大型项目中，这是一项非常重要的技术，所以了解和学习一下是很有必要的。本次实验主要介绍 webpack 的基础用法。

​	本实验内容为扩展知识，与项目相关，但不是核心内容，可选择性学习。

### 1.2 实验知识点

+ webpack 介绍
+ webpack 配置基本概念
+ 本项目中webpack配置讲解

### 1.3 实验环境
+ 实验楼在线linux环境 
+ Xfce终端
+ nodejs


## 二、Webpack讲解

### 2.1 CommonJS 和 AMD

​	CommonJS和AMD是用于JavaScript模块管理的两大规范，前者定义的是模块的同步加载，主要用于NodeJS，适用于服务端；而后者则是异步加载，通过requirejs等工具适用于前端。随着npm成为主流的JavaScript组件发布平台，越来越多的前端项目也依赖于npm上的项目，或者自身就会发布到npm平台。因此，让前端项目更方便的使用npm上的资源成为一大需求。

​	关于这两种规范的详细讲解，网上有很多资料，但是要完全理解也不是那么容易的，所以我们这里只是简单介绍一个这方面的知识，让大家知道有这个东西，平时大家有时间或者感兴趣的话，可以自己查阅相关资料。

* CommonJS 规范

  每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

  ```Js
  # A.js
  var name = 'shiyanlou';
  function sayHello(name) {
    console.log('hello' + name)
  }
  module.exports = {
    name,
    sayHello
  }
  ```

  ```js
  # B.js
  var A = require('./A.js')
  console.log(A.name)		#'shiyanlou'
  A.sayHello('shiyanlou')		#'hello shiyanlou'
  ```

* AMD规范

  采用异步的方式来加载模块(假设当前文件与模块同目录)，即模块的加载不影响后面代码的执行，当模块加载完成后，执行回调函数。

  ```js
  # require([module], callback);
  require(['math'], function (math) {
  　　　　math.add(2, 3);
  　});
  ```

### 2.2 webpack介绍

​	Webpack 是当下最热门的前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过 loader 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等。在webpack出现之前，比较主流的代码构建工具有 grunt、glup、browserify。就目前的发展形势来看，webpack基本占据了半壁江山，

webpack相比其他构建工具，主要具有以下新的特性：

```
1. 兼容CommonJS 、 AMD 、ES6的语法
2. 支持js、css、图片等资源文件打包
3. 串联式模块加载器以及插件机制，让其具有更好的灵活性和扩展性，例如提供对CoffeeScript、ES6的支持
4. 有独立的配置文件webpack.config.js
5. 可以将代码切割成不同的chunk，实现按需加载，降低了初始化时间
6. 支持 SourceUrls 和 SourceMaps，易于调试
7. 具有强大的Plugin接口，大多是内部插件，使用起来比较灵活
8. webpack 使用异步 IO 并具有多级缓存。这使得 webpack 很快且在增量编译上更加快
```

### 2.3 webpack 配置基本概念

这是一个最简单的配置文件示例：

```js
var path = require('path');

module.exports = {
  # 资源入口
  entry: './src/index.js',
  # 资源出口
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

#### 2.3.1资源入口

​	代码中的 entry 属性，作用是告诉webpack从哪里开始取加载资源文件，然后以这个入口文件为基础，层层分析它的依赖模块，以及更深层次的关系，从而达到加载所有相关依赖。同时，entry 属性还支持传入文件数组，这种方式可以一次注入多个依赖文件，可以将它们的依赖导向到一个 `chunk`（资源块），即打包到一个文件中。

```js
entry: [filename, filename]
```

这里需要注意的一点，通过数组传入的模块，将只会生成一个 chunk。如果需要生成多个chunk，你需要如下配置：

```js
entry: {
    one: './one.js',
    two: './two.js',
    three: './three.js'
  }
```

#### 2.3.2 资源出口

​	这里有一点需要注意，资源出口的 `path` 属性，应该是一个绝对路径，因为配置文件中使用了node 的path 模块，利用它可以帮我们生成绝对路径，此路径表示打包之后的文件应该存放在什么地方。虽然可以存在多入口配置，但是输出的配置却只能有一个。

​	如果配置了多入口，即多个chunk。为了保证每个chunk对应的输出编译文件名的不同，你可以如下设置：

```js
output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
```

设置之后，将会在`\/dist`生成编译文件将会：one.js 、two.js、three.js。

#### 2.3.3 加载器

​	加载器(loader) 是对应用程序中资源文件进行转换。它们是（运行在 Node.js 中的）函数，可以将资源文件作为参数的来源，然后返回新的资源文件。由于不同浏览器对es6的支持情况不同，所以往往需要将我们写的es6代码转为es5，基本可以让大部分浏览器都可以正确运行。所以，当编译js文件时，可以添加一个 Babel 加载器处理es6代码。

![](http://labfile.oss.aliyuncs.com/courses/904/3d0fabd3-fc09-4c4c-979a-45a5a245c6ca.png)

​	上图的Usage那一步，我们需要修改webpack的配置文件，添加一个模块属性：

```js
module.exports = {
  # 资源入口
  entry: './src/index.js',
  # 资源出口
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }，
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      #此处可继续添加
    ]
  }
};
```

在 rules 中，可以添加多个配置项，每个配置项都代表遇到 `.xx` 的文件，应该使用哪一个loader去处理。

#### 2.4 项目中的使用

​	因为使用 vue-cli 的原因，webpack的相关功能已经配置好了，我们可以直接使用，甚至都不用关心他是怎么写的，不过你只要掌握一以上几点基础知识，再回过头去看我们项目中的配置文件，你应该不会再觉得陌生了。

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3365timestamp1501583943312.png/wm)

代码中还有一些内容，我没有介绍完，如果你感兴趣，可以去自己了解。因为本实验的目的只是讲解webpack的基础知识，并不是详细讲解webpack，学习知识的第一手资料，首选文档。

## 三、实验总结

​	本次实验主要介绍了webpack的相关知识，主要讲解webpack的基础知识和基本用法。因为webpack功能非常强大，包含的知识点非常多，我不可能非常详细的讲解，在一些大型的项目中，他们的配置文件往往非常复杂，但是，只要你掌握了基础知识，当你以后面对webpack时，至少不会太陌生，可以快速理解上手。如果想要深入了解，或者在学习过程中，遇到陌生的东西，尽量去查阅官方文档，而且支持中文。你可以在课程评论里发表你的意见或看法，欢迎一起讨论交流。

