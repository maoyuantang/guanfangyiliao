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
						<selftag v-model="onlineClinic.topFlag[0]" @reBack="getDepartment"></selftag>
						<selftag v-model="onlineClinic.topFlag[1]" @reBack="getType"></selftag>
					</div>
					<div class="online-clinic-top-right">
						<search @searchValue="adminSearchOne"></search>
						<el-button type="primary" @click="dialogFormVisible = true">新增业务</el-button>
					</div>
				</div>
				<div class="online-clinic-middle">
					{{onlineClinic.tableBody.tableData}}
					<publicList :columns="onlineClinic.tableBody.columns" :tableData="onlineClinic.tableBody.tableData" :tableBtn="onlineClinic.tableBody.tableBtn">
					</publicList>
				</div>
			</div>
			<!-- 处方审核和配送 -->
			<div v-else-if="navInfo.i===1">
				<div class="online-clinic-top">
					<div class="online-clinic-top-left">
						<selftag v-model="prescriptionAuditDistribution.topFlag[0]" @reBack="getDepartment"></selftag>
						<selftag v-model="prescriptionAuditDistribution.topFlag[1]" @reBack="getType"></selftag>
						<selftag v-model="prescriptionAuditDistribution.topFlag[2]" @reBack="getDepartment"></selftag>
						<selftag v-model="prescriptionAuditDistribution.topFlag[3]" @reBack="getType"></selftag>
						<selftag v-model="prescriptionAuditDistribution.topFlag[4]" @reBack="getDepartment"></selftag>
					</div>
					<div class="online-clinic-top-right">
						<search></search>
						<!-- <el-button type="primary">新增业务</el-button> -->
					</div>

				</div>
				<div class="online-clinic-middle">
					<publicList :columns="prescriptionAuditDistribution.tableBody.columns" :tableData="prescriptionAuditDistribution.tableBody.tableData" :tableBtn="onlineClinic.tableBody.tableBtn">
					</publicList>
				</div>
			</div>
			<!-- 统计 -->
			<div v-else-if="navInfo.i===2" class="statistics">
				<div class="hospital-management-outpatient-statistics-top">
					<div class="hospital-management-outpatient-statistics-top-left">
						<selftag v-model="statistics.topFlag[0]" @reBack="getDepartment"></selftag>
					</div>
					<div class="hospital-management-outpatient-statistics-top-right">
						<statisticsWay v-model="time" @reBack="getTime"></statisticsWay>
					</div>
				</div>
				<div class="hospital-management-outpatient-statistics-midle">

				</div>
			</div>
		</div>
		<!-- 新增门诊弹框 -->
		<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
			<!-- <addNewFrame></addNewFrame> -->
		</el-dialog>


	</div>
</template>

