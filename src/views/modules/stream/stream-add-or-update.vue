<template>
  <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? $t('add') : $t('update')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      :data="streamList"
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmitHandle()"
      label-width="120px"
    >
      <el-form-item prop="streamname" :label="$t('stream.name')">
        <el-input v-model="dataForm.streamname" :placeholder="$t('stream.name')"/>
      </el-form-item>
      <el-form-item prop="streamlocation" :label="$t('stream.location')">
        <el-input v-model="dataForm.streamlocation" :placeholder="$t('stream.location')"/>
      </el-form-item>
      <el-form-item prop="streamurl" :label="$t('stream.url')">
        <el-input v-model="dataForm.streamurl" :placeholder="$t('stream.url')"/>
      </el-form-item>
      <el-form-item prop="streamlat" :label="$t('stream.latitude')">
        <el-input v-model="dataForm.streamlat" :placeholder="$t('stream.latitude')"/>
      </el-form-item> 
      <el-form-item prop="streamlon" :label="$t('stream.longtitude')">
        <el-input v-model="dataForm.streamlon" :placeholder="$t('stream.longtitude')"/>
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
import { cookieGet } from '@/common/cookie';
export default {
  data() {
    return {
      visible: false,
      streamList: [],
      dataForm: {
        id: "",
        streamname: "",
        streamlocation: "",
        streamurl: "",
        streamstatus: "0",
        streamlat:"",
        streamlon:""
      },
    };
  },
  computed: {
    dataRule() {
      return {
        streamname: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          }
        ],
        streamurl: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          }
        ],
        streamlocation: [
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
          this.getInfo()
        }else{
          this.dataForm = {
            streamstatus:"0"
          }//若是新增,则走此句
        }
      })
    },
    // 获取流信息列表
    getStreamList () {
      //return this.$axios.get('/sys/stream/page').then(res => {
      return this.$axios.get(`/sys/stream/page?token=${cookieGet('token')}`).then(res => {
        console.log('-----getStreamList-----')
        console.log(res)
        this.streamtList = res
      }).catch(() => {})
    },
    // 获取信息
    getInfo () {
      this.$axios.get(`/sys/stream/page/${this.dataForm.id}?token=${cookieGet('token')}`)
      .then(res => 
        {
        console.log('----000----修改时获取')
        console.log(res)
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
          console.log(this.dataForm)
          this.$axios[!this.dataForm.id ? "post" : "put"](`/sys/stream?token=${cookieGet('token')}`, {
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
