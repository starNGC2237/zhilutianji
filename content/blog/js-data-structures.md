
# 《学习 Javascript 数据结构与算法》书籍的学习

## 第一章 Javascript 简介

（我感觉这个不必多说）（我直接略略略）

可以用于***前端***、***后端（ node.js ）***、***移动端（uniapp、react native）***、***桌面端（Electron）***、***嵌入式设备及物联网（IOT）设备***

### 数据类型

在 js 中有两种数据类型：***原始数据类型***和***派生数据类型***
- 原始数据类型：null、undefined、字符串、number、boolean 和 Symbol
- 派生数据类型：js 对象，包括***函数***、***数组***和***正则表达式***


|数值类型|转换成布尔值|
|---|---|
|undefined|false|
|null|false|
|布尔值|true 是 true，false 是 false|
|数|+0、-0和NaN 是 false，其他是 true|
|字符串|字符串长度为0是 false，其余为 true|
|对象|true|

### “ == ”的比较

|类型x|类型y|结果|
|-|-|-|
|null|undefined|true|
|undefined|null|true|
|数|字符串|x == toNumber(y)|
|字符串|数|toNumber(x) == y|
|布尔值|任何类型|toNumber(x) == y|
|任何类型|布尔值|x == toNumber(y)|
|字符串或数|对象|x == toPrimitive(y)|
|对象|字符串或数|toPrimitive(y) == x|


如果 x 和 y 的值相同，会用 equals 方法比较

附：toNumber() 方法

|类型|结果|
|-|-|
|undefined|NaN|
|null|+0|
|布尔值|如果是true，返回1，如果是false，返回0|
|数|数对应的值|

附：toPrimitive() 方法

|类型|结果|
|-|-|
|对象|如果对象的valueOf 方法的结果是原始值，返回原始值；如果对象的toString() 方法返回原始值，就返回这个值；其他情况返回一个错误|

=== 的情况 就不说了

## 第二章 ECMAScript 和 TypeScript 概述

### es5+的功能：let、const

我们应该使用 let 替代 var

当遇到对象时，只读的 const 允许我们修改或重新赋值对象的属性，但变量本身的引用不可以更改，也结束帮你对这个变量重新赋值

当变量的引用不会被改变时，我们应该使用 const

### es5+的功能：模板字符串、箭头函数、参数默认值、声明展开和剩余参数

这个不必多说，注意的是，模板字符串可以换行，不用写\n

### es5+的功能：增强的对象属性

```
let [x,y] = ['a','b']
```

***数组解析也可以用来进行值的互换，而不需要创建临时变量，例如：***

```
[x,y] = [y,x]
```

对于排序算法很有用

还有一个简写方法名

```
var hello = {
	nam: 'abcdef',
	printHello: function printHello(){
		console.log('Hello')
	}
}
console.log(hello.printHello())
```

### es5+的功能：一种声明类的语法糖

```
class Book {
	constructor(title){
		this.title = title
	}
	printTitle(){
		console.log(this.title)
	}
}
```

类的继承

```
class ITBook extends Book(){
	constructor(title,pages){
		super(title)
		this.pages = pages
	}
}
let jsBook = new ITBook('js','99')
jsBook.printTitle()
```

## 第三章 数组

可以使用console.table使得控制台打印表格

在[1,2,5]的位置1处插入[3,4]可以使用splice(1,0,3,4)

去重的一种方法：Array.from(new Set(arr))

复制数组：Array.of(...arr)

创建默认值0的6个大小的数组：Array(6).fill(0)

copyWithin(1,3,5)，把3开始5结束的复制到1位置


通过 localeCompare 方法按照字母表排序

如果使用 .sort() 方法排序，是按照 ASCII 表排序的，即A<J<a<j

可以使用 .sort((a,b)=>a.localeCompare(b)) 排序，这样就是 a>A>j>J 了

js有类型数组，let arr = new TypedArray(length)，将TypedArray替换成需要的。使用 WEBGL API、进行位操作、处理文件和图像时，非常好用

可以使用localeCompare把小写字母排前面

也可以用来排重音符号

js有类型数组，let arr = new TypedArray(length)，将TypedArray替换成需要的
