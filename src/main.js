// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Row,Col,Pagination,Button,Dialog,Input,Form,FormItem,Radio,RadioGroup,Image,Upload} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/iconfont/iconfont.css';
import {post,get} from '../static/js/utils/http'
import apis from '../static/js/apis.js';
import common_function from '../static/js/utils/common.js';
Vue.config.productionTip = false
/* axios请求封装 */
Vue.prototype.$get = get
Vue.prototype.$post = post
/* 统一接口管理 */
Vue.prototype.apis = apis;
Vue.prototype.$common_function = common_function;

Vue.use(Row)
Vue.use(Col)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Image)
Vue.use(Upload)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
