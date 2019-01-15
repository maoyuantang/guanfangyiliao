<template>
    <div class="followUp">
        <!-- 管理端 -->
        <div v-if="$store.state.user.viewRoot.name==='manager'">
            <div class="Admin-title">
                <normalTab :inData="oAdminTab" @reBack="getConsulTabData"></normalTab>
            </div>

            <div class="admin-oMain">
                <!-- 随访管理 -->
                <div v-show="0==oMainShow">
                    <div class="mainTab">
                        <div>
                            <selftag :inData="oTab1"></selftag>
                            <selftag :inData="oTab2" @reback="getOTab2"></selftag>
                            <selftag :inData="oTab3" @reback="getOTab3"></selftag>
                            <selftag :inData="oTab4" @reback="getOTab4"></selftag>
                        </div>

                        <search @searchValue="searchChange"></search>
                    </div>
                    <div>
                        
                        <tableList :tableData="tableDataList" :columns="columns" :tableBtn="tableBtn"></tableList>
                        <!-- <el-pagination background layout="prev, pager, next" :total="total" :page-size="opageSize" @current-change="seeCurrentChange">
                        </el-pagination> -->
                    </div>
                </div>
                <!-- 满意度调查 -->
                <div v-show="1==oMainShow">
                    <div style="display:flex;">
                        <ul class="followUp2-tab">
                            <li :class="{followUp2This:indexTab2==index}" v-for="(text,index) in followUpTab" :key="index" @click="followUp2Fun(index)">{{text.name}}</li>
                        </ul>
                        <search @searchValue="searchChange"></search>
                    </div>

                    <div class="mainTab">
                        <div>
                            <selftag :inData="oTab1"></selftag>
                            <selftag :inData="oTab2"></selftag>
                            <selftag :inData="oTab3"></selftag>
                        </div>

                        <el-button class="startConsul" type="text" @click="centerDialogVisible = true">新增模板</el-button>
                    </div>
                    <div>

                    </div>
                    <div>
                        <tableList :tableData="tableDataList" :columns="columns" :tableBtn="tableBtn"></tableList>
                    </div>
                </div>
                <!-- 家用设备检测 -->
                <div v-show="2==oMainShow">
                    <div class="mainTab">
                        <div>
                            <selftag :inData="oTab1" @reback="getOTab1"></selftag>
                            <selftag :inData="oTab5" @reback="getOTab5"></selftag>
                        </div>

                        <search @searchValue="searchChange"></search>
                    </div>
                    <div>
                       {{tableDataListFa}}
                        <tableList :tableData="tableDataListFa" :columns="columnsFa"></tableList>
                        <!-- <el-pagination background layout="prev, pager, next" :total="total" :page-size="opageSize" @current-change="seeCurrentChange">
                        </el-pagination> -->
                    </div>
                </div>
                <!-- 统计 -->
                <div v-show="3==oMainShow">
                    <div class="mainTab">
                        <div>
                            <selftag :inData="oTab1"></selftag>
                        </div>

                        <publicTime @timeValue="timeValueFun"></publicTime>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
        <!-- 医生端 -->
        <div v-else class=" followDoc">
            <div>
                <ul class="titleTop">
                    <li v-for="(text,index) in followDocTab" :class="{'title-this':index==oDocThis}" @click="docTab(index)">{{text.name}}</li>
                </ul>
            </div>
            <div class="admin-oMain">
                <!-- 我的随访 -->
                <div v-show="odocVisable==0">
                    <div class="mainTab">
                        <div>
                            <selftag :inData="oTab1"></selftag>
                            <selftag :inData="oTab2"></selftag>
                            <selftag :inData="oTab3"></selftag>
                            <selftag :inData="oTab4"></selftag>
                        </div>
                        <search @searchValue="searchChange"></search>
                    </div>
                    <div>
                        <tableList :tableData="tableDataList" :columns="columns" :tableBtn="tableBtn"></tableList>
                        <!-- <el-pagination background layout="prev, pager, next" :total="total" :page-size="opageSize" @current-change="seeCurrentChange">
                        </el-pagination> -->
                    </div>
                </div>
                <!-- 随访模板 -->
                <div v-show="odocVisable==1">
                    随访模板
                </div>
                <!-- 门诊模板 -->
                <div v-show="odocVisable==2">
                    门诊模板
                </div>
                <!-- 宣教文章 -->
                <div v-show="odocVisable==3">
                    宣教文章
                </div>
                <!-- 疾病风险评估 -->
                <div v-show="odocVisable==4">
                    疾病风险评估
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {
    managerGetPlanList,
    managerGetDeviceList,
    fetchHospitalDepts
} from "../api/apiAll.js";
import { mapState } from "vuex";
import echarts from "../plugs/echarts.js";
import normalTab from "../public/publicComponents/normalTab.vue";
import tableList from "../public/publicComponents/publicList.vue";
import search from "../public/publicComponents/search.vue";
import selftag from "../public/publicComponents/selftag.vue";
import statisticsWay from "../public/publicComponents/statisticsWay.vue";
import publicTime from "../public/publicComponents/publicTime.vue";
export default {
    watch:{
        tableDataListFa(n){console.log(n)},
        tableDataList(n){console.log(n)}
    },
    components: {
        tableList,
        search,
        normalTab,
        selftag,
        statisticsWay,
        publicTime
    },
    data() {
        return {
            odepartment: "",
            otype: "",
            oTheWay: "",
            equiType: "", //设备类型 血压计 血糖计
            oContent: "", //随访筛选
            odocVisable: 0, //医生端切换内容
            oMainShow: 0,
            indexTab2: 0,
            oDocThis: 0, //医生端tab切换
            oVisable: true, 
            oconsulVisable: true,
            followDocTab: [
                {
                    name: "我的随访",
                    value: ""
                },
                {
                    name: "随访模板",
                    value: ""
                },
                {
                    name: "门诊模板",
                    value: ""
                },
                {
                    name: "宣教文章",
                    value: ""
                },
                {
                    name: "疾病风险评估模板",
                    value: ""
                }
            ],
            followUpTab: [
                {
                    name: "调查管理",
                    value: ""
                },
                {
                    name: "调查模板",
                    value: ""
                },
                {
                    name: "调查发送",
                    value: ""
                }
            ],
            oAdminTab: {
                i: 0, //选中的是第几项，类型为int(注意：从0开始计数)
                list: [
                    //选项列表，类型Array
                    {
                        en: "MEDICAL FOLLOW-UP", //选项英文，类型 string
                        zh: "随访管理" //选项中文，类型string
                    },
                    {
                        en: "DEGREE OF SATISFACTION",
                        zh: "满意度调查"
                    },
                    {
                        en: "MONITOR",
                        zh: "家用设备监测"
                    },
                    {
                        en: "STATISTICS",
                        zh: "统计"
                    }
                ]
            },
            oTab1: {
                more: true,
                title: "科室",
                list: [
                    {
                        text: "全部",
                        value: ""
                    }
                ]
            }, //管理端tab
            oTab2: {
                more: false,
                title: "类型",
                list: [
                    {
                        text: "全部",
                        value: ""
                    },
                    {
                        text: "门诊随访",
                        value: "OUTPATIENT"
                    },
                    {
                        text: "住院随访",
                        value: "INHOSPITAL"
                    }
                ]
            }, //管理端tab
            oTab3: {
                more: false,
                title: "方式",
                list: [
                    {
                        text: "全部",
                        value: ""
                    },
                    {
                        text: "App",
                        value: "APP "
                    },
                    {
                        text: "电话",
                        value: "PHONE"
                    }
                ]
            }, //管理端tab
            oTab4: {
                more: false,
                title: "内容",
                list: [
                    {
                        text: "全部",
                        value: ""
                    },
                    {
                        text: "提醒",
                        value: "REMIND"
                    },
                    {
                        text: "问诊",
                        value: "INQUIRY"
                    },
                    {
                        text: "健康知识",
                        value: "ESSAY"
                    },
                    {
                        text: "疾病自评",
                        value: "MEDICAL"
                    },
                    {
                        text: "设备检测",
                        value: "DEVICE"
                    }
                ]
            }, //管理端tab
            oTab5: {
                more: false,
                title: "设备类型",
                list: [
                    {
                        text: "全部",
                        value: ""
                    },
                    {
                        text: "血压计",
                        value: "TONOMETER"
                    },
                    {
                        text: "血糖仪",
                        value: "GLUCOSE"
                    }
                ]
            }, //管理端tab
            odata: 1,
            columns: [{
                    prop: "department",
                    label: "科室"
                },
                {
                    prop: " type",
                    label: " 类型 "
                },
                {
                    prop: " title",
                    label: "随访模板名 "
                },
                {
                    prop: " doctor",
                    label: "医生 "
                },
                {
                    prop: "useNumber ",
                    label: " 病人"
                },
                {
                    prop: " appNum",
                    label: "App "
                },{
                    prop: "phoneNum",
                    label: "电话"
                },
                {
                    prop: " remind",
                    label: "提醒 "
                },
                {
                    prop: " inquiry",
                    label: "问卷 "
                },
                {
                    prop: " knowledge",
                    label: "知识 "
                },
                {
                    prop: "selfAssessment ",
                    label: " 自评"
                },
                {
                    prop: " deviceTest",
                    label: "自测 "
                },
                {
                    prop: " state",
                    label: "状态 "
                }],
            columnsFa: [
                {
                    prop: "department",
                    label: "科室"
                },
                {
                    prop: " deviceType",
                    label: "设备类型 "
                },
                {
                    prop: " serialNumber",
                    label: "设备编号 "
                },
                {
                    prop: " userName",
                    label: "用户 "
                },
                {
                    prop: "useNumber ",
                    label: " 使用量"
                },
                {
                    prop: " alertInfo",
                    label: "告警情况 "
                }
            ],
            tableDataList: [
            ],
            tableDataListFa: [],
            tableBtn: [
                {
                    name: "查看随访",
                    oclass: "viewFollow",
                    method: (index, row) => {
                        this.handleDel(index, row);
                    }
                }
            ]
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    async created() {
        this.circularData(this.odata["header"]);
        this.getFoList(); //随访列表
        this.getfamiliList(); //家用设备列表
        this.getDepartment(); //科室列表
    },
    mounted() {},
    methods: {
        //筛选
        getOTab1(data) {
            this.odepartment = data.index.value;
            this.getFoList();
            this.getfamiliList();
        },
        getOTab2(data) {
            this.otype = data.index.value;
            this.getFoList();
            this.getfamiliList();
        },
        getOTab3(data) {
            this.oTheWay = data.index.value;
            this.getFoList();
            this.getfamiliList();
        },
        getOTab4(data) {
            this.oContent = data.index.value;
            this.getFoList();
            this.getfamiliList();
        },
        getOTab5(data) {
            this.equiType = data.index.value;
            this.getFoList();
            this.getfamiliList();
        },
        //获取科室列表
        async getDepartment() {
            let _this = this;
            let query = {
                orgCode: this.userSelfInfo.orgCode,
                deptId: ""
            };
            const res = await fetchHospitalDepts(query);
            if (res.data && res.data.errCode === 0) {
                console.log(res.data.body);
                if (res.data.body.length > 6) {
                    this.oTab1.more = true;
                } else {
                    this.oTab1.more = false;
                }
                $.each(res.data.body, function(index, text) {
                    _this.oTab1.list.push({
                        text: text.deptName,
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
        //获取随访列表
        async getFoList() {
            let _this = this;
            const options = {
                token: this.userState.token,
                search: this.searchData,
                department: this.odepartment,
                type: this.otype,
                mode: this.oTheWay,
                content: this.oContent,
                pageNum: 1,
                pageSize: 10
            };
            const res = await managerGetPlanList(options);
            if (res.data && res.data.errCode === 0) { 
                this.tableDataList = res.data.body.data2.list;
                console.log(this.tableDataList)
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        }, //获取家用设备列表
        async getfamiliList() {
            let _this = this;
            const options = {
                token: this.userState.token,
                search: this.searchData,
                department: this.odepartment,
                houseDeviceType: this.equiType,
                pageNum: 1,
                pageSize: 10
            };
            const res = await managerGetDeviceList(options);
            if (res.data && res.data.errCode === 0) { 
                _this.tableDataListFa = res.data.body.data2.list;
                console.log(_this.columns)
               
                console.log(_this.columnsFa)
                console.log(_this.tableDataListFa)
                // alert(_this.tableDataListFa[0].alertInfo)
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //医生端tab切换
        docTab(oindex) {
            this.oDocThis = oindex;
            this.odocVisable = oindex;
        },
        timeValueFun(data) {},
        // 满意度调查切换
        followUp2Fun(index) {
            this.indexTab2 = index;
        },
        getConsulTabData(res) {
            this.oMainShow = res.i;
        },
        // 表格分页
        seeCurrentChange() {},
        handleDel(index, row) {
            alert(index);
        },
        //处理标题数据好方便传入子组件
        circularData(data) {
            // var _this = this;
            // $.each(data, function(key, value) {
            //     _this.columns.push({
            //         prop: key,
            //         label: data[key]
            //     });
            // });
        },
        //搜索框
        searchChange(data) {
            this.searchData = data;
            this.getFoList();
            this.getfamiliList();
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
</style>