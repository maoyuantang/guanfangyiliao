<!--终端管理系统-->
<template>
	<div class="management">
		<!--弹框1  查看 -->
		<el-dialog title="" :visible.sync="isShowmoveUser" width="40%" center>
		</el-dialog>


		<!-- 管理端 -->
		<div v-if="$store.state.user.viewRoot.now.name==='manager'">
			<div>
				<normalTab v-model="navInfo" @reBack="getNav"></normalTab>
			</div>
			<div class="out-border">
				<!-- 移动查房管理 -->
				<div class="manager_check" v-if="navInfo.i===0">
					<!-- 筛选区 -->
					<div class="manager_check_top mainTab" style="display:flex;flex-direction: column;">
						<div style="display:flex;justify-content: space-between">
							<selftag :inData="onLineList.topFlag[0]" @reback="getFilter0"></selftag>
							<search @searchValue="adminSearchOne"></search>
						</div>
						<!-- <div style="display:flex;justify-content: flex-start;align-items: center;"> -->
						<selftag v-model="onLineList.topFlag[1]" @reback="getFilter1"></selftag>
						<selftag v-model="onLineList.topFlag[2]" @reback="getFilter2"></selftag>
						<!-- </div> -->
					</div>
					<!-- 表体 -->
					<div class="dataBody">
						<el-table :data="manageBodyData" border style="width: 100%">
							<el-table-column prop="deptName" label="科室"></el-table-column>
							<el-table-column fixed prop="type" label="类型"></el-table-column>
							<el-table-column prop="useName" label="使用者"></el-table-column>
							<el-table-column prop="account" label="账号"></el-table-column>
							<el-table-column prop="softwareSystem" label="软件系统"></el-table-column>
							<el-table-column prop="softwareVersion" label="软件版本"></el-table-column>
							<el-table-column prop="loginDate" label="最近登录时间"></el-table-column>
							<el-table-column prop="useFrequency" label="使用频率"></el-table-column>
							<el-table-column prop="networkState" label="联网状态"></el-table-column>
							<el-table-column prop="useTime" label="总使用时长"></el-table-column>
							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button @click="viewFile(scope.row)" type="text" size="small">查看</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
				<!-- 统计 -->
				<div v-else-if="navInfo.i===1" class="count">
					<div class="manager_count_top mainTab">
						<div class="manager_count_top_left">
							<selftag v-model="statistics.topFlag[0]" @reback="getFilter0"></selftag>
						</div>
						<statisticsWay v-model="time" @reBack="getFilterTime"></statisticsWay>
					</div>
					<div class="manager_count_midle">
						<div style="display:flex">
							<normalColumnChart :inData="drawData"> </normalColumnChart>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 医生端 -->
		<div v-else>
			<noData></noData>
		</div>
	</div>
</template>

