<template>
  <div class="header">
    <div class="bg-header">
      <div class="t-title">
        <h3><img src="./img/jinghui.png">盐龙派出所智慧警务实战指挥系统</h3>
        <h4>中科睿芯视网膜城市安防系统</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dheader"
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 80px;
  padding: 0 20px;
  .bg-header {
    width: 100%;
    height: 80px;
    background: url('../../../../assets/screenData/data/title.png') no-repeat;
    background-size: 100% 100%;
    .t-title {
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: 2em;
      line-height: 80px;
      color: #fff;
    }
  }
}
</style>
