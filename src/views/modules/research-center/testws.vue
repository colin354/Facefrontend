<template>
  <d2-container>

<el-row :gutter="20">
  <el-col :span="5">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>摄像头列表</span>
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
            <!-- <el-button type="primary" @click="initSocket">建立websocket连接</el-button>
            <el-button type="primary" @click="webSocketOnMessage">发送消息</el-button>
            <el-button type="primary" @click="webSocketOnClose">关闭</el-button> -->
            <el-image
              style="width: 100px; height: 100px"
              :src="ws_data.faceurl"
              fit="fit">
            </el-image>
            <!-- <el-image
              style="width: 100px; height: 100px"
              :src="ws_data.imgurl"
              fit="fit">
            </el-image> -->
        </div>
      </el-row>
  </el-col>
  <el-col :span="6">
    <el-row> 
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>人脸检测结果</span>
            <el-button style="float: right; padding: 3px 0" type="text">筛选</el-button>
          </div>
          <el-row>
            <!--原有的-->
            <!-- <el-image
              style="width: 100px; height: 100px"
              :src="ws_data.imgurl"
              fit="fit">
            </el-image> -->

            <!--更改显示多张图片-->
            <el-image v-for="(img,index) in imgs" :key="index"
              style="width: 100px; height: 100px"
              :src="img"
              fit="fit">
            </el-image>&nbsp;&nbsp;&nbsp;&nbsp;
            
          </el-row>
        </el-card>        
      </div>
    </el-row>

    <el-row>
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>车牌检测结果</span>
            <el-button style="float: right; padding: 3px 0" type="text">筛选</el-button>
          </div>
          <el-row>

          </el-row>
        </el-card>           
      </div>
    </el-row>    
  </el-col>
</el-row>
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
  name:'testws',
  components: {
    'v-liveplayer': Liveplayer
  }, 
  data(){
    return{
      webSocket: null,
      url: 'ws://221.231.13.230:8888/ws/chat/',
      // url: 'ws://10.2.155.139:8888/ws/chat/',
      imgs:[], //存放固定数目的照片
      streamList:[],
      defaultProps: {}, 
      ws_data: {
        text: '',
        imgurl: ''
      },
      dataForm:{
        map_location:'GETLOCATION'
      },  
    }
  },
  mounted(){     //本可以共用view-module.js中的get请求,但界面必须手动刷新才能发送get请求,所以在本组件重新写了get请求
    this.initSocket('token_ws')
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
  destroyed() {
    this.webSocket.close()
  },  
  computed:{
    count(){
        return this.$store.state.rtc;
        console.log("streamlist----")
        console.log(this.streamlist)
    }
  },
  methods:{
    initSocket(token) {
      let ws_url = `${this.url}` + token + '/'
      this.webSocket = new WebSocket(ws_url)
      this.webSocket.onopen = this.webSocketOnOpen
      this.webSocket.onclose = this.webSocketOnClose
      this.webSocket.onmessage = this.webSocketOnMessage
      this.webSocket.onerror = this.webSocketOnError
    },
    // 建立连接成功后的状态
    webSocketOnOpen() {
      console.log('websocket连接成功');
    },
    // 获取到后台消息的事件，操作数据的代码在onmessage中书写
    webSocketOnMessage(res) {
      // res就是后台实时传过来的数据
      console.log('this is for ----------')
      let resData = JSON.parse(res.data)
      this.ws_data.text = resData.num
      this.ws_data.imgurl = resData.imgurl
      this.ws_data.faceurl = resData.faceurl
      if(this.imgs.length >= 3){
        this.imgs.shift() //删除数组第一个元素
        this.imgs.push(this.ws_data.imgurl) //向数组末尾添加一个元素
      }
      else{
        this.imgs.push(this.ws_data.imgurl) //向数组末尾添加一个元素
      }
      // let msg = `<el-image style="width: 100px; height: 100px" :src="`+this.ws_data.imgurl+`"fit="fit"></el-image>`
      // console.log(msg)
      // this.$notify({
      //   title:'new pic',
      //   dangerouslyUseHTMLString: true,
      //   message: msg
      // })
      //给后台发送数据
    },
    // 关闭连接
    webSocketOnClose(e) {
      console.log('websocket连接已关闭',e);
    },
    //连接失败的事件
    webSocketOnError(res) {
    console.log('websocket连接失败');
    // 打印失败的数据
    console.log(res);
    },
    
    PlayVideo(token) {
      console.log("---0---------------------0000")
      console.log(this.$refs.myvideo)
      this.$refs.myvideo.PlayVideo(token);
    },
    handleNodeClick(val) {
      console.log("----点击事件-----00------")
      var tempId = val.id
      if(tempId<10000){
        this.PlayVideo(val.token)
        // this.initSocket(val.token)
        if(this.webSocket) {
          this.webSocket.close()
        }
        this.ws_data.imgurl = ''
        this.ws_data.faceurl = ''
        this.initSocket(val.token)
        this.$axios.post(`/sys/camerareal?token=${cookieGet('token')}`,{c_token:val.token,c_id:val.id})
          .then(res => {
            console.log("handle------Node-----Click")
          })
          .catch(() => {
            console.log("error")
          })
      }
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