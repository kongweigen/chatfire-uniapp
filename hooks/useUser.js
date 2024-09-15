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

	const login = () => {
		return new Promise((resolve) => {
			uni.login({
				async success(res) {
					console.log('res.code', res.code);
					const rsp = await userLogin(res.code, {
						needToken: false
					});
					uni.setStorageSync('token', rsp.access_token);
					resolve()
				}
			});
		})
	}
	const initUser = async () => {
		const token = uni.getStorageSync("token")
		if (!token) return
		initAccount()
		const res = await queryUser()
		userStore.setUser(res)
	}
	const initAccount = async () => {
		const res = await getAccountInfo()
		userStore.setAccountToken(res)
	}
	return {
		initUser,
		login
	}
}