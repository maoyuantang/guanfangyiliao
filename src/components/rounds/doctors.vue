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
                    <tr>
                        <th>2018-03-22</th>
                        <th>2018-03-22</th>
                        <th>2018-03-22</th>
                        <th>2018-03-22</th>
                        <th>2018-03-22</th>
                        <th>2018-03-22</th>
                        <th>2018-03-22</th>
                        <th>2018-03-22</th>
                        <th>2018-03-22</th>
                        <th>2018-03-22</th>
                        <th>2018-03-22</th>
                        <th>2018-03-22</th>
                        <th><i class="iconfont vedio-icon">&#xe614;</i></th>
                        <th>2018-03-22</th>
                    </tr>
                </tbody>
            </table>
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
	</div>
</template>

<script>
    import { mapState } from "vuex"
    import tag from '../../public/publicComponents/tag.vue'
    import publicTime from '../../public/publicComponents/publicTime.vue'
	export default {
		components: {
            tag,
            publicTime
		},
		data() {
			return {
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
                        total:1000//总条数
                    },
                },
                tableData:{//表格数据

                },
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
             * 分页切换
             */
            outerCourtChangePage(num){
                this.queryConditions.page.current = num;
                console.log(this.queryConditions.page.current)
            },
            /**
             * 获取 日期 选择
             */
            getDateSelect(date){
                this.queryConditions.date.select = data.index;
                console.log(date)
            },
            /**
             * 获取 时间段
             */
            timeValueFun(time){
                console.log(time);
                this.queryConditions.time = time;
            },
		},
		async created(){
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
</style>