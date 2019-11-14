import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'u-reset.css'
import Vant from 'vant'
import {PullRefresh,Toast} from 'vant'
import 'vant/lib/index.css';
import Vuex from 'vuex'
import store from './store'

Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(PullRefresh)
Vue.use(Vuex)
Vue.use(Toast)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
