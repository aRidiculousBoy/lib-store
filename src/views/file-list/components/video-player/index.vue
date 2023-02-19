<template>
  <div class="video-player">
    <a-modal :title="name + ' - ' + '正在播放...'" v-model="visible" width="100%" :footer="null"
      :dialog-style="{ top: '0px' }" :bodyStyle="{ display: 'flex', height: '100vh', 'justify-content': 'center' }">
      <div class="content" ref="contentRef"></div>
    </a-modal>
  </div>
</template>

<script>
import Videojs from "video.js"
import 'video.js/dist/video-js.css'

export default {
  name: 'video-player',
  data() {
    return {
      visible: false,
      player: null,
      name: undefined
    }
  },
  methods: {
    open(source, name) {
      this.visible = true
      this.name = name
      this.$nextTick(() => {
        this.initVideo(source)
      })
    },
    close() {
      this.visible = false
    },
    initVideo(url) {
      if (!this.player) {
        const video = document.createElement('video')
        video.setAttribute('id', 'video-player')
        video.setAttribute('class', 'video-js')
        video.setAttribute('muted', true)
        const style = {
          width: parseInt(window.getComputedStyle(document.body, null).width) * 0.88,
          height: parseInt(window.getComputedStyle(document.body, null).height) * 0.92,
        }
        video.setAttribute('style', style)

        this.$refs.contentRef?.appendChild(video)


        const options = {
          autoplay: false,
          controls: true,
          width: parseInt(window.getComputedStyle(document.body, null).width) * 0.98,
          height: parseInt(window.getComputedStyle(document.body, null).height) * 0.92,
          playbackRates: [0.5, 1, 1.25, 1.5, 2],
          sources: [
            {
              src: '/v/video' + url,
              type: 'application/x-mpegURL'
            }
          ]
        }
        this.player = Videojs('video-player', options, () => {
        })
      }
      else {
        const source = '/v/video' + url
        this.player.src(source)
        this.player.load(source)
      }
    }
  },
  watch: {
    visible(value) {
      if (!value) {
        this.player?.pause()
      }
    }
  }
}
</script>

<style scoped lang="less"></style>

