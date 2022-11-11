<template>
	<div>
		<div @click="goback">
			<Pagetitle></Pagetitle>
		</div>
		<Background>
			<div slot='title'>应用管理 > 新建应用</div>
			<div slot='content' class="chen">
				<el-form :model="ruleForm" status-icon @submit.native.prevent :rules="rules" ref="ruleForm"
					label-width="100px" class="demo-ruleForm">
					<el-form-item   label="应用名称"  prop="appName">
						<el-input type="text" v-model="ruleForm.appName" placeholder='输入应用名称'></el-input>
					 </el-form-item>
					 <el-form-item  label="状态">
						<el-radio-group size="small" v-model="ruleForm.state">
						   <el-radio :label="1">启用</el-radio>
						   <el-radio :label="0">停用</el-radio>
						 </el-radio-group>
					 </el-form-item>
					<el-form-item label="私钥AppSecret" prop="appSecret">
					   <el-input type="text" v-model="ruleForm.appSecret" placeholder='输入应用名称' disabled></el-input> <br>
									<button class="appsecretBtn" @click="getappsecret">随机生成私钥</button>
					</el-form-item>
					 <el-form-item label="备注">
					  <el-input
						 type="textarea"
						 :rows="3"
						 placeholder="请输入备注信息"
						 v-model="ruleForm.remark">
					  </el-input>
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
	import Pagetitle from '@/components/Pagetitle.vue'
	import Background from '@/components/Background.vue'
	import {addmchApps} from '@/utils/merchant.js'
	export default {
		data() {
			return {
				ruleForm: {
				  appName:'',
				  appSecret:'',
				  remark:'',
				  state:1
				},
				rules:{
					  appName: [
						{ required: true, message: '请输入应用名称', trigger: 'blur' }
					  ],
					 appSecret: [
					 		{ required: true, message: '请输入私钥或点击随机生成私钥', trigger: 'blur' }
					 ]
				    }
					}
		},
		components: {
			Background,
			Pagetitle
		},

		methods: {
			submitForm(formName) {
			  this.$refs[formName].validate((valid) => {
			           if (valid) {
			             addmchApps(this.ruleForm).then(res=>{
							 this.$message.success(res.data.msg)
							this.$router.push('/merchant/index')
						 })
			           } else {
			             this.$message.error('请填写完整信息')
			             return false;
			           }
			         });
			},
			// 生成私钥
			getappsecret(){
				let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
				let tempStr=''
				for(var i=0; i<32; ++i){
					tempStr += chars.charAt(Math.floor(Math.random() * 32 ));
				}
				this.ruleForm.appSecret=tempStr
			},
			goback(){
				this.$router.push('/merchant/index')
			}
		}
	}
</script>

<style scoped>
	:deep(.background) {
		height: calc(100vh - 2.853333rem);
	}

	.chen {
		width: 100%;
	}

	.appsecretBtn {
		width: 2.933333rem;
		height: 0.8rem;
		border: 0.026667rem solid #278DE5;
		border-radius: 0.133333rem;
		background-color: white;
		color: #278DE5;
	}

	:deep(.el-input__inner) {
		border-radius: 0.133333rem;
	}
</style>
