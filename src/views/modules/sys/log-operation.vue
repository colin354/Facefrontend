<template>
  <d2-container>
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-select v-model="dataForm.operation_status" :placeholder="$t('logOperation.status')" clearable>
          <el-option :label="$t('logOperation.status0')" :value="0"/>
          <el-option :label="$t('logOperation.status1')" :value="1"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">{{ $t('query') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="exportHandle()">{{ $t('export') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportAll()"> 导出所有 </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      ref="table"
      v-loading="dataListLoading"
      :data="dataList"
      :row-key="getRowKeys"
      border
      type="selection"
      @sort-change="dataListSortChangeHandle"
      @selection-change="dataListSelectionChangeHandle"
      style="width: 100%;">
      <el-table-column type="selection" :reserve-selection="true" :selectable="checkSelectable" header-align="center" align="center" width="50"/>
      <el-table-column prop="id" label="id" width="50"/>     
      <el-table-column prop="operation_username" :label="$t('logOperation.creatorName')" header-align="center" align="center" width="90"/>
      <!-- <el-table-column prop="operation_op" :label="$t('logOperation.operation')" header-align="center" align="center"/> -->
      <el-table-column prop="operation_url" :label="$t('logOperation.requestUri')" header-align="center" align="center" width="90"/>
      <el-table-column prop="operation_method" :label="$t('logOperation.requestMethod')" header-align="center" align="center" width="90"/>
      <el-table-column prop="operation_params" :label="$t('logOperation.requestParams')" header-align="center" align="center" width="90" :show-overflow-tooltip="true"/>

      <el-table-column prop="operation_status" :label="$t('logOperation.status')" sortable="custom" header-align="center" align="center" width="90">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.operation_status === 0" size="mini" type="danger">{{ $t('logOperation.status0') }}</el-tag>
          <el-tag v-else size="mini" type="success">{{ $t('logOperation.status1') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation_ip" :label="$t('logOperation.ip')" header-align="center" align="center" width="140"/>
      <el-table-column prop="operation_useragent" :label="$t('logOperation.userAgent')" header-align="center" align="center" width="450" :show-overflow-tooltip="true"/>
      <el-table-column prop="operation_time" :label="$t('logOperation.createDate')" sortable="custom" header-align="center" align="center" width="180"/>
    </el-table>
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
export default {
  mixins: [ mixinViewModule ],
  name: "log-operation",
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: `/sys/log/operation/page?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        exportURL: `/sys/log/operation/export?token=${cookieGet('token')}`,
        deleteURL: `/sys/log/operation/page?token=${cookieGet('token')}`,
        deleteIsBatch: true,
      },
      dataForm: {
        operation_status: '',
        // status: '',
        // export: ''
      },
      allCheck: false,
      multipleSelectionAll: [],
      allSelect:[],
    }
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
  methods:{
    getRowKeys (row) {
      return row.id;
    },
    // 分页全选-全选时禁用选择框
    checkSelectable (row, index) {
      return !this.allCheck;
    },
    //多项选择导出哪些内容
    handleSelectionChange(val) {
      this.multipleSelectionAll = val
    },
    //导出所有
    exportAll(){
      if(this.dataList){
        this.$axios.get(`/sys/log/operation/page?token=${cookieGet('token')}`,{params:{export:"export"}})
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
    //导出用户选择部分记录按钮
    exportHandle(){
      if(this.dataListSelections.length){
        this.$confirm('确定下载列表文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            this.excelData = this.dataListSelections//你要导出的数据list。
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
        const tHeader = ['id','用户名','请求URL','请求方式','请求参数','状态','操作IP','User-Agent','创建时间']; // 导出的表头名信息
        const filterVal = ['id','operation_username','operation_url','operation_method','operation_params','status','operation_ip','operation_useragent','operation_time',]; // 导出的表头字段名，需要导出表格字段名
        const list = this.excelData;
        const data = that.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '操作日志');// 导出的表格名称，根据需要自己命名
      })
    },
    //格式转换，直接复制即可
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
  }
}
</script>
