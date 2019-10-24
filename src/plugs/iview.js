import Vue from 'vue'
import 'iview/dist/styles/iview.css'
import {
    Dropdown,
    DropdownItem,
	DropdownMenu,
    Timeline,
    TimelineItem,
    Modal,
    Icon
} from 'iview'

const iviewModule = {
    Dropdown,
    DropdownItem,
	DropdownMenu,
    Timeline,
    TimelineItem,
    Modal,
    Icon
}
Object.keys(iviewModule).forEach(key=>{
    Vue.component(key, iviewModule[key]);
})
// import iview from 'iview'

export default iviewModule
// export default iview
