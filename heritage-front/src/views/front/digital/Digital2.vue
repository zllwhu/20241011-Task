<template>
  <div>
    <el-card style="margin-bottom: 10px">
      <el-select v-model="data.selectedItem" placeholder="请选择建筑" style="width: 300px">
        <el-option v-for="item in data.options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </el-card>
    <el-card>
      视频
    </el-card>
  </div>
</template>

<script setup>
import {reactive} from "vue";

const data = reactive({
  selectedItem: '',
  options: [
    {
      value: 'Option1',
      label: 'Option1',
    },
    {
      value: 'Option2',
      label: 'Option2',
    },
    {
      value: 'Option3',
      label: 'Option3',
    },
  ]
})
</script>