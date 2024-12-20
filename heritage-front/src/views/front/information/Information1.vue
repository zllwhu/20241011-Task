<template>
  <div>
    <el-card>
      <el-form ref="formRef" :rules="data.rules" :model="data.form" label-width="auto"
               style="padding-right: 20px; padding-top: 20px">
        <div style="width: 100%; display: flex; justify-content: center; margin-bottom: 20px">
          <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false"
                     :on-success="handleAvatarSuccess">
            <img v-if="data.form.avatar" :src="getAvatar(data.form.avatar)" class="avatar" alt=""/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </div>
        <el-form-item label="账号：" label-position="right" prop="username">
          <el-input disabled v-model="data.form.username" autocomplete="off" placeholder="请输入账号"/>
        </el-form-item>
        <el-form-item label="姓名：" label-position="right" prop="name">
          <el-input v-model="data.form.name" autocomplete="off" placeholder="请输入姓名"/>
        </el-form-item>
        <div v-if="data.user.role === 'EMP'">
          <el-form-item label="性别：" label-position="right">
            <el-radio-group v-model="data.form.sex">
              <el-radio value="男" label="男"/>
              <el-radio value="女" label="女"/>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="学号：" label-position="right" prop="no">
            <el-input v-model="data.form.no" autocomplete="off" placeholder="请输入学号"/>
          </el-form-item>
          <el-form-item label="年龄：" label-position="right">
            <el-input-number :min="18" style="width: 180px" v-model="data.form.age" autocomplete="off"
                             placeholder="请输入年龄"/>
          </el-form-item>
          <el-form-item label="个人介绍：" label-position="right">
            <el-input :rows="3" type="textarea" v-model="data.form.description" autocomplete="off"
                      placeholder="请输入个人介绍"/>
          </el-form-item>
        </div>
        <div style="text-align: center">
          <el-button style="background-color: #f56c6c; border-color: #f56c6c" @click="updateUser" type="primary">更新个人信息</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import request from "@/utils/request.js";
import {ElMessage} from "element-plus";
import {Plus} from "@element-plus/icons-vue";

const formRef = ref()

const data = reactive({
  user: JSON.parse(localStorage.getItem("heritage-user")),
  form: {},
  rules: {
    username: [
      {required: true, message: '请输入账号', trigger: 'blur'},
    ],
    name: [
      {required: true, message: '请输入姓名', trigger: 'blur'},
    ],
    no: [
      {required: true, message: '请输入学号', trigger: 'blur'},
    ]
  }
})

const getAvatar = (avatar) => {
  return request.defaults.baseURL + "/files/download/" + avatar;
}

const uploadUrl = ref(request.defaults.baseURL + "/files/upload");

const handleAvatarSuccess = (res) => {
  data.form.avatar = res.msg
}

const emit = defineEmits(['updateUser'])

if (data.user.role === 'EMP') {
  request.get('/employee/selectById/' + data.user.id).then(res => {
    data.form = res.data
  })
} else {
  data.form = data.user
}

const updateUser = () => {
  if (data.user.role === 'EMP') {
    request.put('/employee/update', data.form).then(res => {
      if (res.code === '200') {
        ElMessage.success('更新成功')
        localStorage.setItem("heritage-user", JSON.stringify(data.form))
        emit('updateUser')
        window.dispatchEvent(new Event("info-updated"));
      } else {
        ElMessage.error(res.msg)
      }
    })
  } else {
    request.put('/admin/update', data.form).then(res => {
      if (res.code === '200') {
        ElMessage.success('更新成功')
        localStorage.setItem("heritage-user", JSON.stringify(data.form))
        emit('updateUser')
        window.dispatchEvent(new Event("info-updated"));
      } else {
        ElMessage.error(res.msg)
      }
    })
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 2px dashed var(--el-border-color);
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: #f56c6c;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
}
</style>