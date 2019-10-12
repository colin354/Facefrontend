import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 演示页面
      {
        path: 'page1',
        name: 'page1',
        meta: {
          title: '抓拍查询',
          auth: true
        },
        component: _import('modules/demo/page1')
      },
      {
        path: 'page2',
        name: 'page2',
        meta: {
          title: '报警查询',
          auth: true
        },
        component: _import('modules/demo/page2')
      },
      {
        path: 'page3',
        name: 'page3',
        meta: {
          title: '轨迹查询',
          auth: true
        },
        component: _import('modules/demo/page3')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      },
      // 新建人脸库
      {
        path: 'face-list',
        name: 'face-list',
        component: _import('modules/face/face'),
        meta: {
          auth: true,
          title: '人脸库管理'
        }
      },

      {
        path: 'camera',
        name: 'camera',
        component: _import('modules/face/camera'),
        meta: {
          auth: true,
          title: '摄像头管理'
        }
      },

      {
        path: 'stream-list',
        name: 'stream-list',
        component: _import('modules/stream/stream'),
        meta: {
          auth: true,
          title: '历史监控查询'
        }
      },
      {
        path: 'stream-catch',
        name: 'stream-catch',
        component: _import('modules/stream/stream_catch'),
        meta: {
          auth: true,
          title: '监控布控显示'
        }
      },
      // {
      //   path: 'camera',
      //   name: 'camera',
      //   component: _import('modules/stream/camera'),
      //   meta: {
      //     auth: true,
      //     title: '实时摄像头预览'
      //   }
      // },
      // {
      //   path: 'liveview',
      //   name: 'liveview',
      //   component: _import('modules/stream/liveview'),
      //   meta: {
      //     auth: true,
      //     title: '实时监控管理'
      //   }
      // },
      {
        path: 'real-video',
        name: 'real-video',
        component: _import('modules/stream/real-video'),
        meta: {
          auth: true,
          title: '实时监控管理'
        }
      },
      {
        path: 'face-match',
        name: 'face-match',
        component: _import('modules/face_match/index'),
        meta: {
          auth: true,
          title: '人像轨迹搜索'
        }
      },
      {
        path: 'face-search',
        name: 'face-search',
        component: _import('modules/face_match/match_search'),
        meta: {
          auth: true,
          title: ' 结构化监控查询'
        }
      },
      {
        path: 'face-websocket',
        name: 'face-websocket',
        component: _import('modules/face_match/face_websocket'),
        meta: {
          auth: true,
          title: 'websocket测试'
        }
      },
      // {
      //   path: 'face-search-by-face',
      //   name: 'face-search-by-face',
      //   component: _import('modules/face_match/match_search_by_face'),
      //   meta: {
      //     auth: true,
      //     title: '通过位置查询视频'
      //   }
      // },
      {
        path: 'multiline',//添加了与通过位置查询视频一样的界面
        name: 'multiline',
        component: _import('modules/face_match/multiline'),
        meta: {
          auth: true,
          title: '地图轨迹融合'
        }
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
