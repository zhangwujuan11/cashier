<template>
	<div class="administr":style="{'margin-top':phoneheight}">
		<div class="Administrtab">
			<div @click="gohomePage">
				<img src="@/assets/images/close.png" alt="">
				<span>
					买单宝
				</span>
			</div>
		</div>
		
		<section>
			<div>
			<div class="admintop">
				<div class="adtopcon">
					<div class="logotip">
						<img src="@/assets/images/logo.png" alt="">
						<div>
							<span>买单宝</span>
							<br>
							买单宝服务描述文本买单宝服务描述文本
						</div>
					</div>
					<div class="injion">
						<p>
							<img src="@/assets/images/smile.png" alt="">
							<span>使用小助手</span>
						</p>
						<button v-if="isadmin==1"  @click='gohome'>进入应用</button>
						<button v-if="isadmin==0" @click="goapplyBtn">申请进入</button>
						<button v-if="isadmin==2" @click="nothing" class="bgapply">等待激活</button>
					</div>
				</div>
			</div>
			<div class="roles">
				<div>
					<ul>
						<li>分账管理 <img src="@/assets/images/ltesgo.png" alt=""></li>
						<li @click="goMember">申请列表<img src="@/assets/images/ltesgo.png" alt=""></li>
						<li @click="goRole">用户角色管理 <img src="@/assets/images/ltesgo.png" alt=""></li>
						<!-- <li @click="goPrivileges">操作员管理<img src="@/assets/images/ltesgo.png" alt=""></li> -->
						<li>日志管理 <img src="@/assets/images/ltesgo.png" alt=""></li>
					</ul>
				</div>
			</div>
			<!-- 日志管理
			<Journal></Journal>
			
			<div class="configure" v-if="baseform.role_id =='admin' || baseform.role_id =='manage'">
				<div class="configCon">
					<h3>设备管理</h3>
					<div  @click="goDevice">开始管理</div>
				</div>
			</div>
			
			
			<div class="configure">
				<div class="configCon">
					<h3>需求管理</h3>
					<div>开始管理</div>
				</div>
			</div>
			<div class="configure">
				<div class="configCon">
					<h3>评论管理</h3>
					<div>开始管理</div>
				</div>
			</div>
			
			<!-- <Ability></Ability> -->
			<Control></Control>
			</div>
		</section>
	</div>
</template>

<script>
	import Journal from '@/components/management/Journal.vue'
	import Control from '@/components/management/Control.vue'
	import {iToken} from '@/utils/home.js'
	import {authorities,isinfodata,sheapply,interyunshan} from '@/utils/login.js'
	// import { get_open_body_sig } from '@qians/gen_header/gen_header.js'
	
	
	//插件
	export default{
		inject:["reload"],
		components:{
			Journal,
			Control
		},
		data(){
			return{
				isadmin:1,
				phoneheight:localStorage.getItem('phonetopheight'),
				baseform:{
						"username":'',
						"org_id":'',
						"nickname": "",
						"role_id":'',
						"status": 1,
					}
			}
		},
	created(){
			// 临时数据
			this.$router.push({
				query:{
					"adminUsername":'k42806', 
					"orgId":"11111", 
					"token":'eaa327d3-e55b-4e65-b644-ac714297c02f'
				}
			})
		
		 
			
			
			localStorage.setItem('userinfo',JSON.stringify(this.$route.query))
			authorities(this.$route.query.token).then(res=>{
					localStorage.setItem('username',JSON.stringify(res.data.name))
					interyunshan({
						"adminUsername":this.$route.query.adminUsername,
						"orgId":this.$route.query.orgId, 
						"username":res.data.name
					}).then(data=>{
						isinfodata({
							 "username": res.data.name,
							"orgId":this.$route.query.orgId, 
						}).then(info=>{
							// console.log(info.data.data.type)
							if(info.data.data.type == 'USER'){
								this.isadmin=1
							}else{
								this.isadmin=info.data.data.data.activationState
							}
							iToken().then(res=>{
								localStorage.setItem('iToken',JSON.stringify(res.data.data.iToken))
							})
						})
					})
				})
		},
		methods:{
			goMember(){
				// console.log(this.isadmin )
				if(this.isadmin == 1){
					this.$router.push('/administr/member')
				}else{
					this.$router.push({
						name:'nodata'
					})
				}
				
			},
			goRole(){
				if(this.isadmin == 1){
					this.$router.push('/operator/rolemanagement')
				}else{
					this.$router.push({
						name:'nodata'
					})
				}
			},
			goPrivileges(){
				this.$router.push('/operator/rolemanagement')
			},
			// 进入应用
			gohome(){
				this.$router.push('/home')
			},
			goDevice(){
			},
		
			// 申请激活状态
			goapplyBtn(){
				sheapply({
					 "adminUsername": this.$route.query.adminUsername,
					  "orgId": this.$route.query.orgId,
					  "username": JSON.parse(localStorage.getItem('username'))
				}).then(res=>{
					this.$message.success(res.data.msg)
					this.isadmin=2
				})
			},
			// 等待激活
			nothing(){
				this.$message({
				  message: '请耐心等待',
				  type: 'success'
				})
			},
			// 向原生端发送信息
		   gohomePage(){
				window.flutter_inappwebview.callHandler('jsBack') 
		   },
		   
			
		}
	}
