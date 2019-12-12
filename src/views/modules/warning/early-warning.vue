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
        <el-button type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
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
      <el-table-column prop="id" :label="$t('warning.id')" header-align="center" align="center" width="60"/>
      <el-table-column prop="warning_id" :label="$t('warning.warningId')" header-align="center" align="center"/>
      <el-table-column prop="warning_name" :label="$t('warning.name')" header-align="center" align="center" width="100"/>
      <el-table-column prop="warning_level" :label="$t('warning.level')" header-align="center" align="center" width="100"/>
      <el-table-column prop="warning_type" :label="$t('warning.type')" header-align="center" align="center"/>
      <el-table-column prop="warning_people_max" :label="$t('warning.people_max')" header-align="center" align="center" :show-overflow-tooltip="true" />
      <el-table-column prop="warning_car_max" :label="$t('warning.car_max')" header-align="center" align="center" :show-overflow-tooltip="true" />
      <el-table-column prop="warning_target_people_name" :label="$t('warning.target_people')" header-align="center" align="center"/>
      <el-table-column prop="warning_target_car_name" :label="$t('warning.target_car')" header-align="center" align="center" />
      <el-table-column prop="warning_target_camera_num" :label="$t('warning.camera_num')" header-align="center" align="center" />
      <el-table-column prop="warning_event_flag" :label="$t('handle')" fixed="right" header-align="center" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="startHandle(scope.row.id)" :disabled="scope.row.warning_event_flag == 1 ? true : false">{{ $t('warning.start') }}</el-button>
          <el-button type="text" size="mini" @click="stopHandle(scope.row.id)">{{ $t('warning.stop') }}</el-button>
          <el-button type="text" size="mini" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
          <el-button type="text" size="mini" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 部署流程文件 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
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
import AddOrUpdate from './warning-add-or-update'
import Deploy from './process-deploy'
import { cookieGet } from '@/common/cookie'
import qs from 'qs'
export default {
  mixins: [ mixinViewModule ],
  name: "early-warning",
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: `/api/warningEvent?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/api/warningEvent?token=${cookieGet('token')}`,
        deleteIsBatch: true,
      },
      dataForm: {
        processName: '',
        key: ''
      },
      deployVisible: false
    }
  },
  components: {
    AddOrUpdate,
    Deploy
  },
  methods: {
    // 获取流程(xml/image)url地址
    startHandle (id) {
      this.$axios.post(`/api/warningCtrl?token=${cookieGet('token')}`,{params:{id:id,start:true}})
        .then(res => {
          this.getDataList()
        })
        .catch(() => {
          console.log("error")
        })
      },
    stopHandle (id) {
      this.$axios.post(`/api/warningCtrl?token=${cookieGet('token')}`,{params:{id:id,start:false}})
        .then(res => {
          this.getDataList()
        })
        .catch(() => {
          console.log("error")
        })
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
