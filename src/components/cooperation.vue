<template>
	<!-- 远程协作系统 -->
	<div class="cooperation">
		<!-- 管理端 -->
		<div class="cooperation" v-if="$store.state.user.viewRoot.now.name==='manager'">
			<div class="Admin-title">
				<normalTab :inData="oAdminTab" @reBack="getConsulTabData"></normalTab>
			</div>
			<div class="admin-oMain">
				<!-- 协作管理列表 -->
				<div v-if="manageOrCount">
					<div class="mainTab">
						<div>
							<selftag :inData="oTab1" @reback="getOTab1"></selftag>
							<!-- <selftag :inData="oTab1" @reback="getOTab11"></selftag> -->
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
					<el-date-picker v-model="time" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
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
							<el-button @click="handleClick(scope.row)" type="text" size="small">邀请</el-button>
							<el-button v-show="scope.row.status=='OVER'" @click="handleClick(scope.row)" type="text" size="small">查看记录</el-button>
							<el-button v-show="scope.row.status=='NEW' || scope.row.status=='UNDERWAY'" @click="toConsultation(scope.row)"
							 type="text" size="small">进入会诊</el-button>
							<el-button v-show="scope.row.departmentId==userState.userId" @click="handleClick(scope.row)" type="text" size="small">结束</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<el-dialog class="chatDialog" title="" :visible.sync="chatVisible" width="680px">
			<chat :sessionId="sessionId"></chat>
		</el-dialog>




		<!-- 发起协作弹窗 -->
		<el-dialog class="startGroup" title="重庆市西南医院" :visible.sync="centerDialogVisible" left>
			<el-tree :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange"></el-tree>
			<el-form ref="form" :model="startHz" label-width="80px">
				<div style="display:flex" v-for="(text,index) in startHz.cooperationHospitalDept" :key="index">
					<el-form-item label="病历：">
						<el-select placeholder="请选择活动区域" v-model="text.hospitalId" @change="ObtainMedicalCase(text.hospitalId,index)">
							<el-option v-for="(text,index) in hospitalList" :label="text.name" :value="text.value" :key="index"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div style="display:flex" v-for="(text,index) in startHz.cooperationHospitalDept" :key="index">
					<el-form-item label="目的：">
						<el-select placeholder="请选择活动区域" v-model="text.hospitalId" @change="ObtainPurpose(text.hospitalId,index)">
							<el-option v-for="(text,index) in hospitalList" :label="text.name" :value="text.value" :key="index"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<el-form-item class="confirmBtnBox">
					<el-button class="confirmBtn" type="primary" @click="addHz()">确认</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

	</div>
