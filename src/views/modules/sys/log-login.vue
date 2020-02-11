<template>
  <d2-container>
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.creatorName" :placeholder="$t('logLogin.creatorName')" clearable/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.status" :placeholder="$t('logLogin.status')" clearable>
          <el-option :label="$t('logLogin.status0')" :value="0"/>
          <el-option :label="$t('logLogin.status1')" :value="1"/>
          <el-option :label="$t('logLogin.status2')" :value="2"/>
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
    </el-form>
    <el-table
      size="mini"
      ref="table"
      v-loading="dataListLoading"
      :data="dataList"
      :row-key="getRowKeys"
      border
      type="selection"
      @selection-change="handleSelectionChange"
      @sort-change="dataListSortChangeHandle"
      style="width: 100%;">
      <el-table-column type="selection" :reserve-selection="true" :selectable="checkSelectable" header-align="center" align="center" width="50"/>
      <el-table-column prop="login_username" :label="$t('logLogin.creatorName')" header-align="center" align="center" width="100"/>
      <el-table-column prop="login_op" :label="$t('logLogin.operation')" header-align="center" align="center" width="100">
      </el-table-column>
      <el-table-column prop="login_status" :label="$t('logLogin.status')" sortable="custom" header-align="center" align="center" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.login_status === 0" size="mini" type="danger">{{ $t('logLogin.status0') }}</el-tag>
          <el-tag v-else-if="scope.row.login_status === 1" size="mini" type="success">{{ $t('logLogin.status1') }}</el-tag>
          <el-tag v-else size="mini" type="warning">{{ $t('logLogin.status2') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="login_ip" :label="$t('logLogin.ip')" header-align="center" align="center" width="140"/>
      <el-table-column prop="login_useragent" :label="$t('logLogin.userAgent')" header-align="center" align="center" :show-overflow-tooltip="true" width="700"/>
      <el-table-column prop="login_time" :label="$t('logLogin.createDate')" sortable="custom" header-align="center" align="center" width="220"/>
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
  name: "log-login",
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: `/sys/log/login/page?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        exportURL: `/sys/log/login/export?token=${cookieGet('token')}`
      },
      dataForm: {
        creatorName: '',
        status: ''
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
      this.multipleSelection = val;
    },
    //导出所有
    exportAll(){
      if(this.dataList){
        this.$axios.get(`/sys/log/login/page?token=${cookieGet('token')}`,{params:{export:"export"}})
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
    //导出按钮
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
        const tHeader = ['用户名','操作类型','状态','操作IP','User-Agent','创建时间']; // 导出的表头名信息
        const filterVal = ['login_username','login_op','login_status','login_ip','login_useragent','login_time']; // 导出的表头字段名，需要导出表格字段名
        const list = this.excelData;
        const data = that.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '登录日志');// 导出的表格名称，根据需要自己命名
      })
    },
    //格式转换，直接复制即可
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
  }
}
</script>
