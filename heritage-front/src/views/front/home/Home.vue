<template>
  <div style="display: flex; justify-content: center; padding-top: 30px; flex-direction: column">
    <el-card style="width: 100%; height: calc(100vh - 180px); margin-bottom: 10px" id="main"/>
  </div>
</template>

<script setup>
import {reactive, onMounted} from "vue";
import * as echarts from "echarts";

const data = reactive({});

onMounted(() => {
  const chartDom = document.getElementById("main");
  const myChart = echarts.init(chartDom);
  let option;
  const svgPath = new URL('@/assets/img/Hubei.svg', import.meta.url).href;
  fetch(svgPath)
      .then((response) => response.text())
      .then((svg) => {
        echarts.registerMap("iceland_svg", {svg: svg});
        option = {
          tooltip: {},
          geo: {
            tooltip: {
              show: true,
            },
            map: "iceland_svg",
            roam: true,
          },
          series: {
            type: "effectScatter",
            coordinateSystem: "geo",
            geoIndex: 0,
            symbolSize: 10,
            itemStyle: {
              color: "#f56c6c",
            },
            encode: {
              tooltip: 2,
            },
            data: [
              [1064.65516, 487.06251, '鄂州市'],
              [260.64371, 508.18175, '恩施土家族苗族自治州'],
              [1154.65644, 427.30465, '黄冈市'],
              [1105.93575, 549.22028, '黄石市'],
              [732.97044,372.82661, '荆门市'],
              [727.21035, 538.42066, '荆州市'],
              // [755.77076, 485.62256, '不统计'],
              // [403.68575, 292.4295, '不统计'],
              [398.64568, 158.7543, '十堰市'],
              [858.73223, 255.47083, '随州市'],
              // [810.73154,438.34426, '不统计'],
              [1000.81425 ,441.46415, '武汉市'],
              // [851.29212, 493.06229, '不统计'],
              [974.89388, 596.01859, '咸宁市'],
              [629.28896, 239.87139, '襄阳市'],
              [929.05323, 365.14689, '孝感市'],
              [505.6872, 422.50483, '宜昌市'],
            ],
          },
        };
        myChart.setOption(option);
        myChart.getZr().on("click", function (params) {
          const pixelPoint = [params.offsetX, params.offsetY];
          const dataPoint = myChart.convertFromPixel({geoIndex: 0}, pixelPoint);
          console.log(dataPoint);
        });
      })
      .catch((error) => console.error("Error loading SVG:", error));
});
</script>