<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-form :inline="true" size="mini" :model="dataForm">
              <el-form-item>
                <el-input v-model="dataForm.faceid" :placeholder="$t('check.faceid')" clearable/>
              </el-form-item>
              <el-form-item>
                <el-button @click="getDataList()">{{ $t('query') }}</el-button>
              </el-form-item>
              <!-- <el-form-item>
                
              </el-form-item> -->
            </el-form>
            <facelist :facelist="facelist" v-model="dataForm.faceid" @getface="getface"></facelist>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
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
              <el-table-column prop="url" :label="$t('face.url')" header-align="center" align="center" />
              <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="broadcast(scope.row.faceid,scope.row.streamid,scope.row.url)">{{ $t('check.broadcast') }}</el-button>
                </template>
            </el-table-column>
            </el-table>
            <!-- 分页 -->
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

<style lang="scss" scoped>
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
</style>

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
// import 'videojs-notations'
import '@/views/modules/face_match/src/custom-theme.css'
import faceimg from './face-img'
import facelist from './face-list'
import { constants } from 'crypto';

// const plugin = function(list, item) {
//   markers(this, list, item);
// };

// videojs.registerPlugin("markers", markers);
// videojs.registerPlugin("notations", notations);

export default {
  name: "page3",
  components: {
    videoPlayer,
    facelist,
    faceimg
  },
  mixins: [ mixinViewModule ],
  data() {
    return {
      facelist: [],
      imgarr: [],
      mixinViewModuleOptions: {
        getDataListURL: `/api/check?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/api/check?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      dataForm: {
        faceid: ''
      },
      playerOptions: {
        // videojs options
        loop: true,
        muted: true,
        fluid: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src:
              // "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
              // "http://10.2.151.139:8888/media/test_video/jack_rose.mp4"
              "http://localhost/media/stream/hello.mp4"
              //http://localhost
          }
        ],
        poster: "",
        custum: [
          {time: 4.54,   text: "jack", overlayText: "1", imgList:[{id:'1',url:'http://192.17.1.18/media/sample/1.jpg'},{id:'2',url:'http://192.17.1.18/media/sample/2.jpg'}],width:"100%"},
          {time: 4.55,   text: "rose", overlayText: "2", imgList: [{id:'11',url:'http://192.17.1.18/media/sample/3.jpg'},{id:'22',url:'http://192.17.1.18/media/sample/4.jpg'},{id:'33',url:'http://192.17.1.18/media/sample/5.jpg'}],width:"50%"},
          {time: 300,  text: "so", overlayText: "3", imgList:[{id:'111',url:'aaaaa'},{id:'222',url:'bbbbb'}],width:"100%"},
          {time: 240,  text: "cool", overlayText: "4", overlayA:"aaa",width:"70%"},
          {time: 1200,  text: "nono", overlayText: "8", overlayA:"aaa",width:"70%"},
        ]
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
    getface(id){
      console.log(id)
      this.dataForm.faceid = id
      this.getDataList()
    },
    broadcast(fid,sid,url){
      console.log('******----******')
      url = `${process.env.VUE_APP_API}/`+url
      console.log(url)
      this.playerOptions.sources[0].src = url
      this.$axios
      .get(`/api/check?token=${cookieGet('token')}`,{params:{faceid:fid,streamid:sid}})
      .then(res => {
        console.log('****res***res****')
        console.log(res)
        this.playerOptions.custum = res.list
      })
      .catch(() => {});
      // this.playerOptions.sources[0].src = this.dataList[id].url
      /**todo:
       *  read the proporty from end, to 
       */
      //  this.imgarr = [{},{}] 
      /**
       * todo: custunm markers 
       */
      this.playerOptions.custum = [
          {time: 9.5, text: "this", overlayText: "1", class: "special-blue", imgList: [{},{}]},
          {time: 16,  text: "is", overlayText: "2", imgList: [{},{},{}]},
          {time: 23.6,text: "so", overlayText: "3", imgList: [{},{}]},
          {time: 28,  text: "cool", overlayText: "4", imgList: [{},{},{},{}]},
          {time: 35,  text: "cooa", overlayText: "5",imgList: [{},{}]}
        ] 
    },
    // listen event
    onPlayerPlay(player) {
      console.log('player play!', player)
    },
    onPlayerPause(player) {
      console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      console.log('player end!', player)
    },
    // ...player event
    onPlayerTimeupdate(player) {
      console.log("hahahahahaha")
    },
    onPlayerLoadeddata(player) {
    },
    onPlayerPlaying(player) {
      console.log('on plyer')
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log('111111player current update state', playerCurrentState)
    },
    onPlayerCanplaythrough(player) {
      console.log('11111on ply')
      if(player.currentTime() < this.playerOptions.custum[0].time) {
        this.imgarr = []
      }
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
      let aa = this.playerOptions.custum
      let ab = this
      this.imgarr = []
      console.log(this.playerOptions.custum)
      player.markers({
        markerStyle: {
            'width':'9px',
            'border-radius': '40%',
            'background-color': 'orange'
        },
        onMarkerReached: function(marker,index){
          console.log("aaaaa***999")
          console.log(marker)
          ab.imgarr = marker.imgList
          console.log(ab.imgarr)
        },
        markers: aa
      });
      console.log(this)
    }
  }
};
</script>