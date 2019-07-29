<template>
  <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? $t('add') : $t('update')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose"
  >
    <el-form
      :data="faceList"
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmitHandle()"
      label-width="120px"
    >
      <el-form-item prop="username" :label="$t('face.name')">
        <el-input v-model="dataForm.username" :placeholder="$t('face.name')"/>
      </el-form-item>
      <el-form-item prop="gender" :label="$t('user.gender')" size="mini">
        <el-radio-group v-model="dataForm.gender">     
          <el-radio :label="false">{{ $t('user.gender0') }}</el-radio>
          <el-radio :label="true">{{ $t('user.gender1') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="email" :label="$t('user.email')">
        <el-input v-model="dataForm.email" :placeholder="$t('user.email')"/>
      </el-form-item>
      <el-form-item prop="mobile" :label="$t('user.mobile')">
        <el-input v-model="dataForm.mobile" :placeholder="$t('user.mobile')"/>
      </el-form-item>
      <el-form-item :label="$t('user.face')">
        <upload v-if="uploadVisible" ref="upload" :dataForm="this.dataForm" @imgurl="imgurl"/>
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
import Upload from "./face-upload";
import { isEmail, isMobile } from "@/common/validate";
import { cookieGet } from "@/common/cookie";
import { getUUID } from "@/common/renren";
export default {
  data() {
    return {
      visible: false,
      faceList: [],
      uploadVisible: true,
      dataForm: {
        id: "",
        username: "",
        gender: 0,
        email: "",
        mobile: "",
        imgurl: "",
        uuid: ""
      }
    };
  },
  computed: {
    dataRule() {
      var validateEmail = (rule, value, callback) => {
        if (!isEmail(value)) {
          return callback(
            new Error(
              this.$t("validate.format", { attr: this.$t("user.email") })
            )
          );
        }
        callback();
      };
      var validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          return callback(
            new Error(
              this.$t("validate.format", { attr: this.$t("user.mobile") })
            )
          );
        }
        callback();
      };
      return {
        username: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          },
          { validator: validateEmail, trigger: "blur" }
        ],
        mobile: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          },
          { validator: validateMobile, trigger: "blur" }
        ]
      };
    }
  },
  components: {
    Upload
  },
  methods: {
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
    imgurl(img_uuid) {
      this.dataForm.imgurl = img_uuid;
    },
    // 获取当前流信息列表
    getFaceList() {
      return this.$axios
        .get(`/api/face?token=${cookieGet("token")}`)
        .then(res => {
          this.faceList = res;
        })
        .catch(() => {});
    },
    // 获取信息
    getInfo() {
      this.$axios
        .get(`/api/face/${this.dataForm.id}?token=${cookieGet("token")}`)
        .then(res => {
          let url = res.imgurls
          this.$refs.upload.getImage(url);
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
