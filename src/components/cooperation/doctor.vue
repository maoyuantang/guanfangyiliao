<template>
    <!-- 远程协作系统 -->
    <div class="">
        <!-- 管理端 -->

        <!-- 医生端 -->
        <div class="cooperation">
            <div class="doc-title">
                <selftag :inData="oTab4" @reback="getOTab4"></selftag>
                <statisticsWay1 @reBack="getTjData"></statisticsWay1>
                <el-button class="startConsul" type="text" @click="initiateCollaboration() ">发起协作</el-button>
            </div>
            <div class="public-list">
                <el-table :data="docTableData" border style="width: 100%">
                    <el-table-column fixed prop="synergyNo" label="协作编号"></el-table-column>
                    <el-table-column fixed prop="applyDeptName" label="发起科室"></el-table-column>
                    <el-table-column fixed prop="applyUserName" label="发起医生"></el-table-column>
                    <el-table-column fixed prop="createTime" label="申请时间"></el-table-column>
                    <el-table-column fixed prop="synergyIntention" label="目的"></el-table-column>
                    <el-table-column fixed prop="synergyDeptName" label="协作科室"></el-table-column>
                    <el-table-column fixed prop="synergyUserName" label="协作医生"></el-table-column>
                    <el-table-column fixed prop="synergyStatus" label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.synergyStatus==0">未开始</span>
                            <span v-if="scope.row.synergyStatus==1">进行中</span>
                            <span v-if="scope.row.synergyStatus==2">结束</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button class="seeDanganClass" @click="goToDangan(scope.row)" type="text" size="small">病历</el-button>
                            <el-button class="inviteUserClass" @click="Invitation(scope.row)" type="text" size="small">邀请</el-button>
                            <el-button class="seeHistoryMessage" v-show="scope.row.synergyStatus==2" @click="historicalRecord(scope.row)" type="text" size="small">查看记录</el-button>
                            <el-button class="goTohuizhen" v-show="scope.row.synergyStatus==0 || scope.row.synergyStatus==1" @click="toConsultation(scope.row)" type="text" size="small">进入协作</el-button>
                            <el-button class="overClass" v-show="scope.row.synergyStatus==1" @click="xiezOver(scope.row)" type="text" size="small">结束</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align:center;padding:10px 0">
                    <el-pagination background layout="prev, pager, next" :total="docTotal" @current-change="changeCurrentDoc">
                    </el-pagination>
                </div>
            </div>
        </div>

        <!-- 发起协作弹框 -->
        <el-dialog class="invitationClass" title=" 发起协作" :visible.sync="centerDialogVisible" width="240px" hight="356px" center>
            <el-tree :data="invitationData1" :props="defaultProps" @check="handleCheckChange" show-checkbox></el-tree>
            <el-form ref="form" :model="startXiezuo" label-width="80px">
                <el-form-item class='invitationClassInput' label="病历">
                    <el-select v-model="startXiezuo.recordId" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class='invitationClassInput' label="目的">
                    <el-input v-model="startXiezuo.intention"></el-input>
                </el-form-item>

                <el-form-item class='invitationClassInputBtn'>
                    <el-button class='btnClass' type="primary" @click="launchXiezuo()" :disabled="disabledXie">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 查看记录 -->
        <div v-if="recordVisible">
            <el-dialog class="evaluateBox evaluateBox2" title=" 查看记录" :visible.sync="recordVisible" width="602px" hight="356px" center>
                <viewRecord :sessionId="sessionId"></viewRecord>
            </el-dialog>
        </div>
        <!-- 接收科室 -->
        <div v-if="departVisible">
            <el-dialog class="evaluateBox" title=" 接收科室" :visible.sync="departVisible" width="503px" hight="470px" center>
                <receiveDepartent :receptionDepartment="receptionDepartment"></receiveDepartent>
            </el-dialog>
        </div>
        <!-- 医生详情 -->
        <div v-if="doctorVisible">
            <el-dialog class="evaluateBox evaluateBox2" title=" 医生详情" :visible.sync="doctorVisible" width="602px" hight="356px" center>
                <doctorDetail :doctorDetailData="doctorDetailData"></doctorDetail>

            </el-dialog>
        </div>

        <!-- 邀请弹框 -->
        <div v-if="invitationVisible">
            <el-dialog class="invitationClass" title=" 邀请医生" :visible.sync="invitationVisible" width="240px" hight="356px" center>
                <el-tree :data="invitationData" :props="defaultProps" @check="handleCheckChangeInvita" show-checkbox></el-tree>
                <el-button class="btnClass" type="primary" @click="sureInvitation()">确认邀请</el-button>
            </el-dialog>
        </div>

        <!-- 聊天 -->
        <div v-if="chatVisible">
            <el-dialog class="chatDialog" title="" :visible.sync="chatVisible" width="680px">
                <chat :sessionId="sessionId" :doctorVis="doctorVis"></chat>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import {
    //筛选接口
    toolDept, //1.21.1.管理  科室  get
    toolSynergyStatus, //1.21.8.协作状态

    //获取列表
    managePage, //9.2协作管理列表
    manageStatistics, //9.3协作管理统计
    synergyPage, //9.4医生协作列表
    enableSynergyDoctor, //9.5获取可协作医生（本院、院外协作）
    sendSynergy, //9.6 提交  发起协作  表单数据
    receiveDept, //9.9本院参与科室
    // synergyChangeStatus, //9.7开始/结束协作
    synergyInto, //9.8进入协作
    receiveDoctor, //9.10本院参与医生
    sponsorConsultationInform,
    queryConsultationInformList,
    fetchHistoryMessage,
    synergyChangeStatus
} from "../../api/apiAll.js";
import { mapState } from "vuex";
import echarts from "../../plugs/echarts.js";
import publicList from "../../public/publicComponents/publicList.vue";
import selftag from "../../public/publicComponents/selftag.vue";
import chat from "../../public/publicComponents/chat.vue";
import normalTab from "../../public/publicComponents/normalTab.vue";
import normalColumnChart from "../../public/publicComponents/normalColumnChart.vue";
import search from "../../public/publicComponents/search.vue";
import statisticsWay from "../../public/publicComponents/statisticsWay.vue";
import statisticsWay1 from "../../public/publicComponents/statisticsWay1.vue";
import receiveDepartent from "./../xiezuo/receiveDepartent.vue";
import viewRecord from "./../xiezuo/viewRecord.vue";
import doctorDetail from "./../xiezuo/doctorDetail.vue";
import publicTime from "../../public/publicComponents/publicTime.vue";
export default {
    components: {
        selftag,
        publicList,
        normalTab,
        normalColumnChart,
        search,
        statisticsWay,
        statisticsWay1,
        chat,
        viewRecord,
        doctorDetail,
        receiveDepartent,
        publicTime
    },
    data() {
        return {
            disabledXie:false,
            pageSizeNum: 10,
            docTotal: 0,
            storyMessage: [],
            doctorVis: 0,
            receptionDepartment: [],
            doctorDetailData: [],
            invitationVisible: false,
            cellColor: [
                {
                    cell: 4,
                    value: "协作科室",
                    oclass: "ooRed"
                },
                {
                    cell: 5,
                    value: "协作医生",
                    oclass: "ooRed"
                }
            ],
            viewRecordVisible: false,
            invitationData1: [],
            invitationData: [],
            startXiezuo: {
                id: "",
                intention: "",
                recordId: "",
                receiverId: []
            },
            adminLists: [],
            adminPageNum: 1,
            adminTotal: 0,
            docToatal: 0,
            docPageNum: 1,
            //管理端  切换管理和统计
            manageOrCount: true, //切换管理和统计
            //医生端  发起协作  弹框
            centerDialogVisible: false, //显示 发起协作 弹框
            isShowChat: false, //聊天框（操作下）
            recordVisible: false, //查看记录

            //筛选返回值接收
            //管理1端  筛选工具栏  筛选返回值  接收参数
            initiateDepartmentId: "", //发起科室ID
            adminType: "", //协作科室
            adminStatus: "",
            searchValue: "", //返回搜索框输入   search
            //发起协作表单 数据接收参数
            startHz: {
                type: "SPECIALIST",
                deptId: " ",
                userId: " ",
                medicalHistory: " ",
                applicationTime: " ",
                cooperationPurpose: " ",
                cooperationHospitalDept: [
                    {
                        hospitalId: "1",
                        departmentsId: "2",
                        departmentListOO: []
                    }
                ]
            },
            //管理统计端  筛选工具栏  统计筛选返回值  接收参数
            time0: "", ///统计筛选开始时间
            time1: "", //统计筛选结束时间
            type: "MONTH", //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天
            doctorDate: "", //日期筛选
            //医生端  筛选工具栏  日期筛选返回值  接收参数
            // applyDepartmentId: "",//申请科室ID
            // departmentList: [], //科室列表
            acceptDepartmentId: "", //接收科室ID
            // departmentsId: "",//弹框内参数
            // time: '',
            statisticsType: "DAY",
            // element
            // 必备参数
            //时间筛选组件		必备参数
            time: null, // 时间筛选组件    statisticsWay
            //
            defaultProps: {
                label: "name",
                children: "children"
            },
            count: 1,
            //发起协作弹框  必备参数

            //管理切换（复用组件 ）
            oAdminTab: {
                i: 0, //选中的是第几项，类型为int(注意：从0开始计数)
                list: [
                    //选项列表，类型Array
                    {
                        en: "COOPERATION", //选项英文，类型 string
                        zh: "协作管理" //选项中文，类型string
                    },
                    {
                        en: "STATISTICS",
                        zh: "统计"
                    }
                ]
            },
            //筛选工具栏  管理1（自定义） 统计页面复用 oTab1
            oTab1: {
                more: true,
                title: "申请科室",
                list: []
            },
            oTab2: {
                more: false,
                title: "协作科室",
                list: []
            },
            oTab3: {
                more: false,
                title: "协作状态",
                list: []
            },
            oTab4: {
                more: false,
                title: "日期",
                list: [
                    {
                        text: "全部",
                        value: "ALL"
                    },
                    {
                        text: "今日",
                        value: "TODAY"
                    }
                ]
            },
            // 管理1表体（复用组件 传3个参数）
            adminTableData: [
                {
                    synergyNo: 123,
                    applyUserName: 123,
                    initiateTime: 123
                }
            ], //管理端列表
            adminColumns: [
                {
                    prop: "synergyNo",
                    label: "协作编号"
                },
                {
                    prop: "applyDeptName",
                    label: "申请科室"
                },
                {
                    prop: "applyUserName",
                    label: "发起医生"
                },
                {
                    prop: "initiateTime",
                    label: "发起时间"
                },
                {
                    prop: "synergyDeptNameLength",
                    label: "协作科室"
                },
                {
                    prop: "synergyUserNameLength",
                    label: "协作医生"
                },
                {
                    prop: "recordId",
                    label: "查看病历"
                },
                {
                    prop: "synergyTime",
                    label: "协作用时"
                },
                {
                    prop: "2",
                    label: "综合评价"
                },
                {
                    prop: "synergyStatus",
                    label: "状态"
                }
            ],
            tableBtn: [
                {
                    name: "查看记录",
                    oclass: "recordBtn",
                    method: (index, row) => {
                        this.historicalRecord(row);
                    }
                }
            ],
            chatVisible: false,
            //统计
            //申请科室统计图
            monthToYear: [],
            drawData: {
                dataAxis: [], //每个柱子代表的类名
                data: [], //具体数值
                title: "协作管理统计图", //图表标题
                total: 0
            },
            // 医生端
            //可协作医生列表
            hospitalList: [],
            //点击  进入协作  弹出chat（复用组件） chat 聊天框的参数
            sessionId: "",
            //医生端列表（自定义组件 ）
            docTableData: [],

            // oVisable: true,
            // evaluateVisible: false, //是否打开评价
            departVisible: false, //是否接收科室
            doctorVisible: false, //医生详情
            // groupVisible: false, //会诊评价
            xiezuoId: "",
            invitationSelectList: [],
            docTime0: "",
            docTime1: ""
        };
    },

    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },

    methods: {
        //进入协作
        async toConsultation(row) {
            this.sessionId = row.sessionId;

            let _this = this;
            let query = {
                token: this.userState.token,
                id: row.id
            };
            const res = await synergyInto(query);
            if (res.data && res.data.errCode === 0) {
                _this.chatVisible = true;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //协作
        async xiezOver(row) {
            if (row.applyUserId == this.userSelfInfo.userId) {
                this.invitationData1 = [];
                let _this = this;
                let query = {
                    token: this.userState.token,
                    id: row.id,
                    status: row.synergyStatus
                };
                const res = await synergyChangeStatus(query);
                if (res.data && res.data.errCode === 0) {
                    this.$notify.success({
                        title: "成功",
                        message: "请求成功"
                    });
                } else {
                    //失败
                    this.$notify.error({
                        title: "警告",
                        message: res.data.errMsg
                    });
                }
            } else {
                this.$notify.error({
                    title: "警告",
                    message: "不是本人发起的协作不能结束"
                });
            }
        },
        //病历
        goToDangan(row) {
            this.$router.push({
                path: "/docDetailed",
                query: {
                    id: row.userId
                }
            });
        },
        handleCheckChange(data, checked, indeterminate) {
            console.log(checked);
            let _this = this;
            $.each(checked.checkedNodes, function(index, text) {
                console.log(text);
                if (text.type == 3) {
                    console.log(_this.startXiezuo);
                    _this.startXiezuo.receiverId.push(text.id);
                }
            });
        },
        handleCheckChangeInvita(data, checked, indeterminate) {
            console.log(checked);
            let _this = this;
            $.each(checked.checkedNodes, function(index, text) {
                if (text.type == 3) {
                    console.log(_this.requestXiezuo);
                    _this.invitationSelectList.push(text.id);
                }
            });
        },
        loadNode(node, resolve) {
            if (node.level === 0) {
                return resolve([{ name: "region1" }, { name: "region2" }]);
            }
            if (node.level > 3) return resolve([]);
            var hasChild;
            if (node.data.name === "region1") {
                hasChild = true;
            } else if (node.data.name === "region2") {
                hasChild = false;
            } else {
                hasChild = Math.random() > 0.5;
            }
            setTimeout(() => {
                var data;
                if (hasChild) {
                    data = [
                        {
                            name: "zone" + this.count++
                        },
                        {
                            name: "zone" + this.count++
                        }
                    ];
                } else {
                    data = [];
                }
                resolve(data);
            }, 500);
        },
        initiateCollaboration() {
            this.centerDialogVisible = true;
            this.Invitation1();
        },
        //获取邀请列表
        async Invitation1() {
            // this.consultationId = row.id;
            this.invitationData1 = [];
            // this.invitationVisible = true;
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const res = await enableSynergyDoctor(query);
            if (res.data && res.data.errCode === 0) {
                console.log(res.data.body);
                this.invitationData1 = res.data.body;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        getTjData(data) {
            console.log(data);
            this.docTime0 = data.time[0];
            this.docTime1 = data.time[1];
            this.DoctorList();
        },
        //获取邀请列表
        async Invitation(row) {
            this.disabledXie=false
            this.xiezuoId = row.id;
            this.invitationData = [];
            this.invitationVisible = true;
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const res = await enableSynergyDoctor(query);
            if (res.data && res.data.errCode === 0) {
                _this.invitationData = res.data.body;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //确认邀请
        async sureInvitation() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                id: this.xiezuoId,
                intention: "",
                recordId: "",
                receiverId: this.invitationSelectList
            };
            const res = await sendSynergy(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "邀请成功"
                });
                setTimeout(function() {
                    _this.invitationVisible = false;
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 发起协作
        async launchXiezuo() {
            this.disabledXie=true
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = this.startXiezuo;
            const res = await sendSynergy(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "发起成功"
                });
                 
                setTimeout(function() {
                    _this.centerDialogVisible = false;
                    _this.DoctorList();
                }, 1000);
            } else {
                //失败
                _this.disabledXie=false
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 管理端分页
        changeCurrent(data) {
            this.adminPageNum = data;
            this.getList1();
        },
        // 医生端分页
        changeCurrentDoc(data) {
            this.docPageNum = data;
            this.DoctorList();
        },

        //协作科室和协作医生
        async cellClickData(data) {
            console.log(data);
            if (data[1].label == "协作科室") {
                this.departVisible = true;
                // this.receptionDepartment=data[0].synergyDeptName
                console.log(this.receptionDepartment);
                let _this = this;
                let query = {
                    token: this.userState.token,
                    id: data[0].id
                };
                let res = await receiveDept(query);
                if (res.data && res.data.errCode === 0) {
                    _this.receptionDepartment = res.data.body;
                } else {
                    //失败
                    this.$notify.error({
                        title: "警告",
                        message: res.data.errMsg
                    });
                }
            } else if (data[1].label == "协作医生") {
                this.doctorVisible = true;
                // this.doctorDetailData=data[0].synergyUserName
                let _this = this;
                let query = {
                    token: this.userState.token,
                    id: data[0].id
                };
                let res = await receiveDoctor(query);
                if (res.data && res.data.errCode === 0) {
                    _this.doctorDetailData = res.data.body;
                } else {
                    //失败
                    this.$notify.error({
                        title: "警告",
                        message: res.data.errMsg
                    });
                }
            }
        },
        //自调用组件函数
        getConsulTabData(res) {
            //选择管理？统计？
            if (res.i == 0) {
                this.manageOrCount = true;
                this.getList1();
            } else if (res.i == 1) {
                this.manageOrCount = false;
                this.getList2();
            }
        },
        getOTab1(data) {
            //发起科室筛选
            this.initiateDepartmentId = data.index.value;
            this.getList1();
        },
        //协作科室选择
        getOTab2(data) {
            //协作科室筛选
            this.acceptDepartmentId = data.index.value;
            this.getList1();
        },
        getOTab3(data) {
            //协作状态筛选
            console.log(data);
            this.adminStatus = data.index.value;
            this.getList1();
        },
        getOTab4(data) {
            //点击筛选日期    医生端
            console.log(data);

            if (data.index.value == "TODAY") {
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                if (month < 10) {
                    month = "0" + month;
                }
                if (day < 10) {
                    day = "0" + day;
                }
                this.docTime0 = year + "-" + month + "-" + day;
                this.docTime1 = year + "-" + month + "-" + day;
            } else {
                this.docTime0 = "";
                this.docTime1 = "";
            }

            this.DoctorList(); //医生端列表
        },
        getOTab5(data) {
            this.initiateDepartmentId = data.index.value;
            this.getList2();
        },
        adminSearchChange(data) {
            //右上角搜索框
            this.searchValue = data;
            this.getList1();
        },
        getFilterTime(data) {
            console.log(data);
            //统计页面  时间选择器返回值
            if (data.time) {
                this.time0 = data.time[0]; //统计筛选开始时间
                this.time1 = data.time[1]; //统计筛选结束时间
            } else {
                this.time0 = ""; //统计筛选开始时间
                this.time1 = ""; //统计筛选结束时间
            }
            this.statisticsType = data.select.value;
            // if (data.select.value == "DEPT") {
            //     this.statisticsType = 1;
            // } else if (data.select.value == "DAY") {
            //     this.statisticsType = 2;
            // } else if (data.select.value == "MONTH") {
            //     this.statisticsType = 3;
            // } else if (data.select.value == "YEAR") {
            //     this.statisticsType = 4;
            // }
            // this.count();
            this.getList2();
        },

        //筛选列表  管理端
        //1.21.1.科室筛选  工具栏 (管理) (管理)
        //申请科室   协作科室
        //获取工具栏科室列表
        async getToolDept(oindex) {
            let _this = this;
            let query = {
                type: "DOCTOR",
                token: this.userState.token
            };
            const res = await toolDept(query);
            if (res.data && res.data.errCode === 0) {
                if (res.data.body.length > 6) {
                    this.oTab1.more = true;
                    this.oTab2.more = true;
                } else {
                    this.oTab1.more = false;
                    this.oTab2.more = false;
                }
                $.each(res.data.body, function(index, text) {
                    _this.oTab1.list.push({
                        text: text.name,
                        value: text.id
                    });
                    _this.oTab2.list.push({
                        text: text.name,
                        value: text.id
                    });
                });
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //协作状态  筛选
        async getSelect2() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const res = await toolSynergyStatus(query);
            if (res.data && res.data.errCode === 0) {
                if (res.data.body.length > 6) {
                    _this.oTab3.more = true;
                } else {
                    _this.oTab3.more = false;
                }
                $.each(res.data.body, function(index, text) {
                    //协作管理   协作状态   筛选列表
                    _this.oTab3.list.push({
                        text: text.name,
                        value: text.id
                    });
                });
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },

        // 管理1表			9.2协作管理列表
        async getList1() {
            let _this = this;
            const options = {
                token: this.userState.token,
                query: this.searchValue,
                pageNum: this.adminPageNum,
                pageSize: this.pageSizeNum,
                status: this.adminStatus,
                applyDeptId: this.initiateDepartmentId,
                synergyDeptId: this.acceptDepartmentId,
                startTime: this.time0,
                endTime: this.time0
            };
            const res = await managePage(options);
            console.log(options);
            if (res.data && res.data.errCode === 0) {
                _this.adminLists = res.data.body.data2.list;
                _this.adminTotal = res.data.body.data2.total;
                $.each(_this.adminLists, function(index, text) {
                    if (text.synergyDeptName.length > 0) {
                        text.synergyDeptNameLength =
                            text.synergyDeptName.length;
                    }
                    if (text.synergyUserName.length > 0) {
                        text.synergyUserNameLength =
                            text.synergyUserName.length;
                    }
                });
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 管理1表   操作区
        //查看记录
        async historicalRecord(row) {
            this.sessionId = row.sessionId;
            this.recordVisible = true;
            // let _this = this;
            // let query = {
            //     token: this.userState.token
            // };
            // let options = {
            //     userId: this.userSelfInfo.userId,
            //     sessionId: [row.sessionId],
            //     msgId: this.$store.state.socket.messageTicket.oMsgId,
            //     pageNums: 15
            // };
            // const res = await fetchHistoryMessage(query, options);
            // if (res.data && res.data.errCode === 0) {
            //     _this.storyMessage = res.data.body;
            // } else {
            //     //失败
            //     this.$notify.error({
            //         title: "警告",
            //         message: res.data.errMsg
            //     });
            // }
        },

        //管理2表（统计表）
        async getList2() {
            this.drawData.dataAxis = [];
            this.drawData.data = [];
            let _this = this;
            const options = {
                token: this.userState.token,
                applyDeptId: this.initiateDepartmentId,
                statisticsType: this.statisticsType,
                startTime: this.time0,
                endTime: this.time1
            };
            const res = await manageStatistics(options);
            if (res.data && res.data.errCode === 0) {
                // $.each(res.data.body.data, function(index, text) {
                //     _this.drawData.dataAxis.push(text.unit);
                //     _this.drawData.data.push(text.number);
                // });
                this.drawData.totalNumber = res.data.body.total;
                this.drawData.dataAxis = res.data.body.data.map(item => item.x);
                this.drawData.data = res.data.body.data.map(item => item.y);
                this.drawData = Object.assign({}, this.drawData);
                console.log("统计表+成功");
            } else {
                console.log("统计表+失败");
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },

        // 医生表
        async DoctorList() {
            let _this = this;
            const options = {
                token: this.userState.token,
                query: "",
                pageNum: this.docPageNum,
                pageSize: this.pageSizeNum,
                status: this.adminStatus,
                applyDeptId: this.applyDepartmentId,
                synergyDeptId: this.acceptDepartmentId,
                startTime: this.docTime0,
                endTime: this.docTime1
            };
            const res = await synergyPage(options);
            if (res.data && res.data.errCode === 0) {
                _this.docTableData = res.data.body.data2.list;
                _this.docTotal = res.data.body.data2.total;
                $.each(_this.docTableData, function(index, text) {
                    text.synergyDeptName = text.synergyDeptName.length;
                    text.synergyUserName = text.synergyUserName.length;
                });
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 医生表   操作区
        //1、病例
        async DoctorListFun1(oObject) {},
        //2、邀请
        async DoctorListFun2(oObject) {},
        //3、查看记录
        async DoctorListFun3(oObject) {},
        //5、结束
        async DoctorListFun5(oObject) {},

        //发起协作弹框  数据获取
        //可协作医生（医生端）-弹框
        async otherDoctor() {
            let _this = this;
            let query = {
                token: this.userState.token
                // id:""
            };
            const res = await enableSynergyDoctor(query);
            if (res.data && res.data.errCode === 0) {
                $.each(res.data.body, function(index, text) {
                    _this.hospitalList.push({
                        name: text.orgName,
                        value: text.orgCode
                    });
                });
                console.log(res);
            } else {
                console.log(res);
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //协作弹框内  病例   列表
        dialogCase(oid, oindex) {
            // this.getDepartment(oindex);
        },
        //协作弹框内  目的   列表
        dialogPurpose() {},
        //提交   发起协作
        async addHz() {
            let _this = this;
            let addHzConsultatonList = [];
            $.each(this.startHz.cooperationHospitalDept, function(index, text) {
                addHzConsultatonList.push({
                    hospitalId: text.hospitalId,
                    departmentsId: text.departmentsId
                });
            });
            let query = {
                token: this.userState.token
            };
            let options = {
                type: this.startHz.type,
                deptId: this.startHz.deptId,
                userId: this.startHz.userId,
                medicalHistory: this.startHz.medicalHistory,
                applicationTime: this.startHz.applicationTime,
                cooperationPurpose: this.startHz.cooperationPurpose,
                cooperationHospitalDept: addHzConsultatonList
            };
            const res = await sendSynergy(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "发起成功",
                    message: res.data.errMsg
                });
                setTimeout(function() {
                    _this.centerDialogVisible = false;
                    _this.DoctorList();
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        }
    },

    async created() {
        this.DoctorList(); //医生协作列表
    },
    watch: {
        "$store.state.user.viewRoot.now.name": {
            handler(data) {
                this.oUserType = data;
            }
        }
    }
};
</script>

<style>
</style>