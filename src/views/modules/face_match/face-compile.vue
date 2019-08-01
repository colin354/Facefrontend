<template>
  <el-row :gutter="20">
    <el-row :gutter="20">
      <el-col :span="4">
        <img :src=facematch.faceurl class="faceimage">
      </el-col>
      <el-col :span="4"  v-for="item in src" :key="item.time">
        <div class="imgblock">
          <el-image :src="item.imgurl" class="facematchimage">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline">点击mark点，查看视频截图图片</i>
            </div>
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
        <span style="font-size:12px;">{{$t('check.threshold')}}:{{item.threshold}}</span>
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
          tooltip-class="slider"
          show-input></el-slider>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  props: {  //接收父组件传递过来的数据
    facematch: Object,  
    streamtime: Number, //进度条的总长度
    facemark: Object,//带有时间节点的断点信息
    required: true
  },
  watch:{
    facematch:{
      handler(val,oldVal){  //val是改变之后的facematch,oldVal原来的facematch
        console.log("---facematch中的handler-----")
        console.log(val)
        console.log(oldVal)
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
    onChange(event) {  //点击滑动轴,显示时间节点(秒)
      this.src = []    //event获取用户点击当前滑动轴的时间节点,是一个数字
      console.log("-----点击滑动轴------")
      console.log(event)
      for (let i=0; i < this.facematch.facetime.length; i++)
      {
        if(event >= this.facematch.facetime[i].time)
        {
          if(this.src.length == 5)
          {
            this.src.shift()  //去掉数组的第一个元素,使数组中始终保持最多5个元素
            this.src.push(this.facematch.facetime[i])
          }
          else
            this.src.push(this.facematch.facetime[i])
        }
        else break
      }
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
  .slider {
    color: #fff000
  }
</style>
