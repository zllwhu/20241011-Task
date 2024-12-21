<template>
  <div>
    <el-card style="margin-bottom: 10px">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;伟大建党精神，指的是坚持真理、坚守理想，践行初心、担当使命，不怕牺牲、英勇斗争，对党忠诚、不负人民。扎根于中国具体实际，厚植于中华优秀传统文化。
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
    {name: '中国共产党纪律建设历史陈列馆', image: '/redmap1/1.jpg'},
    {name: '中共五大会址纪念馆', image: '/redmap1/2.jpg'},
    {name: '八七会议会址纪念馆', image: '/redmap1/3.jpg'},
    {name: '武汉中共中央机关旧址纪念馆', image: '/redmap1/4.jpg'},
    {name: '八路军武汉办事处旧址纪念馆', image: '/redmap1/5.jpg'},
    {name: '汉口新四军军部旧址纪念馆', image: '/redmap1/6.jpg'},
    {name: '武昌中央农民运动讲习所旧址', image: '/redmap1/7.png'},
    {name: '红安革命烈士陵园', image: '/redmap1/8.jpg'},
    {name: '七里坪革命旧址', image: '/redmap1/9.png'},
    {name: '湘鄂西革命根据地旧址', image: '/redmap1/10.jpeg'},
    {name: '李达故居', image: '/redmap1/11.jpeg'},
    {name: '鄂西苏维埃军政干校', image: '/redmap1/12.jpg'},
    {name: '红三军团医院旧址', image: '/redmap1/13.jpg'},
    {name: '黄冈实验小学教学楼', image: '/redmap1/14.jpeg'},
    {name: '雷天明故居', image: '/redmap1/15.jpeg'},
    {name: '石桥铺会议旧址', image: '/redmap1/16.jpeg'},
    {name: '王家坪烈士陵园', image: '/redmap1/17.jpg'},
    {name: '新四军第五师兵工厂', image: '/redmap1/18.jpg'},
    {name: '郧山书院旧址（红楼）', image: '/redmap1/19.jpeg'},
    {name: '工农红四方面军南化塘战斗旧址', image: '/redmap1/20.jpg'},
    {name: '中共松滋县第一届委员会遗址', image: '/redmap1/21.jpeg'},
    {name: '中共郧阳地下党支部旧址', image: '/redmap1/22.jpg'}
  ],
})

const handleImagePreview = (imageUrl) => {
  data.currentImage = imageUrl; // 设置当前图片地址
  data.dialogVisible = true; // 显示图片预览弹窗
}
</script>