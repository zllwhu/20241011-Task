<template>
  <div>

    <div>
      <el-button type="primary" @click="router.back()">返回主页</el-button>
    </div>

    <div style="margin-bottom: 20px">
      <el-input clearable v-model="data.input" style="width: 240px" placeholder="Please input here"
                :prefix-icon="Search"/>
      {{ data.input }}
      <el-input style="width: 240px" :suffix-icon="Calendar"/>
      <el-input type="textarea" style="width: 240px"/>
    </div>

    <div style="margin-bottom: 20px">
      <el-select multiple clearable v-model="data.value" placeholder="Select" style="width: 240px">
        <el-option v-for="item in data.option" :key="item.id" :label="item.label" :value="item.name"/>
      </el-select>
      {{ data.value }}
    </div>

    <div style="margin-bottom: 20px">
      <el-radio-group v-model="data.sex">
        <el-radio value="male">male</el-radio>
        <el-radio value="female">female</el-radio>
      </el-radio-group>
      {{ data.sex }}
    </div>

    <div style="margin-bottom: 20px">
      <el-radio-group v-model="data.tag">
        <el-radio-button label="My Posts" value="1"/>
        <el-radio-button label="My Interests" value="2"/>
        <el-radio-button label="My Stars" value="3"/>
      </el-radio-group>
      {{ data.tag }}
    </div>

    <div style="margin-bottom: 20px">
      <el-checkbox-group v-model="data.checkList">
        <el-checkbox v-for="item in data.option" :key="item.id" :label="item.label" :value="item.name"/>
      </el-checkbox-group>
      {{ data.checkList }}
    </div>

    <div style="margin-bottom: 20px">
      <el-image :src="img0" :preview-src-list="[img1, img2, img3]" style="width: 100px; height: 100px"/>
    </div>

    <div style="margin-bottom: 20px">
      <el-carousel arrow="always" trigger="click" height="500px" style="width: 500px">
        <el-carousel-item v-for="item in data.imgs" :key="item">
          <img style="width: 100%" :src="item"/>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div style="margin-bottom: 20px">
      <el-date-picker v-model="data.date" type="date" placeholder="Pick a day" format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"/>
      {{ data.date }}
      <el-date-picker style="margin-left: 50px" v-model="data.date1" type="datetime" placeholder="Pick a daytime"
                      format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"/>
      {{ data.date1 }}
    </div>

    <div style="margin-bottom: 20px">
      <el-date-picker v-model="data.daterange" type="daterange" , placeholder="Pick a date range" format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"/>
      {{ data.daterange }}
      <el-time-picker style="margin-left: 50px" v-model="data.time" placeholder="Pick a time" format="HH:mm:ss"
                      value-format="HH:mm:ss"/>
      {{ data.time }}
    </div>

    <div style="margin-bottom: 20px">
      <el-table :data="data.tableData" style="width: 600px" border stripe>
        <el-table-column prop="date" label="Date" width="200"/>
        <el-table-column prop="name" label="Name" width="100"/>
        <el-table-column prop="address" label="Address" width="300"/>
        <el-table-column fixed="right" label="Operations" min-width="120">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
            <el-button link type="primary" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding-bottom: 20px">
        <el-pagination
            v-model:current-page="data.currentPage"
            v-model:page-size="data.pageSize"
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="data.tableData.length"
        />
      </div>
    </div>

    <div style="margin-bottom: 20px">
      {{ data.id }}
    </div>

    <div style="margin-bottom: 20px">
      {{ data.name }}
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {Calendar, Search} from "@element-plus/icons-vue"
import img0 from '@/assets/img/logo.svg'
import img1 from '@/assets/img/1.png'
import img2 from '@/assets/img/2.png'
import img3 from '@/assets/img/3.png'
import router from "@/router/index.js";

const handleClick = () => {
  console.log('click')
}

const data = reactive({
  id: router.currentRoute.value.query.id,
  name: router.currentRoute.value.query.name,
  input: '',
  value: '',
  option: [{id: 1, label: 'apple', name: '0001'}, {id: 2, label: 'banana', name: '0002'}, {
    id: 3,
    label: 'peach',
    name: '0003'
  }, {id: 4, label: 'apple', name: '0004'},],
  sex: '',
  tag: '1',
  checkList: [],
  imgs: [img1, img2, img3],
  date: '',
  date1: '',
  daterange: [],
  time: '',
  currentPage: 1,
  pageSize: 5,
  tableData: [{
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-08',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-06',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-07',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]
})

console.log('获取id' + data.id)

</script>
