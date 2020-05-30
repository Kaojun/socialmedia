import * as axios from "axios";

const instance = axios.create({
	withCredentials: true,
	baseURL : 'https://social-network.samuraijs.com/api/1.0/' ,
	headers: {"API-KEY" : "ca0951c1-2a9d-481e-a273-3d5f60141d92"}
})



export const usersAPI = {
	getUsers(currentPage = 1, pageSize = 10) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => {
				return response.data
			})
	},
	followAPI (userId) {
	return instance.post(`follow/${userId}`)},
	unFollowAPI(userId) {
		return instance.delete(`follow/${userId}`)},
	getProfile (userId)

	{console.warn('obsolete method.please use profileAPI object')
		return profileAPI.getProfile(userId)

		}
}

export const profileAPI = {
	getProfile (userId)
	{return instance.get(`profile/`+userId)
	},
	getStatus(userId) {
		return instance.get(`profile/status/`+userId)              //запрос статуса отдельно с сервера
	},
	updateStatus(status) {
		return instance.put('profile/status' , {status : status} ) // инфа о айди в куки,поэтому не нужно его указывать

	}
}

export const authAPI = {
	me() {
	return instance.get(`auth/me`)
	},
	login(email,password,rememberMe=false) {
		return instance.post(`auth/login`, {email, password, rememberMe})
	},
	logout() {
		return instance.delete(`auth/login`)	}

}