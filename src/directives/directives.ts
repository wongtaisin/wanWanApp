/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2024-12-11 10:52:23
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-01-05 15:53:35
 * @FilePath: \app-vue3\src\directive\directives.ts
 * @Description: 自定义指令集合
 *
 * Copyright (c) 2024 by wongtaisin1024@gmail.com, All Rights Reserved.
 */

// 定义事件类型
type EventType = 'input' | 'blur'

/**
 * 触发DOM事件
 * @param el DOM元素
 * @param type 事件类型
 */
const trigger = (el: HTMLElement, type: EventType): void => {
	const event = new Event(type, { bubbles: true })
	el.dispatchEvent(event)
}

/**
 * 格式化数字,保留2位小数
 * @param val 输入值
 * @returns 格式化后的字符串
 */
const formatNum = (val: string): string => {
	// 处理空值、非法输入或以0、.开头的情况
	if (!val) return ''
	if (val.startsWith('.')) return '0'

	// 匹配数字和一个小数点，最多2位小数
	const regex = new RegExp('\\d*\\.?\\d{0,2}')
	const match = val.match(regex)
	let result = match?.[0] || ''

	// 去除开头的0
	if (result.length > 1 && result[0] === '0' && result[1] !== '.') {
		result = result.replace(/^0+/, '')
	}

	// 处理以小数点结尾的情况
	// if (result.endsWith('.')) {
	// 	result = result.slice(0, -1)
	// }

	return result
}

/**
 * 防抖函数
 * @param func 要执行的函数
 * @param wait 等待时间（毫秒）
 */
const debounce = <T extends (...args: any[]) => any>(func: T, wait = 300): T => {
	let timer: NodeJS.Timeout | null = null

	return function (this: any, ...args: Parameters<T>) {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
			timer = null
		}, wait)
	} as T
}

/**
 * 绑定输入框事件
 * @param el DOM元素
 * @param fmt 格式化函数
 */
const bindInput = (
	el: HTMLElement | HTMLInputElement,
	fmt: (val: string) => string | number
): void => {
	const input = el instanceof HTMLInputElement ? el : el.querySelector('input')
	if (!input) return

	const handleInput = (input: HTMLInputElement): void => {
		const oldValue = input.value
		const newValue = String(fmt(oldValue))

		if (oldValue !== newValue) {
			input.value = newValue
			trigger(input, 'input')
		}
	}

	const debouncedHandler = debounce(handleInput, 200)

	input.addEventListener('input', () => debouncedHandler(input))
	input.addEventListener('blur', () => handleInput(input))
}

// 数字输入,限制最大值999999,保留2位小数
export const decimal = {
	mounted(el: HTMLElement): void {
		const maxNum = 999999
		bindInput(el, val => {
			if (!val) return ''
			const formatted = formatNum(val)

			// 处理超过最大值的情况
			const numVal = parseFloat(formatted)

			if (numVal > maxNum) {
				return maxNum.toString()
			}

			return formatted
		})
	}
}

// 正整数输入,限制最大值999999
export const number = {
	mounted(el: HTMLElement): void {
		const maxNum = 999999
		bindInput(el, val => {
			if (!val) return ''
			const formatted = formatNum(val)
			return Number(+formatted > maxNum ? formatted.slice(0, 6) : formatted)
		})
	}
}

// 百分比输入,限制0-100,保留2位小数
export const percent = {
	mounted(el: HTMLElement): void {
		const maxRate = 100
		bindInput(el, val => {
			if (!val) return ''
			const formatted = formatNum(val)
			return +formatted > maxRate ? String(maxRate) : formatted
		})
	}
}

// 开关输入,只能输入0或1
export const oneORzero = {
	mounted(el: HTMLElement): void {
		bindInput(el, val => {
			if (!val) return '0'
			return formatNum(val) ? '1' : '0'
		})
	}
}
