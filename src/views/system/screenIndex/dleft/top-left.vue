<template>
	<databox
	  title="单位信息"
	  :dheight="260"
	  :icon="'account'"
		align="center"
	>
		<div sytle="height:100%;width:100%">
			<div style="float:left;border-radius:4px;height:45%;width:47%;box-shadow: 0px 0px 10px #4788fb;margin-left:5px;margin-top:15px">
					<p style="color:#61d2f7;font-weight:bold;font-size:1.7rem;">小区信息</p>
					<p style="color:#ffffff;font-size:1.7rem;">汇文公馆&nbsp;&nbsp;&nbsp;人口:3596(人)</p>
					<p style="color:#ffffff;font-size:1.7rem;">碧水佳苑&nbsp;&nbsp;&nbsp;人口:5017(人)</p>
			</div>
			<div style="float:right;border-radius:4px;height:45%;width:47%;box-shadow: 0px 0px 10px #4788fb;margin-right:5px;margin-top:15px">
				<p style="color:#61d2f7;font-weight:bold;font-size:1.7rem;">娱乐资讯</p>
				<p style="color:#ffffff;font-size:1.7rem;">汇文咖吧&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;纤梵瑜珈</p>
				<p style="color:#ffffff;font-size:1.7rem;">音乐餐吧&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;真好花艺</p>	
			</div>
			<div style="float:left;border-radius:4px;height:45%;width:47%;box-shadow: 0px 0px 10px #4788fb;margin-left:5px;margin-top:15px">
					<p style="color:#61d2f7;font-weight:bold;font-size:1.7rem;">公立机构</p>
					<!-- <p style="color:#ffffff;font-size:1.7rem;">江苏省海上风电研究院</p> -->
					<p style="color:#ffffff;font-size:1.7rem;">九小场所</p>
					<p style="color:#ffffff;font-size:1.7rem;">盐龙街道社区卫生中心</p>		
			</div>
			<div style="float:right;border-radius:4px;height:45%;width:47%;box-shadow: 0px 0px 10px #4788fb;margin-right:5px;margin-top:15px">
				<p style="color:#61d2f7;font-weight:bold;font-size:1.7rem;">企业快报</p>
				<p style="color:#ffffff;font-size:1.7rem;">盐城市高新区技术产业区</p>
				<p style="color:#ffffff;font-size:1.7rem;">南京吴良材眼镜盐城分店</p>	
			</div>
		</div>
	  <!-- <el-button type="success" align="left">成功按钮</el-button> -->
	  <!-- <message :data="topMessage"></message>
    <nodata :nodata="$t('data.dright.index.messege')" v-if="topNoMessege"></nodata> -->
	</databox>
</template>
<script>
import { cookieGet } from '@/common/cookie'
export default {
	props:{
		topMessage:[],
		topNoMessege:false,
		required:true,
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
</style>
