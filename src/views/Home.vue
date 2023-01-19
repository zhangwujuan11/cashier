<template>
  <div class="home">
	  <!-- @touchstart.capture="touchStart" @touchend.capture="touchEnd" -->
	  <Solttitle  :username="username"></Solttitle>
	  <!-- <Saidmenu></Saidmenu> -->
   <!-- <div class="information">
   	<div class="informationLeft">
		<img src="@/assets/images/ellipse.png">
		<div>Hello，{{username}}商户 <br> <span>{{isAdmin}}</span></div>
	</div>
	<router-link  to="/information">
		<img @click="goinformation" class="diandian" src="@/assets/images/diandiandain.png">
	</router-link>
   </div> -->
   <Homelinechart  ref="child"></Homelinechart> 
   <Oldmenu></Oldmenu>
   <div class="viewheight information">
	   <div>
	   	   <p>交易总金额</p>	
	   	   <p class="maoney">￥{{numCount.totalAmount}}</p>
	   </div>
	   <div>
	   	   <p>交易总笔数 </p>
	   	   <p class="maoney">{{numCount.totalCount}}笔</p>
	   </div>
	</div>   
	   
	   
	  <div class="information">
	  	 <p class="title">今日交易金额</p>
	  	 <p><span class="maoney" style="color: #FF8717;">￥{{homedata.todayAmount}}</span> </p>
		 <p>共{{homedata.todayPayCount}}笔</p>
	  	 <h4 class="border"></h4>
	  	 <p class="tadyaf"><span>昨日交易金额：￥{{homedata.yesterdayAmount}}</span> <span>近七天交易金额：￥{{homedata.payWeek}}</span></p>
	  </div>
	  <Paydata></Paydata>
  <router-view></router-view>
  <Foot></Foot>
  
  <!-- 商户信息录入 -->
  <!-- <Mchinfo v-if="dialogVisible"></Mchinfo> -->
	
	
	
	
    <!-- <vue-qr v-if="!sshoww" :logoSrc="imageUrl" :text="qrurl" :size="300"></vue-qr> -->
  	<div class="tableform">
  	  <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  		  <el-form-item label="商户名" prop="mchName">
  		    <el-input  v-model="ruleForm.mchName" placeholder="输入商户名"></el-input>
  		  </el-form-item>
  		  <el-form-item label="码牌ID" prop="id">
  		    <el-input v-model="ruleForm.id" placeholder="输入码牌ID"></el-input>
  		  </el-form-item>
  	    <el-form-item label="商户号" prop="mid">
  	      <el-input v-model="ruleForm.mid" placeholder="输入商户号"></el-input>
  	    </el-form-item>
  		<el-form-item label="终端号" prop="tid">
  		  <el-input v-model="ruleForm.tid" placeholder="输入终端号"></el-input>
  		</el-form-item>
  		<el-form-item label="商户LOGO" prop="mchLogo">
  		  <el-input v-model="ruleForm.mchLogo"></el-input>
  		</el-form-item>
  		<p class="borderline"></p>
  		<el-form-item label="支付倒计时(s)" prop="expireTime">
  		  <el-input v-model="ruleForm.expireTime" type="number"></el-input>
  		</el-form-item>
  		<el-form-item
  		    v-for="(deviceId, index) in ruleForm.deviceIds"
  		    :label="'音响ID' + (index + 1)"
  		    :key="deviceId.index"
  			:prop="'deviceIds.' + index + '.value'"
  			class="additem"
  		  >
  		   <p class="seridpbox">
  			   <el-input v-model="deviceId.value"></el-input>
  			   <el-button @click.prevent="removeDomain(deviceId)">删除</el-button>
  		   </p> 
  		</el-form-item>
  		  <p style="width: 100%;text-align: center;margin-bottom: 15px;color: #409EFF;font-size: 14px;" @click="addDomain">
  			 <i class="el-icon-plus"></i> 新增音响ID
  		  </p>
  		  <el-form-item label="支付后通知">
  		  	<el-checkbox-group v-model="ruleForm.payNotifySelect">
  		  	    <el-checkbox label="1">氢信公众号通知</el-checkbox>
  				<el-checkbox label="2">氢信企业版机器人</el-checkbox>
  		  	    <el-checkbox label="3">商户短信通知</el-checkbox>
  		  	</el-checkbox-group>
  		  </el-form-item>
  		  <el-form-item v-if="telshow" label="接收短信手机">
  		  	<el-input  v-model="ruleForm.phone"  placeholder="输入手机号"></el-input>
  		  </el-form-item>
  		  <el-form-item class="bottmtext" label="支付前的页面底部定义">
  		  	<el-checkbox-group v-model="beforetext">
  		  	    <el-checkbox label="1">附加文本</el-checkbox>
  		  	</el-checkbox-group>
  		  </el-form-item>
  		  <el-input style="margin-bottom: 10px;" placeholder="输入文本" v-if="beforetext == '1'" v-model="ruleForm.payBeforeText" ></el-input>
  		  <el-form-item label="支付中">
  		  	<el-checkbox-group style="text-align: right;" v-model="ruleForm.isPayFailNotify">
  		  	    <el-checkbox label="true">支付失败提醒</el-checkbox>
  		  	</el-checkbox-group>
  		  </el-form-item>
  		  <p class="borderline"></p>
  		  <img class="kuakejishu" src="@/assets/images/kuakejishu.png" alt="">
  		   <p class="borderline"></p>
  		   <p class="kuakejishubox">
  			    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
  		   </p>
  		   <p class="borderline"></p>
  	  </el-form> -->
  	</div>
  </div>
  
  </div>
