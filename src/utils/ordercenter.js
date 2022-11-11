import request from '@/utils/request.js'

// 订单管理列表
export function payWays(data){
	return request({
		url:'/mer/payOrder/listByCondition',
		method:'get',
		params:data
	})
}

// 订单详情
export function payOrder(data){
	return request({
		url:'/mer/payOrder/' + data,
		method:'get'
	})
}

// 支付方式
export function payWaysss(){
	return request({
		url:'/mer/payWays',
		method:'get'
	})
}

// 退款记录列表
export function refundOrder(data){
	return request({
		url:'/mer/refundOrder/listByCondition',
		method:'get',
		params:data
	})
}

// 退款订单详情
export function refundOrderinfo(data){
	return request({
		url:'/mer/refundOrder/' + data,
		method:'get'
	})
}

// 转账订单列表
export function transferOrders(data){
	return request({
		url:'/mer/transferOrders/listByCondition',
		method:'get',
		params:data
	})
}
// 转账订单详情
export function transfinde(data){
	return request({
		url:'/mer/transferOrders/' + data,
		method:'get'
	})
}
