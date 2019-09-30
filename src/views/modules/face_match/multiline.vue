<template>
    <d2-container>
    <el-row>
        <el-col>
        <div class="grid-content bg-purple">
            <div class="grid-content bg-purple" >
                <el-card class="box-card">
                <span>数据类型&nbsp;&nbsp;</span>
                <el-select v-model="value">
                    <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value">
                    </el-option>
                </el-select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>起始时间&nbsp;&nbsp;</span>
                    <el-date-picker
                        v-model="value2"
                        type="datetime"
                        placeholder="选择日期时间"
                        default-time="12:00:00">
                    </el-date-picker>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>终止时间&nbsp;&nbsp;</span>
                    <el-date-picker
                        v-model="value3"
                        type="datetime"
                        placeholder="选择日期时间"
                        default-time="12:00:00">
                    </el-date-picker>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button type="primary" @click="findTrackData" size="mini">查询</el-button>
                    <!-- <div>
                        <!-- <input id="input-1a" type="file" class="file" data-show-preview="false">&nbsp;&nbsp;&nbsp;&nbsp; -->
                        <!-- <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" type="primary">批量导入本地人脸/车牌图片</el-button> -->
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div> -->
                        <!-- </el-upload>
                        <el-button slot="trigger" size="small" type="primary">地图轨迹</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-button slot="trigger" size="small" type="primary">文本轨迹</el-button>
                    </div>  -->
                </el-card>
            </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col>
        <div class="grid-content bg-purple">
          <!-- <el-card class="box-card"> -->
            <div class="amap-page-container">
                <div id="amap-show" class="amap-demo" style="height: 600px;"></div>
            </div>
          <!-- </el-card> -->
        </div>
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
        data () {
            return {
                //上传文件
                fileList: [{
                    name: 'food.jpg',
                    url: '',
                    }, {
                    name: 'food666.jpg',
                    url: '',
                    }],
                //日期选项
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                        picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                        }
                    }]
                    },
                value1: '',
                value2: '',
                value3: '',
                //下拉框选项
                selectedA:'数据类型',
                options:[
                    {value:'选项1',label:'车辆'},
                    {value:'选项2',label:'人脸'}
                ],
                value:'',
                paths:[],
                temp:{},
            }
        },
        created() {
            let self = this
            this.initMap();
            console.log("------我的弧度-------")
        },
        methods:{  
            initMap(){
                lazyAMapApiLoaderInstance.load().then(() => {
                    this.map = new AMap.Map('amap-show', {
                            // center: [114.037939,22.627198],//自带
                            // center: [120.09465,33.313217],  //盐城
                            center: [120.094163,33.313109],
                            zoom: 18
                        }
                    )
                });
            },
            findTrackData(){
                this.getDurationGPSData();
                console.log("1111111111111")
                this.initPage();
                console.log("2222222222222222222222")
            },
            //点击“查询”,发送get请求           
            getDurationGPSData(){
                this.$axios.get("sys/check").then(res=> {
                    console.log("------------res-----")
                    console.log(res)
                    this.temp = res.list 
                    console.log(this.temp)
                    // for(var i=0;i<res.list.length;i++){
                    //     this.paths[i] = this.temp[i].location
                    // }
                    // console.log(this.paths)                   
                    console.log('可以正常打印不-------')
                }).catch(error =>{
                    console.log(error)
                }) 
            },
            getColor() {  //随机取不同的颜色
                //北京地铁线的颜色
                // var str0 = ["#a3308","#005195","#008998","#ae005f","#ba8b00","#c94d00","#009974","#C2C2C2","#CD00CD","#CD6600",
                //             "#8fd400","#0095c3","#f5d312","#b6985e","#682145","#a192b4","#8F8F8F","#98F5FF","#8B1A1A","#545454",
                //             "#4876FF","#8B0000","#8B6508","#8B8386","#B03060","#BCEE68","#C1CDCD","#CD8C95","#DEB887","#EE30A7"]
                // // return str0[Math.floor(Math.random()*str0.length)]//从已有的颜色数组中随机选择,但容易不同轨迹是同一种颜色
                // if(m < str0.length){
                //   return str0[m]
                // }else{
                //   return str0[Math.floor(Math.random()*str0.length)]
                // }
                //随机函数获取的颜色
                var str="#";
                var arr=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
                for(var i=0;i<6;i++){
                    var num=parseInt(Math.random()*16);
                    str+=arr[num];
                }
                return str;
            },
            //画多条轨迹
            initPage(){
                this.map = new AMap.Map('amap-show', {
                                center: [120.094163,33.313109],
                                zoom: 18
                            },
                    AMapUI.loadUI(['misc/PathSimplifier'], (PathSimplifier) => {
                        if (!PathSimplifier.supportCanvas) {
                            alert('当前环境不支持 Canvas！');
                            return;
                        }
                        for(var i=0 ; i<this.temp.length; i++){
                            var tempColor = this.getColor()  //同一个i值即同一个faceid,同一个人,用同一种颜色;不同的i值用不同的颜色
                            console.log("------外层for----")
                            console.log(this.temp[i].faceid)
                            console.log(this.temp[i])                           
                            console.log(this.temp[i].location)
                            console.log("-------------hahahhahahahh")
                            // var temp_path = [this.temp[i]['location'][0], this.temp[i]['location'][1]]
                            // console.log("temp_path"+temp_path)
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
                            //}
                            // for(var j = 0 ; j < (this.temp[i].location.length) ; j++){
                            //     console.log("------内层内层内层内层-------")
                            //     console.log(this.temp[i].location[j])
                            //     for(var k = 0; k <(this.temp[i].location[j].length); k++){
                            //         console.log(this.temp[i].location[j][k])                             
                            // }   
                        }                                                       
                    })
                )
            },
        }
    }
</script>

<style lang="scss" scoped>
  .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
  .el-icon-arrow-down {
    font-size: 12px;
  }
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