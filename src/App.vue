<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import folderSvg from '@/assets/svg/folder.svg'
import jpgSvg from '@/assets/svg/jpg.svg'
import mp3Svg from '@/assets/svg/mp3.svg'
import mp4Svg from '@/assets/svg/mp4.svg'
import pdfSvg from '@/assets/svg/pdf.svg'
import pngSvg from '@/assets/svg/png.svg'

const typeMapper = {
  'folder': folderSvg,
  '.jpg': jpgSvg,
  '.mp3': mp3Svg,
  '.mp4': mp4Svg,
  '.pdf': pdfSvg,
  '.png': pngSvg
}

export default {
  name: 'App',
  provide() {
    return {
      typeMapper
    }
  }
}
</script>