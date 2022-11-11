<template>
	<div class="background">
		<div class="flone">
			<!-- <div class="bgtitle">
				<div class="bgtitleCon">
					<slot name="title"><span>应用管理</span></slot>
					<img @click="gohome" src="@/assets/images/close.png" alt="">
				</div>
			</div> -->
			<div class="bgcon">
				<div class="bgccon">
					<slot name="content"></slot>
				</div>
				<div class="bgcnew">
					<slot name="contentnew"></slot>
				</div>
			</div>
			<slot name="tableaa"></slot>
		</div>
	</div>
</template>

<script>
	export default{
		methods:{
			gohome(){
				this.$router.push('/home')
			}
		}
	}
</script>

<style scoped>
	.background{
		width: 100%;
		background-color: white;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		/* height: calc(100vh - 2.853333rem); */
	}
	.flone{
		flex: 1;
		justify-content: center;
	}
	.bgtitle{
		width: 100%;
		border-bottom: 1px solid #C4C4C480;
		display: flex;
		justify-content: center;
	}
	.bgtitleCon{
		width: 8.8rem;
		height: 0.986667rem;
		display: flex;
		justify-content: space-between;
		font-size: 0.32rem;
		color: #515151;
		align-items: center;
	}
	.bgtitleCon img{
		width: 0.293333rem;
		height: 0.293333rem;
		}
	.bgcon{
		/* padding-top: 0.8rem; */
		box-sizing: border-box;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.bgccon{
		width: 8.8rem;
	}
	.bgcnew{
		width: 100%;
	}
</style>