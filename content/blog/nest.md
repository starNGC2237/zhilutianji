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



## Nestjs的生命周期


```
模块可以通过 @Global 声明为全局的，这样它 exports 的 provider 就可以在各处使用了，不需要 imports。

provider、controller、module 都支持启动和销毁的生命周期函数，这些生命周期函数都支持 async 的方式。

可以在其中做一些初始化、销毁的逻辑，比如 onApplicationShutwon 里通过 moduleRef.get 取出一些 provider，执行关闭连接等销毁逻辑。

全局模块、生命周期、moduleRef 都是 Nest 很常用的功能。
```



![image](https://github.com/starNGC2237/picx-images-hosting/raw/master/image.l0bh1j3eglc.webp)


Nest 在启动时，会递归解析 Moudules 依赖，扫描其中的 provider、controller，注入它的依赖

全部解析完成后，会开始监听网络端口，开始处理请求

这个过程中，Nest 暴露了一些生命周期方法：

首先，递归初始化模块，会依次调用模块内的 controller、provider 的 onModuleInit 方法，然后再调用 module 的 onModuleInit 方法。

全部初始化完之后，再依次调用模块内的 controller、provider 的 onApplicationBootstrap 方法，然后调用 module 的 onApplicationBootstrap 方法

然后监听网络端口。

之后 Nest 应用就正常运行了。

***形如：***

![{FB1DC03C-752B-4c0c-8AF6-84199118B04D}](https://github.com/starNGC2237/picx-images-hosting/raw/master/{FB1DC03C-752B-4c0c-8AF6-84199118B04D}.1t6ewfr1hn9c.png)


销毁时候也是这样

先调用每个模块的 controller、provider 的 onModuleDestroy 方法，然后调用 Module 的 onModuleDestroy 方法。

之后再调用每个模块的 controller、provider 的 beforeApplicationShutdown 方法，然后调用 Module 的 beforeApplicationShutdown 方法。

然后停止监听网络端口。

之后调用每个模块的 controller、provider 的 onApplicationShutdown 方法，然后调用 Module 的 onApplicationShutdown 方法。

之后停止进程。

![5bb1ccd84fb14e638274df35198c3cff~tplv-k3u1fbpfcp-jj-mark_1512_0_0_0_q75](https://github.com/starNGC2237/picx-images-hosting/raw/master/5bb1ccd84fb14e638274df35198c3cff~tplv-k3u1fbpfcp-jj-mark_1512_0_0_0_q75.3jsncvuoyyo0.webp)

***beforeApplicationShutdown*** 和别的不一样，可以（signal?: string）接受一个string

***beforeApplicationShutdown*** 是可以拿到 signal 系统信号的，比如 SIGTERM。

这些终止信号是别的进程传过来的，让它做一些销毁的事情，比如用 k8s 管理容器的时候，可以通过这个信号来通知它。

***形如：***

![{3B6F9F8B-8129-4ea6-AAE3-A193A31B9235}](https://github.com/starNGC2237/picx-images-hosting/raw/master/{3B6F9F8B-8129-4ea6-AAE3-A193A31B9235}.4p5mdgtcouc0.png)



