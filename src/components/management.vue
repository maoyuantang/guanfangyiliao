<!--终端管理系统-->
<template>
	<div class="management">
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
							<el-table-column prop="name" label="科室"></el-table-column>
							<el-table-column fixed prop="date" label="查房医生"></el-table-column>
							<el-table-column prop="province" label="病区"></el-table-column>
							<el-table-column prop="city" label="床号"></el-table-column>
							<el-table-column prop="address" label="病人"></el-table-column>
							<el-table-column prop="zip" label="病人ID"></el-table-column>
							<el-table-column prop="zip" label="最后查看时间"></el-table-column>
							<el-table-column prop="zip" label="基本信息"></el-table-column>
							<el-table-column prop="zip" label="医嘱"></el-table-column>
							<el-table-column prop="zip" label="体征报表"></el-table-column>
							<el-table-column prop="zip" label="检验检查"></el-table-column>
							<el-table-column prop="zip" label="影像"></el-table-column>
							<el-table-column prop="zip" label="医嘱执行"></el-table-column>
							<el-table-column prop="zip" label="录音录像"></el-table-column>
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
			<!-- <div class="doctorStyle">
				<selftag :inData="oTab4" @reback="getOTab4"></selftag>
				<statisticsWay1 v-model="time" @reBack="getFilterTime"></statisticsWay1>
			</div>
			<div>
				<el-table :data="manageBodyData" border style="width: 100%">
					<el-table-column fixed prop="date" label="时间"></el-table-column>
					<el-table-column fixed prop="name" label="病区"></el-table-column>
					<el-table-column fixed prop="province" label="床号"></el-table-column>
					<el-table-column fixed prop="city" label="病人"></el-table-column>
					<el-table-column fixed prop="address" label="病人ID"></el-table-column>
					<el-table-column fixed prop="name" label="基本信息"></el-table-column>
					<el-table-column fixed prop="zip" label="医嘱"></el-table-column>
					<el-table-column fixed prop="zip" label="体征报表"></el-table-column>
					<el-table-column fixed prop="zip" label="检验检查"></el-table-column>
					<el-table-column fixed prop="zip" label="影像"></el-table-column>
					<el-table-column fixed prop="zip" label="医嘱执行"></el-table-column>
					<el-table-column fixed prop="zip" label="状态"></el-table-column>
					<el-table-column fixed prop="zip" label="录音录像"></el-table-column>
					<el-table-column fixed="right" label="" width="200">
						<template slot-scope="scope">
							<el-button v-if="scope.row.state" @click="isShowForbidFun(scope.row)" type="text" size="small">查看记录</el-button>
							<el-button v-else @click="isShowForbidFun(scope.row)" type="text" size="small">已完成</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div> -->
		</div>
	</div>
</template>

