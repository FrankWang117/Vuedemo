# 使用vue-cli没有'dev-server.js'以及'dev-client.js'文件  

在使用最新的 `vue-cli` 生成vue项目时,发现在`build` 文件夹内少了 `dev-server.js`

文件,这个文件(dev-server.js)在之前的版本中主要是构建本地服务器,以及`dev-client.js` 文件,而这个文件(dev-client.js)主要是热重载相关.造成这个现象的主要原因是webpack 的版本更新到了3.6.0.为什么这么说呢,因为通过查看官方文档,现在(17.12.10)官方版本更新到了3.10.0,查看[DevServer](https://doc.webpack-china.org/configuration/dev-server/)  可以查看关于这个API的使用说明.打开 `/build/webpack.dev.conf.js` 在其中可以看到一系列的设置:![devserver.png](https://i.loli.net/2017/12/10/5a2c13234fa64.png)

  查看官方文档,即可知道每个属性代表的意思.例如:open这个属性就是打开自启服务器的属性:  `When 'open' is enabled, the dev server will open the browser.`  所以修改 `open` 属性值为 `true` 即可开启自动打开服务器.  所以查找`autoOpenBrowser` 出现的地方,在`/config/index.js` 将 其中 `auto Open Browser` 修改为`true` 即可自动打开服务器.   其他相关属性设置类似.  

## 接口设置  

没有了上文提到的两个文件,那饿了么数据接口怎么设置呢.

首先,安装`express` ,在命令行中使用`cnpm install express --save-dev` ,执行完之后,在`package.json`  文件中可以查看到`"express":  "^4.16.2",` 这样的一行(版本号会不一致);

在最新版的vue-cli 的配置中浏览器服务都在`webpack-dev-server` 这个插件中,那我们就在其 `webpack.dev.conf.js` 进行修改.  在`webpack.dev.conf.js` 文件中开始进行相关的数据获取:  

![devconf01.png](https://i.loli.net/2017/12/10/5a2cc910c0ff5.png) 



现在我们的要求就是怎么在服务开启的时候接口数据也对应做好呢,那我们查看其插件api 刚好有一个属性就是 `devServer.before` ,查看[相关描述](https://doc.webpack-china.org/configuration/dev-server/#devserver-before) ,对`webpack.dev.conf.js` 文件进行修改:  

![HCnNq.png](https://s1.ax1x.com/2017/12/10/HCnNq.png) 



所以我们就可以直接发送API请求数据可:  

```javascript
this.axios.get("/api/seller").then(function(res){
  // do something 
}) 
```

