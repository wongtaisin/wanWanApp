import { request } from '@/services/request'

const expensesDetailAdd = async (params: any) => {
  const res: any = await request('/expensesDetail/add', 'POST', params)
  return res
}

const expensesDetailEdit = async (params: any) => {
  const res: any = await request('/expensesDetail/edit', 'POST', params)
  return res
}

export { expensesDetailAdd, expensesDetailEdit }
