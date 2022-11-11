<template>
	<div class="solttitle">
		<div class="soltcontrol" :style="{'margin-top':phoneheight}">
			<div class="titlecon">
				<img @click="gohomePage" src="@/assets/images/close.png" alt="">
				<span>买单宝</span>
			</div>
			<div class="usertab" @click="downcontrol">
				<img class="Ellipse" src="@/assets/images/ellipse.png" alt="">
				<span>{{username}}商户</span>
				<img class="down" src="@/assets/images/down.png" alt="">
				<div class="downshow" v-if="downshow">
					<p @click="goaccount">
						<i class="el-icon-setting"></i>
						账户设置
					</p>
					<p>
						<i class="el-icon-switch-button"></i>
						退出登录
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				downshow:false,
				phoneheight:localStorage.getItem('phonetopheight'),
				username:JSON.parse(localStorage.getItem('username'))
			}
		},
		methods:{
			// saidmenu(){
			// 	this.$store.state.menushow =true
			// },
			downcontrol(){
				this.downshow =! this.downshow
			},
			goaccount(){
				this.$router.push("/account")
			},
			// 返回
			gohomePage(){
			   this.$router.push('/')
			},
			reload(){
				 window.location.reload();
			}
		}
	}
</script>


<style scoped>
	.solttitle{
		width: 100%;
		background-color: #278DE5;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
	.titlecon img{
		width: 0.533333rem;
		height: 0.533333rem;
		margin-right: 0.533333rem;
	}
	.titlecon{
		display: flex;
		color: white;
		align-items: center;
	}
	.soltcontrol .titlecon span{
		font-size: 0.533333rem;
	}
	.soltcontrol{
		width: 8.8rem;
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.24rem;
	}
	.soltcontrol .morebanner{
		width: 0.586667rem;
		height: 0.586667rem;
	}
	.soltcontrol .reload{
		width: 0.4rem;
		height: 0.4rem;
	}
	.soltcontrol .Ellipse{
		width: 0.64rem;
		height: 0.64rem;
		border-radius: 50%;
		margin-right: 0.266667rem;
	}
	.soltcontrol .down{
		width: 0.213333rem;
		height: 0.133333rem;
		margin-left: 0.266667rem;
	}
	.soltcontrol span{
		font-size: 0.266667rem;
		color: white;
	}
	
	.soltcontrol .usertab{
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}
	.downshow{
		width: 4rem;
		height: 1.866667rem;
		font-size: 0.373333rem;
		background-color: white;
		border-radius: 0.266667rem;
		position: absolute;
		top:0.746667rem;
		box-shadow:8px 0px 20px 8px rgba(0, 0, 0, 0.15);
		z-index: 1999;
		right: 0px;
	}
	.downshow p{
		width: 100%;
		height: 0.906667rem;
		text-align: center;
		line-height: 0.906667rem;
	}
	.downshow p:first-child{
		border-bottom: 1px solid #C4C4C480;
	}
	.downshow p i{
		font-size: 0.426667rem;
	}
	.serch{
		width: 100%;
		background-color: #3778DA;
		position: fixed;
		top: 0;
		left: 0;
	}
	
</style>