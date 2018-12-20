<template>
	<div class="test">
		<p class="golbal-css-test" @click="gotoIndex">this is testb page</p>
		<p class="golbal-css-test">this is testb page</p>
		<div class="test-echarts" ref="testEcharts">
			
		</div>
	</div>
</template>

<script>
	import echarts from '../plugs/echarts.js'
	export default {
		data () {
			return {
				
			}
		},
		methods:{
			gotoIndex(){//跳转首页
				this.$router.push({path:'/'})
			},
			draw(){
				this.$nextTick(()=>{//注意放到$nextTick中执行，因为使用了$refs
					console.log(this.$refs.testEcharts);
					const myChart = echarts.init(this.$refs.testEcharts);
					console.log(myChart)
					myChart.setOption({
			            title: { text: '在Vue中使用echarts' },
			            tooltip: {},
			            xAxis: {
			                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
			            },
			            yAxis: {},
			            series: [{
			                name: '销量',
			                type: 'bar',
			                data: [5, 20, 36, 10, 10, 20]
			            }]
			        });
				})	
			}
		},
		created(){
			this.draw();
		}
	}
</script>

<style scoped>
	.test{
		font-size: 0.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	.test-echarts{
		width: 500px;
		height: 500px;
	}
</style>