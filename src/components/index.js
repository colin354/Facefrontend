import Vue from 'vue'

import d2Container from './d2-container'
import d2ContainerFrame from './d2-container-frame'
import databox from './databox'
import loading from './loading'
import icon from './icon'
import particles from './particles'
import nouser from './nouser'
import topnav from './topnav'

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container)
Vue.component('d2-container-frame', d2ContainerFrame)
Vue.component('databox', databox)
Vue.component('loading', loading)
Vue.component('icon', icon)
Vue.component('topnav', topnav)
Vue.component('particles', particles)
Vue.component('nouser', nouser)
Vue.component('d2-icon', () => import('./d2-icon'))
Vue.component('d2-icon-svg', () => import('./d2-icon-svg/index.vue'))
