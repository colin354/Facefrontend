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
                        v-model="value3"
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
                iccid:'',
                startTime:'',
                paths:[//依次是起点,途中经过点,终点
                    [[120.093373,33.314297], [120.093776,33.314127,120.093668,33.313571]]//第一段弧线
                    [[120.09333,33.31423],[120.093175,33.313907,120.093593,33.313598]]
                ]
            }
        },
        created() {
            let self = this
            this.initMap();
            console.log("thisDate:",this.startDate);
        },
        methods:{
            findTrackData(){
                console.log("thisDate:",this.startDate);
                this.initPage();
            },
            // getGPSData与getDurationGPSData,暂时没用到
            getGPSData(){
                this.$http.get("api/contrail/trackLocations",{params:{iccid: this.iccid,date:this.startTime}}).then(result => {
                    let code = result.data.code;
                    let gpsData = result.data.data;
                    this.loadState = false;
                    if (code !== 200 || gpsData === "" || gpsData === null) {
                        this.initMap();
                        return
                    }
                    var strArr = gpsData.split(";");
                    var length = strArr.length-1;
                    var resultStr = "";
                    for (var i = 0; i < length; i++) {
                        var gpsArr = strArr[i].split(",");
                        if(gpsArr[11]  !== "1") {
                            continue; // 去除非 GPS 数据
                        }
                        var jd = gpsArr[3];
                        var wd = gpsArr[5];
                        resultStr += "[" + wd + "," + jd + "],";
                    }
                    if(resultStr === "") {
                        this.msg ();
                        this.initMap();
                        return;
                    };
                    resultStr = "[" + resultStr + "]";
                    this.initPage(resultStr);
                })
            },
            getDurationGPSData(){
                this.$http.get("api/contrail/durationLocations",{params:{iccid: this.iccid, startTime:this.startDate, endTime:this.startDate }}).then(result => {
                    let code = result.data.code;
                    let gpsData = result.data.data;
                    if (code !== 200 || gpsData === "" || gpsData === null) {
                        this.msg ();
                        this.initMap();
                        return
                    }
                    var strArr = gpsData.split(";");
                    var length = strArr.length-1;
                    var resultStr = "";
                    for (var i = 0; i < length; i++) {
                        var gpsArr = strArr[i].split(",");
                        if(gpsArr[11]  !== "1") {
                            continue; // 去除非 GPS 数据
                        }
                        var jd = gpsArr[3];
                        var wd = gpsArr[5];
                        resultStr += "[" + wd + "," + jd + "],";
                    }
                    if(resultStr === "") {
                        this.msg();
                        this.initMap();
                        return;
                    }
                    resultStr = "[" + resultStr + "]";
                    this.initPage(resultStr);
                })
            },
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
            initPage(){
                console.log("===== init===");
                console.log("---这里是我要的数据--------")
                console.log(this.paths[0])
                lazyAMapApiLoaderInstance.load().then(() => {
                    this.map = new AMap.Map('amap-show', {
                            center: [120.094163,33.313109],
                            zoom: 18
                        },
                        AMapUI.loadUI(['misc/PathSimplifier'], (PathSimplifier) => {

                            if (!PathSimplifier.supportCanvas) {
                                alert('当前环境不支持 Canvas！');
                                return;
                            }

                            var path0 = [[120.093373,33.314297],//起点
                                        //第一段弧线
                                        [120.093776,33.314127,120.093668,33.313571],]
                            var bezierCurve = new AMap.BezierCurve({
                                path: path0,
                                showDir:true,
                                dirColor:'white',
                                isOutline: true,
                                outlineColor: '#ffeeff',
                                borderWeight: 3,
                                strokeColor: 'red', //线颜色
                                strokeOpacity: 1,//线透明度
                                strokeWeight: 8, //线宽
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
                            
                            // 划第二段弧线
                            // var path1 = [[120.093373,33.314297],
                            //             [120.093175,33.313907,120.093668,33.313571]]
                            var path1 = [[120.093668,33.313571],
		                                [120.093175,33.313907,120.093373,33.314297]]
                            var bezierCurve1 = new AMap.BezierCurve({
                                path: path1,
                                showDir:true,
                                dirColor:'white',
                                isOutline: true,
                                outlineColor: '#ffeeff',
                                borderWeight: 3,
                                strokeColor: 'blue', //线颜色
                                strokeOpacity: 1,//线透明度
                                strokeWeight: 8, //线宽
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
                            bezierCurve1.setMap(this.map)
                            // 缩放地图到合适的视野级别
                            this.map.setFitView([ bezierCurve1 ])

                            
                            //创建组件实例
                            var pathSimplifierIns = new PathSimplifier({
                                zIndex: 100,
                                map: this.map, //所属的地图实例
                                getPath: (pathData) => {
                                    //将gps描述的所有的点数放到全局变量
                                    pathData.path.length; //返回轨迹数据中的节点坐标信息,[AMap.LngLat, AMap.LngLat...]                                     
                                    console.log("----getPath----下的")
                                    console.log(pathData.path.length)
                                    return pathData.path; // 或者 [[lng|number,lat|number],...]
                                },
                                getHoverTitle: (pathData, pathIndex, pointIndex)=> {
                                    //返回鼠标悬停时显示的信息
                                    if (pointIndex >= 0) {
                                        //鼠标悬停在某个轨迹节点上
                                        return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
                                    }
                                    console.log("----getHoverTitle----")
                                    console.log(pathData.name + '，点:' + pointIndex + '/' + pathData.path.length)
                                    //鼠标悬停在节点之间的连线上
                                    return pathData.name + '，点数量' + pathData.path.length;
                                },
                                renderOptions: {
                                    //轨迹线的样式
                                    startPointStyle: {
                                        radius: 4,
                                        fillStyle: '#109618',
                                        lineWidth: 1,
                                        strokeStyle: '#eeeeee'
                                    },
                                    endPointStyle: {
                                        radius: 4,
                                        fillStyle: '#dc3912',
                                        lineWidth: 1,
                                        strokeStyle: '#eeeeee'
                                    },
                                    renderAllPointsNumberBelow:-1,
                                    pathLineStyle: {
                                        strokeStyle: 'green',
                                        lineWidth: 6,   //线宽度
                                        borderStyle:'green',
                                        borderWidth:1,
                                        dirArrowStyle:{
                                            stepSpace: 20,  //stepSpace: {number} 箭头排布的间隔，单位像素
                                        }
                                    }
                                }
                            });
                            //这里构建简单的轨迹，仅作示例
                            // var gpsData = eval(data);
                            let gpsData =  [[120.0931,33.312867],[120.093137,33.312809],[120.093153,33.312769],
                                            [120.093196,33.312697],[120.093274,33.312587],[120.093231,33.312592],
                                            [120.093183,33.312583],[120.093156,33.312578],[120.093124,33.312565],
                                            [120.093065,33.31256],[120.09299,33.312542],[120.092949,33.312554],
                                            [120.092939,33.312567],[120.092923,33.312598],[120.092907,33.31263],
                                            [120.092896,33.312666],[120.092858,33.312751],[120.092837,33.312796],
                                            [120.092831,33.312805],[120.092794,33.31293],[120.092789,33.312939],
                                            [120.092815,33.312876],[120.092772,33.312979],[120.092746,33.313051],
                                            [120.092719,33.313114],[120.092708,33.313154],[120.092697,33.313181],
                                            [120.092676,33.313239],[120.09273,33.313253],[120.092772,33.313266],
                                            [120.09285,33.313295],[120.092947,33.313318],[120.093011,33.313331],
                                            [120.093102,33.313367],[120.093129,33.31334],[120.093129,33.313331],
                                            [120.093151,33.313278]];   //从汇文艺术酒店至汇文酒楼
                            pathSimplifierIns.setData([{
                                name: '轨迹0',//从汇文艺术酒店至汇文酒楼
                                path: gpsData
                                },
                                {
                                name:'从上至下',
                                // path:[[120.093427,33.313961],[120.093588,33.313553]]
                                path:[]
                                // path: [ [120.093427,33.313961],[120.093405,33.313943],
                                //         [120.093389,33.313921],[120.093373,33.313907],[120.093368,33.313894],
                                //         [120.093368,33.313863],[120.093363,33.313867],[120.093363,33.313854],
                                //         [120.093363,33.313818],[120.093373,33.313786],[120.093389,33.313768],
                                //         [120.093395,33.31375],[120.093411,33.313728],[120.093416,33.313728],
                                //         [120.093416,33.31371],[120.093432,33.313683],[120.09347,33.313643],
                                //         [120.093459,33.313652],[120.093497,33.313625],[120.093475,33.313638],
                                //         [120.093507,33.313616],[120.093523,33.313589],[120.09355,33.313567],
                                //         [120.093572,33.313558],[120.093588,33.313553]]
                                },
                                {
                                name:'来回',
                                //创建一条包括500个插值点的大地线
                                path:[]
                                // path: [ [120.093641,33.313558],[120.093641,33.313562],[120.093663,33.313576],
                                //         [120.093674,33.313603],[120.093679,33.313616],[120.093684,33.313647],
                                //         [120.09369,33.313656],[120.093684,33.313692],[120.09369,33.313733],
                                //         [120.0937,33.313688],[120.093684,33.313755],[120.093679,33.313782],
                                //         [120.093663,33.313809],[120.093658,33.313836],[120.093625,33.313876],
                                //         [120.093599,33.313921],[120.093582,33.31393],[120.093556,33.313939],
                                //         [120.093545,33.313952],[120.09354,33.313966],[120.093497,33.313975]]
                                }]);

                        })
                    )
                });                   
            },

            msg() {
                this.$notify.info({
                    title: '提示',
                    message: '暂无轨迹数据'
                });
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