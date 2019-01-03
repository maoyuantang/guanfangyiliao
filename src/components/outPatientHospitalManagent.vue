<!--
门诊系统医院管理页面


-->
<template>
	<div class="hospital-management-outpatient">
        <div class="hospital-management-outpatient-nav">
            <normalTab v-model="navInfo" @reBack="getNav"></normalTab>
        </div>
        <div class="out-border">
            <div class="online-clinic" v-if="navInfo.i===0">
                <div class="online-clinic-top">
                    <div class="online-clinic-top-left">
                        <selftag v-model="onlineClinic.topFlag[0]" @reBack="getDepartment"></selftag>
                        <selftag v-model="onlineClinic.topFlag[1]" @reBack="getType"></selftag>
                    </div>
                    <div class="online-clinic-top-right">
                        <search></search>
                        <el-button type="primary">新增业务</el-button>
                    </div>
                </div>
                <div class="online-clinic-middle">
                    <publicList 
                        :columns="onlineClinic.tableBody.columns"
                        :tableData="onlineClinic.tableBody.tableData"
                        :tableBtn="onlineClinic.tableBody.tableBtn">
                    </publicList>
                </div>
            </div>
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
                    <publicList 
                        :columns="onlineClinic.tableBody.columns"
                        :tableData="onlineClinic.tableBody.tableData"
                        :tableBtn="onlineClinic.tableBody.tableBtn">
                    </publicList>
                </div>
            </div>
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
        
	</div>
</template>

<script>
    import normalTab from '../public/publicComponents/normalTab.vue'
    import selftag from '../public/publicComponents/selftag.vue'
    import search from '../public/publicComponents/search.vue'
    import publicList from '../public/publicComponents/publicList.vue'
    import normalColumnChart from '../public/publicComponents/normalColumnChart.vue'
    import statisticsWay from '../public/publicComponents/statisticsWay.vue'
	export default {
		data () {
			return {
				doctorsInfo:{//医生信息
					headImg:'',
					name:'',

                },
                time:null,
				navInfo:{
					i:0,
					list:[
						{
							en:'online clinic',//选项英文，类型 string
							zh:'在线诊室管理'//选项中文，类型string
						},
						{
							en:'Prescription Audit & Distribution',
							zh:'处方审核和配送'
                        },
                        {
							en:'statistics',
							zh:'统计'
						},
					]
                },
                onlineClinic:{//在线诊室管理 数据
                    topFlag:[
                        {
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
                        {
                            more:false,
                            title:'类型',
                            list:[
                                {
                                    text:'全部'
                                },
                                {
                                    text:'查询提取'
                                },
                                {
                                    text:'主动推送'
                                }
                            ]
                        }
                    ],
                    tableBody:{
                        columns:[
                            {
                                prop:"num",
                                label:"业务编号"
                            },
                            {
                                prop:"department",
                                label:"科室"
                            },
                            {
                                prop:"BusinessName",
                                label:"业务名"
                            },
                            {
                                prop:"price",
                                label:"价格"
                            },{
                                prop:"associatedDoctor",
                                label:"关联医生"
                            },
                            {
                                prop:"businessPerson",
                                label:"业务人次"
                            },{
                                prop:"totalRevenue",
                                label:"总收入"
                            },
                            {
                                prop:"currentQueue",
                                label:"当前排队"
                            },
                            {
                                prop:"recentlyModified",
                                label:"最近修改"
                            },
                            {
                                prop:"btns",
                                label:" "
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
                                oclass:"evaluateBtn",
                                method: (index, row) => {
                                    this.evaluateFun(index, row);
                                }
                            },
                            {
                                name: "查看记录",
                                oclass:"recordBtn",
                                method: (index, row) => {
                                    this.recordFun(index, row);
                                }
                            }
                        ]
                    }
                },
                prescriptionAuditDistribution:{//处方审核和配送 数据
                    topFlag:[
                        {
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
                                }
                            ]
                        },
                        {
                            more:false,
                            title:'审核状态',
                            list:[
                                {
                                    text:'全部'
                                },
                                {
                                    text:'已审核'
                                },
                                {
                                    text:'未审核(22)',
                                    warning:true
                                },
                                 {
                                    text:'不通过'
                                }
                            ]
                        },
                        {
                            more:false,
                            title:'配送状态',
                            list:[
                                {
                                    text:'全部'
                                },
                                {
                                    text:'未配送'
                                },
                                {
                                    text:'配送中'
                                },
                                {
                                    text:'已签收'
                                }
                            ]
                        },
                        {
                            more:false,
                            title:'审核医生',
                            list:[
                                {
                                    text:'全部'
                                },
                                {
                                    text:'Dennis Welch'
                                },
                                {
                                    text:'Julie Fields'
                                }
                            ]
                        },
                        {
                            more:false,
                            title:'发药医生',
                            list:[
                                {
                                    text:'全部'
                                },
                                {
                                    text:'Frank Ryan'
                                },
                                {
                                    text:'Rebecca Warren'
                                }
                            ]
                        }
                    ]
                },
                statistics:{//统计 数据
                    topFlag:[
                        {
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
                                }
                            ]
                        },
                    ]
                }
			}
		},
		methods:{
			getNav(msg){
				console.log(msg)
            },
            getDepartment(msg){
                console.log(msg)
            },
            getType(msg){
                console.log(msg)
            },
            getTime(time){
                console.log(time)
            }
		},
		components:{
            normalTab,
            selftag,
            search,
            publicList,
            normalColumnChart,
            statisticsWay
		},
		async created(){

		}
	}
</script>

<style scoped>
    .hospital-management-outpatient{}
    .hospital-management-outpatient-nav{}
    .out-border{
        background: #FFF;
        border: 1px solid var(--color5);
        box-shadow: 0 0.06rem 0.36rem 0 rgba(0,62,100,0.04);
        border-radius: 0.04rem;
        padding-top: 0.32rem;
        padding-right: 0.69rem;
        padding-left: 0.38rem;
        min-height: 76vh;
        margin-right: 0.36rem;
        margin-top: 0.42rem;
    }
    .online-clinic{}
    .online-clinic-top{
        display: flex;
        justify-content: space-between;
    }
    .online-clinic-top>div{
        flex: 1;
    }
    .online-clinic-top-right{
        display: flex;
        justify-content: space-between;
    }
    .online-clinic-top-right>.el-button{
        width: 1.96rem;
        height: 0.4rem;
        padding: 0;
        font-size: var(--fontSize6);
    }
    .online-clinic-top-right>.el-button>span{
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        font-size: var(--fontSize6);
    }
    .hospital-management-outpatient-statistics-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .hospital-management-outpatient-statistics-top>div{
        flex: 1;
    }
</style>