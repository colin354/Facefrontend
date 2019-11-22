<template>
  <d2-container class="page">
      <div style="width:100%; height:100%;">
        <div id="waterChart_t" class="table1" style="width:49%; height:48%; float:left;margin-right:5px;"></div>
        <div id="lightChart_t" class="table1" style="width:49%; height:48%; float:left;margin-right:5px;"></div>
        <div id="gasChart_t" class="table1" style="width:49%; height:48%; float:left;margin-right:5px;"></div>
        <div id="allChart_t" class="table1" style="width:49%; height:48%; float:left;margin-right:5px;">
          
        </div>
      </div>
  </d2-container>
</template>

<script>
import D2PageCover from '../../system/index/components/d2-page-cover'
import vueSeamless from 'vue-seamless-scroll'
// import {EleResize} from '../../../assets/js/esresize'
export default {
  name:'bottom',
  components: {
    D2PageCover,
    vueSeamless,
  },
  data(){
    return{
      myWaterChart:null,
      myLightChart:null,
      myGasChart:null,
      myAllChart:null,
      option: {
        step: 1,
        limitMoveNum: 3,
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 30
      },
      APIIpList: ['','','','','','','','']      
    }
  },
  computed:{
  },
  mounted(){
    this.waterChart();
    this.lightChart();
    this.gasChart();
    this.allChart();
  },
  methods:{
    resizeHandle(){
      this.myWaterChart.resize()
      this.myLightChart.resize()
      this.myGasChart.resize()
      this.myAllChart.resize()
    },
    allChart(){
        this.myAllChart = this.$echarts.init(document.getElementById('allChart_t'));
        this.myAllChart.setOption({
    title: {
        text: '汇文公馆12栋1203 周居住人数分析',
    },
    tooltip: {
        trigger: 'axis'
    },    
    legend: {
        data:['最高气温','最低气温']
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
        data: ['第一周', '第二周', '第三周', '第四周']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} （人）'
        }
    },
    series: [
        {
            name:'居住人口',
            type:'line',
            data:[1, 0, 3, 4],
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        },
    ]
})
        // window.addEventListener("resize",this.resizeHandle)      
    },
    waterChart(){
        this.myWaterChart = this.$echarts.init(document.getElementById('waterChart_t'));
        this.myWaterChart.setOption({
          title : {
              text:'汇文公馆12栋1203 周用电数据分析'
          },           
          xAxis: {
              type: 'category',
              data: ['第一周', '第二周', '第三周', '第四周']
          },
          yAxis: {
              type: 'value',
              axisLabel:{
                formatter:'{value}(度)'
              },
          },
          series: [{
              data: [10, 8, 78, 85],
              type: 'line',
              smooth:true
          }]
        })
        // window.addEventListener("resize",this.resizeHandle)
    },
    lightChart(){
        this.myLightChart = this.$echarts.init(document.getElementById('lightChart_t'));
        this.myLightChart.setOption({
          title : {
              text:'汇文公馆12栋1203 周用水数据分析'
          },           
          xAxis: {
              type: 'category',
              data: ['第一周', '第二周', '第三周', '第四周']
          },
          yAxis: {
              type: 'value',
              axisLabel:{
                formatter:'{value}(吨)'
              },
          },
          series: [{
              data: [1, 1, 5, 6],
              type: 'line',
              smooth:true
          }]
        })
        // window.addEventListener("resize",this.resizeHandle)
    },
    gasChart(){
        this.myGasChart = this.$echarts.init(document.getElementById('gasChart_t'));
        this.myGasChart.setOption({
          title : {
              text:'汇文公馆12栋1203 周用气数据分析'
          },           
          xAxis: {
              type: 'category',
              data: ['第一周', '第二周', '第三周', '第四周']
          },
          yAxis: {
              type: 'value',
              axisLabel:{
                formatter:'{value}(立方)'
              },
          },
          series: [{
              data: [0, 0, 0, 0],
              type: 'line',
              smooth:true
          }]
        })
        // window.addEventListener("resize",this.resizeHandle)
    },
  },
  destroyed(){
    window.removeEventListener("resize",this.resizeHandle)
  },
}
</script>

<style lang="scss" scoped>
  .page {
  .page__logo {
    width: 120px;
  }
  .page__btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: 0px;
    margin-bottom: 20px;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
    }
  }
  .font1{
    width:100%; 
    height:10%; 
    float:left; 
    border:2px solid #F0F0F0; 
    font-size:17px;
  }
  .table1{
    margin-top: 4px;
    width:100%; 
    height:100%;
    float:left;  
    border:2px solid  #F0F0F0;
    box-sizing: border-box; 
  }
}
  .box-card {
    width: 500px;
    height: 500px;
  }
</style>
