<template>
  <el-tooltip
    effect="dark"
    content="投屏"
    placement="bottom">
    <el-button
      class="d2-ml-0 d2-mr btn-text can-hover"
      type="text"
      @click="handleClick">
      <d2-icon
        name="circle"
        style="font-size: 20px"/>
    </el-button>
  </el-tooltip>
</template>

<script>
export default {
  methods: {
    handleClick () {
      let screenData = this.$router.resolve({
        path: 'screenIndex',
      })
      window.open(screenData.href,"_blank")
      // this.$router.push({
      //   name: 'screen'
      // })
    }
  }
}
</script>
