<template>
  <div>
    <div style="display: flex; padding-top: 30px">
      <el-card style="width: 220px; min-height: calc(100vh - 160px)">
        <el-menu router :default-active="activePath" style="border: 0" active-text-color="#f56c6c">
          <el-menu-item index="/front/information/user">
            <el-icon>
              <Tickets/>
            </el-icon>
            个人信息
          </el-menu-item>

          <el-menu-item index="/front/information/password">
            <el-icon>
              <Lock/>
            </el-icon>
            修改密码
          </el-menu-item>

          <el-menu-item @click="handleQuit">
            <el-icon>
              <SwitchButton/>
            </el-icon>
            退出登录
          </el-menu-item>
        </el-menu>
      </el-card>

      <div style="flex: 1; width: 0; padding-left: 10px">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, computed} from "vue";
import {useRoute} from "vue-router";
import {Tickets, Lock, SwitchButton} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

const data = reactive({})

const route = useRoute();
const activePath = computed(() => route.path);

const handleQuit = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('heritage-user')
  ElMessage.success('退出成功')
  setTimeout(() => {
    location.href = '/login'
  }, 200)
}
</script>

<style>
.el-menu-item:hover {
  background: floralwhite !important;
  color: #f56c6c !important;
}

.el-menu-item.is-active {
  background: floralwhite !important;
  color: #f56c6c !important;
}
</style>