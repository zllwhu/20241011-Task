<template>
  <div style="display: flex; justify-content: center; padding-top: 30px; flex-direction: column">
    <el-space wrap style="justify-content: center; margin-bottom: 30px">
      <el-card v-for="i in 18" :key="i" class="box-card" style="width: 250px">
        <template #header>
          <div class="card-header">
            <span>遗产建筑名称</span>
          </div>
        </template>
        <div style="display: flex; justify-content: center">
          <img style="width: 200px" src="@/assets/img/27a9bbbe08a779b5.jpg" alt=""/>
        </div>
      </el-card>
    </el-space>
  </div>
</template>

<script setup>
import {reactive} from "vue";

const data = reactive({

})
</script>