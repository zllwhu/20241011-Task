<template>
  <div>
    <div style="height: 60px; background-color: #409eff; display: flex; align-items: center">
      <div style="width: fit-content; display: flex; align-items: center; padding-left: 20px">
        <img style="width: 35px" src="@/assets/img/logo.png" alt=""/>
        <span style="margin-left: 10px; font-size: 24px; color: white;">湖北省校园文化遗产数字信息管理平台</span>
      </div>
      <div style="flex: 1"/>
      <div style="width: fit-content; display: flex; align-items: center; padding-right: 20px;">
        <img :src="data.user.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" alt=""
             style="width: 40px; height: 40px; border-radius: 50%"/>
        <span style="color: white; margin-left: 10px; font-size: 16px">{{ data.user.name }}</span>
      </div>
    </div>

    <div style="height: 60px">
      <el-menu router :default-active="'/front/home'" mode="horizontal">
        <el-menu-item index="/front/home">平台主页</el-menu-item>
        <el-menu-item index="/front/about">关于平台</el-menu-item>
        <el-menu-item index="3">遗产名录</el-menu-item>
        <el-menu-item index="4">红色图谱</el-menu-item>
        <el-menu-item index="5">遗产档案</el-menu-item>
        <el-menu-item index="6">数字展示</el-menu-item>
        <el-menu-item index="7">智慧管理</el-menu-item>
        <el-menu-item index="8">专家观点</el-menu-item>
        <el-menu-item index="9">文旅信息</el-menu-item>
        <el-menu-item index="10">交互反馈</el-menu-item>
      </el-menu>
    </div>

    <RouterView/>
  </div>
</template>

<script setup>
import {reactive} from "vue";

const data = reactive({
  user: JSON.parse(localStorage.getItem("heritage-user"))
})
</script>

<style scoped>
.el-menu {
  display: flex;
  justify-content: space-around;
}
</style>