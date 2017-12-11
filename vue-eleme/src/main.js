// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
// 加载公共样式
import './common/styles/index.scss';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

// new Vue({
// 	router,
// 	template: '<App/>',
// 	components: { App }
// }).$mount('#app');

router.push('/goods');