<script>
	//引入接口
	import {
		fetchHospitalDepts,//2.2.获取医院科室列表
		addClinic,//7.1新增远程门诊业务
		updateClinic,//7.2更新远程门诊业务
		clinicDetail,//7.3查看远程门诊业务详情
		disableClinic,//7.4禁用远程门诊业务和诊室
		searchClinic,//7.5根据条件搜索在线诊室业务
		onlineRoomsByDoctor,//7.6(WEB医生)获取所有该医生的在线诊室
		addPrescription,//7.8开处方
		updatePrescription,//7.9审核处方
		reviewList,//7.10按审方医生获取处方审核列表
		prescriptionDetailByCondition,//7.11根据条件获取处方信息
		prescriptionDetailById,//7.12根据处方id获取处方电子版
		drugSendRecord,//7.13根据处方id获取处方发货记录
		drugsByCondition,//7.16药品名称搜索药品信息
		clinicOrders,//7.18(WEB医生)获取所有该诊室的订单信息
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
			statisticsWay, addNewFrame
		},
		data() {
			return {
				//显示隐藏
				dialogFormVisible: false,//是否新增门诊
				
				//函数传参
				// 公共
				pageNum:1,//页数
				pageSize:10,//条数
				searchValue: "", //搜索框
				departmentId:"",//科室id
				businessType:"",//业务类型

				//getList2
				string:"",//门诊订单号
				sendDoctorId:"",//发药医生
				reviewDoctorId:"",//审核医生
				sendEnum:"",//配送状态（UNSEND, //未配送；SENDING, //配送中；SENDOVER, //已签收）
				reviewEnum:"",//审核状态（REVIEWED, //已审核；UNREVIEWED, //未审核；FAILREVIEWED, //不通过）

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
				onlineClinic: {
					topFlag: [
						{
							more: true,
							title: '科室',
							list: [
								{
									text: '全部'
								}
							]
						},
						{
							more: false,
							title: '类型',
							list: [
								{
									text: '全部'
								},
								{
									text: '查询提取'
								},
								{
									text: '主动推送'
								}
							]
						}
					],
					tableBody: {
						columns: [
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
							},
							{
								prop: "btns",
								label: " "
							}
						],
						tableData: [
							{
								id: "91F0B9D25A474B6FA0CDBAC872035984",
								age: "1545649424290",
								name: "冠方医院",
							},
							// {
							//     id: "120BAE29C23C470E9E73DED3D8C071BF",
							//     age: "1545618639429",
							//     name: "测试医院",
							// },
						],
						tableBtn: [
							{
								name: "评价",
								oclass: "evaluateBtn",
								method: (index, row) => {
									this.evaluateFun(index, row);
								}
							},
							{
								name: "查看记录",
								oclass: "recordBtn",
								method: (index, row) => {
									this.recordFun(index, row);
								}
							}
						]
					}
				},
				//处方审核和配送
				prescriptionAuditDistribution: {
					// 1、筛选
					topFlag: [
						{
							more: true,
							title: '科室',
							list: [
								{
									text: '全部'
								},
								{
									text: '急诊科'
								},
								{
									text: '骨科'
								},
								{
									text: '普外科'
								},
								{
									text: '肿瘤科'
								},
								{
									text: '脑病科'
								}
							]
						},
						{
							more: false,
							title: '审核状态',
							list: [
								{
									text: '全部'
								},
								{
									text: '已审核'
								},
								{
									text: '未审核(22)',
									warning: true
								},
								{
									text: '不通过'
								}
							]
						},
						{
							more: false,
							title: '配送状态',
							list: [
								{
									text: '全部'
								},
								{
									text: '未配送'
								},
								{
									text: '配送中'
								},
								{
									text: '已签收'
								}
							]
						},
						{
							more: false,
							title: '审核医生',
							list: [
								{
									text: '全部'
								},
								{
									text: 'Dennis Welch'
								},
								{
									text: 'Julie Fields'
								}
							]
						},
						{
							more: false,
							title: '发药医生',
							list: [
								{
									text: '全部'
								},
								{
									text: 'Frank Ryan'
								},
								{
									text: 'Rebecca Warren'
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
							{
								prop: "btns",
								label: " "
							}
						],
						//2.2表体
						tableData: [
							{
								id: "91F0B9D25A474B6FA0CDBAC872035984",
								age: "1545649424290",
								name: "冠方医院",
							},
							// {
							//     id: "120BAE29C23C470E9E73DED3D8C071BF",
							//     age: "1545618639429",
							//     name: "测试医院",
							// },
						],
						//2.3操作
						tableBtn: [
							{
								name: "评价",
								oclass: "evaluateBtn",
								method: (index, row) => {
									this.evaluateFun(index, row);
								}
							},
							{
								name: "查看记录",
								oclass: "recordBtn",
								method: (index, row) => {
									this.recordFun(index, row);
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
									text: '全部'
								},
								{
									text: '急诊科'
								},
								{
									text: '骨科'
								},
								{
									text: '普外科'
								},
								{
									text: '肿瘤科'
								},
								{
									text: '脑病科'
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
				userSelfInfo: state => state.user.userSelfInfo
			})
		},
		methods: {
			getNav(msg) {
				console.log(msg)
			},
			getDepartment(msg) {
				console.log(msg)
			},
			getType(msg) {
				console.log(msg)
			},
			getTime(time) {
				console.log(time)
			},
			adminSearchOne(data) {
				this.searchValue = data;
				this.getList1();
			},
			//7.1新增业务
			// async newBusiness() {
			//     let _this = this;
			//     let query = {
			//         token: this.userState.token
			//     };
			//     const options = {
			//         clinicId: "",
			//         clinicType: "远程门诊业务",
			//         clinicName: "新增远程门诊业务",
			//         clinicPrice: 1,
			//         clinicDepartmentId: "1398F2FBB8AA48518385F2486840FE17",
			//         orgCode: "1545618639429",
			//         clinicDoctors: ["EB237A1368A44A32B4070154C225C088"],
			//         clinicDesc: "这是远程门诊的业务噢~",
			//         clinicProtocolId: "",
			//         clinicProtocolName: "收费协议",
			//         clinicProtocolContent: "Oracle 将继续提供JDK 8 免费的公共更新和自动更新。",
			//         clinicPhone: "18888888888",
			//         status: ""
			//     };
			//     const res = await addClinic(query,options);
			//     if (res.data && res.data.errCode === 0) {
			//         this.adminTableData = res.data.body.data2.list;
			//     } else {
			//         console.log(res)
			//         //失败
			//         this.$notify.error({
			//             title: "警告",
			//             message: res.data.errMsg
			//         });
			//     }
			// }

			//1.2.获取医院科室列表 
			async getList1departmentManage() {
				let _this = this;
				let query = {
					orgCode: "1545649424290",
					deptId: ""
				};
				const res = await fetchHospitalDepts(query);
				if (res.data && res.data.errCode === 0) {
					console.log('科室列表+成功')
					$.each(res.data.body, function (index, text) {
						_this.onlineClinic.topFlag[0].list.push({
							text: text.deptName,
							value: text.deptId
						});
					});
				} else {
					console.log('科室列表+失败')
					//失败
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			},
			//7.5根据条件搜索在线诊室业务 
			async getList1() {
				let _this = this;
				let query = {
					token: this.userState.token,
					string: this.searchValue,
					pageNum: this.pageNum,
					pageSize:this.pageSize,
					departmentId: this.departmentId,
					businessType: this.businessType
				};
				const res = await searchClinic(query);
				if (res.data && res.data.errCode === 0) {
					console.log('列表1+成功')
					$.each(res.data.body.data2.list, function (index, text) {
						text.totalPeople = "总: " + text.totalPeople + "  今日: " + text.todayPeople
						text.doctors = "查看"
					})
					_this.onlineClinic.tableBody.tableData = res.data.body.data2.list;
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
				let _this = this;
				let query = {
					token: this.userState.token,
					departmentId: "this.departmentId",
					reviewEnum: "this.reviewEnum",
					sendEnum: "this.sendEnum",
					reviewDoctorId: "this.reviewDoctorId",
					sendDoctorId: "this.sendDoctorId",
					string: this.string,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				};
				const res = await prescriptionDetailByCondition(query);
				if (res.data && res.data.errCode === 0) {
					console.log('列表2+成功')
					$.each(res.data.body.data2.list,function(index,text){
						if(text.reviewEnum == "UNREVIEWED"){
							text.reviewEnum = '未审核'
						}else if(text.reviewEnum == "REVIEWED"){
							text.reviewEnum = '已审核'
						}else if(text.reviewEnum == "FAILREVIEWED"){
							text.reviewEnum = '不通过'
						}else{
							text.reviewEnum = '出错了'
						};
						if(text.sendEnum == "UNSEND"){
							text.sendEnum = '未配送'
						}else if(text.sendEnum == "SENDING"){
							text.sendEnum = '配送中'
						}else if(text.sendEnum == "SENDOVER"){
							text.sendEnum = '已签收'
						}else{
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
			//统计列表
			async getList3() {
				let _this = this;
				let query = {
					token: this.userState.token
				};
				const res = await searchClinic(query);
				if (res.data && res.data.errCode === 0) {
					console.log('统计列表+成功')
					this.adminTableData = res.data.body.data2.list;
				} else {
					//失败
					console.log('统计列表+失败')
					this.$notify.error({
						title: "警告",
						message: res.data.errMsg
					});
				}
			}
		},

		async created() {
			this.getList1departmentManage();//门诊管理科室获取
			this.getList1();//管理列表1
			this.getList2();//管理列表2
			// this.getList3();//管理列表3（统计）
		}
	}
</script>

<style scoped>
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
</style>