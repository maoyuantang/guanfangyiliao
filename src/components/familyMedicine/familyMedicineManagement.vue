<template>
	<div class="family-medicine-management">
		<div class="family-medicine-management-top">
			<normalTab v-model="barInfo" @reBack="getBar"></normalTab>
		</div>
		<div class="family-medicine-management-body">
			<div class="family-medicine-management-body-part-one" v-show="barInfo.i===0">
				<div class="family-medicine-management-middle">
					<div class="family-medicine-management-middle-left">
						<selftag v-model="departmentList" @reback="getDepartmentSelect"></selftag>
						<selftag v-model="bussModuleList" @reback="bussModuleSelect"></selftag>
						<selftag v-model="bussTypeList" @reback="bussTypeSelect"></selftag>
					</div>
					<div class="family-medicine-management-middle-right">
						<search></search>
						<el-button type="primary">新增业务</el-button>
					</div>
				</div>
				<div class="family-medicine-management-content">
					<div class="family-medicine-management-content-layout">
						<publicInfoModule v-for="i in 8" :key="i"></publicInfoModule>
					</div>
				</div>
			</div>
			<div class="family-medicine-management-body-part-two" v-show="barInfo.i===1">
				<div class="part-two-head">
					<div class="part-two-head-left">
						<selftag v-model="departmentList" @reback="getDepartmentSelect"></selftag>
					</div>
					<div class="part-two-head-right">
						<publicTime></publicTime>
						<el-select v-model="countMethod.select" clearable placeholder="请选择">
							<el-option
							v-for="(item,index) in countMethod.list"
							:key="index"
							:label="item.name"
							:value="item.name">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="part-two-body">
					<div class="part-two-body-layout">
						<normalColumnChart v-model="drawData"></normalColumnChart>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import normalTab from './../../public/publicComponents/normalTab.vue'
	import selftag from './../../public/publicComponents/selftag.vue'
	import search from './../../public/publicComponents/search.vue'
	import publicInfoModule from './../../public/publicComponents/publicInfoModule.vue'
	import publicTime from './../../public/publicComponents/publicTime.vue'
	import normalColumnChart from './../../public/publicComponents/normalColumnChart.vue'
	
	
	// import {  } from '../../api/apiAll.js'
	export default {
		components:{
			normalTab,
			selftag,
			search,
			publicInfoModule,
			publicTime,
			normalColumnChart
        },
        computed:{
			...mapState({
				userInfo:state => state.user.userInfo,
				userSelfInfo:state => state.user.userSelfInfo
			})
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
							en:'Family Doctor Service',
							zh:'家医服务管理'
						},
						{
							en:'STATISTICS',
							zh:'统计'
						},
					]	
				},

				/**
				 * 科室标签信息
				 */
				departmentList:{
					more:false,
                    title:'日期',
                    list:[
                        {
                            text:'全部'
                        },
                        {
                            text:'今日'
                        }
                    ]
				},

				/**
				 * 业务模块信息
				 */
				bussModuleList:{
					more:false,
                    title:'日期',
                    list:[
                        {
                            text:'全部'
                        },
                        {
                            text:'今日'
                        }
                    ]
				},

				/**
				 * 业务类型信息
				 */
				bussTypeList:{
					more:false,
                    title:'日期',
                    list:[
                        {
                            text:'全部'
                        },
                        {
                            text:'今日'
                        }
                    ]
				},

				/**
				 * 统计模块 时间段
				 */
				countTime:[],

				/**
				 * 统计模块 统计方式
				 */
				countMethod:{
					select:{name:'按科室统计'}, 
					list:[
						{name:'按科室统计'},
						{name:'按日统计'},
						{name:'按月统计'},
						{name:'按年统计'},
					]
				},

				/***
				 * 统计模块  图表
				 */
				drawData:{
					dataAxis:['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'],//每个柱子代表的类名
					data:[220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234],//具体数值
					title:'测试测试,修改修改'//图表标题
				}
			}
		},
		methods:{
			/**
			 * bar 切换数据
			 */
			getBar(data){
				console.log(data)
			},

			/**
			 * 科室标签 被点击
			 */
			getDepartmentSelect(item){
				console.log(item)
			},

			/**
			 * 业务模块 被点击
			 */
			bussModuleSelect(item){
				console.log(item)
			},

			/**
			 * 业务类型 被点击
			 */
			bussTypeSelect(item){
				console.log(item)
			},

		},
		async created(){

		}
	}
</script>

<style scoped>
	.family-medicine-management{

	}
	.family-medicine-management-middle{
		display: flex;
	}
	.family-medicine-management-middle > div{
		flex: 1;
	}
	.family-medicine-management-middle-right{
		
	}
	.family-medicine-management-middle-right>div{
		display: inline-block;
	}
	.family-medicine-management-content-layout{
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
	.family-medicine-management-body-part-two{
		border-radius: 0.04rem;
		border: 1px solid var(--color5);
		/* box-shadow: 0 0.06rem 0.36rem 0  */
	}
	.part-two-head{
		display: flex;
	}
	.part-two-head>div{
		flex: 1;
	}
	.part-two-head-right{
		display: flex;
	}
</style>