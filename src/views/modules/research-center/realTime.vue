<template>
  <d2-container>
    <div style="width:100%; height:99%;float:left;background-color:#F2F6FC;margin:2px;">
        <!--左半边-->
        <div style="width:22%; height:100%;float:left;padding:3px;border:2px solid 	#FFFFFF">
          <el-tree
            :data="streamList"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick"
            class="bg">
          </el-tree>       
        </div>
        <!--right----右半-->
        <div class="right-side" style="width:78%; height:100%;float:left;background-color:#F2F6FC;padding:3px;border:2px solid #FFFFFF">

          <div class="one-row-first" style="height:55%; width:60%;float:left;background-color:#F2F6FC;padding:3px;border:2px solid #FFFFFF">
              <v-liveplayer ref="myvideo" h5id='1' ></v-liveplayer>
          </div>

          <div class="one-row-second" style="height:55%; width:40%;float:left;background-color:#F2F6FC;padding:3px;border:2px solid #FFFFFF">
              <p>人像抓拍记录</p>
              <el-image
                v-for="(item,index) in url" :key="index" 
                style="width: 100px; height: 100px; padding:1px;"
                :src="item"
                :fit="fit"></el-image>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p>车牌抓拍记录</p>
              <el-image
                v-for="(item,index) in car_url" :key="index" 
                style="width: 100px; height: 50px; padding:1px;"
                :src="item"
                :fit="fit"></el-image> 
          </div>

          <div class="two-row-first" style="height:45%; width:60%;float:left;padding:3px;background-color:#F2F6FC;border:2px solid #FFFFFF">
              <p>人像匹配列表</p>
              <!-- <el-button type="primary" @click="downloadExcel">导出表格</el-button> -->
              <el-image
                style="width: 100px; height: 100px; padding:1px;"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                :fit="fit"></el-image>
              <el-image
                style="width: 100px; height: 100px; padding:1px;"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                :fit="fit"></el-image>
                <!-- 测试表格下载 -->
                <!-- <el-table 
                  :data="tableData"
                  border
                  style="width: 100%">
                  <el-table-column type="selection" header-align="center" align="center" width="50"/>
                  <el-table-column prop="date" label="日期" width="100"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="140"></el-table-column>
                  <el-table-column prop="address" label="地址"></el-table-column>
                </el-table> -->

          </div>

          <div class="two-row-second" style="height:45%; width:40%;float:left;background-color:#F2F6FC;padding:3px;border:2px solid	#FFFFFF">
              <p>车牌匹配列表</p>
              <el-image
                style="width: 100px; height: 100px; padding:1px;"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                :fit="fit"></el-image>
          </div>

        </div>
    </div>

  </d2-container>
</template>

<script>
import { cookieGet } from '@/common/cookie'
// import mixinViewModule from '@/mixins/view-module'
import Liveplayer from '@/components/videoplayer/liveplayer';
import '@/assets/h5splayer.js'
import {H5siOS,H5sPlayerCreate} from '@/assets/h5splayerhelper.js'

export default {
  // mixins: [ mixinViewModule ],
  components: {
    'v-liveplayer': Liveplayer
  }, 
  data(){
    return{
      // mixinViewModuleOptions: {
      //   getDataListURL: `/sys/stream/page?token=${cookieGet('token')}`,
      //   getDataListIsPage: true,
      //   deleteURL: `/sys/stream?token=${cookieGet('token')}`,
      //   deleteIsBatch: true
      // },
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      url:[
        "http://10.2.155.139:8888/media/image/10/000063_0.jpg",
        "http://10.2.155.139:8888/media/image/10/000063_11.jpg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        ],
      car_url:[
        "http://10.2.155.139:8888/media/card_image/card1.jpg",
        "http://10.2.155.139:8888/media/card_image/card2.jpg",
        "http://10.2.155.139:8888/media/card_image/card3.jpg",
        "http://10.2.155.139:8888/media/card_image/card4.jpg"
      ],
      streamList:[],
      defaultProps: {}, 
      dataForm:{
        map_location:'GETLOCATION'
      },  
    }
  },
  mounted(){     //本可以共用view-module.js中的get请求,但界面必须手动刷新才能发送get请求,所以在本组件重新写了get请求
    this.$axios.get(`/sys/stream/page?token=${cookieGet('token')}`,{params:{map_location:'GETLOCATION'}})
      .then(res => {
        console.log("-----mounted---res.list-")
        console.log(res)
        this.streamList = res.streamList
        console.log(res.list) 
      })
      .catch(() => {
        console.log("error")
      })
  },
  computed:{
    count(){
        return this.$store.state.rtc;
        console.log("streamlist----")
        console.log(this.streamlist)
    }
  },
  methods:{
      PlayVideo() {
        console.log("---0---------------------0000")
        console.log(this.$refs.myvideo)
        this.$refs.myvideo.PlayVideo("token111");
      },
      handleNodeClick(val) {
        console.log("----点击事件-----00------")
        console.log(val)
        console.log("val中详细内容")
        this.PlayVideo()
      },

       //列表下载
      downloadExcel() {
        this.$confirm('确定下载列表文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.excelData = this.selectData //你要导出的数据list。
          this.export2Excel()
        }).catch(() => {

        });
      },
     //数据写入excel
      export2Excel() {
        var that = this;
        require.ensure([], () => {
          
          const { export_json_to_excel } = require('../../../excel/export2Excel'); //这里必须使用绝对路径，使用@/+存放export2Excel的路径
          // const tHeader = ['商品名称','商品货号','售价','库存','销量','分享',]; // 导出的表头名信息
          const tHeader = ['日期','姓名','地址',];
          console.log("确定后执行不-------")
          // const filterVal = ['name','number', 'salePrice','stocknums','salesnums','sharenums',]; // 导出的表头字段名，需要导出表格字段名
          const filterVal = ['date','name','address'];
          const list = this.tableData;
          const data = that.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '下载数据excel');// 导出的表格名称，根据需要自己命名
          console.log("执行完了-------")
        })
      },
      //格式转换，直接复制即可
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },



      
    }
}
</script>

