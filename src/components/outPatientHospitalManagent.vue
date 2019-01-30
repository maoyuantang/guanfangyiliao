<!--门诊系统医院管理页面-->
<template>
	<div class="hospital-management-outpatient">
		<div class="hospital-management-outpatient-nav">
			<normalTab v-model="navInfo" @reBack="getNav"></normalTab>
		</div>
		<div class="out-border">
			<!-- 在线诊室管理 -->
			<div class="online-clinic" v-if="navInfo.i===0">
				<div class="online-clinic-top">
					<div class="online-clinic-top-left">
						<selftag :inData="onLineList.topFlag[0]" @reback="getFilter0"></selftag>
						<selftag v-model="onLineList.topFlag[1]" @reback="getFilter1"></selftag>
					</div>
					<div class="online-clinic-top-right">
						<search @searchValue="adminSearchOne"></search>
						<el-button type="primary" @click="isShowNewOutPatientFun">新增业务</el-button>
					</div>
				</div>


				<div class="online-clinic-middle">
					<el-table :data="tableData" border style="width: 100%;" @cell-click="relateDoctors">
						<el-table-column fixed prop="id" label="业务编号"></el-table-column>
						<el-table-column prop="departmentName" label="科室"></el-table-column>
						<el-table-column prop="fullName" label="业务名"></el-table-column>
						<el-table-column prop="price" label="价格"></el-table-column>
						<el-table-column prop="doctors" label="关联医生"></el-table-column>
						<el-table-column prop="totalPeople" label="业务人次"></el-table-column>
						<el-table-column prop="totalIncome" label="总收入"></el-table-column>
						<el-table-column prop="queuePeople" label="当前排队"></el-table-column>
						<el-table-column prop="updateTime" label="最近修改"></el-table-column>
						<el-table-column fixed="right" label="" width="300">
							<template slot-scope="scope">
								<el-button @click="isShowRecordFun(scope.row)" type="text" size="small">查看记录</el-button>
								<el-button @click="isShowEditFun(scope.row)" type="text" size="small">编辑</el-button>
								<el-button @click="isShowForbidFun(scope.row)" type="text" size="small">禁用</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>


			<!-- 处方审核和配送 -->
			<div v-else-if="navInfo.i===1">
				<div class="online-clinic-top">
					<div class="online-clinic-top-left">
						<selftag v-model="prescriptionAuditDistribution.topFlag[0]" @reback="getFilter0"></selftag>
						<selftag v-model="prescriptionAuditDistribution.topFlag[1]" @reback="getFilter1"></selftag>
						<selftag v-model="prescriptionAuditDistribution.topFlag[2]" @reback="getFilter2"></selftag>
						<selftag v-model="prescriptionAuditDistribution.topFlag[3]" @reback="getFilter3"></selftag>
						<selftag v-model="prescriptionAuditDistribution.topFlag[4]" @reback="getFilter4"></selftag>
					</div>
					<div class="online-clinic-top-right">
						<search></search>
						<!-- <el-button type="primary">新增业务</el-button> -->
					</div>

				</div>
				<div class="online-clinic-middle">
					<publicList :columns="prescriptionAuditDistribution.tableBody.columns" :tableData="prescriptionAuditDistribution.tableBody.tableData"
					 :tableBtn="prescriptionAuditDistribution.tableBody.tableBtn">
					</publicList>
				</div>
			</div>
			<!-- 统计 -->
			<div v-else-if="navInfo.i===2" class="statistics">
				<div class="hospital-management-outpatient-statistics-top">
					<div class="hospital-management-outpatient-statistics-top-left">
						<selftag v-model="statistics.topFlag[0]" @reback="getFilter0"></selftag>
					</div>
					<div class="hospital-management-outpatient-statistics-top-right">
						<statisticsWay v-model="time" @reBack="getFilterTime"></statisticsWay>
					</div>
				</div>
				<div class="hospital-management-outpatient-statistics-midle">

				</div>
			</div>

		</div>
		<!-- 新增门诊弹框 -->
		<addNewFrame :inData="addData" @reback="getData"></addNewFrame>

		<!-- 表一查看关联医生弹框 -->
		<el-dialog class="evaluateBox1" title=" 医生详情" :visible.sync="isShowrelationalDoctor" width="503px" hight="470px"
		 center>
			<ul>
				<li v-for="(text,index) in relationalDoctor" :key="index">
					<div class="evaluateCont1">
						<!-- 待头像 -->
						<img src="../assets/img/ME.png" />
						<h5>{{text.doctorName}}</h5>
					</div>
					<div class="evaluateCont2">
						<!-- <div>{{text.doctorId}}</div> -->
						<!-- 医生接诊状态 -->
						<div>{{text.doctorStates}}</div>
					</div>
				</li>
			</ul>
		</el-dialog>

		<!-- 查看记录弹框 -->
		<el-dialog class="  " title="查看记录" :visible.sync="isShowRecord" center width=70%>
			<el-table :data="tableDataChat" border style="width: 100%;" @cell-click="relateDoctors">
				<el-table-column fixed prop="id" label="业务编号"></el-table-column>
				<el-table-column prop="departmentName" label="科室"></el-table-column>
				<el-table-column prop="fullName" label="业务名"></el-table-column>
				<el-table-column prop="price" label="价格"></el-table-column>
				<el-table-column prop="doctors" label="关联医生"></el-table-column>
				<el-table-column prop="totalPeople" label="业务人次"></el-table-column>
				<el-table-column prop="totalIncome" label="总收入"></el-table-column>
				<el-table-column prop="queuePeople" label="当前排队"></el-table-column>
				<el-table-column prop="updateTime" label="最近修改"></el-table-column>
				<el-table-column fixed="right" label="" width="200px">
					<template slot-scope="scope">
						<el-button @click="isShowRecordChatFun(scope.row)" type="text" size="small">门诊交流</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>

		<!-- 查看记录弹框中的聊天弹框 -->
		<el-dialog class="  " title="聊天模块" :visible.sync="isShowRecordChat" center>
			聊天模块
		</el-dialog>

		<!-- 编辑 -->
		<el-dialog title="编辑" :visible.sync="isShowEdit" center>
			<ul>
				<li>1</li>
				<li>2</li>
				<li>3</li>
			</ul>
		</el-dialog>

		<!-- 处方详情 -->
		<el-dialog title="处方详情" :visible.sync="isShowPrescriptionDetail" center>
			<ul>
				<li>1</li>
				<li>2</li>
				<li>3</li>
			</ul>
		</el-dialog>

		<!-- 物流状态 -->
		<el-dialog title="物流状态" :visible.sync="isShowLogisticsStatus" center>
			<ul>
				<li>1</li>
				<li>2</li>
				<li>3</li>
			</ul>
		</el-dialog>


	</div>
