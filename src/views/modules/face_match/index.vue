<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-row :gutter="20">
          <el-col>
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <el-form :inline="true" size="mini" :model="dataForm" @submit.native.prevent>
                  <el-form-item>
                    <el-input v-model.number="dataForm.faceid" :placeholder="$t('check.faceid')" 
                    @keyup.enter.native="getDataList()" clearable/>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="getDatas()">{{ $t('query')}}</el-button>

                    <el-button @click="getDurationGPSData()" v-if="showA">地图轨迹</el-button>
                  </el-form-item>
                </el-form>
                <!-- <el-image style="width: 100px; height: 100px" :src="face_url" fit="contain">
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image> -->
                <facecarsousel :facelist="facelist"></facecarsousel>
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
                  :data="dataList.slice((page-1)*limit,page*limit)"
                  border
                  @selection-change="dataListSelectionChangeHandle"
                  @sort-change="dataListSortChangeHandle"
                  style="width: 100%;">
                  <el-table-column prop="facename" :label="$t('face.name')" header-align="center" align="center" width="50"/>
                  <el-table-column prop="streamname" :label="$t('stream.videoname')" header-align="center" align="center" width="160"/>
                  <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
                    <template slot-scope="scope">
                      <el-button type="primary" size="mini" @click="broadcast(scope.row.faceid,scope.row.streamid,scope.row.url)" icon="el-icon-video-play" circle></el-button>
                    </template>
                </el-table-column>
                </el-table>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="18">
        <div class="grid-content bg-purple">
            <el-card class="box-card-hei">
              <div class="amap-page-container">
                <!-- {{this.temp}} -->
                  <div id="amap-show" class="amap-demo"></div>
              </div>
            </el-card>
         </div>
      </el-col>

    </el-row>

    <el-pagination
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="limit"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="pageChangeHandle"
      @current-change="pCurrentChangeHandle">
    </el-pagination>
    
    <el-dialog
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :fullscreen="false"
      custom-class="customclass"
      :append-to-body="true"
    >
      <el-col>
        <el-row>
          <el-col>
            <div class="grid-content bg-purple">
              <!-- <el-card class="box-card"> -->
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
              <!-- </el-card> -->
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-dialog>   
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
import 'videojs-markers'
import '@/views/modules/face_match/src/custom-theme.css'
import faceimg from './face-img'
import facecarsousel from './face-carsousel'
import { constants } from 'crypto'
import { lazyAMapApiLoaderInstance } from 'vue-amap';

// videojs.registerPlugin("markers", markers);

export default {
  name: "page3",
  components: {
    videoPlayer,
    faceimg,
    facecarsousel
  },
  mixins: [ mixinViewModule ],
  data() {
    let id = this.$route.params.id;//存放face.vue界面传过来的faceid
    return {
      showA: false,
      temp:[],
      getLocations:[],
      dataList:[],
      // id: null, //存放face.vue界面传过来的faceid
      showMapline: true,
      visible: false,
      facelist: [],
      imgarr: [],
      mixinViewModuleOptions: {
        getDataListURL: `/api/check?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/api/check?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      dataForm: {
        faceid:id
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
            src: ""
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
  created(){ 
    console.log("this is created!!--------------------facelist") 
    console.log(this.facelist)  
  },
  mounted() {
    this.initMap()
    // console.log("this is current player instance object", this.player);
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }, 
  methods: {
   initMap(){
      lazyAMapApiLoaderInstance.load().then(() => {
          this.map = new AMap.Map('amap-show', {

              center: [120.094163,33.313109],
              zoom: 18
          })
      });
    },
    getDatas(){//先发送get请求,

      this.showA = true
      var url = `/api/check?token=${cookieGet('token')}` + '&faceid=' + this.dataForm.faceid
      this.$axios.get(url)
      .then(res=> {
        console.log("---0000000000------------+++++++++")
        console.log(res)
        this.dataList = res.list
        this.getLocations = res.location
        this.facelist = res.imgList
        console.log("===================")
        console.log(this.getLocations)
      })
      .catch(error =>{
          console.log(error)
      })
      // this.getDurationGPSData()
    },
    //高德地图

    getDurationGPSData(){//再画出同一个人的多条轨迹   
    //画出一个人的轨迹
    this.map = new AMap.Map('amap-show', {
                    center: [120.094163,33.313109],
                    zoom: 18
                },
        AMapUI.loadUI(['misc/PathSimplifier'], (PathSimplifier) => {
            if (!PathSimplifier.supportCanvas) {
                alert('当前环境不支持 Canvas！');
                return;
            }
             //同一个i值即同一个faceid,同一个人,用同一种颜色;不同的i值用不同的颜色
              var bezierCurve = new AMap.BezierCurve({
                  path: this.getLocations,
                  showDir: true,
                  dirColor:'white',
                  isOutline: true,
                  outlineColor: "transparent",
                  borderWeight: 3,
                  strokeColor: 'blue', //线颜色
                  strokeOpacity: 1,//线透明度
                  strokeWeight: 5, //线宽
                  // 线样式还支持 'dashed'
                  strokeStyle: "solid", //线样式
                  // strokeStyle是dashed时有效
                  strokeDasharray: [10, 10],
                  lineJoin: 'round',
                  lineCap: 'round',
                  zIndex: 50,
                  dirArrowStyle:{
                      stepSpace: 8,  //stepSpace: {number} 箭头排布的间隔，单位像素
                      width: 3
                  }                                   
              })
              bezierCurve.setMap(this.map)
              // 缩放地图到合适的视野级别
              this.map.setFitView([ bezierCurve ]) 
        })
    )
    this.showA = false

    },
    // 分页, 每页条数
    pageChangeHandle (val) {
    },
    // 分页, 当前页
    pCurrentChangeHandle (val) {
      this.page = val
    },
    broadcast(fid,sid,url){
      this.visible = true
      console.log('----这是我要的数据----')
      console.log(this.dataList) 
      //url = `${process.env.VUE_APP_API}/`+url
      url = 'http://10.2.155.139:8888'+url
      this.playerOptions.sources[0].src = url
      this.$axios
      .get(`/api/check?token=${cookieGet('token')}`,{params:{faceid:fid,streamid:sid}})
      .then(res => {
        console.log('播放---res')
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
      // this.playerOptions.custum = [
      //     {time: 9.5, text: "this", overlayText: "1", class: "special-blue", imgList: [{},{}]},
      //     {time: 16,  text: "is", overlayText: "2", imgList: [{},{},{}]},
      //     {time: 23.6,text: "so", overlayText: "3", imgList: [{},{}]},
      //     {time: 28,  text: "cool", overlayText: "4", imgList: [{},{},{},{}]},
      //     {time: 35,  text: "cooa", overlayText: "5",imgList: [{},{}]}
      //   ]

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
      // if(player.currentTime() < this.playerOptions.custum[0].time) {
      //   this.imgarr = []
      // }
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
          console.log(index)
          console.log(marker)
          ab.imgarr = marker.imgList
        },
        markers: aa
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .amap-demo {
    height: 615px;
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
  .imgblock {
    width: 15%;
    height: 15%;
    display: block;
  }  
</style>