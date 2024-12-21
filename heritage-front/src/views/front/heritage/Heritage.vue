<template>
  <div>
    <div style="display: flex; padding-top: 30px; padding-bottom: 30px">
      <el-card style="width: 220px; min-height: calc(100vh - 160px)">
        <el-menu router :default-active="activePath" style="border: 0" active-text-color="#f56c6c">
          <el-menu-item index="/front/heritage/1">
            <el-icon>
              <MapLocation/>
            </el-icon>
            全部城市
          </el-menu-item>
          <el-menu-item v-for="(city, index) in data.cities" :key="index" :index="'/front/heritage/' + (index + 2)">
            <el-icon>
              <MapLocation />
            </el-icon>
            {{ city }}
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
import {MapLocation} from "@element-plus/icons-vue";

const data = reactive({
  cities: ['武汉市', '黄石市', '十堰市', '宜昌市', '襄阳市', '鄂州市', '荆门市', '孝感市', '荆州市', '黄冈市', '咸宁市', '随州市', '恩施州', '仙桃市', '潜江市', '天门市', '神农架林区'],
})

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