<!-- 
  管理端未处理：
 -->
<!--门诊系统医院管理页面-->
<template>
	<div class="hospital-management-outpatient">
		<div class="hospital-management-outpatient-nav">
			<normalTab v-model="navInfo" @reBack="getNav"></normalTab>
		</div>
		<div class="out-border">
			<!-- 在线诊室管理 -->
			<div class="online-clinic" v-if="navInfo.i===0">
				<div class="online-clinic-top mainTab">
					<div class="online-clinic-top-left">
						<selftag :inData="onLineList.topFlag[0]" @reback="getSelect0" v-if="chongZ"></selftag>
					</div>
					<div class="online-clinic-top-right">
						<search @searchValue="adminSearchOne"></search>
						<el-button type="primary" @click="isShowNewOutPatientFun">新增业务</el-button>
					</div>
				</div>


				<div class="online-clinic-middle">
					<el-table :data="tableData" style="width: 100%;" :cell-class-name="ceshi0" @cell-click="relateDoctors1">
						<!-- <el-table-column prop="id" label="业务编号" :show-overflow-tooltip="true"></el-table-column> -->
						<el-table-column prop="departmentName" label="科室" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="fullName" label="业务名" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="price" label="价格" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="doctors" label="关联医生" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="totalPeople" label="业务人次" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="totalIncome" label="总收入" :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="queuePeople" label="当前排队" :show-overflow-tooltip="true"></el-table-column>
						<!-- <el-table-column prop="updateTime" label="最近修改" :show-overflow-tooltip="true"></el-table-column> -->

						<el-table-column fixed=right label="操作" width="270">
							<template slot-scope="scope">
								<button class="lanSe" @click="isShowViewDetailFun(scope.row)">查看详情</button>
								<button class="lvSe" @click="isShowEditFun(scope.row)">编辑</button>
								<button class="fenSe" v-if="scope.row.state" @click="isShowForbidFun(scope.row)">禁用</button>
								<button class="huangSe" v-else @click="isShowForbidFun(scope.row)">解除禁用</button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div style="text-align: center;padding: 10px 0;">
					<el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totals"
						@current-change="currentChange1">
					</el-pagination>
				</div>
			</div>



			<!-- 处方审核和配送 -->
			<div v-else-if="navInfo.i===1">
				<div class="online-clinic-top">
					<div class="online-clinic-top-left">
						<selftag v-model="prescriptionAuditDistribution.topFlag[0]" @reback="getSelect0" v-if="chongZ"></selftag>
						<selftag v-model="prescriptionAuditDistribution.topFlag[1]" @reback="getSelect1" v-if="chongZ"></selftag>
						<selftag v-model="prescriptionAuditDistribution.topFlag[2]" @reback="getSelect2" v-if="chongZ"></selftag>
						<selftag v-model="prescriptionAuditDistribution.topFlag[3]" @reback="getSelect3" v-if="chongZ"></selftag>
						<selftag v-model="prescriptionAuditDistribution.topFlag[4]" @reback="getSelect4" v-if="chongZ"></selftag>
					</div>
					<div class="online-clinic-top-right">
						<search @searchValue="adminSearchOne"></search>
						<!-- <el-button type="primary">新增业务</el-button> -->
					</div>

				</div>
				<div class="online-clinic-middle">
					<publicList :columns="prescriptionAuditDistribution.tableBody.columns"
						:tableData="prescriptionAuditDistribution.tableBody.tableData"
						:tableBtn="prescriptionAuditDistribution.tableBody.tableBtn" :cellColor="cellColor" :pageSize="pageSize"
						:total="totals" :widths="widths" @rebackFenye="currentChange2">
					</publicList>
				</div>
			</div>
			<!-- 统计 -->
			<div v-else-if="navInfo.i===2" class="statistics">
				<div class="hospital-management-outpatient-statistics-top">
					<div class="hospital-management-outpatient-statistics-top-left">
						<selftag v-model="statistics.topFlag[0]" @reback="getSelect0" v-if="chongZ"></selftag>
					</div>
					<div class="hospital-management-outpatient-statistics-top-right">
						<statisticsWay v-model="time" @reBack="getFilterTime"></statisticsWay>
					</div>
				</div>
				<div class="hospital-management-outpatient-statistics-midle">
					<div>
						<!-- <normalColumnChart v-for="(item,index) in testdata" :key="index" :inData="item"> </normalColumnChart> -->
						<normalColumnChart :inData="testdata1"> </normalColumnChart>
						<normalColumnChart :inData="testdata2"> </normalColumnChart>
						<normalColumnChart :inData="testdata3"> </normalColumnChart>
					</div>
				</div>
			</div>

		</div>
		<!-- 新增门诊弹框 -->
		<addNewFrame :inData="addData" @reback="getData" @department="getDepartment" @getAgreementSelect="getSelectInfo"
			:sureVisiable="sureVisiable"></addNewFrame>
		<!-- 表一查看关联医生弹框 -->
		<div v-if="isShowrelationalDoctor">
			<el-dialog class="evaluateBox1" title=" 医生详情" :visible.sync="isShowrelationalDoctor" width="500px"
				max-hight="450px" center>
				<el-scrollbar style="height:100%;">
					<ul style="max-height: 450px;">
						<li v-for="(text,index) in relationalDoctor" :key="index">
							<div class="evaluateCont1">
								<!-- 待头像 -->
								<img v-if="text.headId == null||!text.headId" src="../assets/img/doctorImg.png" alt="医生头像">
								<img v-if="text.headId" :src='userSocketInfo.imgUrl+text.headId' alt="医生头像">
								<h5>{{text.doctorName}}</h5>
							</div>
							<div class="evaluateCont2">
								<!-- <div>{{text.doctorId}}</div> -->
								<!-- 医生接诊状态 -->
								<div>{{text.doctorStates}}</div>
							</div>
						</li>
					</ul>
				</el-scrollbar>
			</el-dialog>
		</div>

		<!-- 总+今日+订单详情+弹框 -->
		<div v-if="isShowRecord">
			<el-dialog class="offerDetial" title="订单详情" :visible.sync="isShowRecord" center width=70%>
				<el-table :data="tableDataChat" style="width: 100%;" @cell-click="relateDoctors2">
					<el-table-column prop="orderNo" label="订单号" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="doctorName" label="接诊医生" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="mode" label="接诊方式" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="fee" label="问诊费" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="orderTime" label="问诊时间" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="status" label="状态" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="userName" label="病人" :show-overflow-tooltip="true"></el-table-column>
					<!-- <el-table-column prop="rxOrderNo" label="处方订单号" :show-overflow-tooltip="true"></el-table-column> -->
					<el-table-column prop="rxFee" label="处方费" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column fixed=right label="操作" width="300">
						<template slot-scope="scope">
							<el-button @click="isShowRecordChatFun(scope.row)" type="text" size="small">聊天记录</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-dialog>
		</div>

		<!-- 查看详情弹框中的聊天弹框 -->
		<div v-if="isShowRecordChat">
			<el-dialog class="" title="聊天记录" :visible.sync="isShowRecordChat" center>
				<viewRecord :sessionId="sessionIds" v-if="sessionIds"></viewRecord>
			</el-dialog>
		</div>




		<!-- 处方详情 -->
		<div v-if="chuFangDetailList2">
			<el-dialog title="处方详情" :visible.sync="chuFangDetailList2" center>
				<img style="width:100%"
					:src='userSocketInfo.imgUrl1+"/m/v1/api/prescription/prescription/prescriptionDetailById?token="+userInfo.token+"&prescriptionId="+srcs'>
			</el-dialog>
		</div>



		<!-- 物流状态 -->
		<div v-if="roadStatusList2">
			<el-dialog title="物流状态" :visible.sync="roadStatusList2" center>
				<div class="visiting">
					<Timeline>
						<TimelineItem v-for="(text,index) in roadStatusList2List" :key="index">
							<!-- <p class="visiting-hospital">重庆市医科大学第三附属医院</p> -->
							<p class="visiting-department">
								<span class="visiting-department-on">on</span>
								<span class="visiting-department-name">{{text.key}}</span>
							</p>
							<p class="visiting-content">{{text.value}}</p>
						</TimelineItem>
					</Timeline>
				</div>
			</el-dialog>
		</div>


		<!-- 查看处方配送记录 -->
		<div v-if="viewRecordList2">
			<el-dialog class="  " title="处方配送聊天记录" :visible.sync="viewRecordList2" width="602px" hight="356px" center>
				<viewRecord :sessionId="sessionIds" v-if="sessionIds"></viewRecord>
			</el-dialog>
		</div>

	</div>
