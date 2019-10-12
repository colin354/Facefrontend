<template>
  <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? $t('add') : $t('update')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      :data="cameraList"
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmitHandle()"
      label-width="120px"
    >
      <el-form-item prop="cameraName" :label="$t('camera.name')">
        <el-input v-model="dataForm.cameraName" :placeholder="$t('camera.name')"/>
      </el-form-item>

      <el-form-item prop="cameraLocation" :label="$t('camera.location')">
        <el-input v-model="dataForm.cameraLocation" :placeholder="$t('camera.location')"/>        
      </el-form-item>

      <el-form-item prop="cameraLon" :label="$t('camera.lon')">
        <el-input v-model="dataForm.cameraLon" :placeholder="$t('camera.lon')"/>
      </el-form-item>

      <el-form-item prop="cameraLat" :label="$t('camera.lat')">
        <el-input v-model="dataForm.cameraLat" :placeholder="$t('camera.lat')"/>
      </el-form-item>

    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { debounce } from "lodash";
import { cookieGet } from "@/common/cookie";
import { getUUID } from "@/common/renren";
import { isEmail, isMobile, isUsername} from "@/common/validate";

export default {
  data() {
    return {
      visible: false,
      cameraList: [],
      dataForm: {
        id: "",
        cameraName: "",
        cameraLocation: "",
        cameraLon: "",
        cameraLat: "",
        uuid: ""
      }
    };
  },
  computed: {
    dataRule() {
      return {
        cameraName: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          }
        ],
        cameraLocation: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          }
        ],
        cameraLon: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          }
        ],
        cameraLat: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          }
        ],         
      }
    }
  },
  methods: {
    init() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields()
        if (this.dataForm.id) {//若是修改,则走此句
          console.log("id---------camera add --id")
          console.log(this.dataForm.id)
          this.getInfo()
        }else{
          this.dataForm = {
            // streamstatus:"0"
          }//若是新增,则走此句
        }
      })
    },
    imgurl(img_uuid) {
      this.dataForm.imgurl = img_uuid;
    },
    // 获取当前流信息列表
    getCameraList() {
      return this.$axios
        .get(`/sys/cameras?token=${cookieGet("token")}`)
        .then(res => {
          this.cameraList = res;
        })
        .catch(() => {});
    },
    // 获取信息
    getInfo() {
      this.$axios
        .get(`/sys/cameras?token=${cookieGet("token")}`,{params:{id:this.dataForm.id}})
        .then(res => {
          console.log('----000----修改时获取')
          console.log(res)
          this.dataForm = {
            ...this.dataForm,
            ...res
          };
        })
        .catch(() => {});
    },
    handleClose() {
      let name = "aaa";
      this.$refs.upload.init(name);
      this.visible = false;
      this.$emit("refreshDataList");
      this.$axios
        .delete(`/img?token=${cookieGet("token")}&uuid=${this.dataForm.uuid}`)
        .then(res => {})
        .catch(() => {});
    },
    // 表单提交
    dataFormSubmitHandle: debounce(
      function() {
        this.$refs["dataForm"].validate(valid => {
          if (!valid) {
            return false;
          }
          this.$axios[!this.dataForm.id ? "post" : "put"](`/sys/cameras?token=${cookieGet("token")}`,
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
