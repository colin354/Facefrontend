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
                      <div id="amap-show" class="amap-demo"></div>
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
// NPM 方式
import { lazyAMapApiLoaderInstance } from 'vue-amap';
// import carUrl from '../../assets/images/carame.png'
    export default {
        name: "track-show",
        // mixins: [ mixinViewModule ],
        data () {
            return {
                showA:false,
                viaMarker:[],
                maxLocation:[],
                //日期选项
                pickerOptions: {
                  shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', [start, end]);
                    }
                  }, {
                    text: '最近一个月',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                      picker.$emit('pick', [start, end]);
                    }
                  }, {
                    text: '最近三个月',
                    onClick(picker) {
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
                    {value:'选项1',label:'车辆'},
                    {value:'选项2',label:'人脸'}
                ],
                value:'',
                paths:[],
                temp:{},
                dataList:[]
            }
        },
        created() {
            let self = this
            this.initMap();
            console.log("------我的弧度-------")
            this.initPage();
        },
        methods:{  
            initMap(){
                lazyAMapApiLoaderInstance.load().then(() => {
                    this.map = new AMap.Map('amap-show', {
                        // center: [114.037939,22.627198],//自带
                        // center: [120.09465,33.313217],  //盐城
                        // center: [120.094163,33.313109],//汇文公馆
                        center:[120.095913,33.302156],
                        zoom: 18
                    })
                });
            },
            createTrackMap(){
                this.initPage();
                this.addMarker();
            },
            addMarker(){//画轨迹的同时,添加摄像头图标
              var startIcon = new AMap.Icon({ //摄像头图标
                  // 图标尺寸
                  size: new AMap.Size(25, 34),
                  // 图标的取图地址
                  image: 'http://10.2.155.139:8888/media/fxq_test/camera_0.png',//此处修改摄像头图标
                  // 图标所用图片大小
                  imageSize: new AMap.Size(20, 20),
                  // 图标取图偏移量
                  imageOffset: new AMap.Pixel(-1, -1)
              });
              let self = this
              for(var i=1 ; i < this.temp.length ; i++){ //选择途经点比较多的数据
                var maxCount = this.temp[0].location.length
                if(this.temp[i].location.length >= maxCount){
                  this.maxLocation = this.temp[i].location 
                  console.log("maxloction")
                  console.log(this.maxLocation)             
                }
              }                         
              for(var j=0; j < this.maxLocation.length ; j++ ){
                if(j < 1){ // 第一个经纬度特殊,只有0与1便可直接显示
                  var viaMarker0 = new AMap.Marker({
                    position:new AMap.LngLat(self.maxLocation[j][0],self.maxLocation[j][1]),
                    icon: startIcon,
                    offset:new AMap.Pixel(-10,-10)
                  })
                  this.map.add([viaMarker0])
                }else{ // 之后的经纬度,信息在位置2和3上                            
                  var viaMarker1 = new AMap.Marker({
                    position:new AMap.LngLat(self.maxLocation[j][2],self.maxLocation[j][3]),
                    icon: startIcon,
                    offset:new AMap.Pixel(-10,-10)
                  })
                  this.map.add([viaMarker1])
                }
              }  
            },

            
            findTrackData(){
                this.showA = true
                this.getDurationGPSData(); //发送get请求
            },
            //点击“查询”,发送get请求           
            getDurationGPSData(){
                this.$axios.get("sys/check").then(res=> {
                    console.log("------------res-----")
                    console.log(res)
                    console.log("------------res-----")
                    this.temp = []
                    this.dataList = []
                    this.temp = res.list
                    this.dataList = res.list
                    console.log(this.temp)                  
                    console.log('可以正常打印不-------')
                }).catch(error =>{
                    console.log(error)
                }) 
            },
            // getColor() {  //随机取不同的颜色
            //     //北京地铁线的颜色
            //     // var str0 = ["#a3308","#005195","#008998","#ae005f","#ba8b00","#c94d00","#009974","#C2C2C2","#CD00CD","#CD6600",
            //     //             "#8fd400","#0095c3","#f5d312","#b6985e","#682145","#a192b4","#8F8F8F","#98F5FF","#8B1A1A","#545454",
            //     //             "#4876FF","#8B0000","#8B6508","#8B8386","#B03060","#BCEE68","#C1CDCD","#CD8C95","#DEB887","#EE30A7"]
            //     // // return str0[Math.floor(Math.random()*str0.length)]//从已有的颜色数组中随机选择,但容易不同轨迹是同一种颜色
            //     // if(m < str0.length){
            //     //   return str0[m]
            //     // }else{
            //     //   return str0[Math.floor(Math.random()*str0.length)]
            //     // }
            //     //随机函数获取的颜色
            //     var str="#";
            //     var arr=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
            //     for(var i=0;i<6;i++){
            //         var num=parseInt(Math.random()*16);
            //         str+=arr[num];
            //     }
            //     return str;
            // },
            //画多条轨迹
            initPage(){
                this.map = new AMap.Map('amap-show', {
                                center: [120.095913,33.302156],
                                zoom: 18
                            },
                    AMapUI.loadUI(['misc/PathSimplifier'], (PathSimplifier) => {
                        if (!PathSimplifier.supportCanvas) {
                            alert('当前环境不支持 Canvas！');
                            return;
                        }
                        for(var i=0 ; i<this.temp.length; i++){
                            // console.log("------外层for----")
                            // console.log(this.temp[i].location)
                            // console.log(this.temp[i].color)
                            var tempColor = this.temp[i].color  //同一个i值即同一个faceid,同一个人,用同一种颜色;不同的i值用不同的颜色
                            var bezierCurve = new AMap.BezierCurve({
                                path: this.temp[i].location,
                                showDir: true,
                                dirColor:'white',
                                isOutline: true,
                                outlineColor: "transparent",
                                borderWeight: 3,
                                strokeColor: tempColor, //线颜色
                                strokeOpacity: 1,//线透明度
                                strokeWeight: 5, //线宽
                                // 线样式还支持 'dashed'
                                strokeStyle: "solid", //线样式
                                // strokeStyle是dashed时有效
                                strokeDasharray: [10, 10],
                                lineJoin: 'round',
                                lineCap: 'round',
                                zIndex: 50,
                                dirArrowStyle:{
                                    stepSpace: 8,  //stepSpace: {number} 箭头排布的间隔，单位像素
                                    width: 3
                                }                                   
                            })
                            bezierCurve.setMap(this.map)
                            // 缩放地图到合适的视野级别
                            this.map.setFitView([ bezierCurve ])
                        }                                                       
                    })
                )
            },
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