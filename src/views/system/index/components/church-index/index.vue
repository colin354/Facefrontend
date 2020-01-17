<template>
  <div>
    <el-row :gutter="18">
      <el-col :span="18">
        <el-row :gutter="18">
          <el-col>
            <div class="content-cont">             
              <databox
                title=""
                :dheight="700"
                :icon="'account'"
                :boxb="false"
              >
                <div id="map" style="height:700px;"></div>
              </databox>
            </div>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="6">
        <el-row :gutter="15">
          <el-col>
            <church-right :username="username"></church-right>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dnumber from "./dnumber";
import myevent from "./myevent";
import ChurchRight from "../../../screenData/dright/index"
import ChurchContent from "../../../screenData/dcontent/index"
export default {
  name: 'city-index',
  components: {
    dnumber,
    ChurchRight,
    ChurchContent
  },
  data () {
    return {
      username: 'test'
    }
  },
  beforeCreate () {

  },
  beforeMount () {
  },
  created () {
    this.getData()
    console.log('ccccccreateeee!!!')
  },
  mounted () {
    this.initMap()
    this.username = 'test'
  },
  methods: {
    initMap () {
      var map = new AMap.Map('map',{
        zoom: 17,
        center:[120.094829, 33.331663],
        mapStyle: 'amap://styles/fresh'
      })
    },
    getData (username) {
      this.username = 'test!'
    }
  }
};
</script>

<style lang="scss">
.content-cont {
  width: 100%;
  height: 100%;
  .top-box {
    display: flex;
    width: 100%;
    height: 110px;
    overflow: hidden;
    .left {
      width: 1/3 * 100%;
      background: rgba(35, 72, 135, 0.4);
    }
    .right {
      flex: 1;
      padding-left: 15px;
      .content {
        width: 100%;
        height: 100%;
        background: rgba(35, 72, 135, 0.4);

        .number-box {
          width: 50%;
          float: left;
        }
      }
    }
  }
  .content-box {
    padding-top: 30px;
  }
}
</style>
