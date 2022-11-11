<template>
	<div>
		<Solttitle></Solttitle>
		<Saidmenu></Saidmenu>
		<div class="account">
			<Background>
				<div slot="title">账号组管理</div>
				<div slot='content'>
					<el-form :model="myFrom"    label-width="100px" class="demo-ruleForm">
					  <el-form-item  prop="pass">
					    <el-input v-model="myFrom.receiverGroupId" type='number' placeholder="组ID"></el-input>
					  </el-form-item>
					  <el-form-item >
					    <el-input v-model="myFrom.receiverGroupName" placeholder="组名称"></el-input> 
					  </el-form-item>
					  <el-form-item>
					   <el-button type="primary" @click="serchdata()">查询</el-button>
					   <el-button @click="resetForm()">重置</el-button>
					   <el-button type="primary" @click="dialogVisible=true">新建</el-button>
					  </el-form-item>
					</el-form>
				</div>
			</Background>
			<Tabledata></Tabledata>
		</div>
		<!-- 蒙尘 -->
		<el-dialog
		  title="新增菜单"
		  append-to-body
		  :visible.sync="dialogVisible"
		  width="98%"
		  >
		  <div class="chen">
		  	<el-form :model="ruleForm" @submit.native.prevent :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  	  <el-form-item  label="组名称" prop="receiverGroupName">
		  	    <el-input type="text"v-model="ruleForm.receiverGroupName" placeholder='输入组名称'></el-input>
		  	  </el-form-item>
		  	  <el-form-item  label="自动分账组">
		  	    <el-radio-group size="small" v-model="ruleForm.autoDivisionFlag">
		  	       <el-radio :label="1">是</el-radio>
		  	       <el-radio :label="0">否</el-radio>
		  	     </el-radio-group>
		  	  </el-form-item>
		  	  <el-form-item>
		  		    <p class="tips">1.自动分账组：当订单分账模式为自动分账，该组下的所有正常分账状态的账号将作为订单分账对象</p>
		  			<p class="tips">2.每个商户仅有一个默认分账组，当该组更新为自动分账时，其他组将改为否</p>
		  	  </el-form-item>
		  	  <el-form-item>
		  	    <el-button>取消</el-button>
		  		<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
		  	  </el-form-item>
		  	</el-form>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import Solttitle from '@/components/Solttitle.vue'
	import Saidmenu from '@/components/Saidmenu.vue'
	import Background from '@/components/Background.vue'
	import Tabledata from '@/components/ledgermanagement/Accounttable.vue'
	import {adddiv} from '@/utils/account.js'
  export default {
    data(){
      return {
		myFrom:{
			receiverGroupName:'',
			receiverGroupId:''
		},
		ruleForm: {
			  receiverGroupName:'',
			  autoDivisionFlag:0
			},
		rules:{
			  receiverGroupName: [
				{ required: true, message: '请输入应用名称', trigger: 'blur' }
			  ]
			},
		dialogVisible:false
		}
    },
	components:{
		Saidmenu,
		Solttitle,
		Background,
		Tabledata,
	},
    methods: {
		// 新增
		submitForm(formName) {
		       this.$refs[formName].validate((valid) => {
		         if (valid) {
		           adddiv(this.ruleForm).then(res=>{
						this.$message.success(res.data.msg);
						this.$router.go(0)
		           })
		         } else {
		           console.log('error submit!!');
		           return false;
		         }
		       });
		     },
     // 重置
     resetForm(){
		 Object.assign(this.$data.myFrom,this.$options.data().myFrom)
     },
     // 查询
     serchdata(){
		 this.$router.push({
			 path:'/account/accountgroup',
			 query:{data:JSON.stringify(this.myFrom) }
		 })
     }
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
	
	
</style>