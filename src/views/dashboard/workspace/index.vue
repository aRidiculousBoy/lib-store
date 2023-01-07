<template>
  <div class="page-workspace">
    <a-card>
      <div class="title">工作台</div>
      <div class="work-summary">
        <div class="user">
            <a-avatar
              :src="kenanImage"
              :size="72"
            />
            <div class="user-info">
              <div class="hope">无论如何，一切顺利！  </div>
              <div class="professional">
                <span>前端开发工程师</span>
                <a-divider type="vertical"></a-divider>
                <span>电魂网络-发行线-技术运营中心-运营开发部-前端开发组</span>
              </div>
            </div>
        </div>
        <div class="project-summary">
          <a-space>
            <div class="item">
              <span>项目数</span>
              <div class="item-count">56</div>
            </div>
            <a-divider type="vertical"></a-divider>
            <div class="item">
              <span>团队排名</span>
              <div class="item-count">8/24</div>
            </div>
            <a-divider type="vertical"></a-divider>
            <div class="item">
              <span>项目访问</span>
              <div class="item-count">2,223</div>
            </div>
          </a-space>
        </div>
      </div>
    </a-card>
    <div class="coderwyh-pro-body"></div>
  </div>
</template>

<script>
import kenanImage from '@/assets/images/kenan.jpg'
export default {
  name: 'Workspace',
  data() {
    return {
      kenanImage
    }
  }
}
</script>

<style scoped lang="less">
.title {
  font-size: 20px;
  color: #000;
  font-weight: bold;
}
.work-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user {
  display: flex;
  
}

.user-info > div {
  padding: 6px 0px;
  padding-left: 12px;
}

.hope {
  font-size: 20px;
}

.item {
  padding: 28px;
}

.item-count {
  font-size: 24px;
  color: #000;
  margin-top: 4px;
}

/deep/.ant-card-body {
  padding: 16px;
}
</style>
