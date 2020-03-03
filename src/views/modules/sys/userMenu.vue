<template>
  <div class="amap-page-container">
    <el-amap
      :plugin="plugin"
      :amap-manager="amapManager"
      :zoom="zoom"
      :center="center"
      vid="amapDemo"
      ref="reds"
      style="width:100vw;height:80vh"
      :events="events"
    ></el-amap>
  </div>
</template>

<script>
import { AMapManager } from "vue-amap";
let amapManager = new AMapManager();
var map = amapManager.getMap();
export default {
  data() {
    let _obj = this;
    return {
      amapManager,
      center: [120.093585,33.313408],//盐城
      // center:[116.303843, 39.983412],//北京
      plugin: [
        {
          pName: "Scale",
          events: {
            init(instance) {
              console.log(instance);
            }
          }
        }
      ],
      zoom: 18,
      events: {
        init(o) {
          _obj.createMap();
        }
      }
    };
  },
  created() {
    // 配置
  },
  mounted() {},
  methods: {
    createMap() {　　　　
      let o = amapManager.getMap();
      var icon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(32, 46),
        // 图标的取图地址
        image:
          "./image/backup.png",
        // 图标所用图片大小
        imageSize: new AMap.Size(32, 46)
      });
      // var labelContent = "<span>1</span>";
      // var labelOffset = new AMap.Pixel(8, 7);
      // var marker = new AMap.Marker({
      //   icon: icon,
      //   position: [116.303843, 39.983412],
      //   offset: new AMap.Pixel(-10, -46),
      //   title: 1,
      //   text: 1,
      //   label: {
      //     content: labelContent,
      //     offset: labelOffset
      //   }
      // });
      // marker.setMap(o);
      // var labelContent = "<span>2</span>";
      // var labelOffset = new AMap.Pixel(8, 7);
      // var marker2 = new AMap.Marker({
      //   icon: icon,
      //   anchor: "center", //设置锚点
      //   position: [116.321354, 39.896436],
      //   offset: new AMap.Pixel(-10, -28),
      //   title: 2,
      //   clickable: true,
      //   bubble: true,
      //   label: {
      //     content: labelContent,
      //     offset: labelOffset
      //   }
      // });
      // marker2.setMap(o);


      // 步行路线
      AMap.service('AMap.Walking',function(){
        //步行导航
        var walking = new AMap.Walking({
          map: o,
          // panel: "panel"
          hidMarkers:true,
          isOutline: true,
          // outlineColor: "red",
        });
         var path = [];
         path.push({ lnglat: [120.093429,33.312951] }); //盐城起点
        //  path.push({ lnglat: [120.094148,33.313323] }); //盐城途径
         path.push({ lnglat: [120.095505,33.312745] }); //盐城终点
         // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
        // walking.search(path, function(status, result) {
         walking.search([120.094153,33.313319],[120.095028,33.313592], function(status, result) {
            if (status === 'complete') {
                log.success('绘制步行路线完成')
            } else {
                log.error('步行路线数据查询失败' + result)
            } 
        });
        //  walking.search([120.094148,33.313323],[120.095505,33.312745], function(status, result) {
        //     if (status === 'complete') {
        //         log.success('绘制步行路线完成')
        //     } else {
        //         log.error('步行路线数据查询失败' + result)
        //     } 
        // });
      });
      AMap.service('AMap.Walking',function(){
        //步行导航
        var walking = new AMap.Walking({
          map: o,
          // panel: "panel"
          hidMarkers:true,
          isOutline: true,
          // outlineColor: "red",
        });
         var path = [];
         path.push({ lnglat: [120.093429,33.312951] }); //盐城起点
        //  path.push({ lnglat: [120.094148,33.313323] }); //盐城途径
         path.push({ lnglat: [120.095505,33.312745] }); //盐城终点
         // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
        // walking.search(path, function(status, result) { 
         walking.search([120.094121,33.312391],[120.096294,33.312897], function(status, result) {
            if (status === 'complete') {
                log.success('绘制步行路线完成')
            } else {
                log.error('步行路线数据查询失败' + result)
            } 
        });
      });
      // AMap.service('AMap.TruckDriving',function(){
      //   var truckDriving = new AMap.TruckDriving({
      //     map: o,
      //     policy: 0, // 规划策略
      //     size: 1, // 车型大小
      //     width: 2.5, // 宽度
      //     height: 2, // 高度
      //     load: 1, // 载重
      //     weight: 12, // 自重
      //     axlesNum: 2, // 轴数
      //     province: "京", // 车辆牌照省份
      //     isOutline: true,
      //     outlineColor: "#ffeeee",
      //     outlineColor: "red",
      //     hideMarkers: true
      //   });
      //   var path = [];
      //   path.push({ lnglat: [120.093429,33.312951] }); //盐城起点
      //   path.push({ lnglat: [120.0941,33.312404] }); //盐城途径
      //   path.push({ lnglat: [120.095505,33.312745] }); //盐城终点
      //   // path.push({ lnglat: [116.303843, 39.983412] }); //起点
      //   // path.push({ lnglat: [116.321354, 39.896436] }); //途径
      //   // path.push({ lnglat: [116.407012, 39.992093] }); //终点

      //   truckDriving.search(path, function(status, result) {
      //     if (status === "complete") {
      //       console.log("获取货车规划数据成功");
      //     } else {
      //       console.log("获取货车规划数据失败：" + result);
      //     }
      //     // searchResult即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
      //   });
      // });
      
      // AMap.event.addListener(marker, "click", function(e) {
      //   debugger;
      //   //得到的数据
      // });
      // AMap.event.addListener(marker2, "click", function(e) {
      //   debugger;
      //   //得到的数据
      // });
    }
  }
};
</script>
<style>
.amap-marker-label {
  border: 0px;
  background: rgba(255, 255, 255, 0);
  color: #fff;
  font-size: 17px;
  font-weight: 550;
  text-align: center;
}
</style>