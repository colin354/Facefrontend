<template>
    <d2-container>
      <el-row :gutter="18">
        <el-col :span="18">
          <el-row :gutter="20">
            <el-col>
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple" >
                    <el-card class="box-card">
                        <span>数据类型&nbsp;&nbsp;</span>
                        <el-select v-model="value">
                            <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value">
                            </el-option>
                        </el-select>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>起止时间&nbsp;&nbsp;</span>
                        <el-date-picker
                            v-model="value1"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
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
      //日期选项
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value1: '',
      //下拉框选项
      selectedA:'数据类型',
      options:[
        { value: '选项1', label: '车辆' },
        { value: '选项2', label: '人脸' }
      ],
      value: '',
      paths:[],
      temp:{},
      dataList:[]
    }
  },
  created () {
    // this.initMap()
    // this.initPage()
  },
  methods:{  
    initMap () {
      let o = amapManager.getMap();

      // 步行路线
      AMap.service('AMap.Walking',function(){
        //步行导航
        var walking = new AMap.Walking({
          map: o,
          // panel: "panel"
          hidMarkers:true,
          isOutline: true,
          // outlineColor: "red",
        });
         var path = [];

         walking.search([120.094153,33.313319],[120.095028,33.313592], function(status, result) {
            if (status === 'complete') {
                log.success('绘制步行路线完成')
            } else {
                log.error('步行路线数据查询失败' + result)
            } 
        });
      });
    },

    createTrackMap () {
      this.initPage()
      // this.addMarker()
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
      this.showA = true
      this.getDurationGPSData(); //发送get请求
    },
    //点击“查询”,发送get请求           
    getDurationGPSData () {
      this.$axios.get("sys/check").then(res=> {
        console.log("------------res-----")
        console.log(res)
        this.temp = []  //存放轨迹的经纬度
        this.dataList = []
        this.markers = [] //存放摄像头经纬度
        this.temp = res.list
        this.markers = res.Markers
        this.dataList = res.list
        console.log(this.temp)                  
        console.log('可以正常打印不-------')
      }).catch(error => {
        console.log(error)
      })
    },
    //画多条轨迹
    initPage () {
      let o = amapManager.getMap();
      AMapUI.loadUI(['misc/PathSimplifier'], (PathSimplifier) => {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！');
          return;
        }
        // 步行路线

        

        AMap.service('AMap.Walking',function(){
          //步行导航
          let path0 = {faceid:'1001',start:[120.093429,33.312951],end:[120.095505,33.312745]};
          let path1 = {start:[120.093529,33.312551],end:[120.095605,33.312645]};
          let path2 = {start:[120.093729,33.312751],end:[120.095805,33.312845]};   
          let path = [path0,path1,path2] 
          let walk = ['walk0','walk1','walk2']
          console.log(path)
          for(let i=0; i < 6 ;i++){
            // console.log('----path---i------'+i)
            // console.log(path[i])
            // console.log(path[i].start)
            // console.log(path[i].end)
            walk[i] = new AMap.Walking({
              map: o,
              // panel: "panel"
              hidMarkers:true,
              isOutline: true,
              // outlineColor: "red",
            });
            walk[i].search((path[i]).start,(path[i]).end, function(status, result) {
                if (status === 'complete') {
                    log.success('绘制步行路线完成')
                } else {
                    log.error('步行路线数据查询失败' + result)
                } 
            });  
          }
      
        });                                                      
      }
      )
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