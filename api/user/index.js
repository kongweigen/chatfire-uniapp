const http = uni.$u.http

import "@/config/request.js";

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
export const queryUser = (data) => {
	return http.get('/box/system/user/getById', data)
}

export const userLogin = (code, config = {}) => {
	return http.get(`/box/wx-app/login?code=${code}`, {}, config)
}

// 微信头像昵称信息
export const updateUserInfo = (params, config = {}) => {
	return http.post('/box/system/wx-user/updateUserInfo', params, config)
}

// 签到
export const signIn = (config = {}) => {
	return http.get(`/box/system/order/signIn`, {}, config)
}


// 账户
export const getAccountInfo = (config = {}) => {
	return http.get(`/box/system/account/getInfo`, {}, config)
}