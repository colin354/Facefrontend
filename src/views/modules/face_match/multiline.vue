<template>
    <d2-container>
      <el-row :gutter="18">
        <el-col :span="18">
          <el-row :gutter="20">
            <el-col>
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple" >
                    <el-card class="box-card">
                        <!-- <span>数据类型&nbsp;&nbsp;</span>
                        <el-select v-model="value">
                            <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value">
                            </el-option>
                        </el-select> -->
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>起止时间&nbsp;&nbsp;</span>
                        <el-date-picker
                            v-model="value1"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss">
                          </el-date-picker>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-button type="primary" @click="findTrackData" size="mini">查询</el-button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-button type="primary" @click="createTrackMap" size="mini" v-if="showA">地图轨迹</el-button>
                    </el-card>
                </div>
              </div>
            </el-col>
          </el-row>
      
          <el-row :gutter="18">
            <el-col>
              <div class="grid-content bg-purple">
                <el-card class="box-card-hei">
                  <div class="amap-page-container">
                    <!-- {{this.temp}} -->
                    <el-amap
                      :plugin="plugin"
                      :amap-manager="amapManager"
                      :zoom="zoom"
                      :center="center"
                      vid="amapDemo"
                      ref="reds"
                      style="width:100vw;height:80vh"
                      :events="events"
                    ></el-amap>                    
                      <!-- <div id="amap-show" class="amap-demo"></div> -->
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-col>

      <el-col :span="6">
        <el-row :gutter="15">
          <el-col>
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <el-table
                  height="640"
                  size="mini"
                  :data="dataList"
                  border
                  style="width: 100%">
                  <el-table-column prop="facename" :label="$t('person.name')" header-align="center" align="center" width="80"/>
                  
                  <el-table-column prop="faceimgurl" :label="$t('person.picture')" header-align="center" align="center" width="140">
                    <template  slot-scope="scope">
                      <img :src="scope.row.faceimgurl" width="70" height="70">
                    </template>
                  </el-table-column>

                  <el-table-column prop="color" :label="$t('person.color')" fixed="right" header-align="center" align="center"> 
                    <template  slot-scope="scope">
                      <el-color-picker v-model="scope.row.color"></el-color-picker>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-col> 
    </el-row>
  </d2-container>
</template>

