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
					<el-form :model="ruleForm"  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
					 <el-form-item>
					 	<div class="serboxx">
					 		<p class="datare">
					 			<i class="el-icon-date"></i>
					 			<el-date-picker v-model="riqi" unlink-panels type="daterange" range-separator="—"
					 				start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy 年 MM 月 dd 日"
					 				value-format="yyyy-MM-dd">
					 			</el-date-picker>
					 		</p>
					 		<el-input @keyup.enter.native="serchdata()" v-model="query" placeholder="输入应用APPID或退款/商户退款订单号等">
					 			<el-button @click='serchdata()' slot="prepend" icon="el-icon-search"></el-button>
					 		</el-input>
					 	</div>
					 </el-form-item>
					 <!-- <el-form-item prop="checkPass">
					    <el-input v-model="ruleForm.unionOrderId" placeholder="退款/支付/渠道/商户退款订单号"></el-input>
					  </el-form-item>
					  <el-form-item prop="checkPass">
					   <el-input v-model="ruleForm.appId" placeholder="应用APPID"></el-input> 
					  </el-form-item>
					  <el-form-item prop="checkPass">
					     <el-select v-model="ruleForm.state" placeholder="退款状态">
					         <el-option
					           v-for="item in options"
					           :key="item.value"
					           :label="item.label"
					           :value="item.value">
					         </el-option>
					     </el-select>
					  </el-form-item> -->
					 <!-- <el-form-item>
					   <el-button type="primary" @click="serchtable">查询</el-button>
					   <el-button @click="resetForm">重置</el-button>
					  </el-form-item> -->
					  <div class="selebox">
					  	<el-select v-model="ruleForm.state" placeholder="退款状态">
					  		<el-option v-for="item in options" :key="item.value" :label="item.label"
					  			:value="item.value">
							</el-option>
					  	</el-select>
					  </div>
					</el-form>
				</div>
			</Background>
			<Tabledata :tabledatas="tabledatas"></Tabledata>
		</div>
		<Footn></Footn>
	</div>
</template>

<script>
	import Moretitle from '@/components/Moretitle.vue'
	import Background from '@/components/Background.vue'
	import Tabledata from '@/components/ordercenter/Refundrecordtable.vue'
	import Footn from '@/components/Footn.vue'
	import {refundOrder} from '@/utils/ordercenter.js'
  export default {
    data() {
      return {
		options: [{
		  value: 0,
		  label: '订单生成'
		}, {
		  value: 1,
		  label: '退款中'
		}, {
		  value: 2,
		  label: '退款成功'
		}, {
		  value: 3,
		  label: '退款失败'
		}, {
		  value: 4,
		  label: '退款任务关闭'
		}],
		riqi:[],
		ruleForm:{
			beginTime:null,
			endTime:null,
			state:null
			},
		tabledatas:[],
		query:''
		}
    },
	components:{
		Moretitle,
		Background,
		Tabledata,
		Footn
	},
    methods:{
    	serchdata(){
    		refundOrder({'query':this.query}).then(res=>{
    			this.tabledatas=res.data.data.records
				
    		})
			
    	},
    	// 重置
    	// resetForm(){
    	// 	 Object.assign(this.$data.ruleForm, this.$options.data().ruleForm)
    	// 	 this.riqi=[]
    	// },
    },
	watch:{
		riqi(n){
			this.ruleForm.beginTime=n[0]
			this.ruleForm.endTime=n[1]
		},
		ruleForm:{
			deep:true,
			handler(newVal,oldVal){
				refundOrder({'state':newVal.state,'beginTime':newVal.beginTime,'endTime':newVal.endTime}).then(res=>{
					this.tabledatas=res.data.data.records
				})
				
			}
		}
	}
  }
</script>

<style scoped>
	
	.el-form-item {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	
	:deep(.el-form-item__content) {
		margin-left: 0 !important;
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
		width: 100%;
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
	:deep(.footn li:nth-child(2)){
		color: #278DE5 !important;
	}
	
</style>