<template>
  <div>
    <div style="display: flex; padding-top: 30px; padding-bottom: 30px;">
      <el-card style="width: 220px; min-height: calc(100vh - 160px)">
        <el-menu router :default-active="activePath" style="border: 0" active-text-color="#f56c6c">
          <el-menu-item index="/front/redmap/spirit-1">
            <el-icon>
              <Place/>
            </el-icon>
            建党精神基因
          </el-menu-item>
          <el-menu-item index="/front/redmap/spirit-2">
            <el-icon>
              <TrophyBase/>
            </el-icon>
            抗战精神基因
          </el-menu-item>
          <el-menu-item index="/front/redmap/spirit-3">
            <el-icon>
              <User/>
            </el-icon>
            三牛精神基因
          </el-menu-item>
          <el-menu-item index="/front/redmap/spirit-4">
            <el-icon>
              <Coin/>
            </el-icon>
            科学家精神基因
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
import {Coin, Place, TrophyBase, User} from "@element-plus/icons-vue";

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