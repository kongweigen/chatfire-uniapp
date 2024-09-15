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
import {
	commonUrl,
} from '@/config/host.js'

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
			uni.showLoading({
				title: "生成中"
			})
			let binaryData = await textToVoice(Object.assign({}, voiceSoundConfig.value, {
				input: item
			}), {
				responseType: 'arraybuffer'
			})
			uni.hideLoading()
			const path = `${wx.env.USER_DATA_PATH}/ai-${Date.now()}.mp3`;
			const fsm = wx.getFileSystemManager();
			fsm.writeFile({
				filePath: path,
				data: binaryData,
				encoding: 'binary',
				success: (res) => {
					resData.value = path
				},
			});

		}
	}


	const historyVoice = ref([])

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