import {
	ref
} from "vue"
import {
	chat2gpt
} from "@/api/index.js"
import * as TextEncoding from 'text-encoding-shim';


export const useSend = () => {
	const running = ref(false)
	const content = ref("")
	// let controller = new AbortController()
	const send = async (data) => {
		// 发送之前进行套餐校验
		let controller = {}
		// controller = new AbortController()
		running.value = true
		content.value = ""
		const streamTask = chat2gpt({
			data,
			signal: controller.signal,
		}, () => {
			// 结束回调
			console.log('结束')
			running.value = false
		}, () => {
			//  失败回调
			console.log('失败')
		})
		streamTask.onChunkReceived((res) => {
			const arrayBuffer = res.data;
			const uint8Array = new Uint8Array(arrayBuffer);
			const chunk = new TextEncoding.TextDecoder('utf-8').decode(uint8Array);
			// 看一下 打印出来的结果

			const t = getOpenAIContent(chunk)
			console.log("输出中", t)
			content.value += t
			if (chunk.includes("[DONE]")) {
				console.log("输出结束")
				running.value = false
			}
		})
	}

	const handleStop = () => {
		if (running.value) {
			controller.abort()
			running.value = false
		}
	}
	return {
		content,
		running,
		send,
		handleStop,
	}
}

function getOpenAIContent(chunk) {
	let content = ""
	try {
		const list = chunk.split("data:")
		list.forEach((item) => {
			if (item) content += JSON.parse(item).choices[0].delta.content || ""
		})
	} catch (error) {} finally {
		return content
	}
}