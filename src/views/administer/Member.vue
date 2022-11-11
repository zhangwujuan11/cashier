<template>
	<div class="member" :style="{'margin-top':phoneheight}">
		<div class="title" @click="gobackk">
			<i class="el-icon-arrow-left"></i>
			申请管理
		</div>
		<!-- 人员分类列表 -->
		<div class="classification">
			<div class="classificationCon">
				<p @click="datalist=1,apptips='成员列表'">
					<span>组织成员</span>
					<span>{{ahgg.length}}</span>
				</p>
				<p @click="datalist=2,apptips='未激活成员列表'">
					<span>未激活人数</span>
					<span>{{applylist.length}}</span>
				</p>
			</div>
		</div>

		<div class="membertitle">
			<h3>{{apptips}}</h3>
		</div>
		<section>
			<!-- 成员列表 -->
			<div class="memberList">
				<div class="memberListcon">
					<ul v-if="datalist==1">
						<li v-for="(item,index) in ahgg" :key="index">
							<div class="liTop">
								<div class="liTop-left">
									<!-- <img :src="item.Avatar" alt=""> -->
									<p class="thensanwith">
										<span>{{item.username}}</span>
										<span>{{item.isAdmin | RoleName}}</span>
									</p>
								</div>
								<!-- <el-button
								v-if="item.isAdmin == 1 " 
								size="small" 
								@click='delpoeple(item)' 
								type="danger"
								>
								删除
								</el-button> -->
							</div>
						</li>
					</ul>


					<ul v-if="datalist==2">
						<li v-for="(item,index) in applylist" :key="index">
							<div class="liTop">
								<div class="liTop-left">
									<p class="thensanwith">
										<span> 申请人：{{item.username}}</span>
									</p>
								</div>
								<span class="applylive">申请激活</span>
							</div>
							<p class="deletBtn">
								<el-button  @click="pass(item)" type="primary">通过</el-button>
								<!-- <el-button  @click="fail(item)" type="danger">不通过</el-button> -->
							</p>
						</li>
					</ul>

				</div>
				<!-- <button size="large" type="primary" @click="addmember">邀请成员</mt-button> -->
			</div>
		</section>
		<!-- <Foot></Foot> -->


		<!-- 蒙尘 -->
		<!-- <Popupp v-if="popupVisible">
			<div slot="popupForm">
				<h3>邀请成员</h3>
				<form class="appl" action="" onsubmit="return false">
					<p>
						<img style="width: 0.426667rem;height: 0.426667rem;" src="@/assets/images/Vector.png" alt="">
						<input type="search" placeholder="输入姓名、邮箱或手机号">
					</p>

					<div class="formope">
						<button class="onsub" @click="changVisible">取消</button>
						<button class="sub">确定</button>
					</div>
				</form>
			</div>
		</Popupp> -->

		<!-- 身份选取 -->
		<!-- <Popupp v-if="ible">
			<div class="idenPop" slot="popupForm">
				<h3>分配成员身份</h3>
				<select class="idenlisy" v-model="sheetVisible">
					<option v-for="(item,index) in actions" :key="index" :value="item.role_id">
						{{item.role_name}}
					</option>
				</select>
				<button @click="passs" style="margin-top: 0.8rem;" class="sub">确定</button>
			</div>
		</Popupp> -->
	</div>
</template>

<script>
	import {applyList,orgUserList,passagree} from '@/utils/administer.js'

	export default {
		inject: ["reload"],
		filters:{
			RoleName(e){
				if(e==1){
					return '管理员'
				}else {
					return '成员'
				}
			}
		},
		data() {
			return {
				phoneheight:localStorage.getItem('phonetopheight'),
				popupVisible: false,
				ahgg: [], //已激活列表
				applylist: [], //申请激活列表
				datalist: 1,
				apptips: '成员列表',
				ible: false,
				sheetVisible: 'normal', //身份的蒙尘
				actions: [],
				sendadform:{},
			}
		},
		// components: {
		// 	Administrtab,
		// 	Foot,
		// 	Serch,
		// 	Popupp
		// },
		created() {
			
			//激活用户列表 
			applyList({
				 "username": JSON.parse(localStorage.getItem('username')),
				"orgId":JSON.parse(localStorage.getItem('userinfo')).orgId
			}).then(res=>{
				if(res.data.code != 200){
					this.$message.error(res.data.msg)
				}else{
					this.applylist=res.data.data
				}
			})
			// 已激活用户列表
			orgUserList({
				"orgId":JSON.parse(localStorage.getItem('userinfo')).orgId
			}).then(res=>{
				this.ahgg=res.data.data
			})
		
		},
		methods: {
			// addmember() {
			// 	this.popupVisible = true;
			// },
			// 关闭邀请表单
			// changVisible() {
			// 	this.popupVisible = false;
			// },
			//不通过申请
			// fail(n) {
			// 	let data = {
			// 		"username": n.Username,
			// 		"org_id": n.OrgId,
			// 		"nickname": n.Nickname,
			// 		"role_id": n.RoleIid,
			// 		"avatar": n.Avatar,
			// 		"status": n.Status,
			// 		"activation_state": 0
			// 	}
			// 	ActivationState(data).then(res => {
			// 		Toast('操作成功')
			// 		this.reload()
			// 	})
			// },
			// 通过申请
			pass(n) {
				passagree({
					 "adminUsername": JSON.parse(localStorage.getItem('userinfo')).adminUsername,
					 "orgId":  n.belongInfoId,
					 "username": n.username
				}).then(res=>{
					if(res.data.code != 200){
						this.$message.error('操作失败')
					}else{
						this.$message.success(res.data.msg)
						this.reload()
					}
				})
			},
			// passs(){
			// this.sendadform.role_id=this.sheetVisible
			// 	ActivationState(this.sendadform).then(res=>{
			// 		this.ible=false
			// 		Toast('操作成功')
			// 		this.reload()
			// 	})
			// },
			
			// 删除成员
			// delpoeple(n){
			// 	this.sendadform = {
			// 		"username": n.Username,
			// 		"org_id": n.OrgId,
			// 		"nickname": n.Nickname,
			// 		'role_id':n.RoleId,
			// 		"avatar": n.Avatar,
			// 		"status": n.Status,
			// 		"activation_state": 0
			// 	}
			// 	// console.log(this.sendadform)
			// 	ActivationState(this.sendadform).then(res=>{
			// 		Toast('操作成功')
			// 		this.reload()
			// 	})
			// },
			gobackk(){
				this.$router.push('/administr')
			}
		}
		
		// mounted(){
		// 	this.$nextTick(()=>{
		// 		console.log(this.applylist.length)
		// 	})

		// }
	}
