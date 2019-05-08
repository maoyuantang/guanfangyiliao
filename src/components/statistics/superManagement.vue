<template>
	<div class="super-management">
        <alertTree :inData="testData" @reback="getSelect" v-if="showAlertTree"></alertTree>
        <div class="super-management-top">
            <search @searchValue="searchChange"></search>
        </div>
        <div class="super-management-middle">
           <table class="super-management-middle-table">
               <thead>
                    <tr class="super-management-middle-table-tr table-thead-tr">
                       <th ><span>{{tableData.head.name||'0'}}</span></th>
                       <th ><span>{{tableData.head.account||'0'}}</span></th>
                       <th ><span>{{tableData.head.subSystemNum||'0'}}</span></th>
                       <th ><span>{{tableData.head.deptNum||'0'}}</span></th>
                       <th ><span>{{tableData.head.deptManageNum||'0'}}</span></th>
                       <th ><span>{{tableData.head.doctorNum||'0'}}</span></th>
                       <th ><span>{{tableData.head.superOrgNum||'0'}}</span></th>
                       <!-- <th ><span>{{tableData.head.superOrgNum||'0'}}</span></th> -->
                       <th ><span>{{tableData.head.childOrgNum||'0'}}</span></th>
                       <th ><span>{{tableData.head.teamNum||'0'}}</span></th>
                       <th ><span>{{tableData.head.consNum||'0'}}</span></th>
                       <th ><span>{{tableData.head.deviceNum||'0'}}</span></th>
                       <th v-if="tableData.operating.length>0"><span>操作</span></th>
                    </tr>
               </thead>
               <tbody>
                   <tr v-for="(item,index) in tableData.data" :key="index" class="super-management-middle-table-tr table-tbody-tr" @click="setNowItem(item)">
                       <th><span>{{item.name}}</span></th>
                       <th><span>{{item.account}}</span></th>
                       <th @click="subSystemNum({type:'subSystemNum',value:item})"><span>{{item.subSystemNum||'0'}}</span></th>
                       <th @click="deptNum({type:'deptNum',value:item})"><span>{{item.deptNum||'0'}}</span></th>
                       <th @click="deptManageNum({type:'deptManageNum',value:item})"><span>{{item.deptManageNum||'0'}}</span></th>
                       <th @click="doctorNum({type:'doctorNum',value:item})"><span>{{item.doctorNum||'0'}}</span></th>
                       <th @click="superOrgNum({type:'superOrgNum',value:item})"><span>{{item.superOrgNum||'0'}}</span></th>
                       <th @click="superOrgNum({type:'childOrgNum',value:item})"><span>{{item.childOrgNum||'0'}}</span></th>
                       <th @click="teamNum({type:'teamNum',value:item})"><span>{{item.teamNum||'0'}}</span></th>
                       <th @click="consNum({type:'consNum',value:item})"><span>{{item.consNum||'0'}}</span></th>
                       <th ><span>{{item.deviceNum}}</span></th>
                       <th v-if="tableData.operating.length>0">
                           <span v-for="(v,k) in tableData.operating" :key="k" class="operating-span">
                               <el-button type="primary" size="mini" @click="btnClick(v,item)">{{v.name}}</el-button>
                            </span>
                        </th>
                   </tr>
               </tbody>
           </table>
           <tableNoMore v-if="tableData.data.length <= 0"></tableNoMore>
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
                        <span>医院编码:</span>
                        <el-input
                            placeholder="请输入内容"
                            v-model="addHospitalInfo.hospitalCode"
                            clearable>
                        </el-input>
                    </div>
                    <!-- -->
                    <div class="data-item">
                        <span>ws远程地址:</span>
                        <el-input
                            placeholder="请输入内容"
                            v-model="addHospitalInfo.wsAddress"
                            clearable>
                        </el-input>
                    </div>
                    <div class="data-item">
                        <span>ws内网地址:</span>
                        <el-input
                            placeholder="请输入内容"
                            v-model="addHospitalInfo.wsLocalAddress"
                            clearable>
                        </el-input>
                    </div>
                    <div class="data-item">
                        <span>ws访问代码:</span>
                        <el-input
                            placeholder="请输入内容"
                            v-model="addHospitalInfo.wsCode"
                            clearable>
                        </el-input>
                    </div>
                    <div class="data-item">
                        <span>ws访问账号:</span>
                        <el-input
                            placeholder="请输入内容"
                            v-model="addHospitalInfo.wsUser"
                            clearable>
                        </el-input>
                    </div>
                    <div class="data-item">
                        <span>ws访问凭证:</span>
                        <el-input
                            placeholder="请输入内容"
                            v-model="addHospitalInfo.wsCertificate"
                            clearable>
                        </el-input>
                    </div>
                    <!--  -->
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
           <div class="pagination">
               <el-pagination
                background
                layout="prev, pager, next"
                :page-size="page.pageSize"               
                :current-page="page.pageNum"
                :total="page.total"
                v-if="page.total!=0"
                @current-change="ChangePage"
            ></el-pagination>
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
                    <el-input
                    placeholder="请输入内容"
                    v-model="department.addDepartmentName"
                    size="mini"
                    @clear="closeDepartmentAdd"
                    clearable>
                    </el-input>
                    <!-- <input type="text" v-model="department.addDepartmentName">
                    <i class="iconfont msg-icon" @click="closeDepartmentAdd">&#xe618;</i> -->
                </div>
                
                <div class="department-add">
                    <el-button type="primary" @click="showDepartmentAdd"> {{department.showAdd?"保存":"新增"}} </el-button>
                </div>
            </div>
        </Modal>
        <!-- 编辑按钮弹窗 -->
        <el-dialog :close-on-click-modal="false" title="编辑医院" :visible.sync="editHospital.dialogFormVisible">
            <el-form>
                <el-form-item label="医院名">
                    <el-input v-model="editHospital.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <!--  -->
            <el-form>
                <el-form-item label="ws远程地址">
                    <el-input v-model="editHospital.wsAddress" autocomplete="off" @keydown="changeValue"></el-input>
                </el-form-item>
            </el-form>
            <el-form>
                <el-form-item label="ws内网地址">
                    <el-input v-model="editHospital.wsLocalAddress" autocomplete="off" @keydown="changeValue"></el-input>
                </el-form-item>
            </el-form>
            <el-form>
                <el-form-item label="ws访问代码">
                    <el-input v-model="editHospital.wsCode" autocomplete="off" @keydown="changeValue"></el-input>
                </el-form-item>
            </el-form>
            <el-form>
                <el-form-item label="ws访问账号">
                    <el-input v-model="editHospital.wsUser" autocomplete="off" @keydown="changeValue"></el-input>
                </el-form-item>
            </el-form>
            <el-form>
                <el-form-item label="ws访问凭证">
                    <el-input v-model="editHospital.wsCertificate" autocomplete="off" @keydown="changeValue"></el-input>
                </el-form-item>
            </el-form>
            <!--  -->
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
        <!-- <Modal
            :styles="{width:'323px'}"
            v-model="data2"
            title="协作"
            @on-ok="teamNumOk"
            @on-cancel="teamNumCancel">
            
        </Modal> -->
        <!-- <Tree :data="data2" show-checkbox @on-check-change="iviewTest" ref="iviewTree"></Tree> -->
	</div>
