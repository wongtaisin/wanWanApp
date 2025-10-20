<template>
  <view class="login-page">
    <uni-forms :model="params">
      <uni-forms-item label="用户名" name="user_name" :required="true">
        <input v-model="params.user_name" placeholder="用户名" class="form-input" />
      </uni-forms-item>
      <uni-forms-item label="密码" name="password" :required="true">
        <input v-model="params.password" type="password" placeholder="密码" class="form-input" />
      </uni-forms-item>
      <view style="margin: 32rpx">
        <uni-button type="primary" size="large" @click="onSubmit(params)"> 提交 </uni-button>
      </view>
    </uni-forms>

    <!-- 账号密码登录 -->
    <view class="login-form">
      <view class="form-item">
        <text class="label">账号</text>
        <input v-model="params.user_name" type="text" placeholder="请输入账号" class="input" />
      </view>
      <view class="form-item">
        <text class="label">密码</text>
        <input v-model="params.password" type="password" placeholder="请输入密码" class="input" />
      </view>
      <button class="login-btn" @click="handleLogin">登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { request } from '../../services/request'

const params = reactive({
  user_name: '大帅',
  password: '123456'
})

const onSubmit = (values: any) => {
  console.log('submit', values)
  handleLogin()
}

const handleLogin = () => {
  if (!params.user_name || !params.password) {
    uni.showToast({ title: '账号或密码不能为空', icon: 'none' })
    return
  }

  request('/login', 'POST', params).then((res: any) => {
    console.log('创建成功:', res)
    uni.showToast({ title: '登录成功', icon: 'success' })
    uni.setStorageSync('token', res.data.token)
    uni.navigateTo({ url: '/pages/expenses/index' })
  })
}
</script>

<style scoped lang="scss">
.login-page {
  padding: 40rpx;
}

.login-form {
  background: #fff;
  border-radius: 12rpx;
  padding: 40rpx;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.label {
  width: 120rpx;
  font-size: 28rpx;
  color: #333;
}

.input {
  flex: 1;
  height: 80rpx;
  border: 1rpx solid #ddd;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
}

.login-btn {
  margin-top: 40rpx;
  background: #007aff;
  color: #fff;
  border-radius: 8rpx;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 32rpx;
}

.form-input {
  width: 100%;
  height: 80rpx;
  border: 1rpx solid #dcdfe6;
  border-radius: 4rpx;
  padding: 0 10rpx;
  box-sizing: border-box;
  font-size: 28rpx;
}
</style>
