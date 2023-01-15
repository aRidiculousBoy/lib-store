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