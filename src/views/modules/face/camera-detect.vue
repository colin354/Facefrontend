<template>
  <d2-container>
    <el-row :gutter="20">
      <!-- 左侧列表展示 -->
      <el-col :span="18">
        <el-card class="box-card">
          <el-form :inline="true" size="mini" :model="dataForm" @submit.native.prevent>
            <el-form-item>
              <el-input v-model="dataForm.cameraname" :placeholder="$t('camera.name')" 
              @keyup.enter.native="getDataList()" clearable/>
            </el-form-item>
            <el-form-item>
              <el-button @click="getDataList()">{{ $t('query') }}</el-button>
              <el-button :type="button_type" @click="startDetect()">{{button_text}}</el-button>
              <el-button type="danger" @click="stopDetect()">停止检测</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="exportHandle()">{{ $t('export') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="exportAll()"> 导出所有 </el-button>
            </el-form-item>
          </el-form>
          <div class="grid-content bg-purple" >          
            <el-table
              size="mini"
              type="selection"
              :row-key="getRowKeys"
              v-loading="dataListLoading"
              :data="dataList"
              border
              ref="table"
              @selection-change="handleSelectionChange"
              @sort-change="dataListSortChangeHandle"
              style="width: 100%;">
              <el-table-column type="selection" :reserve-selection="true" :selectable="checkSelectable" header-align="center" align="center" width="50"/>
              <el-table-column prop="id" label="Id" header-align="center" align="center" width="50"/>
              <el-table-column prop="cameraName" :label="$t('camera.name')" header-align="center" align="center" width="120"/>
              <el-table-column prop="cameraLocation" :label="$t('camera.location')" header-align="center" align="center" width="150"/>
              <el-table-column prop="cameraLon" :label="$t('camera.lat')"  header-align="center" align="center" width="90"/>
              <el-table-column prop="cameraLat" :label="$t('camera.lon')"  header-align="center" align="center" width="90"/>
              <el-table-column :label="$t('handle')"  header-align="center" align="center"  width="460">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="addOrUpdateHandle(scope.row.id)" icon="el-icon-edit" circle></el-button>
                  <el-button type="primary" size="mini" @click="addVideo(scope.row.id)">测试用添加视频</el-button>
                  <el-button type="primary" size="mini" @click="queryVideo(scope.row.id,scope.row.cameraName,scope.row.cameraLocation)">摄像头视频</el-button>
                  <el-button type="primary" size="mini" @click="startRecord(scope.row.id,scope.row.cameraName,scope.row.cameraLocation)">上传视频到数据库</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
    </el-row>
    <!--添加视频时弹出对话框-->
    <el-dialog
      :visible.sync="video_visible"
      title="添加视频"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        :data="videoList"
        :model="videoForm"
        :rules="dataRule"
        ref="videoForm"
        @keyup.enter.native="videoFormSubmitHandle()"
        label-width="120px"
      >
      <el-form-item prop="streamUrl" label="视频流URL">
        <el-input v-model="videoForm.streamUrl" placeholder="视频流URL"/>
      </el-form-item>

      <el-form-item prop="startTime" label="视频流开始时间">
        <div class="block">
          <el-date-picker
            v-model="videoForm.startTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="video_visible = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="videoFormSubmitHandle()">{{ $t('confirm') }}</el-button>
      </template>
    </el-dialog>

    <!--点击每个摄像头的查询按钮时,弹出该摄像头下所有的视频对话框-->
    <el-dialog
      :visible.sync="query_visible"
      title="视频列表"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-row> 
        <el-button type="primary" style="font-size:14px;">摄像头名称</el-button>
        <span style="font-size:16px;">&nbsp;&nbsp;{{tempName}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <el-button type="primary" style="font-size:14px;">摄像头位置</el-button>
        <span style="font-size:16px;">&nbsp;&nbsp;{{tempLocation}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <el-button type="primary" style="font-size:14px;">日期时间</el-button>
        &nbsp;&nbsp;<el-select @change="videoPlayerChange()" v-model="videoList.streamUrl" placeholder="请选择">
          <el-option
            v-for="item in videoList"
            :key="item.id"
            :label="item.startTime"
            :value="item.streamUrl">
          </el-option>
        </el-select>
      </el-row> 
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
import { cookieGet } from '@/common/cookie'
import AddOrUpdate from './camera-add-or-update'
import facegrid from './face-grid'
import { debounce } from "lodash"
import "video.js/dist/video-js.css"
import { videoPlayer } from "vue-video-player"
import 'videojs-hotkeys'
import "@/views/modules/face_match/src/videojs.markers.css"
import 'videojs-markers'
import '@/views/modules/face_match/src/custom-theme.css'

export default {
  mixins: [ mixinViewModule ],
  name: "camera-detect",
  data () {
    return {
      detect_state: '',
      button_type: '',
      button_text: '',
      mixinViewModuleOptions: {
        getDataListURL: `/sys/cameras?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/sys/cameras?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      query_visible:false,
      video_visible: false,
      videoList: [],
      tempName: '',
      tempLocation: '',
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      dataForm: {
        cameraName: ''
      },
      videoForm: {
        cameraId: "",
        streamUrl: "",
        startTime: "",
        streamStatus: "0",
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
        custum: []
      },     
      allCheck: false,
      multipleSelection: [],
      allSelect:[],
    }
  },
  components: {
    facegrid,
    AddOrUpdate,
    videoPlayer
  },
  computed:{
    dataRule(){
      return {
        streamUrl: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          }
        ],
        startTime: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          }
        ],        
      }
    },
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  mounted() {
    this.getState()
  },
  watch: {
    //分页全选-监听数据变化
    dataList: {
      handler (value) {
        if (this.allCheck) {
          this.dataList.forEach(row => {
            if (row) {
              this.$refs.table.toggleRowSelection(row, true)
            }
          });
        }
      },
      deep: true
    },
  },
  methods: {
    getRowKeys (row) {
        return row.id;
    },
    // 分页全选-全选时禁用选择框
    checkSelectable (row, index) {
      return !this.allCheck;
    },
    //多项选择导出哪些内容
    handleSelectionChange(val) {
      console.log("后端返回的数据")
      console.log(this.dataList)
      this.multipleSelection = val;
    },
    //导出所有
    exportAll(){
      if(this.dataList){
        this.$axios.get(`/sys/cameras?token=${cookieGet('token')}`,{params:{export:"export"}})
        .then(res=> {
          console.log("---0000000000------------+++++++++")
          console.log(res)
          this.allSelect = res.list
        })
        .catch(error =>{
          console.log(error)
        });
      } 
      if(this.allSelect){
        this.$confirm('确定下载列表文件?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.excelData = this.allSelect //你要导出的数据list。
            this.export2Excel()
          }).catch(() => {
            console.log("error")
        });
      }
    },
    //导出按钮
    exportHandle(){
      if(this.multipleSelection.length){
        this.$confirm('确定下载列表文件?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.excelData = this.multipleSelection //你要导出的数据list。
            this.export2Excel()
          }).catch(() => {
            console.log("error")
          });
      }
      else{
        console.log(this.multipleSelection.length)
        alert("请选择需要导出的内容！")
      } 
    },
    //数据写入excel
    export2Excel() {
      var that = this;
      require.ensure([], () => {
        // const { export_json_to_excel } = require('../../../excel/export2Excel'); //这里必须使用绝对路径，使用@/+存放export2Excel的路径
        const export_json_to_excel = require('../../../excel/export2Excel').export_json_to_excel;
        const tHeader = ['摄像头名称','位置','纬度','经度']; // 导出的表头名信息
        const filterVal = ['cameraName','cameraLocation','cameraLon','cameraLat']; // 导出的表头字段名，需要导出表格字段名
        const list = this.excelData;
        const data = that.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '摄像头数据库');// 导出的表格名称，根据需要自己命名
      })
    },
    //格式转换，直接复制即可
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    getState() {
      this.$axios.get(`/sys/detect_ctl?token=${cookieGet('token')}`)
      .then(res =>{
      console.log('000-----11111------9999')
      console.log(res.detect_state)
      this.detect_state = res.detect_state
      this.button_type = this.detect_state == 1 ? "success" : "primary"
      this.button_text = this.detect_state == 1 ? "检测运行中" : "开始检测"
      })
      .catch(() => {
      console.log("error")
      })   
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    startDetect(val){
      this.$axios.post(`/sys/detect_ctl?token=${cookieGet('token')}`,{detect_state:1})
      .then(res =>{
        this.$message({
          message: "提交成功",
          type: "success",
          duration: 500,
        })
        this.getState()
      })
      .catch(() => {
      })      
    },
    stopDetect(val){
      this.$axios.post(`/sys/detect_ctl?token=${cookieGet('token')}`,{detect_state:0})
      .then(res =>{
        this.$message({
          message: "提交成功",
          type: "success",
          duration: 500,
        })
        this.getState()
      })
      .catch(() => {
      })      
    },    
    //测试用添加视频按钮
    addVideo(id){
      this.videoForm.cameraId = id
      this.video_visible = true
      this.$nextTick(() =>{
        this.$refs["videoForm"].resetFields(); 
      })
    },
    startRecord(id,name,location){ 
      if(id){
        this.$axios.post(`/sys/camerarecord?token=${cookieGet('token')}`,{cameraId:id})
        .then(res =>{
          this.$message({
            message: "提交成功",
            type: "success",
            duration: 500,
          }) 
        })
        .catch(() => {
        console.log("error")
        })
      }      
    },
    //查询摄像头对应的视频列表
    queryVideo(id,name,location){ 
      this.query_visible = true
      this.videoList =[]
      this.videoList.streamUrl = ''
      this.playerOptions.sources[0].src = '' //再次打开弹窗时,不会显示上次的信息
      this.tempName = name
      this.tempLocation = location
      if(id){
        this.$axios.get(`/sys/camerastream?token=${cookieGet('token')}`,{params:{cameraId:id}})
        .then(res =>{
        console.log('000-----------9999')
        console.log(res)
        this.videoList = res
        })
        .catch(() => {
        console.log("error")
        })
      }
    },

    //选择时间后,自动播放
    videoPlayerChange(){
      console.log("--change--change--change")
      console.log(this.videoList.streamUrl)
      this.playerOptions.sources[0].src = this.videoList.streamUrl
    },

    //去掉时间选择器中自带的T和Z
    changeDate(dateA) { 
      var dateee = new Date(dateA).toJSON();
      var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
      return date;
    },

    //添加视频弹窗,点击确认按钮发送post请求
    videoFormSubmitHandle(){ 
      this.videoForm.startTime = this.changeDate(this.videoForm.startTime)
      this.$refs['videoForm'].validate(valid => {
        if(!valid) { return false ; }
        console.log("------时间格式----00000000000------")
        console.log(this.videoForm.startTime)
      this.$axios.post(`/sys/camerastream?token=${cookieGet('token')}`,{
        ...this.videoForm
      })
      .then(res =>{
        console.log("------post----请求返回的数据")
        console.log(res.msg)
        this.$message({
          message: this.$t("prompt.success"),
          type: "success",
          duration: 500,
          // onclose: () => {
          //   this.video_visible = false; 
          //   // this.$emit("refreshDataList");
          // }
        });
      })
      .catch(() => {})
      1000,
      { leading: true, trailing: false}
      })
      this.video_visible = false
    },//这是videoFormSubmitHandle()函数的结尾

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
    }
  }
}
</script>

<style lang="scss" scoped>
  .customclass{
    // color: #228fbd;
    width: 100%;
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
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item img {
    height: 400px;
    width: 400px
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .imgblock {
    width: 15%;
    height: 15%;
    display: block;
  }
</style>