<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-01 10:32:58
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-06 11:23:02
 * @FilePath: \wanWanApp\src\pages\chart\index.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <view class="chart-page">
    <view class="chart-segmented-container">
      <uni-segmented-control
        :current="current"
        :values="items"
        style-type="button"
        active-color="#343233"
        @clickItem="onClickItem"
      />
    </view>

    <uni-list v-for="item in Object.keys(tableData)">
      <uni-list-item
        :title="classify[item].label"
        :note="`${tableData[item]} 元 / ${totals} 元 = ${Number(
          ((tableData[item] / totals) * 100).toFixed(2)
        )}%`"
        link
      >
        <template v-slot:header>
          <svg class="slot-icon">
            <use :xlink:href="`#${classify[item].icon}`" />
          </svg>
        </template>
        <!-- <template v-slot:body>
          <view class="slot-box">
            <view class="slot-text">
              <view>
                {{ classify[item].label }}
                {{ Number(((tableData[item] / totals) * 100).toFixed(2)) }}%
              </view>
              <view>
                {{ tableData[item] }}
              </view>
            </view>
            <CommonProgress
              style="margin-top: 20rpx"
              :percent="Number(((tableData[item] / totals) * 100).toFixed(2))"
              :height="12"
              active
            />
          </view>
        </template> -->
        <template v-slot:footer>
          <text class="slot-text">{{ tableData[item] }}</text>
        </template>
      </uni-list-item>
    </uni-list>
  </view>
</template>

<script lang="ts" setup>
import { expensesCheck } from "@/services/chart";
import { onMounted, reactive, ref } from "vue";
import utils from "./utils";

const month = ref(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`);
const params = ref({
  startDate: utils.getCurrentMonthRange(month.value).firstDay,
  endDate: utils.getCurrentMonthRange(month.value).lastDay,
});
const items = reactive(["周", "月", "年"]);
const current = ref(0);
const classify: any = {
  eat: { label: "吃", icon: "icon-food-mifan" },
  drink: { label: "喝", icon: "icon-kekoukele2" },
  play: { label: "玩", icon: "icon-a-GamePadyouxishoubing" },
  glad: { label: "乐", icon: "icon-zhoubianyule" },
  tolls: { label: "过路费", icon: "icon-guolufei" },
  oil: { label: "车油", icon: "icon-jiayouzhan2" },
  parking: { label: "停车费", icon: "icon-tingchefeiyong" },
  traffic: { label: "交通费", icon: "icon-gongjiaoche" },
  supermarket: { label: "超市", icon: "icon-chaoshi2" },
  online_shopping: { label: "网购", icon: "icon-wanggou" },
  phone_bill: { label: "话费", icon: "icon-dianhua" },
  red_packet: { label: "红包", icon: "icon-hongbao2" },
  vip: { label: "vip", icon: "icon-vip1" },
  other: { label: "其他", icon: "icon-qitafeiyong" },
};
const tableData = ref<any>({});
const totals = ref(0);

const onClickItem = (e: any) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex;
  }
};

const init = async () => {
  const { sum, total } = await expensesCheck({
    name: [
      "eat",
      "drink",
      "play",
      "glad",
      "tolls",
      "oil",
      "parking",
      "traffic",
      "supermarket",
      "online_shopping",
      "phone_bill",
      "red_packet",
      "vip",
      "other",
    ],
    startDate: params.value.startDate,
    endDate: params.value.endDate,
  });

  tableData.value = { ...sum };
  totals.value = total;
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.chart-page {
  .chart-segmented-container {
    background: #fede2b;
    padding: 0 40rpx;
    padding-bottom: 20rpx;
  }

  .slot-icon {
    width: 80rpx;
    height: 80rpx;
    margin-right: 20rpx;
  }

  .slot-box {
    width: 100%;
  }

  .slot-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #333;
  }
}
</style>
