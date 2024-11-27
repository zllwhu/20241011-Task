<template>
  <div>
    <div>
      <el-card shadow="never" style="margin-bottom: 10px">
        <el-input style="margin-right: 12px; width: 240px" v-model="data.name" placeholder="请输入名称查询"
                  :prefix-icon="Search"/>
        <el-button>查询</el-button>
        <el-button>重置</el-button>
      </el-card>
      <el-card shadow="never" style="margin-bottom: 10px">
        <el-button :icon="CirclePlus">新增</el-button>
        <el-button :icon="Remove">删除</el-button>
        <el-button :icon="BottomLeft">导入</el-button>
        <el-button :icon="TopRight">导出</el-button>
      </el-card>
      <el-card shadow="never" style="margin-bottom: 10px">
        <el-table :data="data.tableData">
          <el-table-column label="日期" prop="date"/>
          <el-table-column label="姓名" prop="name"/>
          <el-table-column label="地址" prop="address"/>
        </el-table>
        <div style="margin-top: 15px">
          <el-pagination
              v-model:current-page="data.pageNumber"
              v-model:page-size="data.pageSize"
              :page-sizes="[5, 10, 15, 20]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="data.tableData.length"/>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {BottomLeft, CirclePlus, Remove, Search, TopRight} from "@element-plus/icons-vue"

const data = reactive({
  name: null,
  tableData: [
    {id: 1, date: '2024-11-12', name: '特仑苏', address: '内蒙古'},
    {id: 2, date: '2024-11-12', name: '金典', address: '内蒙古'},
    {id: 3, date: '2024-11-12', name: '君乐宝', address: '河北'},
  ],
  pageNumber: 1,
  pageSize: 10,
})
</script>
