<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-01 10:33:29
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-05 13:48:46
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
          <text>1111</text>
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
      <text>这是一个基础卡片示例，内容较少，此示例展示了一个没有任何属性不带阴影的卡片。</text>
    </uni-card>
  </view>
</template>

<script lang="ts" setup></script>

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
  }
}
</style>
