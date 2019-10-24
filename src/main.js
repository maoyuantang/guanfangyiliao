// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'babel-polyfill'
import 'jquery'
import './plugs/elementUi.js'
import './plugs/iview'
import './plugs/VueQuillEditor.js'
import './plugs/Viewer.js'
import './plugs/VideoPlayer.js'
import './icons/baseIcon.css'
import Vue from 'vue'
import App from './App'
import store from './vuex/index.js'
import router from './router'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
