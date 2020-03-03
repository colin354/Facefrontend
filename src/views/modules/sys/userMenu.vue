<template>
  <div class="grid-content bg-purple">
    <el-card class="box-card">
      <el-col :span="24">
        <el-row>
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="value111" style="background-color: #fff;">
            <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <!-- <div style="background-color:white; display:flex; align-items:center; position:relative;margin-bottom:8px;"> -->
            <!-- <input type="text" v-model="keyword" placeholder="请输入关键词进行搜索" style="padding-left: 10px;display: inline-block;
              width: 85%;
              height: 38px;
              border: 1px solid #cccccc;
              float: left;
              box-sizing: border-box;
              -moz-box-sizing:border-box; /* Firefox */
              -webkit-box-sizing:border-box; /* Safari */
              border-bottom-left-radius: 5px;
              border-top-left-radius: 5px;">
            <input type="button"  @click="" value="搜索"> -->
            <!-- <input type="text" placeholder="请输入搜索信息">
            <i style="position:absolute; width:25px; top:3px; right:25px; border-right:1px solid rgb(190,187,187);"></i>
            <i style=""></i> -->
          <!-- </div> -->
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
  </div>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import { cookieGet } from '@/common/cookie'

export default {
  mixins: [ mixinViewModule ],
  name:"userMenu",
  data() {
    return {
      mixinViewModuleOptions: {
        getDataListURL: `/sys1/camerastream?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/sys2/camerastream?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      keyword:'',
      value111:'',
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