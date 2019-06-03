// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '人像卡口',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '抓拍查询' },
      { path: '/page2', title: '报警查询' },
      { path: '/page3', title: '轨迹查询' },
      { path: '/page-demo', title: '新建示例' }
    ]
  },
  {
    title: '另一个功能',
    icon: 'folder-o'
  //   children: [
  //     { path: '/page1', title: '抓拍查询' },
  //     { path: '/page2', title: '报警查询' },
  //     { path: '/page3', title: '轨迹查询' },
  //     { path: '/page-demo', title: '新建示例' }
  //   ]
  }
]
