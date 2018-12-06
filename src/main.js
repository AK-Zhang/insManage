// 1.0 导入vue核心包
import Vue from 'vue'
// 2.0 导入App.vue的vue对象
import App from './App'
// 3.0 将 vue-route 集成到这个项目中来
import router from './router'
// 3.0.1 将 vueRoute 对象绑定到vue对象上
//使用elsementUi
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import loginApi from './api/login.js';
Vue.prototype.$loginapi = loginApi;

import indexApi from './api/index.js'
Vue.prototype.$indexapi = indexApi;

// 导入axios

import promise from 'es6-promise';
promise.polyfill();


import axios from 'axios';

//导入全局js
import './assets/libs/jquery.min.js'
import './assets/libs/less.js/less.min.js'
import './assets/libs/bootstrap/dist/js/bootstrap.js'
import './assets/js/index.js'
import textPwd from './assets/js/textPassWord'
Vue.prototype.textPwd = textPwd;


// 6.0 引入全局 css
import './assets/less/base.less'
import './assets/libs/bootstrap/dist/css/bootstrap.min.css'
import './assets/libs/font-awesome/css/font-awesome.min.css'
import './assets/libs/layui/css/layui.css'
import './assets/less/mask.less';
import './assets/css/account.less';
// import './assets/less/common_01.less'

import isShowHtml from './assets/js/Css_moudules'
Vue.prototype.$isShowHtml = isShowHtml;
// import './hongda/assets/less/index.less';
//导入全局字体图标
import './assets/iconfont/iconfont.css'


// 7.0 引入vue-resource， 并绑定， 就会自动在Vue实例上注册一个$http对象
// import VueResource from 'vue-resource';
// Vue.use(VueResource);

// 8.0 定义一个全局过滤器实现日期的格式化
import moment from 'moment';
Vue.filter('datefmt', function (input, fmtstring) {
  return moment(input).format(fmtstring)
})

// // 10.0 使用图片预览组件
// import VuePreview from 'vue-preview'
// Vue.use(VuePreview)


Vue.config.productionTip = false;

/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  router,
  store: loginApi.store,
  mounted() {

  },
  components: {
    home: App
  },
  template: '<home/>'
})





// console.log(vue.$store.state.islogin)
// console.log(vue.$store.state.uname)
// console.log(vue.$store.state.pwd)
// console.log(vue.$store.state.inscode)
// el: '#app',
// router,
// data: {
//   currentRoute: window.location.pathname
// },
// computed: {
//   ViewComponent() {
//     console.log("currentRoute " + this.currentRoute)
//     return router.options.routes[1];
//   }
// },
// render(h) {
//   return h(this.ViewComponent)
// }
