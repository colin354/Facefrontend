<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div id="map">
              <div class="amap-page-container">
                <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" 
                :center="center" :zoom="zoom" :plugin="plugin"  :key="reflash" :events="events_map" 
                class="amap-demo">
                <el-amap-marker v-for="(item, index) in positions" :position="item" :events="events" 
                vid="amapDemo" :key ="index"></el-amap-marker>
                </el-amap>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-tree
              :data="streamlist"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick">
            </el-tree>
          </el-card>        
        </div>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import { AMapManager } from 'vue-amap'
import { cookieGet } from '@/common/cookie'
import mixinViewModule from '@/mixins/view-module'

let amapManager = new AMapManager();
export default {
  mixins: [ mixinViewModule ],
  data: function() {
    let self = this;
    return {
      reflash:false,
      mixinViewModuleOptions: {
        getDataListURL: `/sys/stream/page?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/sys/stream/page?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      markerRefs:[],
      amapManager,
      defaultProps: {},
      zoom: 4,
      center: [116.34657,39.987299],
      positions: [],
      dataForm:{
        map_location:'GETLOCATION'
      },
      events_map:{
        init:(o)=>{
          setTimeout(() => {
            console.log("map events!!!!!")
            console.log(self.markerRefs);
            let cluster = new AMap.MarkerClusterer(o, self.markerRefs,{
              gridSize: 80,
              renderCluserMarker: self._renderCluserMarker
            });
            console.log(cluster);
          }, 1000);
        }
      },
      events: {
        init: (o) => {
          console.log(o)
          console.log('-------marker events-')
          this.markerRefs.push(o)
        },
        'moveend': () => {
        },
        'zoomchange': () => {
        },
        'click': (e) => {
          // console.log(e);
          this.center = [e.lnglat.lng,e.lnglat.lat];//点击选择新地址为中心点
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
    this.$axios.get(`/sys/stream/page?token=${cookieGet('token')}`,{params:{map_location:'GETMAP'}})
      .then(res => {
        console.log("-----mounted---res.list-")
        console.log(res)
        this.positions = res.list  //获取当前user_stream表中所有的经纬度信息
        console.log(res.list) 
      })
      .catch(() => {
        console.log("error")
      })
  },
  methods: {
    handleNodeClick(val) {
      console.log("----点击事件-----00------")
      console.log(val)
      this.markerRefs = []
      this.positions = val.streamlng
      console.log("----点击事件-----marker对象-")
      this.reflash = !this.reflash
    },
    _renderCluserMarker(context) {
          const count = this.positions.length;

          let factor = Math.pow(context.count/count, 1/18)
          let div = document.createElement('div');
          let Hue = 180 - factor* 180;
          let bgColor = 'hsla('+Hue+',100%,50%,0.7)';
          let fontColor = 'hsla('+Hue+',100%,20%,1)';
          let borderColor = 'hsla('+Hue+',100%,40%,1)';
          let shadowColor = 'hsla('+Hue+',100%,50%,1)';
          div.style.backgroundColor = bgColor
          let size = Math.round(30 + Math.pow(context.count/count,1/5) * 20);
          div.style.width = div.style.height = size+'px';
          div.style.border = 'solid 1px '+ borderColor;
          div.style.borderRadius = size/2 + 'px';
          div.style.boxShadow = '0 0 1px '+ shadowColor;
          div.innerHTML = context.count;
          div.style.lineHeight = size+'px';
          div.style.color = fontColor;
          div.style.fontSize = '14px';
          div.style.textAlign = 'center';
          context.marker.setOffset(new AMap.Pixel(-size/2,-size/2));
          context.marker.setContent(div)
        },
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
    height: 600px;
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
