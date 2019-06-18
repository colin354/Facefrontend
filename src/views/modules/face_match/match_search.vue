<template>
  <d2-container>
    <SplitPane :min-percent="20" :default-percent="20" split="vertical">
      <template slot="paneL">
        <div style="margin: 10px;">左</div>
      </template>
      <template slot="paneR">
            <div style="margin: 10px;">
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

export default {
  name: "page3",
  components: {
    videoPlayer
  },
  data() {
    return {
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
              "http://localhost/media/stream/hello.mp4"
          }
        ],
        poster: "@assets/images/logo.jpg",
        controlBar: {
          timeDivider: true,
          fullscreenToggle: true
        }
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
    // listen event
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      console.log("the player is readied", player);
      // you can use it to do something...
      // player.[methods]
    }
  }
};
</script>