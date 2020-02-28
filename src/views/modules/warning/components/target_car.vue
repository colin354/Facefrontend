<template>
  <div class="d2-demo-article">
    <div class="d2-demo-article__control">
      <el-switch
        :disabled="disabled"
        v-model="isLong"
        @change="handleChange"
        active-text="设置目标车辆"
        inactive-text="不设置"/>
    </div>
    <div v-show="isLong" style="height:150px; overflow:auto">
      <el-checkbox-group v-model="carIds" @change="handleSelect">
        <!-- <el-checkbox v-for="plate in plateList" :label="plate.plate_id" :key="plate.id" >
        </el-checkbox> -->
        <el-checkbox v-for="image in plateList" :label="image.id" :key="image.id" >
          <el-tag type="info">{{image.plate_id}}</el-tag>
          <!-- <el-image :src="image.plate_url" style="width: 90px; height: 50px"></el-image> -->
        </el-checkbox>
      </el-checkbox-group>
      <el-pagination
        small
        slot="footer"
        layout="prev, pager, next"
        :total="total"
        @current-change="pageCurrentChangeHandle"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { cookieGet } from '@/common/cookie'
export default {
  props: {
    // 指定为长文本
    long: {
      type: Boolean,
      required: false,
      default: false
    },
    plate_id: {
      type: Array,
      required: false,
      default: []
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      isLong: false,
      total:0,
      plateList: [],
      imgArray: [],
      carIds: []
    }
  },
  created () {
    this.isLong = this.long
    this.disabled = false
  },
  watch: {
    plate_id: {
      handler (newVal, oldVal) {
        this.carIds = newVal
      }
    },
    long (val) {
      this.isLong = this.long
      if (this.long) {
        this.handleChange(true)
      }
    }
  },
  methods: {
    getDataList (page,limit) {
        this.$axios.get(`/sys/plate?token=${cookieGet('token')}`,{params:{page:page,limit:limit}})
          .then(res => {
            console.log(res.list)
            this.plateList = res.list
            this.total = res.count
          })
          .catch(() => {
            console.log("error")
          })
    },
    handleSelect (val){
      if(val){
        this.$emit('checked-car',val)
      }
    },    
    pageCurrentChangeHandle(val){
      this.getDataList(val,10)
    },
    handleChange(val){
      if(val){
        this.getDataList(1,10)
        // this.carIds = []
      }else{
        console.log('nono----no')
        this.$emit('checked-car',null)
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
