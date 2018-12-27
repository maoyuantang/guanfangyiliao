<template>
	<div class="Account-authority">
        <div class="select-div">
            <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
                <el-radio-button label="left" :class="tabPosition==='left'?'left-btn-select':''">本院人员</el-radio-button>      
                <el-radio-button label="right" :class="tabPosition==='right'?'right-btn-select':''">院外协作人员</el-radio-button>
            </el-radio-group>
        </div>
        <el-tabs>
           <div class="left-model" v-show="tabPosition==='left'">
               <div class="left-model-head">
                    <div class="left-model-head-flag">
                        <selftag @reBack="gitIndex" v-model="leftListDepartment"></selftag>
                    </div>
                    <div class="left-model-head-operating">
                        <el-input
                            placeholder="Search by keywords…"
                            suffix-icon="el-icon-search">
                        </el-input>
                        <el-button type="primary" @click="alertStatus(1)">新增</el-button>
                    </div>
               </div>
               <div class="left-model-body">
                    这个位置放张表，明天弄
               </div>
           </div>
           <div class="right-model" v-show="tabPosition==='right'">
               <div class="right-model-head">
                    <div class="right-model-head-flag">
                       <div>
                            <selftag @reBack="gitIndex" v-model="rightListHospital"></selftag>
                            <selftag @reBack="gitIndex" v-model="rightListDepartment"></selftag>
                       </div>
                    </div>
                    <div class="right-model-head-operating">
                        <el-input
                            placeholder="Search by keywords…"
                            suffix-icon="el-icon-search">
                        </el-input>
                        <el-button type="primary" @click="alertStatus(2)">邀请协作</el-button>
                    </div>
               </div>
           </div>
        </el-tabs>
        <markLayer v-if="isAdd===1||isAdd===2" @click="alertStatus(0)">
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
        </markLayer>
		远程教育系统
	</div>
</template>

<script>
    import selftag from '../public/publicComponents/selftag.vue'
    import markLayer from '../public/publicComponents/markLayer.vue'
	export default {
		data () {
			return {
                tabPosition: 'left',
                leftListDepartment:{//本院人员的科室标签列表
                    more:true,
                    title:'科室',
                    list:[
                        {
                            text:'全部'
                        },
                        {
                            text:'急诊科'
                        },
                        {
                            text:'骨科'
                        },
                        {
                            text:'普外科'
                        },
                        {
                            text:'肿瘤科'
                        },
                        {
                            text:'脑病科'
                        },
                    ]
                },
                rightListDepartment:{//院外协作人员的科室标签列表
                    more:true,
                    title:'科室',
                    list:[
                        {
                            text:'全部'
                        },
                        {
                            text:'急诊科'
                        },
                        {
                            text:'骨科'
                        },
                        {
                            text:'普外科'
                        },
                        {
                            text:'肿瘤科'
                        },
                        {
                            text:'脑病科'
                        },
                    ]
                },
                rightListHospital:{//院外协作人员的医院标签列表
                    more:true,
                    title:'科室',
                    list:[
                        {
                            text:'全部'
                        },
                        {
                            text:'急诊科'
                        },
                        {
                            text:'骨科'
                        },
                        {
                            text:'普外科'
                        },
                        {
                            text:'肿瘤科'
                        },
                        {
                            text:'脑病科'
                        },
                    ]
                },
                isAdd:0,//1是新增弹窗，2是邀请弹窗，其余隐藏弹窗，建议选0
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
                inviteNumber:'',
                CollaborationScopeOk:null,
                CollaborationScope:[//协作范围科室选择列表
					{name:'全部'},
					{name:'糖尿病康复科'},
					{name:'新生儿保健科'},
					{name:'XXXXXXXX'}
                ],
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
                value:null
			}
        },
        watch:{
            tabPosition(n,o){
                console.log(n)
            }
        },
		methods:{
            gitIndex(index){},
            inviteSub(){},
            alertStatus(num){//操作弹框状态，传入1个数字，1表示新增弹窗，2表示邀请弹窗，其余隐藏弹窗，建议选0
                if(Object.prototype.toString.call(num)!=="[object Number]")return;
                this.isAdd = num;
            },
        },
        components:{
            selftag,
            markLayer
        },
		async created(){

		}
	}
</script>

<style >
	.Account-authority{

    }
    .Account-authority>.el-tabs{
        background: #FFF;
        border: 1px solid var(--color5);
        box-shadow: 0 0.06rem 0.36rem 0 rgba(0,62,100,0.04);
        border-radius: 0.04rem;
        
    }
    .left-model-head-operating .el-input__inner{
        border-radius: 0.22rem;
    }
    .left-model-head{
        display: flex;
        justify-content: space-between;
    }
    .left-model-head-operating{
        display: flex;
        padding-right: 0.7rem;
    }
    .left-model-head-operating .el-icon-search:before{
        color: var(--color6);
    }
    .left-model-head-operating>.el-input{
        margin-right: 0.99rem;
    }
    .left-model-head-operating .el-button{
        width: 1.96rem;
        height: 0.4rem;
    }
    .left-model-head-operating ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color: var(--color6);
    }
    .left-model-head-operating :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: var(--color6);
    }
    .left-model-head-operating ::-moz-placeholder { /* Mozilla Firefox 19+ */
       color: var(--color6);
    }
    .left-model-head-operating :-ms-input-placeholder { /* Internet Explorer 10-11 */
       color: var(--color6);
    }
    .right-model-head{
        display: flex;
        justify-content: space-between;
    }
    .right-model-head-operating{
        display: flex;
        padding-right: 0.7rem;
    }
    .right-model-head-operating>.el-input{
        margin-right: 0.99rem;
        height: 0.4rem;
    }
    .right-model-head-operating .el-button{
        width: 1.96rem;
        height: 0.4rem;
        background-color: var(--bgColor7);
        transition: .3s;
    }
    .right-model-head-operating .el-button:hover{
        opacity: 0.6;
    }
    .right-model-head-operating .el-input__inner{
        border-radius: 0.22rem;
       
    }
    .select-div{
        text-align: center;
    }
    
    .left-btn-select,.left-btn-select span{
        background-color: var(--bgColor6) !important;
        border-color: var(--bgColor6) !important;
        border-radius: 0.04rem 0 0 0.04rem !important;
    }
    .right-btn-select,.right-btn-select span{
        background-color: var(--bgColor6) !important;
        border-color: var(--bgColor6) !important;
        border-radius: 0 0.04rem 0.04rem 0 !important;
    }
    .select-div label{
        width: 1.18rem;
    }
    .select-div .el-radio-group label .el-radio-button__inner{
        width: 100% !important; 
    }
    /******************************************************/
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
    
</style>