<template>
	<div class="datable">
		<!-- <el-table
		:data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" 
		 style="width:100%;"
		 >
			<el-table-column
			  prop="sysUserId"
			  label="用户ID"
			 >
			</el-table-column>
			<el-table-column
			  prop="realname"
			  label="姓名"
			 >
			</el-table-column>
			<el-table-column
			  label="性别"
			 >
			 <template slot-scope="scope">
				 {{scope.row.sex | sex}}
			 </template>
			 </el-table-column>
			<el-table-column
			  label="头像"
			  >
			  <template slot-scope="scope">
				  <img class="avauel" :src="scope.row.avatarUrl" alt="">
			  </template>
			</el-table-column>
			<el-table-column
			   prop="userNo"
			   label="编号"
			  >
			</el-table-column>
			<el-table-column
			   prop="telphone"
			   label="手机号"
			  >
			</el-table-column>
			<el-table-column
			   label="超管"
			  >
			  <template slot-scope="scope">
			  {{scope.row.isAdmin | isAdmin}}</template>>
			</el-table-column>
			<el-table-column
			   prop="state"
			   label="状态"
			   width='220'
			  >
			  <template slot-scope="scope">
				  <el-switch
				    v-model="scope.row.state"
				    active-text="启用"
				    inactive-text="停用"
					@change="SwitchChange(scope.row.state,scope.row.sysUserId)" :active-value="1" :inactive-value="0"
					inactive-color="#ff4949"
					>
				  </el-switch>
			  </template>
			</el-table-column>
			<el-table-column
			   prop="createdAt"
			   label="创建时间"
			  >
			</el-table-column>
			<el-table-column
			   prop="updatedAt"
			   label="修改时间"
			  >
			</el-table-column>
			<el-table-column
			   label="操作"
			   width='200'
			   fixed="right"
			  >
			  <template slot-scope="scope">
				  <span style="color: #1a79ff;cursor: pointer;margin-right: 15px;" @click="dia(scope.row.sysUserId)">变更角色</span>
				  <span style="color: #1a79ff;cursor: pointer;margin-right: 15px;" @click="changee(scope.row.sysUserId)">修改</span>
				  <span style="color: red;cursor: pointer;" @click="elada(scope.row.sysUserId)">删除</span>
			  </template>
			</el-table-column>
		  </el-table> -->
		 <!-- <el-pagination
		  	background
		  	@current-change="handleCurrentChange" 
		  	:current-page="currentPage"
		  	:page-sizes="pageSizes" 
		  	:page-size="PageSize" 
		  	layout="prev, pager, next"
		  	:total="totalCount">
		  </el-pagination> -->
		  <!-- 蒙尘 -->
		  <ul class="biggestBox">
			  <li class="information li_vessel" v-for="(item,index) in tableData" :key="index" data-type="0">
				  <div
				  style="width: 100%;display: flex;"
				  @touchstart.capture="touchStart"
				  @touchend.capture="touchEnd" 
				  >
				  <img :src="item.avatarUrl">
				  <div class="shpowbox">
					  <p>
					  	<strong>用户ID：</strong>{{item.sysUserId}}
					  </p>
					  <p>
					  	<strong>姓名：</strong>{{item.realname}}
					  </p>
					  <p class="boee">
					  	<strong>性别： {{item.sex | sex}}</strong>
						<el-switch
						  v-model="item.state"
						  active-text="启用"
						  inactive-text="停用"
						@change="SwitchChange(item.state,item.sysUserId)" :active-value="1" :inactive-value="0"
						inactive-color="#ff4949"
						>
						</el-switch>
					  </p>
				  </div>
				  </div>
				  <div class="removeBtn" :data-index="index">
				  	<div class="text" @click="dia(item.sysUserId)">
				  		变更角色
				  	</div>
				  	<div class="turn"  @click="changee(item.sysUserId)">
				  		修改
				  	</div>
				  	<div class="del"  @click="elada(item.sysUserId)">
				  		删除
				  	</div>
				  </div>
			  </li>
		  </ul>
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  <el-dialog
		     title="修改操作员"
		     append-to-body
		     :visible.sync="dialogVisible2"
		     width="98%"
		     >
		     <div class="chen">
		   	<el-form :model="myfrom"  @submit.native.prevent :rules="rules" ref="myfrom" label-width="100px" class="demo-ruleForm">
		   	  <div>
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
		   	  </div>
		   	  <!-- <div>
		   		  <p class="accou">账户安全</p>
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
		   					<el-input show-password  v-model="myfrom.pass" placeholder="请输入新密码"></el-input>
		   			</el-form-item>
		   			<el-form-item label="确认密码" prop="checkPass">
		   				<el-input show-password v-model="myfrom.checkPass" placeholder="请确认密码"></el-input>
		   			</el-form-item> 
		   		  </div>
		   	  </div> -->
		   	  <el-form-item style="width: 100%;">
		   	    <el-button>取消</el-button>
		   		<el-button type="primary" @click="subm('myfrom')">保存</el-button>
		   	  </el-form-item>
		   	</el-form>
		     </div>
		   </el-dialog>
		   
		   <!-- 蒙尘 -->
		   <el-dialog
		      title="分配角色"
		      append-to-body
		      :visible.sync="dialogVisible"
		      width="98%"
		      >
		      <div class="chen">
		      	<p class="allin">
		      		<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
		      	</p>
		      	<div></div>
		      	<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
		      	  <el-checkbox v-for="(item,index) in cities"  :label="item.roleId" :key="item.roleId">{{item.roleName}}</el-checkbox>
		      	</el-checkbox-group>
		   				<p class="btnbox" style="margin-top: 15px;">
		   					<el-button type="primary" @click="dialogVisible=false">取消</el-button>
		   					<el-button @click="saveroles()">保存</el-button>
		   				</p>
		      </div>
		    </el-dialog>
		  <router-view></router-view>
	</div>
