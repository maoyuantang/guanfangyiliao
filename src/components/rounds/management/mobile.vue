<!--移动查房系统  管理端   移动查房-->
<template>
	<div class="mobile">
		<div class="mobile-top">
            <div class="mobile-top-left">
                <selftag :inData="queryConditions.department" @reback="getDepartmentSelect"></selftag>
                <selftag :inData="queryConditions.date" @reback="getDateSelect"></selftag>
            </div>
            <div class="mobile-top-right">
                <div class="mobile-time">
                    <publicTime @timeValue="timeValueFun"></publicTime>
                </div>
                <div class="mobile-search">
                    <search @searchValue="searchChange"></search>
                </div>
            </div>
        </div>
        <div class="mobile-body">
            <table class="mobile-table">
                <thead class="mobile-thead">
                    <tr>
                        <th>科室</th>
                        <th>查房医生</th>
                        <th>病区</th>
                        <th>床号</th>
                        <th>病人</th>
                        <th>病人ID</th>
                        <th>最后查看时间</th>
                        <th>基本信息</th>
                        <th>医嘱</th>
                        <th>体征报表</th>
                        <th>检验检查</th>
                        <th>影像</th>
                        <th>医嘱执行</th>
                        <th class="mobile-th-spe">录音录像</th>
                    </tr>
                </thead>
                <tbody class="mobile-tbody">
                    <tr v-for="(item,index) in roundsList" :key="index">
                        <th>{{item.departmentName}}</th>
                        <th>{{item.doctorName}}</th>
                        <th>{{item.ward}}</th>
                        <th>{{item.bedNo}}</th>
                        <th>{{item.patient}}</th>
                        <th>
                            <el-tooltip class="item" effect="light" :content="item.patientId" placement="top">
                                <div>{{item.patientId.length>7?`${item.patientId.substring(0,7)}...`:item.patientId}}</div>
                            </el-tooltip>
                        </th>
                        <th>
                             <el-tooltip class="item" effect="light" :content="item.lastTime" placement="top">
                                <div>{{item.lastTime.length>7?`${item.lastTime.substring(0,7)}...`:item.lastTime}}</div>
                            </el-tooltip>
                        </th>
                        <th>{{item.disInformation}}</th>
                        <th>{{item.disAsk}}</th>
                        <th>{{item.disReport}}</th>
                        <th>{{item.check}}</th>
                        <th>{{item.disImage}}</th>
                        <th>{{item.disAskAction}}</th>
                        <th class="mobile-th-spe">
                            <i class="iconfont vedio-icon" @click="showVedio(item)">&#xe614;</i>
                        </th>
                    </tr>
                </tbody>
            </table>
            <h1 v-if="roundsList.length<=0">暂无数据</h1>
        </div>
        <div class="mobile-footer">
            <el-pagination
					background
					layout="prev, pager, next"
					:page-size="queryConditions.page.size"               
					:current-page="queryConditions.page.current"
					:total="queryConditions.page.total"
					v-if="queryConditions.page.total!=0"
					@current-change="ChangePage"
			></el-pagination>
        </div>
        <playVedio :inData="vedio"></playVedio>
	</div>
</template>