</template>

<script>
	//引入接口
	import {
		// 已使用接口
		addClinic,//7.1新增业务
		searchClinic,//7.5门诊列表1
		prescriptionDetailByCondition,//7.11出方列表2
		disableClinic,//7.4禁用远程门诊业务和诊室
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

		// 非筛选条件下的科室列表
		fetchHospitalDepts,//2.2.获取医院科室列表
	} from "../api/apiAll.js";
	//引入组件
	import normalTab from '../public/publicComponents/normalTab.vue'
	import selftag from '../public/publicComponents/selftag.vue'
	import search from '../public/publicComponents/search.vue'
	import publicList from '../public/publicComponents/publicList.vue'
	import normalColumnChart from '../public/publicComponents/normalColumnChart.vue'
	import statisticsWay from '../public/publicComponents/statisticsWay.vue'
	import addNewFrame from '../public/publicComponents/addNewFrame.vue'
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
		},
		data() {
			return {
				addData: {
					show: false,//是否显示
					type: '1',//1是表示新增家医，2是表示新增在线诊室业务
					businessTypeList: [//新增在线诊室业务类型
						{
							label: '',
							value: ''
						}
					],
					businessTemplate: [//新增家医业务模板
						{
							label: '',
							value: ''
						}
					],
					departmentList: [//科室列表
						// {
						// 	label: '测试1',
						// 	value: '测试1'
						// }
					],
					doctorList: [//医生列表
						{
							label: '',
							value: ''
						}
					],
					agreement: [//协议
						{
							name: '',
							content: ''
						}
					]
				},
				//7.1新增门诊参数
				clinicType: "远程门诊业务",
				clinicName: "新增远程门诊业务",
				clinicPrice: 1,
				clinicDepartmentId: "1398F2FBB8AA48518385F2486840FE17",
				orgCode: "1545618639429",
				clinicDoctors: ["EB237A1368A44A32B4070154C225C088"],
				clinicDesc: "这是远程门诊的业务噢~",
				clinicProtocolId: "",
				clinicProtocolName: "收费协议",
				clinicProtocolContent: "Oracle 将继续提供JDK 8 免费的公共更新和自动更新。",
				clinicPhone: "18888888888",


				//显示隐藏

				//是否弹出关联医生
				isShowrelationalDoctor: false,
				//是否弹出查看详情
				isShowRecord: false,
				//是否弹出查看详情中的聊天弹框
				isShowRecordChat: false,
				//是否弹出编辑
				isShowEdit: false,
				//是否物流状态
				isShowLogisticsStatus: false,
				//是否处方详情
				isShowPrescriptionDetail: false,

				//函数传参
				// 公共
				pageNum: 1,//页数
				pageSize: 10,//条数
				searchValue: "", //搜索框接收参数
				departmentId: "",//科室id接收参数
				businessType: "",//业务类型接收参数
				selectType: "",//统计时筛选的类型
				time0: "",//统计筛选起始时间
				time1: "",//统计筛选结束时间
				clinicId: '',//门诊业务编号
				status: [],//状态（禁用按钮）


				//getList2
				string: "",//门诊订单号
				sendDoctorId: "",//发药医生
				reviewDoctorId: "",//审核医生
				sendEnum: "",//配送状态（UNSEND, //未配送；SENDING, //配送中；SENDOVER, //已签收）
				reviewEnum: "",//审核状态（REVIEWED, //已审核；UNREVIEWED, //未审核；FAILREVIEWED, //

				//选定各个弹框的参数
				relationalDoctor: [],//接收弹框内的数据
				cellColor: [
					{
						cell: 4,
						value: "关联医生",
						oclass: "ooRed"
					},
				],

				//医生信息
				doctorsInfo: {
					headImg: '',
					name: '',
				},
				time: null,
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
									text: '测试',
									value: ''
								}
							]
						}
					],
				},
				//在线诊室管理   
				tableData: [],
				//聊天
				tableDataChat: [
					{
						prop: "id",
						label: "业务编号"
					},
					{
						prop: "departmentName",
						label: "科室"
					},
					{
						prop: "fullName",
						label: "业务名"
					},
					{
						prop: "price",
						label: "价格"
					},
					{
						prop: "doctors",
						label: "关联医生"
					},
					{
						prop: "totalPeople",
						label: "业务人次"
					},
					{
						prop: "totalIncome",
						label: "总收入"
					},
					{
						prop: "queuePeople",
						label: "当前排队"
					},
					{
						prop: "updateTime",
						label: "最近修改"
					}
				],


				//处方审核和配送
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
						//2.1表头
						columns: [
							{
								prop: "departmentName",
								label: "科室"
							},
							{
								prop: "id",
								label: "门诊订单号"
							},
							{
								prop: "prescriptionOrderId",
								label: "处方订单号"
							},
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
								oclass: "recordBtn",
								method: (index, row) => {
									this.isShowPrescriptionDetailFun(index, row);
								}
							},
							{
								name: "物流状态",
								oclass: "recordBtn",
								method: (index, row) => {
									this.isShowLogisticsStatusFun(index, row);
								}
							},
							{
								name: "查看记录",
								oclass: "recordBtn",
								method: (index, row) => {
									this.isShowRecordFun(index, row);
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
				}
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
			/**
			 * 禁用被点击
			 */
			async getDisableClick(item, index) {
				console.log('is enter')
				const optios = [
					{ token: this.userState.token },
					{
						clinicId: item.id,
						status: 'test'
					}
				];
				const res = await disableClinic(...optios);
				console.log(res);
				if (res.data && res.data.errCode === 0) {
					this.relationalDoctor = this.relationalDoctor.map(value => {
						if (value.code === item.code) {
							item.name === '解除禁用' ? value.name = "禁用" : valve.name = '解除禁用';
							return item
						}
					})
				}

			},
			//在线、处方审核、统计、切换插件返回值
			getNav(data) {
				// console.log(data)
			},
			//筛选返回值
			getFilter0(data) {//科室筛选
				this.departmentId = data.index.value;
				console.log(this.departmentId)
				this.getList1();
				this.getList2();
				this.getList3();
			},
			getFilter1(data) {//审核状态
				this.reviewEnum = data.index.value;
				console.log(this.reviewEnum)
				this.getList1();
				this.getList2();
			},
			getFilter2(data) {//配送状态
				this.sendEnum = data.index.value;
				this.getList1();
				this.getList2();
			},
			getFilter3(data) {//审核医生
				this.reviewDoctorId = data.index.value;
				this.getList1();
				this.getList2();
			},
			getFilter4(data) {//发药医生
				this.sendDoctorId = data.index.value;
				this.getList1();
				this.getList2();
			},
			adminSearchOne(data) {
				this.searchValue = data;
				this.getList1();
				this.getList2();
			},
			getFilterTime(data) {
				this.time0 = '';//待补充
				this.time0 = '';//待补充
				this.getList3();
			},




			//筛选列表
			//1.21.1.科室工具栏 (管理)
			async filter0() {
				const _this = this
				let query = {
					token: this.userState.token,
					type: 'MANAGE'
				};
				const res = await toolDept(query);
				if (res.data && res.data.errCode === 0) {
					console.log('1.21.1.科室工具栏 +成功')
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
					console.log('1.21.1.科室工具栏 +失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//1.21.2.处方审核状态
			async filter1() {
				const _this = this
				let query = {
					token: this.userState.token,
				};
				const res = await toolRxReviewStatus(query);
				if (res.data && res.data.errCode === 0) {
					console.log('1.21.2.处方审核状态 +成功')
					$.each(res.data.body, function (index, text) {
						//处方审核状态列表渲染
						_this.prescriptionAuditDistribution.topFlag[1].list.push({
							text: text.name,
							value: text.id
						});
					});
				} else {
					console.log('1.21.2.处方审核状态+失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//1.21.3.处方配送状态
			async filter2() {
				const _this = this
				let query = {
					token: this.userState.token,
				};
				const res = await toolRxSendStatus(query);
				if (res.data && res.data.errCode === 0) {
					console.log('1.21.3.处方配送状态+成功')
					$.each(res.data.body, function (index, text) {
						//处方配送状态渲染
						_this.prescriptionAuditDistribution.topFlag[2].list.push({
							text: text.name,
							value: text.id
						});
					});
				} else {
					console.log('1.21.3.处方配送状态+失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//1.21.4.处方审核医生
			async filter3() {
				const _this = this
				let query = {
					token: this.userState.token,
				};
				const res = await toolRxReviewDoctors(query);
				if (res.data && res.data.errCode === 0) {
					console.log('1.21.4.处方审核医生+成功')
					$.each(res.data.body, function (index, text) {
						//处方审核医生渲染
						_this.prescriptionAuditDistribution.topFlag[3].list.push({
							text: text.name,
							value: text.id
						});
					});
				} else {
					console.log('1.21.4.处方审核医生+失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//1.21.5.处方发药医生
			async filter4() {
				const _this = this
				let query = {
					token: this.userState.token,
				};
				const res = await toolRxSendDoctors(query);
				if (res.data && res.data.errCode === 0) {
					console.log('1.21.5.处方发药医生+成功')
					$.each(res.data.body, function (index, text) {
						//处方发药医生渲染
						_this.prescriptionAuditDistribution.topFlag[4].list.push({
							text: text.name,
							value: text.id
						});
					});
				} else {
					console.log('1.21.5.处方发药医生+失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//7.5根据条件搜索在线诊室业务 获取列表
			async getList1() {

				let query = {
					token: this.userState.token,
					string: this.searchValue,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					departmentId: this.departmentId,
					businessType: this.businessType
				};
				const res = await searchClinic(query);
				if (res.data && res.data.errCode === 0) {
					console.log('列表1+成功')
					console.log(res)
					this.relationalDoctor = res.data.body.data2.list.map(item => {
						item.name = item.status ? '禁用' : '解除禁用';
						return item
					})
					$.each(res.data.body.data2.list, function (index, text) {
						if (res.data.body.data2.list[index].doctors[0].doctorStates === false) {
							res.data.body.data2.list[index].doctors[0].doctorStates = '离线中'
						} else if (res.data.body.data2.list[index].doctors[0].doctorStates === true) {
							res.data.body.data2.list[index].doctors[0].doctorStates = '接诊中...'
						}
						this.relationalDoctor = res.data.body.data2.list[index].doctors;
						text.totalPeople = "总: " + text.totalPeople + "  今日: " + text.todayPeople
						text.doctors = "查看"
					})
					this.tableData = res.data.body.data2.list;
				} else {
					//失败
					console.log('列表1+失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			// 7.11根据条件获取处方信息 
			async getList2() {

				let query = {
					token: this.userState.token,
					departmentId: this.departmentId,
					reviewEnum: this.reviewEnum,
					sendEnum: this.sendEnum,
					reviewDoctorId: this.reviewDoctorId,
					sendDoctorId: this.sendDoctorId,
					string: this.string,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				};
				const res = await prescriptionDetailByCondition(query);
				if (res.data && res.data.errCode === 0) {
					console.log('列表2+成功')
					console.log(res)
					$.each(res.data.body.data2.list, function (index, text) {
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
					this.prescriptionAuditDistribution.tableBody.tableData = res.data.body.data2.list;
				} else {
					//失败
					console.log('列表2+失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//统计图表数据的获取
			async getList3() {
				console.log('统计接口还没出来')
				// 
				// let query = {
				// 	token: this.userState.token
				//	//筛选的时间条件参数待补充
				// };
				// const res = await searchClinic(query);
				// if (res.data && res.data.errCode === 0) {
				// 	console.log('统计图标数据+成功')
				// 	this.adminTableData = res.data.body.data2.list;
				// } else {
				// 	//失败
				// 	console.log('统计图标数据+失败')
				// 	this.$notify.error({
				// 		title: "警告",
				// 		message: res.data.errMsg
				// 	});
				// }
			},

			//新增门诊弹框
			//渲染
			async newClinic() {
				const _this = this;
				//根据医院获取科室
				let query = {
					orgCode: this.userInfo.hospitalCode,	//String true 医院代码 
					deptId: this.departmentId,	//String false 科室ID，无该参数则返回医院全部科室，有该参数则会过滤科室列表 
				}
				console.log(query)
				const res = await fetchHospitalDepts(query);
				if (res.data && res.data.errCode === 0) {
					console.log('新增弹框渲染+科室+成功')
					$.each(res.data.body, function (index, text) {
						_this.addData.departmentList.push({
							label: text.deptName,
							value: text.deptId
						});
					});
					console.log(this.addData.departmentList)
					//根据科室获取关联医生
					let query1 = {
						token: this.userState.token,
						string: this.searchValue,
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						departmentId: this.departmentId,
						businessType: this.businessType
					};
					const res = await searchClinic(query1);
					if (res.data && res.data.errCode === 0) {
						console.log('新增弹框渲染+关联医生+成功')
						console.log(res)
						// this.relationalDoctor = res.data.body.data2.list[index].doctors;
					} else {
						//失败
						console.log('新增弹框渲染+关联医生+成功')
						this.$notify.error({
							title: "警告",
							message: res.data.errMsg
						});
					}
				} else {
					console.log('新增弹框渲染+新增业务+失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
				//根据科室获取定义协议（待补全）


			},
			// 7.1  确定  新增业务
			/*
			 * 
			 * 获取返回数据
			 * 
			 */
			isShowNewOutPatientFun() {
				this.addData.show = true
			},
			async getData(data) {
				console.log(data)
				this.clinicType = data.businessType
				this.businessName = data.businessName
				this.businessPrice = data.businessPrice


				let query = {
					token: this.userState.token
				};
				const options = {
					clinicId: '在线门诊',//String false 远程门诊id（新增为空，编辑不为空） 

					clinicType: this.clinicType,//String true 远程门诊类型 
					clinicName: this.clinicName,//String true 远程门诊名 
					clinicPrice: this.clinicPrice,//long true 远程门诊价格 

					clinicDepartmentId: this.clinicDepartmentId,//待请求的  String true 远程门诊科室id 
					orgCode: this.orgCode,//医院代码
					clinicDoctors: this.clinicDoctors,//List true 远程门诊医生 
					clinicDesc: this.clinicDesc,//String true 远程门诊描述 
					clinicProtocolId: this.clinicProtocolId,//String false 远程门诊协议id（选择协议时必传，非选择的协议可不传） 
					clinicProtocolName: this.clinicProtocolName,//String true 远程门诊协议名 
					clinicProtocolContent: this.clinicProtocolContent,//String true 远程门诊协议内容 
					clinicPhone: this.clinicPhone,//String true 远程门诊电话 
					status: this.status//boolean false 远程门诊状态（禁用操作时值必传） 
				};
				console.log(query, options)
				const res = await addClinic(query, options);
				if (res.data && res.data.errCode === 0) {
					console.log('7.1新增业务+成功')
					// this.adminTableData = res.data.body.data2.list;
				} else {
					console.log('7.1新增业务+失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},



			//查看关联医生
			// cell-click当某个单元格被点击时会触发该事件row, column, cell, event
			relateDoctors(row, column, cell, event) {

				console.log(row, column)
				// this.clinicId
				// if(row.id === 'f8c40fbaf0fc4a9e94e50ebcda415c81' && column.label === "关联医生"){
				if (column.label === "关联医生") {
					this.isShowrelationalDoctor = true;
				}
			},
			//查看记录
			isShowRecordFun(row) {
				this.isShowRecord = true;
			},
			//查看编辑
			isShowEditFun(row) {
				this.isShowEdit = true;
			},
			//查看记录再中发起会谈
			isShowRecordChatFun() {
				this.isShowRecordChat = true;
			},



			//查看处方详情
			isShowPrescriptionDetailFun() {
				this.isShowPrescriptionDetail = true;
			},
			//查看物流状态
			isShowLogisticsStatusFun() {
				this.isShowLogisticsStatus = true;
			},
			//禁用接口的调用
			async isShowForbidFun() {

				let query = {
					token: this.userState.token
				};
				let options = {
					clinicId: this.clinicId,
					status: this.status
				};
				const res = await disableClinic(query, options);
				if (res.data && res.data.errCode === 0) {
					console.log(res)
					console.log(this.status)
					if (this.status == true) {
						this.onLineList.tableBody.tableBtn[2].name = '禁用'
						this.status = false;
					} else {
						this.onLineList.tableBody.tableBtn[2].name = '解除禁用'
						this.status = true;
					}
				} else {
					console.log('禁用失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},




		},
		async created() {
			this.filter0();//获取科室列表
			this.filter1();//审核状态
			this.filter2();//配送状态
			this.filter3();//审核医生
			this.filter4();//发药医生
			this.getList1();//管理列表1
			this.newClinic();//新增门诊弹框内容渲染
			this.getList2();//管理列表2
			this.getList3();//管理图表3（统计图表数据获取）
		}
	}
</script>

<style lang="scss" scoped>
	.hospital-management-outpatient {}

	.hospital-management-outpatient-nav {}

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

	.online-clinic {}

	.online-clinic-top {
		display: flex;
		justify-content: space-between;
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

	.evaluateBox1 {
		ul {
			li {
				display: flex;
				align-items: center;

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

	/* 查看记录 */
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

	.recordBtn {
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
</style>