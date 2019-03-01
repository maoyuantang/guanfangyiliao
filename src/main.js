// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
Vue.config.productionTip = false
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index.js'
import $ from 'jquery'

import elementUi from './plugs/elementUi.js'
import iView from './plugs/iview'
import 'element-ui/lib/theme-chalk/index.css'
import './icons/baseIcon.css'
import 'iview/dist/styles/iview.css'
import echarts from 'echarts'


import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'



import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
})
Vue.use(VueQuillEditor)

Vue.prototype.$echarts = echarts 

Vue.use(elementUi);
Vue.use(iView);

Vue.config.productionTip = false

//router.beforeEach((to, from, next) => {
///* 路由发生变化修改页面title */
//if (to.meta.title) {
//  document.title = to.meta.title
//}
//next()
//})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
