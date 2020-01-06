import axios from '@/utils/myaxios.js'
// 登录接口
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
// 根据id去获取到用户的详情
export const getUserById = (id) => {
  return axios({
    url: `/user/${id}`
    // headers: { 'Authorization': localStorage.getItem('toutiao_41_token') }
  })
}
// 3. 更新个人信息
export const updateUserById = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}
