<template>
	<div class="doctors-index">
		<div class="top-info">
			<div class="info-box-out">
				<infoBox inData="远程门诊" @reback="getReData" v-if="auth['10000']">
					<infoEnter v-for="(item,index) in onlineRoomsByDoctor" :key="index" :inData="item" @reback="enterOutpatient">
					</infoEnter>
					<!-- <infoEnter :inData="testInfo" @reback="getInfoClick"></infoEnter> -->
					<h1 v-if="onlineRoomsByDoctor.length<=0">暂无数据</h1>
				</infoBox>
			</div>
			<div class="info-box-out">
				<infoBox inData="移动查房" @reback="getReData" v-if="auth['90000']">
					<infoEnter :inData="testInfo" @reback="getInfoClick"></infoEnter>
				</infoBox>
			</div>
			<div class="info-box-out">
				<infoBox inData="远程教育" @reback="getReData" v-if="auth['60000']">
					<!-- <infoList :inData="infoListData"></infoList>	 -->
					<div class="distance-learning" v-if="courseList.length>0">
						<div class="distance-learning-content">
							<div class="distance-learning-content-info">
								<div class="distance-learning-content-info-left">
									<img
										:src="courseList.length>0&&courseList[0].headImgURL?courseList.headImgURL:'../../../static/assets/img/a-6.png'"
										alt="">
								</div>
								<div class="distance-learning-content-info-right">
									<p class="doc-name">{{courseList.length>0?courseList[0].teacherName:''}}</p>
									<p class="class-num">{{courseList.length>0?courseList[0].courseNumber:''}}</p>
								</div>
							</div>
							<div class="distance-learning-content-status">
								<div class="distance-learning-content-status-item">
									<p class="distance-learning-content-status-item-name">授课时间</p>
									<p class="distance-learning-content-status-item-value">
										{{courseList.length>0?courseList[0].teachStartTime:''}}</p>
								</div>
								<div class="distance-learning-content-status-item">
									<p class="distance-learning-content-status-item-name">报名人数</p>
									<p class="distance-learning-content-status-item-value">{{courseList.length>0?courseList[0].num:''}}
									</p>
								</div>
								<div class="distance-learning-content-status-item">
									<p class="distance-learning-content-status-item-name">状态</p>
									<p class="distance-learning-content-status-item-value">
										{{courseList.length>0?courseList[0].classState:''}}</p>
								</div>
								<div class="distance-learning-content-status-item">
									<el-button size="mini" type="danger">{{courseList.length>0?courseList[0].actionCount:''}}</el-button>
								</div>
							</div>
						</div>
					</div>
					<h1 v-else>暂无数据</h1>
				</infoBox>
			</div>
		</div>
		<!-- 今日计划 -->
		<div class="doctor-table" v-if="auth['40000']">
			<div class="table-border">
				<infoListHead :inData="todayPlan" @reBack="getPlanHistory"></infoListHead>
				<userInfoRow v-for="(item,index) in todayPlan.data" :key="index" :inData="item" @reback="getClick">
					<div class="slot-time-introduction">
						<span class="user-info-table-time">拟定时间:{{item.planStartTime || '丢失数据'}}</span>
						<span class="user-info-table-introduction">{{item.content || '丢失数据'}}</span>
					</div>
				</userInfoRow>
				<p v-if="todayPlan.data.length<1">暂无数据</p>
				<!-- <userInfoRow :inData="testBody" @reback="getClick">
					<div class="slot-time-introduction">
						<span class="user-info-table-time">拟定时间:2018-05.25</span>
						<span class="user-info-table-introduction">拟定内容的内容有点多 自动换行并全部显示 打电话通知体检  检查尿酸值</span>
					</div>
				</userInfoRow> -->
			</div>
		</div>
		<!-- 告警 -->
		<div class="doctor-table" v-if="auth['40000']">
			<div class="table-border">
				<infoListHead :inData="todayAlert" @reBack="getAlertHistory"></infoListHead>
				<userInfoRow v-for="(item,index) in todayAlert.data" :key="index" :inData="item" @reback="getClick">
					<div class="slot-item-info">
						<span class="user-info-item-name">{{item.type || '丢失数据'}}</span>
						<span class="user-info-item-info">{{item.value || '丢失数据'}}</span>
						<!-- <span class="user-info-item-info">舒张压>90mmHg</span> -->
					</div>
				</userInfoRow>
				<p v-if="todayAlert.data.length<1">暂无数据</p>
				<!-- <userInfoRow :inData="testBody" @reback="getClick">
					<div class="slot-item-info">
						<span class="user-info-item-name">血压项</span>
						<span class="user-info-item-info">收缩压>180mmHg</span>
						<span class="user-info-item-info">舒张压>90mmHg</span>
					</div>
				</userInfoRow> -->
			</div>
		</div>
		<!-- 近期随访 -->
		<div class="doctor-table" v-if="auth['40000']">
			<div class="table-border">
				<infoListHead :inData="todayFollowup" @reBack="getHistoryFollowup"></infoListHead>
				<userInfoRow v-for="(item,index) in todayFollowup.data" :key="index" :inData="testBody" @reback="getClick">
					<div class="solt-follow-up">
						<div class="solt-follow-up-time">
							<span class="solt-follow-up-time-item">随访制定时间: {{item.createTime || '丢失数据'}}</span>
							<span class="solt-follow-up-time-item">近期随访时间: {{item.followupTime || '丢失数据'}}</span>
						</div>
						<div class="solt-follow-up-status">
							<span class="solt-follow-up-status-item">已完成随访: {{item.complete || '丢失数据'}}</span>
							<span class="solt-follow-up-status-item undone">未完成随访: {{item.ongoing || '丢失数据'}}</span>
						</div>
						<div class="solt-follow-up-view">
							<el-button>查看</el-button>
						</div>
					</div>
				</userInfoRow>
				<p v-if="todayFollowup.data.length<1">暂无数据</p>
				<!-- <userInfoRow :inData="testBody" @reback="getClick">
					<div class="solt-follow-up">
						<div class="solt-follow-up-time">
							<span class="solt-follow-up-time-item">随访制定时间: 2018-02-22</span>
							<span class="solt-follow-up-time-item">近期随访时间: 2018-03-25</span>
						</div>
						<div class="solt-follow-up-status">
							<span class="solt-follow-up-status-item">已完成随访: 2</span>
							<span class="solt-follow-up-status-item undone">未完成随访: 8</span>
						</div>
						<div class="solt-follow-up-view">
							<el-button>查看</el-button>
						</div>
					</div>
				</userInfoRow> -->
			</div>
		</div>

		<!-- 查看历史计划 -->
		<div class="history-alert">
			<el-dialog :title="planHistory.title" :visible.sync="planHistory.show">
				<div class="history-alert-div">
					<div class="history-alert-findby-condition">
						<div class="history-alert-findby-condition-item">
							<el-button type="primary" size="mini" @click="planHistoryShow({type:'base',value:0})">全部</el-button>
						</div>
						<div class="history-alert-findby-condition-item">
							<el-button type="primary" size="mini" @click="planHistoryShow({type:'base',value:1})">昨天</el-button>
						</div>
						<div class="history-alert-findby-condition-item">
							<el-button type="primary" size="mini" @click="planHistoryShow({type:'base',value:3})">三天内</el-button>
						</div>
						<div class="history-alert-findby-condition-item">
							<span class="history-alert-findby-condition-item-name">时间筛选</span>
							<el-date-picker v-model="planHistory.selectTime" type="daterange" start-placeholder="开始日期"
								end-placeholder="结束日期" size="mini" :default-time="['00:00:00', '23:59:59']">
							</el-date-picker>
							<span class="history-alert-findby-condition-item-ok"
								@click="planHistoryShow({type:'interval',value:planHistory.selectTime})">确认</span>
						</div>
					</div>
					<div class="history-alert-findby-name">
						<el-button icon="el-icon-search" size="mini"
							@click="planHistoryShow({type:'name',value:planHistory.selectName})"></el-button>
						<el-input v-model="planHistory.selectName" placeholder="请输入内容" size="mini"></el-input>
					</div>
					<div class="history-alert-show-content">
						<ul class="history-alert-show-content-ui">
							<li class="history-alert-show-content-li" v-for="(item,index) in planHistory.showList" :key="index">
								<div class="history-alert-show-content-info">
									<div class="history-alert-show-content-info-img">
										<img src="../../assets/img/a-6.png" alt="">
									</div>
									<div class="history-alert-show-content-info-name">
										<p>{{item.name || 'null'}}</p>
										<p>{{item.phone || 'null'}}</p>
									</div>
									<div class="history-alert-show-content-info-time">
										<span>定制时间:{{item.planCreateTime || ''}}</span>
									</div>
									<div class="history-alert-show-content-info-time">
										<span>开始时间:{{item.planStartTime || ''}}</span>
									</div>
									<div class="history-alert-show-content-info-status">
										<span>{{item.planStatus || ''}}</span>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</el-dialog>
		</div>

		<!-- 双向转诊 -->
		<div class="doctor-table" v-if="auth['80000']">
			<div class="table-border">
				<div class="doctor-table-top">
					<div class="doctor-table-top-name"><span>双向转诊</span></div>
					<div class="doctor-table-top-btn">
						<el-button plain>查看更多</el-button>
					</div>
				</div>
				<div class="doctor-table-body">
					<div class="doctor-table-body-item" v-for="(item,index) in referral.data" :key="index">
						<div class="doctor-table-body-item-img">
							<img src="../../assets/img/a-6.png" alt="" srcset="">
						</div>
						<div class="doctor-table-body-item-name">
							<span>{{item.applyDoctorName}}</span>
						</div>
						<div class="doctor-table-body-item-org">
							<span>{{item.applyOrgName}}||{{item.deptName}}</span>
						</div>
						<div class="doctor-table-body-item-num">
							<span>{{item.referralNo}}</span>
						</div>
						<div class="doctor-table-body-item-time">
							<span>{{item.applyTime}}</span>
						</div>
						<div class="doctor-table-body-item-status">
							<span :class="item.className">{{item.stateName}}</span>
						</div>
						<div class="doctor-table-body-item-btns">
							<el-button type="warning" size="mini" plain>查看档案</el-button>
							<el-button type="primary" size="mini" plain>转诊详情</el-button>
							<el-button type="warning" size="mini" plain>警告按钮</el-button>
							<el-button type="warning" size="mini" plain>警告按钮</el-button>
						</div>
					</div>


				</div>
			</div>
		</div>

		<!-- 远程会诊 -->
		<div class="doctor-table" v-if="auth['20000']">
			<div class="table-border">
				<div class="doctor-table-top">
					<div class="doctor-table-top-name"><span>远程会诊</span></div>
					<div class="doctor-table-top-btn">
						<el-button plain>查看更多</el-button>
					</div>
				</div>
				<div class="doctor-table-body">
					<div class="doctor-table-body-item" v-for="(item,index) in queryByManagerPage.data" :key="index">
						<div class="doctor-table-body-item-img">
							<img src="../../assets/img/a-6.png" alt="" srcset="">
						</div>
						<div class="doctor-table-body-item-name">
							<span>{{item.doctor}}</span>
						</div>
						<div class="doctor-table-body-item-org">
							<span>{{item.hospital}}||{{item.department}}</span>
						</div>
						<div class="doctor-table-body-item-num">
							<span>{{item.consultationId}}</span>
						</div>
						<div class="doctor-table-body-item-time">
							<span>{{item.applicationTime}}</span>
						</div>
						<div class="doctor-table-body-item-status">
							<span :class="item.className">{{item.statusName}}</span>
						</div>
						<div class="doctor-table-body-item-btns">
							<el-button type="warning" size="mini" plain>警告按钮</el-button>
							<el-button type="warning" size="mini" plain>警告按钮</el-button>
							<el-button type="warning" size="mini" plain>警告按钮</el-button>
							<el-button type="warning" size="mini" plain>警告按钮</el-button>
						</div>
					</div>


				</div>
			</div>
		</div>


		<!-- <div class="doctor-table">
			<div class="table-border">
				<infoListHead :inData="referral" @reBack="getHistoryFollowup"></infoListHead>
				<newModuleTable v-for="(item,index) in referral.data" :key="index" :inData="item">
					<el-button size="mini" type="warning" v-if="item.buttons.find(ele=>ele)" plain>查看档案</el-button>
					<el-button size="mini" type="primary" plain>转诊详情</el-button>
					<el-button size="mini" type="success" plain>编辑</el-button>
					<el-button size="mini" type="danger" plain>删除</el-button>
				</newModuleTable>
			</div>
		</div> -->
		<!-- 为后面的表格做准备 没心思封装组件 -->
		<!-- <div class="doctor-table">
			<div class="table-border">
				<infoListHead :inData="queryByManagerPage" @reBack="getHistoryFollowup"></infoListHead>
				<newModuleTable v-for="(item,index) in queryByManagerPage.data" :key="index" :inData="item">
					<el-button size="mini" type="warning" plain>查看档案</el-button>
					<el-button size="mini" type="primary" plain>转诊详情</el-button>
					<el-button size="mini" type="success" plain>编辑</el-button>
					<el-button size="mini" type="danger" plain>删除</el-button>
				</newModuleTable>
			</div>
		</div> -->
		<el-dialog title="" :visible.sync="oVideoData.show" center append-to-body fullscreen>
			<oVideo :createVideoRoomData="oVideoData.createVideoRoomData" :videoType="oVideoData.videoType"
				:oClinicId="oVideoData.oClinicId"></oVideo>
		</el-dialog>


	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import infoBox from '../../public/publicComponents/infoBox.vue'
	import infoEnter from '../../public/publicComponents/infoEnter.vue'
	import infoList from '../../public/publicComponents/infoList.vue'
	import plantTable from '../../public/publicComponents/plantTable.vue'
	import infoListHead from '../../public/publicComponents/infoListHead.vue'
	import userInfoRow from '../../public/publicComponents/userInfoRow.vue'
	import newModuleTable from '../../public/publicComponents/newModuleTable.vue'
	import historyAlert from '../../public/publicComponents/historyAlert.vue'
	import oVideo from '../../video/oVideo.vue'
	import {
		todayPlan, todayAlert, planHistory, todayFollowup, alertHistory, historyFollowup, queryByDoctorPage, onlineRoomsByDoctor,
		queryByManagerPage, synergyPage, indexCourseList, doctorInto, dualReferralPage
	} from '../../api/apiAll.js'
	import apiBaseURL from '../../enums/apiBaseURL.js'

	export default {
		watch: {
			auth(n) { console.log(n) }
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo,
				userSelfInfo: state => state.user.userSelfInfo
			})
		},

		data() {
			return {
				oVideoData: {
					createVideoRoomData: {
						conferenceId: "",
						conferenceNumber: ""
					},
					videoType: "门诊",
					oClinicId: "",
					show: false
				},

				/**
				 * 权限列表
				 */
				auth: {},

				/**
				 * 权限列表（数组形式）
				 */
				authList: [
					// {
					// 	"id": "65402e24bf6743d3b20c97f84b6c59d3",
					// 	"courseNumber": "GF1550033179971",
					// 	"type": "远程视频直播授课",
					// 	"name": "直播房间ios",
					// 	"source": null,
					// 	"teacherName": "我",
					// 	"headId": null,
					// 	"teachStartTime": "2019-02-13 09:00",
					// 	"num": 1,
					// 	"classState": "未开始",
					// 	"signUpState": false,
					// 	"courseType": "LIVE",
					// 	"teacher": true,
					// 	"action": "TOTEACH"
					// }
				],
				/**
				 * 远程教育首页排课列表【医生web】
				 */
				courseList: [],
				/**
				 * 远程协作
				 */
				cooperation: {
					name: '远程协作',
					data: []
				},
				/**
				 * 双向转诊
				 */
				referral: {
					name: '双向转诊',
					data: []
				},

				/**
				 * 今日计划
				 */
				todayPlan: {
					name: "今日计划",
					data: [
						// {
						// 	"infoId": "1d775f83bc254c62b7d32bb54a407b3d",
						// 	"userId": "10000",   
						// 	"headId": null, 
						// 	"userName": "超级管理员",
						// 	"phone": null,
						// 	"planStatus": "进行中",
						// 	"content": "一段亲切的问候哦",
						// 	"planStartTime": "2019-01-04 18:00:00",
						// 	"planCreateTime": "2019-01-04"
						// }
					]
				},
				/**
				 * 今日告警
				 */
				todayAlert: {
					name: "今日警告",
					data: [
						// {
						// 	"infoId": "8aa52e6a08494403b34d41b226b0c8a3",
						// 	"userId": "10000",
						// 	"headId": null,
						// 	"userName": "超级管理员",
						// 	"phone": null,
						// 	"createTime": "2019-01-10 14:38:11",
						// 	"planStatus": "处理中",
						// 	"type": "血压计",
						// 	"value": "收缩压>140.0mmHg 舒张压>90.0mmHg 脉搏>100.0mmHg"
						// }
					]
				},

				/**
				 * 历史计划
				 */
				planHistory: {
					title: '查看历史计划',//弹窗标题
					show: false,//是否显示
					selectTime: [],//选择的时间
					selectName: '',//选择的名称
					allList: [],//所有列表
					showList: []//根据选择计算过后需要显示的列表
				},

				/**
				 * 今日（近期）随访
				 */
				todayFollowup: {
					name: '近期随访',
					data: [
						// {
						// 	"infoId": "01745963527c4692ae1bb00dc0fe0a29",
						// 	"userId": "10000",
						// 	"headId": null,
						// 	"userName": "超级管理员",
						// 	"phone": null,
						// 	"planStatus": "处理中",
						// 	"createTime": "2019-01-04",
						// 	"followupTime": "2019-01-05",
						// 	"complete": "已完成随访: 2",
						// 	"ongoing": "未完成随访: 1",
						// 	"followupTitle": "第个随访模板",
						// 	"followupPlanId": "63b8ce173ac94818a3cfc91fd327f7e2"
						// },
					]
				},

				/**
				 * 历史随访
				 */
				historyFollowup: {
					name: '历史随访',
					data: {
						// "pageNum": 1,
						// "pageSize": 10,
						// "size": 1,
						// "startRow": 1,
						// "endRow": 1,
						// "total": 1,
						// "pages": 1,
						// "prePage": 0,
						// "nextPage": 0,
						// "isFirstPage": true,
						// "isLastPage": true,
						// "hasPreviousPage": false,
						// "hasNextPage": false,
						// "navigatePages": 8,
						// "navigatepageNums": [
						// 	1
						// ],
						// "navigateFirstPage": 1,
						// "navigateLastPage": 1,
						// "lastPage": 1,
						// "firstPage": 1,
						// list:[
						// 	{
						// 		"infoId": "dbe266bdb70348e19499a056da59f984",
						// 		"userId": "10000",
						// 		"headId": null,
						// 		"userName": "超级管理员",
						// 		"phone": null,
						// 		"planStatus": "已处理",
						// 		"createTime": "2019-01-04",
						// 		"followupTime": "2019-01-05",
						// 		"complete": null,
						// 		"ongoing": null,
						// 		"followupTitle": "第个随访模板",
						// 		"followupPlanId": "cd6e6acfd66c4546ac0fd58ba6336041"
						// 	}
						// ]
					}
				},

				/**
				 * 历史警告
				 */
				alertHistory: {
					name: '历史警告',
					data: {
						// "pageNum": 1,
						// "pageSize": 10,
						// "size": 10,
						// "startRow": 1,
						// "endRow": 10,
						// "total": 19,
						// "pages": 2,
						// "prePage": 0,
						// "nextPage": 2,
						// "isFirstPage": true,
						// "isLastPage": false,
						// "hasPreviousPage": false,
						// "hasNextPage": true,
						// "navigatePages": 8,
						// "navigatepageNums": [
						// 	1,
						// 	2
						// ],
						// "navigateFirstPage": 1,
						// "navigateLastPage": 2,
						// "lastPage": 2,
						// "firstPage": 1,
						// list:[
						// 	{
						// 		"infoId": "d60d6ed980b84f3caf4df18fd1bb3911",
						// 		"userId": "10000",
						// 		"headId": null,
						// 		"userName": "超级管理员",
						// 		"phone": null,
						// 		"createTime": "2019-01-08 14:38:29",
						// 		"planStatus": "已超时",
						// 		"type": "血压计",
						// 		"value": "收缩压>140.0mmHg 舒张压>90.0mmHg 脉搏>100.0mmHg",
						// 		"currentTime": null
						// 	},
						// ]
					}
				},

				/**
				 * 远程门诊系统信息
				 */
				onlineRoomsByDoctor: [],

				/**
				 * 远程会诊系统信息
				 */
				queryByManagerPage: {
					name: '远程会诊',
					data: []
				},

				/**
				 * 移动查房信息 （后端还没有接口）
				 */
				mobileRounds: {},
				/************* */
				testBody: {
					img: '',
					name: 'Amanda Reyes',
					phone: '(499)-430-5810',
					id: ''
				},
				testInfo: {
					name: '急救中心',
					unprocessed: 12,
					processed: 28
				},
				infoListData: [
					{
						img: '../../assets/logo.png',
						name: 'Ronald Bennett Ronald Bennett',
						introduction: '西南医院第一附属医院 神经内科',
						time: '2018-12-25 10:00 ',
						status: {
							num: 0,
							text: '等待审核'
						},
						id: ''
					},
					{
						img: '../asset/logo.png',
						name: 'Ronald Bennett',
						introduction: '西南医院第一附属医院 神经内科',
						time: '2018-12-25 10:00',
						status: {
							num: 0,
							text: '等待审核'
						},
						id: ''
					},
					{
						img: '../asset/logo.png',
						name: 'Ronald Bennett',
						introduction: '西南医院第一附属医院 神经内科',
						time: '2018-12-25 10:00',
						status: {
							num: 0,
							text: '等待审核'
						},
						id: ''
					},
					{
						img: '../asset/logo.png',
						name: 'Ronald Bennett',
						introduction: '西南医院第一附属医院 神经内科',
						time: '2018-12-25 10:00',
						status: {
							num: 0,
							text: '等待审核'
						},
						id: ''
					}
				],


			}
		},

		methods: {
			/**
			 * 获取 双向转诊信息
			 */
			async getDualReferralPage() {
				const res = await dualReferralPage({
					token: this.userInfo.token,
					pageNum: 1,
					pageSize: 3,
				});
				console.log(res);
				if (res.data && res.data.errCode === 0) {
					const statusColorMap = {
						'等待审核': 'status0',
						'等待接诊': 'status1',
						'等待出院': 'status2',
						'未开始': 'status0',
						'进行中': 'status1',
						'已取消': 'status3',
						'已结束': 'status3'
					};
					const btnStatusColorMap = {
						UPDATE: 'success',//修改
						CANCEL: 'info',//取消
						AUDIT: '',//审核
						RECEPTION,//接诊
						LEAVE_HOSPITAL,//出院
						REFERRAL//转诊
					};
					this.referral.data = res.data.body.data2.list.map(item => {
						item.className = statusColorMap[item.stateName];
						return item;
					});
				} else {
					this.$notify({
						title: '失败',
						message: '双向转诊信息获取失败',
						type: 'error'
					});
				}
			},
			/**
			 * 进入 门诊
			 */
			async enterOutpatient(item) {
				console.log(item)
				const res = await doctorInto({ token: this.userInfo.token }, { clinicId: item.id });
				if (res.data && res.data.errCode === 0) {
					this.oVideoData.oClinicId = item.id;
					this.oVideoData.show = true;
				} else {
					this.$notify({
						title: '失败',
						message: '进入诊室失败',
						type: 'error'
					});
				}
			},
			/**
			 * 获取 远程教育首页排课列表【医生web】
			 */
			async getIndexCourseList() {
				const res = await indexCourseList({ token: this.userInfo.token });
				console.log(res);
				if (res.data && res.data.errCode === 0) {
					const actionMap = {
						TOSIGNUP: '报名',
						TOLEARN: '进入学习',
						TOTEACH: '进入教学',
						NULL: '无操作'
					};
					this.courseList = res.data.body.map(item => {
						item.actionCount = actionMap[item.action] || actionMap.NULL;
						item.headImgURL = item.headId ? `${apiBaseURL.developmentEnvironment}/m/v1/api/hdfs/fs/download/${item.headId}` : item.headId;
						return item;
					})
				} else {
					this.$notify({
						title: '失败',
						message: '远程教育首页排课获取失败',
						type: 'error'
					});
				}
			},
			/**
			 * 获取今日计划
			 */
			async getTodayPlan() {
				const res = await todayPlan({ token: this.userInfo.token });
				console.log(res);
				if (res.data && res.data.errCode === 0) {
					this.todayPlan.data = res.data.body.map(item => {
						item.name = item.userName;
						item.id = item.userId;
						return item;
					});
				} else {
					this.$notify({
						title: '失败',
						message: '今日计划获取失败',
						type: 'error'
					});
				}

			},

			/**
			 * 获取历史计划
			 */
			async getPlanHistory() {
				const res = await planHistory({ token: this.userInfo.token });
				console.log(res);
				if (res.data && res.data.errCode === 0) {
					//这个位置可以判断是否有数据，长度是不是0，暂时不做
					const countData = [...this.todayPlan.data, ...res.data.body.list];//合并今日计划和历史计划
					this.planHistory.allList = countData;
					this.planHistory.showList = countData;
					this.planHistory.show = true;
					console.log(this.planHistory.allList)
				} else {
					this.$notify({
						title: '失败',
						message: '历史计划获取失败',
						type: 'error'
					});
				}
			},

			/**
			 * 获取今日警告
			 */
			async getTodayAlert() {
				const res = await todayAlert({ token: this.userInfo.token });
				console.log(res)
				if (res.data && res.data.errCode === 0) {
					this.todayAlert.data = res.data.body.map(item => {
						item.name = item.userName;
						item.id = item.userId;
						return item;
					});
				} else {
					this.$notify({
						title: '失败',
						message: '今日警告获取失败',
						type: 'error'
					});
				}
			},

			/**
			 * 获取历史警告
			 */
			async getAlertHistory() {
				const res = await alertHistory({ token: this.userInfo.token });
				console.log(res)
				if (res.data && res.data.errCode === 0) {
					alert('success')
					console.log(this.alertHistory)
					this.alertHistory.data = res.data.body
				} else {
					this.$notify({
						title: '失败',
						message: '今日警告获取失败',
						type: 'error'
					});
				}
			},

			/**
			 * 获取近期（今日）随访
			 */
			async getTodayFollowup() {
				const res = await todayFollowup({ token: this.userInfo.token });
				console.log(res)
				if (res.data && res.data.errCode === 0) {
					this.todayFollowup.data = res.data.body.map(item => {
						item.name = item.userName;
						item.id = item.userId;
						return item;
					});
				} else {
					this.$notify({
						title: '失败',
						message: '近期随访获取失败',
						type: 'error'
					});
				}
			},

			/**
			 * 获取历史随访
			 */
			async getHistoryFollowup() {
				const res = await historyFollowup({ token: this.userInfo.token });
				console.log(res)
				if (res.data && res.data.errCode === 0) {
					alert('success')
					this.historyFollowup.data = res.data.body
				} else {
					this.$notify({
						title: '失败',
						message: '历史随访获取失败',
						type: 'error'
					});
				}
			},

			/**
			 * 计算权限列表
			 */
			getAuth() {
				const result = this.userInfo.hasAuth.filter(item => item.type === '2');//挑出医生的权限
				const table = {
					'10000': { name: '远程门诊', code: '10000', has: false },
					'20000': { name: '远程会诊', code: '20000', has: false },
					'30000': { name: '远程协作', code: '30000', has: false },
					'40000': { name: '智能随访', code: '40000', has: false },
					'50000': { name: '健康档案', code: '50000', has: false },
					'60000': { name: '远程教育', code: '60000', has: false },
					'70000': { name: '分级诊疗', code: '70000', has: false },
					'80000': { name: '双向转诊', code: '80000', has: false },
					'90000': { name: '移动查房', code: '90000', has: false },
					'100000': { name: '终端管理', code: '100000', has: false },
					'11000': { name: '家医服务', code: '11000', has: false },
				};
				result.forEach(element => {
					table[element.authorityId] ? table[element.authorityId].has = true : null;
					// table[element.authorityId] && table[element.authorityId].has = true;

				});
				this.auth = table;
				this.authList = result.filter(item => table[item.authorityId]);
				// this.authList = result.map(item=>table[item.authorityId]);
				// console.log(this.auth)
				// console.log(this.authList)
				// console.log(result);
				// this.auth = result;
			},

			/**
			 * 计算ajax
			 */
			countAjax() {
				console.log('enter')
				const table = [
					{
						code: '10000',//远程门诊
						funs: [this.getOnlineRoomsByDoctor]
					},
					{
						code: '20000',//远程会诊
						funs: [this.getQueryByManagerPage]
					},
					{
						code: '30000',//远程协作
						funs: [this.getSynergyPage]
					},
					{
						code: '40000',//智能随访
						funs: [
							this.getTodayPlan,
							this.getTodayAlert,
							this.getTodayFollowup
						]
					},
					{
						code: '60000',//远程教育
						funs: [this.getIndexCourseList]
					},
					{
						code: '80000',//双向转诊
						funs: [this.getDualReferralPage]
					},
					{
						code: '90000',//移动查房
						funs: [function () { console.log('暂时还没写') }]
					},
				];
				// const runList = this.auth.filter(item=>item.has);//筛选出有权限的模块，并执行他下面需要调用的接口
				console.log(this.authList)
				this.authList.forEach(item => {
					table.forEach(v => {
						if (item.authorityId === v.code) {
							Promise.all(v.funs.map(item => item()))
								.then(res => console.log(res))
								.catch(err => console.log(err))
							// break;//注意这个问题  forEach不能使用break跳出循环
						}
					});
				});
			},

			/**
			 * 设置历史计划显示内容
			 */
			planHistoryShow(select) {
				console.log(select)
				const table = {
					base: this.planHistoryshowAll,
					interval: this.planHistoryshowInterval,
					name: this.planHistoryshowName
				};
				table[select.type](select.value);
			},

			/**
			 * 显示全部历史计划 或者 昨天  或者 三天内
			 */
			planHistoryshowAll(num) {
				try {
					if (!num) {
						this.planHistory.showList = this.planHistory.allList.map(item => item);
					} else {
						const nowTime = Number(new Date())
						this.planHistory.showList = this.planHistory.allList.filter(item => Number(new Date(item.planCreateTime)) + num * 24 * 60 * 60 * 10000 > nowTime)
					}
				} catch (e) {
					console.log(e)
				}
			},

			/**
			 * 显示历史计划 一段时间范围内
			 */
			planHistoryshowInterval(interval) {
				try {
					const startTime = Number(new Date(interval[0]));
					const endTime = Number(new Date(interval[1]));
					this.planHistory.showList = this.planHistory.allList.filter(item => Number(new Date(item.planCreateTime)) > startTime && Number(new Date(item.planCreateTime)) < endTime);
					console.log(this.planHistory.showList)
				} catch (e) {
					console.log(e)
				}

			},

			/**
			 * 显示历史计划 按名字查找
			 */
			planHistoryshowName(name) {
				try {
					this.planHistory.showList = this.planHistory.allList.filter(item => item.name.includes(name));
				} catch (e) {
					console.log(e)
				}
			},

			/**
			 * 获取远程会诊列表
			 */
			async getQueryByDoctorPage() {
				// console.log('enter')
				const res = await queryByDoctorPage({
					token: this.userInfo.token,
					dateType: 'TODAY',
					pageNum: 1,
					pageSize: 3
				});
				console.log(res);
			},

			/**
			 * 获取远程门诊信息
			 */
			async getOnlineRoomsByDoctor() {
				const res = await onlineRoomsByDoctor({
					token: this.userInfo.token,
					pageNum: 1,
					pageSize: 2
				});
				console.log(res);
				if (res.data && res.data.errCode === 0) {
					this.onlineRoomsByDoctor = res.data.body.data2.list.map(item => {
						item.name = item.clinicName;
						item.unprocessed = item.unProcess;
						item.processed = item.process;
						return item;
					})
				} else {
					this.$notify({
						title: '失败',
						message: '获取远程门诊信息失败',
						type: 'error'
					});
				}

			},

			/**
			 * 获取远程会诊系统信息
			 */
			async getQueryByManagerPage() {
				const res = await queryByManagerPage({
					token: this.userInfo.token,
					pageNum: 1,
					pageSize: 2
				});
				console.log(res);
				if (res.data && res.data.errCode === 0) {
					const statusMap = {
						NEW: {
							zh: '未开始',
							class: 'status0'
						},
						UNDERWAY: {
							zh: '进行中',
							class: 'status1'
						},
						OVER: {
							zh: '结束',
							class: 'status2'
						}
					};
					this.queryByManagerPage.data = res.data.body.data2.list.map(item => {
						item.userName = item.doctor;
						item.num = item.consultationId;
						item.time = item.applicationTime.split('.')[0];
						item.statusName = statusMap[item.status] ? statusMap[item.status].zh : '';
						item.className = statusMap[item.status] ? statusMap[item.status].class : '';
						return item;
					});
					console.log(this.queryByManagerPage)
				} else {
					this.$notify({
						title: '失败',
						message: '获取远程会诊信息失败',
						type: 'error'
					});
				}
			},

			/**
			 * 获取医生协作列表
			 */
			async getSynergyPage() {
				const res = await synergyPage({
					token: this.userInfo.token,
					pageNum: 1,
					pageSize: 3,
				});
				console.log(res)
			},
			/********* */
			getReData(data) {
				console.log(data)
			},
			getInfoClick(item) {
				console.log(item)
			},
			letMeTest(data) {
				console.log(data)
			},
			getClick(data) {
				console.log(data)
			}
		},
		components: {
			infoBox,
			infoEnter,
			infoList,
			plantTable,
			infoListHead,
			userInfoRow,
			newModuleTable,
			historyAlert,
			oVideo
		},
		async created() {
			this.getAuth();
			this.countAjax();
			// console.log(this.userSelfInfo.userId)
			// this.getTodayPlan();
			// this.getTodayAlert();
			// this.getTodayFollowup();
			// console.log(this.userInfo.hasAuth)

		}
	}
