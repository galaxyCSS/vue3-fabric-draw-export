<template>
  <div class="canvas-box">
    <canvas width="460" height="90" ref="drawAreaRef"></canvas>
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
    fontFamily: "DaoLiTi",
    fontSize: 55,
    fontWeight: 600,
    originX: "center",
    originY: "center",
    fill: "#000",
  });
  canvas.add(text);
};
const downloadAc = () => {
  let baseImg = canvas.toDataURL({
    format: "png",
  });
  downloadFileByBase64(baseImg, "demo");
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
  createText("阿里妈妈刀隶体");
});
</script>

<style>
.canvas-box {
  width: 460px;
  height: 90px;
  border: 1px solid #000;
}
</style>
