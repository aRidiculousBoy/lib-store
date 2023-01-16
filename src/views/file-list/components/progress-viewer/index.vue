<template>
  <div class="progress-viewer">
    <a-collapse accordion :defaultActiveKey="1" expandIconPosition="right">
      <a-collapse-panel key="1" :disabled="false">
        <template slot="header">
          上传进度
        </template>
        <div class="file-progress-viewer" v-for="(task, index) in runningTasks" :key="task.hash">
          <div class="file-cover">
            <img :src="typeMapper[task.ext]">
          </div>
          <div class="bar">
            <div class="text" :title="task.filename">{{ task.filename }}</div>
            <a-progress :percent="task.percentage" :showInfo="false" :status="task.isUploading ? 'active' : 'normal'" />
          </div>
          <div class="action" v-if="!task.isFinished">
            <a-space>
              <a-tooltip>
                <template slot="title">
                  取消上传
                </template>
                <img :src="closeSvg" @click="openTaskModal(task, index)">
              </a-tooltip>
              <a-tooltip v-if="task.isUploading">
                <template slot="title">
                  暂停
                </template>
                <img :src="pauseSvg" @click="handlePauseUpload(task)">
              </a-tooltip>
              <a-tooltip v-else>
                <template slot="title">
                  继续
                </template>
                <img :src="refreshSvg" @click="handleContinueUpload(task)">
              </a-tooltip>
            </a-space>
          </div>
        </div>
        <template slot="extra">
          <a-space v-if="isCancelable" class="more-action">
            <a-tooltip>
              <template slot="title">全部取消</template>
              <img :src="closeSvg" @click.stop="openCancelerModal">
            </a-tooltip>
            <a-tooltip>
              <template slot="title">
                {{ text }}
              </template>
              <img :src="actionSvg" @click.stop="handleTriggerAction">
            </a-tooltip>
          </a-space>
        </template>
      </a-collapse-panel>
    </a-collapse>

    <a-modal v-model="modal.visible" :width="512"
      @hook:beforeDestroy="() => this.modal.taskUnWatcher && this.modal.taskUnWatcher()">
      <p>确定取消文件『{{ modal.task?.filename }}』的上传吗</p>
      <template slot="footer">
        <a-button @click="() => modal.visible = false">取消</a-button>
        <a-button type="danger" @click="handleCancelUpload">取消上传</a-button>
      </template>
      <template slot="title">
        <p class="modal-title" :title="modal.task?.filename + ' - 取消上传'">{{ modal.task?.filename + ' - 取消上传' }}</p>
      </template>
    </a-modal>

    <a-modal v-model="cancelerModal.visible" :width="512" title="全部取消上传"
      @hook:beforeDestroy="() => this.cancelerModal.cancelerUnwatcher && this.cancelerModal.cancelerUnwatcher()"
      @ok="handleCancelAllUpload">
      <p>列表中有未上传完成的文件，确定要放弃上传吗？</p>
      <template slot="footer">
        <a-button @click="() => cancelerModal.visible = false">取消</a-button>
        <a-button type="danger" @click="handleCancelAllUpload">取消上传</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import folderSvg from '@/assets/svg/folder.svg'
import jpgSvg from '@/assets/svg/jpg.svg'
import mp3Svg from '@/assets/svg/mp3.svg'
import mp4Svg from '@/assets/svg/mp4.svg'
import pdfSvg from '@/assets/svg/pdf.svg'
import pngSvg from '@/assets/svg/png.svg'

import refreshSvg from '@/assets/svg/refresh.svg'
import pauseSvg from '@/assets/svg/pause.svg'
import closeSvg from '@/assets/svg/close.svg'




const typeMapper = {
  'folder': folderSvg,
  '.jpg': jpgSvg,
  '.mp3': mp3Svg,
  '.mp4': mp4Svg,
  '.pdf': pdfSvg,
  '.png': pngSvg
}