</script>

<style>
	.doctors-index {}

	.doctor-table {
		padding-right: 0.61rem;
		/* width: 100%; */
		/* min-width: 13.66rem */
	}

	.doctors-index .top-info {
		display: flex;
		/* display: none; */
		/* justify-content: space-between; */

	}

	.doctors-index .info-box-out {
		margin-right: 0.13rem;
	}

	.doctors-index .table-border {
		background: #FFFFFF;
		border: 1px solid #EBF0F4;
		border-radius: 3px;
		margin-top: 2.9%;
		padding-left: 0.14rem;
		padding-right: 0.3rem;
	}

	.doctors-index .table-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 0.68rem;
		box-sizing: border-box;
		border-bottom: 1px solid #EBF0F4;
	}

	.doctors-index .doctor-table .table-title {
		font-family: var(--fontFamily3);
		font-size: var(--fontSize6);
		color: var(--color7);
		letter-spacing: 0;
		line-height: 0.28rem;
	}

	.doctors-index .doctor-table .table-head button {
		border-color: var(--borderColor4);
		/* border-color:red; */
	}

	.doctors-index .doctor-table .table-head button span {
		color: var(--color15);
		/* color: red; */
	}

	.doctors-index .doctor-table .table-list-item {
		align-items: center;
		display: flex;
	}

	.doctors-index .doctor-table .table-list-item .user-head-img-div {
		width: 0.42rem;
		height: 0.42rem;
		margin-right: 1.3%;
	}

	.doctors-index .doctor-table .table-list-item .user-head-img-div .user-head-img {
		width: 0.42rem;
		height: 0.42rem;
		display: block;
		border-radius: 50%;
	}

	.doctors-index .doctor-table .table-list-item .user-name {
		font-family: var(--fontFamily2);
		color: var(--color16);
		letter-spacing: 0;
		margin-right: 4.7%;
		width: 0.98rem;
	}

	.doctors-index .doctor-table .table-list-item .user-phone {
		font-family: var(--fontFamily2);
		color: var(--color16);
		letter-spacing: 0;
		margin-right: 4.2%;
		width: 1.25rem;
	}

	.doctors-index .doctor-table .table-list-item .table-time {
		font-family: var(--fontFamily2);
		color: var(--color16);
		letter-spacing: 0;
		font-family: var(--fontFamily3);
		margin-right: 5.5%;
		width: 1.37rem;
	}

	.doctors-index .doctor-table .table-list-item .table-introduction {
		font-family: var(--fontFamily3);
		color: var(--color16);
		letter-spacing: 0;
		width: 3.12rem;
	}

	.doctors-index .doctor-table .table-list-item .table-btn-div {
		margin-right: 4.9%;
		width: 3.5rem;
	}

	.doctors-index .doctor-table .table-list-item .table-btn-div button {
		width: 0.57rem;
		height: 0.2rem;
	}

	.doctors-index .doctor-table .table-list-item .table-btn-div span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.doctors-index .doctor-table .table-list-item .item-status {
		flex: 1;
		justify-content: center;
	}

	.doctors-index .doctor-table .table-list-item .item-status button {
		width: 0.57rem;
		height: 0.2rem;
	}

	.doctors-index .doctor-table .table-list-item .item-status button span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.doctors-index-table-itemmerge {
		margin-right: 2.5%;
		width: 5.45rem;
		display: flex;
		justify-content: space-between;
	}

	.follow-up-task {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex: 1;
	}

	.follow-up-classification {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-left: 0.2rem;
		width: 0.65rem;
	}

	.follow-up-task button {
		width: 0.57rem;
		height: 0.2rem;
	}

	.follow-up-task button span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.slot-time-introduction {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.user-info-item-name {
		padding-right: 0.2rem;
	}

	.user-info-item-info {
		color: var(--color17);
		padding-right: 0.21rem;
	}

	.solt-follow-up {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.solt-follow-up-time {
		display: flex;
		flex-direction: column;
	}

	.solt-follow-up-status {
		display: flex;
		flex-direction: column;
	}

	.solt-follow-up-view>.el-button {
		width: 0.68rem;
		height: 0.32rem;
		padding: 0;
	}

	.solt-follow-up-view>.el-button>span {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color15);
		width: 100%;
		height: 100%;
	}

	.undone {
		color: var(--color17)
	}

	.history-alert-findby-condition {
		display: flex;
		align-items: center;
	}

	.history-alert-findby-condition-item {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.history-alert-findby-condition-item>div {
		flex: 3;
	}

	.history-alert-findby-condition-item-name {
		flex: 1;
		text-align: center;
	}

	.history-alert-findby-condition-item-ok {
		/* flex: 1; */
		width: 0.4rem;
		margin-left: 0.1rem;
		color: white;
		cursor: pointer;
		text-align: center;
		background: #4398fd;
	}

	.history-alert-findby-name {
		display: flex;
		flex-direction: row-reverse;
	}

	.history-alert-findby-name>button {
		margin-left: 0.1rem;
		background-color: #ea70b8;
		border-color: #ea70b8;
		color: white;
	}

	.history-alert-findby-name>button:hover {
		opacity: .8;
		background-color: #ea70b8;
		border-color: #ea70b8;
	}

	.history-alert-findby-name>div {
		width: 200px;
	}

	.history-alert-show-content-info {
		display: flex;
		align-items: center;
		border-top: 1px #EBF0F4 solid;
		padding-top: 0.14rem;
		padding-bottom: 0.16rem;
	}

	.history-alert-show-content-info-img {
		width: 0.42rem;
		height: 0.42rem;
		margin-right: 0.14rem;
	}

	.history-alert-show-content-info-img>img {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.history-alert-show-content-info-name {
		flex: 1;
	}

	.history-alert-show-content-info-time {
		flex: 2;
	}

	.history-alert-show-content-info-status {
		flex: 1;
	}

	.history-alert-findby-name {
		margin-top: 0.2rem;
	}

	.history-alert-show-content {
		margin-top: 0.2rem;
	}

	.distance-learning {
		padding-top: .4rem;
	}

	.distance-learning-content {
		border: 1px solid #E1E8EE;
		padding-top: .2rem;
		padding-left: .2rem;
		padding-right: .2rem;

	}

	.distance-learning-content-info {
		border-bottom: 1px solid #E4E8EE;
		display: flex;
		padding-bottom: .2rem;
	}

	.distance-learning-content-info-left {
		width: 0.53rem;
		height: 0.53rem;
	}

	.distance-learning-content-info-left>img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.distance-learning-content-info-right {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 0.2rem;
	}

	.doc-name {
		font-size: 15px;
		color: var(--color18);
	}

	.class-num {
		font-family: var(--fontFamily3);
		font-size: 13px;
		color: var(--color19);
		line-height: var(--fontSize6);
	}

	.distance-learning-content-status {
		display: flex;
		padding-top: .18rem;
		padding-bottom: .18rem;
	}

	.distance-learning-content-status-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* align-items: center; */
	}

	.distance-learning-content-status-item-name {
		font-size: 13px;
		color: var(--color19);
		line-height: var(--fontSize6);
	}

	.distance-learning-content-status-item-value {
		font-family: OpenSans-Semibold;
		font-size: 13px;
		color: var(--color18);
		line-height: var(--fontSize6);
	}

	.doctor-table-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 0.68rem;
	}

	.doctor-table-top-name {
		font-family: var(--fontFamily3);
		font-size: var(--fontSize6);
		color: var(--color7);
		letter-spacing: 0;
		line-height: 0.28rem;
	}

	.doctor-table-body-item {
		display: flex;
		align-items: center;
		padding-left: 16px;
		align-items: center;
		border-top: 1px solid #EBF0F4;
		padding-top: 14px;
		padding-bottom: 16px;
	}

	.doctor-table-body-item-img {
		width: 0.42rem;
		height: 0.42rem;
		margin-right: .25rem;
		border-radius: 50%;
	}

	.doctor-table-body-item-img>img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.doctor-table-body-item-name {
		display: flex;
		align-items: center;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #626262;
		letter-spacing: 0;
		width: 2.15rem;
	}

	.doctor-table-body-item-org {
		width: 2.25rem;
		display: flex;
		align-items: center;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #626262;
		letter-spacing: 0;
	}

	.doctor-table-body-item-num {
		width: 2rem;
		display: flex;
		align-items: center;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #626262;
		letter-spacing: 0;
		overflow: hidden;
	}

	.doctor-table-body-item-time {
		width: 2.25rem;
		display: flex;
		align-items: center;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #626262;
		letter-spacing: 0;
	}

	.doctor-table-body-item-status {
		width: 1.3rem;
		display: flex;
		align-items: center;
		font-family: PingFangSC-Regular;
		/* font-family: PingFangSC-Regular; */
		font-size: 14px;
		/* color: #FFAB2B; */
		text-align: center;
	}

	.doctor-table-body-item-btns {
		flex: 1;
	}

	.status0 {
		color: #FFAB2B;
	}

	.status1 {
		color: #FE4D97;
	}

	.status2 {
		color: #6DD230;
	}

	.status3 {
		color: #778CA2;
	}
</style>
<!--
    医生界面
-->