<template>
  <div class="">
    <div class="">
      <el-switch
        v-model="isLong"
        @change="handleChange"
        active-text="长内容"
        inactive-text="短内容"/>
    </div>
    <liveview v-show="!isLong"></liveview>
    <realvideo v-show="isLong"></realvideo>
  </div>
</template>

<script>
import liveview from '../liveview'
import realvideo from '../real-video'
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
