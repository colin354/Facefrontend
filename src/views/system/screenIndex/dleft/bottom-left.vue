<template>
	<databox
    title="监控信息"
    :dheight="260"
    :icon="'account'"
    align="center"
  >
		<div style="width:100%; height:95%; float:left;margin-top:1px;" >
			<div id="barChart_t" class="barTable"></div>
		</div>
			<!-- <p style="color:#61d2f7;font-weight:bold;font-size:1.7rem;">摄像头类型&nbsp;&nbsp;&nbsp;&nbsp;
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数量(个)</p>&nbsp;
			<p style="color:#ffffff;font-size:1.7rem;">接入摄像头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共计200</p>
			<p style="color:#ffffff;font-size:1.7rem;">200W像素摄像头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;62</p>
			<p style="color:#ffffff;font-size:1.7rem;">400W像素摄像头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;91</p>
			<p style="color:#ffffff;font-size:1.7rem;">人脸识别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;93路</p>
			<p style="color:#ffffff;font-size:1.7rem;">车牌识别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;89路</p>		 -->
  <!-- <el-button type="primary">bottom-left</el-button>
  <message :data="bottomMessage"></message>
  <nodata :nodata="$t('data.dright.index.messege')" v-if="bottomNoMessage"></nodata> -->
	</databox>
</template>
<script>
import D2PageCover from '../../../system/index/components/d2-page-cover'
import { cookieGet } from '@/common/cookie'
export default {
	components: {
    D2PageCover,
  },
	props:{
		bottomMessage:[],
		bottomNoMessage:false,
		required:true,
	},
		data(){
    return{
      myBarChart:null,
    }
	},
	mounted(){
    this.barChart();
  },
	methods:{
		resizeHandle(){
      this.myBarChart.resize()
		},
		barChart(){
        this.myBarChart = this.$echarts.init(document.getElementById("barChart_t"));
        this.myBarChart.setOption({
						color:['#3398DB'],
            tooltip : {
							trigger: 'axis',
							axisPointer: {            // 坐标轴指示器，坐标轴触发有效
									type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
            },
            grid:{
							left:'3%',
							right:'4%',
							bottom:'3%',
							containLabel:true
						},
						xAxis:[
							{
								type:'category',
								data: ['接入摄像头', '200W像素', '400W像素', '人脸识别', '车牌识别'],
								axisTick: {
									alignWithLabel: true
								},
								axisLabel : {
									textStyle: { //改变刻度字体样式
										fontSize: 13,//字体大小
										color: '#61d2f7'
									}
								},
								splitLine:{
									show:false
								},
							}
						],
						yAxis:[{
							type:'value',							
							splitLine:{
								show:false
							},
							axisLabel : {
								textStyle: { //改变刻度字体样式
									fontSize: 13,//字体大小
									color: '#61d2f7'
								}
							},
						}],
            series : [
                {
									name: '直接访问',
									type: 'bar',
									barWidth : '49%',
		// 							itemStyle: {   
		// 								//通常情况下：
		// 								normal:{  
		// 　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
		// 										color: function (params){
		// 												var colorList = ['#D9FFFF','#D9FFFF','#D9FFFF','#D9FFFF','#D9FFFF','#D9FFFF','#D9FFFF'];
		// 												return colorList[params.dataIndex];
		// 										}
		// 								},
		// 							//鼠标悬停时：
		// 							emphasis: {
		// 									shadowBlur: 10,
		// 									shadowOffsetX: 0,
		// 									shadowColor: 'rgba(0, 0, 0, 0.5)'
		// 									}
		// 							},
									areaStyle: {
										normal: {
											color: '#00E3E3' //改变区域颜色
											}
										},
									itemStyle : { 
										normal : { 
											color:'#00E3E3', //改变折线点的颜色
											lineStyle:{ 
												color:'#00E3E3' //改变折线颜色
											} 
										} 
									},
									data: [200,62,91,94,89],
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

<style scoped lang="scss">
.right-content {
  width: 100%;
  height: 100%;
  .top-box {
    padding-bottom: 40px;
    .messege {
      padding-top: 20px;
    }
  }
}
.barTable{
    margin-top: 4px;
    width:100%; 
    height:100%;
    float:left;  
    // border:2px solid  #F0F0F0;
    box-sizing: border-box; 
  }
</style>
