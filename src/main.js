import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import { Message } from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/js/icon/iconfont.css'
Vue.use(ElementUI)


const $message = options => {
  return Message({
    ...options,
    offset: 200
  });
};
 
//重写方法,将offset写入options
['success', 'warning', 'info', 'error'].forEach(type => {
  $message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options,
        offset: 100
      };
    }
    options.type = type;
    return Message(options);
  };
});
//将$message挂载到this上
Vue.prototype.$message = $message;
//如果用要使用 `this.$message.closeAll()`则加上下面
Vue.prototype.$message.closeAll =Message.closeAll;


// import VConsole from 'vconsole';
//  let vConsole = new VConsole();
Vue.config.productionTip = false
//全局引入echarts
import * as echarts from 'echarts';
//需要挂载到Vue原型上
Vue.prototype.$echarts = echarts

// 淘宝无线适配
import '@/assets/js/flexible';
//公共css文件
import '@/assets/comm.css';

new Vue({
  router:router,
  store,
  render: h => h(App)
}).$mount('#app')
