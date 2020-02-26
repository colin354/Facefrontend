<template>
  <div class="d2-demo-article">
    <div v-if="!long" class="d2-demo-article__control">
      <el-switch
        v-model="isLong"
        @change="handleChange"
        active-text="设置目标车辆"
        inactive-text="不设置"/>
    </div>
    <div v-show="isLong" style="height:150px; overflow:auto">
      <el-checkbox-group v-model="carIds" @change="handleSelect">
        <el-checkbox v-for="plate in plateList" :label="plate.plate_id" :key="plate.id" >

        </el-checkbox>
      </el-checkbox-group>
      <el-pagination
        small
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    <!-- <el-pagination
      slot="footer"
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="limit"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="pageSizeChangeHandle"
      @current-change="pageCurrentChangeHandle">
    </el-pagination> -->
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
      plateList: [],
      imgArray: [],
      carIds: []
    }
  },
  created () {
    this.isLong = this.long
  },
  methods: {
    handleSelect(val){
      if(val){
        this.$emit('checked-car',val)
      }
    },    
    handleChange(val){
      if(val){
      this.$axios.get(`/sys/plate?token=${cookieGet('token')}`)
        .then(res => {
          this.plateList = res.list
          this.carIds = []
          console.log(this.carIds)
        })
        .catch(() => {
          console.log("error")
        })
      }else{
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
