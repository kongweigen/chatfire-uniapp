const http = uni.$u.http;
import {
	commonUrl, token
} from '@/config/host.js'
export const chat2gpt = ({
	data,
	signal
}, successCall) => {
	// let token = uni.getStorageSync("token")

	return uni.request({
		method: "POST",
		url: `${commonUrl}/box/chat/ask`, //仅为示例，并非真实接口地址。
		data,
		enableChunked: true,
		responseType: "stream",
		header: {
			"Content-Type": "application/json",
			Accept: "*/*",
			Authorization: `Bearer ${token}`
		},
		success: (res) => {
			console.log(res)
			successCall()
		}
	});

}


// export const chat2gpt = (params, config = {}) => http.post('/box/chat/ask', params.data, config)