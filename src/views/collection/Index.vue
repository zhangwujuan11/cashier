<template>
	<div class="bbodyy">
		<div class="mai" :style="{'padding-top':phoneheight}">
			<div class="maretitle">
				<img @click="goback" src="@/assets/images/back2.png" alt="">
				银联收款通道
				<!-- <el-dropdown>
					<span class="el-dropdown-link">
				  <img class="more" src="@/assets/images/morewhite.png" alt="">
					</span> -->
				<!-- <el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="toEnter">扫一扫</el-dropdown-item>
					</el-dropdown-menu> -->
				<!-- </el-dropdown> -->
			</div>
		</div>
		<div class="contenbox">
			<div class="conten">
				<!-- <span class="name">某某某</span> -->
				<img v-if="qrshow" src="@/assets/images/qrcodess.png">
				<div id="qrcode" ref="qrcode"></div>
				<span class="jine" @click="gowhere">设置金额</span>
				<el-button style="margin-top: 28px;" type="primary" @click="toEnter">扫一扫</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {showpaycode,transactionquery,showqrcode,innterinfo} from '@/utils/collection.js'
	import QRCode from 'qrcodejs2'
	export default {
		data() {
			return {
				phoneheight: localStorage.getItem('phonetopheight'),
				code: '',
				ip: '',
				sig: '',
				codedd:'',
				times:'',
				qrshow:true,
				text:"http://www.baidu.com"
			}
		},
		components: {},
		mounted() {
			this.ip = returnCitySN.cip

		},
		methods: {
			goback() {
				this.$router.push('/home')
			},
			
			formatDate(objDate,fmt){ 
			　　var o = {
			　　　　"M+" : objDate.getMonth()+1, //月份
			　　　　"d+" : objDate.getDate(), //日
			　　　　"h+" : objDate.getHours()%12 == 0 ? 12 : objDate.getHours()%12, //小时
			　　　　"H+" : objDate.getHours(), //小时
			　　　　"m+" : objDate.getMinutes(), //分
			　　　　"s+" : objDate.getSeconds(), //秒
			　　　　"q+" : Math.floor((objDate.getMonth()+3)/3), //季度
			　　　　"S" : objDate.getMilliseconds() //毫秒
			　　};
			　　if(/(y+)/.test(fmt))
			　　　　fmt=fmt.replace(RegExp.$1, (objDate.getFullYear()+"").substr(4 - RegExp.$1.length));
			　　for(var k in o)
			　　　　if(new RegExp("("+ k +")").test(fmt))
			　　fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
			　　return fmt;
			},
			//公众号加服务窗
			gowhere(){
				this.$prompt('收款金额', '请设置金额,单位(元)', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          inputPattern: /^(0|([1-9]\d{0,6}))(\.\d{1,2})?$/,
				          inputErrorMessage: '金额格式不正确',
						  }).then(({ value }) => {
							
							  
							  
							// let code=''
							// //设置随机字符
							// let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
							// for (var i = 0; i < 4; i++) {
							// 	  var index = Math.floor(Math.random() * 9);
							// 	  code += random[index];
							// 	  this.codedd= code ;
							// }
				   //        	let year = (new Date().getFullYear()).toString();
				   //        	let month = (new Date().getMonth() + 1).toString();
				   //        	let day = (new Date().getDate()).toString();
				   //        	let hour = (new Date().getHours()).toString();
				   //        	let minute = (new Date().getMinutes()).toString();
							// let seconds =( new Date().getSeconds()).toString();
							// if(month.length == 1){
							// month = "0" + month
							// }
							// if(day.length ==1){
							// 	day = "0" + day
							// }
							// if(hour.length == 1){
							// 	hour = "0" + hour
							// }
							// if(minute.length == 1){
							// 	minute = "0" + minute
							// }
							// if(seconds.length == 1){
							// 	seconds = "0" + seconds
							// }
				   //        	let time =year + month + day + hour + minute + this.codedd
							// this.times=year + month + day + hour + minute + seconds
							// // 32位随机数
							// let arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
							// num = "";
							// for(var e = 0; e < 32; e++) {
							// 	num += arr[parseInt(Math.random() * 36)];
							// }
				   //        	showqrcode({
							// 	"appId":'8a81c1be831e62880183c6537f4d1bc8',
							// 	"timestamp":this.times,
							// 	"nonce":num,
							// 	"content":{
							// 	"requestTimestamp":this.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss"),
							// 	"merOrderId":time,
							// 	"mid":"89835015331APS9", //商户号需要配置,先固定
							// 	"tid": "Z58UTR15", //终端号
							// 	"instMid":'YUEDANDEFAULT',
							// 	"totalAmount": value * 100//支付总 金额
							// 	},
				   //        	}).then(data=>{
				   //        		console.log(data.data)
								
							// 	// // 二维码
							// 	 new QRCode("qrcode", {
							// 	        width: 150,
							// 	        height: 150,
							// 	        text: "http://www.baidu.com", // 二维码内容
							// 	        render: "canvas", // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
							// 	        colorDark: "#000", // 背景色
							// 	        colorLight: "#fff", // 前景色
							// 	      })
								
								
				   //        	})
				   
				   
				   
				   
				   
				   
				   // 二维码
				    new QRCode("qrcode", {
				           text:this.text, // 二维码内容
				           render: "canvas", // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
				           colorDark: "#000", // 背景色
				           colorLight: "#fff", // 前景色
				         })
						this.qrshow=false
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '取消输入'
				          });       
				        });
			},
			// 扫客户
			toEnter() {
				this.$prompt('收款金额', '请设置金额,单位(元)', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /^(0|([1-9]\d{0,6}))(\.\d{1,2})?$/,
					inputErrorMessage: '金额格式不正确'
				}).then(({value}) => {
					window.flutter_inappwebview.callHandler('customScan').then((res) => {
						//console.log(res.data)
						let year = (new Date().getFullYear()).toString();
						let month = (new Date().getMonth() + 1).toString();
						let day = (new Date().getDate()).toString();
						let hour = (new Date().getHours()).toString();
						let minute = (new Date().getMinutes()).toString();
						
						if(month.length == 1){
						month = "0" + month
						}
						if(day.length ==1){
							day = "0" + day
						}
						if(hour.length == 1){
							hour = "0" + hour
						}
						if(minute.length == 1){
							minute = "0" + minute
						}
						let code = ''
						//设置随机字符
						let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
						for (var i = 0; i < 4; i++) {
							var index = Math.floor(Math.random() * 9);
							code += random[index];
							this.code = code;
						}
						let time = year + month + day + hour + minute + this.code
						import('@qians/gen_header/gen_header.js').then((ress) => {
							showpaycode({
								body: {
									"merchantCode": "89835015331APS9", //商户号需要配置,先固定
									"merchantRemark": "1133", //商户备注需要配置,先固定
									"payCode":res.data,
									"payMode": "CODE_SCAN", //扫码方式
									"terminalCode": "Z58UTR15", //终端号
									"transactionAmount": value * 100, //交易金额,单位 分
									"merchantOrderId": time, //订单号
									"deviceType": '11',
									"transactionCurrencyCode": '156',
									"ip":returnCitySN.cip
								},
								header: ress.get_open_body_sig(
									"8a81c1be831e62880183c6537f4d1bc8",
									"31cce8efd439471b9badc07468137224",
									JSON.stringify({
										"merchantCode": "89835015331APS9", //商户号需要配置,先固定
										"merchantRemark": "1133", //商户备注需要配置,先固定
										"payCode":res.data,
										"payMode": "CODE_SCAN", //扫码方式
										"terminalCode": "Z58UTR15", //终端号
										"transactionAmount": value * 100, //交易金额,单位 分
										"merchantOrderId": time, //订单号
										"deviceType": '11',
										"transactionCurrencyCode": '156',
										"ip":returnCitySN.cip
									}))
							}).then(data => {
								let codee = data.data.errCode
								if (codee == '00') {
									let obj = data.data
									obj.originalOrderId=obj.orderId
									delete obj.cardAttr
									delete obj.orderId
									delete obj.retrievalRefNum
									delete obj.settlementDate
									delete obj.settlementDateWithYear
									delete obj.thirdPartyDiscountInstruction
									delete obj.thirdPartyDiscountInstrution
									delete obj.thirdPartyName
									delete obj.thirdPartyOrderId
									delete obj.thirdPartyPayInformation
									delete obj.transactionDate
									delete obj.userId
									delete obj.thirdPartyBuyerId
									obj.merchantCode = '123456789900081'
									obj.payCode = res.data
									obj.terminalCode = 'Z58UTR15'
									obj.merchantOrderId=time
									obj.merchantRemark='1133'
									innterinfo({
										"auth": 2,
										"project": "umsPay",
										"table": "order_info",
										"data": [
											obj
										]
									}).then(da => {
										this.$message.success("交易成功")
									})
								}
							}).catch(err => {
								console.log(err)
							})
						})
					})
				})

			},

	// 交易状态查询
			// cc(){
			// 	transactionquery({
			// 		merchantCode:"89835015331APRX",//商户号需要配置,先固定
			// 		terminalCode:"RFV4N2R2",//终端号
			// 		merchantOrderId:time,
			// 	})
			// }
		},
		watch: {}
	}