<script>
	//引入接口
	import {
		// 已使用接口
		//筛选接口
		toolDept,//1.21.1.管理  科室列表
		toolMedicalType,//1.21.26.分级诊疗-类型
		queryByWebPage,//1.终端管理web分页列表
		terminalManagementStatistics,//2.终端管理统计


	} from "../api/apiAll.js";
	//引入组件
	import normalTab from '../public/publicComponents/normalTab.vue'
	import selftag from '../public/publicComponents/selftag.vue'
	import normalColumnChart from '../public/publicComponents/normalColumnChart.vue'
	import statisticsWay from '../public/publicComponents/statisticsWay.vue'
	import search from '../public/publicComponents/search.vue'
	import noData from '../public/publicComponents/noData.vue'

	//引入token
	import { mapState } from "vuex";

	export default {
		components: {
			normalTab,
			selftag,
			normalColumnChart,
			statisticsWay,
			search,
			noData,
		},
		data() {
			return {
				//管理1表 查看  弹框
				isShowmoveUser: false,//显示转诊记录


				//筛选返回值接收
				//管理1端  筛选工具栏  筛选返回值  接收参数
				departmentId: "",//筛选科室id   selftag
				typeId: "",//筛选类型id   selftag
				area: "",//区域id    selftag
				searchValue: "",//返回搜索框输入   search
				types: '', //String MANAGE账号是什么权限
				pageNum: 1,//页数
				pageSize: 10,//条数
				yTotal1: 0,//统计y轴相加
				//管理统计端  筛选工具栏  统计筛选返回值  接收参数
				time0: "",///统计筛选开始时间
				time1: "",//统计筛选结束时间
				type: 'MONTH', //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天 
				//医生端  筛选工具栏  日期筛选返回值  接收参数
				// doctorDate: '',//日期筛选

				// element

				// 必备参数
				time: null, // 时间筛选组件    statisticsWay
				//管理切换（复用组件 ）
				navInfo: {
					i: 0,
					list: [
						{
							en: 'MMOBILE TERMINAL MANAGEMENT',//选项英文，类型 string
							zh: '移动终端管理'//选项中文，类型string
						},
						{
							en: 'STATISTICS',
							zh: '统计'
						},
					]
				},
				//筛选工具栏  管理1（自定义）
				onLineList: {
					topFlag: [
						{
							more: true,
							title: '科室',
							list: []
						},
						{
							more: true,
							title: '类型',
							list: [
								{
									text: '死的', 
									value: '0'
								},
								{
									text: '移动查房终端', 
									value: 'ROUNDS'
								}
							]
						},
						{
							more: true,
							title: '区域',
							list: [
								{
									text: '死的',
									value: '0'
								}
							]
						}
					],
				},
				//统计 数据
				statistics: {
					topFlag: [
						{
							more: true,
							title: '科室',
							list: []
						},
					]
				},
				// 管理表体（自定义组件 ）
				manageBodyData: [],
				//统计
				//申请科室统计图
				monthToYear: [],
				drawData: {
					dataAxis: [],//每个柱子代表的类名
					data: [],//具体数值
					title: '',//图表标题
					total: ''
				},
				//医生端列表（自定义组件 ）
				docTableData: [],
			}
		},
		computed: {
			//引入token
			...mapState({
				userState: state => state.user.userInfo,
				userSelfInfo: state => state.user.userSelfInfo,
				userInfo: state => state.user.userInfo,
			}),
		},
		methods: {
			//自调用组件函数
			//终端管理、统计、切换插件返回值（管理端）
			getNav(data) {
				console.log(data.i)
				if (data.i == 0) {
					this.getList1();//管理列表1
				} else if (data.i == 1) {
					this.count();//统计表
				}
			},
			//筛选返回值  管理端
			getFilter0(data) {//科室筛选
				this.departmentId = data.index.value;
				console.log(this.departmentId)
				// this.getList1();
			},
			getFilter1(data) {//类型筛选
				this.typeId = data.index.value;
				console.log(this.typeId)
				// this.getList1();
			},
			getFilter2(data) {//区域筛选
				this.area = data.index.value;
				console.log(this.area)
				// this.getList1();
			},
			adminSearchOne(data) {//搜索（筛选右边）
				this.searchValue = data;
				console.log(this.searchValue)
				// this.getList1();
			},
			getFilterTime(data) {//统计		//时间选择器返回函数
				console.log(data)
				this.time0 = data.time[0];//统计筛选开始时间
				this.time1 = data.time[1];//统计筛选结束时间
				this.type = data.select.value
				this.count();
			},



			//筛选列表  管理端
			//1.21.1.科室筛选  工具栏 (管理) (管理)
			async getSelect1(oindex) {
				if (this.userInfo.manager) {
					this.types = 'MANAGE'
				} else {
					this.types = 'DOCTOR'
				}
				let _this = this;
				let query = {
					token: this.userState.token,
					type: this.types
				};
				const res = await toolDept(query);
				if (res.data && res.data.errCode === 0) {
					console.log('1.21.1.科室工具栏 +成功')
					// console.log(res.data.body);
					if (res.data.body.length > 6) {
						this.onLineList.topFlag[0].more = true;
						this.statistics.topFlag[0].more = true;
					} else {
						this.onLineList.topFlag[0].more = false;
						this.statistics.topFlag[0].more = false;
					}
					$.each(res.data.body, function (index, text) {
						//终端系统   科室   筛选列表   管理1
						_this.onLineList.topFlag[0].list.push({
							text: text.name,
							value: text.id
						});
						//终端系统   科室   筛选列表   管理统计
						_this.statistics.topFlag[0].list.push({
							text: text.name,
							value: text.id
						});
					});
				} else {
					console.log('1.21.1.科室工具栏 +失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//1.21.26.类型筛选  工具栏 (管理)
			async getSelect2(oindex) {
				// let _this = this;
				// let query = {
				// 	token: this.userState.token,
				// 	// type: 'MANAGE'
				// };
				// const res = await toolMedicalType(query);
				// if (res.data && res.data.errCode === 0) {
				// 	console.log('1.21.26.类型筛选  工具栏 +成功')
				// 	// console.log(res.data.body);
				// 	if (res.data.body.length > 6) {
				// 		this.onLineList.topFlag[1].more = true;
				// 	} else {
				// 		this.onLineList.topFlag[1].more = false;
				// 	}
				// 	$.each(res.data.body, function (index, text) {
				// 		//终端系统   类型   筛选列表   管理1
				// 		_this.onLineList.topFlag[1].list.push({
				// 			text: text.name,
				// 			value: text.id
				// 		});
				// 	});
				// } else {
				// 	console.log('1.21.26.类型筛选  工具栏 +失败')
				// 	//失败
				// 	this.$notify.error({
				// 		title: "警告",
				// 		message: res.data.errMsg
				// 	});
				// }
			},
			//1.21.27.区域筛选  工具栏 (终端系统)
			async getSelect3(oindex) {
				// let _this = this;
				// let query = {
				// 	token: this.userState.token,
				// 	// type: 'MANAGE'
				// };
				// const res = await toolMedicalGrading(query);
				// if (res.data && res.data.errCode === 0) {
				// 	console.log('1.21.27.分级筛选  工具栏 移动查房管理+成功')
				// 	// console.log(res.data.body);
				// 	if (res.data.body.length > 6) {
				// 		this.onLineList.topFlag[2].more = true;
				// 	} else {
				// 		this.onLineList.topFlag[2].more = false;
				// 	}
				// 	$.each(res.data.body, function (index, text) {
				// 		//终端系统   区域   筛选列表   管理1
				// 		_this.onLineList.topFlag[2].list.push({
				// 			text: text.name,
				// 			value: text.id
				// 		});
				// 	});
				// } else {
				// 	console.log('1.21.27.分级筛选  工具栏 移动查房管理+失败')
				// 	//失败
				// 	this.$notify.error({
				// 		title: "警告",
				// 		message: res.data.errMsg
				// 	});
				// }
			},












			// 管理1表
			// queryByWebPage,//1.终端管理web分页列表
			// terminalManagementStatistics,//2.终端管理统计
			async getList1() {
				console.log(this.searchValue)
				let query = {// 7.11根据条件获取处方信息 
					token: this.userState.token,
					area: "",//区域
					deptId: this.departmentId,//科室id
					searchKey: this.searchValue,//查询条件
					type: "",//类型（ROUNDS：移动查房）
					pageNum: this.pageNum,//分页页码(默认1)
					pageSize: this.pageSize,//分页条数（默认10）
				};
				const res = await queryByWebPage(query);
				if (res.data && res.data.errCode === 0) {
					console.log('列表1+成功')
					console.log(res)
					this.manageBodyData = res.data.body.data2.list
				} else {
					//失败
					console.log('列表1+失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			// 管理1表   操作区  
			//查看
			viewFile() {
				this.isShowmoveUser = !this.isShowmoveUser
				console.log(this.isShowmoveUser)
			},
			//管理2表（统计）
			async count() {
				const _this = this
				let query = {
					token: this.userState.token,
					type: this.type, //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天
					startDate: this.time0, //String false 开始日期，示例：2019-01 - 01 
					endDate: this.time1, //String false 结束日期，示例：2019-01 - 25 
					deptId: this.departmentId, //String false 科室ID 
				};
				// console.log(query)
				const res = await terminalManagementStatistics(query);
				if (res.data && res.data.errCode === 0) {
					console.log('统计图+移动查房终端+成功')
					const lists = res.data.body.data
					console.log(lists)
					console.log(this.type)
					this.yTotal1 = 0
					this.drawData.dataAxis.length = 0
					this.drawData.data.length = 0
					$.each(lists, function (index, text) {
						//默认开始结束时间还没有获取，需要获取new data  ，还没有处理后台数据
						// _this.monthToYearDoor.months.push(text.x)
						// _this.monthToYearDoor.years.push(text.y)
						_this.yTotal1 += text.y;
						_this.drawData.dataAxis.push(text.x)
						_this.drawData.data.push(text.y)
					});
					this.drawData.title = "移动查房终端"
					this.drawData.total = "总数：" + this.yTotal1
					console.log(this.yTotal1)
				} else {
					//失败
					console.log('统计图+移动查房终端+失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
		},
		async created() {
			this.getSelect1()
			this.getSelect2()
			this.getSelect3()
			this.getList1()
			this.count()
			// this.DoctorList()
		}
	}
</script>

<style lang="scss" scoped>
	.out-border {
		background: #FFF;
		border: 1px solid var(--color5);
		box-shadow: 0 0.06rem 0.36rem 0 rgba(0, 62, 100, 0.04);
		border-radius: 0.04rem;
		padding-top: 0.32rem;
		padding-right: 0.69rem;
		padding-left: 0.38rem;
		min-height: 76vh;
		margin-right: 0.36rem;
		margin-top: 0.42rem;
	}

	.manager_check_top {
		display: flex;
		justify-content: space-between;
	}


	.manager_count_top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.manager_count_top>div {
		/* flex: 1; */
	}

	/* 医生端样式 */
	.doctorStyle {
		display: flex;
		display: -webkit-flex;
		/* justify-content: space-evenly; */
		align-items: baseline;
		margin-bottom: 52px;
	}


	.moved {
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 50%
	}

	.moved .moved_top {
		margin: 10px 0px;
	}

	.moved .moved_middle {
		margin: 10px 0px;
	}

	.moved .moved_footer {
		margin: 10px 0px;
	}

	.moved .moved_top img {
		width: 1.48rem;
		height: 1.48rem;
		border-radius: 50%;
	}

	.moved .moved_top p {
		font-family: Helvetica;
		font-size: 20px;
		color: #252631;
		text-align: center;
		margin: 10px 0px;
	}

	.moved .moved_middle span {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #98A9BC;
		text-align: center;
		line-height: 21px;
	}

	.moved .moved_middle img {
		width: 30px;
		height: 30px;
	}

	.moved .moved_footer ul {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: flex-start;
	}

	.moved .moved_footer ul li {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #98A9BC;
		line-height: 21px;
	}

	.moved .moved_footer ul li:last-child {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #646464;
		line-height: 21px;
	}

	.mainTab {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
	}
</style>