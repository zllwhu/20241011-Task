<template>
  <div>
    <el-card style="margin-bottom: 10px">
      <template #header>
        <div class="card-header">
          <span>中国美术馆象山校区</span>
        </div>
      </template>
      <model-viewer
          :src="modelPath"
          alt="A 3D model of a helmet"
          auto-rotate
          camera-controls
          ar
          style="width: 100%; height: 500px; background-color: #eee;"/>
    </el-card>
  </div>
</template>

<script setup>
import '@google/model-viewer';
import {ref} from 'vue';

const modelPath = ref('/models/王树中国美术馆象山校区.glb');
</script>
