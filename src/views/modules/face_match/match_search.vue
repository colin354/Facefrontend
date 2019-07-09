<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="7">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-table
              size="mini"
              v-loading="dataListLoading"
              :data="dataList"
              border
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
      <el-col :span="17">
        <el-row :gutter="20">
          <el-col>
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
        <el-row :gutter="20">
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
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
              <el-card class="box-card">
              </el-card>
            </div>
          </el-col>
        </el-row> 
        
        <el-row :gutter="20">
          <el-col>
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <el-row v-for="(o, index) in info.facematch" :key="index" >
                  <el-row>
                    <el-col :span="4">
                      <img :src=o.faceurl class="faceimage">
                    </el-col>
                    <el-col>
                      <img :src=o[index].faceurl class="faceimage">
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">
                    </el-col>
                    <el-col>
                      <el-slider
                        :step="0.01"
                        v-model="o.index"
                        @change="onChange($event)" 
                        :max=info.streamtime
                        :marks="marks"
                        show-input></el-slider>
                    </el-col>
                  </el-row>
                </el-row>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  <!-- <el-dialog
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
              <span>播放视频:xxxxxx       </span><span>视频人脸数:{{matchnum}}</span>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </template>

    <el-row :gutter="20">
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
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
          <el-card class="box-card">
          </el-card>
        </div>
      </el-col>
    </el-row> 
        
    <el-row :gutter="20">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
            </el-card>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <faceimg :imgarr="imgarr"></faceimg>
            </el-card>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
            </el-card>
          </div>
        </el-col>
    </el-row>
  </el-dialog> -->
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
import spriteThumbnails from 'videojs-sprite-thumbnails'
import { VueHorizontalTimeline } from 'vue-horizontal-timeline'
import '@/views/modules/face_match/src/custom-theme.css'
import faceimg from './face-img'
import 'vuetify/dist/vuetify.min.css'

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
    VueHorizontalTimeline
  },
  mixins: [ mixinViewModule ],
  data() {
    return {
      marks: [],
      visible: false,
      imgarr: [],
      matchnum: 0,
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
            src: "http://10.2.151.139:9999/102.mp4"
          }
        ],
        poster: "",
        custum: []
      }
    };
  },
  mounted() {
    console.log("this is current player instance object", this.player);
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }, 
  methods: {
    onChange(event){
      console.log('---99---99----9999---')
      console.log(this.info)
      console.log(event)
    },
    broadcast(id,streamurl){
      this.visible = true
      this.playerOptions.sources[0].src = streamurl
      this.$axios.get(`/api/check?token=${cookieGet('token')}&streamid=${id}`)
        .then(res=> {
          console.log('111111111111111122221111111111111111')
          console.log(res)
          this.playerOptions.custum = res.list
          this.matchnum = res.count
          this.info = res.info
          this.marks = {
            0.1: '',
            0.15: '',
            2.5: 'abc/aa.jpg',
            3.6: 'abc/aa.jpg',}
          console.log(res.info.facematch)
          console.log(this.marks)
        })
        .catch(error =>{
          console.log(error);
        }) 
    },
    // listen event
    onPlayerPlay(player) {  //点击视频上的播放,便开始播放视频
      console.log('player play!', player)
      console.log(player.markers)
    },
    onPlayerPause(player) {
      console.log('player pause!', player)
      console.log(this.imgarr)
    },
    // ...player event
    onPlayerTimeupdate(player) {
      // console.log(player)
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
          //console.log("aaaaa8888888***999")
          //console.log(marker.imgList)
          aa.imgarr = marker.imgList
          console.log("aaaaa8888888***999")
          console.log(aa.imgarr)
        },
          markers: acustum  //默认标记点信息给markers
      })   
    }
  }
};
</script>

<style lang="scss">
  .customclass {
    background: #1cb0f5;
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
  .video-box-card {
    width: 100%;
    height: 100%;
  }
  .faceimage {
  width: 45%;
  height: 45%;
  display: block;
}
</style>