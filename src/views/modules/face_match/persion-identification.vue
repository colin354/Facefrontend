<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>行人重识别结果</span>
    <el-button style="float: right; padding: 3px 0" type="text">刷新</el-button>
  </div>
  <el-row>
    <el-row v-for="(o, index) in personarr" :key="index" :offset="index > 0 ? 1 : 0">
      <el-col :span="12">
          <img :src=o.imgurl class="faceimage">
      </el-col>
    </el-row>    
    <!-- <el-row v-for="(o, index) in personarr" :key="index" :offset="index > 0 ? 1 : 0">
      <el-col :span="8">
        <div class="box-card" v-for="(item,index) in o.personarr" :key="index">
              <img :src=item.imgurl class="image">
        </div>
      </el-col>
    </el-row> -->
  </el-row>
</el-card>
</template>

<script>
export default {
  props: {
    personarr:Array,
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