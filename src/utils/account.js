import request from '@/utils/request.js'

// 账号组管理列表
export function divisionReceiverGroups(data){
	return request({
		url:'/mer/divisionReceiverGroups',
		method:'get',
		params:data
	})
}
// 新增账号组管理
export function adddiv(data){
	return request({
		url:'/mer/divisionReceiverGroups',
		method:'post',
		data
	})
}
// 账号管理组详情
export function divinfo(data){
	return request({
		url:'/mer/divisionReceiverGroups/' + data,
		method:'get'
	})
}
// 修改账号管理组信息
export function updatadivinfo(data){
	return request({
		url:'/mer/divisionReceiverGroups/' + data.receiverGroupId,
		method:'put',
		data
	})
}
// 删除账号管理组
export function deldivi(data){
	return request({
		url:'/mer/divisionReceiverGroups/' + data,
		method:'DELETE',
	})
}

// 收款账号管理列表
export function divisionReceivers(data){
	return request({
		url:'/mer/divisionReceivers',
		method:'get',
		params:data
	})
}

// 分账记录列表
export function records(data){
	return request({
		url:'/mer/division/records',
		method:'get',
		params:data
	})
}

// 分账记录详情
export function recordinfo(data){
	return request({
		url:'/mer/division/records/' + data,
		method:'get',
	})
}