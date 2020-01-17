<template>
  <d2-container>
    <el-row :gutter="20">
      <!-- 左侧列表展示 -->
      <el-col >
        <el-card class="box-card">
          <el-form :inline="true" size="mini" :model="dataForm" @submit.native.prevent>
            <el-form-item>
              <el-input v-model="dataForm.username" :placeholder="$t('face.name')" 
              @keyup.enter.native="getDataList()" clearable/>
            </el-form-item>
            <!-- <el-form-item>
              <el-button @click="getDataList()">{{ $t('query') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">{{ $t('add') }}</el-button>
            </el-form-item> -->
            <el-form-item>
              <el-button type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="exportExcel()">{{ $t('export') }}</el-button>
            </el-form-item>
          </el-form>
          <div class="grid-content bg-purple">
            <el-table
              size="mini"
              v-loading="dataListLoading"
              :data="dataList"
              @selection-change="dataListSelectionChangeHandle"
              @sort-change="dataListSortChangeHandle"
              >
              <el-table-column type="selection" header-align="center" align="center" width="50"/>
              <el-table-column prop="id" :label="$t('stranger.id')" header-align="center" align="center" width="80"/>
              <el-table-column prop="faceid" :label="$t('stranger.faceid')" header-align="center" align="center" width="150"/>
              <el-table-column prop="imgurl" :label="$t('stranger.img')"  header-align="center" align="center" width="150">
                <template  slot-scope="scope">
                  <img :src="scope.row.imgurl" width="60" height="60">
                </template>
              </el-table-column>
              <el-table-column :label="$t('handle')" header-align="center" align="center" width="120">
                <template slot-scope="scope">
                  <!-- <el-button type="primary" size="mini" @click="addOrUpdateHandle(scope.row.id)" icon="el-icon-edit" circle></el-button> -->
                  <el-button type="primary" size="mini" @click="deleteHandle(scope.row.id)" icon="el-icon-delete" circle></el-button>
                  <!-- <el-button type="primary" size="mini" @click="getImgs(scope.row.id,scope.row.imgurls)" icon="el-icon-picture-outline-round" circle></el-button> -->
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
import AddOrUpdate from './face-add-or-update'
import { cookieGet } from '@/common/cookie'
import facegrid from './face-grid'

export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      id: 0,//存放faceid,向face-match界面发送待查询人的faceid
      imgs:[],
      imgList:[],
      // imgs:[this.dataList.imgurls],
      mixinViewModuleOptions: {
        getDataListURL: `/sys/stranger?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/sys/stranger?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      dataForm: {
        username: ''
      },
      }
  },
  components: {
    facegrid,
    AddOrUpdate
  },
  methods: {
    getImgs(id,imgurls){
      this.imgs = []
      this.imgs = imgurls
      this.id = id  //通过图片按钮获得了faceid,传给本组件自定义的id
    },
    exportExcel(){

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