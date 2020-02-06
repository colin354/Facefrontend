<template>
  <d2-container class="mod-sys__log-error">
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-button type="info" @click="exportHandle()">{{ $t('export') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportAll()"> 导出所有 </el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      ref="table"
      v-loading="dataListLoading"
      :data="dataList"
      :row-key="getRowKeys"
      border
      @sort-change="dataListSortChangeHandle"
      @selection-change="handleSelectionChange"
      style="width: 100%;">
      <el-table-column type="selection" :reserve-selection="true" :selectable="checkSelectable"  header-align="center" align="center" width="50"/>
      <el-table-column prop="requestUri" :label="$t('logError.requestUri')" header-align="center" align="center"/>
      <el-table-column prop="requestMethod" :label="$t('logError.requestMethod')" header-align="center" align="center"/>
      <el-table-column prop="requestParams" :label="$t('logError.requestParams')" header-align="center" align="center" width="150" :show-overflow-tooltip="true"/>
      <el-table-column prop="ip" :label="$t('logError.ip')" header-align="center" align="center"/>
      <el-table-column prop="userAgent" :label="$t('logError.userAgent')" header-align="center" align="center" width="150" :show-overflow-tooltip="true"/>
      <el-table-column prop="createDate" :label="$t('logError.createDate')" sortable="custom" header-align="center" align="center" width="180"/>
      <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="infoHandle(scope.row.errorInfo)">{{ $t('logError.errorInfo') }}</el-button>
        </template>
      </el-table-column>
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

<script type="module">
import mixinViewModule from '@/mixins/view-module'
// import Export2Excel from '../../../excel/export2Excel'
export default {
  mixins: [ mixinViewModule ],
  name: "log-error",
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sys/log/error/page',
        getDataListIsPage: true,
        exportURL: '/sys/log/error/export'
      },
      allCheck: false,
      multipleSelection: [],
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
  methods: {
    alert() {
      alert("emem") ;
    },
    getRowKeys (row) {
      return row.id;
    },
    // 分页全选-全选时禁用选择框
    checkSelectable (row, index) {
      return !this.allCheck;
    },
    //导出所有
    exportAll(){
      if(this.dataList){
        this.$axios.get(`/sys/log/error/page?token=${cookieGet('token')}`,{params:{export:"export"}})
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
    //多项选择导出哪些内容
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 导出按钮
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
        const tHeader = ['请求URL','请求方式','请求参数','操作IP','用户代理','创建时间']; // 导出的表头名信息
        const filterVal = ['requestUri','requestMethod','requestParams','ip','userAgent','createDate']; // 导出的表头字段名，需要导出表格字段名
        const list = this.excelData;
        const data = that.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '异常日志');// 导出的表格名称，根据需要自己命名
      })
    },
    //格式转换，直接复制即可
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 异常信息
    infoHandle (info) {
      this.$alert(info, this.$t('logError.errorInfo'), {
        customClass: 'mod-sys__log-error-view-info'
      })
    }
  }
}
</script>

<style lang="scss">
.mod-sys__log-error {
  &-view-info {
    width: 80%;
  }
}
</style>
