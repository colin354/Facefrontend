<template>
  <d2-container>
    <el-form :model="form" label-width="80px" style="margin: auto; margin-top:50px">
      <el-form-item label="Type" :label-width="formLabelWidth">
        <el-input v-model="form.Type" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="Name" :label-width="formLabelWidth">
        <el-input v-model="form.Name" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button type="danger" @click="onCancle">重置</el-button>
      </el-form-item>      
    </el-form>
  </d2-container>
</template>

<script>
export default {
  name: 'device',
  data() {
    return {
      formLabelWidth: "120px",
      form: {
          Type:"H5_STREAM",
          Name:"Cam999",
          Token:"",
          Username:"admin",
          Password:"12345",
          URL:"rtsp://192.168.1.1/stream",
          Audio:"false",
          IP:"192.168.1.1",
          Port:"80",
      },   
    }
  },
  mounted() {
    // this.getConf()
  },
  methods: {
    onSubmit() {
          var form=this.form
          var root = process.env.VUE_APP_API_ROOT;
          var wsroot = process.env.VUE_APP_WS_HOST_ROOT;
          if (root == undefined){
              root = window.location.protocol + '//' + window.location.host + window.location.pathname;
          }
          if (wsroot == undefined)
          {
              wsroot = window.location.host;
          }
          // console.log("stream",form.Audio);
          // console.log("stream",form.Audio);
          var url = root + "/api/v1/AddSrcRTSP?&name="+form.Name+
          "&token="+form.Token+
          "&user="+form.Username+
          "&password="+encodeURIComponent(form.Password)+
          "&audio="+form.Audio+
          "&url="+encodeURIComponent(form.URL)+
          "&session="+ this.$store.state.token;
          console.log("---------------------",url);
          this.$http.get(url).then(result=>{
            //console.log(result);
            if(result.status==200){
              if(result.data.bStatus==true){
                    console.log('ssssucccessss------sss')
                    //this.reload();
                    this.tableData=[];
                    // this.loadstream();
                }else{
                    this.$message({
                        message: '添加失败',
                        type: 'warning'
                    });
                    return false;
                }
            }
          })  

      // this.$axios.post("/ipconfig",{...this.configform})
      //   .then(res=> {
      //     console.log('********************')        
      //   })
      //   .catch(error =>{
      //     console.log(error);
      //   })
    },
    onCancle() {
      this.configform.IPADDR = '',
      this.configform.GATEWAY = ''
    },
    getConf(){
      this.$axios.get("/getipconf")
      .then(res=> {
        console.log('******ipipip*********')
        console.log(res)
        this.configform.IPADDR = res.ifcfg_addr
        this.configform.GATEWAY = res.ifcfg_gateway
      })
      .catch(error =>{
        console.log(error);
      })
    }
  }
}
</script>
