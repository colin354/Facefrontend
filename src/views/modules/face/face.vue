<template>
  <d2-container>
    <el-form :inline="true" size="mini" :model="dataForm">
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="uploadHandle()">上传人脸</el-button>
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
      <el-table-column prop="name" :label="$t('face.name')" sortable="custom" header-align="center" align="center" width="150"/>
      <el-table-column prop="url" :label="$t('face.url')" header-align="center" align="center"/>
      <el-table-column prop="createDate" :label="$t('oss.createDate')" sortable="custom" header-align="center" align="center"/>
      <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
          <el-button type="text" size="mini" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"/>
    <upload v-if="uploadVisible" ref="upload" @refreshDataList="getDataList"/>
  </d2-container>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import Upload from './face-upload'
import AddOrUpdate from './face-add-or-update'
export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sys/face/page',
        getDataListIsPage: true,
        deleteURL: '/sys/face/delete',
        deleteIsBatch: true
      },
      dataForm: {},
      uploadVisible: false
    }
  },
  components: {
    AddOrUpdate,
    Upload
  },
  methods: {
    uploadHandle () {
      this.uploadVisible = true
      this.$nextTick(() => {
        this.$refs.upload.init()
      })
    }
  }
}
</script>
