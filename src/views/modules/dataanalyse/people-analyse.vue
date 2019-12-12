<template>
  <d2-container class="mod-sys__log-error">
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-button type="info" @click="exportHandle()">{{ $t('export') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      v-loading="dataListLoading"
      :data="dataList"
      border
      @sort-change="dataListSortChangeHandle"
      style="width: 100%;">
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

<script>
import mixinViewModule from '@/mixins/view-module'
export default {
  mixins: [ mixinViewModule ],
  name:'people-analyse',
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sys/log/error/page',
        getDataListIsPage: true,
        exportURL: '/sys/log/error/export'
      },
      weather_data: null
    }
  },
  mounted() {
    this.getWeather()
  },
  methods: {
    getWeather(){
				let arr = []
				let api = "https://www.tianqiapi.com/api/?version=v1&appid=[12419927]&appsecret=[mjdd4C4l]&city=盐城";
				this.$http.get(api).then(res => {
          console.log(res.data)
          console.log(res.data.data[0])
          this.weather_data = res.data
        }).catch(() => {
          console.log("error")
        })
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
