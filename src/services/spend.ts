import { request } from '@/services/request'

const expensesDetailList = async (params: any) => {
  const res: any = await request('/expensesDetail/list', 'POST', params)
  return res
}

const expensesTotal = async (params: any) => {
  const res: any = await request('/expenses/total', 'GET', params)
  return res
}

const expensesDetailDelete = async (id: number) => {
  const res: any = await request(`/expensesDetail/del/${id}`, 'DELETE')
  return res
}

export { expensesDetailDelete, expensesDetailList, expensesTotal }
