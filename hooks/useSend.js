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
	const searchContent = ref("")
	// let controller = new AbortController()
	const send = async (data) => {
		// 发送之前进行套餐校验
		let controller = {}
		// controller = new AbortController()
		running.value = true
		content.value = ""
		searchContent.value = ""
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
			debugger
			const {
				value,
				searchValue
			} = getOpenAIContent(chunk)
			content.value += value
			searchContent.value += searchValue
			if (chunk.includes("[DONE]")) {
				console.log("输出结束")
				setTimeout(() => {
					running.value = false
				}, 500)
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
		searchContent,
		running,
		send,
		handleStop,
	}
}

function getOpenAIContent(chunk) {
	let value = ""
	let searchValue = ""
	try {
		const list = chunk.split("<|-hold-|>")
		list.forEach((item) => {
			if (item && !item.includes('[DONE]')) {
				let val = JSON.parse(item).choices[0].delta.content || ""
				if (val.startsWith("检索 ")) {
					searchValue += val
				} else {
					value += val
				}
			}
		})
	} catch (error) {
		console.log(error)
	} finally {
		return {
			value,
			searchValue
		}
	}
}