<template>
  <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? $t('add') : $t('update')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose"
  >
    <el-form
      :data="cameraList"
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmitHandle()"
      label-width="120px"
    >
      <el-form-item v-show="dataForm.id" prop="warning_id" :label="$t('warning.warningId')">
        <el-input :disabled="true" v-model="dataForm.warning_id" :placeholder="$t('warning.warningId')"/>
      </el-form-item>

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
        <target-people v-if="!dataForm.id" :person_id="target_people" @checked-person="checkedPerson" />
        <target-people v-else-if="dataForm.id" :long="com_person" :person_id="target_people" @checked-person="checkedPerson"/>
      </el-form-item>

      <el-form-item prop="warning_target_car" :label="$t('warning.target_car')">
        <target-car @checked-car="checkedCar"/>        
      </el-form-item>   
      
      <el-form-item prop="warning_target_camera" label="摄像头节点">
        <target-camera v-if="!dataForm.id" :camera_id="target_camera" @checked-camera="checkedCamera"/>
        <target-camera v-else-if="dataForm.id" :long="com_camera" :camera_id="target_camera" @checked-camera="checkedCamera"/>
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
        warning_target_people:'',
        warning_target_car:[],
        warning_target_camera:''
      },
      com_person:false,
      com_car:false,
      com_camera:false,
      warningType:[],
      target_people:[],
      target_camera:[]
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
        this.$refs["warningType"]=[]
        this.getWarningType()  
        if (this.dataForm.id) {//若是修改,则走此句
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
    checkedPerson(person_id) {
      console.log('3333333333333')
      console.log(person_id)
      if(person_id){
        this.dataForm.warning_target_people = person_id.join('.')
      }
    },

    checkedCar(car_id) {
      this.dataForm.warning_target_car = car_id
    },
    checkedCamera(camera_id) {
      if(camera_id){
        this.dataForm.warning_target_camera = camera_id.join('.')
      }
    },      
    getWarningType() {
      this.$axios
        .get(`/api/warningType?token=${cookieGet("token")}`)
        .then(res => {
          this.warningType = res.list;
        })
        .catch(() => {});      
    },    
    // 获取信息
    getInfo() {
      this.$axios
        .get(`/api/warningEvent?token=${cookieGet("token")}`,{params:{id:this.dataForm.id}})
        .then(res => {
          // this.warningType = res.warning_type
          console.log('11111111110---00099')
          console.log(res)
          this.dataForm = {
            ...this.dataForm,
            ...res
          };
          this.com_person = res.warning_target_people == null ? false : true
          this.com_camera = res.warning_target_camera == null ? false : true
          var target_people_int = []
          var target_camera_int = []
          if(this.com_person){
            target_people_int = (res.warning_target_people.split(".")).map(function(data){return +data})
          }
          if(this.com_camera){
            target_camera_int = (res.warning_target_camera.split(".")).map(function(data){return +data})
          }
          this.target_people = target_people_int
          this.target_camera = target_camera_int
        })
        .catch(() => {
          console.log('error!!!!!!')
        });
    },
    handleClose(){
      console.log('ooooooclose')
      this.target_people = []
      this.target_camera = []
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
