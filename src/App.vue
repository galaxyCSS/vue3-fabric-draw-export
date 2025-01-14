<template>
  <div class="canvas-box">
    <canvas width="240" height="290" ref="drawAreaRef"></canvas>
    <button @click="clearAc">清空绘制</button>
    <button @click="drawAc">绘制内容</button>
    <button @click="downloadAc">下载</button>
  </div>
  <div>
    <img :src="baseUrl" alt="" />
  </div>
</template>

<script setup>
import * as fabric from "fabric";
import { downloadFileByBase64 } from "@/utils";
import { ref, onMounted } from "vue";
import { f as filterObj } from "@/utils/filter.js";
const baseUrl = ref("");
let canvas;
const drawAreaRef = ref();

const createText = (cotent) => {
  const text = new fabric.Textbox(cotent, {
    left: 130,
    top: 45,
    fontSize: 55,
    fontWeight: 600,
    originX: "center",
    originY: "center",
    fill: "#000",
  });
  console.log(text);
  canvas.add(text);
};
const createPhotoClip = async () => {
  let url =
    "https://n.sinaimg.cn/sinakd10111/309/w1242h1467/20201118/e9c5-kcysmrw5281733.jpg";
  // 添加跨域支持
  let photo = await fabric.FabricImage.fromURL(url, {
    crossOrigin: "anonymous",
  });
  const filter = new filterObj.Blur({
    blur: 0.5,
  });
  photo.set({
    filters: [filter],
    scaleX: 0.2,
    scaleY: 0.2,
  });
  photo.applyFilters();
  let baseImg = photo.toDataURL({
    format: "png",
    left: 0,
    top: 0,
    width: 240,
    height: 290,
  });
  console.log(baseImg);
  baseUrl.value = baseImg;
  canvas.add(photo);
};
const createShapeAc = () => {
  const rect = new fabric.Rect({
    width: 120,
    height: 120,
    fill: "#1677ff",
    rx: 5,
  });
  canvas.add(rect);
};
const downloadAc = () => {
  let baseImg = canvas.toDataURL({
    format: "png",
    left: 0,
    top: 0,
    width: 240,
    height: 290,
  });
  downloadFileByBase64(baseImg, "demo");
};
const clearAc = () => {
  canvas.clear();
};
const path1 = () => {
  const startPoint = "10 100";
  const endPoint = "100 100";
  const controlPoint1 = "10 90";
  const controlPoint2 = "100 90";
  const path = new fabric.Path(
    `M ${startPoint} C ${controlPoint1}, ${controlPoint2}, ${endPoint}`,
    {
      stroke: "red",
      fill: "rgba(0,0,0,0)",
    }
  );
  const helperPtah = new fabric.Path(
    `M ${startPoint} L ${controlPoint1} M ${controlPoint2} L ${endPoint}`,
    {
      stroke: "#000",
      fill: "rgba(0,0,0,0)",
    }
  );
  canvas.add(path);
  //canvas.add(helperPtah);
};
const path2 = () => {
  const startPoint = "100 100";
  const endPoint = "100 120";
  const controlPoint1 = "105 100";
  const controlPoint2 = "105 120";
  const path = new fabric.Path(
    `M ${startPoint} C ${controlPoint1}, ${controlPoint2}, ${endPoint}`,
    {
      stroke: "red",
      fill: "rgba(0,0,0,0)",
    }
  );
  const helperPtah = new fabric.Path(
    `M ${startPoint} L ${controlPoint1} M ${controlPoint2} L ${endPoint}`,
    {
      stroke: "#000",
      fill: "rgba(0,0,0,0)",
    }
  );
  canvas.add(path);
};
const path3 = () => {
  const startPoint = "100 120";
  const endPoint = "10 120";
  const controlPoint1 = "100 130";
  const controlPoint2 = "10 130";
  const path = new fabric.Path(
    `M ${startPoint} C ${controlPoint1}, ${controlPoint2}, ${endPoint}`,
    {
      stroke: "red",
      fill: "rgba(0,0,0,0)",
    }
  );
  const helperPtah = new fabric.Path(
    `M ${startPoint} L ${controlPoint1} M ${controlPoint2} L ${endPoint}`,
    {
      stroke: "#000",
      fill: "rgba(0,0,0,0)",
    }
  );
  canvas.add(path);
  //canvas.add(helperPtah);
};
const path4 = () => {
  const startPoint = "10 120";
  const endPoint = "10 100";
  const controlPoint1 = "5 120";
  const controlPoint2 = "5 100";
  const path = new fabric.Path(
    `M ${startPoint} C ${controlPoint1}, ${controlPoint2}, ${endPoint}`,
    {
      stroke: "red",
      fill: "rgba(0,0,0,0)",
    }
  );
  const helperPtah = new fabric.Path(
    `M ${startPoint} L ${controlPoint1} M ${controlPoint2} L ${endPoint}`,
    {
      stroke: "#000",
      fill: "rgba(0,0,0,0)",
    }
  );
  canvas.add(path);
};
const pathCombine = () => {
  const tl = {
    x: 74.5,
    y: 33.425,
  };
  const t_pa = {
    x: tl.x + 5,
    y: tl.y - 15,
  };
  const tr = {
    x: 185.5,
    y: 33.425,
  };
  const t_pb = {
    x: tr.x - 5,
    y: tr.y - 15,
  };
  const br = {
    x: 185.5,
    y: 66.575,
  };
  const r_pa = {
    x: tr.x + 10,
    y: tr.y + 10,
  };
  const r_pb = {
    x: br.x + 10,
    y: br.y - 10,
  };
  const bl = {
    x: 74.5,
    y: 66.575,
  };
  const b_pa = {
    x: br.x - 10,
    y: br.y + 10,
  };
  const b_pb = {
    x: bl.x + 10,
    y: bl.y + 10,
  };
  const l_pa = {
    x: bl.x - 10,
    y: bl.y - 8,
  };
  const l_pb = {
    x: tl.x - 10,
    y: tl.y + 8,
  };
  const path = new fabric.Path(`M ${bl.x} ${bl.y} L ${br.x} ${br.y}`, {
    stroke: "#eb2f96",
    strokeWidth: 5,
  });
  canvas.add(path);
};
const drawAc = async () => {
  // path1();
  // path2();
  // path3();
  // path4();
  // pathCombine();
  // createText("Abc");
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
