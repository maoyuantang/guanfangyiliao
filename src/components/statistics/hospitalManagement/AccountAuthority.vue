<template>
	<div class="Account-authority">
        <div class="select-div">
            <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
                <el-radio-button label="left" :class="tabPosition==='left'?'left-btn-select':''">本院人员</el-radio-button>      
                <el-radio-button label="right" :class="tabPosition==='right'?'right-btn-select':''">院外协作人员</el-radio-button>
            </el-radio-group>
        </div>
        <el-tabs>
           <div class="left-model" v-show="tabPosition==='left'">
               <div class="left-model-head">
                    <div class="left-model-head-flag">
                        <selftag v-model="leftListDepartment" @reback="test111"></selftag>
                    </div>
                    <div class="left-model-head-operating">
                        <el-input
                            placeholder="Search by keywords…"
                            suffix-icon="el-icon-search">
                        </el-input>
                        <el-button type="primary" @click="alertStatus(1)">新增</el-button>
                    </div>
               </div>
               <div class="left-model-body">
                    <publicList :tableData="newModules.tableData" :columns="newModules.columns" :tableBtn="newModules.tableBtn"></publicList>
               </div>
           </div>
           <div class="right-model" v-show="tabPosition==='right'">
               <div class="right-model-head">
                    <div class="right-model-head-flag">
                       <div>
                            <selftag @reBack="gitIndex" v-model="rightListHospital"></selftag>
                            <selftag @reBack="gitIndex" v-model="rightListDepartment"></selftag>
                       </div>
                    </div>
                    <div class="right-model-head-operating">
                        <el-input
                            placeholder="Search by keywords…"
                            suffix-icon="el-icon-search">
                        </el-input>
                        <el-button type="primary" @click="alertStatus(2)">邀请协作</el-button>
                    </div>
               </div>
              <div class="left-model-body">
                    <publicList :tableData="inviteModules.tableData" :columns="inviteModules.columns" :tableBtn="inviteModules.tableBtn"></publicList>
               </div>
           </div>
        </el-tabs>
        <el-dialog class="startGroup" title="新增" :visible.sync="otrue" width="602px" hight="607px" center>
                <div class="mark-add" v-if="isAdd===1">
                    <!-- <p class="mark-add-title">新增<p> -->
                    <div class="add-module">
                        <div class="input-layer">
                            <div class="leyer-item">
                                <span class="leyer-item-name">姓名:</span>
                                <el-input  placeholder="" size="mini" v-model="addData.name"></el-input>
                                <Icon type="md-star" />
                            </div>
                            <div class="leyer-item">
                                <span class="leyer-item-name">电话:</span>
                                <el-input  placeholder="关联后可使用手机号" size="mini" v-model="addData.phone"></el-input>
                            </div>
                        </div>
                        <div class="input-layer">
                            <div class="leyer-item">
                                <span class="leyer-item-name">账号:</span>
                                <el-input  placeholder="" size="mini" v-model="addData.account"></el-input>
                                <Icon type="md-star" />
                            </div>
                            <div class="leyer-item">
                                <span class="leyer-item-name">密码:</span>
                                <el-input  placeholder="" size="mini" v-model="addData.passwd" type="password"></el-input>
                                <Icon type="md-star" />
                            </div>
                        </div>
                        <div class="select-layer" style="margin-bottom:0.18rem">
                            <span class="leyer-item-name">科室:</span>
                            <el-select v-model="deptIds" placeholder="本账号范围内可多选" multiple size="mini"  style="flex:1">
                                <el-option
                                    v-for="(item) in departmentlist"
                                    :key="item.deptId"
                                    :label="item.deptName"
                                    :value="item.deptName">
                                </el-option>
                            </el-select>
                            <Icon type="md-star" />
                        </div>
                        <div class="select-layer">
                            <span class="leyer-item-name">医生业务范围:</span>
                            <selectTree :inData="DoctorBusinessScope" @reback="getDoctorBusinessScopeSelect"></selectTree>
                            <Icon type="md-star" />
                        </div>
                        <div class="select-item-list">
                            <span v-for="(item,index) in DoctorBusinessScopeSelect" :key="index" class="select-item-span">{{item.label}}</span>
                        </div>
                         <div class="select-layer">
                            <span class="leyer-item-name">科室管理权限范围:</span>
                            <selectTree :inData="DepartmentManagementAuthority" @reback="getDepartmentManagementAuthoritySelect"></selectTree>
                            <Icon type="md-star" />
                        </div>
                        <!-- <div class="select-layer">
                            <span class="leyer-item-name">科室管理权限范围:</span>
                            <el-select v-model="DepartmentManagementAuthoritySelect" placeholder="本账号范围内可多选" multiple size="mini"  style="flex:1">
                                <el-option
                                    v-for="(item) in DepartmentManagementAuthority"
                                    :key="item.subCode"
                                    :label="item.subName"
                                    :value="item.subName">
                                </el-option>
                            </el-select>
                            <Icon type="md-star" />
                        </div> -->
                        <div class="select-item-list">
                           <span v-for="(item,index) in DepartmentManagementAuthoritySelect" :key="index" class="select-item-span">{{item.subName}}</span>
                        </div>
                    </div>	
                    <div class="sub-add"><el-button type="primary" size="mini"  @click.native="addSub">确定</el-button></div>	
                </div>
                <div class="mark-invite" v-else-if="isAdd===2">
                    <p class="mark-add-title">邀请协作</p>
                    <div class="mark-invite-input">
                        <div class="invite-iput-layer">
                            <span class="invite-input-name">账号/手机号:</span>
                            <el-input placeholder="请输入对方账号和手机号" v-model="inviteNumber"></el-input>
                            <Icon type="md-star" />
                        </div>
                        <div class="invite-iput-layer">
                            <span class="invite-input-name">协作范围:</span>
                            <el-select v-model="CollaborationScopeOk" placeholder="请选择科室">
                                <el-option
                                    v-for="item in CollaborationScope"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name">
                                </el-option>
                            </el-select>
                            <Icon type="md-star" />
                        </div>
                    </div>
                    <div class="mark-invite-check">
                        <p class="mark-invite-check-title">业务范围</p>
                        <div class="mark-invite-check-item">
                            <el-checkbox :label="item.name" v-for="(item,index) in businessScope" :key="index" v-model="item.select"></el-checkbox>
                        </div>
                        
                    </div>
                    <div class="mark-invite-sub"><el-button type="primary" size="mini" @click="inviteSub">确定</el-button></div>
                </div>
        </el-dialog>
		远程教育系统
	</div>
