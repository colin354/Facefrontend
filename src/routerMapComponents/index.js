const files = require.context('./', true, /\.js$/);
import layoutHeaderAside from '@/layout/header-aside'

let componentMaps = {
    "layoutHeaderAside": layoutHeaderAside,

    //注意。。。注意。。。后端返回的component与下面的key值必须对应 
    //如"face-list",""里面的,对应的是界面上地址栏里的信息

    "enterprise-analyse": () => import(/* webpackChunkName: "enterprise-analyse" */'@/views/modules/dataanalyse/enterprise-analyse'),
    "express-analyse": () => import(/* webpackChunkName: "express-analyse" */'@/views/modules/dataanalyse/express-analyse'),
    "people-analyse": () => import(/* webpackChunkName: "people-analyse" */'@/views/modules/dataanalyse/people-analyse'),
    "ss-analyse": () => import(/* webpackChunkName: "ss-analyse" */'@/views/modules/dataanalyse/ss-analyse'),
    "wea-analyse": () => import(/* webpackChunkName: "wea-analyse" */'@/views/modules/dataanalyse/wea-analyse'),
    "week-analyse": () => import(/* webpackChunkName: "week-analyse" */'@/views/modules/dataanalyse/week-analyse'),

    "camera-detect": () => import(/* webpackChunkName: "camera-detect" */'@/views/modules/face/camera-detect'),
    "watermark": () => import(/* webpackChunkName: "watermark" */'@/views/modules/face/watermark'),
    "camera": () => import(/* webpackChunkName: "camera" */'@/views/modules/face/camera'),
    "face-list": () => import(/* webpackChunkName: "face" */'@/views/modules/face/face'),
    "stranger-list": () => import(/* webpackChunkName: "face" */'@/views/modules/face/stranger'),
    "plate-list": () => import(/* webpackChunkName: "plate" */'@/views/modules/face/plate'),

    "face-match": () => import(/* webpackChunkName: "face-match" */'@/views/modules/face_match/face-match'),
    "match_search": () => import(/* webpackChunkName: "match_search" */'@/views/modules/face_match/match_search'),
    "structured_video": () => import(/* webpackChunkName: "structured_video" */'@/views/modules/face_match/structured_video'),
    "multiline": () => import(/* webpackChunkName: "multiline" */'@/views/modules/face_match/multiline'),

    "d2-doc": () => import(/* webpackChunkName: "d2-doc" */'@/views/modules/frame/d2-doc/'),
    "dataanalyse": () => import(/* webpackChunkName: "dataanalyse" */'@/views/modules/frame/dataanalyse'),
    "ggswgk": () => import(/* webpackChunkName: "ggswgk" */'@/views/modules/frame/ggswgk'),
    "tianji": () => import(/* webpackChunkName: "tianji" */'@/views/modules/frame/tianji/'),
    "wuye": () => import(/* webpackChunkName: "wuye" */'@/views/modules/frame/wuye'),

    "testws": () => import(/* webpackChunkName: "testws" */'@/views/modules/research-center/testws'),

    "stream_catch": () => import(/* webpackChunkName: "stream_catch" */'@/views/modules/stream/stream_catch'),
    "liveview": () => import(/* webpackChunkName: "liveview" */'@/views/modules/stream/liveview'),
    "stream-list": () => import(/* webpackChunkName: "stream" */'@/views/modules/stream/stream'),
    "real-video": () => import(/* webpackChunkName: "real-video" */'@/views/modules/stream/real-video'),

    "camera-database": () => import(/* webpackChunkName: "sensitive-database" */'@/views/modules/sys/camera-database'),
    "whitelist-database": () => import(/* webpackChunkName: "whitelist-database" */'@/views/modules/sys/whitelist-database'),
    "log-operation": () => import(/* webpackChunkName: "log-operation" */'@/views/modules/sys/log-operation'),
    "log-login": () => import(/* webpackChunkName: "log-login" */'@/views/modules/sys/log-login'),
    "log-error": () => import(/* webpackChunkName: "log-error" */'@/views/modules/sys/log-error'),
    "user": () => import(/* webpackChunkName: "user" */'@/views/modules/sys/user'),
    "userPermission": () => import(/* webpackChunkName: "user" */'@/views/modules/sys/userPermission'),
    "userMenu": () => import(/* webpackChunkName: "user" */'@/views/modules/sys/userMenu'),

    "early-warning": () => import(/* webpackChunkName: "early-warning" */'@/views/modules/warning/early-warning'),
    "early-warning-type": () => import(/* webpackChunkName: "early-warning-type" */'@/views/modules/warning/early-warning-type'),
    "warning-query": () => import(/* webpackChunkName: "warning-query" */'@/views/modules/warning/warning-query'),

}
files.keys().forEach((key) => {
    if (key === './index.js')
    return Object.assign(componentMaps, files(key).default)
})
export default componentMaps