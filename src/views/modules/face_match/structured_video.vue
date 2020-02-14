<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>视频列表</span>
              <el-date-picker
                v-model="value1"
                @change="onChange"
                type="date"
                size="small"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
          </div>
          <el-row>
              <el-input
                placeholder="输入关键字进行过滤"
                clearable
                size="small"
                v-model="filterText">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-tree
                :data="streamList"
                :props="defaultProps"
                accordion
                :filter-node-method="filterNode"
                ref="tree"
                @node-click="handleNodeClick"
                >
              </el-tree>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="13">
        <el-row >
          <div class="grid-content bg-purple">
            <video-player
              class="vjs-custom-skin"
              ref="videoPlayer"
              :options="playerOptions"
              :playsinline="true"
              customEventName="customstatechangedeventname"
              @play="onPlayerPlay($event)"
              @pause="onPlayerPause($event)"
              @ended="onPlayerEnded($event)"
              @waiting="onPlayerWaiting($event)"
              @playing="onPlayerPlaying($event)"
              @loadeddata="onPlayerLoadeddata($event)"
              @timeupdate="onPlayerTimeupdate($event)"
              @canplay="onPlayerCanplay($event)"
              @canplaythrough="onPlayerCanplaythrough($event)"
              @statechanged="playerStateChanged($event)"
              @ready="playerReadied"
            ></video-player>
          </div>
        </el-row>

        <el-row>
          <el-card class="box-card" :body-style="{ padding: '2px' }">
            <div ref="wrapper" class="demo-bs-wrapper">
              <div>
                <div v-for="(o, index) in info.facematch" :key="index" class="demo-bs-item">
                  <facecompile :facemark="o.marks" :facematch="o" :streamtime="info.streamtime"></facecompile>
                </div>
              </div>
            </div>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row>
          <div class="grid-content bg-purple">
            <personIdentification :personarr="personarr"></personIdentification>
          </div>
        </el-row>

        <el-row>
          <div class="grid-content bg-purple">
            <faceimg :imgarr="imgarr"></faceimg>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import { cookieGet } from '@/common/cookie'
import mixinViewModule from '@/mixins/view-module'
import 'videojs-hotkeys'
import "@/views/modules/face_match/src/videojs.markers.css"
import 'videojs-markers'
import '@/views/modules/face_match/src/custom-theme.css'
import faceimg from './face-img'
import personIdentification from './persion-identification'
import facecompile from './face-compile'
import 'vuetify/dist/vuetify.min.css'
import { timeout } from 'q'
import BScroll from 'better-scroll'

