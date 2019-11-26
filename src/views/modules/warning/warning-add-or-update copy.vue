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
      <!-- <el-form-item prop="warning_id" :label="$t('warning.warningId')">
        <el-input v-model="dataForm.warning_id" :placeholder="$t('warning.warningId')"/>
      </el-form-item> -->

      <el-form-item prop="warning_name" :label="$t('warning.name')">
        <el-input v-model="dataForm.warning_name" :placeholder="$t('warning.name')"/>        
      </el-form-item>

      <el-form-item :label="$t('warning.type')">
        <el-select v-model="dataForm.warning_type_id" :placeholder="$t('warning.type')">
          <el-option v-for="warning in warningType" :label="warning.warning_level+'级 '+warning.warning_type" :key="warning.id" :value="warning.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="warning_people_max" :label="$t('warning.people_max')">
        <el-input v-model="dataForm.warning_people_max" :placeholder="$t('warning.people_max')"/>        
      </el-form-item>

      <el-form-item prop="warning_car_max" :label="$t('warning.car_max')">
        <el-input v-model="dataForm.warning_car_max" :placeholder="$t('warning.car_max')"/>        
      </el-form-item>      

      <el-form-item prop="warning_target_people" :label="$t('warning.target_people')">
        <target-people @checked-person="checkedPerson"/>
      </el-form-item>

      <el-form-item prop="warning_target_car" :label="$t('warning.target_car')">
        <target-car @checked-car="checkedCar"/>        
      </el-form-item>   
      
      <el-form-item prop="camera_num" label="摄像头节点">
        <target-camera @checked-camera="checkedCamera"/>
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
import TargetPeople from './components/target_people'
import TargetCar from './components/target_car'
import TargetCamera from './components/target_camera'

export default {
  components: {
    'target-people': TargetPeople,
    'target-car': TargetCar,
    'target-camera': TargetCamera
  },  
  data() {
    return {
      visible: false,
      cameraList: [],
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      dataForm: {
        id: "",
        warning_level: 0,
        warning_type_id: "",
        warning_people_max:0,
        warning_car_max:0,
        target_people:[],
        target_car:[],
        target_camera:[]
      },
      warningType:[]
    };
  },
  computed: {
    dataRule() {
      return {
        warningLevel: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          }
        ]    
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
          this.getWarningType()   
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
    checkedPerson(person_id) {
      this.dataForm.warning_target_people = person_id
    },
    checkedCar(car_id) {
      this.dataForm.warning_target_car = car_id
    },
    checkedCamera(camera_id) {
      this.dataForm.warning_target_camera = camera_id
    },      
    getWarningType() {
      this.$axios
        .get(`/api/warningType?token=${cookieGet("token")}`)
        .then(res => {
          this.warningType = res.list;
          console.log('123445')
          console.log(this.warningType)
        })
        .catch(() => {});      
    },    
    // 获取信息
    getInfo() {
      this.$axios
        .get(`/api/warningType?token=${cookieGet("token")}`,{params:{id:this.dataForm.id}})
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
    // 表单提交
    dataFormSubmitHandle: debounce(
      function() {
        this.$refs["dataForm"].validate(valid => {
          if (!valid) {
            return false;
          }
          this.$axios[!this.dataForm.id ? "post" : "put"](`/api/warningEvent?token=${cookieGet("token")}`,
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
.d2-demo-article {
  transition: opacity .3s;
  .d2-demo-article__control {
    padding: 8px 16px;
    margin-bottom: 10px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #f4f4f5;
  }
}

</style>
