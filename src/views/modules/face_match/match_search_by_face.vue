<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col>
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div id="map">
              <div class="amap-wrapper">
                <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" 
                class="amap-demo" :events="events">
                <el-amap-marker vid="amapDemo" v-for="(item,index) in positions" :position="item" :key="index"></el-amap-marker>
                <el-amap-polyline :editable="polyline.editable"  :path="polyline.path" :events="polyline.events"></el-amap-polyline>
                </el-amap>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="grid-content bg-purple">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <facelist :facelist="facelist" v-model="dataForm.faceid" @getLocation="getLocation"></facelist>
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
      zoom: 16,                       //地图显示的缩放级别
      center: [116.479282,39.99856],  //地图的默认中心点
      polyline: {                     //折线的坐标点
        icon:'http://a.amap.com/jsapi_demos/static/images/mass0.png',
        // strokeStyle:dashed,
        path: [],
        events: {                     //折线事件
          init:(o) =>{
            console.log(o)
            console.log("----ya try ------")
            console.log(o.getPath().map(point => [point.lng, point.lat]))
            this.temp =  o
            console.log(o)
            console.log("----ya end ------")
          },
          click (e) {
            //this.center = [e.lnglat.lng,e.lnglat.lat]//点击选择新地址为中心点
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
      // facelist: [],
      imgList: [],
      mixinViewModuleOptions: {
        getDataListURL: `/api/check?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/api/check?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      dataForm: {
        faceid: ''
      },
      amapManager,  //positions默认marker显示的经纬度坐标
      positions: [],
      events: {  //地图的事件,加载完get请求返回的数据后,先执行init()函数中的内容
        init: (o) => {
          console.log('******555--------')
          console.log(o.getCenter())
          console.log('getPath--------')
          console.log(o)
          console.log(this.$refs.map.$$getInstance())
          o.getCity(result => {
            console.log("----result---")//界面初始化时并没有打印,界面加载完成后打印
            console.log(result)
          })
        },
        'moveend': () => {
        },
        'zoomchange': () => {
        },
        'click': (e) => {
          console.log(e);
          //this.center = [e.lnglat.lng,e.lnglat.lat];//点击选择新地址为中心点
          //alert('map clicked');
        }
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
    getLocation(aa){  //接收子组件返回的facelist中locations
      console.log("-------000---uerid_id-----")
      console.log(aa)
      this.positions = []
      this.$axios.get(`/sys/check/location?token=${cookieGet('token')}`,{params:{faceid:aa}}
      ).then(res =>{
        console.log('000-----------9999')
        console.log(res)
        this.center = res.center  //当前地图的中心点
        this.positions = res.location //当前此人所有的经纬度信息,赋值给标记点中的位置
        this.polyline.path = res.location //当前此人所有的经纬度信息,赋值给折线中的位置
      }).catch(() => {
        console.log("error")
      })
    }
    // addMarkers(){
    //   console.log("1111111111111111111")
    //   //只能单独添加一个marker
    //   // let o = this.amapManager.getMap()
    //   // console.log(o)
    //   // let marker = new AMap.Marker({
    //   //   posistion: [116.478935,39.997761]
    //   // })
    //   // marker.setMap(o)
    //   this.positions = this.polyline.path.map(point => [point.lng, point.lat])
    //   console.log("----ya try ------")
    //   console.log(this.positions)
    //   console.log("----ya end ------")
    // }
  }
}
</script>

<style lang="scss" scoped>
  .amap-demo {
    height: 500px;
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
