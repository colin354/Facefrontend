<template>
  <d2-container>
    <el-row :gutter="20">
      <!-- 左侧列表展示 -->
      <el-col :span="12">
        <el-card class="box-card">
          <el-form :inline="true" size="mini" :model="dataForm">
            <el-form-item>
              <el-input v-model="dataForm.username" :placeholder="$t('face.name')" clearable/>
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
          <div class="grid-content bg-purple">          
            <el-table
              size="mini"
              v-loading="dataListLoading"
              :data="dataList"
              border
              @selection-change="dataListSelectionChangeHandle"
              @sort-change="dataListSortChangeHandle"
              style="width: 100%;">
              <el-table-column type="selection" header-align="center" align="center" width="50"/>
              <el-table-column prop="username" :label="$t('face.name')" sortable="custom" header-align="center" align="center" width="90"/>
              <el-table-column prop="mobile" :label="$t('face.mobile')" header-align="center" align="center" width="100"/>
              <el-table-column prop="email" :label="$t('face.email')" sortable width="150" header-align="center" align="center"/>
              <el-table-column prop="createDate" :label="$t('oss.createDate')" sortable="custom" header-align="center" align="center"/>
              <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
                  <el-button type="text" size="mini" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
                  <el-button type="text" size="mini" @click="getImgs(scope.row.imgurls)">图片</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>            
        </el-card>
      </el-col>
      <!-- 图片显示右侧 -->
      <el-card class="box-card" :span="12" style="background-color:#F2F6FC ;">
        <span >图片展示</span>
      </el-card>
      <el-card class="box-card">
        <el-col >
            <el-carousel :interval="4000" type="card" height="400px">
                <el-carousel-item v-for="(item, index) in imgs" :key="index">
                    <!-- <el-card :body-style="{ padding: '10px' }" > -->
                      <!--<span>id:{{item.userid_id}}</span>
                      <span class="name">{{item.name}}</span>-->
                    <img :src="item.url" fit="fill">
                    <!-- </el-card> -->
                </el-carousel-item>
            </el-carousel>
        </el-col>
      </el-card>
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

export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      imgs:[{url:"http://192.168.4.14:8000/media/demo/scene1.jpg"},
            {url:"http://192.168.4.14:8000/media/demo/scene2.jpg"},
            {url:"http://192.168.4.14:8000/media/demo/scene3.jpg"}],
      // imgs:[this.dataList],
      mixinViewModuleOptions: {
        getDataListURL: `/api/face?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/api/face?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      dataForm: {
        username: ''
      },
      }
  },
  computed:{
    mySwiper(){
      return this.$refs.mySwiper.swiper;
    }
  },
  components: {
    AddOrUpdate
  },
  methods: {
    stopPlay(){ //鼠标移上停止轮播
      this.mySwiper.stopAutoplay();
    },
    play(){ //鼠标移出继续轮播
      this.mySwiper.startAutoplay();
    },
    getImgs(imgurls){
      this.imgs = []
      this.imgs = imgurls
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