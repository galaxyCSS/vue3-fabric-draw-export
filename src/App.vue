<template>
  <div class="canvas-box">
    <canvas width="240" height="240" ref="drawAreaRef"></canvas>
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
const createPhotoClip = async () => {
  let url =
    "https://images.pexels.com/photos/1671479/pexels-photo-1671479.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
  // 添加跨域支持
  let photo = await fabric.FabricImage.fromURL(url, {
    crossOrigin: "anonymous",
  });
  const clipPath = new fabric.Rect({
    width: 240,
    height: 120,
    left: -120,
    top: -60,
  });
  photo.set({
    width: 240,
    height: 240,
  });
  photo.clipPath = clipPath;
  canvas.add(photo);
};
const downloadAc = () => {
  let baseImg = canvas.toDataURL({
    format: "png",
    left: 0,
    top: 0,
    width: 240,
    height: 240,
  });
  downloadFileByBase64(baseImg, "demo");
};
const clearAc = () => {
  canvas.clear();
};
const drawAc = async () => {
  createPhotoClip();
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
canvas {
  border: 1px solid #000;
}
</style>
