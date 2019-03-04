<template>
<div class="statistics-table">
    <div class="statistics-table-option">
        <div class="statistics-table-option-left">
            <tag :inData="queryConditions.department" @reback="getDepartmentSelect"></tag>
        </div>
        <div class="statistics-table-option-right">
            <div class="statistics-time">
                <span class="time-paragraph">时间段：</span>
                <el-date-picker
                v-model="queryConditions.time"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="statistics-way">
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
    </div>
    <div class="statistics-table-content">
        <normalColumnChart  v-for="(item,index) in drawData" :key="index" v-model="item.data"></normalColumnChart>
    </div>
</div>
</template>

<script>
    import { mapState } from 'vuex'
    import normalColumnChart from '../../../public/publicComponents/normalColumnChart.vue'
    import {fetchHospitalDepts} from '../../../api/apiAll.js'
    import tag from '../../../public/publicComponents/tag.vue'
	export default {
        computed:{
			...mapState({
                userInfo:state => state.user.userInfo,
                global: state => state.global
			})
        },
        watch:{
            'global.departmentList':{
                handler(n){
                    console.log(n);
                    this.getDepartmentList();
                }
            }
        },
		data(){
			return {
                queryConditions:{//查询条件 
                    department:{//科室
                        title:'科室',
                        select:0,
                        list:[
                            // {
                            //     label:'全部',
                            //     value:false
                            // },
                            // {
                            //     label:'今日',
                            //     value:true
                            // },
                        ]
                    },
                    time:null,
                    way:{  
                        select:'keshi',
                        list:[
                            {label:'按科室统计',value:'keshi'},
                            {label:'按日统计',value:'ri'},
                            {label:'按月统计',value:'yue'},
                            {label:'按年统计',value:'nian'},
                        ]
                    }
                },
                drawData:[
                    {
                        data:{
                            dataAxis:['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'],
                            data:[220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234],
                            title:'测试测试,修改修改',
                            total:308
                        }
                    },
                    {
                        data:{
                            dataAxis:['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'],
                            data:[220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234],
                            title:'测试测试,修改修改',
                            total:308
                        }
                    },
                    {
                        data:{
                            dataAxis:['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'],
                            data:[220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234],
                            title:'测试测试,修改修改',
                            total:308
                        }
                    },
                    {
                        data:{
                            dataAxis:['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'],
                            data:[220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234],
                            title:'测试测试,修改修改',
                            total:308
                        }
                    },
                    
                ]
			}
        },
        methods:{
            /**
             * 科室 被选中
             */
            getDepartmentSelect(data){
                console.log(data);
                this.queryConditions.department.select = data.index;
            },
            /**
			 * 获取科室列表
			 */
			async getDepartmentList(){
                this.queryConditions.department.list = this.global.departmentList.map(item=>{
                    item.label = item.deptName;
                    item.value = item.deptId;
                    return item; 
                });
            },
        },
        async created(){
            this.getDepartmentList();
        },
        components:{
            normalColumnChart,
            tag
        }
	}
</script>

<style scoped>
	.statistics-table{
        margin-top: 0.42rem;
        /* height: 300px; */
        background: #FFF;
        border: 1px solid var(--color5);
        box-shadow: 0 0.06rem 0.36rem 0 rgba(0,62,100,0.04);
        border-radius: 0.04rem;
    }
    .statistics-table-option{
        display: flex;
        justify-content: space-between;
        margin-top: 0.33rem;
        padding-left: 0.38rem;
        padding-right: 0.28rem;
    }
    .statistics-table-content{
        display: flex;
        flex-wrap: wrap;
        /* justify-content: space-around; */
    }
    .statistics-table-content{
        padding-left: 1.09rem;
        margin-top: 1.02rem;
    }
    .statistics-table-option-right{
        display: flex;
        align-items: center;
    }
    .statistics-time{
        padding-right: 0.2rem;
    }
</style>