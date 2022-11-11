<template>
	<div>
		<Solttitle></Solttitle>
		<Saidmenu></Saidmenu>
		<Background>
			<div slot='title'>分账记录 > 详情</div>
			<div slot='content' class="chen">
				<p>
					<span>分账记录ID：1012</span>
					<span>商户号：M1624015328</span>
				</p>
				<p>
					<span>应用ID：60cc81e0e4b06afc4d3f0cf3</span>
				</p>
				<p><span>订单金额：0.02</span></p>
				<p><span>渠道支付订单号：4200001372202203141859311440</span></p>
				<p>
					<span>系统分账批次号：D1494630771665702914</span>
				</p>
				<p>
					<span>状态：<span class="zhifu">分账成功</span></span>
				</p>
				<p>
					<span>支付接口代码：wxpay</span>
				</p>
				<p>
					<span>支付订单渠道支付订单号： <br> 4200001389202202188005660336</span>
				</p>
				<p>
					<span>分账基数：0.02（订单金额-手续费-退款金额）</span>
				</p>
				<p>
					<span>分账接收者ID：800011</span>
				</p>
				<p>
					<span>收款账号组ID：100045</span>
				</p>
				<p><span>收款账号别名：1487990592</span></p>
				<p>
					<span>分账接收账号类型：商户</span>
				</p>
				<p>
					<span>分账接收账号：1487990592</span>
				</p>
				<p>
					<span>分账接收账号名称：陈</span>
				</p>

				<p>
					<span>分账关系类型：PARTNER</span>
				</p>

				<p>
					<span>分账关系类型名称：合作伙伴</span>
				</p>
				<p>
					<span>实际分账比例：3.00%</span>
				</p>
				<p>
					<span>分账金额：</span>
				</p>
			</div>
		</Background>
	</div>
</template>

<script>
	import Background from '@/components/Background.vue'
	import Solttitle from '@/components/Solttitle.vue'
	import Saidmenu from '@/components/Saidmenu.vue'
	export default {
		components: {
			Background,
			Solttitle,
			Saidmenu
		}
	}
</script>

<style scoped>
	:deep(.background) {
		height: calc(100vh - 2.853333rem);
		overflow-y: scroll;
	}

	p {
		font-size: 0.32rem;
		margin-bottom: 0.32rem;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	p img {
		width: 1.333333rem;
		height: 0.48rem;
	}

	.dingdan {
		color: #2751E5;
		background-color: rgba(39, 81, 229, 0.2);
		border: 1px solid rgba(39, 81, 229, 0.5);
		border-radius: 0.106667rem;
		padding: 0 0.106667rem;
	}

	.shouxu {
		color: #E527B0;
		background-color: rgba(229, 39, 176, 0.2);
		border: 1px solid rgba(229, 39, 176, 0.5);
		border-radius: 0.106667rem;
		padding: 0 0.106667rem;
	}

	.zhifu {
		color: #27E53A;
		background-color: rgba(39, 229, 58, 0.2);
		border: 1px solid rgba(39, 229, 58, 0.5);
		border-radius: 0.106667rem;
		padding: 0 0.106667rem;
	}

	.fengeborder {
		border-top: 1px solid rgba(196, 196, 196, 0.5);
		width: 100%;
		margin: 0.32rem 0;
	}

	.chen {
		padding-bottom: 1.333333rem;
	}
</style>
