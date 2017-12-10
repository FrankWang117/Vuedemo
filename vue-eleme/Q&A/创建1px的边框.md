# 实现真正的1px的边框 border  

## 问题  

解决的问题是1像素的边框在某些移动设备中会显示过粗,主要原因是设备进行了放大,成为了2px;  

## 解决  

利用媒体查询和`min-device-pixel-ratio` 实现解决办法.  

scss代码如下:  

```scss
//定义一个混合器,用于多次复用.
@mixin border-1px($color) {
  // 用于伪类的定位
	position: relative;
	&:after {
      //定义一个伪类,将它置于元素的底部.
		display: block;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 1px solid $color;
		content: ' ';
	}
}
// 使用上面定义的混合器
@include border-1px(red);
// 定义全局类:.border-1px;期望根据不同dpi去缩放,使用@media实现.
// 最小dpi为1.5的设备进行相关设置:1.5*0.7~1
@media (-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5) {
	.border-1px {
		&::after {
			-webkit-transform: scaleY(0.7);
			transform: scaleY(0.7)
		}
	}
}

@media (-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2) {
	.border-1px {
		&::after {
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5)
		}
	}
}
// 再为元素添加上面写好的 .border-1px 类.


```

