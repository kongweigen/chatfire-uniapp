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
import {
	onLoad,
	onLaunch,
	onUnload
} from '@dcloudio/uni-app';

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
	let audioData = ref(null)

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
	const wxAudio = wx.createInnerAudioContext({}) // 音频API
	let target = `${wx.env.USER_DATA_PATH}/ai-${Date.now()}.mp3`;
	let voiceSoundConfig = ref({
		model: "tts-1",
		input: "",
		voice: "云健", //纪录片 8bad0cb3e890489a8925db005f85a765
		speed: 1,
	})
	const createVoice = async () => {
		loading.value = true
		uni.showLoading({
			title: "生成中"
		})
		let binaryData = await textToVoice(Object.assign({}, voiceSoundConfig.value, {
			input: voiceSoundConfig.value.input
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
				audioData.value = path
				wxAudio.src = path
				initAudio()
			},
		});
	}

	const historyVoice = ref([])

	const pickerShow = ref(false)
	const pickerOptions = ref([voiceSoundOptions])
	const close = () => {
		pickerShow.value = false
	}

	const confirm = (val) => {
		voiceSoundConfig.value.voice = val.value[0]
		pickerShow.value = false
	}
	const cancel = () => {
		pickerShow.value = false
	}

	const currentTime = ref(0)
	const duration = ref(0)
	const initAudio = () => {
		// wxAudio = wx.createInnerAudioContext({})
		wx.setInnerAudioOption({
			obeyMuteSwitch: false // IOS 静音也可播放
		})
		// 监听播放进度更新
		wxAudio.onTimeUpdate(() => {
			countDown()
			currentTime.value = wxAudio.currentTime
		})
		// wxAudio
		wxAudio.onCanplay(() => {
			/**
			 * 播放时才能获取到时长，这里静音播放，获取到时长，停止
			 */
			wxAudio.volume = 0
			wxAudio.play()
			let timer = setInterval(() => {
				duration.value = wxAudio.duration
				if (duration.value) {
					min.value = Math.floor(duration.value / 60)
					sec.value = Math.floor(duration.value % 60)
					wxAudio.stop()
					wxAudio.volume = 1
					clearInterval(timer)
				}
			}, 100)
			wxAudio.offCanplay()
		})
		// 监听播放结束
		wxAudio.onEnded(() => {
			currentTime.value = 0
			isPlay.value = false
			currentTime.value = 0
			min.value = Math.floor(duration.value / 60)
			sec.value = Math.floor(duration.value % 60)
		})
	}

	const min = ref(0)
	const sec = ref(0)
	const countDown = () => {
		if (duration.value && currentTime.value) {
			let remainTime = duration.value - currentTime.value
			min.value = Math.floor(remainTime / 60)
			sec.value = Math.floor(remainTime % 60)
		}
	}
	const isPlay = ref(false)
	const controlAudio = () => {
		isPlay.value = !isPlay.value
		isPlay.value ? wxAudio.play() : wxAudio.pause()
	}
	onUnload(() => {
		// 销毁播放器实例
		wxAudio.destroy()
		// 删除写入的语音文件
		// const fs = wx.getFileSystemManager()
		// fs.unlink({
		// 	filePath: this.data.audioPath
		// })
	})

	// -----------------------------------------

	return {
		controlAudio,
		isPlay,
		min,
		sec,
		duration,
		currentTime,
		audioData,
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