import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
//import { View } from '@antv/data-set'
import 'element-ui/lib/theme-chalk/index.css';
import G2 from '@antv/g2'

Vue.use(G2)
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
