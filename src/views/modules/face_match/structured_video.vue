<template>
  <d2-container>
<el-row :gutter="20">
  <el-col :span="6">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>视频列表</span>
        <el-button style="float: right; padding: 3px 0" type="text">过滤</el-button>
      </div>
      <el-row>
          <el-tree
            :data="streamList"
            :props="defaultProps"
            accordion
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

          <!-- <facecompile
            v-for="(o, index) in info.facematch" :key="index"
            :facemark="o.marks"
            :facematch="o"
            :streamtime="info.streamtime"
            ></facecompile> -->
            <!-- <facecollapse :mach_info="info"></facecollapse> -->
          <el-collapse v-model="activeNames" @change="handleChange" accordion>
            <el-collapse-item v-for="(o, index) in info.facematch" :key="index" :title="o.facename" :name="o.key" >
              <facecompile :facemark="o.marks" :facematch="o" :streamtime="info.streamtime"></facecompile>
            </el-collapse-item>
          </el-collapse>

      </el-row>
  </el-col>
  <el-col :span="5">
    <el-row> 
      <div class="grid-content bg-purple">
        <personIdentification :personList="personList"></personIdentification>
      </div>
    </el-row>

    <el-row>
      <div class="grid-content bg-purple">
        <faceimg :imgarr="imgarr"></faceimg>
      </div>
    </el-row>    
  </el-col>
</el-row>
        <!-- 
          <el-tree
            :data="streamList"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick"
            class="bg">
        </el-tree>

        <el-row :gutter="20">
          <el-col :span="18">
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

            <el-row :gutter="10">
                <div style="width:100%; height:20%;float:left;padding:3px;border:2px solid 	#FFFF00">  
                    <facecompile
                      v-for="(o, index) in info.facematch" :key="index"
                      :facemark="o.marks"
                      :facematch="o"
                      :streamtime="info.streamtime"
                      ></facecompile>
                </div>
            </el-row>
          </el-col>

          <el-col :span="6">
            <el-row>
            <div class="grid-content bg-purple">
                <div class="imgblock">
                  <personIdentification :personList="personList"></personIdentification>
                </div>
            </div>
            </el-row>

            <el-row>
            <div class="grid-content bg-purple">
              <el-card class="box-card" :body-style="{ padding: '0px' }">
                <div class="imgblock">
                  <faceimg  :imgarr="imgarr"></faceimg>
                </div>
              </el-card>
            </div>
            </el-row>
          </el-col>
        </el-row>   -->
  
  </d2-container>
</template>

<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import { cookieGet } from '@/common/cookie'
import mixinViewModule from '@/mixins/view-module'
import 'videojs-hotkeys'
import "@/views/modules/face_match/src/videojs.markers.css"
import 'videojs-markers'
import '@/views/modules/face_match/src/custom-theme.css'
import faceimg from './face-img'
import personIdentification from './persion-identification'
import facecompile from './face-compile'
import facecollapse from './face-collapse'
import 'vuetify/dist/vuetify.min.css'
import { timeout } from 'q';

export default {
  name: "page3",
  components: {
    videoPlayer,
    faceimg,
    facecompile,
    facecollapse,
    personIdentification
  },
  data() {
    return {
      activeNames: ['1'],
      streamList:[],
      defaultProps: {id:''}, 
      personList:[],
      visible: false,
      playertime: 0,
      imgarr: [],
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
            //src: "http://221.231.13.230:10080/media/test_video/jwc.mp4"
            src: "http://221.231.13.230:10080/record_media/token111/2019-10-18TZ08/11-07-50/token111-d23eb70a-eff5-4ffb-a8ce-da7c0a684e8d.mp4"
          }
        ],
        poster: "",
        custum: []
      }
    };
  },
  mounted() {
    console.log('777777777')
    this.getStreamList()
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }, 
  methods: {
    handleChange(val) {
      console.log(val);
    },    
    getStreamList(){
      this.$axios.get(`/api/videoStruct/page?token=${cookieGet('token')}`,{params:{map_location:'GETLOCATION'}})
        .then(res => {
          this.streamList = res.streamList
          console.log('666666666666')
          console.log(res)
        })
        .catch(() => {
          console.log("error")
        })
    },
    handleNodeClick(val) {
        this.personList = []
        this.info.facematch = []
        var tempId = val.id  //只有单个id时才进行赋值
        console.log("uuuuuuuuuuu")
        console.log(val)
        if(tempId){
          this.playerOptions.sources[0].src = val.streamUrl
          this.getForPhoto(tempId)
        }
    },
    getForPhoto(id){
      this.$axios.get(`/api/check?token=${cookieGet('token')}&streamid=${id}`)
        .then(res=> {
          this.personList = []
          
          for(var i=0; i<res.list_reid.length; i++){
            console.log("-------person----------")
            console.log(res.list_reid[i])
            this.personList[i] = res.list_reid[i]
            console.log("------person-----------")
          }
          console.log(this.personList)
          this.playerOptions.custum = res.list
          this.matchnum = res.count
          this.info = res.info
          console.log("-----uuuuuuuuuuu-----")
          console.log(this.info)
          console.log("-----uuuuu11uuuuuu-----")
        })
        .catch(error =>{
          console.log('yingyingyingyingying')
          console.log(error)
        }) 
    },
    deleteRequest(){
      this.$axios.delete(`/api/check?token=${cookieGet('token')}`)
      .then(res =>{
        this.$message({
                message: this.$t("prompt.success"),
                type: "success",
                duration: 500,
                })
        this.getDataList()
            })
      .catch(error =>{
          console.log(error)
      }) 
    },

    broadcast(id,streamurl){
      this.visible = true
      this.playerOptions.sources[0].src = streamurl
      this.$axios.get(`/api/check?token=${cookieGet('token')}&streamid=${id}`)
        .then(res=> {
          this.personList = []
          console.log("-------0------9090--------------------11111111111")
          console.log(res)
          console.log(res.list_reid)
          for(var i=0; i<res.list_reid.length; i++){
            console.log("-------person----------")
            console.log(res.list_reid[i])
            this.personList[i] = res.list_reid[i]
            console.log("------person-----------")
          }
          console.log(this.personList)
          console.log("这这这这这这这这这这这这这")
          this.playerOptions.custum = res.list
          this.matchnum = res.count
          this.info = res.info
        })
        .catch(error =>{
          console.log('yingyingyingyingying')
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
      // console.log(player.currentTime())
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
      player.markers({
        markerStyle: {
            'width':'9px',
            'border-radius': '40%',
            'background-color': 'orange'
        },
        onMarkerReached: function(marker,index){
          console.log("-------marker--------")
          console.log(marker)
          console.log(marker.imgList)
          aa.imgarr = marker.imgList
        },
          markers: acustum  //默认标记点信息给markers
      })   
    }
  }
};
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
</style>