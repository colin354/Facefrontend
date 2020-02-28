<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col>
        <el-card class="box-card">
          <el-form :inline="true" size="mini" :model="dataForm" @submit.native.prevent>
            <el-form-item>
              <el-input v-model="dataForm.cameraName" :placeholder="$t('camera.name')" 
              @keyup.enter.native="getDataList()" clearable/>
            </el-form-item>
            <el-form-item>
              <el-button @click="getDataList()">{{ $t('query') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
            </el-form-item>
          </el-form>
          <div class="grid-content bg-purple" >          
            <el-table
              size="mini"
              v-loading="dataListLoading"
              :data="dataList"
              border
              @selection-change="dataListSelectionChangeHandle"
              @sort-change="dataListSortChangeHandle"
              style="width: 100%;">
              <el-table-column type="selection" header-align="center" align="center" width="50"/>
              <el-table-column prop="id" :label="$t('camera.id')" header-align="center" align="center" width="80"/>
              <el-table-column prop="cameraName" :label="$t('camera.name')" header-align="center" align="center" width="120"/>
              <el-table-column prop="cameraLocation" :label="$t('camera.location')" header-align="center" align="center" width="150"/>
              <el-table-column prop="cameraLon" :label="$t('camera.lat')"  header-align="center" align="center" width="90"/>
              <el-table-column prop="cameraLat" :label="$t('camera.lon')"  header-align="center" align="center" width="90"/>
              <el-table-column prop="cameraLat" :label="$t('camera.warning')"  header-align="center" align="center" width="180"/>
              <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="camera_stream(scope.row.id)">
                    监控记录
                  </el-button>
                  <el-button type="primary" size="mini" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
                  <el-button type="primary" size="mini" >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
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
import mixinViewModule from '@/mixins/view-module'
import { cookieGet } from '@/common/cookie'
import { debounce } from "lodash"
import AddOrUpdate from './camera-add-or-update'

export default {
  name: 'camera_stream',
  mixins: [ mixinViewModule ],
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
      dataForm: {
        id: '',
        cameraName: ''
      }
    }
  },
  components: {
    AddOrUpdate
  },
  computed: {
    dataRule () {
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
  mounted () {
    // this.getState()
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    startDetect(val) {
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
    camera_stream (id){
      this.$router.push({name: 'stream-list',params:{ cameraid: id}})
    },
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