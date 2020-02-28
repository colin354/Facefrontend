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
      <el-table-column prop="requestUri" :label="$t('ss.id')" header-align="center" align="center"/>
      <el-table-column prop="requestMethod" :label="$t('ss.name')" header-align="center" align="center"/>
      <el-table-column prop="requestParams" :label="$t('ss.id_card')" header-align="center" align="center" :show-overflow-tooltip="true"/>
      <el-table-column prop="ip" :label="$t('ss.ss_card')" header-align="center" align="center"/>
      <el-table-column prop="userAgent" :label="$t('ss.jfjs')" header-align="center" align="center" :show-overflow-tooltip="true"/>
      <el-table-column prop="createDate" :label="$t('ss.jfbs')" header-align="center" align="center"/>
      <el-table-column prop="createDate" :label="$t('ss.cbzt')" header-align="center" align="center"/>
      <el-table-column prop="ip" :label="$t('ss.tbdw')" header-align="center" align="center"/>
      <el-table-column prop="ip" :label="$t('ss.xzbj')" header-align="center" align="center"/>
      <el-table-column prop="ip" :label="$t('ss.cbrq')" sortable="custom" header-align="center" align="center"/>
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
  name:'ss-analyse',
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: `/sys/log/error/page?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        exportURL: '/sys/log/error/export'
      }
    }
  },
  methods: {
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
