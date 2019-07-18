<template>
  <el-row :gutter="20">
    <el-row :gutter="20">
      <el-col :span="4">
        <img :src=facematch.faceurl class="faceimage">
      </el-col>
      <el-col :span="4"  v-for="item in src" :key="item.time">
        <div class="imgblock">
          <span style="font-size:12px;">置信度:{{item.threshold}}</span>
          <el-image :src="item.imgurl" class="facematchimage">
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
          :marks=facemark
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
    required: true
  },
  watch:{
    facematch:{
      handler(val,oldVal){  //val是改变之后的facematch,oldVal原来的facematch
        this.src = []   //facematch变化时,src置空
        this.value = 0
      }
    }
  },
  data() {
    return {
      value:0,
      facematchurl: '',
      src: [],
      marks: {
      }
    }
  },
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
    this.facematchurl = ''
    this.src = []
  },
  methods: {
    onChange(event){  //点击滑动轴,显示时间节点(秒)
      console.log('---99---99----9999---')
      console.log(this.facematch)
      this.src = []
      for (let i=0;i<this.facematch.facetime.length;i++)
      {
        if(event >= this.facematch.facetime[i].time)
        {
          if(this.src.length == 5)
          {
            this.src.shift()
            this.src.push(this.facematch.facetime[i])
          }
          else
            this.src.push(this.facematch.facetime[i])
        }
        else break
      }
      // console.log('66668886666')
      // this.src = this.facematch.url[event]
    },
    onInput(event){
      // console.log('66668886666')
      // this.src = this.facematch.url[event]
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
    width: 50%;
    height: 50%;
    display: block;
  }
  .facematchimage {
    width: 100%;
    height: 100%;
    display: block;
  }
  .imgblock {
    height: 110px;
    width: 130px;

  }
</style>
