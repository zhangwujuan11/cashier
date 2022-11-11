<template>
	<ul class="footn" :style="{'padding-bottom':phonebottomheight}">
		<li @click="goindex">
			<i class="icon iconfont icon-dingdanzhongxin"></i>
			<span>订单管理</span>
		</li>
		<li @click="gorefundrecord">
			<i class="icon iconfont icon-neigoutuikuanguanli"></i>
			<span>退款记录</span>
		</li>
		<li @click="gotransferorder">
			<i class="icon iconfont icon-zijinzhuanzhang"></i>
			<span>转账订单</span>
		</li>
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
				this.$router.push('/ordercenter/index')
			},
			gorefundrecord(){
				this.$router.push('/ordercenter/refundrecord')
			},
			gotransferorder(){
				this.$router.push('/ordercenter/transferorder')
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
		width: calc(100% / 3);
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