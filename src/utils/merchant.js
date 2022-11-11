import request from '@/utils/request.js'

// 应用管理列表
export function mchApps(data){
	return request({
		url:'/mer/mchApps/listByCondition',
		method:"get",
		params:data
	})
}

// 新增应用
export function addmchApps(data){
	return request({
		url:'/mer/mchApps',
		method:"post",
		data
	})
}

// 修改应用
export function updatamchApps(data){
	return request({
		url:'/mer/mchApps/' + data.appId,
		method:"put",
		data
	})
}
// 删除应用
export function delmchApps(data){
	return request({
		url:'/mer/mchApps/' + data,
		method:"DELETE"
	})
}


// 支付参数配置列表
export function payConfigs(data){
	return request({
		url:'/mer/mch/payConfigs',
		method:'get',
		params:data
	})
}

// 支付通道配置
export function payPass(data){
	return request({
		url:"/mer/mch/payPassages",
		method:'get',
		params:data
	})
}


// 支付测试
export function payways(data){
	return request({
		url:'/paytest/payways/' + data,
		method:'get'
	})
}

// 转账
export function mchTransfers(data){
	return request({
		url:'/mchTransfers/ifCodes/' + data,
		method:'get'
	})
}