<script>
// import { AMapManager } from 'vue-amap'
import { cookieGet } from '@/common/cookie'
import faceimg from './face-img'
import facelist from './face-list'
import { constants } from 'crypto'
import mixinViewModule from '@/mixins/view-module'
import { AMapManager } from "vue-amap";
let amapManager = new AMapManager();
let o = amapManager.getMap();
// NPM 方式
// import carUrl from '../../assets/images/carame.png'
export default {
  name: "multiline",
  // mixins: [ mixinViewModule ],
  data () {
    let _obj = this;
    return {
      amapManager,
      center: [120.093585,33.313408],//盐城
      plugin: [
        {
          pName: "Scale",
          events: {
            init(instance) {
              console.log(instance);
            }
          }
        }
      ],
      zoom: 18,
      events: {
        init(o) {
          _obj.initMap();
        }
      },      
      showA:false,
      markers:[],
      pa :[],
      // colors:[],
      //日期选项
      value1: '',
      //下拉框选项
      selectedA:'数据类型',
      options:[
        { value: '选项1', label: '车辆' },
        { value: '选项2', label: '人脸' }
      ],
      value: '',
      paths:[],
      route_list:{},
      dataList:[]
    }
  },
  methods:{  
    initMap () {
      let o = amapManager.getMap();
      // 步行路线
      AMap.service('AMap.Walking',function(){
        //步行导航
        var walking = new AMap.Walking({
          map: o,
          hidMarkers:true,
          isOutline: true,
        });
      });
    },

    createTrackMap () {
      this.initPage() //画多条轨迹,超哥所用,此时为了验证不同颜色,先暂时不用
      // this.addMarker() //添加摄像头图标
      // this.multiTracks()  //陆,验证不同颜色轨迹
    },
    addMarker () {//画轨迹的同时,添加摄像头图标
      let self = this
      var startIcon = new AMap.Icon({ //摄像头图标
        // 图标尺寸
        size: new AMap.Size(25, 34),
        // 图标的取图地址
        image: '', //此处修改摄像头图标
        // 图标所用图片大小
        imageSize: new AMap.Size(20, 20),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-1, -1)
      })
      if (this.markers) {
        for (var i=0; i < this.markers.length; i++){
          var viaMarker1 = new AMap.Marker({
            position:new AMap.LngLat(self.markers[i][0], self.markers[i][1]),
            icon: startIcon,
            offset:new AMap.Pixel(-10, -10)
          })
          this.map.add([viaMarker1])
        }
      }
    },
    findTrackData () {
      this.showA = true //地图轨迹按钮显示
      this.getDurationGPSData(); //发送get请求
    },
    //点击“查询”,发送get请求           
    getDurationGPSData () {
      this.$axios.get("sys/check",{params:{startTime:this.value1[0],endTime:this.value1[1]}}).then(res=> {
        // this.$axios.get("sys/check").then(res=> {
        console.log("------------res-----")
        console.log(res)
        this.route_list = []  //存放轨迹的经纬度
        this.dataList = []
        this.markers = [] //存放摄像头经纬度
        this.route_list = res.list
        this.markers = res.Markers
        this.dataList = res.list
        console.log(this.route_list)
        console.log(this.route_list.length)
        console.log("看内部")
        for(var i = 0; i < this.route_list.length ; i++){
          this.paths = this.route_list[i].location
        }
        console.log(this.paths)
        // console.log(this.route_list[0].color)
        // console.log(this.route_list[1].location[0].start)
        // console.log(this.route_list[1].location.length)                  
        console.log('可以正常打印不-------')
      }).catch(error => {
        console.log(error)
      })
    },
    
    //画多条轨迹,超哥所用
    initPage () {
      let self = this
      let o = amapManager.getMap();
      //步行导航路线
      // let path0 = {faceid:'1001',start:[120.093471,33.313968],end:[120.094233,33.313744],color:'#668B8B'};
      // let path1 = {faceid:'1001',start:[120.092715,33.313246],end:[120.093632,33.313515],color:'#8B4789'};
      // let path2 = {faceid:'1000',start:[120.093729,33.312751],end:[120.095805,33.312845],color:'#912CEE'};   
      // let path = [path0,path1,path2] 
      // self.paths = [path0,path1,path2]
      let walk = ['walk0','walk1','walk2']
      for(let h = 0; h < self.route_list.length ; h++){ //list的长度代表faceid即人的数量
        for(let i=0; i < self.paths.length ;i++){ //后台返回location,代表一个人的轨迹,location长度为1只有一条轨迹,否则有多条轨迹
          walk[i] = new AMap.Walking({});
          walk[i].search(self.paths[i].start,self.paths[i].end, function(status, result) {
              if (status === 'complete') {
                if (result.routes && result.routes.length) {
                    var path = []
                    for (var a = 0, l = result.routes[0].steps.length; a < l; a++) {
                        var step = result.routes[0].steps[a]
                        for (var j = 0, n = step.path.length; j < n; j++) {
                          path.push(step.path[j])
                        }
                    }
                    var startMarker = new AMap.Marker({
                        position: path[0],
                        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
                        map: o
                    })                 
                    var endMarker = new AMap.Marker({
                        position: path[path.length - 1],
                        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                        map: o
                    })
                    var routeLine = new AMap.Polyline({
                        path: path,
                        isOutline: true,
                        outlineColor: '#ffeeee',
                        borderWeight: 4,
                        strokeWeight: 8,
                        strokeColor: self.paths.color, //路线颜色
                        lineJoin: 'round',
                        showDir: true,  //高德地图上的箭头
                        dirArrowStyle:{
                          stepSpace: 8,  //stepSpace: {number} 箭头排布的间隔，单位像素
                          width: 3
                        }                             
                    })  
                    routeLine.setMap(o)

                  log.success('绘制步行路线完成')
                }
                  log.success('绘制步行路线完成')
              } else {
                  log.error('步行路线数据查询失败' + result)
              } 
          });  
        }
      }                                                    
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-card-hei{
    height: 585px;
  }
  .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .amap-demo {
    height: 525px;
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
    /* &:last-child {
      margin-bottom: 0;
    } */
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