</template>

<script>
	import { sysUsers,addsysuser,sysRoles,hasrrols,relaschan,delsysUsers,sysUsersdata } from '@/utils/role.js'
	export default{
		filters:{
			sex(e){
				if(e==1){
					return '男'
				}else if(e==2){
					return '女'
				}
			},
			isAdmin(e){
				if(e==0){
					return '否'
				}else if(e==1){
					return '是'
				}
			}
		},
		props:['tabledatas'],
		data(){
			return{
				tableData: [],
				dialogVisible:false,
				dialogVisible2:false,
				myfrom: {
				  appid:'',
				  appname:'',
				  status:1,
				  appsecret:'',
				  textarea:'',
				},
				rules:{
				  appname: [
					{ required: true, message: '请输入应用名称', trigger: 'blur' }
				  ]
				   },
				checkAll: false,
				checkedCities: [],
				cities: [],
				isIndeterminate: false,
				checked:false,
				checkedd:false,
				userId:'',
				Allcity:[],
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize:5
				}
		},
		created() {
				this.getDatas()
				this.getRoles()
		},
		methods:{
			// 操作员管理列表
			getDatas(){
				sysUsers().then(res=>{
					this.tableData=res.data.data.records
				})
			},
			// 状态操作
			SwitchChange(n,i){
				let textab=''
				if(n==0){
				  textab='停用'
				}else if(n==1){
					textab='启用'
				}
				this.$confirm('确认' + textab + '该用户？', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					addsysuser({
						ap:i,
						state:n
					}).then(res=>{
						this.$message({
						  type: 'success',
						  message:res.data.msg
						})
						location.reload()
					})
				  
				}).catch(() => {
				  this.$message({
				    type: 'info',
				    message: '已取消',
					offset:200
				  }) 
					location.reload()
				})
			},
			// 角色列表
			getRoles(){
				sysRoles().then(res=>{
					this.cities=res.data.data.records
					let obj={}
					for(var i=0;i<this.cities.length;i++){
						this.Allcity.push(this.cities[i].roleId)
					}
				})
			},
			// 变更角色获取
			dia(n){
				this.checkedCities=[]
				this.userId=n
				hasrrols({
					userId:n,
					pageSize:-1
				}).then(res=>{
				let dataList=res.data.data.records
				console.log(dataList)
				if(res.data.data.records.length != 0){
					let obj={}
					for(var i=0;i<dataList.length;i++){
						this.checkedCities.push(dataList[i].roleId)
					}
				}else{
					this.checkedCities=[]
				}
					this.dialogVisible=true
				})
			},
			// 保存变更
			saveroles(){
				// console.log(JSON.stringify(this.checkedCities))
				relaschan({
					userId:this.userId,
					roleIdListStr: JSON.stringify(this.checkedCities)
				}).then(res=>{
					this.$message.success("变更成功")
					location.reload()
				})
			},
			
			
			changee(n){
				sysUsersdata(n).then(res=>{
					console.log(res)
				})
				this.dialogVisible2=true
			},
			handleCheckAllChange(val) {
				if(val){
					this.checkedCities=this.Allcity
				}else{
					this.checkedCities=[]
				}
			  // this.checkedCities == val ? this.Allcity : [];
			  this.isIndeterminate = false;
			  // console.log(this.checkedCities)
			},
			handleCheckedCitiesChange(value) {
				console.log(value)
			  // let checkedCount = value.length;
			  // this.checkAll = checkedCount === this.cities.length;
			  // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			},
			elada(n){
				this.$confirm('确认删除？', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					delsysUsers(n).then(res=>{
						this.$message({
						  type: 'success',
						  message:res.data.msg
						})
						location.reload()
					})
				  
				}).catch(() => {
				  this.$message({
				    type: 'info',
				    message: '已取消',
					offset:200
				  }) 
					location.reload()
				})
			},
			
			
			
			
			
			// 向左滑动出现删除按钮时，点击商品信息区域取消删除
			oneself() {
			  if (this.checkSlide()) {
				this.restSlide();
			  } 
			},
			//滑动开始
			touchStart(e) {
			  // 记录初始位置
			  this.startX = e.touches[0].clientX;
			},
			//滑动结束
			touchEnd(e) {
			  // 当前滑动的父级元素
			  let parentElement = e.currentTarget.parentElement;
			  // 记录结束位置
			  this.endX = e.changedTouches[0].clientX;
			  // 左滑大于30距离删除出现
			  if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
				this.restSlide();
				parentElement.dataset.type = 1;
			  }
			  // 右滑
			  if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
				this.restSlide();
				parentElement.dataset.type = 0;
			  }
			  this.startX = 0;
			  this.endX = 0;
			},
			//判断当前是否有滑块处于滑动状态
			checkSlide() {
			  let listItems = document.querySelectorAll(".li_vessel");
			  for (let i = 0; i < listItems.length; i++) {
				if (listItems[i].dataset.type == 1) {
				  return true;
				}
			  }
			  return false;
			},
			//复位滑动状态
			restSlide() {
			  let listItems = document.querySelectorAll(".li_vessel");
			  // 复位
			  for (let i = 0; i < listItems.length; i++) {
				listItems[i].dataset.type = 0;
			  }
			}
		},
		watch:{
			tabledatas(n){
				this.tableData=n
			}
		}
		
	}
