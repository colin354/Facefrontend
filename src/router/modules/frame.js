import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/demo/frame',
  name: 'demo-frame',
  meta,
  redirect: { name: 'demo-frame-index' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'index', name: `${pre}index`, component: _import('modules/frame/index'), meta: { ...meta, title: '车辆管理系统' } },
    { path: 'html', name: `${pre}html`, component: _import('modules/frame/html'), meta: { ...meta, title: 'RDM管理系统' } },
    { path: 'd2-doc', name: `${pre}d2-doc`, component: _import('modules/frame/d2-doc'), meta: { ...meta, title: '4G指挥调度平台' } },
    { path: 'dataanalyse', name: `${pre}dataanalyse`, component: _import('modules/frame/dataanalyse'), meta: { ...meta, title: '盐城市数据分析平台' } },
    { path: 'ggswgk', name: `${pre}ggswgk`, component: _import('modules/frame/ggswgk'), meta: { ...meta, title: '公共上网管控系统' } },
    { path: 'tianji', name: `${pre}tianji`, component: _import('modules/frame/tianji'), meta: { ...meta, title: '天迹' } },
    { path: 'wuye', name: `${pre}wuye`, component: _import('modules/frame/wuye'), meta: { ...meta, title: '壹零智慧物业综合管理系统' } }
  ])('demo-frame-')
}
