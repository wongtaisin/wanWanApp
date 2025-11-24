<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-01 10:33:29
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-24 17:04:48
 * @FilePath: \wanWanApp\src\pages\user\index.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <view class="user-page">
    <view class="user-header">
      <uni-row :gutter="20">
        <uni-col :span="12" class="user-info">
          <image
            src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
            class="avatar"
          />
          <text>大帅</text>
        </uni-col>
        <uni-col :span="6" :push="6">
          <uni-tag
            text="标签"
            :circle="true"
            custom-style="background-color: #fff; border-color: #fff; color: #000;"
          />
        </uni-col>
      </uni-row>
    </view>

    <uni-card :is-shadow="false" class="user-card">
      <uni-grid :column="4" :showBorder="false" :square="false">
        <uni-grid-item v-for="item in cardGrid" @click="handleClick(item)">
          <view class="card-grid">
            <view v-if="item.badge" class="grid-dot">
              <uni-badge class="uni-badge-left-margin" :text="item.badge" />
            </view>
            <uni-icons :type="item.icon" :size="28" />
            <view>
              <text>{{ item.label }}</text>
            </view>
          </view>
        </uni-grid-item>
      </uni-grid>
    </uni-card>
  </view>
</template>

<script lang="ts" setup>
const cardGrid = [
  { label: '店铺', prop: 'shop', icon: 'shop', url: '/pages/shop/index', badge: 3 },
  { label: '日志', prop: 'log', icon: 'locked', url: '/pages/log/index' },
  { label: '设置', prop: 'setting', icon: 'gear-filled' }
]

const handleClick = (item: any) => {
  uni.navigateTo({ url: item.url })
}
</script>

<style scoped lang="scss">
.user-page {
  .user-header {
    padding: 40rpx;
    background-color: #fede2b;
    border-radius: 0 0 40rpx 40rpx;

    .user-info {
      display: flex;
      align-items: center;
      padding-bottom: 40rpx;

      text {
        margin-left: 20rpx;
      }
    }

    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
    }
  }

  .user-card {
    margin-top: -40rpx !important;

    .card-grid {
      text-align: center;
      padding-top: 20rpx;
    }

    .grid-dot {
      position: absolute;
      top: 0rpx;
      right: 30rpx;
    }
  }
}
</style>
