<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-06 11:06:33
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-06 11:21:04
 * @FilePath: \wanWanApp\src\components\progress.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <view class="progress-wrap" :style="{ height: height + 'rpx' }">
    <view class="progress-inner" :style="{ width: progress + '%', background: color }" />
    <text class="progress-text" v-if="text">{{ progress }}%</text>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface Props {
  percent: number;
  color?: string;
  height?: number;
  text?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  percent: 0,
  color: "#fede2b",
  height: 32,
});

const progress = ref(props.percent);
</script>

<style lang="scss" scoped>
.progress-wrap {
  position: relative;
  width: 100%;
  background: #f5f5f5;
  border-radius: 16rpx;
  overflow: hidden;

  .progress-inner {
    height: 100%;
    transition: width 0.3s;
  }

  .progress-text {
    position: absolute;
    right: 16rpx;
    top: 0;
    font-size: 24rpx;
    color: #333;
    line-height: 32rpx;
  }
}
</style>
