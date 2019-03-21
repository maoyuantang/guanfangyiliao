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
                <el-button type="primary" @click="newPlan">新增</el-button>
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
                                <el-button type="success" size="mini" @click="aditPlan(item)" plain>编辑</el-button>
                                <el-button type="danger" size="mini" @click="cancelPlan(item)" plain>删除</el-button>
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
        width="7rem"
        :title="alertData.type==0?'新增':'编辑'"
        :visible.sync="alertData.show"
        :before-close="handleClose">
           <div class="class-scheduling-alert">
               <div class="class-scheduling-alert-item">
                   <div class="class-scheduling-alert-item-inner">
                       <span class="class-scheduling-alert-item-name">名称:</span>
                       <div class="class-scheduling-alert-item-value">
                           <el-input placeholder="请输入内容" v-model="alertData.data.name" size="mini" clearable></el-input>
                       </div>
                       <i class="iconfont class-scheduling-alert-item-must">&#xe7b0;</i>
                   </div>
                   <div class="class-scheduling-alert-item-inner class-scheduling-alert-item-inner-spe">
                       <span class="class-scheduling-alert-item-name">方式:</span>
                       <div class="class-scheduling-alert-item-value">
                           <el-select v-model="alertData.data.waySelect" size="mini" placeholder="请选择">
                                <el-option
                                v-for="(item,index) in alertData.data.wayList"
                                size="mini"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                       </div>
                       <!-- <i class="iconfont class-scheduling-alert-item-must">&#xe7b0;</i> -->
                   </div>
               </div>

               <div class="class-scheduling-alert-item">
                   <div class="class-scheduling-alert-item-inner">
                       <span class="class-scheduling-alert-item-name">授 课 人:</span>
                       <div class="class-scheduling-alert-item-value">
                           <el-select v-model="alertData.data.lecturerSelect" size="mini" placeholder="请选择">
                                <el-option
                                v-for="(item,index) in alertData.data.lecturerList"
                                size="mini"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                       </div>
                       <i class="iconfont class-scheduling-alert-item-must">&#xe7b0;</i>
                   </div>
                   <div class="class-scheduling-alert-item-inner class-scheduling-alert-item-inner-spe">
                       <span class="class-scheduling-alert-item-name">人数:</span>
                       <div class="class-scheduling-alert-item-value class-scheduling-alert-item-value-spe">
                           <el-input v-model="alertData.data.count.min" size="mini" clearable></el-input>
                           --
                           <el-input v-model="alertData.data.count.max" size="mini" clearable></el-input>
                       </div>
                       <!-- <i class="iconfont class-scheduling-alert-item-must">&#xe7b0;</i> -->
                   </div>
               </div>

               <div class="class-scheduling-alert-item">
                   <div class="class-scheduling-alert-item-inner">
                       <span class="class-scheduling-alert-item-name">授课时间:</span>
                       <div class="class-scheduling-alert-item-value">
                           <el-date-picker
                            v-model="alertData.data.time"
                            type="datetimerange"
                            size="mini" value-format="yyyy-MM-dd HH:mm:ss"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                           <!-- <el-date-picker v-model="alertData.data.time" type="datetime" size="mini" format="yyyy-MM-dd hh:mm:ss.S" placeholder="选择日期时间"></el-date-picker> -->
                           <i class="iconfont class-scheduling-alert-item-must">&#xe7b0;</i>
                       </div>
                   </div>
               </div>

               <div class="class-scheduling-alert-item">
                   <div class="class-scheduling-alert-item-inner">
                       <span class="class-scheduling-alert-item-name">可见科室:</span>
                       <div class="class-scheduling-alert-item-value">
                           <el-select v-model="alertData.data.departmentSelect" size="mini" multiple placeholder="请选择">
                                <el-option
                                v-for="(item,index) in alertData.data.departmentList"
                                size="mini"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <i class="iconfont class-scheduling-alert-item-must">&#xe7b0;</i>
                       </div>
                   </div>
               </div>

               <!-- <div class="class-scheduling-alert-item">
                   <div class="class-scheduling-alert-item-inner">
                       <span class="class-scheduling-alert-item-name class-scheduling-alert-item-name-spe">上传资源:</span>
                       <div class="class-scheduling-alert-item-value">
                           <div class="upload">
                               <input type="file" value="" class="upload-input" ref="classSchedulingUpload">
                               <div class="upload-cover">
                                   <i class="iconfont upload-icon">&#xe613;</i>
                                   <p class="upload-tip">上传图片/视频</p>
                               </div>
                           </div>
                       </div>
                   </div>
               </div> -->

               <div class="class-scheduling-alert-item">
                   <el-switch
                    v-model="alertData.data.auto"
                    inactive-text="自动报名">
                    </el-switch>
               </div>

               <div class="class-scheduling-alert-item">
                    <el-button type="primary" @click="subimt">确定</el-button>
               </div>
           </div>
        </el-dialog>
	</div>
