<template>
    <div class="followUp">
              <admin v-if="$store.state.user.viewRoot.now.name==='manager'"></admin>
       <doctor v-else></doctor>
    </div>
</template>

<script>
import doctor from "./follow/doctor.vue";
import admin from "./follow/admin.vue";



export default {
    components: {
       doctor,
       admin
    },
    data() {
        return {
        };
    },
    async created() {
        // this.articleImg =
        //     "/m/v1/api/hdfs/fs/upload?token=" + this.userState.token;
        // this.circularData(this.odata["header"]);
        // this.getFoList(); //随访列表
        // this.getUsFollow(); //我的随访
        // this.getGroupList();
        // this.screenPublic(this.oTab2, toolFollowupType, "类型"); //随访类型
        // this.screenPublic(this.oTab3, toolFollowupMode, "方式"); //随访方式
        // this.screenPublic(this.oTab4, toolFollowupContent, "内容"); //随访内容

        // this.screenPublic(this.oTab6, toolSurveyType, "类型"); //调查类型
        // this.screenPublic(this.oTab66, toolSurveyType, "类型"); //调查类型
        // this.oTab66Remove();
        // this.screenPublic(this.oTab8, toolSurveyMode, "方式"); //调查方式
        // this.screenPublic(this.oTab5, toolDeviceType, "设备类型"); //设备类型
        // this.screenPublic(this.oTab9, toolFollowupHasPlan, "随访计划"); //有无计划
        // // 医生
        // this.screenPublic(this.oTab11, toolFollowupMode, "随访类型"); //随访类型
        // this.screenPublic(this.oTab14, queryTypeList, "文章类型"); //随访类型
        // this.screenPublic(this.oTab15, toolMemberGroup, "分组"); //我的随访分组
        // if (this.userState.rooter || this.userState.manager) {
        //     this.partDoctorType = "MANAGE";
        // } else {
        //     this.partDoctorType = "DOCTOR";
        // }
        // this.getDepartment(); //科室列表
        // this.oGetResultGraph(); //满意度统计
    },
    mounted() {},
    watch: {
        "$store.state.user.viewRoot.now.name": {
            handler(data) {
                this.oUserType = data;
            }
        }
    },
    methods: {
        // 分页
        // 随访管理
        changeCurrent1(data) {
            this.adminPageNum1 = data;
            this.getFoList();
        },
        // 满意度调查
        changeCurrent2(data) {
            this.adminPageNum2 = data;
            this.oGetResultList();
            this.oGetModelList();
        },
        changeCurrent3(data) {
            this.adminPageNum3 = data;
            this.oManagerGetDeviceList();
        },
        changeCurrent4(data) {
            this.adminPageNum4 = data;
            if (this.oDocThis == 1) {
                this.oGetTemplate();
            } else if (this.oDocThis == 2) {
                this.oQueryList();
            } else if (this.oDocThis == 3) {
                this.oQueryArticleList();
            } else if (this.oDocThis == 4) {
                this.getQueryPageByDoctorWeb();
            }
        },
        changeCurrent5(data) {
            this.adminPageNum5 = data;
            this.getAdminList();
        },
        oTab66Remove() {
            console.log(this.oTab66.list);
            this.oTab66.list = this.oTab6.list.slice(0);
            console.log(this.oTab66.list);
        },
        // 赛选条件接口
        //获取科室列表
        async getDepartment() {
            let _this = this;
            let query = {
                type: this.partDoctorType,
                token: this.userState.token
            };
            const res = await toolDept(query);
            if (res.data && res.data.errCode === 0) {
                console.log(res.data.body);
                if (res.data.body.length > 6) {
                    this.oTab1.more = true;
                } else {
                    this.oTab1.more = false;
                }
                $.each(res.data.body, function(index, text) {
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
            }
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
                $.each(res.data.body, function(index, text) {
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
        onEditorReady(editor) {},

        //筛选
        // 管理端科室
        getOTab1(data) {
            this.odepartment = data.index.value;
            // 随访管理
            if (this.switchNum == 0) {
                this.getFoList();
            } else if (this.switchNum == 2) {
                // 家用设备
                this.oManagerGetDeviceList();
            } else if (this.switchNum == 3) {
                // 统计
                this.oGetFollowupGraph();
                this.oGetFollowupRemarks();
                this.oGetFollowupFollow();
                this.oGetFollowupEquipment();
            }
        },
        // 满意度调查科室1
        getOTab13(data) {
            this.odepartment1 = data.index.value;
            if (this.indexTab2 == 0) {
                this.oGetResultList();
            } else if (this.indexTab2 == 1) {
                this.oGetModelList();
            } else if (this.indexTab2 == 2) {
                this.oGetMissileList();
            }
        },
        // 管理端类型
        getOTab2(data) {
            this.followMobanType = data.index.value;
            this.oGetTemplate();
            // this.getUsFollow();
            // this.oQueryList();
        },
        // 管理端方式
        getOTab3(data) {
            this.oTheWay = data.index.value;
            this.getFoList();
            // this.getFoList();
            // this.getUsFollow();
        },
        // 管理端内容
        getOTab4(data) {
            this.oContent = data.index.value;
            this.getFoList();
            // this.getUsFollow();
        },
        getOTab5(data) {
            this.equiType = data.index.value;
            this.getFoList();
            // this.getfamiliList();
        },
        getOTab6(data) {
            this.mydType = data.index.value;
            if (this.indexTab2 == 0) {
                this.oGetResultList();
            } else if (this.indexTab2 == 1) {
                this.oGetModelList();
            }
            // this.oGetModelList();
            // this.oGetResultList();
        },
        getOTab7(data) {
            this.userType = data.index.value;
            this.oGetMissileList();
        },
        getOTab8(data) {
            this.mydMode = data.index.value;
            if (this.indexTab2 == 0) {
                this.oGetResultList();
            } else if (this.indexTab2 == 1) {
                this.oGetModelList();
            }
        },
        //有无随访计划
        getOTab9(data) {
            this.hadFollowup = data.index.value;
            this.getUsFollow();
        },
        //有无随访时间
        getOTab10(data) {
            console.log(data);
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

            if (data.index.text == "今天") {
                this.docStartTime = year + "-" + month + "-" + day;
                this.docEndTime = year + "-" + month + "-" + day;
                console.log(this.docStartTime);
            } else if (data.index.text == "未来3天") {
                oday = day + 2;
                this.docStartTime = year + "-" + month + "-" + day;
                this.docEndTime = year + "-" + month + "-" + oday;
            }

            this.getUsFollow();
        },
        //有无随访类型
        getOTab11(data) {
            this.houseDeviceType = data.index.value;
            this.getUsFollow();
        },
        //随访计划接口
        //获取随访管理列表
        async getFoList() {
            let _this = this;
            const options = {
                token: this.userState.token,
                search: this.searchData,
                department: this.odepartment,
                type: this.otype,
                mode: this.oTheWay,
                content: this.oContent,
                pageNum: this.adminPageNum1,
                pageSize: 10
            };
            const res = await managerGetPlanList(options);
            if (res.data && res.data.errCode === 0) {
                this.adminTotal1 = res.data.body.data2.total;
                this.tableDataList = res.data.body.data2.list;
                console.log(this.tableDataList);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //查看随访计划详情
        async seeFollow(index, row) {
            this.followPlanVisible = true;
            let _this = this;
            const options = {
                token: this.userState.token,
                planId: row.id
            };
            const res = await getFollowUpPlan(options);
            if (res.data && res.data.errCode === 0) {
                this.followPlanData = [];
                this.followPlanData = res.data.body;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //满意度接口
        // 满意度调查切换
        followUp2Fun(index) {
            this.mydChoice = index;
            this.indexTab2 = index;
            this.odepartment1 = "";
            if (index == 0) {
                this.oGetResultList();
                this.oGetResultGraph();
                this.addFollowVis = false;
                (this.mydTableChecked = false),
                    (this.sendTemplateListVis = false),
                    (this.wayVisible1 = true);
                this.wayVisible2 = true;
                (this.wayVisible3 = false),
                    (this.satisfiedColumns = [
                        {
                            prop: "department",
                            label: "科室"
                        },
                        {
                            prop: "type",
                            label: "类型"
                        },
                        {
                            prop: "mode",
                            label: "方式"
                        },
                        {
                            prop: "title",
                            label: "模板"
                        },
                        {
                            prop: "sender",
                            label: "调查人"
                        },
                        {
                            prop: "sendNum",
                            label: "调查数"
                        },
                        {
                            prop: "receiveNum",
                            label: "接受数"
                        },
                        {
                            prop: "feedbackNum",
                            label: "反馈数"
                        },
                        {
                            prop: "feedbackPercent",
                            label: "反馈率"
                        }
                    ]);
                this.SatisfiedBtn = [];
            } else if (index == 1) {
                this.oGetModelList();
                (this.mydTableChecked = false),
                    (this.sendTemplateListVis = false),
                    (this.wayVisible1 = true);
                this.wayVisible2 = false;
                this.wayVisible3 = false;
                this.addFollowVis = true;

                this.satisfiedColumns = [
                    {
                        prop: "name",
                        label: "名称"
                    },
                    {
                        prop: "department",
                        label: "科室"
                    },
                    {
                        prop: "type",
                        label: "类型"
                    },
                    {
                        prop: "context",
                        label: "内容"
                    },
                    {
                        prop: "createTime",
                        label: "创建时间"
                    },
                    {
                        prop: "editTime",
                        label: "修改时间"
                    },
                    {
                        prop: "sendNum",
                        label: "发送数"
                    },
                    {
                        prop: "replyNum",
                        label: "回复数"
                    },
                    {
                        prop: "status",
                        label: "状态"
                    },
                    {
                        prop: "updater",
                        label: "最近修改"
                    }
                ];
                this.SatisfiedBtn = [
                    {
                        name: "编辑",
                        oclass: "viewFollow",
                        method: (index, row) => {
                            this.editModel(index, row);
                        }
                    },
                    {
                        name: "删除",
                        oclass: "viewFollow",
                        method: (index, row) => {
                            this.deleteModel(row.id);
                        }
                    }
                ];
            } else {
                (this.mydTableChecked = true),
                    (this.sendTemplateListVis = true);
                this.wayVisible1 = false;
                this.addFollowVis = false;
                this.wayVisible2 = false;
                this.wayVisible3 = true;
                this.oGetMissileList();
                this.satisfiedColumns = [
                    {
                        prop: "userName",
                        label: "姓名"
                    },
                    {
                        prop: "phone",
                        label: "手机号"
                    },
                    {
                        prop: "userType",
                        label: "用户类型"
                    },
                    {
                        prop: "hospital",
                        label: "医院"
                    },
                    {
                        prop: "department",
                        label: "科室"
                    },
                    {
                        prop: "loginTime",
                        label: "登录时间"
                    },
                    {
                        prop: "sendStatus",
                        label: "发送状态"
                    },
                    {
                        prop: "sendTime",
                        label: "发送时间"
                    }
                ];
                this.SatisfiedBtn = [];
            }
        },
        //  一
        //满意度调查管理接口1
        async oGetResultList() {
            let _this = this;
            const options = {
                token: this.userState.token,
                type: this.mydType,
                mode: this.mydMode,
                search: this.mydSearchData,
                department: this.odepartment1,
                pageNum: this.adminPageNum2,
                pageSize: 10
            };
            const res = await getResultList(options);
            if (res.data && res.data.errCode === 0) {
                _this.satisfiedList = res.data.body.data2.list;
                console.log(_this.satisfiedList);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //  二
        //满意度调查模板接口2
        async oGetModelList() {
            let _this = this;
            const options = {
                token: this.userState.token,
                type: this.mydType,
                search: this.mydSearchData,
                department: this.odepartment1,
                start: this.mydStartTime,
                end: this.mydEndTime,
                pageNum: this.adminPageNum2,
                pageSize: 10
            };
            const res = await getModelInsert(options);
            if (res.data && res.data.errCode === 0) {
                _this.satisfiedList = res.data.body.data2.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //获取可发送的用户列表3
        async oGetMissileList() {
            let _this = this;
            const options = {
                token: this.userState.token,
                userType: this.userType,
                search: this.mydSearchData,
                department: this.odepartment1,
                pageNum: 1,
                pageSize: 10
            };
            const res = await getMissileList(options);
            if (res.data && res.data.errCode === 0) {
                _this.satisfiedList = res.data.body.data2.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //满意度调查发送模板3
        async sendTemplateList() {
            this.templateVisible = true;

            let _this = this;
            let query = {
                token: this.userState.token,
                type: ""
            };
            const res = await getTitleList(query);
            if (res.data && res.data.errCode === 0) {
                this.mydTemplateTitle = res.data.body;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        async sendTemplateList1(value) {
            console.log(value);
            let _this = this;
            let query = {
                token: this.userState.token,
                type: value
            };
            const res = await getTitleList(query);
            if (res.data && res.data.errCode === 0) {
                this.mydTemlateName.nameList = res.data.body;
                console.log(value);
                if (value == "OUTPATIENT") {
                    _this.mydAddoptions[0].cities = [];
                    console.log(value);
                    $.each(res.data.body, function(index, text) {
                        _this.mydAddoptions[0].cities.push({
                            value: text.associationId,
                            label: text.title,
                            cities: [
                                {
                                    value: "",
                                    label: text.context,
                                    disabled: true
                                }
                            ]
                        });
                    });
                } else if (value == "MEDICALTECHNOLOGY") {
                    _this.mydAddoptions[1].cities = [];
                    $.each(res.data.body, function(index, text) {
                        _this.mydAddoptions[1].cities.push({
                            value: text.associationId,
                            label: text.title,
                            cities: [
                                {
                                    value: "",
                                    label: text.context
                                }
                            ]
                        });
                    });
                } else if (value == "INHOSPITAL") {
                    _this.mydAddoptions[2].cities = [];
                    $.each(res.data.body, function(index, text) {
                        _this.mydAddoptions[1].cities.push({
                            value: text.associationId,
                            label: text.title,
                            cities: [
                                {
                                    value: "",
                                    label: text.context
                                }
                            ]
                        });
                    });
                } else if (value == "ADMINISTRATION") {
                    _this.mydAddoptions[3].cities = [];
                    $.each(res.data.body, function(index, text) {
                        _this.mydAddoptions[1].cities.push({
                            value: text.associationId,
                            label: text.title,
                            cities: [
                                {
                                    value: "",
                                    label: text.context
                                }
                            ]
                        });
                    });
                } else if (value == "URL") {
                    _this.mydAddoptions[4].cities = [];
                    $.each(res.data.body, function(index, text) {
                        _this.mydAddoptions[1].cities.push({
                            value: text.associationId,
                            label: text.title,
                            cities: [
                                {
                                    value: "",
                                    label: text.context
                                }
                            ]
                        });
                    });
                } else if (value == "MEDICALTECHNOLOGY") {
                    _this.mydAddoptions[1].cities = [];
                    $.each(res.data.body, function(index, text) {
                        _this.mydAddoptions[1].cities.push({
                            value: text.associationId,
                            label: text.title,
                            cities: [
                                {
                                    value: "",
                                    label: text.context
                                }
                            ]
                        });
                    });
                } else if (value == "MEDICALTECHNOLOGY") {
                    _this.mydAddoptions[1].cities = [];
                    $.each(res.data.body, function(index, text) {
                        _this.mydAddoptions[1].cities.push({
                            value: text.associationId,
                            label: text.title,
                            cities: [
                                {
                                    value: "",
                                    label: text.context
                                }
                            ]
                        });
                    });
                }
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //模板内容
        sendTemplateContext(title, index, oid) {
            this.mydTemlateName.context = this.mydTemlateName.nameList[
                index
            ].context;
            this.mydTemlateName.title = title;
            this.mydAddData.associations[index].associationId = oid;
        },
        addMydAddoptions(oBody, num) {
            console.log(num);
            $.each(oBody, function(index, text) {
                this.mydAddoptions[0].cities.push({
                    value: text.associationId,
                    label: text.title,
                    cities: [
                        {
                            value: "",
                            label: text.context
                        }
                    ]
                });
            });
        },
        //选中满意度模板进行操作
        selectTemplate(index, text) {
            this.mydTemplateTitle.splice(index, 1);
            this.sendTemplateId.push(text.associationId);
            this.sendTemplate1.push(text);
            console.log(this.sendTemplateId);
        },
        //删除满意度模板
        deleteMydTemplate(index, text) {
            this.sendTemplate1.splice(index, 1);
            let oindex = this.sendTemplateId.indexOf(text.associationId);
            this.sendTemplateId.splice(oindex, 1);
            this.mydTemplateTitle.push(text);
            console.log(this.sendTemplateId);
        },
        getUserId(row) {
            console.log(row);
            let _this = this;
            $.each(row, (index, text) => {
                _this.userList.push(text.userId);
            });
        },
        //发送模板
        async sendBtn() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = {
                templateList: this.sendTemplateId,
                userList: this.userList
            };
            const res = await publishNotice(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "发送成功"
                });
                this.oGetMissileList();
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 调查模板删除
        async deleteModel(oid) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = {
                id: oid
            };
            const res = await deleteModel(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "删除成功"
                });
                setTimeout(function() {
                    _this.oGetModelList();
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //  三

        //家用设备接口
        //家用设备列表接口
        async oManagerGetDeviceList() {
            let _this = this;
            const options = {
                token: this.userState.token,
                houseDeviceType: this.houseDeviceType,
                search: this.searchData,
                department: this.department,
                pageNum: this.adminPageNum3,
                pageSize: 10
            };
            const res = await managerGetDeviceList(options);
            if (res.data && res.data.errCode === 0) {
                _this.adminTotal3 = res.data.body.data2.total;
                _this.tableDataListFa = res.data.body.data2.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //统计接口
        //获取住院随访统计
        async oGetFollowupGraph() {
            this.drawData.dataAxis = [];
            this.drawData.data = [];
            let _this = this;
            const options = {
                token: this.userState.token,
                department: this.odepartment4,
                type: this.tjType,
                startDate: this.tjStartTime,
                endDate: this.tjEndTime
            };
            const res = await INHOSPITAL(options);
            if (res.data && res.data.errCode === 0) {
                // _this.drawData.totalNumber = res.data.body.total;
                // $.each(res.data.body.data, function(index, text) {
                //     _this.drawData.dataAxis.push(text.x);
                //     _this.drawData.data.push(text.y);
                // });
                this.drawData.total = res.data.body.total;
                this.drawData.dataAxis = res.data.body.data.map(item => item.x);
                this.drawData.data = res.data.body.data.map(item => item.y);
                this.drawData = Object.assign({}, this.drawData);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 获取门诊随访统计
        async oGetFollowupRemarks() {
            this.drawDataStart.dataAxis = [];
            this.drawDataStart.data = [];
            let _this = this;
            const options = {
                token: this.userState.token,
                department: this.odepartment4,
                type: this.tjType,
                startDate: this.tjStartTime,
                endDate: this.tjEndTime
            };
            const res = await OUTPATIENT(options);
            if (res.data && res.data.errCode === 0) {
                // _this.drawDataStart.totalNumber = res.data.body.total;
                // $.each(res.data.body.data, function(index, text) {
                //     _this.drawDataStart.dataAxis.push(text.x);
                //     _this.drawDataStart.data.push(text.y);
                // });
                this.drawDataStart.total = res.data.body.total;
                this.drawDataStart.dataAxis = res.data.body.data.map(
                    item => item.x
                );
                this.drawDataStart.data = res.data.body.data.map(
                    item => item.y
                );
                this.drawDataStart = Object.assign({}, this.drawDataStart);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 获取设备监测人次
        async oGetFollowupEquipment() {
            this.drawDataEquipment.dataAxis = [];
            this.drawDataEquipment.data = [];
            let _this = this;
            const options = {
                token: this.userState.token,
                department: this.odepartment4,
                type: this.tjType,
                startDate: this.tjStartTime,
                endDate: this.tjEndTime
            };
            const res = await SETEQUIPMENT(options);
            if (res.data && res.data.errCode === 0) {
                this.drawDataEquipment.total = res.data.body.total;
                this.drawDataEquipment.dataAxis = res.data.body.data.map(
                    item => item.x
                );
                this.drawDataEquipment.data = res.data.body.data.map(
                    item => item.y
                );
                this.drawDataEquipment = Object.assign(
                    {},
                    this.drawDataEquipment
                );
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 获取智能随访人次
        async oGetFollowupFollow() {
            this.drawDataFollow.dataAxis = [];
            this.drawDataFollow.data = [];
            let _this = this;
            const options = {
                token: this.userState.token,
                department: this.odepartment4,
                type: this.tjType,
                startDate: this.tjStartTime,
                endDate: this.tjEndTime
            };
            const res = await SETFOLLOWCHART(options);
            if (res.data && res.data.errCode === 0) {
                this.drawDataFollow.total = res.data.body.total;
                this.drawDataFollow.dataAxis = res.data.body.data.map(
                    item => item.x
                );
                this.drawDataFollow.data = res.data.body.data.map(
                    item => item.y
                );
                this.drawDataFollow = Object.assign({}, this.drawDataFollow);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //统计时间
        tjTimeValueFun(data) {
            console.log(data);
            this.tjType = data.select.value;
            if (data.time) {
                this.tjStartTime = data.time[0];
                this.tjEndTime = data.time[0];
            }

            this.oGetFollowupGraph();
            this.oGetFollowupRemarks();
            this.oGetFollowupFollow();
            this.oGetFollowupEquipment();
        },

        getConsulTabData(res) {
            this.oMainShow = res.i;
            this.odepartment = "";
            this.switchNum = res.i;
            this.odepartment = "";
            if (res.i == 0) {
                this.getFoList();
            } else if (res.i == 1) {
                this.oGetResultList();
            } else if (res.i == 2) {
                this.oManagerGetDeviceList(); //家用设备列表
            } else if (res.i == 3) {
                this.oGetFollowupGraph();
                this.oGetFollowupRemarks();
                this.oGetFollowupFollow();
                this.oGetFollowupEquipment();
            }
        },
        // 表格分页
        seeCurrentChange() {},
        handleDel(index, row) {},
        //处理标题数据好方便传入子组件
        circularData(data) {},
        //搜索框
        adminSearchChange(data) {
            this.getFoList();
            this.oGetModelList();
            this.oGetResultList();
            this.searchData = data;
        },
        //医生端接口
        //医生端tab切换
        docTab(oindex) {
            this.oDocThis = oindex;
            this.adminPageNum4 = 1;
            this.docSearchData = "";
            if (oindex == 0) {
                this.doctorSxVisiable = true;
            } else {
                this.doctorSxVisiable = false;
            }
            if (oindex == 0) {
                //我的随访
                this.myFollowVisable = true;
                this.docAddTemplate = false;
                (this.doctorColumns = [
                    {
                        prop: "userName",
                        label: "姓名"
                    },
                    {
                        prop: "origin",
                        label: "来源"
                    },
                    {
                        prop: "phone",
                        label: "手机号"
                    },
                    {
                        prop: "group",
                        label: "分组"
                    },
                    {
                        prop: "nearlyFollowup",
                        label: "近期随访"
                    },
                    {
                        prop: "phoneFollowup",
                        label: "电话随访"
                    },
                    {
                        prop: "deviceAlert",
                        label: "设备告警"
                    }
                ]),
                    (this.doctorTemplateVisiable = false);
                this.docTableChecked = true;
                this.getUsFollow();
                this.getGroupList();
                this.doctorBtn = [
                    {
                        name: "查看档案",
                        oclass: "seeDanganClass",
                        method: (index, row) => {
                            this.docFollowDelete0(index, row);
                        }
                    },
                    {
                        name: "发送",
                        oclass: "sendMessage",
                        method: (index, row) => {
                            this.docFollowDelete0(index, row);
                        }
                    },
                    {
                        name: "查看详情",
                        oclass: "seeDetail",
                        method: (index, row) => {
                            this.myFollowDetail(index, row);
                        }
                    }
                ];
            } else if (oindex == 1) {
                //随访模板

                this.myFollowVisable = false;
                this.docAddTemplate = true;
                (this.doctorColumns = [
                    {
                        prop: "id",
                        label: "编号"
                    },
                    {
                        prop: "department",
                        label: "科室"
                    },
                    {
                        prop: "title",
                        label: "随访模板名"
                    },
                    {
                        prop: "userName",
                        label: "作者"
                    },
                    {
                        prop: "createTime",
                        label: "创建时间"
                    },
                    {
                        prop: "updateTime",
                        label: "最后修改时间"
                    },
                    {
                        prop: "useNumber",
                        label: "使用量"
                    }
                ]),
                    (this.doctorTemplateVisiable = true);
                this.docTableChecked = false;
                this.oGetTemplate();
                this.doctorBtn = [
                    {
                        name: "删除",
                        oclass: "viewFollow",
                        method: (index, row) => {
                            this.docFollowDelete(deleteTemplate, index, row, 1);
                        }
                    }
                ];
            } else if (oindex == 2) {
                //门诊模板
                this.myFollowVisable = false;
                this.docAddTemplate = true;
                (this.doctorColumns = [
                    {
                        prop: "id",
                        label: "编号"
                    },
                    {
                        prop: "department",
                        label: "科室"
                    },
                    {
                        prop: "modelTitle",
                        label: "问诊模板名"
                    },
                    {
                        prop: "userName",
                        label: "作者"
                    },
                    {
                        prop: "createTime",
                        label: "创建时间"
                    },
                    {
                        prop: "updateTime",
                        label: "最后修改时间"
                    },
                    {
                        prop: "useNumber",
                        label: "使用量"
                    }
                ]),
                    (this.doctorTemplateVisiable = false);
                this.docTableChecked = false;
                this.oQueryList();
                this.doctorBtn = [
                    {
                        name: "删除",
                        oclass: "viewFollow",
                        method: (index, row) => {
                            this.docFollowDelete(deleteInquiry, index, row, 2);
                        }
                    }
                ];
            } else if (oindex == 3) {
                //宣教文章
                this.myFollowVisable = false;
                this.docAddTemplate = true;
                (this.doctorColumns = [
                    {
                        prop: "id",
                        label: "编号"
                    },
                    {
                        prop: "department",
                        label: "科室"
                    },
                    {
                        prop: "title",
                        label: "文章名"
                    },
                    {
                        prop: "userName",
                        label: "作者"
                    },
                    {
                        prop: "createTime",
                        label: "创建时间"
                    },
                    {
                        prop: "updateTime",
                        label: "最后修改时间"
                    },
                    {
                        prop: "useNumber",
                        label: "使用量"
                    }
                ]),
                    (this.doctorTemplateVisiable = false);
                this.docTableChecked = false;
                this.oQueryArticleList();
                this.doctorBtn = [
                    {
                        name: "删除",
                        oclass: "viewFollow",
                        method: (index, row) => {
                            this.docFollowDelete(deleteArticle, index, row, 3);
                        }
                    }
                ];
            } else if (oindex == 4) {
                //疾病风险
                this.myFollowVisable = false;
                this.docAddTemplate = false;
                (this.doctorColumns = [
                    {
                        prop: "id",
                        label: "编号"
                    },
                    {
                        prop: "department",
                        label: "科室"
                    },
                    {
                        prop: "title",
                        label: "评估表名"
                    },
                    {
                        prop: "userName",
                        label: "作者"
                    },
                    {
                        prop: "createTime",
                        label: "创建时间"
                    },
                    {
                        prop: "updateTime",
                        label: "最后修改时间"
                    },
                    {
                        prop: "useNumber",
                        label: "使用量"
                    }
                ]),
                    this.getQueryPageByDoctorWeb();
                this.doctorTemplateVisiable = false;
                this.docTableChecked = false;
                this.doctorBtn = [];
            }
        },
        //我的随访发送
        async sendMessage(row) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = {
                to: row.userId
            };
            const res = await fetchChatSession(query, options);
            if (res.data && res.data.errCode === 0) {
                _this.sessionId = res.data.body;
                _this.chatVisible = true;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //用户组列表
        async getGroupList() {
            let _this = this;
            let query = {
                token: this.userState.token,
                homepage: true
            };
            const res = await groupSelects(query);
            if (res.data && res.data.errCode === 0) {
                _this.groupList = res.data.body;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //新增组
        async addGroup(value) {
            this.groupVisible = true;
        },
        followCheckChange(data) {
            console.log(data);
            let _this = this;
            _this.groupUserId = [];
            $.each(data, function(index, text) {
                _this.groupUserId.push(text.userId);
            });
        },
        //移动分组
        async changeGroup(value, index) {
            let groupUserId1 = this.groupUserId.join(",");
            this.oGroupClick = index;
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                groupId: value,
                userId: groupUserId1
            };
            const res = await addGroupMember(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "移动成功！"
                });
                setTimeout(function() {
                    _this.getUsFollow();
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //确认添加组
        async sureAddGroup() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                groupName: this.groupName
            };
            const res = await addfenzu(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "新增成功！"
                });
                setTimeout(function() {
                    _this.groupVisible = false;
                    _this.getGroupList();
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 新增模板
        docAddTemplateFun() {
            if (this.oDocThis == 1) {
                this.followTableVisible = true;
            } else if (this.oDocThis == 2) {
                this.QuestTableVisible = true;
            } else if (this.oDocThis == 3) {
                this.articleTableVisible = true;
            }
        },

        //搜索
        docSearchChange(data) {
            this.docSearchData = data;
            this.getUsFollow();
            this.oGetTemplate();
            this.oQueryList();
            this.oQueryArticleList();
        },
        searchChange() {},
        //删除
        async docFollowDelete(deleteFunName, index, row, num) {
            let _this = this;
            const query = {
                token: this.userState.token
            };
            let options = num == 3 ? { articleId: row.id } : { id: row.id };

            const res = await deleteFunName(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "删除成功"
                });
                setTimeout(function() {
                    if (num == 1) {
                        _this.oGetTemplate();
                    } else if (num == 2) {
                        _this.oQueryList();
                    } else if (num == 3) {
                        _this.oQueryArticleList();
                    }
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        addQueatOrArticle() {},
        //切换
        docDeperment(data) {
            console.log(data.index.value);
            this.groupId = data.index.value;
            this.getUsFollow();
            // if (this.oDocThis == 0) {
            //     this.getUsFollow();
            // } else if (this.oDocThis == 1) {
            //     this.oGetTemplate();
            // } else if (this.oDocThis == 2) {
            //     this.oQueryList();
            // } else if (this.oDocThis == 3) {
            //     this.oQueryArticleList();
            // } else if (this.oDocThis == 4) {
            //     this.getQueryPageByDoctorWeb();
            // }
        },
        //我的随访
        async getUsFollow() {
            let _this = this;
            const options = {
                token: this.userState.token,
                hadFollowup: this.hadFollowup,
                search: this.docSearchData,
                groupId: this.groupId,
                startTime: this.docStartTime,
                endTime: this.docEndTime,
                mode: ""
            };
            const res = await myFollowup(options);
            if (res.data && res.data.errCode === 0) {
                _this.adminTotal5 = res.data.body.data2.total;
                _this.myFollowList = res.data.body.data2.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        getDocTime(data) {
            console.log(data);
            this.docStartTime = data[0];
            this.docEndTime = data[1];
            this.getUsFollow();
        },
        //随访模板
        //随访模板列表

        async oGetTemplate() {
            let _this = this;
            const options = {
                token: this.userState.token,
                search: this.docSearchData,
                type: this.followMobanType,
                department: this.docDepartment,
                pageNum: this.adminPageNum4,
                pageSize: 10
            };
            const res = await getTemplate(options);
            if (res.data && res.data.errCode === 0) {
                _this.adminTotal4 = res.data.body.data2.total;
                _this.doctorList = res.data.body.data2.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //门诊模板
        //门诊列表
        async oQueryList() {
            let _this = this;
            const options = {
                token: this.userState.token,
                search: this.docSearchData,
                department: this.docDepartment,
                pageNum: this.adminPageNum4,
                pageSize: 10
            };
            const res = await queryList(options);
            if (res.data && res.data.errCode === 0) {
                _this.adminTotal4 = res.data.body.data2.total;
                _this.doctorList = res.data.body.data2.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //宣教文章
        //宣教文章列表
        async oQueryArticleList() {
            let _this = this;
            const options = {
                token: this.userState.token,
                search: this.docSearchData,
                department: this.docDepartment,
                pageNum: this.adminPageNum4,
                pageSize: 10
            };
            const res = await queryArticleList(options);
            if (res.data && res.data.errCode === 0) {
                _this.adminTotal4 = res.data.body.data2.total;
                _this.doctorList = res.data.body.data2.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //疾病风险评估模板
        //列表
        async getQueryPageByDoctorWeb() {
            let _this = this;
            const query = {
                token: this.userState.token,
                pageNum: this.adminPageNum4,
                pageSize: 10
            };
            const res = await queryPageByDoctorWeb(query);
            if (res.data && res.data.errCode === 0) {
                _this.adminTotal4 = res.data.body.data2.total;
                _this.doctorList = res.data.body.data2.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //确认选择的问诊和文章
        sureQuestArticle(data) {
            this.questCheckList = data.questCheckList;
            this.articleCheckList = data.articleCheckList;
            this.questList = data.questList;
            this.articleList = data.articleList;
            console.log(this.articleCheckList);
            let _this = this;
            _this.addFollowData.itemModels[
                _this.questOindex
            ].contentModels = [];
            $.each(this.questList, function(index, text) {
                $.each(_this.questCheckList, function(index1, text1) {
                    if (text.id == text1) {
                        _this.addFollowData.itemModels[
                            _this.questOindex
                        ].contentModels.push({
                            followUpType: "INQUIRY",
                            title: text.title,
                            contentId: text.id
                        });
                    }
                });
            });
            $.each(this.articleList, function(index2, text2) {
                $.each(_this.articleCheckList, function(index3, text3) {
                    if (text2.id == text3) {
                        _this.addFollowData.itemModels[
                            _this.questOindex
                        ].contentModels.push({
                            followUpType: "ESSAY",
                            title: text2.title,
                            contentId: text2.id
                        });
                    }
                });
            });
            this.questVisible = false;
        },
        // 新增随访表接口
        addQuestOrAricle(index) {
            this.questOindex = index;
            this.questVisible = true;
        },
        //删除问诊表
        deleteQuest(index, oindex) {
            this.addFollowData.itemModels[index].contentModels.splice(
                oindex,
                1
            );
        },
        //添加一项
        addFollowTimeList() {
            this.addFollowData.itemModels.push({
                calcVal: 1,
                calcUnit: "天",
                state: true,
                contentModels: []
            });
        },
        //删除当前项
        deleteFollowTimeList(index) {
            this.addFollowData.itemModels.splice(index, 1);
        },
        //新增随访表
        async addFollowTable() {
            let addFollowData1 = JSON.parse(
                JSON.stringify(this.addFollowData.itemModels)
            );

            let olength = $(".addQuestBoxUlBox>li").length;
            for (let i = 0; i < olength; i++) {
                addFollowData1[i].contentModels.unshift({
                    followUpType: "REMIND",
                    title: $(".addQuestBoxUlBox>li:eq(" + i + ")")
                        .find(".remindText")
                        .val(),
                    contentId: null
                });
            }
            let _this = this;
            let query = {
                token: this.userState.token
            };
            // const options = addFollowData1;
            const options = {
                department: this.addFollowData.department,
                title: this.addFollowData.title,
                type: "INHOSPITAL",
                remindMe: this.addFollowData.remindMe,
                remindHe: this.addFollowData.remindHe,
                remindDays: this.addFollowData.remindDays,
                itemModels: addFollowData1
            };
            const res = await add(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "新增成功"
                });
                setTimeout(function() {
                    _this.followTableVisible = false;
                    _this.oGetTemplate();
                    _this.addFollowData = {
                        department: [],
                        title: " ",
                        type: "INHOSPITAL",
                        remindMe: true,
                        remindHe: true,
                        remindDays: 1,
                        itemModels: [
                            {
                                calcVal: 1,
                                calcUnit: "天",
                                state: true,
                                contentModels: []
                            }
                        ]
                    };
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },

        // 单选or多选or问答
        choiceItemFun(index2) {
            if (index2 == 0) {
                this.addQuestData.bankModels.push({
                    title: "",
                    questionType: "RADIO",
                    solutionModels: [
                        {
                            sortId: 1,
                            tag: "a",
                            answerDescribe: ""
                        }
                    ]
                });
            } else if (index2 == 1) {
                this.addQuestData.bankModels.push({
                    title: "",
                    questionType: "CHECKBOX",
                    solutionModels: [
                        {
                            sortId: 1,
                            tag: "a",
                            answerDescribe: ""
                        }
                    ]
                });
            } else if (index2 == 2) {
                this.addQuestData.bankModels.push({
                    title: " ",
                    questionType: "TEXT"
                });
            }
        },
        // 添加一项问题
        itemChoiceItemFun(index, type) {
            this.addQuestData.bankModels[index].solutionModels.push({
                sortId: 1,
                tag: "a",
                answerDescribe: ""
            });
        },
        //删除某一个选择
        deleteQuestText(index, index1) {
            this.addQuestData.bankModels[index].solutionModels.splice(
                index1,
                1
            );
        },
        // 删除某一个问题
        deleteQuestList(index) {
            this.addQuestData.bankModels.splice(index, 1);
        },
        // 新增问诊模板保存
        async addQuestTable() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = this.addQuestData;
            const res = await createInquiry(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "新增成功"
                });
                setTimeout(function() {
                    _this.oQueryList();
                    _this.QuestTableVisible = false;
                    this.addQuestData = {
                        departmentList: [],
                        title: "",
                        bankModels: [
                            {
                                title: "",
                                questionType: "TEXT"
                            },
                            {
                                title: "",
                                questionType: "CHECKBOX",
                                solutionModels: [
                                    {
                                        sortId: 1,
                                        tag: "a",
                                        answerDescribe: ""
                                    }
                                    // {
                                    //     sortId: 2,
                                    //     tag: "b",
                                    //     answerDescribe: "不对"
                                    // }
                                ]
                            }
                        ]
                    };
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //完成新增文章
        async addArticleTable() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = this.addArticleData;
            const res = await publishArticle(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "新增成功"
                });
                setTimeout(function() {
                    _this.oQueryArticleList();
                    _this.articleTableVisible = false;
                    _this.addArticleData = {
                        title: "",
                        articleType: " ",
                        subtitle: " ",
                        department: [],
                        content: "",
                        summary: " ",
                        pictureId: " ",
                        pictureDownPath: " ",
                        url: "",
                        visible: true,
                        openComment: true
                    };
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 上传图片
        articleImgSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.addArticleData.pictureId = res.body;
            console.log(this.addArticleData.pictureId);
        },
        //满意度新增模板跳出
        ificationBoxClick() {
            if (this.mydAddSuosuClassVis) {
                this.mydAddSuosuClassVis = false;
            } else {
                this.mydAddSuosuClassVis = true;
            }
        },
        //满意度饼图
        async oGetResultGraph() {
            let _this = this;
            let query = {
                token: this.userState.token,
                type: this.mydType,
                mode: this.mydMode,
                search: this.mydSearchData,
                department: this.odepartment1
            };
            const res = await getResultGraph(query);
            if (res.data && res.data.errCode === 0) {
                console.log(res.data.body);
                // _this.pieChart1.data = red.data.body.reply;
                // _this.pieChart2.data = red.data.body.age;
                // _this.pieChart3.data = red.data.body.department;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //满意度模板添加项
        addMydList() {
            this.mydAddData.associations.push({
                answer: "0",
                associationId: "5e34d5bb8aaf445794e56998e21587e8"
            });
        },
        //创建满意度模板
        async addMydTemplate() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = this.mydAddData;
            const res = await modelInsert(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "新增成功"
                });
                setTimeout(function() {
                    _this.mydAddTemplate = false;
                    _this.oGetModelList();
                    this.mydAddData = {
                        type: "OUTPATIENT",
                        name: "",
                        context: " ",
                        deptId: [],
                        associations: [
                            {
                                answer: " ",
                                associationId: " "
                            }
                        ]
                    };
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //编辑满意度调查模板
        async editModel(index, row) {
            this.addMydTemplateVis = false;
            this.mydAddTemplate = true;
            let _this = this;
            let query = {
                token: this.userState.token,
                id: row.id
            };
            const res = await getTemplateInfo(query);
            if (res.data && res.data.errCode === 0) {
                this.mydAddData = res.data.body;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //编辑满意度模板成功
        async editMydTemplate() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = this.mydAddData;
            const res = await editModel(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "编辑成功"
                });
                setTimeout(function() {
                    _this.mydAddTemplate = false;
                    _this.oGetModelList();
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },

        //我的随访查看详情
        async myFollowDetail(row) {
            let _this = this;
            let query = {
                token: this.userState.token,
                userId: row.userId
            };
            const res = await myFollowDetailFun(query);
            if (res.data && res.data.errCode === 0) {
                this.followDetailData = res.data.body;
                this.followDetailVisible = true;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //改变电话随访的值
        async phoneFollow(row) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = {
                id: row.userId,
                open: row.phoneFollowup
            };
            const res = await phoneFollowupSwitch(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "修改成功"
                });
                setTimeout(function() {
                    _this.getUsFollow();
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //改变电话随访的值
        async warnFollow(row) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = {
                id: row.userId,
                open: row.deviceAlert
            };
            const res = await alertSwitch(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "修改成功"
                });
                setTimeout(function() {
                    _this.getUsFollow();
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //设置设备告警值

        async setWarn(row) {
            let _this = this;
            let query = {
                token: this.userState.token,
                id: row.userId
            };
            const res = await alertGet(query);
            if (res.data && res.data.errCode === 0) {
                this.warnVisible = true;
                this.warnList = res.data.body;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //设置设备告警值
        async sureSetWarn(data) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = data;
            const res = await alertSet(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "修改成功"
                });
                setTimeout(function() {
                    _this.getUsFollow();
                    _this.warnVisible = false;
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //查看档案
        seeDanganClick(row) {
            this.$router.push({
                path: "/docDetailed",
                query: {
                    id: row.userId
                }
            });
        }
    }
};
</script>

<style>
.followUp2-tab {
    margin: 0 auto;
    display: flex;
    display: -webkit-flex;
    width: 314px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border: 1px solid #e5edf3;
    border-radius: 4px;
}
.followUp2-tab > li {
    flex-grow: 1;
    cursor: pointer;
}
.followUp2This {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #ffffff;
    letter-spacing: 0.3px;
    background: #195bdd;
    border-radius: 4px 0 0 4px;
}
.startConsul {
    margin-top: 21px;
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
.myStartConsul {
    margin-top: 0px;
}
/* 医生样式 */
.followDoc .titleTop {
    display: flex;
    display: -webkit-flex;
    margin-bottom: 45px;
}
.followDoc .titleTop > li {
    width: 176px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #0064d9;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
}
.followDoc .titleTop .title-this {
    background: #0064d9;
    color: #ffffff;
}
.viewFollow {
    width: 57px;
    height: 20px;
    background: rgba(66, 133, 244, 0.1);
    border: 1px solid rgba(66, 133, 244, 0.6);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #4d7cfe;
    line-height: 0;
}

/* 新增随访表 */
.addFollowTitle > input {
    width: 338px;
    height: 27px;
}
.el-dialog--center .el-dialog__body {
    padding: 0px 25px 30px;
}
.questTableName {
    color: red;
}
.addFollowMain input {
    height: 27px;
}
.addFollowMain li {
    margin-bottom: 10px;
    position: relative;
}
.addFollowMain1 > ul > li::before {
    content: "";
    display: block;

    position: absolute;
    left: -30px;
    top: 11px;
    width: 20px;
    height: 16px;
    background: url(../assets/img/Shape-Copy.png);
}
.addFollowMain1 .el-form-item__label {
    text-align: left;
}
.remindTime {
    position: relative;
}
.remindTime::before {
    content: "";
    display: block;

    position: absolute;
    left: -32px;
    top: 30px;
    width: 20px;
    height: 16px;
    background: url(../assets/img/Shape-Copy.png);
}
.addFollowMain .oTime input {
    width: 158px;
    height: 27px;
}
.addFollowMain .firstZhiliao {
    position: relative;
}
.addFollowMain .firstZhiliao::before {
    content: "";
    display: block;

    position: absolute;
    left: -30px;
    top: 11px;
    width: 20px;
    height: 16px;
    background: url(../assets/img/Shape-Copy.png);
}
.questBox > li {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    padding-left: 40px;
}
.questBox > li::before {
    content: "";
    display: block;

    position: absolute;
    top: 2px;
    left: 11px;
    width: 20px;
    height: 16px;
    background: url(../assets/img/Shape.png);
}
.addFollowBtn {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    height: 27px;
    background: white;
}
.questDelete {
    display: inline-block;
    cursor: pointer;
    width: 14px;
    height: 14px;
}
.questDelete > img {
    width: 100%;
    height: 100%;
}
.addFollowHou {
    width: 100px;
}
.el-input__icon {
    line-height: 27px;
}
.addFollowBox .el-form-item__content {
    margin-left: 0 !important;
}
.el-form-item {
    margin-bottom: 0;
}
.addArticleImg {
    position: relative;
    margin-bottom: 33px;
    width: 100px;
    height: 82px;
}
.addArticleImg .avatar-uploader .el-upload {
    width: 100%;
    height: 100%;
}
.addArticleImg > div:first-child {
    width: 100% !important;
    height: 100% !important;
}
.addArticleImg img {
    width: 100%;
    height: 100%;
}
.addArticleImg > div:last-child {
    position: absolute;
    width: 100%;
    height: 24px;
    bottom: 0;
    text-align: center;
    line-height: 24px;
    font-family: .PingFangSC-Regular;
    font-size: 12px;
    color: #ffffff;
    letter-spacing: -0.17px;
}
.addArticleImg input {
    display: none !important;
}
.ql-container {
    height: 144px;
}
.addArticleEditor {
    margin-bottom: 10px;
}
.sendTemplateBox {
    position: relative;
    margin: 20px 0;
    padding: 10px;
    width: 100%;
    height: 100px;
    background: rgba(250, 251, 252, 0);
    border: 1px solid #d8dfe5;
    border-radius: 5px;
}
.sendTemplateBox > ul {
    display: flex;
    display: -webkit-flex;
}
.sendTemplateBox > ul > li {
    padding: 2px 2px;
}
.addTemplate {
}
.mydAddTemplate-title {
    width: 100%;
    height: 117px;
}
.mydAddTemplate-title > img {
    width: 100%;
    height: 100%;
}
.mydQuestList {
    display: flex;
    display: -webkit-flex;
}
.mydQuestList > div {
    display: flex;
    display: -webkit-flex;
}
.addTemplate {
    width: 109px;
    text-align: center;
    position: absolute;
    top: 18px;
    left: 50%;
    margin-left: -55px;
}
.addTemplate > div:first-child {
    display: inline-block;
    width: 43px;
    height: 43px;
}
.addTemplate > div:first-child > img {
    width: 100%;
    height: 100%;
}
.DistanceFirst {
    display: flex;
    display: -webkit-flex;
    margin-top: -6px;
}
.DistanceFirst > div {
    width: 70px;
}
.addFollowBox .el-dialog__body {
    padding: 25px 50px;
}

/* 新增问诊模板 */
.addQuestBox .el-dialog__header,
.addQuestBox .el-dialog__body {
    background: #eff5fb;
}
.addQuestBox .el-dialog__body {
    padding: 18px 25px 30px;
}
.addQuestBox .el-form-item__label {
    width: 20px !important;
    line-height: 27px;
    padding: 0;
}
.addQuestBox .el-form-item__content {
    margin-left: 20px !important;
}
.addQuestBox input {
    width: 500px;
    border: none;
}
.addQuestBox .el-form-item {
    width: 500px;
    height: 27px;
    background: white;
}
.addQuestBox .el-form-item__content {
    line-height: 27px;
}
.redioSingleInput .el-checkbox__input {
    left: -8px;
}
.redioSingle > label {
    display: block;
}
.redioSingle > .el-checkbox {
    margin-left: 30px;
}
.choiceItemBox > span {
    padding: 0 5px;
    cursor: pointer;
}
.addQuestUl > li {
    position: relative;
    padding-top: 10px;
}
.deleteQuestList {
    position: absolute;
    right: 122px;
    top: 20px;
    width: 13px;
    height: 13px;
    cursor: pointer;
}
.deleteQuestList > img {
    width: 100%;
    height: 100%;
}
.redioSingleInput input {
    width: 338px;
}
.redioSingleInput .el-input {
    width: 344px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.questItemDelete {
    display: inline-block;
    width: 13px;
    height: 13px;
}
.questItemDelete > img {
    width: 100%;
    height: 100%;
}
.mydAddSuosuClass {
    display: flex;
    display: -webkit-flex;
    box-shadow: 3px 3px 3px #666;
}
.mydAddSuosuClass > ul:first-child {
    width: 100px;
}
.mydAddSuosuClass > ul:nth-child(2) {
    width: 100px;
}
.mydAddSuosuClass > div:last-child {
    width: 100px;
}

.classification {
    position: relative;
}
.mydAddSuosuClass {
    position: absolute;
    background: white;
}
.ArcticClass .el-form-item__content {
    margin-left: 0px !important;
}
.ArcticClass .el-dialog__header,
.ArcticClass .el-dialog__body {
    background: #eff5fb;
}
.ArcticClass .el-dialog__body {
    padding: 0px 6% 30px;
}
.ArcticClass .el-select .el-input__inner {
    width: 338px;
    height: 27px;
}
.ArcticClass .el-select {
    margin-bottom: 10px;
}
.articleContent {
    font-family: .PingFangSC-Regular;
    font-size: 12px;
    color: #646464;
    letter-spacing: -0.17px;
}
.addFollowMain > div:first-child {
    padding-left: 2.4%;
    padding-top: 3px;
    margin-bottom: 4.1%;
    width: 509px;
    height: 27px;
    background: #ffffff;
    /* border: 1px solid #d4e1f0; */
}
.addFollowMain .el-checkbox__label {
    font-family: .PingFangSC-Regular;
    font-size: 14px;
    color: #030303 !important;
    letter-spacing: -0.17px;
}
.addFollowMain > button {
    width: 169px;
    height: 38px;
    background: #6ca4fc;
    font-family: .PingFangSC-Regular;
    font-size: 18px;
    color: #ffffff;
    letter-spacing: -0.25px;
}
.choiceItemBox > span {
    display: inline-block;
    margin: 0 5px;
    width: 65px;
    height: 38px;
    background: #6ca4fc;
    text-align: center;
    line-height: 38px;
    font-family: .PingFangSC-Regular;
    font-size: 18px;
    color: #ffffff;
    letter-spacing: -0.25px;
}
.warnNumBox {
    display: flex;
    display: -webkit-flex;
    cursor: pointer;
}
.warnNum {
    width: 60px;
    height: 17px;
    background: #ffffff;
    border: 1px solid #e4e8eb;
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #909191;
    text-align: center;
    line-height: 17px;
}
.ificationBox {
    position: relative;
}
.ificationBox > div:last-child {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 8px;
    top: 0px;
}
.ificationBox > div:last-child > img {
    width: 100%;
    height: 100%;
}
.addFollowBoxFollow .el-dialog__header,
.addFollowBoxFollow .el-dialog__body {
    background: #eff5fb;
}
.firstDoctorTime .el-form-item__label {
    width: 110px !important;
}
.groupClass {
    position: relative;
    cursor: pointer;
}
.groupClass:hover ul {
    display: block;
}
.groupClass > div:first-child {
    width: 50px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background: #c1d9f3;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #5e696e;
    letter-spacing: 0;
}
.groupClass > ul {
    position: absolute;
    display: none;
    padding-top: 10px;
    padding-left: 10px;
    width: 125px;

    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #5e696e;
    letter-spacing: 0;
}
.groupClass > ul > li {
    padding-left: 5px;
    width: 100%;
    height: 22px;
    background: #f4f8fa;
}
.groupClick {
    background: #dbe1e5;
}
.pieChartClass {
    display: flex;
    display: -webkit-flex;
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
.sendMessage {
    width: 57px;
    height: 20px;
    background: rgba(255, 0, 0, 0.1);
    border: 1px solid #ea2929;
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #ff0000;
    line-height: 1px;
}
.seeDetail {
    width: 57px;
    height: 20px;
    background: rgba(66, 133, 244, 0.1);
    border: 1px solid rgba(66, 133, 244, 0.6);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    line-height: 1px;
    color: #4d7cfe;
}
.addImgClass {
    position: absolute;
    left: 0;
    top: 0;
}
.el-switch__core{
    width: 28px !important;
    height: 16px;
    /* /* border-color: #4D7CFE !important; */
    border-color: #F2F4F6 !important; 
    background: #F2F4F6 !important;
box-shadow: inset 0 0 1px 0 rgba(0,0,0,0.50);
}
.el-switch__core:after{
    width: 8px;
    height: 8px;
    background:#98A9BC;
    top: 3px
}
</style>