<!--移动查房系统  管理端   统计-->
<template>
	<div class="statistics">
		<div class="statistics-top">
            <div class="statistics-top-left">
                <tag :inData="queryConditions.department" @reback="getDepartmentSelect"></tag>
            </div>
            <div class="statistics-top-right">
                <publicTime @timeValue="timeValueFun"></publicTime>
                <el-select v-model="queryConditions.way.select" clearable placeholder="请选择">
                    <el-option
                    v-for="(item,index) in queryConditions.way.list"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="statistics-body">
            <normalColumnChart :inData="chartData.chart1"></normalColumnChart>
            <normalColumnChart :inData="chartData.chart2"></normalColumnChart>
        </div>
        <div class="statistics-footer">
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
    import tag from '../../../public/publicComponents/tag.vue'
    import publicTime from '../../../public/publicComponents/publicTime.vue'
    import normalColumnChart from '../../../public/publicComponents/normalColumnChart.vue'
	export default {
		components: {
			tag,
            publicTime,
            normalColumnChart
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
                    time:null, //时间段
                    way:{//统计方式
                        select:'',  
                        list:[
                            {label:'按科室统计',value:''},
                            {label:'按科室统计',value:''},
                            {label:'按科室统计',value:''},
                            {label:'按科室统计',value:''},
                        ]
                    },
                    page:{  //分页
                        current:1,
                        size:10,
                        total:1000
                    }
                },
                chartData:{//图表数据  
                    chart1:{
                        dataAxis:['a','s','d','f'],
                        data:[12,45,36,52],
                        title:'统计授课人次',
                        total:'666'
                    },
                    chart2:{
                        dataAxis:['a','s','d','f'],
                        data:[12,45,36,52],
                        title:'统计授课人次',
                        total:'666'
                    },
                },
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
            outerCourtChangePage(data){
                this.queryConditions.page.current = data;
            },
             /**
             * 获取科室列表
             */
            setDepartmentData(){
                this.queryConditions.department.list = this.global.departmentList.map(item=>{
                    item.label = item.deptName;
                    item.value = item.deptId;
                    return item;
                });
            },
             /**
             * 获取科室选取情况
             */
            getDepartmentSelect(data){
                this.queryConditions.department.select = data.index;
                console.log(this.queryConditions.department.select)
            },
             /**
             * 获取 时间 选择
             */
            timeValueFun(time){
                this.queryConditions.time = time;
                console.log(this.queryConditions.time)
            },
		},
		async created(){
            this.setDepartmentData();
		}
	}
</script>

<style scoped>
	.statistics {
        background: #FFFFFF;
        border: 1px solid #E5EDF3;
        box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
        border-radius: 4px;
        padding-top: 0.32rem;
        padding-left: 0.38rem;
        padding-bottom: 0.4rem;
    }
    .statistics-top{
        display: flex;
    }
    .statistics-top-left{
        flex:1;
    }
    .statistics-top-right{
        flex:1;
        display: flex;
    }
    .statistics-footer{
        text-align: center;
    }
    .statistics-body{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 0.2rem;
    }
</style>