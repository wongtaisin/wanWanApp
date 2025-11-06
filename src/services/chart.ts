import { request } from '@/services/request'

const expensesCheck = async (params: any) => {
  const res: any = await request('/expenses/check', 'POST', params)
  return res
}

export { expensesCheck }
