<template>
	<div>
		<div @click="goback">
			<Pagetitle></Pagetitle>
		</div>
		
		<Background>
			<div slot='title'>支付测试</div>
			<div slot='content' class="chen">
			 <el-select v-model="value" placeholder="请选择"  @change='selectthis(value)'>
				<el-option
				  v-for="item in options"
				  :label="item.label"
				  :value="item.label">
				</el-option>
			  </el-select>
			  <p>您尚未配置任何支付方式</p>
			</div>
		</Background>
	</div>
</template>

<script>
	import Background from '@/components/Background.vue'
	import Pagetitle from '@/components/Pagetitle.vue'
	import {payways,mchApps} from '@/utils/merchant.js'
	export default{
		data(){
			return {
				options: [],
				value:''
			}
		},
		created() {
			this.value = this.$route.query.appid
			payways(this.$route.query.appid).then(res=>{
				console.log(res)
			})
			mchApps().then(res=>{
				for (var i=0;i<res.data.data.records.length;i++) {
					let obj={
						label: res.data.data.records[i].appName + '[' + res.data.data.records[i].appId + ']',
					}
					this.options.push(obj)
				}
			})
		},
		components:{
			Background,
			Pagetitle
		},
		methods:{
			selectthis(n){
				let index1=n.indexOf('[')
				let index2=n.indexOf(']')
				let str=n.substring(index1+1,index2)
				console.log(str)
				payways(str).then(res=>{
					console.log(res)
				})
			},
			goback(){
				this.$router.push('/merchant/index')
			}
		}
	}
</script>

<style scoped>
	:deep(.background){
		height: calc(100vh - 2.853333rem);
	}
	.chen{
		width: 100%;
	}
	.el-select{
		width: 100%;
	}
	:deep(.el-input__inner){
		border: 1px solid #C4C4C4B2;
		border-radius: 0.133333rem;
	}
	.chen p{
		font-size: 0.32rem;
		text-align: center;
		margin-top: 0.826667rem;
	}
</style>