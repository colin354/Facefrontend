<template>
  <el-dialog
    :visible.sync="visible"
    :title="!dataForm.id ? $t('add') : $t('update')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmitHandle()"
      label-width="80px"
    >
      <el-form-item prop="people_name" label="姓名">
        <el-input v-model="dataForm.people_name" placeholder="姓名"/>
      </el-form-item>

      <el-form-item prop="people_sex" label="性别">
        <el-radio-group v-model="dataForm.people_sex">     
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>       
      </el-form-item>

      <el-form-item prop="people_unit" label="单位">
        <el-input v-model="dataForm.people_unit" placeholder="单位"/>
      </el-form-item>

      <el-form-item prop="people_phone_num" label="电话">
        <el-input v-model="dataForm.people_phone_num" placeholder="电话"/>
      </el-form-item>

      <el-form-item prop="people_room_floor" label="楼号">
        <el-input v-model="dataForm.people_room_floor" placeholder="楼号"/>
      </el-form-item>

      <el-form-item prop="people_room_num" label="房号">
        <el-input v-model="dataForm.people_room_num" placeholder="房号"/>
      </el-form-item>

      <el-form-item label="入住时间" required>
        <el-col :span="11">
          <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="dataForm.people_check_in" style="width: 100%;"></el-date-picker>
        </el-col>
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
import { isMobile, isUsername, isFloor, isRoom, isDate} from "@/common/validate";
export default {
  mounted () { 
  },
  data () {
    return {
      visible: false,
      dataForm: {
        id: '',
        people_name: '',
        people_sex: '',
        people_unit: '',
        people_phone_num: '',
        people_room_floor:'',
        people_room_num:'',
        people_check_in:'',
        people_wtemp: 0
      }
    }
  },
  computed: {
    dataRule() {
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
      var validateUsername = (rule, value, callback) => {
        if (!isUsername(value)) {
          return callback(
            new Error(
              this.$t("validate.format", { attr: this.$t("user.username") })
            )
          );
        }
        callback();
      };
      var validateFloor = (rule, value, callback) => {
        if (!isFloor(value)) {
          return callback(
            new Error(
              this.$t("validate.format", { attr: this.$t("user.floor") })
            )
          );
        }
        callback();
      }; 
      var validateRoom = (rule, value, callback) => {
        if (!isRoom(value)) {
          return callback(
            new Error(
              this.$t("validate.format", { attr: this.$t("user.room") })
            )
          );
        }
        callback();
      };
      var validateDate = (rule, value, callback) => {
        if (!isDate(value)) {
          return callback(
            new Error(
              this.$t("validate.format", { attr: this.$t("user.room") })
            )
          );
        }
        callback();
      };       
      return {
        people_name: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          },
          { validator: validateUsername, trigger: "blur" }
        ],
        people_phone_num: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          },
          { validator: validateMobile, trigger: "blur" }
        ],
        people_room_floor: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          },
          { validator: validateFloor, trigger: "blur" }
        ],
        people_room_num: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          },
          { validator: validateRoom, trigger: "blur" }
        ]  
      };
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
            // streamstatus:"0"
          }//若是新增,则走此句
        }
      })
    },
    getInfo() {
      this.$axios
        .get(`/api/quarpeople?token=${cookieGet("token")}`,{params:{id:this.dataForm.id}})
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
    dataFormSubmitHandle: debounce(
      function() {
        this.$refs["dataForm"].validate(valid => {
          if (!valid) {
            return false;
          }
          this.$axios[!this.dataForm.id ? "post" : "put"](`/api/quarpeople?token=${cookieGet("token")}`,
            {
              ...this.dataForm
            }
          )
            .then(res => {
              this.initDateForm()
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
    ),
    initDateForm() {
      this.dataForm.people_name = '',
      this.dataForm.people_phone_num = '',
      this.dataForm.people_sex = '',
      this.dataForm.people_unit = '',
      this.dataForm.room_floor = '',
      this.dataForm.room_num = ''
    } 
  }
}
</script>

<style scoped lang="scss">
</style>
