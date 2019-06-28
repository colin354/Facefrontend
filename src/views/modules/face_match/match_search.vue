<template>
  <d2-container>
    <SplitPane :min-percent="20" :default-percent="30" split="vertical">
      <template slot="paneL">

      <!--  <el-select placeholder="查询视频">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>-->
        <div style="margin: 10px;">
          <el-table
            size="mini"
            v-loading="dataListLoading"
            :data="dataList"
            border
            @selection-change="dataListSelectionChangeHandle"
            @sort-change="dataListSortChangeHandle"
            style="width: 100%;">
            <el-table-column prop="id" :label="$t('stream.name')" header-align="center" align="center" width="100"/>
            <el-table-column prop="streamurl" :label="$t('stream.url')" header-align="center" align="center"/>
            <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="broadcast(scope.row.streamurl)">{{ $t('check.broadcast') }}</el-button>
              </template>
          </el-table-column>
          </el-table>
        </div>
      </template>
      <template slot="paneR">
            <div style="margin: 10px;">
              <video-player
                class="vjs-default-skin"
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
            <div style="margin: 10px;" ref="faceimgs">
              <faceimg :arr="arr"></faceimg>
            </div>
          <!-- <template slot="paneR">
            <div style="margin: 10px;">右下</div>
          </template> -->
      </template>
    </SplitPane>
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
import thumbnails from 'videojs-thumbnails'
import vttThumbnails from 'videojs-vtt-thumbnails'
import spriteThumbnails from 'videojs-sprite-thumbnails'
// import 'videojs-notations'
import '@/views/modules/face_match/src/custom-theme.css'
import faceimg from './face-img'

// const plugin = function(list, item) {
//   markers(this, list, item);
// };

// videojs.registerPlugin("markers", markers);
// videojs.registerPlugin("notations", notations);

export default {
  name: "page3",
  components: {
    videoPlayer,
    faceimg
  },
  mixins: [ mixinViewModule ],
  data() {
    return {
      //options:[
        //{value:"1",label:"按人查询流"},
        //{value:"2",label:"按流查询人"}
        //],
      arr: [],
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
    broadcast(streamurl){
      this.playerOptions.sources[0].src = streamurl
      this.$axios.get(`/api/check/${streamurl}?token=${cookieGet('token')}`)
            .then(res=> {
              var i = 0
              this.playerOptions.custum = []
              for(i;i<res.count;i++){ 
                this.playerOptions.custum.push(res.list[i])
              }
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
      console.log(this.arr)
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
      this.arr=[]
      player.markers({
        markerStyle: {
            'width':'9px',
            'border-radius': '40%',
            'background-color': 'orange'
        },
        onMarkerReached: function(marker,index){
          //aa = [];

          console.log("aaaaa8888888***999")
          //console.log(marker.imgList)
          aa.arr = marker.imgList
          //console.log(aa.arr)
        },
          markers: acustum
      })   
    }
  }
};
</script>