# 面试题集合

## 行内元素和块元素的区别
### 概念

- 块元素：默认独占一行，页面中是垂直排列的，宽高和内外边距可控
- 行内元素：默认是同行排列，宽高由内容决定

### 各有哪些

- 块元素：div、p、table、ul
- 行内元素：span、img、a、input

### 相互转换

通过 display 转换
- display:inline;
- display:block;
- display:inline-block; （行内块元素，既有 block 的宽高特性，又有 inline 的同行特性）



## src 和 href 的区别
### 相同点

- href 和 src 都可以加载外部文件
### 不同点

- href 用在 link 和 a 上，src 用在 js img 等标签上
- 当浏览器遇到 href 会并行下载资源并且不会停止对当前文档的处理
- 当浏览器解析到 src，会暂停其他资源的下载和处理，直到将该资源加载或执行完毕
## MVC 模式和 MVVM 模式

### MVC模式

MVC 将应用抽象为数据层（Model）、视图（View）、逻辑（Controller）
在 MVC 模式中，Model 和 View 可能有耦合，即 **MVC 仅仅将应用抽象，并未限制数据流**

MVC 的优点
- 重用性高
- 生命周期成本低
- 部署快
- 可维护性高

MVC 的缺点
- 不适合小型项目开发
- **视图与控制器联系过于紧密**，妨碍了它们的独立重用

### MVVM 模式

MVVM 由 Model，View，ViewModel 三部分构成
- Model：代表数据模型（Vue2 的 data）
- View：代表 UI 视图（Vue2 的 el）
- ViewModel：负责监听 Model 中数据的改变并且控制View 视图的更新，处理用户交互操作

**Model** 和 **View** 并无直接关联，而是通过 **ViewModel** 来进行交互的（即双向数据绑定）

**Model** 和 **ViewModel**之间有着**双向数据绑定的联系**

View 的变化可以引起 Model 的变化，Model 的变化也可以引起 View 变化
`ViewModel` 是 `View` 和 `Model` 层的桥梁，数据会绑定到 `viewModel` 层并自动将数据渲染到页面中，视图变化的时候会通知 `viewModel` 层更新数据

MVVM 的优点

- 低耦合：
	- 视图可以独立于Model 变化和修改，一个 Model 可以绑定到不同的 View 上
	- 当 View 变化时 Model 可以不变，当 Model 变化时 View 也可以不变
- 可重用性：可以一个 Model 对应多个 View
- 独立开发：**双向数据绑定的模式，实现了 View 和 Model 的自动同步，因此开发者只需要专注对数据的维护操作即可，而不需要一直操作 dom。**

可以实现双向绑定的标签：Input，textarea，select 标签等（可以输入或改变标签内容的标签）

### 问题延伸

MVC 与 MVVM 有什么区别
- MVVM 与 MVC 都是一种设计思想
- MVVM 与 MVC 的最大区别是：它实现了 View 与 Model **的自动同步**，即通过 VM 层实现了 View 和 Model 之间的双向绑定
阐述一下你所理解的 MVVM 响应式原理
- vue.js 是采用的数据劫持结合发布者-订阅者模式的方式,通过 object.defineProperty() 来劫持各个属性的 setter/getter 在数据变动时，发布消息给订阅者，触发相应的监听回调具体步骤: 
	- 1) 需要 observe（观察者）的数据对象进行遍历，包括子属性对象的属性,都加上 setter 和 getter，这样的话，给这个对象的某个值赋值,就会触发 setter，那么就能监听到数据的变化 
	- 2) compile（解析）解析模版指令，将模版中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图 
	- 3) watcher（订阅者）是 observer 和 compile 之间通信的桥梁,主要做的事情是 1> 在实例化时往属性订阅器（dep）里面添加自己 2> 自身必须有一个 update() 方法 3>待属性变动 dep.notice() 通知时,能够调用自身的 update() 方法,并触发compile中绑定的回调,
	- 4) mvvm 作为数据绑定的入口，整合 observer，compile 和 watcher来监听自己的 model 数据变化，通过 compile 来解析编译模版, 最终利用 watcher 搭起 observer 和 compile 之间的通信桥梁，达到数据变化 -> 更新视图：视图交互变化 -> 数据 model 变更的双向绑定效果
- Vue3.x 改用 Proxy 替代 Object.defineProperty。因为 Proxy 可以直接监听对象和数组的变化，并且有多达13种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化。Proxy 只会代理对象的第一层，那么 Vue3 又是怎样处理这个问题的呢？判断当前 Reflect.get 的返回值是否为 Object，如果是则再通过 reactive 方法做代理， 这样就实现了深度观测。监测数组的时候可能触发多次 get/set，那么如何防止触发多次呢？我们可以判断 key 是否为当前被代理对象 target 自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行 trigger。


## 对于盒模型的理解

### 概念

css 定义所有元素都可以拥有像盒子一样的外形和平面空间，包括内容区、外边距、边框、内边距
### 盒模型分为：标准盒模型、IE盒模型

标准盒模型的 width 和 height 属性的范围只包含了内容区

IE盒模型的 width 和 height 属性的范围包含了 border 、 padding 和 content 。

可以通过box-sizing 属性来设定元素的盒模型：content-box（默认）和 border-box（用起来爽）
- 标准盒模型的 width/height  不包含 padding 和 border
- IE盒模型的 width/height  包含了 padding 和 border 

![图片](https://github.com/starNGC2237/picx-images-hosting/raw/master/1.4u4mn91c89o0.webp)
## Vue3 和 Vue2 的区别

vue3 使用 ts 进行了重构
1. 新增的 Composition API
2. 模块化的 API 调用（可以有效进行 TreeShaking ）
3. 基于 Fragement 的多个根标签
4. 响应式的实现原理
5. diff 算法优化（跳过静态节点）
6. 生命周期的变化（例如 mounted -> onMounted）
7. 新增的一些组件，例如：teleport 、suspense
8. ......

下面主要说两个比较核心的变化：
1. 响应式原理的改变
2. diff 算法优化的变化