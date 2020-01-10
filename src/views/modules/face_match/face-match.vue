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
                    <el-button @click="showAll()" v-if="showAllVisible">返回</el-button>
                  </el-form-item>
                </el-form>
                <el-carousel :interval="4000" type="card" height="150px">
                  <el-carousel-item v-for="(item, index) in facelist" :key="index">
                    <!-- 默认显示全部图片时,用的是user_id -->
                    <el-card v-if="showId" :body-style="{ padding: '0px'}" >
                      <span @click="getDatas(item.user_id)">id:{{item.user_id}}</span>
                      <img :src="item.imgurl" style="width:100%" @click="getDatas(item.user_id)">
                    </el-card>
                    <!-- 点击单独一张图片,有了查询结果及轨迹后,此时用的是userid_id -->
                    <el-card v-else="showId" :body-style="{ padding: '0px'}" >
                      <span @click="getDatas(item.userid_id)">id:{{item.userid_id}}</span>
                      <img :src="item.imgurl" style="width:100%" @click="getDatas(item.userid_id)">
                    </el-card>

                  </el-carousel-item>
                </el-carousel>
              </el-card>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col>
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <el-table
                  height="460"
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
    >
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">
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
        </el-col>
      </el-row>
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
  name: "face-match",
  components: {
    videoPlayer,
    faceimg,
    facecarsousel
  },
  mixins: [ mixinViewModule ],
  data() {
    let id = this.$route.params.id;//存放face.vue界面传过来的faceid
    return {
      cameraMarkers:[],
      total: 0,
      showAllVisible: false,
      showId:true,
      getLocations:[],
      dataList:[],
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
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }, 
  methods: {
    showAll(){
      console.log("----showALl---")      
      var url = `/api/check?token=${cookieGet('token')}`
        this.$axios.get(url)
        .then(res=> {
          console.log("---0000000000------------+++++++++")
          console.log(res)
          // this.total = res.count
          this.total = res.list.length
          this.dataList = res.list        
          this.facelist = []
          this.dataList = []
          this.facelist = res.imgList //存放人脸图片相关信息          
          this.dataList = res.list          
          console.log("===================")
        })
        .catch(error =>{
            console.log(error)
        })
      this.showId = true
      this.initMap() //点击返回后,所有的轨迹应该消失
    },
    initMap(){
      lazyAMapApiLoaderInstance.load().then(() => {
          this.map = new AMap.Map('amap-show', {
              center:[120.095913,33.302156],
              zoom: 18
          })
      });
      this.showAllVisible = false
    },
    getDatas(user_id){//先发送get请求,     
      if(user_id){
        var url = `/api/check?token=${cookieGet('token')}` + '&faceid=' + user_id
        this.$axios.get(url)
        .then(res=> {
          console.log("---0000000000------------+++++++++")
          console.log(res)
          this.dataList = []
          this.getLocations = []
          this.facelist = []
          this.cameraMarkers = []
          // this.total = res.count
          this.total = res.list.length
          this.dataList = res.list
          this.getLocations = res.location //存放轨迹的经纬度信息
          this.facelist = res.imgList //存放人脸图片相关信息
          this.cameraMarkers = res.Markers
          console.log("===getDatas=====getDatas===========")
          console.log(this.facelist)
          console.log("data-----list")
          console.log(this.dataList)
          this.getDurationGPSData()
        })
        .catch(error =>{
            console.log(error)
        })
      }
      this.showId = false
    },
    //高德地图
    getDurationGPSData(){//再画出同一个人的多条轨迹   
    //画出一个人的轨迹
      this.showAllVisible = true
      this.map = new AMap.Map('amap-show', {
                      // center: [120.094163,33.313109],  //汇文公馆
                      center:[120.095913,33.302156],
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
      this.addMarker()  //地图上显示轨迹的同时,显示摄像头图标
    },
    //添加摄像头图标
    addMarker(){
      let self = this
      var startIcon = new AMap.Icon({ //摄像头图标
          size: new AMap.Size(25, 34),
          image: '',
          // image: 'http://10.2.155.139:8888/media/fxq_test/camera_0.png',//此处修改摄像头图标
          // image: 'http://172.14.40.60:8888/media/fxq_test/camera_0.png',//此处修改摄像头图标
          // 图标所用图片大小
          imageSize: new AMap.Size(20, 20),
          // 图标取图偏移量
          imageOffset: new AMap.Pixel(-1, -1)
      });
      if(this.cameraMarkers){
        for(var i=0 ; i<this.cameraMarkers.length; i++){
          var viaMarker0 = new AMap.Marker({
            position:new AMap.LngLat(self.cameraMarkers[i][0],self.cameraMarkers[i][1]),
            icon: startIcon,
            offset:new AMap.Pixel(-10,-10)
          })
          this.map.add([viaMarker0])
        }
      }
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
      url = `${process.env.VUE_APP_API}/`+url
      //url = 'http://10.2.155.139:8888'+url
      this.playerOptions.sources[0].src = url
      this.$axios
      .get(`/api/check?token=${cookieGet('token')}`,{params:{faceid:fid,streamid:sid}})
      .then(res => {
        console.log('播放---res')
        this.playerOptions.custum = res.list
      })
      .catch(() => {});
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
  .customclass{
    // background: #0d2663;
    width: 100%;
  }
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