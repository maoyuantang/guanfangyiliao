<!--移动查房系统 医生端-->
<template>
	<div class="rounds-doctor">
		<div class="rounds-doctor-top">
            <div class="rounds-doctor-top-left">
                <tag :inData="queryConditions.date" @reback="getDateSelect"></tag>
            </div>
            <div class="rounds-doctor-top-right">
                <publicTime @timeValue="timeValueFun"></publicTime>
            </div>
            
        </div>
        <div class="rounds-doctor-body">
            <table class="rounds-doctor-table">
                <thead class="rounds-doctor-thead">
                    <tr>
                        <th>时间</th>
                        <th>病区</th>
                        <th>床号</th>
                        <th>病人</th>
                        <th>病人ID</th>
                        <th>基本信息</th>
                        <th>医嘱</th>
                        <th>体征报表</th>
                        <th>检验检查</th>
                        <th>影像</th>
                        <th>医嘱执行</th>
                        <th>状态</th>
                        <th>录音录像</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="rounds-doctor-tbody">
                    <tr v-for="(item,index) in tableData" :key="index">
                        <th>
                             <el-tooltip class="item" effect="light" :content="item.time" placement="top">
                                <div>{{item.time.length>7?`${item.time.substring(0,7)}...`:item.time}}</div>
                            </el-tooltip>
                        </th>
                        <th>{{item.ward}}</th>
                        <th>{{item.bedNo}}</th>
                        <th>{{item.patient}}</th>
                        <th>
                            <el-tooltip class="item" effect="light" :content="item.patientId" placement="top">
                                <div>{{item.patientId.length>7?`${item.patientId.substring(0,7)}...`:item.patientId}}</div>
                            </el-tooltip>
                        </th>
                        <th>{{item.disInformation}}</th>
                        <th>{{item.disAsk}}</th>
                        <th>{{item.disReport}}</th>
                        <th>{{item.check}}</th>
                        <th>{{item.disImage}}</th>
                        <th>{{item.disAskAction}}</th>
                        <th>{{item.todayStatus}}</th>
                        <th><i class="iconfont vedio-icon" @click="showVedio(item)">&#xe614;</i></th>
                        <th>
                            <el-button type="primary" size="mini" @click="recording(item,index)" plain>查看记录</el-button>
                        </th>
                    </tr>
                </tbody>
            </table>
            <h1 v-if="tableData.length<=0">暂无数据</h1>
        </div>
        <div class="rounds-doctor-footer">
            <el-pagination
            background
            layout="prev, pager, next"
            :page-size="queryConditions.page.size"
            :current-page="queryConditions.page.current"
            :total="queryConditions.page.total"
            v-if="queryConditions.page.total!=0"
            @current-change="outerCourtChangePage"
            ></el-pagination>
        </div>
        <playVedio :inData="vedio"></playVedio>
        <!-- 查看记录 弹窗 -->
        <el-dialog
        title=" "
        append-to-body
        width="393px"
        min-height="486px"
        :visible.sync="alertInfo.show"
        :fullscreen="false"
        :before-close="closeAlert"
        >
        <div class="rounds-doctor-alert">
           <div class="rounds-doctor-alert-headimg">
               <img :src="alertInfo.data?alertInfo.data.imgSrc||'../../../static/assets/img/a-6.png':'../../../static/assets/img/a-6.png'" alt="">
           </div>
           <p class="rounds-doctor-alert-name">{{alertInfo.data?alertInfo.data.patient:''}}</p>
           <p class="rounds-doctor-alert-start">住院时间{{alertInfo.data?alertInfo.data.inTime:''}}</p>
           <div v-if="alertInfo.data" class="rounds-doctor-alert-list">
               <p v-for="(item,index) in alertInfo.data.list" :key="index">{{item}}</p>       
           </div>
        </div>
        </el-dialog>
	</div>
</template>

