<template>
	<div class="super-management">
		超级管理员
        <alertTree :inData="testData" @reback="getSelect" v-if="showAlertTree"></alertTree>
        <div class="super-management-top">
            <search></search>
        </div>
        <div class="super-management-middle">
           <table class="super-management-middle-table">
               <thead>
                    <tr class="super-management-middle-table-tr table-thead-tr">
                       <th ><span>{{tableData.head.name||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.account||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.subSystemNum||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.deptNum||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.deptManageNum||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.doctorNum||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.superOrgNum||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.childOrgNum||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.teamNum||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.consNum||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.deviceNum||'缺失'}}</span></th>
                       <th v-if="tableData.operating.length>0"><span>操作</span></th>
                    </tr>
               </thead>
               <tbody>
                   <tr v-for="(item,index) in tableData.data" :key="index" class="super-management-middle-table-tr table-tbody-tr" @click="setNowItem(item)">
                       <th><span>{{item.name}}</span></th>
                       <th><span>{{item.account}}</span></th>
                       <th @click="subSystemNum({type:'subSystemNum',value:item})"><span>{{item.subSystemNum||'缺失'}}</span></th>
                       <th @click="deptNum({type:'deptNum',value:item})"><span>{{item.deptNum||'缺失'}}</span></th>
                       <th @click="deptManageNum({type:'deptManageNum',value:item})"><span>{{item.deptManageNum||'缺失'}}</span></th>
                       <th @click="doctorNum({type:'doctorNum',value:item})"><span>{{item.doctorNum||'缺失'}}</span></th>
                       <th @click="superOrgNum({type:'superOrgNum',value:item})"><span>{{item.superOrgNum||'缺失'}}</span></th>
                       <th @click="superOrgNum({type:'childOrgNum',value:item})"><span>{{item.childOrgNum||'缺失'}}</span></th>
                       <th @click="teamNum({type:'teamNum',value:item})"><span>{{item.teamNum||'缺失'}}</span></th>
                       <th @click="consNum({type:'consNum',value:item})"><span>{{item.consNum||'缺失'}}</span></th>
                       <th ><span>{{item.deviceNum}}</span></th>
                       <th v-if="tableData.operating.length>0">
                           <span v-for="(v,k) in tableData.operating" :key="k" class="operating-span">
                               <el-button type="primary" size="mini" @click="btnClick(v,item)">{{v.name}}</el-button>
                            </span>
                        </th>
                   </tr>
               </tbody>
           </table>
           <Modal
                v-model="showAdd"
                title="新增医院"
                @on-ok="sureAdd"
                @on-cancel="cancelAdd">
                <div class="add-data">
                    <div class="data-item">
                        <span>医院名:</span>
                        <el-input
                            placeholder="请输入内容"
                            v-model="addHospitalInfo.name"
                            clearable>
                        </el-input>
                    </div>
                    <div class="data-item">
                        <span>账号:</span>
                        <el-input
                            placeholder="请输入内容"
                            v-model="addHospitalInfo.account"
                            clearable>
                        </el-input>
                    </div>
                    <div class="data-item">
                        <span>密码:</span>
                        <el-input
                            placeholder="请输入内容"
                            v-model="addHospitalInfo.passwd"
                            type="password"
                            clearable>
                        </el-input>
                    </div>
                </div>
           </Modal>
           <div class="add-hospital">
               <el-button type="danger" @click="alertAddMark">新增医院</el-button>
           </div>
        </div>
        <!-- 科室弹出框 -->
        <Modal
            :styles="{width:'323px'}"
            footer-hide
            v-model="department.show"
            title="科室"
            @on-ok="departmentOk"
            @on-cancel="departmentCancel">
            <div class="department-out">
                <div class="department-list">
                    <ul>
                        <li v-for="(item,index) in department.list" :key="index" class="department-li">
                            <span>{{item.deptName}}</span>
                            <div class="btn-div">
                                <i class="iconfont super-management-del-Department" @click="deleteDepartment(item,index)">&#xe618;</i>
                                <!-- <el-button type="danger" size="mini" @click="deleteDepartment(item,index)">删除</el-button> -->
                                <!-- <el-button type="primary" size="mini">修改</el-button> -->
                            </div>
                            
                        </li>
                    </ul>
                </div>
                <div class="add-department" v-if="department.showAdd">
                    <input type="text" v-model="department.addDepartmentName">
                    <i class="iconfont msg-icon" @click="closeDepartmentAdd">&#xe618;</i>
                </div>
                
                <div class="department-add">
                    <el-button type="primary" @click="showDepartmentAdd"> {{department.showAdd?"保存":"新增"}} </el-button>
                </div>
            </div>
        </Modal>
        <!-- 编辑按钮弹窗 -->
        <el-dialog title="收货地址" :visible.sync="editHospital.dialogFormVisible">
            <el-form>
                <el-form-item label="医院名">
                    <el-input v-model="editHospital.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-form>
                <el-form-item label="密码">
                    <el-input v-model="editHospital.pwd" autocomplete="off" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="editHospital.dialogFormVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="subInfo">确 定</el-button>
            </div>
        </el-dialog>
        <Spin size="large" fix v-if="spinShow"></Spin>
	</div>
