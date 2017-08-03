# 项目配置

## 一、实验介绍

### 1.1 实验内容
经过前面三个实验的基础知识讲解，从本次实验开始，我们将开始实际的代码编写，并对每一个操作都会进行详细的文档说明。本次实验的主要内容是项目的配置文件编写与讲解。同时对项目的总体结构有一个大致的了解。

### 1.2 实验知识点

+ 项目配置文件讲解
+ 项目结构分析

### 1.3 实验环境
+ 实验楼在线编程环境
+ Sublime文本编辑器
+ Xfce 终端

### 1.4 适合人群
对前面三节实验内容基本掌握，了解 Vue 相关基础。

## 二、配置文件

### 2.1 项目结构分析

在第一节实验中，我们已经使用 `vue-cli` 搭建好了项目的总体框架。目录结构中，包含了 `build` 和 `config` 的目录，这两个目录是整个框架的项目配置，包含了webpack 以及其他工具和环境的配置，这些配置是比较复杂的，包含了自动打包编译，热重载等特性，如果你有兴趣的话，可以去了解学习下。这里不再做讲解，因为我们关注的重点不是他们，也无需去修改他们，我们所关心的是我们自己项目的业务逻辑配置。

我们的项目是实现一个富文本编辑器，我们需要为这个编辑器做一些参数上的配置。从现在开始，包括后面的实验编码部分，都是在 `src/` 目录下进行。

首先，在 `src/` 目录下新建一个 `config` 目录，用于存放编辑器配置文件。然后在 `config` 目录下，新建三个文件：`index.js`、`lang.js` 、 `menu.js` 。

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3397timestamp1501729868049.png/wm)

下图是编辑器的总体结构：

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3397timestamp1501730166445.png/wm)

编辑器大致可以分为两个部分，菜单栏(图中的1)和下面的编辑器(图中的4)。其中菜单栏的内容较多，每个菜单项都包含了图标，说明文字(图中的2)。部分菜单项还包含了下拉框(图中的3)。所以就可以大致分析出需要对菜单栏进行配置操作，而编辑区基本可以不用管，同时，为了更加规范和多语言适配，我们可以将说明文字的配置单独取出来，形成语言配置文件，就可以配置出任何你想要的语言。

接下来详细介绍这三个配置文件的内容和作用。

### 2.3 项目配置

