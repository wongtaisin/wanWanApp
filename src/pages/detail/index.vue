<template>
  <view class="detail-page">
    <view class="header">
      <text class="title">详情页面</text>
    </view>
    <view class="content">
      <text>这是一个详情页面示例</text>
      <view class="btn-group">
        <button @click="goBack" class="btn">返回首页</button>
        <button @click="goToIndex" class="btn primary">通过路由跳转到首页</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useRouter } from '@/router/useRouter'

const router = useRouter()

const goBack = () => {
  uni.navigateBack()
}

const goToIndex = () => {
  try {
    // 检查路由是否可用
    if (router && typeof router.push === 'function') {
      router.push({ name: 'index' })
    } else {
      throw new Error('路由不可用')
    }
  } catch (error) {
    console.error('路由跳转失败:', error)
    // 降级到原生导航
    uni.navigateTo({
      url: '/pages/index/index'
    })
  }
}
</script>

<style scoped>
.detail-page {
  padding: 40rpx;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
}

.content {
  text-align: center;
}

.btn-group {
  margin-top: 60rpx;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.btn {
  padding: 24rpx 48rpx;
  border-radius: 16rpx;
  border: 2rpx solid #ddd;
  background: #fff;
  color: #333;
}

.btn.primary {
  background: #007aff;
  color: #fff;
  border-color: #007aff;
}
</style>
