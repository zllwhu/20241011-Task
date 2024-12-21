<template>
  <div>
    <div style="height: 50px; background-color: #f56c6c; display: flex; align-items: center">
      <div style="width: fit-content; display: flex; align-items: center; padding-left: 100px">
        <img style="width: 35px" src="../../assets/img/logo.png" alt=""/>
        <span style="margin-left: 10px; font-size: 20px; color: white; font-weight: bold">湖北省校园文化遗产数字信息管理平台</span>
      </div>
      <div style="flex: 1"/>
      <div style="width: fit-content; display: flex; align-items: center; padding-right: 100px;">
        <img :src="getAvatar(data.user.avatar) || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" alt=""
             style="width: 40px; height: 40px; border-radius: 50%"/>
        <span style="color: white; margin-left: 10px; font-size: 16px">{{ data.user.name }}</span>
      </div>
    </div>

    <div style="height: 50px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)">
      <el-menu router :default-active="activePath" mode="horizontal" active-text-color="#f56c6c">
        <el-menu-item index="/front/home">平台主页</el-menu-item>
        <el-menu-item index="/front/about/introduction">关于平台</el-menu-item>
        <el-menu-item index="/front/heritage/1">遗产名录</el-menu-item>
        <el-menu-item index="/front/redmap/spirit-1">红色图谱</el-menu-item>
        <el-menu-item index="/front/archive">遗产档案</el-menu-item>
        <el-menu-item index="/front/digital/album">数字展示</el-menu-item>
        <el-menu-item index="/front/smartmanage/health">智慧管理</el-menu-item>
        <el-menu-item index="/front/expert/experts">专家观点</el-menu-item>
        <el-menu-item index="/front/tourism/policy">文旅信息</el-menu-item>
        <el-menu-item index="/front/feedback/message">交互反馈</el-menu-item>
        <el-menu-item index="/front/information/user">个人信息</el-menu-item>
      </el-menu>
    </div>
    <div style="padding-left: 100px; padding-right: 100px">
      <RouterView @updateUser="updateUser"/>
    </div>
  </div>
</template>

<script setup>
import {computed, onBeforeUnmount, onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import request from "@/utils/request.js";

const data = reactive({
  user: JSON.parse(localStorage.getItem("heritage-user"))
})

const route = useRoute();
const activePath = computed(() => {
  const path = route.path;
  if (route.path.startsWith("/front/about")) {
    return "/front/about/introduction";
  }
  if (route.path.startsWith("/front/heritage")) {
    return "/front/heritage/1";
  }
  if (route.path.startsWith("/front/redmap")) {
    return "/front/redmap/spirit-1";
  }
  if (route.path.startsWith("/front/digital")) {
    return "/front/digital/album";
  }
  if (route.path.startsWith("/front/smartmanage")) {
    return "/front/smartmanage/health";
  }
  if (route.path.startsWith("/front/expert")) {
    return "/front/expert/experts";
  }
  if (route.path.startsWith("/front/tourism")) {
    return "/front/tourism/policy";
  }
  if (route.path.startsWith("/front/feedback")) {
    return "/front/feedback/message";
  }
  if (route.path.startsWith("/front/information")) {
    return "/front/information/user";
  }
  return path;
});

const getAvatar = (avatar) => {
  return request.defaults.baseURL + "/files/download/" + avatar;
}

const updateUser = () => {
  data.user = JSON.parse(localStorage.getItem("heritage-user"))
}

onMounted(() => {
  window.addEventListener("info-updated", updateUser);
});

onBeforeUnmount(() => {
  window.removeEventListener("info-updated", updateUser);
});
</script>

<style scoped>
.el-menu {
  height: 50px;
  display: flex;
  justify-content: center;
}

.el-menu-item {
  font-size: 16px;
}

.el-menu-item:hover {
  background: floralwhite !important;
  color: #f56c6c !important;
}

.el-menu-item.is-active {
  background: floralwhite !important;
  color: #f56c6c !important;
}
</style>