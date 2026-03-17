/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-03-12 14:48:22
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-03-17 18:44:26
 * @FilePath: \wanWanApp\src\composables\getURL.ts
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
export const getURL = () => {
  const BASE_URL =
    import.meta.env.MODE === 'development'
      ? 'http://192.168.181.221:3001'
      : 'http://8.155.51.40:3001'

  return { BASE_URL }

  // <script setup lang="ts">
  // ✅ 无需写 import { getURL } from '@/composables/getURL'
  // const { BASE_URL } = getURL()
  // </script>
}
