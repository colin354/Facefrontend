<template>
  <d2-container>
    <el-row :gutter="20">
      <el-card class="box-card">
          <el-row>
            <div style="margin-top: 15px;">
              <el-input placeholder="请输入内容" v-model="dataForm.text" clearable
                style="background-color: #fff;margin-bottom:8px;width: 20%;margin-right:10px;">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
              <el-button type="primary" size="mini" @click="addOrUpdateHandle()">添加</el-button>
              <!-- <el-button type="danger" size="mini" @click="clickDelete()">{{ $t('deleteBatch') }}</el-button> -->
            </div>
          </el-row>
          <el-row>
            <el-table
              size="mini"
              v-loading="dataListLoading"
              :data="dataList"
              border
              @selection-change="dataListSelectionChangeHandle"
              @sort-change="dataListSortChangeHandle"
              style="width: 100%;">
              <el-table-column type="selection" header-align="center" align="center" width="40"/>
              <el-table-column prop="id" label="序号" header-align="center" align="center" width="50"/>
              <el-table-column prop="c_id" label="摄像机编号" header-align="center" align="center" width="130"/>
              <el-table-column prop="c_name" label="摄像机名称" header-align="center" align="center" width="130"/>
              <el-table-column prop="c_outputProtocol" label="摄像机输出协议" header-align="center" align="center"/>
              <el-table-column prop="c_outputAddress" label="摄像机输出地址" header-align="center" align="center"/>
              <el-table-column prop="c_outputEncodingFormat" label="视频流输出编码格式" header-align="center" align="center"/>
              <el-table-column prop="c_outputStreamRate" label="视频流输出码率" header-align="center" align="center"/>
              <!-- 注意是否启用是绑定后台的一个字段如on,则此时后台on有两个值0或1-->
              <el-table-column prop="c_status" label="是否启用" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-switch
                      v-model="scope.row.c_status"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="on"
                      inactive-text="off"
                      @change="changeSwitch(scope.row)">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="addOrUpdateHandle(scope.row.id)" icon="el-icon-video-play" circle>配置</el-button>
                  <el-button type="primary" size="mini" @click="clickDelete(scope.row.id,scope.row)" icon="el-icon-delete" circle>删除</el-button>                  
                </template>
              </el-table-column>
            </el-table>
          </el-row>
      </el-card>
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
    <!-- 分页 -->
    </el-row>
    <el-pagination
      background
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
import AddOrUpdate from './device-add-or-update'
import { debounce } from "lodash";

export default {
  mixins: [ mixinViewModule ],
  name:"device",
  components: {
    AddOrUpdate,
  },
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: `/api/camera?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/api/camera?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      visible:false,
      keyword:'',
      inputProtocol:"RTSP",
      outputProtocol:"RTMP",
      dataForm: {
        id:'',
        c_id: '',
        c_name:'',
        c_username:'',
        c_password:'',
        c_status:'',
        c_inputProtocol:['RTSP','RTMP'],
        c_inputAddress:'',
        c_outputProtocol:['RTMP','HTTP-FLV','HLS'],
        c_outputAddress:'',
        c_outputEncodingFormat:'',
        c_outputStreamRate:'',
      }
    }
  },
  created() {
   
  },
  mounted() {},
  methods: {
    h5_add_camera (data) {
      var root = process.env.VUE_APP_API_ROOT;
      var wsroot = process.env.VUE_APP_WS_HOST_ROOT;
      if (root == undefined){
          root = window.location.protocol + '//' + window.location.host + window.location.pathname;
      }
      if (wsroot == undefined)
      {
          wsroot = window.location.host;
      }
      // console.log("stream",form.Audio);
      // console.log("stream",form.Audio);
      var url = root + "/api/v1/AddSrcRTSP?&name="+data.c_name+
      "&token="+data.c_id+
      "&user="+data.c_username+
      "&password="+encodeURIComponent(data.c_password)+
      "&audio="+data.c_status+
      "&url="+encodeURIComponent(data.c_inputAddress)+
      "&session="+ this.$store.state.token;
      console.log("---------------------",url);
      this.$http.get(url).then(result=>{
        //console.log(result);
        if(result.status==200){
          if(result.data.bStatus==true){
                console.log('ssssucccessss------sss')
                //this.reload();
                this.tableData=[];
                // this.loadstream();
            }else{
                this.$message({
                    message: '添加失败',
                    type: 'warning'
                });
                return false;
            }
        }
      }) 
    },
    h5_edit_camera (data) {
      //return false;
      var root = process.env.VUE_APP_API_ROOT;
      var wsroot = process.env.VUE_APP_WS_HOST_ROOT;
      if (root == undefined){
          root = window.location.protocol + '//' + window.location.host + window.location.pathname;
      }
      if (wsroot == undefined)
      {
          wsroot = window.location.host;
      }
      
      //return false;
      var url1 = root + "/api/v1/DelSrc?token="+data.c_id+"&session="+ this.$store.state.token;
      this.$http.get(url1).then(result=>{
          //console.log("1",result);
          if(result.status==200){
              if(result.data.bStatus==true){
                  console.log("*************************",result.data.bStatus)
              }else{
                  this.$message({
                      message: this.$t("删除失败"),
                      type: 'warning'
                  });
                  return false;
              }
          }
      })
    },
    clickDelete(id,data) {
      console.log('----------oooops-----')
      console.log(id)
      this.deleteHandle(id)
      this.h5_edit_camera(data)
    },
    changeSwitch(data){
      console.log(data)
      this.$axios
        .put(`/api/camera?token=${cookieGet("token")}`,{...data})
        .then(res => {
          console.log('----dddrr---')
          console.log(res)
          this.getDataList()
        })
        .catch(() => {}); 

      if(data.c_status){
        this.h5_add_camera(data)
      }else{
        this.h5_edit_camera(data)
      }
    },
  }
};
</script>
<style>
  .searchBox{
    margin: 0 auto;
    width: 60%;
    position: relative;
  }
</style>