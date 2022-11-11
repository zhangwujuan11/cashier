<template>
	<ul class="footn" :style="{'padding-bottom':phonebottomheight}">
		<li @click="goindex">
			<i class="icon iconfont icon-lianxiren"></i>
			<span>操作员管理</span>
		</li>
		<li @click="gorefundrecord">
			<i class="icon iconfont icon-jiaoseguanli"></i>
			<span>角色管理</span>
		</li>
		<!-- <li @click="gotransferorder">
			<i class="icon iconfont icon-zijinzhuanzhang"></i>
			<span>转账订单</span>
		</li> -->
	</ul>
</template>

<script>
	export default{
		data(){
			return{
				phonebottomheight:localStorage.getItem('phonebottomheight')
			}
		},
		methods:{
			goindex(){
				this.$router.push('/operator/rolemanagement')
			},
			gorefundrecord(){
				this.$router.push('/operator')
			}
		}
	}
</script>

<style scoped>
	ul{
		width: 100%;
		height:50px;
		position: fixed;
		bottom: 0;
		background-color: white;
		display: flex;
	}
	ul li{
		width:50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: #BFBFBF;
	}
	li i{
		font-size: 0.533333rem;
		
	}
	li span{
		font-size: 0.266667rem;
	}
	
</style>