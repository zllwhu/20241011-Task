<template>
  <div>
    <el-card style="margin-bottom: 10px">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;三牛精神基因是指为民服务孺子牛、创新发展拓荒牛、艰苦奋斗老黄牛的精神。这种精神是中国共产党团结带领中国人民自信自强、守正创新的精神密码，是中国共产党人奋斗精神的概括升华，成为中国共产党人精神谱系的重要组成部分。
    </el-card>

    <el-space wrap>
      <el-card v-for="(building, index) in data.buildings" :key="index" class="box-card" style="width: 236px">
        <template #header>
          <div class="card-header">
            <span>{{ building.name }}</span>
          </div>
        </template>
        <div style="display: flex; justify-content: center">
          <img style="width: 200px; height: 150px" :src="building.image" alt="" @click="handleImagePreview(building.image)"/>
        </div>
      </el-card>
    </el-space>
  </div>

  <el-dialog v-model="data.dialogVisible" width="700px" @close="data.currentImage = ''">
    <div class="image-container">
      <img :src="data.currentImage" alt="预览图" style="width: 668px; height: 501px;"/>
    </div>
  </el-dialog>
</template>

<script setup>
import {reactive} from "vue";

const data = reactive({
  buildings: [
    { name: '武大测绘遥感信息工程国重', image: '/redmap4/1.webp' },
    { name: '地大（武汉）逸夫博物馆', image: '/redmap4/2.jpg' },
    { name: '华科同济医学院', image: '/redmap4/3.jpeg' },
  ],
})

const handleImagePreview = (imageUrl) => {
  data.currentImage = imageUrl; // 设置当前图片地址
  data.dialogVisible = true; // 显示图片预览弹窗
}
</script>