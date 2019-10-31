<template>
  <d2-container>
    
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-table
              size="mini"
              v-loading="dataListLoading"
              :data="dataList"
              @selection-change="dataListSelectionChangeHandle"
              @sort-change="dataListSortChangeHandle"
              style="width: 100%;">
              <el-table-column prop="streamname" :label="$t('stream.name')" header-align="center" align="center" width="100"/>
              <el-table-column prop="streamlocation" :label="$t('stream.location')" header-align="center" align="center"/>
              <el-table-column prop="streamstatus" :label="$t('stream.status')" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.streamstatus === `1`" size="mini">{{ $t('stream.status1') }}</el-tag>
                  <el-tag v-else size="mini" type="danger">{{ $t('stream.status0') }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="check_match" :label="$t('stream.check_match')" header-align="center" align="center"/>
              <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="broadcast(scope.row.id,scope.row.streamurl)">{{ $t('check.broadcast') }}</el-button>
                </template>
            </el-table-column>
            </el-table>
            <el-pagination
              :current-page="page"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="limit"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="pageSizeChangeHandle"
              @current-change="pageCurrentChangeHandle">
            </el-pagination>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-divider></el-divider> 
              <el-tag type="" effect="light">结构化视频处理结果进度</el-tag>
            <el-button type="danger" @click="deleteRequest()" class="btn" size="mini">{{ $t('deleteBatch') }}</el-button>
            <el-progress :percentage="check_info.check_percentage"></el-progress>
            <el-divider><i class="el-icon-data-analysis"></i></el-divider>
              <span>视频总数: {{check_info.videonum}}</span>
            <el-divider><i class="el-icon-user"></i></el-divider>
              <span>已处理视频数: {{check_info.finishmatch}}</span>
            <el-divider><i class="el-icon-s-check"></i></el-divider>
              <span>匹配记录数: {{check_info.check_num}}</span>
          </el-card>
        </div> 
      </el-col>
    </el-row>

  <el-dialog
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    :fullscreen="true"
    custom-class="customclass"
  > 
     <template slot="title">
      <el-row :gutter="20">
        <el-col :span="14" :offset="5">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <span>播放视频:{{info.streamname}}  视频匹配记录数:</span>
              <span v-for="(o, index) in info.facematch" :key="index">
                {{o.facename}}&nbsp;{{o.facecount}}条
              </span>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </template>

    <el-row :gutter="20">
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-card class="box-card" :body-style="{ padding: '0px' }"> 
            <div class="imgblock">
              <personIdentification :personList="personList"></personIdentification>
            </div>
          </el-card>
        </div>
      </el-col>           
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <el-card class="video-box-card">
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
          </el-card>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-card class="box-card" :body-style="{ padding: '0px' }">
            <div class="imgblock">
              <faceimg  :imgarr="imgarr"></faceimg>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>  
        
    <el-row :gutter="20">
      <el-col>
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <facecompile
              v-for="(o, index) in info.facematch" :key="index"
              :facemark="o.marks"
              :facematch="o"
              :streamtime="info.streamtime"
              ></facecompile>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
  <!-- <div style="width:100%; height:99%; float:left; background-color:#F2F6FC; margin:2px;">

      <div style="width:20%; height:100%;float:left;padding:3px;border:2px solid 	#FFFFFF">       
        <el-tree
            :data="streamList"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick"
            class="bg">
        </el-tree>
      </div>
      

      <div style="width:80%; height:100%;float:left;padding:3px;border:2px solid 	#FFFFFF">

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
                <!-- <div class="grid-content bg-purple"> -->
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
        </el-row>  
      </div>

  </div>      -->
  </d2-container>
</template>

<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import { cookieGet } from '@/common/cookie'
import mixinViewModule from '@/mixins/view-module'
// import videojs from "video.js"
import 'videojs-hotkeys'
import "@/views/modules/face_match/src/videojs.markers.css"
// import markers from 'videojs-markers/dist/videojs-markers'
import 'videojs-markers'
// import spriteThumbnails from 'videojs-sprite-thumbnails'
// import { VueHorizontalTimeline } from 'vue-horizontal-timeline'
import '@/views/modules/face_match/src/custom-theme.css'
import faceimg from './face-img'
import personIdentification from './persion-identification'
import facecompile from './face-compile'
import 'vuetify/dist/vuetify.min.css'
import { timeout } from 'q';

// const plugin = function(list, item) {
//   markers(this, list, item);
// };

// videojs.registerPlugin("markers", markers);
// videojs.registerPlugin("notations", notations);

export default {
  name: "page3",
  components: {
    videoPlayer,
    faceimg,
    facecompile,
    personIdentification
  },
  mixins: [ mixinViewModule ],
  data() {
    return {
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
      mixinViewModuleOptions: {
        getDataListURL: `/sys/stream/page?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/api/check?token=${cookieGet('token')}`,
        deleteIsBatch: true
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
            //src: "http://10.2.155.139:8888/media/test_video/jwc.mp4"
            src:""
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
    getStreamList(){
      this.$axios.get(`/sys/stream/page?token=${cookieGet('token')}`,{params:{map_location:'GETLOCATION'}})
        .then(res => {
          console.log("-----mounted---res.list-")
          console.log(res)
          this.streamList = res.streamList
          console.log("----streamList")
          console.log(this.streamList) 
        })
        .catch(() => {
          console.log("error")
        })
    },
    handleNodeClick(val) {
        this.personList = []
        this.info.facematch = []
        var tempId = val.id  //只有单个id时才进行赋值
        console.log(val.streamUrl)
        this.playerOptions.sources[0].src = val.streamUrl
        if(tempId){
          this.getForPhoto(tempId)
        }
    },
    getForPhoto(id){
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
          this.playerOptions.custum = res.list
          this.matchnum = res.count
          this.info = res.info
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

<style lang="scss">
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