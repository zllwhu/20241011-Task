<template>
  <el-card shadow="never" style="margin-bottom: 10px">
    管理员用户：{{ data.user.name }}，欢迎您！
  </el-card>
  <el-card shadow="never" style="margin-bottom: 10px">
    <div id="main" style="width: 600px; height: 400px">

    </div>
  </el-card>
</template>

<script setup>
import {reactive} from "vue";

const data = reactive({
  user: JSON.parse(localStorage.getItem("heritage-user"))
})
</script>
