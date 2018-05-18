// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// //引入api文件
// import api from './api/index'
import axios from 'axios'
import utils from './utils/index'
import router from './router'
import './common/css/common.css' /*引入公共样式*/
/*加入vue title*/
import VueWechatTitle from 'vue-wechat-title'

//将API方法绑定到全局
Vue.prototype.$http=axios;
Vue.prototype.$utils=utils;
Vue.config.productionTip = false;
Vue.use(VueWechatTitle)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
