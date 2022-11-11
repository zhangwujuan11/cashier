<template>
	<div>
		<Solttitle></Solttitle>
		<Saidmenu></Saidmenu>
		<div class="account">
			<Background>
				<div slot="title">分账记录</div>
				<div slot='content'>
					<el-form :model="ruleForm"  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
					  <el-form-item  prop="pass">
					    <el-input type="text" v-model="ruleForm.pass" placeholder='开始日期      -     结束日期'></el-input>
					  </el-form-item>
					  <el-form-item >
					    <el-input  type="text" v-model="ruleForm.checkPass" placeholder='分账接受者ID'></el-input>
					  </el-form-item>
					  <el-form-item >
					    <el-input  type="text" v-model="ruleForm.checkPass" placeholder='分账账号组ID'></el-input>
					  </el-form-item>
					  <el-form-item>
					    <el-input  type="text" v-model="ruleForm.checkPass" placeholder='应用APPID'></el-input>
					  </el-form-item>
					  <el-form-item >
					    <el-input  type="text" v-model="ruleForm.checkPass" placeholder='支付订单号'></el-input>
					  </el-form-item>
					  <el-form-item >
					    <el-input  type="text" v-model="ruleForm.checkPass" placeholder='分账接收账号'></el-input>
					  </el-form-item>
					  
					  <el-form-item>
					     <el-select v-model="value" placeholder="分账状态">
					        <el-option
					          v-for="item in Paymentmethod"
					          :key="item.value"
					          :label="item.label"
					          :value="item.value">
					        </el-option>
					      </el-select>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
					    <el-button @click="resetForm('ruleForm')">重置</el-button>
					  </el-form-item>
					</el-form>
				</div>
			</Background>
			<Tabledata></Tabledata>
		</div>
	</div>
</template>

<script>
	import Solttitle from '@/components/Solttitle.vue'
	import Saidmenu from '@/components/Saidmenu.vue'
	import Background from '@/components/Background.vue'
	import Tabledata from '@/components/ledgermanagement/Indextable.vue'
  export default {
    data() {
      return {
		ruleForm: {
		    pass: '',
		    checkPass: '',
		    age: '',
			region:''
		  },
		   Paymentmethod: [{
		            value: '选项1',
		            label: '黄金糕'
		          }, {
		            value: '选项2',
		            label: '双皮奶'
		          }, {
		            value: '选项3',
		            label: '蚵仔煎'
		          }, {
		            value: '选项4',
		            label: '龙须面'
		          }, {
		            value: '选项5',
		            label: '北京烤鸭'
		          }],
		          value: ''
		}
    },
	components:{
		Saidmenu,
		Solttitle,
		Background,
		Tabledata,
	},
    methods: {
     submitForm(formName) {
       console.log(123)
     },
     resetForm(formName) {
       console.log(123)
     },
	  gohome(){
		  this.$router.push("/home")
	  }
    }
  }
</script>

<style scoped>
	.el-select{
		width: 100%;
	}
	.el-form{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.el-form-item{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	:deep(.el-form-item__content){
		margin-left: 0 !important;
	}
	:deep(.el-input--suffix .el-input__inner){
		padding-right: 0.4rem !important;
	}
	:deep(.el-input__inner){
		width: 5.333333rem;
	}
	.el-table{
		 display: block;
		 overflow-x: auto;
	}
	
	
</style>