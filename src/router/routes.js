import frame from './modules/frame'
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
        path: 'user',
        name: 'user',
        component: _import('modules/sys/user'),
        meta: {
          auth: true,
          title: '用户管理'
        }
      },
      // {
      //   path: 'role',
      //   name: 'role',
      //   component: _import('modules/sys/role'),
      //   meta: {
      //     auth: true,
      //     title: '角色管理'
      //   }
      // },
      // {
      //   path: 'menuManage',
      //   name: 'menuManage',
      //   component: _import('modules/sys/menuManage'),
      //   meta: {
      //     auth: true,
      //     title: '菜单管理'
      //   }
      // },
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
      {
        path: 'liveview',
        name: 'liveview',
        component: _import('modules/stream/liveview'),
        meta: {
          auth: true,
          title: '实时监控管理'
        }
      },
      {
        path: 'real-video',
        name: 'real-video',
        component: _import('modules/stream/real-video'),
        meta: {
          auth: true,
          title: '地图布控显示'
        }
      },
      {
        path: 'face-match',
        name: 'face-match',
        component: _import('modules/face_match/face-match'),
        meta: {
          auth: true,
          title: '人像轨迹搜索'
        }
      },
      {
        path: 'match_search',
        name: 'match_search',
        component: _import('modules/face_match/match_search'),
        meta: {
          auth: true,
          title: ' 结构化监控查询'
        }
      },
      {
        path: 'structured_video',
        name: 'structured_video',
        component: _import('modules/face_match/structured_video'),
        meta: {
          auth: true,
          title: ' 视频结构化展示'
        }
      },
      // {
      //   path: 'face-websocket',
      //   name: 'face-websocket',
      //   component: _import('modules/face_match/face_websocket'),
      //   meta: {
      //     auth: true,
      //     title: 'websocket测试'
      //   }
      // },
      // {
      //   path: 'test-realTime',
      //   name:'test-realTime',
      //   component: _import('modules/face_match/test-realTime'),
      //   meta: {
      //     auth: true,
      //     title: 'test-realTime'
      //   }
      // },
      // {
      //   path: 'face-search-by-face',
      //   name: 'face-search-by-face',
      //   component: _import('modules/face_match/match_search_by_face'),
      //   meta: {
      //     auth: true,
      //     title: '通过位置查询视频'
      //   }
      // },
      // 添加了与通过位置查询视频一样的界面
      {
        path: 'multiline',
        name: 'multiline',
        component: _import('modules/face_match/multiline'),
        meta: {
          auth: true,
          title: '地图轨迹融合'
        }
      },
      {
        path: 'sys-log-login',
        name: 'sys-log-login',
        component: _import('modules/sys/log-login'),
        meta: {
          auth: true,
          title: '登录日志'
        }
      },
      {
        path: 'sys-log-operation',
        name: 'sys-log-operation',
        component: _import('modules/sys/log-operation'),
        meta: {
          auth: true,
          title: '操作日志'
        }
      },
      {
        path: 'sys-log-error',
        name: 'sys-log-error',
        component: _import('modules/sys/log-error'),
        meta: {
          auth: true,
          title: '异常日志'
        }
      },
      {
        path: 'early-warning',
        name: 'early-warning',
        component: _import('modules/warning/early-warning'),
        meta: {
          auth: true,
          title: '预警事件管理'
        }
      },
      {
        path: 'warning-query',
        name: 'warning-query',
        component: _import('modules/warning/warning-query'),
        meta: {
          auth: true,
          title: '预警事件查询'
        }
      },
      {
        path: 'watermark',
        name: 'watermark',
        component: _import('modules/face/watermark'),
        meta: {
          auth: true,
          title: '水印设置'
        }
      },
      {
        path: 'sensitive-database',
        name: 'sensitive-database',
        component: _import('modules/sys/sensitive-database'),
        meta: {
          auth: true,
          title: '敏感数据库管理'
        }
      },
      {
        path: 'whitelist-database',
        name: 'whitelist-database',
        component: _import('modules/sys/whitelist-database'),
        meta: {
          auth: true,
          title: '白名单数据库管理'
        }
      },
      {
        path: 'realTime',
        name: 'realTime',
        component: _import('modules/research-center/realTime'),
        meta: {
          auth: true,
          title: '人车情报研判中心'
        }
      },
      {
        path: 'testws',
        name: 'testws',
        component: _import('modules/research-center/testws'),
        meta: {
          auth: true,
          title: '人车情报研判中心'
        }
      },
      {
        path: 'camera-detect',
        name: 'camera-detect',
        component: _import('modules/face/camera-detect'),
        meta: {
          auth: true,
          title: '摄像头管理'
        }
      },
      {
        path: 'camera-check',
        name: 'camera-check',
        component: _import('modules/face/camera-check'),
        meta: {
          auth: true,
          title: '检测运维'
        }
      },      
      {
        path: 'wea-analyse',
        name: 'wea-analyse',
        component: _import('modules/dataanalyse/wea-analyse'),
        meta: {
          auth: true,
          title: '水电煤数据分析'
        }
      },
      {
        path: 'people-analyse',
        name: 'people-analyse',
        component: _import('modules/dataanalyse/people-analyse'),
        meta: {
          auth: true,
          title: '人口数据分析'
        }
      },
      {
        path: 'enterprise-analyse',
        name: 'enterprise-analyse',
        component: _import('modules/dataanalyse/enterprise-analyse'),
        meta: {
          auth: true,
          title: '企业数据分析'
        }
      },
      {
        path: 'express-analyse',
        name: 'express-analyse',
        component: _import('modules/dataanalyse/express-analyse'),
        meta: {
          auth: true,
          title: '快递数据分析'
        }
      },
      {
        path: 'ss-analyse',
        name: 'ss-analyse',
        component: _import('modules/dataanalyse/ss-analyse'),
        meta: {
          auth: true,
          title: '社保数据分析'
        }
      },      
      {
        path: 'camera-analyse',
        name: 'camera-analyse',
        component: _import('modules/dataanalyse/camera-analyse'),
        meta: {
          auth: true,
          title: '影像数据分析'
        }
      }
    ]
  },
  frame
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
