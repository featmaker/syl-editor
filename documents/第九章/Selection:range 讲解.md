# Selection/Range 讲解

## 一、实验介绍

### 1.1 实验内容
在前面几个实验中，我们了解了编辑器的基本结构，以及部分组件的开发。在这一节实验中，我们暂时不讲代码的编写，主要介绍一下富文本编辑器的核心原理：Selection／Range 对象的相关知识。本实验侧重理论知识讲解，较为详细的介绍这两个对象的功能和使用方法。对后续实验的顺利进行至关重要，希望大家能够理解掌握。

### 1.2 实验知识点

* Selection 对象
* Range 对象


### 1.3 实验环境
+ 实验楼在线 Linux 环境   
+ 新版 Firefox 浏览器

## 二、Selection 对象介绍

对于没有开发过富文本编辑器或者没有接触过网页文本选择项目的同学来说，也许对 javascript 中的 Selection 和 Range 对象较为陌生。但是，这两个 DOM API 的存在已经有一定的历史了，而且应用也较为广泛，也许你每天都在使用，却没有在意过。比如大家熟悉的各种翻译插件，选择一段英文，插件就可以帮你翻译为中文，那么插件是如何知道你选择了什么内容呢？主要原理还是文本的选择操作，就是本次实验讲解的 Selection 对象和 Range 对象。

本文将以官方文档为基础，配合实际的代码实例，让大家快速掌握文本选择的相关知识。

`Selection` 对象表示用户选择的文本范围或插入符号的当前位置，它代表页面中的文本选区，可能横跨多个元素。文本选区由用户拖拽鼠标经过文字而产生，选中的文字区域 ranges 默认会以蓝色背景高亮显示，也称为`拖蓝`。

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3431timestamp1502782504394.png/wm)

通过操作 `selection` 对象，我们就可以使用 js 代码的方式来操作鼠标选中的内容，当然也可以直接创建一个高亮选取。下文将要介绍的 `range` 对象也是表示一段内容的选择范围，但是 `selection` 与 `range` 还是存在一定的区别：

* `Selection` 对用户可见。你在网页上随便选择一段文字，实际上就已经创建了一个选区，且你可以看见选择的范围，从哪里开始至哪里结束。`Range` 对用户是不可以见的，只有通过操作 `range` 的内容，或者将一个 `range`添加到某一个 `selection`  中，才可以看见效果，具体将在后文讲解。
* `Selection` 对象在页面中是唯一存在的，即页面中高亮的选区也是唯一的。selection 与 range 的关系一般是一对一的关系，在 firefox 中，可以通过 ctrl + 鼠标的方式选取多个 range，所以 firefox 中，是一对多的关系。range 对象也可以创建多个，每一个表示不同的选择范围，但是先可以展示的，只能有一个。

如何获取 slection 对象？通过以下命令可以获取：

```Js
document.getSelection()
```

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3431timestamp1502786920271.png/wm)

上图中，我们在网页中选择了一段文字，在控制台中，我获取了 selection 对象，调用这个对象的 toString 方法即可看到选区中的内容。

从图中可以看到，这个 selection 对象包含了许多属性，我们可以简单的了解几个。

* 锚点（anchor）

  指的是鼠标按下去的那个位置，即选区的起点位置，在拖动选区的过程中，锚点的位置也是不变的。即使你没有拖动选择任何区域，只要你在页面中点击了文字，那么就已经创建了一个选区，不过这个选区的长度为 0 。是处于折叠状态的，isCollapsed 属性为 true。

* 焦点（focus）

  选区的焦点是该选区的重点，当在页面上拖动选择的过程中，焦点位置一直在改变，他的位置是鼠标最后松开时的位置。

* [`anchorNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/anchorNode)

  当前选区起点位置所在的节点，一般都是文本节点（text）

* [`anchorOffset`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/anchorOffset)

  选区起点在 anchorNode 中的位置偏移量。

  1. 如果 anchorNode 是文字节点，那么返回的就是从该文字节点的第一个字开始，直到被选中的第一个字之间的字数（如果第一个字就被选中，那么偏移量为零）。

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3431timestamp1502789546522.png/wm)

  2. 如果 anchorNode 是一个元素，那么返回的就是在选区第一个节点之前的同级节点总数。(这些节点都是 anchorNode 的子节点)

     ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3431timestamp1502789954707.png/wm)

     ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3431timestamp1502790089863.png/wm)

* [`focusNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/focusNode)

  返回该选区终点所在的节点。

* [`focusOffset`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/focusOffset)

  返回一个数字，其表示的是选区终点在 `focusNode` 中的位置偏移量。

  1. 如果 focusNode 是文字节点，那么选区末尾未被选中的第一个字，在该文字节点中是第几个字（从0开始计），就返回它。

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3431timestamp1502790444230.png/wm)

  1. 如果 focusNode 是一个元素，那么返回的就是在选区末尾之后第一个节点之前的同级节点总数。

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3431timestamp1502790720561.png/wm)

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3431timestamp1502790856394.png/wm)

