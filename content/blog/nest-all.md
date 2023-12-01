# Nest 中的知识点

谢谢你！ChatGPT！你是我的老师！.jpg

## IOC（控制反转）

学习自[ IOC 控制反转](https://juejin.cn/book/7226988578700525605/section/7226988493029146680)
和 [Nest.js 入门 —— 控制反转与依赖注入（一）](https://juejin.cn/post/7085614364396355598)
***TODO***：通过[这个](https://juejin.cn/book/7226988578700525605/section/7227379507152781349)加深理解
部分技巧来自于：[Nestjs 全家桶系列](https://www.bilibili.com/video/BV1NG41187Bs)


后端系统中，有很多对象。例如我们要使用 controller 对象

而 Controller 依赖了 Service 实现业务逻辑，Service 依赖了 Repository 来做增删改查，Repository 依赖 DataSource 来建立连接，DataSource 又需要从 Config 对象拿到用户名密码等信息

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

所以我们可以使用 IOC 来解决这个问题

我在 class 上直接声明它依赖啥不就行了嘛，然后工具会去分析我声明的依赖关系，根据先后顺序自动把对象创建好了，然后组装起来

IOC 有一个容器用来放对象，初始化时扫描 class 上声明的依赖关系，并 new 一个放入容器里，创建对象时自动注入依赖的对象

这种方式叫 DI（依赖注入）

本来是手动 new 依赖对象，现在是声明依赖，等待被注入，即控制反转

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



## AOP 面向切面（结合 MVC）

MVC 是 Model View Controller 的简写。MVC 架构下，请求会先发送给 Controller，由它调度 Model 层的 Service 来完成业务逻辑，然后返回对应的 View。

![580375b654ac445cb2cd07784824104c~tplv-k3u1fbpfcp-jj-mark_1512_0_0_0_q75](https://github.com/starNGC2237/picx-images-hosting/raw/master/580375b654ac445cb2cd07784824104c~tplv-k3u1fbpfcp-jj-mark_1512_0_0_0_q75.5g6u8a0g4280.webp)

如果想要加日志记录、权限控制、异常处理等通用逻辑

例如可以在 control 层前后切一刀

这样的横向扩展点就叫做切面，这种透明的加入一些切面逻辑的编程方式就叫做 AOP （面向切面编程）

而 Nest 实现 AOP 的方式更多，一共有五种，包括 Middleware、Guard、Pipe、Interceptor、ExceptionFilter

### Middleware（中间件）

......

## Provider（提供者）

左边是 Service，中间是IOC，右边是 Controller ，通过key-value映射

![475d2331edf07a667aa8299c412e8362](https://github.com/starNGC2237/picx-images-hosting/raw/master/475d2331edf07a667aa8299c412e8362.7at4l85y88k0.png)

如果这么写的话
![f26ea6e5614afaa410861113dda9de6b](https://github.com/starNGC2237/picx-images-hosting/raw/master/f26ea6e5614afaa410861113dda9de6b.nhmircrkitc.webp)

就需要注入的时候使用@Inject() 注解

![98a11b5887188e71927c1ef9011238ba](https://github.com/starNGC2237/picx-images-hosting/raw/master/98a11b5887188e71927c1ef9011238ba.55ifpeh99ro0.webp)

支持类似如下的形式
app.module.ts

```
@Module({
  imports: [],
  controllers: [AppController], // 注入到providers中
  providers: [
    AppService2,
    {
      provide: 'ABC',
      useClass: AppService,
    },
    {
      provide: 'Test',
      useValue: ['TB', 'PDD', 'JD'],
    },
    {
      // 工厂模式
      provide: 'Test2', // 可以通过inject注入其他服务
      inject: [AppService2],
      async useFactory(AppService2) {
        console.log(AppService2.getHello());
        return await new Promise((r) =>
          setTimeout(() => r(AppService2.getHello()), 2000),
        );
      },
    },
  ],
})
export class AppModule {}
```



## 开启版本号

有时候接口形如/v1/user，怎么开启呢

在 main.ts 处开启

![a146e0e39d4068ae1346ea7702e0e560](https://github.com/starNGC2237/picx-images-hosting/raw/master/a146e0e39d4068ae1346ea7702e0e560.5u5eef17ot40.webp)

在模块.controller.ts 处使用

![10578033e14145aacb3e34a428d56de6](https://github.com/starNGC2237/picx-images-hosting/raw/master/10578033e14145aacb3e34a428d56de6.3gziy3qqwvu0.webp)



或者，只给一个加
![fda840fcae1227f4773fb63b1272b5bf](https://github.com/starNGC2237/picx-images-hosting/raw/master/fda840fcae1227f4773fb63b1272b5bf.6aj76f5bs800.webp)


## 共享模块

### 第一种：导出、导入

需要在 user.module.ts 进行导出
```ts
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
```

在 app.module.ts 使用 ```imports:[UserModule]``` 导入

并且在要使用的地方，app.controller.ts 使用

```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
  

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}
  
  @Get()
  getHello(): string {
    return this.userService.findAll();
  }
}
```

### 全局（优势在于不用在 module 里导入）

例如说我们有一个 config/config.module.ts 模块，我们需要在头上加上 @Global() 注释，并导出它

```ts
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'CONFIG_OPTIONS',
      useValue: {
        baseUrl: {
          baseUrl: '/api',
        },
      },
    },
  ],

  // 这里也要导出
  exports: [
    {
      provide: 'CONFIG_OPTIONS',
      useValue: {
        baseUrl: {
          baseUrl: '/api',
        },
      },
    },
  ],
})

export class ConfigModule {}
```

这样，所有的模块都可以使用 ConfigModule 了

同时，在 list.controller.ts 使用

```ts
import {
  Controller,
  Get,
  Inject,
} from '@nestjs/common';
import { ListService } from './list.service';

  

@Controller('list')
export class ListController {
  constructor(
    private readonly listService: ListService,
    @Inject('Config') private readonly base: any,
  ) {}

  @Get()
  findAll() {
    return this.base;
  }
}
```

## 动态模块

如何使用动态模块

```ts
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';

interface Options {
  path: string;
}

@Global()
@Module({})
export class ConfigModule {
  static forRoot(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      controllers: [ConfigController],
      providers: [
        ConfigService,
        { provide: 'Config', useValue: 'Config' + options.path },
      ],
      exports: [
        ConfigService,
        { provide: 'Config', useValue: 'Config' + options.path },
      ],
    };
  }
}
```

然后就可以在要用的地方使用了，比如说 app.module.ts，
warning：哪怕是 @Globel 声明了，也要在 app.module 引入才能用

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { ConfigModule } from './config/config.module';

  

@Module({
  imports: [
    UserModule,
    ListModule,
    ConfigModule.forRoot({ path: '/starMars' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
```


## 中间件

### 依赖中间件

执行 ```nest g middleware logger --no-spec --flat``` 创建一个中间件

如下所示（记得标注类型）：

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('brefore'); 
    next(); 
    console.log('after');
  }
}
```

然后在 module 里这么使用：

```ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Logger } from 'src/middleware';

  

@Module({
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 这样是控制所有 UserController 的接口
    consumer.apply(Logger).forRoutes(UserController);
    // 这样是只控制 UserController 里的为user的POST接口
    //.forRoutes({ path: 'user', method: RequestMethod.POST });
  }
}
```


### 全局中间件

其实照我看来，就是中间件的另一种写法（函数式），不是全局中间件也可以这么写

main.ts

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
  

const whiteList = ['/list'];
  

const middlewareAll = (req, res, next) => {
  console.log(req.originalUrl);
  if (whiteList.includes(req.originalUrl)) {
    next();
  } else {
    res.send({ code: 0, msg: '没有权限' });
  }
};

  

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(middlewareAll);
  await app.listen(3000);
}

bootstrap();
```


## 跨域相关

1. 安装 cors 和 cors 的类型文件

```bash
npm i @types/cors
npm i @types/cors -D 
```

2. 使用

```ts
import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(3000);
}

bootstrap();
```

## 上传文件与下载文件

### 上传文件

使用 multer 实现上传文件

```bash
npm i multer -S
npm i @types/multer -D
```

然后新建一个模块，在其中的 upload.module.ts 中引入multer

```ts
import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

  

@Module({

  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 设置上传后的目录
        destination: join(__dirname, '../images'),
        filename: (_, file, cb) => {
	      // 重新命名文件
	      // extname 取后缀
          const fileName = `${
            new Date().getTime() + extname(file.originalname)
          }`;
          return cb(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})

export class UploadModule {}
```

然后开始写接口，在 upload.control.ts 中
说实话，写在 upload.service.ts 里比较好，他偷懒了，我也偷懒了

```ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

  

@Controller('upload')

export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return 'Get it!';
  }
}
```


### 附赠一个开启静态文件访问的代码

在 main.ts 中
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

  

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 开启静态访问
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/images',
  });

  await app.listen(3000);

}

bootstrap();
```

### 下载文件

先开启静态访问

加入以下方法

```ts
import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { zip } from 'compressing';
import { join } from 'path';
  

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return '？？？？？？';
  }

  @Get('export')
  downLoad(@Res() res: Response) {
    res.download(join(__dirname, '../images/1.jpg'));
  }
  
  @Get('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, '../images/1.jpg');
    // 新建一个zip
    const stream = new zip.Stream();
    // 把文件加进去
    await stream.addEntry(url);
    // 设置一大堆有用的东西（header）
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=export.zip');
    stream.pipe(res);
  }
}
```


## Rxjs 相关

RxJS is a library for composing asynchronous and event-based programs by using observable sequences.

安装

```bsah
pnpm i rxjs
```

使用

```ts
import { of, interval, take, Observable, fromEvent } from "rxjs";
import { map, filter, scan } from "rxjs/operators";
  

const observable = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
    }, 3000);
});

observable.subscribe({
    next: (x) => console.log(x),
    error: (err) => console.log(err),
    complete: () => console.log("done"),
});

  

// interval(500) 输出 0 1 2 3 4 5 6 7 8 9 10 ... 500
const subs = interval(500)
    .pipe(
        map((v) => ({ num: v })),
        filter((v) => v.num % 2 === 0)
    )
    .subscribe((e) => {
        console.log(e);
        if (e.num === 10) {
            subs.unsubscribe();
        }
    });

// of(5) 自定义数据
const source = of(1, 2, 3, 4, 5);
// retry(2) 重试2次
// formEvent(document, 'click') 事件监听
const click$ = fromEvent(document, "click").pipe(map((e) => e.target));
click$.subscribe((e) => console.log(e));
// take(3) 只取前3个
```


## 响应拦截器

在 src 下新建 common 文件夹，新建 response.ts

```ts
import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
  
interface Data<T> {
  data: T;
}

@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          status: 0,
          data,
          message: '牛逼',
          success: true,
        };
      }),
    );
  }
}
```

在 main.ts 中引入，使用

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from './common/response';
  

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new Response());
  await app.listen(3000);
}

bootstrap();
```



## 异常拦截器

在 src 下新建common 文件夹，新建filter.ts

```ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

  

@Catch()
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    response.status(status).json({
      status,
      data: exception.message,
      time: new Date(),
      success: false,
      path: request.url,
    });
  }
}
```

在 main.ts 中使用

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpFilter } from './common/filter';
  

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpFilter());
  await app.listen(3000);
}

bootstrap();
```


## 管道

### 管道转换

可以用来检查参数的 type

在 p,controller.ts 中

```ts
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PService } from './p.service';

@Controller('p')
export class PController {
  constructor(private readonly pService: PService) {}
  
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    // ParseIntPipe
    // 这样就变成了number类型
    // ParseUUIDPipe
    // 使用
    // import * as uuid from 'uuid';
    // console.log(uuid.v4());
    // 管道转换
    // ValidationPipe
    // ParseIntPipe
    // ParseFloatPipe
    // ParseBoolPipe
    // ParseArrayPipe
    // ParseUUIDPipe
    // ParseEnumPipe
    // DefaultValuePipe
    /**
     * {
          "message": "Validation failed (uuid is expected)",
          "error": "Bad Request",
          "statusCode": 400
        }
     */
    console.log(typeof id);
    return this.pService.findOne(+id);
  }
}
```

### 管道验证 DTO

使用``` nest g pi login ``` 生成 login 文件夹，其中包括 login.pipe.ts

使用 CreateLoginDTO

```ts
import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator';
export class CreateLoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 20, { message: '用户名长度不对' })
  name: string;
  @IsNumber()
  age: number;
}
```

```ts
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
  

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // LoginPipe { name: '1111', age: 12 } { metatype: [class CreateLoginDto], type: 'body', data: undefined }
    // console.log('LoginPipe', value, metadata);
    // 实例化 CreateLoginDTO
    const DTO = plainToInstance(metadata.metatype, value);
    // 验证
    const errors = await validate(DTO);
    console.log('errors', errors);
    if (errors.length) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    console.log('DTO', DTO);
    return value;
  }
}
```


其实更推荐以下的全局验证管道

在 login.controller.ts 中
```ts
import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
// import { LoginPipe } from './login/login.pipe';

  

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  /**
   * @Post()
  create(@Body(LoginPipe) createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }
   */

  @Post()
  create(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }

}
```

直接在 main.ts 中使用

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';
  

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpFilter());
  // 全局验证管道
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

}

bootstrap();
```

## 爬虫

写不了一点，网站被爬死了

## 守卫

使用``` nest g res guard ```创建模块
使用``` nest g gu role ``` 创建守卫

### 部分守卫
在 guard.controller.ts 中使用
```ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { RoleGuard } from './role/role.guard';

  

@Controller('guard')
// 添加
@UseGuards(RoleGuard)
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Get()
  // 设置啥可以用这个接口
  @SetMetadata('role', ['admin'])
  findAll() {
    return this.guardService.findAll();
  }

}
```


### 全局守卫

在 main.js 中使用

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleGuard } from './guard/role/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局守卫
  app.useGlobalGuards(new RoleGuard());
  await app.listen(3000);
}

bootstrap();
```


### 修改守卫读取

在 role.guard.ts 中

```ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 获取路由处理器上的元数据
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    const req = context.switchToHttp().getRequest<Request>();
    console.log(req.query.role);
    if (roles.includes(req.query.role as string)) {
      return true;
    } else {
      return false;
    }
  }
}
```