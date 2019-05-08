<template>
	<div class="doc">
		<div class="doc-nor-item" @click="changeAlert('followUp')">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/随访计划@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">随访计划</p>
                <p class="doc-nor-item-time">{{followUp.nearDate || 'empty'}} </p>
                <p class="doc-nor-item-text" v-for="(item,index) in followUp.content" :key="index">{{item}}</p>
            </div>
        </div>

		<div class="doc-nor-item">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/风险自评@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">风险评估</p>
                <p class="doc-nor-item-time">{{evaluation.lastDate}}</p>
                <p class="doc-nor-item-text">{{evaluation.title}}</p>
            </div>
        </div>

		<div class="doc-nor-item" @click="changeAlert('selfTest')">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/设备自测@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">设备自测</p>
                <p class="doc-nor-item-time">{{selfTest.nearlyDate}} </p>
                <p class="doc-nor-item-text">{{selfTest.data}}</p>
            </div>
        </div>

		<div class="doc-nor-item" @click="changeAlert('upDoc')">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/上传@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">上传档案</p>
                <p class="doc-nor-item-time">{{upDoc.lastDate}} </p>
                <p class="doc-nor-item-text">{{upDoc.title}}</p>
            </div>
        </div>
        <!-- 随访 弹窗 -->
        <el-dialog :close-on-click-modal="false"
        title=" "
        append-to-body
        :visible.sync="followUp.alertData.show"
        :fullscreen="true"
        :before-close="followUpClose"
        >
        <div class="followUp-alert">
            <div class="followUp-alert-content">
                <table class="followUp-alert-table">
                    <thead class="followUp-alert-thead">
                        <tr>
                            <th>名称</th>
                            <th>发送随访表医生</th>
                            <th>发送时间</th>
                            <th>下次随访时间</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="followUp-alert-tbody">
                        <tr v-for="(item,index) in 9" :key="index">
                            <th class="followUp-alert-spe-item">随访表名称占位符</th>
                            <th>张医生</th>
                            <th>2018-12-15</th>
                            <th>2018-12-25</th>
                            <th>
                                <el-button type="primary" size="mini" plain>查看</el-button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </el-dialog>

        <!-- 设备自测 弹窗 -->
        <el-dialog :close-on-click-modal="false"
        title=" "
        append-to-body
        :visible.sync="selfTest.alertData.show"
        :fullscreen="true"
        :before-close="selfTestClose"
        >
        <div class="selfTest-alert">
            <lineChart :inData="selfTest.alertData.chartData"></lineChart>
        </div>
        </el-dialog>

        <!-- 上传档案 弹窗 -->
        <el-dialog :close-on-click-modal="false"
        title=" "
        append-to-body
        :visible.sync="upDoc.alertData.show"
        :fullscreen="true"
        :before-close="upDocClose"
        >
        <div class="up-doc-alert">
            <Timeline>
                <TimelineItem v-for="(item,index) in upDoc.alertData.list" :key="index">
                    <p class="visiting-hospital">{{item.hospital}}</p>
                    <div class="visiting-department">
                        <p>
                            <span class="visiting-department-on">on</span>
                            <span class="visiting-department-name">{{item.dept}}  |  门诊</span>
                        </p>
                        <p class="up-doc-alert-time">{{item.createTime}}</p>
                    </div>
                    <div class="visiting-content">
                        <img :src="item.imgUrl" alt="" v-for="(item,index) in item.imgs" :key="index">
                    </div>
                </TimelineItem>
                <!-- <TimelineItem>
                    <p class="visiting-hospital">重庆市医科大学第三附属医院</p>
                    <div class="visiting-department">
                        <p>
                            <span class="visiting-department-on">on</span>
                            <span class="visiting-department-name">科室名称  |  门诊</span>
                        </p>
                        <p class="up-doc-alert-time">2018-12-25</p>
                    </div>
                    <div class="visiting-content">
                        <img src="./../../../static/assets/img/nohave.png" alt="" v-for="(item,index) in 4" :key="index">
                    </div>
                </TimelineItem> -->
            </Timeline>
        </div>
        </el-dialog>
	</div>
</template>

