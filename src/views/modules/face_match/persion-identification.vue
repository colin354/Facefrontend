<template>
  <el-row>
    <el-row v-for="(o, index) in personList" :key="index" :offset="index > 0 ? 1 : 0">
      <el-col :span="8">
        <div class="box-card" v-for="(item,index) in o.imgList" :key="index">
            <!-- <el-card class="box-card"> -->
            <!-- <el-card class="box-card" :span ="24"> -->
              <img :src=item.imgurl class="image" style="height:20% width:10%">
            <!-- </el-card> -->
        </div>
          <!-- <span style="font-size:12px;">{{$t('check.threshold')}}:{{o.threshold}}</span> -->
      </el-col>
    </el-row>
  </el-row>

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

<style>
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