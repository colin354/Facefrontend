// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  // {
  //   //title: '人像卡口',
  //   icon: 'folder-o',
  //   children: [
  //     { path: '/page1', title: '抓拍查询' },
  //     { path: '/page2', title: '报警查询' },
  //     { path: '/page3', title: '轨迹查询' }
  //   ]
  // },
  {
    title: '系统管理',
    icon: 'user-circle-o',
    children: [
      // { path: '/page1', title: '抓拍查询' },
      // { path: '/page2', title: '报警查询' },
      // { path: '/page3', title: '轨迹查询' },
      { path: '/face-list', title: '人脸库管理', icon: 'address-card' },
      { path: '/camera', title: '摄像头管理', icon: 'yelp' },
      { path: '/user', title: '用户管理', icon: 'user' },
      { path: '/early-warning', title: '预警事件管理', icon: 'bell' },
      { path: '/watermark', title: '水印设置', icon: 'bookmark' }
    ]
  },
  {
    title: '监控管理',
    icon: 'television',
    children: [
      { path: '/stream-catch', title: '监控布控显示', icon: 'university' },
      // { path: '/liveview', title: '实时监控管理', icon: 'camera' },  //先暂时隐藏掉
      { path: '/stream-list', title: '历史监控查询', icon: 'magic' },
      { path: '/real-video', title: '实时监控管理', icon: 'camera' },
      // { path: '/camera', title: '实时摄像头预览', icon: 'play' },
      { path: '/face-search', title: '结构化监控查询', icon: 'gg-circle' },
      { path: '/face-websocket', title: 'websocket测试', icon: 'gg-circle' },
      { path: '/test-realTime', title: 'test-realTime', icon: 'camera' }
    ]
  },
  {
    title: '人车情报研判',
    icon: 'codiepie',
    children: [
      // { path: '/face-search', title: '结构化监控查询', icon: 'gg-circle' },
      // { path: '/face-match', title: '通过人脸查询视频', icon: 'newspaper-o' },
      { path: '/realTime', title: '人车情报研判中心', icon: 'camera' }
      // { path: '/face-search-by-face', title: '通过位置查询视频', icon: 'yelp' },
    ]
  },
  {
    title: '监控布控中心',
    icon: 'superpowers',
    children: [
      // { path: '/face-search', title: '结构化监控查询', icon: 'gg-circle' },
      // { path: '/face-match', title: '通过人脸查询视频', icon: 'newspaper-o' },
      { path: '/real-video', title: '实时监控显示', icon: 'support' },
      // { path: '/face-search-by-face', title: '通过位置查询视频', icon: 'yelp' },
    ]
  },
  {
    title: '轨迹追踪搜索',
    icon: 'paper-plane',
    children: [
      // { path: '/face-search', title: '结构化监控查询', icon: 'gg-circle' },
      // { path: '/face-match', title: '通过人脸查询视频', icon: 'newspaper-o' },
      { path: '/multiline', title: '地图轨迹融合', icon: 'yelp' },
      { path: '/face-match', title: '人像轨迹搜索', icon: 'newspaper-o' },
      // { path: '/face-search-by-face', title: '通过位置查询视频', icon: 'yelp' },
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
    title: '数据库管理',
    icon: 'database',
    children: [
      { path: '/sensitive-database', title: '敏感数据库管理', icon: 'cube' },
      { path: '/whitelist-database', title: '白名单数据库管理', icon: 'cubes' }
    ]
  }
]