</script>

<style scoped>
	.buile{
		color: #278DE5;
	}
	.avauel{
		width: 45px;
		height: 45px;
		border-radius: 50%;
	}
	.allin{
		margin-bottom: 0.4rem;
	}
	.datable ul {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		color: black;
	}
	
	.datable ul li {
		font-size: 14px;
		display: flex;
		justify-content: left;
	}
	.datable ul .shpowbox{
		width: 80%;
	}
	.datable ul li img{
		width: 1.066667rem;
		height:1.066667rem;
		border-radius: 50%;
		margin-right:0.5rem;
	}
	.datable ul li p {
		
		line-height: 0.666667rem;
	}
	.boee{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	/* 
	 */
	.li_vessel {
	  /* 全部样式 0.2秒 缓动*/
	  transition: all 0.2s;
	}
		
	/* =0隐藏 */
	.li_vessel[data-type="0"] {
	  transform: translate3d(0, 0, 0);
	}
		
	/* =1显示 */
	.li_vessel[data-type="1"] {
	  /* -64px 设置的越大可以左滑的距离越远，最好与下面删除按钮的宽度以及定位的距离设置一样的值*/
	  transform: translate3d(-240px, 0, 0);
	}
		
	/* 删除按钮 */
	.li_vessel .removeBtn {
	  width: 240px;
	  height: 100%;
	  position: absolute;
	  top: 0px;
	  right:calc(-240px - 6%);
			display: flex;
			align-items: center;
			justify-content: space-around;
	}
		
	/* 右边的文字信息样式 */
	.rightBox {
	  overflow: hidden;
	  padding-left: 8px;
	}
		
	.rightBox div:first-child {
	  font-weight: bold;
	}
		
	.rightBox div:nth-child(2) {
	  margin-top: 4px;
	  font-size: 14px;
	}
		
	.rightBox div:nth-child(3) {
	  width: 36px;
	  background: rgb(219, 91, 113);
	  color: white;
	  font-size: 12px;
	  text-align: center;
	  padding: 2px 4px 2px 4px;
	  margin-left: auto;
	}
		
	.rightBox div:last-child {
	  color: red;
	  font-size: 14px;
	  font-weight: bold;
	}
	.removeBtn .text,.removeBtn .turn{
			  width: 80px;
			  height: 100%;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  background-color: white;
			  border-radius: 10px;
			  color: #278DE5;
	}
	.removeBtn .del{
			  width: 60px;
			  height: 100%;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  background-color: #E56C6C;
			  border-radius: 10px;
			  color:white;
	}
	.biggestBox {
	  overflow: hidden;
	  /*超出部分隐藏*/
	}
</style>