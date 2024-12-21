<template>
  <div>
    <div style="display: flex; padding-top: 30px; padding-bottom: 30px">
      <el-card style="width: 220px; min-height: calc(100vh - 160px)">
        <el-menu router :default-active="activePath" style="border: 0" active-text-color="#f56c6c">
          <el-menu-item index="/front/about/introduction">
            <el-icon>
              <Document/>
            </el-icon>
            基本介绍
          </el-menu-item>
          <el-menu-item index="/front/about/institute">
            <el-icon>
              <School/>
            </el-icon>
            研究机构
          </el-menu-item>
          <el-menu-item index="/front/about/members">
            <el-icon>
              <User/>
            </el-icon>
            成员简介
          </el-menu-item>
        </el-menu>
      </el-card>

      <div style="flex: 1; width: 0; padding-left: 10px">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, computed} from "vue";
import {useRoute} from "vue-router";
import {Document, School, User} from "@element-plus/icons-vue";

const data = reactive({})

const route = useRoute();
const activePath = computed(() => route.path);
</script>

<style>
.el-menu-item:hover {
  background: floralwhite !important;
  color: #f56c6c !important;
}

.el-menu-item.is-active {
  background: floralwhite !important;
  color: #f56c6c !important;
}
</style>