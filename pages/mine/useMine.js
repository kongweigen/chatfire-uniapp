import {
	ref
} from 'vue'
export const useMine = () => {
	const login = () => {
		// uni.getSetting({
		//   success(res) {
		// 		debugger
		//     if (!res.authSetting['scope.record']) {
		//       uni.authorize({
		//         scope: 'scope.record',
		//         success () {
		//           // 用户已经同意小程序使用录音功能，后续调用 uni.startRecord 接口不会弹窗询问
		//           uni.startRecord()
		//         }
		//       })
		//     }
		//   }
		// })
		uni.login({
			async success(res) {
				console.log('res.code', res.code)
				loginCode.value = res.code
			}
		})
		uni.getUserInfo({
			success: function(res) {
				console.log(res)
			}
		})
		// uni.getUserProfile({
		// 	desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
		// 	success: (res) => {
		// 		console.log(res)
		// 	}
		// })
	}
	const loginCode = ref("")
	return {
		login,
		loginCode
	}
}