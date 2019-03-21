<template>
    <!-- 远程会诊系统 -->

    <div class="consultationBox">
        <!-- 发起会诊弹窗 -->
        <div v-if="centerDialogVisible">
            <el-dialog class="startGroup" title="发起会诊" :visible.sync="centerDialogVisible" width="602px" hight="607px"
                center>
                <el-form ref="form" :model="startHz" label-width="80px">
                    <el-form-item label="类型">
                        <el-radio-group v-model="startHz.type">
                            <el-radio label="SPECIALIST">专科会诊</el-radio>
                            <el-radio label="EXPERT">专家会诊</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="发起科室">
                        <el-select v-model="startHz.deptId" placeholder="请选择活动区域">
                            <el-option v-for="(text,index) in departmentList" :label="text.name" :value="text.value"
                                :key="index"></el-option>

                        </el-select>
                    </el-form-item>
                    <div class="addHospitalBox">
                        <div style="display:flex" v-for="(text,index) in startHz.consultationHospitalDept" :key="index">

                            <el-form-item label="申请医院:">
                                <el-select placeholder="请选择活动区域" v-model="text.hospitalId"
                                    @change="hosChange(index,text.hospitalId)">
                                    <el-option v-for="(text,index) in hospitalList" :label="text.name"
                                        :value="text.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="申请科室:">
                                <el-select v-model="text.departmentsId" placeholder="请选择活动区域">
                                    <el-option v-for="(otext,index) in text.departmentListOO" :label="otext.name"
                                        :value="otext.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <span class="addHospital" @click="addHospital">
                            <img src="../assets/img/addFollowJa1.png" />
                        </span>
                    </div>

                    <el-form-item label="会诊病人:">
                        <el-input v-model="startHz.userId"></el-input>
                    </el-form-item>
                    <el-form-item label="病人病历:">
                        <el-input v-model="startHz.medicalHistory"></el-input>
                    </el-form-item>
                    <el-form-item label="申请时间:">
                        <el-date-picker v-model="startHz.applicationTime" type="datetime" placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="会诊目的:">
                        <el-input v-model="startHz.consultationPurpose"></el-input>
                    </el-form-item>
                    <el-form-item class="confirmBtnBox">
                        <el-button class="confirmBtn" type="primary" @click="addHz()">确认</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>

        <!-- 接收科室 -->
        <div v-if="departVisible">
            <el-dialog class="evaluateBox" title=" 接收科室" :visible.sync="departVisible" width="503px" hight="470px"
                center>
                <receiveDepartent :receptionDepartment="receptionDepartment"></receiveDepartent>
            </el-dialog>
        </div>
        <!-- 医生详情 -->
        <div v-if="doctorVisible">
            <el-dialog class="evaluateBox evaluateBox2" title=" 医生详情" :visible.sync="doctorVisible" width="602px"
                hight="356px" center>
                <doctorDetail :doctorDetailData="doctorDetailData"></doctorDetail>

            </el-dialog>
        </div>
        <!-- 邀请弹框 -->
        <div v-if="invitationVisible">
            <el-dialog class="evaluateBox evaluateBox2" title=" 邀请医生" :visible.sync="invitationVisible" width="602px"
                hight="356px" center>
                <el-tree :data="invitationData" :props="defaultProps" @check="handleCheckChange" show-checkbox>
                </el-tree>
                <el-button type="primary" @click="sureInvitation()">确认邀请</el-button>
            </el-dialog>
        </div>
        <!-- 查看记录 -->
        <div v-if="recordVisible">
            <el-dialog class="  " title="  " :visible.sync="recordVisible" width="602px" hight="356px" center>
                <viewRecord :sessionId="sessionId"></viewRecord>
            </el-dialog>
        </div>

        <!-- 管理端 -->
        <div class="consultation" v-if="$store.state.user.viewRoot.now.name==='manager'">
            <div class="Admin-title">
                <normalTab :inData="oAdminTab" @reBack="getConsulTabData"></normalTab>
            </div>
            <div class="admin-oMain">
                <!-- 会诊管理 -->
                <div v-if="oconsulVisable">
                    <div class="mainTab">
                        <div>
                            <selftag :inData="oTab1" @reback="getOTab1"></selftag>
                            <selftag :inData="oTab1" @reback="getOTab11"></selftag>
                            <selftag :inData="oTab2" @reback="getOTab2"></selftag>
                            <selftag :inData="oTab3" @reback="getOTab3"></selftag>
                        </div>

                        <search @searchValue="adminSearchChange"></search>
                    </div>
                    <div>
                        <tableList :tableData="adminTableData" :columns="columns" :tableBtn="tableBtn"
                            :cellColor="cellColor" @cellClickData="cellClickData" :total="adminTotal"
                            @rebackFenye="changeCurrent" :pageSize="pageSizeNum"> </tableList>
                    </div>
                </div>
                <!-- 统计 -->
                <div v-else>
                    <div class="mainTab">
                        <div>
                            <selftag :inData="oTab1" @reback="getOTab5"></selftag>
                        </div>
                        <statisticsWay @reBack="getTjData"></statisticsWay>
                    </div>
                    <div style="display:flex">
                        <normalColumnChart :inData="drawData1"> </normalColumnChart>
                        <normalColumnChart :inData="drawDataStart"> </normalColumnChart>
                    </div>
                </div>
            </div>
        </div>
        <!-- 医生端 -->
        <div class="consultation" v-else>
            <div class="doc-title">
                <selftag :inData="oTab4" @reback="getOTab4"></selftag>
                <div class="statistics-way">
                    <publicTime @timeValue="getDocTime"></publicTime>
                </div>
                <el-button class="startConsul" type="text" @click="startHuizhen()">发起会诊</el-button>
            </div>

            <div class="public-list">
                <el-table class='' :data="docTableData" border style="width: 100%">
                    <el-table-column prop="consultationId" label="会诊编号" width="150">
                    </el-table-column>
                    <el-table-column prop="hospital" label="发起医院" width="120">
                    </el-table-column>
                    <el-table-column prop="department" label="发起科室" width="120">
                    </el-table-column>
                    <el-table-column prop="doctor" label="发起医生" width="120">
                    </el-table-column>
                    <el-table-column prop="applicationTime" label="发起时间" width="150">
                    </el-table-column>
                    <el-table-column prop="type" label="会诊类型" width="120">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type=='SPECIALIST'">专科会诊</span>
                            <span v-else>专家会诊</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userName" label="会诊病人" width="120">
                    </el-table-column>
                    <el-table-column prop="consultationPurpose" label="目的" width="120">
                    </el-table-column>
                    <el-table-column prop="doctorNumber" label="参与专家" width="120">
                    </el-table-column>
                    <el-table-column prop="status" label="状态" width="120">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status=='NEW'">未开始</span>
                            <span v-else-if="scope.row.status=='UNDERWAY'">进行中</span>
                            <span v-else-if="scope.row.status=='OVER'">结束</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button class="seeDanganClass" @click="goToDangan(scope.row)" type="text" size="small">病历
                            </el-button>
                            <el-button class="inviteUserClass" @click="Invitation(scope.row)" type="text" size="small">
                                邀请</el-button>
                            <el-button class="seeHistoryMessage" v-show="scope.row.status=='OVER'"
                                @click="historicalRecord(scope.row)" type="text" size="small">查看记录</el-button>
                            <el-button class="goTohuizhen"
                                v-show="scope.row.status=='NEW' || scope.row.status=='UNDERWAY'"
                                @click="toConsultation(scope.row)" type="text" size="small">进入会诊</el-button>
                            <el-button class="overClass" v-show="scope.row.status=='UNDERWAY'"
                                @click="overclick(scope.row,'OFF')" type="text" size="small">结束</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align:center;padding:10px 0">
                    <el-pagination background layout="prev, pager, next" :total="docTotal"
                        @current-change="changeCurrentDoc">
                    </el-pagination>
                </div>
            </div>

        </div>
        <div v-if="chatVisible">
            <el-dialog class="chatDialog" title="" :visible.sync="chatVisible" width="680px">
                <chat :sessionId="sessionId" :doctorVis="doctorVis"></chat>
            </el-dialog>
        </div>

    </div>
