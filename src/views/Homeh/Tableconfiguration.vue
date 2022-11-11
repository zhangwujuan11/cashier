<template>
	<div>
		<div @click="goback">
			<Pagetitle></Pagetitle>
		</div>
		<div class="account">
			<el-tabs v-model="activeName"  style="position: relative;">
				<el-tab-pane label="支付参数配置" name="first">
					<Configuration></Configuration>
				</el-tab-pane>
				<el-tab-pane label="支付通道配置" name="second">
					<Channel></Channel>
				</el-tab-pane>
			</el-tabs>
			<!-- <img @click="gohome" class="colse" src="@/assets/images/close.png"> -->
		</div>
	</div>
</template>

<script>
	import Pagetitle from '@/components/Pagetitle.vue'
	import Configuration from "@/components/homeh/Configuration.vue"
	import Channel from "@/components/homeh/Channel.vue"
  export default {
    data() {
      return {
        activeName: 'first'
      }
    },
	components:{
		Configuration,
		Channel,
		Pagetitle
	},
    methods: {
	  // gohome(){
		 //  this.$router.push("/home")
	  // },
	  goback(){
	  	this.$router.push('/merchant/index')
	  }
    }
  }
</script>

<style scoped>
	.account{
		width: 100%;
		background-color: white;
		position: relative;
		height:calc(100vh - 2.853333rem - 1.28rem);
		display: flex;
	}
	:deep(.el-tabs__nav){
		width: 8.8rem;
		display: flex;
	}
	:deep(.el-tabs__nav-scroll){
		display: flex;
		justify-content: center;
	}
	:deep(.el-tabs__active-bar){
		height: 0.106667rem;
	}
	:deep(.el-tabs__nav-wrap::after){
		height: 1px;
	}

	:deep(.el-tabs__item){
		color: #515151;
	}
	
	:deep(.el-tabs__item.is-active){
		color: #409EFF;
	}
	:deep(.el-tabs__header){
		margin: 0;
	}
	:deep(.el-tabs){
		width: 100vw !important;
		flex:1 !important;
		overflow: hidden;
		overflow-y: scroll;
		padding-bottom: 1.333333rem;
		height: 100%;
		background: white;
	}
	:deep(.el-tabs__content){
		
	}
	.colse{
		width: 0.293333rem;
		height: 0.293333rem;
		position: absolute;
		z-index: 999;
		top:12px;
		right: calc(50% - 4.4rem);
	}
	:deep(.el-tabs__header) {
		     position: fixed !important;
		     background: white !important;
		     z-index: 999 !important;
		     width: 100% !important;
	 }
	
</style>