<template>
  <d2-container>
    <template slot="header">Page 2 header</template>
    <div class="echartsRight">
      <vueSeamless :data='APIIpList' :class-option="option">
          <p v-for="(item, index) in APIIpList" :key="index">{{item.createAt}}，{{index}}股票行情接口被IP地址{{item.ipAddress}}调用</p>
      </vueSeamless>
    </div>
  </d2-container>
</template>

<script>
import vueSeamless from 'vue-seamless-scroll'
export default {
  name: 'page2',
  components: {
    vueSeamless
  },
  data () {
    return {
      option: {
        step: 1,
        limitMoveNum: 9,
        openTouch: false,
        waitTime: 1,
        direction: 1,
        singleHeight: 30
      },
      APIIpList: ['','','','','','','','','','','','']
    }
  },  
}
</script>

<style lang="scss" scoped>
.echartsRight .rowup {
  -webkit-animation: 10s rowup linear infinite normal;
  animation: 10s rowup linear infinite normal;
  position: relative;
}

</style>