<template>
	<div>
			<el-form :model="ruleForm" ref="ruleForm"  class="demo-ruleForm">
				<p class="btoc">
					<el-form-item label="商户:" >
						<el-select
						   v-model="valuett"
						   filterable
						   placeholder="请输入商户名/终端号"
						   @change="activ()"
						>
						   <el-option
								v-for="(item,index) in options"
								:key="index"
								:label="item.mchName + '(' + item.tid + ')'"
								:value="item.id">
						   </el-option>
						 </el-select>
					 </el-form-item>
				</p>
				<p class="btoc">
					<el-form-item label="码牌:">
						<el-select
						   v-model="ruleForm.id"
						   filterable
						   value-key=""
						   :placeholder="placeholders"
						   >
						   <el-option
								v-for="(item,index) in ccdatas"
								:key="index"
								:label="item.ccName+ '(' + item.id + ')'"
								:value="item.id">
						   </el-option>
						 </el-select>
					</el-form-item>
				 </p>
				 <p class="btoc">
				 <el-form-item label="所属商户:" prop="isv">
				 <el-select v-model="ruleForm.isvNo" filterable placeholder="请输入商户名/终端号/手机号">
				 	<el-option v-for="(item,index) in isvs" :key="index" :label="item.isv_name"
				 		:value="item.isv_no">
				 	</el-option>
				 </el-select>
				 </el-form-item>
				 </p>
				<!-- <el-form-item label="商户LOGO" prop="mchLogo">
				  <el-input v-model="ruleForm.mchLogo"></el-input>
				</el-form-item> -->
				
				<el-form-item label="支付倒计时(s)" prop="expireTime">
				  <el-input v-model="ruleForm.expireTime" type="number"></el-input>
				</el-form-item>
				<p class="borderline"></p>
				<el-form-item label="支付后通知">
					<el-checkbox-group v-model="ruleForm.payNotifySelect">
					    <el-checkbox label="1">氢信公众号通知</el-checkbox>
						<el-checkbox label="2">氢信企业版机器人</el-checkbox>
					    <el-checkbox label="3">商户短信通知</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item class="bottmtext" label="支付前的页面底部定义">
					<!-- <el-checkbox-group v-model="beforetext"> -->
					    <el-checkbox  v-model="beforetext">附加文本</el-checkbox>
					<!-- </el-checkbox-group> -->
				</el-form-item>
				<el-input style="margin-bottom: 10px;width: 90%;" placeholder="输入文本" v-if="beforetext" v-model="ruleForm.payBeforeText" ></el-input>
				<el-form-item label="支付中">
					<!-- <el-checkbox-group style="text-align: right;" v-model="ruleForm.isPayFailNotify"> -->
					    <el-checkbox v-model="isPayFailNotify">支付失败提醒</el-checkbox>
					<!-- </el-checkbox-group> -->
				</el-form-item>
				<!-- 音箱 -->
				<div class="tctc">
					<el-form-item
					    v-for="(deviceId, index) in ruleForm.deviceIds"
					    :label="'音响ID' + (index + 1)"
					    :key="index"
						:prop="'deviceIds.' + index + '.value'"
						class="additem"
					  >
					   <p class="seridpbox">
						   <!-- <el-input v-model="deviceId.value"></el-input> -->
						   <el-select
						      v-model="deviceId.value"
						      filterable
						      placeholder="音箱名称/ID"
							  value-key="deviceId"
						      >
						      <el-option
						   		v-for="(item,index) in tcinfodata"
						   		:key="item.deviceId"
						   		:label="item.tcName + '(' + item.deviceId + ')'"
						   		:value="item">
						      </el-option>
						    </el-select>
						   <el-button style="margin-left: 5px;" type="danger" @click.prevent="removeDomain(deviceId)">删除</el-button>
					   </p> 
					</el-form-item>
					  <p style="width: 100%;text-align: center;margin-bottom: 15px;color: #409EFF;font-size: 14px;" @click="addDomain">
						 <i class="el-icon-plus"></i> 新增音响ID
					  </p>
				</div>
			</el-form>
			<div class="ables" v-if="ables">
				<p>商户名:{{changeinfo.mchName}}</p>
				<p>商户号:{{changeinfo.mid}}</p>
				<p>终端号:{{changeinfo.tid}}</p>
				<p>手机号:{{changeinfo.phone | phonepass}}</p>
				<div class="verification">
					{{changeinfo.phone | phonepass}}
					<el-button v-if="timerTf" class="sengbtn" type="primary" @click="receiveCode">
						{{ countDown }}
					</el-button>
					<el-button v-else class="sengbtn" type="primary" disabled>
						{{ countDownNum }} 秒后重新获取
					</el-button>
				</div>
				<p class="phoneclass">
					<el-input type="number" v-model="input" placeholder="请输入短信验证码"></el-input>
				</p>
				<el-button @click="subfrom" class="subable" type="primary" :disabled="!input != ''">{{subtext}}</el-button>
			</div>
			<!-- <img class="kuakejishu" src="@/assets/images/kuakejishu.png" alt=""> -->
	</div>
	
