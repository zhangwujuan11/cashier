<template>
  <div class="home" @touchstart.capture="touchStart" @touchend.capture="touchEnd">
	  <Solttitle></Solttitle>
	  <Saidmenu></Saidmenu>
   <!-- <div class="information">
   	<div class="informationLeft">
		<img src="@/assets/images/ellipse.png">
		<div>Hello，{{username}}商户 <br> <span>{{isAdmin}}</span></div>
	</div>
	<router-link  to="/information">
		<img @click="goinformation" class="diandian" src="@/assets/images/diandiandain.png">
	</router-link>
   </div> -->
   <Homelinechart></Homelinechart> 
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
  </div>
</template>

<script>
import Solttitle from '@/components/Solttitle.vue'
import Saidmenu from '@/components/Index.vue'
import Homelinechart from '@/components/homeh/Homelinechart.vue'
import Oldmenu from '@/components/homeh/Oldmenu.vue'
import Foot from '@/components/Foot.vue'
import Paydata from '@/components/homeh/Paydata.vue'


import { payAmountWeek,numCount,isAdmin } from '@/utils/home.js'
export default {
	inject:["reload"],
  name: 'Home',
  components: {
	 Saidmenu,
	 Solttitle,
	 Homelinechart,
	 Oldmenu,
	 Foot,
	 Paydata
  },
  data(){
	  return {
		  homedata:{
			  todayAmount:'',
			  todayPayCount:''
		  },
		  numCount:{},
		  username:JSON.parse(localStorage.getItem('username')),
		  isAdmin:''
		  }
  },
  created() {
	payAmountWeek().then(res=>{
		this.homedata=res.data.data
	})
	numCount().then(res=>{
		this.numCount=res.data.data
	})
	isAdmin().then(res=>{
		if(res.data.data.isAdmin==0){
			this.isAdmin='普通成员'
		}else if(res.data.data.isAdmin==1){
			this.isAdmin='超级管理员'
		}
	})
  },
  methods:{
	  goinformation(){
		  this.$router.push({name:'information'})
	  },
	//滑动开始
	touchStart(e) {
	  // 记录初始位置
	  this.startX = e.touches[0].clientX;
	},
	//滑动结束
	touchEnd(e) {
	  // 当前滑动的父级元素
	  let parentElement = e.currentTarget.parentElement;
	  // 记录结束位置
	  this.endX = e.changedTouches[0].clientX;
	  // 右滑大于30距离删除出现
	  if ( this.startX - this.endX < -100) {
		this.$store.state.menushow =true
		parentElement.dataset.type = 0;
	  }else{
		  this.$store.state.menushow = false
	  }
	  this.startX = 0;
	  this.endX = 0;
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
</style>