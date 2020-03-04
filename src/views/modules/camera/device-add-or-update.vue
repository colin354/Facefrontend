<template>
    <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? $t('add') : $t('update')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose">
    <el-form
        :data="deviceList"
        :model="dataForm"
        ref="dataForm"
        @keyup.enter.native="dataFormSubmitHandle()"
        label-width="140px"
      >
        <el-form-item prop="c_id" label="摄像机编号">
          <el-input v-model="dataForm.c_id"/>
        </el-form-item>
        <el-form-item prop="c_name" label="摄像机名称">
          <el-input v-model="dataForm.c_name" placeholder="摄像机名称"/>
        </el-form-item>
        <el-form-item prop="c_username" label="摄像机用户名">
          <el-input v-model="dataForm.c_username" placeholder="摄像机用户名"/>
        </el-form-item>
        <el-form-item prop="c_password" label="摄像机密码">
          <el-input v-model="dataForm.c_password" placeholder="摄像机密码"/>
        </el-form-item>
        <el-form-item prop="c_status" label="是否启用" header-align="center" align="left">
            <el-switch
                v-model="dataForm.c_status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="是"
                inactive-text="否">
            </el-switch>
        </el-form-item>
        <el-form-item prop="c_inputProtocol" label="摄像机输入协议">
          <el-select v-model="dataForm.c_inputProtocol" placeholder="输入协议" clearable>
            <el-option v-for="item in inputProtocolList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="c_inputAddress" label="摄像机接入地址">
          <el-input v-model="dataForm.c_inputAddress" placeholder="摄像机接入地址"/>
        </el-form-item>
        <el-form-item prop="c_outputProtocol" label="摄像机输出协议">
          <el-select v-model="dataForm.c_outputProtocol" placeholder="输入协议" clearable>
            <el-option v-for="(protocol, index) in outputProtocolList" :key="index" :label="protocol.label" :value="protocol.value"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="c_outputAddress" label="摄像机输出地址">
          <el-input v-model="dataForm.c_outputAddress" placeholder="摄像机输出地址"/>
        </el-form-item>
        <el-form-item prop="c_outputEncodingFormat" label="摄像机输出编码格式">
          <el-input v-model="dataForm.c_outputEncodingFormat" placeholder="H.264"/>
        </el-form-item>
        <el-form-item prop="c_outputStreamRate" label="摄像机输出编码率">
          <el-input v-model="dataForm.c_outputStreamRate" placeholder="摄像机输出编码率"/>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="handleClose()">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
      </template>
    </el-dialog>
</template>

<script>
import { debounce } from "lodash";
// import Upload from "./face-upload";
import { isEmail, isMobile, isUsername} from "@/common/validate";
import { cookieGet } from "@/common/cookie";
export default {
  data() {
    return {
      visible: false,
      deviceList: [],
      inputProtocolList:[
        { value: "RTSP", label: "RTSP" },
        { value: "RTMP", label: "RTMP" },
      ],
      outputProtocolList:[
          { value: "RTMP", label: "RTMP" },
          { value: "HTTP-FLV", label: "HTTP-FLV" },      
          { value: "HLS", label: "HLS" },      
        ],
      dataForm: {
        id: '',
        c_id: '',
        c_name:'',
        c_username:'',
        c_password:'',
        c_status:true,
        c_inputProtocol:[],
        c_inputAddress:'',
        c_outputProtocol:[],
        c_outputAddress:'',
        c_outputEncodingFormat:'',
        c_outputStreamRate:'',
      },
    };
  },
  methods: {
    changeSwitch(data){
      console.log(data)
    },
    init() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields()
        if (this.dataForm.id) {//若是修改,则走此句
          console.log('---------aaaaa--------')
          this.getInfo()
        }
      });
    },
    getInfo() {
      this.$axios
        .get(`/api/camera?token=${cookieGet("token")}`,{params:{camera_id:this.dataForm.id}})
        .then(res => {
          console.log('----000--------修改时获取')
          console.log(res)
          this.dataForm = {
            ...this.dataForm,
            ...res
          };
        })
        .catch(() => {});
    },
    handleClose() {
      // let name = "aaa";
      // this.$refs.upload.init(name);
      this.visible = false;
      // this.$emit("refreshDataList");
      // this.$axios
      //   .delete(`/img?token=${cookieGet("token")}&uuid=${this.dataForm.uuid}`)
      //   .then(res => {})
      //   .catch(() => {});
    },
    h5_add_camera () {
      var form=this.dataForm
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
      var url = root + "/api/v1/AddSrcRTSP?&name="+form.c_name+
      "&token="+form.c_id+
      "&user="+form.c_username+
      "&password="+encodeURIComponent(form.c_password)+
      "&audio="+form.c_status+
      "&url="+encodeURIComponent(form.c_inputAddress)+
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
    },
    h5_edit_camera () {
      //return false;
      var root = process.env.VUE_APP_API_ROOT;
      var wsroot = process.env.VUE_APP_WS_HOST_ROOT;
      if (root == undefined){
          root = window.location.protocol + '//' + window.location.host + window.location.pathname;
      }
      if (wsroot == undefined)
      {
          wsroot = window.location.host;
      }
      //url
      var form=this.dataForm;
      console.log("form",form);
      
      //return false;
      var url1 = root + "/api/v1/DelSrc?token="+form.c_id+"&session="+ this.$store.state.token;
      this.$http.get(url1).then(result=>{
          //console.log("1",result);
          if(result.status==200){
              if(result.data.bStatus==true){
                  console.log("*************************",result.data.bStatus)
                  this.h5_add_camera();
                  
              }else{
                  this.$message({
                      message: this.$t("message.setting.Editorfailure"),
                      type: 'warning'
                  });
                  return false;
              }
          }
      })
    },
    // 表单提交
    dataFormSubmitHandle: debounce(
      function() {
        this.$refs["dataForm"].validate(valid => {
          if (!valid) {
            return false;
          }
          this.$axios[!this.dataForm.id ? "post" : "put"](
            `/api/camera?token=${cookieGet("token")}`,
            {
              ...this.dataForm
            }
          )
            .then(res => {
              if(!this.dataForm.id){
                console.log('Add------post')
                this.h5_add_camera()
              }else{
                console.log('Edit------put')
                this.h5_edit_camera()
              }

              this.$message({
                message: this.$t("prompt.success"),
                type: "success",
                duration: 500,
                onClose: () => {
                  this.visible = false;
                  // let nam = "abbb";
                  // this.$refs.upload.init(nam);
                  this.$emit("refreshDataList");
                }
              });
            })
            .catch(() => {});
        });
      },
      1000,
      { leading: true, trailing: false }
    )
  }
};
</script>

<style lang="scss">
.mod-sys__user {
  .dept-list {
    .el-input__inner,
    .el-input__suffix {
      cursor: pointer;
    }
  }
  .role-list {
    .el-select {
      width: 100%;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