</template>

<script>
	//引入接口
	import {
		// 已使用接口
		fetchHospitalDeptAuth,//1.2.1.获取医院科室列表（新）主要用于表单选择
		doctorsByOrgCodeAndDeptId,//1.22医院机构码和科室id获取医生集合
		addClinic,//7.1新增业务
		searchClinic,//7.5门诊列表1
		prescriptionDetailByCondition,//7.11出方列表2
		disableClinic,//7.4禁用远程门诊业务和诊室
		protocols, //17.12 获取该科室的协议
		protocolById,//17.13 根据协议id获取协议 
		fetchMzOrderInfo,//6.8.远程门诊订单列表弹框数据（WEB端使用）
		orderYcmzCharts,//6.9.远程门诊订单统计柱状图
		orderRxCharts, //6.10.处方订单统计柱状图
		statisticsPeople, //7.3.1远程门诊就诊人次柱状统计图 
		fetchHistoryMessage,//14.4.拉取历史消息记录
		//筛选接口
		toolDept,//1.21.1.科室工具栏  get
		toolRxReviewStatus,//1.21.2.处方审核状态  get
		toolRxSendStatus,//1.21.3.处方配送状态  get
		toolRxReviewDoctors,//1.21.4.处方审核医生   get
		toolRxSendDoctors,//1.21.5.处方发药医生   get

		//未使用接口
		updateClinic,//7.2更新远程门诊业务
		clinicDetail,//7.3查看远程门诊业务详情
		onlineRoomsByDoctor,//7.6(WEB医生)获取所有该医生的在线诊室
		addPrescription,//7.8开处方
		updatePrescription,//7.9审核处方
		reviewList,//7.10按审方医生获取处方审核列表
		prescriptionDetailById,//7.12根据处方id获取处方电子版
		drugSendRecord,//7.13根据处方id获取处方发货记录
		drugsByCondition,//7.16药品名称搜索药品信息
		clinicOrders,//7.18(WEB医生)获取所有该诊室的订单信息
		drugHaulStatus,//7.2.5根据处方id获取处方的物流状态 
		// 非筛选条件下的科室列表
		fetchHospitalDepts,//2.2.获取医院科室列表
	} from "../api/apiAll.js";
	//引入组件
	import normalTab from '../public/publicComponents/normalTab.vue'
	import selftag from '../public/publicComponents/selftag.vue'
	import search from '../public/publicComponents/search.vue'
	import publicList from '../public/publicComponents/publicList.vue'
	import normalColumnChart from '../public/publicComponents/normalColumnChart.vue'
	import noData from '../public/publicComponents/noData.vue'
	import statisticsWay from '../public/publicComponents/statisticsWay.vue'
	import addNewFrame from '../public/publicComponents/addNewFrame.vue'
	import viewRecord from './xiezuo/viewRecord.vue'
	//引入token
	import { mapState } from "vuex";
	export default {
		components: {
			normalTab,
			selftag,
			search,
			publicList,
			normalColumnChart,
			statisticsWay,
			addNewFrame,
			viewRecord,
			noData,
		},
		data() {
			return {
				chongZ: true,
				// 显示隐藏
				isShowrelationalDoctor: false,//关联医生
				isShowRecord: false,//查看详情
				isShowRecordChat: false,//查看详情中的   聊天弹框

				chuFangDetailList2: false,//处方详情   管理表2操作区按钮
				roadStatusList2: false,//物流状态   管理表2操作区按钮
				roadStatusList2List: [],//物流状态   管理表2操作区按钮
				viewRecordList2: false,//查看记录   管理表2操作区按钮
				status1: false,//状态（禁用按钮）
				// 医生端  就诊列表  弹框



				// 常用参数
				pageNum: 1,//页数
				pageSize: 10,//条数
				widths: 200,
				totals: 0,
				srcs: "",//处方id   用于拼接图片src



				//管理端  切换
				navInfo: {
					i: 0,
					list: [
						{
							en: 'online clinic',//选项英文，类型 string
							zh: '在线诊室管理'//选项中文，类型string
						},
						{
							en: 'Prescription Audit & Distribution',
							zh: '处方审核和配送'
						},
						{
							en: 'statistics',
							zh: '统计'
						},
					]
				},




				//筛选返回值接收
				//管理1端   筛选返回值  
				departmentId: "",//科室id			number
				onLineId: '',//业务编号id			number
				businessType: "",//业务类型
				searchValue: "", //搜索框接收参数
				status: [],//业务人次表里的状态
				tableData: [],//表1  传入数据参数
				state: false,//boolean false 远程门诊状态（禁用操作时值必传） 
				sessionIds: "",
				//管理2端   筛选返回值  
				string: "",//门诊订单号			number
				reviewEnum: "",//审核状态（REVIEWED, //已审核；UNREVIEWED, //未审核；FAILREVIEWED, 
				sendDoctorId: "",//发药医生
				reviewDoctorId: "",//审核医生
				sendEnum: "",//配送状态（UNSEND, //未配送；SENDING, //配送中；SENDOVER, //已签收）
				//管理统计端  统计筛选返回值  接收参数
				time0: "2017-06-01",//统计筛选起始时间
				time1: "2019-01-25",//统计筛选结束时间
				type: 'DAY', //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天 
				types: '', //String MANAGE账号是什么权限
				monthToYearDoor: {
					months: [],
					years: []
				},//门诊   月年转换
				yTotal1: 0,//统计y轴相加
				yTotal2: 0,//统计y轴相加
				yTotal3: 0,//统计y轴相加
				monthToYearway: [],//处方   月年转换
				monthToYearPeople: [],//就诊人次    月年转换
				//7.1新增门诊参数
				clinicProtocolId: "",//String false 远程门诊协议id（选择协议时必传，非选择的协议可不传）
				clinicProtocolName: "",//String true 远程门诊协议名 
				sureVisiable: 0,//新增业务弹框  保存 查看  编辑  给子组件传值的接收参数
				//选定各个弹框的参数
				relationalDoctor: null,//关联医生
				relationalstate: true,//关联医生
				todayPeople: null,//业务人次
				totalIncome: null,//业务人次
				totalPeople: null,//业务人次



				// element
				// 必备参数
				//时间筛选组件		必备参数
				time: null, // 时间筛选组件    statisticsWay
				//医生信息
				doctorsInfo: {
					headImg: '',
					name: '',
				},





				// 子组件  传入
				tableDataChat: [//聊天	传入数据参数
					{
						prop: "orderNo",
						label: "订单号"
					}
				],
				//新增业务（子组件）
				addData: {
					clickId: '',
					show: false,//是否显示
					type: '1',//1是表示新增家医，2是表示新增在线诊室业务
					businessTypeList: {//新增在线诊室业务类型 
						default: {},
						list: []
					},
					businessName: {},//业务名称
					businessPrice: {},//业务定价
					departmentList: {//科室列表 
						default: {},
						list: []
					},
					doctorList: {//医生列表 
						default: [],
						list: []
					},
					businessDescription: '',//业务描述
					servicePhone: '',//服务电话
					agreement: {//协议
						default: {
							label: "",
							value: ""
						},
						list: [],
						showContent: ''
					},
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
						}
					],
				},

				//处方审核和配送
				cellColor: [
					{
						cell: 4,//cell代表你要给第几列添加类名或者事件
						value: "审核状态",//这是要改变的列的表头名称
						oclass: "ceshi"//这是给要改变列添加的类名，添加类名之后，自己写样式，不改样式只添加事件可传空
					},
				],
				prescriptionAuditDistribution: {
					// 1、筛选
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
							title: '审核状态',
							list: [
								{
									text: '测试',
									value: ''
								}
							]
						},
						{
							more: false,
							title: '配送状态',
							list: [
								{
									text: '测试',
									value: ''
								}
							]
						},
						{
							more: false,
							title: '审核医生',
							list: [
								{
									text: '测试',
									value: ''
								}
							]
						},
						{
							more: false,
							title: '发药医生',
							list: [
								{
									text: '测试',
									value: ''
								}
							]
						}
					],
					//2、表格
					tableBody: {
						total: 10,
						//2.1表头
						columns: [
							{
								prop: "departmentName",
								label: "科室"
							},
							// {
							// 	prop: "clinicId",
							// 	label: "门诊订单号"
							// },
							// {
							// 	prop: "prescriptionOrderId",
							// 	label: "处方订单号"
							// },
							{
								prop: "userName",
								label: "病人"
							},
							{
								prop: "reviewEnum",
								label: "审核状态"
							},
							{
								prop: "reviewDoctorName",
								label: "审核医生"
							},
							{
								prop: "reviewTime",
								label: "审核时间"
							},
							{
								prop: "sendDoctorName",
								label: "发药医生"
							},
							{
								prop: "sendTime",
								label: "发药时间"
							},
							{
								prop: "sendEnum",
								label: "配送状态"
							},
							{
								prop: "prescriptionPrice",
								label: "处方费"
							},
							{
								prop: "sendPrice",
								label: "配送费"
							},
						],
						//2.2表体
						tableData: [],
						//2.3操作
						tableBtn: [
							{
								name: "处方详情",
								oclass: "lanSe",
								method: (index, row) => {
									this.chuFangDetailList2Fun(index, row);
								}
							},
							{
								name: "物流状态",
								oclass: "lanSe",
								method: (index, row) => {
									this.roadStatusList2Fun(index, row);
								}
							},
							{
								name: "聊天记录",
								oclass: "lanSe",
								method: (index, row) => {
									this.viewRecordList2Fun(index, row);
								}
							}
						]
					}
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


				//统计图
				testdata1: {
					dataAxis: [],//每个柱子代表的类名
					data: [],//具体数值
					title: '',//图表标题
					total: ''
				},
				testdata2: {
					dataAxis: [],//每个柱子代表的类名
					data: [],//具体数值
					title: '',//图表标题
					total: ''
				},
				testdata3: {
					dataAxis: [],//每个柱子代表的类名
					data: [],//具体数值
					title: '',//图表标题
					total: ''
				},

			}
		},
		computed: {
			//引入token
			...mapState({
				userSelfInfo: state => state.user.userSelfInfo,
				userInfo: state => state.user.userInfo,
				userSocketInfo: state => state.socket
			}),
		},
		methods: {
			//自调用组件函数
			//在线、处方审核、统计、切换插件返回值
			getNav(data) {
				// console.log(data.i)
				this.getFilter0();//获取科室列表
				this.getFilter1();//审核状态
				this.getFilter2();//配送状态
				this.getFilter3();//审核医生
				this.getFilter4();//发药医生
				if (data.i == 0) {
					this.goNo();
					this.getList1();//管理列表1
				} else if (data.i == 1) {
					this.goNo();
					this.getList2();//管理列表2
				} else if (data.i == 2) {
					this.time0 = "";//统计筛选开始时间
					this.time1 = "";//统计筛选结束时间
					this.goNo();
					this.getList1().then(val => {
						this.getList3();
					});
				}
			},
			goNo() {
				this.chongZ = false;
				this.$nextTick(() => {
					this.chongZ = true;
				});
			},
			//筛选返回值
			getSelect0(data) {//科室筛选
				// console.log(data)
				this.departmentId = data.index.value;
				// console.log(this.departmentId)
				this.getList1();
				this.getList2();
				this.getList3();
			},
			getSelect1(data) {//审核状态
				// console.log(data)
				this.reviewEnum = data.index.value;
				// console.log(this.reviewEnum)
				// this.getList1();
				this.getList2();
			},
			getSelect2(data) {//配送状态
				// console.log(data)
				this.sendEnum = data.index.value;
				// this.getList1();
				this.getList2();
			},
			getSelect3(data) {//审核医生
				this.reviewDoctorId = data.index.value;
				// this.getList1();
				this.getList2();
			},
			getSelect4(data) {//发药医生
				this.sendDoctorId = data.index.value;
				// this.getList1();
				this.getList2();
			},
			adminSearchOne(data) {
				this.searchValue = data;
				this.getList1();
				this.getList2();
			},
			getFilterTime(data) {//统计		//时间选择器返回函数
				// console.log(this.time)
				if (data.time == null) {
					this.type = data.select.value
					this.getList3();
				} else {
					this.time0 = data.time[0];//统计筛选开始时间
					this.time1 = data.time[1];//统计筛选结束时间
					this.type = data.select.value
					this.getList3();
				}
			},



			//筛选列表  管理端
			//1.21.1.科室工具栏 (管理)
			async getFilter0(data) {
				// // console.log(this.userInfo.rooter)
				// // console.log(this.userInfo.manager)
				// if (this.userInfo.manager) {
				// 	this.types = 'MANAGE'
				// } else {
				// 	this.types = 'DOCTOR'
				// }
				const _this = this
				let query = {
					token: this.userInfo.token,
					type: 'MANAGE'
				};
				// console.log(this.userInfo.manager)
				// console.log(query)
				const res = await toolDept(query);
				if (res.data && res.data.errCode === 0) {
					// console.log('1.21.1.科室工具栏 +成功')
					if (res.data.body.length > 6) {
						this.prescriptionAuditDistribution.topFlag[0].more = true;
						this.onLineList.topFlag[0].more = true;
						this.statistics.topFlag[0].more = true;
					} else {
						this.prescriptionAuditDistribution.topFlag[0].more = false;
						this.onLineList.topFlag[0].more = false;
						this.statistics.topFlag[0].more = false;
					}
					this.onLineList.topFlag[0].list.length = 0
					this.prescriptionAuditDistribution.topFlag[0].list.length = 0
					this.statistics.topFlag[0].list.length = 0
					$.each(res.data.body, function (index, text) {
						//在线诊室筛选列表渲染
						_this.onLineList.topFlag[0].list.push({
							text: text.name,
							value: text.id
						});
						//处方审核筛选列表渲染
						_this.prescriptionAuditDistribution.topFlag[0].list.push({
							text: text.name,
							value: text.id
						});
						//统计筛选列表渲染
						_this.statistics.topFlag[0].list.push({
							text: text.name,
							value: text.id
						});
					});
				} else {
					// console.log('1.21.1.科室工具栏 +失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//1.21.2.处方审核状态
			async getFilter1() {
				const _this = this
				let query = {
					token: this.userInfo.token,
				};
				const res = await toolRxReviewStatus(query);
				if (res.data && res.data.errCode === 0) {
					// console.log('1.21.2.处方审核状态 +成功')
					// console.log(res)
					if (res.data.body.length > 6) {
						this.prescriptionAuditDistribution.topFlag[1].more = true;
					} else {
						this.prescriptionAuditDistribution.topFlag[1].more = false;
					}
					this.prescriptionAuditDistribution.topFlag[1].list.length = 0
					$.each(res.data.body, function (index, text) {
						//处方审核状态列表渲染
						_this.prescriptionAuditDistribution.topFlag[1].list.push({
							text: text.name,
							value: text.id
						});
					});
				} else {
					// console.log('1.21.2.处方审核状态+失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//1.21.3.处方配送状态
			async getFilter2() {
				const _this = this
				let query = {
					token: this.userInfo.token,
				};
				const res = await toolRxSendStatus(query);
				if (res.data && res.data.errCode === 0) {
					// console.log('1.21.3.处方配送状态+成功')
					if (res.data.body.length > 6) {
						this.prescriptionAuditDistribution.topFlag[2].more = true;
					} else {
						this.prescriptionAuditDistribution.topFlag[2].more = false;
					}
					this.prescriptionAuditDistribution.topFlag[2].list.length = 0
					$.each(res.data.body, function (index, text) {
						//处方配送状态渲染
						_this.prescriptionAuditDistribution.topFlag[2].list.push({
							text: text.name,
							value: text.id
						});
					});
				} else {
					// console.log('1.21.3.处方配送状态+失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//1.21.4.处方审核医生
			async getFilter3() {
				const _this = this
				let query = {
					token: this.userInfo.token,
				};
				const res = await toolRxReviewDoctors(query);
				if (res.data && res.data.errCode === 0) {
					// console.log('1.21.4.处方审核医生+成功')
					if (res.data.body.length > 6) {
						this.prescriptionAuditDistribution.topFlag[3].more = true;
					} else {
						this.prescriptionAuditDistribution.topFlag[3].more = false;
					}
					this.prescriptionAuditDistribution.topFlag[3].list.length = 0
					$.each(res.data.body, function (index, text) {
						//处方审核医生渲染
						_this.prescriptionAuditDistribution.topFlag[3].list.push({
							text: text.name,
							value: text.id
						});
					});
				} else {
					// console.log('1.21.4.处方审核医生+失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//1.21.5.处方发药医生
			async getFilter4() {
				const _this = this
				let query = {
					token: this.userInfo.token,
				};
				const res = await toolRxSendDoctors(query);
				if (res.data && res.data.errCode === 0) {
					// console.log('1.21.5.处方发药医生+成功')
					if (res.data.body.length > 6) {
						this.prescriptionAuditDistribution.topFlag[4].more = true;
					} else {
						this.prescriptionAuditDistribution.topFlag[4].more = false;
					}
					this.prescriptionAuditDistribution.topFlag[4].list.length = 0
					$.each(res.data.body, function (index, text) {
						//处方发药医生渲染
						_this.prescriptionAuditDistribution.topFlag[4].list.push({
							text: text.name,
							value: text.id
						});
					});
				} else {
					// console.log('1.21.5.处方发药医生+失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},







			// 管理1表			7.5根据条件搜索在线诊室业务 获取列表
			async getList1() {
				// var date = new Date();
				// var year = date.getFullYear();
				// var month = date.getMonth() + 1;
				// var day = date.getDate();
				// if (month < 10) {
				// 	month = "0" + month;
				// }
				// if (day < 10) {
				// 	day = "0" + day;
				// }
				// var nowDate = year + "-" + month + "-" + day;
				// this.time0 = nowDate;
				// this.time1 = nowDate;

				let query = {
					token: this.userInfo.token,
					string: this.searchValue,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					departmentId: this.departmentId,
					businessType: this.businessType
				};
				const res = await searchClinic(query);
				if (res.data && res.data.errCode === 0) {
					// console.log('列表1+成功')
					// console.log("time0:", this.time0)
					// console.log("time1:", this.time1)
					// console.log("res:", res)
					// console.log("list:", res.data.body.data2.list)
					// console.log("total:", res.data.body.data2.total)
					const lists = res.data.body.data2.list
					this.totals = res.data.body.data2.total
					for (let j = 0; j < lists.length; j++) {
						for (let i = 0; i < lists[j].doctors.length; i++) {
							// // console.log(lists[j].doctors[i].doctorStates)
							if (lists[j].doctors[i].doctorStates & lists[j].doctors[i].doctorStates === true) {
								lists[j].doctors[i].doctorStates = '接诊中...'
							} else {
								lists[j].doctors[i].doctorStates = '未接诊'
							}
						}
					}
					for (let j = 0; j < lists.length; j++) {
						lists[j].totalPeople = "总: " + lists[j].totalPeople + "  今日: " + lists[j].todayPeople;
						lists[j].doctor1 = lists[j].doctors
						lists[j].doctors = "查看"
					}
					this.tableData = lists;
				} else {
					//失败
					// console.log('列表1+失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},






			// 管理1表   表体操作区





			async relateDoctors1(row, column, cell, event) {
				this.state = row.state//保存对应行的  禁用状态
				this.onLineId = row.id//保存对应行的   业务编号
				// console.log(row, column, '表一点击事件')
				//管理1.1表   关联医生表   cell-click当某个单元格被点击时会触发该事件row, column, cell, event
				if (column.label === "关联医生") {
					this.isShowrelationalDoctor = true;
					let query = {
						token: this.userInfo.token,
						string: this.searchValue,
						pageNum: this.pageNum,
						pageSize: "",
						departmentId: this.departmentId,
						businessType: this.businessType
					};
					const res = await searchClinic(query);
					if (res.data && res.data.errCode === 0) {
						// console.log('二次请求列表1关联医生+成功')
						// console.log(res.data.body.data2.list)
						// console.log(row.doctor1)
						const lists = res.data.body.data2.list
						this.relationalDoctor = row.doctor1
					} else {
						//失败
						// console.log('列表1+失败')
						this.$notify.error({
							title: "警告",
							message: res.data.errMsg
						});
					}
				}
				//管理1.2表  业务人次表   cell-click当某个单元格被点击时会触发该事件row, column, cell, event
				if (column.label === "业务人次") {
					this.isShowRecord = true;
					// fetchMzOrderInfo,6.8.远程门诊订单列表弹框数据（WEB端使用） 
					let query = {
						token: this.userInfo.token,
						businessId: row.id,//String true 远程门诊业务id 
						pageNum: this.pageNum,
						pageSize: ""
					};
					const res = await fetchMzOrderInfo(query);
					// // console.log(query)
					const lists = res.data.body.data2.list
					if (res.data && res.data.errCode === 0) {
						// console.log('总，今日，获取订单详情+成功')
						// console.log(res)
						this.tableDataChat = lists;//订单详情没有数据
					} else {
						//失败
						// console.log('总，今日，获取订单详情+失败')
						this.$notify.error({
							title: "警告",
							message: res.data.errMsg
						});
					}
				}
			},









			// 管理1表
			//业务人次   中发起会谈
			async isShowRecordChatFun(data) {
				this.sessionIds = ""
				this.isShowRecordChat = true;
				// console.log(data)
				this.sessionIds = data.bindSessionId
			},
			async relateDoctors2(row, column, cell, event) {
				// console.log(row, column)
			},






			// 管理2表 (管理端处方表)  .
			async getList2() {
				// console.log(this.searchValue)
				let query = {// 7.11根据条件获取处方信息 
					token: this.userInfo.token,
					departmentId: this.departmentId,
					reviewEnum: this.reviewEnum,
					sendEnum: this.sendEnum,
					reviewDoctorId: this.reviewDoctorId,
					sendDoctorId: this.sendDoctorId,
					string: this.searchValue,//门诊订单号
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				};
				const res = await prescriptionDetailByCondition(query);
				if (res.data && res.data.errCode === 0) {
					// console.log('列表2+成功')
					// console.log("time0:", this.time0)
					// console.log("time1:", this.time1)
					// console.log("res:", res)
					// console.log("list:", res.data.body.data2.list)
					// console.log("total:", res.data.body.data2.total)
					this.totals = res.data.body.data2.total;
					const lists = res.data.body.data2.list
					$.each(lists, function (index, text) {
						if (text.reviewEnum == "UNREVIEWED") {
							text.reviewEnum = '未审核'
						} else if (text.reviewEnum == "REVIEWED") {
							text.reviewEnum = '已审核'
						} else if (text.reviewEnum == "FAILREVIEWED") {
							text.reviewEnum = '不通过'
						} else {
							text.reviewEnum = '出错了'
						};
						if (text.sendEnum == "UNSEND") {
							text.sendEnum = '未配送'
						} else if (text.sendEnum == "SENDING") {
							text.sendEnum = '配送中'
						} else if (text.sendEnum == "SENDOVER") {
							text.sendEnum = '已签收'
						} else {
							text.sendEnum = '出错了'
						}
					})
					this.prescriptionAuditDistribution.tableBody.tableData = lists;
				} else {
					//失败
					// console.log('列表2+失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},





			//管理3表（统计表）
			//统计图表数据的获取
			async getList3() {
				this.getList31();
				this.getList32();
				this.getList33();
			},
			// 6.9.远程门诊订单统计柱状图 
			async getList31() {
				const _this = this
				let query = {
					token: this.userInfo.token,
					deptId: this.departmentId, //String false 科室ID 
					starTime: this.time0, //String false 开始日期，示例：2019-01 - 01 
					endTime: this.time1, //String false 结束日期，示例：2019-01 - 25 
					// starTime: "", //String false 开始日期，示例：2019-01 - 01 
					// endTime: "", //String false 结束日期，示例：2019-01 - 25 
					type: this.type //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天
				};
				// // console.log(query)
				const res = await orderYcmzCharts(query);
				if (res.data && res.data.errCode === 0) {
					// console.log('统计图+门诊订单+成功')
					// console.log(res)
					const lists = res.data.body.data
					// // console.log(lists)
					// console.log(this.type)
					this.yTotal1 = 0
					this.testdata1.dataAxis.length = 0
					this.testdata1.data.length = 0
					$.each(lists, function (index, text) {
						_this.yTotal1 += text.y;
						_this.testdata1.dataAxis.push(text.x)
						_this.testdata1.data.push(text.y)
					});
					this.testdata1.title = "门诊订单"
					this.testdata1.total = "总数：" + this.yTotal1
					this.testdata1 = Object.assign({}, this.testdata1);
					// console.log(this.yTotal1)
				} else {
					//失败
					// console.log('统计图+门诊订单+失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			// 6.10.处方订单统计柱状图 
			async getList32() {
				const _this = this
				let query = {
					token: this.userInfo.token,
					deptId: this.departmentId, //String false 科室ID 
					starTime: this.time0, //String false 开始日期，示例：2019-01 - 01 
					endTime: this.time1, //String false 结束日期，示例：2019-01 - 25 
					// starTime: "", //String false 开始日期，示例：2019-01 - 01 
					// endTime: "", //String false 结束日期，示例：2019-01 - 25 
					type: this.type //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天
				};
				// // console.log(query)
				const res = await orderRxCharts(query);
				if (res.data && res.data.errCode === 0) {
					// console.log('统计图+处方订单+成功')
					// console.log(res)
					const lists = res.data.body.data
					// console.log(lists)
					// console.log(this.type)
					this.yTotal2 = 0
					this.testdata2.dataAxis.length = 0
					this.testdata2.data.length = 0
					$.each(lists, function (index, text) {
						_this.yTotal2 += text.y;
						_this.testdata2.dataAxis.push(text.x)
						_this.testdata2.data.push(text.y)
					});
					this.testdata2.title = "处方订单"
					this.testdata2.total = "总数：" + this.yTotal2
					this.testdata2 = Object.assign({}, this.testdata2);
					// console.log(this.yTotal2)
					// console.log(this.testdata2)
				} else {
					//失败
					// console.log('统计图+处方订单+失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			// 7.3.1远程门诊就诊人次柱状统计图 
			async getList33() {
				const _this = this
				let query = {
					token: this.userInfo.token,
					departmentId: this.departmentId, //String false 科室ID 
					startTime: this.time0, //String false 开始日期，示例：2019-01 - 01 
					endTime: this.time1, //String false 结束日期，示例：2019-01 - 25 
					// startTime: "", //String false 开始日期，示例：2019-01 - 01 
					// endTime: "", //String false 结束日期，示例：2019-01 - 25 
					type: this.type //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天
				};
				// // console.log(query)
				const res = await statisticsPeople(query);
				if (res.data && res.data.errCode === 0) {
					// console.log('统计图+就诊人次+成功')
					// console.log(res)
					const lists = res.data.body
					// // console.log(lists)
					// console.log(this.type)
					this.yTotal3 = 0
					this.testdata3.dataAxis.length = 0
					this.testdata3.data.length = 0
					$.each(lists, function (index, text) {
						_this.yTotal3 += text.y;
						_this.testdata3.dataAxis.push(text.x)
						_this.testdata3.data.push(text.y)
					});
					this.testdata3.title = "就诊人次"
					this.testdata3.total = "总数：" + this.yTotal3
					this.testdata3 = Object.assign({}, this.testdata3);
					// console.log(this.yTotal3)
				} else {
					//失败
					// console.log('统计图+就诊人次+失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},






			// 复用弹框   重置区     渲染下拉列表




			//弹出  新增业务  表单
			isShowNewOutPatientFun() {
				this.addData.show = true
				this.sureVisiable = 0;
				this.newClinic0();//新增门诊弹框  数据渲染
				this.getList1()
			},
			//渲染  新增业务   表单
			//根据医院获取科室
			async newClinic0() {
				this.addData.businessTypeList.default = { label: '在线诊室', value: '1' }
				this.addData.departmentList.default = {}
				this.addData.departmentList.list.length = 0
				this.addData.doctorList.default.length = 0
				this.addData.doctorList.list.length = 0
				this.addData.agreement.default = { label: "", value: "" }
				this.addData.agreement.list.length = 0
				this.addData.agreement.showContent = ''
				this.addData.servicePhone = ''
				this.addData.businessName = {}
				this.addData.businessPrice = {}
				this.addData.businessDescription = ''
				// console.log(this.addData)
				const _this = this;
				let query = {
					orgCode: this.userInfo.hospitalCode,
					token: this.userInfo.token,//用户登录标识
					deptId: "",//科室ID，无该参数则返回医院全部科室，有该参数则会过滤科室列表
					type: "MANAGE"//使用来源，DOCTOR医生端标签来源，MANAGE管理端标签页使用
				}

				const res = await fetchHospitalDeptAuth(query);								//1.2.1.获取医院科室列表（新）主要用于表单选择()
				if (res.data && res.data.errCode === 0) {
					// console.log('新增弹框渲染+科室+成功')
					// console.log(res)
					$.each(res.data.body, function (index, text) {
						_this.addData.departmentList.list.push({
							label: text.deptName,
							value: text.deptId
						});
					});
					this.getDepartment();
				} else {
					// console.log('新增弹框渲染+新增业务+失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//获取新增门诊弹框内所选科室返回的id
			getDepartment(data) {
				// console.log(data)
				if (data) {
					this.departmentId = data;
					this.addData.doctorList.list.length = 0
					this.newClinic1();
				}
			},
			//根据科室获取关联医生
			async newClinic1() {
				const _this = this;
				let query = {
					token: this.userInfo.token,
					orgCode: this.userInfo.hospitalCode,	//String true 医院代码 
					deptId: this.departmentId,//String false 科室id 
				};
				// // console.log(query)
				const res = await doctorsByOrgCodeAndDeptId(query);
				if (res.data && res.data.errCode === 0) {
					// console.log('新增弹框渲染+关联医生+成功')
					// console.log(res)
					// res.data.body.map(item => // console.log(item))
					$.each(res.data.body, function (index, text) {
						_this.addData.doctorList.list.push({
							label: text.doctorName,
							value: text.doctorId
						});
					});
					this.newClinic2();
				} else {
					//失败
					// console.log('新增弹框渲染+关联医生+失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//根据科室获取定义协议
			async newClinic2() {
				// // console.log(this.userInfo.token)
				// // console.log(this.userSelfInfo.userId)
				const _this = this;
				let query = {
					token: this.userInfo.token,
					departmentId: this.departmentId,//String false 科室id 
				};
				const res = await protocols(query);
				if (res.data && res.data.errCode === 0) {
					// console.log('新增弹框渲染+协议+成功')
					// console.log(res)
					$.each(res.data.body, function (index, text) {
						_this.addData.agreement.list.push({
							label: text.protocolName,
							value: text.protocolId,
						});
					});
					// // console.log(this.addData.agreement.list)
				} else {
					//失败
					// console.log('新增弹框渲染+协议+失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			// 获取协议选择情况
			async getSelectInfo(data) {
				// // console.log(`选择内容：${data.item};选择索引：${data.index}`)
				// // console.log(data.item.value)//插件返回值//获取协议选择情况
				//根据协议id获取协议内容
				let query = {
					token: this.userInfo.token,
					protocolId: data.item.value//String true 协议id 
				};
				const res = await protocolById(query);
				if (res.data && res.data.errCode === 0) {
					// console.log('新增弹框渲染+协议内容+成功')
					// // console.log(res)
					// 保存返回来的协议id和协议表体，提交时要用
					this.clinicProtocolId = res.data.body.protocolId
					this.clinicProtocolName = res.data.body.protocolName
					//渲染协议到弹框内
					// this.addData.agreement.defaultItem = data.index;//此处传的是索引 ，不能直接传接收到的数据
					this.addData.agreement.default.label = res.data.body.protocolName
					this.addData.agreement.default.value = res.data.body.protocolId
					this.addData.agreement.showContent = res.data.body.protocolContent
				} else {
					//失败
					// console.log('新增弹框渲染+协议内容+失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
				// console.log(this.addData.agreement)
			},







			//操作区 （复用  新增业务弹框）  渲染



			// 管理1表   操作区  
			//查看详情   管理1表
			async isShowViewDetailFun(row) {
				let _this = this
				this.addData.show = true
				this.sureVisiable = 1;
				this.addData.doctorList.list.length = 0;
				this.newClinic0();//新增门诊弹框内容渲染
				// if (this.addData.doctorList.list.length !== 0) {
				let query = {
					token: this.userInfo.token,
					clinicId: row.id,//String true 远程门诊业务id 
				};
				const res = await clinicDetail(query);// clinicDetail,//7.3查看远程门诊业务详情
				if (res.data && res.data.errCode === 0) {
					// console.log('查看详情表格内容+成功')
					const lists = res.data.body
					// console.log(lists)
					this.addData.businessDescription = lists.desc;//业务描述
					this.addData.agreement.showContent = lists.protocolContent;//协议内容
					this.addData.servicePhone = lists.phone;//服务电话
					const fullName = { label: lists.fullName, }
					this.addData.businessName = fullName;//业务名称
					const price = { label: lists.price.worth, }
					this.addData.businessPrice = price;//业务定价
					const departmentLista = { label: lists.departmentName, value: lists.departmentId }
					this.addData.departmentList.default = departmentLista;//科室
					$.each(lists.doctors, function (index, text) {
						_this.addData.doctorList.default.push(text.doctorId)//关联医生	
					})
					this.addData.agreement.default = { label: lists.protocolName, value: lists.protocolId }//协议id
					// console.log(this.addData)
					// this.addData = Object.assign({},this.addData);
					//选择科室
					// this.getList1()
				} else {
					//失败
					// console.log('查看详情表格内容+失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
				// }
			},
			//编辑   管理1表
			async isShowEditFun(row) {
				let _this = this
				this.addData.show = true
				this.sureVisiable = 2;
				this.newClinic0();//新增门诊弹框内容渲染
				let query0 = {
					token: this.userInfo.token,
					clinicId: row.id,//String true 远程门诊业务id 
				};
				const res = await clinicDetail(query0);
				if (res.data && res.data.errCode === 0) {
					// console.log('编辑表格渲染+成功')
					const lists = res.data.body
					// console.log(lists)
					this.addData.businessDescription = lists.desc;//业务描述
					this.addData.agreement.showContent = lists.protocolContent;//协议内容
					this.addData.servicePhone = lists.phone;//服务电话
					const fullName = { label: lists.fullName, }
					this.addData.businessName = fullName;//业务名称
					const price = { label: lists.price.worth, }
					this.addData.businessPrice = price;//业务定价
					const departmentLista = { label: lists.departmentName, value: lists.departmentId }
					this.addData.departmentList.default = departmentLista;//科室
					$.each(lists.doctors, function (index, text) {
						_this.addData.doctorList.default.push(text.doctorId)//关联医生
						// console.log(text.doctorId)
					})
					this.addData.agreement.default = { label: lists.protocolName, value: lists.protocolId }//协议id
					// console.log(this.addData)
				} else {
					//失败
					// console.log('编辑表格渲染+失败')
					// console.log(lists.protocolName)
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//禁用接口的调用
			async isShowForbidFun(row) {
				// console.log(row)

				this.status1 = !row.state
				let query = {
					token: this.userInfo.token
				};
				let options = {
					clinicId: row.id,
					status: this.status1
				};
				const res = await disableClinic(query, options);
				if (res.data && res.data.errCode === 0) {
					this.getList1()
				} else {
					// console.log('禁用失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			// 管理2表   操作区  
			//处方详情   管理2表(图片)
			async chuFangDetailList2Fun(index, row) {
				this.chuFangDetailList2 = true;
				this.srcs = row.id
				// let query = {
				// 	token: this.userInfo.token,
				// 	prescriptionId:row.id
				// };
				// const res = await prescriptionDetailById(query);
				// if (res.data && res.data.errCode === 0) {
				// 	// console.log('处方详情图片+成功')
				// 	// console.log(res)
				// } else {
				// 	// console.log('处方详情图片+失败')
				// 	this.$notify.error({
				// 		title: "警告",
				// 		message: res.data.errMsg
				// 	});
				// }
			},
			//物流状态   管理2表
			async roadStatusList2Fun(index, row) {
				// console.log(index, row)
				this.roadStatusList2 = true;
				let query = {
					token: this.userInfo.token,
					prescriptionId: row.id
				};
				const res = await drugHaulStatus(query);//接口还没写
				if (res.data && res.data.errCode === 0) {
					// console.log(res)
					this.roadStatusList2List = res.data.body
					// console.log("物流状态+成功");
				} else {
					// console.log('物流状态+失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//聊天记录   管理2表
			async viewRecordList2Fun(index, row) {
				this.sessionIds = ""
				this.viewRecordList2 = true;
				// console.log(index, row)
				this.sessionIds = row.prescriptionSessionId
			},





			// 提交区




			// 7.1  提交		（复用表单）  数据
			async getData(data) {
				// console.log(data)
				if (this.sureVisiable == 0) {
					let query = {
						token: this.userInfo.token
					};
					// // console.log(this.clinicProtocolName)
					const options = {
						clinicId: '',//String false 远程门诊id（新增为空，编辑不为空） 
						clinicType: data.businessTypeList.default.label,//String true 远程门诊类型 
						clinicName: data.businessName.label,//String true 远程门诊名 
						clinicPrice: data.businessPrice.label,//long true 远程门诊价格 
						clinicDepartmentId: data.departmentList.default.value,//String true 远程门诊科室id 

						orgCode: this.userInfo.hospitalCode,//String true 远程门诊医院id 
						clinicDoctors: data.doctorList.default,//List true 远程门诊医生 
						clinicDesc: data.businessDescription,//String true 远程门诊描述 
						clinicProtocolId: data.agreement.default.value,//String false 远程门诊协议id（选择协议时必传，非选择的协议可不传） 
						clinicProtocolName: data.agreement.default.label,//String true 远程门诊协议名 
						clinicProtocolContent: data.agreement.showContent,//String true 远程门诊协议内容 
						clinicPhone: data.servicePhone,//String true 远程门诊电话 
						status: this.state//boolean false 远程门诊状态（禁用操作时值必传） 
					};
					// // console.log(query, options)
					const res = await addClinic(query, options);
					if (res.data && res.data.errCode === 0) {
						// console.log('7.1新增业务+成功')
						this.departmentId = ""
						this.getList1()
						this.addData.show = false
						this.addData.agreement.default = { label: "", value: "" }
					} else {
						// console.log('7.1新增业务+失败')
						//失败
						this.$notify.error({
							title: "警告",
							message: res.data.errMsg
						});
					}
				}
				else if (this.sureVisiable == 2) {
					// console.log(data)
					// console.log(this.addData.agreement)
					let a = 0;
					for (let index = 0; index < this.addData.agreement.list.length; index++) {
						//协议第二步才有内容，所以在只改动协议内容时，做不了匹配判断，除非第一步就把showcontent返回来，才可以判断
						// if (this.addData.agreement.list[index].label == data.agreement.default.label & this.addData.agreement.showContent == data.agreement.showContent) {
						if (this.addData.agreement.list[index].label == data.agreement.default.label & this.addData.agreement.showContent == data.agreement.showContent) {
							// alert(1)
							data.agreement.default.value = this.addData.agreement.list[index].value
							a = 1
							break;
						} else {
							// alert(0)
						}
					}
					if (a == 0) {
						data.agreement.default.value = ""
					}



					let query = {
						token: this.userInfo.token
					};
					const options = {
						clinicId: this.onLineId,//String false 远程门诊id（新增为空，编辑不为空） 
						clinicType: data.businessTypeList.default.label,//String true 远程门诊类型 
						clinicName: data.businessName.label,//String true 远程门诊名 
						clinicPrice: data.businessPrice.label,//long true 远程门诊价格 
						clinicDepartmentId: data.departmentList.default.value,//待请求的  String true 远程门诊科室id 
						clinicDoctors: data.doctorList.default,//List true 远程门诊医生 
						clinicDesc: data.businessDescription,//String true 远程门诊描述 
						clinicProtocolContent: data.agreement.showContent,//String true 远程门诊协议内容 
						clinicPhone: data.servicePhone,//String true 远程门诊电话 
						orgCode: this.userInfo.hospitalCode,//医院代码
						clinicProtocolId: data.agreement.default.value,//String false 远程门诊协议id（选择协议时必传，非选择的协议可不传） 
						clinicProtocolName: data.agreement.default.label,//String true 远程门诊协议名 
						status: this.state//boolean false 远程门诊状态（禁用操作时值必传） 
					};
					// console.log(data.agreement)
					// console.log(data.agreement.default)
					const res = await updateClinic(query, options);
					if (res.data && res.data.errCode === 0) {
						// console.log('7.2编辑业务+成功')
						this.getList1()
						this.addData.show = false
						// this.addData.agreement.default = { label: "", value: "" }
					} else {
						// console.log('7.2编辑业务+失败')
						//失败
						this.$notify.error({
							title: "警告",
							message: res.data.errMsg
						});
					}
				}
				else if (this.sureVisiable == 1) {
					this.addData.show = false
				}
			},
			// 分页
			// 组件返回函数
			currentChange1(data) {
				// console.log(data)
				this.pageNum = data
				this.getList1()
			},
			currentChange2(data) {
				// console.log(data)
				this.pageNum = data;
				this.getList2();

			},
			//表格样式
			ceshi0(data) {
				if (data.columnIndex == 4) {
					return 'ceshi'
				} else if (data.columnIndex == 5) {
					return 'ceshiLan'
				}
			}





		},



		async created() {
			// alert("userId:  " + this.userSelfInfo.userId)
			// alert("hospitalCode:  " + this.userInfo.hospitalCode)
			this.getFilter0();//获取科室列表
			this.getFilter1();//审核状态
			this.getFilter2();//配送状态
			this.getFilter3();//审核医生
			this.getFilter4();//发药医生
			this.getList1();//管理列表1
			// this.newClinic0();//新增门诊弹框内容渲染
			// this.getList2();//管理列表2
			// this.getList3();//管理图表3（统计图表数据获取）
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .evaluateBox1 .el-scrollbar__wrap {
		overflow-x: hidden !important;
	}

	.hospital-management-outpatient {}

	.hospital-management-outpatient-nav {}

	.offerDetial {
		/deep/ .el-dialog {
			margin-top: 22vh !important;

			.cell {
				white-space: nowrap;
			}
		}
	}

	.out-border {
		background: #FFF;
		border: 1px solid var(--color5);
		box-shadow: 0 0.06rem 0.36rem 0 rgba(0, 62, 100, 0.04);
		border-radius: 0.04rem;
		padding-top: 0.32rem;
		padding-right: 0.69rem;
		padding-left: 0.38rem;
		/* min-height: 76vh; */
		margin-right: 0.36rem;
		margin-top: 0.42rem;
	}

	.online-clinic {}


	/deep/ .el-table__header-wrapper th {
		font-family: PingFangSC-Semibold;
		font-size: 14px;
		color: #5E6875;
		letter-spacing: 0;
	}

	/deep/ .el-table__body-wrapper td {
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #5E6875;
		letter-spacing: 0;
	}

	.online-clinic-top {
		display: flex;
		justify-content: space-between;
		margin: 0 0 0.2rem 0;
	}

	.online-clinic-top>div {
		flex: 1;
	}

	.online-clinic-top-right {
		display: flex;
		justify-content: space-between;
	}

	.online-clinic-top-right>.el-button {
		width: 1.96rem;
		height: 0.4rem;
		margin: 0 0 0 0.1rem;
		padding: 0;
		font-size: var(--fontSize6);
	}

	.online-clinic-top-right>.el-button>span {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		font-size: var(--fontSize6);
	}

	.hospital-management-outpatient-statistics-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.hospital-management-outpatient-statistics-top>div {
		flex: 1;
	}

	.hospital-management-outpatient-statistics-midle {
		margin: 40px 0 0 0;

		div {
			display: grid;
			grid-template-columns: 1fr 1fr;
			justify-content: start;
			align-items: center;
			/* flex-wrap: wrap; */
		}
	}

	.evaluateBox1 {
		overflow: auto;

		/deep/ .el-dialog--center .el-dialog__body {
			/* overflow: auto; */
			/* height: 450px; */

		}

		/deep/ .el-dialog {
			margin-top: 32vh !important;
		}

		ul {
			li {
				display: flex;
				align-items: center;
				margin: 10px 0;
				display: flex;
				justify-content: space-between;
				padding: 0 30px 0 0;

				.evaluateCont1 {
					display: flex;
					justify-content: space-around;
					align-items: center;

					img {
						width: 0.5rem;
						border-radius: 50%;
						margin: 0 0.2rem 0 0;
					}
				}

				.evaluateCont2 {
					margin: 0 0 0 1.5rem;
				}
			}

		}
	}

	/* 查看详情 */
	.hisMain {
		padding: 10px 28px;
	}

	.ohisList {
		margin-bottom: 25px;
	}

	.ohisList>h3 {
		margin-bottom: 15px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #000000;
		letter-spacing: -0.4px;
		font-weight: normal;
	}

	.ohisListMain {
		display: flex;
		display: -webkit-flex;
		margin-bottom: 15px;
	}

	.ohisListMain>div:first-child {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		margin-right: 12px;
	}

	.ohisListMain>div:first-child>img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.ohisListRg>div {
		font-size: 0.14rem;
		font-family: PingFangSC-Regular;
		color: #323c47;
	}

	.ohisListRg>div:first-child {
		color: #939eab;
		font-size: 0.12rem;
	}

	.ooRed {
		color: red !important;
	}


	.mainTab {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
	}

	.visiting-hospital {
		color: var(--color18);
		line-height: 0.22rem;
	}

	.visiting-department-on {
		font-family: var(--fontFamily4);
		font-size: var(--fontSize2);
		color: var(--color19);
		line-height: 0.22rem;
	}

	.visiting-department-name {
		font-size: var(--fontSize1);
		color: var(--borderColor5);
	}

	.visiting-content {
		margin: 10px 0 0 0;
		height: 0.76rem;
		/* background: #F3F6FA; */
		border-radius: 4px;
	}

	.online-clinic-middle /deep/ .el-table__header-wrapper .el-table__header .has-gutter tr th div {
		/* text-align: center; */
		white-space: nowrap !important;
		padding: 0;
	}

	.online-clinic-middle /deep/ .el-table__body-wrapper tr .cell {
		/* text-align: center; */
		white-space: nowrap !important;
		padding: 0;
		/* width: 70px !important; */
	}

	.online-clinic-middle /deep/ .el-table__fixed-right .el-table__fixed-body-wrapper .cell {}

	/* .chaKanXiangQing {
		width: 57px;
		height: 20px;
		background: rgba(66, 133, 244, 0.1);
		border: 1px solid rgba(66, 133, 244, 0.6);
		border-radius: 3px;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #4d7cfe;
		line-height: 3px;
	}

	.bianJi {
		width: 57px;
		height: 20px;
		background: rgba(46, 189, 65, 0.10);
		border: 1px solid rgba(46, 189, 65, 0.60);
		border-radius: 3px;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #2EBD41;
		line-height: 3px;
	}

	.jingYong {
		width: 57px;
		height: 20px;
		background: rgba(254, 77, 151, 0.10);
		border: 1px solid rgba(254, 77, 151, 0.60);
		border-radius: 3px;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #FE4D97;
		line-height: 3px;
	}

	.jieChuJingYong {
		width: 57px;
		height: 20px;
		background: rgba(255, 171, 43, 0.10);
		border: 1px solid rgba(255, 171, 43, 0.60);
		border-radius: 3px;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #FFAB2B;
		line-height: 3px;
	} */
</style>