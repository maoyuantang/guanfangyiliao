<template>
	<div class="class-scheduling">
		<div class="class-scheduling-top">
            <div class="class-scheduling-top-left">
                <tag :inData="queryConditions.department" @reback="getDepartmentSelect"></tag>
                <tag :inData="queryConditions.mode" @reback="getModeSelect"></tag>
                <tag :inData="queryConditions.status" @reback="getStatusSelect"></tag>
            </div>
            <div class="class-scheduling-top-right">
                <search @searchValue="searchChange"></search>
                <el-button type="primary">新增</el-button>
                <!-- <p>{{global.followupMode}}</p> -->
                <!-- <p>{{global.investigationMethod}}</p> -->
                <!-- <p>{{global.teachingMethodsScreeningList}}</p> -->
                <!-- <p>{{global.collaborationState}}</p> -->
            </div>
        </div>
        <div class="class-scheduling-body">
            <div class="class-scheduling-body-content">
                <table class="class-scheduling-table">
                    <thead class="class-scheduling-thead"> 
                        <tr>
                            <th>排课编号</th>
                            <th>科室</th>
                            <th>方式</th>
                            <th>名称</th>
                            <th>资源</th>
                            <th>创建时间</th>
                            <th>授课人</th>
                            <th>授课时间</th>
                            <th>听课</th>
                            <th>状态</th>
                            <th>最近修改</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="class-scheduling-tbody">
                        <tr v-for="(item,index) in timetable" :key="index"> 
                            <th>{{item.courseNumber}}</th>
                            <th>{{item.department}}</th>
                            <th>{{item.type}}</th>
                            <th>{{item.name}}</th>
                            <th>{{item.source}}</th>
                            <th>{{item.createTime}}</th>
                            <th>{{item.teacher}}</th>
                            <th>{{item.teachTime}}</th>
                            <th class="class-scheduling-tbody-spe">{{item.number}}</th>
                            
                            <th>{{item.state}}</th>
                            <th>最近修改</th>
                            <th>
                                <el-button type="success" size="mini" plain>编辑</el-button>
                                <el-button type="danger" size="mini" plain>删除</el-button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="class-scheduling-body-paging">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="queryConditions.paging.size"               
                    :current-page="queryConditions.paging.current"
                    :total="queryConditions.paging.total"
                    v-if="queryConditions.paging.total!=0"
                    @current-change="ChangePage"
                ></el-pagination>
            </div>
        </div>
        <el-dialog
        :title="alertData.type==0?'提示':'编辑'"
        :visible.sync="alertData.show"
        :before-close="handleClose">
           <div class="class-scheduling-alert">
               <div class="class-scheduling-alert-item">
                   <div class="class-scheduling-alert-item-inner">
                       <span class="class-scheduling-alert-item-name">名称:</span>
                       <div class="class-scheduling-alert-item-value">
                           <el-input placeholder="请输入内容" v-model="alertData.data.name" size="mini" clearable></el-input>
                       </div>
                       <i class="iconfont">&#xe7b0;</i>
                   </div>
                   <div class="class-scheduling-alert-item-inner class-scheduling-alert-item-inner-spe">
                       <span class="class-scheduling-alert-item-name">名称:</span>
                       <div class="class-scheduling-alert-item-value">
                           <el-input placeholder="请输入内容" v-model="alertData.data.name" size="mini" clearable></el-input>
                       </div>
                       <i class="iconfont">&#xe7b0;</i>
                   </div>
               </div>

               <div class="class-scheduling-alert-item">
                   <div class="class-scheduling-alert-item-inner">
                       <span class="class-scheduling-alert-item-name">名称:</span>
                       <div class="class-scheduling-alert-item-value">
                           <el-input placeholder="请输入内容" v-model="alertData.data.name" size="mini" clearable></el-input>
                       </div>
                       <i class="iconfont">&#xe7b0;</i>
                   </div>
                   <div class="class-scheduling-alert-item-inner class-scheduling-alert-item-inner-spe">
                       <span class="class-scheduling-alert-item-name">名称:</span>
                       <div class="class-scheduling-alert-item-value">
                           <el-input placeholder="请输入内容" v-model="alertData.data.name" size="mini" clearable></el-input>
                       </div>
                       <i class="iconfont">&#xe7b0;</i>
                   </div>
               </div>

               <div class="class-scheduling-alert-item">

               </div>
           </div>
        </el-dialog>
	</div>
</template>

