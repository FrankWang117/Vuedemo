# Vue动画的设置  

Vue 提供了 `transition` 的封装组件,在下列情况中,可以给任何元素和组件添加 entering/leaving 过渡

- 条件渲染(使用` v-if` );
- 条件展示(使用`v-show`);
- 动态组件;
- 组件根节点
## 使用  
```vue
<transition name="move">
	<p v-if="show">
      hello
 	</p>
</transition>
//首先是使用vue封装的transition组件 将动画元素包裹起来,为transition组件添加属性name与属性值.未定义name属性的值的时候,其默认为`v`:name = "v";
```

```css
//Vue在检测到transition组件时,会自动为其添加css类名
.move-enter-active,.move-leave-active {
  transition: opacity .5s;
}
.move-enter,.move-leave-to {
  opacity: 0;
}
```

## 过渡的类名

1. `name-enter` 定义进入过渡的开始状态;
2. `name-enter-active` 定义过渡的状态,这个类名可以被用来定义过渡的过程时间,延迟和曲线函数;
3. `name-enter-to` 定义进入过渡的结束状态;
4. `name-leave` 定义离开过渡的初始状态;
5. `name-leave-active` 定义过渡的状态,同`name-enter-active` .
6. `name-leave-to` 定义离开过渡的结束状态.
  ![官方图片](https://cn.vuejs.org/images/transition.png) 

### css动画  

css动画用法同css过渡,区别是在动画中`name-enter` 类名在节点插入DOM 后不会立即删除,而是在 `animationend` 事件触发时删除.  

```css
.move-enter-active {
  animation: bounce-in .5s;
}
@keyframes bounce-in {
    0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```

### 自定义过渡的类名  

可以通过以下特性来自定义过渡的类名,与`Animate.css` 结合使用十分有用:

- `enter-class`
- `enter-active-class`
- `enter-to-class`
- `leave-class` 
- `leave-active-class`
- `leave-to-class`

```vue
<transition name="move" enter-active-class="animated tada" leave-active-class="animated bounceOutRight">
  <p v-if="show">hello</p>
</transition>
```

