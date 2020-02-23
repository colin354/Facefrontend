<template>
  <d2-container>
    <el-row :gutter="20">
      <el-col :span="12">    
      <div class="grid-content bg-purple">
        <el-card class="box-card">  
          <h3><span>录入人员信息</span></h3>
          <hr/>
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

            <el-form-item prop="room_floor" label="楼号">
              <el-input v-model="dataForm.room_floor" placeholder="楼号"/>
            </el-form-item>

            <el-form-item prop="room_num" label="房号">
              <el-input v-model="dataForm.room_num" placeholder="房号"/>
            </el-form-item>

            <el-form-item label="入住时间">
              <el-col :span="11">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="dataForm.people_check_in" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="dataFormSubmitHandle()">保存</el-button>
              <el-button type="danger" @click="initDateForm">重置</el-button>
            </el-form-item>   
          </el-form> 
       </el-card>
      </div>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import { debounce } from "lodash";
import { cookieGet } from "@/common/cookie";
import { isMobile, isUsername, isFloor, isRoom} from "@/common/validate";
export default {
  mounted () { 
    
  },
  data () {
    return {
      dataForm: {
        people_name: '',
        people_sex: '',
        people_unit: '',
        people_phone_num: '',
        room_floor:'',
        room_num:'',
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
        room_floor: [
          {
            required: true,
            message: this.$t("validate.required"),
            trigger: "blur"
          },
          { validator: validateFloor, trigger: "blur" }
        ],
        room_num: [
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
    dataFormSubmitHandle: debounce(
      function() {
        this.$refs["dataForm"].validate(valid => {
          if (!valid) {
            return false;
          }
          this.$axios.post(
            `/api/quarpeople?token=${cookieGet("token")}`,
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
.el-table .target-row {
  background: oldlace;
}

.el-table .stranger-row {
  background: #f10b0b3d;
}

.el-table .new-row {
  background: #110df13d;
}

.content-cont {
  width: 100%;
  height: 100%;
  .top-box {
    display: flex;
    width: 100%;
    height: 110px;
    overflow: hidden;
    .left {
      width: 1/3 * 100%;
      background: rgba(248, 245, 245, 0);
    }
    .right {
      flex: 1;
      padding-left: 15px;
      .content {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0);

        .number-box {
          width: 50%;
          float: left;
        }
      }
    }
  }
  .content-box {
    padding-top: 30px;
  }
}
</style>
