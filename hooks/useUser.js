import {
	queryUser,
	getAccountInfo
} from "@/api/user"
import {
	useUserStore
} from "@/stores/userStore"

export const useUser = () => {
	const userStore = useUserStore()

	const initUser = async () => {
		initAccount()
		const res = await queryUser()
		userStore.setUser(res)
	}
	const initAccount = async () => {
		const res = await getAccountInfo()
		userStore.setAccountToken(res)
	}
	return {
		initUser
	}
}