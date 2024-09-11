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
			uni.getFileSystemManager().getTempFilePath({
				tempPath: 'temp.mp3',
				success: function(res) {
					// 创建文件写入器
					const writeManager = uni.getFileSystemManager().createWriteFile({
						filePath: res.tempFilePath,
						data: binaryData,
						success: function(res) {
							console.log('文件写入成功');
							// 可以在这里进行后续操作，比如播放MP3
						},
						fail: function(err) {
							console.error('文件写入失败', err);
						}
					});
				},
				fail: function(err) {
					console.error('获取临时文件路径失败', err);
				}
			});
			
			// if (res == "error") return (loading.value = false)
			// if (res) {
			// 	const elink = document.createElement("a")
			// 	elink.download = "voice.mp3"
			// 	elink.style.display = "none"
			// 	const blob = new Blob([res], {
			// 		type: "audio/mpeg"
			// 	})
			// 	voiceBlobList.push(blob)
			// }
			// if (voiceTextList.length == voiceBlobList.length) {
			// 	mergeBlobToMp3(voiceBlobList)
			// }
		}
	}

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