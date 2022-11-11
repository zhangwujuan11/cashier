<template>
	<div class="datable">
		<el-table
		:data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" 
		 style="width:100%;"
		 @row-click="jinhao"
		 >
			<el-table-column
			  prop="province"
			  label="绑定ID"
			 >
			</el-table-column>
			<el-table-column
			  prop="tui"
			  label="渠道类型"
			 >
			</el-table-column>
			<el-table-column
			  prop="shou"
			  label="账号别名"
			 >
			 </el-table-column>
			<el-table-column
			  prop="city"
			  label="组名称"
			  >
			</el-table-column>
			<el-table-column
			   prop="shou2"
			   label="分账接收账号"
			  >
			</el-table-column>
			<el-table-column
			   prop="shou2"
			   label="分账接收账号名称"
			  >
			</el-table-column>
			<el-table-column
			   prop="shou2"
			   label="分账关系类型"
			  >
			</el-table-column>
			<el-table-column
			   prop="shou2"
			   label="状态"
			  >
			</el-table-column>
			<el-table-column
			   prop="shou2"
			   label="绑定成功时间"
			  >
			</el-table-column>
			<el-table-column
			   prop="shou2"
			   label="默认分账比例"
			  >
			</el-table-column>
			<el-table-column
			   prop="shou2"
			   label="操作"
			  >
			  <template slot-scope="scope">
				  <span style="color: #1a79ff;">修改</span>
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
		  </el-pagination>
		  <router-view></router-view>
	</div>
</template>

<script>
	import {divisionReceivers} from '@/utils/account.js'
	export default{
		data(){
			return{
				tableData: [],
				dialogVisible:false,
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
		created() {
			this.getDatas()
		},
		methods:{
			// 收款账号列表
			getDatas(n){
				divisionReceivers(n).then(res=>{
					this.tableData=res.data.data.records
			
					// console.log(res.data.data)
				})
			},
			jinhao(n){
				this.dialogVisible=true
			},
			// 分页
			getData() {
				this.totalCount = this.tableData.length
			},
			// 显示第几页
			handleCurrentChange(val) {
				// 改变默认的页数
				this.currentPage = val
			},
			watch:{
				// $route(n){
				// 	this.getDatas(n.query)
				// },
				tableData(){
					this.getData()
				}
			}
		}
		
	}
</script>

<style scoped>
	:deep(.el-table th.el-table__cell){
		background-color: #F5F5F5 !important;
	}
	
	:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf){
		/* border-bottom: none !important; */
	}
	.zz{
		color: #1C64A3;
		background-color: rgba(39, 141, 229, 0.2);
		border-radius: 0.106667rem;
		padding: 0.053333rem 0.106667rem;
		margin-right: 0.106667rem;
	}
	.sh{
		color: #1CA329;
		background-color: rgba(155, 181, 158, 0.2);
		border-radius: 0.106667rem;
		padding: 0.053333rem 0.106667rem;
		margin-right: 0.106667rem;
	}
	:deep(.el-table .cell){
		line-height: 0.853333rem;
		white-space: nowrap;
		overflow: hidden;
	}
	:deep(.el-table--fit){
		padding-bottom: 1.6rem;
	}
</style>