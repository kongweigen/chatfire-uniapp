const http = uni.$u.http

// 图片生成
export const generateImage = (params, config = {}) => http.post('/box/chat/image', params, config)
export const generateImagePcedit = (params, config = {}) => {
	return http.post('/box/chat/pcedit', params, config)
}

// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
// export const getMenu = (data) => http.get('/ebapi/public_api/index', data)