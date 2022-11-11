<template>
	<div class="channel">
		<el-form :model="ruleForm"  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
		 <!-- <el-form-item>
			<el-input type="text" v-model="ruleForm.pass" placeholder='支付方式代码'></el-input>
		  </el-form-item>
		  <el-form-item>
			<el-input  type="text" v-model="ruleForm.checkPass" placeholder='支付方式名称'></el-input>
		  </el-form-item> -->
		  <el-form-item>
		  <el-input type="text" v-model="ruleForm.pass" placeholder='输入应用APPID或应用名称'>
		      <el-button  @click="submitForm('ruleForm')" slot="prepend" icon="el-icon-search"></el-button>
		    </el-input>
			</el-form-item>
		 <!-- <el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item> -->
		</el-form>
		<Tabledata></Tabledata>
	</div>
</template>

<script>
	import Background from '@/components/Background.vue'
	import Tabledata from '@/components/homeh/Table.vue'
	export default{
		components:{
			Background,
			Tabledata,
		},
		 data() {
		     
		      return {
		        ruleForm: {
		          pass: '',
		          checkPass: '',
		          age: '',
				  region:''
		        }
		      }
		    },
		    methods: {
		      submitForm(formName) {
		        console.log(123)
		      },
		    }
	}
</script>

<style scoped>
	.el-select{
		width: 100%;
	}
	.el-form{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.el-form-item{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	:deep(.el-form-item__content){
		margin-left: 0 !important;
	}
	:deep(.el-input--suffix .el-input__inner){
		padding-right: 0.4rem !important;
	}
	:deep(.el-input__inner){
		width: 5.333333rem;
	}
	.el-table{
		 display: block;
		 overflow-x: auto;
	}
	.channel{
		padding-top: 1.6rem;
	}
	/* :deep(.el-select .el-input){
	   width:1.8rem;
	 }
	 :deep(.el-input-group__prepend button.el-button){
		  width: 13px;
	 }
	 :deep(.el-input-group__append) {
	   background-color: white;
	 }
	 :deep(.el-input-group__prepend) {
	   background-color: #EBEBEB;
		padding-right: 0px;
	 }
	  :deep(.el-input__inner){
		  border:1px solid #EBEBEB;
	 }
	 :deep(.el-input-group__append, .el-input-group__prepend){
		  border-color:#EBEBEB;
	 } */
</style>