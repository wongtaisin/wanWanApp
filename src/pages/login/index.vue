<template>
  <view class="login-page">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="form.user_name"
          name="user_name"
          label="用户名"
          placeholder="用户名"
          required
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="form.password"
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

    <!-- 账号密码登录 -->
    <view class="login-form">
      <view class="form-item">
        <text class="label">账号</text>
        <input v-model="form.user_name" type="text" placeholder="请输入账号" class="input" />
      </view>
      <view class="form-item">
        <text class="label">密码</text>
        <input v-model="form.password" type="password" placeholder="请输入密码" class="input" />
      </view>
      <button class="login-btn" @click="handleLogin">登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { request } from '../../services/request'

const form = reactive({
  user_name: '大帅',
  password: '123456'
})

const onSubmit = (values: any) => {
  console.log('submit', values)
  handleLogin()
}

const handleLogin = () => {
  if (!form.user_name || !form.password) {
    uni.showToast({ title: '账号或密码不能为空', icon: 'none' })
    return
  }

  request('/login', 'POST', form).then((res: any) => {
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
</style>
