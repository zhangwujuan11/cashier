<template>
	<div>
		<Moretitle>
			<template slot="tna">
				订单中心
			</template>
		</Moretitle>
		<div class="account">
			<Background>
				<div slot='contentnew'>
					<el-form :model="myFrom" status-icon label-width="100px" class="demo-ruleForm">
						<el-form-item>
							<div class="serboxx">
								<p class="datare">
									<i class="el-icon-date"></i>
									<el-date-picker v-model="riqi" unlink-panels type="daterange" range-separator="—"
										start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy 年 MM 月 dd 日"
										value-format="yyyy-MM-dd">
									</el-date-picker>
								</p>
								<el-input @keyup.enter.native="serchdata()" v-model="query" placeholder="输入应用APPID或支付/商户/渠道订单号">
									<el-button @click='serchdata()' slot="prepend" icon="el-icon-search"></el-button>
								</el-input>
							</div>

						</el-form-item>
						<!-- <el-form-item>
					    <el-input v-model="myFrom.appId" placeholder="应用APPID"></el-input> 
					  </el-form-item> -->
						<div class="selebox">
							<el-select v-model="myFrom.wayCode" placeholder="支付方式">
								<el-option v-for="item in options" :key="item.value" :label="item.label"
									:value="item.label">
						 	</el-option>
							</el-select>
							<el-select v-model="myFrom.state" placeholder="支付状态">
								<el-option v-for="item in options2" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							<el-select v-model="myFrom.divisionState" placeholder="分账状态">
								<el-option v-for="item in options3" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</div>
						<!-- <el-form-item>
							<el-button type="primary" @click='serchdata()'>查询</el-button>
							<el-button @click='resendata()'>重置</el-button>
						</el-form-item> -->
					</el-form>
				</div>
			</Background>
			
		</div>
		<Tabledata :tabledatass='tabledatas'></Tabledata>
		<Footn></Footn>
	</div>
</template>

<script>
	import Moretitle from '@/components/Moretitle.vue'
	import Background from '@/components/Background.vue'
	import Tabledata from '@/components/ordercenter/Indextable.vue'
	import Footn from '@/components/Footn.vue'
	import {
		payWaysss,payWays
	} from '@/utils/ordercenter.js'
	export default {
		data() {
			return {
				options: [],
				options2: [{
					value: 0,
					label: '订单生成'
				}, {
					value: 1,
					label: '支付中'
				}, {
					value: 2,
					label: '支付成功'
				}, {
					value: 3,
					label: '支付失败'
				}, {
					value: 4,
					label: '已撤销'
				}, {
					value: 5,
					label: '已退款'
				}, {
					value: 6,
					label: '订单关闭'
				}],
				options3: [{
					value: 0,
					label: '未发生分账'
				}, {
					value: 1,
					label: '等待分账任务处理'
				}, {
					value: 2,
					label: '分账处理中'
				}, {
					value: 3,
					label: '分账任务已结束'
				}],
				riqi:[],
				myFrom: {
					beginTime:null,
					endTime:null,
					wayCode: null,
					state:null,
					divisionState:null,
				},
				tabledatas:[],
				query:''
			}
		},
		components: {
			Moretitle,
			Background,
			Tabledata,
			Footn
		},
		created() {
			payWaysss().then(res => {
				let obj = res.data.data.records
				for (var i = 0; i < obj.length; i++) {
					this.options.push({
						value: i,
						label: obj[i].wayName
					})
				}
			})
		},
		methods: {
			serchdata() {
				payWays({'query':this.query}).then(res=>{
					this.tabledatas=res.data.data.records
				})
			},
			// resendata() {
			// 	Object.assign(this.$data.myFrom, this.$options.data().myFrom)
			// 	this.riqi = []
			// }
		},
		watch:{
			riqi(n){
				this.myFrom.beginTime=n[0]
				this.myFrom.endTime=n[1]
			},
			myFrom:{
				deep:true,
				handler(newVal,oldVal){
					payWays({'wayCode':newVal.wayCode,'state':newVal.state,'divisionState':newVal.divisionState,'beginTime':newVal.beginTime,'endTime':newVal.endTime}).then(res=>{
						this.tabledatas=res.data.data.records
					})
					
				}
			},
		}
	}
</script>

<style scoped>
	.el-select {
		width: 100%;
	}

	.el-form {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.el-form-item {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	:deep(.el-form-item__content) {
		margin-left: 0 !important;
	}

	:deep(.el-input--suffix .el-input__inner) {
		/* padding-right: 0.4rem !important; */
	}

	:deep(.el-input__inner) {
		width: 100%;
	}

	.el-table {
		display: block;
		overflow-x: auto;
	}


	.datare {
		width: 0.54rem;
		height: 0.54rem;
		position: relative;
	}

	.datare i {
		font-size: 0.64rem;
	}

	.el-date-editor{
		width: 0.54rem;
		height: 0.54rem;
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
	}

	.selebox {
		width: 100vw;
		display: flex;
		align-items: center;
		top: 3.52rem;
	}

	.selebox .el-select {
		width: calc(100% / 3);
	}

	.serboxx {
		width: 8.8rem;
		height: 0.54rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.213333rem;
		
	}
	.serboxx .el-input{
		width: 85%;
	}
	:deep(.serboxx .el-input .el-input__inner){
		background-color: #EBEBEB !important;
	}
	:deep(.el-select .el-input__inner){
		border: none;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 0;
		border-right: 1px solid rgba(0, 0, 0, 0.08);
		color: black;
		text-align: center;
	}
	:deep(.el-select .el-input__inner::-webkit-input-placeholder){
		color: black;
	}
	:deep(.el-select .el-input__inner:focus){
		border: none;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		border-right: 1px solid rgba(0, 0, 0, 0.08);
	}
	:deep(.el-select .el-input .el-select__caret){
		color: black;
	}
	:deep(.selebox .el-select:last-child .el-input__inner){
		border-right: 0;
	}
	:deep(.footn li:first-child){
		color: #278DE5 !important;
	}
</style>