</script>

<style scoped>
	.administr{
			background-color: #278DE5;
			width: 100%;
			height: 100vh;
			padding: 0 0.426667rem 0 0.586667rem;
			box-sizing: border-box;
		}
	section{
		overflow: scroll;
			height: calc(100vh - 2.853333rem);
	}
	section::-webkit-scrollbar {
	
	  display: none;
	
	}
	.admintop{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.admintop .adtopcon{
		width: 8.88rem;
		display: flex;
		justify-content: space-between;
	}
	.admintop .logotip{
		width: 69%;
		height: 1.6rem;
		display: flex;
		justify-content: space-between;
		font-size: 0.32rem;
		color: white;
		margin-top: 0.533333rem;
		align-items: center;
		line-height: 0.5rem;
	}
	.admintop .logotip span{
		font-size: 14px;
		font-weight: bold;
	}
	.admintop .logotip img{
		margin-right: 0.266667rem;
		width: 60px;
		height: 60px;
	}
	.injion{
		width:30%;
		height: 1.6rem;
		font-size: 0.32rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 0.533333rem;
	}
	.injion p{
		display: flex;
		align-items: center;
		margin-bottom: 0.48rem;
		color: white;
	}
	.injion img{
		width:0.38rem;
		height: 0.38rem;
		margin-right: 0.133333rem;
	}
	.injion button{
		color: #1D76DE;
		background-color: white;
		width: 1.76rem;
		height: 0.64rem;
		border: none;
		outline: none;
		border-radius: 0.133333rem;
	}
	.roles{
		width: 100%;
		font-size: 0.373333rem;
		color: white;
		display: flex;
		justify-content: center;
	}
	.roles div{
		width: 100%;
		margin-top: 0.933333rem;
	}
	
	.roles ul li{
		width: 90%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0.666667rem 0;
	}
	.roles ul li img{
		width: 0.533333rem;
		height: 0.533333rem;
	}
	/* .roles ul li:nth-child(2){
		background: linear-gradient(180deg, #EC6F66 0%, #F3A183 100%);
	}
	.roles ul li:last-child{
		background: linear-gradient(180deg, #283048 0%, #8CA6DB 100%);
	} */
	.configure{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.configure .configCon{
		width: 8.88rem;
	}
	.configure .configCon h3{
		font-size: 0.373333rem;
		color: #1E1E1E;
		margin:8px 0;
	}
	.configure .configCon div{
		width: 100%;
		height: 1.333333rem;
		line-height: 1.333333rem;
		border-radius: 0.266667rem;
		background: white;
		font-size: 0.373333rem;
		color: #1D76DE;
		text-align: center;
	}
	.injion .bgapply{
		background-color:darkorange;
		color:white;
	}
	.Administrtab {
		width: 100%;
		padding-top: 0.533333rem;
		height: 0.8rem;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
	}
	.Administrtab img{
		width:0.426667rem;
		height: 0.426667rem;
	}
	.Administrtab div{
		width: 8.88rem;
		font-size: 0.426667rem;
		display: flex;
		align-items: center;
	}
	.Administrtab div span{
		margin-left: 0.213333rem;
		font-weight: bold;
	}
	
</style>