<script>
    import { mapState } from "vuex"
    import tag from '../../public/publicComponents/tag.vue'
    import publicTime from '../../public/publicComponents/publicTime.vue'
    import playVedio from '../../public/publicComponents/playVedio.vue'
    import {myRounds} from '../../api/apiAll.js' 
    import apiBaseURL from "../../enums/apiBaseURL.js"
	export default {
		components: {
            tag,
            publicTime,
            playVedio
		},
		data() {
			return {
                vedio:{ //视频 链接 和显示
                    show:false,
                    url:'../../../static/assets/video/420-420.webm'
                },
                queryConditions:{//查询条件 
                    date:{//日期
                        title:'日期',//标题
                        select:0,//当前选中项
                        list:
                        [
                            {
                                label:'全部',
                                value:'all'
                            },
                            {
                                label:'今日',
                                value:'today'
                            },
                        ],
                        more:false
                    },
                    time:[],//时间段 
                    page:{//分页   
                        current:1,//当前页码
                        size:10,//每页 条数
                        total:0//总条数
                    },
                },
                tableData:[//表格数据
                    // {
                    //     "bedNo": "床号",
                    //     "check": "检验检查",
                    //     "disAsk": "医嘱",
                    //     "disAskAction": "医嘱执行",
                    //     "disImage": "影像",
                    //     "disInformation": "基本信息",
                    //     "disRecording": "录音录像",
                    //     "disReport": "体征报表",
                    //     "id": "id",
                    //     "patient": "病人",
                    //     "patientId": "病人ID",
                    //     "time": "时间",
                    //     "todayStatus": "状态",
                    //     "ward": "病区"
                    // }
                ],
                alertInfo:{//弹窗 数据 
                    show:false,
                    data:null,
                    index:null
                }
			}
		},
		computed: {
			...mapState({
				userState: state => state.user.userInfo,
				userSelfInfo: state => state.user.userSelfInfo,
				userInfo: state => state.user.userInfo,
			}),
		},
		methods: {
            /**
             * 关闭 弹窗
             */
            closeAlert(){
                this.alertInfo = {
                    show:false,
                    data:null,
                    index:null
                }
            },
            /**
             * 查看记录
             */
            recording(item,index){
                this.alertInfo.data = item;  
                this.alertInfo.index = index;
                this.alertInfo.data.imgSrc = this.alertInfo.data.patientHeadId?`${apiBaseURL.developmentEnvironment}/m/v1/api/hdfs/fs/download/${this.alertInfo.data.patientHeadId}`:this.alertInfo.data.patientHeadId;
                this.alertInfo.show = true;
                console.log(item)
            },
            /**
             * 获取 列表 数据
             */
            async getMyRounds(){
                const query = {
                    token:this.userState.token,
                    pageNum:this.queryConditions.page.current,
                    pageSize:this.queryConditions.page.size
                };
                if(this.queryConditions.time.length>0){
                    query.startTime = this.queryConditions.time[0],
                    query.endTime = this.queryConditions.time[1]
                }else{
                    const nowData = new Date();
                    query.startTime = `${nowData.getFullYear()-1}-${nowData.getMonth()<9?'0'+(nowData.getMonth()+1):nowData.getMonth()+1}-${nowData.getDate()<10?'0'+nowData.getDate():nowData.getDate()}`;
                    query.endTime = `${nowData.getFullYear()}-${nowData.getMonth()<9?'0'+(nowData.getMonth()+1):nowData.getMonth()+1}-${nowData.getDate()<10?'0'+nowData.getDate():nowData.getDate()}`;
                    // query.startTime = `${nowData.getFullYear()-1}-${nowData.getMonth()+1}-${nowData.getDate()}`;
                    // query.endTime = `${nowData.getFullYear()}-${nowData.getMonth()+1}-${nowData.getDate()}`;
                }
                const res = await myRounds(query);
                console.log(res);
                if(res.data&&res.data.errCode===0){
                    this.tableData = res.data.body.data2.list;
                    this.queryConditions.page.total = res.data.body.data2.total;
                }else{
                    this.$notify({
						title: '失败',
						message: '列表数据获取失败',
						type: 'error'
					});
                }
            },
            /**
             * 显示 视频
             */
            showVedio(item){
                this.vedio.show = true;
            },
            /**
             * 分页切换
             */
            outerCourtChangePage(num){
                this.queryConditions.page.current = num;
                console.log(this.queryConditions.page.current);
                this.getMyRounds(); 
            },
            /**
             * 获取 日期 选择
             */
            getDateSelect(data){
                console.log(data);
                this.queryConditions.date.select = data.index;  
                this.getMyRounds(); 
            },
            /**
             * 获取 时间段
             */
            timeValueFun(time){
                console.log(time);
                this.queryConditions.time = time;
                this.getMyRounds(); 
            },
		},
		async created(){
            this.getMyRounds();
		}
	}
</script>

<style scoped>
	.rounds-doctor {
		
    }
    .rounds-doctor-top{
        display: flex;
    }
    .rounds-doctor-top-left{
        flex:1;
    }
    .rounds-doctor-top-right{
        flex:1;
    }
    .rounds-doctor-table{
        width: 100%;
    }
    .rounds-doctor-table tr{
        border-bottom: 1px solid #E5EDF3;
        display: flex;
    }
    .rounds-doctor-table th{
        padding-top: 0.1rem;
        padding-bottom: 0.12rem;
        flex: 1;
        text-align: center;
        display: flex;
        justify-content: center;
    }
    .rounds-doctor-footer{
        text-align: center;
    }
    .vedio-icon{
        color: #DF63AD;
        cursor: pointer;
    }
    .rounds-doctor-alert-headimg>img{
        display: flex;
        width:1.48rem;
        height: 1.48rem;
        border-radius: 50%;
        margin: 0 auto;
    }
    .rounds-doctor-alert-name{
        font-family: Helvetica;
        font-size: 20px;
        color: #252631;
        text-align: center;
        padding-top: .12rem;
    }
    .rounds-doctor-alert-start{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #98A9BC;
        text-align: center;
        line-height: 21px;
        padding-top: .3rem;
        padding-bottom: .4rem;
    }
    .rounds-doctor-alert-list>p{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #98A9BC;
        line-height: 31px;
        padding-left: .6rem;
    }
</style>