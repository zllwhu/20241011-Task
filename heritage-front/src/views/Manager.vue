<template>
  <div>
    <div style="height: 60px; background-color: #409eff; display: flex; align-items: center">
      <div style="width: fit-content; display: flex; align-items: center; padding-left: 20px">
        <img style="width: 35px" src="@/assets/img/logo.png" alt=""/>
        <span style="margin-left: 10px; font-size: 24px; color: white;">湖北省校园文化遗产数字信息管理系统</span>
      </div>
      <div style="flex: 1"/>
      <div style="width: fit-content; display: flex; align-items: center; padding-right: 20px;">
        <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt=""
             style="width: 40px; height: 40px"/>
        <span style="color: white; margin-left: 10px; font-size: 16px">zllwhu</span>
      </div>
    </div>

    <div style="display: flex">
      <div style="width: 200px; border-right: 1px solid #dcdfe6; min-height: calc(100vh - 60px)">
        <el-menu router :default-active="router.currentRoute.value.path" :default-openeds="['1']" style="border: 0">
          <el-menu-item index="/manager/home">
            <el-icon>
              <House/>
            </el-icon>
            系统首页
          </el-menu-item>

          <el-menu-item index="/manager/data">
            <el-icon>
              <DataLine/>
            </el-icon>
            数据统计
          </el-menu-item>

          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <User/>
              </el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item>管理员信息</el-menu-item>
            <el-menu-item index="/manager/employee">员工信息</el-menu-item>
          </el-sub-menu>

          <el-menu-item index="1">
            <el-icon>
              <Tickets/>
            </el-icon>
            个人信息
          </el-menu-item>

          <el-menu-item index="1">
            <el-icon>
              <SwitchButton/>
            </el-icon>
            退出登录
          </el-menu-item>
        </el-menu>
      </div>
      <div style="flex: 1; width: 0; padding: 10px">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {DataLine, House, SwitchButton, Tickets, User} from "@element-plus/icons-vue";
import router from "@/router/index.js";
</script>
