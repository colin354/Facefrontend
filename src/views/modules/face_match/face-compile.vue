<template>
  <el-row :gutter="0">

    <el-row :gutter="0">
      <el-col :span="4">
        <el-image :src=facematch.faceurl fit="contain" style="width: 100px; height: 100px"></el-image>
      </el-col>
      <el-col :span="18" :gutter="0">
        <el-col :span="3.6" v-for="item in src" :key="item.time">
          <!-- <div class="imgblock"> -->
            <!-- <span class="demonstration">{{$t('check.threshold')}}:{{item.threshold}}</span> -->
            <el-image :src="item.imgurl" fit="contain" style="width: 100px; height: 100px">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline">点击mark点，查看视频截图图片</i>
              </div>
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          <!-- </div> -->
        </el-col>
      </el-col>
      <el-col :span="2">
        <el-image :src=facematch.person_url fit="contain" style="width: 90px; height: 100px"></el-image>
      </el-col>      
    </el-row>

    <el-row>
      <el-col :span="4">
        <span>匹配次数:{{facematch.facecount}}</span>
      </el-col>
      <el-col :span="20">
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

<style lang="scss">
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
    width: 60%;
    height: 60%;
    display: block;
  }
  .facematchimage {
    width: 50%;
    height: 50%;
  }
  .imgblock {
    height: 100%;
    width: 100%;
    display: block;
  }
  .slider {
    color: #fff000
  }
</style>
