<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>人脸检测结果</span>
    <el-button style="float: right; padding: 3px 0" type="text">刷新</el-button>
  </div>
  <el-row>
    <el-row v-for="(o, index) in imgarr" :key="index" :offset="index > 0 ? 1 : 0">
      <el-col :span="12">
          <img :src=o.imgurl class="faceimage">
          <span style="font-size:12px;">{{$t('check.threshold')}}:{{o.threshold}}</span>
      </el-col>
    </el-row>
  </el-row>
</el-card>
</template>

<style >
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

  .faceimage {
    height: 40%;
    width: 40%;
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

<script>
export default {
  props: {
    imgarr: Array,//接收父组件传过来的imgarr
    required: true
  },
  data() {
    return {

    };
  }
}
</script>