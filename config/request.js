import {
	commonUrl
} from '@/config/host.js'
const request = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		// config.baseURL = 'https://agi.chatfire.cn'; /* 根域名 */
		config.baseURL = commonUrl; /* 根域名 */
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.data = config.data || {}
		// let token = localStorage.getItem("chatfire-token")
		let token = uni.getStorageSync("token")
		config.header["Authorization"] = `Bearer ${token}`
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/

		const data = response.data
		if (response.config.url.includes('openai-dev.chatfire.cn')) {
			return data
		}
		if (response.config.url.includes('/box/chat/speech')) {
			return data
		}
		// 自定义参数
		if (data.code !== 200) {
			if (data.code == 401) uni.setStorageSync("token", "")
			uni.showToast({
				title: data?.msg,
				icon: 'error'
			})
			return new Promise.reject()
		} else {

		}
		return data.data === undefined ? {} : data.data
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})
}
export default request