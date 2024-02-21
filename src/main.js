import Vue from 'vue'
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import installElementPlus from './plugins/element'
import VConsole from 'vconsole';


import VueClipBoard from 'vue-clipboard2'
console.log('App---->', App)

// const vConsole = new VConsole();
const app = createApp(App)
app.config.productionTip = false
app.config.ignoredElements = ['wx-open-launch-weapp'];
import Vant from 'vant';
import { Button,CountDown,Toast ,Swipe, SwipeItem,Search,Icon,Field,Divider, CellGroup,Checkbox,Collapse, CollapseItem , Empty,CheckboxGroup,Picker,Popup,Calendar,Cell,Dialog,TreeSelect  } from 'vant';
import 'vant/lib/index.css';
import 'reset-css'
import "pdfh5/css/pdfh5.css";
import ElementPlus from 'element-plus'

VueClipBoard.config.autoSetContainer = true
// installElementPlus(app)
app.use(Button).use(CountDown).use(Toast)
.use(Swipe).use(SwipeItem)
.use(Search).use(Icon)
.use(Field).use(CellGroup)
.use(Checkbox).use(Picker).use(Cell).use(Popup).use(Calendar)
.use(Dialog).use(VueClipBoard)
.use(Collapse).use(CollapseItem)
.use(Empty).use(Divider)
.use(TreeSelect)
app.use(store)
.use(router)
.mount('#app')
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
