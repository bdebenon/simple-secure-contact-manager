import Vue from 'vue'
import App from './service/App.vue'
import router from './service/router'
import store from './service/store'
import vuetify from './service/plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
