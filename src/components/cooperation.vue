<template>
	<!-- 远程协作系统 -->
	<div class="cooperation">

		<!-- 发起协作弹窗 -->
		<el-dialog class="startGroup" title="重庆市西南医院" :visible.sync="centerDialogVisible" left>

			<el-tree :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange">
			</el-tree>

			<el-form ref="form" :model="startHz" label-width="80px">

				<div style="display:flex" v-for="(text,index) in startHz.cooperationHospitalDept" :key="index">
					<el-form-item label="病历：">
						<el-select placeholder="请选择活动区域" v-model="text.hospitalId" @change="hosChange(text.hospitalId,index)">
							<el-option v-for="(text,index) in hospitalList" :label="text.name" :value="text.value" :key="index"></el-option>
						</el-select>
					</el-form-item>
				</div>

				<div style="display:flex" v-for="(text,index) in startHz.cooperationHospitalDept" :key="index">
					<el-form-item label="目的：">
						<el-select placeholder="请选择活动区域" v-model="text.hospitalId" @change="hosChange(text.hospitalId,index)">
							<el-option v-for="(text,index) in hospitalList" :label="text.name" :value="text.value" :key="index"></el-option>
						</el-select>
					</el-form-item>
				</div>

				<el-form-item class="confirmBtnBox">
					<el-button class="confirmBtn" type="primary" @click="addHz()">确认</el-button>
				</el-form-item>

			</el-form>

		</el-dialog>
		
		<!-- 打开评价 -->
		<el-dialog class="evaluateBox" title=" " :visible.sync="evaluateVisible" width="602px" hight="356px" center>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item class="evaluateMargin evaluateMargin1">
					<el-input class="evaluateInput" type="textarea" v-model="form.desc" placeholder="请选择活动区域"></el-input>
				</el-form-item>

				<el-form-item class="evaluateMargin">
					<el-button class="confirmBtn" type="primary">确认</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 接收科室 -->
		<el-dialog class="evaluateBox" title=" 接收科室" :visible.sync="departVisible" width="602px" hight="356px" center>
			<ul>
				<li>
					<div>
						<img src="" />
					</div>
					<div class="evaluateCont">
						<h5>西南医院第三附属医院</h5>
						<div>神经内科</div>
					</div>
				</li>
				<li>
					<div>
						<img src="" />
					</div>
					<div class="evaluateCont">
						<h5>西南医院第三附属医院</h5>
						<div>神经内科</div>
					</div>
				</li>
			</ul>
		</el-dialog>
		<!-- 医生详情 -->
		<el-dialog class="evaluateBox evaluateBox2" title=" 医生详情" :visible.sync="doctorVisible" width="602px" hight="356px"
		 center>
			<ul>
				<li>
					<div>
						<img src="" />
					</div>
					<div class="evaluateCont">
						<h5>西南医院第三附属医院</h5>
						<div>神经内科</div>
					</div>
					<div>
						文字
					</div>
				</li>
				<li>
					<div>
						<img src="" />
					</div>
					<div class="evaluateCont">
						<h5>西南医院第三附属医院</h5>
						<div>神经内科</div>
					</div>
					<div>
						文字
					</div>
				</li>
			</ul>
		</el-dialog>
		<!-- 会诊评价 -->
		<el-dialog class="evaluateBox evaluateBox2" title=" 会诊评价" :visible.sync="groupVisible" width="602px" hight="356px"
		 center>
			<ul>
				<li>
					<div>
						<img src="" />
					</div>
					<div class="evaluateCont">
						<h5>西南医院第三附属医院</h5>
						<div>神经内科</div>
					</div>
					<div>
						文字
					</div>
				</li>
				<li>
					<div>
						<img src="" />
					</div>
					<div class="evaluateCont">
						<h5>西南医院第三附属医院</h5>
						<div>神经内科</div>
					</div>
					<div>
						文字
					</div>
				</li>
			</ul>
		</el-dialog>
		<!-- 查看记录 -->
		<el-dialog class="  " title="  " :visible.sync="recordVisible" width="602px" hight="356px" center>
			<ul>
				<li class="ohisList">
					<h3>2018年4月4日</h3>
					<ul>
						<li class="ohisListMain">
							<div>
								<img src="../assets/a-6.png" />
							</div>
							<div class="ohisListRg">
								<div>张某人
									<span> 17:54:34</span>
								</div>
								<div>那就等带节后再说吧。</div>
							</div>
						</li>
					</ul>
				</li>
				<li class="ohisList">
					<h3>2018年4月4日</h3>
					<ul>
						<li class="ohisListMain">
							<div>
								<img src="../assets/a-6.png" />
							</div>
							<div class="ohisListRg">
								<div>张某人
									<span> 17:54:34</span>
								</div>
								<div>那就等带节后再说吧。</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</el-dialog>
		<!-- 管理端 -->
		<div class="cooperation" v-if="$store.state.user.viewRoot.now.name==='manager'">
			<div class="Admin-title">
				<normalTab :inData="oAdminTab" @reBack="getConsulTabData"></normalTab>
			</div>
			<div class="admin-oMain">
				<!-- 会诊管理 -->
				<div v-if="oconsulVisable">
					<div class="mainTab">
						<div>
							<selftag :inData="oTab1" @reback="getOTab1"></selftag>
							<selftag :inData="oTab1" @reback="getOTab11"></selftag>
							<selftag :inData="oTab2" @reback="getOTab2"></selftag>
							<selftag :inData="oTab3" @reback="getOTab3"></selftag>
						</div>

						<search @searchValue="adminSearchChange"></search>
					</div>
					<div>
						<tableList :tableData="adminTableData" :columns="columns" :tableBtn="tableBtn"> </tableList>
					</div>
				</div>
				<!-- 统计 -->
				<div v-else>
					<div class="mainTab">
						<div>
							<selftag :inData="oTab1" @reback="getOTab1"></selftag>
						</div>
						<statisticsWay @reBack="getTjData"></statisticsWay>
					</div>
					<div style="display:flex">
						<normalColumnChart :inData="drawData"> </normalColumnChart>
						<normalColumnChart :inData="drawDataStart"> </normalColumnChart>
						{{drawDataStart}}
					</div>
				</div>
			</div>
		</div>
		<!-- 医生端 -->
		<div class="cooperation" v-else>
			<div class="doc-title">
				<selftag :inData="oTab4" @reback="getOTab4"></selftag>
				<div class="statistics-way">
					<span>时间段：</span>
					<el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
				<el-button class="startConsul" type="text" @click="centerDialogVisible = true">发起协作</el-button>
			</div>

			<div>
				<el-table :data="docTableData" border style="width: 100%">

					<el-table-column fixed prop="cooperationId" label="协作编号"></el-table-column>
					<el-table-column fixed prop="initiateDepartment" label="发起科室"></el-table-column>
					<el-table-column fixed prop="initiateDoctor" label="发起医生"></el-table-column>
					<el-table-column fixed prop="initiateTime" label="发起时间"></el-table-column>
					<el-table-column fixed prop="purpose" label="目的"></el-table-column>
					<el-table-column fixed prop="cooperationDepartment" label="协作科室"></el-table-column>
					<el-table-column fixed prop="cooperationDoctor" label="协作医生"></el-table-column>
					<el-table-column fixed prop="status" label="状态"></el-table-column>
					<el-table-column fixed="right" label="操作" width="100">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="text" size="small">病历</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>

		</div>
		<el-dialog class="chatDialog" title="" :visible.sync="chatVisible" width="680px">
			<chat :sessionId="sessionId"></chat>
		</el-dialog>

	</div>
