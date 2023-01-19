	<template>
		<div class="bodbox">
			<div class="title" :style="{'margin-top':phoneheight}">
				<i class="el-icon-arrow-left"></i>
				顶顶收银C扫B进场配置
			</div>
	      <!-- <vue-qr v-if="!sshoww" :logoSrc="imageUrl" :text="qrurl" :size="300"></vue-qr> -->
			<div class="tableform">
			  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
					    <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
				   </p>
				   <p class="borderline"></p>
			  </el-form>
			</div>
		</div>
	</template>
	
	<script>
		import {levitas,resetlevtas} from '@/utils/login.js'
		export default{
				data() {
					return {
						changdeid:'',
						sshoww:true,
						phoneheight: localStorage.getItem('phonetopheight'),
						imageUrl: require("@/assets/images/logo.png"),
						qrurl:'',
						ttru:false,
						beforetext:'',
						ruleForm: {
							mid:'',
							tid:'',
							mchName:'',
							id:'',
							expireTime:30,
							deviceIds:[{
								value:''
							}],
							payNotifySelect:[''],
							isPayFailNotify:true,
							phone:''
						},
					  rules: {
							  mid: [
								{ required: true, message: '请输入商户号', trigger: 'blur' },
							  ],
							  tid: [
								{ required: true, message: '请输入终端号', trigger: 'blur' }
							  ],
							  mchName:[
								  { required: true, message: '请输入商户名称', trigger: 'blur' }
							  ]
							},
							tel:'',
							telshow:false
					}
				},
			created() {
				console.log(returnCitySN.cip)
			},
			methods:{
				formatDate(objDate,fmt){
				　　var o = {
				　　　　"M+" : objDate.getMonth()+1, //月份
				　　　　"d+" : objDate.getDate(), //日
				　　　　"h+" : objDate.getHours()%12 == 0 ? 12 : objDate.getHours()%12, //小时
				　　　　"H+" : objDate.getHours(), //小时
				　　　　"m+" : objDate.getMinutes(), //分
				　　　　"s+" : objDate.getSeconds(), //秒
				　　　　"q+" : Math.floor((objDate.getMonth()+3)/3), //季度
				　　　　"S"  : objDate.getMilliseconds() //毫秒
				　　};
				　　if(/(y+)/.test(fmt))
				　　　　fmt=fmt.replace(RegExp.$1, (objDate.getFullYear()+"").substr(4 - RegExp.$1.length));
				　　for(var k in o)
				　　　　if(new RegExp("("+ k +")").test(fmt))
				　　fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
				　　return fmt;
				},
				
				submitForm(formName) {
				        this.$refs[formName].validate((valid) => {
				          if (valid) {
							  this.ruleForm.createTime=this.formatDate(new Date(),"yyyy-MM-dd HH:mm:ss")
				            resetlevtas(this.ruleForm).then(res=>{
								this.$message.success('商户信息修改成功')
							}).catch(err=>{
								this.$message.error(err.response.data.error)
							})
				          } else {
				            console.log('error submit!!');
				            return false;
				          }
				        });
				      },
				  
				  needid(){
					  levitas(this.changdeid).then(res=>{
						  if(res.data.data.length == 0){
							  this.$message.error('未查询到商户信息')
						  }else if(res.data.data.length == 1){
							  this.ruleForm=res.data.data[0]
							  this.sshoww=false
						  }
					  })
				  },
			  // 增加设备
			   addDomain() {
			  				   for(var i=0;i<this.ruleForm.deviceIds.length;i++){
			  				   		this.ttru =Boolean(this.ruleForm.deviceIds[i].value != '') 
			  				   }
			  				   if(this.ttru){
			  				   	   this.ruleForm.deviceIds.push({
			  				   		 value: ''
			  				   	   });
			  				   }
			  			},
			// 删除设备
			removeDomain(item) {
					var index = this.ruleForm.deviceIds.indexOf(item)
					if (index !== -1) {
					  this.ruleForm.deviceIds.splice(index, 1)
					  
					}
			}
			},
			watch:{
				"ruleForm.payNotifySelect"(val){
				if(val.includes("3")){
					this.telshow=true
				}else{
					this.telshow=false
				}
				}
				
			}
		}
	</script>
<style>
	.qrcode{
	  display:inline-block;
	  position:relative;
	  margin-top: .2rem;
	}
	.logoimg{
	    position:absolute;
	    left:50%;
	    top:50%;
	    width:60px;
	    height:60px;
	    margin-top:-30px;
	    margin-left:-30px;
	}
	.bodbox{
		width: 100%;
		padding-top: 20px;
		display: flex;
		flex-direction: column;
		background-color: white;
		align-items: center;
	}
	.title {
		font-size: 16px;
		width: 100%;
		height: 0.933333rem;
		background-color: white;
		line-height: 0.933333rem;
		text-indent: 0.266667rem;
		margin-bottom: 0.4rem;
		font-weight: bold;
	}
	.bodbox .tableform{
		width: 8.8rem;
	}
	.el-form-item__content{
		width: 60%;
		margin-left: 80px !important;
	}
	.el-form-item{
		display: flex;
		justify-content: space-between;
	}
	.seridpbox{
		width: 100%;
		display:flex;
		align-items: center;
		justify-content: space-between;
		/* flex-direction: column; */
	}
	.additem .el-form-item__content{
		margin-left: 20px !important;
	}
	.additem .el-form-item__label{
		width: 2rem;
	}
	.seridpbox .el-input__inner{
		width:90%;
	}
	.el-form-item__label{
		width:3.5rem !important;
	}
	.borderline{
		width: 100%;
		border: none;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		margin-bottom: 0.426667rem;
	}
	.bottmtext .el-form-item__label{
		width: 8rem !important;
	}
	.bottmtext{
		margin-bottom: 0;
	}
	.kuakejishu{
		width: 100%;
		margin-bottom: 15px;
	}
	.kuakejishubox{
		width: 100%;
		text-align: center;
		padding-bottom: 15px;
	}
</style>

