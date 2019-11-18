// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Row, Col } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
/* import '@/assets/css/iconfont.css'; */
import '@/assets/iconfont.css';

Vue.config.productionTip = false
Vue.use(Row)
Vue.use(Col)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
