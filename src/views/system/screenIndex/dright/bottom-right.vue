<template>
	<databox
	  title="综合分析"
	  :dheight="260"
	  :icon="'account'"
		align="center"
	>
		<div style="width:100%; height:100%;float:left" >
			<div id="radarChart_t" class="radarTable"></div>
		</div>
	  <!-- <el-button type="success" align="left">成功按钮</el-button> -->
	  <!-- <message :data="topMessage"></message>
    <nodata :nodata="$t('data.dright.index.messege')" v-if="topNoMessege"></nodata> -->
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
		topMessage:[],
		topNoMessege:false,
		required:true,
	},
	data(){
		return {
			myRadarChart:[],
		}
	},
	mounted(){
    this.radarChart();
  },
	methods:{
		resizeHandle(){
      this.myRadarChart.resize()
    },
		radarChart(){
      this.myRadarChart = this.$echarts.init(document.getElementById("radarChart_t"));
      this.myRadarChart.setOption({
          tooltip: {
					},
					radar:{
            // shape: 'circle',
            center: ['50%', '55%'], // 位置
						name: {
								textStyle: {
                    color: '#61d2f7',
                    fontsize: 15,
										// backgroundColor: '#999',
										borderRadius: 3,
										padding: [3, 5]
								}
            },
            splitArea : {
              show : true,   
              areaStyle : {
                color: ["#00FFFF"]  // 图表背景网格的颜色
                }
            },
						indicator: [
								{ name: '重点单位', max: 650},
								{ name: '人口信息', max: 760},
								{ name: '监控信息', max: 300},
								{ name: '警情信息', max: 380},
								{ name: '警力信息', max: 520},
							]
						},
						series: [{
								name: '预算 vs 开销（Budget vs spending）',
								type: 'radar',
								itemStyle: {
										emphasis: {
												// color: 各异,
												lineStyle: {
														width: 4
												}
										}
								},
								data: [
										{
												value: [830, 600, 280, 350, 500, 390],
												name: '预分配'
										},
										{
												value: [500, 540, 280, 310, 420, 610],
												name: '实际'
										},
								]
						}]
      });
      window.addEventListener("resize",this.resizeHandle)
    },
	}
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
.radarTable{
    margin-top: 4px;
    width:100%; 
    height:100%;
    float:left;  
    // border:2px solid  #F0F0F0;
    box-sizing: border-box; 
  }
</style>