</template>

<script>
	import {mahinfoserch,mahinfodata,sendverdata,tcinfoserchdata,ccinfoserchall,tctc,isvc} from '@/utils/mchinfo.js'
	import {levcreat,mchpay_infoinit,levitastid,resetlevtas,mchpay_infoset,tctcset,levitastidd} from '@/utils/login.js'
	 export default {
		 filters:{
			 phonepass(val){
				  if(val){
				         return (val.substring(3, 0)) + '****' + (val.substring(7));
				       }

			 }
		 },
	    data() {
	      return {
			isvs: [],
			placeholders:"码牌名称/码牌ID",
			ables:false,
			tcinfodata:[],//在用音箱
			ccdatas:[],//在用码牌
			beforetext:false,
			isPayFailNotify:true,
			ruleForm: {
				mchName:'',
				id:'',
				expireTime:30,
				deviceIds:[{
					value:''
				}],
				payNotifySelect:[],
				// isPayFailNotify:true,
				phone:''
			},
			activeName: 'first',
	        options: [],
	        valuett: null,
			changeinfo:{},
			countDown: "发送验证码", // 倒计时
			timerTf:true,
			countDownNum: 60,
			subable:true,
			input:'',
			phonedata:'123',
			ttru:false,
			username:JSON.parse(localStorage.getItem("username")),
			subtext:'确认修改',
			havedata:false
	      }
	    },
	    mounted() {
			// 商户号
		  mahinfoserch('2').then(res=>{
			  let reg=res.data.data
				this.options=res.data.data
		  })
		  // 音箱
		  tcinfoserchdata().then(res=>{
			  this.tcinfodata=res.data.data
		  })
		  //码牌
		  ccinfoserchall().then(res=>{
			  this.ccdatas=res.data.data
			  for(var i=0;i<this.ccdatas.length;i++){
				 this.ccdatas[i].id=String(this.ccdatas[i].id)
			  }
		  })
		  // 所属服务商
		  isvc().then(res => {
		  	this.isvs = res.data.data
		  })
		  
		 // 是否有值,回显
		 this.$nextTick(()=>{
				levitastidd({
					"channelId":'2',
					"username":this.username
				}).then(res=>{
					if(res.data.data.length != 0){
						this.havedata=true
						if(res.data.data[0].payBeforeText != null){
							  this.beforetext=true
						  }
						// console.log(res.data.data)
						let def=this.options.find((item) => item.tid == res.data.data[0].tid)
						this.valuett=def.id
						this.activ()
						let obj={
							"expireTime":res.data.data[0].expireTime,
							"id":res.data.data[0].id,
							"payBeforeText":res.data.data[0].payBeforeText,
							"payNotifySelect":JSON.parse(res.data.data[0].payNotifySelect),
							"deviceIds":[],
							"isvNo":res.data.data[0].isvNo
						  }
						  let dev=JSON.parse(res.data.data[0].deviceIds)
						   for(var i=0;i<dev.length;i++){
						  	obj.deviceIds.push({
						  	value:{
						  		deviceId:dev[i]
						  	}
						  })
						}
						this.ruleForm=obj
					}else{
						this.subtext="提交"
						this.havedata=false
					}
				})
				  // levitastid({
					 //  tid:this.tid,
					 //  username:this.username
					 //  }).then(res=>{
						//   if(res.data.data[0].payBeforeText != null){
						// 	  this.beforetext=true
						//   }
						// let def=this.options.find((item) => item.tid == res.data.data[0].tid)
						// this.valuett=def.id
						// this.activ()
						//   let obj={
						// 	"expireTime":res.data.data[0].expireTime,
						// 	"id":res.data.data[0].id,
						// 	"payBeforeText":res.data.data[0].payBeforeText,
						// 	"payNotifySelect":JSON.parse(res.data.data[0].payNotifySelect),
						// 	"deviceIds":[]
						//   }
						//   let dev=JSON.parse(res.data.data[0].deviceIds)
						//    for(var i=0;i<dev.length;i++){
						//   	obj.deviceIds.push({
						//   	value:{
						//   		deviceId:dev[i]
						//   	}
						//   })
						//    } 
					 //    this.ruleForm=obj
						// this.subtext="确认修改"
				  // })
		 })
	    },
	    methods: {
			activ(){
				if(this.valuett != ''){
					let def=this.options.find((item) => item.id == this.valuett)
					// console.log(def) 
					mahinfodata({"mchName":def.mchName,"tid":def.tid}).then(res=>{
					let chang=JSON.stringify(res.data.data[0])
					this.changeinfo=JSON.parse(chang)
					this.ables=true
					})
				}
				this.$forceUpdate()
			},
			// 短信验证
			receiveCode() {
					  sendverdata(this.changeinfo.phone).then(res=>{
						  // console.log(res.data.data)
						  this.phonedata=res.data.data
					  })
			              this.timerTf = false
			              this.countDownNum = 60
			              this.timer = setInterval(() => {
			                this.countDownNum--
			                if (this.countDownNum <= -1) {
			                  this.timerTf = true
			                  this.clearTime()
			                }
			              }, 1000) 
			        // }
			      // })
			    },
			 clearTime() {
				  this.timerTf = true
				  clearInterval(this.timer)
				},
				
				formatDate(objDate,fmt){
				　　var o = {
				　　　　"M+" : objDate.getMonth()+1, //月份
				　　　　"d+" : objDate.getDate(), //日
				　　　　"h+" : objDate.getHours()%12 == 0 ? 12 : objDate.getHours()%12, //小时
				　　　　"H+" : objDate.getHours(), //小时
				　　　　"m+" : objDate.getMinutes(), //分
				　　　　"s+" : objDate.getSeconds(), //秒
				　　　　"q+" : Math.floor((objDate.getMonth()+3)/3), //季度
				　　　　"S" : objDate.getMilliseconds() //毫秒
				　　};
				　　if(/(y+)/.test(fmt))
				　　　　fmt=fmt.replace(RegExp.$1, (objDate.getFullYear()+"").substr(4 - RegExp.$1.length));
				　　for(var k in o)
				　　　　if(new RegExp("("+ k +")").test(fmt))
				　　fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
				　　return fmt;
				},
				
				
				
			// 手机验证，保存信息
			subfrom(){
				if(this.input == this.phonedata){
					let arrayid=[]
					for(var i=0;i<this.ruleForm.deviceIds.length;i++){
						arrayid.push(this.ruleForm.deviceIds[i].value.deviceId)
					}
					let obj={
						"createTime":this.formatDate(new Date(),"yyyy-MM-dd HH:mm:ss"),
						"deviceIds":JSON.stringify(arrayid),
						"expireTime":this.ruleForm.expireTime,
						"id":this.ruleForm.id,
						"isPayFailNotify":this.isPayFailNotify,
						"mchName":this.changeinfo.mchName,
						"mid":this.changeinfo.mid,
						"payBeforeText":this.ruleForm.payBeforeText,
						"payNotifySelect":JSON.stringify(this.ruleForm.payNotifySelect),
						"phone":this.changeinfo.phone,
						"tid":this.changeinfo.tid,
						"username":JSON.parse(localStorage.getItem("username")),
						"channelId":'2',
						"isvNo":this.ruleForm.isvNo,
						"isDel":0
					}
					if(this.havedata){
						resetlevtas(obj).then(()=>{
							// 同步到商户音箱信息表
							for(var y=0;y<arrayid.length;y++){
								tctcset({
									"id":this.ruleForm.id,
									"deviceId":arrayid[y],
									"is_del":0
								})
							}
							this.$message.success('商户修改成功')
							this.$router.push('/home')
						}).catch(()=>{
							this.$message.error('绑定失败，请重试')
						})
					}else{
						levcreat(obj).then(()=>{
							// 同步到商户音箱信息表
							for(var y=0;y<arrayid.length;y++){
								tctc({
									"id":this.ruleForm.id,
									"deviceId":arrayid[y],
									"is_del":0
								})
							}
							this.$message.success('商户绑定成功')
							this.$router.push('/home')
						}).catch(()=>{
							this.$message.error('绑定失败，请重试')
						})
					}
					
					// if(this.merchantCode == null && this.tid == null){
					// 	//保存到levitas
					// 	  levcreat(obj).then(res=>{
					// 		//保存到levitas.mid,tid
					// 		mchpay_infoinit(objj).then(()=>{
					// 			// 同步到商户音箱信息表
					// 			for(var y=0;y<arrayid.length;y++){
					// 				tctc({
					// 					"id":this.ruleForm.id,
					// 					"deviceId":arrayid[y],
					// 					"is_del":0
					// 				})
					// 			}
					// 			this.$message.success("信息绑定成功")
					// 		})
					// 		this.$router.push("/home")
					// 	  }).catch(err=>{
					// 			this.$message.error(err.response.data.error)
					// 		})
					// }else{
					// 	resetlevtas(obj).then(()=>{
					// 		mchpay_infoset(objj).then(()=>{
					// 			// 同步到商户音箱信息表
					// 			for(var y=0;y<arrayid.length;y++){
					// 				tctcset({
					// 					"id":this.ruleForm.id,
					// 					"deviceId":arrayid[y],
					// 					"is_del":0
					// 				})
					// 			}
					// 			this.$message.success("信息修改成功")
					// 			this.$router.push("/home")
					// 		})
					// 	})
					// }
					
					
					
					
					
					
					
					
					
					// if(this.tid != null){
					// 	resetlevtas(obj).then(()=>{
					// 		mchpay_infoset(objj).then(()=>{
					// 			// 同步到商户音箱信息表
					// 			for(var y=0;y<arrayid.length;y++){
					// 				tctcset({
					// 					"id":this.ruleForm.id,
					// 					"deviceId":arrayid[y],
					// 					"is_del":0
					// 				})
					// 			}
					// 			this.$message.success("信息修改成功")
					// 			this.$router.push("/home")
					// 		})
					// 	})
					// }else{
					// 	levitastid({
					// 	  tid:this.tid,
					// 	  username:this.username
					// 	  }).then(data=>{
					// 		  if(data.data.data.length != 0){
					// 		  	this.$message.error('数据重复')
							  							  
					// 		  }else{
					// 			  // 保存到levitas
					// 			  levcreat(obj).then(res=>{
					// 			  	//保存到levitas.mid,tid
					// 			  	mchpay_infoinit(objj).then(()=>{
					// 			  		// 同步到商户音箱信息表
					// 			  		for(var y=0;y<arrayid.length;y++){
					// 			  			tctc({
					// 			  				"id":this.ruleForm.id,
					// 			  				"deviceId":arrayid[y],
					// 			  				"is_del":0
					// 			  			})
					// 			  		}
					// 			  		this.$message.success("信息绑定成功")
					// 			  	})
					// 			  	this.$router.push('/')
					// 			  }).catch(err=>{
					// 			  		this.$message.error(err.response.data.error)
					// 			  	})
					// 		  }
					// 	  })
					// }
					
				}else{
					this.$message.error('验证码输入错误！')
				}
			},
			
			// 增加设备
			 addDomain() {
				 // console.log(this.ruleForm.deviceIds)
				   for(var i=0;i<this.ruleForm.deviceIds.length;i++){
						this.ttru = Boolean(this.ruleForm.deviceIds[i].value != '') 
				   }
				   if(this.ttru || this.ruleForm.deviceIds.length==0){
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
			
	    }
	  }
</script>

<style scoped>
	.bodbox{
		position:fixed;
		left: 0;
		top: 0;
		width: 100%;
		background-color: white;
		height: 100%;
		overflow: scroll !important;
	}
	.bodbox .mch_title{
		width: 100%;
		font-size: 0.426667rem;
		text-align: center;
		margin-top: 20px;
	}
	/deep/.el-tabs__nav{
		width: 100% ;
	}
	/deep/.el-tabs__item{
		width: 50%;
		text-align: center;
		font-weight: bold;
	}
	.btoc{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.el-select{
		width: 90%;
	}
	.ables{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 15px;
		margin-bottom: 2.333333rem;
	}
	.ables p{
		width: 90%;
		font-size: 16px;
		line-height: 0.88rem;
	}
	.verification{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		font-weight: bold;
	}
	.verification .sengbtn{
		margin-left: 0.32rem;
	}
	.ables .phoneclass{
		width:50%;
		margin-top: 0.8rem;
	}
	.subable{
		margin-top: 20px;
	}
	
	/* 音箱 */
	.seridpbox{
		width: 90%;
		display:flex;
		align-items: center;
		justify-content: space-between;
		/* flex-direction: column; */
	}
	/* .additem .el-form-item__content{
		margin-left: 20px !important;
	} */
	/deep/.el-form-item__label{
		min-width: 150px !important;
	}
	/deep/.tctc .el-form-item__label{
		min-width: 100px !important;
	}
	.seridpbox .el-input__inner{
		width:90%;
	}
	
	
	
	
	/* 
	 */
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
		width: 90%;
	}
	form{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	/* .seridpbox{
		width: 100%;
		display:flex;
		align-items: center;
		justify-content: space-between;
	}
	.additem .el-form-item__content{
		margin-left: 20px !important;
	}
	
	.seridpbox .el-input__inner{
		width:90%;
	}
	 */
	.borderline{
		width: 100%;
		border: none;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		margin-bottom: 0.426667rem;
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
	
	/deep/.btoc .el-form-item__label{
		min-width: 45px !important;
	}
	/deep/.btoc .el-select{
		width: 100%;
	}
</style>