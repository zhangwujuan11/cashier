<template>
	<div  class="mai" :style="{'padding-top':phoneheight}">
		<div class="maretitle" :style="{'padding-top':phoneheight}">
			<i style="font-weight: 800;" class="el-icon-close"></i>
		</div>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				phoneheight:localStorage.getItem('phonetopheight')
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
		justify-content: right;
	}
	.maretitle img{
		width: 0.64rem;
		height: 0.64rem;
	}
</style>