<template>
  <el-row>
    <el-col :span="5" v-for="(o, index) in imgarr" :key="index" :offset="index > 0 ? 1 : 0">
      <el-card :body-style="{ padding: '0px' }">
        <img :src=o.imgurl class="image">
        <div style="padding: 14px;">
          <span>{{o.id}}</span>
          <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>

</template>

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

<script>
export default {
  props: {
    imgarr: Array,
    required: true
  },
  data() {
    return {
      currentDate: new Date()
    };
  }
}
</script>