import HashWorker from './hash.worker.js'
const worker = new HashWorker()

// 创建文件分片
export const createChunks = (file, SIZE = 1 * 1024 * 1024) => {
  const chunkList = []
  let cur = 0
  while (cur < file.size) {
    chunkList.push({
      file: file.slice(cur, cur + SIZE)
    })
    cur += SIZE
  }
  return chunkList
}

// 文件唯一性标识计算
export const calculateHash = (chunkList) => {
  return new Promise((resolve) => {
    worker.postMessage({ chunkList })
    worker.onmessage = e => {
      const { hash } = e.data
      if (hash) {
        resolve(hash)
      }
    }
  })
}

// 获取文件扩展名
export const getExt = (filename) => {
  return filename.slice(filename.lastIndexOf('.'))
}


export const compressImageToBase64 = (file, quality, width = 240, height = 360) => {
  return new Promise((resolve, reject) => {
    // 创建一个空的图片对象
    const img = new Image();

    // 创建一个文件读取器对象
    const reader = new FileReader();

    // 当文件读取器加载完成时执行以下代码
    reader.onload = function (event) {
      // 将文件读取器中的数据转换为图片源
      img.src = event.target.result;

      // 当图片加载完成时执行以下代码
      img.onload = function () {
        // 创建一个canvas对象
        const canvas = document.createElement('canvas');

        // 设置canvas尺寸为指定的宽度和高度
        canvas.width = width;
        canvas.height = height;

        // 在canvas上绘制图片
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // 将canvas转换为Base64字符串，并设置压缩质量
        const base64 = canvas.toDataURL(file.type, quality);

        // 返回压缩后的图像Base64编码
        resolve(base64);
      };
    };

    // 文件读取出错时返回错误信息
    reader.onerror = (error) => reject(error);

    // 读取传入的文件对象
    reader.readAsDataURL(file);
  });
}


export const video2Base64 = (raw) => {
  return loadVideo(raw).then(videoElem => {
    const canvasElem = document.createElement('canvas')
    const { width, height } = videoElem
    canvasElem.width = width
    canvasElem.height = height
    canvasElem.getContext('2d').drawImage(videoElem, 0, 0, width, height)
    // 导出成blob文件
    const dataURL = canvasElem.toDataURL('image/png', 0.9)
    return Promise.resolve(dataURL)
  })
}

export const loadVideo = (video) => {
  return new Promise(function (resolve, reject) {
    const videoElem = document.createElement('video')
    const dataUrl = URL.createObjectURL(video)
    videoElem.width = 200
    videoElem.height = 200
    videoElem.currentTime = 3
    // 当前帧的数据是可用的
    videoElem.onloadeddata = function () {
      resolve(videoElem)
    }
    videoElem.onerror = function () {
      reject('video 后台加载失败')
    }
    // 设置 auto 预加载数据， 否则会出现截图为黑色图片的情况
    videoElem.setAttribute('preload', 'auto')
    videoElem.src = dataUrl
  })
}