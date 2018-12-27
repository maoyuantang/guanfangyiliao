<template>
	<div class="statistics">
		
		<!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

		<el-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="30%"
			center>
			<span>需要注意的是内容是默认不居中的</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog> -->


		<div class="mark" v-if="isAdd===1||isAdd===2">
			<div class="mark-inner">
				<div class="mark-content">
					<div class="mark-add" v-if="isAdd===1">
						<p class="mark-add-title">新增<p>
						<div class="add-module">
							<div class="input-layer">
								<div class="leyer-item">
									<span class="leyer-item-name">姓名:</span>
									<el-input  placeholder="" size="mini"></el-input>
									<Icon type="md-star" />
								</div>
								<div class="leyer-item">
									<span class="leyer-item-name">电话:</span>
									<el-input  placeholder="关联后可使用手机号" size="mini"></el-input>
								</div>
							</div>
							<div class="input-layer">
								<div class="leyer-item">
									<span class="leyer-item-name">账号:</span>
									<el-input  placeholder="" size="mini"></el-input>
									<Icon type="md-star" />
								</div>
								<div class="leyer-item">
									<span class="leyer-item-name">密码:</span>
									<el-input  placeholder="" size="mini"></el-input>
									<Icon type="md-star" />
								</div>
							</div>
							<div class="select-layer">
								<span class="leyer-item-name">科室:</span>
								 <!-- <Select v-model="value" style="width:400px" size="small">
									<Option v-for="item in departmentlist" :value="item.name" :key="item.name">{{ item.name }}</Option>
								</Select> -->
								<el-select v-model="value" placeholder="本账号范围内可多选" size="mini"  style="width:80%">
									<el-option
										v-for="item in departmentlist"
										:key="item.name"
										:label="item.name"
										:value="item.name">
									</el-option>
								</el-select>
								<Icon type="md-star" />
							</div>
							<div class="check-div">
								<p class="check-div-title">医生业务范围:<p>
								<div class="check-div-content">
									<div class="check-div-item" v-for="(item,index) in DoctorBusinessScope" :key="index" :class="item.border?'has-border':''">
										<span>{{item.title}}</span>
											<el-checkbox :label="item2.name" v-for="(item2,index2) in item.list" :key="index2" v-model="item2.select"></el-checkbox>
									</div>
								</div>	
							</div>
							<div class="check-div">
								<p class="check-div-title">医生业务范围:<p>
								<div class="check-div-content">
									<div class="check-div-item" v-for="(item,index) in DepartmentManagementAuthority" :key="index" :class="item.border?'has-border':''">
										<span>{{item.title}}</span>
											<el-checkbox :label="item2.name" v-for="(item2,index2) in item.list" :key="index2" v-model="item2.select"></el-checkbox>
									</div>
								</div>	
							</div>
						</div>	
						<div class="sub-add"><el-button type="primary" size="mini">确定</el-button></div>	
					</div>
					<div class="mark-invite" v-else-if="isAdd===2">
						<p class="mark-add-title">邀请协作</p>
						<div class="mark-invite-input">
							<div class="invite-iput-layer">
								<span class="invite-input-name">账号/手机号:</span>
								<el-input placeholder="请输入对方账号和手机号" v-model="inviteNumber"></el-input>
								<Icon type="md-star" />
							</div>
							<div class="invite-iput-layer">
								<span class="invite-input-name">协作范围:</span>
								<el-select v-model="CollaborationScopeOk" placeholder="请选择科室">
									<el-option
										v-for="item in CollaborationScope"
										:key="item.name"
										:label="item.name"
										:value="item.name">
									</el-option>
								</el-select>
								<Icon type="md-star" />
							</div>
						</div>
						<div class="mark-invite-check">
							<p class="mark-invite-check-title">业务范围</p>
							<div class="mark-invite-check-item">
								<el-checkbox :label="item.name" v-for="(item,index) in businessScope" :key="index" v-model="item.select"></el-checkbox>
							</div>
							
						</div>
						<div class="mark-invite-sub"><el-button type="primary" size="mini" @click="inviteSub">确定</el-button></div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<normalTab v-model="some" @reBack="reData"></normalTab>
		</div>
		<div class="index-body">
			<!-- <statisticsTable></statisticsTable> -->
			<AccountAuthority></AccountAuthority>
		</div>
		
		<!-- <div class="set-flex">
			<normalColumnChart v-model="drawData" v-for="i in 6"></normalColumnChart>
		</div> -->
		<!-- <div>
			<el-dropdown >
				<el-button type="primary">
					更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="testSomeThing">黄金糕</el-dropdown-item>
					<el-dropdown-item>狮子头</el-dropdown-item>
					<el-dropdown-item>螺蛳粉</el-dropdown-item>
					<el-dropdown-item>双皮奶</el-dropdown-item>
					<el-dropdown-item>蚵仔煎</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div> -->
		<!-- <div>
			<div class="block">
				<span class="demonstration">默认</span>
				{{value6}}
				<el-date-picker
				v-model="value6"
				type="daterange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期">
				</el-date-picker>
			</div>
		</div>  -->
		<!-- <selftag @reBack="gitIndex" v-model="test"></selftag> -->
		<!-- <selftag @reBack="gitIndex" v-model="test"></selftag> -->
		<!-- <el-button type="primary" @click="changeComFun">主要按钮</el-button>
		<div>
			<div :is="changeCom?'test':'testb'"></div>
		</div> -->
		<!-- <div>
			<statisticsWay @reBack='getTime'></statisticsWay>
		</div> -->
	</div>
