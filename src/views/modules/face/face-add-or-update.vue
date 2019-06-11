<template>
  <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? $t('add') : $t('update')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
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
      <!-- <el-form-item prop="deptName" :label="$t('user.deptName')" class="dept-list">
        <el-popover v-model="deptListVisible" ref="deptListPopover" placement="bottom-start" trigger="click">
          <el-tree
            :data="deptList"
            :props="{ label: 'name', children: 'children' }"
            node-key="id"
            ref="deptListTree"
            :highlight-current="true"
            :expand-on-click-node="false"
            accordion
            @current-change="deptListTreeCurrentChangeHandle">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.deptName" v-popover:deptListPopover :readonly="true" :placeholder="$t('user.deptName')"/>
      </el-form-item>-->
      <!-- <el-form-item prop="password" :label="$t('user.password')" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" :placeholder="$t('user.password')"/>
      </el-form-item>
      <el-form-item prop="comfirmPassword" :label="$t('user.comfirmPassword')" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" :placeholder="$t('user.comfirmPassword')"/>
      </el-form-item>
      <el-form-item prop="realName" :label="$t('user.realName')">
        <el-input v-model="dataForm.realName" :placeholder="$t('user.realName')"/>
      </el-form-item>-->
      <el-form-item prop="gender" :label="$t('user.gender')" size="mini">
        <el-radio-group v-model="dataForm.gender">
          <el-radio :label="0">{{ $t('user.gender0') }}</el-radio>
          <el-radio :label="1">{{ $t('user.gender1') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="email" :label="$t('user.email')">
        <el-input v-model="dataForm.email" :placeholder="$t('user.email')"/>
      </el-form-item>
      <el-form-item prop="mobile" :label="$t('user.mobile')">
        <el-input v-model="dataForm.mobile" :placeholder="$t('user.mobile')"/>
      </el-form-item>
      <el-form-item :label="$t('user.face')">
        <upload v-if="uploadVisible" ref="upload" @img_url="imgurl"/>
      </el-form-item>
      <!-- <el-form-item prop="roleIdList" :label="$t('user.roleIdList')" class="role-list">
        <el-select v-model="dataForm.roleIdList" multiple :placeholder="$t('user.roleIdList')">
          <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.id"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="status" :label="$t('user.status')" size="mini">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">{{ $t('user.status0') }}</el-radio>
          <el-radio :label="1">{{ $t('user.status1') }}</el-radio>
        </el-radio-group>
      </el-form-item>-->
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { debounce } from "lodash";
import Upload from "./face-upload";
import { isEmail, isMobile } from "@/common/validate";
import { cookieGet } from '@/common/cookie'
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
        img_url: "",
        status: 1
      },
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
        this.$refs.upload.init()
        this.$refs["dataForm"].resetFields()
        this.getFaceList().then(() => {
          if (this.dataForm.id) {
            this.getInfo()
          } else if (this.$store.state.d2admin.user.info.superAdmin === 1) {
            this.deptListTreeSetDefaultHandle()
          }
        })
      });
    },
    imgurl(img_uuid) {
      this.dataForm.img_url = img_uuid
    },
    // 获取流信息列表
    getFaceList () {
      return this.$axios.get('/sys/face/page').then(res => {
        this.facetList = res
      }).catch(() => {})
    },
    // 获取信息
    getInfo () {
      this.$axios.get(`/sys/face/page/${this.dataForm.id}`).then(res => {
        this.dataForm = {
          ...this.dataForm,
          ...res
        }
      }).catch(() => {})
    },    
    // 表单提交
    dataFormSubmitHandle: debounce(
      function() {
        this.$refs["dataForm"].validate(valid => {
          if (!valid) {
            return false;
          }
          this.$axios[!this.dataForm.id ? "post" : "put"](`/sys/user?token=${cookieGet('token')}`, {
            ...this.dataForm
          })
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
}
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
