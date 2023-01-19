<template>
	<div class="bodbox" :style="{'margin-top':phoneheight}">
		<div class="mch_title">
			<img  @click="goback" src="@/assets/images/back.png" alt="">
			商户绑定
		</div>
		
		<el-tabs v-model="activeName">
			<el-tab-pane label="B扫C" name="first">
				<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<!-- <p class="btoc"> -->
						<el-form-item label="商户:" >
						<el-select
						   v-model="valuett"
						   filterable
						   placeholder="请输入商户名/终端号/手机号"
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
						<el-form-item label="所属商户:" prop="isv">
						<el-select v-model="ruleForm.isvNo" filterable placeholder="请输入商户名/终端号/手机号">
							<el-option v-for="(item,index) in isvs" :key="index" :label="item.isv_name"
								:value="item.isv_no">
							</el-option>
						</el-select>
						</el-form-item>
					<!-- </p> -->
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
						<el-input v-model="input" placeholder="请输入短信验证码"></el-input>
					</p>
					<el-button @click="subfrom" class="subable" type="primary" :disabled="!input != ''">{{subtext}}</el-button>
				</div>
			</el-tab-pane>
			<el-tab-pane label="C扫B" name="second">
				<Ctob></Ctob>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import {mahinfoserch,mahinfodata,sendverdata,isvc} from '@/utils/mchinfo.js'
	import {mchpay_infoinit,mchpay_info,mchpay_infoset,resetlevtas,levcreat ,levitastidd} from '@/utils/login.js'
	import Ctob from '@/components/ddreset/Ctob'
	 export default {
		 filters:{
			 phonepass(val){
				  if(val){
				         return (val.substring(3, 0)) + '****' + (val.substring(7));
				       }
			 }
		 },
		components:{
			 Ctob
		 },
	    data() {
	      return {
			isvs: [],
			phoneheight:localStorage.getItem('phonetopheight'),
			ables:false,
			ruleForm:{
				  
			},
			activeName: 'first',
	        options: [],
	        valuett: [],
			changeinfo:{},
			countDown: "发送验证码", // 倒计时
			timerTf:true,
			countDownNum: 60,
			subable:true,
			input:'',
			phonedata:'123',
			// merchantCode:JSON.parse(localStorage.getItem("mchtiddata")).merchantCode,
			subtext:'',
			havedata:false,
			username:JSON.parse(localStorage.getItem("username")),
			// tid:JSON.parse(localStorage.getItem("mchtiddata")).tid,
			// terminalCode:JSON.parse(localStorage.getItem("mchtiddata")).terminalCode,
	      }
	    },
	    mounted(){
		  mahinfoserch("1").then(res=>{
			  console.log(res)
			  let reg=res.data.data
			  this.options=res.data.data
			  //是否有值,回显
			  this.$nextTick(()=>{
					levitastidd({
						"channelId":'1',
						"username":this.username
					}).then(res=>{
						if(res.data.data.length != 0){
							this.ruleForm=res.data.data[0]
							let def=this.options.find((item) => item.tid == res.data.data[0].tid)
							this.valuett=def.id
							this.activ()
							this.subtext="修改"
							this.havedata=true
						}else{
							this.subtext="提交"
							this.havedata=false
						}
					})
					  
			  })
		  })
		  isvc().then(res => {
		  	this.isvs = res.data.data
		  })
	    },
	    methods: {
			goback(){
				this.$router.back()
			},
			activ(){
				if(this.valuett != ''){
					let def=this.options.find((item) => item.id == this.valuett)
					mahinfodata({"mchName":def.mchName,"tid":def.tid}).then(res=>{
						let chang=JSON.stringify(res.data.data[0])
						this.changeinfo=JSON.parse(chang)
						this.ables=true
					})
					this.$forceUpdate()
				}
			},
			receiveCode() {
			     sendverdata(this.changeinfo.phone).then(res=>{
					  this.phonedata=res.data.data
			     })
			          // 发送验证码 
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
			formatDate(objDate, fmt) {
				var o = {
					"M+": objDate.getMonth() + 1, //月份
					"d+": objDate.getDate(), //日
					"h+": objDate.getHours() % 12 == 0 ? 12 : objDate.getHours() % 12, //小时
					"H+": objDate.getHours(), //小时
					"m+": objDate.getMinutes(), //分
					"s+": objDate.getSeconds(), //秒
					"q+": Math.floor((objDate.getMonth() + 3) / 3), //季度
					"S": objDate.getMilliseconds() //毫秒
				};
				if (/(y+)/.test(fmt))
					fmt = fmt.replace(RegExp.$1, (objDate.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt))
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
							.length)));
				return fmt;
			},
			// 手机验证，保存信息
			subfrom(){
				if(this.input == this.phonedata){
					let obj={
						"username":JSON.parse(localStorage.getItem("username")),
						"mid":this.changeinfo.mid,
						"tid":this.changeinfo.tid,
						"channelId":'1',
						"isvNo":this.ruleForm.isvNo,
						"isDel":0,
						"createTime": this.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss"),
						"mchName":this.changeinfo.mchName,
						"phone":this.changeinfo.phone
					}
					if(this.havedata){
						resetlevtas(obj).then(()=>{
							this.$message.success('商户修改成功')
							this.$router.push('/home')
						}).catch(()=>{
							this.$message.error('绑定失败，请重试')
						})
					}else{
						levcreat(obj).then(()=>{
							this.$message.success('商户绑定成功')
							this.$router.push('/home')
						}).catch(()=>{
							this.$message.error('绑定失败，请重试')
						})
					}
					
					// 此商户未绑定商户信息
					// if(this.merchantCode == null && this.tid != null){
					// 	levcreat(obj).then(()=>{
					// 		// mchpay_infoset(objj).then(res=>{
					// 			this.$message.success('商户绑定成功')
					// 			this.$router.push('/home')
					// 		// })
					// 	}).catch(()=>{
					// 		this.$message.error('绑定失败，请重试')
					// 	})
						
					// }else if(this.merchantCode != null && this.tid == null){
					// 	resetlevtas(obj).then(res=>{
					// 		mchpay_infoset(objj).then(()=>{
					// 			// 同步到商户音箱信息表
					// 			this.$message.success("信息绑定成功")
					// 		})
					// 		this.$router.push('/home')
					// 	})
					// }else if(this.merchantCode != null && this.tid != null){
					// 	resetlevtas(obj).then(res=>{
					// 		mchpay_infoset(objj).then(()=>{
					// 			// 同步到商户音箱信息表
					// 			this.$message.success("信息绑定成功")
					// 		})
					// 		this.$router.push('/home')
					// 	})
					// }
				}else{
					this.$message.error('验证码输入错误！')
				}
			},
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
		overflow: scroll;
	}
	.bodbox .mch_title{
		width: 100%;
		font-size: 0.426667rem;
		text-align: center;
		margin-top: 20px;
		display: flex;
		justify-content: left;
		align-items:center;
		padding-left: 5%;
		box-sizing: border-box;
	}
	.mch_title img{
		width: 20px;
		height: 20px;
		float: left;
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
	
</style>