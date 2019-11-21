<template>
  <d2-container>
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.processName" :placeholder="$t('process.name')" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">{{ $t('query') }}</el-button>
      </el-form-item>      
      <el-form-item>
        <el-button type="primary" @click="getDataList()">{{ $t('add') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="deployHandle()">{{ $t('process.deployFile') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="deleteHandle()">{{ $t('deleteBatch') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      v-loading="dataListLoading"
      :data="dataList"
      border
      @selection-change="dataListSelectionChangeHandle"
      @sort-change="dataListSortChangeHandle"
      style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"/>
      <el-table-column prop="id" :label="$t('warning.id')" header-align="center" align="center"/>
      <el-table-column prop="warningId" :label="$t('warning.warningId')" header-align="center" align="center"/>
      <el-table-column prop="name" :label="$t('warning.name')" header-align="center" align="center"/>
      <el-table-column prop="level" :label="$t('warning.level')" header-align="center" align="center"/>
      <el-table-column prop="type" :label="$t('warning.type')" header-align="center" align="center"/>
      <el-table-column prop="people_max" :label="$t('warning.people_max')" header-align="center" align="center" :show-overflow-tooltip="true" />
      <el-table-column prop="car_max" :label="$t('warning.car_max')" header-align="center" align="center" :show-overflow-tooltip="true" />
      <el-table-column prop="target_people" :label="$t('warning.target_people')" header-align="center" align="center"/>
      <el-table-column prop="target_car" :label="$t('warning.target_car')" header-align="center" align="center" />
      <el-table-column prop="camera_num" :label="$t('warning.camera_num')" header-align="center" align="center" />
      <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
        <template slot-scope="scope">
          <el-button v-if="scope.row.suspended" type="text" size="mini" @click="activeHandle(scope.row.id)">{{ $t('process.active') }}</el-button>
          <el-button v-else type="text" size="mini" @click="suspendHandle(scope.row.id)">{{ $t('process.suspend') }}</el-button>
          <el-button type="text" size="mini" @click="deleteHandle(scope.row.deploymentId)">{{ $t('delete') }}</el-button>
          <el-button type="text" size="mini" @click="convertToModelHandle(scope.row.id)">{{ $t('process.convertToModel') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 部署流程文件 -->
    <deploy v-if="deployVisible" ref="deploy" @refreshDataList="getDataList"/>
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
import Deploy from './process-deploy'
import { cookieGet } from '@/common/cookie'
import qs from 'qs'
export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/act/process/page',
        getDataListIsPage: true,
        deleteURL: '/act/process',
        deleteIsBatch: true,
        deleteIsBatchKey: 'deploymentId'
      },
      dataForm: {
        processName: '',
        key: ''
      },
      deployVisible: false
    }
  },
  components: {
    Deploy
  },
  methods: {
    // 获取流程(xml/image)url地址
    getResourceURL (id, name) {
      var params = qs.stringify({
        'token': cookieGet('token'),
        'deploymentId': id,
        'resourceName': name
      })
      return `${window.SITE_CONFIG['apiURL']}/act/process/resource?${params}`
    },
    // 部署流程文件
    deployHandle () {
      this.deployVisible = true
      this.$nextTick(() => {
        this.$refs.deploy.init()
      })
    },
    // 激活
    activeHandle (id) {
      this.$confirm(this.$t('prompt.info', { 'handle': this.$t('process.active') }), this.$t('prompt.title'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        this.$axios.put(`/act/process/active/${id}`).then(res => {
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.getDataList()
            }
          })
        }).catch(() => {})
      }).catch(() => {})
    },
    // 挂起
    suspendHandle (id) {
      this.$confirm(this.$t('prompt.info', { 'handle': this.$t('process.suspend') }), this.$t('prompt.title'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        this.$axios.put(`/act/process/suspend/${id}`).then(res => {
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.getDataList()
            }
          })
        }).catch(() => {})
      }).catch(() => {})
    },
    // 转换为模型
    convertToModelHandle (id) {
      this.$confirm(this.$t('prompt.info', { 'handle': this.$t('process.convertToModel') }), this.$t('prompt.title'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        this.$axios.post(`/act/process/convertToModel/${id}`).then(res => {
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.getDataList()
            }
          })
        }).catch(() => {})
      }).catch(() => {})
    }
  }
}
</script>
