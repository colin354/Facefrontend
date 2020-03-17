<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px">
      <el-form-item prop="username" :label="$t('user.username')">
        <el-input v-model="dataForm.username" :placeholder="$t('user.username')"/>
      </el-form-item>
      <el-form-item prop="password" :label="$t('user.password')" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" :placeholder="$t('user.password')"/>
      </el-form-item>
      <el-form-item prop="real_name" :label="$t('user.realName')">
        <el-input v-model="dataForm.real_name" :placeholder="$t('user.realName')"/>
      </el-form-item>
      <el-form-item prop="email" :label="$t('user.email')">
        <el-input v-model="dataForm.email" :placeholder="$t('user.email')"/>
      </el-form-item>
      <el-form-item prop="phone" :label="$t('user.mobile')">
        <el-input v-model="dataForm.phone" :placeholder="$t('user.mobile')"/>
      </el-form-item> 
      <!-- <el-form-item prop="role_name" :label="$t('user.roleIdList')" class="role-list">
        <div v-for="(item,index) in roleList" :key="index">              
           <el-radio v-model="radio" :label="item.name">{{item.name}}</el-radio>                                    
        </div>
      </el-form-item> -->
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { debounce } from 'lodash'
import { isEmail, isMobile } from '@/common/validate'
import { cookieGet } from "@/common/cookie";

export default {
  data () {
    return {
      visible: false,
      deptList: [],
      deptListVisible: false,
      roleList: [],
      roleIdListDefault: [],
      dataForm: {
        id: '',
        username: '',
        deptId: '0',
        deptName: '',
        password: '',
        comfirmPassword: '',
        real_name: '',
        gender: 0,
        email: '',
        phone: '',
        role_name: '',
        status: 1
      },
      radio:'',
    }
  },
  mounted(){
    this.init()
  },
  computed: {
    dataRule () {
      var validatePassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          return callback(new Error(this.$t('validate.required')))
        }
        callback()
      }
      var validateComfirmPassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          return callback(new Error(this.$t('validate.required')))
        }
        if (this.dataForm.password !== value) {
          return callback(new Error(this.$t('user.validate.comfirmPassword')))
        }
        callback()
      }
      var validateEmail = (rule, value, callback) => {
        if (!isEmail(value)) {
          return callback(new Error(this.$t('validate.format', { 'attr': this.$t('user.email') })))
        }
        callback()
      }
      var validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          return callback(new Error(this.$t('validate.format', { 'attr': this.$t('user.mobile') })))
        }
        callback()
      }
      return {
        username: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: this.$t('validate.required'), trigger: 'change' }
        ],
        password: [
          { required: true,validator: validatePassword, trigger: 'blur' }
        ],
        comfirmPassword: [
          { validator: validateComfirmPassword, trigger: 'blur' }
        ],
        real_name: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: this.$t('validate.required'), trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.roleIdListDefault = []
        if (this.dataForm.id) {//若是修改,则走此句
          console.log("id---------camera add --id")
          console.log(this.dataForm.id)
          this.getInfo(this.dataForm.id)
        }else{
          this.$refs['dataForm'].resetFields()//若是新增,则走此句
        }
      })
    },
    // 获取信息
    getInfo(id) {
      console.log("获取信息")
      this.$axios.get(`/api/sys/user/${id}?token=${cookieGet("token")}`)
        .then(res => {
          console.log("返回的是什么")
          console.log(res)
          this.dataForm = {
            ...this.dataForm,
            ...res.list[0]
          };
        })
        .catch(() => {});
    },
    // 获取部门列表
    // getDeptList () {
    //   return this.$axios.get('/sys/dept/list').then(res => {
    //     this.deptList = res
    //   }).catch(() => {})
    // },
    // 获取角色列表
    getRoleList () {
      return this.$axios.get('/api/role').then(res => {
        this.roleList = res
        console.log(res)
        console.log("获取角色列表")
        console.log(this.roleList)
      }).catch(() => {})
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function () {
      this.$refs['dataForm'].validate((valid) => {
        console.log("trest=====")
        console.log(this.dataForm)
        console.log(valid)
        console.log(this.dataForm.id)
        if (!valid) {
          return false
        }
        this.$axios[!this.dataForm.id ? 'post' : 'put']('/api/sys/user'+(!this.dataForm.id?"":("/"+this.dataForm.id)), {
          ...this.dataForm,
          role_name: [
            ...this.dataForm.role_name,
            ...this.roleIdListDefault
          ]
        }).then(res => {
          console.log("----啊----")
          this.$message({
            message: this.$t('prompt.success'),
            type: 'success',
            duration: 500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        }).catch(() => {})
      })
    }, 1000, { 'leading': true, 'trailing': false })
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
</style>
