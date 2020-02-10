<template>
<d2-container>
<el-row :gutter="20">
  <el-col :span="5">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>摄像头列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleClick">切换</el-button>
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
          <el-card class="box-card">
            <img v-for="(img,index) in imgs" :key="index"
              style="width: 100px; height: 100px"
              :src="img">
            <br>
          </el-card>
        </div>
      </el-row>
      <el-row>
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <img v-for="(plate_img,index) in plate_imgs" :key="index"
              style="width: 100px; height: 60px"
              :src="plate_img">
            <br>
          </el-card>
        </div>
      </el-row>
  </el-col>
  <el-col :span="6">
    <el-row>
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>人脸检测结果</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              <router-link :to="{name:'warning-query'}">
                更多
              </router-link>
            </el-button>
          </div>
          <el-row>
            <el-table
              :data="warning_info"
              :row-class-name="tableRowClassName"
              style="width: 100%">
              <el-table-column
                prop="warning_time"
                label="时间">
              </el-table-column>
              <el-table-column
                prop="warning_level"
                label="级别">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.warning_color === 3 ? 'danger' : 'primary'"
                    disable-transitions>{{scope.row.warning_level}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="warning_capture_url"
                label="抓拍图像">
                  <template  slot-scope="scope">
                    <img :src="scope.row.warning_capture_url" width="70" height="70">
                  </template>
              </el-table-column>
              <el-table-column
                prop="warning_target_url"
                label="匹配目标">
                  <template v-if="scope.row.warning_target_url" slot-scope="scope">
                    <img :src="scope.row.warning_target_url" width="70" height="70">
                  </template>
              </el-table-column>
              <el-table-column
                prop="warning_message"
                label="预警信息">
              </el-table-column>
            </el-table>
          </el-row>
        </el-card>
      </div>
    </el-row>

    <el-row>
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>车牌检测结果</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
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
import { H5siOS,H5sPlayerCreate } from '@/assets/h5splayerhelper.js'
export default {
  // mixins: [ mixinViewModule ],
  name:'testws',
  components: {
    'v-liveplayer': Liveplayer
  }, 
  data () {
    return {
      webSocket: null,
      // url: 'ws://221.231.13.230:8815/ws/chat/',
      url: 'ws://172.16.3.115:9988/ws/chat/',
      imgs: [], //存放固定数目的照片
      plate_imgs: [],
      streamList: [],
      warning_info: [],
      defaultProps: {},
      ws_data: {
        text: '',
        imgurl: '',
        plate_url: ''
      },
      dataForm: {
        map_location: 'GETLOCATION'
      }
    }
  },
  created () {
    this.initSocket('token_ws')
  },
  mounted () {     //本可以共用view-module.js中的get请求,但界面必须手动刷新才能发送get请求,所以在本组件重新写了get请求
    this.$axios.get(`/sys/stream/page?token=${cookieGet('token')}`, { params:{ map_location:'GETLOCATION' } })
      .then(res => {
        this.streamList = res.streamList
        console.log('-----mmmmount------')
        // console.log((this.streamList)[1].children[0])
        // this.handleNodeClick((this.streamList)[1].children[0])
      })
      .catch(() => {
        console.log('error')
      })
  },
  destroyed () {
    this.webSocket.close()
  },
  computed: {
    count () {
      return this.$store.state.rtc
    }
  },
  methods: {
    initSocket (token) {
      let ws_url = `${this.url}` + token + '/'
      this.webSocket = new WebSocket(ws_url)
      this.webSocket.onopen = this.webSocketOnOpen
      this.webSocket.onclose = this.webSocketOnClose
      this.webSocket.onmessage = this.webSocketOnMessage
      this.webSocket.onerror = this.webSocketOnError
    },
    // 建立连接成功后的状态
    webSocketOnOpen () {
      console.log('websocket连接成功');
    },
    // 获取到后台消息的事件，操作数据的代码在onmessage中书写
    webSocketOnMessage (res) {
      // res就是后台实时传过来的数据
      console.log('this is for ----------')
      let resData = JSON.parse(res.data)
      console.log(resData)
      this.ws_data.text = resData.num
      this.ws_data.imgurl = resData.imgurl
      this.ws_data.faceurl = resData.faceurl
      this.ws_data.plate_url = resData.plate_url
      console.log(this.ws_data.plate_url)
      console.log('-----000000---')
      if (resData.warning_info) {
        if (Object.keys(resData.warning_info).length !== 0) {
          this.ws_data.warning_info = resData.warning_info
          if (this.warning_info.length >= 5) {
            this.warning_info.shift() //删除数组第一个元素
            this.warning_info.push(this.ws_data.warning_info) //向数组末尾添加一个元素
          } else {
            this.warning_info.push(this.ws_data.warning_info) //向数组末尾添加一个元素
          }
        }
      }
      console.log('-----1111111---')
      if (this.ws_data.imgurl) {
        if (this.imgs.length >= 8) {
          this.imgs.shift() //删除数组第一个元素
          this.imgs.push(this.ws_data.imgurl) //向数组末尾添加一个元素
        } else {
          this.imgs.push(this.ws_data.imgurl) //向数组末尾添加一个元素
        }
      }
      console.log('-----222222---')
      if (this.ws_data.plate_url) {
        console.log('hhhhhhhas data!!!!!!!')
        if (this.plate_imgs.length >= 8) {
          this.plate_imgs.shift() //删除数组第一个元素
          this.plate_imgs.push(this.ws_data.plate_url) //向数组末尾添加一个元素
        } else {
          this.plate_imgs.push(this.ws_data.plate_url) //向数组末尾添加一个元素
        }
      }
    },
    // 关闭连接
    webSocketOnClose(e) {
      console.log('websocket连接已关闭',e);
    },
    //连接失败的事件
    webSocketOnError(res) {
      console.log('websocket连接失败')
      // 打印失败的数据
      console.log(res)
    },

    PlayVideo (token) {
      this.$refs.myvideo.PlayVideo(token);
    },
    tableRowClassName ({row, rowIndex}) {
      console.log(row.warning_color)
      if (row.warning_color === 0) {
        return ''
      } else if (row.warning_color === 1) {
        return 'target-row'
      } else if (row.warning_color === 2) {
        return 'stranger-row'
      }
      return ''
    },
    handleClick () {
      location.reload()
      this.initSocket()
      this.$axios.post(`/sys/camerareal?token=${cookieGet('token')}`,{ c_token:'None',c_id:'None' })
        .then(res => {
          console.log('handle------Node-----Click-------')
        })
        .catch(() => {
          console.log('error')
        })
    },
    handleNodeClick (val) {
      console.log('----点击事件-----00------')
      console.log(val)
      var tempId = val.id
      if (tempId < 10000) {
        this.PlayVideo(val.token)
        // this.initSocket(val.token)
        if (this.webSocket) {
          this.webSocket.close()
        }
        this.ws_data.imgurl = ''
        this.ws_data.faceurl = ''
        this.initSocket(val.token)
        this.$axios.post(`/sys/camerareal?token=${cookieGet('token')}`,{ c_token:val.token,c_id:val.id })
          .then(res => {
            console.log('handle------Node-----Click')
          })
          .catch(() => {
            console.log('error')
          })
        this.$axios.get(`/api/warningHistory?token=${cookieGet('token')}`, { params:{c_token: val.token }})
          .then(res => {
            this.imgs = []
            this.plate_imgs = []
            this.warning_info = res.list
            console.log(this.warning_info)
          })
          .catch(() => {
            console.log('error')
          })
      }
    }
  }
}
</script>

<style lang="scss">
.el-table .target-row {
  background: oldlace;
}

.el-table .stranger-row {
  background: #f54f4f3d;
}

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
