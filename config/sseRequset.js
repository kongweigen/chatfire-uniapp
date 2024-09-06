import {
	fetchEventSource
} from "@microsoft/fetch-event-source";
const autoCloseDuration = 10000

export const createController = () => new AbortController();

export const createSSERequset = ({
	url,
	data,
	onmessage,
	onerror,
	controller
}) => {
	const createTimer = () => {
		return setTimeout(() => {
			console.log("============SSE超时自动关闭============");
			onmessage({
				state: "over",
				data: null
			});
			controller.abort();
		}, autoCloseDuration);
	};
	let token =
		'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxODI0MTAyMzM0OTkzNzcyNTQ0LCJ1c2VyX2tleSI6IjMyMWEzMDRmLTdlZjktNDljMS1hYmE4LTBhOTBhMDdjZTgzOSIsInVzZXJuYW1lIjoidGVzdCJ9.9nLbW-MPMr42Y8em5BPSpXXoJkK6kxU3-ajFnYNfoMaHeg5fQ4AWyFJRSnsrUEMkNCULAQJraAb8c2833v9-lw'

	// let timer = createTimer();
	fetchEventSource(url, {
		method: "POST",
		signal: controller.signal,
		headers: {
			"Content-Type": "application/json",
			Accept: "*/*",
			Authorization: `Bearer ${token}`
		},
		openWhenHidden: true,
		body: JSON.stringify(data),
		onmessage: msg => {
			console.log(msg)
			onmessage({ state: "ing", data: msg });
			// if (timer) clearTimeout(timer);
			// if (msg.data.includes("[DONE]")) {
			// 	controller.abort(); // 当接收到包含 [DONE] 的数据时，终止请求
			// 	onmessage({
			// 		state: "over",
			// 		data: null
			// 	});
			// 	console.log("============数据接收完毕============");
			// } else {
			// 	onmessage({
			// 		state: "ing",
			// 		data: msg
			// 	});
			// 	// timer = createTimer();
			// }
		},
		onerror: err => {
			onerror(err);
			controller.abort();
			throw err; // 抛出错误停止请求
		},
		onclose: err => {
			console.log(err)
		},
	});
};