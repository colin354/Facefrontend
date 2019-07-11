<template>
  <el-row :gutter="20">
    <el-row :gutter="20">
      <el-col :span="4">
        <img :src=facematch.faceurl class="faceimage">
      </el-col>
      <el-col :span="9">
        <div class="block">
          <el-image :src="src" class="faceimage">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline">点击mark点，查看视频截图图片</i>
            </div>
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5">
      </el-col>
      <el-col>
        <el-slider
          :step="0.01"
          v-model="value"
          @change="onChange($event)"
          :max=streamtime
          :marks=facematch.marks
          @input="onInput($event)"
          show-input></el-slider>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  props: {
    facematch: Object,
    streamtime: Number,
    facemark: Object,
    // playertime: Number,
    required: true
  },
  // watch:{
  //   facematch:{
  //     handler(val,oldVal){
  //       this.src = ''
  //       this.value = 0
  //     }
  //   }
  // },
  data() {
    return {
      value:0,
      facematchurl: '',
      src: '',
      marks: {
        "0.04":"aaa",
        "1.09":"bbb",
        "3.24":"ccc"
      }
    }
  },
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
    this.facematchurl = ''
  },
  methods: {
    onChange(event){
      console.log('---99---99----9999---')
      this.src = this.facematch.url[event]
    },
    onInput(event){
      console.log('66668886666')
      this.src = this.facematch.url[event]
    }   
  }
}
</script>

<style lang="scss" scop>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .faceimage {
  width: 45%;
  height: 45%;
  }
</style>
