<template>
  <d2-container>
    <el-row :gutter="20">
      <!-- 左侧列表展示 -->
      <el-col :span="16">
        <el-card class="box-card">
          <el-form :inline="true" size="mini" :model="dataForm" @submit.native.prevent>
            <el-form-item>
              <el-input v-model="dataForm.cameraname" :placeholder="$t('camera.name')" 
              @keyup.enter.native="getDataList()"clearable/>
            </el-form-item>
            <el-form-item>
              <el-button @click="getDataList()">{{ $t('query') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
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
              <el-table-column prop="cameraName" :label="$t('camera.name')" header-align="center" align="center" width="120"/>
              <el-table-column prop="cameraLocation" :label="$t('camera.location')" header-align="center" align="center" width="150"/>
              <el-table-column prop="cameraLon" :label="$t('camera.lat')"  header-align="center" align="center" width="90"/>
              <el-table-column prop="cameraLat" :label="$t('camera.lon')"  header-align="center" align="center" width="90"/>
              <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="addOrUpdateHandle(scope.row.id)" icon="el-icon-edit" circle></el-button>
                  <el-button type="primary" size="mini" @click="addVideo(scope.row.id)">测试用添加视频</el-button>
                  <el-button type="primary" size="mini" @click="queryVideo(scope.row.id)">摄像头视频</el-button>
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
      <el-table 
        size="mini"
        :data="videoList"
        border
        @selection-change="dataListSelectionChangeHandle"
        @sort-change="dataListSortChangeHandle"
        style="width: 100%;"
      >  
        <el-table-column prop="startTime" label="开始时间" header-align="center" align="center" width="150"></el-table-column>
        <el-table-column prop="streamUrl" label="视频链接地址"  header-align="center" align="center" width="330"></el-table-column>
        <!-- <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="addOrUpdateHandle(scope.row.id)" icon="el-icon-video-play" circle></el-button>
          </template>
        </el-table-column> -->
      </el-table>
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
import AddOrUpdate from './camera-add-or-update'
import { cookieGet } from '@/common/cookie'
import facegrid from './face-grid'
import { debounce } from "lodash";
export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      query_visible:false,
      video_visible: false,
      // videoDataList:[],
      videoList: [],
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
      // id: 0,//存放faceid,向face-match界面发送待查询人的faceid
      // imgs:[],
      // imgList:[],
      // // imgs:[this.dataList.imgurls],
      mixinViewModuleOptions: {
        getDataListURL: `/sys/cameras?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/sys/cameras?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      dataForm: {
        cameraName: ''
      },
      videoForm: {
        cameraId: "",
        streamUrl: "",
        startTime: "",
        streamStatus: "0",
      }
    }
  },
  components: {
    facegrid,
    AddOrUpdate,
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
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    addVideo(id){
      this.videoForm.cameraId = id
      this.video_visible = true
      this.$nextTick(() =>{
        this.$refs["videoForm"].resetFields(); //每一次
      })
    },
    queryVideo(id){ //查询摄像头对应的视频列表
      this.query_visible = true
      console.log("-----get请求下的查询")
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
    changeDate(dateA) { //去掉时间选择器中自带的T和Z
      var dateee = new Date(dateA).toJSON();
      var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
      return date;
    },
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
    }//这是videoFormSubmitHandle()函数的结尾
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
</style>