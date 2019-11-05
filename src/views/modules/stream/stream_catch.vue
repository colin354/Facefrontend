<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-amap
              vid="amapDemo"  
              :center="center"
              :zoom="zoom"  
              class="amap-demo" style="height: 700px;">
              <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" :events="marker.events" :icon="icon">
              </el-amap-marker>
            </el-amap>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
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
      custom-class="customclass"
    >
      <el-row :gutter="24">
        <el-col :span="24">
            <el-button @click="PlayVideo()">Play Video</el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div class="grid-content bg-purple" height="200" width="200">
              <v-liveplayer ref="myvideo" h5id='1' ></v-liveplayer>
            </div>
        </el-col>
      </el-row>      
    </el-dialog>
  </d2-container>
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
  data(){
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
<<<<<<< HEAD
      zoom: 20,
      center: [120.09467,33.301341],
      positions: [],
=======
>>>>>>> ee5f8cbd0c5d648739dd8e3d58dbb73dd17bad9d
      dataForm:{
        map_location:'GETLOCATION'
      },
      visible: false,
      zoom: 18,
      center: [120.095098,33.301297],
      markers: [],
      windows: [],
      window: '',
      icon:'',
      rows: 3,
      cols: 3,
      selectCol: 1,
      selectRow: 1,
      proto: this.$store.state.rtc,
      contentHeight: '',
      contentWidth: '',
      data:[],
      temp:'',
      children:'',
      tempToken:'',
    };
  },
  computed:{
    count(){
        return this.$store.state.rtc;
    }
  },
  mounted(){        
    this.getInfo()
    this.getIcon()
  },
  methods: {
    getInfo(){ //本可以共用view-module.js中的get请求,但界面必须手动刷新才能发送get请求,所以在本组件重新写了get请求 
      this.$axios.get(`/sys/stream/page?token=${cookieGet('token')}`,{params:{map_location:'GETLOCATION'}})
      .then(res => {
        console.log("-----mounted---res.list-")
        console.log(res)
        this.temp = res.streamList[0].streamlng //存放经纬度
        this.children = res.streamList[0].children //含有id、经纬度、token等信息
        if(this.children){
          this.getWindow(this.children)
        }
      })
      .catch(() => {
        console.log("error")
      })
    },
    handleNodeClick(val) {
      console.log("----点击事件-----00------")
      console.log(val)
      this.markerRefs = []
      this.positions = val.streamlng
      console.log("----点击事件-----marker对象-")
      this.reflash = !this.reflash
    },
    _renderCluserMarker(context) {
      const count = this.positions.length;
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
    
    PlayVideo() {
      if(this.tempToken){
        this.$refs.myvideo.PlayVideo(this.tempToken);
      }
    },
    //设置摄像头图标,所有值都是原始值
    getIcon(){
      // 创建一个 Icon
      var startIcon = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(25, 34),
          // 图标的取图地址
          image: 'http://10.2.155.139:8888/media/fxq_test/camera_0.png',//此处修改摄像头图标
          // 图标所用图片大小
          imageSize: new AMap.Size(25, 25),
          // 图标取图偏移量
          imageOffset: new AMap.Pixel(-1, -1)
      });
      this.icon = startIcon
    },

    //弹出窗口所在位置及内容
    getWindow(val){
      console.log("getWindow中的   val")
      console.log(val[0].token)
      let markers = [];
      let self = this;

      for (let i = 0 ; i < this.temp.length ; i ++) {
        let self = this;
        markers.push({
          position: this.temp[i],
          events: {
            click(e) {
              console.log("eeeeeeeee")
              console.log(e)
              console.log(val[i].token)
              self.visible = true
              self.tempToken = val[i].token
            }
            
          }
        });
      }
      this.markers = markers;
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