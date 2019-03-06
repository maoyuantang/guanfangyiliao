<template>
    <!-- 远程协作系统 -->
    <div class="cooperation">
        <el-dialog class="RecordDialog" title="" :visible.sync="isShowRecord" width="680px">
            <!-- <chat :sessionId="sessionId"></chat> -->
        </el-dialog>
        <!-- 管理端 -->
        <div class="cooperation" v-if="$store.state.user.viewRoot.now.name==='manager'">
            <div class="Admin-title">
                <normalTab :inData="oAdminTab" @reBack="getConsulTabData"></normalTab>
            </div>
            <div class="admin-oMain">
                <!-- 协作管理列表 -->
                <div v-if="manageOrCount">
                    <div class="mainTab">
                        <div>
                            <!-- 申请科室 -->
                            <selftag :inData="oTab1" @reback="getOTab1"></selftag>
                            <!-- 协作科室 -->
                            <selftag :inData="oTab2" @reback="getOTab2"></selftag>
                            <!-- 协作状态 -->
                            <selftag :inData="oTab3" @reback="getOTab3"></selftag>
                        </div>
                        <search @searchValue="adminSearchChange"></search>
                    </div>
                    <div>
                        <publicList :tableData="adminLists" :columns="adminColumns" :tableBtn="tableBtn" :cellColor="cellColor" @cellClickData="cellClickData"></publicList>
                    </div>
                </div>
                <!-- 统计 -->
                <div v-else>
                    <div class="mainTab">
                        <div>
                            <selftag :inData="oTab1" @reback="getOTab1"></selftag>
                        </div>
                        <statisticsWay @reBack="getFilterTime"></statisticsWay>
                        <!-- <publicTime ></publicTime> -->
                    </div>
                    <div style="display:flex">
                        <normalColumnChart :inData="drawData"> </normalColumnChart>
                    </div>
                </div>
            </div>
        </div>

        <!-- 医生端 -->
        <div class="cooperation" v-else>
            <div class="doc-title">
                <selftag :inData="oTab4" @reback="getOTab4"></selftag>
                <statisticsWay1 @reBack="getTjData"></statisticsWay1>
                <el-button class="startConsul" type="text" @click="initiateCollaboration() ">发起协作</el-button>
            </div>
            <div>
                <el-table :data="docTableData" border style="width: 100%">
                    <el-table-column fixed prop="synergyUserHead" label="协作编号"></el-table-column>
                    <el-table-column fixed prop="applyDeptName" label="发起科室"></el-table-column>
                    <el-table-column fixed prop="applyUserName" label="发起医生"></el-table-column>
                    <el-table-column fixed prop="" label="发起时间"></el-table-column>
                    <el-table-column fixed prop="synergyIntention" label="目的"></el-table-column>
                    <el-table-column fixed prop="synergyDeptName" label="协作科室"></el-table-column>
                    <el-table-column fixed prop="synergyUserName" label="协作医生"></el-table-column>
                    <el-table-column fixed prop="synergyStatus" label="状态"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <!-- <el-button @click="DoctorListFun1(scope.row)" type="text" size="small">病历</el-button>
							<el-button @click="DoctorListFun2(scope.row)" type="text" size="small">邀请</el-button>
							<el-button v-show="scope.row.status=='OVER'" @click="DoctorListFun3(scope.row)" type="text" size="small">查看记录</el-button>
							<el-button v-show="scope.row.status=='NEW' || scope.row.status=='UNDERWAY'" @click="DoctorListFun4(scope.row)" type="text" size="small">进入协作</el-button>
							<el-button v-show="scope.row.departmentId==userState.userId" @click="DoctorListFun5(scope.row)" type="text" size="small">结束</el-button> -->
                            <el-button @click="handleClick(scope.row)" type="text" size="small">病历</el-button>
                            <el-button @click="Invitation(scope.row)" type="text" size="small">邀请</el-button>
                            <el-button v-show="scope.row.status=='OVER'" @click="historicalRecord(scope.row)" type="text" size="small">查看记录</el-button>
                            <el-button v-show="scope.row.status=='NEW' || scope.row.status=='UNDERWAY'" @click="toConsultation(scope.row)" type="text" size="small">进入会诊</el-button>
                            <el-button v-show="scope.row.departmentId==userState.userId" @click="handleClick(scope.row)" type="text" size="small">结束</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog class="chatDialog" title="" :visible.sync="isShowChat" width="680px">
            <chat :sessionId="sessionId"></chat>
        </el-dialog>

        <!-- 发起协作弹框 -->
        <el-dialog class="evaluateBox evaluateBox2" title=" 发起协作" :visible.sync="centerDialogVisible" width="602px" hight="356px" center>
            <el-tree :data="invitationData1" @check="handleCheckChange" show-checkbox></el-tree>
            <el-form ref="form" :model="startXiezuo" label-width="80px">
                <el-form-item label="病历">
                    <el-select v-model="startXiezuo.recordId" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="目的">
                    <el-input v-model="startXiezuo.intention"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="startXiez()">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="sureInvitation()">确认邀请</el-button>
        </el-dialog>
        <!-- 查看记录 -->
        <div v-if="viewRecordVisible">
            <el-dialog class="evaluateBox evaluateBox2" title=" 查看记录" :visible.sync="viewRecordVisible" width="602px" hight="356px" center>
                <viewRecord></viewRecord>
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
        <!-- <div v-if="invitationVisible">
            <el-dialog class="evaluateBox evaluateBox2" title=" 邀请医生" :visible.sync="invitationVisible" width="602px" hight="356px" center>
                <el-tree :data="invitationData" :props="defaultProps" @check="handleCheckChange" show-checkbox></el-tree>
                <el-button type="primary" @click="sureInvitation()">确认邀请</el-button>
            </el-dialog>
        </div> -->
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
    sendSynergy //9.6 提交  发起协作  表单数据
    // receiveDept,//9.9本院参与科室
    // synergyChangeStatus, //9.7开始/结束协作
    // synergyInto,//9.8进入协作
    // receiveDoctor,//9.10本院参与医生
} from "../api/apiAll.js";
import { mapState } from "vuex";
import echarts from "../plugs/echarts.js";
import publicList from "../public/publicComponents/publicList.vue";
import selftag from "../public/publicComponents/selftag.vue";
import chat from "../public/publicComponents/chat.vue";
import normalTab from "../public/publicComponents/normalTab.vue";
import normalColumnChart from "../public/publicComponents/normalColumnChart.vue";
import search from "../public/publicComponents/search.vue";
import statisticsWay from "../public/publicComponents/statisticsWay.vue";
import statisticsWay1 from "../public/publicComponents/statisticsWay1.vue";
import receiveDepartent from "./xiezuo/receiveDepartent.vue";
import viewRecord from "./xiezuo/viewRecord.vue";
import doctorDetail from "./xiezuo/doctorDetail.vue";
import publicTime from "../public/publicComponents/publicTime.vue";
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
                receiverId: ["", ""]
            },
            adminLists: [],
            //管理端  切换管理和统计
            manageOrCount: true, //切换管理和统计
            //医生端  发起协作  弹框
            centerDialogVisible: false, //显示 发起协作 弹框
            isShowChat: false, //聊天框（操作下）
            isShowRecord: false, //查看记录

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
            props: {
                label: "name",
                children: "zones"
            },
            count: 1,
            //发起协作弹框  必备参数
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
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
                list: [
                    // {
                    // 	text: "全部",
                    // 	value: "ALL"
                    // },
                    // {
                    // 	text: "未开始",
                    // 	value: "0"
                    // },
                    // {
                    // 	text: "进行中",
                    // 	value: "1"
                    // },
                    // {
                    // 	text: "已结束",
                    // 	value: "2"
                    // }
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
                    prop: "1",
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
                    prop: "synergyDeptName",
                    label: "协作科室"
                },
                {
                    prop: "synergyUserName",
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
                        this.recordFun(index, row);
                    }
                }
            ],
            //统计
            //申请科室统计图
            monthToYear: [],
            drawData: {
                dataAxis: [
                    "点",
                    "击",
                    "柱",
                    "子",
                    "点",
                    "击",
                    "柱",
                    "子",
                    "点",
                    "击",
                    "柱",
                    "子"
                ], //每个柱子代表的类名
                data: [
                    220,
                    182,
                    191,
                    234,
                    220,
                    182,
                    191,
                    234,
                    220,
                    182,
                    191,
                    234
                ], //具体数值
                title: "申请科室统计图", //图表标题
                totalNumber: "555"
            },
            //发起科室统计图
            // drawDataStart: {
            // 	dataAxis: ['点', '击', '柱', '子', '点', '击', '柱', '子', '点', '击', '柱', '子'], //每个柱子代表的类名
            // 	data: [220, 182, 191, 234, 220, 182, 191, 234, 220, 182, 191, 234], //具体数值
            // 	title: "发起科室统计图", //图表标题
            // 	totalNumber: "555"
            // },

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
            doctorVisible: false //医生详情
            // groupVisible: false, //会诊评价
        };
    },

    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },

    methods: {
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
                this.invitationData1=res.data.body
                // $.each(res.data.body, function(index, text) {
                //     _this.invitationData1.push({
                //         label: text.name,
                //         children: [],
                //         id: text.id
                //     });
                //     if (text.children.length > 0) {
                //         $.each(text.children, function(oindex, otext) {
                //             _this.invitationData1[index].children.push({
                //                 label: otext.name,
                //                 id: otext.id
                //             });

                //             if (otext.children.length > 0) {
                //                 $.each(otext.children, function(oindex1, otext2) {
                //                     _this.invitationData1[index].children[oindex].children.push({
                //                         label: otext2.name,
                //                         id: otext2.id
                //                     });
                //                 });
                //             }
                //         });
                //     }
                // });
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        getTjData() {},
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
                $.each(res.data.body, function(index, text) {
                    _this.invitationData.push({
                        label: text.name,
                        children: []
                    });
                    $.each(text.children, function(oindex, otext) {
                        _this.invitationData[oindex].children.push({
                            label: text.name,
                            id: otext.id
                        });
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
        //确认邀请
        async sureInvitation() {
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
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //协作科室和协作医生
        async cellClickData(data) {
            console.log(data);
            if (data[1].label == "协作科室") {
                this.departVisible = true;
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
        //获取邀请列表
        // async Invitation(row) {
        //     this.consultationId = row.id;
        //     this.invitationData = [];
        //     this.invitationVisible = true;
        //     let _this = this;
        //     let query = {
        //         token: this.userState.token
        //     };
        //     const res = await enableSynergyDoctor(query);
        //     if (res.data && res.data.errCode === 0) {
        //         $.each(res.data.body, function(index, text) {
        //             _this.invitationData.push({
        //                 label: text.name,
        //                 children: []
        //             });
        //             $.each(text.children, function(oindex, otext) {
        //                 _this.invitationData[oindex].children.push({
        //                     label: text.name,
        //                     id: otext.id
        //                 });
        //             });
        //         });
        //     } else {
        //         //失败
        //         this.$notify.error({
        //             title: "警告",
        //             message: res.data.errMsg
        //         });
        //     }
        // },
        //自调用组件函数
        getConsulTabData(res) {
            //选择管理？统计？
            if (res.i == 0) {
                this.manageOrCount = true;
            } else if (res.i == 1) {
                this.manageOrCount = false;
            }
        },
        getOTab1(data) {
            //发起科室筛选
            this.initiateDepartmentId = data.index.value;
            this.getList1();
            this.getList2();
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
            this.doctorDate = data.index.value;
            this.DoctorList(); //医生端列表
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
            if (data.select.value == "DEPT") {
                this.statisticsType = 1;
            } else if (data.select.value == "DAY") {
                this.statisticsType = 2;
            } else if (data.select.value == "MONTH") {
                this.statisticsType = 3;
            } else if (data.select.value == "YEAR") {
                this.statisticsType = 4;
            }
            // this.count();
            this.getList2();
        },

        //筛选列表  管理端
        //1.21.1.科室筛选  工具栏 (管理) (管理)
        //申请科室   协作科室
        async getSelect1(oindex) {
            let _this = this;
            let query = {
                token: this.userState.token,
                type: "MANAGE"
            };
            const res = await toolDept(query);
            if (res.data && res.data.errCode === 0) {
                console.log("1.21.1.科室工具栏 +成功");
                console.log(res.data.body);
                if (res.data.body.length > 6) {
                    this.oTab1.more = true;
                } else {
                    this.oTab1.more = false;
                }
                $.each(res.data.body, function(index, text) {
                    //协作管理   申请科室   筛选列表
                    _this.oTab1.list.push({
                        text: text.name,
                        value: text.id
                    });
                    //协作管理   协作科室   筛选列表
                    _this.oTab2.list.push({
                        text: text.name,
                        value: text.id
                    });
                });
            } else {
                console.log("1.21.1.科室工具栏 +失败");
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //协作状态  筛选
        async getSelect2(oindex) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const res = await toolSynergyStatus(query);
            if (res.data && res.data.errCode === 0) {
                console.log("1.21.8.协作状态协作状态 +成功");
                console.log(res.data.body);
                if (res.data.body.length > 6) {
                    this.oTab3.more = true;
                } else {
                    this.oTab3.more = false;
                }
                $.each(res.data.body, function(index, text) {
                    //协作管理   协作状态   筛选列表
                    _this.oTab3.list.push({
                        text: text.name,
                        value: text.id
                    });
                });
            } else {
                console.log("1.21.8.协作状态协作状态 +失败");
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
                pageNum: 1,
                pageSize: 10,
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
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 管理1表   操作区
        //点击  查看记录
        recordFun(index, row) {
            console.log(index, row);
            this.isShowRecord = true;
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
                $.each(res.data.body.data, function(index, text) {
                    _this.drawData.dataAxis.push(text.unit);
                    _this.drawData.data.push(text.number);
                });
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
        //获取统计筛选科室列表-2
        // async getApplyTjList() {
        // 	this.drawData.dataAxis = [];
        // 	this.drawData.data = [];
        // 	let _this = this;
        // 	const options = {
        // 		token: this.userState.token,
        // 		applyDeptId: this.initiateDepartmentId,
        // 		type: 1,
        // 		startTime: this.time0,
        // 		endTime: this.time1,
        // 	};
        // 	// console.log(options)
        // 	const res = await manageStatistics(options);
        // 	if (res.data && res.data.errCode === 0) {
        // 		$.each(res.data.body.data, function (index, text) {
        // 			_this.drawData.dataAxis.push(text.unit);
        // 			_this.drawData.data.push(text.number);
        // 		});
        // 		console.log('getApplyTjList成功')
        // 	} else {
        // 		console.log('getApplyTjList失败')
        // 		//失败
        // 		this.$notify.error({
        // 			title: "警告",
        // 			message: res.data.errMsg
        // 		});
        // 	}
        // },

        // 医生表
        async DoctorList() {
            let _this = this;
            const options = {
                token: this.userState.token,
                query: "",
                pageNum: 1,
                pageSize: 15,
                status: this.adminStatus,
                applyDeptId: this.applyDepartmentId,
                synergyDeptId: this.acceptDepartmentId,
                startTime: this.time0,
                endTime: this.time1
            };
            const res = await synergyPage(options);
            if (res.data && res.data.errCode === 0) {
                this.docTableData = res.data.body.data2.list;
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
        //4、进入协作
        async DoctorListFun4(oObject) {
            this.isShowChat = true;
            this.sessionId = oObject.sessionId;
        },
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
        this.getSelect1();
        this.getSelect2();

        this.getList1(); //管理列表
        this.getList2(); //统计
        this.DoctorList(); //医生列表

        this.otherDoctor(); //可协作医生  列表
        this.dialogCase(); //可协作医生  列表
        this.dialogPurpose(); //可协作医生  列表
        this.DoctorList(); //医生协作列表
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
    justify-content: space-between;
}

.mainTab > div:first-child {
    width: auto !important;
}

/* 医生端样式 */
.cooperation .doc-title {
    display: flex;
    display: -webkit-flex;
    /* justify-content: space-evenly; */
    align-items: baseline;
    margin-bottom: 52px;
}

.el-tree-node__content {
    margin: 0 0 20px 20px !important;
}

.el-tree-node__content .el-checkbox__inner {
    width: 20px !important;
    height: 20px !important;
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

.startGroup {
    width: 30%;
    margin: auto;
}

.startGroup input {
    height: 30px;
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

.confirmBtnBox {
    display: flex;
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
</style>