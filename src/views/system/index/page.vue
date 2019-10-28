<template>
  <d2-container class="page">
      <!-- <div id="lineChart" :style="{width:'500px',height:'300px',float:'left',padding:'10px',border:'10px',}"></div>
      <div id="bubbleChart" :style="{width:'500px',height:'300px',float:'right',padding:'10px',border:'10px',}"></div> -->
      <div>
          <div style="width:32%; height:50%; float:left;margin-right:15px;">
            <div class="font1">人群类别</div>
            <div id="barChart" class="table1"></div>
          </div>

          <div style="width:32%; height:50%; float:left;margin-right:15px;" >
            <div class="font1">人停留时长</div>
            <div id="columnarChart" class="table1"></div>
          </div>

          <div style="width:32%; height:50%; float:left;margin-right:15px;" >
            <div class="font1">车辆类别</div>
            <div id="bar1Chart" class="table1"></div>
          </div>

          <div style="width:32%; height:50%; float:left;margin-top:23px;margin-right:15px;" >
            <div class="font1">当前车辆数</div>
            <div id="verticalChart"  class="table1"></div>
          </div>

          <div style="width:32%; height:50%; float:left;margin-top:23px;margin-right:15px;" >
            <div class="font1">人流高峰时段</div>
            <div id="numChart" class="table1"></div>
          </div>

          <div style="width:32%; height:50%; float:left;margin-top:23px;margin-right:15px;" >
            <div class="font1">访客喜好</div>
            <div id="habbitChart" class="table1"></div>
          </div>

      </div>
      <!-- <div id="parallelChart" :style="{width:'500px',height:'300px',float:'right',padding:'10px',border:'10px',}"></div> -->

    <!-- <d2-page-cover> -->     
      <!-- <img src="./image/logo@smarco.png"> -->
    <!-- </d2-page-cover> -->
  </d2-container>
</template>