</template>

<script>
import normalTab from '../public/publicComponents/normalTab.vue'
import normalColumnChart from '../public/publicComponents/normalColumnChart.vue'
import selftag from '../public/publicComponents/selftag.vue'
import statisticsWay from '../public/publicComponents/statisticsWay.vue'
import sensitiveWordCheck from '../public/publicJs/sensitiveWordCheck.js'//检查字符串是否包含敏感字
import statisticsTable from './statisticsTable.vue'
import AccountAuthority from './AccountAuthority.vue'


import test from './test.vue'//测试动态渲染组件
import testb from './testb.vue'
	export default {
		watch:{
			value6(n,o){
				console.log(n)
			}
		},
		data () {
			return {
				isAdd:0,//新增还是邀请协作，选择项number 0 1 2 ； 0表示隐藏弹窗，1表示为新增弹窗，2表示邀请弹窗
				departmentlist:[//科室列表
					{name:'第一科'},
					{name:'第2科'},
					{name:'第3科'},
					{name:'第4科'},
					{name:'第5科'},
					{name:'第6科'},
					{name:'第7科'},
					{name:'第8科'},
				],
				value:null,
				DoctorBusinessScope:[//医生业务范围选项
					{
						title:'远程门诊',
						border:true,
						list:[
							{
								select:true,
								name:'处方配送'
							},
							{
								select:true,
								name:'处方审核'
							},
							{
								select:true,
								name:'在线诊室'
							}
						]
					},
					{
						title:' ',
						border:false,
						list:[
							{
								select:true,
								name:'远程会诊'
							},
							{
								select:true,
								name:'远程协作'
							},
							{
								select:true,
								name:'移动查房'
							}
						]
					},
					{
						title:'双向转诊',
						border:true,
						list:[
							{
								select:true,
								name:'转诊申请'
							},
							{
								select:true,
								name:'转诊接诊'
							},
							{
								select:true,
								name:'转诊审核'
							}
						]
					},
					{
						title:'',
						border:false,
						list:[
							{
								select:true,
								name:'智能随访'
							},
							{
								select:true,
								name:'健康档案'
							},
							{
								select:true,
								name:'家医服务'
							}
						]
					}
				],
				DepartmentManagementAuthority:[//科室管理权限范围
					{
						title:'',
						border:false,
						list:[
							{
								select:true,
								name:'远程门诊'
							},
							{
								select:true,
								name:'健康档案'
							},
							{
								select:true,
								name:'移动查房'
							}
						]
					},
					{
						title:' ',
						border:false,
						list:[
							{
								select:true,
								name:'远程会诊'
							},
							{
								select:true,
								name:'远程教育'
							},
							{
								select:true,
								name:'终端管理'
							}
						]
					},
					{
						title:'',
						border:false,
						list:[
							{
								select:true,
								name:'远程协作'
							},
							{
								select:true,
								name:'分级诊疗'
							},
							{
								select:true,
								name:'家医服务'
							}
						]
					},
					{
						title:'',
						border:false,
						list:[
							{
								select:true,
								name:'智能随访'
							},
							{
								select:true,
								name:'双向转诊'
							},
							
						]
					}
				],
				CollaborationScope:[//协作范围科室选择列表
					{name:'全部'},
					{name:'糖尿病康复科'},
					{name:'新生儿保健科'},
					{name:'XXXXXXXX'}
				],
				CollaborationScopeOk:null,//用户选择的协作范围
				businessScope:[//业务范围选择项
					{
						name:'远程门诊',
						select:false
					},
					{
						name:'远程会诊',
						select:false
					},
					{
						name:'远程协作',
						select:true
					},
					{
						name:'家医服务',
						select:false
					}
				],
				inviteNumber:'',//邀请账号
				indexBodyData:{

				},
				/**************************************** */
				changeCom:false,
				some:{
					i:1,
					list:[
						{
							en:'STATISTICS',
							zh:'统计'
						},
						{
							en:'Account number & authority',
							zh:'账号及权限'
						},
						{
							en:'Dr. WEB',
							zh:'医生端'
						},
					]
				},
				drawData:{
					dataAxis:['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'],
					data:[220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234],
					title:'测试测试,修改修改',
					total:308
				},
				value6:'miaoa',
				test:{
                    more:true,
                    title:'测试456465',
                    list:[
                        {
                            text:'all'
                        },
                        {
                            text:'1st'
                        },
                        {
                            text:'2st'
                        },
                        {
                            text:'3st'
                        },
                        {
                            text:'4st'
                        },
                    ]
				},
				
			}
		},
		methods:{
			reData(data){
				console.log(data);
				console.log(this.some)
				// this.some.i = data.index
			},
			gitIndex(index){
				console.log(index)
			},
			testSomeThing(){
				console.log('simida')
			},
			changeComFun(){
				this.changeCom = !this.changeCom  
			},
			getTime(msg){
				console.log(msg)
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
			},
			inviteSub(){
				const testResult = sensitiveWordCheck(this.inviteNumber);
				console.log(testResult)
			}
		},
		components:{
			normalTab,
			normalColumnChart,
			selftag,
			statisticsWay,
			statisticsTable,
			AccountAuthority,
			test,
			testb
		},
		async created(){
			
		}
	}
