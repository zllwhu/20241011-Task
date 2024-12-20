<template>
  <div>
    <div>
      <el-card shadow="never" style="margin-bottom: 10px">
        <el-input style="margin-right: 12px; width: 240px" v-model="data.name" placeholder="请输入建筑名称查询"
                  :prefix-icon="Search"/>
        <el-button @click="load">查询</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="handleAdd" type="primary">新增</el-button>
      </el-card>
      <el-card shadow="never" style="margin-bottom: 10px">
        <el-table :data="data.tableData">
          <el-table-column label="ID" prop="archiId"/>
          <el-table-column label="名称" prop="archiName"/>
          <el-table-column label="建筑介绍文档" prop="archiDoc"/>
          <el-table-column label="立体图" prop="archiElevation">
            <template #default="scope">
              <img v-if="scope.row.archiElevation" :src="getAvatar(scope.row.archiElevation)" alt=""
                   style="display: block; width: 50px;" @click="handleImagePreview(scope.row.archiElevation)"/>
            </template>
          </el-table-column>
          <el-table-column label="平面图" prop="archiPlan">
            <template #default="scope">
              <img v-if="scope.row.archiPlan" :src="getAvatar(scope.row.archiPlan)" alt=""
                   style="display: block; width: 50px;" @click="handleImagePreview(scope.row.archiPlan)"/>
            </template>
          </el-table-column>
          <el-table-column label="透视图" prop="archiPerspective">
            <template #default="scope">
              <img v-if="scope.row.archiPerspective" :src="getAvatar(scope.row.archiPerspective)" alt=""
                   style="display: block; width: 50px;" @click="handleImagePreview(scope.row.archiPerspective)"/>
            </template>
          </el-table-column>
          <el-table-column label="剖面图" prop="archiSectionview">
            <template #default="scope">
              <img v-if="scope.row.archiSectionview" :src="getAvatar(scope.row.archiSectionview)" alt=""
                   style="display: block; width: 50px;" @click="handleImagePreview(scope.row.archiSectionview)"/>
            </template>
          </el-table-column>
          <el-table-column label="总平面图" prop="archiGeneral">
            <template #default="scope">
              <img v-if="scope.row.archiGeneral" :src="getAvatar(scope.row.archiGeneral)" alt=""
                   style="display: block; width: 50px;" @click="handleImagePreview(scope.row.archiGeneral)"/>
            </template>
          </el-table-column>
          <el-table-column label="效果图" prop="archiRendering">
            <template #default="scope">
              <img v-if="scope.row.archiRendering" :src="getAvatar(scope.row.archiRendering)" alt=""
                   style="display: block; width: 50px;" @click="handleImagePreview(scope.row.archiRendering)"/>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="150" fixed="right">
            <template #default="scope">
              <el-button @click="handleUpdate(scope.row)" link type="primary" :icon="Edit">编辑</el-button>
              <el-button @click="del(scope.row.archiId)" link type="danger" :icon="Delete">删除</el-button>
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

    <el-dialog v-model="data.dialogVisible" width="800px" @close="data.currentImage = ''">
      <div class="image-container">
        <img :src="data.currentImage" alt="预览图" style="max-width: 100%; max-height: 600px;"/>
      </div>
    </el-dialog>

    <el-dialog v-model="data.formVisible" title="建筑信息" width="600px" destroy-on-close>
      <el-form ref="formRef" :rules="data.rules" :model="data.form" label-width="auto"
               style="padding-right: 20px; padding-top: 20px">
        <el-form-item label="名称：" label-position="right" prop="archiName">
          <el-input v-model="data.form.archiName" autocomplete="off" placeholder="请输入建筑名称"/>
        </el-form-item>
        <el-form-item label="建筑介绍文档：" label-position="right" prop="archiDoc">
          <el-upload :action="uploadUrl" list-type="text" :on-success="handleDocSuccess">
            <el-button>上传建筑介绍文档</el-button>
          </el-upload>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="立体图：" label-position="right" prop="archiElevation">
              <el-upload :action="uploadUrl" list-type="text" :on-success="handleElevationSuccess">
                <el-button>上传立体图</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="平面图：" label-position="right" prop="archiPlan">
              <el-upload :action="uploadUrl" list-type="text" :on-success="handlePlanSuccess">
                <el-button>上传平面图</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="透视图：" label-position="right" prop="archiPerspective">
              <el-upload :action="uploadUrl" list-type="text" :on-success="handlePerspectiveSuccess">
                <el-button>上传透视图</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="剖面图：" label-position="right" prop="archiSectionview">
              <el-upload :action="uploadUrl" list-type="text" :on-success="handleSectionviewSuccess">
                <el-button>上传剖面图</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="总平面图：" label-position="right" prop="archiGeneral">
              <el-upload :action="uploadUrl" list-type="text" :on-success="handleGeneralSuccess">
                <el-button>上传总平面图</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="效果图：" label-position="right" prop="archiRendering">
              <el-upload :action="uploadUrl" list-type="text" :on-success="handleRenderingSuccess">
                <el-button>上传效果图</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
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
import {Delete, Edit, Search} from "@element-plus/icons-vue"
import request from "@/utils/request.js";
import {ElMessage, ElMessageBox} from "element-plus";

