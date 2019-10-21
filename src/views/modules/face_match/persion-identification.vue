<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>行人重识别结果</span>
    <el-button style="float: right; padding: 3px 0" type="text">刷新</el-button>
  </div>
  <el-row>
    <el-row v-for="(o, index) in personList" :key="index" :offset="index > 0 ? 1 : 0">
      <el-col :span="8">
        <div class="box-card" v-for="(item,index) in o.imgList" :key="index">
            <!-- <el-card class="box-card"> -->
            <!-- <el-card class="box-card" :span ="24"> -->
              <img :src=item.imgurl class="image">
            <!-- </el-card> -->
        </div>
          <!-- <span style="font-size:12px;">{{$t('check.threshold')}}:{{o.threshold}}</span> -->
      </el-col>
    </el-row>
  </el-row>
</el-card>
</template>

<script>
export default {
  props: {
    personList:Array,
    required: true
  },
  data() {
    return {
        ImgList:{
            imgurl:""
        }
    };
  },
  mounted(){
      console.log('-----------personarr')
      console.log(this.personarr)
    //   this.ImgList = this.personarr
      console.log(this.ImgList)
  }
}
</script>

<style scop>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    height: 100%;
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>