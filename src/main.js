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

// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'
import VueAMap from 'vue-amap'
import { lazyAMapApiLoaderInstance } from 'vue-amap'
// import watermark from '../src/assets/waterMark.js'
// import 'vuetify/dist/vuetify.min.css'
const bus = new Vue()

// import event from '@/components/views/js/event'
import axios from '@/plugin/axios/http'

//引入基本模板

// Vue.prototype.$watermark = watermark
// Vue.prototype.EVENT = event
Vue.prototype.$http = axios
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 核心插件
Vue.use(d2Admin)
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
