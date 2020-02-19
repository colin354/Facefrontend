<template>
  <d2-container>
    <el-row :gutter="18">
      <el-col :span="24">
        <el-form :inline="true" size="mini" :model="dataForm">
          <el-form-item>
            <el-input v-model="dataForm.queryName" placeholder="摄像头位置" clearable/>
          </el-form-item>
          <el-form-item>
            <el-button @click="getDataList()" @keyup.enter="getDataList()">{{ $t('query') }}</el-button>
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
          <el-table-column prop="cameraName" label="摄像头位置" header-align="center" align="center"/>
          <el-table-column prop="datetime" label="行人出现时间" header-align="center" align="center"/>
          <el-table-column prop="message" label="预警信息" header-align="center" align="center"/>
          <el-table-column prop="imgurl" label="行人图片" header-align="center" align="center">
            <template  slot-scope="scope">
              <!-- <el-popover
                placement="right"
                title=""
                trigger="hover">
                <img :src="scope.row.imgurl"/>
                <img slot="reference" :src="scope.row.imgurl" :alt="scope.row.imgurl" style="max-height: 60px;max-width: 60px">
              </el-popover> -->
              <img :src="scope.row.imgurl" width="70" height="70" @click="openDialog(scope.row.imgurl)">
              <!-- <div class="demo-image__preview">
                <el-image 
                  style="width: 70; height: 70"
                  :src="scope.row.imgurl" 
                  :preview-src-list="[scope.row.imgurl]">
                </el-image>          
              </div>     -->
            </template>
          </el-table-column>
          <!-- <el-table-column prop="warning_message" :label="$t('warning.type')" header-align="center" align="center" :show-overflow-tooltip="true" /> -->
          <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
            <template slot-scope="scope">
              <!-- <el-button v-else type="text" size="mini" @click="playVideo(scope.row.id, scope.row.warning_video_url)">播放</el-button> -->
              <el-button type="text" size="mini" @click="deleteHandle(scope.row.deploymentId)">{{ $t('delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>        
      </el-col>
      <!-- <el-col :span="6">
        <el-row>
          <databox
            title="信息统计"
            :dheight="100"
            :icon="'account'"
          >
            <dnumber
              :dheight="10"
              title="抓拍总数"
              :size="'2rem'"
              :dnumber="numberData.total"
              :color="'#25f3e6'"
            >
            </dnumber>
            <dnumber
              :dheight="10"
              title="抓拍总数"
              :size="'2rem'"
              :dnumber="numberData"
              :color="'#25f3e6'"
            >
            </dnumber>            
          </databox>
        </el-row>
        <el-row>
          <databox
            title="人员统计"
            :dheight="200"
            :icon="'account'"
          >
          </databox>          
        </el-row>        
      </el-col> -->
    </el-row>

    
    <el-dialog
      :visible.sync="dialogTableVisible"
      title="图片预览"
      width="30%"
    >
      <div class="demo-image__preview">
        <!-- <img :src="bigimgurl" width="150" height="300"> -->
        <el-image 
          style="width: 130; height: 200"
          :src="bigimgurl">
        </el-image>
      </div>    
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
import { cookieGet } from '@/common/cookie'
import qs from 'qs'
import dnumber from "./components/dnumber";
import "video.js/dist/video-js.css"
import { videoPlayer } from "vue-video-player"
import 'videojs-hotkeys'
import '@/views/modules/face_match/src/custom-theme.css'

export default {
  mixins: [ mixinViewModule ],
  mounted () {
    this.numberData = 12
  },
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: `/sys/camera_pedestrian_ws?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/sys/camera_pedestrian_ws?token=${cookieGet('token')}`,
        deleteIsBatch: true,
      },
      dataForm: {
        queryName: '',
        key: ''
      },
      numberData: 12,
      bigimgurl: '',
      dialogTableVisible: false,
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
    dnumber,
    videoPlayer
  },
  methods: {
    openDialog (val){
      this.dialogTableVisible = true;
      this.bigimgurl = val
      console.log(val)
    },
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

<style lang="scss" scoped>
.top_logo {
  height: 30%;
  width: 100%;
}
</style>
