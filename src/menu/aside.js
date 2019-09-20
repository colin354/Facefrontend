// 菜单 侧边栏
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
    title: '人脸库管理',
    icon: 'user-circle-o',
    children: [
      // { path: '/page1', title: '抓拍查询' },
      // { path: '/page2', title: '报警查询' },
      // { path: '/page3', title: '轨迹查询' },
      { path: '/face-list', title: '人脸库列表', icon: 'transgender-alt' }
    ]
  },
  {
    title: '流信息模块',
    icon: 'gift',
    children: [
      { path: '/stream-list', title: '摄像头视频信息', icon: 'magic' },
      { path: '/stream-catch', title: '摄像头位置预览', icon: 'university' }
    ]
  },
  {
    title: '结构化信息查询',
    icon: 'paper-plane',
    children: [
      { path: '/face-search', title: '结构化视频列表', icon: 'gg-circle' },
      { path: '/face-match', title: '通过人脸查询视频', icon: 'newspaper-o' },
      { path: '/face-search-by-face', title: '通过位置查询视频', icon: 'yelp' },
      { path: '/multiline', title: '轨迹线', icon: 'yelp' }
    ]
  }
]
