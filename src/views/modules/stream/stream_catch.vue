<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-amap
              vid="amapDemo"
              :center="center"
              :zoom="zoom"
              :plugin="plugin"  :key="reflash" :events="events_map"
              class="amap-demo" style="height: 700px;">
              <el-amap-marker v-for="(marker,index) in markers" :key="index"
                :position="marker.position" :events="marker.events" :icon="icon">
              </el-amap-marker>
            </el-amap>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>摄像头列表</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="handleClick">刷新</el-button>
            </div>
            <el-tree
              :data="streamlist"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick">
            </el-tree>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :fullscreen="false"
      :title="title"
    >
            <!-- <el-button @click="PlayVideo()">Play Video</el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
        <v-liveplayer ref="myvideo" h5id='1' ></v-liveplayer>

    </el-dialog>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap'
import { cookieGet } from '@/common/cookie'
import { lazyAMapApiLoaderInstance } from 'vue-amap'
import mixinViewModule from '@/mixins/view-module'
import Liveplayer from '@/components/videoplayer/liveplayer';
import '@/assets/h5splayer.js'
import {H5siOS,H5sPlayerCreate} from '@/assets/h5splayerhelper.js'

let amapManager = new AMapManager();
export default {
  mixins: [ mixinViewModule ],
  name:"stream_catch",
  components: {
    'v-liveplayer': Liveplayer
  },
  data () {
    let self = this;
    return {
      reflash:false,
      mixinViewModuleOptions: {
        getDataListURL: `/sys/stream/page?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/sys/stream/page?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      markerRefs:[],
      amapManager,
      defaultProps: {},
      dataForm: {
        map_location: 'GETLOCATION'
      },
      visible: false,
      zoom: 12,
      center: [120.095098,33.301297],
      markers: [],
      windows: [],
      window: '',
      icon: '',
      rows: 3,
      cols: 3,
      selectCol: 1,
      selectRow: 1,
      proto: this.$store.state.rtc,
      contentHeight: '',
      contentWidth: '',
      data: [],
      temp: '',
      title: '',
      children: '',
      tempToken: '',
      events_map: {
        init: (o) => {
          setTimeout(() => {
            console.log('map events!!!!!')
            console.log(this.markerRefs)
            o.plugin(["AMap.MarkerClusterer"],function() {
              let cluster = new AMap.MarkerClusterer(o, self.markerRefs, {
                gridSize: 20,
                renderCluserMarker: self._renderCluserMarker
              })
            })
            // console.log(cluster);
          }, 1000)
        }
      },
      events: {
        init: (o) => {
          console.log('-------marker events-')
          this.markerRefs.push(o)
        },
        'moveend': () => {
        },
        'zoomchange': () => {
        },
        'click': (e) => {
          // console.log(e);
          this.center = [e.lnglat.lng,e.lnglat.lat];// 点击选择新地址为中心点
        }
      },
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init (o) {
          }
        }
      }]
    }
  },
  computed:{
    count () {
      return this.$store.state.rtc;
    }
  },
  mounted () {
    this.getInfo()
    this.getIcon()
  },
  methods: {
    handleClick () {
      location.reload()
    },
    getInfo () { // 本可以共用view-module.js中的get请求,但界面必须手动刷新才能发送get请求,所以在本组件重新写了get请求 
      this.$axios.get(`/sys/stream/page?token=${cookieGet('token')}`, { params: { map_location: 'GETLOCATION' } })
        .then(res => {
          console.log('-----mounted---res.list-')
          console.log(res)
          let streamList = res.streamList
          this.markers = []
          for (let j = 0; j < streamList.length; j++) {
            this.temp = res.streamList[j].streamlng // 存放经纬度
            console.log(this.temp)
            this.children = res.streamList[j].children // 含有id、经纬度、token等信息
            if (this.children) {
              this.getWindow(this.children)
            }
          }
        })
        .catch(() => {
          console.log('error')
        })
    },
    getSingleInfo () { // 本可以共用view-module.js中的get请求,但界面必须手动刷新才能发送get请求,所以在本组件重新写了get请求 
      this.$axios.get(`/sys/stream/page?token=${cookieGet('token')}`, { params: { map_location: 'GETLOCATION' } })
        .then(res => {
          console.log('-----mounted---res.list-')
          console.log(res)
          this.temp = res.streamList[1].streamlng // 存放经纬度
          this.children = res.streamList[1].children // 含有id、经纬度、token等信息
          if (this.children) {
            this.getWindow(this.children)
          }
        })
        .catch(() => {
          console.log('error')
        })
    },
    handleNodeClick (val) {
      console.log('----点击事件-----00------')
      console.log(val)
      let __this = this
      console.log(__this.markerRefs)
      __this.markerRefs = []
      __this.markers.length = 0
      __this.markers = []
      __this.zoom = 16
      console.log(val.children)
      // this.getSingleInfo()
      if (val.children) {
        __this.center = val.streamlng[0]
        __this.getWindow(val.children)
        console.log("get window!!!!")
      } else {
        for (let i = 0; i < val.streamlng.length; i++) {
          __this.center = val.streamlng[i]
          __this.markers.push({
            position: val.streamlng[i],
            events: {
              init (o) {
                console.log('eeeeevent!!!!')
                console.log(o)
                // self.center = [o.lnglat.lng,o.lnglat.lat];
                __this.markerRefs.push(o)
              },
              click (e) {
                __this.title = val.label
                __this.visible = true
                __this.tempToken = val.token
                __this.PlayVideo(__this.tempToken)
              }
            }
          })
        }
      }
      // this.positions = val.streamlng
      __this.reflash = !__this.reflash
    },
    _renderCluserMarker (context) {
      const count = this.markers.length;
      let factor = Math.pow(context.count/count, 1/18)
      let div = document.createElement('div');
      let Hue = 180 - factor* 180;
      let bgColor = 'hsla('+Hue+',100%,50%,0.7)';
      let fontColor = 'hsla('+Hue+',100%,20%,1)';
      let borderColor = 'hsla('+Hue+',100%,40%,1)';
      let shadowColor = 'hsla('+Hue+',100%,50%,1)';
      div.style.backgroundColor = bgColor
      let size = Math.round(30 + Math.pow(context.count/count,1/5) * 20);
      div.style.width = div.style.height = size+'px';
      div.style.border = 'solid 1px '+ borderColor;
      div.style.borderRadius = size/2 + 'px';
      div.style.boxShadow = '0 0 1px '+ shadowColor;
      div.innerHTML = context.count;
      div.style.lineHeight = size+'px';
      div.style.color = fontColor;
      div.style.fontSize = '14px';
      div.style.textAlign = 'center';
      context.marker.setOffset(new AMap.Pixel(-size/2,-size/2));
      context.marker.setContent(div)
    },
    PlayVideo (token) {
      this.$refs.myvideo.PlayVideo(token)
      // if (this.tempToken) {
      //   this.$refs.myvideo.PlayVideo(this.tempToken)
      // }
    },
    // 设置摄像头图标,所有值都是原始值
    getIcon () {
      // 创建一个 Icon
      var startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 34),
        // 图标的取图地址
        image: 'http://221.231.13.230:8888/media/fxq_test/camera_0.png', // 此处修改摄像头图标
        // 图标所用图片大小
        imageSize: new AMap.Size(25, 25),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-1, -1)
      });
      this.icon = startIcon
    },

    // 弹出窗口所在位置及内容
    getWindow (val) {
      console.log("getWindow中的   val")
      console.log(val)
      
      let self = this
      
      for (let i = 0; i < self.temp.length; i++) {
        self.markers.push({
          position: self.temp[i],
          events: {
            init (o) {
              self.markerRefs.push(o)
            },
            click (e) {
              self.title = val[i].label
              self.visible = true
              self.tempToken = val[i].token
              self.PlayVideo(self.tempToken)
            }
          }
        })
      }
      // this.markers = markers;
    },

    getMap() {
      console.log(amapManager._componentMap);
      console.log(amapManager._map);
    }
  }
}
</script>

<style lang="scss" scoped>
  .amap-demo {
    height: 600px;
  }
  .inner {
    position: absolute;
    top: 20px;
    right:  20px;
    bottom: 20px;
    left: 20px;
  }
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

