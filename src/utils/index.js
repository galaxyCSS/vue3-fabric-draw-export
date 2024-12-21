// 防抖
export const debounce = (fn, delay) => {
  var timer
  return function () {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
// 节流
export const throttle = (fn, delay) => {
  var last = 0
  return function () {
    var now = Date.now()
    if (now - last > delay) {
      last = now
      fn.apply(this, arguments)
    }
  }
}

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

function downloadFile(url, name = "What's the fuvk") {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', name)
  a.setAttribute('target', '_blank')
  let clickEvent = document.createEvent('MouseEvents')
  clickEvent.initEvent('click', true, true)
  a.dispatchEvent(clickEvent)
}
// 下载base64图片
export function downloadFileByBase64(base64, name) {
  var myBlob = dataURLtoBlob(base64)
  var myUrl = URL.createObjectURL(myBlob)
  downloadFile(myUrl, name)
}
