export default {
  path: '/demo/frame',
  title: '信息综合应用平台',
  icon: 'globe',
  children: (pre => [
    // { path: `${pre}index`, title: '车辆管理系统', icon: 'home' },
    { path: `${pre}d2-doc`, title: '4G指挥调度平台', icon: 'dot-circle-o ' },
    // { path: `${pre}html`, title: 'RDM管理系统', icon: 'code' },
    { path: `${pre}tianji`, title: '天迹', icon: 'dot-circle-o ' },
    { path: `${pre}dataanalyse`, title: '盐城市数据分析平台', icon: 'dot-circle-o ' },
    { path: `${pre}wuye`, title: '壹零智慧物业综合管理系统', icon: 'dot-circle-o ' },
    { path: `${pre}ggswgk`, title: '公共上网管控系统', icon: 'dot-circle-o ' }
  ])('/demo/frame/')
}
