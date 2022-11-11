<template>
	<div class="datable">
		<div @click="goback" class="title" :style="{'margin-top':phoneheight}">
			<i class="el-icon-arrow-left"></i>
			银联订单中心
		</div>
		<ul class="biggestBox">
			<li class="information li_vessel" v-for="(item,index) in tableData" :key="index" @click='oederinfo(index)'>
				<div style="width: 100%;">
					<p>
						<strong>订单ID：</strong>{{item.merchantOrderId}}
					</p>
					<p>
						<strong>订单金额：</strong> ￥{{item.amount | amount}}
					</p>
					<!-- <p>
					<strong>状态：</strong> <span :class="[item.state==1 ? 'greecolor':'redcolor']">{{item.state | state}}</span>
				</p> -->
					<p style="display: flex;justify-content: space-between;">
						<span><strong>交易日期：</strong>{{item.transactionDateWithYear}}-{{item.transactionTime}} </span>
					</p>
				</div>
			</li>
		</ul>

		<!-- 蒙尘 -->
		<el-dialog title="订单详情" append-to-body :visible.sync="dialogVisible" width="98%">
			<div class="chen">
				<p>
					<span>优惠后交易金额：￥{{orderinfo.actualTransactionAmount | amount}}</span>
				</p>
				<p>
					<span>实际支付金额：<span class="dingdan">￥{{orderinfo.amount | amount}}</span></span>
				</p>
				<p>
					<span>支付状态：{{orderinfo.errCode | sate}}</span>
				</p>
				<p>
					<span>商户名称：{{orderinfo.mchntName}}</span>
				</p>
				<p>
					<span>商户号：{{orderinfo.merchantCode}}</span>
				</p>
				<p>
					<span>商户订单号：{{orderinfo.merchantOrderId}}</span>
				</p>
				<p>
					<span>商户备注：{{orderinfo.merchantRemark}}</span>
				</p>
				<p>
					<span>银商订单号：{{orderinfo.originalOrderId}}</span>
				</p>
				<p>
					<span>支付码：{{orderinfo.payCode}}</span>
		 	</p>
				<p>
					<span>终端号：{{orderinfo.terminalCode}}</span>
				</p>
				<p>
					<span>交易成功时间：{{orderinfo.transactionDateWithYear}} - {{orderinfo.transactionTime}}</span>
				</p>
			</div>
			<div class="btn">
				<el-button type="primary" @click='refun(orderinfo)'>退款</el-button>
			</div> 
		</el-dialog>
	</div>
</template>

<script>
	import {collectorder,refund} from '@/utils/collection.js'
	export default {
		filters: {
			amount(e) {
				return e / 100
			},
			sate(e){
				if(e == '00'){
					return '支付成功'
				}
			}
		},
		data() {
			return {
				phoneheight: localStorage.getItem('phonetopheight'),
				tableData: [],
				dialogVisible: false,
				orderinfo:{},
				code:''
			}
		},
		mounted() {
			this.getDatas()
		},
		methods: {
			getDatas() {
				collectorder({
					"auth": 2,
					"project": "umsPay",
					"table": "order_info",
					"conditions": {
						"fields": [],
						"query": {
							 "and": [{
			                    "match": {
									"merchantCode":"123456789900081"
								}
					        }]
						}
					}
				}).then(res => {
					this.tableData = res.data.data
				})
			},
			oederinfo(n) {
				this.orderinfo=this.tableData[n]
				this.dialogVisible=true
			},
			goback() {
				this.$router.push('/home')
			},
			
			// 退款
			refun(n){
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
				import('@qians/gen_header/gen_header.js').then((res) => {
					refund({
						body: {
							"merchantCode": n.merchantCode, 
							"terminalCode":n.terminalCode,
							"merchantOrderId":n.merchantOrderId,
							"refundRequestId":time,
							"transactionAmount":n.transactionAmount
						},
						header: res.get_open_body_sig(
							"8a81c1be831e62880183c6537f4d1bc8",
							"31cce8efd439471b9badc07468137224",
							JSON.stringify({
								"merchantCode": n.merchantCode,
								"terminalCode":n.terminalCode,
								"merchantOrderId":n.merchantOrderId,
								"refundRequestId":time,
								"transactionAmount":n.transactionAmount
							}))
					}).then(data => {
						console.log(data)
					}).catch(err => {
						console.log(err)
					})
				})
			}
		},
		watch: {}

	}
</script>

<style scoped>
	.datable ul {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		color: black;
	}

	.datable ul li {
		font-size: 14px;
	}

	.datable ul li p {
		width: 100%;
		line-height: 0.533333rem;
	}

	.datable {
		margin-bottom: 1.4rem;
	}

	.title {
		font-size: 14px;
		width: 100%;
		height: 0.933333rem;
		background-color: white;
		line-height: 0.933333rem;
		text-indent: 0.266667rem;
		margin-bottom: 0.4rem;
	}
	
	/* 蒙尘 */
	.chen p{
		width: 100%;
		font-size: 0.32rem;
		margin-bottom: 0.666667rem;
		display: flex;
		align-items: center;
	}
	:deep(.el-dialog){
		 border-radius: 0.266667rem;
	}
	:deep(.el-dialog__header){
		 border-bottom: 1px solid rgba(196, 196, 196, 0.5);
	}
	.chen{
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	
	.dingdan {
		color: #2751E5;
		background-color: rgba(39, 81, 229, 0.2);
		border: 1px solid rgba(39, 81, 229, 0.5);
		border-radius: 4px;
		padding:2px 5px;
	}
	
	.shouxu {
		color: #E527B0;
		background-color: rgba(229, 39, 176, 0.2);
		border: 1px solid rgba(229, 39, 176, 0.5);
		border-radius: 4px;
		padding:2px 5px;
	}
	
	.zhifu {
		color: #27E53A;
		background-color: rgba(39, 229, 58, 0.2);
		border: 1px solid rgba(39, 229, 58, 0.5);
		border-radius: 4px;
		padding: 2px 5px;
	}
	
	.fengeborder {
		border-top: 1px solid rgba(196, 196, 196, 0.5);
		width: 100%;
		margin: 0.32rem 0;
	}
	/deep/ .el-table .cell{
	    white-space:pre-line;
	}
	.datable ul {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		color: black;
	}
	
	.datable ul li {
		font-size: 14px;
	}
	
	.datable ul li p {
		width: 100%;
		line-height: 0.666667rem;
	}
	.btn{
		width: 100%;
		text-align: center;
	}
</style>
