<template>
	<div class="datable">
		<!-- <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" >
			<el-table-column prop="appId" label="应用APPID">
			</el-table-column>
			<el-table-column prop="appName" label="应用名称">
			</el-table-column>
			<el-table-column  label="状态">
				<template slot-scope="scope">
					{{scope.row.state | state}}
				</template>
			</el-table-column>
			<el-table-column prop="createdAt" label="创建日期" width="300">
			</el-table-column>
			<el-table-column  fixed="right" label="操作"  width="220">
				<template slot-scope="scope" class="rebox" >
					<span @click="modify(scope.row)">修改</span>&nbsp;&nbsp;
					<span @click="configuration(scope.row.appId)">支付配置</span>&nbsp;&nbsp;
					<el-dropdown  trigger="click">
					  <span class="el-dropdown-link">
					    更多<i class="el-icon-arrow-down el-icon--right"></i>
					  </span>
					  <el-dropdown-menu slot="dropdown">
					    <el-dropdown-item>支付测试</el-dropdown-item>
					    <el-dropdown-item>发起转账</el-dropdown-item>
					    <el-dropdown-item @click.native='delmchApp(scope.row.appId)'> <span style="color: red;">删除</span></el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
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

		<ul class="biggestBox">
			<li class="information li_vessel" v-for="(item,index) in tableData" :key="index" 
			data-type="0">
			<div
			style="width: 100%;"
			@touchstart.capture="touchStart"
			@touchend.capture="touchEnd" 
			@click="oneself">
				<p>
					<strong>应用APPID：</strong>{{item.appId}}
				</p>
				<p>
					<strong>应用名称：</strong>{{item.appName}}
				</p>
				<p>
					<strong>状态：</strong> <span :class="[item.state==1 ? 'greecolor':'redcolor']">{{item.state | state}}</span>
				</p>
				<p style="display: flex;justify-content: space-between;">
					<span><strong>创建日期：</strong>{{item.createdAt | formatDate('yyyy-MM-dd HH:mm:ss')}} </span>
					<span class="controls">
						<i class="el-icon-edit-outline" @click="modify(item)"></i>
						<i class="el-icon-s-operation"  @click="gotable()"></i>
					</span>
				</p>
			</div>
				
				
				<div class="removeBtn" :data-index="index">
					<div class="text" @click="gopayment(item.appId)">
						支付测试
					</div>
					<div class="turn" @click="goaccounts(item.appId)">
						发起转账
					</div>
					<div class="del" @click='delmchApp(item.appId)'>
						删除
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {mchApps,updatamchApps,delmchApps} from '@/utils/merchant.js'
	export default {
		filters: {
			state(e) {
				if (e == 1) {
					return '启用'
				} else if (e == 0) {
					return '禁用'
				}
			},
			formatDate: function(value, args) {
				var dt = new Date(value);
				if (args == 'yyyy-M-d') { // yyyy-M-d
					let year = dt.getFullYear();
					let month = dt.getMonth() + 1;
					let date = dt.getDate();
					return `${year}-${month}-${date}`;
				} else if (args == 'yyyy-M-d H:m:s') { // yyyy-M-d H:m:s
					let year = dt.getFullYear();
					let month = dt.getMonth() + 1;
					let date = dt.getDate();
					let hour = dt.getHours();
					let minute = dt.getMinutes();
					let second = dt.getSeconds();
					return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
				} else if (args == 'yyyy-MM-dd') { // yyyy-MM-dd
					let year = dt.getFullYear();
					let month = (dt.getMonth() + 1).toString().padStart(2, '0');
					let date = dt.getDate().toString().padStart(2, '0');
					return `${year}-${month}-${date}`;
				} else { // yyyy-MM-dd HH:mm:ss
					let year = dt.getFullYear();
					let month = (dt.getMonth() + 1).toString().padStart(2, '0');
					let date = dt.getDate().toString().padStart(2, '0');
					let hour = dt.getHours().toString().padStart(2, '0');
					let minute = dt.getMinutes().toString().padStart(2, '0');
					let second = dt.getSeconds().toString().padStart(2, '0');
					return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
				}
			}

		},
		data() {
			return {
				tableData: [],
				dialogVisible: false,
				ruleForm: {
					appId: '',
					appName: '',
					appSecret: '',
					remark: '',
					state: null,
					startX: 0, //滑动开始
					endX: 0, //滑动结束
				},
				rules: {
					appName: [{
						required: true,
						message: '请输入应用名称',
						trigger: 'blur'
					}],
					appSecret: [{
						required: true,
						message: '请生成秘钥',
						trigger: 'blur'
					}]
				},

				paymentVisible: false,
				activeName: 'first',
				// 默认显示第几页
				currentPage: 1,
				// 总条数，根据接口获取数据长度(注意：这里不能为空)
				totalCount: 1,
				// 个数选择器（可修改）
				pageSizes: [1, 2, 3, 4],
				// 默认每页显示的条数（可修改）
				PageSize: 5,
				paymentdata: ''
			}
		},
		props:['tabledatas'],
		mounted() {
			this.getDatas()
		},
		methods: {
			getDatas() {
				mchApps().then(res => {
					this.tableData = res.data.data.records
				})
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
			// // 支付配置
			// configuration(n) {
			// 	this.paymentVisible = true
			// 	this.paymentdata = n
			// },
			// 修改
			modify(n) {
				this.$router.push({
					path: '/merchant/reset',
					query: {
						data: JSON.stringify(n)
					}
				})
			},
			// 生成私钥
			getappsecret() {
				let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
				let tempStr = ''
				for (var i = 0; i < 32; ++i) {
					tempStr += chars.charAt(Math.floor(Math.random() * 32));
				}
				this.ruleForm.appSecret = tempStr
			},
			// 确认修改
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						updatamchApps(this.ruleForm).then(res => {
							this.$message.success(res.data.msg)
							this.$router.go(0)
						})
					} else {
						this.$message.error('请填写完整信息')
						return false;
					}
				});
			},
			// 删除
			delmchApp(n) {
				this.$confirm('确认删除', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delmchApps(n).then(res => {
						this.$message({
							type: 'success',
							message: res.data.msg
						})
						this.$router.go(0)
					}).catch(() => {
						this.$message.error('删除失败')
						this.$router.go(0)
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
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
			},
			
			
			
			gopayment(n){
				this.$router.push({path:'/merchant/payment',query:{'appid':n}})
			},
			goaccounts(n){
				this.$router.push({path:'/merchant/accounts',query:{'appid':n}})
			},
			gotable(){
				this.$router.push('/tableconfiguration?adminUsername')
			}
		},
		watch: {
			tabledatas(n){
				this.tableData=n
			}
		}

	}
</script>

<style scoped>
	/* :deep(.el-table th.el-table__cell){
		background-color: #F5F5F5 !important;
	}
	
	.cell span{
		color: #278DE5;
		margin-right: 0.2rem;
	}
	.cell span img{
		width: 0.24rem;
		height:0.24rem;
		margin-left: 0.186667rem;
	}
	:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf){
		border-bottom: none !important;
	}
	.downshow{
		width: 3.2rem;
		height: 2.88rem;
		font-size: 0.373333rem;
		background-color: white;
		border-radius: 0.266667rem;
		position: absolute;
		top:0.8rem;
		box-shadow:8px 0px 20px 8px rgba(0, 0, 0, 0.15);
		z-index: 1999;
		right:0.8rem;
	}
	.el-table__row:last-child .downshow,.el-table__row:nth-last-child(2) .downshow,.el-table__row:nth-last-child(3) .downshow{
		top:-2.5rem;
	}
	.downshow p{
		width: 100%;
		height: 0.906667rem;
		text-align: center;
		line-height: 0.906667rem;
		color: #278DE5;
	}
	.downshow p:last-child{
		color: #E56C6C;
	}
	.el-table::before {
		height:0;
	}
	:deep(*){
		touch-action: auto;
	}
	
	 */
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
	}

	.datable ul li p {
		width: 100%;
		line-height: 0.533333rem;
	}

	.greecolor {
		color: #1CC92D;
	}

	.redcolor {
		color: red;
	}

	.controls {
		font-size: 20px;
		color: rgba(0, 0, 0, 0.5);
		text-align: right;
		font-weight: bold;
	}

	.controls i {
		margin-left: 0.213333rem;
	}

	.datable {
		margin-bottom: 1.4rem;
	}
	
	/* 左划 */
	
	  .biggestBox {
	    overflow: hidden;
	    /*超出部分隐藏*/
	  }
	
	  ul {
	    /* 消除 ul 默认样式 */
	    list-style: none;
	    padding: 0;
	    margin: 0;
	  }
	
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
</style>
