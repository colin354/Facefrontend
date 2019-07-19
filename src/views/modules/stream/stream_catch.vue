<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div id="map">
              <div class="amap-page-container">
                <el-amap vid="amapDemo" 
                :center="center" 
                :zoom="zoom" 
                class="amap-demo"
                :plugin="plugin" 
                :events="events"
                :key = "rounds">
                <el-amap-marker v-for="marker in markers" :key="marker" :position="marker.position"
                :events="marker.events"></el-amap-marker>
                </el-amap>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
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
      rounds:false,
      datas: [],
      defaultProps: {
          children: 'children',
          label: 'label'
      },
      activeNames:['1'],
      mixinViewModuleOptions: {
        getDataListURL: `/sys/stream/page?token=${cookieGet('token')}`,
        getDataListIsPage: true,
        deleteURL: `/sys/stream?token=${cookieGet('token')}`,
        deleteIsBatch: true
      },
      dataForm:{
        map_location:'GETLOCATION'
      },
      amapManager,
      zoom: 4,
      center: [116.34657,39.987299],
      markers:[],
      basePosition:[],
      markerRefs:[],
      events: {
        init(o) {
          console.log("地图events--------111--o----")
          console.log(o)
          setTimeout(() => {
            let cluster = new AMap.MarkerClusterer(o, self.markerRefs,{
              gridSize: 60,
              renderCluserMarker: self._renderCluserMarker
            });
          }, 1000);
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
  mounted(){
    let self = this
    this.$axios.get(`/sys/stream/page?token=${cookieGet('token')}`,{params:{map_location:'GETMAP'}})
      .then(res => {
        console.log("-----mounted---res.list-")
        this.basePosition = res.list  //获取当前user_stream表中所有的经纬度信息
        console.log(res.list)
        //this.center = res.center
        for (let i in this.basePosition)
        {
          this.markers.push({
            position:this.basePosition[i],
            //content: '<div style="text-align:center; background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px;border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
            events: {
              init(o) {
              self.markerRefs.push(o);
              }
            }
          })
        }  
      })
      .catch(() => {
        console.log("error")
      })
  },
  methods: {
    getMap() {
      // amap vue component
      console.log(amapManager._componentMap);
      // gaode map instance
      console.log(amapManager._map);
    },
    handleNodeClick(val) {
      console.log("----点击事件-----00------")
      console.log(val)
      let self = this
      this.markers = []
      this.markerRefs = []
      let i = 0
      for(i in val.streamlng){
        console.log("for 00099999")
        this.markers.push({
          position:val.streamlng[i],
          events: {
              init(o) {
                console.log("init----000999")
                console.log(o)
                self.markerRefs.push(o);
              }
           }
        })  
      }
      console.log('-----000--this.markers---')
      console.log(this.markers)
      this.rounds = !this.rounds
    },
    _renderCluserMarker(context) {
          console.log('----render----里的context')
          console.log(context)
          const count = this.markers.length;
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
