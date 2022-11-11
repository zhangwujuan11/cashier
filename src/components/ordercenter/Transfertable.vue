<template>
	<div class="datable">
		<!-- <el-table
		 :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
		 style="width:100%;"
		 >
			<el-table-column
			  label="转账金额"
			 >
			 <template slot-scope="scope">
				￥ {{scope.row.amount | amount}}
			 </template>>
			</el-table-column>
			<el-table-column
			  label="订单号"
			  style="overflow-x: hidden;white-space: nowrap;"
			   width="280"
			  >
			  <template  slot-scope="scope">
				  <span class="zz">转账</span>{{scope.row.transferId}}<br>
				  <span class="sh">商户</span>{{scope.row.mchOrderNo}}
			  </template>
			</el-table-column>
			<el-table-column
			  prop="accountNo"
			  label="收款账号"
			 >
			</el-table-column>
			<el-table-column
			  prop="accountName"
			  label="收款人姓名"
			 >
			</el-table-column>
			<el-table-column
			  prop="transferDesc"
			  label="转账备注"
			 >
			</el-table-column>
			<el-table-column
			  label="状态"
			 >
			 <template slot-scope="scope">
				 {{scope.row.state | state}}
			 </template>
			</el-table-column>
			<el-table-column
			  prop="createdAt"
			  label="创建日期"
			   width="280"
			 >
			</el-table-column>
			<el-table-column
			  label="操作"
			  fixed="right"
			 >
			 <template slot-scope="scope">
				 <span @click="jinhao(scope.row.transferId)" style="color: #1a79ff;cursor: pointer;">详情</span>
			 </template>>
			</el-table-column>
		  </el-table>
		  <el-pagination
		  	background
		  	@current-change="handleCurrentChange" 
		  	:current-page="currentPage"
		  	:page-sizes="pageSizes" 
		  	:page-size="PageSize" 
		  	layout="prev, pager, next"
		  	:total="totalCount">
		  </el-pagination> -->
		  
		  <ul>
		    <li class="information" v-for="(item,index) in tableData" :key="index"  @click="jinhao(item.payOrderId)">
		  	<p>
		  		<strong>应用APPID：</strong>{{item.appId}}
		  	</p>
		  	<p>
		  		<strong>支付金额：</strong>￥{{item.amount | amount}}
		  	</p>
		  	<p>
		  		<strong>订单状态：</strong> <span :class="[item.state==1 ? 'greecolor':'redcolor']">{{item.state | state}}</span>
		  	</p>
		  	<p style="display: flex;justify-content: space-between;">
		  		<span><strong>创建日期：</strong>{{item.createdAt | formatDate('yyyy-MM-dd HH:mm:ss')}} </span>
		  	</p>
		    </li>
		  </ul>
		  <!-- 蒙尘 -->
		  <el-dialog title="转账订单详情" append-to-body :visible.sync="dialogVisible" width="98%">
		  	<div class="chen">
				<p>
					<span>应用APPID：{{dialogData.appId}}</span>
				</p>
				<p>
					转账订单号：<br><br> <span class="shouxu">{{dialogData.transferId}}</span>
				</p>
				<p>
					商户转账单号：{{dialogData.mchOrderNo}}
				</p>
				<p>
					渠道支付订单号：{{dialogData.channelPayOrderNo}}
				</p>
				<p>
					<span>金额：<span class="zhifu">￥{{dialogData.amount | amount}}</span></span>
				</p>
				<p>
					<span>货币代码：{{dialogData.currency}}</span>
				</p>
				<p>
					<span>收款账号：<br><br><span class="shouxu">{{dialogData.accountNo}}</span></span>
				</p>
				<p>
					收款人姓名：{{dialogData.accountName}}
				</p>
				<p>
					转账备注：{{dialogData.transferDesc}}
				</p>
				<p>
					订单状态：{{dialogData.state | state}}
				</p>
				<p>
					转账成功时间：{{dialogData.successTime}}
				</p>
				<p>
					<span>创建时间：{{dialogData.createdAt}}</span>
				</p>
				<p>
					<span>更新时间：{{dialogData.updatedAt}}</span>
				</p>
				<!-- border -->
				<p class="fengeborder"></p>
				<p>
					<span>接口代码：{{dialogData.ifCode}}</span>
				</p>
				<p>入账类型：{{dialogData.entryType | entryType}}</p>
				<p>
					<span>客户端IP：{{dialogData.clientIp}}</span>
				</p>
				<p>异步通知地址：</p>
				<!-- border -->
				<p class="fengeborder"></p>
				<p>渠道订单号：{{dialogData.channelOrderNo}}</p>
				<p>渠道错误码：{{dialogData.errCode}}</p>
				<p>渠道错误描述：{{dialogData.errMsg}}</p>
				<p>渠道额外参数：{{dialogData.extParam}}</p>
				<!-- border -->
				<p class="fengeborder"></p>
				<p>扩展参数：{{dialogData.channelExtra}}</p>
		  	</div>
		  </el-dialog>
		  <router-view></router-view>
	</div>
