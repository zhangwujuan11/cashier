<template>
	<div>
		<Solttitle></Solttitle>
		<Saidmenu></Saidmenu>
		<Background>
			<div slot='title'>商户信息</div>
			<div slot='content' class="chen">
				<p>
					<span>商户号：</span>M1624015328
				</p>
				<p>
					<span>商户名称：</span>hgj
				</p>
				<p>
					<span>商户简称：</span>火锅鸡
				</p>
				<p>
					<span>商户类型：</span><img src="@/assets/images/nomalpeople.png">
				</p>
				<p>
					<span>联系人姓名：</span>张飞
				</p>
				<p>
					<span>联系人手机号：</span>18611117212
				</p>
				<p>
					<span>联系人邮箱：</span>6666666@qq.com
				</p>
			</div>
		</Background>
	</div>
</template>

<script>
	import Background from '@/components/Background.vue'
	import Solttitle from '@/components/Solttitle.vue'
	import Saidmenu from '@/components/Saidmenu.vue'
	export default{
		components:{
			Background,
			Solttitle,
			Saidmenu
		}
	}
</script>

<style scoped>
	:deep(.background){
		height: calc(100vh - 2.853333rem);
	}
	p{
		font-size: 0.32rem;
		margin-bottom: 0.32rem;
		width: 100%;
		display: flex;
		align-items: center;
	}
	p img{
		width: 1.333333rem;
		height: 0.48rem;
	}
	
</style>