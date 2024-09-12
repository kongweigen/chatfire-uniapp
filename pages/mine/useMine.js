import {
	ref
} from 'vue'
import AvatarIcon from '@/assets/avatar.jpeg'

import {
	useUserStore
} from '@/stores';

export const useMine = () => {
	const defaultAvatar = ref(AvatarIcon)
	const loginCode = ref("")
	const userStore = useUserStore();

	const user = ref({
		username: ""
	})
	const login = () => {
		userStore.setLogin(true)
	}
	
	return {
		user,
		defaultAvatar,
		login,
		loginCode
	}
}