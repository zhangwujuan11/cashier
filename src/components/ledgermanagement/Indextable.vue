<template>
	<div class="datable">
		<el-table
		:data="tableData"
		 style="width:100%;"
		 @row-click="jinhao"
		 >
			<el-table-column
			  prop="province"
			  label="分账金额"
			 >
			</el-table-column>
			<el-table-column
			  prop="city"
			  label="分账批次号"
			  >
			</el-table-column>
		  </el-table>
		  <router-view></router-view>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				tableData: [{
				         province: '￥10.00',
				         city: 'D1258569853295687453',
				       }, {
				         province: '￥10.00',
				         city: 'D1258569853295687453',
				       }, {
				         province: '￥10.00',
				         city: 'D1258569853295687453',
				       }, {
				         province: '￥10.00',
				         city: 'D1258569853295687453',
				       }, {
				         province: '￥10.00',
				         city: 'D1258569853295687453',
				       }, {
				         province: '￥10.00',
				         city: 'D1258569853295687453',
				       }]
				}
				
		},
		methods:{
			jinhao(n){
				this.$router.push({
					name:'indexdetails',
					query:n
				})
			}
		}
		
	}
</script>

<style scoped>
	:deep(.el-table th.el-table__cell){
		background-color: #F5F5F5 !important;
	}
	
	:deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf){
		/* border-bottom: none !important; */
	}
</style>