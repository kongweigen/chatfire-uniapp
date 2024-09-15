import {
	onMounted,
	ref,
	computed
} from "vue"
import {
	textToVoice
} from '@/api'
import {
	voiceSoundOptions
} from "@/utils"


export const useVoice = () => {
	const customStyle = ref({
		width: "700rpx",
		height: "100rpx",
		color: "#ffffff",
		fontSize: "42rpx",
		borderRadius: "50rpx",
		background: "#007CFF"
	})
	const mockData = ref({
		poster: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/music-a.png',
		name: '致爱丽丝',
		author: '暂无',
		src: 'https://web-ext-storage.dcloud.net.cn/uni-app/ForElise.mp3',
	})
	const audioAction = ref({
		method: 'pause'
	})


	let activeName = ref("text")
	// 生成的音频
	let resData = ref(null)

	// 字符串不限制长度，按照1500个字符进行切割，切换成数组，然后生成数组blob
	const splitVoiceText = (str) => {
		const chunks = []
		const chunkSize = 15000
		for (let i = 0; i < str.length; i += chunkSize) {
			chunks.push(str.slice(i, i + chunkSize))
		}
		return chunks
	}

	let loading = ref(false)

	// 文字生成语音参数
	const audioCtx = wx.createWebAudioContext()
	let voiceSoundConfig = ref({
		model: "tts-1",
		input: "",
		voice: "云健", //纪录片 8bad0cb3e890489a8925db005f85a765
		speed: 1,
	})
	const createVoice = async () => {
		let voiceTextList = splitVoiceText(voiceSoundConfig.value.input)
		let voiceBlobList = []
		loading.value = true
		for (const item of voiceTextList) {
			let binaryData = await textToVoice(Object.assign({}, voiceSoundConfig.value, {
				input: item
			}))
			// resData.value = binaryData
			const arrBuf = new Uint8Array(binaryData)
			const path = `${wx.env.USER_DATA_PATH}/ai-${Date.now()}.mp3`;
			const fsm = wx.getFileSystemManager();
			fsm.writeFile({
				filePath: path,
				data: binaryData,
				encoding: 'base64',
				success: (res) => {
					const innerAudioContext = wx.createInnerAudioContext();
					innerAudioContext.src = path;
					innerAudioContext.play(); // 开始播放音频
				},
			});
			// audioCtx.decodeAudioData(binaryData, buffer => {
			// 	console.log(buffer)
			// }, err => {
			// 	console.error('decodeAudioData fail', err)
			// })
			// audioCtx.decodeAudioData(arrBuf, buffer => {
			// 	debugger
			// 	let source = audioCtx.createBufferSource()
			// 	source.buffer = buffer
			// 	source.connect(audioCtx.destination)
			// 	source.start()
			// }, err => {
			// 	console.error('decodeAudioData fail', err)
			// 	reject()
			// })

			// const fs = uni.getFileSystemManager()
			// const filePath = `${wx.env.USER_DATA_PATH}/ai-${Date.now()}.mp3`

			// fs.writeFile({
			// 	filePath,
			// 	data: binaryData,
			// 	// encoding: 'binary',
			// 	success(res) {

			// 		console.log(res)
			// 		fs.readFile({
			// 			filePath,
			// 			encoding: 'base64',
			// 			success: r => {
			// 				debugger
			// 				resData.value = r.data
			// 				console.log(r.data, 'base64');
			// 			}
			// 		})
			// 	},
			// 	fail(res) {
			// 		console.error(res)
			// 	}
			// })

		}
	}

	// const play = () => {
	//   loadAudio('huobao-ai-test.mp3').then(buffer => {
	//     let source = audioCtx.createBufferSource()
	//     source.buffer = buffer
	//     source.connect(audioCtx.destination)
	//     source.start()
	//   }).catch(() => {
	//     console.log('fail')
	//   })
	// }



	const historyVoice = ref([])
	const mergeBlobToMp3 = (voiceBlobList) => {
		const blob = new Blob(voiceBlobList, {
			type: "audio/mpeg"
		})
		const audioUrl = URL.createObjectURL(blob)
		resData.value = audioUrl
		historyVoice.value.unshift({
			prompt: voiceSoundConfig.value.input,
			audioUrl
		})
		loading.value = false
	}

	const pickerShow = ref(false)
	const pickerOptions = ref([voiceSoundOptions])
	const close = () => {
		pickerShow.value = false
	}
	const confirm = (val) => {
		voiceSoundConfig.value.voice = val.value[0]
		console.log(voiceSoundConfig.value)

		pickerShow.value = false
	}
	const cancel = () => {
		pickerShow.value = false
	}
	return {
		resData,
		customStyle,
		voiceSoundConfig,
		pickerShow,
		pickerOptions,
		mockData,
		audioAction,
		createVoice,
		confirm,
		close,
		cancel,
	}
}