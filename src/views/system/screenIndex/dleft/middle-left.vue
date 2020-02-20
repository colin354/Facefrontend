<template>
	<databox
    title="人口详细信息"
    :dheight="260"
    :icon="'account'"
    align="center"
  >
		<div style="width:100%; height:95%; float:left;margin-top:1px;" >
			<div id="pieChart_t" class="pieTable"></div>
		</div>
  <!-- <el-button type="primary">middle-left</el-button>
  <message :data="middleMessage"></message>
  <nodata :nodata="$t('data.dright.index.messege')" v-if="middleNoMessage"></nodata> -->
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
		middleMessage:[],
		middleNoMessage:false,
		required:true,
	},
	data(){
    return{
      myPieChart:null,
    }
	},
	mounted(){
    this.pieChart();
  },
	methods:{
		resizeHandle(){
      this.myPieChart.resize()
		},
		pieChart(){
        this.myPieChart = this.$echarts.init(document.getElementById("pieChart_t"));
        this.myPieChart.setOption({
            // title : { text:'家庭用气'},
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
								orient:'vertical', // orient:'horizontal', //'vertical'
								textStyle:
									{
										fontSize: 13,//字体大小
										color: '#ffffff'//字体颜色
									},
								// right:'right',
                x: '65%',
                y: '52%',
                data: ['辖区实有(824.7万人)','户籍(721.6万人)','外来(502.71万人)']
            },
            series : [
                {
									name: '人口信息',
									type: 'pie',
									radius : '95%',
									center: ['44%', '49%'],
									// label:{
									// 	normal : {
									// 		// formatter: '{b}:{c}: ({d}%)',
									// 		textStyle : { fontWeight : 'normal', fontSize : 12}
									// 	}
									// },
									data:[
											{value:824.7, name:'辖区实有(824.7万人)',itemStyle:{color:'#4876FF'}},
											{value:721.6, name:'户籍(721.6万人)',itemStyle:{color:'#d3a4ff'}},
											{value:502.71, name:'外来(502.71万人)',itemStyle:{color:'#87CEFA'}},
									],
									emphasis:{
											itemStyle: {
											emphasis: {
													shadowBlur: 10,
													shadowOffsetX: 0,
													shadowColor: 'rgba(0, 0, 0, 0.5)'
											}
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
  .pieTable{
    margin-top: 4px;
    width:100%; 
    height:100%;
    float:left;  
    // border:2px solid  #F0F0F0;
    box-sizing: border-box; 
  }
</style>
