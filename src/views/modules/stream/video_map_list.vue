<template>
  <d2-container type="card">
      <el-switch
        v-model="isLong"
        @change="handleChange"
        active-text="地图模式"
        inactive-text="列表模式"/>
      <br/>
      <br/>
    <liveview v-show="!isLong"></liveview>
    <realvideo v-show="isLong"></realvideo>
  </d2-container>
</template>

<script>
import liveview from './liveview'
import realvideo from './stream_catch'
export default {
  props: {
    long: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    long (val) {
      console.log('!!!!!------->')
      console.log(val)
      this.long = this.isLong
    }
  },
  data () {
    return {
      isLong: false
    }
  },
  components: {
    liveview,
    realvideo
  },
  methods: {
    handleChange (val) {
      this.isLong = val
    }
  }
}
</script>