</template>

<script>
import { 
    fetchHospitalList, fetchAllSubSystem ,fetchHospitalDepts,fetchHospitalRel,getSettingsList,initializeTheCreationOfHospital,deleteHospitalDept,
    createHospitalDept, updateSubSystemRel, updateHospital
} from "../../api/apiAll.js"; 
import { mapState } from "vuex";
import search from "../../public/publicComponents/search.vue";
import publicList from "../../public/publicComponents/publicList.vue";
import alertTree from "../../public/publicComponents/alertTree.vue";
import selfTab from "../../public/publicComponents/selfTab.vue";
import sensitiveWordCheck from '../../public/publicJs/sensitiveWordCheck.js'
export default {
    components: {
        search,
        publicList,
        alertTree,
        selfTab
    },
    data() {
        return {
            spinShow:false,//是否显示loading
            showAlertTree:false,
            showAdd:false,//是否显示添加医院
            addHospitalInfo:{//手机添加医院的信息
                name:'',
                account:'',
                passwd:''
            },
            nowItem:null,
            department:{//科室状态管理   
                show:false,//是否显示科室弹窗 
                showAdd:false,
                addDepartmentName:'',//新增科室的名称
                list:[]//科室列表
            },
            editHospital:{//编辑医院信息    
                dialogFormVisible:false,//是否显示编辑医院弹窗
                name:'',//医院名
                pwd:'',//密码
                obj:null
            },
            testData:{
                title:'test title',
                tag:null,
                canClick:true,
                show:false,
                data:[{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                        id: 9,
                        label: '三级 1-1-1'
                        }, {
                        id: 10,
                        label: '三级 1-1-2'
                        }]
                    }]
                    }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                    }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
            },
            tableData:{
                head:{},
                data:[],
                operating:[
                    {
                        name:'编辑'
                    },
                    // {
                    //     name:'删除'
                    // }
                ]
            },
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    methods: {
        getSelect(item){
            console.log(item)
            // return;
            const table = {
                subSystemNum:async data=>{
                    console.log('enter')
                    const res = await updateSubSystemRel({token:this.userState.token},{
                        hospitalId:this.nowItem.id||'',
                        subCodes:item.select
                    });
                    console.log(res);
                    if(res.data && res.data.errCode === 0){
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getTableData()
                        // Promise.all([this.subSystemNum({type:'subSystemNum',value:item.tag.value}),this.getTableData()])
                        //     .then(responense=>console.log(responense))
                        //     .catch(err=>console.log(err))
                        
                    }else{
                        this.$notify({
                            title: '失败',
                            message: '修改失败',
                            type: 'error'
                        });
                    }
                },
                default:data=>{}
            }
            if(table[item.tag.type]){
                table[item.tag.type]();
            }
            

        },
        setNowItem(item){
            console.log(item)
            this.nowItem = item
        },

        
        /**
         * 获取表格数据
         */
        async getTableData(data){
            const options = {
                token: this.userState.token,
                search: "",
                pageNum: 1,
                pageSize: 10
            };
            data = data || options;
            const res = await fetchHospitalList(data);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                this.tableData.head = res.data.body.header;
                this.tableData.data = res.data.body.data2.list;
            } else { //失败
                this.$notify.error({
                    title: "数据获取失败",
                    message: res.data.errMsg
                });
            }
        },

        /**
         * json转数组
         * 传入 json
         * 输出json
         * 输出格式：{
         *  ok:boolean,//是否成功，true表示成功
         *  msg:string,//错误信息
         *  data：array（null）//返回数据，若有错误，返回null，成功返回数组
         * }
         */
        jsonToArray(json){
            if(Object.prototype.toString.call(json)!=="[object Object]")return {ok:false,msg:'数据类型需要是json',data:null};
            const newJson = {//一种很坑的排序，扩展性差，但是没法，数据就这样返回的
                name:json.name||'',
                account:json.account||'',
                subSystemNum:json.subSystemNum||'',
                deptNum:json.deptNum||'',
                deptManageNum:json.deptManageNum||'',
                doctorNum:json.doctorNum||'',
                superOrgNum:json.superOrgNum||'',
                childOrgNum:json.childOrgNum||'',
                teamNum:json.teamNum||'',
                consNum:json.consNum||'',
                deviceNum:json.deviceNum||''
            }
            const reArr = [];
            for(let i in newJson){
                reArr.push({
                    key:i,
                    name:newJson[i]
                })
            }
            return {ok:true,msg:'',data:reArr} 
        },
        /**
         * 子系统
         */
        async subSystemNum(item){
            const res = await fetchAllSubSystem({
                hospitalId:item.value.id,
                token:this.userState.token
            });
            if(res.data&&res.data.errCode===0){
                console.log(res.data.body)
                this.testData.data = res.data.body.map(value=>{
                    value.id = value.subCode;
                    value.label = value.subName;
                    value.check = value.checkbox;
                    return value;
                });
                console.log(this.testData.data)
                this.testData.title = '子系统';
                this.testData.canClick = true;
                this.testData.show = true;
                this.testData.tag = item;
                this.testData = Object.assign({},this.testData)
                this.showAlertTree = true;
            }else{

            }
        },

        /**
         * 科室
         */
        async deptNum(item){
            console.log(item)
            const res = await fetchHospitalDepts({orgCode:item.value.code});
            console.log(res)
            if(res.data&&res.data.errCode===0){
                this.department.list = res.data.body
                this.department.show = true;
                return
                this.testData.data = res.data.body.map(value=>{
                    return{
                        id:value.deptId,
                        label:value.deptName
                    }
                });
                this.testData.title = '科室';
                this.testData.canClick = true;
                this.testData.show = true;
                this.testData.tag = item;
                this.showAlertTree = true;
            }else{

            }
        },
        /**
         * 科室管理员
         */
        async deptManageNum(item){//接口还没有
            console.log(item)
        },

        /**
         * 医生
         */
        async doctorNum(item){//接口还没有
            console.log(item)
        },

        /**
         * 上级医院，下级医院(后端说这两个其实就是一个玩意)
         */
        async superOrgNum(item){
            const res = await fetchHospitalRel({
                hospitalId:item.value.id,
                token:this.userState.token
            });
            console.log(res)
            // return;
            if(res.data&&res.data.errCode===0){
                this.testData.data = res.data.body.map(value=>{
                    value.label = value.subName;
                    value.label = value.name;
                    value.check = value.checked;
                    return value;
                });
                this.testData.title = item.type==='superOrgNum'?'上级医院':'下级医院';
                this.testData.canClick = true;
                this.testData.show = true;
                this.testData.tag = item;
                this.showAlertTree = true;
            }else{

            }
        },

        /**
         * 协作人员
         */
        async teamNum(item){
            const res = await getSettingsList({token:this.userState.token});
            console.log(res)
            if(res.data&&res.data.errCode===0){
                function iteration(arr){
                    const newArr = arr.map(value=>{
                        value.label = value.name;
                        if(value.children)iteration(value.children);
                        return value
                    });
                    return newArr
                }
                this.testData.data = iteration(res.data.body);
                // this.testData.data = res.data.body.map(value=>{
                //     value.label = value.name;
                //     return value;
                // });
                this.testData.title = '协作人员';
                this.testData.canClick = true;
                this.testData.show = true;
                this.testData.tag = item;
                this.showAlertTree = true;
            }else{

            }
        },

        /**
         * 会诊范围
         */
        async consNum(item){//接口暂时还没有
           console.log(item)
        },

        /**
         * 弹出’添加医院‘弹窗
         */
        alertAddMark(){
            this.showAdd = true;
        },

        /**
         * 确认添加医院
         */
        async sureAdd(){
            const arr = [sensitiveWordCheck(this.addHospitalInfo.name) , sensitiveWordCheck(this.addHospitalInfo.account) , sensitiveWordCheck(this.addHospitalInfo.passwd)];
            for(const i of arr){
                if(!i.ok){
                    this.$notify.error({
                        title: '错误',
                        message: i.msg
                    });
                    return;
                }
            }
            const res = await initializeTheCreationOfHospital({token:this.userState.token},this.addHospitalInfo);
            if(res.data&&res.data.errCode===0){
                this.$notify({
                    title: '成功',
                    message: '添加成功',
                    type: 'success'
                });
                this.getTableData();
            }else{
                this.$notify({
                    title: '失败',
                    message: '添加失败',
                    type: 'error'
                });
            }
        },

        /**
         * 科室弹窗 确认
         */
        departmentCancel(){},

        /**
         *  科室弹窗 取消
         */
        departmentOk(){

        },

        /**
         * 删除科室
         */
        async deleteDepartment(item,index){
            console.log(item);
            const res = await deleteHospitalDept({token: this.userState.token},{
                deptId:item.deptId,
                hospitalId:this.nowItem.id||''
            });
            console.log(res);
            if(res.data&&res.data.errCode===0){
                this.department.list.splice(index,1);
            }else{
                this.$notify({
                    title: '删除失败',
                    message: '添加失败',
                    type: 'error'
                });
            }
        },

        /**
         * 新增按钮被点击
         * 最新信息：点击新增 ->  显示输入框，新增二字变成保存 -> 再点击发送请求，根据返回值处理
         */
        async showDepartmentAdd(){
            this.department.showAdd = !this.department.showAdd;
            if(!this.department.showAdd){
                const res = await createHospitalDept({token: this.userState.token},{
                    hospitalId:this.nowItem.id||'',
                    deptName:this.department.addDepartmentName
                });
                console.log(res);
                if(res.data&&res.data.errCode===0){
                    this.$notify({
                        title: '成功',
                        message: '添加成功',
                        type: 'success'
                    });
                    this.department.addDepartmentName = '';
                    this.deptNum( {type:'deptNum',value:this.nowItem})
                }else{
                    this.$notify({
                        title: '失败',
                        message: '添加失败',
                        type: 'error'
                    });
                }
            }
        },

        /**
         * 关闭添加科室input
         */
        closeDepartmentAdd(){
            this.department.showAdd = false;
        },

        /**
         * 取消添加医院
         */
        cancelAdd(){},


        /**
         * 按钮被点击
         */
        btnClick(v,item){
            console.log(v)
            console.log(item)
            this.editHospital.obj = item;
            this.editHospital.name = item.name;
            this.editHospital.dialogFormVisible = true
        },

        /**
         * 确认提交修改医院信息
         */
        async subInfo(){
            const isPass = [sensitiveWordCheck(this.editHospital.name),sensitiveWordCheck(this.editHospital.pwd)];
            for(const i of isPass){
                if(!i.ok){
                    this.$notify({
                        title: '提交失败',
                        message: i.msg,
                        type: 'error'
                    });
                    return;
                }
            }
            console.log(this.editHospital)
            const options = [
                {token: this.userState.token},
                {
                    name:this.editHospital.name,
                    passwd:this.editHospital.pwd,
                    hospitalId:this.editHospital.obj.id
                }
            ];
            const res = await updateHospital(...options);
            console.log(res);
            if(res.data&&res.data.errCode===0){
                this.$notify({
                    title: '成功',
                    message: '修改成功',
                    type: 'success'
                });
                await this.getTableData();
                this.editHospital = {
                    name:'',
                    passwd:'',
                    obj:null,
                    dialogFormVisible:false
                }
            }else{
                this.$notify({
                    title: '失败',
                    message: "修改失败",
                    type: 'error'
                });
            }
            
        },

        canClick(){
            console.log('can click')
        }
    },
    async created() {
        this.getTableData();
    }
};
</script>

