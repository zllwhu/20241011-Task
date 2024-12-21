<template>
  <div>
    <el-card style="margin-bottom: 10px">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;抗战精神内涵主要包括：天下兴亡、匹夫有责的爱国情怀；视死如归、宁死不屈的民族气节；不畏强暴、血战到底的英雄气概；百折不挠、坚忍不拔的必胜信念。
      抗战精神基因是指在中国人民抗日战争期间，中国军民在抗击日本帝国主义侵略的艰苦斗争中形成的一种伟大的民族精神。它具体包括以下几个方面：
      <br>1.	爱国主义精神： 抗战精神首先是一种爱国主义精神。在国家和民族生死存亡的危急关头，中国人民表现出了对祖国的无限忠诚和热爱，愿意为保卫祖国和民族的尊严而英勇斗争。
      <br>2.	团结协作精神： 抗战精神还体现了一种团结协作的精神。在抗击外敌入侵的过程中，中国各族人民、各阶层人士、各党派团体都团结起来，共同为抗击侵略者而奋斗。
      <br>3.	艰苦奋斗精神： 抗战精神还体现了一种艰苦奋斗的精神。在物资匮乏、条件艰苦的情况下，中国人民不畏艰难，顽强拼搏，最终赢得了抗日战争的胜利。
      <br>4.	百折不挠精神： 抗战精神还体现了一种百折不挠的精神。在长期的抗战过程中，中国人民面对敌人的残暴和战争的残酷，始终保持着坚定的信念和必胜的信心，不屈不挠地坚持抗战。
      <br>5.	英勇牺牲精神： 抗战精神还体现了一种英勇牺牲的精神。在抗击侵略者的斗争中，无数的中国军民为了国家和民族的利益，英勇地献出了自己的生命。
      <br>6.	自力更生精神： 抗战精神还体现了一种自力更生的精神。在抗击侵略者的斗争中，中国人民依靠自己的力量，克服了种种困难，最终取得了胜利。
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
    { name: '周恩来故居', image: '/redmap2/1.jpg' },
    { name: '郭沫若故居', image: '/redmap2/2.png' },
    { name: '学生饭厅及礼堂', image: '/redmap2/3.png' },
    { name: '鄂西苏维埃军政干校', image: '/redmap1/12.jpg' },
    { name: '红三军团医院旧址', image: '/redmap1/13.jpg' },
    { name: '黄冈实验小学教学楼', image: '/redmap1/14.jpeg' },
    {name: '雷天明故居', image: '/redmap1/15.jpeg'},
    {name: '石桥铺会议旧址', image: '/redmap1/16.jpeg'},
    {name: '王家坪烈士陵园', image: '/redmap1/17.jpg'},
    {name: '新四军第五师兵工厂', image: '/redmap1/18.jpg'},
    {name: '郧山书院旧址（红楼）', image: '/redmap1/19.jpeg'},
    {name: '工农红四方面军南化塘战斗旧址', image: '/redmap1/20.jpg'},
    {name: '中共松滋县第一届委员会遗址', image: '/redmap1/21.jpeg'},
    {name: '中共郧阳地下党支部旧址', image: '/redmap1/22.jpg'},
    { name: '宜昌市夷陵区南边抗日将士陵园', image: '/redmap2/4.png' },
    { name: '鄂南抗日根据地指挥中心旧址', image: '/redmap2/16.jpg' },
    { name: '新四军第五师纪念馆', image: '/redmap2/17.jpg' },
    { name: '汉口新四军军部旧址纪念馆', image: '/redmap1/6.jpg' },
    { name: '鄂豫边区革命烈士陵园', image: '/redmap2/19.jpg' }
  ],
})

const handleImagePreview = (imageUrl) => {
  data.currentImage = imageUrl; // 设置当前图片地址
  data.dialogVisible = true; // 显示图片预览弹窗
}
</script>