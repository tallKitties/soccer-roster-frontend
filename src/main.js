// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import SuiVue from 'semantic-ui-vue'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'

Vue.use(BootstrapVue)
Vue.use(VeeValidate)
Vue.use(SuiVue)
Vue.use(VueAxios, axios)
axios.defaults.baseURL = process.env.ROOT_API
Vue.config.productionTip = false

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
