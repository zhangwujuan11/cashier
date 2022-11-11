<template>
	<div class="datable">
		<!-- <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"  style="width:100%;">
			<el-table-column prop="roleId" label="角色ID">
			</el-table-column>
			<el-table-column prop="roleName" label="角色名称">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<span class="xiugai" @click="jinjiao(scope.row.roleId)">修改</span>
					<span class="delet" @click="deljinjiao(scope.row.roleId)">删除</span>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			background
			@current-change="handleCurrentChange" 
			:current-page="currentPage"
			:page-sizes="pageSizes" 
			:page-size="PageSize" 
			layout="prev, pager, next"
			:total="totalCount">
		</el-pagination> -->
		<ul class="biggestBox">
		  <li class="information li_vessel" v-for="(item,index) in tableData" :key="index" data-type="0">
			  <div
			  style="width: 100%;display: flex;"
			  @touchstart.capture="touchStart"
			  @touchend.capture="touchEnd" 
			  >
			  <div class="shpowbox">
				  <p>
					<strong>角色ID：</strong>{{item.roleId}}
				  </p>
				  <p>
					<strong>角色名称：</strong>{{item.roleName}}
				  </p>
			  </div>
			  </div>
			  <div class="removeBtn" :data-index="index">
				<div class="turn"  @click="jinjiao(item.roleId)">
					修改
				</div>
				<div class="del" @click="deljinjiao(item.roleId)">
					删除
				</div>
			  </div>
		  </li>
		</ul>
		
		
		
		
		
		
		<!-- 蒙尘 -->
		<el-dialog title="修改角色" append-to-body :visible.sync="dialogVisible" width="98%">
			<div class="chen">
				<el-form :model="ruleForm" status-icon @submit.native.prevent :rules="rules" ref="ruleForm"
					label-width="100px" class="demo-ruleForm">
					<div class="chendiv">
						<el-form-item label="角色名称" prop="roleName">
							<el-input type="text" v-model="ruleForm.roleName" placeholder='输入角色名称'></el-input>
						</el-form-item>
					</div>
					<div class="chendiv">
						<el-form-item label="请选择权限:"></el-form-item>
						<el-tree
						 ref="tree"
						  :data="data"
						  show-checkbox
						  node-key="entId"
						  :props="defaultProps">
						</el-tree>
					</div>
					<div class="chenbtnbox">
						<el-form-item>
							<el-button @click="dialogVisible=false">取消</el-button>
							<el-button type="primary" @click="savedata">保存</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-dialog>
		<router-view></router-view>
	</div>
</template>

<script>
	import {sysRoles,showTree,showsysRoles,hasroles,changeroles,delrolse} from '@/utils/administer.js'
	export default{
		data() {
			return {
				tableData: [],
				dialogVisible: false,
				ruleForm: {
					roleName:'',
					entIdListStr:'',
					roleId:''
				},
				rules: {
					roleName: [{
						required: true,
						message: '请输入应用名称',
						trigger: 'blur'
					}]
				},
				// 权限菜单
				  data: [],
				  defaultProps: {
					children: 'children',
					label: 'entName'
				  },
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
		props:['tabledatas'],
		created(){
			this.getDatas()
			showTree().then(res=>{
				this.data=res.data.data
			})
		},
		methods: {
			// 分页
			// getData() {
			// 	this.totalCount = this.tableData.length
			// },
			// 显示第几页
			// handleCurrentChange(val) {
			// 	// 改变默认的页数
			// 	this.currentPage = val
			// },
			getDatas(){
				sysRoles().then(res=>{
					this.tableData=res.data.data.records
				})
			},
			
			//修改
			jinjiao(n) {
				showsysRoles(n).then(res=>{
					this.ruleForm=res.data.data
				})
				hasroles({
					roleId:n,
					pageNumber:-1,
					pageSize:-1
				}).then(data=>{
					let arr=[]
					 data.data.data.records.forEach(item => {
					          if (!this.$refs.tree.getNode(item.entId).childNodes || !this.$refs.tree.getNode(item.entId).childNodes.length) {
					            arr.push(item.entId)
					          }
					        })
					        this.$refs.tree.setCheckedKeys(arr)
					// console.log(data.data.data.records)
				})
				this.dialogVisible=true
			},
			// 保存修改
			savedata(){
				this.ruleForm.entIdListStr=JSON.stringify(this.$refs.tree.getCheckedKeys()) 
				changeroles(this.ruleForm).then(res=>{
					this.$message.success(res.data.msg)
					location.reload()
				})
			},
			// 删除
			deljinjiao(n){
				this.$confirm('确认删除？', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
							delrolse(n).then(res=>{
								this.$message({
								  type: 'success',
								  message:res.data.msg
								});
								location.reload()
							}).catch(()=>{
								this.$message({
								  type: 'erroe',
								  message:res.data.msg
								});
							})
				          
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消删除',
							offset:200
				          });          
				        });
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
	.delet {
		color: #E56C6C;
		cursor: pointer;
	}
	
	.xiugai {
		color: #278DE5;
		margin-right: 24px;
		cursor: pointer;
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
	  width: 160px;
	  height: 100%;
	  position: absolute;
	  top: 0px;
	  right:calc(-160px - 6%);
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