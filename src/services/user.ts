import { request } from '@/services/request'

const login = async (params: any) => {
  const res: any = await request('/login', 'POST', params)
  return res
}

export { login }
