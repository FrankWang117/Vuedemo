# Vue父子组件通信,以及通过`vue-router`的组件之间的通信  

## 问题  

在构建vue项目中,往往使用到`vue-router` 路由插件,而且需要在其父子或其他组件中进行通信,那应该如何做呢?

## 解决

我们已经知道`Vue` 父子间的通信的方法,即:[查看](http://www.baidu.com) ,而在`vue-router` 中的组件的通信和其大致相同:  

首先是在	`App.vue` 中 html 部分的结构:  

```vue
<div id="app">
  //v-header 组件为子组件
  <v-header></v-header>
  //router-view为vue-router插件设置的路由
  <router-view></router-view>
</div>
```

在`App.vue` 文件中有通过axios 获取到的数据 `seller`:

```javascript
import header from 'header.vue';
export default {
 created () {
    this.$http.get('请求地址').then((response) => {
      response = response.data;
      this.seller = response.data;
    });
  },
  //注册子组件
   components: {
    'v-header': header
  },
}
```

现在已经取到数据,就是将数据如何传递到子组件或者路由中去呢?

通过`data` 属性: 

在`	App.vue` 文件中:  

```JavaScript
import header from 'header.vue';
export default {
  data () {
    return {
      seller: {}
    }
  }
 created () {
    this.$http.get('请求地址').then((response) => {
      response = response.data;
      this.seller = response.data;
    });
  },
  //注册子组件
  components: {
    'v-header': header
  },
}
```

而`App.vue` 中的HTML 部分也要做出相应更改:

```html
<div id="app">
  //v-header 组件为子组件
  <v-header :seller = "seller"></v-header>
  //router-view为vue-router插件设置的路由
  <router-view :seller = "seller"></router-view>
</div>
```

现在父组件`App.vue` 中的数据已经传递出去,需要子组件及路由进行接受:  

在`header.vue` 中: 

```vue
<template>
  <div class="header">
  	<img :src="seller.avatar">
    <span>{{seller.name}}</span>
  </div>
</template>
//js 部分
export default {
props: {
  seller: {
    type: Object
    }
  }
}
```

通过这样,子组件就接收到了父组件传递过来的数据以及使用数据去获取信息.

同理路由组建的获取也是类似,通过`props` 属性获取到父组件中的信息.