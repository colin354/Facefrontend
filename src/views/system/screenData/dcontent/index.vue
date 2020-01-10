<template>
  <div class="content-cont">
      <databox
        :title="$t('data.content_map')"
        :dheight="610"
        :icon="'account'"
        :boxb="false"
      >
        <div id="map" style="height:550px;"></div>
      </databox>
        <div class="top-box">
      <div class="left">
        <dnumber
          :dheight="110"
          :title="$t('data.content.camera_num')"
          :size="'4rem'"
          :dnumber="numberData.pubRepos"
          :icon="'kucunguanli'"
          :color="'#ffff43'"
        >
        </dnumber>
      </div>
      <div class="right">
        <div class="content">
          <dnumber
            :dheight="110"
            :title="$t('data.content.target_people_num')"
            :size="'4rem'"
            :dnumber="numberData.followers"
            :icon="'jindu1'"
            :color="'#25f3e6'"
          >
          </dnumber>
          <dnumber
            :dheight="110"
            :title="$t('data.content.warning_num')"
            :size="'4rem'"
            :dnumber="numberData.following"
            :icon="'success'"
            :color="'#f84a4a'"
          >
          </dnumber>
        </div>
      </div>
    </div>      
  </div>
</template>

<script>
import dnumber from "./dnumber";
import myevent from "./myevent";
import { LINE_DATA } from "../test/data";
export default {
  components: {
    dnumber,
    myevent
  },
  props: {
    numberData: Object,
    username: String
  },
  mounted() {
    this.initMap();
  },
  data() {
    this.extend = {
      series: {
        label: {
          normal: {
            show: true
          }
        }
      },
      legend: {
        textStyle: { color: "#fff" },
        right: "6%"
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        }
      },
      xAxis: {
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        }
      }
    };

    return {
      chartData: LINE_DATA,
      myevent: [],
      noMyevent: false,
      repoData: {
        columns: ["reposName", "size", "forks"],
        rows: []
      },
      noRepoSize: false
    };
  },
  methods: {
    initMap () {
      var map = new AMap.Map('map', {
        zoom: 13,
        center:[120.076904, 33.32407],
        mapStyle: 'amap://styles/darkblue'
      })
    },    
    getData (username) {
    }
  },
  watch: {
    username (username) {
      if (username) {
        this.getData(username);
      }
    }
  }
};
</script>

<style scoped lang="scss">
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
