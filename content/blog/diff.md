# Vue2 与 Vue3 的区别

https://gitee.com/jch1011/vue3_communication.git
## 通信方式

### vue2

- props：父子组件、子父组件、甚至兄弟组件
- 自定义事件：可以实现子父组件
- $bus：任意组件通信
- pubsub：发布订阅，任意组件通信
- vuex：集中式状态管理容器，实现任意组件通信
- ref：获取子组件的响应式数据及方法
- slot：插槽（默认、具名、作用域）实现父子组件通信
- ......

### vue3

1. props 使用 defineProps
2. 自定义事件
	1. 原生 dom 事件
	2.  vue2 中 @click 是自定义事件，原生要加 .navite
	3.  vue3 中 @click 为原生 DOM 事件
	4. vue3：原生的 DOM 事件不管是放在标签身上还是组件标签身上，都是原生 DOM 事件
	5. @click 其实是给子组件的根节点绑定
	6. 子组件给父组件传递 @xxx='()=>{}'
	7. 声明：
       ```js
        let $emit = defineEmits(['xxx'])
       ```
	8. 使用：
       ```js
        $emit('xxx','东风');
       ```
	9. 第一个参数：事件类型，接下来的参数为注入数据
	10. 如果在 defineEmits 声明 'click'，@click 就会变成自定义事件
	11. 这个 ***emits*** 选项还支持对象语法，它允许我们对触发事件的参数进行验证：
	    ```vue
	    <script setup>
	    const emit = defineEmits({ 
	    	submit(payload) { 
	    	// 通过返回值为 `true` 还是为 `false` 来判断 
	    	// 验证是否通过 
	    	} 
	    })
	    </script>
	    ```
	12. 如果你正在搭配 TypeScript 使用 script setup，也可以使用纯类型标注来声明触发的事件：
	    ```vue
	    <script setup lang="ts">
	    const emit = defineEmits<{
	      (e: 'change', id: number): void
	      (e: 'update', value: string): void
	    }>()
	    </script>
	    ```
3. 全局事件总线（vue3使用 mitt 代替 $bus，因为没有 this 了）
	1. 安装 mitt 
       ```bash
        npm i -D mitt 
       ```
	2. 使用 ES6 模块导入
       ```js
        import  mitt  from  'mitt'
       ```
	3. 使用方法
	    ```js
	    const emitter = mitt()
	    // listen to an event
	    emitter.on('foo', e => console.log('foo', e) )
	    // listen to all events
	    emitter.on('*', (type, e) => console.log(type, e) )
	    // fire an event
	    emitter.emit('foo', { a: 'b' })
	    // clearing all events
	    emitter.all.clear()
	    // working with handler references:
	    function onFoo() {}
	    emitter.on('foo', onFoo)   // listen
	    emitter.off('foo', onFoo)  // unlisten
	    ```
4. v-model 父子组件数据同步
	1. 父组件中使用
       ```vue
        <Child v-model:money="money"/>
       ```
	2. 子组件中使用
	    ```
	    let props = defineProps(["money"]);
	    let $emit = defineEmits(["update:money"]);
	    <Button>@click="$emit('update:pageSize', pageSize + 4)"<Button/>
	    ```
5. attrs vue3 提供了一个方法，获取组件身上的属性和事件
	1. 使用
	    ```vue
        //vue3将$attrs和$linterners合并了
    	let $attrs = useAttrs() 
    	<el-button :='$attrs'>按钮</el-button>
	    ```
	2. ***注意！如果使用props接收了，useAttrs方法就获取不到了*** 
6. 使用 ref 和 $parent
	1. 子组件内部的数据默认关闭的，需要使用```defineExpose({money})```暴露
	2. ```son.value.money-=10;```
	3. ```子组件中使用$parent```
7. 父孙之间通信：Provide 与 Inject
	1.  vue3 提供 provide（提供）和 inject（注入），可以实现隔辈传递数据
	2. 例如
	    ```
	    	let car = ref('车')；
	    	provide('key',car)；
	    	// 使用（孙子）
	    	let car = inject('key')
	    	// 爷爷的数据和孙子的数据是同一个数据，所以可以修改
	    ```
8. pinia
	1. vuex：集中式管理状态容器，可以实现任意组件中间通信
		1. 核心概念：state、mutations、actions、getters、modules
	2. pinia：集中式状态管理容器，可以实现任意组件中间通信
		1. 核心概念：states、actions、getters
	3. 创建大仓库
	    ```js
	    let store = createPinia();
	    export default store;
	    ```
	4. 安装
	    ```js
	    import store from './store'
	    app.use(store)
	    ```
	5. 定义小仓库
	    ```js
	    import { defineStore } from 'pinia' 
	    // 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`) 
	    // 第一个参数是你的应用中 Store 的唯一 ID。 
	    export const useAlertsStore = defineStore('alerts', { 
	    	state: () => ({ count: 0 }), 
	    	getters: { 
	    		double: (state) => state.count * 2, 
	    	}, 
	    	actions: { 
	    		increment() { 
	    			this.count++ 
	    		}, 
	    	},
	    })
	    ```
	6. 使用
	    ``` js
	    import useInfoStore from "../../store/modules/info";
	    // 获取小仓库对象
	    let infoStore = useInfoStore();
	    console.log(infoStore);
	    // 修改数据方法
	    const updateCount = () => {
	        // 仓库调用自身的方法去修改仓库的数据
	        infoStore.updateNum(66, 77);
	    };
	    ```
	7. 组合式 api
	    ```js
	    //定义组合式API仓库
	    import { defineStore } from "pinia";
	    import { ref, computed, watch } from "vue";
	    //创建小仓库
	    const useTodoStore = defineStore("todo", () => {
	    	const todos = ref([
                { id: 1, title: "吃饭" },
	    	    { id: 2, title: "睡觉" },
	    	    { id: 3, title: "打豆豆" },
	    	]);
	    	const arr = ref([1, 2, 3, 4, 5]);
	    	const total = computed(() => {
	    	    return arr.value.reduce((prev, next) => {
	    	        return prev + next;
	    	    }, 0);
	    	});
	    // 务必要返回一个对象:属性与方法可以提供给组件使用
	    	return {
	    		todos,
	    		arr,
	    		total,
	    		updateTodo() {
	    			todos.value.push({ id: 4, title: "组合式API方法" });
	    		},
	    	};
	    });
	    export default useTodoStore;
	    ```
9. slot 插槽（默认插槽、具名插槽、作用域插槽）
	1. 默认插槽
	    ```html
	    	<slot></slot>
	    ```
	2. 具名插槽（***v-slot可以简写成#***）
	    ```html
	    	<slot name="a"></slot>
	    	<h1>具名插槽填充数据</h1>
	    	<h1>具名插槽填充数据</h1>
	    	<!--使用-->
	    	<!-- 具名插槽填充a -->
	    	<template #a>
	    	<div>我是填充具名插槽a位置结构</div>
	    	</template>
	    ```
	3. 作用域插槽
		1. 就是可以传递数据的插槽，子组件可以将数据回传给父组件，父组件可以决定这些回传的数据是以何种结构或者外观在子组件内部展示的！
		2.  例如
		    ```vue
		    <!--父-->
		    <Test1>
		    	<template v-slot='{$row,$index}'>
		    		<h1>{{$row.title}}</h1> 
		    	</template>
		    </Test1>
		    <!--子-->
		    <ul>
		    	<li v-for='(item,index) in todos' :key='item.id'>
		    		<!--回传给父组件-->
		    		<slot :$row='item' $index='index'></slot>
		    	</li>
		    </ul>
		    ```
