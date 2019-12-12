import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store/index'

import util from '@/libs/util.js'

// 路由数据
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'
//路由与组件映射关系
import routerMapComponents from '@/routerMapComponents'
import { sysUserService } from '@/common/api'
// 路由数据
import routes from './routes'

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes,
  mode: 'history'
})

let permissionMenu, permissionRouter = []

let permission = {
  functions: [],
  roles: [],
  interfaces:[],
  isAdmin: false
}

// 标记是否已经拉取权限信息
let isFetchPermissionInfo = false

// 默认使用routerMapComponents的方式处理后端返回的权限路由
let fetchPermissionInfo = async () => {
  //处理动态添加的路由
  const formatRoutes = function (routes) {
    routes.forEach(route => {
      route.component = routerMapComponents[route.component]
      if (route.children) {
        formatRoutes(route.children)
      }
    })
  }
  let  res = await sysUserService.getInfo()
  permissionMenu = res.accessMenus
  permissionRouter = res.accessRoutes
  permission.functions = res.userPermissions
  permission.roles = res.userRoles
  // permission.interfaces = util.formatInterfaces(res.accessInterfaces)
  permission.isAdmin = res.isAdmin == 1
  formatRoutes(permissionRouter)

  let allMenuAside = [...menuAside, ...permissionMenu]
  let allMenuHeader = [...menuHeader, ...permissionMenu]
  
  
  //动态添加路由
  console.log("permissionRouter")
  console.log(permissionRouter)
  console.log("permissionRouter----end")
  router.addRoutes(permissionRouter);
  // 处理路由 得到每一级的路由设置
  store.commit('d2admin/page/init', [...frameInRoutes, ...permissionRouter])
  // 设置顶栏菜单
  store.commit('d2admin/menu/headerSet', allMenuHeader)
  // 设置侧边栏菜单
  store.commit('d2admin/menu/fullAsideSet', allMenuAside)
  // 初始化菜单搜索功能
  store.commit('d2admin/search/init', allMenuHeader)
  // 设置权限信息
  store.commit('d2admin/permission/set', permission)
  // 加载上次退出时的多页列表
  store.dispatch('d2admin/page/openedLoad')
  await Promise.resolve()
}

//免校验token白名单
let whiteList = ['/login']

/**
 * 路由拦截
 * 权限验证
 */

router.beforeEach(async(to, from, next) => {
  // 进度条
  NProgress.start()
  // 关闭搜索面板
  store.commit('d2admin/search/set', false)
  const token = util.cookies.get('token')
    if (whiteList.indexOf(to.path) === -1) {//不在白名单中
      // 这里暂时将cookie里是否存有token作为验证是否登录的条件
      // 请根据自身业务需要修改
      if (token && token !== 'undefined') { //即已经成功登录
        //拉取权限信息
        if (!isFetchPermissionInfo) { //现在是未拉取权限信息
          console.log("---此时未拉取信息------")
          console.log(to.path)
          await fetchPermissionInfo();//拉取完信息后,对拉取的路由部分进行特殊格式处理
          isFetchPermissionInfo = true;
          next(to.path, true)
        } else { //若成功拉取了权限信息,则直接进入下一步即可
          console.log("若成功拉取了权限信息,则直接进入下一步即可")
          console.log(next())
          next()
        }
      } else { //当前未登录,则登录
        // 将当前预计打开的页面完整地址临时存储 登录后继续跳转
        // 这个 cookie(redirect) 会在登录后自动删除
        util.cookies.set('redirect', to.fullPath)
        // 没有登录的时候跳转到登录界面
        next({
          name: 'login'
        })
      }
    } else {//在白名单中
      if (to.name === 'login') {
        // 如果已经登录，则直接进入系统
        if (token && token !== undefined) {
          next(from.path, true);
          NProgress.done()
        } else {
          next()
        }
      } else {
        next()
      }
    }
// router.beforeEach((to, from, next) => {
//   // 进度条
//   NProgress.start()
//   // 关闭搜索面板
//   store.commit('d2admin/search/set', false)
//   // 验证当前路由所有的匹配中是否需要有登录验证的
//   if (to.matched.some(r => r.meta.auth)) {
//     // 这里暂时将cookie里是否存有token作为验证是否登录的条件
//     // 请根据自身业务需要修改
//     const token = util.cookies.get('token')
//     if (token && token !== 'undefined') {
//       next()
//     } else {
//       // 没有登录的时候跳转到登录界面
//       // 携带上登陆成功之后需要跳转的页面完整路径
//       next({
//         name: 'login',
//         query: {
//           redirect: to.fullPath
//         }
//       })
//       // https://github.com/d2-projects/d2-admin/issues/138
//       NProgress.done()
//     }
//   } else {
//     // 不需要身份校验 直接通过
//     next()
//   }
})

router.afterEach(to => {
  // 进度条
  NProgress.done()
  // 多页控制 打开新的页面
  store.dispatch('d2admin/page/open', to)
  // 更改标题
  util.title(to.meta.title)
})

export default router
