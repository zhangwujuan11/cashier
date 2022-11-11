<template>
	<div class="paydata information">
		<p class="paydatatitle">最新交易记录（元）</p>
		<ul>
			<li v-for="(item,index) in paydataList" :key="index">
				<img src="@/assets/images/Rectangle18.png" alt="">
				<p class="cenn">
					<span>{{item.payOrderId}}</span>
					<span>{{item.createdAt | formatDate('yyyy-MM-dd HH:mm:ss') }}</span>
				</p>
				<p class="righh">
					￥{{item.amount}}<img src="@/assets/images/Go.png" alt="">
				</p>
			</li>
			
		</ul>
	</div>
</template>

<script>
	import {typeCount} from '@/utils/home.js'
	export default{
		filters:{
			formatDate: function(value, args) {
				var dt = new Date(value);
				if (args == 'yyyy-M-d') { // yyyy-M-d
					let year = dt.getFullYear();
					let month = dt.getMonth() + 1;
					let date = dt.getDate();
					return `${year}-${month}-${date}`;
				} else if (args == 'yyyy-M-d H:m:s') { // yyyy-M-d H:m:s
					let year = dt.getFullYear();
					let month = dt.getMonth() + 1;
					let date = dt.getDate();
					let hour = dt.getHours();
					let minute = dt.getMinutes();
					let second = dt.getSeconds();
					return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
				} else if (args == 'yyyy-MM-dd') { // yyyy-MM-dd
					let year = dt.getFullYear();
					let month = (dt.getMonth() + 1).toString().padStart(2, '0');
					let date = dt.getDate().toString().padStart(2, '0');
					return `${year}-${month}-${date}`;
				} else { // yyyy-MM-dd HH:mm:ss
					let year = dt.getFullYear();
					let month = (dt.getMonth() + 1).toString().padStart(2, '0');
					let date = dt.getDate().toString().padStart(2, '0');
					let hour = dt.getHours().toString().padStart(2, '0');
					let minute = dt.getMinutes().toString().padStart(2, '0');
					let second = dt.getSeconds().toString().padStart(2, '0');
					return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
				}
			}
		},
		data(){
			return{
				paydataList:[]
			}
		},
		created() {
			typeCount().then(res=>{
				this.paydataList=res.data.data.records
				// console.log(this.paydataList)
			})
		}
	}
</script>

<style scoped>
	.paydatatitle{
		padding-bottom: 0.373333rem;
	}
	.paydata{
		margin-bottom: 1.506667rem;
	}
	.paydata p{
		font-size: 0.373333rem;
	}
	ul{
		width: 100%;
	}
	li{
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		width: 100%;
		height: 1.413333rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	li img{
		width: 0.533333rem;
		height: 0.533333rem;
	}
	li .cenn{
		display: flex;
		justify-content: left;
		flex-direction: column;
		line-height: 0.6rem;
	}
	li .righh{
		display: flex;
		align-items: center;
	}
	li .righh img{
		width:0.213333rem;
		height: 0.4rem;
		margin-left: 0.25rem;
	}
</style>