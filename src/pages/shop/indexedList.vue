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
          text: '店铺',
          active: false
        },
        {
          iconPath: '/static/image/icon/icon_shop.png',
          selectedIconPath: '/static/image/icon/icon_shop_HL.png',
          text: '新增',
          active: false
        }
      ]"
      horizontal="right"
      vertical="bottom"
      direction="horizontal"
      @trigger="handleTrigger"
    />

    <!-- 输入框示例 -->
    <uni-popup ref="popupRef" type="dialog">
      <uni-popup-dialog
        mode="input"
        title="店铺名称"
        placeholder="直接使用，不保存在列表"
        :before-close="true"
        @close="handleClose"
        @confirm="handleConfirm"
      />
    </uni-popup>

    <uni-popup ref="popupMessage" type="message">
      <uni-popup-message type="warn" :message="selectedItem?.name || ''" :duration="2000" />
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { shopAll } from '@/api/shop'
import { useShop } from '@/store/common'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import pinyin from 'pinyin'
import { computed, onMounted, ref } from 'vue'

/** 单项类型 */
interface Item {
  id?: number | null // 项的唯一标识符
  name: string // 项的名称
}

/** 分组类型 */
interface Group {
  letter: string // 分组字母
  data: Item[] // 分组内的项
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

const userShop = useShop() // 店铺状态管理
const popupRef = ref() // 输入框弹窗
const popupMessage = ref() // 提示弹窗
const selectedItem = ref<Item | null>(null) // 当前选中项

const loadShop = async () => {
  const res: any = await shopAll()
  const list = res.map((item: any) => ({
    id: item.id,
    name: item.shop_name
  }))

  /** 按中文首字母 / 英文字母分组，数字/符号归到 '#' */
  const groupedList = list.reduce((acc: Group[], item: Item) => {
    const firstChar = item.name.charAt(0) // 取第一个字符

    // 英文字母直接使用大写字母；数字/符号归到 '#'
    if (/[A-Za-z]/.test(firstChar)) {
      const firstLetter = firstChar.toUpperCase() // 大写英文字母
      const group = acc.find(g => g.letter === firstLetter) // 查找是否已存在该字母分组
      if (group) group.data.push(item) // 如果存在，添加到该分组
      else acc.push({ letter: firstLetter, data: [item] }) // 如果不存在，创建新分组
      return acc
    }

    // 尝试用 pinyin 库取首字母
    let firstLetter = '#'
    try {
      // pinyin 返回形如 [['z']] 的数组，使用 STYLE_FIRST_LETTER 可以直接取得首字母
      const py = pinyin(firstChar, { style: pinyin.STYLE_FIRST_LETTER })
      if (py && py[0] && py[0][0]) {
        const l = String(py[0][0]).toUpperCase() // 大写拼音首字母
        if (/[A-Z]/.test(l)) firstLetter = l // 如果是大写字母，直接赋值
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

/** 名称 → ID 映射表 */
const nameMap = computed(() => {
  const map: Record<string, number> = {}
  rawList.value.forEach(group => {
    group.data.forEach(item => {
      map[item.name] = item.id || 0
    })
  })
  return map
})

/** 生成供 uni-indexed-list 使用的字符串数据 */
const computedOptions = computed(() =>
  rawList.value.map(group => ({
    letter: group.letter, // 分组字母
    data: group.data.map(item => {
      const checked = selectedItem.value?.id === item.id // 检查是否为当前选中项
      return checked ? `✅ ${item.name}` : item.name // 如果选中，添加✅前缀
    })
  }))
)

/**
 * @description 点击事件
 * @param {Item} item 点击的项
 * @param {boolean} selected 是否选中
 */
const onItemClick = ({ item, selected }: { item: Item; selected: boolean }) => {
  const name: string = item.name
  const cleanName = name.replace(/^✅\s*/, '') // 去掉选中标识
  const id = nameMap.value[cleanName]
  if (!id) return
  selectedItem.value = { id, name: cleanName }

  userShop.setUseShop(selectedItem.value) // 存储当前选中的店铺
  uni.navigateBack()
}

/**
 * @description 触发事件
 * @param {object} item 点击的项
 * @param {number} index 点击的索引
 */
const handleTrigger = ({ item, index }: { item: any; index: number }) => {
  switch (index) {
    case 0:
      popupRef.value.open()
      break
    case 1:
      uni.navigateTo({ url: '/pages/shop/add' })
      break
    case 2:
      uni.showToast({ title: '点击了' + item.text })
      break
  }
}

/**
 * @description 确认输入
 * @param {string} value 输入的店铺名称
 */
const handleConfirm = (value: string) => {
  if (!value) {
    popupMessage.value.open()
    selectedItem.value = { name: '店铺名称部门为空' }
    // uni.showToast({ title: '店铺名称部门为空', icon: 'none', duration: 2000 }) // TODO: z-index 比popup低，所以无法显示
    return
  }

  // 检查是否已存在相同名称的店铺
  if (nameMap.value[value]) {
    popupMessage.value.open()
    selectedItem.value = { name: `店铺名称 ${value} 已存在` }
    return
  }

  selectedItem.value = { id: null, name: value }

  userShop.setUseShop(selectedItem.value)
  handleClose()
  uni.navigateBack()
}

/** 关闭弹窗 */
const handleClose = () => popupRef.value.close()

onPullDownRefresh(() => {
  console.log('触发下拉刷新')

  loadShop().then(() => {
    uni.stopPullDownRefresh()
  })
})

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
