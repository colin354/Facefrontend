<template>
  <div class="d2-demo-article">
    <div class="d2-demo-article__control">
      <el-switch
        v-model="isLong"
        active-text="设置部署摄像头"
        inactive-text="不设置"
        @change="handleChange"/>
    </div>
    <div v-show="isLong" style="height:150px; overflow:auto">
      <el-tree
        :data="streamList"
        show-checkbox
        node-key="id"
        ref="tree"
        :default-checked-keys="camera_id"
        @check-change="handleCheck"
        @node-click="handleNodeClick"
        >
      </el-tree>           
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
    camera_id: {
      type: Array,
      required: false,
      default: []
    }    
  },
  watch:{
    camera_id :{
      handler(newVal,oldVal) {
        this.$refs.tree.setCheckedKeys([]);
        console.log('cccccccpperson___wwwwwwach')
        console.log(newVal)
        console.log(oldVal)
      }
    },
    long(val) {
      this.isLong = this.long
      if(this.long){
        console.log('hahahaha-----------')
        this.handleChange(true)
      }
    }
  },
  // computed: {
  //   camera_ids: {
  //     get: function(){
  //       this.cameraIds = this.camera_id
  //       return this.cameraIds
  //     },
  //     set: function(val){
  //       this.cameraIds = val
  //     }
  //   }
  // },  
  data () {
    return {
      isLong: false,
      streamList : [],
      cameraIds : [],
    }
  },
  created () {
    this.isLong = this.long
  },
  mounted(){ 

  },
  methods:{ 
    handleCheck(val){
      this.$emit('checked-camera',this.$refs.tree.getCheckedKeys())
    },
    handleChange(val){
      if(val){
      this.$axios.get(`/sys/stream/page?token=${cookieGet('token')}`,{params:{map_location:'GETLOCATION'}})
        .then(res => {
          console.log('rrrreereerererere1111111')
          console.log(res)
          this.streamList = res.streamList
        })
        .catch(() => {
          console.log("error")
        })
      }else{
        this.$emit('checked-camera',null)
      }
    },
    handleNodeClick(data) {
      console.log(data);
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
