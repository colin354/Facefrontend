<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="12">
         <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div id="map">
              <div class="amap-wrapper">
                <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" 
                class="amap-demo">
                <el-amap-marker vid="amapDemo" v-for="(item,index) in positions" :position="item"></el-amap-marker>
                <!-- <el-amap-marker vid="amapDemo" v-for="(item,index) in polyline.path" :key="index" :position="item"></el-amap-marker> -->
                <el-amap-polyline :editable="polyline.editable"  :path="polyline.path" :events="polyline.events"></el-amap-polyline>
                </el-amap>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      
      <el-col :span="12">
         <div class="grid-content bg-purple">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <facelist :facelist="facelist" v-model="dataForm.faceid" @getLocation="getLoction"></facelist>
              </el-card>
            </div>
        </div>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import { AMapManager } from 'vue-amap'
import { cookieGet } from '@/common/cookie'
import faceimg from './face-img'
import facelist from './face-list'
import { constants } from 'crypto'
import mixinViewModule from '@/mixins/view-module'


let amapManager = new AMapManager();
export default {
  name: "page3",
  components: {
    facelist,
    faceimg
  },
  mixins: [ mixinViewModule ],
  data: function() {
    return {
      temp:[],
      zoom: 16,
      center: [116.479282,39.99856],
      polyline: {
        path: [[116.478935,39.997761],[116.478939,39.997825],[116.478912,39.998549],
	      [116.478998,39.998555],[116.479282,39.99856],[116.479658,39.998528],[116.480151,39.998453],
	      [116.480784,39.998302],[116.480784,39.998302],[116.481149,39.998184],[116.481573,39.997997],[116.481863,39.997846],
	      [116.482072,39.997718],[116.482362,39.997718],[116.483633,39.998935],[116.48367,39.998968],[116.484648,39.999861]],
        events: {
          init:(o) =>{
            console.log(o)
            console.log("----ya try ------")
            console.log(o.getPath().map(point => [point.lng, point.lat]))
            this.temp =  o
            console.log("----ya end ------")
          },
          click(e) {
            //this.center = [e.lnglat.lng,e.lnglat.lat];//点击选择新地址为中心点
            //alert('click polyline');
          },
          end: (e) => {
            let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
            console.log("---------66666--------")
            console.log(e)
            console.log(newPath);
          }
        },
        editable: false
      },  
      facelist: [],
      mixinViewModuleOptions: {
        getDataListURL: `/api/check?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/api/check?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      dataForm: {
        faceid: ''
      },
      amapManager,
      positions: [[116.478935,39.997761],[116.478939,39.997825],[116.478912,39.998549],
	      [116.478998,39.998555],[116.479282,39.99856],[116.479658,39.998528],[116.480151,39.998453],
	      [116.480784,39.998302],[116.480784,39.998302],[116.481149,39.998184],[116.481573,39.997997],[116.481863,39.997846],
        [116.482072,39.997718],[116.482362,39.997718],[116.483633,39.998935],[116.48367,39.998968],[116.484648,39.999861]],
      location:[],
      events: {
        init: (o) => {
          console.log('555--------')
          console.log(o.getCenter())
          console.log('getPath--------')
          console.log(this.$refs.map.$$getInstance())
          console.log("----ya try ------")
          //console.log(this.$refs.map.$$getPath())
          console.log("----ya end ------")
          o.getCity(result => {
            console.log(result)
          })
        },
        'moveend': () => {
        },
        'zoomchange': () => {
        }
        // 'click': (e) => {
        //   console.log(e);
        //   this.center = [e.lnglat.lng,e.lnglat.lat];//点击选择新地址为中心点
        //   //alert('map clicked');
        // }
      },
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init(o) {
            console.log("111111111111111111111puligin")
            
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
    },
    getLoction(data){  //接收子组件返回的facelist中locations,是个列表
      console.log("-------000--------")
      console.log(data)
      //console.log(this.facelist[0].locations)
      console.log("111111111111111111")
      this.polyline.path = data
      this.positions = data.map(point => [point.lng, point.lat])
      console.log("----11111-------")
      console.log(this.polyline.path)
      console.log("----ya try ------")
      console.log(this.positions)
      console.log("----ya end ------")
    },
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