</template>
<script>
	import {
		managePage,//9.2协作管理列表
		manageStatistics, //9.3协作管理统计
		synergyPage,//9.4医生协作列表 
		// enableSynergyDoctor, //9.5获取可协作医生（本院、院外协作）
		// sendSynergy,//9.6发起协作
		// synergyChangeStatus, //9.7开始/结束协作
		// synergyInto,//9.8进入协作
		receiveDept,//9.9本院参与科室
		receiveDoctor,//9.10本院参与科室
		addConsultation//2.新增会诊
	} from "../api/apiAll.js";
	import { mapState } from "vuex";
	import echarts from "../plugs/echarts.js";
	import tableList from "../public/publicComponents/publicList.vue";
	import selftag from "../public/publicComponents/selftag.vue";
	import chat from "../public/publicComponents/chat.vue";
	import normalTab from "../public/publicComponents/normalTab.vue";
	import normalColumnChart from "../public/publicComponents/normalColumnChart.vue";
	import search from "../public/publicComponents/search.vue";
	import statisticsWay from "../public/publicComponents/statisticsWay.vue";

	export default {
		components: {
			selftag,
			tableList,
			normalTab,
			normalColumnChart,
			search,
			statisticsWay,
			chat
		},
		data() {
			return {
				//ele.ui插件参数
				props: {
					label: 'name',
					children: 'zones'
				},
				count: 1,



				sessionId: "", //会诊id
				chatVisible: false, //聊天框
				oVisable: true,
				oconsulVisable: true, //切换会诊管理和统计的显示
				centerDialogVisible: false, //是否发起会诊
				evaluateVisible: false, //是否打开评价
				departVisible: false, //是否接收科室
				doctorVisible: false, //医生详情
				groupVisible: false, //会诊评价
				recordVisible: false, //查看记录
				searchValue: "", //管理端搜索框

				applicationDeptId: "", //发起科室
				applicationDeptId2: "",//
				
				receiveDeptId: "", //接收科室
				departmentList: [], //科室列表
				hospitalList: [], //医院列表
				
				adminType: "",
				adminStatus: 1,
				statisticsStart: "",
				statisticsType: "DEPT",
				statisticsEnd: "",
				departmentsId: "",
				form: "",


				oTab1: {
					more: true,
					title: "全部",
					list: [
						{
							text: "全部"
						}
					]
				},
				oTab2: {
					more: false,
					title: "全部",
					list: [
						{
							text: "全部"
						},
						{
							text: "专科会诊",
							value: "SPECIALIST"
						},
						{
							text: "专家会诊",
							value: "EXPERT"
						}
					]
				},
				oTab3: {
					more: false,
					title: "全部",
					list: [
						{
							text: "全部"
						},
						{
							text: "未开始",
							value: "NEW"
						},
						{
							text: "进行中",
							value: "UNDERWAY"
						},
						{
							text: "结束",
							value: "OVER"
						}
					]
				},
				
				// 医生端列表请求参数
				applyDepartmentId:"",//申请科室ID
				cooperationDepartmentId:"",//协作科室ID
				oDocTime: "",//医生端事件参数
				startTimeXieZuo: "",
				endTimeXieZuo: "",
				startHz: {
					type: "SPECIALIST",
					deptId: " ",
					userId: " ",
					medicalHistory: " ",
					applicationTime: " ",
					cooperationPurpose: " ",
					cooperationHospitalDept: [
						{
							hospitalId: "1",
							departmentsId: "2",
							departmentListOO: []
						}
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

				columns: [
					{
						prop: "cooperationId",
						label: "协作编号"
					},
					{
						prop: "initiateDepartment",
						label: "发起科室"
					},
					{
						prop: "applyDepartment",
						label: "申请科室"
					},
					{
						prop: "initiateDoctor",
						label: "发起医生"
					},
					{
						prop: "initiateTime",
						label: "发起时间"
					},
					{
						prop: "cooperationDepartment",
						label: "协作科室"
					},
					{
						prop: "cooperationDoctor",
						label: "协作医生"
					},
					{
						prop: "lookMedicalHistory",
						label: "查看病历"
					},
					{
						prop: "cooperationTime",
						label: "协作用时"
					},
					{
						prop: "overView",
						label: "综合评价"
					},
					{
						prop: "status",
						label: "状态"
					},
					{
						prop: "purpose",
						label: "目的"
					}
				],
				adminTableData: [], //管理端列表
				docTableData: [], //医生端列表
				tableBtn: [
					{
						name: "查看记录",
						oclass: "recordBtn",
						method: (index, row) => {
							this.recordFun(index, row);
						}
					}
				],
				docTableBtn: [
					{
						name: "病历",
						oclass: "recordBtn",
						method: (index, row) => {
							this.recordFun(index, row);
						}
					},
					{
						name: "邀请",
						oclass: "recordBtn",
						method: (index, row) => {
							this.recordFun(index, row);
						}
					},
					{
						name: "查看记录",
						oclass: "recordBtn",
						method: (index, row) => {
							this.recordFun(index, row);
						}
					}
				],
				oAdminTab: {
					i: 0, //选中的是第几项，类型为int(注意：从0开始计数)
					list: [
						//选项列表，类型Array
						{
							en: "COOPERATION", //选项英文，类型 string
							zh: "协作管理" //选项中文，类型string
						},
						{
							en: "STATISTICS",
							zh: "统计"
						}
					]
				},
				//申请科室统计图
				drawData: {
					dataAxis: [], //每个柱子代表的类名
					data: [], //具体数值
					title: " ", //图表标题
					totalNumber: "555"
				},
				//发起科室统计图
				drawDataStart: {
					dataAxis: [], //每个柱子代表的类名
					data: [], //具体数值
					title: " ", //图表标题
					totalNumber: "555"
				}
			};
		},
		computed: {
			...mapState({
				userState: state => state.user.userInfo,
				userSelfInfo: state => state.user.userSelfInfo
			})
		},
		methods: {
			//ele.ui插件

			handleCheckChange(data, checked, indeterminate) {
				console.log(data, checked, indeterminate);
			},
			handleNodeClick(data) {
				console.log(data);
			},
			loadNode(node, resolve) {
				if (node.level === 0) {
					return resolve([{ name: 'region1' }, { name: 'region2' }]);
				}
				if (node.level > 3) return resolve([]);

				var hasChild;
				if (node.data.name === 'region1') {
					hasChild = true;
				} else if (node.data.name === 'region2') {
					hasChild = false;
				} else {
					hasChild = Math.random() > 0.5;
				}

				setTimeout(() => {
					var data;
					if (hasChild) {
						data = [{
							name: 'zone' + this.count++
						}, {
							name: 'zone' + this.count++
						}];
					} else {
						data = [];
					}

					resolve(data);
				}, 500);
			},

			// 管理端事件
			getOTab1(data) {
				this.applicationDeptId = data.index.value;
				this.getAdminList();
			},
			getOTab11(data) {
				this.receiveDeptId = data.index.value;
				this.getAdminList();
			},
			getOTab2(data) {
				this.adminType = data.index.value;
				this.getAdminList();
			},
			getOTab3(data) {
				this.adminStatus = data.index.value;
				this.getAdminList();
			},

			// getOTab4(data) {
			//     this.applicationDeptId2 = data.index.value;
			//     this.getAdminTjList();
			//     this.getApplyTjList();
			// },
			//查看记录
			recordFun() {
				this.recordVisible = true;
			},
			//医生端事件
			getOTab4(data) {
				this.oDocTime = data.index.value;
				this.getDocList();
			},
			addHospital() {
				this.startHz.cooperationHospitalDept.push({
					hospitalId: "",
					departmentsId: ""
				});
			},
			adminSearchChange(data) {
				this.searchValue = data;
				this.getAdminList();
			},
			//发起会诊
			async addHz() {
				let _this = this;
				let addHzConsultatonList = [];
				$.each(this.startHz.cooperationHospitalDept, function (
					index,
					text
				) {
					addHzConsultatonList.push({
						hospitalId: text.hospitalId,
						departmentsId: text.departmentsId
					});
				});
				let query = {
					token: this.userState.token
				};
				let options = {
					type: this.startHz.type,
					deptId: this.startHz.deptId,
					userId: this.startHz.userId,
					medicalHistory: this.startHz.medicalHistory,
					applicationTime: this.startHz.applicationTime,
					cooperationPurpose: this.startHz.cooperationPurpose,
					cooperationHospitalDept: addHzConsultatonList
				};
				const res = await addConsultation(query, options);
				if (res.data && res.data.errCode === 0) {
					this.$notify.success({
						title: "发起成功",
						message: res.data.errMsg
					});
					setTimeout(function () {
						_this.centerDialogVisible = false;
						_this.getDocList();
					}, 1000);
				} else {
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//进入会诊
			async tocooperation(oObject) {
				this.chatVisible = true;
				this.sessionId = oObject.sessionId;
			},
			//管理端事件
			getConsulTabData(res) {
				if (res.i == 0) {
					this.oconsulVisable = true;
				} else if (res.i == 1) {
					this.oconsulVisable = false;
				}
			}, //获取医院列表
			async getHospitalment() {
				let _this = this;
				let query = {
					token: this.userState.token
				};
				const res = await receiveDept(query);
				if (res.data && res.data.errCode === 0) {
					$.each(res.data.body, function (index, text) {
						_this.hospitalList.push({
							name: text.orgName,
							value: text.orgCode
						});
					});
				} else {
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//改变医院 同时改变科室
			hosChange(oid, oindex) {
				this.getDepartment(oindex);
			},
			//获取科室列表
			async getDepartment(oindex) {
				let _this = this;
				let query = {
					orgCode: this.userSelfInfo.orgCode,
					deptId: this.departmentsId
				};
				const res = await receiveDept(query);
				if (res.data && res.data.errCode === 0) {
					console.log(res.data.body);
					if (res.data.body.length > 6) {
						this.oTab1.more = true;
					} else {
						this.oTab1.more = false;
					}
					$.each(res.data.body, function (index, text) {
						_this.departmentList.push({
							name: text.deptName,
							value: text.deptId
						});
						_this.startHz.cooperationHospitalDept[
							oindex
						].departmentListOO.push({
							name: text.deptName,
							value: text.deptId
						});
						_this.oTab1.list.push({
							text: text.deptName,
							value: text.deptId
						});
					});
				} else {
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//获取管理端列表
			async getAdminList() {
				let _this = this;
				const options = {
					token: this.userState.token,
					query: "",
					pageNum: 1,
					pageSize: 10,
					status: this.adminStatus,

					applyDeptId: this.applicationDeptId,//协作科室
					synergyDeptId: this.receiveDeptId,
					startTime: this.startTimeXieZuo,
					endTime: this.startTimeXieZuo,
				};
					alert('成功获取管理端发起科室统计列表')
					alert(options)
					console.log(options)
				const res = await managePage(options);
				if (res.data && res.data.errCode === 0) {
					alert()
					this.adminTableData = res.data.body.data2.list;
				} else {
					alert('失败获取管理端发起科室统计列表')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//获取管理端申请科室统计列表
			async getApplyTjList() {
				this.drawData.dataAxis = [];
				this.drawData.data = [];
				let _this = this;
				const options = {
					token: this.userState.token,
					applyDeptId: this.applicationDeptId,
					statisticsType: 1,
					startTime: this.startTimeXieZuo,
					endTime: this.endTimeXieZuo,

				};
				const res = await manageStatistics(options);
				if (res.data && res.data.errCode === 0) {
					$.each(res.data.body.data, function (index, text) {
						_this.drawData.dataAxis.push(text.unit);
						_this.drawData.data.push(text.number);
					});
					console.log(res)
				} else {
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//获取管理端发起科室统计列表
			async getAdminTjList() {
				this.drawDataStart.dataAxis = [];
				this.drawDataStart.data = [];
				let _this = this;
				const options = {
					token: this.userState.token,
					applyDeptId: this.applicationDeptId,
					statisticsType: 1,
					startTime: this.startTimeXieZuo,
					endTime: this.endTimeXieZuo,
				};
				const res = await manageStatistics(options);
				if (res.data && res.data.errCode === 0) {
					$.each(res.data.body.data, function (index, text) {
						_this.drawDataStart.dataAxis.push(text.unit);
						_this.drawDataStart.data.push(text.number);
					});
				} else {
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//获取统计类型
			getTjData(data) {
				console.log(data);
				this.statisticsType = data.select.value;
				this.statisticsStart = data.time[0];
				this.statisticsEnd = data.time[1];
				this.getAdminTjList();
				this.getApplyTjList();
			},
			//获取医生端列表
			async getDocList() {
				let _this = this;
				const options = {
					token: this.userState.token,
					query: "",
					pageNum: 1,
					pageSize: 15,
					status: this.adminStatus,

					applyDeptId: this.applicationDeptId2,
					synergyDeptId: this.receiveDeptId,
					startTime: this.startTimeXieZuo,
					endTime: this.endTimeXieZuo,
				};
				console.log(Options)
				const res = await synergyPage(options);
				if (res.data && res.data.errCode === 0) {
					this.docTableData = res.data.body.data2.list;
					console.log(res)
				} else {
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}

			}
		},
		async created() {
			// this.getDepartment("");
			this.getAdminList();
			this.getDocList();
			// this.getAdminTjList();
			// this.getApplyTjList();
			// this.getHospitalment();
		}
	};
</script>

<style>
	/* 公共样式 */
	.Admin-title {
		margin-bottom: 42px;
	}

	.admin-oMain {
		padding: 30px 38px;
		background: #ffffff;
		border: 1px solid #e5edf3;
		box-shadow: 0 6px 36px 0 rgba(0, 62, 100, 0.04);
		border-radius: 4px;
	}

	.admin-oMain>div {
		position: relative;
	}

	.mainTab {
		display: flex;
		display: -webkit-flex;
	}

	.mainTab>div:first-child {
		width: 100%;
	}

	/* 医生端样式 */
	.cooperation .doc-title {
		display: flex;
		display: -webkit-flex;
		margin-bottom: 52px;
	}
	
	.el-tree-node__content{
		margin: 0 0 20px 20px !important;
	}

	.el-tree-node__content .el-checkbox__inner{
		width: 20px !important;
		height: 20px !important;
	}

	.evaluateBtn {
		width: 57px;
		height: 20px;
		background: rgba(119, 140, 162, 0.1);
		border: 1px solid rgba(119, 140, 162, 0.6);
		border-radius: 3px;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #778ca2;
		line-height: 3px;
	}

	.startConsul {
		width: 196px;
		height: 40px;
		background: #4da1ff;
		border-radius: 4px;
		font-family: PingFangSC-Semibold;
		font-size: 22px;
		color: #ffffff;
		letter-spacing: 0.92px;
		text-align: center;
		line-height: 0px;
	}

	/* 管理端端样式 */

	.mainTab {
		margin-bottom: 30px;
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

	.startGroup{
		width: 30%;
    margin: auto;
	}
	.startGroup input {
		height: 30px;
	}

	.confirmBtn {
		width: 100%;
		height: 39px;
		background: #4da1ff;
		border-radius: 4px;
		color: white;
		font-size: 12px;
		line-height: 21px;
	}
	.confirmBtnBox{
		display: flex
	}
	.confirmBtnBox>div {
		margin-left: 0;
	}

	.evaluateInput>textarea {
		width: 478px;
		height: 177px;
	}

	.evaluateMargin1 {
		margin-bottom: 68px;
	}

	.evaluateMargin>div {
		margin-left: 0px !important;
	}

	.evaluateBox .el-dialog__body {
		padding: 25px 60px;
	}

	.evaluateCont {
		width: 90%;
	}

	.evaluateCont>h5 {
		font-family: Helvetica;
		font-size: 0.14rem;
		color: #252631;
	}

	.evaluateCont>div {
		font-family: PingFangSC-Regular;
		font-size: 0.12rem;
		color: #98a9bc;
		line-height: 21px;
	}

	.evaluateBox2 li {
		margin-bottom: 18px;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
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
</style>