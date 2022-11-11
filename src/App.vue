<template>
  <div id="app">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<div 
	class="addtop"  
	 :style="{height: mainheiget[0].hh}"
	:class="{bgb:path =='/administr' || path == '/home',bgw:path !='/administr' && path != '/home' && path !='/collection/index',mai:path =='/collection/index'}"
	></div>
	<keep-alive>
		<router-view v-if="isRouterAlive"/>
	</keep-alive>
	<!-- <Foot></Foot> -->
  </div>
</template>
<script>
import Foot from '@/components/Foot.vue'
export default {
  name: 'Home',
  components: {
	  Foot
  },
  provide(){//刷新
    return{
      reload:this.reload
    }
  },
  data(){
	  return {
		  isRouterAlive:true,
		  mainheiget: [{
		  	'hh': '0px'
		  }],
		  path:''
	  }
  },
  created() {
  	window.flutter_inappwebview.callHandler('getSafeAreaHeight').then((res) => {
  		if (res != undefined) {
  			this.$set(this.mainheiget[0], 'hh', res.statusBarHeight + 'px')
  			localStorage.setItem('phonetopheight',res.statusBarHeight + 'px')
			localStorage.setItem('phonebottomheight',res.bottomBarHeight + 'px')
  		}
  	})
  },
  methods:{
  	reload(){
  	  this.isRouterAlive=false;
  	  this.$nextTick(function(){
  	  this.isRouterAlive=true
  	  })
  	}
  },
  watch:{
	   $route(to,from){
		  this.$store.state.menushow = false
		  this.path = to.path
	  }
  }
}
</script>
<style scoped>
	.addtop {
		width: 100%;
		
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
	}
	.bgb{
		background-color: #278DE5;
	}
	.bgw{
		background-color: white;
	}
	.mai{
		background-color: #0EB264;
	}
	/*  */
</style>

