<template>
	<div>
		<div class="account" :style="{'margin-top':phheih}">
			<div class="title" @click="gobackk">
				<i class="el-icon-arrow-left"></i>
				角色管理
			</div>
			<div>
				<el-form :model="myFrom"  status-icon label-width="100px" class="demo-ruleForm">
					<el-form-item>
						<el-input v-model="query"  @keyup.enter.native="serchdata()" placeholder="输入角色ID或角色名称">
						 <el-button @click="serchdata()" slot="prepend" icon="el-icon-search"></el-button>
						</el-input>
						<img class="puls" src="@/assets/images/plus.png" @click="dialogVi()">
					</el-form-item>
					<!-- <el-form-item>
					<el-input v-model="myFrom.roleName" placeholder="角色名称"></el-input> 
				</el-form-item> -->
				<!-- <el-form-item>
					<el-button type="primary" @click="serchdata()">查询</el-button>
					<el-button @click="resetdata()">重置</el-button>
					<el-button type="primary" @click="dialogVi()">新建</el-button>
				 </el-form-item> -->
				 </el-form>
				<Table></Table>
			</div>
			<!-- 蒙尘 -->
			<el-dialog title="新增角色" append-to-body :visible.sync="dialogVisible" width="98%">
				<div class="chen">
					<el-form :model="ruleForm" @submit.native.prevent :rules="rules" ref="ruleForm" label-width="100px"
						class="demo-ruleForm">
						<div class="chendiv">
							<el-form-item label="角色名称" prop="roleName">
								<el-input type="text" v-model="ruleForm.roleName" placeholder='输入角色名称'></el-input>
							</el-form-item>
						</div>
						<div class="chendiv">
							<el-form-item label="请选择权限:"></el-form-item>
							<el-tree ref="tree" :data="data" show-checkbox node-key="entId" :props="defaultProps">
							</el-tree>
						</div>
						<div class="chenbtnbox">
							<el-form-item>
								<el-button @click="dialogVisible=false">取消</el-button>
								<el-button type="primary" @click="subm('ruleForm')">保存</el-button>
							</el-form-item>
						</div>
					</el-form>
				</div>
			</el-dialog>
			<Tabledata :tabledatas='tabledatas'></Tabledata>
		</div>
		<Foott></Foott>
	</div>
</template>

<script>
	import Tabledata from '@/components/operator/Indextable.vue'
	import {showTree,plussysRolesm,sysRoles} from '@/utils/administer.js'
	import Foott from '@/components/Foott.vue'
	export default {
		data() {
			return {
				dialogVisible: false,
				Nwebu: false,
				ruleForm: {
					roleName: '',
					entIdListStr: ''
				},
				rules: {
					roleName: [{
						required: true,
						message: '请输入应用名称',
						trigger: 'blur'
					}]
				},
				myFrom: {
					roleId: '',
					roleName: ''
				},
				query:'',

				// 权限菜单
				data: [],
				defaultProps: {
					children: 'children',
					label: 'entName'
				},
				phheih:localStorage.getItem('phonetopheight'),
				tabledatas:[]
			}
		},
		components: {
			Tabledata,
			Foott
		},
		methods: {
			// 选择权限菜单
			dialogVi(){
				showTree().then(res=>{
					this.data=res.data.data
				})
				this.dialogVisible=true
			},
			// 新建
			subm(formName) {
				this.ruleForm.entIdListStr=JSON.stringify(this.$refs.tree.getCheckedKeys()) 
				this.$refs[formName].validate((valid) => {
			           if (valid) {
			            plussysRoles(this.ruleForm).then(res=>{
							this.$message.success(res.data.msg)
							 location.reload()
						})
			           } else {
			             console.log('error submit!!');
			             return false;
			           }
			         });
				},
			// 重置
			// resetdata(){
			// 	Object.assign(this.$data.myFrom,this.$options.data().myFrom)
			// },
			// 查询
			serchdata(){
				sysRoles({'query':this.query}).then(res=>{
					this.tabledatas=res.data.data.records
				})
			},
			gobackk() {
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
	:deep(.footn li:last-child){
		color: #278DE5;
	}
	.puls{
		width: 0.8rem;
		margin-left: 0.48rem;
	}
</style>
