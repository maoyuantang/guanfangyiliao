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
						<div class="family-medicine-search"><search></search></div>
						<div><el-button type="primary">新增业务</el-button></div>
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
		<addNewFrame :inData="testData" @reback="getAddData"></addNewFrame>
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
	import addNewFrame from './../../public/publicComponents/addNewFrame.vue'
	
	// import {  } from '../../api/apiAll.js'
	export default {
		components:{
			normalTab,
			selftag,
			search,
			publicInfoModule,
			publicTime,
			normalColumnChart,
			addNewFrame
        },
        computed:{
			...mapState({
				userInfo:state => state.user.userInfo,
				userSelfInfo:state => state.user.userSelfInfo
			})
		},
		data () {
			return {
				testData:{
					show:true,
					type:'1',//1是表示新增家医，2是表示新增在线诊室业务
					businessTypeList:{//新增在线诊室业务类型 
						default:{
							label:'新增在线诊室业务类型1',
							value:'1'
						},
						list:[
							{
								label:'新增在线诊室业务类型1',
								value:'1'
							},
							{
								label:'新增在线诊室业务类型2',
								value:'2'
							}
						]
					},
					businessTemplate:{//新增家医业务模板
						default:{
							label:'新增家医业务模板1', 
							value:'1'
						},
						list:[
							{
								label:'新增家医业务模板1',
								value:'1'
							},
							{
								label:'新增家医业务模板2',
								value:'2'
							}
						]
					},
					businessName:{//业务名称
						label:'kkkk'
					},
					businessPrice:{//业务定价
						label:'6666'
					},
					departmentList:{//科室列表 
							default:{
								label:'',
								value:'1'
							},
							list:[
								{
									label:'科室列表1',
									value:'1'
								},
								{
									label:'科室列表2',
									value:'2'
								}
							]
					}, 
					doctorList:{//医生列表
							default:[],
							list:[
								{
									label:'医生1',
									value:'1'
								},
								{
									label:'医生2',
									value:'2'
								},
								{
									label:'医生3',
									value:'3'
								}   
							]
					},
					businessDescription:'业务描述',//业务描述
					servicePhone:'服务电话',//服务电话
					agreement:{  
						default:{
							label:'协议1',
							value:'1'
						},

						list:[
							{label:'协议1',value:'1'},
							{label:'协议2',value:'2'},
						],
						showContent:''
					}
				},











/********************************************************* */





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
			getAddData(data){
				console.log(data)
			},

			/****************** */
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
	.family-medicine-management-top{
		margin-bottom: 0.3rem;
	}
	.family-medicine-management-middle{
		display: flex;
	}
	.family-medicine-management-middle > div{
		flex: 1;
	}
	.family-medicine-management-middle-right{	
		display: flex;
		justify-content: space-around;	
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
		padding-top: 0.2rem;
	}
	.part-two-body{
		padding-top: 0.2rem;
	}
	.part-two-head>div{
		flex: 1;
	}
	.part-two-head-right{
		display: flex;
	}
</style>