</template>

<script>
	import {transferOrders,transfinde} from '@/utils/ordercenter.js'
	export default{
		filters:{
			amount(e){
				return e/100
			},
			state(e){
				if(e==0){
					return '订单生成'
				}else if(e==1){
					return '转账中'
				}else if(e==2){
					return '转账成功'
				}else if(e==3){
					return '转账失败'
				}else if(e==4){
					return '订单关闭'
				}
			},
			entryType(e){
				if(e=='WX_CASH'){
					return '微信零钱'
				}else if(e=='ALIPAY_CASH'){
					return '支付宝转账'
				}else if(e=='BANK_CARD'){
					return '银行卡'
				}
			},
			formatDate: function(value, args) {
				var dt = new Date(value);
				if (args == 'yyyy-M-d') { // yyyy-M-d
					let year = dt.getFullYear();
					let month = dt.getMonth() + 1;
					let date = dt.getDate();
					return `${year}-${month}-${date}`;
				} else if (args == 'yyyy-M-d H:m:s') { // yyyy-M-d H:m:s
					let year = dt.getFullYear();
					let month = dt.getMonth() + 1;
					let date = dt.getDate();
					let hour = dt.getHours();
					let minute = dt.getMinutes();
					let second = dt.getSeconds();
					return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
				} else if (args == 'yyyy-MM-dd') { // yyyy-MM-dd
					let year = dt.getFullYear();
					let month = (dt.getMonth() + 1).toString().padStart(2, '0');
					let date = dt.getDate().toString().padStart(2, '0');
					return `${year}-${month}-${date}`;
				} else { // yyyy-MM-dd HH:mm:ss
					let year = dt.getFullYear();
					let month = (dt.getMonth() + 1).toString().padStart(2, '0');
					let date = dt.getDate().toString().padStart(2, '0');
					let hour = dt.getHours().toString().padStart(2, '0');
					let minute = dt.getMinutes().toString().padStart(2, '0');
					let second = dt.getSeconds().toString().padStart(2, '0');
					return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
				}
			}
		},
		props:['tabledatas'],
		data(){
			return{
				tableData: [],
				 dialogVisible:false,
				 dialogData:{},
				 // 默认显示第几页
				 currentPage: 1,
				 // 总条数，根据接口获取数据长度(注意：这里不能为空)
				 totalCount: 1,
				 // 个数选择器（可修改）
				 pageSizes: [1, 2, 3, 4],
				 // 默认每页显示的条数（可修改）
				 PageSize:5
				}
				
		},
		created() {
			this.getDatas()
		},
		methods:{
			// 转账订单详情
			jinhao(n){
				transfinde(n).then(res=>{
					if(res.data.code == 200){
						this.dialogVisible=true
						this.dialogData=res.data.data
					}else{
						this.$message.error('信息出错')
					}
				})
			},
			// 转账订单列表
			getDatas(){
				transferOrders().then(res=>{
					this.tableData=res.data.data.records
				})
			},
			// 分页
			// getData() {
			// 	this.totalCount = this.tableData.length
			// },
			// 显示第几页
			// handleCurrentChange(val) {
			// 	// 改变默认的页数
			// 	this.currentPage = val
			// }
		},
		watch:{
			
			tabledatas(n){
				this.tableData=n
			}
		}
		
	}
</script>

<style scoped>
	:deep(.el-table th.el-table__cell){
		background-color: #F5F5F5 !important;
	}
	
	:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf){
		/* border-bottom: none !important; */
	}
	.zz{
		color: #1C64A3;
		background-color: rgba(39, 141, 229, 0.2);
		border-radius: 0.106667rem;
		padding: 0.053333rem 0.106667rem;
		margin-right: 0.106667rem;
	}
	.sh{
		color: #1CA329;
		background-color: rgba(155, 181, 158, 0.2);
		border-radius: 0.106667rem;
		padding: 0.053333rem 0.106667rem;
		margin-right: 0.106667rem;
	}
	:deep(.el-table .cell){
		line-height: 0.853333rem;
		white-space: nowrap;
		overflow: hidden;
	}
	:deep(.el-table--fit){
		padding-bottom: 1.6rem;
	}
	/* 蒙尘 */
	.chen p{
		width: 100%;
		font-size: 10px;
		margin-bottom:25px;
		display: flex;
		align-items: center;
	}
	:deep(.el-dialog){
		 border-radius: 10px !important;
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
	p img{
		width: 50px;
		height: 18px;
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
</style>