const data = reactive({
  name: null,
  tableData: [],
  pageNum: 1,
  pageSize: 5,
  total: 0,
  formVisible: false,
  form: {},
  rules: {
    archiName: [
      {required: true, message: '请输入建筑名称', trigger: 'blur'},
    ],
  },
  dialogVisible: false,
  currentImage: '',
})

const formRef = ref()

const getAvatar = (avatar) => {
  return request.defaults.baseURL + "/system/whuarchi/download/" + avatar;
}

const handleDocSuccess = (res) => {
  data.form.archiDoc = res.msg
}

const handleElevationSuccess = (res) => {
  data.form.archiElevation = res.msg
}

const handlePlanSuccess = (res) => {
  data.form.archiPlan = res.msg
}

const handlePerspectiveSuccess = (res) => {
  data.form.archiPerspective = res.msg
}

const handleSectionviewSuccess = (res) => {
  data.form.archiSectionview = res.msg
}

const handleGeneralSuccess = (res) => {
  data.form.archiGeneral = res.msg
}

const handleRenderingSuccess = (res) => {
  data.form.archiRendering = res.msg
}

const uploadUrl = ref(request.defaults.baseURL + "/system/whuarchi/upload");

const load = () => {
  request.get('/system/whuarchi/selectPage', {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      archiName: data.name
    }
  }).then(res => {
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
      data.form.archiId ? update() : add()
    }
  })
}

const cancel = () => {
  data.formVisible = false
}

const add = () => {
  request.post('/system/whuarchi', data.form).then(res => {
    if (res.code === 200) {
      data.formVisible = false
      ElMessage.success('操作成功')
      load()
    } else {
      ElMessage.error(res.msg)
    }
  })
}

const update = () => {
  request.put('/system/whuarchi', data.form).then(res => {
    if (res.code === 200) {
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
  console.log(id)
  ElMessageBox.confirm('删除数据后无法恢复，是否确认删除？', '删除确认', {type: 'warning'}).then(() => {
    request.delete('/system/whuarchi/' + id).then(res => {
      if (res.code === 200) {
        data.formVisible = false
        ElMessage.success('操作成功')
        load()
      } else {
        ElMessage.error(res.msg)
      }
    })
  }).catch()
}

const handleImagePreview = (imageUrl) => {
  data.currentImage = getAvatar(imageUrl); // 设置当前图片地址
  data.dialogVisible = true; // 显示图片预览弹窗
}
</script>

<style scoped>
.image-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 让容器填满父元素 */
}
</style>