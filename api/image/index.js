const http = uni.$u.http

// 图片生成
export const generateImage = (params, config = {}) => http.post('/box/chat/image', params, config)

// 工具箱
export const generateImagePcedit = (params, config = {}) => {
	return http.post('/box/chat/pcedit', params, config)
}

// 换脸
export const generateFaceSwap = (params, config = {}) => {
	return http.post('/box/chat/faceSwap', params, config)
}

// 证件照
export const generateIdPhoto = (params, config = {}) => {
	return http.post('/box/chat/idPhoto', params, config)
}
