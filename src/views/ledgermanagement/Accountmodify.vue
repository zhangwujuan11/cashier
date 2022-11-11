<template>
	<div>
		<Solttitle></Solttitle>
		<Saidmenu></Saidmenu>
		<Background>
			<div slot='title'>账号组管理 > 修改</div>
			<div slot='content' class="chen">
					<el-form :model="ruleForm" status-icon @submit.native.prevent :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					  <el-form-item  label="组名称" prop="appname">
					    <el-input type="text" v-model="ruleForm.appid" placeholder='输入组名称'></el-input>
					  </el-form-item>
					  <el-form-item  label="自动分账组">
					    <el-radio-group size="small" v-model="ruleForm.status">
					       <el-radio :label="1">是</el-radio>
					       <el-radio :label="2">否</el-radio>
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
		</Background>
	</div>
</template>

<script>
	import Solttitle from '@/components/Solttitle.vue'
	import Saidmenu from '@/components/Saidmenu.vue'
	import Background from '@/components/Background.vue'
	export default{
		data(){
			return {
				ruleForm: {
				  appid:'',
				  appname:'',
				  status:1,
				  appsecret:'',
				  textarea:''
				},
				 rules:{
					  appname: [
						{ required: true, message: '请输入应用名称', trigger: 'blur' }
					  ]
				    }
			}
		},
		components:{
			Background,
			Saidmenu,
			Solttitle
		},
		methods:{
			submitForm(formName) {
			  this.$refs[formName].validate((valid) => {
			           if (valid) {
			             alert('submit!');
			           } else {
			             console.log('error submit!!');
			             return false;
			           }
			         });
			},
			getappsecret(){
				console.log('生成秘钥吧')
			},
			 // submitForm(formName) {
			 //        this.$refs[formName].validate((valid) => {
			 //          if (valid) {
			 //            alert('submit!');
			 //          } else {
			 //            console.log('error submit!!');
			 //            return false;
			 //          }
			 //        });
			 //      },
		  resetForm(formName) {
			this.$refs[formName].resetFields();
		  }
		}
	}
</script>

<style scoped>
	:deep(.background){
		height: calc(100vh - 2.853333rem);
	}
	.chen{
		width: 100%;
	}
	.appsecretBtn{
		width: 2.933333rem;
		height: 0.8rem;
		border: 0.026667rem solid #278DE5;
		border-radius: 0.133333rem;
		background-color: white;
		color: #278DE5;
	}
	:deep(.el-input__inner){
		border-radius: 0.133333rem;
	}
	.tips{
		color: #E56C6C;
		font-size: 0.32rem;
		line-height: 0.426667rem;
		margin-bottom: 0.426667rem;
	}
</style>