import { request } from '@/services/request'

const shopAll = async () => {
  const res: any = await request('/shop/all', 'GET')
  return res
}

export { shopAll }
