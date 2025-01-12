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
    height: 240,
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
    y: 13.425,
  };
  const t_pa = {
    x: tl.x + 15,
    y: tl.y - 10,
  };
  const tr = {
    x: 185.5,
    y: 13.425,
  };
  const t_pb = {
    x: tr.x - 15,
    y: tr.y - 10,
  };
  const br = {
    x: 185.5,
    y: 76.575,
  };
  const r_pa = {
    x: tr.x + 25,
    y: tr.y + 15,
  };
  const r_pb = {
    x: br.x + 25,
    y: br.y - 15,
  };
  const bl = {
    x: 74.5,
    y: 76.575,
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
    x: bl.x - 25,
    y: bl.y - 10,
  };
  const l_pb = {
    x: tl.x - 25,
    y: tl.y + 10,
  };
  const path = new fabric.Path(
    `M ${tl.x} ${tl.y} C ${t_pa.x} ${t_pa.y}, ${t_pb.x} ${t_pb.y}, ${tr.x} ${tr.y} C ${r_pa.x} ${r_pa.y}, ${r_pb.x} ${r_pb.y}, ${br.x} ${br.y} C ${b_pa.x} ${b_pa.y}, ${b_pb.x} ${b_pb.y}, ${bl.x} ${bl.y} C ${l_pa.x} ${l_pa.y}, ${l_pb.x} ${l_pb.y}, ${tl.x} ${tl.y}`,
    {
      stroke: "red",
      fill: "rgba(0,0,0,0.5)",
    }
  );
  canvas.add(path);
};
const drawAc = async () => {
  // path1();
  // path2();
  // path3();
  // path4();
  pathCombine();
  createText("双击");
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
