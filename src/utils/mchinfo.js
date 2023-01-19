import request from '@/utils/request.js'
import axios from 'axios'

// 商户渠道
// export function channelset(data){
// 	return axios({
// 		url: 'https://1to2to3.cn/rds2/service/create',
// 		method: 'post',
// 		data: {
// 			"auth": 2,
// 			"project": "umsPay",
// 			"table": "op_channel_info",
// 			"data": [data]
// 		}
// 	})
// }
// export function channelquery(data){
// 	 return axios({
// 	 	url: 'https://1to2to3.cn/rds2/service/query',
// 	 	method: 'post',
// 	 	data: {
// 	 		"auth": 2,
// 	 		"project": "umsPay",
// 	 		"table": "op_channel_info",
// 	 		"conditions": {
// 	 			"fields": [],
// 	 			"query": {
// 	 				"and": [{
// 	 					"match": {
// 	 						"isDel":0,
// 							"channelName":data
// 	 					}
// 	 				}]
// 	 			}
// 	 		}
// 	 	}
// 	 })
// }

// 商户分类信息
export function mahinfoserch(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_mch_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					"match": {
	 						"channel":data,
	 					}
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}
export function mahinfodata(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_mch_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
						"match": {
							"mchName":data.mchName,
							"tid":data.tid
						}
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}

// 音箱信息
export function tcinfo(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/create',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_tc_info",
	 		"data": [data]
	 	}
	 })
}

export function tcinfoserch(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_tc_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					"match": {
	 						"deviceId": data,
	 					}
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}
export function tcinfoserchall(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_tc_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}


// 所有在用音箱
export function tcinfoserchdata(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_tc_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					"match": {
	 						"isDel":0,
	 					}
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}


// 码牌信息
export function ccinfo(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/create',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_cc_info",
	 		"data": [data]
	 	}
	 })
}

export function ccinfoserch(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_cc_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					"match": {
	 						"id": data,
	 					}
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}
// 在用码牌
export function ccinfoserchall(data){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "op_cc_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					"match": {
	 						"isDel":0,
	 					}
	 				}]
	 			}
	 		 
	 		}
	 	}
	 })
}


// 手机验证码
export function sendverdata(data){
	return axios({
		url:'http://quakelogin.quakeai.tech/sms/dosendMsg',
		method:'post',
		data:{
			"phone":data
		}
	})
}


// 同步到商户音箱信息表
export function tctc(data){
	return axios({
		url: 'https://1to2to3.cn/rds2/service/create',
		method: 'post',
		data: {
			"auth": 2,
			"project": "umsPay",
			"table": "mch_tc_info",
			"data": [data]
		}
	})
}
// 所属服务商
export function isvc(){
	 return axios({
	 	url: 'https://1to2to3.cn/rds2/service/query',
	 	method: 'post',
	 	data: {
	 		"auth": 2,
	 		"project": "umsPay",
	 		"table": "isv_info",
	 		"conditions": {
	 			"fields": [],
	 			"query": {
	 				"and": [{
	 					
	 				}]
	 			}
	 		}
	 	}
	 })
}
