const http = uni.$u.http

import "@/config/request.js";

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
export const queryUser = (data) => {
	return http.get('/box/system/user/getById', data)
}

export const userLogin = (code) => {
	return http.get(`/box/wx-app/login?code=${code}`)
}

// 微信头像昵称信息
export const updateUserInfo = (params, config = {}) => {
	return http.post('/box/system/wx-user/updateUserInfo', params, config)
}



// //  查询账户信息
// export const getAccount = () =>
//   request({
//     url: `/box/system/account/getInfo`,
//     method: "get",
//   })