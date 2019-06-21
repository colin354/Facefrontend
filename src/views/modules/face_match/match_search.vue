<template>
  <d2-container>
    <SplitPane :min-percent="20" :default-percent="30" split="vertical">
      <template slot="paneL">
        <div style="margin: 10px;">
          <el-table
            size="mini"
            v-loading="dataListLoading"
            :data="dataList"
            border
            @selection-change="dataListSelectionChangeHandle"
            @sort-change="dataListSortChangeHandle"
            style="width: 100%;">
            <el-table-column prop="faceid" :label="$t('face.name')" header-align="center" align="center" width="100"/>
            <el-table-column prop="url" :label="$t('face.url')" header-align="center" align="center"/>
            <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="broadcast(scope.row.id)">{{ $t('check.broadcast') }}</el-button>
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
      arr: [],
      mixinViewModuleOptions: {
        getDataListURL: `/api/check?token=${cookieGet('token')}`,
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
            src:
              // "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
              "http://10.2.151.139:9999/102.mp4"
              // "http://localhost/media/stream/102.mp4"
          }
        ],
        poster: "",
        custum: []
      }
    };
  },
  mounted() {
    console.log("this is current player instance object", this.player);
    // this.player.markers({
    //   markers: [
    //     {time: 9.5, text: "this", overlayText: "1", class: "special-blue", arrlist:[{},{}],width:"100%"},
    //     {time: 16,  text: "is", overlayText: "2", arrlist:[{}], overlayA:"aaa",width:"50%"},
    //     {time: 23.6,text: "so", overlayText: "3", overlayA:"aaa",width:"100%"},
    //     {time: 28,  text: "cool", overlayText: "4", overlayA:"aaa",width:"70%"},
    //     {time: 35,  text: "cooa", overlayText: "5",overlayA:"aaa",width:"40%"}
    //   ]
    // })
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }, 
  methods: {
    broadcast(id){
      console.log(this.dataList[id])
      this.playerOptions.sources[0].src = this.dataList[id].url
      this.playerOptions.custum = [
          {time: 9.5, text: "this", overlayText: "1", class: "special-blue", overlayA:"aaa",width:"100%"},
          {time: 16,  text: "is", overlayText: "2", overlayA:"aaa",width:"50%"},
          {time: 23.6,text: "so", overlayText: "3", overlayA:"aaa",width:"100%"},
          {time: 28,  text: "cool", overlayText: "4", overlayA:"aaa",width:"70%"},
          {time: 35,  text: "cooa", overlayText: "5",overlayA:"aaa",width:"40%"}
        ]
      // this.player.markers({
      //   markerStyle: {
      //       'width':'9px',
      //       'border-radius': '40%',
      //       'background-color': 'orange'
      //   },
      //   onMarkerReached: function(marker){
      //     console.log("aaaaa***999")
      //   },
      //   markers: [
      //     {time: 9.5, text: "this", overlayText: "1", class: "special-blue", overlayA:"aaa",width:"100%"},
      //     {time: 16,  text: "is", overlayText: "2", overlayA:"aaa",width:"50%"},
      //     {time: 23.6,text: "so", overlayText: "3", overlayA:"aaa",width:"100%"},
      //     {time: 28,  text: "cool", overlayText: "4", overlayA:"aaa",width:"70%"},
      //     {time: 35,  text: "cooa", overlayText: "5",overlayA:"aaa",width:"40%"}
      //   ]
      // })   
    },
    // listen event
    onPlayerPlay(player) {
      console.log('player play!', player)
      console.log(player.markers)
    },
    onPlayerPause(player) {
      console.log('player pause!', player)
    },
    // ...player event
    onPlayerTimeupdate(player) {
      // console.log(player)
      // player.markers({
      //   onMarkerReached: function(marker){
      //     console.log("aaaaa***999")
      //     console.log(this)
      //   }
      // })
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

      // player.hotkeys({
      //   volumeStep: 0.1,
      //   seekStep: 5,
      //   enableModifiersForNumbers: false,
      //   enableMute: true,
      //   fullscreenKey: function(event, player) {
      //     // override fullscreen to trigger when pressing the F key or Ctrl+Enter
      //     return ((event.which === 70) || (event.ctrlKey && event.which === 13));
      //   }
      // }),
      player.markers({
        markerStyle: {
            'width':'9px',
            'border-radius': '40%',
            'background-color': 'orange'
        },
        onMarkerReached: function(marker,index){
          console.log("aaaaa***999")
          console.log(this)
          console.log(marker)
          console.log(index)
        },
        markers: [
          {time: 9.5, text: "this", overlayText: "1", class: "special-blue", overlayA:"aaa",width:"100%"},
          {time: 16,  text: "is", overlayText: "2", overlayA:"aaa",width:"50%"},
          {time: 23.6,text: "so", overlayText: "3", overlayA:"aaa",width:"100%"},
          {time: 28,  text: "cool", overlayText: "4", overlayA:"aaa",width:"70%"},
          {time: 35,  text: "cooa", overlayText: "5",overlayA:"aaa",width:"40%"}
        ]
      })   

      //   onMarkerReached: function(marker){
      //     console.log("aaaaa***999")
      //   },
      //   markers: this.playerOptions.custum
      // })
    }
  }
};
</script>