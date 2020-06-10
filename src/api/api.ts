import axios from "axios";
import {ProfileType} from "../types/types";

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {"API-KEY": "ca0951c1-2a9d-481e-a273-3d5f60141d92"}
})
export const usersAPI = {
	getUsers(currentPage = 1, pageSize = 10) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => {
				return response.data
			})
	},
	followAPI(userId:number) {
		return instance.post(`follow/${userId}`)
	},
	unFollowAPI(userId:number) {
		return instance.delete(`follow/${userId}`)
	},
	getProfile(userId:number) {
		console.warn('obsolete method.please use profileAPI object')
		return profileAPI.getProfile(userId)
	}
}
export const profileAPI = {
	getProfile(userId:number) {
		return instance.get(`profile/` + userId)
	},
	getStatus(userId:number) {
		return instance.get(`profile/status/` + userId)              //запрос статуса отдельно с сервера
	},
	updateStatus(status:string) {
		return instance.put(`profile/status`, {status: status}) // инфа о айди в куки,поэтому не нужно его указывать
	},
	savePhoto(photoFile:any) {
		const formData = new FormData()
		formData.append("image" , photoFile)
		return instance.put(`profile/photo`,formData , {
			headers: {'Content-Type' : 'multipart/form-data'}
		})
	},
		saveProfile(profile:ProfileType) {
			return instance.put(`profile` , profile)
		}

}


enum ResultCodesEnum {
	Success,Error
}
type MeResponseType = {
	data: {id:number , email:string , login:string }
	resultCode:number
	messages: Array<string>


}

export const authAPI = {
	me() {
		return instance.get<MeResponseType>(`auth/me`).then(res => res.data) // через дженерики
	},
	login(email:string, password:string, rememberMe = false , captcha:null | string =null) {
		return instance.post(`auth/login`, {email, password, rememberMe,captcha})
	},
	logout() {
		return instance.delete(`auth/login`)
	}
}

export const securityAPI = {
		getCaptchaUrl() {
				return instance.get(`security/get-captcha-url`)
		},

}