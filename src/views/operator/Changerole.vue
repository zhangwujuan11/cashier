<template>
	<div>
		<Solttitle></Solttitle>
		<Saidmenu></Saidmenu>
		<div class="account">
			<Background>
				<div slot="title">用户角色管理 > 操作员管理 > 变更角色</div>
				<div slot='content' class="chen">
					<p class="allin">
						<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
					</p>
					<div style="margin: 15px 0;"></div>
					<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
					  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
					</el-checkbox-group>
					<el-button type="primary" >取消</el-button>
					<el-button>保存</el-button>
				</div>
			</Background>
		</div>
	</div>
</template>

<script>
	import Solttitle from '@/components/Solttitle.vue'
	import Saidmenu from '@/components/Saidmenu.vue'
	import Background from '@/components/Background.vue'
	 const cityOptions = ['上海', '北京', '广州', '深圳','上海2', '北京2', '广州3'];
	 export default{
		  data() {
		       return {
		         checkAll: false,
		         checkedCities: [],
		         cities: cityOptions,
		         isIndeterminate: false
		       };
		     },
			 components:{
			 	Saidmenu,
			 	Solttitle,
			 	Background
			 },
		     methods: {
		       handleCheckAllChange(val) {
		         this.checkedCities = val ? cityOptions : [];
		         this.isIndeterminate = false;
		       },
		       handleCheckedCitiesChange(value) {
		         let checkedCount = value.length;
		         this.checkAll = checkedCount === this.cities.length;
		         this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
		       }
		     }
	 }
</script>

<style scoped>
	
	.chen{
		height: calc(100vh - 4.5rem);
	}
	.allin{
		border-bottom:2px solid #C4C4C480;
		padding-bottom: 0.32rem;
		box-sizing: border-box;
		margin-bottom: 0.32rem;
	}
	.el-checkbox-group{
		margin-bottom: 1rem;
	}
</style>