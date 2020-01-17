<template>
  <el-row :gutter="0">
    <el-row>
      <el-col :span="2">
        <!-- <span >{{facematch.facename}}</span> -->
        <span >人脸</span>
        <el-image 
          :src=facematch.faceurl 
          fit="cover" 
          style="display:block;width: 80%; height: 80%"
          :preview-src-list="srcList">
        </el-image>
      </el-col>
      <el-col :span="2" >
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <!-- <span>行人</span>
        <el-image :src=facematch.person_url fit="cover" style="display:block;width: 60%; height: 60%;">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline">无行人照片</i>
          </div>
        </el-image> -->
      </el-col>
        <el-col :span="4" v-for="item in src" :key="item.time">
          <!-- <div class="imgblock"> -->
            <!-- <span>{{$t('check.threshold')}}:{{item.threshold}}</span> -->
            <span>{{item.time}}s</span>
            <br/>
            <!-- <el-image :src="item.imgurl" fit="cover" style="display:block;width: 40%; height: 40%;">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline">点击mark点，查看视频截图图片</i>
              </div>
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image> -->
            <img style="width: 70px; height: 80px" :src="item.imgurl">
          <!-- </div> -->
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
      },
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]      
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
  .el-slider__button-wrapper {
    top: 0;
    height: 0px;
    .el-slider__button {
      width: 4px;
      height: 1px;
      border-radius: 0;
      background: #FFFFFF;
      border: solid 2px #0068A5;
    }
  }
  .el-slider__stop{
        background-color: #FF2D2D;
      }
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
