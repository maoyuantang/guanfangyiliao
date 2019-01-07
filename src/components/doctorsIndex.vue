<template>
	<div class="doctors-index">
		<div class="top-info">
			<div class="info-box-out" v-for="(item,index) in topInfo" :key="index">
				<infoBox :inData="item" @reback="getReData">
					<infoEnter :inData="testInfo" @reback="getInfoClick"></infoEnter>
					<infoEnter :inData="testInfo" @reback="getInfoClick"></infoEnter>
					<!-- <infoList :inData="infoListData"></infoList> -->
				</infoBox>
			</div>
		</div>
		
		<div class="doctor-table">
			<div class="table-border">
				<infoListHead :inData="testTitle" @reBack="letMeTest"></infoListHead>
				<userInfoRow :inData="testBody" @reback="getClick">
					<div class="slot-time-introduction">
						<span class="user-info-table-time">拟定时间:2018-05.25</span>
						<span class="user-info-table-introduction">拟定内容的内容有点多 自动换行并全部显示 打电话通知体检  检查尿酸值</span>
					</div>
				</userInfoRow>
				<userInfoRow :inData="testBody" @reback="getClick">
					<div class="slot-time-introduction">
						<span class="user-info-table-time">拟定时间:2018-05.25</span>
						<span class="user-info-table-introduction">拟定内容的内容有点多 自动换行并全部显示 打电话通知体检  检查尿酸值</span>
					</div>
				</userInfoRow>
			</div>
		</div>	
		<div class="doctor-table">
			<div class="table-border">
				<infoListHead :inData="testTitle" @reBack="letMeTest"></infoListHead>
				<userInfoRow :inData="testBody" @reback="getClick">
					<div class="slot-item-info">
						<span class="user-info-item-name">血压项</span>
						<span class="user-info-item-info">收缩压>180mmHg</span>
						<span class="user-info-item-info">舒张压>90mmHg</span>
					</div>
				</userInfoRow>
				<userInfoRow :inData="testBody" @reback="getClick">
					<div class="slot-item-info">
						<span class="user-info-item-name">血压项</span>
						<span class="user-info-item-info">收缩压>180mmHg</span>
						<span class="user-info-item-info">舒张压>90mmHg</span>
					</div>
				</userInfoRow>
			</div>
		</div>	

		<div class="doctor-table">
			<div class="table-border">
				<infoListHead :inData="testTitle" @reBack="letMeTest"></infoListHead>
				<userInfoRow :inData="testBody" @reback="getClick">
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
				</userInfoRow>
				<userInfoRow :inData="testBody" @reback="getClick">
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
				</userInfoRow>
			</div>
		</div>	
		
	</div>
</template>

<script>
	import infoBox from '../public/publicComponents/infoBox.vue'
	import infoEnter from '../public/publicComponents/infoEnter.vue'
	import infoList from '../public/publicComponents/infoList.vue'
	import plantTable from '../public/publicComponents/plantTable.vue'
	import infoListHead from '../public/publicComponents/infoListHead.vue'
	import userInfoRow from '../public/publicComponents/userInfoRow.vue'

	
	
	export default {
		data () {
			return {
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
		display: none;
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