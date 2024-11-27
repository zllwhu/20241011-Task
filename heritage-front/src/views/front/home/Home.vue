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
  const svgPath = new URL('@/assets/img/Map_of_Iceland.svg', import.meta.url).href;
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
            symbolSize: 20,
            itemStyle: {
              color: "#b02a02",
            },
            encode: {
              tooltip: 2,
            },
            data: [
              [488.2358421078053, 459.70913833075736, '武汉'],
              [770.3415644319939, 757.9672194986475, '黄冈'],
              [1180.0329284196291, 743.6141808346214, '孝感'],
              [894.03790632245, 1188.1985153835008, '鄂州'],
              [1372.98925630313, 477.3839988649537, '荆州'],
              [1378.62251255796, 935.6708486282843, '十堰'],
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