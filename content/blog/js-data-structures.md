
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

