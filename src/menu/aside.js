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
    title: '人像库管理',
    icon: 'user-circle-o',
    children: [
      // { path: '/page1', title: '抓拍查询' },
      // { path: '/page2', title: '报警查询' },
      // { path: '/page3', title: '轨迹查询' },
      { path: '/face-list', title: '人脸库列表', icon: 'transgender-alt' }
    ]
  },
  {
    title: '监控管理',
    icon: 'gift',
    children: [
      { path: '/stream-catch', title: '监控布控显示', icon: 'university' },
      // { path: '/liveview', title: '实时监控管理', icon: 'camera' },  //先暂时隐藏掉
      { path: '/stream-list', title: '历史监控查询', icon: 'magic' },
      { path: '/real-video', title: '实时监控管理', icon: 'camera' },
      // { path: '/camera', title: '实时摄像头预览', icon: 'play' },
      { path: '/face-search', title: '结构化监控查询', icon: 'gg-circle' },
    ]
  },
  {
    title: '轨迹搜索',
    icon: 'paper-plane',
    children: [
      // { path: '/face-search', title: '结构化监控查询', icon: 'gg-circle' },
      // { path: '/face-match', title: '通过人脸查询视频', icon: 'newspaper-o' },
      { path: '/multiline', title: '地图轨迹融合', icon: 'yelp' },
      { path: '/face-match', title: '人像轨迹搜索', icon: 'newspaper-o' },
      // { path: '/face-search-by-face', title: '通过位置查询视频', icon: 'yelp' },
    ]
  }
]