</template>

<script>
import { 
    fetchHospitalList, fetchAllSubSystem ,fetchHospitalDepts,fetchHospitalRel,getSettingsList,initializeTheCreationOfHospital,deleteHospitalDept,
    createHospitalDept, updateSubSystemRel, updateHospital, settingsUpdate, getConsultationTree, updateConsultationTree, updateHospitalRel
} from "../../api/apiAll.js"
import { mapState } from "vuex"
import search from "../../public/publicComponents/search.vue"
import publicList from "../../public/publicComponents/publicList.vue"
import alertTree from "../../public/publicComponents/alertTree.vue"
import selfTab from "../../public/publicComponents/selfTab.vue"
import sensitiveWordCheck from '../../public/publicJs/sensitiveWordCheck.js'
import createUUID from '../../public/publicJs/createUUID.js'
import tableNoMore from "../../public/publicComponents/tableNoMore.vue";
export default {
    components: {
        search,
        publicList,
        alertTree,
        selfTab,
        tableNoMore
    },
    data() {
        return {
            search: "",//搜索内容
            page:{//分页
                pageNum: 1,//当前页  
                pageSize: 10,//每页条数
                total:10//总条数
            },
            spinShow:false,//是否显示loading
            showAlertTree:false,
            showAdd:false,//是否显示添加医院
            addHospitalInfo:{//收集添加医院的信息
                name:'',//医院名
                hospitalCode:'',//医院吗
                account:'',//账号
                passwd:'',//密码
                wsAddress:'',//远程地址(新增)
                wsLocalAddress:'',//内网地址(新增)
                wsCode:'',//访问代码(新增)
                wsUser:'',//访问账号(新增)
                wsCertificate:'',//访问凭证(新增)
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
                wsAddress:'',//ws远程地址(新增)
                wsLocalAddress:'',//ws内网地址(新增)
                wsCode:'',//ws访问代码(新增)
                wsUser:'',//ws访问账号(新增)
                wsCertificate:'',//ws访问凭证(新增)
                obj:null,
                change:false,//是否修改(新增)  
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
        /**
         * 新增的几个属性，键盘按下直接默认修改了数据
         */
        changeValue(){
            this.editHospital.change = true;
        },
        /**
         * 搜索框数据
         */
        searchChange(data){
            // console.log(data);
            this.search = data;
            this.getTableData();
        },
        /**
         * 切换分页
         */
        async ChangePage(data){
            // console.log(data);
            const isOk = await this.getTableData(data);
            if(isOk){
                this.page.pageNum = data;
            } 
        },
        getSelect(item){
            // console.log(item)
            const table = {
                subSystemNum:async data=>{
                    const res = await updateSubSystemRel({token:this.userState.token},{
                        hospitalId:this.nowItem.id||'',
                        subCodes:item.select.map(item=>item.id)
                    });
                    // console.log(res);
                    if(res.data && res.data.errCode === 0){
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getTableData();
                        
                    }else{
                        this.$notify({
                            title: '失败',
                            message: '修改失败',
                            type: 'error'
                        });
                    }
                },
                superOrgNum:async data=>{
                    // console.log('make');
                    const postData = [
                        {token:this.userState.token},
                        {
                            hospitalId:item.tag.value.id,
                            superHospitalId:item.select.map(v=>v.id)
                        }
                    ];
                    const res = await updateHospitalRel(...postData);
                    // console.log(res);
                    if(res.data && res.data.errCode === 0){
                        // console.log('success');
                        this.getTableData();
                    }else{
                        // console.log('error')
                    }
                },
                childOrgNum:async data=>{
                    // console.log('make');
                    const postData = [
                        {token:this.userState.token},
                        {
                            hospitalId:item.tag.value.id,
                            superHospitalId:item.select.map(v=>v.id)
                        }
                    ];
                    const res = await updateHospitalRel(...postData);
                    // console.log(res);
                    if(res.data && res.data.errCode === 0){
                        // console.log('success');
                        this.getTableData();
                    }else{
                        // console.log('error')
                    }
                },
                teamNum:async data =>{
                    const setMap = (arr,tag) => {//拷贝原数组，找出被选值
                        return arr.map(item=>{
                            tag.forEach(v=>item.select = item.select?item.select:item.identification === v.identification);
                            item.children?setMap(item.children,tag):null;
                            return item
                        })
                    }
                    const deleteNoOption = arr =>{//过滤掉未被选中的选项
                        return arr.filter(item=>{
                            item.children?item.children=deleteNoOption(item.children):null
                            return item.select
                        })
                    }
                    const hintArr = arr =>{//递归映射数组
                        return arr.map(item=>{
                            const result = {};
                            result.id = item.id;
                            item.children&&item.children.length>0?result.children=hintArr(item.children):null;
                            return result;
                        })
                    }
                    const result = setMap(this.testData.data, item.select);
                    let fanal = deleteNoOption(result);
                     
                    fanal = hintArr(fanal);
                    const ask = [
                        {token:this.userState.token},
                        {
                            orgCode:item.tag.value.code,
                            data:fanal
                        }
                    ];
                    const res = await settingsUpdate(...ask);
                    // console.log(res);
                    if(res.data && res.data.errCode === 0){
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getTableData();
                    }else{
                        this.$notify({
                            title: '失败',
                            message: '修改失败',
                            type: 'error'
                        });
                    }
                },
                consNum: async data=>{
                    // console.log('enter')
                    const setMap = (arr,tag) => {//拷贝原数组，找出被选值
                        return arr.map(item=>{
                            tag.forEach(v=>item.ok = item.ok?item.ok:item.id === v.id);
                            item.children?setMap(item.children,tag):null;
                            return item
                        })
                    }
                    const deleteNoOption = arr =>{//过滤掉未被选中的选项
                        return arr.filter(item=>{
                            item.children?item.children=deleteNoOption(item.children):null
                            return item.ok
                        })
                    }
                    const hintArr = arr =>{//递归映射数组
                        return arr.map(item=>{
                            const result = {};
                            result.id = item.id;
                            item.children&&item.children.length>0?result.children=hintArr(item.children):null;
                            return result;
                        })
                    }
                    const result = setMap(this.testData.data, item.select);
                    let fanal = deleteNoOption(result);
                    fanal = hintArr(fanal);
                    // const postData = {
                    //     orgCode:this.testData.tag.value.code,
                    //     list:fanal
                    // }; 
                    const res = await updateConsultationTree(...[
                        {token:this.userState.token},
                        {
                            orgCode:this.testData.tag.value.code,
                            list:fanal
                        }
                    ]);
                    // console.log(res)
                    if(res.data.errCode === 0){
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getTableData();
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
            // console.log(item)
            this.nowItem = item
        },

        
        /**
         * 获取表格数据
         */
        async getTableData(pageNum){
            // console.log(pageNum)
            const options = {
                token: this.userState.token,
                search: this.search,
                pageNum: pageNum || this.page.pageNum,
                pageSize: this.page.pageSize
            };
            // data = data || options;
            const res = await fetchHospitalList(options);
            // console.log(res);
            if (res.data && res.data.errCode === 0) {
                this.tableData.head = res.data.body.header;
                this.tableData.data = res.data.body.data2.list;
                this.page.total = res.data.body.data2.total;
                return true;
            } else { //失败
                this.$notify.error({
                    title: "数据获取失败",
                    message: res.data.errMsg
                });
                return false;
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
                // console.log(res.data.body)
                this.testData.data = res.data.body.map(value=>{
                    value.id = value.subCode;
                    value.label = value.subName;
                    value.check = value.checkbox;
                    value.identification = createUUID()+ new Date().getTime();
                    return value;
                });
                // console.log(this.testData.data)
                this.testData.title = '子系统';
                this.testData.canClick = true;
                this.testData.show = true;
                this.testData.tag = item;
                this.testData = Object.assign({},this.testData)
                this.showAlertTree = true;
                // console.log(this.testData)
            }else{

            }
        },

        /**
         * 科室
         */
        async deptNum(item){
            // console.log(item)
            const res = await fetchHospitalDepts({orgCode:item.value.code});
            // console.log(res)
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
            // console.log('enter')
            const res = await fetchHospitalRel({
                hospitalId:item.value.id,
                token:this.userState.token
            });
            // console.log(res)
            // return;
            if(res.data&&res.data.errCode===0){
                this.testData.data = res.data.body.map(value=>{
                    value.label = value.subName;
                    value.label = value.name;
                    value.check = value.checked;
                    value.identification = createUUID()+ new Date().getTime();
                    // value.checkbox = value.checked;
                    return value;
                });
                this.testData.title = item.type==='superOrgNum'?'上级医院':'下级医院';
                this.testData.canClick = true;
                this.testData.show = true;
                this.testData.tag = item;
                this.showAlertTree = true;
                // console.log(this.testData)
            }else{

            }
        },

        /**
         * 协作人员
         */
        async teamNum(item){
            // console.log(123)
            const res = await getSettingsList({token:this.userState.token,orgCode:item.value.code});
            // console.log(res)
            if(res.data&&res.data.errCode===0){
                function iteration(arr){
                    const newArr = arr.map(value=>{
                        value.label = value.name;
                        value.check = value.checked;
                        value.identification = createUUID()+ new Date().getTime();
                        if(value.children)iteration(value.children);
                        return value
                    });
                    return newArr
                }
                const deleteOutSelect = arr => {//若不是全选，删除外层选中
                    for(const i of arr){
                        if(i.children && i.children.length>=1){
                            i.check = false;
                            i.checked = false;
                            deleteOutSelect(i.children)
                        }
                    }
                };
                let mid = iteration(res.data.body).map(item=>{
                    item.check = item.checked;
                    return item;
                });
                deleteOutSelect(mid);
                // this.testData.data = mid;
                // console.log(mid)
                this.testData.data = iteration(res.data.body).map(item=>{
                    item.check = item.checked;
                    return item;
                });
                // console.log(this.testData.data)
                this.testData.title = '协作人员';
                this.testData.canClick = true;
                this.testData.show = true;
                this.testData.tag = item;
                // console.log(this.testData)
                this.showAlertTree = true;
            }else{

            }
        },

        /**
         * 会诊范围
         */
        async consNum(item){
        //    console.log(item)
           const res = await getConsultationTree({
               token:this.userState.token,
               orgCode:item.value.code
           });
        //    console.log(res);
           if(res.data&&res.data.errCode===0){
                const handle = data => {
                   data.forEach(item=>{
                       item.check = item.select;
                       if(item.children){
                           handle(item.children)
                       }
                       item.identification = createUUID()+ new Date().getTime();
                       return item
                   })
                };
                handle(res.data.body);
                this.testData.data = res.data.body;
                this.testData.title = '会诊范围';
                this.testData.canClick = true;
                this.testData.show = true;
                this.testData.tag = item;
                // this.testData = Object.assign({},this.testData)
                this.showAlertTree = true;
           }else{
               this.$notify.error({
                    title: "数据获取失败",
                    message: res.data.errMsg
                });
           }
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
            // console.log(item);
            const res = await deleteHospitalDept({token: this.userState.token},{
                deptId:item.deptId,
                hospitalId:this.nowItem.id||''
            });
            // console.log(res);
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
                // console.log(res);
                if(res.data&&res.data.errCode===0){
                    this.$notify({
                        title: '成功',
                        message: '添加成功',
                        type: 'success'
                    });
                    this.department.addDepartmentName = '';
                    this.deptNum( {type:'deptNum',value:this.nowItem});
                    this.getTableData();
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
            // console.log(v)
            // console.log(item)
            this.editHospital.obj = item;
            this.editHospital.name = item.name;
            this.editHospital.wsAddress = item.wsAddress;
            this.editHospital.wsLocalAddress = item.wsLocalAddress;
            this.editHospital.wsCode = item.wsCode;
            this.editHospital.wsUser = item.wsUser;
            this.editHospital.wsCertificate = item.wsCertificate;
            this.editHospital.dialogFormVisible = true;
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
            // console.log(this.editHospital)
            const options = [
                {token: this.userState.token},
                {
                    name:this.editHospital.name,
                    passwd:this.editHospital.pwd,
                    hospitalId:this.editHospital.obj.id,
                    changeWs:this.editHospital.change,
                    wsAddress:this.editHospital.wsAddress,
                    wsLocalAddress:this.editHospital.wsLocalAddress,
                    wsCode:this.editHospital.wsCode,
                    wsUser:this.editHospital.wsUser,
                    wsCertificate:this.editHospital.wsCertificate,
                }
            ];  
            // console.log(options)
            // return 
            const res = await updateHospital(...options);
            // console.log(res);
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

        /**
         * 协作弹窗 取消按钮被点击
         */
        teamNumCancel(){

        },
        
        /**
         * 协作弹窗 确认按钮被点击
         */
        teamNumOk(){},

        canClick(){
            // console.log('can click')
        },
    },
    async created() {
        this.getTableData();
    }
};
</script>

<style>
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
    margin-bottom: 0.2rem;
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
    /* border: 1px solid var(--borderColor1); */
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
.pagination{
    text-align: center;
    width:100%;
}
.super-management .el-tree-node__content .el-checkbox__inner{
    width:14px !important;
    height: 14px !important;
}
.super-management .el-tree-node__content{
    margin:0 !important;
}
</style>
<!--
    超级管理员界面
-->