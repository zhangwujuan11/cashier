import request from '@/utils/request.js'
import axios from 'axios'

// export function register (data){
// 	return axios({
// 		url:' https://1to2to3.cn/super-login/user/register',
// 		method:'POST',
// 		data
// 	})
// }


// // 发送短信验证码
// export function dosendMsg (data){
// 	return axios({
// 		url:'https://1to2to3.cn/super-login/sms/dosendMsg',
// 		method:'POST',
// 		data
// 	})
// }

// 账号密码登录
// export function goLogin(data){
// 	return request({
// 		url:'https://1to2to3.cn/super-login/oauth/token',
// 		method:'post',
// 		params:data
// 	})
// }

// 判断token
export function overdue(){
  return axios({
    url:'https://1to2to3.cn/super-login/oauth/check_token',
    method:'post',
    params:{token:JSON.parse(localStorage.getItem('user')).token}
  })
}


// 通过手机号获取用户名称
export function charkname(data){
	return axios({
		url:'https://1to2to3.cn/super-login/user/findPhone',
		method:'post',
		data
	})
}
// 注册1to2to3用户中心账号
export function onetwo(data){
	return axios({
		url:'https://1to2to3.cn/super-login/user/register',
		method:'post',
		data
	})
}
//解析token
export function authorities(data){
	return axios({
		url:'https://1to2to3.cn/super-login/sys/me',
		method:'post',
		headers:{Authorization:'bearer'+' '+data}
	})
}

// 用户信息确认
export function isinfodata(data){
	return request({
		url:'/mer/sysUsers/getUserOrActivationState',
		method:'get',
		params:data
	})
}

// 申请激活
export function sheapply(data){
	return request({
		url:'/mer/sysUsers/apply',
		method:'post',
		data
	})
}
// 进入云商
export function interyunshan(data){
	return axios({
		url:'https://1to2to3.cn/operate/mgr/sysUsers/cloudEnter',
		method:'post',
		data
	})
}