<style scoped>
.super-management {
}
.super-management-top{
    padding: 0.2rem;
}
.super-management-middle-table{
    width: 100%;
}
.super-management-middle-table-tr{
    border-bottom: 1px solid var(--borderColor1);
    height: 0.4rem;
    color: var(--color3);
}
.table-thead-tr span{
    font-weight: bold;
    cursor: pointer;
    font-size: var(--fontSize3);
}
.table-tbody-tr{
    
}
.operating-span{
    padding: 0.05rem;
}
.add-hospital{
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.2rem;
}
.data-item{
    display: flex;
    align-items: center;
}
.data-item>span{
    flex: 1;
}
.data-item>.el-input{
    flex:4;
}
.department-li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding-left: 0.4rem;
    padding-right: 0.4rem; */
}
.department-li{
    padding-top: 0.1rem;
}
.department-add{
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.15rem;
}
.department-add>button{
    width: 100%;
}
.add-department{
    border: 1px solid var(--borderColor1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.1rem;
    margin: 0 auto;
    margin-top: 0.1rem;
    border-radius: 0.04rem;
}
.add-department>input{
    border: none;
    outline:none;
    width: 80%;
}
.add-department>i{
    margin-left: 0.2rem;
    font-size: 0.12rem;
    cursor: pointer;
    flex: 1;
    /* margin-right: 0.2rem; */
}
.department-out{
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}
.super-management table  th{
    text-align: center;
}
.super-management-del-Department{
    font-size: var(--fontSize1);
    cursor: pointer;
}
</style>
<!--
    超级管理员界面
-->