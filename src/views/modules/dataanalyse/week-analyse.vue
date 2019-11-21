<template>
  <d2-container class="page">
      <div style="width:100%; height:100%;">
        <div id="waterChart_t" class="table1" style="width:49%; height:48%; float:left;margin-right:5px;"></div>
        <div id="lightChart_t" class="table1" style="width:49%; height:48%; float:left;margin-right:5px;"></div>
        <div id="gasChart_t" class="table1" style="width:49%; height:48%; float:left;margin-right:5px;"></div>
        <div class="table1" style="width:49%; height:48%; float:left;margin-right:5px;">
          <p>此户在10月份第三周有新住户入住，疑似2人，未有燃气数据可能小区未接入天然气，请信息采集人员前去确认</p>
        </div>
      </div>
  </d2-container>
</template>

<script>
import D2PageCover from '../../system/index/components/d2-page-cover'
// import {EleResize} from '../../../assets/js/esresize'
export default {
  name:'bottom',
  components: {
    D2PageCover,
  },
  data(){
    return{
      myWaterChart:null,
      myLightChart:null,
      myGasChart:null,
    }
  },
  computed:{
  },
  mounted(){
    this.waterChart();
    this.lightChart();
    this.gasChart()
  },
  methods:{
    resizeHandle(){
      this.myWaterChart.resize()
      this.myLightChart.resize()
      this.myGasChart.resize()
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
        window.addEventListener("resize",this.resizeHandle)
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
        window.addEventListener("resize",this.resizeHandle)
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
        window.addEventListener("resize",this.resizeHandle)
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
</style>
