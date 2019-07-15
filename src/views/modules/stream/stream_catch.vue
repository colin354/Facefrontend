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
                  <el-amap-polyline :editable="polyline.editable"  :path="polyline.path" :events="polyline.events"></el-amap-polyline>
                  <el-amap-marker vid="amapDemo" v-for="(item,index) in positions" :key="index" :position="item"></el-amap-marker>
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
      polyline: {
        path: [[121.5389385, 31.21515044], [121.5389385, 31.29615044], [121.5273285, 31.21515044]],
        events: {
          click(e) {
            alert('click polyline');
          },
          end: (e) => {
            let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
            console.log(newPath);
          }
        },
        editable: false
      },  
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
          var lon1 = 0
          var lat1 = 0
          this.positions = []      //将来后台经纬度全为有效值的情况下,写成  i < res.length
          for(let i=0; i<7; i++){  //当前写成固定值,由于后台数据有空的经纬度,一旦为空,界面就卡死,所以写成有效的数据
            this.positions.push([res.list[i].streamlon,res.list[i].streamlat])
            lon1 += res.list[i].streamlon
            lat1 += res.list[i].streamlat
            }
            //this.center = [lon1/i , lat1/i]   //打开地图,自动定位到所有位置的加在一起的平均中心点,不至于跑出中国地图
          console.log(this.positions)
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