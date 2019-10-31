export default {
  path: '/demo/frame',
  title: '第三方平台',
  icon: 'globe',
  children: (pre => [
    { path: `${pre}index`, title: '车辆管理系统', icon: 'home' },
    { path: `${pre}d2-doc`, title: '摄像头管理系统', iconSvg: 'd2-admin' },
    { path: `${pre}html`, title: 'RDM管理系统', icon: 'code' }
  ])('/demo/frame/')
}
