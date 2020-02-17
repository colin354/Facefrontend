<template>
    <d2-container>
      <el-row :gutter="18">
        <el-col :span="12" :offset="6">
            <img class="top_logo" src="./image/top_logo.png">
            <a target="blank" href="http://221.231.13.230:8815/police/police_004/index.html">
              <img
                style="position: absolute; top: 0; right: 0; border: 0; width: 120px;"
                src="./image/darkblue@2x.png"
                alt="Fork me on GitHub">
            </a>
        </el-col>
      </el-row>
      <el-row :gutter="18">
        <el-col :span="6">
          <el-row :gutter="18">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>单位信息</span>
                  <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                </div>
                <el-row>
                  <div class="inner">
                    <ve-line :data="line_chartData" v-bind="pubSetting"></ve-line>
                  </div>
                </el-row>
              </el-card>
            </div>
          </el-row>
          <el-row :gutter="18">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>人口信息</span>
                  <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                </div>
                <el-row>
                  <div class="inner">
                    <ve-bar :data="chartData" v-bind="pubSetting"></ve-bar>
                  </div>
                </el-row>
              </el-card>
            </div>
          </el-row>
          <el-row :gutter="18">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>监控信息</span>
                  <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                </div>
                <el-row>
                  <div class="inner">
                    <ve-radar :data="pie_chartData" v-bind="pieSetting"></ve-radar>
                  </div>
                </el-row>
              </el-card>
            </div>
          </el-row>
        </el-col>

        <el-col :span="12">
          <el-row :gutter="18">
            <el-col>
              <div class="grid-content bg-purple">
                <el-card class="box-card-hei">
                  <div id="container" style="height:870px;"></div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-col>

      <el-col :span="6">
          <el-row :gutter="18">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>警情信息</span>
                  <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                </div>
                <el-row>
                  <div class="inner">
                    <ve-heatmap :data="heat_chartData" v-bind="pubSetting"></ve-heatmap>
                  </div>                  
                </el-row>
              </el-card>
            </div>
          </el-row>
          <el-row :gutter="18">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>警力信息</span>
                  <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                </div>
                <el-row>
                </el-row>
              </el-card>
            </div>
          </el-row>
          <el-row :gutter="18">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>综合分析</span>
                  <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                </div>
                <el-row>
                  <div class="inner">
                    <ve-histogram :data="his_chartData" v-bind="pubSetting"></ve-histogram>
                  </div>
                </el-row>
              </el-card>
            </div>
          </el-row>
        <!-- <el-row :gutter="15">
          <el-col>
            <div style="width:100%; height:100%;">
              <div>
                <br/>
                {{weather_data.city}} {{weather_data_0.date}} {{weather_data_0.week}}
                <br/>   
                温度: {{weather_data_0.tem}} 空气质量: {{weather_data_0.air_level}} 天气: 
                  <img v-if="weather_data_0.wea_img=='yun'"  style="display:inline-block;width: 42px;height: 42px;" src="./image/yahoo/yun.png" alt="">
                  <img v-else-if="weather_data_0.wea_img=='yu'" style="display:inline-block;width: 42px;height: 42px;" src="./image/yahoo/yu.png" alt="">
                  <img v-else-if="weather_data_0.wea_img=='bingbao'"  style="display:inline-block;width: 42px;height: 42px;" src="./image/yahoo/lei.png" alt="">
                  <img v-else-if="weather_data_0.wea_img=='lei'" style="display:inline-block;width: 42px;height: 42px;" src="./image/yahoo/lei.png" alt="">
                  <img v-else-if="weather_data_0.wea_img=='longjuanfeng'" style="display:inline-block;width: 42px;height: 42px;" src="./image/yahoo/shachen.png" alt="">
                  <img v-else-if="weather_data_0.wea_img=='qing'" style="display:inline-block;width: 42px;height: 42px;" src="./image/yahoo/qing.png" alt="">
                  <img v-else-if="weather_data_0.wea_img=='shachen'" style="display:inline-block;width: 42px;height: 42px;" src="./image/yahoo/shachen.png" alt="">
                  <img v-else-if="weather_data_0.wea_img=='wu'" style="display:inline-block;width: 42px;height: 42px;" src="./image/yahoo/wu.png" alt="">
                  <img v-else-if="weather_data_0.wea_img=='xue'" style="display:inline-block;width: 42px;height: 42px;" src="./image/yahoo/xue.png" alt="">
                  <img v-else-if="weather_data_0.wea_img=='yin'" style="display:inline-block;width: 42px;height: 42px;" src="./image/yahoo/yin.png" alt="">
                  <img v-else-if="weather_data_0.wea_img=='yujiaxue'" style="display:inline-block;width: 42px;height: 42px;" src="./image/yahoo/yujiaxue.png" alt="">
                <hr/>
              </div>
              <div id="columnarChart_t" style="width:100%; height:260%;"></div>
              <div id="barChart_t" style="width:100%; height:260%;"></div>               
              <div id="habbitChart_t" style="width:100%; height:260%;"></div>
            </div>
          </el-col>
        </el-row> -->
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import D2PageCover from './components/d2-page-cover'
import list from '@/views/charts/list/_mixin/list.js'
export default {
  name:'bottom',
  components:{
    D2PageCover,
  },
  mixins: [
    list
  ],
  data () {
    return {
      his_extend: {
        series: {
          label: { show: true, position: 'top' }
        }
      },
      his_chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },      
      heat_chartData: {
        columns: ['时间', '地点', '人数'],
        rows: [
          { '时间': '星期一', '地点': '北京', '人数': 1000 },
          { '时间': '星期二', '地点': '上海', '人数': 400 },
          { '时间': '星期三', '地点': '杭州', '人数': 800 },
          { '时间': '星期二', '地点': '深圳', '人数': 200 },
          { '时间': '星期三', '地点': '长春', '人数': 100 },
          { '时间': '星期五', '地点': '南京', '人数': 300 },
          { '时间': '星期四', '地点': '江苏', '人数': 800 },
          { '时间': '星期一', '地点': '北京', '人数': 700 },
          { '时间': '星期三', '地点': '上海', '人数': 300 },
          { '时间': '星期二', '地点': '杭州', '人数': 500 }
        ]
      },
      pie_chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },
      line_chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },
      myChart: null,
      myColumnarChart: null,
      myHabbitChart: null,
      weather_data: { city: '' },
      weather_data_0:{
        air:'',
        air_level:'',
        air_tips:'',
        tem:'',
        tem1:'',
        tem2:'',
        wea:'',
        wea_img:'',
        win_speed:'',
        date:'',
        week:''
      },
      polygon: ['polygon0','polygon1','polygon2','polygon3','polygon4','polygon5']
    }
  },
  beforeCreate () {
  },
  beforeMount () {
    console.log('bbbbbbefor')
    console.log(this)
    // this.getWeather();
  },
  created () {
    console.log('cccreated')
    console.log(this.weather_data)
  },
  mounted () {
    this.initMap();
    // this.getWeather();
    console.log(this.weather_data)

  },
  methods: {
    initMap () {
      var map = new AMap.Map('container',{
        zoom: 13,
        resizeEnable: true,
        center:[120.076904,33.32407],
      });    
      var path0=[[120.100242,33.365627], [120.101427,33.364077], [120.098461,33.359363],[120.097109,33.356467],
                [120.095521,33.355721],[120.094105,33.355014],[120.100349,33.339534],
                [120.079364,33.334751],[120.077154,33.339083],[120.08108,33.339871],[120.080394,33.34161],
                [120.073313,33.339975],[120.072943,33.340623],[120.071355,33.339518],[120.065156,33.337468],
                [120.065671,33.336579],[120.064363,33.336015],[120.063191,33.33787],[120.06376,33.338074],
                [120.062011,33.341254],[120.056432,33.339802],[120.046476,33.354455],[120.047334,33.356032],
                [120.043987,33.35948],[120.047903,33.36162],[120.04963,33.35979],[120.062923,33.362808],
                [120.063202,33.362721],[120.071503,33.36356],[120.073139,33.363836],[120.085006,33.36558],
                [120.085363,33.365571],[120.087691,33.365592],[120.088099,33.365631],[120.092008,33.366011],
                [120.093262,33.366111],[120.094533,33.366087],[120.096918,33.365336],[120.09741,33.365286]];
      var path1=[[120.100349,33.339534], [120.108259,33.313758],[120.102074,33.312925],[120.097139,33.311874],
                [120.095787,33.314645],[120.092072,33.314252],[120.092414,33.312984],[120.09081,33.312794],
                [120.09035,33.313868],[120.088989,33.314377],[120.087878,33.31514],[120.087394,33.315649],
                [120.087086,33.31627],[120.086649,33.316205],[120.086927,33.314976],[120.085586,33.314504],
                [120.085363,33.315406],[120.085005,33.317352],[120.075879,33.316484],[120.076051,33.314519],
                [120.071836,33.313982],[120.071836,33.313982],[120.06972,33.320039],[120.069317,33.32027],
                [120.067716,33.322484],[120.087699,33.325764],[120.086583,33.328425],[120.085789,33.328504],
                [120.083472,33.332993],[120.088643,33.334176],[120.089344,33.337025]];
      var path2=[[120.10009,33.287951],[120.100293,33.287333],[120.103919,33.287989],[120.105249,33.283713],
                [120.112974,33.282332],[120.121978,33.283731],[120.118759,33.287347],[120.11302,33.294689],
                [120.109887,33.307056],[120.109071,33.310151],[120.108259,33.313758],[120.102074,33.312925],
                [120.097139,33.311874],[120.095787,33.314645],[120.092072,33.314252],[120.092414,33.312984],
                [120.09081,33.312794],[120.09035,33.313868],[120.088989,33.314377],[120.087878,33.31514],
                [120.087394,33.315649],[120.087086,33.31627],[120.086649,33.316205],[120.086927,33.314976],
                [120.085586,33.314504],[120.085363,33.315406],[120.085005,33.317352],[120.075879,33.316484],
                [120.076051,33.314519],[120.071836,33.313982],[120.071836,33.313982],[120.073241,33.311057],
                [120.073391,33.310412],[120.073675,33.309743],[120.074588,33.308531],[120.077212,33.303753],
                [120.077733,33.302649],[120.079224,33.300226],[120.079363,33.299655],[120.079386,33.299075],
                [120.078976,33.297655],[120.080553,33.293272],[120.081089,33.29226],[120.081577,33.290491],
                [120.082436,33.288816],[120.083294,33.286614],[120.08356,33.286135],[120.083651,33.28556],
                [120.085061,33.282223],[120.085934,33.280678],[120.086348,33.278748],[120.086781,33.277875],
                [120.094216,33.280117],[120.093787,33.286851]];
      var path3=[[120.073241,33.311057],[120.073391,33.310412],
                [120.073675,33.309743],[120.074588,33.308531],[120.077212,33.303753],[120.077733,33.302649],
                [120.079224,33.300226],[120.079363,33.299655],[120.079386,33.299075],[120.078976,33.297655],
                [120.080553,33.293272],[120.081089,33.29226],[120.081577,33.290491],[120.079392,33.290025],
                [120.079982,33.288194],[120.076838,33.287448],[120.076356,33.288913],[120.075367,33.288779],
                [120.074846,33.290817],[120.065008,33.288555],[120.064718,33.288428],[120.064598,33.286637],
                [120.064483,33.286471],[120.064268,33.286496],[120.06374,33.28648],[120.063532,33.286092],
                [120.060399,33.285634],[120.059948,33.287705],[120.057116,33.287049],[120.058189,33.283342],
                [120.055997,33.282948],[120.056405,33.281583],[120.055847,33.28168],[120.054232,33.28147],
                [120.053991,33.282483],[120.048476,33.281604],[120.048599,33.280979],[120.042528,33.279741],
                [120.04418,33.282717],[120.044242,33.282853],[120.04407,33.282903],[120.043394,33.285287],
                [120.044535,33.28559],[120.044474,33.286203],[120.044634,33.287367],[120.042574,33.286971],
                [120.041834,33.287244],[120.040825,33.290941],[120.039752,33.293702],[120.038663,33.297392],
                [120.037491,33.297256],[120.036219,33.299472],[120.032162,33.298782],[120.031442,33.300844],
                [120.030875,33.302353],[120.032334,33.304503],[120.034105,33.304153],[120.034303,33.303349],
                [120.03588,33.30353],[120.035418,33.306104],[120.036477,33.306237],[120.036402,33.306909],
                [120.037239,33.307006],[120.037574,33.307031],[120.03772,33.306524],[120.043494,33.307677],
                [120.044404,33.305699],[120.048536,33.306496],[120.048658,33.306457],[120.048755,33.306376],
                [120.056203,33.307826],[120.058728,33.308335],[120.058428,33.309795],[120.059996,33.310113],
                [120.059899,33.310631],[120.072033,33.313552]];
      var path4=[[120.056432,33.339802],[120.062011,33.341254],[120.06376,33.338074],[120.063191,33.33787],
                [120.064363,33.336015],[120.065671,33.336579],[120.065156,33.337468],[120.071355,33.339518],[120.072943,33.340623],
                [120.073313,33.339975],[120.080394,33.34161],[120.08108,33.339871],[120.077154,33.339083],[120.079364,33.334751],
                [120.089344,33.337025],[120.088643,33.334176],[120.083472,33.332993],[120.085789,33.328504],[120.086583,33.328425],
                [120.087699,33.325764],[120.067716,33.322484],[120.069317,33.32027],[120.06972,33.320039],[120.071836,33.313982],
                [120.072033,33.313552],[120.059899,33.310631],[120.059996,33.310113],[120.058428,33.309795],[120.058728,33.308335],
                [120.056203,33.307826],[120.048755,33.306376],[120.048658,33.306457],[120.048536,33.306496],[120.044404,33.305699],
                [120.043494,33.307677],[120.03772,33.306524],[120.037574,33.307031],[120.037239,33.307006],[120.036402,33.306909],
                [120.035598,33.310606],[120.043752,33.312209],[120.043563,33.313023],[120.042432,33.312762],[120.041856,33.314894],
                [120.053508,33.317358],[120.053259,33.318006],[120.056393,33.318573],[120.054728,33.324391],[120.054225,33.325645],
                [120.051028,33.324827],[120.051296,33.324234],[120.046211,33.322125],[120.044527,33.32432],[120.042418,33.323725],
                [120.04231,33.324197],[120.038941,33.323508],[120.038509,33.324699],[120.038976,33.324818],[120.038481,33.326059],
                [120.038084,33.325936],[120.037992,33.326156],[120.033768,33.325118],[120.032347,33.328274],[120.035412,33.329147],
                [120.034082,33.330519],[120.033863,33.330976],[120.032511,33.330481],[120.032126,33.331507],[120.033022,33.331735],
                [120.032124,33.333865],[120.031201,33.333683],[120.029972,33.337662],[120.030721,33.337784],[120.030647,33.338177],
                [120.032407,33.338522],[120.033014,33.337135],[120.03494,33.337465],[120.035616,33.33546],[120.04256,33.337188],
                [120.044302,33.332433],[120.051812,33.334645],[120.052398,33.333727],[120.058159,33.335285],[120.057513,33.336427],
                [120.058586,33.336712]];
      var path5=[[120.036021,33.30868],[120.035598,33.310606],[120.043752,33.312209],[120.043563,33.313023],
                [120.042432,33.312762],[120.041856,33.314894],[120.053508,33.317358],[120.053259,33.318006],[120.056393,33.318573],
                [120.054728,33.324391],[120.054225,33.325645],[120.051028,33.324827],[120.051296,33.324234],[120.046211,33.322125],
                [120.044527,33.32432],[120.042418,33.323725],[120.04231,33.324197],[120.038941,33.323508],[120.038509,33.324699],
                [120.038976,33.324818],[120.038481,33.326059],[120.038084,33.325936],[120.037992,33.326156],[120.033768,33.325118],
                [120.034072,33.324537],[120.029029,33.322948],[120.030424,33.319871],[120.026758,33.31866],[120.026251,33.318362],
                [120.026573,33.317329],[120.023242,33.316273],[120.024251,33.31255],[120.022174,33.312167],[120.022955,33.30837],
                [120.025466,33.308772],[120.025398,33.30941],[120.027308,33.309747],[120.027576,33.3088],[120.031613,33.309631],
                [120.031585,33.309936],[120.032272,33.310097],[120.032419,33.309765],[120.033005,33.309873],[120.033305,33.309199],
                [120.033469,33.309038],[120.033631,33.308906],[120.035101,33.309111],[120.035335,33.308456]];
      console.log("---map----map----map");
      var path =[path0,path1,path2,path3,path4,path5]
      var color=["#4169E1",'#836FFF','#F7C885','#F8A1A1','#D1EEEE', '#5D478B']
      // var polygon0,polygon1,polygon2,polygon3,polygon4,polygon5
      // var polygon =[polygon0,polygon1,polygon2,polygon3,polygon4,polygon5]
      for(var i=0; i < 6 ;i++){
            this.polygon[i] = new AMap.Polygon({
            map:map,
            path:path[i],
            strokeColor: color[i], //线条颜色
            strokeWeight: 6,       //轮廓线宽度
            strokeOpacity: 0.2,    //轮廓线透明度
            fillColor: color[i],   //多边形填充颜色
            fillOpacity: 0.9,      //多边形填充透明度
            bubble:true
        })
      }
      map.setFitView();
      //鼠标进入警务区polygon[0]后显示窗体
      this.polygon[0].on('mouseover',function(e){
        console.log("入入入入入！")
        var info = [];
        info.push("<div><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
        info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>高德软件</b>");
        info.push("电话 : 010-84107000   邮编 : 100102");
        info.push("地址 :polygon[0]</div></div>");
        var infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        })
        infoWindow.open(map, [120.076525,33.351924]);
      });
      //鼠标移出警务区polygon[0]后关闭窗体
      this.polygon[0].on('mouseout',function(e){
        console.log("出出")
        var info = [];
        var infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        })
        infoWindow.open(map, [120.076525,33.351924]);
      });
      //鼠标进入警务区polygon[1]后显示窗体
      this.polygon[1].on('mouseover',function(e){
        console.log("入入入入入！")
        var info = [];
        info.push("<div><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
        info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>高德软件</b>");
        info.push("电话 : 010-84107000   邮编 : 100102");
        info.push("地址 :polygon[1]</div></div>");
        var infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        })
        infoWindow.open(map, [120.09319,33.322264]);
      });
      //鼠标移出警务区polygon[1]后关闭窗体
      this.polygon[1].on('mouseout',function(e){
        console.log("出出")
        var info = [];
        var infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        })
        infoWindow.open(map, [120.09319,33.322264]);
      });
      //鼠标进入警务区polygon[2]后显示窗体
      this.polygon[2].on('mouseover',function(e){
        console.log("入入入入入！")
        var info = [];
        info.push("<div><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
        info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>高德软件</b>");
        info.push("电话 : 010-84107000   邮编 : 100102");
        info.push("地址 :polygon[2]</div></div>");
        var infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        })
        infoWindow.open(map, [120.094098,33.297648]);
      });
      //鼠标移出警务区polygon[2]后关闭窗体
      this.polygon[2].on('mouseout',function(e){
        console.log("出出")
        var info = [];
        var infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        })
        infoWindow.open(map, [120.094098,33.297648]);
      });
      //鼠标进入警务区polygon[3]后显示窗体
      this.polygon[3].on('mouseover',function(e){
        console.log("入入入入入！")
        var info = [];
        info.push("<div><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
        info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>高德软件</b>");
        info.push("电话 : 010-84107000   邮编 : 100102");
        info.push("地址 :polygon[3]</div></div>");
        var infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        })
        infoWindow.open(map, [120.058032,33.296882]);
      });
      //鼠标移出警务区polygon[3]后关闭窗体
      this.polygon[3].on('mouseout',function(e){
        console.log("出出")
        var info = [];
        var infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        })
        infoWindow.open(map, [120.058032,33.296882]);
      });
      //鼠标进入警务区polygon[4]后显示窗体
      this.polygon[4].on('mouseover',function(e){
        console.log("入入入入入！")
        var info = [];
        info.push("<div><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
        info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>高德软件</b>");
        info.push("电话 : 010-84107000   邮编 : 100102");
        info.push("地址 :polygon[4]</div></div>");
        var infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        })
        infoWindow.open(map, [120.059861,33.321828]);
      });
      //鼠标移出警务区polygon[4]后关闭窗体
      this.polygon[4].on('mouseout',function(e){
        console.log("出出")
        var info = [];
        var infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        })
        infoWindow.open(map, [120.059861,33.321828]);
      });
      //鼠标进入警务区polygon[5]后显示窗体
      this.polygon[5].on('mouseover',function(e){
        console.log("入入入入入！")
        var info = [];
        info.push("<div><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
        info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>高德软件</b>");
        info.push("电话 : 010-84107000   邮编 : 100102");
        info.push("地址 :polygon[5]</div></div>");
        var infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        })
        infoWindow.open(map, [120.043135,33.317087]);
      });
      //鼠标移出警务区polygon[5]后关闭窗体
      this.polygon[5].on('mouseout',function(e){
        console.log("出出")
        var info = [];
        var infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        })
        infoWindow.open(map, [120.043135,33.317087]);
      });
                    
    },
    
    clickOn () {
      this.polygon[0].on('mouserover',showInfoOver)
      this.polygon[0].on('mouseout',showInfoOut)
      // this.polygon.polygon0.on('click',showInfoP)
      // polygon1.on('click',showInfoP)      
    },
    clickOff () {
      polygon0.off('click',this.showInfoP)
      polygon1.off('click',this.showInfoP) 
    },
    showInfoP () {
      console.log('hhhhhhhh click this')
    },
    resizeHandle(){
      this.myChart.resize();
      this.myColumnarChart.resize();
      this.myHabbitChart.resize();   
    },
    getWeather(){
				let arr = []
				let api = "https://www.tianqiapi.com/api/?version=v1&appid=[12419927]&appsecret=[mjdd4C4l]&city=盐城";
				this.$http.get(api).then(res => {
          console.log(res.data)
          console.log(res.data.data[0])
          this.weather_data = res.data
          this.weather_data_0 = res.data.data[0]
        }).catch(() => {
          console.log("error")
        })
    },
  },
};
</script>

<style lang="scss" scoped>
  .top_logo {
    height: 50%;
    width: 100%;
  }
  .inner {
    height: 190px;
    position: static;
    top: 5px;
    right:  5px;
    bottom: 5px;
    left: 5px;    
  }
  .amap-demo {
    height: 100%;
    width: 100%;
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
