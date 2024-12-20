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
          <el-table-column label="封面图案" prop="archiCover">
            <template #default="scope">
              <img v-if="scope.row.archiCover" :src="getAvatar(scope.row.archiCover)" alt=""
                   style="display: block; width: 50px;"/>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="archiName"/>
          <el-table-column label="别名" prop="archiNickname"/>
          <el-table-column label="年代" prop="archiYear"/>
          <el-table-column label="年代说明" prop="archiYearinfo" show-overflow-tooltip/>
          <el-table-column label="文物类别" prop="archiCategory"/>
          <el-table-column label="保护级别" prop="archiLevel"/>
          <el-table-column label="公布年份" prop="archiAnnouncementYear"/>
          <el-table-column label="公布批次" prop="archiAnnouncementBatch"/>
          <el-table-column label="省份" prop="archiProvince"/>
          <el-table-column label="城市" prop="archiCity"/>
          <el-table-column label="区" prop="archiDistrict"/>
          <el-table-column label="街道" prop="archiStreet"/>
          <el-table-column label="学校" prop="archiSchool"/>
          <el-table-column label="经度" prop="archiLongitude"/>
          <el-table-column label="纬度" prop="archiLatitude"/>
          <el-table-column label="海拔" prop="archiHeight"/>
          <el-table-column label="建筑简介" prop="archiDetail" show-overflow-tooltip/>
          <el-table-column label="红色精神" prop="archiSpirit"/>
          <el-table-column label="红色故事简介" prop="archiStoryabstract" show-overflow-tooltip/>
          <el-table-column label="红色故事详细" prop="archiStoryfull" show-overflow-tooltip/>
          <el-table-column label="红色故事文章" prop="archiStorypath" show-overflow-tooltip/>
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
    <el-dialog v-model="data.formVisible" title="建筑信息" width="1000px" destroy-on-close>
      <el-form ref="formRef" :rules="data.rules" :model="data.form" label-width="auto"
               style="padding-right: 20px; padding-top: 20px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="名称：" label-position="right" prop="archiName">
              <el-input v-model="data.form.archiName" autocomplete="off" placeholder="请输入建筑名称"/>
            </el-form-item>
            <el-form-item label="别名：" label-position="right" prop="archiNickname">
              <el-input v-model="data.form.archiNickname" autocomplete="off" placeholder="请输入建筑别名"/>
            </el-form-item>
            <el-form-item label="年代：" label-position="right" prop="archiYear">
              <el-input v-model="data.form.archiYear" autocomplete="off" placeholder="请输入年代"/>
            </el-form-item>
            <el-form-item label="年代说明：" label-position="right" prop="archiYearinfo">
              <el-input v-model="data.form.archiYearinfo" autocomplete="off" placeholder="请输入年代说明"/>
            </el-form-item>
            <el-form-item label="文物类别：" label-position="right" prop="archiCategory">
              <el-input v-model="data.form.archiCategory" autocomplete="off" placeholder="请输入文物类别"/>
            </el-form-item>
            <el-form-item label="保护级别：" label-position="right" prop="archiLevel">
              <el-input v-model="data.form.archiLevel" autocomplete="off" placeholder="请输入保护级别"/>
            </el-form-item>
            <el-form-item label="公布年份：" label-position="right" prop="archiAnnouncementYear">
              <el-input-number style="width: 200px" v-model="data.form.archiAnnouncementYear" autocomplete="off"
                               placeholder="请输入公布年份"/>
            </el-form-item>
            <el-form-item label="公布批次：" label-position="right" prop="archiAnnouncementBatch">
              <el-input-number style="width: 200px" v-model="data.form.archiAnnouncementBatch" autocomplete="off"
                               placeholder="请输入公布批次"/>
            </el-form-item>
            <el-form-item label="建筑简介：" label-position="right" prop="archiDetail">
              <el-input v-model="data.form.archiDetail" autocomplete="off" placeholder="请输入建筑简介"/>
            </el-form-item>
            <el-form-item label="封面图案：" label-position="right" prop="archiCover">
              <el-upload :action="uploadUrl" list-type="text" :on-success="handleAvatarSuccess">
                <el-button>上传封面图案</el-button>
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="省份：" label-position="right" prop="archiProvince">
              <el-input v-model="data.form.archiProvince" autocomplete="off" placeholder="请输入省份"/>
            </el-form-item>
            <el-form-item label="城市：" label-position="right" prop="archiCity">
              <el-input v-model="data.form.archiCity" autocomplete="off" placeholder="请输入城市"/>
            </el-form-item>
            <el-form-item label="区：" label-position="right" prop="archiDistrict">
              <el-input v-model="data.form.archiDistrict" autocomplete="off" placeholder="请输入区"/>
            </el-form-item>
            <el-form-item label="街道：" label-position="right" prop="archiStreet">
              <el-input v-model="data.form.archiStreet" autocomplete="off" placeholder="请输入街道"/>
            </el-form-item>
            <el-form-item label="学校：" label-position="right" prop="archiSchool">
              <el-input v-model="data.form.archiSchool" autocomplete="off" placeholder="请输入学校"/>
            </el-form-item>
            <el-form-item label="经度：" label-position="right" prop="archiLongitude">
              <el-input v-model="data.form.archiLongitude" autocomplete="off" placeholder="请输入经度"/>
            </el-form-item>
            <el-form-item label="纬度：" label-position="right" prop="archiLatitude">
              <el-input v-model="data.form.archiLatitude" autocomplete="off" placeholder="请输入纬度"/>
            </el-form-item>
            <el-form-item label="海拔：" label-position="right" prop="archiHeight">
              <el-input-number style="width: 200px" v-model="data.form.archiHeight" autocomplete="off"
                               placeholder="请输入海拔"/>
            </el-form-item>
            <el-form-item label="红色精神：" label-position="right" prop="archiSpirit">
              <el-input v-model="data.form.archiSpirit" autocomplete="off" placeholder="请输入红色精神"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col>
            <el-form-item label="红色故事简介：" label-position="right" prop="archiStoryabstract">
              <el-input :rows="1" type="textarea" v-model="data.form.archiStoryabstract" autocomplete="off" placeholder="请输入红色故事简介"/>
            </el-form-item>
            <el-form-item label="红色故事详细：" label-position="right" prop="archiStoryfull">
              <el-input :rows="1" type="textarea" v-model="data.form.archiStoryfull" autocomplete="off" placeholder="请输入红色故事详细"/>
            </el-form-item>
            <el-form-item label="红色故事文章：" label-position="right" prop="archiStorypath">
              <el-input :rows="1" type="textarea" v-model="data.form.archiStorypath" autocomplete="off" placeholder="请输入红色故事文章"/>
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
  }
})

const formRef = ref()

const getAvatar = (avatar) => {
  const downloadUrl = request.defaults.baseURL + "/system/architecture/download/" + avatar;
  return downloadUrl;
}

const handleAvatarSuccess = (res) => {
  data.form.archiCover = res.msg
}

const uploadUrl = ref(request.defaults.baseURL + "/system/architecture/upload");

const load = () => {
  request.get('/system/architecture/selectPage', {
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
  request.post('/system/architecture', data.form).then(res => {
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
  request.put('/system/architecture', data.form).then(res => {
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
    request.delete('/system/architecture/' + id).then(res => {
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
</script>