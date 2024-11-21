<template>
  <div>
    <div>
      <el-card shadow="never" style="margin-bottom: 10px">
        <el-input style="margin-right: 12px; width: 240px" v-model="data.name" placeholder="请输入姓名查询"
                  :prefix-icon="Search"/>
        <el-button @click="load">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-card>
      <el-card shadow="never" style="margin-bottom: 10px">
        <el-button :icon="CirclePlus" @click="handleAdd">新增</el-button>
        <el-button :icon="Remove">删除</el-button>
        <el-button :icon="BottomLeft">导入</el-button>
        <el-button :icon="TopRight">导出</el-button>
      </el-card>
      <el-card shadow="never" style="margin-bottom: 10px">
        <el-table :data="data.tableData">
          <el-table-column label="姓名" prop="name"/>
          <el-table-column label="性别" prop="sex"/>
          <el-table-column label="学号" prop="no"/>
          <el-table-column label="年龄" prop="age"/>
          <el-table-column label="个人介绍" prop="description" show-overflow-tooltip/>
          <el-table-column label="部门" prop="departmentName"/>
        </el-table>
        <div style="margin-top: 15px">
          <el-pagination
              @size-change="load"
              @current-change="load"
              v-model:current-page="data.pageNum"
              v-model:page-size="data.pageSize"
              :page-sizes="[5, 10, 15, 20]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="data.total"/>
        </div>
      </el-card>
    </div>
    <el-dialog v-model="data.formVisible" title="员工信息" width="600">
      <el-form :model="data.form" label-width="auto" style="padding-right: 20px; padding-top: 20px">
        <el-form-item label="姓名：" label-position="right">
          <el-input v-model="data.form.name" autocomplete="off" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="性别：" label-position="right">
          <el-radio-group v-model="data.form.sex">
            <el-radio value="男" label="男"/>
            <el-radio value="女" label="女"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学号：" label-position="right">
          <el-input v-model="data.form.no" autocomplete="off" placeholder="请输入学号"/>
        </el-form-item>
        <el-form-item label="年龄：" label-position="right">
          <el-input-number style="width: 180px" v-model="data.form.age" autocomplete="off" placeholder="请输入年龄"/>
        </el-form-item>
        <el-form-item label="个人介绍：" label-position="right">
          <el-input :rows="3" type="textarea" v-model="data.form.description" autocomplete="off"
                    placeholder="请输入个人介绍"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="data.formVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">保 存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {BottomLeft, CirclePlus, Remove, Search, TopRight} from "@element-plus/icons-vue"
import request from "@/utils/request.js";
import {ElMessage} from "element-plus";

const data = reactive({
  name: null,
  tableData: [],
  pageNum: 1,
  pageSize: 10,
  total: 0,
  formVisible: false,
  form: {}
})

const load = () => {
  request.get('/employee/selectPage', {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      name: data.name
    }
  }).then(res => {
    console.log(res)
    data.tableData = res.data.list
    data.total = res.data.total
  })
}
load()

const reset = () => {
  data.name = null
  load()
}

const handleAdd = () => {
  data.formVisible = true
  data.form = {}
}

const save = () => {
  request.post('/employee/add', data.form).then(res => {
    if (res.code === '200') {
      data.formVisible = false
      ElMessage.success('操作成功')
      load()
    } else {
      ElMessage.error(res.msg)
    }
  })
}
</script>