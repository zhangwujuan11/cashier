<template>
	<div class="linechart">
		<div class="newbox">
			<p class="linecharttitle">交易统计</p>
			<p class="select">
				<el-select size="mini" v-model="value" placeholder="请选择" @change="changeRecent">
				    <el-option
				      v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				    </el-option>
				  </el-select>
			</p>
		</div> 
		 <div style="width: 100%;height:300px;overflow-x: scroll;" id="main" ref="piechart"></div>
	</div>
</template>

<script>
	 import moment from 'moment'
	 import {payCount} from '@/utils/home.js'
	export default {
	    data() {
	      return {
	        options: [{
	          value: 6,
	          label: '最近七天'
	        }, {
	          value: 5,
	          label: '最近六天'
	        },{
			  value: 4,
			  label: '最近五天'
			},{
	          value: 3,
	          label: '最近四天'
	        }, {
	          value: 2,
	          label: '最近三天'
	        }],
	        value: 6,
			CollectionList:[],//收款
			dalist:[],//显示天数
			refundList:[],//退款
	      }
	    },
		 mounted(){
				// 默认显示7天柱状图数据
				
				//  this.$nextTick(()=> {
				//     this.$on('childmethods', this.changeRecent(6))
				// })
				// this.changeRecent(6)
		    },
		    methods: {
				//初始化echarts
				echartsInit() {
					let linearBarDom = this.$echarts.getInstanceByDom(this.$refs.piechart); //有的话就获取已有echarts实例的DOM节点。
					     if (linearBarDom == null) { // 如果不存在，就进行初始化。
					         linearBarDom = this.$echarts.init(this.$refs.piechart);
					     }
					linearBarDom.setOption({
						tooltip: {
							trigger: 'axis',
							axisPointer: {
						 	// Use axis to trigger tooltip
								type: 'line' // 'shadow' as default; can also be 'line' or 'shadow'
							}
						},
						xAxis: {
							// name: '日期',
							type: 'category',
							data:this.dalist,
							axisLine: {
								lineStyle: {
									color: "white",
								}
							}
				
						},
						yAxis: {
							name: '(元/日)',
							type: 'value',
							axisLine: {
								lineStyle: {
									color: "white",
								}
							}
						},
						legend: {
							data: ['收款', '退款'],
							icon: 'circle',
							right: 'right',
							textStyle: {
								color: "white",
							},
						},
						series: [{
								name: "收款",
								type: 'bar',
								data:  this.CollectionList,
								barGap: '20%',
								barCategoryGap: '40%',
								itemStyle: {
									color: {
										type: 'linear',
										x: 0,
										y: 1,
										colorStops: [{
												offset: 0,
												color: 'rgba(139, 224, 194, 0.06)',
											},
											{
												offset: 1,
												color: '#6CE5BA',
											}
										],
										global: false
									},
									borderRadius: [10, 10, 0, 0],
								},
								emphasis: {
									itemStyle: {
										color: '#ccc', //hover时改变柱子颜色
									}
								},
								textStyle: {
									color: "#fff",
								},
							},
							{
								name: "退款",
								type: 'bar',
								data: this.refundList,
								itemStyle: {
									color: {
										type: 'linear',
										x: 0,
										y: 1,
										colorStops: [
											// 0%处的颜色
											{
												offset: 0,
												color: 'rgba(229, 108, 108, 0.06)',
											},
											{
												offset: 1,
												color: '#E56C6C',
											}
										],
									},
									borderRadius: [10, 10, 0, 0],
								},
								emphasis: {
									itemStyle: {
										color: '#ccc', //hover时改变柱子颜色
									}
								},
							}
						]
					})
				},
				// 日期选择
				changeRecent(value) {
					// console.log(1111111111111111)
				         let fmt = moment().subtract(value, 'days').format('YYYY-MM-DD');
						 let taday = moment().format("YYYY-MM-DD")
						 let arr=[]
						 let arrt=[]
						 let arrw=[]
						payCount({
							createdStart:fmt,createdEnd:taday
						}).then(res=>{
							let needfor=res.data.data
							for (var i=0; i<needfor.length;i++) {
								arr.push(res.data.data[i].date)
								var dataList = new Set(arr)
								if(res.data.data[i].type == '收款'){
									arrt.push(res.data.data[i].payAmount)
								}else if(res.data.data[i].type == '退款'){
									arrw.push(res.data.data[i].payAmount)
								}
							}
							this.dalist=Array.from(dataList)  
							this.CollectionList=arrt
							this.refundList=arrw
							this.echartsInit()
						}).catch(()=> {
							this.$message.error('暂无数据')
						})
				      }
		    }
	  }
</script>

<style scoped>
	.linechart{
		width:100%;
		background-color: #278DE5;
		padding:0.32rem 0.4rem 0.48rem 0.4rem;
		font-size: 0.426667rem;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		flex-wrap: wrap;
		margin-bottom: 0rem;
	}
	.linecharttitle{
		width: 100%;
		color: white;
		font-size: 0.373333rem;
	}
	.select{
		width:4rem;
		height: 0.48rem;
	}
	.newbox{
		width: 100%;
		display: flex;
		align-items: center;
	}
	:deep(.el-input--suffix .el-input__inner){
		font-size: 0.266667rem;
		border-radius: 0.533333rem;
		background-color: white;
	}
	#main{
		margin-top: 0.4rem;
	}
</style>