export default {
  name: "structured_video",
  components: {
    videoPlayer,
    faceimg,
    facecompile,
    personIdentification
  },
  data () {
    return {
      value1:'',
      filterText: '',
      BS: null,
      activeNames: ['1'],
      streamList: [],
      defaultProps: {id: ''},
      personList: [],
      visible: false,
      playertime: 0,
      imgarr: [],
      personarr: [],
      matchnum: 0,
      video_per: 0,
      info: {
        streamname: 'null',
        facematch:[]
      },
      playerOptions: {
        // videojs options
        muted: true,
        fluid: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src:""
          }
        ],
        poster: "",
        custum: []
      }
    };
  },
  mounted () {
    this.getStreamList()
  },
  beforeDestroy () {
    this.scrollDestroy()
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player;
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },  
  methods: {
    onChange (val) {
      console.log(val)
      this.$axios.get(`/api/videoStruct/page?token=${cookieGet('token')}`,{params:{date:val}})
        .then(res => {
          this.streamList = res.streamList
        })
        .catch(() => {
          console.log('error')
        })
    },    
    filterNode (value, data, node) {
      if (!value) return true
      if (data.label.indexOf(value) !== -1) {
        return true
      }
      // 否则要去判断它是不是选中节点的子节点
      return this.checkBelongToChooseNode(value, data, node)
    },
    checkBelongToChooseNode (value, data, node) {
      const level = node.level
      // 如果传入的节点本身就是一级节点就不用校验了
      if (level === 1) {
        return false
      }
      // 先取当前节点的父节点
      let parentData = node.parent
      // 遍历当前节点的父节点
      let index = 0
      while (index < level - 1) {
      // 如果匹配到直接返回
        if (parentData.data.label.indexOf(value) !== -1) {
          return true
        }
        // 否则的话再往上一层做匹配
        parentData = parentData.parent
        index++
      }
      // 没匹配到返回false
      return false
    },
    scrollInit () {
      this.BS = new BScroll(this.$refs.wrapper, {
        mouseWheel: true,
        click: true,
        scrollbar: {
          fade: true,
          interactive: false
        }
      })
    },
    scrollDestroy () {
      if (this.BS) {
        this.BS.destroy()
      }
    },
    handleChange (val) {
      this.scrollInit()
    },
    getStreamList () {
      this.$axios.get(`/api/videoStruct/page?token=${cookieGet('token')}`,{params:{map_location:'GETLOCATION'}})
        .then(res => {
          this.streamList = res.streamList
          console.log('666666666666')
          console.log(res)
        })
        .catch(() => {
          console.log('error')
        })
    },
    handleNodeClick (val) {
      //this.personList = []
      this.info.facematch = []
      var tempId = val.id  //只有单个id时才进行赋值

      this.scrollInit()
      if (tempId) {
        this.playerOptions.sources[0].src = val.streamUrl
        this.getForPhoto(tempId)
      }
    },
    getForPhoto (id) {
      this.$axios.get(`/api/check?token=${cookieGet('token')}&streamid=${id}`)
        .then(res=> {
          this.playerOptions.custum = res.list
          this.matchnum = res.count
          this.info = res.info
          console.log('33333333333333')
          console.log(this.info)
        })
        .catch(error =>{
          console.log(error)
        })
    },
    // listen event
    onPlayerPlay(player) {  //点击视频上的播放,便开始播放视频
      console.log('player play播放播放-----!', player)
      console.log(player.markers)
    },
    onPlayerPause(player) {
      console.log('player pause!', player)
      console.log(this.imgarr)
    },
    // ...player event
    onPlayerTimeupdate(player) {
      console.log('pplayer'+player)
      this.playertime = player.currentTime()
    },
    onPlayerEnded(player) {
      // console.log('player pause!', player)
    },
    onPlayerLoadeddata(player) {
    },
    onPlayerPlaying(player) {
      console.log('on plyer')
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log('player current update state', playerCurrentState)
    },
    onPlayerCanplaythrough(player) {
      console.log('on ply')
    },
    onPlayerCanplay(player) {
      console.log('aaabbaa')
    },
    onPlayerWaiting(player) {
      console.log('waiting')
    },
    // player is ready
    playerReadied(player) {
      console.log("the player is readied!!!!!", player);
      // you can use it to do something...
      // player.[methods]
      let acustum = this.playerOptions.custum;
      let aa = this;
      this.imgarr=[]
      this.personarr=[]
      player.markers({
        markerStyle: {
          'width': '9px',
          'border-radius': '40%',
          'background-color': 'orange'
        },
        onMarkerReached: function (marker, index) {
          console.log('-------marker--111------')
          console.log(marker)
          aa.imgarr = marker.imgList
          if (marker.personList.length !== 0) {
            aa.personarr = marker.personList
          }
        },
        markers: acustum  //默认标记点信息给markers
      })
    }
  }
}
</script>

<style lang="scss" scop>
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

  .video-class{
    width:60%; 
    height:58%;
    // float:left;padding:3px;border:2px solid	#FFFFFF
  }
  .bg{
    background-color:#F2F6FC;
  }
  .customclass {
    background: #0d2663;
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
  .img-box-card {
    width: 100px
  }
  .box-card-person {
    height: 300px;
  }
  .video-box-card {
    width: 100%;
    height: 100%;
  }
  .faceimage {
    width: 45%;
    height: 45%;
    display: block;
  }
  .imgblock {
    width: 40%;
    height: 40%;
    display: block;
  }
  .btn {
    float:right;
  }
  .demo-bs-wrapper {
    height: 330px;
    position: relative;
    overflow: hidden;
    border: 0px solid $color-border-1;
    border-radius: 4px;
    .demo-bs-item {
      line-height: 40px;
      padding-left: 10px;
      border-bottom: 1px solid $color-border-4;
      &:last-child {
        border-bottom: none;
      }
    }
  }  
</style>