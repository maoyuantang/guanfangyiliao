<!--移动查房系统  管理端   移动查房-->
<template>
	<div class="mobile">
		<div class="mobile-top">
            <div class="mobile-top-left">
                <tag :inData="queryConditions.department" @reback="getDepartmentSelect"></tag>
                <tag :inData="queryConditions.date" @reback="getDateSelect"></tag>
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
                    <tr>
                        <th>急诊科</th>
                        <th>急诊科</th>
                        <th>急诊科</th>
                        <th>急诊科</th>
                        <th>急诊科</th>
                        <th>急诊科</th>
                        <th>急诊科</th>
                        <th>急诊科</th>
                        <th>急诊科</th>
                        <th>急诊科</th>
                        <th>急诊科</th>
                        <th>急诊科</th>
                        <th>急诊科</th>
                        <th class="mobile-th-spe">
                            <i class="iconfont vedio-icon">&#xe614;</i>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mobile-footer">
            
        </div>
	</div>
</template>

<script>
    import { mapState } from "vuex"
    import tag from '../../../public/publicComponents/tag.vue'
    import search from '../../../public/publicComponents/search.vue'
    import publicTime from '../../../public/publicComponents/publicTime.vue'
	export default {
		components: {
            tag,
            search,
            publicTime
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
                    keyWorlds:'' 
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
             * 获取日期选取情况
             */
            getDateSelect(data){
                this.queryConditions.date.select = data.index;
                console.log(this.queryConditions.date.select)
            },
            /**
             * 获取 时间 选择
             */
            timeValueFun(time){
                this.queryConditions.time = time;
                console.log(this.queryConditions.time)
            },
            /**
             * 搜索框 获取
             */
            searchChange(data){
                this.queryConditions.keyWorlds = data;
                console.log(this.queryConditions.keyWorlds)
            },
		},
		async created(){
            this.setDepartmentData();
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
        justify-content: center;
    }
    .mobile-th-spe{
        text-align: center;
    }
    .mobile-th-spe >i{
        margin: 0 auto;
    }
    .vedio-icon{
        color: #DF63AD;
        cursor: pointer;
    }
</style>