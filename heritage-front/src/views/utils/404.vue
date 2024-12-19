<template>
  <div>
    <el-result icon="error" title="404 Not Found" sub-title="您访问的页面不存在">
<!--      <template #extra>-->
<!--        <el-button type="primary" @click="goHome">返回首页</el-button>-->
<!--      </template>-->
    </el-result>
  </div>
</template>

<script setup>
const goHome = () => {
  location.href = '/'
}
</script>
