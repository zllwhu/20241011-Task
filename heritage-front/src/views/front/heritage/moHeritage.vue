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
      </el-table>
      <div style="margin-top: 15px">
        <el-pagination
            v-if="data.total > 0"
            @size-change="handlePageSizeChange"
            @current-change="handlePageChange"
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
</template>

<script setup>
import {reactive, watch} from "vue";
import request from "@/utils/request.js";

const data = reactive({
  checkAll: false,
  isIndeterminate: true,
  checkedCities: [],
  cities: ['武汉市', '黄石市', '十堰市', '宜昌市', '襄阳市', '鄂州市', '荆门市', '孝感市', '荆州市', '黄冈市', '咸宁市', '随州市', '恩施州', '直管市林区'],
  tableData: [],
  allData: [],  // 存储后端返回的所有数据
  pageNum: 1,  // 当前页
  pageSize: 5,  // 每页显示的数据条数
  total: 0,  // 总数据条数
  dialogVisible: false,
  currentImage: '',
});

// 监控已选择的城市
watch(() => data.checkedCities, (newCheckedCities) => {
  const checkedCount = newCheckedCities.length;
  data.checkAll = checkedCount === data.cities.length;
  data.isIndeterminate = checkedCount > 0 && checkedCount < data.cities.length;
}, {immediate: true});

// 处理全选事件
const handleCheckAllChange = (val) => {
  data.checkedCities = val ? [...data.cities] : [];
  data.isIndeterminate = false;
};

// 处理选中城市变化事件
const handleCheckedCitiesChange = (value) => {
  data.checkedCities = value;
  const checkedCount = value.length;
  data.checkAll = checkedCount === data.cities.length;
  data.isIndeterminate = checkedCount > 0 && checkedCount < data.cities.length;
};

// 加载数据并根据分页参数传递分页信息
const load = () => {
  request.get('/system/architecture/alllist').then(res => {
    console.log(res); // 输出接口返回的数据
    if (res.data) {
      data.allData = res.data;  // 存储全部数据
      data.total = res.data.length;  // 总数据条数
      // 分页：根据当前页码和每页条数切割数据
      data.tableData = paginateData();
      console.log("Total:", data.total);
    } else {
      console.error("接口返回的数据格式不正确");
    }
  }).catch(error => {
    console.error("请求失败:", error);
  });
};

// 分页函数：根据当前页码和每页条数切割数据
const paginateData = () => {
  const start = (data.pageNum - 1) * data.pageSize;
  const end = start + data.pageSize;
  return data.allData.slice(start, end);
};

// 处理页码变化事件
const handlePageChange = (page) => {
  data.pageNum = page;  // 更新当前页码
  data.tableData = paginateData();  // 更新表格数据
};

// 处理每页条数变化事件
const handlePageSizeChange = (size) => {
  data.pageSize = size;  // 更新每页条数
  data.pageNum = 1;  // 每次改变每页条数时，重置到第一页
  data.tableData = paginateData();  // 更新表格数据
};

// 初始加载数据
load();

const getAvatar = (avatar) => {
  return request.defaults.baseURL + "/system/architecture/download/" + avatar;
}

const handleImagePreview = (imageUrl) => {
  data.currentImage = getAvatar(imageUrl); // 设置当前图片地址
  data.dialogVisible = true; // 显示图片预览弹窗
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

.image-container {
  display: flex;
  justify-content: center;  /* 水平居中 */
  align-items: center;      /* 垂直居中 */
  height: 100%;             /* 让容器填满父元素 */
}
</style>