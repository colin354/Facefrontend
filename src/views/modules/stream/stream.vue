<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col>
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-form :inline="true" size="mini" :model="dataForm">
              <!-- <el-form-item>
                <el-button type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
              </el-form-item> -->
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
              <el-table-column prop="id" :label="$t('camera_stream.id')" header-align="center" align="center" width="80"/>
              <el-table-column prop="cameraId" :label="$t('camera_stream.cameraId')" header-align="center" align="center" width="80"/>
              <el-table-column prop="startTime" :label="$t('camera_stream.start_time')" header-align="center" align="center" />
              <el-table-column prop="endTime" :label="$t('camera_stream.end_time')" header-align="center" align="center" />
              <el-table-column prop="streamTime" :label="$t('camera_stream.time')" header-align="center" align="center"/>
              <!-- <el-table-column prop="streamstatus" :label="$t('stream.status')" sortable="custom" header-align="center" align="center" width="80"/> -->
              <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="playVideo(scope.row.id, scope.row.streamUrl)" icon="el-icon-video-play" circle></el-button>
                  <el-button type="primary" size="mini" @click="deleteHandle(scope.row.id)" icon="el-icon-delete" circle></el-button>                  
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
    <el-dialog
      :visible.sync="video_visible"
      title="视频播放"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
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
  data () {
    let id = this.$route.params.cameraid; //存放face.vue界面传过来的faceid
    return {
      mixinViewModuleOptions: {
        getDataListURL: `/sys/camerastream?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/sys/camerastream?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      video_visible: false,
      dataForm: {
        cameraid:id
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
            src: ""
          }
        ],
        poster: "",
        custum: [],
      },
      video_name: ""
    }
  },
  components: {
    AddOrUpdate,
    videoPlayer
  },
  mounted () {
    console.log('ttttttist is params')
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    playVideo (id, url) {
      this.playerOptions.sources[0].src = url
      this.video_visible = true
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
