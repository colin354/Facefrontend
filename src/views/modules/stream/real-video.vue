<template>
  <div class="amap-page-container">
    <el-card>
      <el-amap
        vid="amapDemo"  
        :center="center"
        :zoom="zoom"  
        class="amap-demo" style="height: 700px;">
        <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" :events="marker.events" :icon="icon">
        </el-amap-marker>
      </el-amap>
    </el-card>
    <el-dialog
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :fullscreen="false"
      custom-class="customclass"
    >
    <el-row :gutter="24">
      <el-col :span="24">
          <el-button @click="PlayVideo">Play Video</el-button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div class="grid-content bg-purple" height="200" width="200">
            <v-liveplayer ref="myvideo" h5id='1' ></v-liveplayer>
          </div>
      </el-col>
    </el-row>      
  </el-dialog>
  </div>
</template>

<script>
import Liveplayer from '@/components/videoplayer/liveplayer';
import { lazyAMapApiLoaderInstance } from 'vue-amap';
import { AMapManager } from 'vue-amap'
import '@/assets/h5splayer.js'
import {H5siOS,H5sPlayerCreate} from '@/assets/h5splayerhelper.js'

let amapManager = new AMapManager()
export default {
    name: "real-video",
    components: {
        'v-liveplayer': Liveplayer
    }, 
    data ()  {
      // let self = this
      return {
        visible: false,
        zoom: 18,
        center: [120.09465,33.313217],
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
      };
    },
    computed:{
      count(){
          return this.$store.state.rtc;
      }
    },
    mounted() {
      this.getIcon()  //获得摄像头图标
      this.getWindow() //弹出窗口
      // this.PlayVideo()
    },
    methods:{
      PlayVideo() {
        console.log("---0---------------------0000")
        console.log(this.$refs.myvideo)
        this.$refs.myvideo.PlayVideo("token111");
      },
      //设置摄像头图标,所有值都是原始值
      getIcon(){
        // 创建一个 Icon
        var startIcon = new AMap.Icon({
            // 图标尺寸
            size: new AMap.Size(25, 34),
            // 图标的取图地址
            image: 'http://221.231.13.230:8888/media/fxq_test/camera_0.png',//此处修改摄像头图标
            // 图标所用图片大小
            imageSize: new AMap.Size(25, 25),
            // 图标取图偏移量
            imageOffset: new AMap.Pixel(-1, -1)
        });
        console.log("摄像头----")
        this.icon = startIcon
      },

      //弹出窗口所在位置及内容
      getWindow(){
        // this.visible = true  
        let markers = [];
        let windows = [];

        let num = 2;
        let self = this;

        for (let i = 0 ; i < num ; i ++) {
          markers.push({
            position: [120.09465,33.313217 + i * 0.001],
            events: {
              click() {
                self.visible = true
                self.windows.forEach(window => {
                  // self.visible = false;
                });

                self.window = self.windows[i];
                self.$nextTick(() => {
                  // self.visible = true;
                });
              }
            }
          });
        }
        this.markers = markers;
        // this.windows = windows;
      },
    }
}
</script>
<style lang="scss" scoped>
  .amap-demo {
    height: 300px;
  }

  .prompt {
    background: white;
    width: 100px;
    height: 30px;
    text-align: center;
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
  .zdg{
      background-color: #ffffff;
      height: 800px;
      overflow-y:auto
  }
  .content-header .breadcrumb {
      font-size: 1.5rem;
      position: static;
      float: left;
  }
  .content{
      min-height: 50px;
  }

  div[name='flex'] {
      display: flex;
      border-bottom: 0px !important;

  }

  div[name='flex']+[name='flex'] {
      border-left: 0px !important;
  }

  #videoPanel>div:nth-last-child(2) {
      border-bottom: 1px solid rgb(22, 22, 22) !important;
  }


  #videoPanel:-webkit-full-screen {
    background-color: rgb(73, 74, 75) !important;
    display: block;
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;
    top: 0;
    left: 0;
    padding: 0px;
    box-shadow: 0px 0px 50px #000;
  }


  #videoPanel:-moz-full-screen {
    background-color: rgb(73, 74, 75) !important;
    display: block;
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;
    top: 0;
    left: 0;
    padding: 0px;
    box-shadow: 0px 0px 50px #000;
  }

  div[name="flex"]:hover {
      /*background-color: #3c8dbc;*/
      cursor: pointer;
  }

  .videoClickColor {
      background-color: #616263 !important;
      opacity: 0.80;
  }

  .videoColor {
      background-color: rgb(73, 74, 75) !important;
  }

  .pre-scrollable {
      max-height: 480px;
      overflow-y: scroll;
  }

  .layout1x1 {
      background: url('../../../assets/h5s/img/layout/1x1.png') #f2f2f2;
      background-repeat: no-repeat;
      background-size: 32px 32px;
      color: #000;
      height: 32px;
      width: 32px;
  }
  .layout1x1:hover {
      background: url('../../../assets/h5s/img/layout/1x1.png') #7a7878;
      background-size: 32px 32px;
      color: rgb(187, 184, 184);
      height: 32px;
      width: 32px;
  }

  .layout2x2 {
      background: url('../../../assets/h5s/img/layout/2x2.png') #f2f2f2;
      background-repeat: no-repeat;
      background-size: 32px 32px;
      color: #000;
      height: 32px;
      width: 32px;
  }
  .layout2x2:hover {
      background: url('../../../assets/h5s/img/layout/2x2.png') #7a7878;
      background-size: 32px 32px;
      color: rgb(187, 184, 184);
      height: 32px;
      width: 32px;
  }

  .layout3x3 {
      background: url('../../../assets/h5s/img/layout/3x3.png') #f2f2f2;
      background-repeat: no-repeat;
      background-size: 32px 32px;
      color: #000;
      height: 32px;
      width: 32px;
  }
  .layout3x3:hover {
      background: url('../../../assets/h5s/img/layout/3x3.png') #7a7878;
      background-size: 32px 32px;
      color: rgb(187, 184, 184);
      height: 32px;
      width: 32px;
  }

  .layout4x4 {
      background: url('../../../assets/h5s/img/layout/4x4.png') #f2f2f2;
      background-repeat: no-repeat;
      background-size: 32px 32px;
      color: #000;
      height: 32px;
      width: 32px;
  }
  .layout4x4:hover {
      background: url('../../../assets/h5s/img/layout/4x4.png') #7a7878;
      background-size: 32px 32px;
      color: rgb(187, 184, 184);
      height: 32px;
      width: 32px;
  }

  .layoutfull {
      background: url('../../../assets/h5s/img/layout/fullscreen.png') #f2f2f2;
      background-repeat: no-repeat;
      background-size: 32px 32px;
      color: #000;
      height: 32px;
      width: 32px;
  }
  .layoutfull:hover {
      background: url('../../../assets/h5s/img/layout/fullscreen.png') #7a7878;
      background-size: 32px 32px;
      color: rgb(187, 184, 184);
      height: 32px;
      width: 32px;
  }
  .inner {
    position: right;
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
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item img {
    height: 400px;
    width: 400px
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>