</template>
<script>
	import {
		managePage,//9.2协作管理列表
		manageStatistics, //9.3协作管理统计
		synergyPage,//9.4医生协作列表 
		enableSynergyDoctor, //9.5获取可协作医生（本院、院外协作）
		sendSynergy,//9.6发起协作
		receiveDept,//9.9本院参与科室
		// synergyChangeStatus, //9.7开始/结束协作
		// synergyInto,//9.8进入协作
		// receiveDoctor,//9.10本院参与医生
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
				manageOrCount: true, //切换管理和统计
				centerDialogVisible: false, //是否发起协作
				departmentList: [], //科室列表
				initiateDepartmentId: "", //发起科室ID
				applyDepartmentId: "",//申请科室ID
				acceptDepartmentId: "", //接收科室ID
				sessionId: "", //协作id（操作下）
				chatVisible: false, //聊天框（操作下）
				searchValue: "", //管理端搜索框
				adminStatus: 1,
				startingTime: "",//统计筛选开始时间
				endingTime: "",//统计筛选结束时间
				adminType: "",//协作科室
				statisticsType: "DEPT",//统计筛选某类
				departmentsId: "",//弹框内参数
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
				// hospitalList: [], //医院列表
				// oVisable: true,
				// evaluateVisible: false, //是否打开评价
				// departVisible: false, //是否接收科室
				// doctorVisible: false, //医生详情
				// groupVisible: false, //会诊评价
				// recordVisible: false, //查看记录



				// 筛选参数
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
					dataAxis: ['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'], //每个柱子代表的类名
					data: [220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234], //具体数值
					title: "申请科室统计图", //图表标题
					// totalNumber: "555"
				},
				//发起科室统计图
				drawDataStart: {
					dataAxis: ['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'], //每个柱子代表的类名
					data: [220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234], //具体数值
					title: "发起科室统计图", //图表标题
					// totalNumber: "555"
				},
				oTab1: {
					more: true,
					title: "申请科室",
					list: [
						{
							text: "全部"
						},
						{
							text: "急诊科"
						}
					]
				},
				oTab2: {
					more: false,
					title: "协作科室",
					list: [
						{
							text: "全部"
						},
						{
							text: "急诊科"
						}
					]
				},
				oTab3: {
					more: false,
					title: "协作状态",
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




				// 表格参数（共需传3个）
				adminTableData: [], //管理端列表
				docTableData: [], //医生端列表
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
				//ele.ui插件参数
				props: {
					label: 'name',
					children: 'zones'
				},
				count: 1,
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







			// 管理列表事件
			//选择管理？统计？
			getConsulTabData(res) {
				if (res.i == 0) {
					this.manageOrCount = true;
				} else if (res.i == 1) {
					this.manageOrCount = false;
				}
			},
			//发起科室筛选
			getOTab1(data) {
				this.initiateDepartmentId = data.index.value;
				this.getAdminList();
			},
			//接收科室筛选
			// getOTab11(data) {
			// 	this.acceptDepartmentId = data.index.value;
			// 	this.getAdminList();
			// },
			//协作科室筛选
			getOTab2(data) {
				this.adminType = data.index.value;
				this.getAdminList();
			},
			//协作状态筛选
			getOTab3(data) {
				this.adminStatus = data.index.value;
				this.getAdminList();
			},





			//管理统计事件

			//点击筛选日期
			getOTab4(data) {
				this.applyDepartmentId = data.index.value;
				this.getAdminTjList();
				this.getApplyTjList();
			},

			//点击选择统计类型
			getTjData(data) {
				// console.log(data);
				this.statisticsType = data.select.value;
				this.startingTime = data.time[0];
				this.endingTime = data.time[1];
				this.getAdminTjList();
				this.getApplyTjList();
			},

			//点击查看记录
			// recordFun() {
			// 	this.recordVisible = true;
			// },





			//医生事件
			//点击筛选日期
			getOTab4(data) {
				this.getDocList();
			},
			//右上角搜索框
			adminSearchChange(data) {
				this.searchValue = data;
				this.getAdminList();
			},
			//进入协作
			async toConsultation(oObject) {
				this.chatVisible = true;
				this.sessionId = oObject.sessionId;
			},








			//接口

			//获取管理端列表
			async getAdminList() {
				let _this = this;
				const options = {
					token: this.userState.token,
					query: "",
					pageNum: 1,
					pageSize: 10,
					status: this.adminStatus,
					applyDeptId: this.initiateDepartmentId,
					synergyDeptId: this.acceptDepartmentId,
					startTime: this.startingTime,
					endTime: this.startingTime,
				};
				const res = await managePage(options);
				if (res.data && res.data.errCode === 0) {
					this.adminTableData = res.data.body.data2.list;
					if (res.data.body.data2.list.length == 0) {
						console.log('9.2管理列表List无数据')
					}
				} else {
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},


			//获取统计列表-1
			async getAdminTjList() {
				this.drawDataStart.dataAxis = [];
				this.drawDataStart.data = [];
				let _this = this;
				const options = {
					token: this.userState.token,
					statisticsType: 1,
					applyDeptId: this.initiateDepartmentId,
					startTime: this.startingTime,
					endTime: this.endingTime,
				};
				const res = await manageStatistics(options);
				if (res.data && res.data.errCode === 0) {
					$.each(res.data.body.data, function (index, text) {
						_this.drawDataStart.dataAxis.push(text.unit);
						_this.drawDataStart.data.push(text.number);
					});
					console.log('getAdminTjList成功')
				} else {
					console.log('getAdminTjList失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},


			//获取统计筛选科室列表-2
			async getApplyTjList() {
				this.drawData.dataAxis = [];
				this.drawData.data = [];
				let _this = this;
				const options = {
					token: this.userState.token,
					applyDeptId: this.initiateDepartmentId,
					statisticsType: 1,
					startTime: this.startingTime,
					endTime: this.endingTime,
				};
				// console.log(options)
				const res = await manageStatistics(options);
				if (res.data && res.data.errCode === 0) {
					$.each(res.data.body.data, function (index, text) {
						_this.drawData.dataAxis.push(text.unit);
						_this.drawData.data.push(text.number);
					});
					console.log('getApplyTjList成功')
				} else {
					console.log('getApplyTjList失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
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
					applyDeptId: this.applyDepartmentId,
					synergyDeptId: this.acceptDepartmentId,
					startTime: this.startingTime,
					endTime: this.endingTime,
				};
				const res = await synergyPage(options);
				if (res.data && res.data.errCode === 0) {
					this.docTableData = res.data.body.data2.list;
					if (res.data.body.data2.list.length == 0) {
						console.log('9.4医生列表List无数据')
					}
				} else {
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},

			//获取协作科室列表
			async getDepartment(oindex) {
				let _this = this;
				let query = {
					orgCode: this.userSelfInfo.orgCode,
					deptId: this.departmentsId
				};
				const res = await receiveDept(query);
				if (res.data && res.data.errCode === 0) {
					// console.log(res.data.body);
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

			//获取联系人-弹框
			async getEnableSynergyDoctor() {
				let _this = this;
				let query = {
					token: this.userState.token
				};
				const res = await enableSynergyDoctor(query);
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
			//获取病例-弹框
			ObtainMedicalCase(oid, oindex) {
				// this.getDepartment(oindex);
			},
			//获取目的-弹框
			ObtainPurpose() {

			},

			//提交协作-弹框
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
				const res = await sendSynergy(query, options);
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
		},








		async created() {
			//管理列表
			this.getAdminList();

			//统计
			this.getAdminTjList();

			//获取科室
			this.getDepartment();

			//医生列表
			this.getDocList();

			//联系人窗口列表
			this.getEnableSynergyDoctor();

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
		justify-content: space-between;
	}

	.mainTab>div:first-child {
		width: auto !important;
	}

	/* 医生端样式 */
	.cooperation .doc-title {
		display: flex;
		display: -webkit-flex;
		justify-content:space-evenly;
		align-items: baseline;
		margin-bottom: 52px;
	}

	.el-tree-node__content {
		margin: 0 0 20px 20px !important;
	}

	.el-tree-node__content .el-checkbox__inner {
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

	.startGroup {
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

	.confirmBtnBox {
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