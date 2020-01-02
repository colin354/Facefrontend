<template>
  <d2-container class="mod-sys__log-error">
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-button type="primary" @click="exportHandle()">{{ $t('export') }}</el-button>
      </el-form-item>
    </el-form>
    <!--接收从后台传来的数据-->
    <el-table
      size="mini"
      v-loading="dataListLoading"
      :data="dataList"
      border
      @sort-change="dataListSortChangeHandle"
      style="width: 100%;">
t.enterprise.name = '企业名称'
t.enterprise.tysh = '统一社会信用代码'
t.enterprise.fddb = '法定代表人'
t.enterprise.jyzt = '经营状态'
t.enterprise.czzb = '注册资本'
t.enterprise.gslx = '公司类型'
t.enterprise.clrq = '成立日期'
t.enterprise.sshy = '所属行业'
t.enterprise.rygm = '人员规模'
t.enterprise.addr = '地址'

      <el-table-column prop="requestUri" :label="$t('enterprise.id')" header-align="center" align="center"/>
      <el-table-column prop="requestMethod" :label="$t('enterprise.tysh')" header-align="center" align="center"/>
      <el-table-column prop="requestParams" :label="$t('enterprise.fddb')" header-align="center" align="center" width="150" :show-overflow-tooltip="true"/>
      <el-table-column prop="ip" :label="$t('enterprise.jyzt')" header-align="center" align="center"/>
      <el-table-column prop="userAgent" :label="$t('enterprise.czzb')" header-align="center" align="center" width="150" :show-overflow-tooltip="true"/>
      <el-table-column prop="createDate" :label="$t('enterprise.gslx')" sortable="custom" header-align="center" align="center" width="180"/>
      <el-table-column prop="ip" :label="$t('enterprise.clrq')" fixed="right" header-align="center" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="infoHandle(scope.row.errorInfo)">{{ $t('logError.errorInfo') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--以下是写死的表格数据,为了验证导出功能及水印设置是否有效-->
    <!-- <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="url"
        label="请求URL"
        width="100">
      </el-table-column>
      <el-table-column
        prop="methods"
        label="请求方式"
        width="100">
      </el-table-column>
      <el-table-column
        prop="parameter"
        label="请求参数">
      </el-table-column>
      <el-table-column
        prop="IP"
        label="操作IP">
      </el-table-column>
      <el-table-column
        prop="proxy"
        label="用户代理">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="handle"
        label="操作">
      </el-table-column>
    </el-table> -->
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
export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sys/log/error/page',
        getDataListIsPage: true,
        exportURL: '/sys/log/error/export'
      },
      // tableData: [{
      //       url: 'httpppppp',
      //       methods: '张小虎',
      //       parameter: '1518 弄',
      //       IP:'192.168.0.1',
      //       proxy:'aa',
      //       createTime:'2019-11-18',
      //       handle:'aaadbbb'}, 
      //       {
      //       url: 'httpppppp',
      //       methods: '高丽',
      //       parameter: '1518 弄',
      //       IP:'192.168.0.1',
      //       proxy:'aa',
      //       createTime:'2019-11-18',
      //       handle:'aaadbbb'},
      //       {
      //       url: 'httpppppp',
      //       methods: 'lay',
      //       parameter: '8 弄',
      //       IP:'192.168.0.1',
      //       proxy:'aa',
      //       createTime:'2019-11-18',
      //       handle:'aaadbbb'}],
    }
  },
  methods: {
    // 异常信息
    infoHandle (info) {
      this.$alert(info, this.$t('logError.errorInfo'), {
        customClass: 'mod-sys__log-error-view-info'
      })
    },
    // exportHandle(){
    //   //列表下载
    //   this.$confirm('确定导出列表文件?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.excelData = this.selectData //你要导出的数据list。
    //     this.export2Excel()
    //   }).catch(() => {
    //   });
    // },
    //数据写入excel
      // export2Excel() {
      //   this.$watermark.set("SMARCO")
      //   var that = this;
      //   require.ensure([], () => {
      //     const { export_json_to_excel } = require('../../../excel/export2Excel'); //这里必须使用绝对路径，使用@/+存放export2Excel的路径
      //     const tHeader = ['请求URL','请求方式','请求参数','操作IP','用户代理','创建时间','操作']; // 导出的表头名信息
      //     const filterVal = ['url','methods', 'parameter', 'IP','proxy','createTime','handle']; // 导出的表头字段名，需要导出表格字段名
      //     const list = that.tableData;
      //     const data = that.formatJson(filterVal, list);

      //     export_json_to_excel(tHeader, data, '下载数据excel');// 导出的表格名称，根据需要自己命名
      //   })
      // },
      // //格式转换，直接复制即可
      // formatJson(filterVal, jsonData) {
      //   return jsonData.map(v => filterVal.map(j => v[j]))
      // },
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