</script>

<style scoped>
	.statistics{
		min-height: 100%;
		padding-right: 0.36rem;
	}
	
	.mark-content{
		width: 6.02rem;
		/* height: 602px; */
		background: var(--whiteColor);
		border: 1px solid var(--color8);
		border-radius: 0.048rem;
		padding-left: 0.52rem;
		padding-right: 0.52rem;
	}
	.mark-add-title{
		font-family: var(--fontFamily3);
		font-size: var(--fontSize7);
		color: var(--color7);
		line-height: 0.33rem;
		text-align: center;
		margin-bottom: 0.24rem;
		margin-top: 1.1%;
	}
	.input-layer{
		margin-bottom: 0.18rem;
		display: flex;
	}
	.select-layer{
		display: flex;
		align-items: center;
	}
	
	.leyer-item{
		
		flex: 1;
		display: flex;
		/* justify-content: space-around; */
		align-items: center;
	}
	.leyer-item-name{
		/* width: 20%; */
	}
	.leyer-item .el-input {
		width: 60%;
	}
	.check-div{
		margin-top: 0.25rem;
	}
	.check-div-content{
		display: flex;
	}
	.check-div-item{
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: center;
	}
	.has-border{
		border: 2px dashed  #D8DFE5;
		border-radius: 5px;
	}
	.check-div-item .el-checkbox{
		margin-left: 0;
	}
	.check-div-item>span{
		/* font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #323C47;
		letter-spacing: 0;
		line-height: 27px; */
		height: 0.27rem;
	}
	.sub-add{
		margin-top: 0.35rem;
		margin-bottom: 0.17rem;
	}
	.sub-add>.el-button{
		width: 100%;
		height: 0.4rem;
		font-size: var(--fontSize1);
		
	}
	.leyer-item>.ivu-icon-md-star{
		color: red;
		margin-left: 0.12rem;
	}
	.select-layer>.ivu-icon-md-star{
		color: red;
		margin-left: 0.12rem;
	}
	.invite-iput-layer{
		display: flex;
		align-items: center;
		margin-bottom: 0.18rem;
	}
	.invite-input-name{
		flex: 1;
	}
	.invite-iput-layer .el-input{
		flex: 5;
	}
	.invite-iput-layer>.ivu-icon-md-star{
		color: red;
		margin-left: 0.12rem;
	}
	.invite-iput-layer .el-select{
		flex: 5;
	}
	.mark-invite-check{
		border: 1px solid var(--borderColor1);
		border-radius: 0.04rem;
		margin-right: 0.24rem;
		padding-top: 0.13rem;
		padding-left: 0.1rem;
		padding-bottom: 0.2rem;
		margin-bottom: 0.57rem;
	}
	.mark-invite-check-title{
		color: var(--color9);
	}
	.mark-invite-sub{
		padding-bottom: 0.32rem;
	}
	.mark-invite-sub>.el-button{
		width: 100%;
		height: 0.4rem;
	}
	/***************************************************************/
	.set-flex{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.set-flex>div{
		max-width: 30%;
		min-width: 30%;
		flex: 1;
	}
</style>