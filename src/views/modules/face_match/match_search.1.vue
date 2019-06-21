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
            <el-table-column prop="username" :label="$t('face.name')" header-align="center" align="center" width="100"/>
            <el-table-column prop="imgdir" :label="$t('face.url')" header-align="center" align="center"/>
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
                @ready="playerReadied($event)"
              ></video-player>
            </div>
            <div style="margin: 10px;">you</div>
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
import videojs from "video.js"
import 'videojs-hotkeys'
import "@/views/modules/face_match/src/videojs.markers.css"
import markers from 'videojs-markers'
import thumbnails from 'videojs-thumbnails'
import vttThumbnails from 'videojs-vtt-thumbnails'
import spriteThumbnails from 'videojs-sprite-thumbnails'
import '@/views/modules/face_match/src/custom-theme.css'

// const plugin = function(list, item) {
//   markers(this, list, item);
// };

// videojs.registerPlugin("markers", markers);
// videojs.registerPlugin("markers", markers);

export default {
  name: "page3",
  components: {
    videoPlayer,
  },
  mixins: [ mixinViewModule ],
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: `/api/face?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/api/face?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      playerOptions: {
        // videojs options
        // muted: true,
        fluid: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src:
              // "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
              // "http://192.17.1.241/media/stream/hello.mp4"
              "http://localhost/media/stream/games.mp4"
          }
        ],
        poster: ""
      }
    };
  },
  mounted() {
    console.log("this is current player instance object", this.player);
    this.player.markers({
      markers: [
        {time: 9.5, text: "this"},
        {time: 16,  text: "is"},
        {time: 23.6,text: "so"},
        {time: 28,  text: "cool"},
        {time: 35,  text: "cooa"}
      ]
    })
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    broadcast(id){
      console.log(id)
      this.playerOptions.sources[0].src = "http://192.17.1.241/media/stream/games.mp4"
    },
    // listen event
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      console.log('player pause!', player)
    },
    // ...player event
    onPlayerTimeupdate(player) {

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
      player.hotkeys({
        volumeStep: 0.1,
        seekStep: 5,
        enableModifiersForNumbers: false,
        enableMute: true,
        fullscreenKey: function(event, player) {
          // override fullscreen to trigger when pressing the F key or Ctrl+Enter
          return ((event.which === 70) || (event.ctrlKey && event.which === 13));
        }
      }),
      console.log('aabbccddee')
      // player.thumbnails({
      //   0: {
      //     src: 'http://192.17.1.241/media/timg.jpg',
      //     width: '120px'
      //   },
      //   5: {
      //     src: 'http://192.17.1.241/media/timg.jpg'
      //   }
      // })
      // player.thumbnails({
      //     stepTime: 202,
      //     spriteUrl: 'http://localhost/media/timg.jpg',
      //     width: '101'
      // });
    }
  }
};
</script>