<script>
    import { mapState } from "vuex"
    import { nearlyFollowup, nearlyDevice, lastAssessPlan, lastUserRecord, getUserUpDocList } from '../../api/apiAll.js'
    import lineChart from '../../public/publicComponents/lineChart.vue'
    import apiBaseURL from '../../enums/apiBaseURL.js'
	export default {
        props:[
            "inData"
        ],
		watch:{
			
		},
		data () {
			return {
				followUp:{//随访 
                    nearDate:'',//最近时间 
                    content:[],//内容
                    alertData:{//弹窗数据
                        show:false
                    }
                },
                selfTest:{//设备自测 
                    nearlyDate:'',
                    data:'',
                    alertData:{//弹窗数据
                        show:false,
                        chartData:{//图表 数据
                            xAxis:['周一','周二','周三','周四','周五','周六','周日'],//x轴  
                            series:[
                                {
                                    name:'邮件营销',
                                    data:[120, 132, 101, 134, 90, 230, 210]
                                },
                                {
                                    name:'联盟广告',
                                    data:[220, 182, 191, 234, 290, 330, 310]
                                },
                            ]
                        }
                    }
                },
                upDoc:{//上传档案     
                    alertData:{//弹窗数据   
                        show:false,
                        list:[
                            // {            
                            //     "id":"档案ID",
                            //     "userId":"用户ID",
                            //     "seeDoctorTime":"就诊时间",
                            //     "type":"档案类型",
                            //     "hospital":"医院",
                            //     "dept":"科室",
                            //     "describe":"描述",
                            //     "createTime":"创建时间",
                            //     "imgs":[
                            //             {
                            //                 "imgId":"图片ID",
                            //                 "id":"图片表主键ID"
                            //             }
                            //     ]
                            // }
                        ]
                    },
                    lastDate:'',
                    title:''
                },
                evaluation:{//风险评估  
                    lastDate:'',
                    title:''
                }
			}
		},
		computed:{
			...mapState({
                userState: state => state.user.userInfo,
                userSelfInfo:state => state.user.userSelfInfo, 
                global: state => state.global
            }),
		},
		methods:{
            /**
             * 关闭 上传档案 弹窗
             */
            upDocClose(){
                this.upDoc.alertData.show = false;
            },
            /**
             * 关闭 随访 弹窗
             */
            followUpClose(){
                this.followUp.alertData.show = false;
            },
            /**
             * 关闭 设备自测 弹窗
             */
            selfTestClose(){
                this.selfTest.alertData.show = false;
            },
            /**
             * 切换显示弹窗
             */
            changeAlert(item){
                ['followUp','selfTest','upDoc'].forEach(v=>this[v].alertData.show = item===v);
            },
            /**
             * 获取 风险评估
             */
            async getLastAssessPlan(){
                const res = await lastAssessPlan({
                    token: this.userState.token,
                    userId:this.inData.userId,
                    memberId:this.inData.id
                });
                // console.log(res);
                if (res.data && res.data.errCode === 0){
                    if(res.data.body){
                        this.evaluation.lastDate = res.data.body.lastDate;
                        this.evaluation.title = res.data.body.title;
                    }
                     
                }else{
                    this.$notify({
						title: '失败',
						message: '风险评估获取失败',
						type: 'error'
					});
                }
            },
            /**
             * 获取 成员最近随访
             */
            async getNearlyFollowup(){
                const res = await nearlyFollowup({
                    token: this.userState.token,
                    userId:this.inData.userId,
                    memberId:this.inData.id
                });
                // console.log(res);
                if (res.data && res.data.errCode === 0){
                    this.followUp.nearDate = res.data.body.nearDate;
                    this.followUp.content = res.data.body.content;
                }else{
                    this.$notify({
						title: '失败',
						message: '随访计划获取失败',
						type: 'error'
					});
                }
            },
            /**
             * 获取 成员最近自测 
             */
            async nearlyDevice(){
                const res = await nearlyDevice({
                    token: this.userState.token,
                    userId:this.inData.userId,
                    memberId:this.inData.id
                });
                // console.log(res);
                if (res.data && res.data.errCode === 0){
                    this.selfTest.nearlyDate = res.data.body.nearlyDate;
                    this.selfTest.data = res.data.body.data;
                }else{
                    this.$notify({
						title: '失败',
						message: '设备自测获取失败',
						type: 'error'
					});
                }
            },
            /**
             * 获取患者最后一次上传档案信息
             */
            async getLastUserRecord(){
                // console.log('enter')
                const res = await lastUserRecord({
                    token: this.userState.token,
                    userId:this.inData.userId,
                    familyMemberId:this.inData.id
                });
                // console.log(res);
                if (res.data && res.data.errCode === 0){
                    this.upDoc.lastDate = res.data.body.lastDate;
                    this.upDoc.title = res.data.body.title;
                }else{
                    this.$notify({
						title: '失败',
						message: '上传档案信息获取失败',
						type: 'error'
					});
                }
            },
            /**
             * 5.医生WEB查询用户上传档案列表
             */
            async getUserUpDocList(){
                const res = await getUserUpDocList({
                    token: this.userState.token,
                    userId:this.inData.userId,
                    memberId:this.inData.id,
                    pageSize:2,
                    pageNum:1
                });
                // console.log(res);
                if (res.data && res.data.errCode === 0){
                    this.upDoc.alertData.list = res.data.body.data2.list.map(item=>{
                        item.imgs = item.imgs.map(ele=>{
                            ele.imgUrl = `${apiBaseURL.imgBaseUrl}/m/v1/api/hdfs/fs/download/${ele.imgId}`;
                            return ele;
                        });
                        return item;
                    })
                }else{
                    this.$notify({
						title: '失败',
						message: '用户上传档案列表获取失败',
						type: 'error'
					});
                }
            },
		},
		components:{
            lineChart
		},
		async created(){
            // console.log(this.inData);
            this.getNearlyFollowup();
            this.nearlyDevice();
            this.getLastAssessPlan();
            this.getLastUserRecord();
            this.getUserUpDocList();
		}
	}
