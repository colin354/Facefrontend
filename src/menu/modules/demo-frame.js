export default {
  path: '/demo/frame',
  title: '信息综合应用平台',
  icon: 'globe',
  children: (pre => [
    // { path: `${pre}index`, title: '车辆管理系统', icon: 'home' },
    { path: `${pre}d2-doc`, title: '4G指挥调度平台', icon: 'dot-circle-o ' },
    // { path: `${pre}html`, title: 'RDM管理系统', icon: 'code' },
    // { path: `${pre}tianji`, title: '天迹', icon: 'dot-circle-o ' },
    { path: `${pre}dataanalyse`, title: '盐城市数据分析平台', icon: 'dot-circle-o ' },
    { path: `${pre}wuye`, title: '壹零智慧物业综合管理系统', icon: 'dot-circle-o ' },
    { path: `${pre}ggswgk`, title: '公共上网管控系统', icon: 'dot-circle-o ' },
    {
      title: '新窗口打开链接',
      icon: 'link',
      children: [
        { path: 'http://118.190.164.248:8088/', title: '4G指挥调度平台', icon: 'globe' },
        { path: 'https://tianji.zmeng123.cn/login', title: '天迹', icon: 'globe' },
        { path: 'http://221.231.1.206:9080/datamanager/', title: '盐城市数据分析平台', icon: 'globe' },
        { path: 'http://01.0easy.com/yihao01-ecommunity-cloud/sso/login.jsp', title: '壹零智慧物业综合管理系统', icon: 'globe' },
        { path: 'https://221.231.126.66:81/', title: '公共上网管控系统', icon: 'globe' }
      ]
    }
  ])('/demo/frame/')
}