</template>

<script>
    import { mapState } from "vuex"
    import { typeList, arrangeList, eduCourseArrange, doctorsByOrgCodeAndDeptId, getArrange, eduCourseEdit, eduCourseCancel, fetchHospitalDeptAuth } from '../../../api/apiAll.js'
    import Check from '../../../public/publicJs/check.js'
    import tag from '../../../public/publicComponents/tag.vue'
    import search from '../../../public/publicComponents/search.vue'
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
                    show:false,
                    type:0,//0 新增  ， 1 编辑  
                    id:'',//
                    data:{
                        name:'',//名称
                        waySelect:'',//方式  
                        wayList:[//方式列表
                            {label:'远程视频直播授课',value:'LIVE'},
                            {label:'自主学习',value:'SELF'}
                        ],
                        // lecturer:'',//授课人
                        lecturerSelect:'',// 选中的 授课人 
                        lecturerList:[],// 授课人 列表
                        count:{
                            max:'',
                            min:''
                        },//人数
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
             * 4.取消排课计划
             */
            async cancelPlan(item){
                const res = await eduCourseCancel(...[
                    {token:this.userState.token},
                    {id:item.id}
                ]);
                console.log(res);
                if(res.data && res.data.errCode === 0){
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getArrangeList();
                }else{
                    this.$notify({
                        title: '删除失败',
                        message: res.data.errMsg,
                        type: 'error'
                    });
                }
            },
            /**
             * 获取 具体信息
             */
            async getArrange(id){
                const res = await getArrange({
                    token:this.userState.token,
                    id:id
                });
                console.log(res);
                if(res.data && res.data.errCode === 0){
                    return {
                        ok:true,
                        data:res.data.body
                    }
                }else{
                    this.$notify({
                        title: '失败',   
                        message: '排课计划详情获取失败',
                        type: 'error'
                    });
                    return {
                        ok:false,
                        data:null
                    }
                }
            },
            /**
             * 编辑 被点击
             */
            async aditPlan(item){
                console.log(item);
                const resData = await this.getArrange(item.id);
                if(!resData.ok)return; 
                this.alertData.type = 1;
                this.alertData.id = resData.data.id;
                this.alertData.data.name = resData.data.name;
                this.alertData.data.waySelect = resData.data.type;
                this.alertData.data.lecturerSelect = resData.data.teacherName;
                this.alertData.data.count = {
                    max:resData.data.maxNum,
                    min:resData.data.minNum
                };
                this.alertData.data.time = [resData.data.startTime,resData.data.endTime];
                this.alertData.data.departmentSelect = resData.data.department;
                this.alertData.data.auto = resData.data.autoApply;
                this.alertData.show = true;
            },
            /**
             * 新增 被点击
             */
            newPlan(){
                this.alertData.show = true;
            },
            /**
             * 获取 当前账号 下 所有医生
             */
            async getDoctorsByOrgCodeAndDeptId(){
                const res = await doctorsByOrgCodeAndDeptId({
                    token:this.userState.token,
                    orgCode:this.userState.hospitalCode,
                    deptId:''
                });
                console.log(res);
                if(res.data && res.data.errCode === 0){
                    this.alertData.data.lecturerList = res.data.body.map(item => {
                        item.label = item.doctorName;
                        item.value = item.doctorId;
                        return item;
                    });
                }else{
                    this.$notify({
                        title: '失败',
                        message: '医生列表获取失败',
                        type: 'error'
                    });
                }
            },
            /**
             * 弹窗提交
             */
            subimt(){
                if(!this.alertData.data.name){//名称不能为空
                    this.$notify({
                        title: '请输入名称',
                        message: '名称不能为空',
                        type: 'error'
                    });
                    return;
                }
                const isPass = (new Check(this.alertData.data.name || '')).wordsCheck();
                if(!isPass.ok){//名称不能是关键字
                    this.$notify({
                        title: '错误',
                        message: isPass.msg,
                        type: 'error'
                    });
                    return;
                }
                if(!this.alertData.data.lecturerSelect){//授 课 人 不能为空
                    this.$notify({
                        title: '请输入名称',
                        message: '授课人不能为空',
                        type: 'error'
                    });
                    return;
                }
                if(!this.alertData.data.time){//时间 不能为空
                    this.$notify({
                        title: '请输入名称',
                        message: '时间不能为空',
                        type: 'error'
                    });
                    return;
                }
                 if(this.alertData.data.departmentSelect.length<=0){//科室 不能为空
                    this.$notify({
                        title: '请输入名称',
                        message: '科室不能为空',
                        type: 'error'
                    });
                    return;
                }
                this.alertData.type === 0? this.add() : this.modify();
            },
            /**
             *  新增
             */
            async add(){
                
                // console.log(this.alertData.data.time);
                // if(!this.alertData.data.time)return;
                const postData = {
                    name:this.alertData.data.name,
                    type:this.alertData.data.waySelect,
                    teacherId:this.alertData.data.lecturerSelect,
                    minNum:this.alertData.data.count.min,
                    maxNum:this.alertData.data.count.max,
                    startTime:this.alertData.data.time[0],
                    endTime:this.alertData.data.time[1],
                    source:'good good study day day up',
                    department:this.alertData.data.departmentSelect,
                    autoApply:this.alertData.data.auto,
                };
                console.log(postData)
                const res = await eduCourseArrange(...[
                    {token:this.userState.token},
                    postData
                ]);
                console.log(res);
                if(res.data && res.data.errCode === 0){
                    this.$notify({
                        title: '成功',
                        message: '新增成功',
                        type: 'success'
                    });
                    this.getArrangeList();
                    this.handleClose();
                }else{
                    this.$notify({
                        title: '失败',
                        message: res.data.errMsg,
                        type: 'error'
                    });
                }
            },

            /**
             * 修改
             */
            async modify(){
                const postData = {
                    id:this.alertData.id,
                    name:this.alertData.data.name,
                    type:this.alertData.data.waySelect,
                    teacherId:this.alertData.data.lecturerSelect,
                    minNum:this.alertData.data.count.min,
                    maxNum:this.alertData.data.count.max,
                    startTime:this.alertData.data.time[0],
                    endTime:this.alertData.data.time[1],
                    source:'good good study day day up',
                    department:this.alertData.data.departmentSelect,
                    autoApply:this.alertData.data.auto,
                };
                const res = await eduCourseEdit(...[
                    {token:this.userState.token},
                    postData
                ]);
                console.log(res);
                if(res.data && res.data.errCode === 0){
                    this.$notify({
                        title: '成功',
                        message: '修改成功',
                        type: 'success'
                    });
                    this.getArrangeList();
                    this.handleClose();
                }else{
                    this.$notify({
                        title: '修改失败',
                        message: res.data.errMsg,
                        type: 'error'
                    });
                }
            },
            /**
             * 关闭弹窗 
             */
            handleClose(done){
                this.alertData.type = 0;
                this.alertData.id = '';
                this.alertData.data.name = '';
                this.alertData.data.waySelect = '';
                this.alertData.data.lecturerSelect = '';
                this.alertData.data.count = {
                    max:'',
                    min:''
                };
                this.alertData.data.time = null;
                this.alertData.data.departmentSelect = [];
                this.alertData.data.auto = false;
                this.alertData.show = false;
            },
            /**
             * 获取排课计划列表
             */
            async getArrangeList(){
                const isPass = (new Check(this.queryConditions.searchKey || '')).wordsCheck();
                if(!isPass.ok){
                    this.$notify({
                        title: '错误',
                        message: isPass.msg,
                        type: 'error'
                    });
                    return;
                }
                const res = await arrangeList({
                    token:this.userState.token,
                    department:this.queryConditions.department.list[this.queryConditions.department.select].value || '',
                    search:this.queryConditions.searchKey || '',
                    type:this.queryConditions.mode.list[this.queryConditions.mode.select]&&this.queryConditions.mode.list[this.queryConditions.mode.select].value || '',
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
                this.getArrangeList();
            },
            /**
             * 获取 搜索关键字
             */
            searchChange(data){
                console.log(data)
                this.queryConditions.searchKey = data;
                this.getArrangeList();
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
                this.getArrangeList();
            },
            /**
             * 获取状态选取情况
             */
            getStatusSelect(data){
                this.queryConditions.status.select = data.index;
                this.getArrangeList();
            },
            /**
             * 获取方式选取情况
             */
            getModeSelect(data){
                this.queryConditions.mode.select = data.index;
                this.getArrangeList();
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
                // this.alertData.data.departmentList = this.global.manToolDept.map(item=>{
                //     item.label = item.name;
                //     item.value = item.id;
                //     return item;
                // });
            },
            /**
             * 弹窗中的 科室列表  获取   我是真的无语
             */
            async getNewAddedDepartment(){
                const res = await fetchHospitalDeptAuth({
                    orgCode: this.userSelfInfo.orgCode,
                    token: this.userState.token,
                    type:'MANAGE'
                });
                if(res.data && res.data.errCode === 0){
                   this.alertData.data.departmentList = res.data.body.map(item=>{
                        item.label = item.deptName;
                        item.value = item.deptId;
                        return item;
                   });
                }else{
                    this.$notify({
                        title: '科室列表获取失败',
                        message: res.data.errCode,
                        type: 'error'
                    });
                }
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
            this.getArrangeList();
            this.getDoctorsByOrgCodeAndDeptId();
            this.getNewAddedDepartment();
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
        margin-bottom: 0.18rem;
    }
    .class-scheduling-alert-item-inner-spe{
        margin-left: 0.3rem-;
    }
    .upload{
        position: relative;
        width:1rem;
        height: 1rem;
        border: 1px dashed #B9C0C7;
        border-radius: 4px;
    }
    .upload-input{
        display: block;
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        cursor: pointer;
    }
    .upload-cover{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        /* background: blue; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .class-scheduling-alert-item-name{
        width: .65rem;
        text-align: center;
    }
    .class-scheduling-alert-item-must{
        font-size: var(--fontSize1);
        color: red;
    }
    .class-scheduling-alert-item-name-spe{
        display: flex;
        height: 100%;
    }
    .upload-icon{
        color: #B9C0C7;
        font-size: var(--fontSize6);
    }
    .upload-tip{
        font-family: var(--fontFamily3);
        font-size: var(--fontSize1);
        color: #939EAB;
        letter-spacing: 0;
    }
    .class-scheduling-alert-item>button{
        width: 80%;
        margin-top: 0.2rem;
        margin: 0 auto;
    }
    .class-scheduling-alert-item-value-spe{
        display: flex;
    }
    .class-scheduling-alert-item-value-spe>.el-input{
        width: .64rem;
    }
    .class-scheduling-body-paging{
        text-align: center;
    }
</style>