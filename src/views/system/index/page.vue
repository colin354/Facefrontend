<template>
  <d2-container>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="智慧城市" name="first">
        <city-index></city-index>
      </el-tab-pane>
      <el-tab-pane label="孙吴教堂" name="second">
        <church-index></church-index>
      </el-tab-pane>
      <!-- <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </d2-container>
</template>

<script>
import CityIndex from './components/city-index'
import ChurchIndex from './components/church-index'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/screenData/iconfont/iconfont.css';
import '@/assets/screenData/css/global.scss';
export default {
  components: {
    CityIndex,
    ChurchIndex
  },
  data () {
    return {
      activeName: 'second'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped lang="scss">
.data-page {
top: 0;
right: 0;
right: 0;
bottom: 0;
height: 100%;
min-width: 1220px;
.data-content {
    padding-bottom: 20px;
    .data-time {
    width: 340px;
    height: 35px;
    background-color: #2c58a6;
    line-height: 35px;
    color: #fff;
    font-size: 12.8px;
    margin-bottom: 25px;
    margin-left: 20px;
    text-align: center;
    }
    .data-main {
    width: calc(100% - 40px);
    margin-bottom: 40px;
    margin-left: 20px;
    height: 720px;

    .main-left {
        width: 24%;
        float: left;
    }
    .main-center {
        float: left;
        width: 52%;
        padding: 0 20px 0 20px;
    }
    .main-right {
        float: left;
        width: 24%;
        height: 615px;
    }
    }
}
}
</style>