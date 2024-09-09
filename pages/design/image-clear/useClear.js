import {
	generateImagePcedit,
	getTaskById
} from '@/api/index.js'
import {
	ref
} from 'vue'


export const useClear = () => {
	const customStyle = ref({
		width: "700rpx",
		height: "100rpx",
		color: "#ffffff",
		fontSize: "42rpx",
		borderRadius: "50rpx",
		background: "#007CFF"
	})


	const loading = ref(false)
	const generate = async () => {
		const req = getPceditReq(sourceImage.value.url, sourceImage.value.url)
		console.log("generateImagePcedit ", req)
		uni.showLoading({
			mask: true,
			title: 'AI 处理中'
		});
		const res = await generateImagePcedit(req).catch(() => clearTask())
		if (!res) return
		// uni.setStorageSync('storage_key', 'hello');
		getTaskInterval(res.id)
	}

	const queryTasking = ref(false)
	const intervalCode = ref("")
	const imageUrl = ref("")
	// const imageUrl = ref("https://oss.ffire.cc/files/R2evGvkxENKGksFks6akGK.jpg")
	const getTaskInterval = async (id) => {
		intervalCode.value = setInterval(async () => {
			if (queryTasking.value) return
			queryTasking.value = true
			const res = await getTaskById(id).catch(() => {
				clearTask()
			})
			queryTasking.value = false
			let list = []
			if (res.picArr) {
				imageUrl.value = res.picArr[0].src
				clearTask()
			}
		}, 3000)
	}
	const clearTask = () => {
		uni.hideLoading();
		queryTasking.value = false
		loading.value = false
		clearInterval(intervalCode.value)
	}

	const sourceImage = ref({})
	const uploadImage = () => {
		uni.chooseImage({
			success: (chooseImageRes) => {
				const tempFile = chooseImageRes.tempFiles[0];
				const tempFilePath = chooseImageRes.tempFilePaths[0];
				let token =
					'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxODI0MTAyMzM0OTkzNzcyNTQ0LCJ1c2VyX2tleSI6IjgyMTIxYjdhLWU3MjMtNDYwMC1hMTlhLTAxYmIzODUzMWY0YSIsInVzZXJuYW1lIjoidGVzdCJ9.QckzY4WTJRTe9E0CGdlrzpL_DuQBBJnT7DYOjAJVmVhsLotGKnP597A-jBqid8H7UnMFiwG1JFRSf63PzvBvuQ'
				uni.showLoading({
					mask: true,
					title: '正在上传'
				});
				uni.uploadFile({
					url: 'https://agi.chatfire.cn/box/chat/file', //仅为示例，非真实的接口地址
					filePath: tempFilePath,
					name: 'file',
					header: {
						Authorization: `Bearer ${token}`
					},
					formData: {
						'file': tempFile,
						"purpose": "oss"
					},
					success: (uploadFileRes) => {
						uni.hideLoading();
						sourceImage.value = JSON.parse(uploadFileRes.data).data
					},
					fail: () => {
						uni.hideLoading();
					}
				});
			}
		});
	}
	return {
		customStyle,
		sourceImage,
		imageUrl,
		uploadImage,
		generate,
	}
}

function getPceditReq(original_url, thumb_url) {
	return {
		type: '3',
		original_url,
		thumb_url,
		query: "ChatfireAI图片助手",
		image_source: "1",
		picInfo: "",
		picInfo2: "",
		text: "",
		ext_ratio: "", // 扩图比例 1:1   3:4   4:3,
		expand_zoom: "",
		clid: "1",
		front_display: "2",
		create_level: "0", // 重绘 0～6
		style: "", // 风格 clay  橡皮泥的风 miyazaki 宫崎骏 monet 油画
		is_first: true,
	}
}