<template>
	<div  class="mai" :style="{'padding-top':phoneheight}">
		<div class="maretitle">
			<img @click="goback" src="@/assets/images/back.png" alt="">
			<slot name='tna'>
				账户设置
			</slot>
		</div>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				phoneheight:localStorage.getItem('phonetopheight')
			}
		},
		methods:{
			goback(){
				this.$router.push('/home')
			}
		}
	}
</script>

<style scoped>
.mai{
	width: 100%;
	display: flex;
	justify-content: center;
	background-color: white;
}
	.maretitle{
		width: 8.8rem;
		font-size: 20px;
		color: black;
		display: flex;
		align-items: center;
		padding-bottom: 0.533333rem;
	}
	.maretitle img{
		width: 0.64rem;
		height: 0.64rem;
	}
</style>