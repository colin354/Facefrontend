<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="grid-content bg-purple" height="500" width="500">
          <v-liveplayer ref="myvideo" h5id='1' ></v-liveplayer>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-button @click="PlayVideo">Play Video</el-button>
            <el-button @click="PlayVideo1">Play Video1</el-button>
            <el-button @click="CloseVideo">Close Video</el-button>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-card class="box-card" :span="12" height="500" width="500"></el-card>
    </el-row>
  </d2-container>
</template>

<script>
import Liveplayer from '@/components/videoplayer/liveplayer';
  export default {
    components: {
      'v-liveplayer': Liveplayer
    },
    mounted(){
      this.PlayVideo()
    },
    methods: {
      PlayVideo() {
        console.log("---0---------------------0000")
        console.log(this.$refs.myvideo)
        this.$refs.myvideo.PlayVideo("token111");
      },
      PlayVideo1() {
        this.$refs.myvideo.PlayVideo("token112");
      },
      CloseVideo() {
        this.$refs.myvideo.CloseVideo("token1");
      },
    },
  }
</script>
