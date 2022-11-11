<template>
	<div class="datable">
		<ul class="biggestBox">
			<li class="information li_vessel" v-for="(item,index) in tableData" :key="index">
				<p>
					<strong>应用支付方式代码：</strong>6247e636e4b05076b7011697
				</p>
				<p>
					<strong>支付方式名称：</strong>111697
				</p>
				<p>
					<strong>状态：</strong> <span :class="[item.state==1 ? 'greecolor':'redcolor']">{{item.state | state}}</span>
				</p>
				<p style="display: flex;justify-content: space-between;">
					<span><strong>创建日期：</strong>{{item.createdAt | formatDate('yyyy-MM-dd HH:mm:ss')}} </span>
					<span class="controls">
						<i class="el-icon-s-operation"></i>
					</span>
				</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		filters: {
			state(e) {
				if (e == 1) {
					return '启用'
				} else if (e == 0) {
					return '禁用'
				}
			},
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
				tableData: [{
				         state: 1,
				         createdAt: '2022-10-13T08:17:21.850+00:00',
				       }, {
				         state: 0,
				          createdAt: '2022-10-13T08:17:21.850+00:00',
				       }, {
				         state: 1,
				          createdAt: '2022-10-13T08:17:21.850+00:00',
				       }, {
				        state: 1,
				          createdAt: '2022-10-13T08:17:21.850+00:00',
				       }, {
				         state: 1,
				         createdAt: '2022-10-13T08:17:21.850+00:00',
				       }, {
				         state: 0,
				          createdAt: '2022-10-13T08:17:21.850+00:00',
				       }]
				}
				
		},
		methods:{
		}
		
	}
</script>

<style scoped>
	.datable ul {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		color: black;
	}
	
	.datable ul li {
		font-size: 14px;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
	
	.datable ul li p {
		width: 100%;
		line-height: 0.533333rem;
	}
	
	.greecolor {
		color: #1CC92D;
	}
	
	.redcolor {
		color: red;
	}
	.controls {
		font-size: 20px;
		color: rgba(0, 0, 0, 0.5);
		text-align: right;
		font-weight: bold;
	}
	
	.controls i {
		margin-left: 0.213333rem;
	}
	
	.datable {
		margin-bottom: 1.4rem;
	}
</style>