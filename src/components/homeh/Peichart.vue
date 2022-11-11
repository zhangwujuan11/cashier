<template>
	<div class="linechart">
		<p class="linecharttitle">
			<span>支付方式</span>
			<el-select v-model="value" placeholder="请选择" @change="changeRecent">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</p>
		<!-- <p class="select">
			
		</p> -->
		<div style="width: 80%;height: 400px;" ref="mabox" id="mabox"></div>
	</div>
</template>

<script>
	import moment from 'moment'
	import {typeCount} from '@/utils/home.js'
	
	export default {
		data() {
			return {
				options: [{
					value: 6,
					label: '最近七天'
				}, {
					value: 5,
					label: '最近六天'
			 }, {
					value: 4,
					label: '最近五天'
				}, {
					value: 3,
					label: '最近四天'
				}, {
					value: 2,
					label: '最近三天'
				}],
				value: 6,
				dalist: [],
				tocledata:null
			}
		},
		mounted() {
			this.changeRecent(6)
			
		},
		methods: {
			//初始化echarts
			echartsInit() {
				let linearBar = this.$echarts.getInstanceByDom(this.$refs.mabox); //有的话就获取已有echarts实例的DOM节点。
				     if (linearBar == null) { // 如果不存在，就进行初始化。
				         linearBar = this.$echarts.init(this.$refs.mabox);
				     }
				
						 linearBar.setOption({
						 	title: {
						 		x: "46%", //X坐标   
						 		y: "43%", //Y坐标
						 		text: "总计", //主标题
						 		subtext: "￥" + this.tocledata.toFixed(2), //副标题
						 		textStyle: { //标题样式
						 			fontSize: 16,
						 			color: "#515151",
						 		},
						 		subtextStyle: { //副标题样式
						 			fontSize: 16,
						 			color: "#515151",
						 		},
						 	},
						 
						 
						 	tooltip: {
						 	 trigger: 'item',
						 		formatter: '{a}<br/>{b}:{c}'
						 	},
						 	legend: {
						 		top: '5%',
						 		right: 'right',
						 		icon: 'circle',
						 		textStyle: {
						 			color: "#515151",
						 		}
						 	},
						 	// color: ['#0D2E4B', '#278DE5'],
						 	series: [{
						 		name: '支付方式',
						 		type: 'pie',
						 		radius: ['40%', '70%'],
						 		avoidLabelOverlap: false,
						 		label: {
						 			show: false,
						 			position: 'center'
						 		},
						 		emphasis: {
						 			label: {
						 				show: true,
						 				fontSize: '18',
						 				fontWeight: 'bold',
						 				color: '#515151'
						 			}
						 		},
						 		labelLine: {
						 			show: false
						 		},
						 		data:this.dalist,
						 		label: {
						 			show: true, //饼图上是否出现标注文字 标注各模块代表什么  默认是true
						 			position: 'inner', //控制饼图上标注文字相对于饼图的位置  默认位置在饼图外
						 			fontSize: 12,
						 			align: "center",
						 			formatter: function(p) {
						 				return p.percent.toFixed(0) + "%"; //设置百分比保留几位小数
						 			}
						 		}
						 	}]
						 })
						 
						 
				
			},
			// 日期选择
			changeRecent(value) {
			         let fmt = moment().subtract(value, 'days').format('YYYY-MM-DD');
					 let taday = moment().format("YYYY-MM-DD")
					typeCount({
						createdStart:fmt,createdEnd:taday
					}).then(res=>{
						this.dalist=[]
						this.tocledata=0
						let resdatalist=Array.from(res.data.data[0])
						for (var i=0;i<resdatalist.length;i++) {
							let obj={
								value:  resdatalist[i].typeAmount,
								name:resdatalist[i].typeName
							}
							this.dalist.push(obj)
							this.tocledata += resdatalist[i].typeAmount
						}
						this.echartsInit()
					})
			      }
		}
	}
</script>

<style scoped>
	.linechart {
		width: 8.8rem;
		    background-color: white;
		    border-radius: 0.266667rem;
		    padding: 0.32rem 0.4rem 0.48rem 0.4rem;
		    font-size: 0.426667rem;
		    display: flex;
		    justify-content: space-between;
		    margin-top: 0.533333rem;
		    box-sizing: border-box;
		    flex-wrap: wrap;
		    margin-bottom: 1.6rem;
	}

	.linecharttitle {
		width: 100%;
		display: flex;
		justify-content: left;
		margin-top: 15px;
		align-items: center;
	}

	.linecharttitle span {
		margin-right: 10px;
	}

	.select {
		width: 300px;
		margin-top: 0.32rem;
		margin-bottom: 0.346667rem;
	}

	.el-select {
		width: 66%;
	}
</style>
