<template>
	<div>
		<Moretitle>
			<template slot="tna">
			    商户中心
			</template>
		</Moretitle>
		<Background>
			<div slot='content' class="content">
				<el-form   status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item  prop="appId" >
					   <el-input type="text"  @keyup.enter.native="serchdata()" v-model="query" placeholder='输入应用APPID或应用名称'>
					       <el-button @click="serchdata()" slot="prepend" icon="el-icon-search"></el-button>
						   <el-select v-model="state" slot="append" placeholder='全部'>
					         <el-option
					           v-for="item in options"
					           :key="item.value"
					           :label="item.label"
					           :value="item.value">
					         </el-option>
					       </el-select>
					     </el-input>
				  </el-form-item>
				  
				  <!-- <el-form-item prop="appName">
				    <el-input  type="text" v-model="myfrom.appName" placeholder='输入应用名称'></el-input>
				  </el-form-item> -->
				  <!-- <el-form-item prop="state">
				    <el-select v-model="myfrom.state" placeholder="应用状态">
				        <el-option
				          v-for="item in options"
				          :key="item.value"
				          :label="item.label"
				          :value="item.value">
				        </el-option>
				    </el-select>
				  </el-form-item> -->
				  <!-- <el-form-item>
				    <el-button type="primary" @click="serchcoed()">查询</el-button>
				    <el-button @click="resetForm()">重置</el-button>
					<el-button type="primary" @click="gonewlybuild">新建</el-button>
				  </el-form-item> -->
				</el-form>
				<div class="puls" @click="gonewlybuild">
					<img src="@/assets/images/plus.png" alt="">
				</div>
			</div>
		</Background>
		<Tabledata :tabledatas='tabledatas'></Tabledata>
		<router-view></router-view>
		<Foot></Foot>
	</div>
</template>

<script>
	import Moretitle from '@/components/Moretitle.vue'
	import Background from '@/components/Background.vue'
	import Tabledata from '@/components/merchant/Indextable.vue'
	import {mchApps} from '@/utils/merchant.js'
	import Foot from '@/components/Foot.vue'
	export default{
		components:{
			Background,
			Tabledata,
			Moretitle,
			Foot
		},
		 data() {
		     
		      return {
			  options: [{
				value: 0,
				label: '禁用'
			  }, {
				value: 1,
				label: '启用'
			  }],
		      state:null,
			   query:'',
			   tabledatas:[]
		      }
		    },
			
		    methods: {
		      submitForm(formName) {
		        console.log(123)
		      },
		      // resetForm() {
		      //  Object.assign(this.$data.myfrom,this.$options.data().myfrom)
		      // },
			  gonewlybuild(){
				  this.$router.push('/merchant/newlybuild')
			  },
			  // 查询
			  serchdata(){
				  mchApps({'query':this.query}).then(res=>{
					  console.log(res.data.data.records)
					  this.tabledatas=res.data.data.records
				  })
			  }
		    },
			watch:{
				state(n){
					mchApps({'state':n}).then(res=>{
						  console.log(res.data.data.records)
						  this.tabledatas=res.data.data.records
					})
				}
			}
	}
</script>

<style scoped>
	
	.el-form{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		align-items: center;
	}
	.el-form-item{
		width: 100%;
		display: flex;
		justify-content: left;
	}
	:deep(.el-form-item__content){
		margin-left: 0 !important;
		width: 100%;
	}
	/* :deep(.el-input--suffix .el-input__inner){
		padding-right: 0 !important;
	}*/
	:deep(.el-input__inner){
		/* width: 80%; */
		background-color: #EBEBEB;
	} 
	.el-table{
		 display: block;
		 overflow-x: auto;
	}
	.content{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.demo-ruleForm{
		width: 85%;
		height:1.066667rem;
		display: flex;
		align-items: center;
	}
	.puls img{
		width: 0.64rem;
	}
 :deep(.el-select .el-input){
    width:1.8rem;
  }
  :deep(.el-input-group__prepend button.el-button){
	  width: 13px;
  }
  :deep(.el-input-group__append) {
    background-color: white;
  }
  :deep(.el-input-group__prepend) {
    background-color: #EBEBEB;
	padding-right: 0px;
  }
   :deep(.el-input__inner){
	  border:1px solid #EBEBEB;
  }
  :deep(.el-input-group__append, .el-input-group__prepend){
	  border-color:#EBEBEB;
  }
	
</style>