<template>
  <div class="d2-demo-article">
    <div class="d2-demo-article__control">
      <el-switch
        :disabled="disabled"
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
      <!-- <el-pagination
        small
        slot="footer"
        layout="prev, pager, next"
        :total="total"
        @current-change="pageCurrentChangeHandle"
        >
      </el-pagination> -->
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
    person_id: {
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
      imgArray: [],
      imgList: [],
      faceIds: []
    }
  },
  created () {
    this.isLong = this.long
    this.disabled = false
  },
  mounted () {
  },
  watch: {
    person_id: {
      handler (newVal, oldVal) {
        this.faceIds = newVal
      }
    },
    long (val) {
      this.isLong = this.long
      if (this.long) {
        this.handleChange(true)
      }
    }
  },
  computed: {
    person_ids: {
      get: function () {
        this.faceIds = this.person_id
        return this.faceIds
      },
      set: function (val) {
        this.faceIds = val
      }
    }
  },
  methods: {
    handleSelect (val) {
      if (val) {
        this.$emit('checked-person',val)
      }
    },
    handleChange (val) {
      if (val) {
        this.$axios.get(`/api/face/image?token=${cookieGet('token')}`)
          .then(res => {
            this.imgList = res.imgList
            // this.faceIds = []
          })
          .catch(() => {
            console.log('error')
          })
      } else {
        this.$emit('checked-person',null)
      }
    }
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
