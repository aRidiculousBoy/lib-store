const { createMD5 } = require('hash-wasm')
let hasher = null;
const fileReader = new FileReader()

// 分块hash
const hashChunk = (chunk) => {
  return new Promise((resolve, reject) => {
    fileReader.onload = async (e) => {
      const view = new Uint8Array(e.target.result);
      hasher.update(view);
      resolve();
    };
    fileReader.readAsArrayBuffer(chunk);
  });
}



self.onmessage = async (e) => {
  if (hasher) {
    hasher.init();
  } else {
    hasher = await createMD5();
  }
  const { chunkList } = e.data
  for (let i = 0; i < chunkList.length; i++) {
    await hashChunk(chunkList[i].file)
  }
  const hash = hasher.digest()
  self.postMessage({
    hash
  })
}