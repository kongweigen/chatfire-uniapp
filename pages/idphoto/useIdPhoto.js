import {
	generateIdPhoto,
	getTaskById
} from '@/api/index.js'
import {
	ref,
	watch,
	onMounted
} from 'vue';

import {
	useUpload
} from '@/hooks/useUpload.js'

export const useIdPhoto = () => {
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
		idPhotoSettings.value.url = sourceImage.value.url
		console.log("generateImagePcedit ", req)
		uni.showLoading({
			mask: true,
			title: 'AI 处理中'
		});
		const req = formdata(idPhotoSettings.value)
		const res = await generateIdPhoto(req, {
			header: {
				'content-type': 'multipart/form-data; boundary=XXX'
			},
		}).finally(() => {
			uni.hideLoading()
		})
		// imageUrl.value = res.img_output_standard
		imageUrl.value = res.img_output_standard_hd
	}
	const imageUrl = ref("")
	// const imageUrl = ref("https://oss.ffire.cc/files/R2evGvkxENKGksFks6akGK.jpg")


	const sourceImage = ref({})
	const {
		uploadImage,
		imageUrl: uploadImageInfo
	} = useUpload()

	watch(() => uploadImageInfo, (data) => {
		sourceImage.value = data.value
	}, {
		deep: true
	})


	const idPhotoSettings = ref({
		url: "",
		size: "一寸",
		backgroundColor: "白色",
		renderMode: "pure_color",
	})

	const sizeOptions = ref([
		[{
				label: "一寸",
				value: "一寸"
			},
			{
				label: "二寸",
				value: "二寸"
			},
			{
				label: "小一寸",
				value: "小一寸"
			},
			{
				label: "小二寸",
				value: "小二寸"
			},
			{
				label: "大一寸",
				value: "大一寸"
			},
			{
				label: "大二寸",
				value: "大二寸"
			},
			{
				label: "五寸",
				value: "五寸"
			},
			{
				label: "教师资格证",
				value: "教师资格证"
			},
			{
				label: "国家公务员考试",
				value: "国家公务员考试"
			},
			{
				label: "初级会计考试",
				value: "初级会计考试"
			},
			{
				label: "英语四六级考试",
				value: "英语四六级考试"
			},
			{
				label: "计算机等级考试",
				value: "计算机等级考试"
			},
			{
				label: "研究生考试",
				value: "研究生考试"
			},
			{
				label: "社保卡",
				value: "社保卡"
			},
			{
				label: "电子驾驶证",
				value: "电子驾驶证"
			},
		]
	])

	const bgColorOptions = ref([
		[{
				label: "蓝色",
				value: "蓝色"
			},
			{
				label: "白色",
				value: "白色"
			},
			{
				label: "红色",
				value: "红色"
			},
			{
				label: "纯蓝色",
				value: "纯蓝色"
			},
			{
				label: "道奇蓝",
				value: "道奇蓝"
			},
			{
				label: "纯红色",
				value: "纯红色"
			},
			{
				label: "猩红色",
				value: "猩红色"
			},
			{
				label: "blue",
				value: "blue"
			},
			{
				label: "white",
				value: "white"
			},
			{
				label: "red",
				value: "red"
			},
		]
	])

	const showSizePicker = ref(false)
	const showbgColorPicker = ref(false)
	const sizePickerConfirm = (val) => {
		idPhotoSettings.value.size = val.value[0].value
		sizePickerCancel()
	}
	const sizePickerCancel = () => {
		showSizePicker.value = false
	}
	const bgColorPickerCancel = () => {
		showbgColorPicker.value = false
	}
	const bgColorPickerConfirm = (val) => {
		idPhotoSettings.value.backgroundColor = val.value[0].value
		bgColorPickerCancel()
	}
	return {
		customStyle,
		showSizePicker,
		showbgColorPicker,
		sizeOptions,
		bgColorOptions,
		idPhotoSettings,
		sourceImage,
		imageUrl,
		uploadImage,
		generate,
		sizePickerConfirm,
		sizePickerCancel,
		bgColorPickerCancel,
		bgColorPickerConfirm,
	}
}

function formdata(obj = {}) {
	let result = ''
	for (let name of Object.keys(obj)) {
		let value = obj[name];
		result +=
			'\r\n--XXX' +
			'\r\nContent-Disposition: form-data; name=\"' + name + '\"' +
			'\r\n' +
			'\r\n' + value
	}
	return result + '\r\n--XXX--'
}