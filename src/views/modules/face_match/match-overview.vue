<template>
  <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? $t('add') : $t('update')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose"
  >
  
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    init() {
      this.visible = true
    }
  }
}
</script>
