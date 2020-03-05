
<template>
  <div class="page-login">
    <img class="img1" src="./image/citylife.jpg">
    <div class="page-login--layer">
      <div class="page-login--content" flex="dir:top main:justify cross:center box:justify">
        <div class="page-login--content-header">
        </div>
        <div class="page-login--content-main" flex="dir:top main:center cross:center">
          <img class="page-login--logo" src="./image/logo_w@smarco.png">
          <div class="page-forgetPass--form">
            <!-- 找回密码 找回密码 找回密码-->
            <el-card shadow="never" v-if="!resetVisible">
              <d2-icon name="lock" style="font-size:20px;margin-left:40%;margin-bottom:10%;"/>
                <span style="font-size:20px;margin-left:2%;">找回密码</span>
                <el-form
                    :model="dataForm"
                    ref="dataForm"
                    label-width="90px">
                    <el-form-item prop="username" label="登录账户">
                        <el-input v-model="dataForm.username" placeholder="登录账户"/>
                    </el-form-item>
                    <el-form-item prop="phoneNumber" label="手机号">
                        <el-input v-model="dataForm.phoneNumber" placeholder="手机号"/>
                    </el-form-item>
                    <el-form-item prop="password" label="短信验证码">
                        <el-input v-model="dataForm.message" placeholder="短信验证码" style="width:43%;"/>
                        <el-button type="primary" @click="getMessage()" style="margin-left:2%;" plain>获取短信验证码</el-button>
                    </el-form-item>
                </el-form>
                  <el-button type="primary"style="margin-left:40%;" @click="resetVisible=true">下一步</el-button>
            </el-card>
            <!-- 设置新密码 设置新密码 设置新密码-->
            <el-card shadow="never" v-if="resetVisible">
              <d2-icon name="lock" style="font-size:20px;margin-left:40%;margin-bottom:10%;"/>
                <span style="font-size:20px;margin-left:2%;">设置新密码</span>
                <el-form
                    :model="resetForm"
                    ref="dataForm"
                    label-width="90px">
                    <el-form-item prop="resetPassword" label="新密码">
                        <el-input v-model="resetForm.resetPassword" placeholder="新密码"/>
                    </el-form-item>
                    <el-form-item prop="checkPassword" label="确认密码">
                        <el-input v-model="resetForm.checkPassword" placeholder="确认密码" style="width:43%;"/>
                    </el-form-item>
                </el-form>
                <router-link :to="{path:'login'}"> 
                  <el-button type="primary"style="margin-left:40%;" @click="">提交</el-button>
                </router-link>
            </el-card>
          </div>
        </div>
        <div class="page-login--content-footer">
          <p class="page-login--content-footer-options">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapActions } from "vuex";
import { debounce } from "lodash";
import { getUUID } from "@/common/renren";
import { sysAccountService } from "@/common/api";
import { errorCreate} from "@/plugin/axios/index";
import register from './register';
import { cookieGet } from '@/common/cookie'
export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (this.dataForm.checkPass !== '') {
					this.$refs.dataForm.validateField('checkPass');
				}
				callback();
			}
		};

		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.dataForm.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};

		return {
      activeName: 'second',
      resetVisible:false,
			dataForm: {
				username: '',
        message: '',
        phoneNumber: '',
      },
      resetForm:{
        resetPassword:'',
        checkPass:'',
      },
			rules: {
				name: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }],
				password: [{ required: true, validator: validatePass, trigger: 'blur' }],
				checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }]
			}
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
                    this.$axios.post(`/api/camera?token=${cookieGet("token")}`,
                        {
                        ...this.dataForm
                        }).then(res=>{
                            this.$message({
                                type: 'success',
                                message: '注册成功'
                            });
					        // this.activeName: 'first',
                        })
				} else {
					console.log('error submit!!');
					return false;
				}
			});
    },
    getMessage(){
      
    },
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
};
</script>

<style lang="scss" >
  .img1{
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    width: 100%
  }
.page-login {
  @extend %unable-select;
  $backgroundColor: #f0f2f5;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
      span {
        color: $color-text-sub;
      }
    }
  }
  // main
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-forgetPass--form {
    width: 390px;
    opacity:0.8; 
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    // .button-login {
    //   width: 100%;
    //   margin-right: 10px;
    // }
    // 注册按钮
    .button-register {
      width: 45%;
      margin-left: 10px;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-captcha {
      // https://github.com/d2-projects/d2-admin-renren-security-enterprise/issues/5
      background-image: linear-gradient(90deg, #C7C7C7 0%, #F9F9F9 100%);
      height: 40px - 2px;
      width: 126px;
      background-size: cover;
      background-position: center;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-login--quick {
      width: 100%;
    }

  }
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 14px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>
