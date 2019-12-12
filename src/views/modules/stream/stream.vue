<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-form :inline="true" size="mini" :model="dataForm">
              <el-form-item>
                <el-button type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
              </el-form-item>
            </el-form>
            <el-table
              size="mini"
              v-loading="dataListLoading"
              :data="dataList"
              border
              @selection-change="dataListSelectionChangeHandle"
              @sort-change="dataListSortChangeHandle"
              style="width: 100%;">
              <el-table-column type="selection" header-align="center" align="center" width="40"/>
              <el-table-column prop="streamname" :label="$t('stream.videoname')" header-align="center" align="center" width="130"/>
              <el-table-column prop="streamlocation" :label="$t('stream.location')" header-align="center" align="center" width="150"/>
              <el-table-column prop="streamtime" :label="$t('stream.duration')" header-align="center" align="center" width="50"/>
              <!-- <el-table-column prop="streamfps" :label="$t('stream.frame')" header-align="center" align="center" width="80"/> -->
              <!-- <el-table-column prop="streamstatus" :label="$t('stream.status')" sortable="custom" header-align="center" align="center" width="80"/> -->
              <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="addOrUpdateHandle(scope.row.id)" icon="el-icon-edit" circle></el-button>
                  <el-button type="primary" size="mini" @click="deleteHandle(scope.row.id)" icon="el-icon-delete" circle></el-button>                  
                  <el-button type="primary" size="mini" @click="broadcast(scope.row.streamurl,scope.row.streamlocation,scope.row.streamname)" icon="el-icon-video-play" circle></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
      <!-- 右侧视频 -->
      <el-card class="box-card" :span="12" style="background-color:#F2F6FC;">
        <span style="font-size:16px;">{{video_name}}</span>
        <!-- <div v-if="!video_name" style="font-size:16px;">{{this.dataList[0].streamlocation + ' - ' +this.dataList[0].streamname}}</div>
        <div v-else style="font-size:16px;">{{video_name}} </div> -->
      </el-card>
      <!-- <el-card class="box-card" :span="12" height="500" width="500"> -->
      <el-card class="box-card">
        <el-col>
          <div class="grid-content bg-purple" height="500" width="500">           
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
      </el-card>
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
    </el-row>
    <!-- 分页 -->
    <el-pagination
        slot="footer"
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="pageSizeChangeHandle"
        @current-change="pageCurrentChangeHandle">
      </el-pagination>
  </d2-container>
</template>

<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import 'videojs-hotkeys'
import "@/views/modules/face_match/src/videojs.markers.css"
import 'videojs-markers'
// import thumbnails from 'videojs-thumbnails'
// import vttThumbnails from 'videojs-vtt-thumbnails'
// import spriteThumbnails from 'videojs-sprite-thumbnails'
import '@/views/modules/face_match/src/custom-theme.css'
import mixinViewModule from '@/mixins/view-module'
import AddOrUpdate from './stream-add-or-update'
import { cookieGet } from '@/common/cookie'
export default {
  mixins: [ mixinViewModule ],
  name: "stream",
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: `/sys/stream/page?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/sys/stream?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      dataForm: {},
      playerOptions: {
        // videojs options
        muted: true,
        fluid: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: "http://221.231.13.230:8888/media/test_video/jwc.mp4"
          }
        ],
        poster: "",
        custum: [],
      },
      video_name: "北京市海淀区北四环中路269号-1-20190925092718-17.0"
    }
  },
  components: {
    AddOrUpdate,
    videoPlayer
  },
  mounted() {
    console.log("this is current player instance object", this.player);
    console.log("-----------------------1111111111111")
    console.log(this.dataList)
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }, 
  methods: {
    broadcast(streamurl,streamlocation,streamname){
      this.playerOptions.sources[0].src = streamurl
      console.log("----我要的数据-------")
      // console.log(id_rec)
      console.log(this.dataList)
      // console.log(this.dataList[id_rec].streamlocation+'——'+this.dataList[id_rec].streamname)
      this.video_name = streamlocation+'-'+streamname
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
    }
  }
}
</script>



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
  .video-js .vjs-icon-placeholder {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
