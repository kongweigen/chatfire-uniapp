import {
	ref
} from 'vue'
import {
	commonUrl,
} from '@/config/host.js'

export const useUpload = () => {
	const loading = ref(false)
	const imageUrl = ref('')
	const uploadImage = () => {
		uni.chooseImage({
			success: (chooseImageRes) => {
				const tempFile = chooseImageRes.tempFiles[0];
				const tempFilePath = chooseImageRes.tempFilePaths[0];
				uni.showLoading({
					mask: true,
					title: '正在上传'
				});
				const token = uni.getStorageSync("token")
				uni.uploadFile({
					url: `${commonUrl}/box/chat/file`, //仅为示例，非真实的接口地址
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
						imageUrl.value = JSON.parse(uploadFileRes.data).data
					},
					fail: () => {
						uni.hideLoading();
					}
				});
			}
		});
	}
	return {
		imageUrl,
		uploadImage
	}
}