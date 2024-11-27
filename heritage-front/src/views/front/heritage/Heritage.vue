<template>
  <div>
    <div style="display: flex">
      <div style="width: 180px; border-right: 1px solid #dcdfe6; min-height: calc(100vh - 100px)">
        <el-menu router :default-active="'/front/about/introduction'" style="border: 0">
          <el-menu-item index="/front/about/introduction">
            基本介绍
          </el-menu-item>
          <el-menu-item index="/front/about/institute">
            研究机构
          </el-menu-item>
          <el-menu-item index="/front/about/members">
            成员简介
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
import {reactive} from "vue";
import {House} from "@element-plus/icons-vue";

const data = reactive({

})
</script>