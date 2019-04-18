<template>
	<div class="statistics">
		<div class="statistics-top">
            <div class="statistics-top-left">
                <tag :inData="queryConditions.department" @reback="getDepartmentSelect"></tag>
            </div>
            <div class="statistics-top-right">
                <publicTime @timeValue="timeValueFun"></publicTime>
                <el-select v-model="queryConditions.way.selectValue" clearable placeholder="请选择">
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
            <div class="statistics-content">
                <normalColumnChart :inData="chartData.speak"></normalColumnChart>
                <normalColumnChart :inData="chartData.listen"></normalColumnChart>
            </div>
        </div>
        
	</div>
</template>

<script>
    import { mapState } from "vuex"
    import tag from '../../public/publicComponents/tag.vue'
    import publicTime from '../../public/publicComponents/publicTime.vue'
    import normalColumnChart from '../../public/publicComponents/normalColumnChart.vue'
    import { countTeacher, countStudent } from '../../api/apiAll.js'
	export default {
		watch:{
			'global.departmentList':{
                handler(n){
                    this.setDepartmentData();
                }
            },
            'queryConditions.way.selectValue':{
                handler(n){
                    this.getCountStudent();
                    this.getCountTeacher();
                }
            }
		},
		data () {
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
                    time:[//时间段 (默认就写成去年的今天 到 现在,后台要求必须传) 
                        `${new Date(new Date().getTime()-365*24*60*60*1000).getFullYear()}-${new Date(new Date().getTime()-365*24*60*60*1000).getMonth()<9?'0'+(new Date(new Date().getTime()-365*24*60*60*1000).getMonth()+1).toString():new Date(new Date().getTime()-365*24*60*60*1000).getMonth()+1}-${new Date(new Date().getTime()-365*24*60*60*1000).getDate()<10?'0'+(new Date(new Date().getTime()-365*24*60*60*1000).getDate()).toString():new Date(new Date().getTime()-365*24*60*60*1000).getDate()}`,
                        `${new Date().getFullYear()}-${new Date().getMonth()<9?'0'+(new Date().getMonth()+1).toString():new Date().getMonth()+1}-${new Date().getDate()<10?'0'+(new Date().getDate()).toString():new Date().getDate()}`,
                    ], 
                    way:{//统计方式   
                        selectValue:'DEPT',
                        list:[
                            {label:'按科室统计',value:'DEPT'},
                            {label:'按日统计',value:'DAY'},
                            {label:'按月统计',value:'MONTH'},
                            {label:'按年统计',value:'YEAR'},
                        ]
                    }
                },
                chartData:{//图表数据 
                    speak:{//讲课
                        dataAxis:['a','s','d','f'],
                        data:[12,45,36,52],
                        title:'统计授课人次',
                        total:'666'
                    },
                    listen:{//听课
                        dataAxis:[],
                        data:[],
                        title:'档案查询',
                        total:''
                    }
                }
			}
		},
		computed:{
            ...mapState({
                userState: state => state.user.userInfo,
                userSelfInfo: state => state.user.userSelfInfo,
                global: state => state.global
            }),
		},
		methods:{
            /**
             * 获取 授课 图表信息
             */
            async getCountTeacher(){
                const query = {
                    token:this.userState.token,
                    startDate:this.queryConditions.time[0],
                    endDate:this.queryConditions.time[1],
                    type:this.queryConditions.way.selectValue || '',
                    department:this.queryConditions.department.list[this.queryConditions.department.select].value || ''
                };
                const res = await countStudent(query);
                // console.log(res);
                if(res.data && res.data.errCode === 0){
                    this.chartData.speak.total = res.data.body.total;
                    this.chartData.speak.dataAxis = res.data.body.data.map(item=>item.x);
                    this.chartData.speak.data = res.data.body.data.map(item=>item.y);
                }else{
                    this.$notify({
                        title: '授课统计获取失败',
                        message: res.data.errMsg,
                        type: 'error'
                    });
                }
            },
            /**
             * 获取 听课 图表信息
             */
            async getCountStudent(){
                const query = {
                    token:this.userState.token,
                    startDate:this.queryConditions.time[0],
                    endDate:this.queryConditions.time[1],
                    type:this.queryConditions.way.selectValue || '',
                    department:this.queryConditions.department.list[this.queryConditions.department.select].value || ''
                };
                const res = await countStudent(query);
                // console.log(res);
                if(res.data && res.data.errCode === 0){
                    this.chartData.listen.total = res.data.body.total;
                    this.chartData.listen.dataAxis = res.data.body.data.map(item=>item.x);
                    this.chartData.listen.data = res.data.body.data.map(item=>item.y);
                }else{
                    this.$notify({
                        title: '听课统计获取失败',
                        message: res.data.errMsg,
                        type: 'error'
                    });
                }
            },
            /**
             * 获取 选取 时间
             */
            timeValueFun(time){
                // console.log(time);
                this.queryConditions.time = time;
                this.getCountStudent();
                this.getCountTeacher();
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
                this.getCountStudent();
                this.getCountTeacher();
            },
		},
		components:{
            tag,
            publicTime,
            normalColumnChart
		},
		async created(){
            this.setDepartmentData();
            this.getCountStudent();
            this.getCountTeacher();
		}
	}
</script>

<style scoped>
	.statistics{
		
	}
	.statistics-top{
        display: flex;
    }
	.statistics-top-left{
        flex:1;
    }
    .statistics-top-right{
        flex:1;
    }
    .statistics-top-right>.publicTime{
        display: inline-block;
    }
    .statistics-top-right>.el-select{
        display: inline-block;
    }
    .statistics-content{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 0.2rem;
        justify-items: center;
    }
    .statistics-body{
        padding-top: .5rem;
    }
</style>