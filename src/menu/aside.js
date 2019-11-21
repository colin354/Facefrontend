import demoFrame from './modules/demo-frame'
// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '人像卡口',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '抓拍查询' },
      { path: '/page2', title: '报警查询' },
      { path: '/page3', title: '轨迹查询' }
    ]
  },
  {
    title: '大数据分析',
    icon: 'linode',
    children: [
      { path: '/people-analyse', title: '人口数据分析', icon: 'tint' },
      { path: '/enterprise-analyse', title: '企业数据分析', icon: 'tint' },
      { path: '/wea-analyse', title: '水电气数据分析', icon: 'tint' },
      { path: '/express-analyse', title: '快递数据分析', icon: 'tint' },
      { path: '/ss-analyse', title: '社保数据分析', icon: 'tint' },
      { path: '/week-analyse', title: '周数据分析', icon: 'tint' }
    ]
  },
  {
    title: '治安防控',
    icon: 'futbol-o',
    children: [
      { title: '智慧小区',
        icon: 'universal-access',
        children: [
          {
            title: '监控布控中心',
            icon: 'television',
            children: [
              { path: '/liveview', title: '实时监控显示', icon: 'play' },
              { path: '/real-video', title: '地图布控显示', icon: 'support' },
              { path: '/stream-list', title: '历史监控查询', icon: 'magic' }
            ]
          },
          {
            title: '情报研判中心',
            icon: 'codiepie',
            children: [
              { path: '/testws', title: '人车情报研判中心', icon: 'camera' },
              { path: '/structured_video', title: '视频结构化展示', icon: 'gg-circle' }
            ]
          },
          {
            title: '轨迹追踪',
            icon: 'paper-plane',
            children: [
              { path: '/multiline', title: '地图轨迹融合', icon: 'yelp' },
              { path: '/face-match', title: '人像轨迹搜索', icon: 'newspaper-o' }
            ]
          }
        ]
      },
      { title: '视频融合中', icon: 'link' },
      { title: '三位立体警务巡防系统', icon: 'tint' }
    ]
  },
  {
    title: '预警事件中心',
    icon: 'bell-o',
    children: [
      { path: '/warning-query', title: '预警事件查询', icon: 'share-alt-square' },
      { path: '/early-warning', title: '预警事件管理', icon: 'bell' },
      { path: '/early-warning-type', title: '预警事件类型管理', icon: 'bell' }
    ]
  },
  demoFrame,
  {
    title: '系统管理',
    icon: 'gear',
    children: [
      { path: '/user', title: '用户管理', icon: 'user' },
      // { path: '/role', title: '角色管理', icon: 'refresh' },
      // { path: '/menuManage', title: '菜单管理', icon: 'unlock' },
      { path: '/face-list', title: '人脸库管理', icon: 'address-card' },
      // { path: '/camera', title: '摄像头管理', icon: 'video-camera' },
      { path: '/camera-detect', title: '摄像头管理', icon: 'video-camera' },
      { path: '/watermark', title: '水印设置', icon: 'bookmark' },
      {
        title: '日志管理',
        icon: 'file-text',
        children: [
          { path: '/sys-log-login', title: '登录日志', icon: 'file-word-o' },
          { path: '/sys-log-operation', title: '操作日志', icon: 'file-archive-o' },
          { path: '/sys-log-error', title: '异常日志', icon: 'file-o' }
        ]
      },
      {
        title: '数据库管理',
        icon: 'database',
        children: [
          { path: '/sensitive-database', title: '敏感数据库管理', icon: 'cube' },
          { path: '/whitelist-database', title: '白名单数据库管理', icon: 'cubes' }
        ]
      }
    ]
  }
]
