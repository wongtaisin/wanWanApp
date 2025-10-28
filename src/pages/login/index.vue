<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-13 16:12:04
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-10-28 10:49:27
 * @FilePath: \wanWanApp\src\pages\login\index.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <view class="login-page">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="params.user_name"
          name="user_name"
          label="用户名"
          placeholder="用户名"
          required
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="params.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          required
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </view>
</template>

<script setup lang="ts">
import { request } from '@/services/request'
import { reactive } from 'vue'

const params = reactive({
  user_name: '大帅',
  password: '123456'
})

const onSubmit = async (values: any) => {
  const { token }: any = await request('/login', 'POST', values)
  uni.showToast({ title: '登录成功', icon: 'success' })
  uni.setStorageSync('token', token)
  uni.navigateTo({ url: '/pages/expenses/index' })
}
</script>

<style scoped lang="scss">
.login-page {
  padding: 40rpx;
}
</style>