</script>

<style scoped>
	.doc{
		display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 0.2rem;
	}
	.doc-nor-item{
        display: flex;
        background: #FFFFFF;
        border: 1px solid #E1E8EE;
        border-radius: 4px;
        width: 6.7rem;
        height: 1.62rem;
        margin-bottom: 0.15rem;
    }
    .doc-nor-item-left{
        flex:1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
	.doc-nor-item-right{
        flex:3;
    }
    .doc-nor-item-title{
        margin-top: 0.28rem;
        color: var(--color18);
        line-height: 0.22rem;
        font-weight: bold;
    }
    .doc-nor-item-time{
        font-family: var(--fontFamily3);
        font-size: var(--fontSize1);
        color: var(--color19);
        line-height: 0.22rem;
    }
    .doc-nor-item-text{
        font-family: var(--fontFamily3);
        font-size: var(--fontSize1);
        color: var(--color19);
        line-height: 0.22rem;
    }
	.followUp-alert-content{
        border:1px solid #97A3B4;
        border-radius: 0.04rem;
        padding-top: 0.9rem;
        padding-left: 0.4rem;
    }
    .followUp-alert-table{
        width:100%;
        font-family: var(--fontFamily3);
        font-size: var(--fontSize1);
        color: #8A96A0;
    }
    .followUp-alert-table tr{
        display: flex;
        padding-bottom: .3rem;
    }
    .followUp-alert-table th{
        flex: 1;
        text-align: center;
    }
    .followUp-alert-spe-item{
        font-size: 0.13rem;
        color: var(--color18);
    }
    /* //////////////////////////////// */
    .visiting-hospital{
        color: var(--color18);
        line-height: 0.22rem;
    }
    .visiting-department{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
	.visiting-department-on{
        font-family: var(--fontFamily4);
        font-size: var(--fontSize1);
        color: var(--color19);
        line-height: 0.22rem;
        
    }
    .visiting-department-name{
        font-size: var(--fontSize1);
        color: var(--borderColor5);
    }
    .visiting-content{
        /* height: 0.76rem; */
        height: 1.6rem;
        background: #F3F6FA;
        border-radius: 4px;
        display: flex;
        align-items: center;
        padding-left: 0.48rem;
    }
    .visiting-content>img{
        display: block;
        width: 1.25rem;
        height: 1.38rem;
        margin-right: 0.14rem;
    }
    .up-doc-alert-time{
        font-family: var(--fontFamily4);
        font-size: 0.13rem;
        color: var(--color19);
    }
</style>