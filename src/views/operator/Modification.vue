<template>
	<div>
		<Solttitle></Solttitle>
		<Saidmenu></Saidmenu>
		<Background>
			<div slot='title'>用户角色管理 > 角色管理 > 修改角色</div>
			<div slot='content' class="chen">
				<el-form :model="ruleForm" status-icon @submit.native.prevent :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item  label="角色名称" prop="appname">
					<el-input type="text" v-model="ruleForm.appid" placeholder='输入角色名称'></el-input>
				  </el-form-item>
				  <el-form-item label="请选择权限:"></el-form-item>
				  <el-form-item label="账户安全">
					  <el-checkbox-group v-model="checkList">
						  <br>
					    <p><img src="@/assets/images/Vector1.png"><el-checkbox label="复选框 A"></el-checkbox></p>
						<p><img src="@/assets/images/Vector1.png"><el-checkbox label="复选框2"></el-checkbox></p>
						<p><img src="@/assets/images/Vector1.png"><el-checkbox label="复选框3"></el-checkbox></p>
						<p><img src="@/assets/images/Vector1.png"><el-checkbox label="复选框 4"></el-checkbox></p>
						<p><img src="@/assets/images/Vector1.png"><el-checkbox label="复选框5"></el-checkbox></p>
						<p><img src="@/assets/images/Vector1.png"><el-checkbox label="复选框6"></el-checkbox></p>
						<p><img src="@/assets/images/Vector1.png"><el-checkbox label="复选框7"></el-checkbox></p>
						<p><img src="@/assets/images/Vector1.png"><el-checkbox label="复选框8"></el-checkbox></p>
						<p><img src="@/assets/images/Vector1.png"><el-checkbox label="复选框 A"></el-checkbox></p>
						<p><img src="@/assets/images/Vector1.png"><el-checkbox label="复选框2"></el-checkbox></p>
						<p><img src="@/assets/images/Vector1.png"><el-checkbox label="复选框3"></el-checkbox></p>
						<p><img src="@/assets/images/Vector1.png"><el-checkbox label="复选框 4"></el-checkbox></p>
						<p><img src="@/assets/images/Vector1.png"><el-checkbox label="复选框5"></el-checkbox></p>
						<p><img src="@/assets/images/Vector1.png"><el-checkbox label="复选框6"></el-checkbox></p>
						<p><img src="@/assets/images/Vector1.png"><el-checkbox label="复选框7"></el-checkbox></p>
						<p><img src="@/assets/images/Vector1.png"><el-checkbox label="复选框8"></el-checkbox></p>
					   </el-checkbox-group>
				  </el-form-item>
				  
				   
				  
				  
				  <el-form-item>
					<el-button>取消</el-button>
					<el-button type="primary">保存</el-button>
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
				},
				 rules:{
					  appname: [
						{ required: true, message: '请输入角色名称', trigger: 'blur' }
					  ]
				    },
				checkList:['选中且禁用','复选框 A']
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
			}
		}
	}
</script>

<style scoped>
	:deep(.background){
		height: calc(100vh - 2.853333rem);
		overflow: hidden;
		overflow-y: scroll;
		padding-bottom: 1.6rem;
	}
	.chen{
		width: 100%;
	}
	.el-checkbox-group p{
		width: 100%;
		display: flex;
		align-items: center;
		
	}
	.el-checkbox-group p img{
		width:0.16rem;
		height:0.24rem;
		margin-right: 0.32rem;
	}
	:deep(.el-checkbox__inner){
		z-index: 0;
	}
</style>