<template>
  <div class="personal-box">
    <div class="personal-body">
      <div class="left">
        <div class="img">
          <img :style="{ background: 'url(' + personalData.img + ')' }" />
        </div>
      </div>
      <div class="right">
        <div class="name1">{{ personalData.username }}</div>

        <div class="year">
          <a class="date">{{ personalData.joinDate }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'personal',
  props: {
    personalData: Object
  }
}
</script>

<style scoped lang="scss">
@import "./index";
</style>
