<template>
  <el-row>
    <el-col :span="2" v-for="(o, index) in facelist" :key="index" :offset="index > 0 ? 1 : 0">
      <el-card :body-style="{ padding: '0px' }">
        <div style="padding: 0px;">
          <span class="name">{{o.username}}</span>
          <img :src=o.imgurl class="image">
          <div class="bottom clearfix">
            <!-- <span>{{o.userid_id}}</span> -->
            <el-button type="text" class="button" @click="face_check(o.userid_id)">查询轨迹</el-button>
            <!-- <el-button type="text" class="button" @click="face_check(o.userid_id)">检测</el-button> -->
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

  .name {
    padding: 0;
    float: left;
  }

  .image {
    height: 100%;
    width: 100%;
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
    facelist: Array,
    required: true
  },
  data() {
    return {
      //temp:[]
    };
  },
  methods: {
    face_check(aa) {  //将获取到的人脸id返回给父组件
      console.log('88889999***999988888')
      this.$emit('getLocation',aa)
    }
  }
}
</script>