<style lang="scss" scoped>
.bg{
  background-color:#F2F6FC;
}
.all{
    margin:0 auto;
    width: 760px;
}
.prompt {
    background: white;
    width: 100px;
    height: 30px;
    text-align: center;
  }
  .inner {
    position: absolute;
    top: 20px;
    right:  20px;
    bottom: 20px;
    left: 20px;
  }
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .zdg{
      background-color: #ffffff;
      height: 800px;
      overflow-y:auto
  }
  .content-header .breadcrumb {
      font-size: 1.5rem;
      position: static;
      float: left;
  }
  .content{
      min-height: 50px;
  }

  div[name='flex'] {
      display: flex;
      border-bottom: 0px !important;

  }

  div[name='flex']+[name='flex'] {
      border-left: 0px !important;
  }

  #videoPanel>div:nth-last-child(2) {
      border-bottom: 1px solid rgb(22, 22, 22) !important;
  }


  #videoPanel:-webkit-full-screen {
    background-color: rgb(73, 74, 75) !important;
    display: block;
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;
    top: 0;
    left: 0;
    padding: 0px;
    box-shadow: 0px 0px 50px #000;
  }


  #videoPanel:-moz-full-screen {
    background-color: rgb(73, 74, 75) !important;
    display: block;
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;
    top: 0;
    left: 0;
    padding: 0px;
    box-shadow: 0px 0px 50px #000;
  }

  div[name="flex"]:hover {
      /*background-color: #3c8dbc;*/
      cursor: pointer;
  }

  .videoClickColor {
      background-color: #616263 !important;
      opacity: 0.80;
  }

  .videoColor {
      background-color: rgb(73, 74, 75) !important;
  }

  .pre-scrollable {
      max-height: 480px;
      overflow-y: scroll;
  }

  .layout1x1 {
      background: url('../../../assets/h5s/img/layout/1x1.png') #f2f2f2;
      background-repeat: no-repeat;
      background-size: 32px 32px;
      color: #000;
      height: 32px;
      width: 32px;
  }
  .layout1x1:hover {
      background: url('../../../assets/h5s/img/layout/1x1.png') #7a7878;
      background-size: 32px 32px;
      color: rgb(187, 184, 184);
      height: 32px;
      width: 32px;
  }

  .layout2x2 {
      background: url('../../../assets/h5s/img/layout/2x2.png') #f2f2f2;
      background-repeat: no-repeat;
      background-size: 32px 32px;
      color: #000;
      height: 32px;
      width: 32px;
  }
  .layout2x2:hover {
      background: url('../../../assets/h5s/img/layout/2x2.png') #7a7878;
      background-size: 32px 32px;
      color: rgb(187, 184, 184);
      height: 32px;
      width: 32px;
  }

  .layout3x3 {
      background: url('../../../assets/h5s/img/layout/3x3.png') #f2f2f2;
      background-repeat: no-repeat;
      background-size: 32px 32px;
      color: #000;
      height: 32px;
      width: 32px;
  }
  .layout3x3:hover {
      background: url('../../../assets/h5s/img/layout/3x3.png') #7a7878;
      background-size: 32px 32px;
      color: rgb(187, 184, 184);
      height: 32px;
      width: 32px;
  }

  .layout4x4 {
      background: url('../../../assets/h5s/img/layout/4x4.png') #f2f2f2;
      background-repeat: no-repeat;
      background-size: 32px 32px;
      color: #000;
      height: 32px;
      width: 32px;
  }
  .layout4x4:hover {
      background: url('../../../assets/h5s/img/layout/4x4.png') #7a7878;
      background-size: 32px 32px;
      color: rgb(187, 184, 184);
      height: 32px;
      width: 32px;
  }

  .layoutfull {
      background: url('../../../assets/h5s/img/layout/fullscreen.png') #f2f2f2;
      background-repeat: no-repeat;
      background-size: 32px 32px;
      color: #000;
      height: 32px;
      width: 32px;
  }
  .layoutfull:hover {
      background: url('../../../assets/h5s/img/layout/fullscreen.png') #7a7878;
      background-size: 32px 32px;
      color: rgb(187, 184, 184);
      height: 32px;
      width: 32px;
  }
  .inner {
    position: right;
    top: 20px;
    right:  20px;
    bottom: 20px;
    left: 20px;
  }  
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item img {
    height: 400px;
    width: 400px
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