</script>

<style scoped>
	.bbodyy {
		width: 100%;
		height: 100vh;
		background-color: #0EB264;
	}

	.mai {
		width: 100%;
		display: flex;
		justify-content: center;
		background-color: #0EB264;
	}

	.maretitle {
		width: 8.8rem;
		font-size: 20px;
		color: black;
		display: flex;
		align-items: center;
		padding-bottom: 0.533333rem;
		color: white;
	}

	.maretitle img {
		width: 0.64rem;
		height: 0.64rem;
	}

	.contenbox {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.contenbox .conten {
		width: 8.8rem;
		background-color: white;
		height: 11.2rem;
		margin-top: 0.533333rem;
		border-radius: 0.266667rem;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.contenbox .conten img {
		width: 219px;
		height: 219px;
		/* margin-top: 0.746667rem; */
		/* margin-bottom: 0.8rem; */
	}
	#qrcode{
		/* margin-top: 0.746667rem; */
		margin-bottom: 0.8rem;
	}
	.contenbox .conten span {
		font-size: 0.426667rem;
	}

	.contenbox .conten .jine {
		color: #33638D;
		font-size: 0.373333rem;
	}

	.maretitle .more {
		width: 12px;
		height: 7.5px;
		margin-left: 0.32rem;
	}
</style>
