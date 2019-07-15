<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div id="map">
              <div class="amap-wrapper">
                <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" 
                :events="events" class="amap-demo" >
                <el-amap-marker vid="amapDemo" v-for="(item,index) in positions" :position="item"></el-amap-marker>
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
import { cookieGet } from '@/common/cookie'

let amapManager = new AMapManager();
export default {
  data: function() {
    return {
      amapManager,
      zoom: 12,
      center: [116.34657,39.987299],
      positions: [[116.34657,39.987299],[116.481485, 39.990464]],
      events: {
        init: (o) => {
          console.log('555--------')
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
          // console.log(e);
          this.center = [e.lnglat.lng,e.lnglat.lat];//点击选择新地址为中心点
          //alert('map clicked');
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
  mounted(){     //本可以共用view-module.js中的get请求,但界面必须手动刷新才能发送get请求,所以在本组件重新写了get请求
    this.$axios.get(`/sys/stream/page?token=${cookieGet('token')}`,
      {             //注意：view-module.js中的dataList是可以直接在非view-module.js中的函数里打印的,即可以直接使用
        params: {
            page: 1,
            limit: 10  //请求的params中的page、limit写成固定值,是因为后台的请求格式统一共用,将来若有需要,让后台改改改
          }
      })
        .then(res=> {  //返回的res里包含list(摄像头视频的详细字段,如id、streamurl、streamlat、streamlocation等)
                       //和count(当前有多少个摄像头信息)
          console.log('********************')
          console.log(res);
        })
        .catch(error =>{
          console.log(error);
        })
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