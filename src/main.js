// Vue
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'
// 多国语
import i18n from '@/i18n'

// import 'jquery'
// import 'jquery-ui'
/* import ampleadmin */
// import './assets/material/bootstrap/dist/css/bootstrap.min.css'
// import './assets/plugins/bower_components/sidebar-nav/dist/sidebar-nav.min.css'
// import './assets/material/css/animate.css'
// import './assets/material/css/style.css'
// import './assets/material/css/colors/default.css'
// // import './assets/material/css/colors/megna-dark.css'
// import './assets/plugins/bower_components/jquery/dist/jquery.min'
// import './assets/material/bootstrap/dist/js/bootstrap.min'
// import './assets/plugins/bower_components/sidebar-nav/dist/sidebar-nav.min'
// import './assets/material/js/jquery.slimscroll'
// import './assets/material/js/waves'
// import './assets/material/js/custom.min'
// import './assets/plugins/bower_components/styleswitcher/jQuery.style.switcher'
// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'
import SplitPane from 'vue-splitpane'
import VCharts from 'v-charts'
import VueAMap from 'vue-amap'
import { lazyAMapApiLoaderInstance } from 'vue-amap'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
// import watermark from '../src/assets/waterMark.js'
// import 'vuetify/dist/vuetify.min.css'
const bus = new Vue()

import event from '@/components/views/js/event'
import axios from '@/plugin/axios/http'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//引入基本模板
let echart = require('echarts/lib/echarts')
//引入柱状图组件
require('echarts/lib/chart/bar')
//引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

// Vue.prototype.$watermark = watermark
Vue.prototype.EVENT = event
Vue.prototype.$http = axios
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 核心插件
Vue.use(VueDirectiveImagePreviewer) 
Vue.use(d2Admin)
Vue.use(VCharts)
Vue.use(VueAMap)
Vue.use(Vuetify)
// Vue.component('SplitPane', SplitPane)

// VueAMap.initAMapApiLoader({
//   key: 'e8d88ad5fce9142a64cf942e06a961bd',
//   plugin: ['AMap.MarkerClusterer', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   uiVersion: '1.0', // ui库版本，不配置不加载,
//   v: '1.4.4' // 默认高德 sdk 版本为 1.4.4
// })

// lazyAMapApiLoaderInstance.load().then(() => {
//   // your code ...
//   localStorage.removeItem('_AMap_raster')
//   Vue.use(VueAMap)
// })

new Vue({
  router,
  store,
  i18n,
  data: {
    bus
  },
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  },
  // watch: {
  //   '$route.matched'(val){
  //     let fullAside = this.$store.state.d2Admin.menu.fullAside
  //     const _side = fullAside.filter(menu => menu.path === val[0].path)
  //     this.$store.commit('d2admin/menu/asideSet',_side.length > 0 ? _side[0].children : [])
  //   }
  // }
}).$mount('#app')
