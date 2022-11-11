<strong></strong><template>
	<div>
		<div class="account" :style="{'margin-top':phheih}">
				<div class="title" @click="gobackk">
					<i class="el-icon-arrow-left"></i>
					操作员管理
				</div>
				<div>
					<el-form :model="ruleFrom"  status-icon   label-width="100px" class="demo-ruleForm">
						<el-form-item >
						  <el-input v-model="query" @keyup.enter.native="serchdata()" placeholder="输入用户ID或用户姓名">
							 <el-button @click="serchdata()" slot="prepend" icon="el-icon-search"></el-button>
						  </el-input>
					  <!-- <el-form-item >
					    <el-input v-model="ruleFrom.realname" placeholder="用户姓名"></el-input> 
					  </el-form-item> -->
					  <!-- <el-form-item>
					    <el-button type="primary" @click="submitForm()">查询</el-button>
					    <el-button @click="resetForm()">重置</el-button>
					     <el-button type="primary" @click="diables=true">新建</el-button>
					  </el-form-item> -->
					  	<img class="puls" src="@/assets/images/plus.png" @click="diables=true">
					  </el-form-item>
					</el-form>
				</div>
				<!-- 蒙尘 -->
				<el-dialog title="新增操作员" append-to-body :visible.sync="diables" width="98%">
					<div class="chen">
						<el-form :model="myfrom" @submit.native.prevent :rules="rules2" ref="myfrom" label-width="100px"
							class="demo-ruleForm">
							<div>
								<el-form-item label="登录名" prop="loginUsername">
									<el-input type="text" v-model="myfrom.loginUsername"  placeholder='输入用户登录名'></el-input>
								</el-form-item>
								<el-form-item label="用户姓名" prop="realname">
									<el-input type="text" v-model="myfrom.realname" placeholder='输入用户姓名'></el-input>
								</el-form-item>
								<el-form-item label="手机号" prop="telphone">
									<el-input type="text" v-model="myfrom.telphone" placeholder='输入手机号'></el-input>
								</el-form-item>
								<el-form-item label="编号" prop="userNo">
									<el-input type="text" v-model="myfrom.userNo" placeholder='输入编号'></el-input>
								</el-form-item>
								<el-form-item label="请选择性别" prop="sex">
									<el-radio-group v-model="myfrom.sex">
										<el-radio :label="1">男</el-radio>
										<el-radio :label="2">女</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="状态" prop="state">
									<el-radio-group v-model="myfrom.state">
										<el-radio :label="1">启用</el-radio>
										<el-radio :label="0">停用</el-radio>
									</el-radio-group>
								</el-form-item>
							</div>
							<span style="margin-left: 15px;color: darkgray;">初始密码：123456</span>
							<el-form-item style="width: 100%;margin-top: 15px;">
								<el-button @click="diables=false">取消</el-button>
								<el-button type="primary" @click="subm('myfrom')">保存</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-dialog>
			<Tabledata :tabledatas='tabledatas'></Tabledata>
		</div>
		<Foott></Foott>
	</div>
</template>

<script>
	import Background from '@/components/Background.vue'
	import Tabledata from '@/components/operator/Roletable.vue'
	import {addUser} from '@/utils/administer.js'
	import { sysUsers } from '@/utils/role.js'
	import Foott from '@/components/Foott.vue'
  export default {
    data() {
			 var validatePass = (rule, value, callback) => {
				let reg=/^1[3-9]\d{9}$/
				if (!reg.test(value)) {
				callback(new Error('请输入正确的手机号'))
			   } 
			   callback()
			 }
         return {
    			   diables:false,
    			   Nwebu:false,
    			 myfrom: {
    			 	loginUsername: '',
    			 	realname: '',
    			     sex: 1,
    			 	state: 1,
    			 	telphone: '',
    			 	userNo: ''
    			 },
    			 rules2: {
    			 	loginUsername: [{
    			 		required: true,
    			 		message: '请输入用户登录名',
    			 		trigger: 'blur'
    			 	}],
    			 	realname: [{
    			 		message: '请输入用户姓名',
    			 		required: true,
    			 		trigger: 'blur'
    			 	}],
    			 	userNo:[{
    			 		message: '请输入编号',
    			 		required: true,
    			 		trigger: 'blur'
    			 	}],
    			 	telphone: [{
    			 		validator: validatePass,
    			 		required: true,
    			 		trigger: 'blur'
    			 	}]
    			 },
    			 ruleFrom:{
    				 sysUserId:'',
    				 realname:''
    			 },
    			  checked:false,
    			  checkedd:false,
    			  secend:true,
    			  secpass:'password',
    			  three:true,
    			  thrpass:'password',
				  phheih:localStorage.getItem('phonetopheight'),
				  query:'',
				  tabledatas:[]
         }
       },
	components:{
		Background,
		Tabledata,
		Foott
	},
    methods: {
     // 新增操作员
     subm(formName) {
     	this.$refs[formName].validate((valid) => {
     		if (valid) {
     			// console.log(this.myfrom)
     			addUser(this.myfrom).then(res=>{
     				if(res.data.code !=200){
     					this.$message.error(res.data.msg);
     				}else{
     					this.$message.success(res.data.msg);
     					this.$store.state.rolindexdilago=false
     					location.reload()
     				}
     			})
     			 } else {
     			console.log('error submit!!');
     			return false;
     		}
     	});
     },
     resetForm(){
     	Object.assign(this.$data.ruleFrom,this.$options.data().ruleFrom)
     },
	  serchdata(){
		  sysUsers({'query':this.query}).then(res=>{
			  this.tabledatas=res.data.data.records
		  })
	  },
	  gobackk(){
		  this.$router.push('/administr')
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
		padding-top: 0.773333rem;
		padding-bottom: 0.213333rem;
		background-color: white;
		margin-bottom: 0.32rem;
	}
	.el-form-item{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	:deep(.el-form-item__content){
		margin-left: 0 !important;
		display: flex;
		align-items: center;
	}
	:deep(.el-input--suffix .el-input__inner){
		padding-right: 0.4rem !important;
	}
	:deep(.el-input__inner){
		width: 5.333333rem;
		background-color: #EBEBEB;
	}
	.el-table{
		 display: block;
		 overflow-x: auto;
	}
	.title{
		font-size: 14px;
		width: 100%;
		height: 0.933333rem;
		background-color: white;
		line-height:0.933333rem;
		text-indent: 0.266667rem;
	}
	.inputBox{
		text-align: center;
	}
	:deep(.footn li:first-child){
		color: #278DE5;
	}
	.puls{
		width: 0.8rem;
		margin-left: 0.48rem;
	}
</style>