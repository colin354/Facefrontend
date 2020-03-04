<template>
  <d2-container>
    <el-card class="box-card">
      <el-col :span="24">
        <el-row>
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="dataForm.text" @keyup.enter.native="" clearable
              style="background-color: #fff;margin-bottom:8px;width: 20%;margin-right:10px;">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="primary" size="mini" @click="addOrUpdateHandle()">添加</el-button>
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
            <el-table-column prop="id" label="摄像机编号" header-align="center" align="center" width="130"/>
            <el-table-column prop="" label="摄像机名称" header-align="center" align="center" width="130"/>
            <el-table-column prop="" label="摄像机输出协议" header-align="center" align="center" />
            <el-table-column prop="" label="摄像机输出地址" header-align="center" align="center"/>
            <el-table-column prop="" label="视频流输出编码格式" header-align="center" align="center"/>
            <el-table-column prop="" label="视频流输出码率" header-align="center" align="center"/>
            <!-- 注意是否启用是绑定后台的一个字段如on,则此时后台on有两个值0或1-->
            <el-table-column prop="" label="是否启用" header-align="center" align="center">
              <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.on"
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
                <el-button type="primary" size="mini" @click="" icon="el-icon-video-play" circle>配置</el-button>
                <el-button type="primary" size="mini" @click="" icon="el-icon-delete" circle>删除</el-button>                  
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-col>
    </el-card>
    <!-- 分页 -->
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
import { AddOrUpdate } from './userMenu-add-or-update'
import { debounce } from "lodash";

export default {
  mixins: [ mixinViewModule ],
  name:"userMenu",
  components: {
    AddOrUpdate,
  },
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: `/sys/camerastream?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/sys/camerastream?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      visible:false,
      keyword:'',
      inputProtocol:"RTSP",
      outputProtocol:"RTMP",
      dataForm: {
        c_id: '',
        c_name:'',
        c_username:'',
        c_password:'',
        c_status:true,
        c_inputProtocol:['RTSP','RTMP'],
        c_inputAddress:'',
        c_outputProtocol:['RTMP','HTTP-FLV','HLS'],
        c_outputAddress:'',
        c_outputEncodingFormat:'',
        c_outputStreamRate:'',
      },
    }
  },
  created() {
   
  },
  mounted() {},
  methods: {
    changeSwitch(data){
      console.log(data)
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