</template>

<script>
import Solttitle from '@/components/Solttitle.vue'
// import Saidmenu from '@/components/Index.vue'
import Homelinechart from '@/components/homeh/Homelinechart.vue'
import Oldmenu from '@/components/homeh/Oldmenu.vue'
import Foot from '@/components/Foot.vue'
import Paydata from '@/components/homeh/Paydata.vue'
// import Mchinfo from '@/components/homeh/Mchinfo.vue'


import { payAmountWeek,numCount,isAdmin } from '@/utils/home.js'
import {authorities,isinfodata,sheapply,interyunshan} from '@/utils/login.js'
import {iToken} from '@/utils/home.js'
export default {
	inject:["reload"],
  name: 'Home',
  components: {
	 // Saidmenu,
	 Solttitle,
	 Homelinechart,
	 Oldmenu,
	 Foot,
	 Paydata,
	 // Mchinfo
  },
  data(){
	  return {
		  echartdata:false,
		  homedata:{
			  todayAmount:'',
			  todayPayCount:''
		  },
		  numCount:{},
		  username:"",
		  isAdmin:'',
		  dialogVisible:false,
		  rulFrom:{
			 "merchantCode":'',
			 "terminalCode":'',
			 "mid":'',
			 "tid":''
		  },
		 rules: {
			merchantCode: [
			  { required: true, message: '请输入商户号',  trigger: 'blur'  }
			],
			terminalCode: [
			  { required: true, message: '请输入终端号',  trigger: 'blur'  }
			],
			mid: [
			  { required: true, message: '请输入商户号',  trigger: 'blur'  }
			],
			tid: [
			  { required: true, message: '请输入终端号',  trigger: 'blur'  }
			],
		  }
	  }
  },
  created() {
	  // 临时数据
	  // this.$router.push({
	  // 	query:{
	  // 		"adminUsername":'admin123', 
	  // 		"orgId":"68479875", 
	  // 		"token":'bc490415-2d97-4e5f-98a3-7a022a0eb4bc'
	  // 	}
	  // })
	 localStorage.setItem('userinfo',JSON.stringify(this.$route.query))
	 authorities(this.$route.query.token).then(res=>{
	 		localStorage.setItem('username',JSON.stringify(res.data.name))
			this.username=res.data.name
			// 进入云商
	 		interyunshan({
	 			"adminUsername":this.$route.query.adminUsername,
	 			"orgId":this.$route.query.orgId, 
	 			"username":res.data.name,
	 		}).then(data=>{
				// 是否储存商户信息，mid,tid……
				// mchpay_info(res.data.name).then(mcn_info=>{
				// 	if(mcn_info.data.data.length == 0){
				// 		this.dialogVisible=true
				// 	}else{
				// 		// console.log(mcn_info.data.data[0])
				// 		localStorage.setItem("mchtiddata",JSON.stringify(mcn_info.data.data[0]))
				// 		this.dialogVisible=false
				// 	}
				// })
	 			// isinfodata({
	 			// 	"username": res.data.name,
	 			// 	"orgId":this.$route.query.orgId, 
	 			// }).then(info=>{
	 			// 	if(info.data.data.type == 'USER'){
	 			// 		this.isadmin=1
	 			// 	}else{
	 			// 		this.isadmin=info.data.data.data.activationState
	 			// 	}
	 				
	 			// })
				iToken().then(res=>{
					localStorage.setItem('iToken',JSON.stringify(res.data.data.iToken))
					// 图标数据加载
					this.$refs.child.changeRecent(6);
					payAmountWeek().then(ress=>{
						this.homedata=ress.data.data
					})
					numCount().then(resss=>{
						this.numCount=resss.data.data
					})
				})
	 		})
	 	}) 
	
	// isAdmin().then(res=>{
	// 	if(res.data.data.isAdmin==0){
	// 		this.isAdmin='普通成员'
	// 	}else if(res.data.data.isAdmin==1){
	// 		this.isAdmin='超级管理员'
	// 	}
	// })
  },
  methods:{
	goinformation(){
		this.$router.push({name:'information'})
	},
	mchinfo(){
		console.log(456789)
		this.dialogVisible=true
	},
	//滑动开始
	// touchStart(e) {
	//   // 记录初始位置
	//   this.startX = e.touches[0].clientX;
	// },
	// //滑动结束
	// touchEnd(e) {
	//   // 当前滑动的父级元素
	//   let parentElement = e.currentTarget.parentElement;
	//   // 记录结束位置
	//   this.endX = e.changedTouches[0].clientX;
	//   // 右滑大于30距离删除出现
	//   if ( this.startX - this.endX < -100) {
	// 	this.$store.state.menushow =true
	// 	parentElement.dataset.type = 0;
	//   }else{
	// 	  this.$store.state.menushow = false
	//   }
	//   this.startX = 0;
	//   this.endX = 0;
	// },
	mchinfo(formName){
		this.$refs[formName].validate((valid) => {
		  if (valid) {
			alert('submit!');
		  } else {
			console.log('error submit!!');
			return false;
		  }
		});
	  }
	
  }
}
</script>
<style scoped>
	.home{
		display: flex;
		width: 100%;
		justify-content: center;
		flex-wrap: wrap;
	}
	.information{
		width:8.8rem;
		background-color: white;
		border-radius: 0.266667rem;
		padding:0.32rem 0.4rem 0.48rem 0.4rem;
		font-size: 0.426667rem;
		display: flex;
		justify-content: space-between;
		margin-top: 0.533333rem;
		box-sizing: border-box;
		flex-wrap: wrap;
	}
	.informationLeft{
		display: flex;
		align-items: center;
	}
	.informationLeft img{
		width: 1.333333rem;
		height: 1.333333rem;
		border-radius: 50%;
		margin-right: 0.266667rem;
	}
	.informationLeft span{
		font-size: 0.266667rem;
		line-height: 0.586667rem;
	}
	.diandian{
		width:0.64rem;
		height: 0.64rem;
	}
	.information p{
		width: 100%;
		font-size: 0.32rem;
		margin-top: 0.266667rem;
		text-align: center;
	}
	.maoney{
		font-size: 0.533333rem !important;
		margin-right: 0.266667rem;
	}
	.border{
		border-top: 1px solid #C4C4C480;
		width: 100%;
		margin-top: 1.013333rem;
	}
	.tadyaf{
		display: flex;
		justify-content: space-between;
		margin-top: 0.24rem;
	}
	.viewheight{
		margin-bottom: 0.32rem;
	}
	.viewheight div{
		width: calc(50% - 1px);
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.viewheight div:first-child{
		border-right: 1px solid rgba(0, 0, 0, 0.08);
	}
	.viewheight div p{
		text-align: center;
	}
	.chenpp{
		margin-bottom: 10px;
		margin-top: 10px;
	}
</style>