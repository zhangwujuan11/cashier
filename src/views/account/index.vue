<template>
	<div>
		<Moretitle></Moretitle>
		<div class="account">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="基本信息" name="first">
					<Bassmess></Bassmess>
				</el-tab-pane>
				<el-tab-pane label="安全信息" name="second">
					<Security></Security>
				</el-tab-pane>
			</el-tabs>
			<img @click="gohome" class="colse" src="@/assets/images/close.png" alt="">
		</div>
		<Foot></Foot>
	</div>
	
</template>

<script>
	import Bassmess from "@/components/BaseMess.vue"
	import Security from "@/components/Security.vue"
	import Foot from '@/components/Foot.vue'
	import Moretitle from '@/components/Moretitle.vue'
  export default {
    data() {
      return {
        activeName: 'first'
      }
    },
	components:{
		Bassmess,
		Security,
		Foot,
		Moretitle
	},
    methods: {
      handleClick(tab, event) {
      },
	  gohome(){
		  this.$router.push("/home")
	  }
    }
  }
</script>

<style scoped>
	.account{
		width: 100%;
		background-color: white;
		position: relative;
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
	.colse{
		width: 0.293333rem;
		height: 0.293333rem;
		position: absolute;
		z-index: 999;
		top: 13px;
		right: calc(50% - 4.4rem);
	}
	:deep(.el-tabs__item.is-active){
		color: #409EFF;
	}
	:deep(.el-tabs__header){
		margin: 0;
	}
	:deep(.el-tabs){
		width: 100vw !important;
		height: calc(100vh - 2.853333rem) !important;
	}
	:deep(.el-tabs__content){
		flex:1 !important;
		overflow-y: hidden;
	}
	
	
	
</style>