<script>
    import { mapState } from "vuex"
    import { typeList, arrangeList } from '../../api/apiAll.js'
    import tag from '../../public/publicComponents/tag.vue'
    import search from '../../public/publicComponents/search.vue'
	export default {
		watch:{
			'global.departmentList':{
                handler(n){
                    this.setDepartmentData();
                }
            },
            'global.consultationStatus':{
                handler(n){
                    this.setStatusData();
                }
            },
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
                    mode:{//方式 
                        title:'方式 ',
                        select:0,
                        list:[],
                        more:false
                    },
                    status:{//状态 
                        title:'状态',
                        select:0,
                        list:[],
                        more:false
                    },
                    searchKey:'',//搜索关键字  
                    paging:{//分页   
                        current:1,//当前页
                        size:10,//一页数据条数
                        total:0//总条数
                    },
                },
                timetable:[//课表
                    // {
                    //     "courseNumber": "排课编号",
                    //     "createTime": "创建时间",
                    //     "department": "科室",
                    //     "name": "名称",
                    //     "number": "听课",
                    //     "source": "资源",
                    //     "state": "状态",
                    //     "teachTime": "授课时间",
                    //     "teacher": "授课人",
                    //     "type": "方式"
                    // }
                ], 
                alertData:{   
                    show:true,
                    type:0,//0 新增  ， 1 编辑
                    id:'',//
                    data:{
                        name:'',//名称
                        way:'',//方式
                        lecturer:'',//授课人
                        count:0,//人数
                        time:null,//时间
                        departmentList:[],//科室列表
                        departmentSelect:[],//选择科室列表
                        resource:null,//上传资源（图片/视频）
                        auto:false,//自动报名
                    },

                },
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
             * 关闭弹窗 
             */
            handleClose(done){

            },
            /**
             * 获取排课计划列表
             */
            async getArrangeList(){
                const res = await arrangeList({
                    token:this.userState.token,
                    department:this.queryConditions.department.list[this.queryConditions.department.select].value || '',
                    search:this.queryConditions.searchKey || '',
                    type:this.queryConditions.mode.list[this.queryConditions.mode.select] || '',
                    state:this.queryConditions.status.list[this.queryConditions.status.select].value || '',
                    pageNum:this.queryConditions.paging.current,
                    pageSize:this.queryConditions.paging.size,
                });
                console.log(res);
                if(res.data && res.data.errCode === 0){
                    this.timetable = res.data.body.data2.list;
                    this.queryConditions.paging.total = res.data.body.data2.total;
                }else{
                    this.$notify({
                        title: '失败',
                        message: '排课计划列表获取失败',
                        type: 'error'
                    });
                }
            },
            /**
             * 切换分页
             */
            ChangePage(data){
                console.log(data);
                this.queryConditions.paging.current = data;
            },
            /**
             * 获取 搜索关键字
             */
            searchChange(data){
                console.log(data)
                this.queryConditions.searchKey = data;
            },
            /**
             * 获取 授课方式筛选条件列表
             */
            async getTypeList(){
                const res = await typeList({token:this.userState.token});
                console.log(res);
                if(res.data && res.data.errCode === 0){
                    this.queryConditions.mode.list = res.data.body.map(item=>{
                        item.label = item.name;
                        item.value = item.id;
                        return item;
                    });
                }else{
                    this.$notify({
                        title: '失败',
                        message: '授课方式筛选条件列表获取失败',
                        type: 'error'
                    });
                }
            },
            /**
             * 获取科室选取情况
             */
            getDepartmentSelect(data){
                this.queryConditions.department.select = data.index;
            },
            /**
             * 获取状态选取情况
             */
            getStatusSelect(data){
                this.queryConditions.status.select = data.index;
            },
            /**
             * 获取方式选取情况
             */
            getModeSelect(data){
                this.queryConditions.mode.select = data.index;
            },
            
            /**
             * 获取科室列表
             */
            setDepartmentData(){
                this.queryConditions.department.list = this.global.departmentList.map(item=>{
                    item.label = item.deptName;
                    item.value = item.value;
                    return item;
                })
            },
            /**
             * 获取张状态列表
             */
            setStatusData(){
                this.queryConditions.status.list = this.global.consultationStatus.map(item=>{
                    item.label = item.name;
                    item.value = item.id;
                    return item;
                })
            },
		},
		components:{
            tag,
            search
		},
		async created(){
            this.getTypeList();
            this.setDepartmentData();
            this.setStatusData();
            this.getArrangeList()
		}
	}
</script>

<style scoped>
	.class-scheduling{
		
	}
	.class-scheduling-top{
        display: flex;
    }
	.class-scheduling-top-left{
        flex:1;
    }
    .class-scheduling-top-right{
        flex:1;
    }
    .class-scheduling-top-right>.search{
        display: inline-block;
    }
    .class-scheduling-table{
        width: 100%;
    }
    .class-scheduling-table tr{
        border-bottom: 1px solid #E5EDF3;
        display: flex;
    }
    .class-scheduling-thead{

    }
    .class-scheduling-tbody{

    }
    .class-scheduling-table th{
        padding-top: 0.1rem;
        padding-bottom: 0.12rem;
        flex: 1;
        text-align: center;
        display: flex;
    }
    .class-scheduling-tbody-spe{
        color: red;
    }
    .class-scheduling-alert-item-inner{
        display: flex;
        align-items: center;
    }
    .class-scheduling-alert-item{
        display: flex;
    }
    .class-scheduling-alert-item-inner-spe{
        margin-left: 1.2rem;
    }
</style>