import request from '@/utils/request.js'
import axios from 'axios'


// b扫c
export function showpaycode(data){
	return axios({
		url:'https://api-mop.chinaums.com/v4/poslink/transaction/pay',
		method:'post',
		data:data.body,
		headers:{'Authorization':data.header}
	})
}
// 订单存档
export function innterinfo(data){
	return axios({
		url:'https://1to2to3.cn/rds2/service/create',
		method:'post',
		data
	})
}
// 订单查询
export function collectorder(data){
	return axios({
		url:'https://1to2to3.cn/rds2/service/query',
		method:'post',
		data
		
	})
}

// 退款
export function refund(data){
	return axios({
		url:'https://api-mop.chinaums.com/v2/poslink/transaction/refund',
		method:"post",
		data:data.body,
		headers:{'Authorization':data.header}
	})
}


//交易状态查询
 export function transactionquery(data){
	 return axios({
		 url:'https://test-api-open.chinaums.com/v2/poslink/transaction/query',
		 method:'post',
		 data
	 })
 }
 
 // 公众号加服务窗
export function  showqrcode(data){
	return axios({
		url:'https://api-mop.chinaums.com/v1/netpay/webpay/pay',
		method:'get',
		params:data.body,
		headers:{'authorization':'OPEN-FORM-PARAM'}
	})
}