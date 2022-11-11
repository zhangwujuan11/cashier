<template>
	<div>
		<Solttitle></Solttitle>
		<Saidmenu></Saidmenu>
		<Background>
			<div slot='title'>收款账号管理 > 新建</div>
			<div slot='content' class="chen">
				<p>绑定分账接收者账号</p>
				<p>当前应用：<span class="tips">111[62512e28e4b05076b7016a6]</span> </p>
				<p>
					选择要加入到的账号分组：<br>
					<el-select v-model="value" placeholder="应用状态">
					   <el-option
					     v-for="item in Paymentmethod"
					     :key="item.value"
					     :label="item.label"
					     :value="item.value">
					   </el-option>
					 </el-select>
				</p>
				<el-button>取消</el-button>
				<el-button type="primary">发起绑定请求</el-button>
			</div>
		</Background>
	</div>
</template>

<script>
	import Solttitle from '@/components/Solttitle.vue'
	import Saidmenu from '@/components/Saidmenu.vue'
	import Background from '@/components/Background.vue'
	export default{
		data(){
			return {
				Paymentmethod:[
					{
						value:'1',
						label:'状态1'
					},
					{
						value:'2',
						label:'状态2'
					},
					{
						value:'3',
						label:'状态3'
					}
				],
				value:''
			}
		},
		components:{
			Background,
			Saidmenu,
			Solttitle
		},
		methods:{
			submitForm(formName) {
			  this.$refs[formName].validate((valid) => {
			           if (valid) {
			             alert('submit!');
			           } else {
			             console.log('error submit!!');
			             return false;
			           }
			         });
			},
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
	.chen p{
		font-size: 0.32rem;
		margin-bottom: 0.4rem;
	}
	.tips{
		color: #E56C6C;
	}
	.el-select{
		margin-top: 0.4rem;
	}
</style>