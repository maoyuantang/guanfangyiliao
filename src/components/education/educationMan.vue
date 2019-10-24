<template>
	<div class="education">
		<normalTab v-model="barInfo" @reBack="getBar"></normalTab>
		<div :is="viewCurrent" class="education-content"></div>
	</div>
</template>

<script>
	import normalTab from '../../public/publicComponents/normalTab.vue'
	import resources from './educationMan/resources.vue'
	import classScheduling from './educationMan/classScheduling.vue'
	import statistics from './educationMan/statistics.vue'
	export default {
		computed:{
			viewCurrent(){
				return this.barInfo.list[this.barInfo.i].page
			}	
		},
		components:{
			normalTab,
			resources,
			classScheduling,
			statistics
		},
		data () {
			return {
				/**
				 * bar 数据
				 */
				barInfo:{
					i:0,//当前页面
					list:[
						{
							en:'Timetable plan',
							zh:'排课计划',
							page:'classScheduling'
						},
						{
							en:'Teaching resources',
							zh:'教学资源',
							page:'resources'
						},
						{
							en:'statistics',
							zh:'统计',
							page:'statistics'
						},
					]	
				},
			}
		},
		methods:{
			/**
			 * bar 切换数据
			 */
			getBar(data){
				// console.log(data)
			},
		},
		async created(){

		}
	}
</script>

<style scoped>
	.education{

	}
	.education-content{
		background: #FFFFFF;
		border: 1px solid #E5EDF3;
		margin-top: .44rem;
		padding-top: .18rem;
	}
</style>