export default {
  name: 'progress-viewer',
  props: {
    runningTasks: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      typeMapper,
      refreshSvg,
      pauseSvg,
      closeSvg,
      modal: {
        visible: false,
        task: undefined,
        index: undefined,
        taskUnWatcher: null
      },
      cancelerModal: {
        visible: false,
        cancelerUnwatcher: null
      },
      text: '全部暂停',
    }
  },
  computed: {
    isCancelable() {
      // 只要有一个文件没有完成上传就允许用户点击全部取消 取消没有完成上传任务的文件
      const isCancelable = this.runningTasks.some(task => !task.isFinished)
      return isCancelable
    },
    actionSvg() {
      return this.text === '全部暂停' ? pauseSvg : refreshSvg
    }
  },
  methods: {
    handlePauseUpload(task) {
      this.$emit('pauseUpload', task)
    },
    openTaskModal(task, index) {
      this.modal.task = task
      this.modal.index = index
      this.modal.visible = true
      // 取消模态框的显隐与绑定的文件的状态相关 这里需要监听task的进度 如果进度为100% 则关闭模态框并且取消监听
      this.modal.taskUnWatcher = this.$watch(() => task.isFinished, () => {
        if (task.isFinished) {
          this.modal.visible = false
          this.modal.taskUnWatcher()
        }
      })
    },
    openCancelerModal() {
      this.cancelerModal.visible = true
      this.cancelerModal.cancelerUnwatcher = this.$watch(() => this.runningTasks, (value) => {
        const isCancelable = value.some(v => !v.isFinished)
        if (!isCancelable) {
          this.cancelerModal.cancelerUnwatcher()
        }
      }, { deep: true })
    },
    handleContinueUpload(task) {
      this.$emit('continueUpload', task)
    },
    handleCancelUpload() {
      const { task, index } = this.modal
      const callback = () => {
        this.modal.visible = false
      }
      const payload = {
        task,
        index,
        callback
      }
      this.$emit('cancelUpload', payload)
    },
    handleTriggerAction() {
      const actionType = this.text === '全部暂停' ? 'pause' : 'continue'
      if (actionType === 'continue') {
        this.text = '全部暂停'
        this.handleContinueAllUpload()
      }
      else {
        this.text = '全部继续'
        this.handlePauseAllUpload()
      }
    },
    handlePauseAllUpload() {
      this.$emit('pauseAllUpload')
    },
    handleContinueAllUpload() {
      this.$emit('continueAllUpload')
    },
    handleCancelAllUpload() {
      const callback = () => {
        this.cancelerModal.visible = false
      }
      const payload = {
        callback
      }
      this.$emit('cancelAllUpload', payload)
    }
  }
}
</script>

<style scoped lang="less">
.progress-viewer {
  width: 18%;
  position: absolute;
  right: 8px;
  bottom: 16%;
}

.file-progress-viewer {
  padding: 8px;
  display: flex;
  align-items: center;
  transition: all .1s ease;

  &:hover {
    background-color: #DCDFE6;
  }

  .file-cover {
    width: 76px;
    margin: 8px 0;

    img {
      width: 100%;
    }
  }

  .bar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 0 12px;
    flex: 1;
    overflow: hidden;
    font-size: 16px;

    .text {
      flex: 1;
      text-overflow: ellipsis;
      white-space: nowrap;

    }
  }

  .action {
    margin: 0 16px;

    img {
      padding: 2px;
      width: 28px;
      border: 1px solid #e9e9e9;
      border-radius: 50%;
      background-color: #fff;

      &:hover {
        cursor: pointer;
      }
    }
  }
}

.more-action {
  img {
    padding: 2px;
    width: 28px;
    border: 1px solid #e9e9e9;
    border-radius: 50%;
    background-color: #fff;

    &:hover {
      cursor: pointer;
    }
  }
}

.modal-title {
  width: 92%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/deep/ .ant-collapse-content-box {
  padding: 0px;
}

/deep/ .ant-collapse-header {
  background: #fff;
}

/deep/ .ant-collapse-content-box {
  box-sizing: content-box;
}
</style>
