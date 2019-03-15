// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index.js'
import $ from 'jquery'
import elementUi from './plugs/elementUi.js'
import iView from './plugs/iview'
import VueQuillEditor from './plugs/VueQuillEditor.js'
import Viewer from './plugs/Viewer.js'
import VideoPlayer from './plugs/VideoPlayer.js'
import './icons/baseIcon.css'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// import  VueQuillEditor from 'vue-quill-editor'
// // require styles 引入样式
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'



// import Viewer from 'v-viewer'
// import 'viewerjs/dist/viewer.css'
// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// Vue.use(VideoPlayer)

// Vue.use(Viewer);
// Viewer.setDefaults({
//   Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
// })
// Vue.use(VueQuillEditor)

// Vue.use(Button)
// Vue.use(Select)
// Vue.use(Dialog)
// Vue.use(Pagination)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(Menu)
// Vue.use(Input)
// Vue.use(Radio)

// Vue.use(RadioGroup)
// Vue.use(Checkbox)
// Vue.use(CheckboxButton)
// Vue.use(CheckboxGroup)
// Vue.use(Switch)
// Vue.use(Option)
// Vue.use(OptionGroup)
// Vue.use(ButtonGroup)
// Vue.use(Table)
// Vue.use(TableColumn)

// Vue.use(DatePicker)
// Vue.use(TimeSelect)
// Vue.use(TimePicker)
// Vue.use(Popover)
// Vue.use(Tooltip)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Tabs)
// Vue.use(Tag)
// Vue.use(Tree)

// Vue.use(Icon)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Upload)
// Vue.use(Steps)
// Vue.use(Step)
// Vue.use(Cascader)
// Vue.use(Loading)
// Vue.use(Message)
// Vue.use(Notification)

// Vue.use(MessageBox)
// Vue.use(MenuItem)

// Vue.prototype.$echarts = echarts 

// Vue.prototype.$loading = Loading.service
// Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$notify = Notification
// Vue.prototype.$message = Message

// Vue.use(elementUi);
// Vue.use(iView);


// debugger



