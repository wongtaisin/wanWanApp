<template>
  <uni-calendar
    class="uni-calendar--hook"
    :selected="info.selected"
    :showMonth="false"
    @change="change"
    @monthSwitch="monthSwitch"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface SelectedItem {
  date: string
  info: string
  data?: {
    custom: string
    name: string
  }
}

interface Info {
  lunar: boolean
  range: boolean
  insert: boolean
  selected: SelectedItem[]
}

interface Props {
  data: SelectedItem[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const info = computed<Info>(() => {
  return {
    lunar: true,
    range: true,
    insert: false,
    selected: props.data
  }
})

const change = (e: any) => {
  console.log('change 返回:', e)
}

const monthSwitch = (e: any) => {
  console.log('monthSwitchs 返回:', e)
}
</script>

<style lang="scss" scoped></style>
