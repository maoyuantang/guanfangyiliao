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
            <!-- <el-pagination
            background
            layout="prev, pager, next"
            :page-size="queryConditions.page.size"
            :current-page="queryConditions.page.current"
            :total="queryConditions.page.total"
            v-if="queryConditions.page.total!=0"
            @current-change="outerCourtChangePage"
            ></el-pagination> -->
        </div>
	</div>
</template>

<script>
	import { mapState } from "vuex"
    import tag from '../../../public/publicComponents/tag.vue'
    import publicTime from '../../../public/publicComponents/publicTime.vue'
    import normalColumnChart from '../../../public/publicComponents/normalColumnChart.vue'
    import {roundsStatistics} from '../../../api/apiAll.js' 
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
            'queryConditions.way.select':{
                handler(n){
                    this.getRoundsStatistics();
                }
            }
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
                            {label:'按科室统计',value:'DEPT'},
                            {label:'按年统计',value:'YEAR'},
                            {label:'按月统计',value:'MONTH'},
                            {label:'按日统计',value:'DAY'},
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
                        title:'XXXX',
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
             * 获取图表数据
             */
            async getRoundsStatistics(){
                const query = {
                    token:this.userState.token,
                    departmentId:this.queryConditions.department.list[this.queryConditions.department.select]?this.queryConditions.department.list[this.queryConditions.department.select].value:'',
                    type:this.queryConditions.way.select
                };
                if(this.queryConditions.time){
                    query.startTime = this.queryConditions.time[0],
                    query.endTime = this.queryConditions.time[1]
                }else{
                    const nowData = new Date();
                    query.startTime = `${nowData.getFullYear()-1}-${nowData.getMonth()<9?'0'+(nowData.getMonth()+1):nowData.getMonth()+1}-${nowData.getDate()<10?'0'+nowData.getDate():nowData.getDate()}`;
                    query.endTime = `${nowData.getFullYear()}-${nowData.getMonth()<9?'0'+(nowData.getMonth()+1):nowData.getMonth()+1}-${nowData.getDate()<10?'0'+nowData.getDate():nowData.getDate()}`;
                }
                // console.log(query); 
                const res = await roundsStatistics(query);
                // console.log(res);
                if(res.data&&res.data.errCode===0){
                    this.chartData.chart1.dataAxis = res.data.body.map(item=>item.x);
                    this.chartData.chart1.data = res.data.body.map(item=>item.y);
                    let initialValue=0;
                    this.chartData.chart1.total = `总数：${res.data.body.reduce((a,b)=>a+b.y,initialValue)}`;
                    this.chartData.chart1 = Object.assign({},this.chartData.chart1)
                    // console.log(this.chartData.chart1)
                }else{
                    this.$notify({
						title: '失败',
						message: '统计图表数据获取失败',
						type: 'error'
					});
                }

            },
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
                this.queryConditions.department.select = data.index;
                // console.log(this.queryConditions.department.select);
                this.getRoundsStatistics();
            },
             /**
             * 获取 时间 选择
             */
            timeValueFun(time){
                this.queryConditions.time = time;
                // console.log(this.queryConditions.time);
                this.getRoundsStatistics();
            },
		},
		async created(){
            this.setDepartmentData();
            this.getRoundsStatistics();
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