<template>
    <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? $t('add') : $t('update')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose">
    <el-form
        :data="faceList"
        :model="dataForm"
        :rules="dataRule"
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
                inactive-text="否"
                @change="changeSwitch(scope.row)">
            </el-switch>
        </el-form-item>
        <el-form-item prop="c_inputProtocol" label="摄像机输入协议">
          <select v-model="inputProtocol">
            <option v-for="(protocol, index) in dataForm.c_inputProtocol" :key="index">{{protocol}}</option>
          </select>
        </el-form-item>
        <el-form-item prop="c_inputAddress" label="摄像机接入地址">
          <el-input v-model="dataForm.c_inputAddress" placeholder="摄像机接入地址"/>
        </el-form-item>
        <el-form-item prop="c_outputProtocol" label="摄像机输出协议">
          <select v-model="outputProtocol">
            <option v-for="(protocol, index) in dataForm.c_outputProtocol" :key="index">{{protocol}}</option>
          </select>
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
import { getUUID } from "@/common/renren";
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        c_id: '',
        c_name:'',
        c_username:'',
        c_password:'',
        c_status:true,
        c_inputProtocol:['RTSP','RTMP'],
        c_inputAddress:'',
        c_outputProtocol:['RTMP','HTTP-FLV','HLS'],
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
        let uuid = getUUID();
        this.dataForm.uuid = uuid;
        this.$refs.upload.init(uuid);
        this.$refs["dataForm"].resetFields();
        this.getFaceList().then(() => {
          if (this.dataForm.id) {
            this.getInfo();
          }
        });
      });
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
    // 表单提交
    dataFormSubmitHandle: debounce(
      function() {
        this.$refs["dataForm"].validate(valid => {
          if (!valid) {
            return false;
          }
          this.$axios[!this.dataForm.id ? "post" : "put"](
            `/api/face?token=${cookieGet("token")}&uuid=${this.dataForm.uuid}`,
            {
              ...this.dataForm
            }
          )
            .then(res => {
              this.$message({
                message: this.$t("prompt.success"),
                type: "success",
                duration: 500,
                onClose: () => {
                  this.visible = false;
                  let nam = "abbb";
                  this.$refs.upload.init(nam);
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
