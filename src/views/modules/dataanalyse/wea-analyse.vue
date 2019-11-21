<template>
  <d2-container class="page">
      <!-- <router-link :to="{name:'week-analyse'}">
          <el-button type="primary" size="small">汇文公馆</el-button>
      </router-link> -->
      <router-link :to="{name:'week-analyse'}">
        <div style="width:100%; height:95%;">
            <div style="width:97.5%; height:55%;margin-right:5px;" >
              <div id="columnarChart_t" class="table1"></div>
            </div>

            <div style="width:32%; height:45%; float:left;margin-right:5px;" >
              <div id="verticalChart_t"  class="table1"></div>
            </div>

            <div style="width:33%; height:45%; float:left;margin-top:0;margin-right:5px;" >
              <div id="numChart_t" class="table1"></div>
            </div>

            <div style="width:32%; height:45%; float:left;margin-top:0;margin-right:5px;" >
              <div id="habbitChart_t" class="table1"></div>
            </div>
        </div>
      </router-link>
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
      dialogTableVisible: false,
      myChart:null,
      myColumnarChart:null,
      myBar1Chart:null,
      myVerticalChart:null,
      myNumChart:null,
      myHabbitChart:null,
    }
  },
  computed:{
  },
  mounted(){
    this.columnarChart();
    this.verticalChart();
    this.numChart();
    this.habbitChart();
  },
  methods:{
    resizeHandle(){
      this.myColumnarChart.resize()
      this.myVerticalChart.resize()
      this.myNumChart.resize()
      this.myHabbitChart.resize()
    },    
    columnarChart(){
      this.myColumnarChart = this.$echarts.init(document.getElementById("columnarChart_t"));             
      this.myColumnarChart.setOption({
          title:{text: '企业年用电量'},
          color: ['#87CEFF'],
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis : [
              {
                  type : 'category',
                  data : ['2003年', '2004年', '2005年', '2006年', '2007年', '2008年',
                    '2009年', '2010年', '2011年', '2012年', '2013年', '2014年',
                   '2015年','2016年','2017年','2018年','2019年'],
                  axisTick: {
                      alignWithLabel: true
                  }
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  axisLabel:{
                    formatter:'{value}(度)'
                  }
              }
          ],
          series : [
              {
                  name:'年用电量',
                  type:'bar',
                  barWidth: '30%',
                  data:[7000,7500,8000,8500,9000,9500,10000,15000,20000, 25321, 36456, 47456, 58000,69219,77556,84212,97881]
              }
          ]
      });
      window.addEventListener("resize",this.resizeHandle)
    },
    verticalChart(){
      var category = ['第一警务区', '第二警务区', '第三警务区', '第四警务区', '第五警务区', '第六警务区'];
      var barData = [12313, 6475, 10535, 3640, 5691, 1554];
      this.myVerticalChart = this.$echarts.init(document.getElementById("verticalChart_t"));
      this.myVerticalChart.setOption({
        title:{text: '家庭用水'},
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '6%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel:{
                formatter:'{value}(吨)'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: category,
            splitLine: {show: false},
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            offset: 10,
            nameTextStyle: {
                fontSize: 15
            }
        },
        series: [{
            name: '数量',
            type: 'bar',
            data: barData,
            barWidth: 22,
            barGap: 10,
            color:'#87CEFF',
            smooth: true,
            label: {
              normal: {
                show: true,
                position: 'right',
                offset: [5, -2],
                textStyle: { color: '#87CEFF',fontSize: 13 }
              }
            },
            itemStyle: {
              normal: {
                  color: this.$echarts.graphic.LinearGradient(
                      0, 0, 1, 0,
                      [ {offset: 0, color: '#00FFFF'}, {offset: 1, color: '#00FFFF'} ]
                  )
              }
            }
          }]
      })
      window.addEventListener("resize",this.resizeHandle)
    },
    numChart(){
      this.myNumChart = this.$echarts.init(document.getElementById("numChart_t"));
      this.myNumChart.setOption({
          title: { text: "家庭用电" },
          tooltip: {
            trigger: 'item',
            formatter: "{a}  <br/>  {b}:  {c} ({d}%)"
          },
          legend: {             
              orient:'vertical', // orient:'horizontal', //'vertical'
              x: '72%',
              y: '36%',
              data:['第一警务区', '第二警务区', '第三警务区', '第四警务区', '第五警务区', '第六警务区']
          },
          series: [
              {
                name:'区家庭用电量',
                type:'pie',
                radius: ['60%', '90%'],
                center:['35%', '49%'], //调整饼图所在位置
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: { normal: { show: false } },
                data:[
                    {value:61560, name:'第一警务区',itemStyle:{color:'#87CEFF'}},
                    {value:323750, name:'第二警务区',itemStyle:{color:'#4876FF'}},
                    {value:526750, name:'第三警务区',itemStyle:{color:'#F7C885'}},
                    {value:182000, name:'第四警务区',itemStyle:{color:'#F8A1A1'}},
                    {value:284550, name:'第五警务区',itemStyle:{color:'#104E8B'}},
                    {value:77700, name:'第六警务区',itemStyle:{color:'#8DB6CD'}}]
              }
          ]
      });
      window.addEventListener("resize",this.resizeHandle)
    },
    habbitChart(){
        this.myHabbitChart = this.$echarts.init(document.getElementById("habbitChart_t"));
        this.myHabbitChart.setOption({
            title : {
                text:'家庭用气'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient:'vertical', // orient:'horizontal', //'vertical'
                x: '80%',
                y: '36%',
                data: ['第一警务区','第二警务区','第三警务区','第四警务区','第五警务区','第六警务区']
            },
            series : [
                {
                    name: '用气情况',
                    type: 'pie',
                    radius : '81%',
                    center: ['45%', '49%'],
                    label:{
                      normal : {
                        // formatter: '{b}:{c}: ({d}%)',
                        textStyle : { fontWeight : 'normal', fontSize : 12}
                      }
                    },
                    data:[
                        {value:26385, name:'第一警务区',itemStyle:{color:'#87CEFF'}},
                        {value:13875, name:'第二警务区',itemStyle:{color:'#4876FF'}},
                        {value:22575, name:'第三警务区',itemStyle:{color:'#F7C885'}},
                        {value:7800, name:'第四警务区',itemStyle:{color:'#F8A1A1'}},
                        {value:12195, name:'第五警务区',itemStyle:{color:'#104E8B'}},
                        {value:3330, name:'第六警务区',itemStyle:{color:'#8DB6CD'}},
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
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
