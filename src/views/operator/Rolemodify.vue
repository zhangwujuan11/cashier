<template>
	<div>
		<Solttitle></Solttitle>
		<Saidmenu></Saidmenu>
		<Background>
			<div slot='title'>账号组管理 > 修改</div>
			<div slot='content' class="chen">
					<el-form :model="myfrom" status-icon @submit.native.prevent :rules="rules" ref="myfrom" label-width="100px" class="demo-ruleForm">
					  <el-form-item  label="用户登录名">
					    <el-input type="text" v-model="myfrom.appid" disabled></el-input>
					  </el-form-item>
					  <el-form-item   label="用户姓名"  prop="appname">
					    <el-input type="text" v-model="myfrom.appname" placeholder='输入用户姓名'></el-input>
					  </el-form-item>
					  <el-form-item   label="手机号">
					    <el-input type="text" v-model="myfrom.appname" placeholder='输入手机号'></el-input>
					  </el-form-item>
					  <el-form-item   label="编号">
					    <el-input type="text" v-model="myfrom.appname" placeholder='输入编号'></el-input>
					  </el-form-item>
					  <el-form-item  label="请选择性别">
					    <el-radio-group v-model="myfrom.status">
					       <el-radio :label="1">男</el-radio>
					       <el-radio :label="2">女</el-radio>
					     </el-radio-group>
					  </el-form-item>
					  <el-form-item label="状态">
					    <el-radio-group v-model="myfrom.statuss">
					       <el-radio :label="1">启用</el-radio>
					       <el-radio :label="2">停用</el-radio>
					     </el-radio-group>
					  </el-form-item>
					 <!-- border -->
					 <p class="border"></p>
					 <p>账户安全</p>
					 <div class="savediv">
						 <el-form-item label="重置密码:">
						 	<el-checkbox v-model="checked"></el-checkbox>
						 </el-form-item>
						 <el-form-item label="恢复默认密码:" v-if="checked">
						 	<el-checkbox v-model="checkedd"></el-checkbox>
						 </el-form-item>
					 </div>	
					 <div v-if="!checkedd && checked">
						<el-form-item label="新密码" prop="pass">
							<el-input :type="secpass" v-model="myfrom.pass" placeholder="请输入新密码"></el-input>
							<div @click="se">
								<img v-if="secend" class="closeeyes" src="@/assets/images/closeeyes.png">
								<i v-if="!secend" class="el-icon-view closeeyes"></i>
							</div>
						</el-form-item>
						<el-form-item label="确认密码" prop="checkPass">
							<el-input :type="thrpass" v-model="myfrom.checkPass" placeholder="请确认密码"></el-input>
							<div @click='th'>
								<img v-if="three" class="closeeyes" src="@/assets/images/closeeyes.png">
								<i v-if="!three"  class="el-icon-view closeeyes"></i>
							</div>
						</el-form-item> 
					 </div>
					  <el-form-item>
					    <el-button>取消</el-button>
						<el-button type="primary" @click="submitForm('myfrom')">保存</el-button>
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
			var validatePass = (rule, value, callback) => {
			  if (value === '') {
			    callback(new Error('请输入新密码'));
			  } else {
			    if (this.myfrom.checkPass !== '') {
			      this.$refs.myfrom.validateField('checkPass');
			    }
			    callback();
			  }
			}
			var validatePass2 = (rule, value, callback) => {
			  if (value === '') {
			    callback(new Error('请再次输入密码'));
			  } else if (value !== this.myfrom.pass) {
			    callback(new Error('两次输入密码不一致!'));
			  } else {
			    callback();
			  }
			};
			return {
				myfrom: {
				  appid:'',
				  appname:'',
				  status:1,
				  appsecret:'',
				  textarea:'',
				  pass: '',
				  checkPass: ''
				},
				 rules:{
					  appname: [
						{ required: true, message: '请输入应用名称', trigger: 'blur' }
					  ],
					  pass: [
					    { validator: validatePass,required: true, trigger: 'blur' }
					  ],
					  checkPass: [
					    { validator: validatePass2,required: true, trigger: 'blur' }
					  ]
				    },
				checked:false,
				checkedd:false,
				secend:true,
				secpass:'password',
				three:true,
				thrpass:'password'
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
		  se(){
		  	if(this.secpass=='password'){
		  		this.secpass='text'
		  	}else{
		  		this.secpass='password'
		  	}
		  	this.secend=!this.secend
		  },
		  th(){
		  	if(this.thrpass=='password'){
		  		this.thrpass='text'
		  	}else{
		  		this.thrpass='password'
		  	}
		  	this.three=!this.three
		  }
		}
	}
</script>

<style scoped>
	:deep(.background){
		height: calc(100vh - 2.853333rem);
		overflow: scroll;
	}
	:deep(.bgcon){
		padding-bottom: 1.6rem;
	}
	.chen{
		width: 100%;
		overflow: scroll;
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
	.border{
		width: 100%;
		border-bottom: 1px solid rgba(196, 196, 196, 0.5);
		margin-bottom: 0.666667rem;
	}
	p{
		font-size: 0.32rem;
	}
	.savediv{
		display: flex;
		justify-content: space-between;
	}
	.closeeyes{
		width: 0.346667rem;
		height: 0.16rem;
		position: absolute;
		right: calc(0.346667rem + 9.5px);
		top: calc(50% - 0.08rem);
		color: #51515180;
	}
</style>