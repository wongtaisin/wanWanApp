<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-07 17:12:54
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-03-17 18:42:23
 * @FilePath: \wanWanApp\src\components\autoUploadFile.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <uni-file-picker
    v-model="fileList"
    :file-mediatype="props.fileMediatype"
    :upload-url="props.uploadUrl"
    :form-data="props.data"
    :header="headers"
    :limit="props.limit"
    name="file"
    :auto-upload="false"
    @select="onSelect"
    @progress="onProgress"
    @success="onSuccess"
    @fail="onFail"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const { BASE_URL } = getURL()

interface Props {
  fileMediatype?: string // image / video / all
  uploadUrl: string
  limit?: string | number
  data?: any
  headers?: Record<string, any>
  fileList?: any
}

const props = withDefaults(defineProps<Props>(), {
  fileMediatype: 'all',
  limit: 9
})

// 绑定文件列表
const fileList = ref<any[]>(props.fileList)

// header（自动附带 token）
const headers = computed(() => ({
  Authorization: 'Bearer ' + uni.getStorageSync('token'),
  ...(props.headers || {})
}))

const emits = defineEmits(['success'])

// 文件选择校验
const onSelect = async (e: any) => {
  const file = e.tempFiles[0]
  let uploadPath = file.path

  const maxSize = 2 * 1024 * 1024 // 2MB

  const isImage =
    file.fileType === 'image' || /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name || file.path)

  if (isImage && file.size > maxSize) {
    console.log(file, `111111`, uni.compressImage)
    if (typeof uni.compressImage !== 'function') {
      uni.showToast({
        title: '图片不能超过1MB',
        icon: 'none'
      })
      fileList.value = []
      return
    }

    uni.showLoading({ title: '压缩中...' })
    try {
      let quality = Math.floor((maxSize / file.size) * 100)
      quality = Math.max(10, Math.min(90, quality)) // 限制质量在 10 ~ 90 之间

      const compressRes: any = await new Promise((resolve, reject) => {
        uni.compressImage({
          src: file.path,
          quality: quality,
          success: res => resolve(res),
          fail: err => reject(err)
        })
      })
      if (compressRes && compressRes.tempFilePath) {
        uploadPath = compressRes.tempFilePath
      }
    } catch (error) {
      console.error('图片压缩失败', error)
    } finally {
      uni.hideLoading()
    }
  }

  const uploadUrl = props.uploadUrl.startsWith('http')
    ? props.uploadUrl
    : `${BASE_URL}${props.uploadUrl}`

  uni.uploadFile({
    url: uploadUrl,
    filePath: uploadPath,
    name: 'file', // 必须和后端 multer.single('file') 对应
    header: headers.value,
    formData: props.data || {},
    success: res => {
      console.log('上传成功', JSON.parse(res.data || '{}'))
      emits('success', JSON.parse(res.data || '{}'))
      uni.showToast({ title: '上传成功', icon: 'success' })
    },
    fail: err => {
      console.error('上传失败', err)
      uni.showToast({ title: '上传失败', icon: 'none' })
    }
  })
}

// 上传进度
const onProgress = (e: any) => {
  console.log('上传进度：', e)
}

// 上传成功
const onSuccess = (res: any) => {
  let result = res
  try {
    result = typeof res === 'string' ? JSON.parse(res) : res
  } catch {}
  console.log('上传成功：', result)
  emits('success', result?.data || result)
  uni.showToast({ title: '上传成功', icon: 'success' })
}

// 上传失败
const onFail = (err: any) => {
  console.error('上传失败：', err)
  // 提取详细错误信息
  const errorMsg = err?.errMsg || err?.message || '上传失败'
  uni.showToast({ title: errorMsg, icon: 'none' })
}
</script>

<style lang="scss" scoped></style>