</template>

<script>
    import { mapState } from 'vuex'
    import selftag from '../../../public/publicComponents/selftag.vue'
    import markLayer from '../../../public/publicComponents/markLayer.vue'
    import publicList from '../../../public/publicComponents/publicList.vue'
    import selectTree from '../../../public/publicComponents/selectTree.vue'
    import sensitiveWordCheck from '../../../public/publicJs/sensitiveWordCheck.js'
    import { fetchHospitalDepts , fetchDoctorSubSystems , hospitalDepartmentManagementSubsystemList , createUser } from '../../../api/apiAll.js'
    
	export default {
        watch:{
        },
        computed:{
			...mapState({
                userInfo:state => state.user.userInfo,
                userSelfInfo:state => state.user.userSelfInfo
			})
		},
		data () {
			return {
                addData:{//新增时，收集信息
                    name:'',//姓名
                    phone:'',//电话
                    account:'',//账号
                    passwd:'',//密码 
                   
                },
                deptIds:[],//科室数组 (已选择)
                DoctorBusinessScope:[],//医生业务范围选项
                DoctorBusinessScopeSelect:[],//‘医生业务范围’已选择项id
                DepartmentManagementAuthority:[//科室管理权限范围选择项
                ],
                DepartmentManagementAuthoritySelect:[],//‘科室管理权限范围’已选择项
                departmentlist:[//科室列表
					// {deptId:'',deptName:''}
                ],
                /********************************** */
                otrue:false,
                tabPosition: 'left',
                leftListDepartment:{//本院人员的科室标签列表
                    index:0,
                    more:true,
                    title:'科室',
                    list:[
                        {
                            text:'全部',
                        },
                        {
                            text:'急诊科'
                        },
                        {
                            text:'骨科'
                        },
                        {
                            text:'普外科'
                        },
                        {
                            text:'肿瘤科'
                        },
                        {
                            text:'脑病科'
                        },
                    ]
                },
                rightListDepartment:{//院外协作人员的科室标签列表
                    more:true,
                    title:'科室',
                    list:[
                        {
                            text:'全部'
                        },
                        {
                            text:'急诊科'
                        },
                        {
                            text:'骨科'
                        },
                        {
                            text:'普外科'
                        },
                        {
                            text:'肿瘤科'
                        },
                        {
                            text:'脑病科'
                        },
                    ]
                },
                rightListHospital:{//院外协作人员的医院标签列表
                    more:true,
                    title:'科室',
                    list:[
                        {
                            text:'全部'
                        },
                        {
                            text:'急诊科'
                        },
                        {
                            text:'骨科'
                        },
                        {
                            text:'普外科'
                        },
                        {
                            text:'肿瘤科'
                        },
                        {
                            text:'脑病科'
                        },
                    ]
                },
                isAdd:1,//1是新增弹窗，2是邀请弹窗，其余隐藏弹窗，建议选0
                inviteNumber:'',
                CollaborationScopeOk:null,
                CollaborationScope:[//协作范围科室选择列表
					{name:'全部'},
					{name:'糖尿病康复科'},
					{name:'新生儿保健科'},
					{name:'XXXXXXXX'}
                ],
                businessScope:[//业务范围选择项
					{
						name:'远程门诊',
						select:false
					},
					{
						name:'远程会诊',
						select:false
					},
					{
						name:'远程协作',
						select:true
					},
					{
						name:'家医服务',
						select:false
					}
                ],
                newModules:{
                    columns:[
                        {
                            prop:"department",
                            label:"科室"
                        },
                        {
                            prop:"name",
                            label:"姓名"
                        },
                        {
                            prop:"accountNumber",
                            label:"账号"
                        },
                        {
                            prop:"phone",
                            label:"手机号"
                        },
                        {
                            prop:"businessScope",
                            label:"业务范围"
                        },
                        {
                            prop:"registeredTime",
                            label:"注册时间"
                        },
                        {
                            prop:"departmentManagement",
                            label:"科室管理"
                        }
                    ],
                    tableData:[
                        {
                            id: "91F0B9D25A474B6FA0CDBAC872035984",
                            department:'急诊科',
                            name:'Verge',
                            accountNumber:'201805261024526',
                            phone:'一连串字符',
                            businessScope:'10',
                            registeredTime:'2018-03-22',
                            departmentManagement:'有'
                        },
                        {
                            id: "91F0B9D25A474B6FA0CDBAC872035984",
                            department:'急诊科',
                            name:'Verge',
                            accountNumber:'201805261024526',
                            phone:'一连串字符',
                            businessScope:'10',
                            registeredTime:'2018-03-22',
                            departmentManagement:'有'
                        },
                    ],
                    tableBtn: [
                        // {
                        //     name: "新增",
                        //     method: (index, row) => {
                        //         console.log(index)
                        //         console.log(row)
                        //         // this.handleDel(index, row);
                        //     }
                        // },
                        {
                            name: "编辑",
                            method: (index, row) => {
                                // constants.log(index)
                                // connect.log(row)
                                // this.handleDel(index, row);
                            }
                        }
                    ]
                    
                },
                inviteModules:{
                    columns: [
                        {
                            prop:"hospital",
                            label:"医院"
                        },
                        {
                            prop:"department",
                            label:"科室"
                        },
                        {
                            prop:"name",
                            label:"姓名"
                        },
                        // {
                        //     prop:"age",
                        //     label:"年龄"
                        // },
                        {
                            prop:"accountNumber",
                            label:"账号"
                        },
                        {
                            prop:"phone",
                            label:"手机号"
                        },
                        {
                            prop:"businessScope",
                            label:"业务范围"
                        },
                        {
                            prop:"enterTime",
                            label:"入住时间"
                        }
                    ],
                    tableData: [
                        {
                            id: "91F0B9D25A474B6FA0CDBAC872035984",
                            hospital:'重庆冠方智慧医院',
                            department:'急诊科',
                            name:'Verge',
                            accountNumber:'201805261024526',
                            phone:'一连串字符',
                            businessScope:'10',
                            enterTime:'2018-03-22'
                        },
                         {
                            id: "91F0B9D25A474B6FA0CDBAC872035984",
                            hospital:'重庆冠方智慧医院',
                            department:'急诊科',
                            name:'Verge',
                            accountNumber:'201805261024526',
                            phone:'一连串字符',
                            businessScope:'10',
                            enterTime:'2018-03-22'
                        },
                         {
                            id: "91F0B9D25A474B6FA0CDBAC872035984",
                            hospital:'重庆冠方智慧医院',
                            department:'急诊科',
                            name:'Verge',
                            accountNumber:'201805261024526',
                            phone:'一连串字符',
                            businessScope:'10',
                            enterTime:'2018-03-22'
                        },
                    ],
                    tableBtn: [
                        {
                            name: "新增",
                            method: (index, row) => {
                                console.log(index)
                                console.log(row)
                                // this.handleDel(index, row);
                            }
                        },
                        {
                            name: "编辑",
                            method: (index, row) => {
                                this.handleDel(index, row);
                            }
                        }
                    ]
                },
			}
        },
        watch:{
            tabPosition(n,o){
                console.log(n)
            }
        },
		methods:{
            /**
             * 取出嵌套数组需要的值
             */
            iterationArr(a,b){
                "use strict"
                if(Object.prototype.toString.call(a)!=="[object Array]")return{ok:false,mag:'传参需要是数组',data:null}
                const arr = [];
                const setFun = data =>{
                    for(const i of data){
                        for(const j of b){
                            if(j == i.id){
                                arr.push(i)
                            }
                        }
                        if(i.children.length>0){
                            setFun(i.children)
                        }
                    }
                }
                setFun(a);
                return{ok:true,mag:'',data:arr};
            },

            /**
             * 设置‘医生业务范围’已选择项
             */
            getDoctorBusinessScopeSelect(data){
                const result = this.iterationArr(this.DoctorBusinessScope,data);
                this.DoctorBusinessScopeSelect = result.ok?result.data:[];
            },
            getDepartmentManagementAuthoritySelect(data){
                const result = this.iterationArr(this.DepartmentManagementAuthority,data);
                this.DepartmentManagementAuthoritySelect = result.ok?result.data:[];
                console.log(this.DepartmentManagementAuthoritySelect)
            },
            /**
             * 大致检查新增用户数据是否正确,是否为空，是否有敏感字
             */
            checkAddInfo(){
                const option = {
                    account:{
                        zh:'账号',
                        data:this.addData.account
                    },
                    name:{
                        zh:'姓名',
                        data:this.addData.name
                    },
                    passwd:{
                        zh:'密码',
                        data: this.addData.passwd,
                    }
                   
                };
                for(const i in option){
                    if(!option[i].data)return{
                        ok:false,
                        msg:`${option[i].zh}为空`
                    }
                    const isSensitive = sensitiveWordCheck(option[i].data);
                    if(!isSensitive.ok)return{
                        ok:false,
                        msg:`${option[i].zh}包含敏感字${isSensitive.key}`
                    }
                }
                return {
                    ok:true,
                    msg:``
                }
            },

            /**
             * 获取新增用户提交数据
             */
            getAddSubData(){
                const options = {//提交数据
                    account:this.addData.account,
                    name:this.addData.name,
                    passwd:this.addData.passwd,
                    deptIds:[],
                    phone:this.addData.phone,
                    authorizes:[],
                    userType:'0'//用户类型 0(医生),1(患者),2(医院管理员),3(超级管理员)
                };
                const deptIds = [];//已选中的科室列表。element-ui 不能绑定json，只能按照其中一个属性获取到该json,这个过程比较恶心，有众多for循环
                const arr = [];//已选中的科室管理权限范围列表。
                for(const i of this.DoctorBusinessScopeSelect){//这个'医生业务范围'由于自己写的（非element-ui），所以可以直接获取json，直接循环取出值
                    options.authorizes.push({
                        type:2,
                        authorityId:i.id
                    })
                }
                for(const i of this.DepartmentManagementAuthoritySelect){
                    options.authorizes.push({
                        type:1,
                        authorityId:i.id
                    })
                }
                for(const i of this.deptIds){//获取被选中的科室列表
                    for(const j of this.departmentlist){
                        j.deptName===i?deptIds.push(j):null;
                    }
                }
                for(const i of deptIds){//取出被选中的科室列表的id，放入需要的数据组
                    options.deptIds.push(i.deptId)
                }
                console.log(options)
                return options;
            },
            /**
             * 新增用户
             */
            async addSub(){
                // console.log(this.userInfo.token)
                // console.log('新增')
                // const testData = this.checkAddInfo();
                // if(!testData.ok){
                //     this.$message({
                //         type: 'info',
                //         message: `${ testData.msg }`
                //     });
                //     return;
                // }
                const postData = this.getAddSubData();
                const postQuery = {token:this.userInfo.token}
                const res = await createUser(postQuery,postData);
                console.log(res)
                if(res.data.errCode === 0){
                    this.$message({
                        type: 'info',
                        message: `添加成功`
                    });
                }else{
                    this.$message({
                        type: 'info',
                        message: `添加失败`
                    });
                }
            },
            
            /**
             * 获取科室列表
             */
            async getDepartmentList(){
                const res = await fetchHospitalDepts({
                    orgCode:this.userSelfInfo.orgCode
                });
                if(res.data.errCode === 0){
                    this.departmentlist = res.data.body;
                    // console.log(this.departmentlist)
                }else{
                    this.$notify.error({
                        title: '数据获取失败',
                        message: res.data.errMsg
                    });
                }
            },

            /**
             * 获取 3.2.1.首页-医院医生业务子系统列表（新）
             * 
             */
            async fetchDoctorSubSystems(){
                const res = await fetchDoctorSubSystems({
                    token:this.userInfo.token,
                    orgCode:this.userSelfInfo.orgCode
                });
                if(res.data.errCode === 0){
                    this.DoctorBusinessScope = res.data.body;
                    console.log(this.DoctorBusinessScope)
                }else{
                    this.$notify.error({
                        title: '数据获取失败',
                        message: res.data.errMsg
                    });
                }
            },

            /**
             * 获取 3.1.首页-医院科室管理子系统列表
             * 
             */
            async hospitalDepartmentManagementSubsystemList(){
                const res = await hospitalDepartmentManagementSubsystemList({
                    token:this.userInfo.token,
                    orgCode:this.userSelfInfo.orgCode
                });
                if(res.data.errCode === 0){
                    this.DepartmentManagementAuthority = res.data.body.map(item=>{
                        return Object.assign({},{
                           children:[],
                           id:item.subCode,
                           label:item.subName,
                           select:item.checkbox
                        },item)
                    });
                    // this.DepartmentManagementAuthority = res.data.body;
                    console.log( this.DepartmentManagementAuthority)
                }else{
                    this.$notify.error({
                        title: '数据获取失败',
                        message: res.data.errMsg
                    });
                }
               
            },
            /******************** */
            gitIndex(index){
                // console.log(456)
                // console.log(index)
            },
            
            inviteSub(){

                console.log('邀请')
            },
            alertStatus(num){//操作弹框状态，传入1个数字，1表示新增弹窗，2表示邀请弹窗，其余隐藏弹窗，建议选0
                if(Object.prototype.toString.call(num)!=="[object Number]")return;
                num===1||num===2?this.otrue=true:this.otrue=false;
                this.isAdd = num;
            },
            test111(data){
               
                console.log(data)
            }
        },
        components:{
            selftag,
            markLayer,
            publicList,
            selectTree
        },
		async created(){
            this.getDepartmentList();
            this.fetchDoctorSubSystems();
            this.hospitalDepartmentManagementSubsystemList();
           
            // console.log(this.$store.state.user)
		}
	}