</script>

<style scoped>
	.member {
			display: flex;
			flex-direction: column;
			width: 100vw;
			height: 100vh;
	
		}
	
		section {
			flex: 1;
			overflow: scroll;
	
		}
	
		section::-webkit-scrollbar {
	
			display: none;
	
		}
	
		.memberList {
			width: 100%;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
		}
	
		.memberList .memberListcon {
			width: 8.88rem;
			display: flex;
			flex-direction: column;
		}
	
		.membertitle {
			width: 100%;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
		}
	
		.membertitle h3 {
			font-size: 0.373333rem;
			color: #1E1E1E;
			width: 8.88rem;
			margin-bottom: 0.4rem;
			margin-top: 0.666667rem;
		}
		.memberList .memberListcon li {
			width: 100%;
			border-radius: 0.133333rem;
			background-color: white;
			margin-bottom: 0.4rem;
			display: flex;
			flex-direction: column;
			font-size: 0.373333rem;
			padding: 0.4rem;
			box-sizing: border-box;
		}
		.liTop {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		
		.liTop-left {
			display: flex;
			width: 58%;
			justify-content: space-between;
			align-items: center;
		}
		
		.liTop-left p {
			display: flex;
			flex-direction: column;
		}
	

	

	

	.nomal {
		width: 1.333333rem;
		height: 0.533333rem;
	}

	.deletBtn {
		width: 100%;
		text-align: center;
		margin-top: 0.48rem;
	}

	.deletBtn .mint-button--primary {
		width: 1.76rem;
		margin-right: 0.266667rem;
	}

	.mint-button--primary {
		width: 8.88rem;
		margin-bottom: 0.266667rem;
	}


	.mint-popup h3 {
		font-size: 0.426667rem;
		color: #515151;
		border-bottom: 1px solid #BFBFBF;
		height: 1.413333rem;
		text-align: center;
		line-height: 1.413333rem;
		font-weight: normal;

	}

	form p {
		display: flex;
		height: 32px;
		justify-content: space-between;
		margin-bottom: 0.666667rem;
		border: 1px solid #C4C4C4B2;
		border-radius: 0.133333rem;
		position: relative;

	}

	form p input {
		width: 85%;
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
	}

	form p img {
		position: absolute;
		top: 0.213333rem;
		left: 0.266667rem;
	}

	.formope {
		display: flex;
		justify-content: space-around;
		margin-top: 1.333333rem;
		width: 70%;
	}

	.formope button {
		width: 2.4rem;
		height: 30px;
		border-radius: 0.133333rem;
		color: #3A3A3A;
		outline: none;
		border: 1px solid #51515180;
		background-color: white;
	}

	.formope .sub {
		background-color: #278DE5;
		color: #fff;
		border: none;
	}

	.classificationCon {
		width: 8.88rem;
		display: flex;
		background-color: white;
		border-radius: 0.266667rem;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 0.266667rem;
		box-sizing: border-box;
	}

	.classification {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 0.533333rem;
	}

	.classificationCon p {
		font-size: 0.373333rem;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: calc(8.88rem / 4);
		margin: 0.213333rem 0;
	}

	.applylive {
		width: 1.8rem;
		height: 0.533333rem;
		background-color: darkorange;
		text-align: center;
		color: white;
		border-radius: 0.08rem;
	}

	.liTop-left img {
		width: 1.066667rem;
		height: 1.066667rem;
		border-radius: 50%;
	}

	.idenlisy {
		width: 6rem;
		height: 1rem;
		border: 1px solid rgba(0, 0, 0, .85);
		margin-top: 0.533333rem;
		border-radius: 0.106667rem;
		outline: none;
		text-indent: 0.213333rem;
	}

	.idenPop {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.idenPop h3 {
		width: 100%;
	}
	.sub{
		width: 4rem;
		border: none;
		background-color: #278DE5;
		color: white;
		border-radius: 0.133333rem;
		height: 0.8rem;
	}
	.thensanwith{
		width: 3rem;
	}
	.appl{
		margin-top: 2rem;
		display: flex;
		justify-content:center;
		flex-wrap: wrap;
	}
	.appl p{
		width: 70%;
	}
	.title{
		font-size: 14px;
		width: 100%;
		height: 0.933333rem;
		background-color: white;
		line-height:0.933333rem;
		text-indent: 0.266667rem;
		margin-bottom: 0.4rem;
	}
</style>
