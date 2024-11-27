<template>
  <div
      style="font-size: 20px; font-weight: bold; color: red; text-decoration: underline; font-style: italic; margin-bottom: 30px">
    欢迎！
  </div>

  <div style="margin-bottom: 30px">
    <RouterLink to="/manager/test">通过RouterLink跳转到Test.vue</RouterLink>
    ｜
    <a href="/manager/test">通过a标签跳转到Test.vue</a>
  </div>

  <div style="margin-bottom: 30px">
    <el-button type="primary" @click="router.push('/manager/test')">push跳转到新页面</el-button>
    <el-button type="primary" @click="router.replace('/manager/test')">replace跳转到新页面</el-button>
  </div>

  <div style="margin-bottom: 30px">
    <el-button type="primary" @click="router.push('/manager/test?id=1&name=zll')">路由传参跳转1</el-button>
    <el-button type="primary" @click="router.push({ path: '/manager/test', query: {id: 2, name: 'zllwhu'} })">路由传参跳转2
    </el-button>
  </div>

  <div style="margin-bottom: 30px">
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
import request from "@/utils/request.js";
import {reactive} from "vue";

const data = reactive({
  employeeList: []
})

request.get('/employee/selectAll').then(res => {
  console.log(res)
  data.employeeList = res.data
})
</script>
