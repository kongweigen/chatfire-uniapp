import {
	queryUser,
	getAccountInfo
} from "@/api/user"
import {
	userLogin
} from '@/api';

import {
	useUserStore
} from "@/stores/userStore"

export const useUser = () => {
	const userStore = useUserStore()

	const initUser = async () => {
		const token = uni.getStorageSync('token')
		if (!token) {
			uni.login({
				async success(res) {
					console.log('res.code', res.code);
					const rsp = await userLogin(res.code);
					uni.setStorageSync('token', rsp.access_token);
					// 初始化
					initAccount()
					const user = await queryUser()
					userStore.setUser(user)
				}
			});
		} else {
			initAccount()
			const res = await queryUser()
			userStore.setUser(res)
		}
	}
	const initAccount = async () => {
		const res = await getAccountInfo()
		userStore.setAccountToken(res)
	}
	return {
		initUser
	}
}