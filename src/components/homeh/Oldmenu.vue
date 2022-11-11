<template>
	<div  class="oldmenu">
		<ul class="oldmenuul">
			<li @click="gosahnghu"><img src="@/assets/images/sahnghuimg.png" alt=""></li>
			<li @click="goordercenter"><img src="@/assets/images/dingdanimg.png" alt=""></li>
			<li @click="noda"><img src="@/assets/images/fenzhangimg.png" alt=""></li>
			<li @click="collect"><img src="@/assets/images/collect.png" alt=""></li>
		</ul>
	</div>
	
</template>

<script>
	export default{
		methods:{
			gosahnghu(){
				this.$router.push('/merchant/index')
			},
			goordercenter(){
				this.$router.push('/ordercenter/index')
			},
			noda(){
				this.$router.push('/collection/index')
			},
			collect(){
				this.$router.push('/collection/collectoeder')
			}
			
		}
	}
</script>

<style scoped>
	.oldmenu{
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 0.346667rem;
	}
	.oldmenuul{
		width: 8.8rem;
		display: flex;
		justify-content: space-between;
	}
	.oldmenuul img{
		width: 2rem;
		height: 2.186667rem;
	}
</style>