<script>
    import { mapState } from "vuex"
    import selftag from '../../../public/publicComponents/selftag.vue'
    import search from '../../../public/publicComponents/search.vue'
    import publicTime from '../../../public/publicComponents/publicTime.vue'
    import playVedio from '../../../public/publicComponents/playVedio.vue'
    import {roundsManager} from '../../../api/apiAll.js' 
	export default {
		components: {
            selftag,
            search,
            publicTime,
            playVedio
        },
        watch:{
            'global.departmentList':{
                handler(n){
                    this.setDepartmentData();
                }
            },
        },
		data() {
			return {
                vedio:{ //视频 链接 和显示
                    show:false,
                    url:'../../../static/assets/video/420-420.webm'
                },
                queryConditions:{//查询条件    
                    department:{//科室
                        title:'科室',//标题
                        select:0,//当前选中项
                        list:
                        [
                            // {
                            //     label:'全部',
                            //     value:''
                            // }
                        ],
                        more:false
                    },
                    date:{//日期
                        title:'日期',//标题
                        select:0,//当前选中项
                        list:
                        [
                            {
                                label:'全部',
                                value:''
                            },
                            {
                                label:'今日',
                                value:''
                            },
                        ],
                        more:false
                    },
                    time:null, 
                    keyWorlds:'',
                    page:{   
                        current:1,
                        size:10,
                        total:0
                    } 
                },
                roundsList:[],//列表数据
			}
		},
		computed: {
			...mapState({
                userState: state => state.user.userInfo,
                userSelfInfo: state => state.user.userSelfInfo,
                global: state => state.global
            }),
		},
		methods: {
            /**
             * 分页切换
             */
            ChangePage(num){
                this.getRoundsManager();
            },
            /**
             * 获取 15.1（管理）移动查房管理
             */
            async getRoundsManager(){
                const query = {
                    token:this.userState.token,
                    departmentId:this.queryConditions.department.list.length>0 ? this.queryConditions.department.list[this.queryConditions.department.select].value : '',
                    condition:this.queryConditions.keyWorlds,
                    pageNum:this.queryConditions.page.current,
                    pageSize:this.queryConditions.page.size
                };
                if(this.queryConditions.time){
                    query.startTime = this.queryConditions.time[0];
                    query.endTime = this.queryConditions.time[1];
                }else{//如果没有选择时间，默认时间去年的今天到现在的
                    const nowData = new Date();
                    query.startTime = `${nowData.getFullYear()-1}-${nowData.getMonth()<9?'0'+(nowData.getMonth()+1):nowData.getMonth()+1}-${nowData.getDate()<10?'0'+nowData.getDate():nowData.getDate()}`;
                    query.endTime = `${nowData.getFullYear()}-${nowData.getMonth()<9?'0'+(nowData.getMonth()+1):nowData.getMonth()+1}-${nowData.getDate()<10?'0'+nowData.getDate():nowData.getDate()}`;
                    // query.startTime = `${nowData.getFullYear()-1}-${nowData.getMonth()}-${nowData.getDate()}`;
                    // query.endTime = `${nowData.getFullYear()}-${nowData.getMonth()+1}-${nowData.getDate()}`;
                }
                // console.log(query)
                const res = await roundsManager(query);
                // console.log(res);
                if(res.data&&res.data.errCode===0){
                    this.queryConditions.page.total = res.data.body.data2.total;
                    this.roundsList = res.data.body.data2.list;
                }else{
                    this.$notify({
						title: '失败',
						message: '移动查房管理列表数据获取失败',
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
             * 获取科室列表
             */
            setDepartmentData(){
                this.queryConditions.department.list = this.global.manToolDept.map(item=>{
                    item.label = item.name;
                    item.value = item.id;
                    return item;
                });
            },
             /**
             * 获取科室选取情况
             */
            getDepartmentSelect(data){
                this.queryConditions.department.select = data.select;
                // console.log(this.queryConditions.department.select);
                this.getRoundsManager();
            },
            /**
             * 获取日期选取情况
             */
            getDateSelect(data){
                this.queryConditions.date.select = data.select;
                // console.log(this.queryConditions.date.select);
                this.getRoundsManager();
            },
            /**
             * 获取 时间 选择
             */
            timeValueFun(time){
                this.queryConditions.time = time;
                // console.log(this.queryConditions.time)
                this.getRoundsManager();
            },
            /**
             * 搜索框 获取
             */
            searchChange(data){
                this.queryConditions.keyWorlds = data;
                // console.log(this.queryConditions.keyWorlds);
                this.getRoundsManager();
            },
		},
		async created(){
            this.setDepartmentData();
            this.getRoundsManager();
		}
	}
</script>

<style scoped>
	.mobile {
    }
    .mobile-top{
        display: flex;
    }
    .mobile-top-left{
        flex:1;
    }
    .mobile-top-right{
        flex:1;
    }
    .mobile-time{
        display: inline-block;
    }
    .mobile-search{
        display: inline-block;
    }
    .mobile-table{
        width: 100%;
    }
    .mobile-table tr{
        border-bottom: 1px solid #E5EDF3;
        display: flex;
    }
    .mobile-table th{
        padding-top: 0.1rem;
        padding-bottom: 0.12rem;
        flex: 1;
        text-align: center;
        display: flex;
        justify-content: start;
    }
    .mobile-th-spe{
        text-align: center;
    }
    .mobile-th-spe >i{
        margin: 0 auto;
    }
    .mobile-footer{
        text-align: center;
    }
    .vedio-icon{
        color: #DF63AD;
        cursor: pointer;
    }
    .mobile-tbody th{
        font-weight: 100;
    }
    .mobile-body{
        background: #FFFFFF;
        border: 1px solid #E5EDF3;
        box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
        border-radius: 4px;
        padding-top: .32rem;
        padding-left: .38rem;
        padding-right: .68rem;
        padding-bottom: .68rem;
    }
</style>