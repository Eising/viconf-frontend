import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {APIService} from './APIService.js'

Vue.config.productionTip = false
import vuetify from './plugins/vuetify';
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

Vue.use(VuetifyDialog)



Vue.prototype.$api = new APIService

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
