<template>
  <el-carousel :interval="4000" type="card" height="150px">
    <el-carousel-item v-for="(item, index) in facelist" :key="index">
      <el-card :body-style="{ padding: '0px' }">
        <span>id:{{item.userid_id}}</span>
        <span class="name">{{item.username}}</span>
        <img :src="item.imgurl" fit="fill">
      </el-card>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: {
    facelist: Array,
    required: true
  },
  data() {
    return {
      currentDate: new Date()
    };
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item img {
    height: 150px;
    width: 250px
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>