<script>
import D2PageCover from './components/d2-page-cover'
export default {
  components: {
    D2PageCover,
  },
  data(){
    return{

    }
  },
  mounted(){
    this.barChart();
    this.columnarChart();
    this.bar1Chart();
    this.verticalChart();
    this.numChart();
    this.habbitChart();
  },
  methods:{    
    barChart(){
      let barChart = this.$echarts.init(document.getElementById("barChart"));
      barChart.setOption({
          // title: { text: "人群性质" },
          tooltip: {
            trigger: 'item',
            formatter: "{a}  <br/>  {b}:  {c} ({d}%)"
          },
          legend: {             
              orient:'vertical', // orient:'horizontal', //'vertical'
              // x:'center',
              // y: 'bottom',//'center'|'top'
              x: 390,
              y: 100,
              data:['陌生人','服务类人员','闲散人员','暂住人口','业主']
          },
          series: [
              {
                name:'人群分类',
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
                    {value:335, name:'陌生人',itemStyle:{color:'#7FFF00'}},
                    {value:310, name:'服务类人员',itemStyle:{color:'#4876FF'}},
                    {value:234, name:'闲散人员',itemStyle:{color:'#F7C885'}},
                    {value:135, name:'暂住人口',itemStyle:{color:'#F8A1A1'}},
                    {value:1548, name:'业主',itemStyle:{color:'#87CEFF'}}]
              }
          ]
      });
    },
    columnarChart(){
      let columnarChart = this.$echarts.init(document.getElementById("columnarChart"));             
      columnarChart.setOption({
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
                  data : ['10min', '30min', '2hour', '4hour', '6hour', '8hour', '8h以上'],
                  axisTick: {
                      alignWithLabel: true
                  }
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : [
              {
                  name:'直接访问',
                  type:'bar',
                  barWidth: '60%',
                  data:[10, 52, 200, 334, 390, 330, 220]
              }
          ]
      });
    },
    bar1Chart(){
      let bar1Chart = this.$echarts.init(document.getElementById("bar1Chart"));
      bar1Chart.setOption({
          // title: { text: "人群性质" },
          tooltip: {
            trigger: 'item',
            formatter: "{a}  <br/>  {b}:  {c} ({d}%)"
          },
          legend: {             
              orient:'vertical', // orient:'horizontal', //'vertical'
              // x:'center',
              // y: 'bottom',//'center'|'top'
              x: 390,
              y: 100,
              data:['业主车辆','服务类车辆','闲散车辆','暂住车辆','陌生车辆']
          },
          series: [
              {
                name:'车辆类别',
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
                    // {value:115, name:'陌生人',itemStyle:{color:'#48D1CC'}},
                    {value:2548, name:'业主车辆',itemStyle:{color:'#87CEFF'}},
                    {value:210, name:'服务类车辆',itemStyle:{color:'#4876FF'}},
                    {value:124, name:'闲散车辆',itemStyle:{color:'#F7C885'}},
                    {value:335, name:'暂住车辆',itemStyle:{color:'#F8A1A1'}},
                    {value:148, name:'陌生车辆',itemStyle:{color:'#7FFF00'}}]
              }
          ]
      });
    },
    verticalChart(){
      var category = ['业主', '服务类', '闲散', '暂住', '陌生', '临时', '其他'];
      var barData = [889, 122, 118, 481, 131, 213, 163];

      let verticalChart = this.$echarts.init(document.getElementById("verticalChart"));
      verticalChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
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
              // emphasis: { barBorderRadius: 7},
              normal: {
                  // barBorderRadius: 7,
                  color: this.$echarts.graphic.LinearGradient(
                      0, 0, 1, 0,
                      [ {offset: 0, color: '#00FFFF'}, {offset: 1, color: '#00FFFF'} ]
                  )
              }
            }
          }]
      })
    },
    numChart(){
      let numChart = this.$echarts.init(document.getElementById("numChart"));
      numChart.setOption({
          // title: { text: "人群性质" },
          tooltip: {
            trigger: 'item',
            formatter: "{a}  <br/>  {b}:  {c} ({d}%)"
          },
          legend: {             
              orient:'vertical', // orient:'horizontal', //'vertical'
              // x:'center',
              // y: 'bottom',//'center'|'top'
              x: 390,
              y: 100,
              data:['10:00-12:00','09:00-10:00','12:00-14:00','14:00-16:00','16:00-19:00']
          },
          series: [
              {
                name:'高峰',
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
                    // {value:115, name:'陌生人',itemStyle:{color:'#48D1CC'}},
                    {value:2148, name:'10:00-12:00',itemStyle:{color:'#87CEFF'}},
                    {value:310, name:'09:00-10:00',itemStyle:{color:'#4876FF'}},
                    {value:344, name:'12:00-14:00',itemStyle:{color:'#F7C885'}},
                    {value:545, name:'14:00-16:00',itemStyle:{color:'#F8A1A1'}},
                    {value:218, name:'16:00-19:00',itemStyle:{color:'#7FFF00'}}]
              }
          ]
      });
    },
    habbitChart(){
        let habbitChart = this.$echarts.init(document.getElementById("habbitChart"));
        habbitChart.setOption({
            title : {
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient:'vertical', // orient:'horizontal', //'vertical'
                x: 430,
                y: 100,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name: '来访时间',
                    type: 'pie',
                    radius : '81%',
                    center: ['39%', '49%'],
                    label:{
                      normal : {
                        // formatter: '{b}:{c}: ({d}%)',
                        textStyle : { fontWeight : 'normal', fontSize : 15}
                      }
                    },
                    data:[
                        {value:335, name:'周一',itemStyle:{color:'#4876FF'}},
                        {value:310, name:'周二',itemStyle:{color:'#F7C885'}},
                        {value:234, name:'周三',itemStyle:{color:'#F8A1A1'}},
                        {value:135, name:'周四',itemStyle:{color:'#7FFF00'}},
                        {value:1548, name:'周五',itemStyle:{color:'#87CEFF'}},
                        {value:1671, name:'周六',itemStyle:{color:'#6495ED'}},
                        {value:1740, name:'周日',itemStyle:{color:'#00CED1'}}

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
    },

  }
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
    // width:530px; 
    // height:35px; 
    width:100%; 
    height:10%; 
    float:left; 
    // padding:2px; 
    border:2px solid #F0F0F0; 
    font-size:17px;
    // margin-bottom:0;
    // margin-right:2px;
  }
  .table1{
    margin-top: 0;
    width:525px; 
    height:350px; 
    // width:100%; 
    // height:auto;
    float:left; 
    // padding:1px; 
    border:2px solid  #F0F0F0; 
    // margin: 10px;
    // padding:2px;
    // margin-top:0;
    // margin-right:2px;
  }
}
</style>
