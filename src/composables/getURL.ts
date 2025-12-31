export const getURL = () => {
  const URL =
    import.meta.env.NODE_ENV === 'development'
      ? 'http://192.168.36.37:3001'
      : 'http://8.155.51.40:3001'

  return { URL }

  // <script setup lang="ts">
  // ✅ 无需写 import { getURL } from '@/composables/getURL'
  // const { URL } = getURL()
  // </script>
}
