import {
	defineStore
} from "pinia"

export const useUserStore = defineStore({
	id: "user",
	state: () => {
		return {
			showLogin: false,
			account: {
				token: 0,
			}, // 账户信息
			user: {}, // 用户信息
		}
	},
	getters: {},
	actions: {
		setLogin(data) {
			this.showLogin = data
		},
		setUser(data) {
			this.user = data
		},
		setAccountToken(data) {
			this.account.token = data
		},
	},
})