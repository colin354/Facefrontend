<template>
  <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t('add') : $t('update')" :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px">
      <el-form-item prop="name" label="角色名称" :rules="[{ required:true,message:'不能为空'}]">
        <el-input v-model="dataForm.name" placeholder="角色名称" />
      </el-form-item>
      <el-form-item prop="code" label="角色标识" :rules="[{ required:true,message:'不能为空'}]">
        <el-input v-model="dataForm.code" placeholder="角色标识"/>
      </el-form-item>
      <el-form-item prop="description" label="角色描述">
        <el-input v-model="dataForm.description" placeholder="角色描述"/>
      </el-form-item>
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
        name: '',
        code: '',
        description:'',
        username:'',
      },
    }
  },
  mounted(){
    this.init()
  },
  computed: {
  },
  methods: {
    init () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
        console.log(this.dataForm.id)
        this.getInfo(this.dataForm.id)
        }else{
        }
      })
    },
    // 获取信息
    getInfo(id) {
      this.$axios.get(`/api/role`)
        .then(res => {
          console.log("返回的是什么")
          console.log(res.list)
          for(var i=0 ; i < res.list.length ; i++){       
            if(res.list[i].id == id){
              this.dataForm = {
                ...res.list[i]
              }
            } 
          }
        })
        .catch(() => {});
      
    },
    // 表单提交
    dataFormSubmitHandle: debounce(function () {
      this.$refs['dataForm'].validate((valid) => {
        console.log("trest=====")
        if (!valid) {
          return false
        }
        this.$axios[!this.dataForm.id ? 'post' : 'put']('/api/role', {
          ...this.dataForm,
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
