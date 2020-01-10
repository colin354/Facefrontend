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
export default {
  components: {
    CityIndex,
    ChurchIndex
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
