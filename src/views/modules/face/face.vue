<template>
  <d2-container>
    <el-row :gutter="20">
      <!-- 左侧列表展示 -->
      <el-col :span="12">
        <el-card class="box-card">
          <el-form :inline="true" size="mini" :model="dataForm" @submit.native.prevent>
            <el-form-item>
              <el-input v-model="dataForm.username" :placeholder="$t('face.name')" 
              @keyup.enter.native="getDataList()" clearable/>
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
              ref="table"
              v-loading="dataListLoading"
              :data="dataList"
              :row-key="getRowKeys"
              border
              type="selection"
              @selection-change="dataListSelectionChangeHandle"
              @sort-change="dataListSortChangeHandle"
              style="width: 100%;">
              <el-table-column type="selection" :reserve-selection="true" :selectable="checkSelectable" header-align="center" align="center" width="50"/>
              <el-table-column prop="username" :label="$t('face.name')" header-align="center" align="center" width="80"/>
              <el-table-column prop="mobile" :label="$t('face.mobile')" header-align="center" align="center" width="150"/>
              <el-table-column prop="email" :label="$t('face.email')"  header-align="center" align="center" width="150"/>
              <!-- <el-table-column prop="createDate" :label="$t('oss.createDate')"  header-align="center" align="center" width="145"/> -->
              <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="addOrUpdateHandle(scope.row.id)" icon="el-icon-edit" circle></el-button>
                  <el-button type="primary" size="mini" @click="deleteHandle(scope.row.id)" icon="el-icon-delete" circle></el-button>
                  <el-button type="primary" size="mini" @click="getImgs(scope.row.id,scope.row.imgurls)" icon="el-icon-picture-outline-round" circle></el-button>
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
      <el-card v-if="id == 0" class="box-card">
        <facegrid :faceimg="imgList" :faceid="id"></facegrid>
      </el-card>       
      <el-card v-else>    
        <router-link :to="{name:'face-match',params: {id:id}}" v-for="(item, index) in imgs" :key="index">
            <img :src="item.url" height="150px" width="150px"> &nbsp;
        </router-link>               
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
import facegrid from './face-grid'

export default {
  name: "face-list",
  mixins: [ mixinViewModule ],
  data () {
    console.log('11111************111*****')
    return {
      id: 0,//存放faceid,向face-match界面发送待查询人的faceid
      imgs:[],
      imgList:[],
      // imgs:[this.dataList.imgurls],
      mixinViewModuleOptions: {
        getDataListURL: `/api/face?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/api/face?token=${cookieGet('token')}`,
        deleteIsBatch: true,
        deleteIsBatchKey:'id',
      },
      dataForm: {
        username: ''
      },
      allCheck: false,
      multipleSelection: [],
      allSelect:[],
    }
  },
  components: {
    facegrid,
    AddOrUpdate
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
    getImgs(id,imgurls){
      this.imgs = []
      this.imgs = imgurls
      this.id = id  //通过图片按钮获得了faceid,传给本组件自定义的id
    },
    getRowKeys (row) {
      return row.id;
    },
    // 分页全选-全选时禁用选择框
    checkSelectable (row, index) {
      return !this.allCheck;
    },
    //多项选择导出哪些内容
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //导出所有
    exportAll(){
      console.log("导出所有-----")
      console.log(this.dataListSelections)
      if(this.dataList){
        this.$axios.get(`/api/face?token=${cookieGet('token')}`,{params:{export:"export"}})
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
    //导出部分按钮
    exportHandle(){
      if(this.dataListSelections.length){
        this.$confirm('确定下载列表文件?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.excelData = this.dataListSelections //你要导出的数据list。
            this.export2Excel()
          }).catch(() => {
            console.log("error")
          });
      }
      else{
        console.log(this.dataListSelections.length)
        alert("请选择需要导出的内容！")
      } 
    },
    //数据写入excel
    export2Excel() {
      var that = this;
      require.ensure([], () => {
        // const { export_json_to_excel } = require('../../../excel/export2Excel'); //这里必须使用绝对路径，使用@/+存放export2Excel的路径
        const export_json_to_excel = require('../../../excel/export2Excel').export_json_to_excel;
        const tHeader = ['姓名','电话','邮箱']; // 导出的表头名信息
        const filterVal = ['username','mobile','email']; // 导出的表头字段名，需要导出表格字段名
        const list = this.excelData;
        const data = that.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '人口数据库');// 导出的表格名称，根据需要自己命名
      })
    },
    //格式转换，直接复制即可
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
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