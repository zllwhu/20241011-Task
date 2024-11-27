<template>
  <div class="login-container">
    <div class="login-box">
      <div
          style="padding: 50px 30px; background-color: white;border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2)">
        <el-form ref="formRef" :rules="data.rules" :model="data.form" style="width: 350px">
          <div style="margin-bottom: 30px; font-size: 20px; color: #409eff; font-weight: bold; text-align: center">
            湖北省校园文化遗产数字信息管理平台
          </div>
          <el-form-item prop="username">
            <el-input size="large" v-model="data.form.username" placeholder="请输入账号" :prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input show-password size="large" v-model="data.form.password" placeholder="请输入密码"
                      :prefix-icon="Lock"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input show-password size="large" v-model="data.form.confirmPassword" placeholder="请确认密码"
                      :prefix-icon="Lock"></el-input>
          </el-form-item>
          <div style="margin-bottom: 20px">
            <el-button @click="register" type="primary" style="width: 100%" size="large">注 册</el-button>
          </div>
          <div style="text-align: right">已有账号？请 <a style="color: #409eff; text-decoration: none"
                                                        href="/login">登录</a></div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {Lock, User} from "@element-plus/icons-vue"
import request from "@/utils/request.js";
import {ElMessage} from "element-plus";

const validatePass = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请再次确认密码'))
  } else if (value !== data.form.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const data = reactive({
  form: {},
  rules: {
    username: [
      {required: true, message: '请输入账号', trigger: 'blur'}
    ],
    password: [
      {required: true, message: '请输入密码', trigger: 'blur'}
    ],
    confirmPassword: [
      {validator: validatePass, trigger: 'blur'}
    ]
  }
})

const formRef = ref()

const register = () => {
  formRef.value.validate(valid => {
    if (valid) {
      request.post('/register', data.form).then(res => {
        if (res.code === '200') {
          ElMessage.success('注册成功')
          setTimeout(() => {
            location.href = '/login'
          }, 200)
        } else {
          ElMessage.error(res.msg)
        }
      })
    }
  })
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  overflow: hidden;
  background-image: url("@/assets/img/background-login.jpg");
  background-size: cover;
}

.login-box {
  width: 350px;
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>