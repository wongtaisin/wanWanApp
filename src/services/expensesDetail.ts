import { request } from '@/services/request'

export const expensesDetailList = async (params: any) => {
  const res: any = await request('/expensesDetail/list', 'POST', params)
  return res
}

export const expensesDetailDelete = async (id: number) => {
  const res: any = await request(`/expensesDetail/del/${id}`, 'DELETE')
  return res
}

export const expensesDetailAdd = async (params: any) => {
  const res: any = await request('/expensesDetail/add', 'POST', params)
  return res
}

export const expensesDetailEdit = async (params: any) => {
  const res: any = await request('/expensesDetail/edit', 'POST', params)
  return res
}

export const checkDatePrice = async (params: any) => {
  const res: any = await request('/expensesDetail/checkDatePrice', 'GET', params)
  return res
}
