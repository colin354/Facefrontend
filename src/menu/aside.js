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
    title: '人脸库',
    icon: 'fa fa-user-o',
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
      { path: '/stream-list', title: '流信息', icon: 'magic' },
      { path: '/stream-catch', title: '抓拍查询', icon: 'university' }
    ]
  },
  {
    title: '匹配信息模块',
    icon: 'paper-plane',
    children: [
      // { path: '/face-match', title: '匹配信息', icon: 'paper-plane' },
      { path: '/face-search', title: '查询模块(流)', icon: 'gg-circle' },
      { path: '/face-search-by-face', title: '查询模块(人脸)', icon: 'youtube-play' }
    ]
  }
]
