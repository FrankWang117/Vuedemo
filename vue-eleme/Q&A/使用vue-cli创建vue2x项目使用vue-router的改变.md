# 使用`vue-cli` 创建vue2.x项目中使用`vue-router` 与之前的区别 

现在根据官方文档 [查看开始](https://router.vuejs.org/zh-cn/essentials/getting-started.html) ,可以看到:  

## HTML中  

使用router-link 组件来导航,通过传入'to' 属性指定链接,而`<router-link>`  默认会被渲染成一个`<a>` 标签.

使用的链接样式为:

  `<router-link to='/foo'>foo page</router-link>` ,

而在之前使用的是:

 `<a v-link="{path:'/foo'}">foo page</a>` 

可以看到差别还是很大的.  

在看路由出口,路由匹配到的组件将渲染在这里:  

`<router-view></router-view>`  

在本例中则是:  

![router01.png](https://i.loli.net/2017/12/10/5a2d2d0f84974.png) 



## JavaScript 中  

在`router` 文件夹中,修改`index.js` 文件,定义路由内容.  

1. 定义(路由组件)-从其他文件 `import` 进来:  

   `import Goods from '@/components/goods/goods'`

2. 定义路由,每个路由应该映射一个组件,其中'component'可以是通过`Vue.extend()` 创建的组件构造器,或者只是一个组件配置对象:

   `const routes = [{ path: '/foo',component: Foo},{...}]`   

3. 创建 router 实例,然后传 ` routes` 配置:

   ```javascript
   const router = new VueRouter({
     routes // （缩写）相当于 routes: routes
   })
   ```


4.  创建和挂载根实例.记得要通过 router 配置参数注入路由,从而让整个应用都有路由功能:  

   ```javascript
   const app = new Vue({
     router
   }).$mount('#app')
   ```

   现在可以启动应用啦.  

   **在本例中和上文的有些许不同**  :

   `router` 文件夹下的`index.js` :

![router02.png](https://i.loli.net/2017/12/10/5a2d2e9092721.png)  

`main.js` 文件则是:  

![router03.png](https://i.loli.net/2017/12/10/5a2d334f02be9.png) 



(两种书写形式都可以运行).

