import demoFrame from './modules/demo-frame'
// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  // {
  //   title: '人像卡口',
  //   icon: 'folder-o',
  //   children: [
  //     { path: '/page1', title: '抓拍查询' },
  //     { path: '/page2', title: '报警查询' },
  //     { path: '/page3', title: '轨迹查询' }
  //   ]
  // },
  {
    title: '三维立体警务巡防中心',
    icon: 'futbol-o',
    children: [
      { title: '监控中心',
        icon: 'universal-access',
        children: [
          {
            title: '实时监控',
            icon: 'television',
            children: [
              { path: '/liveview', title: '实时监控显示', icon: 'play' },
              { path: '/stream-catch', title: '地图布控显示', icon: 'support' },
              { path: '/video_map_list', title: '实时视频显示', icon: 'support' }
            ]
          },
          {
            title: '监控管理',
            icon: 'yelp',
            children: [
              { path: '/camera-list', title: '历史监控查询', icon: 'magic' }
            ]
          }
        ]
      },
      { title: '人车情报研判中心', icon: 'camera', path: '/testws' },
      { title: '轨迹追踪中心',
        icon: 'paper-plane',
        children: [
          { path: '/multiline', title: '地图轨迹融合', icon: 'yelp' },
          { path: '/face-match', title: '人像轨迹搜索', icon: 'newspaper-o' }
        ]
      },
      { title: '视频结构化中心', path: '/structured_video', icon: 'gg-circle' }
    ]
  },
  {
    title: '预警事件中心',
    icon: 'bell-o',
    children: [
      { path: '/warning-query', title: '预警事件查询', icon: 'bell' },
      { path: '/early-warning', title: '预警事件管理', icon: 'bell' },
      { path: '/early-warning-type', title: '预警事件类型管理', icon: 'bell' }
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
  demoFrame,
  {
    title: '系统管理',
    icon: 'gear',
    children: [
      {
        title: '系统用户管理',
        icon: 'database',
        children: [
          { path: '/user', title: '用户管理', icon: 'user' },
          { path: '/user', title: '权限管理', icon: 'user' },
        ]
      },
      {
        title: '数据库管理',
        icon: 'database',
        children: [
          { path: '/face-list', title: '人口数据库', icon: 'address-card' },
          { path: '/stranger-list', title: '陌生人口数据库', icon: 'address-card' },
          { path: '/camera-detect', title: '摄像头数据库', icon: 'video-camera' },
          { path: '/whitelist-database', title: '车辆数据库', icon: 'cubes' },
          { path: '/camera-database', title: '归档视频', icon: 'cubes' }
        ]
      },
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
        title: '系统设置',
        icon: 'file-text',
        children: [
          { path: '/watermark', title: '水印设置', icon: 'bookmark' }
        ]
      }
    ]
  }
]
