<template>
	<div>
		<div @click="goback">
			<Pagetitle></Pagetitle>
		</div>
		<Background>
			<div slot='title'>发起转账</div>
			<div slot='content' class="chen">
			 <el-select v-model="value" placeholder="请选择"  @change="selectthis(value)">
				<el-option
				  v-for="item in options"
				  :label="item.label"
				  :value="item.label">
				</el-option>
			  </el-select>
			  <p>该应用尚未配置任何通道</p>
			</div>
		</Background>
	</div>
</template>

<script>
	import Background from '@/components/Background.vue'
	import Solttitle from '@/components/Solttitle.vue'
	import Pagetitle from '@/components/Pagetitle.vue'
	import {mchTransfers,mchApps} from '@/utils/merchant.js'
	export default{
		data(){
			return {
				options: [],
				value:''
			}
		},
		components:{
			Background,
			Pagetitle
		},
		created() {
			this.value = this.$route.query.appid
			mchTransfers(this.$route.query.appid).then(res=>{
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
		methods:{
			selectthis(n){
				let index1=n.indexOf('[')
				let index2=n.indexOf(']')
				let str=n.substring(index1+1,index2)
				mchTransfers(str).then(res=>{
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