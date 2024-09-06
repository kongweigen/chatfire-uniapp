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
		})
		streamTask.onChunkReceived((res) => {
			const arrayBuffer = res.data;
			const uint8Array = new Uint8Array(arrayBuffer);
			const chunk = new TextEncoding.TextDecoder('utf-8').decode(uint8Array);
			// 看一下 打印出来的结果
			console.log("输出中", chunk)
			if (
				chunk.startsWith("{") &&
				chunk.includes("{") &&
				chunk.includes("}")
			) {
				try {
					const {
						msg
					} = JSON.parse(chunk)
					content.value = msg
				} catch (e) {
					console.log("流异常", e)
					content.value = "系统异常"
				} finally {
					return
				}
			} else {

				content.value += chunk
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

function getVal(val) {
	let content = ""
	try {
		const list = val.split("data: ")
		list.forEach((item) => {
			if (item) content += JSON.parse(item).choices[0].delta.content || ""
		})
	} catch (error) {} finally {
		return content
	}
}