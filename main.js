import App from './App'

import {
	createSSRApp
} from 'vue'
import stores from '@/stores'
import request from "./config/request.js";
import uviewPlus from 'uview-plus'
// 引入请求封装，将app参数传递到配置中
export function createApp() {
	const app = createSSRApp(App)
	// require('./config/request.js')(app)
	// app.config.globalProperties.$http = request;
	app.use(uviewPlus);
	app.use(stores);
	request(app)
	return {
		app
	}
}