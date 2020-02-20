<template>
	<databox
	  title="警力状况"
	  :dheight="260"
	  :icon="'account'"
		align="center"
	>
		<div style="width:100%; height:100%;float:left" >
			<div id="ringChart_t" class="ringTable"></div>
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
			myRingChart:[],
		}
	},
	mounted(){
    this.ringChart();
  },
	methods:{
		resizeHandle(){
      this.myRingChart.resize()
    },
		ringChart(){
      this.myRingChart = this.$echarts.init(document.getElementById("ringChart_t"));
      this.myRingChart.setOption({
          // title: { text: "家庭用电" },
          tooltip: {
            trigger: 'item',
            formatter: "{a}  <br/>  {b}:  {c} ({d}%)"
          },
          legend: {             
              orient:'vertical', // orient:'horizontal', //'vertical'
              x: '72%',
              y: '36%',
							data:['民警', '协警', '辅警', '巡逻警'],
							textStyle: { //改变刻度字体样式
									fontSize: 13,//字体大小
									color: '#ffffff'
              }
          },
          series: [
              {
                name:'区家庭用电量',
                type:'pie',
                radius: ['50%', '97%'],
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
                    {value:120, name:'民警',itemStyle:{color:'#87CEFF'}},
                    {value:89, name:'协警',itemStyle:{color:'#4876FF'}},
                    {value:234, name:'辅警',itemStyle:{color:'#F7C885'}},
                    {value:167, name:'巡逻警',itemStyle:{color:'#d3a4ff'}},
                    ]								
              }
          ]
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
.ringTable{
    margin-top: 4px;
    width:100%; 
    height:100%;
    float:left;  
    // border:2px solid  #F0F0F0;
    box-sizing: border-box; 
  }
</style>
