<template>
  <div style="display: flex; justify-content: center; padding-top: 30px; flex-direction: column">
    <el-space v-if="data.total" wrap style="display: flex; justify-content: center; margin-bottom: 30px" size="large">
      <el-card class="box-card" style="width: 260px">
        <template #header>
          <div class="card-header">
            <span>武汉大学建筑</span>
          </div>
        </template>
        <div style="display: flex; justify-content: center">
          <img style="width: 240px; height: 180px" src="@/assets/img/27a9bbbe08a779b5.jpg" alt=""/>
        </div>
      </el-card>
      <el-card v-for="(item, index) in data.allData" :key="index" class="box-card" style="width: 260px">
        <template #header>
          <div class="card-header">
            <span>{{ item.archiName }}</span>
          </div>
        </template>
        <div style="display: flex; justify-content: center">
          <img style="width: 240px; height: 180px" src="@/assets/img/27a9bbbe08a779b5.jpg" alt=""/>
        </div>
      </el-card>
    </el-space>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import request from "@/utils/request.js";

const data = reactive({
  allData: [],
  total: 0,
})

// 加载数据并根据分页参数传递分页信息
const load = () => {
  request.get('/system/architecture/alllist').then(res => {
    if (res.data) {
      data.allData = res.data;  // 存储全部数据
      data.total = res.data.length;  // 总数据条数
    } else {
      console.error("接口返回的数据格式不正确");
    }
  }).catch(error => {
    console.error("请求失败:", error);
  });
};
load()
</script>