<template>
  <div>
    <el-upload
      ref="upload"
      :action="url"
      multiple="true"
      list-type="picture-card"
      :before-upload="beforeUploadHandle"
      :on-success="successHandle"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
import { cookieGet } from "@/common/cookie";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      visible: false,
      url: "",
      uuid: "",
      num: 0,
      fileList: []
    };
  },
  methods: {
    init(name) {
      this.$refs.upload.clearFiles();
      this.visible = true;
      this.uuid = name
      this.url = `${window.SITE_CONFIG["apiURL"]}/img?token=${cookieGet(
        "token"
      )}&uuid=${this.uuid}`;
      this.num = 0;
      this.fileList = [];
    },
    handleRemove(file, fileList) {
      this.$axios
        .delete(`/img/${file.name}?token=${cookieGet("token")}&uuid=${this.uuid}`)
        .then(res => {})
        .catch(() => {});
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeUploadHandle(file) {
      if (
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/gif"
      ) {
        this.$message.error(this.$t("upload.tip", { format: "jpg、png、gif" }));
        return false;
      }
      this.num++;
    },
    // 上传成功
    successHandle(res, file, fileList) {
      if (res.code !== "999999") {
        console.log("999999");
        return this.$message.error(res.msg);
      }
      // console.log(res.data.imgurl)
      let img_uuid = res.data.imgurl;
      this.$emit("imgurl", img_uuid);
      this.fileList = fileList;
      this.num--;
      if (this.num === 0) {
        this.$message({
          message: this.$t("prompt.success"),
          type: "success",
          duration: 500,
          onClose: () => {
            this.visible = false;
            this.$emit("refreshDataList");
          }
        });
      }
    }
  }
};
</script>