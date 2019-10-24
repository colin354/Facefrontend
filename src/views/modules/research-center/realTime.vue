<template>
  <d2-container>

<el-row :gutter="20">
  <el-col :span="5">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>摄像头列表</span>
        <el-button style="float: right; padding: 3px 0" type="text">过滤</el-button>
      </div>
      <el-row>
          <el-tree
            :data="streamList"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick">
          </el-tree>  
      </el-row>
    </el-card>
  </el-col>
  <el-col :span="13">
      <el-row>
        <div class="grid-content bg-purple">
          <v-liveplayer ref="myvideo" h5id='1' ></v-liveplayer>
        </div>
      </el-row>

      <el-row>
        <div class="grid-content bg-purple">
        </div>
      </el-row>
  </el-col>
  <el-col :span="6">
    <el-row> 
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>人脸检测别结果</span>
            <el-button style="float: right; padding: 3px 0" type="text">刷新</el-button>
          </div>
          <el-row>

          </el-row>
        </el-card>        
      </div>
    </el-row>

    <el-row>
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>车牌检测别结果</span>
            <el-button style="float: right; padding: 3px 0" type="text">刷新</el-button>
          </div>
          <el-row>

          </el-row>
        </el-card>           
      </div>
    </el-row>    
  </el-col>
</el-row>

    <!-- <div style="width:100%; height:99%;float:left;background-color:#F2F6FC;margin:2px;">
        <div style="width:22%; height:100%;float:left;padding:3px;border:2px solid 	#FFFFFF">
          <el-tree
            :data="streamList"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick"
            class="bg">
          </el-tree>       
        </div>
        <div class="right-side" style="width:78%; height:100%;float:left;background-color:#F2F6FC;padding:3px;border:2px solid #FFFFFF">
          <div class="one-row-first" style="height:55%; width:60%;float:left;background-color:#F2F6FC;padding:3px;border:2px solid #FFFFFF">
              <v-liveplayer ref="myvideo" h5id='1' ></v-liveplayer>
          </div>
          <div class="one-row-second" style="height:55%; width:40%;float:left;background-color:#F2F6FC;padding:3px;border:2px solid #FFFFFF">
              <p>人像抓拍记录</p>
              <el-image
                v-for="(item,index) in url" :key="index" 
                style="width: 100px; height: 100px; padding:1px;"
                :src="item"
                :fit="fit"></el-image>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p>车牌抓拍记录</p>
              <el-image
                v-for="(item,index) in car_url" :key="index" 
                style="width: 50px; height: 50px; padding:1px;"
                :src="item"
                :fit="fit"></el-image> 
          </div>

          <div class="two-row-first" style="height:45%; width:60%;float:left;padding:3px;background-color:#F2F6FC;border:2px solid #FFFFFF">
              <p>人像匹配列表</p>
              <el-image
                style="width: 100px; height: 100px; padding:1px;"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                :fit="fit"></el-image>
              <el-image
                style="width: 100px; height: 100px; padding:1px;"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                :fit="fit"></el-image>
          </div>

          <div class="two-row-second" style="height:45%; width:40%;float:left;background-color:#F2F6FC;padding:3px;border:2px solid	#FFFFFF">
              <p>车牌匹配列表</p>
              <el-image
                style="width: 100px; height: 100px; padding:1px;"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                :fit="fit"></el-image>
          </div>

        </div>
    </div> -->

  </d2-container>
</template>

<script>
import { cookieGet } from '@/common/cookie'
// import mixinViewModule from '@/mixins/view-module'
import Liveplayer from '@/components/videoplayer/liveplayer';
import '@/assets/h5splayer.js'
import {H5siOS,H5sPlayerCreate} from '@/assets/h5splayerhelper.js'

export default {
  // mixins: [ mixinViewModule ],
  components: {
    'v-liveplayer': Liveplayer
  }, 
  data(){
    return{
      // mixinViewModuleOptions: {
      //   getDataListURL: `/sys/stream/page?token=${cookieGet('token')}`,
      //   getDataListIsPage: true,
      //   deleteURL: `/sys/stream?token=${cookieGet('token')}`,
      //   deleteIsBatch: true
      // },
      url:[
        "http://10.2.155.139:8888/media/image/10/000063_0.jpg",
        "http://10.2.155.139:8888/media/image/10/000063_11.jpg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        ],
      car_url:[
        "http://10.2.155.139:8888/media/card_image/card1.jpg",
        "http://10.2.155.139:8888/media/card_image/card2.jpg",
        "http://10.2.155.139:8888/media/card_image/card3.jpg",
        "http://10.2.155.139:8888/media/card_image/card4.jpg"
      ],
      streamList:[],
      defaultProps: {}, 
      dataForm:{
        map_location:'GETLOCATION'
      },  
    }
  },
  mounted(){     //本可以共用view-module.js中的get请求,但界面必须手动刷新才能发送get请求,所以在本组件重新写了get请求
    this.$axios.get(`/sys/stream/page?token=${cookieGet('token')}`,{params:{map_location:'GETLOCATION'}})
      .then(res => {
        console.log("-----mounted---res.list-")
        console.log(res)
        this.streamList = res.streamList
      })
      .catch(() => {
        console.log("error")
      })
  },
  computed:{
    count(){
        return this.$store.state.rtc;
        console.log("streamlist----")
        console.log(this.streamlist)
    }
  },
  methods:{
      PlayVideo(token) {
        console.log("---0---------------------0000")
        console.log(this.$refs.myvideo)
        this.$refs.myvideo.PlayVideo(token);
      },
      handleNodeClick(val) {
        console.log("----点击事件-----00------")
        console.log(val)
        console.log("val中详细内容")
        var tempId = val.id
        if(tempId){
          this.PlayVideo(val.token)
        }
        // console.log(val.children[0].label)
        // console.log(val.children[1].label)
        // this.markerRefs = []
        // this.positions = val.streamlng
        // console.log("----点击事件-----marker对象-")
        // this.reflash = !this.reflash
      },
      
    }
}
</script>

<style lang="scss" scoped>
.bg{
  background-color:#F2F6FC;
}
.all{
    margin:0 auto;
    width: 760px;
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
