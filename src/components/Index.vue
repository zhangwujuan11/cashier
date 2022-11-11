<template>
	<el-drawer  :visible.sync='$store.state.menushow' :show-close="false" :withHeader="false" append-to-body :direction="direction" style="z-index: 2081;">
		<div @touchstart.capture="touchStart" @touchend.capture="touchEnd" class="administr":style="{'margin-top':phoneheight}">
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
							<!-- <button v-if="isadmin==1"  @click='gohome'>进入应用</button>
							<button v-if="isadmin==0" @click="goapplyBtn">申请进入</button>
							<button v-if="isadmin==2" @click="nothing" class="bgapply">等待激活</button> -->
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
				<Newadd></Newadd>
				<Control></Control>
				</div>
			</section>
		</div>
	</el-drawer>
</template>

<script>
	import Journal from '@/components/management/Journal.vue'
	import Control from '@/components/management/Control.vue'
	import Newadd from '@/components/management/Newadd.vue'
	import {iToken} from '@/utils/home.js'
	import {authorities,isinfodata,sheapply,interyunshan} from '@/utils/login.js'
	//插件
	export default{
		inject:["reload"],
		components:{
			Journal,
			Control,
			Newadd
		},
		data(){
			return{
				isadmin:1,
				phoneheight:localStorage.getItem('phonetopheight'),
				direction: 'ltr',
				baseform:{
						"username":'',
						"org_id":'',
						"nickname": "",
						"role_id":'',
						"status": 1,
					}
			}
		},
		// created(){
		// 	// 临时数据
		// 	this.$router.push({
		// 		query:{
		// 			"adminUsername":'admin123', 
		// 			"orgId":68479875, 
		// 			"token":'9bbff906-6467-4a7a-ac93-31700789c49c'
		// 		}
		// 	})
		// 	localStorage.setItem('userinfo',JSON.stringify(this.$route.query))
		// 	authorities(this.$route.query.token).then(res=>{
		// 			localStorage.setItem('username',JSON.stringify(res.data.name))
		// 			interyunshan({
		// 				"adminUsername":this.$route.query.adminUsername,
		// 				"orgId":this.$route.query.orgId, 
		// 				"username":res.data.name
		// 			}).then(data=>{
		// 				isinfodata({
		// 					 "username": res.data.name
		// 				}).then(info=>{
		// 					// console.log(info.data.data.type)
		// 					if(info.data.data.type == 'USER'){
		// 						this.isadmin=1
		// 					}else{
		// 						this.isadmin=info.data.data.data.activationState
		// 					}
		// 					iToken().then(res=>{
		// 						localStorage.setItem('iToken',JSON.stringify(res.data.data.iToken))
		// 					})
		// 				})
		// 			})
		// 		})
		// },
		methods:{
			
			goMember(){
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
			// // 向原生端发送信息
		 //   gohomePage(){
			// 	window.flutter_inappwebview.callHandler('jsBack') 
		 //   },
		   
		   
		   
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
		     // 右滑大于30距离删除出现
		    //  if ( this.startX - this.endX < -30) {
		   	// this.$store.state.menushow =true
		   	// parentElement.dataset.type = 0;
		    //  }
		    if ( this.startX - this.endX > 30) {
		   	  this.$store.state.menushow = false
		     }
		     this.startX = 0;
		     this.endX = 0;
		   }
		   
		   
		}
	}
</script>

<style scoped>
	 :deep(.el-drawer.ltr) {
		width: 85% !important;
	}
	:deep(#el-drawer__title) {
		margin-bottom: 0;
	}
	.administr{
			background-color: #2178C3;
			width: 100%;
			height: 100vh;
			padding: 0 0.426667rem 0 0.586667rem;
			box-sizing: border-box;
		}
	section{
		overflow: scroll;
			height: calc(100vh - 0.8rem);
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
