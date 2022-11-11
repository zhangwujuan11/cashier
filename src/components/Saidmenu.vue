<template>
	<el-drawer append-to-body :direction="direction" style="z-index: 2081;">
		<el-col>
			<el-menu 
			 default-active="2"
			class="el-menu-vertical-demo"
			:unique-opened='true' 
			router
			>
				<el-menu-item @click="hiden" index="/home">
					<i class="el-icon-house"></i>
					<span slot="title">主页</span>
				</el-menu-item>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-user"></i>
						<span>商户中心</span>
					</template>
					<el-menu-item-group>
						<el-menu-item  @click="hiden" index="/merchant/index" >
							<i class="el-icon-menu"></i>
							应用管理
						</el-menu-item>
						<el-menu-item  @click="hiden" index="/merchant/payment">
							<i class="el-icon-s-finance"></i>
							支付测试
						</el-menu-item>
						<el-menu-item  @click="hiden" index="/merchant/accounts">
							<i class="el-icon-refresh"></i>
							转账
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>

				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-money"></i>
						<span>订单中心</span>
					</template>
					<el-menu-item-group>
						<el-menu-item  @click="hiden" index="/ordercenter/index">
							<i class="el-icon-document"></i>
							订单管理
						</el-menu-item>
						<el-menu-item  @click="hiden" index="/ordercenter/refundrecord">
							<i class="el-icon-s-order"></i>
							退款记录
						</el-menu-item>
						<el-menu-item  @click="hiden" index="/ordercenter/transferorder">
							<i class="el-icon-set-up"></i>
							转账订单
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-col>
	</el-drawer>
</template>

<script>
	import Journal from '@/components/management/Journal.vue'
	import Control from '@/components/management/Control.vue'
	import {iToken} from '@/utils/home.js'
	import {authorities,isinfodata,sheapply,interyunshan} from '@/utils/login.js'
	// export default {
	// 	data() {
	// 		return {
	// 			direction: 'ltr',
	// 		}
	// 	},
	//  methods: {
	// 		hiden(){
	// 			this.$store.state.menushow=false
	// 		}
	// 	},
	// watch:{
		
	// }
	// }
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
			// this.$router.push({
			// 	query:{
			// 		"adminUsername":'admin123', 
			// 		"orgId":68479875, 
			// 		"token":'9bbff906-6467-4a7a-ac93-31700789c49c'
			// 	}
			// })
			// localStorage.setItem('userinfo',JSON.stringify(this.$route.query))
			// authorities(this.$route.query.token).then(res=>{
			// 		localStorage.setItem('username',JSON.stringify(res.data.name))
			// 		interyunshan({
			// 			"adminUsername":this.$route.query.adminUsername,
			// 			"orgId":this.$route.query.orgId, 
			// 			"username":res.data.name
			// 		}).then(data=>{
			// 			isinfodata({
			// 				 "username": res.data.name
			// 			}).then(info=>{
			// 				// console.log(info.data.data.type)
			// 				if(info.data.data.type == 'USER'){
			// 					this.isadmin=1
			// 				}else{
			// 					this.isadmin=info.data.data.data.activationState
			// 				}
			// 				iToken().then(res=>{
			// 					localStorage.setItem('iToken',JSON.stringify(res.data.data.iToken))
			// 				})
			// 			})
			// 		})
			// 	})
		},
		
		
		methods:{
			hiden(){
						this.$store.state.menushow=false
					},
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
					this.$router.push('/operator')
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
	 :deep(.el-drawer.ltr) {
		padding-top: 1.733333rem !important;
		width: 5.333333rem !important;
	}
	:deep(#el-drawer__title) {
		margin-bottom: 0;
	}
	.administr{
			background-color: #2178C3;
			width: 85%;
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
		background-color:darkorange
	}
	.Administrtab {
		width: 100%;
		padding-top: 0.533333rem;
		height: 0.8rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.Administrtab img{
		width: 0.35rem;
		height: 0.373333rem;
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
