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
				<!-- <plantTable></plantTable> -->
				<div class="table-head">
					<span class="table-title">今日计划</span>
					<el-button>查看历史计划</el-button>
				</div>
				<div class="table-list">
					<ul class="table-list-ul">
						<li class="table-list-item" v-for="(item,index) in platTableList" :key="index">
							<div class="user-head-img-div">
								<img class="user-head-img" src="../assets/logo.png" alt="" srcset="">
							</div>
							<span class="user-name">{{item.name}}</span>
							<span class="user-phone"><i class="iconfont">&#xe61f;</i>{{item.phone}}</span>
							<div class="doctors-index-table-itemmerge">
								<span class="table-time">{{item.time}}</span>
								<span class="table-introduction">{{item.introduction}}</span>
							</div>
							<div class="table-btn-div">
								<el-button type="primary" plain>发消息</el-button>
								<el-button type="primary" plain>看备注</el-button>
								<el-button type="primary" plain>看档案</el-button>
								<el-button type="primary" plain>录入档案</el-button>
							</div>
							<span class="item-status">
								<el-button type="danger" plain>处理完成</el-button>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="doctor-table">
			<div class="table-border">
				<!-- <plantTable></plantTable> -->
				<div class="table-head">
					<span class="table-title">今日计划</span>
					<el-button>查看历史计划</el-button>
				</div>
				<div class="table-list">
					<ul class="table-list-ul">
						<li class="table-list-item" v-for="(item,index) in warmTableList" :key="index">
							<div class="user-head-img-div">
								<img class="user-head-img" src="../assets/logo.png" alt="" srcset="">
							</div>
							<span class="user-name">{{item.name}}</span>
							<span class="user-phone"><i class="iconfont">&#xe61f;</i>{{item.phone}}</span>
							<div class="doctors-index-table-itemmerge">
								<!-- <span class="table-time">{{item.time}}</span> -->
								<span class="table-introduction">{{item.introduction}}</span>
							</div>
							<div class="table-btn-div">
								<el-button type="primary" plain>发消息</el-button>
								<el-button type="primary" plain>看备注</el-button>
								<el-button type="primary" plain>看档案</el-button>
								<el-button type="primary" plain>录入档案</el-button>
							</div>
							<span class="item-status">
								<el-button type="danger" plain>处理完成</el-button>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="doctor-table">
			<div class="table-border">
				<!-- <plantTable></plantTable> -->
				<div class="table-head">
					<span class="table-title">今日计划</span>
					<el-button>查看历史计划</el-button>
				</div>
				<div class="table-list">
					<ul class="table-list-ul">
						<li class="table-list-item" v-for="(item,index) in warmTableList" :key="index">
							<div class="user-head-img-div">
								<img class="user-head-img" src="../assets/logo.png" alt="" srcset="">
							</div>
							<span class="user-name">{{item.name}}</span>
							<span class="user-phone"><i class="iconfont">&#xe61f;</i>{{item.phone}}</span>
							<div class="doctors-index-table-itemmerge">
								<!-- <span class="table-time">{{item.time}}</span> -->
								<span class="table-introduction">{{item.introduction}}</span>
								<div class="follow-up-task">
									<div class="follow-up-classification">
										<span class="follow-up-completed">已完成随访:</span>
										<span class="follow-up-uncompleted">未完成随访:</span>
									</div>
									<el-button type="primary" plain>发消息</el-button>
								</div>
							</div>
							<div class="table-btn-div">
								<el-button type="primary" plain>发消息</el-button>
								<el-button type="primary" plain>看备注</el-button>
								<el-button type="primary" plain>看档案</el-button>
								<el-button type="primary" plain>录入档案</el-button>
							</div>
							<span class="item-status">
								<el-button type="danger" plain>处理完成</el-button>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		
		
	</div>
</template>

<script>
	import infoBox from '../public/publicComponents/infoBox.vue'
	import infoEnter from '../public/publicComponents/infoEnter.vue'
	import infoList from '../public/publicComponents/infoList.vue'
	import plantTable from '../public/publicComponents/plantTable.vue'


	
	
	export default {
		data () {
			return {
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
				platTableList:[
					{
						headImg:'',
						name:'Amanda Reyes',
						phone:'(499)-430-5810',
						time:'2018-05.25',
						introduction:'拟定内容的内容有点多 自动换行并全部显示 打电话通知体检  检查尿酸值',
						status:{
							num:0,
							text:'处理完成'
						}
					},
					{
						headImg:'',
						name:'Amanda Reyes',
						phone:'(499)-430-5810',
						time:'2018-05.25',
						introduction:'拟定内容的内容有点多 自动换行并全部显示 打电话通知体检  检查尿酸值',
						status:{
							num:0,
							text:'处理完成'
						}
					}
				],
				warmTableList:[
					{
						headImg:'',
						name:'Amanda Reyes',
						phone:'(499)-430-5810',
						// time:'2018-05.25',
						introduction:'拟定内容的内容有点多 自动换行并全部显示 打电话通知体检  检查尿酸值',
						status:{
							num:0,
							text:'处理完成'
						}
					},
					{
						headImg:'',
						name:'Amanda Reyes',
						phone:'(499)-430-5810',
						// time:'2018-05.25',
						introduction:'拟定内容的内容有点多 自动换行并全部显示 打电话通知体检  检查尿酸值',
						status:{
							num:0,
							text:'处理完成'
						}
					}
				]
			}
		},
		methods:{
			getReData(data){
				console.log(data)
			},
			getInfoClick(item){
				console.log(item)
			}
		},
		components:{
			infoBox,
			infoEnter,
			infoList,
			plantTable
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
		width: 100%;
		min-width: 13.66rem
	}
	.doctors-index .top-info{
		display: flex;
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
</style>