</template>
<script>
    import {
        managerGetPlanList,
        managerGetDeviceList,
        fetchHospitalDepts,
        queryByManagerPage,
        queryByAppraiseList,
        queryStatisticalByApplication,
        queryStatisticalBySponsor,
        getAllHospital,
        addConsultation,
        queryByDeptList,
        queryConsultationInformList,
        sponsorConsultationInform,
        fetchHistoryMessage,
        queryConsultationDoctorList,
        toolDept,
        toolConsultationStatus,
        toolConsultationType,
        queryByDoctorPage,
        updateConsultationStatus
    } from "../api/apiAll.js";
    import { mapState } from "vuex";
    import echarts from "../plugs/echarts.js";
    import tableList from "../public/publicComponents/publicList.vue";
    import selftag from "../public/publicComponents/selftag.vue";
    import chat from "../public/publicComponents/chat.vue";
    import normalTab from "../public/publicComponents/normalTab.vue";
    import normalColumnChart from "../public/publicComponents/normalColumnChart.vue";
    import search from "../public/publicComponents/search.vue";
    import statisticsWay from "../public/publicComponents/statisticsWay.vue";
    import publicTime from "../public/publicComponents/publicTime.vue";
    import receiveDepartent from "./xiezuo/receiveDepartent.vue";
    import viewRecord from "./xiezuo/viewRecord.vue";
    import doctorDetail from "./xiezuo/doctorDetail.vue";

    export default {
        components: {
            selftag,
            tableList,
            normalTab,
            normalColumnChart,
            search,
            statisticsWay,
            chat,
            publicTime,
            receiveDepartent,
            viewRecord,
            doctorDetail
        },
        data() {
            return {
                docTotal: 0,
                adminTotal: 0,
                // storyMessage: [],
                doctorDetailData: [],
                doctorVis: 0, //0是医生跟医生聊天
                cellColor: [
                    {
                        cell: 7,
                        value: "接收科室",
                        oclass: "ooRed"
                    },
                    {
                        cell: 8,
                        value: "参与专家",
                        oclass: "ooRed"
                    }
<<<<<<< HEAD
                ]
            },
            columnsDoc: [
                {
                    prop: "consultationId",
                    label: "会诊编号",
                    width: "300px"
                },
                {
                    prop: "hospital",
                    label: "发起医院"
                },
                {
                    prop: "department",
                    label: "发起科室"
                },
                {
                    prop: "doctor",
                    label: "发起医生"
=======
                ],
                invitationData: [],
                defaultProps: {
                    children: "children",
                    label: "name"
>>>>>>> 5064d9a3402ebc53ba5cbb2875fc91bef4e10337
                },
                invitationVisible: false,
                receptionDepartment: [], //接收科室数据
                sessionId: "", //会诊id
                chatVisible: false, //聊天框
                oVisable: true,
                oconsulVisable: true, //切换会诊管理和统计的显示
                centerDialogVisible: false, //是否发起会诊
                evaluateVisible: false, //是否打开评价
                departVisible: false, //是否接收科室
                doctorVisible: false, //医生详情
                groupVisible: false, //会诊评价
                recordVisible: false, //查看记录
                applicationDeptId: "", //发起科室
                applicationDeptId2: "",
                receiveDeptId: "", //接收科室
                searchValue: "", //管理端搜索框
                adminType: "",
                adminStatus: "",
                statisticsStart: "",
                statisticsType: "DAY",
                statisticsEnd: "",
                departmentsId: "",
                departmentList: [], //科室列表
                hospitalList: [], //医院列表
                form: "",
                oTab1: {
                    more: true,
                    title: "发起科室",
                    list: []
                },
                oTab11: {
                    more: true,
                    title: "接收科室",
                    list: []
                },
                oTab2: {
                    more: false,
                    title: "会诊类型",
                    list: [
                        // {
                        //     text: "全部"
                        // },
                        // {
                        //     text: "专科会诊",
                        //     value: "SPECIALIST"
                        // },
                        // {
                        //     text: "专家会诊",
                        //     value: "EXPERT"
                        // }
                    ]
                },
                oTab3: {
                    more: false,
                    title: "会诊状态",
                    list: [
                        // {
                        //     text: "全部",
                        //     value: ""
                        // },
                        // {
                        //     text: "未开始",
                        //     value: "NEW"
                        // },
                        // {
                        //     text: "进行中",
                        //     value: "UNDERWAY"
                        // },
                        // {
                        //     text: "结束",
                        //     value: "OVER"
                        // }
                    ]
                },
                adminPageNum: 1,
                docPageNum: 1,
                //医生端
                consultationId: "",
                invitationSelectList: [],
                doctorTime: "",
                oDocTime: "",
                startDate: "",
                endDate: "",
                startHz: {
                    type: "SPECIALIST",
                    deptId: " ",
                    userId: " ",
                    medicalHistory: " ",
                    applicationTime: " ",
                    consultationPurpose: " ",
                    consultationHospitalDept: [
                        {
                            hospitalId: "",
                            departmentsId: "",
                            departmentListOO: []
                        }
                    ]
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
                columnsDoc: [
                    {
                        prop: "consultationId",
                        label: "会诊编号",
                        width: '300px'
                    },
                    {
                        prop: "hospital",
                        label: "发起医院"
                    },
                    {
                        prop: "department",
                        label: "发起科室"
                    },
                    {
                        prop: "doctor",
                        label: "发起医生"
                    },
                    {
                        prop: "applicationTime",
                        label: "申请时间"
                    },
                    {
                        prop: "type",
                        label: "会诊类型"
                    },
                    {
                        prop: "consultationPurpose",
                        label: "目的"
                    },
                    {
                        prop: "doctorNumber",
                        label: "参与专家"
                    },
                    {
                        prop: "status",
                        label: "状态"
                    }
                ],
                columns: [
                    {
                        prop: "consultationId",
                        label: "会诊编号"
                    },
                    {
                        prop: "hospital",
                        label: "发起医院"
                    },
                    {
                        prop: "department",
                        label: "发起科室"
                    },
                    {
                        prop: "doctor",
                        label: "发起医生"
                    },
                    {
                        prop: "applicationTime",
                        label: "发起时间"
                    },
                    {
                        prop: "type",
                        label: "会诊类型"
                    },
                    {
                        prop: "无",
                        label: "接收医院"
                    },
                    {
                        prop: "receiveDeptNumber",
                        label: "接收科室"
                    },
                    {
                        prop: "doctorNumber",
                        label: "参与专家"
                    },
                    {
                        prop: "userName",
                        label: "会诊病人"
                    },
                    {
                        prop: "medicalHistory",
                        label: "病历"
                    },
                    {
                        prop: "startTime",
                        label: "发起时间"
                    },
                    {
                        prop: "consultationTimeNumber",
                        label: "会诊用时"
                    },

                    {
                        prop: "status",
                        label: "状态"
                    }
                ],
                adminTableData: [], //管理端列表
                docTableData: [], //医生端列表
                tableBtn: [
                    {
                        name: "查看记录",
                        oclass: "recordBtn",
                        method: (index, row) => {
                            this.historicalRecord(row);
                        }
                    }
                ],
                docTableBtn: [
                    {
                        name: "病历",
                        oclass: "recordBtn",
                        method: (index, row) => {
                            this.recordFun(index, row);
                        }
                    },
                    {
                        name: "邀请",
                        oclass: "recordBtn",
                        method: (index, row) => {
                            this.recordFun(index, row);
                        }
                    },
                    {
                        name: "查看记录",
                        oclass: "recordBtn",
                        method: (index, row) => {
                            this.recordFun(index, row);
                        }
                    }
                ],
                oAdminTab: {
                    i: 0, //选中的是第几项，类型为int(注意：从0开始计数)
                    list: [
                        //选项列表，类型Array
                        {
                            en: "CONSULTATION", //选项英文，类型 string
                            zh: "会诊管理" //选项中文，类型string
                        },
                        {
                            en: "STATISTICS",
                            zh: "统计"
                        }
                    ]
                },
                //申请科室统计图
                drawData1: {
                    dataAxis: ["点"], //每个柱子代表的类名
                    data: [220], //具体数值
                    title: "申请科室", //图表标题
                    total: 0
                },
                //发起科室统计图
                drawDataStart: {
                    dataAxis: [], //每个柱子代表的类名
                    data: [], //具体数值
                    title: "发起科室", //图表标题
                    totalNumber: "34"
                },
                oUserType: "",
                pageSizeNum: 10
            };
        },
        computed: {
            ...mapState({
                userState: state => state.user.userInfo,
                userSelfInfo: state => state.user.userSelfInfo
            })
        },
        methods: {
            // 管理端事件
            getOTab1(data) {
                this.applicationDeptId = data.index.value;
                this.getAdminList();
            },
            getOTab11(data) {
                this.receiveDeptId = data.index.value;
                this.getAdminList();
            },
            getOTab2(data) {
                this.adminType = data.index.value;
                this.getAdminList();
            },
            getOTab3(data) {
                this.adminStatus = data.index.value;
                this.getAdminList();
            },
            async screenPublic(otab, getFollowScreen, otitle) {
                otab.more = false;
                otab.title = otitle;
                otab.list = [];
                console.log(this.oTab2);

                let _this = this;
                let query = {
                    token: this.userState.token
                };
                const res = await getFollowScreen(query);
                if (res.data && res.data.errCode === 0) {
                    if (res.data.body.length > 6) {
                        otab.more = true;
                    } else {
                        otab.more = false;
                    }
                    $.each(res.data.body, function (index, text) {
                        otab.list.push({
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
            // 管理端分页
            changeCurrent(data) {
                this.adminPageNum = data;
                this.getAdminList();
            },
            // 医生端分页
            changeCurrentDoc(data) {
                this.docPageNum = data;
                this.getDocList();
            },
            async cellClickData(data) {
                console.log(data);
                if (data[1].label == "接收科室") {
                    this.departVisible = true;
                    let _this = this;
                    let query = {
                        token: this.userState.token,
                        consultationId: data[0].id
                    };
                    let res = await queryByDeptList(query);
                    if (res.data && res.data.errCode === 0) {
                        _this.receptionDepartment = res.data.body;
                    } else {
                        //失败
                        this.$notify.error({
                            title: "警告",
                            message: res.data.errMsg
                        });
                    }
                } else if (data[1].label == "参与专家") {
                    this.doctorVisible = true;
                    let _this = this;
                    let query = {
                        token: this.userState.token,
                        consultationId: data[0].id
                    };
                    let res = await queryConsultationDoctorList(query);
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
            //发起会诊
            startHuizhen() {
                this.centerDialogVisible = true;
                this.getDepartment1(this.userSelfInfo.orgCode);
            },
            //查看记录
            recordFun() {
                this.recordVisible = true;
            },
            //医生端事件

            handleCheckChange(data, odata) {
                this.invitationSelectList = [];
                let _this = this;

                $.each(odata.checkedNodes, function (index, text) {
                    if (text.type == 2) {
                        if (text.id) {
                            _this.invitationSelectList.push(text.id);
                        }
                    }
                });
                console.log(this.invitationSelectList);
                console.log(odata);
            },
            //确认邀请
            async sureInvitation() {
                if (this.invitationSelectList.length > 0) {
                    let _this = this;
                    let query = {
                        token: this.userState.token
                    };
                    let options = {
                        consultationId: this.consultationId,
                        depts: this.invitationSelectList
                    };
                    const res = await sponsorConsultationInform(query, options);
                    if (res.data && res.data.errCode === 0) {
                        this.$notify.success({
                            title: "成功",
                            message: "邀请成功"
                        });
                        setTimeout(function () {
                            _this.invitationVisible = false;
                        }, 1000);
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
                        message: "科室不能为空"
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
            //查看记录
            async historicalRecord(row) {
                this.sessionId = row.sessionId;
                this.recordVisible = true;
            },
            getOTab4(data) {
                console.log(data);
                this.oDocTime = data.index.value;
                this.startDate = "";
                this.endDate = "";
                this.getDocList();
            },
            getOTab5(data) {
                console.log(data);
                this.applicationDeptId2 = data.index.value;
                this.statisticsStart = "";
                this.statisticsEnd = "";
                this.getAdminTjList();
                this.getApplyTjList();
            },
            addHospital() {
                this.startHz.consultationHospitalDept.push({
                    hospitalId: "",
                    departmentsId: ""
                });
            },
            adminSearchChange(data) {
                this.searchValue = data;
                this.getAdminList();
            },
            //获取起始时间
            getDocTime(data) {
                console.log(data);
                this.oDocTime = "";
                this.startDate = data[0];
                this.endDate = data[1];
                this.getDocList();
            },
            //发起会诊
            async addHz() {
                let _this = this;
                let addHzConsultatonList = [];
                $.each(this.startHz.consultationHospitalDept, function (
                    index,
                    text
                ) {
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
                    consultationPurpose: this.startHz.consultationPurpose,
                    consultationHospitalDept: addHzConsultatonList
                };
                const res = await addConsultation(query, options);
                if (res.data && res.data.errCode === 0) {
                    this.$notify.success({
                        title: "发起成功",
                        message: res.data.errMsg
                    });
                    setTimeout(function () {
                        _this.centerDialogVisible = false;
                        _this.getDocList();
                    }, 1000);
                } else {
                    //失败
                    this.$notify.error({
                        title: "警告",
                        message: res.data.errMsg
                    });
                }
            },
            //进入会诊
            async toConsultation(oObject) {
                this.chatVisible = true;
                this.sessionId = oObject.sessionId;
                if (oObject.state == "NEW") {
                    oObject.state = "UNDERWAY";
                    this.overclick(oObject, "on");
                }
            },
            //结束
            async overclick(row, state) {
                console.log(row);
                if (state == "on") {
                    let _this = this;
                    let query = {
                        token: this.userState.token
                    };
                    let options = {
                        consultationId: row.id,
                        status: row.status
                    };
                    const res = await updateConsultationStatus(query, options);
                    if (res.data && res.data.errCode === 0) {
                        this.$notify.success({
                            title: "警告",
                            message: "结束成功"
                        });
                    } else {
                        //失败
                        this.$notify.error({
                            title: "警告",
                            message: res.data.errMsg
                        });
                    }
                } else {
                    if (row.doctorId == this.userSelfInfo.userId) {
                        let _this = this;
                        let query = {
                            token: this.userState.token
                        };
                        let options = {
                            consultationId: row.id,
                            status: row.status
                        };
                        const res = await updateConsultationStatus(query, options);
                        if (res.data && res.data.errCode === 0) {
                            this.$notify.success({
                                title: "警告",
                                message: "结束成功"
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
                            message: "发起医生才能结束会诊"
                        });
                    }
                }
            },
            //管理端事件
            getConsulTabData(res) {
                console.log(res.i)
                if (res.i == 0) {
                    this.oconsulVisable = true;
                    this.getAdminList();
                } else if (res.i == 1) {
                    this.oconsulVisable = false;
                    this.getApplyTjList();
                    this.getAdminTjList();
                }
            }, //获取医院列表
            async getHospitalment() {
                let _this = this;
                let query = {
                    token: this.userState.token
                };
                const res = await getAllHospital(query);
                if (res.data && res.data.errCode === 0) {
                    $.each(res.data.body, function (index, text) {
                        _this.hospitalList.push({
                            name: text.orgName,
                            value: text.orgCode
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
            //改变医院 同时改变科室
            hosChange(oindex, orgCode) {
                this.getDepartment2(oindex, orgCode);
            },
            //获取邀请列表
            async Invitation(row) {
                this.consultationId = row.id;
                this.invitationData = [];
                this.invitationVisible = true;
                let _this = this;
                let query = {
                    token: this.userState.token
                };
                const res = await queryConsultationInformList(query);
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
            //获取工具栏科室列表
            async getToolDept(oindex) {
                let _this = this;
                let query = {
                    type: this.oUserType,
                    token: this.userState.token
                };
                const res = await toolDept(query);
                if (res.data && res.data.errCode === 0) {
                    if (res.data.body.length > 6) {
                        this.oTab1.more = true;
                    } else {
                        this.oTab1.more = false;
                    }
                    $.each(res.data.body, function (index, text) {
                        _this.oTab1.list.push({
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
<<<<<<< HEAD
                });
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //获取管理端列表
        async getAdminList() {
            let _this = this;
            const options = {
                token: this.userState.token,
                searchKey: this.searchValue,
                applicationDeptId: this.applicationDeptId,
                receiveDeptId: this.receiveDeptId,
                pageNum: this.adminPageNum,
                pageSize: 10,
                type: this.adminType,
                status: this.adminStatus
            };
            const res = await queryByManagerPage(options);
            if (res.data && res.data.errCode === 0) {
                this.adminTableData = res.data.body.data2.list;
                $.each(this.adminTableData, function() {
                    if (this.adminTableData.type == "SPECIALIST") {
                        this.adminTableData.type = "专科会诊";
                    } else if (this.adminTableData.type == "EXPERT") {
                        this.adminTableData.type = "专家会诊";
                    }
                });
                this.adminTotal = res.data.body.data2.total;
=======
                }
            },
            //获取科室列表
            async getDepartment1(orgCode) {
                this.departmentList = [];
                let _this = this;
                let query = {
                    orgCode: orgCode,
                    deptId: ""
                };
                const res = await fetchHospitalDepts(query);
                if (res.data && res.data.errCode === 0) {
                    $.each(res.data.body, function (index, text) {
                        _this.departmentList.push({
                            name: text.deptName,
                            value: text.deptId
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
            //获取科室列表
            async getDepartment2(oindex, orgCode) {
                this.startHz.consultationHospitalDept[oindex].departmentListOO = [];
                let _this = this;
                let query = {
                    orgCode: orgCode,
                    deptId: ""
                };
                const res = await fetchHospitalDepts(query);
                if (res.data && res.data.errCode === 0) {
                    $.each(res.data.body, function (index, text) {
                        _this.startHz.consultationHospitalDept[
                            oindex
                        ].departmentListOO.push({
                            name: text.deptName,
                            value: text.deptId
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
            //获取管理端列表
            async getAdminList() {
                let _this = this;
                const options = {
                    token: this.userState.token,
                    searchKey: this.searchValue,
                    applicationDeptId: this.applicationDeptId,
                    receiveDeptId: this.receiveDeptId,
                    pageNum: this.adminPageNum,
                    pageSize: 10,
                    type: this.adminType,
                    status: this.adminStatus
                };
                const res = await queryByManagerPage(options);
                if (res.data && res.data.errCode === 0) {
                    this.adminTableData = res.data.body.data2.list;
                    this.adminTotal = res.data.body.data2.total;
>>>>>>> 5064d9a3402ebc53ba5cbb2875fc91bef4e10337

                    console.log(res);
                } else {
                    //失败
                    this.$notify.error({
                        title: "警告",
                        message: res.data.errMsg
                    });
                }
            },
            //获取管理端申请科室统计列表
            async getApplyTjList() {
                // debugger
                this.drawData1.dataAxis = [];
                this.drawData1.data = [];
                let _this = this;
                const options = {
                    token: this.userState.token,
                    type: this.statisticsType,
                    startDate: this.statisticsStart,
                    endDate: this.statisticsEnd,
                    deptId: this.applicationDeptId2
                };
                const res = await queryStatisticalByApplication(options);
                if (res.data && res.data.errCode === 0) {
                    // res.data.body.data.splice(1,res.data.body.data.length);
                    this.drawData1.total = res.data.body.totalNumber;
                    this.drawData1.dataAxis = res.data.body.data.map(
                        item => item.x
                    );
                    this.drawData1.data = res.data.body.data.map(item => item.y);
                    this.drawData1 = Object.assign({}, this.drawData1);
                    console.log(this.drawData1);
                } else {
                    //失败
                    this.$notify.error({
                        title: "警告",
                        message: res.data.errMsg
                    });
                }
            },
            //获取管理端发起科室统计列表
            async getAdminTjList() {
                this.drawDataStart.dataAxis = [];
                this.drawDataStart.data = [];
                let _this = this;
                const options = {
                    token: this.userState.token,
                    type: this.statisticsType,
                    startDate: this.statisticsStart,
                    endDate: this.statisticsEnd,
                    deptId: this.applicationDeptId2
                };
                const res = await queryStatisticalBySponsor(options);
                if (res.data && res.data.errCode === 0) {
                    // $.each(res.data.body.data, function(index, text) {
                    //     _this.drawDataStart.dataAxis.push(text.x);
                    //     _this.drawDataStart.data.push(text.y);
                    // });
                    // res.data.body.data.splice(1,res.data.body.data.length);
                    this.drawDataStart.total = res.data.body.totalNumber;
                    this.drawDataStart.dataAxis = res.data.body.data.map(
                        item => item.x
                    );
                    this.drawDataStart.data = res.data.body.data.map(
                        item => item.y
                    );
                    this.drawDataStart = Object.assign({}, this.drawDataStart);
                    console.log(this.drawDataStart);
                } else {
                    //失败
                    this.$notify.error({
                        title: "警告",
                        message: res.data.errMsg
                    });
                }
            },
            //获取统计类型
            getTjData(data) {
                console.log(data);
                this.statisticsType = data.select.value;
                if (data.time) {
                    this.statisticsStart = data.time[0];
                    this.statisticsEnd = data.time[1];
                } else {
                    var myDate = new Date();
                    this.statisticsStart = "";
                }

                this.getAdminTjList();
                this.getApplyTjList();
            },
            //获取医生端列表
            async getDocList() {
                let _this = this;
                const options = {
                    token: this.userState.token,
                    dateType: this.oDocTime,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    pageNum: this.docPageNum,
                    pageSize: 10
                };
                const res = await queryByDoctorPage(options);
                if (res.data && res.data.errCode === 0) {
                    this.docTableData = res.data.body.data2.list;
                    this.docTotal = res.data.body.data2.total;
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
            this.getAdminList();
            this.getDocList();
            this.getAdminTjList();
            this.getApplyTjList();
            this.getHospitalment();

            this.screenPublic(this.oTab2, toolConsultationType, "会诊类型");
            this.screenPublic(this.oTab3, toolConsultationStatus, "会诊状态");
            console.log(this.userState.rooter);
            console.log(this.userState.manager);

            if (this.userState.rooter || this.userState.manager) {
                this.oUserType = "MANAGE";
            } else {
                this.oUserType = "DOCTOR";
            }
            this.getToolDept();
        }
<<<<<<< HEAD
    },
    async created() {
        this.getAdminList();
        this.getDocList();
        this.getAdminTjList();
        this.getApplyTjList();
        this.getHospitalment();

        this.screenPublic(this.oTab2, toolConsultationType, "会诊类型");
        this.screenPublic(this.oTab3, toolConsultationStatus, "会诊状态");
        console.log(this.userState.rooter);
        console.log(this.userState.manager);

        // if ($store.state.user.viewRoot.now.name==='manager') {
        //     this.oUserType = "MANAGE";
        //     alert('ddd')
        //     this.getToolDept()
        // } else {
        //     this.oUserType = "DOCTOR";
        //     this.getToolDept()
        // }
        this.getToolDept();
    }
};
</script>

<style>
/* 公共样式 */
.Admin-title {
    margin-bottom: 42px;
}
.admin-oMain {
    padding: 30px 38px;
    background: #ffffff;
    border: 1px solid #e5edf3;
    box-shadow: 0 6px 36px 0 rgba(0, 62, 100, 0.04);
    border-radius: 4px;
}
.admin-oMain > div {
    position: relative;
}
.mainTab {
    display: flex;
    display: -webkit-flex;
}
.mainTab > div:first-child {
    width: 100%;
}
/* 医生端样式 */
.consultationBox {
    padding-top: 50px;
}
.doc-title {
    display: flex;
    display: -webkit-flex;
    margin-bottom: 52px;
    justify-content: space-between;
}
.doc-title > div:nth-child(2) {
    margin-left: 178px;
}
.doc-title > button {
    margin-top: -7px;
}
.evaluateBtn {
    width: 57px;
    height: 20px;
    background: rgba(119, 140, 162, 0.1);
    border: 1px solid rgba(119, 140, 162, 0.6);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #778ca2;
    line-height: 3px;
}
.startConsul {
    width: 196px;
    height: 40px;
    background: #4da1ff;
    border-radius: 4px;
    font-family: PingFangSC-Semibold;
    font-size: 22px;
    color: #ffffff;
    letter-spacing: 0.92px;
    text-align: center;
    line-height: 0px;
}
/* 管理端端样式 */

.mainTab {
    margin-bottom: 30px;
}

.recordBtn {
    width: 57px;
    height: 20px;
    background: rgba(66, 133, 244, 0.1);
    border: 1px solid rgba(66, 133, 244, 0.6);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #4d7cfe;
    line-height: 3px;
}
.startGroup input {
    width: 162px;
    height: 28px;
}
.confirmBtn {
    width: 100%;
    height: 39px;
    background: #4da1ff;
    border-radius: 4px;
    color: white;
    font-size: 12px;
    line-height: 21px;
}
.confirmBtnBox > div {
    margin-left: 0;
}
.evaluateInput > textarea {
    width: 478px;
    height: 177px;
}
.evaluateMargin1 {
    margin-bottom: 68px;
}
.evaluateMargin > div {
    margin-left: 0px !important;
}
.evaluateBox .el-dialog__body {
    padding: 25px 60px;
}
.evaluateCont {
    width: 90%;
}
.evaluateCont > h5 {
    font-family: Helvetica;
    font-size: 0.14rem;
    color: #252631;
}
.evaluateCont > div {
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #98a9bc;
    line-height: 21px;
}
.evaluateBox2 li {
    margin-bottom: 18px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
}
/* 查看记录 */
.hisMain {
    padding: 10px 28px;
}
.ohisList {
    margin-bottom: 25px;
}
.ohisList > h3 {
    margin-bottom: 15px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #000000;
    letter-spacing: -0.4px;
    font-weight: normal;
}
.ohisListMain {
    display: flex;
    display: -webkit-flex;
    margin-bottom: 15px;
}
.ohisListMain > div:first-child {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 12px;
}
.ohisListMain > div:first-child > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.ohisListRg > div {
    font-size: 0.14rem;
    font-family: PingFangSC-Regular;
    color: #323c47;
}
.ohisListRg > div:first-child {
    color: #939eab;
    font-size: 0.12rem;
}
.ooRed {
    color: red !important;
}
.addHospitalBox {
    position: relative;
}
.addHospital {
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    right: 20px;
    top: 8px;
}
.addHospital > img {
    width: 100%;
    height: 100%;
}
.tablePublicClass {
    border: none;
}
.tablePublicClass .el-table td,
.tablePublicClass .el-table th {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #5e6875;
    letter-spacing: 0;
    border-right: none;
}
.tablePublicClass .el-table td {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #5e6875;
    letter-spacing: 0;
}
.seeDanganClass {
    width: 57px;
    height: 20px;
    background: rgba(255, 171, 43, 0.1);
    border: 1px solid rgba(255, 171, 43, 0.6);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #ffab2b;
    line-height: 1px;
}
.inviteUserClass {
    width: 57px;
    height: 20px;
    line-height: 1px;
    background: rgba(254, 77, 151, 0.1);
    border: 1px solid rgba(254, 77, 151, 0.6);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #fe4d97;
}
.seeHistoryMessage {
    width: 57px;
    height: 20px;
    background: rgba(66, 133, 244, 0.1);
    border: 1px solid rgba(66, 133, 244, 0.6);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #4d7cfe;
    line-height: 1px;
}
.goTohuizhen {
    width: 57px;
    height: 20px;
    background: rgba(66, 133, 244, 0.1);
    border: 1px solid rgba(66, 133, 244, 0.6);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #4d7cfe;
    line-height: 1px;
}
.overClass {
    width: 57px;
    height: 20px;
    background: rgba(119, 140, 162, 0.1);
    border: 1px solid rgba(119, 140, 162, 0.6);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #778ca2;
    line-height: 1px;
}
.el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
    border-right: none;
}
=======
    };
</script>

<style>
    /* 公共样式 */
    .Admin-title {
        margin-bottom: 42px;
    }

    .admin-oMain {
        padding: 30px 38px;
        background: #ffffff;
        border: 1px solid #e5edf3;
        box-shadow: 0 6px 36px 0 rgba(0, 62, 100, 0.04);
        border-radius: 4px;
    }

    .admin-oMain>div {
        position: relative;
    }

    .mainTab {
        display: flex;
        display: -webkit-flex;
    }

    .mainTab>div:first-child {
        width: 100%;
    }

    /* 医生端样式 */
    .consultationBox {
        padding-top: 50px;
    }

    .doc-title {
        display: flex;
        display: -webkit-flex;
        margin-bottom: 52px;
        justify-content: space-between
    }

    .doc-title>div:nth-child(2) {
        margin-left: 178px;
    }

    .doc-title>button {
        margin-top: -7px;
    }

    .evaluateBtn {
        width: 57px;
        height: 20px;
        background: rgba(119, 140, 162, 0.1);
        border: 1px solid rgba(119, 140, 162, 0.6);
        border-radius: 3px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #778ca2;
        line-height: 3px;
    }

    .startConsul {
        width: 196px;
        height: 40px;
        background: #4da1ff;
        border-radius: 4px;
        font-family: PingFangSC-Semibold;
        font-size: 22px;
        color: #ffffff;
        letter-spacing: 0.92px;
        text-align: center;
        line-height: 0px;
    }

    /* 管理端端样式 */

    .mainTab {
        margin-bottom: 30px;
    }

    .recordBtn {
        width: 57px;
        height: 20px;
        background: rgba(66, 133, 244, 0.1);
        border: 1px solid rgba(66, 133, 244, 0.6);
        border-radius: 3px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #4d7cfe;
        line-height: 3px;
    }

    .startGroup input {
        width: 162px;
        height: 28px;
    }

    .confirmBtn {
        width: 100%;
        height: 39px;
        background: #4da1ff;
        border-radius: 4px;
        color: white;
        font-size: 12px;
        line-height: 21px;
    }

    .confirmBtnBox>div {
        margin-left: 0;
    }

    .evaluateInput>textarea {
        width: 478px;
        height: 177px;
    }

    .evaluateMargin1 {
        margin-bottom: 68px;
    }

    .evaluateMargin>div {
        margin-left: 0px !important;
    }

    .evaluateBox .el-dialog__body {
        padding: 25px 60px;
    }

    .evaluateCont {
        width: 90%;
    }

    .evaluateCont>h5 {
        font-family: Helvetica;
        font-size: 0.14rem;
        color: #252631;
    }

    .evaluateCont>div {
        font-family: PingFangSC-Regular;
        font-size: 0.12rem;
        color: #98a9bc;
        line-height: 21px;
    }

    .evaluateBox2 li {
        margin-bottom: 18px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
    }

    /* 查看记录 */
    .hisMain {
        padding: 10px 28px;
    }

    .ohisList {
        margin-bottom: 25px;
    }

    .ohisList>h3 {
        margin-bottom: 15px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #000000;
        letter-spacing: -0.4px;
        font-weight: normal;
    }

    .ohisListMain {
        display: flex;
        display: -webkit-flex;
        margin-bottom: 15px;
    }

    .ohisListMain>div:first-child {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 12px;
    }

    .ohisListMain>div:first-child>img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .ohisListRg>div {
        font-size: 0.14rem;
        font-family: PingFangSC-Regular;
        color: #323c47;
    }

    .ohisListRg>div:first-child {
        color: #939eab;
        font-size: 0.12rem;
    }

    .ooRed {
        color: red !important;
    }

    .addHospitalBox {
        position: relative;
    }

    .addHospital {
        position: absolute;
        display: inline-block;
        width: 20px;
        height: 20px;
        right: 20px;
        top: 8px;
    }

    .addHospital>img {
        width: 100%;
        height: 100%;
    }

    .tablePublicClass {
        border: none;
    }

    .tablePublicClass .el-table td,
    .tablePublicClass .el-table th {
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #5e6875;
        letter-spacing: 0;
        border-right: none;
    }

    .tablePublicClass .el-table td {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #5e6875;
        letter-spacing: 0;
    }

    .seeDanganClass {
        width: 57px;
        height: 20px;
        background: rgba(255, 171, 43, 0.1);
        border: 1px solid rgba(255, 171, 43, 0.6);
        border-radius: 3px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #ffab2b;
        line-height: 1px;
    }

    .inviteUserClass {
        width: 57px;
        height: 20px;
        line-height: 1px;
        background: rgba(254, 77, 151, 0.1);
        border: 1px solid rgba(254, 77, 151, 0.6);
        border-radius: 3px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #FE4D97;
    }

    .seeHistoryMessage {
        width: 57px;
        height: 20px;
        background: rgba(66, 133, 244, 0.1);
        border: 1px solid rgba(66, 133, 244, 0.6);
        border-radius: 3px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #4d7cfe;
        line-height: 1px;
    }

    .goTohuizhen {
        width: 57px;
        height: 20px;
        background: rgba(66, 133, 244, 0.1);
        border: 1px solid rgba(66, 133, 244, 0.6);
        border-radius: 3px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #4d7cfe;
        line-height: 1px;
    }

    .overClass {
        width: 57px;
        height: 20px;
        background: rgba(119, 140, 162, 0.1);
        border: 1px solid rgba(119, 140, 162, 0.6);
        border-radius: 3px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #778ca2;
        line-height: 1px;
    }

    .el-table--border td,
    .el-table--border th,
    .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
        border-right: none
    }
>>>>>>> 5064d9a3402ebc53ba5cbb2875fc91bef4e10337
</style>