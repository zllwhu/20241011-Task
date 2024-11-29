<template>
  <div>
    <div style="display: flex; padding-top: 30px">
      <el-card style="width: 220px; min-height: calc(100vh - 160px)">
        <el-menu router :default-active="activePath" style="border: 0" active-text-color="#f56c6c">
          <el-menu-item index="/front/digital/album">
            <el-icon>
              <Picture/>
            </el-icon>
            遗产图库
          </el-menu-item>
          <el-menu-item index="/front/digital/photo">
            <el-icon>
              <Film/>
            </el-icon>
            影像资料
          </el-menu-item>
          <el-menu-item index="/front/digital/story">
            <el-icon>
              <Sunny/>
            </el-icon>
            红色故事
          </el-menu-item>
          <el-menu-item index="/front/digital/3d">
            <el-icon>
              <Football/>
            </el-icon>
            三维模型
          </el-menu-item>
          <el-menu-item index="/front/digital/tourist">
            <el-icon>
              <Guide/>
            </el-icon>
            数字漫游
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
import {Picture, Film, Sunny, Guide, Football} from "@element-plus/icons-vue";

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