<template>
  <div class="d2-demo-article">
    <div v-if="!long" class="d2-demo-article__control">
      <el-switch
        v-model="isLong"
        @change="handleChange"
        active-text="设置目标行人"
        inactive-text="不设置"/>
    </div>
    <div v-show="isLong" style="height:150px; overflow:auto">
      <el-checkbox-group v-model="faceIds" @change="handleSelect">
        <el-checkbox v-for="image in imgList" :label="image.userid_id" :key="image.userid_id" >
          <el-image :src="image.imgurl" style="width: 100px; height: 100px"></el-image>
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import { cookieGet } from '@/common/cookie'
import sourceLong from '../md/long.md'
import sourceShort from '../md/short.md'
export default {
  props: {
    // 指定为长文本
    long: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      sourceLong,
      sourceShort,
      isLong: false,
      imgArray: [],
      imgList: [],
      faceIds: []
    }
  },
  created () {
    this.isLong = this.long
  },
  methods: {
    handleSelect(val){
      if(val){
        this.$emit('checked-person',val)
      }
    },
    handleChange(val){
      if(val){
      this.$axios.get(`/api/face/image?token=${cookieGet('token')}`)
        .then(res => {
          this.imgList = res.imgList
          this.faceIds = []
        })
        .catch(() => {
          console.log("error")
        })
      }else{
        this.$emit('checked-person',null)
      }
    },    
  }
}
</script>

<style lang="scss" scoped>
.d2-demo-article {
  transition: opacity .3s;
  .d2-demo-article__control {
    padding: 0px 16px;
    margin-bottom: 5px;
    box-sizing: border-box;
    border-radius: 2px;
    background-color: #f4f4f5;
  }
}
</style>
