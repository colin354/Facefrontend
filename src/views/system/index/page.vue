<template>
  <d2-container class="page">
    <d2-page-cover>
      <img src="./image/logo@smarco.png">
    </d2-page-cover>  
  </d2-container>
</template>

<script>
import D2PageCover from './components/d2-page-cover'
export default {
  components: {
    D2PageCover
  },  
  data () {
    return {
      filename: __filename
    }
  },
  mounted () {
    // this.timeInterval = setInterval(() => {
    //   console.log("hahahahah")
    // }, 1000)
  }  
}
</script>

<style lang="scss" scoped>
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: 3em;
  }
.page {
  .logo {
    width: 120px;
  }
  .btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: 0px;
    margin-bottom: 20px;
    .btn-group__btn {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
      &.btn-group__btn--link {
        color: $color-primary;
      }
    }
  }
}
</style>