* 菜单项配置

  `menu.js `是菜单的配置文件，不过不是指菜单栏，而是指每一项菜单项。每一个菜单项的配置内容包括这项的类名：`className`，图标：`icon`，它的行为：`action`，是否存在下拉菜单：`dropList`，以及是否展示状态：`showStatus`。这样做的原因是可以尽量只配置项单项的基础属性。

  `showStatus` 的作用是，点击了这个选项之后，该选项是否展示为 active 状态，下面两张图是例子：

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3397timestamp1501738343421.png/wm)

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3397timestamp1501738399739.png/wm)

  ​

  第一张图中，我选中了文字，并对文字进行了加粗操作，这时加粗菜单项变为 active 的状态。而第二张图中，我选择了让文字进行居中对齐，点击了框中的菜单项，该项并未有展示为 active 的状态。所以 `showStatus` 的目的就是配置菜单项执行操作后，是否展示为 active 的状态。

  `className` 的作用是配置每个菜单项的 class 名字，这样做的目的是为了让命名更加语义化

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3397timestamp1501738900407.png/wm)

  `icon` 的目的就比较单纯了，即每个菜单项所看到的图标，这里采用的是 [fontawesome](http://fontawesome.io/icons/) 的图标，至于如何使用，后续会做讲解。

  `action` 是指点击这个菜单项之后会产生的动作，比如前面的加粗操作，点击加粗菜单后，所选的文字就会执行加粗操作，点击居中菜单，文字就执行居中操作。

  最后还有一个 `dropList` 配置属性，即上图中标号为3的部分，某些菜单可以能有下拉框属性，如果点击这个菜单项，它不会执行任何操作，而是弹出下拉框，然后继续操作。这个属性和 `action` 作用相反，可以说是互为对立，即有action属性的，就没有下拉框，如果有下拉框，代表不会执行 `action` 属性，也不具备 `action` 属性。 这个配置项，可以不用。

  整个 `menu.js` 的代码如下：

  ```js
  let menu = {
      //查看源码
      source: {
          className: 'syl-menu-source',
          icon: 'fa fa-code',
          action: 'viewSource',
          showStatus: true
      },
      //字体名称
      fontName: {
          className: 'syl-menu-fontName',
          icon: 'fa fa-font',
          dropList: true
      },
      //字号大小
      fontSize: {
          className: 'syl-menu-fontSize',
          icon: 'fa fa-header',
          dropList: true
      },
      //文字加粗
      bold: {
          className: 'syl-menu-bold',
          icon: 'fa fa-bold',
          action: 'bold',
          showStatus: true
      },
      //下划线
      underLine: {
          className: 'syl-menu-underline',
          icon: 'fa fa-underline',
          action: 'underline',
          showStatus: true
      },
      //删除线
      strikeThrough: {
          className: 'syl-menu-strike',
          icon: 'fa fa-strikethrough',
          action: 'strikeThrough',
          showStatus: true
      },
      //颜色
      color: {
          className: 'syl-menu-color',
          icon: 'fa fa-paint-brush',
          dropList: true
      },
      //文字左对齐
      justifyLeft: {
          className: 'syl-menu-align-left',
          icon: 'fa fa-align-left',
          action: 'justifyLeft',
      },
      //文字居中对齐
      justifyCenter: {
          className: 'syl-menu-align-center',
          icon: 'fa fa-align-center',
          action: 'justifyCenter',
      },
      //文字右对齐
      justifyRight: {
          className: 'syl-menu-align-center',
          icon: 'fa fa-align-right',
          action: 'justifyRight',
      },
      //插入有序列表
      insertOrderedList: {
          className: 'syl-menu-ol',
          icon: 'fa fa-list-ol',
          action: 'insertOrderedList'
      },
      //插入无序列表
      insertUnorderedList: {
          className: 'syl-menu-ul',
          icon: 'fa fa-list-ul',
          action: 'insertUnorderedList'
      },
      //添加超链接
      link: {
          className: 'syl-menu-link',
          icon: 'fa fa-link',
          dropList: true
      },
      //取消超链接
      unlink: {
          className: 'syl-menu-unlink',
          icon: 'fa fa-unlink',
          action: 'unlink'
      },
      //插入图片
      picture: {
          className: 'syl-menu-picture',
          icon: 'fa fa-picture-o',
          dropList: true
      },
      //插入表格
      table: {
          className: 'syl-menu-table',
          icon: 'fa fa-table',
          dropList: true
      },
      //取消格式
      removeFormat: {
          className: 'syl-menu-remove-format',
          icon: 'fa fa-eraser',
          action: 'removeFormat'
      },
      //重做
      redo: {
          className: 'syl-menu-redo',
          icon: 'fa fa-repeat',
          action: 'redo'
      },
      //撤销
      undo: {
          className: 'syl-menu-undo',
          icon: 'fa fa-undo',
          action: 'undo'
      }
  }
  //导出配置
  export default {
      getMenu() {
          return menu;
      }
  }
  ```

  以上就是我们全部的菜单功能项。`className` 的值可以随意设置，`icon` 的值代表图标的样式，你也可以在fontawesome 网站上去找其他图标替换， `action`	 的值不能随意修改，否则不能执行相关操作，`action` 的值还有很多，与浏览器的支持相关，后面会提到更多的 `action` 操作。 

* 语言配置

  即在前面图中标出的第二部分，当鼠标在菜单项悬停一会儿，就会出现说明性文字，这是利用了标签的 `title` 属性，当我们不清楚这个菜单项是什么功能时，可以将鼠标放到菜单上，下方就会出现该菜单项的功能说明。这里使用的是中文文字，如果我们想要将文字改为英文，如果不使用配置文件，挨个去标签中修改，那将是巨大的工作量，所以需要一个语言配置文件，这个文件中，你想要如何翻译都可以，如果想要修改，直接改配置文件就可以。以下是语言配置文件的配置详情：

  ```json
  export default {
      source: {
          title: '源码'
        	//可继续添加其他语言 title: 'sourceCode'，下同
      },
      fontName: {
          title: '字体'
      },
      fontSize: {
          title: '字号'
      },
      bold: {
          title: '加粗'
      },
      underLine: {
          title: '下划线'
      },
      strikeThrough: {
          title: '删除线'
      },
      color: {
          title: '颜色'
      },
      justifyLeft: {
          title: '左对齐'
      },
      justifyCenter: {
          title: '居中'
      },
      justifyRight: {
          title: '右对齐'
      },
      insertOrderedList: {
          title: '有序列表'
      },
      insertUnorderedList: {
          title: '无序列表'
      },
      link: {
          title: '链接'
      },
      unlink: {
          title: '取消链接'
      },
      picture: {
          title: '图片'
      },
      table: {
          title: '表格'
      },
      removeFormat: {
          title: '清除格式'
      },
      redo: {
          title: '重做'
      },
      undo: {
          title: '撤销'
      }
  }
  ```

  这里的每一项，都和之前的 `menu.js` 中的菜单项保持一致，每项菜单都可添加多种语言，可以很方便使用和修改。

* 总体配置

  即 `index.js` ，这个配置文件可以看作是整个编辑器的总体配置。主要包括对各个菜单项的可见性配置，控制菜单栏可以显示哪些菜单；对部分下拉框数据的配置，比如字体，字号，和颜色的数据；对编辑区设定预设文字。以下为配置示例：

  ```js
  let config = {
    	//控制哪些菜单项可以展示(这里全部展示)
      viewMenu: [
          'source',
          'fontName',
          'fontSize',
          'bold',
          'underLine',
          'strikeThrough',
          'color',
          'justifyLeft',
          'justifyCenter',
          'justifyRight',
          'insertOrderedList',
          'insertUnorderedList',
          'link',
          'unlink',
          'picture',
          'table',
          'removeFormat',
          'redo',
          'undo'
      ],
    	//配置字体名
      fontName: [
          '微软雅黑', '宋体', 'arial black', 'times new roman', 'Courier New'
      ],
    	//配置字号
      fontSize: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
      ],
    	//配置颜色
      colors: [
          '#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF',
          '#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF',
          '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE',
          '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD',
          '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5',
          '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B',
          '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842',
          '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031'
      ],
    	//配置编辑区预设内容
      container: {
          content: '<p><br></p>'
      }
  }

  //导出配置
  export default {
    	//获取某项配置
      getConfig(name) {
          return config[name] ? config[name] : config
      },
    	//设置全部配置项
      setConfig(data) {
          if (data) {
              config = data
          }
      }
  }
  ```


## 三、实验总结

本节实验内容较少，简单介绍了项目的总体结构和框架，并对编辑器的相关属性和参数作了配置，主要包括菜单项配置，配置了每项菜单的基础属性；语言配置，可以很方便的对每项菜单做说明性文字修改，也可以配置为其他语言类型。总体配置，对整个编辑器做整体配置，控制菜单项的展示，部分下拉框数据填充配置，对编辑区预设展示文字。

如果大家对本节实验有任何疑问或者任何问题，欢迎在课程下方提出来，大家一起交流讨论。下节实验，我们将开始 Vuex 的配置编写。