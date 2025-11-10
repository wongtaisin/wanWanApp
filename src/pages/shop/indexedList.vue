<template>
  <view class="indexed-select">
    <!-- 索引列表 -->
    <uni-indexed-list :options="computedOptions" :showSelect="false" @click="onItemClick" />

    <!-- 底部显示当前选中项 -->
    <view class="footer">
      当前选择：
      <text class="selected-text">
        {{ selectedItem ? selectedItem.name : '无' }}
      </text>
    </view>

    <uni-fab
      :pattern="{
        color: '#7A7E83',
        backgroundColor: '#fff',
        selectedColor: '#007AFF',
        buttonColor: '#007AFF',
        iconColor: '#fff'
      }"
      :content="[
        {
          iconPath: '/static/home.png',
          selectedIconPath: '/static/home-active.png',
          text: '首页',
          active: false
        },
        {
          iconPath: '/static/image/icon/icon_spend.png',
          selectedIconPath: '/static/image/icon/icon_spend_HL.png',
          text: '新增',
          active: false
        },
        {
          iconPath: '/static/star.png',
          selectedIconPath: '/static/star-active.png',
          text: '收藏',
          active: false
        }
      ]"
      horizontal="right"
      vertical="bottom"
      direction="horizontal"
      @trigger="trigger"
    />
  </view>
</template>

<script lang="ts" setup>
import { shopAll } from '@/services/shop'
import { useShop } from '@/store/common'
import pinyin from 'pinyin'
import { computed, onMounted, ref } from 'vue'

/** 单项类型 */
interface Item {
  id: number
  name: string
}

/** 分组类型 */
interface Group {
  letter: string
  data: Item[]
}

/** 原始数据（对象结构） */
const rawList = ref<Group[]>([
  {
    letter: 'A',
    data: [
      { id: 1, name: '阿里巴巴' },
      { id: 2, name: '安踏' }
    ]
  },
  {
    letter: 'B',
    data: [
      { id: 3, name: '百度' },
      { id: 4, name: '比亚迪' }
    ]
  },
  {
    letter: 'C',
    data: [
      { id: 5, name: '长城汽车' },
      { id: 6, name: '长沙银行' }
    ]
  }
])

const userShop = useShop()

const loadShop = async () => {
  const res: any = await shopAll()
  const list = res.map((item: any) => ({
    id: item.id,
    name: item.shop_name
  }))

  const groupedList = list.reduce((acc: Group[], item: Item) => {
    const firstChar = item.name.charAt(0)

    // 英文字母直接使用大写字母；数字/符号归到 '#'
    if (/[A-Za-z]/.test(firstChar)) {
      const firstLetter = firstChar.toUpperCase()
      const group = acc.find(g => g.letter === firstLetter)
      if (group) group.data.push(item)
      else acc.push({ letter: firstLetter, data: [item] })
      return acc
    }

    // 尝试用 pinyin 库取首字母
    let firstLetter = '#'
    try {
      // pinyin 返回形如 [['z']] 的数组，使用 STYLE_FIRST_LETTER 可以直接取得首字母
      const py = pinyin(firstChar, { style: pinyin.STYLE_FIRST_LETTER })
      if (py && py[0] && py[0][0]) {
        const l = String(py[0][0]).toUpperCase()
        if (/[A-Z]/.test(l)) firstLetter = l
      }
    } catch (e) {
      // ignore -> keep '#'
    }

    const group = acc.find(g => g.letter === firstLetter)
    if (group) {
      group.data.push(item)
    } else {
      acc.push({ letter: firstLetter, data: [item] })
    }
    return acc
  }, [])

  // 按字母排序，'#' 放在最后
  const sortedList = groupedList.sort((a: { letter: string }, b: { letter: string }) => {
    if (a.letter === '#') return 1
    if (b.letter === '#') return -1
    return a.letter.localeCompare(b.letter)
  })

  rawList.value = sortedList
  console.log(sortedList, '分组后的数据（按中文首字母 / 英文字母分组）')
}

/** 当前选中项 */
const selectedItem = ref<Item | null>(null)

/** 名称 → ID 映射表 */
const nameMap = computed(() => {
  const map: Record<string, number> = {}
  rawList.value.forEach(group => {
    group.data.forEach(item => {
      map[item.name] = item.id
    })
  })
  return map
})

/** 生成供 uni-indexed-list 使用的字符串数据 */
const computedOptions = computed(() =>
  rawList.value.map(group => ({
    letter: group.letter,
    data: group.data.map(item => {
      const checked = selectedItem.value?.id === item.id
      return checked ? `✅ ${item.name}` : item.name
    })
  }))
)

/** 点击事件 */
const onItemClick = ({ item, selected }: any) => {
  const name: string = item.name
  const cleanName = name.replace(/^✅\s*/, '') // 去掉选中标识
  const id = nameMap.value[cleanName]
  if (!id) return
  selectedItem.value = { id, name: cleanName }

  userShop.setUseShop(selectedItem.value) // 存储当前选中的店铺
  uni.navigateBack()
}

const trigger = ({ item, index }: { item: any; index: number }) => {
  if (index === 1) {
    uni.navigateTo({
      url: '/pages/shop/add'
    })
  }
}

onMounted(() => {
  loadShop()
})
</script>

<style lang="scss" scoped>
.indexed-select {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;

  .footer {
    margin-top: auto;
    padding: 24rpx 32rpx;
    font-size: 30rpx;
    color: #333;
    border-top: 1rpx solid #eaeaea;
    background-color: #f9f9f9;

    .selected-text {
      color: #007aff;
      font-weight: 600;
      margin-left: 10rpx;
    }
  }
}
</style>
