// 将任何可能的 input 转为可用的文件路径字符串
const resolveFilePath = (input: any): string => {
  if (!input) return ''
  if (typeof input === 'string') return input

  // 常见字段，按优先级取
  if (typeof input.file === 'string') return input.file
  if (typeof input.from === 'string') return input.from
  if (typeof input.opts?.from === 'string') return input.opts.from
  if (typeof input.path === 'string') return input.path

  // 有些调用会传入包含 source 或源信息的对象
  if (typeof input.source === 'string') return input.source

  // 最后尝试把对象序列化为字符串再匹配（保险 fallback）
  try {
    const s = JSON.stringify(input)
    return s
  } catch (e) {
    return String(input)
  }
}

const designWidth = (input: any) => {
  const file = resolveFilePath(input).replace(/\\/g, '/').toLowerCase()

  // 检测 uni-ui（考虑 node_modules 路径和包名变体）
  const isUniUI = /node_modules\/uni-ui|node_modules\/@dcloudio\/uni-ui|\/uni-ui\//.test(file)
  if (isUniUI) return 375

  // 若想对项目内某些目录使用不同基准，也可以在这里扩展规则
  // e.g. if (file.includes('/src/components/some-lib')) return 640

  return 750
}

export default designWidth
