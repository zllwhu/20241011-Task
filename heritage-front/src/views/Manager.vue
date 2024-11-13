<template>
  <div>
    <div style="height: 60px; background-color: #409eff">

    </div>

    <div style="display: flex">
      <div style="width: 200px; border-right: 1px solid #dcdfe6; min-height: calc(100vh - 60px)">
        <el-menu router style="border: 0">
          <el-menu-item index="/manager/home">系统首页</el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <User/>
              </el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item>管理员信息</el-menu-item>
            <el-menu-item>普通用户信息</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/manager/data">数据统计</el-menu-item>
        </el-menu>
      </div>
      <div style="flex: 1; width: 0; padding: 10px">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {User} from "@element-plus/icons-vue";
</script>