* [`isCollapsed`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/isCollapsed)

  判断选区是否被折叠。如果选区的起始点和终点在同一个位置。如果未选择任何区域，则该值为 true。

* [`rangeCount`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/rangeCount)

  返回该选区所包含的连续范围的数量，一般除了 firefox 以外，最多只会有一个。

   selection 对象也包含了若干的方法，可以对 selection 进行操作。这里介绍几个方法，更多方法的用法和作用请查阅官方文档。

* [`getRangeAt`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/getRangeAt)

  获取当前选区的选择范围，一般只有一个，即 `getRangeAt(0)`。

* [`addRange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/addRange)

  将一段区域添加到选区。即可在页面上看到拖蓝的文字。

* [`removeAllRanges`](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection/removeAllRanges)

  移除当前选区中的所有区域。

Selection 是页面上高亮选区的引用，类似于 `document.body` 是 `<body></body>` 标签的引用。Selection 中的内容是有长度的，它的长度是页面上高亮选区的起点和终点的位置。若果长度为0，则 selection 是折叠的。另外，selection 的起点和终点都可以通过代码设置，动态改变。

## 三、Range 对象介绍

Rang 对象表示页面上一段连续的区域，通过Range对象可以获取或者修改页面上任何区域的内容，每一段高亮选取都对应着一个 range 对象。range 与 selection 的关系如下图所示：

![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3431timestamp1502793198218.png/wm)

上图仅是示意图，展示了 Selection 和 Range 的关系，在 firefox 浏览器中，一个 selection 对象可能存在多个range对象，其他浏览器一般是一对一的关系。

创建一个 Range 对象的方法一般有两种：

```js
var range1 = document.createRange()		//创建一个折叠状态的空 Range
var range2 = Selection.getRangeAt(0)	//从指定的 Selection 对象中获取 Range
```

Range 对象的范围概念与 Selection 对象基本相同，只是二者的属性名有所区别。接下来讲解一下 Range 对象的一些属性：

* [`Range.collapsed`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/collapsed) 

  返回一个用于判断 `Range `起始位置和终止位置是否相同的布尔值。与 Selection 对象的 isCollapsed 属性相似。

* [`Range.commonAncestorContainer`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/commonAncestorContainer)

  一个range 可以包含多个节点内容，这个属性的作用是获取多个节点最近的共同的祖先节点。

  ![此处输入图片的描述](https://dn-anything-about-doc.qbox.me/document-uid108299labid3431timestamp1502852116365.png/wm)

* [`Range.startContainer`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/startContainer)

  返回包含 Range 开始位置的节点。

* [`Range.endContainer`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/endContainer)

  返回包含 Range 终点位置的节点。

以上属性为只读属性。还有一些方法可以对 Range 对象更加细致的操作。

* [`Range.setStart()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setStart)／[`Range.setEnd()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setEnd)

  设置 Range 对象的起点和终点位置

* [`Range.setStartBefore()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setStartBefore)

  以其它节点 （ [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)）为基准，设置 `Range `的起点。

* [`Range.setEndBefore()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/setEndBefore)

  以其它节点为基准，设置 `Range `的终点。

* [`Range.collapse()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/collapse)

  向指定端点折叠该 `Range` 。接受一个布尔值参数，为 `true` 折叠到 [`Range`](https://developer.mozilla.org/zh-CN/docs/Web/API/Range) 的 start 节点，`false` 折叠到 end 节点。如果省略，则默认为 false。

Range 和 Selection 的概念比较类似，但是两者之间存在包含关系，即后者包含了前者。可以简答理解为 Range 是 Selection 的内在，一个 Range 对象只有添加到某一个 Selection 中时，才能在页面上看到效果。

## 四、实验总结

本次实验主要介绍 Selection 与 Range 的相关理论知识，理解了 Selection（选区） 对象是什么，以及如何操作它。简单的说，选区就是我们用鼠标在页面上拖动选择一段文字所形成的区域。这个区域在一个页面上是唯一存在的，一个选区同时也意味着至少存在一个区域范围对象 Range。这个对象对用户来说是不可见的，只能通过代码来获取。 Range 对象不存在数量限制，可以随意创建，但是只有将它添加到 selection 中时，页面上才能看到 Range 的选中效果，与 Selection 相比，Range 对象具有更强大的范围修改能力。

本节的理论知识是整个编辑器实现的核心原理。基本所有的富文本编辑器都会使用这两个对象。所以理解这两个概念对后面的实验学习很重要。关于这两个对象的更多方法和属性，大家可以去查阅 MDN 的相关资料。如果在本节学习中有任何疑惑或问题，欢迎在课程评论中指出。