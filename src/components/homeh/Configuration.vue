<template>
	<div class="configuration">
		<div>
			<ul>
				<li>
					<p>
						<img src="@/assets/images/Rectangle18.png">
						
						<span>
						<strong>38574</strong>	<br>未开通
						</span>
						
					</p>
					<span class="gonather">
						填写参数 >
					</span>
				</li>
				<li>
					<p>
						<img src="@/assets/images/Rectangle18.png">
						
						<span>
						<strong>38574</strong>	<br>未开通
						</span>
						
					</p>
					<span class="gonather">
						填写参数 >
					</span>
				</li>
				<li>
					<p>
						<img src="@/assets/images/Rectangle18.png">
						
						<span>
						<strong>38574</strong>	<br>未开通
						</span>
						
					</p>
					<span class="gonather">
						填写参数 >
					</span>
				</li>
				<li>
					<p>
						<img src="@/assets/images/Rectangle18.png">
						
						<span>
						<strong>38574</strong>	<br>未开通
						</span>
						
					</p>
					<span class="gonather">
						填写参数 >
					</span>
				</li>
				<li>
					<p>
						<img src="@/assets/images/Rectangle18.png">
						
						<span>
						<strong>38574</strong>	<br>未开通
						</span>
						
					</p>
					<span class="gonather">
						填写参数 >
					</span>
				</li>
				<li>
					<p>
						<img src="@/assets/images/Rectangle18.png">
						
						<span>
						<strong>38574</strong>	<br>未开通
						</span>
						
					</p>
					<span class="gonather">
						填写参数 >
					</span>
				</li>
				<li>
					<p>
						<img src="@/assets/images/Rectangle18.png">
						
						<span>
						<strong>38574</strong>	<br>未开通
						</span>
						
					</p>
					<span class="gonather">
						填写参数 >
					</span>
				</li>
			</ul>
		</div>
		<!-- <p class="next"> <el-button type="primary">下一步</el-button></p> -->
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
	.configuration{
		width:100%;
		display: flex;
		justify-content: center;
	}
	
	.configuration ul{
		width: 8.8rem;
		margin-top: 1.6rem;
	}
	.configuration ul li{
		margin-top: 0.666667rem;
		border: 1px solid #c4c4c4;
		border-radius: 0.266667rem;
		padding:0.4rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
	}
	.configuration ul li img{
		width: 1.866667rem;
		height: 1.333333rem;
		margin-right: 0.32rem;
	}
	.configuration ul li p {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.next{
		width: 100%;
		height: 1.28rem;
		background-color: white;
		text-align: center;
		position: fixed;
		bottom: 1.306667rem;
	}
	.gonather{
		color: #278DE5;
	}
	
</style>