</script>

<style >
	.Account-authority{

    }
    .Account-authority>.el-tabs{
        background: #FFF;
        border: 1px solid var(--color5);
        box-shadow: 0 0.06rem 0.36rem 0 rgba(0,62,100,0.04);
        border-radius: 0.04rem;
        
    }
    .left-model-head-operating .el-input__inner{
        border-radius: 0.22rem;
    }
    .left-model-head{
        display: flex;
        justify-content: space-between;
    }
    .left-model-head-operating{
        display: flex;
        padding-right: 0.7rem;
    }
    .left-model-head-operating .el-icon-search:before{
        color: var(--color6);
    }
    .left-model-head-operating>.el-input{
        margin-right: 0.99rem;
    }
    .left-model-head-operating .el-button{
        width: 1.96rem;
        height: 0.4rem;
    }
    .left-model-head-operating ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color: var(--color6);
    }
    .left-model-head-operating :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: var(--color6);
    }
    .left-model-head-operating ::-moz-placeholder { /* Mozilla Firefox 19+ */
       color: var(--color6);
    }
    .left-model-head-operating :-ms-input-placeholder { /* Internet Explorer 10-11 */
       color: var(--color6);
    }
    .right-model-head{
        display: flex;
        justify-content: space-between;
    }
    .right-model-head-operating{
        display: flex;
        padding-right: 0.7rem;
    }
    .right-model-head-operating>.el-input{
        margin-right: 0.99rem;
        height: 0.4rem;
    }
    .right-model-head-operating .el-button{
        width: 1.96rem;
        height: 0.4rem;
        background-color: var(--bgColor7);
        transition: .3s;
    }
    .right-model-head-operating .el-button:hover{
        opacity: 0.6;
    }
    .right-model-head-operating .el-input__inner{
        border-radius: 0.22rem;
       
    }
    .select-div{
        text-align: center;
    }
    
    .left-btn-select,.left-btn-select span{
        background-color: var(--bgColor6) !important;
        border-color: var(--bgColor6) !important;
        border-radius: 0.04rem 0 0 0.04rem !important;
    }
    .right-btn-select,.right-btn-select span{
        background-color: var(--bgColor6) !important;
        border-color: var(--bgColor6) !important;
        border-radius: 0 0.04rem 0.04rem 0 !important;
    }
    .select-div label{
        width: 1.18rem;
    }
    .select-div .el-radio-group label .el-radio-button__inner{
        width: 100% !important; 
    }
    .select-item-list{
        min-height: 0.86rem;
        padding-left: 0.96rem;
        padding-right: 0.52rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        overflow: hidden;
    }
    .select-item-span{
        font-family: var(--fontFamily3);
        color: var(--color7);
        letter-spacing: 0;
        line-height: 0.27rem;
        margin-right: 0.25rem;
    }
    /******************************************************/
    .mark-content{
		width: 6.02rem;
		/* height: 602px; */
		background: var(--whiteColor);
		border: 1px solid var(--color8);
		border-radius: 0.048rem;
		padding-left: 0.52rem;
		padding-right: 0.52rem;
	}
	.mark-add-title{
		font-family: var(--fontFamily3);
		font-size: var(--fontSize7);
		color: var(--color7);
		line-height: 0.33rem;
		text-align: center;
		margin-bottom: 0.24rem;
		margin-top: 1.1%;
	}
	.input-layer{
		margin-bottom: 0.18rem;
		display: flex;
	}
	.select-layer{
		display: flex;
		align-items: center;
        padding-right: 0.52rem;
	}
	
	.leyer-item{
		
		flex: 1;
		display: flex;
		/* justify-content: space-around; */
		align-items: center;
	}
	.leyer-item-name{
		/* width: 20%; */
	}
	.leyer-item .el-input {
		width: 60%;
	}
	.check-div{
		margin-top: 0.25rem;
	}
	.check-div-content{
		display: flex;
	}
	.check-div-item{
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: center;
	}
	.has-border{
		border: 2px dashed  #D8DFE5;
		border-radius: 5px;
	}
	.check-div-item .el-checkbox{
		margin-left: 0;
	}
	.check-div-item>span{
		/* font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #323C47;
		letter-spacing: 0;
		line-height: 27px; */
		height: 0.27rem;
	}
	.sub-add{
		margin-top: 0.35rem;
		margin-bottom: 0.17rem;
	}
	.sub-add>.el-button{
		width: 100%;
		height: 0.4rem;
		font-size: var(--fontSize1);
		
	}
	.leyer-item>.ivu-icon-md-star{
		color: red;
		margin-left: 0.12rem;
	}
	.select-layer>.ivu-icon-md-star{
		color: red;
		margin-left: 0.12rem;
	}
	.invite-iput-layer{
		display: flex;
		align-items: center;
		margin-bottom: 0.18rem;
	}
	.invite-input-name{
		flex: 1;
	}
	.invite-iput-layer .el-input{
		flex: 5;
	}
	.invite-iput-layer>.ivu-icon-md-star{
		color: red;
		margin-left: 0.12rem;
	}
	.invite-iput-layer .el-select{
		flex: 5;
	}
	.mark-invite-check{
		border: 1px solid var(--borderColor1);
		border-radius: 0.04rem;
		margin-right: 0.24rem;
		padding-top: 0.13rem;
		padding-left: 0.1rem;
		padding-bottom: 0.2rem;
		margin-bottom: 0.57rem;
	}
	.mark-invite-check-title{
		color: var(--color9);
	}
	.mark-invite-sub{
		padding-bottom: 0.32rem;
	}
	.mark-invite-sub>.el-button{
		width: 100%;
		height: 0.4rem;
    }
    
</style>