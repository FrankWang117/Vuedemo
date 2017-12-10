# webpack 小知识点  

1. 怎样更方便的设置路径引用格式:  

   例如在`import` 的时候,往往会写比较长的路径,比较繁琐.遇到这种情况就可以在`webpack.base.conf.js` 这个文件夹中,修改`resolve` 配置,就可以实现本功能:

   ![path.png](https://i.loli.net/2017/12/10/5a2d37f44cafa.png) 

   这里需要注意到的是在`resolve` 下的 `alias` 本应该是` '@':path.resolve(__dirname,'src')` 现在变成了如图所示的样式,是因为上面封装了`resolve` 函数.其他配置类似.使用起来的样式则是:  

   `import Goods from '@/components/goods/goods';` 