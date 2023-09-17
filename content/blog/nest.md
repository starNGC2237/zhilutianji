# Nest中的知识点

## IOC（控制反转）

学习自[IOC控制反转](https://juejin.cn/book/7226988578700525605/section/7226988493029146680)
和[Nest.js入门 —— 控制反转与依赖注入（一）](https://juejin.cn/post/7085614364396355598)
***TODO***：通过[这个](https://juejin.cn/book/7226988578700525605/section/7227379507152781349)加深理解


后端系统中，有很多对象。例如我们要使用controller对象

而Controller 依赖了 Service 实现业务逻辑，Service 依赖了 Repository 来做增删改查，Repository 依赖 DataSource 来建立连接，DataSource 又需要从 Config 对象拿到用户名密码等信息

我们需要这么写：
```ts
const config = new Config({ username: 'xxx', password: 'xxx'}); 
const dataSource = new DataSource(config); 
const repository = new Repository(dataSource); 
const service = new Service(repository); 
const controller = new Controller(service);
```

要经过一系列的初始化之后才可以使用 Controller 对象。

而且像 config、dataSource、repository、service、controller 等这些对象不需要每次都 new 一个新的，一直用一个就可以，也就是保持单例。

在应用初始化的时候，需要理清依赖的先后关系，创建一大堆对象组合起来，还要保证不要多次 new，是不是很麻烦

所以我们可以使用IOC来解决这个问题

我在 class 上直接声明它依赖啥不就行了嘛，然后工具会去分析我声明的依赖关系，根据先后顺序自动把对象创建好了，然后组装起来

IOC 有一个容器用来放对象，初始化时扫描class上声明的依赖关系，并new 一个放入容器里，创建对象时自动注入依赖的对象

这种方式叫 DI（依赖注入）

本来是手动new 依赖对象，现在是声明依赖，等待被注入，即控制反转

声明依赖的方式，大家都选择了装饰器方式（java 叫注解）

