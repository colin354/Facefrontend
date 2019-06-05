<template>
  <d2-container>
    <el-form :inline="true" size="mini" :model="dataForm">
      <el-form-item>
        <el-button type="primary" @click="uploadHandle()">上传人脸</el-button>
      </el-form-item>
    </el-form>

    <upload v-if="uploadVisible" ref="upload"/>
  </d2-container>
</template>

<script>
import mixinViewModule from '@/mixins/view-module'
import Upload from './face-upload'
export default {
  mixins: [ mixinViewModule ],
  data () {
    return {
      mixinViewModuleOptions: {
        getDataListURL: '/sys/oss/page',
        getDataListIsPage: true,
        deleteURL: '/sys/oss',
        deleteIsBatch: true
      },
      dataForm: {},
      uploadVisible: false
    }
  },
  components: {
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
