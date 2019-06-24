<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div v-for="o in 5" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="inner">
              <ve-map :data="chartData" v-bind="pubSetting" :settings="chartSettings"></ve-map>
            </div>
          </el-card>
        </div>
        </el-col>
    </el-row>    
  </d2-container>
</template>

<script>
import list from '@/views/modules/stream/_mixin/list'
import mapOrigin from '@/views/modules/stream/_data/beijing'
export default {
  mixins: [
    list
  ],
  data () {
    return {
      chartSettings: {
        position: 'province/beijing',
        mapOrigin
      },
      chartData: {
        columns: ['位置', '人口'],
        rows: [
          { '位置': '延庆区', '人口': 123 },
          { '位置': '密云区', '人口': 1223 },
          { '位置': '平谷区', '人口': 2123 },
          { '位置': '海淀区', '人口': 4123 }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .inner {
    position: right;
    width: 480px;
    height: 480px;
    top: 20px;
    right:  20px;
    bottom: 20px;
    left: 20px;
  }  
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
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
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>