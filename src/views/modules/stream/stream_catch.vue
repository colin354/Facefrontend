<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div id="map">
              <div class="amap-wrapper">
                <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events" class="amap-demo">
                </el-amap>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div v-for="o in 6" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>        
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
        </div>
        </el-col>
    </el-row>    
  </d2-container>
</template>

<script>
import { AMapManager } from 'vue-amap'
let amapManager = new AMapManager();
export default {
  data: function() {
    return {
      amapManager,
      zoom: 12,
      center: [116.481485, 39.990464],
      events: {
        init: (o) => {
          console.log(o.getCenter())
          console.log(this.$refs.map.$$getInstance())
          o.getCity(result => {
            console.log(result)
          })
        },
        'moveend': () => {
        },
        'zoomchange': () => {
        },
        'click': (e) => {
          alert('map clicked');
        }
      },
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init(o) {
            console.log(o);
          }
        }
      }]
    };
  },
  methods: {
    getMap() {
      // amap vue component
      console.log(amapManager._componentMap);
      // gaode map instance
      console.log(amapManager._map);
    }
  }
}
</script>

<style lang="scss" scoped>
  .amap-demo {
    height: 400px;
  }
  .inner {
    position: absolute;
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