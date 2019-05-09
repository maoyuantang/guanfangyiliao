<template>
<div class="statistics-table">
    <div class="statistics-table-option">
        <div class="statistics-table-option-left">
            <selftag :inData="queryConditions.department" @reback="getDepartmentSelect"></selftag>
        </div>
        <div class="statistics-table-option-right">
            <div class="statistics-time select-time-css">
                <span class="time-paragraph">时间段：</span>
                <el-date-picker
                v-model="queryConditions.time"
                type="datetimerange"
                value-format="yyyy-MM-dd"
                range-separator="-"
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
        <div class="statistics-table-content-inner" v-if="outpatient.total">
            <normalColumnChart v-model="outpatient"></normalColumnChart>
        </div>
        <div class="statistics-table-content-inner" v-if="device.total">
            <normalColumnChart v-model="device"></normalColumnChart>
        </div>
        <div class="statistics-table-content-inner" v-if="device.total">
            <normalColumnChart v-model="registeredUsers"></normalColumnChart>
        </div>
        <!-- <div class="statistics-table-content-inner" v-if="followUp.total">
            <normalColumnChart v-model="followUp"></normalColumnChart>
        </div> -->
        
        <!-- <normalColumnChart  v-for="(item,index) in drawData" :key="index" v-model="item.data"></normalColumnChart> -->
    </div>
</div>
</template>

