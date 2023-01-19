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
		url:'https://1to2to3.cn/merchant/mer/sysUsers/cloudEnter',
		method:'post',
		data
	})
}


// 顶顶支付商户信息录入
// levitas查
export function levitas(data) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/query',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "pay_mch_info",
			"conditions": {
				"fields": [],
				"query": {
					"and": [{
						"match": {
							"id": data
						}
					}]
				}

			}
		}
	})
}
// 查询cb
export function levitastid(data) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/query',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "pay_mch_info",
			"conditions": {
				"fields": [],
				"query": {
					"and": [{
						"match": {
							"tid": data.tid,
							"username":data.username
						}
					}]
				}

			}
		}
	})
}
// 查询商户对应的渠道是否有未删除的数据
export function levitastidd(data) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/query',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "pay_mch_info",
			"conditions": {
				"fields": [],
				"query": {
					"and": [{
						"match": {
							"channelId": data.channelId,
							"username":data.username,
							"isDel":0
						}
					}]
				}

			}
		}
	})
}

//新写
export function levcreat(data) {
	return axios({
		url: 'https://1to2to3.cn/rds2/service/create',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "pay_mch_info",
			"data": [data]
		}
	})
}
//修改
export function resetlevtas(data){
	return axios({
		url:'https://1to2to3.cn/rds2/service/update-by-query',
		method:'post',
		data:{
				"auth": 2,
				"project": "umsPay",
				"table": "pay_mch_info",
				"query": {
					"and": [
						{
							"match": {
								"username": data.username,
								"channelId": data.channelId
								},
						}
					]
				},
				"data": data
			}
	})
}


//是否商户信息mid/tid储存
// export function mchpay_info(data){
// 	return axios({
// 		url:'https://1to2to3.cn/rds2/service/query',
// 		method:'post',
// 		data: {
// 			"auth": 2,
// 			"project": "umsPay",
// 			"table": "pay_mch_info_t",
// 			"conditions": {
// 				"fields": [],
// 				"query": {
// 					"and": [{
// 						"match": {
// 							"username": data
// 						}
// 					}]
// 				}
		
// 			}
// 		}
// 	})
// }
//储存绑定商户信息表2
// export function mchpay_infoinit(data){
// 	return axios({
// 		url:'https://1to2to3.cn/rds2/service/create',
// 		method:'post',
// 		data: {
// 			"auth": 2,
// 			"project": "umsPay",
// 			"table": "pay_mch_info_t",
// 			"data": [data]
// 		}
// 	})
// }

	// 修改绑定商户信息表2
	// export function mchpay_infoset(data){
	// 	return axios({
	// 		url:'https://1to2to3.cn/rds2/service/update-by-query',
	// 		method:'post',
	// 		data:{
	// 				"auth": 2,
	// 				"project": "umsPay",
	// 				"table": "pay_mch_info_t",
	// 				"query": {
	// 					"and": [
	// 						{"match": {"username": data.username}}
	// 					]
	// 				},
	// 				"data": data
	// 			}
	// 	})
	// }
	
// 音箱修改
export function tctcset(data){
		return axios({
			url:'https://1to2to3.cn/rds2/service/set',
			method:'post',
			data: {
				"auth": 2,
				"project": "umsPay",
				"table": "mch_tc_info",
				 "id": data.id,
				"data": data
			}
		})
	}