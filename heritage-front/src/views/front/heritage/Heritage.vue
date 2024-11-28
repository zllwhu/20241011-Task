<template>
  <div style="display: flex; justify-content: flex-start; padding-top: 30px; flex-direction: row">
    <el-card style="width: 180px; height: fit-content">
      <template #header>
        <div class="card-header">
          <el-checkbox v-model="data.checkAll" :indeterminate="data.isIndeterminate" @change="handleCheckAllChange">
            全选
          </el-checkbox>
        </div>
      </template>
      <el-checkbox-group v-model="data.checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in data.cities" :key="city" :label="city" :value="city">
          {{ city }}
        </el-checkbox>
      </el-checkbox-group>
    </el-card>

    <el-card style="flex-grow: 1; margin-left: 10px">
      <el-table>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import {reactive, watch} from "vue";

const data = reactive({
  checkAll: false,
  isIndeterminate: true,
  checkedCities: [],
  cities: ['武汉市', '黄石市', '十堰市', '宜昌市', '襄阳市', '鄂州市', '荆门市', '孝感市', '荆州市', '黄冈市', '咸宁市', '随州市', '恩施州', '直管市林区'],
})

watch(() => data.checkedCities, (newCheckedCities) => {
  const checkedCount = newCheckedCities.length;
  data.checkAll = checkedCount === data.cities.length;
  data.isIndeterminate = checkedCount > 0 && checkedCount < data.cities.length;
}, {immediate: true});

const handleCheckAllChange = (val) => {
  data.checkedCities = val ? [...data.cities] : [];
  data.isIndeterminate = false;
}

const handleCheckedCitiesChange = (value) => {
  data.checkedCities = value;
  const checkedCount = value.length;
  data.checkAll = checkedCount === data.cities.length;
  data.isIndeterminate = checkedCount > 0 && checkedCount < data.cities.length;
}
</script>

<style>
.el-checkbox.is-checked .el-checkbox__inner {
  background-color: #f56c6c;
  border-color: #f56c6c;
}

.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #f56c6c;
  border-color: #f56c6c;
}

.el-checkbox.is-checked .el-checkbox__label {
  color: #f56c6c;
}

.el-checkbox__label {
  font-weight: normal;
  color: black;
}
</style>