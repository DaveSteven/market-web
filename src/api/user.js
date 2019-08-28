import axios from '@/libs/api.request'

export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  return axios.request({
    url: '/admin/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: '/admin/getInfo',
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
