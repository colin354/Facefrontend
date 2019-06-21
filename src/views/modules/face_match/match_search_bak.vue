<template>
  <d2-container>
    <SplitPane :min-percent="20" :default-percent="30" split="vertical">
      <template slot="paneR">
            <div style="margin: 10px;">
              <video-player class="vjs-custom-skin"
                            ref="videoPlayer"
                            :options="playerOptions"
                            customEventName="changed"
                            @play="onPlayerPlay($event)"
                            @changed="playerStateChanged($event)"
                            @ready="playerIsReady">
              </video-player>
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
import 'videojs-markers'
import 'videojs-flash'


  // export
  export default {
    components: {
      videoPlayer,
    },
    data() {
      return {
        playerOptions: {
          // videojs options
          muted: true,
          fluid: true,
          language: "en",
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            // mp4
            // type: 'video/mp4',
            // src: 'http://vjs.zencdn.net/v/oceans.mp4',
            // flv
            type: 'video/mp4',
            src: 'http://192.17.1.241/media/stream/hello.mp4'
          }],
          language: 'zh-CN',
          // techOrder: ['flash'],
          poster: "@assets/images/logo.jpg"
        }
      }
    },
    mounted() {
      console.log("this is current player instance object", this.player);
        this.player.markers({
          markers: [
            {time: 9.5, text: "this"},
            {time: 16,  text: "is"},
            {time: 23.6,text: "so"},
            {time: 2800,  text: "cool"}
          ]
        })
    },    
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      playerStateChanged(playerCurrentState) {
        console.log('example 2: state changed', playerCurrentState)
      },
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },      
      playerIsReady(player) {
        console.log('example 2 ready!', player)
        player.hotkeys({
          volumeStep: 0.1,
          seekStep: 5,
          enableModifiersForNumbers: false,
          enableVolumeScroll: false,
          enableMute: true
          // fullscreenKey: function(event, player) {
          //   // override fullscreen to trigger when pressing the F key or Ctrl+Enter
          //   return ((event.which === 70) || (event.ctrlKey && event.which === 13));
          // }
        })
      }
    }
  }
</script>