<script>
    import { mapState } from 'vuex'
    import normalColumnChart from '../../../public/publicComponents/normalColumnChart.vue'
    import {statisticsPeople, SETEQUIPMENT, SETFOLLOWCHART, registeredStatistics} from '../../../api/apiAll.js'
    import selftag from '../../../public/publicComponents/selftag.vue'
    import { Progress } from 'element-ui';
	export default {
        computed:{
			...mapState({
				userInfo:state => state.user.userInfo,
                userSelfInfo:state => state.user.userSelfInfo,   
                global: state => state.global 
			})
        },
        watch:{
            'global.departmentList':{
                handler(n){
                    // console.log(n);
                    this.getDepartmentList();
                }
            },
            'queryConditions.time':{
                handler(n){
                    // console.log(n);
                   this.fetchAllApi();
                }
            },
            'queryConditions.way.select':{
                handler(n){
                    // console.log(n);
                   this.fetchAllApi();
                }
            },
            'global.manToolDept':{
                handler(n){
                    this.getDepartmentList();
                }
            }
            
        },
		data(){
			return {
                queryConditions:{//查询条件  
                    department:{//科室
                        title:'科室',
                        selectId: '',
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
                        select:'DEPT',
                        list:[
                            {label:'按科室统计',value:'DEPT'},
                            {label:'按日统计',value:'DAY'},
                            {label:'按月统计',value:'MONTH'},
                            {label:'按年统计',value:'YEAR'},
                        ]
                    }
                },
                outpatient:{//2.4.1远程门诊就诊人次柱状统计图 数据
                    dataAxis:[],//x轴
                    data:[],//y轴
                    title:'远程门诊人次',
                    total:0,
                },
                device:{//10.7.3 设备监测人次
                    dataAxis:[],//x轴
                    data:[],//y轴
                    title:'设备监测人次',
                    total:0,
                },
                followUp:{//10.7.4 智能随访人次
                    dataAxis:[],//x轴
                    data:[],//y轴
                    title:'设备监测人次',
                    total:0,
                },
                registeredUsers:{//3.11 注册用户
                    dataAxis:[],//x轴
                    data:[],//y轴
                    title:'注册用户',
                    total:0,
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
             * 调用 所有 获取 所有 统计图 接口
             */
            fetchAllApi(){
                return Promise.all([
                    this.getStatisticsPeople(),
                    this.getSETEQUIPMENT(),
                    this.getSETFOLLOWCHART(),
                    this.getRegisteredStatistics()
                ]);
            },
            /**
             * 3.11 注册用户 统计图 获取
             */
            async getRegisteredStatistics(){
                const query = {
                    token:this.userInfo.token,
                    departmentId:this.queryConditions.department.selectId,
                    type:this.queryConditions.way.select,
                };
                if(this.queryConditions.time){
                    query.startTime = this.queryConditions.time[0];
                    query.endTime = this.queryConditions.time[1];
                }else{
                    query.startTime = '';
                    query.endTime = '';
                }
                const res = await registeredStatistics(query);
             // console.log(res)
                if(res.data&&res.data.errCode===0){
                    // let initialValue=0;
                    this.registeredUsers.total = `总数：${res.data.body.total}`;
                    this.registeredUsers.dataAxis = res.data.body.data.map(item=>item.x);
                    this.registeredUsers.data = res.data.body.data.map(item=>item.y);
                    this.registeredUsers = Object.assign({},this.registeredUsers)
                 // console.log(this.registeredUsers)
                }else{
                    this.$notify({
						title: '注册用户获取失败',
						message: res.data.errMsg,
						type: 'error'
					});
                }
            },
            /**
             * 10.7.4 智能随访人次 统计图 数据
             */
            async getSETFOLLOWCHART(){
                const query = {
                    token:this.userInfo.token,
                    departmentId:this.queryConditions.department.selectId,
                    type:this.queryConditions.way.select,
                };
                if(this.queryConditions.time){
                    query.startTime = this.queryConditions.time[0];
                    query.endTime = this.queryConditions.time[1];
                }else{
                    query.startTime = '';
                    query.endTime = '';
                }
                const res = await SETFOLLOWCHART(query);
             // console.log(res)
                if(res.data&&res.data.errCode===0){
                    this.followUp.total = `总数：${res.data.body.total}`;
                    this.followUp.dataAxis = res.data.body.data.map(item=>item.x);
                    this.followUp.data = res.data.body.data.map(item=>item.y);
                    this.followUp = Object.assign({},this.followUp)
                 // console.log(this.followUp)
                }else{
                    this.$notify({
						title: '设备监测人次获取失败',
						message: res.data.errMsg,
						type: 'error'
					});
                }
            },
            /**
             * 获取 10.7.3 设备监测人次 统计图 数据
             */
            async getSETEQUIPMENT(){
                const query = {
                    token:this.userInfo.token,
                    departmentId:this.queryConditions.department.selectId,
                    type:this.queryConditions.way.select,
                };
                if(this.queryConditions.time){
                    query.startTime = this.queryConditions.time[0];
                    query.endTime = this.queryConditions.time[1];
                }else{
                    query.startTime = '';
                    query.endTime = '';
                }
                const res = await SETEQUIPMENT(query);
             // console.log(res)
                if(res.data&&res.data.errCode===0){
                    // let initialValue=0;
                    this.device.total = `总数：${res.data.body.total}`;
                    this.device.dataAxis = res.data.body.data.map(item=>item.x);
                    this.device.data = res.data.body.data.map(item=>item.y);
                    this.device = Object.assign({},this.device)
                 // console.log(this.device)
                }else{
                    this.$notify({
						title: '设备监测人次获取失败',
						message: res.data.errMsg,
						type: 'error'
					});
                }
            },
            /**
             * 获取 远程门诊就诊人次柱状统计图 数据
             */
            async getStatisticsPeople(){
                const query = {
                    token:this.userInfo.token,
                    departmentId:this.queryConditions.department.selectId,
                    type:this.queryConditions.way.select,
                };
                if(this.queryConditions.time){
                    query.startTime = this.queryConditions.time[0];
                    query.endTime = this.queryConditions.time[1];
                }else{
                    query.startTime = '';
                    query.endTime = '';
                }
                const res = await statisticsPeople(query);
             // console.log(res)
                if(res.data&&res.data.errCode===0){
                    let initialValue=0;
                    this.outpatient.dataAxis = res.data.body.map(item=>item.x);
                    this.outpatient.data = res.data.body.map(item=>item.y);
                    this.outpatient.total = `总数：${res.data.body.reduce((a,b)=>a+b.y,initialValue)}`;
                    this.outpatient = Object.assign({},this.outpatient)
                 // console.log(this.outpatient)
                }else{
                    this.$notify({
						title: '远程门诊就诊人次柱状统计图获取失败',
						message: res.data.errMsg,
						type: 'error'
					});
                }
            },
            /**
             * 科室 被选中
             */
            getDepartmentSelect(data){
                this.queryConditions.department.selectId = data.select.value;
                this.fetchAllApi()
            },
            /**
			 * 获取科室列表
			 */
			async getDepartmentList(){
                this.queryConditions.department.list = this.global.manToolDept.map(item=>{
                    item.label = item.name;
                    item.value = item.id;
                    return item; 
                });
            },
        },
        async created(){
            this.getDepartmentList();
            this.fetchAllApi();
        },
        components:{
            normalColumnChart,
            selftag
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
        align-items: flex-start;
        margin-top: 0.33rem;
        padding-left: 0.38rem;
        padding-right: 0.28rem;
    }
    .statistics-table-content{
        padding-left: 1.09rem;
        margin-top: 1.02rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .statistics-table-content-inner{
        max-width: 50%;
        text-align: center;
    }
    .statistics-table-option-right{
        display: flex;
        align-items: center;
    }
    .statistics-time{
        padding-right: 0.2rem;
    }
</style>