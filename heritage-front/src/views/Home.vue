<template>
  <div
      style="font-size: 20px; font-weight: bold; color: red; text-decoration: underline; font-style: italic; margin-bottom: 30px; margin-left: 30px">
    欢迎！
  </div>

  <div style="margin-left: 30px; margin-bottom: 30px">
    <RouterLink to="/test">通过RouterLink跳转到Test.vue</RouterLink>｜
    <a href="/test">通过a标签跳转到Test.vue</a>
  </div>

  <div style="margin-left: 30px; margin-bottom: 30px">
    <el-button type="primary" @click="router.push('/test')">push跳转到新页面</el-button>
    <el-button type="primary" @click="router.replace('/test')">replace跳转到新页面</el-button>
  </div>

  <div style="margin-left: 30px; margin-bottom: 30px">
    <el-button type="primary" @click="router.push('/test?id=1')">路由传参id=1</el-button>
  </div>

  <div style="margin-left: 30px; margin-bottom: 30px">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>

  <div style="margin-left: 30px">
    <el-icon :size="30">
      <Edit/>
    </el-icon>
    <span style="margin-left: 30px">
      <el-icon :size="30">
        <View/>
      </el-icon>
      100
    </span>
  </div>
</template>

<script setup>
import {Edit, View} from "@element-plus/icons-vue";
import router from "@/router/index.js";
</script>
