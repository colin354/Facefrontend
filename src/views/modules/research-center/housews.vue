<template>
<d2-container>
<el-row :gutter="20">
    <el-row :gutter="18">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <img v-for="(img,index) in imgs" :key="index"
              style="width: 60px; height: 60px"
              :src="img">
            <br>
          </el-card>
        </div>
    </el-row>  
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>实时抓拍预警</span>
              <el-button style="float: right; padding: 3px 0" type="text" >
                <router-link :to="{name:'index'}">
                  更多
                </router-link>
              </el-button>
            </div>
            <el-row>
              <el-table
                size="mini"
                :data="warning_info"
                :row-class-name="tableRowClassName"
                style="width: 100%">
                <el-table-column
                  prop="cameraName"
                  label="预警探头">
                </el-table-column>              
                <el-table-column
                  prop="datetime"
                  label="时间">
                </el-table-column>
                <el-table-column
                  prop="color"
                  label="级别">
                  <template slot-scope="scope">
                    <el-tag
                      :type="scope.row.color === 3 ? 'danger' : 'primary'"
                      disable-transitions>{{scope.row.color}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="imgurl"
                  label="抓拍图像">
                    <template  slot-scope="scope">
                      <el-popover
                        placement="right"
                        title=""
                        trigger="hover">
                        <img :src="scope.row.imgurl" />
                        <img slot="reference" :src="scope.row.imgurl" :alt="scope.row.imgurl" style="max-height: 60px;max-width: 60px">
                      </el-popover>                      
                      <!-- <img :src="scope.row.imgurl" width="70" height="70"> -->
                    </template>
                </el-table-column>
                <el-table-column
                  prop="message"
                  label="预警信息">
                </el-table-column>
              </el-table>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <!-- <el-col :span="6">
        <el-row>
          <div id="c1"></div>
        </el-row>
        <el-row>
          <div id="c2"></div>
        </el-row>
      </el-col> -->
    </el-row>
</el-row>
</d2-container>
</template>

<script>
import { cookieGet } from '@/common/cookie'
// import mixinViewModule from '@/mixins/view-module'
import Liveplayer from '@/components/videoplayer/liveplayer';
import '@/assets/h5splayer.js'
import { H5siOS,H5sPlayerCreate } from '@/assets/h5splayerhelper.js'
import G2 from '@antv/g2'
export default {
  // mixins: [ mixinViewModule ],
  components: {
    'v-liveplayer': Liveplayer
  }, 
  data () {
    return {
      webSocket: null,
      url: 'ws://172.16.3.115:9988/ws/chat/',
      imgs: [], //存放固定数目的照片
      streamList: [],
      warning_info: [],
      defaultProps: {},
      ws_data: {
        text: '',
        imgurl: ''
      },
      dataForm: {
        map_location: 'GETLOCATION'
      }
    }
  },
  created () {
    this.initSocket('001')
  },
  mounted () {   
    // this.drawchart()
    const e = document.createEvent('Event')
    e.initEvent('resize', true, true)
    window.dispatchEvent(e)    
    //本可以共用view-module.js中的get请求,但界面必须手动刷新才能发送get请求,所以在本组件重新写了get请求
    this.$axios.get(`/sys/camera_pedestrian_ws?token=${cookieGet('token')}`, { params:{ map_location:'GETLOCATION' } })
      .then(res => {
        this.streamList = res.streamList
        console.log('-----mmmmount------')
        // console.log((this.streamList)[1].children[0])
        // this.handleNodeClick((this.streamList)[1].children[0])
      })
      .catch(() => {
        console.log('error')
      })
  },

  destroyed () {
    this.webSocket.close()
  },
  computed: {
    count () {
      return this.$store.state.rtc
    }
  },
  methods: {
    initSocket (token) {
      let ws_url = `${this.url}` + token + '/'
      this.webSocket = new WebSocket(ws_url)
      this.webSocket.onopen = this.webSocketOnOpen
      this.webSocket.onclose = this.webSocketOnClose
      this.webSocket.onmessage = this.webSocketOnMessage
      this.webSocket.onerror = this.webSocketOnError
    },
    // 建立连接成功后的状态
    webSocketOnOpen () {
      console.log('websocket连接成功');
    },
    // 获取到后台消息的事件，操作数据的代码在onmessage中书写
    webSocketOnMessage (res) {
      // res就是后台实时传过来的数据
      console.log('this is for ----------')
      console.log(this.ws_data)
      let resData = JSON.parse(res.data)
      console.log(resData)
      console.log(resData.warning_info)
      this.ws_data.text = resData.message
      this.ws_data.imgurl = resData.imgurl
      this.ws_data.faceurl = resData.faceurl
      if (Object.keys(resData).length !== 0) {
        this.ws_data.warning_info = resData
        console.log('----mdd----')
        console.log(this.ws_data.warning_info)
        if (this.warning_info.length >= 5) {
          this.warning_info.shift() //删除数组第一个元素
          this.warning_info.push(this.ws_data.warning_info) //向数组末尾添加一个元素
        } else {
          this.warning_info.push(this.ws_data.warning_info) //向数组末尾添加一个元素
        }
      }
      if (this.imgs.length >= 9) {
        this.imgs.shift() //删除数组第一个元素
        this.imgs.push(this.ws_data.imgurl) //向数组末尾添加一个元素
      } else {
        this.imgs.push(this.ws_data.imgurl) //向数组末尾添加一个元素
      }
    },
    // 关闭连接
    webSocketOnClose(e) {
      console.log('websocket连接已关闭',e);
    },
    //连接失败的事件
    webSocketOnError(res) {
      console.log('websocket连接失败')
      // 打印失败的数据
      console.log(res)
    },

    PlayVideo (token) {
      this.$refs.myvideo.PlayVideo(token);
    },
    tableRowClassName ({row, rowIndex}) {
      console.log(row.color)
      if (rowIndex === 4)
        return 'new-row'      
      if (row.color === 0) {
        console.log('=====0')
        return ''
      } else if (row.color === 1) {
        console.log('=====1')
        return 'target-row'
      } else if (row.color === 2) {
        console.log('=====2')
        return 'stranger-row'
      }

      return ''
    },
    drawpointchart () {
      const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
      // Step 1: 创建 Chart 对象
      const chart = new G2.Chart({
        container: 'c1', // 指定图表容器 ID
        forceFit: true, // 图表跟随图表容器宽度变化
        height: 250, // 指定图表高度
      });
      console.log('-----chaaart-----')
      console.log(chart)

      // Step 2: 载入数据源
      chart.source(data);
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart
        .interval()
        .position('genre*sold')
        .color('genre');
      // Step 4: 渲染图表
      chart.render();
    },
    drawchart () {
      const { Global } = G2;
      const colorMap = {
        Asia: Global.colors[0],
        Americas: Global.colors[1],
        Europe: Global.colors[2],
        Oceania: Global.colors[3]
      };

      this.$http.get('https:/antv-g2.gitee.io/zh/examples/data/bubble.json')
        // .then(res => JSON.parse(res))
        .then(res => {
          console.log('----ddate----')
          console.log(res)
          const data = res
          const chart = new G2.Chart({
            container: 'c1',
            forceFit: true,
            height: 500
          });
          chart.source(data);
        // 为各个字段设置别名
          chart.scale({
            LifeExpectancy: {
              alias: '人均寿命（年）'
            },
            Population: {
              type: 'pow',
              alias: '人口总数'
            },
            GDP: {
              alias: '人均国内生产总值($)'
            },
            Country: {
              alias: '国家/地区'
            }
          });
          chart.axis('GDP', {
            label: {
              formatter(value) {
                return (value / 1000).toFixed(0) + 'k';
              } // 格式化坐标轴的显示
            }
          });
          chart.tooltip({
            showTitle: false // 不显示默认标题
          });
          chart.legend('Population', false); // 该图表默认会生成多个图例，设置不展示 Population 和 Country 两个维度的图例
          chart.point().position('GDP*LifeExpectancy')
          .size('Population', [ 4, 65 ])
          .color('continent', val => {
            return colorMap[val];
          })
          .shape('circle')
          .tooltip('Country*Population*GDP*LifeExpectancy')
          .style('continent', {
            lineWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 0.3,
            opacity: 0.65,
            stroke: val => {
              return colorMap[val];
            }
          });
          chart.render();
        });
    },    
    handleClick () {
      // location.reload()
      if (this.webSocket) {
        this.webSocket.close()
      }
      this.initSocket('001')
      this.$axios.get(`/sys/camera_pedestrian_ws?token=${cookieGet('token')}`,{ c_token:'None',c_id:'None' })
        .then(res => {
          console.log('handle------Node-----Click-------')
        })
        .catch(() => {
          console.log('error')
        })
    },
    handleNodeClick (val) {
      console.log('----点击事件-----00------')
      console.log(val)
      var tempId = val.id
      if (tempId < 10000) {
        this.PlayVideo(val.token)
        // this.initSocket(val.token)
        if (this.webSocket) {
          this.webSocket.close()
        }
        this.ws_data.imgurl = ''
        this.ws_data.faceurl = ''
        this.initSocket(val.token)
        this.$axios.post(`/sys/camerareal?token=${cookieGet('token')}`,{ c_token:val.token,c_id:val.id })
          .then(res => {
            console.log('handle------Node-----Click')
          })
          .catch(() => {
            console.log('error')
          })
        this.$axios.get(`/api/warningHistory?token=${cookieGet('token')}`, { params:{c_token: val.token }})
          .then(res => {
            this.imgs = []
            this.warning_info = res.list
            console.log(this.warning_info)
          })
          .catch(() => {
            console.log('error')
          })
      }
    }
  }
}
</script>

<style lang="scss">
.top_logo {
  height: 30%;
  width: 100%;
}
.el-table .target-row {
  background: oldlace;
}

.el-table .stranger-row {
  background: #f54f4f3d;
}

.el-table .new-row {
  background: #110df13d;
}

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