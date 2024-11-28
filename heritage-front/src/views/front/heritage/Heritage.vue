<template>
  <div style="display: flex; justify-content: flex-start; padding-top: 30px; flex-direction: row">
    <el-card style="width: 220px; min-height: calc(100vh - 160px)">
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
      <el-table :data="data.tableData">
        <el-table-column label="名称" prop="name"/>
        <el-table-column label="别名" prop="nickname"/>
        <el-table-column label="年代" prop="time"/>
        <el-table-column label="文物类别" prop="category"/>
        <el-table-column label="保护级别" prop="protection"/>
        <el-table-column label="城市" prop="city"/>
      </el-table>
      <div style="margin-top: 15px">
        <el-pagination
            v-model:current-page="data.pageNum"
            v-model:page-size="data.pageSize"
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="data.total"/>
      </div>
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
  tableData: [],
  pageNum: 1,
  pageSize: 5,
  total: 0,
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
  color: #303133;
}
</style>