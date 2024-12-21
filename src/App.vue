<template>
  <div class="canvas-box">
    <canvas width="460" height="90" ref="drawAreaRef"></canvas>
    <button @click="clearAc">清空绘制</button>
    <button @click="drawAc">绘制内容</button>
    <button @click="downloadAc">下载</button>
  </div>
</template>

<script setup>
import * as fabric from "fabric";
import { downloadFileByBase64 } from "@/utils";
import { ref, onMounted } from "vue";
let canvas;
const drawAreaRef = ref();
const createText = (cotent) => {
  const text = new fabric.Textbox(cotent, {
    left: 230,
    top: 45,
    fontSize: 55,
    fontWeight: 600,
    originX: "center",
    originY: "center",
    fill: "#000",
    fontFamily: "DaoLiTi",
  });
  canvas.add(text);
};
const downloadAc = () => {
  let baseImg = canvas.toDataURL({
    format: "png",
  });
  downloadFileByBase64(baseImg, "demo");
};
const clearAc = () => {
  canvas.clear();
};
const drawAc = () => {
  createText("阿里妈妈刀隶体");
};
onMounted(() => {
  canvas = new fabric.Canvas(drawAreaRef.value);
  // 定制字体导入
  const fontMap = {
    DaoLiTi: "url(/font/AlimamaDaoLiTi.woff2)",
  };
  const fontDaoLiTi = new FontFace("DaoLiTi", fontMap.DaoLiTi, {
    style: "normal",
    weight: "normal",
  });
  Promise.all([fontDaoLiTi.load()]).then(() => {
    document.fonts.add(fontDaoLiTi);
  });
});
</script>

<style>
.canvas-box {
  width: 460px;
  height: 90px;
  border: 1px solid #000;
}
</style>
