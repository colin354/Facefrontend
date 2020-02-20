<template>
	<databox
        title="警情信息"
        :dheight="260"
        :icon="'account'"
        align="center"
    >
		<div style="width:100%; height:90%;float:left;margin-top:1px;" >
			<div id="numChart_t" class="table2"></div>
		</div>
        <!-- <el-button type="primary">middle-left</el-button>
        <message :data="middleMessage"></message>
        <nodata :nodata="$t('data.dright.index.messege')" v-if="middleNoMessage"></nodata> -->
	</databox>
</template>
<script>
// import D2PageCover from '../../../system/index/components/d2-page-cover'
import D2PageCover from '../../../system/index/components/d2-page-cover'
import { cookieGet } from '@/common/cookie'
export default {
	components: {
        D2PageCover,
    },
	props:{
		topMessage:[],
		topNoMessage:false,
		required:true,
	},
	data(){
        return{
            myNumChart:null,
        }
	},
	mounted(){
        this.numChart();
    },
	methods:{
		resizeHandle(){
            this.myNumChart.resize()
		},
		numChart(){
            this.myNumChart = this.$echarts.init(document.getElementById("numChart_t"));
            this.myNumChart.setOption({
                // title : { text:'家庭用气'},
                tooltip : {
                    trigger: 'axis',
                },
                legend: {	
                    data: ['违法犯罪总警情','纠纷警情','群众求助','民事警情','其他警情'],
                    textStyle: { //改变刻度字体样式
                        fontSize: 13,//字体大小
                        color: '#61d2f7'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,

                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisLabel : {
                        textStyle: { //改变刻度字体样式
                            fontSize: 13,//字体大小
                            color: '#61d2f7'
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLabel : {
                        textStyle: { //改变刻度字体样式
                            fontSize: 13,//字体大小
                            color: '#61d2f7'
                        }
                    },
                    splitLine:{show:false}
                },
                series: [
                    {
                        name: '违法犯罪总警情',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {
                            normal: {
                                color: '#2C58A6' //改变区域颜色
                            }
                        },
                        itemStyle : { 
                            normal : { 
                                color:'#2C58A6', //改变折线点的颜色
                                lineStyle:{ 
                                    color:'#2C58A6' //改变折线颜色
                                } 
                            } 
                        },
                        data: [30, 86, 67, 57, 30, 60, 50],
                        smooth:true,
                        symbol:"none",
                    },
                    {
                        name: '纠纷警情',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {
                            normal: {
                                color: '#d3a4ff' //改变区域颜色
                            }
                        },
                        itemStyle : { 
                            normal : { 
                                color:'#d3a4ff', //改变折线点的颜色
                                lineStyle:{ 
                                    color:'#d3a4ff' //改变折线颜色
                                } 
                            } 
                        },
                        data: [105,125,62,130,59,80,90],
                        smooth:true,
                        symbol:"none",
                    },
                    {
                        name: '群众求助',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {
                            normal: {
                                color: '#00FFFF' //改变区域颜色
                            }
                        },
                        itemStyle : { 
                            normal : { 
                                color:'#00FFFF', //改变折线点的颜色
                                lineStyle:{ 
                                    color:'#00FFFF' //改变折线颜色
                                } 
                            } 
                        },
                        data: [30,42,11,94,65,100,110],
                        smooth:true,
                        symbol:"none",
                    },
                    {
                        name: '民事警情',
                        type: 'line',
                        stack: '总量',
                        data: [20,42,11,34,82,73,28],
                        areaStyle: {
                            normal: {
                                color: '#5CADAD' //改变区域颜色
                            }
                        },
                        itemStyle : { 
                            normal : { 
                                color:'#5CADAD', //改变折线点的颜色
                                lineStyle:{ 
                                    color:'#5CADAD' //改变折线颜色
                                } 
                            } 
                        },
                        smooth:true,
                        symbol:"none",
                    },                   
                ],
            });
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
  .table2{
    margin-top: 4px;
    width:100%; 
    height:100%;
    float:left;  
    // border:2px solid  #F0F0F0;
    box-sizing: border-box; 
  }
</style>
