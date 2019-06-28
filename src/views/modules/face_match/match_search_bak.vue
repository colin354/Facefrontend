<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-row :gutter="20">
          <el-col>
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <el-form :inline="true" size="mini" :model="dataForm">
                  <el-form-item>
                    <el-input v-model="dataForm.faceid" :placeholder="$t('check.faceid')" clearable/>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="getDataList()">{{ $t('query') }}</el-button>
                  </el-form-item>          
                </el-form>
              </el-card>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
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
                  <el-table-column prop="faceid" :label="$t('face.name')" header-align="center" align="center" width="60"/>
                  <el-table-column prop="url" :label="$t('face.url')" header-align="center" align="center" width="290"/>
                  <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" size="mini" @click="broadcast(scope.row.faceid,scope.row.streamid,scope.row.url)">{{ $t('check.broadcast') }}</el-button>
                    </template>
                </el-table-column>
                </el-table>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16">
        <el-row ::gutter="20">
          <el-col>
            <div class="grid-content bg-purple">
              <el-card class="box-card">
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
              </el-card>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <faceimg :imgarr="imgarr"></faceimg>
              </el-card>
            </div>
          </el-col>
        </el-row>   
      </el-col>
    </el-row> 
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