<script>
	//引入接口
	import {
		// 已使用接口
		//筛选接口

		//未使用接口
		fetchHospitalDepts,//2.2.获取医院科室列表
	} from "../api/apiAll.js";
	//引入组件
	import normalTab from '../public/publicComponents/normalTab.vue'
	import selftag from '../public/publicComponents/selftag.vue'
	import normalColumnChart from '../public/publicComponents/normalColumnChart.vue'
	import statisticsWay from '../public/publicComponents/statisticsWay.vue'
	import search from '../public/publicComponents/search.vue'

	//引入token
	import { mapState } from "vuex";

	export default {
		components: {
			normalTab,
			selftag,
			normalColumnChart,
			statisticsWay,
			search,
		},
		data() {
			return {

				//统计
				//申请科室统计图
				monthToYear: [],
				drawData: {
					dataAxis: ['点', '击', '柱', '子', '点', '击', '柱', '子', '点', '击', '柱', '子'], //每个柱子代表的类名
					data: [220, 182, 191, 234, 220, 182, 191, 234, 220, 182, 191, 234], //具体数值
					title: "申请科室统计图", //图表标题
					totalNumber: "555"
				},
				//发起科室统计图
				drawDataStart: {
					dataAxis: ['点', '击', '柱', '子', '点', '击', '柱', '子', '点', '击', '柱', '子'], //每个柱子代表的类名
					data: [220, 182, 191, 234, 220, 182, 191, 234, 220, 182, 191, 234], //具体数值
					title: "发起科室统计图", //图表标题
					totalNumber: "555"
				},

				// 常用参数
				time0: "",///统计筛选开始时间
				time1: "",//统计筛选结束时间
				type: 'MONTH', //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天 
				doctorDate: '',//接收医生端的日期筛选

				// 表格参数（自定义）
				docTableData: [], //医生端列表


				//组件参数
				departmentId: "",//科室id      筛选组件   selftag
				typeId: "",//类型id   筛选组件   selftag
				gradeId: "",//分级id   筛选组件   selftag
				searchValue: "",//搜索框   搜索组件   search
				time: null, // 时间筛选组件    statisticsWay

				navInfo: {
					i: 0,
					list: [
						{
							en: 'Mobile terminal management',//选项英文，类型 string
							zh: '移动终端管理'//选项中文，类型string
						},
						{
							en: 'statistics',
							zh: '统计'
						},
					]
				},
				//在线诊室管理 数据
				onLineList: {
					topFlag: [
						{
							more: true,
							title: '科室',
							list: [
								{
									text: '测试',
									value: ''
								}
							]
						},
						{
							more: false,
							title: '类型',
							list: [
								{
									text: '移动查房终端',
									value: ''
								}
							]
						},
						{
							more: false,
							title: '区域',
							list: [
								{
									text: '测试',
									value: ''
								}
							]
						},
					],
				},
				//统计 数据
				statistics: {
					topFlag: [
						{
							more: true,
							title: '科室',
							list: [
								{
									text: '测试',
									value: ''
								}
							]
						},
					]
				},

				oTab4: {
					more: false,
					title: "日期",
					list: [
						{
							text: "全部",
							value: "ALL"
						},
						{
							text: "今日",
							value: "TODAY"
						}
					]
				},

				// element组件参数

				// 管理表体
				manageBodyData: [{
					date: '2016-05-03',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-02',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-04',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-01',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}]
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
			//查房、统计、切换插件返回值（管理端）
			getNav(data) {
				console.log(data)
			},
			//筛选返回值管理端）
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
				this.typeId = data.index.value;
				console.log(this.typeId)
				// this.getList1();
			},
			adminSearchOne(data) {//搜索（筛选右边）
				this.searchValue = data;
				// this.getList1();
			},
			getFilterTime(data) {//统计		//时间选择器返回函数
				console.log(data)
				this.time0 = data.time[0];//统计筛选开始时间
				this.time1 = data.time[1];//统计筛选结束时间
				this.type = data.select.value
				this.count();
			},
			// 点击表体返回行信息
			handleClick(row) {
				console.log(row);
			},

			//医生端  查看记录		已完成
			isShowForbidFun() {

			},
			//统计图表数据的获取
			async count() {
				console.log('统计接口还没出来')
				// const _this = this
				// let query = {
				// 	token: this.userState.token,
				// 	deptId: this.departmentId, //String false 科室ID 
				// 	starTime: this.time0, //String false 开始日期，示例：2019-01 - 01 
				// 	endTime: this.time1, //String false 结束日期，示例：2019-01 - 25 
				// 	type: this.type //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天
				// };
				// // console.log(query)
				// const res = await orderYcmzCharts(query);
				// if (res.data && res.data.errCode === 0) {
				// 	console.log('统计图标数据+成功')
				// 	// console.log(res)
				// 	$.each(res.data.body.data, function (index, text) {
				// 		//继续//把所有月份分成一年一年的，保存的参数意见建好了monthToYear
				// 		// _this.drawData.dataAxis.push(text.x);
				// 		// _this.drawData.data.push(text.y);
				// 	});
				// } else {
				// 	//失败
				// 	console.log('统计图标数据+失败')
				// 	this.$notify.error({
				// 		title: "警告",
				// 		message: res.data.errMsg
				// 	});
				// }
			},


			//移动查房（医生端）
			async getDocList() {
				// let _this = this;
				// const options = {
				// 	token: this.userState.token,
				// 	query: "",
				// 	pageNum: 1,
				// 	pageSize: 15,
				// 	status: this.adminStatus,
				// 	applyDeptId: this.applyDepartmentId,
				// 	synergyDeptId: this.acceptDepartmentId,
				// 	startTime: this.startingTime,
				// 	endTime: this.endingTime,
				// };
				// const res = await synergyPage(options);
				// if (res.data && res.data.errCode === 0) {
				// 	this.docTableData = res.data.body.data2.list;
				// 	if (res.data.body.data2.list.length == 0) {
				// 		console.log(res)
				// 		console.log('移动查房（医生端）List无数据')
				// 	}
				// } else {
				// 	//失败
				// 	this.$notify.error({
				// 		title: "警告",
				// 		message: res.data.errMsg
				// 	});
				// }
			},



			//医生事件
			//点击筛选日期
			getOTab4(data) {
				this.doctorDate = data.index.value;
				this.getDocList();//医生端列表
			},
			//点击确定    新增门诊
			yesMove() {
				alert('确定新增门诊')
			}
		},
		async created() {
			this.count()
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