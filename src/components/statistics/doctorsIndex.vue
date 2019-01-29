<template>
	<div class="doctors-index">
		<div class="top-info">
			<!-- <div class="info-box-out" v-for="(item,index) in topInfo" :key="index">
				<infoBox :inData="item" @reback="getReData">
					<infoEnter :inData="testInfo" @reback="getInfoClick"></infoEnter>
					<infoEnter :inData="testInfo" @reback="getInfoClick"></infoEnter>
					<infoList :inData="infoListData"></infoList>	
				</infoBox>
			</div> -->

			<div class="info-box-out">
				<infoBox :inData="topInfo[0]" @reback="getReData">
					<infoEnter :inData="testInfo" @reback="getInfoClick"></infoEnter>
					<infoEnter :inData="testInfo" @reback="getInfoClick"></infoEnter>
				</infoBox>
			</div>
			<div class="info-box-out">
				<infoBox :inData="topInfo[1]" @reback="getReData">
					<infoList :inData="infoListData"></infoList>	
				</infoBox>
			</div>
			<div class="info-box-out">
				<infoBox :inData="topInfo[2]" @reback="getReData">
					<infoList :inData="infoListData"></infoList>	
				</infoBox>
			</div>
		</div>
		
		<!-- 今日计划 -->
		<div class="doctor-table">
			<div class="table-border">
				<infoListHead :inData="todayPlan" @reBack="getPlanHistory"></infoListHead>
				<userInfoRow v-for="(item,index) in todayPlan.data" :key="index" :inData="item" @reback="getClick">
					<div class="slot-time-introduction">
						<span class="user-info-table-time">拟定时间:{{item.planStartTime || '丢失数据'}}</span>
						<span class="user-info-table-introduction">{{item.content || '丢失数据'}}</span>
					</div>
				</userInfoRow>
				<!-- <userInfoRow :inData="testBody" @reback="getClick">
					<div class="slot-time-introduction">
						<span class="user-info-table-time">拟定时间:2018-05.25</span>
						<span class="user-info-table-introduction">拟定内容的内容有点多 自动换行并全部显示 打电话通知体检  检查尿酸值</span>
					</div>
				</userInfoRow> -->
			</div>
		</div>	
		<!-- 告警 -->
		<div class="doctor-table">
			<div class="table-border">
				<infoListHead :inData="todayAlert" @reBack="getAlertHistory"></infoListHead>
				<userInfoRow v-for="(item,index) in todayAlert.data" :key="index" :inData="item" @reback="getClick">
					<div class="slot-item-info">
						<span class="user-info-item-name">{{item.type || '丢失数据'}}</span>
						<span class="user-info-item-info">{{item.value || '丢失数据'}}</span>
						<!-- <span class="user-info-item-info">舒张压>90mmHg</span> -->
					</div>
				</userInfoRow>
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
		<div class="doctor-table">
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
	import { todayPlan, todayAlert, planHistory , todayFollowup , alertHistory , historyFollowup} from '../../api/apiAll.js'
	
	
	export default {
		computed:{
			...mapState({
                userInfo:state => state.user.userInfo,
                // userSelfInfo:state => state.user.userSelfInfo
			})
		},
		data () {
			return {
				/**
				 * 今日计划
				 */
				todayPlan:{
					name:"今日计划",
					data:[
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
				todayAlert:{
					name:"今日警告",
					data:[
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
				planHistory:{
					name:'历史计划',
					data:{
						// "pageNum": 1,
						// "pageSize": 10,
						// "size": 7,
						// "startRow": 1,
						// "endRow": 7,
						// "total": 7,
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
						// "firstPage": 1,
						// "lastPage": 1,
						// list:[
						// 	{
						// 		"infoId": "a7f6ef67eb6945e8b9ed0db208b18276",
						// 		"userId": "10000", 
						// 		"headId": null,
						// 		"userName": "超级管理员",
						// 		"phone": null,
						// 		"planStatus": "已超时",
						// 		"content": "一段亲切的问候哦",
						// 		"planStartTime": "2018-12-29 18:00:00",
						// 		"planCreateTime": "2018-12-29"
						// 	},
						// ]
					}
				},

				/**
				 * 今日（近期）随访
				 */
				todayFollowup:{
					name:'近期随访',
					data:[
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
				historyFollowup:{
					name:'历史随访',
					data:{
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
				alertHistory:{
					name:'历史警告',
					data:{
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
				/************* */
				testTitle:{
					name:"今日计划"
				},
				testBody:{
					img:'',
					name:'Amanda Reyes',
					phone:'(499)-430-5810',
					id:''
				},
				topInfo:[
					{
						title:'dag',
						selectList:[
							{name:'select1'},
							{name:'select1'},
							{name:'select1'}
						]
					},
					{
						title:'dag',
						selectList:[
							{name:'select1'},
							{name:'select1'},
							{name:'select1'}
						]
					},
					{
						title:'dag',
						selectList:[
							{name:'select1'},
							{name:'select1'},
							{name:'select1'}
						]
					}
				],
				testInfo:{
					name:'急救中心',
					unprocessed:12,
					processed:28
				},
				infoListData:[
					 {
                        img:'../../assets/logo.png',
                        name:'Ronald Bennett Ronald Bennett',
                        introduction:'西南医院第一附属医院 神经内科',
                        time:'2018-12-25 10:00 ',
                        status:{
                            num:0,
                            text:'等待审核'
                        },
                        id:''
                    },
                    {
                        img:'../asset/logo.png',
                        name:'Ronald Bennett',
                        introduction:'西南医院第一附属医院 神经内科',
                        time:'2018-12-25 10:00',
                        status:{
                            num:0,
                            text:'等待审核'
                        },
                        id:''
                    },
                    {
                        img:'../asset/logo.png',
                        name:'Ronald Bennett',
                        introduction:'西南医院第一附属医院 神经内科',
                        time:'2018-12-25 10:00',
                        status:{
                            num:0,
                            text:'等待审核'
                        },
                        id:''
                    },
                    {
                        img:'../asset/logo.png',
                        name:'Ronald Bennett',
                        introduction:'西南医院第一附属医院 神经内科',
                        time:'2018-12-25 10:00',
                        status:{
                            num:0,
                            text:'等待审核'
                        },
                        id:''
                    }
				],
				
				
			}
		},
		methods:{
			/**
			 * 获取今日计划
			 */
			async getTodayPlan(){
				const res = await todayPlan({token:this.userInfo.token});
				console.log(res);
				if(res.data&&res.data.errCode===0){
					this.todayPlan.data = res.data.body.map(item=>{
						item.name = item.userName;
						item.id = item.userId;
						return item;
					});
				}else{
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
			async getPlanHistory(){
				const res = await planHistory({token:this.userInfo.token});
				console.log(res);
				if(res.data&&res.data.errCode===0){
					alert('success')
					this.planHistory.data = res.data.body//格式或许会有改动
				}else{
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
			async getTodayAlert(){
				const res = await todayAlert({token:this.userInfo.token});
				console.log(res)
				if(res.data&&res.data.errCode===0){
					this.todayAlert.data = res.data.body.map(item=>{
						item.name = item.userName;
						item.id = item.userId;
						return item;
					});
				}else{
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
			async getAlertHistory(){
				const res = await alertHistory({token:this.userInfo.token});
				console.log(res)
				if(res.data&&res.data.errCode===0){
					alert('success')
					console.log(this.alertHistory)
					this.alertHistory.data = res.data.body 
				}else{
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
			async getTodayFollowup(){
				const res = await todayFollowup({token:this.userInfo.token});
				console.log(res)
				if(res.data&&res.data.errCode===0){
					this.todayFollowup.data = res.data.body.map(item=>{
						item.name = item.userName;
						item.id = item.userId;
						return item;
					});
				}else{
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
			async getHistoryFollowup(){
				const res = await historyFollowup({token:this.userInfo.token});
				console.log(res)
				if(res.data&&res.data.errCode===0){
					alert('success')
					this.historyFollowup.data = res.data.body
				}else{
					this.$notify({
						title: '失败',
						message: '历史随访获取失败',
						type: 'error'
					});
				}
			},
			/********* */
			getReData(data){
				console.log(data)
			},
			getInfoClick(item){
				console.log(item)
			},
			letMeTest(data){
				console.log(data)
			},
			getClick(data){
				console.log(data)
			}
		},
		components:{
			infoBox,
			infoEnter,
			infoList,
			plantTable,
			infoListHead,
			userInfoRow
		},
		async created(){
			this.getTodayPlan();
			this.getTodayAlert();
			this.getTodayFollowup();
		}
	}
</script>

<style >
	.doctors-index{

	}
	.doctor-table{
		padding-right: 0.61rem;
		/* width: 100%; */
		/* min-width: 13.66rem */
	}
	.doctors-index .top-info{
		display: flex;
		/* display: none; */
		/* justify-content: space-between; */

	}
	.doctors-index .info-box-out{
		margin-right: 0.13rem;
	}
	.doctors-index .table-border{
		background: #FFFFFF;
		border: 1px solid #EBF0F4;
		border-radius: 3px;
		margin-top: 2.9%;
		padding-left: 0.14rem;
		padding-right: 0.3rem;
	}
	
	.doctors-index .table-head{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 0.68rem;
		box-sizing: border-box;
		border-bottom: 1px solid #EBF0F4;
	}
	.doctors-index .doctor-table .table-title{
		font-family: var(--fontFamily3);
		font-size: var(--fontSize6);
		color: var(--color7);
		letter-spacing: 0;
		line-height: 0.28rem;
	}
	.doctors-index .doctor-table .table-head button{
		border-color: var(--borderColor4);
		/* border-color:red; */
	}
	.doctors-index .doctor-table .table-head button span{
		color: var(--color15);
		/* color: red; */
	}
	.doctors-index .doctor-table .table-list-item{
		align-items: center;
		display: flex;
	}
	.doctors-index .doctor-table .table-list-item .user-head-img-div{
		width: 0.42rem;
		height: 0.42rem;
		margin-right: 1.3%;
	}
	.doctors-index .doctor-table .table-list-item .user-head-img-div .user-head-img{
		width: 0.42rem;
		height: 0.42rem;
		display: block;
		border-radius: 50%;
	}
	.doctors-index .doctor-table .table-list-item .user-name{
		font-family: var(--fontFamily2);
		color: var(--color16);
		letter-spacing: 0;
		margin-right: 4.7%;
		width: 0.98rem;
	}
	.doctors-index .doctor-table .table-list-item .user-phone{
		font-family: var(--fontFamily2);
		color: var(--color16);
		letter-spacing: 0;
		margin-right: 4.2%;
		width: 1.25rem;
	}
	.doctors-index .doctor-table .table-list-item .table-time{
		font-family: var(--fontFamily2);
		color: var(--color16);
		letter-spacing: 0;
		font-family: var(--fontFamily3);
		margin-right: 5.5%;
		width: 1.37rem;
	}
	.doctors-index .doctor-table .table-list-item .table-introduction{
		font-family: var(--fontFamily3);
		color: var(--color16);
		letter-spacing: 0;
		width: 3.12rem;
	}
	.doctors-index .doctor-table .table-list-item .table-btn-div{
		margin-right: 4.9%;
		width:3.5rem;
	}
	.doctors-index .doctor-table .table-list-item .table-btn-div button{
		width: 0.57rem;
		height: 0.2rem;
	}
	.doctors-index .doctor-table .table-list-item .table-btn-div span{
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
	.doctors-index .doctor-table .table-list-item .item-status button{
		width: 0.57rem;
		height: 0.2rem;
	}
	.doctors-index .doctor-table .table-list-item .item-status button span{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
	.doctors-index-table-itemmerge{
		margin-right: 2.5%;
		width: 5.45rem;
		display: flex;
		justify-content: space-between;
	}
	.follow-up-task{
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex: 1;
	}
	.follow-up-classification{
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-left: 0.2rem;
		width: 0.65rem;
	}
	.follow-up-task button{
		width: 0.57rem;
		height: 0.2rem;
	}
	.follow-up-task button span{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
	.slot-time-introduction{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.user-info-item-name{
		padding-right: 0.2rem;
	}
	.user-info-item-info{
		color: var(--color17);
		padding-right: 0.21rem;
	}
	.solt-follow-up{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.solt-follow-up-time{
		display: flex;
		flex-direction: column;
	}
	.solt-follow-up-status{
		display: flex;
		flex-direction: column;
	}
	.solt-follow-up-view>.el-button{
		width: 0.68rem;
		height: 0.32rem;
		padding: 0;
	}
	.solt-follow-up-view>.el-button>span{
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color15);
		width: 100%;
		height: 100%;
	}
	.undone{
		color: var(--color17)
	}
</style>
<!--
    医生界面
-->