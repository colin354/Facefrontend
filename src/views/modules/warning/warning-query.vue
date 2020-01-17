<template>
  <d2-container>
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.queryName" :placeholder="$t('warning.type')" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">{{ $t('query') }}</el-button>
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
      <el-table-column type="selection" header-align="center" align="center" width="50"/>
      <el-table-column prop="id" :label="$t('warning.id')" header-align="center" align="center" width="50"/>
      <el-table-column prop="warning_time" :label="$t('warning.time')" header-align="center" align="center"/>
      <el-table-column prop="warning_camera_id" :label="$t('warning.cameraId')" header-align="center" align="center"/>
      <el-table-column prop="warning_camera_name" :label="$t('warning.cameraId')" header-align="center" align="center"/>
      <el-table-column prop="warning_level" :label="$t('warning.level')" header-align="center" align="center"/>
      <el-table-column prop="warning_id" :label="$t('warning.warningId')" header-align="center" align="center"/>
      <el-table-column prop="warning_name" :label="$t('warning.name')" header-align="center" align="center" :show-overflow-tooltip="true" />
      <el-table-column prop="warning_message" :label="$t('warning.type')" header-align="center" align="center" :show-overflow-tooltip="true" />
      <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
        <template slot-scope="scope">
          <el-button v-if="scope.row.suspended" type="text" size="mini" @click="activeHandle(scope.row.id)">{{ $t('process.active') }}</el-button>
          <el-button v-else type="text" size="mini" @click="playVideo(scope.row.id, scope.row.warning_video_url)">播放</el-button>
          <el-button type="text" size="mini" @click="deleteHandle(scope.row.deploymentId)">{{ $t('delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    
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
import mixinViewModule from '@/mixins/view-module'
import Deploy from './process-deploy'
import { cookieGet } from '@/common/cookie'
import qs from 'qs'
import "video.js/dist/video-js.css"
import { videoPlayer } from "vue-video-player"
import 'videojs-hotkeys'
import '@/views/modules/face_match/src/custom-theme.css'

export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: `/api/warningHistory?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/api/warningHistory?token=${cookieGet('token')}`,
        deleteIsBatch: true,
      },
      dataForm: {
        queryName: '',
        key: ''
      },
      video_visible: false,
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
        custum: []
      }
    }
  },
  components: {
    Deploy,
    videoPlayer
  },
  methods: {
    // 获取流程(xml/image)url地址
    getResourceURL (id, name) {
      var params = qs.stringify({
        'token': cookieGet('token'),
        'deploymentId': id,
        'resourceName': name
      })
      return `${window.SITE_CONFIG['apiURL']}/act/process/resource?${params}`
    },
    // 部署流程文件
    playVideo (id, url) {
      this.playerOptions.sources[0].src = url
      this.video_visible = true
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
      console.log('on player')
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log('111111player current update state', playerCurrentState)
    },
    onPlayerCanplaythrough(player) {
      console.log('11111on ply')
    },
    onPlayerCanplay(player) {
      console.log('aaabbaa')
    },
    onPlayerWaiting(player) {
      console.log('waiting')
    },
    playerReadied(player){
      console.log("the player is readied!!!!!", player);
    },    
    // 激活
    activeHandle (id) {
      this.$confirm(this.$t('prompt.info', { 'handle': this.$t('process.active') }), this.$t('prompt.title'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        this.$axios.put(`/act/process/active/${id}`).then(res => {
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.getDataList()
            }
          })
        }).catch(() => {})
      }).catch(() => {})
    },
    // 挂起
    suspendHandle (id) {
      this.$confirm(this.$t('prompt.info', { 'handle': this.$t('process.suspend') }), this.$t('prompt.title'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        this.$axios.put(`/act/process/suspend/${id}`).then(res => {
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.getDataList()
            }
          })
        }).catch(() => {})
      }).catch(() => {})
    },
    // 转换为模型
    convertToModelHandle (id) {
      this.$confirm(this.$t('prompt.info', { 'handle': this.$t('process.convertToModel') }), this.$t('prompt.title'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        this.$axios.post(`/act/process/convertToModel/${id}`).then(res => {
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.getDataList()
            }
          })
        }).catch(() => {})
      }).catch(() => {})
    }
  }
}
</script>
