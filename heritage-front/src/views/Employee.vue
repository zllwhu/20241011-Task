<template>
  <div>
    <div>
      <el-card shadow="never" style="margin-bottom: 10px">
        <el-input style="margin-right: 12px; width: 240px" v-model="data.name" placeholder="请输入姓名查询"
                  :prefix-icon="Search"/>
        <el-button @click="load">查询</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="handleAdd" type="primary">新增</el-button>
      </el-card>
      <el-card shadow="never" style="margin-bottom: 10px">
        <el-table :data="data.tableData">
          <el-table-column label="账号" prop="username"/>
          <el-table-column label="头像">
            <template #default="scope">
              <img v-if="scope.row.avatar" :src="scope.row.avatar" alt=""
                   style="display: block; width: 40px; height: 40px; border-radius: 50%"/>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="name"/>
          <el-table-column label="性别" prop="sex"/>
          <el-table-column label="学号" prop="no"/>
          <el-table-column label="年龄" prop="age"/>
          <el-table-column label="个人介绍" prop="description" show-overflow-tooltip/>
          <el-table-column label="部门" prop="departmentName"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button @click="handleUpdate(scope.row)" link type="primary" :icon="Edit">编辑</el-button>
              <el-button @click="del(scope.row.id)" link type="danger" :icon="Delete">删除</el-button>
            </template>
          </el-table-column>
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
    <el-dialog v-model="data.formVisible" title="普通用户信息" width="600" destroy-on-close>
      <el-form ref="formRef" :rules="data.rules" :model="data.form" label-width="auto"
               style="padding-right: 20px; padding-top: 20px">
        <el-form-item label="账号：" label-position="right" prop="username">
          <el-input :disabled="data.form.id" v-model="data.form.username" autocomplete="off" placeholder="请输入账号"/>
        </el-form-item>
        <el-form-item label="头像" label-position="right" prop="avatar">
          <el-upload action="http://localhost:9090/files/upload" list-type="picture" :on-success="handleAvatarSuccess">
            <el-button>上传头像</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名：" label-position="right" prop="name">
          <el-input v-model="data.form.name" autocomplete="off" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="性别：" label-position="right">
          <el-radio-group v-model="data.form.sex">
            <el-radio value="男" label="男"/>
            <el-radio value="女" label="女"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学号：" label-position="right" prop="no">
          <el-input v-model="data.form.no" autocomplete="off" placeholder="请输入学号"/>
        </el-form-item>
        <el-form-item label="年龄：" label-position="right">
          <el-input-number :min="18" style="width: 180px" v-model="data.form.age" autocomplete="off"
                           placeholder="请输入年龄"/>
        </el-form-item>
        <el-form-item label="个人介绍：" label-position="right">
          <el-input :rows="3" type="textarea" v-model="data.form.description" autocomplete="off"
                    placeholder="请输入个人介绍"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="save">保 存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {Delete, Edit, Plus, Search} from "@element-plus/icons-vue"
import request from "@/utils/request.js";
import {ElMessage, ElMessageBox} from "element-plus";

const data = reactive({
  name: null,
  tableData: [],
  pageNum: 1,
  pageSize: 10,
  total: 0,
  formVisible: false,
  form: {},
  rules: {
    username: [
      {required: true, message: '请输入账号', trigger: 'blur'},
    ],
    name: [
      {required: true, message: '请输入姓名', trigger: 'blur'},
    ],
    no: [
      {required: true, message: '请输入学号', trigger: 'blur'},
    ]
  }
})

const formRef = ref()

const handleAvatarSuccess = (res) => {
  data.form.avatar = res.data
}

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
  formRef.value.validate(valid => {
    if (valid) {
      data.form.id ? update() : add()
    }
  })
}

const cancel = () => {
  data.formVisible = false
}

const add = () => {
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

const update = () => {
  request.put('/employee/update', data.form).then(res => {
    if (res.code === '200') {
      data.formVisible = false
      ElMessage.success('操作成功')
      load()
    } else {
      ElMessage.error(res.msg)
    }
  })
}

const handleUpdate = (row) => {
  data.form = JSON.parse(JSON.stringify(row))
  data.formVisible = true
}

const del = (id) => {
  ElMessageBox.confirm('删除数据后无法恢复，是否确认删除？', '删除确认', {type: 'warning'}).then(() => {
    request.delete('/employee/deleteById/' + id).then(res => {
      if (res.code === '200') {
        data.formVisible = false
        ElMessage.success('操作成功')
        load()
      } else {
        ElMessage.error(res.msg)
      }
    })
  }).catch()
}
</script>