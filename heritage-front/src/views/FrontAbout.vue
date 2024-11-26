<template>
  <div>
    <div style="display: flex">
      <div style="width: 200px; border-right: 1px solid #dcdfe6; min-height: calc(100vh - 120px)">
        <el-menu router :default-active="'/front/about/1'" style="border: 0">
          <el-menu-item index="/front/about/1">
            <el-icon>
              <House/>
            </el-icon>
            基本介绍
          </el-menu-item>
        </el-menu>
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