# vue-router 的使用

## 在`vue-cli` 中使用`vue-router`   

先阶段(17年末)`vue-cli` 已经可以选择安装`vue-router` ,在安装了之后,在`src` 文件夹中会有`router` 文件夹,里面`index.js` 就是对路由的设置文件;

### 首先引入页面的`.vue` 文件:

```javascript
// 基础文件,默认引入不再累述
import Vue from 'vue'
import Router from 'vue-router'
// 引入页面文件(在components文件夹下书写的)
import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
```

在引入之后,使用路由:

```JavaScript
// 紧跟上面
Vue.use(Router)
```

而后,设置具体路由,并`export` 出来:

```JavaScript
// 依然紧跟其后
export default new Router({
  routes: [
    // 设置根路由
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    }
  ]
})
```

在设置了路由文件之后,就需要设置页面的引导导航文件,本例中为`tab.vue` 组件:

```vue
<template>
  <div class="tab">
      <router-link tag="div" class="tab-item" to="/recommend">
        <span class="tab-link">推荐</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/rank">
        <span class="tab-link">排行</span>
      </router-link>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
@import "src/common/scss/variable";
.tab {
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: 22px;
    .tab-item {
        flex: 1;
        text-align: center;
        .tab-link {
            padding-bottom: 5px;
            color: #eee;
        }
        &.router-link-active {
            .tab-link {
                color: orange;
                border-bottom: 2px solid orange;
            }    
        }
    }
}
</style>
```

**注意** : `<router-link>` 默认生成的是`a标签`,这里使用 `tag`  使其生成`div` 标签,`to` 指示本链接所显示的 页面;`.router-link-active` 类名为当本标签活跃时显示的css属性.

在总的`App.vue` 文件中,就可以引入`tab` 组件和router路由:

```vue
<template>
  <div id="app">
    <tab></tab>
    <router-view></router-view>
  </div>
</template>
<script>
import Tab from 'components/tab/tab'
export default {
  components: {
    Tab
  }
}
</script>
<style lang="scss">
</style>

```

这样,在为其添加一些CSS样式就可以更美观的展示了