<template>
    <div class="followUp">
        <!-- 随访表模板 -->
        <el-dialog class="evaluateBox addFollowBox" title=" " :visible.sync="followTableVisible" width="602px" hight="356px" center>
            <el-form ref="form" :model="addFollowData" label-width="80px">

                <el-form-item>
                    <el-input class="addFollowTitle" v-model="addFollowData.title" placeholder="请输入随访标题"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-radio-group v-model="addFollowData.type">
                        <el-radio label="INHOSPITAL">住院随访</el-radio>
                        <el-radio label="OUTPATIENT">门诊随访</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- <div class="addFollowM-bot">
                    <el-radio v-model="addFollowData.type" label="INHOSPITAL">住院随访</el-radio>
                    <el-radio v-model="addFollowData.type" label="OUTPATIENT">门诊随访</el-radio>
                </div> -->
                <div class="addFollowMain">
                    <el-form-item class="addFollowM-bot" label="首次治疗">
                        <el-date-picker class="oTime" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <ul>
                        <li v-for="(text,index) in addFollowData.itemModels" :key="index" @mouseover="addFollowBtnVis=true" @mouseout="addFollowBtnVis=false">
                            <div class="addFollowM-bot">
                                距离首次治疗
                                <el-select class="addFollowHou" v-model="followSelectTime" placeholder="请选择">
                                    <el-option v-for="item in addFollowTime" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <ul class="questBox">
                                <li v-for="(otext,oindex) in text.contentModels" :key="oindex">
                                    <div>
                                        <span v-show="otext.followUpType=='REMIND'">提醒：</span>
                                        <span v-show="otext.followUpType=='ESSAY'">健康知识：</span>
                                        <span v-show="otext.followUpType=='INQUIRY'">问诊：</span>
                                        <span v-show="otext.followUpType=='MEDICAL'">疾病自评：</span>
                                        <span v-show="otext.followUpType=='DEVICE'">设备监测：</span>
                                        <span class="questTableName">{{otext.title}}</span>
                                    </div>

                                    <span @click="deleteQuest(oindex)" class="questDelete">
                                        <img src="../assets/img/addFollowDelete2.png" />
                                    </span>
                                </li>
                            </ul>
                            <div class="addFollowBtn" v-show="addFollowBtnVis">
                                <div @click="addQuest()">
                                    <span class="questDelete"><img src="../assets/img/addFollowJa2.png" /></span> 问诊表/健康知识
                                </div>
                                <div>
                                    <span @click="addFollowTimeList()">
                                        <span class="questDelete"><img src="../assets/img/addFollowJa1.png" /> </span> 添加一项</span>
                                    <span @click="deleteFollowTimeList(index)">
                                        <span class="questDelete"> <img src="../assets/img/addFollowDelete.png" /> </span>
                                        此项</span>
                                </div>
                            </div>

                        </li>
                    </ul>
                    <div class="addFollowM-bot">
                        提醒时间
                        <el-select class="addFollowHou" v-model="addFollowData.remindDays" placeholder="请选择">
                            <el-option v-for="item in addFollowTimeTx" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <el-checkbox v-model="addFollowData.remindMe">提醒我</el-checkbox>
                        <el-checkbox v-model="addFollowData.remindHe">提醒他</el-checkbox>
                    </div>
                    <el-button @click="addFollowTable()" type="primary">保存</el-button>
                </div>

            </el-form>
        </el-dialog>
        <!-- 随访计划详情 -->
        <el-dialog class="evaluateBox addFollowBox" title=" " :visible.sync="followPlanVisible" width="602px" hight="356px" center>
            <el-form ref="form" :model="followPlanData" label-width="80px">

                <el-form-item>
                    <el-input class="addFollowTitle" v-model="followPlanData.title" placeholder="请输入随访标题"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-radio-group v-model="followPlanData.type">
                        <el-radio label="INHOSPITAL">住院随访</el-radio>
                        <el-radio label="OUTPATIENT">门诊随访</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="addFollowMain">
                    <el-form-item class="addFollowM-bot" label="首次治疗">
                        <el-date-picker class="oTime" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <ul>
                        <li v-for="(text,index) in followPlanData.planItemResults" :key="index" @mouseover="addFollowBtnVis=true" @mouseout="addFollowBtnVis=false">
                            <div class="addFollowM-bot">
                                距离首次治疗
                                <el-select class="addFollowHou" v-model="followSelectTime" placeholder="请选择">
                                    <el-option v-for="item in addFollowTime" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <ul class="questBox">
                                <li v-for="(otext,oindex) in text.itemContentResults" :key="oindex">
                                    <div>
                                        <span v-show="otext.followUpType=='REMIND'">提醒：</span>
                                        <span v-show="otext.followUpType=='ESSAY'">健康知识：</span>
                                        <span v-show="otext.followUpType=='INQUIRY'">问诊：</span>
                                        <span v-show="otext.followUpType=='MEDICAL'">疾病自评：</span>
                                        <span v-show="otext.followUpType=='DEVICE'">设备监测：</span>
                                        <span class="questTableName">{{otext.title}}</span>
                                    </div>

                                    <span @click="deleteQuest(oindex)" class="questDelete">
                                        <img src="../assets/img/addFollowDelete2.png" />
                                    </span>
                                </li>
                            </ul>
                            <div class="addFollowBtn" v-show="addFollowBtnVis">
                                <div @click="addQuest()">
                                    <span class="questDelete"><img src="../assets/img/addFollowJa2.png" /></span> 问诊表/健康知识
                                </div>
                                <div>
                                    <span @click="addFollowTimeList()">
                                        <span class="questDelete"><img src="../assets/img/addFollowJa1.png" /> </span> 添加一项</span>
                                    <span @click="deleteFollowTimeList(index)">
                                        <span class="questDelete"> <img src="../assets/img/addFollowDelete.png" /> </span>
                                        此项</span>
                                </div>
                            </div>

                        </li>
                    </ul>
                    <div class="addFollowM-bot">
                        提醒时间
                        <el-select class="addFollowHou" v-model="followPlanData.remindDays" placeholder="请选择">
                            <el-option v-for="item in addFollowTimeTx" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <el-checkbox v-model="followPlanData.remindMe">提醒我</el-checkbox>
                        <el-checkbox v-model="followPlanData.remindHe">提醒他</el-checkbox>
                    </div>
                    <!-- <el-button @click="addFollowTable()" type="primary">保存</el-button> -->
                </div>

            </el-form>
        </el-dialog>
        <!-- 新增文章 -->
        <el-dialog class="evaluateBox" title=" " :visible.sync="articleTableVisible" width="770px" hight="356px" center>
            <el-input class="addFollowTitle" v-model="addFollowData.title" placeholder="文章标题"></el-input>
            <div class="addFollowM-bot">
                <el-radio v-model="addFollowData.type" label="INHOSPITAL">住院随访</el-radio>
                <el-radio v-model="addFollowData.type" label="OUTPATIENT">门诊随访</el-radio>
            </div>
            <div class="addArticleImg">
                <div>
                    <img src="../assets/img/日照宝宝.jpg" />
                </div>
                <div>
                    文章配图
                </div>
            </div>
            <div>
                <div>
                    您可以通过自编原创、URL转载、从Word导入完成文章编辑
                </div>
                <div class="addArticleEditor">
                    <quill-editor v-model="infoForm.a_content" ref="myQuillEditor" class="editer" :options="infoForm.editorOption" @ready="onEditorReady($event)">
                    </quill-editor>
                </div>
                <el-input class="addFollowTitle" v-model="addFollowData.title" placeholder="请输入随访标题"></el-input>
            </div>
            <div class="addFollowMain">

                <div>
                    <el-checkbox v-model="addFollowData.remindMe">所有人可见</el-checkbox>
                    <el-checkbox v-model="addFollowData.remindHe">开放讨论</el-checkbox>
                </div>
                <el-button @click="addFollowTable()" type="primary">保存</el-button>
            </div>

        </el-dialog>
        <!-- 满意度发送的模板列表 -->
        <el-dialog class="evaluateBox" title=" " :visible.sync="templateVisible" width="240px" hight="356px" center>
            <ul>
                <li v-for="(text,index) in mydTemplateTitle" :key="index" @click="selectTemplate(index,text)">
                    {{text.title}}
                </li>
            </ul>
        </el-dialog>
        <!-- 问诊等等列表 -->
        <el-dialog title="随访" :visible.sync="questVisible" center append-to-body>
            <ul>
                <li class="followBox" v-for="(text,index) in questList" :key="index">
                    <span>{{text.title}}</span>
                    <span @click="followDetail(text.id)"> > </span>
                </li>
            </ul>
        </el-dialog>
        <!-- 管理端 -->
        <div v-if="$store.state.user.viewRoot.now.name==='manager'">
            <div class="Admin-title">
                <normalTab :inData="oAdminTab" @reBack="getConsulTabData"></normalTab>
            </div>

            <div class="admin-oMain">
                <!-- 随访计划 -->
                <div v-show="0==oMainShow">
                    <div class="mainTab">
                        <div>
                            <selftag :inData="oTab1" @reback="getOTab1"></selftag>
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
                            <selftag :inData="oTab1" @reback="getOTab1"></selftag>
                            <selftag :inData="oTab6" @reback="getOTab6" v-show="wayVisible1"></selftag>
                            <selftag :inData="oTab3" @reback="getOTab3" v-show="wayVisible2"></selftag>
                            <selftag :inData="oTab7" @reback="getOTab7" v-show="wayVisible3"></selftag>
                        </div>

                        <el-button class="startConsul" type="text" @click="followTableVisible = true">新增模板</el-button>
                        <el-button v-show="mydTableChecked" class="startConsul" type="text" @click="sendBtn()">发送</el-button>
                    </div>
                    <div class="sendTemplateBox" v-show="sendTemplateListVis">
                        <ul>
                            <li v-for="(text,index) in sendTemplate1" :key="index">
                                {{text.title}}
                                <span class="questDelete" @click="deleteMydTemplate(index,text)">
                                    <img src="../assets/img/addFollowDelete2.png" />
                                </span>
                            </li>
                        </ul>
                        <div class="addTemplate">
                            <div @click="sendTemplateList()">
                                加
                            </div>
                            <div>
                                此处可选择多个模板
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                    <div>
                        <tableList :tableData="satisfiedList" :columns="satisfiedColumns" :tableBtn="SatisfiedBtn" :checkVisable="mydTableChecked" @reBack="getUserId"></tableList>

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
                        <tableList :tableData="tableDataListFa" :columns="columnsFa"></tableList>
                        <!-- <el-pagination background layout="prev, pager, next" :total="total" :page-size="opageSize" @current-change="seeCurrentChange">
                        </el-pagination> -->
                    </div>
                </div>
                <!-- 统计 -->
                <div v-show="3==oMainShow">
                    <div class="mainTab">
                        <div>
                            <selftag :inData="oTab1" @reback="getOTab1"></selftag>
                        </div>

                        <!-- <publicTime @timeValue="timeValueFun"></publicTime> -->
                        <statisticsWay @reBack="tjTimeValueFun"></statisticsWay>
                    </div>
                    <div>
                        <normalColumnChart :inData="drawData"> </normalColumnChart>
                        <normalColumnChart :inData="drawDataStart"> </normalColumnChart>

                    </div>
                </div>
            </div>
        </div>
        <!-- 医生端 -->
        <div v-else class=" followDoc">
            <div>
                <ul class="titleTop">
                    <li v-for="(text,index) in followDocTab" :class="{'title-this':index==oDocThis}" @click="docTab(index)" :key="index">{{text.name}}</li>
                </ul>
            </div>
            <div class="admin-oMain">
                <!-- 我的随访 -->
                <div v-show="odocVisable==0">
                    <div class="mainTab">
                        <div>
                            <selftag :inData="oTab1" @reback="docDeperment"></selftag>
                            <selftag :inData="oTab2" v-show="doctorSxVisiable"></selftag>
                            <selftag :inData="oTab3" v-show="doctorSxVisiable"></selftag>
                            <selftag :inData="oTab4" v-show="doctorSxVisiable"></selftag>
                        </div>
                        <search @searchValue="docSearchChange"></search>
                    </div>
                    <div>
                        <tableList :tableData="doctorList" :columns="doctorColumns" :tableBtn="doctorBtn"></tableList>
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
    fetchHospitalDepts,
    OUTPATIENT,
    INHOSPITAL,
    getResultList,
    getModelInsert,
    getMissileList,
    deleteModel,
    getTemplate,
    queryList,
    queryArticleList,
    deleteTemplate, //删除随访模板
    update, //编辑随访模板
    get, //获取随访模板详情
    add, //新增随访模板
    deleteArticle, //删除文章
    deleteInquiry, //删除问诊模板
    getFollowDetail, //查看随访模板详情
    getFollowUpPlan, //查看随访计划详情
    getTitleList, //选择模板发送
    publishNotice //发送模板
} from "../api/apiAll.js";
import { mapState } from "vuex";
import echarts from "../plugs/echarts.js";
import normalTab from "../public/publicComponents/normalTab.vue";
import tableList from "../public/publicComponents/publicList.vue";
import search from "../public/publicComponents/search.vue";
import selftag from "../public/publicComponents/selftag.vue";
import statisticsWay from "../public/publicComponents/statisticsWay.vue";
import publicTime from "../public/publicComponents/publicTime.vue";
import normalColumnChart from "../public/publicComponents/normalColumnChart.vue";
import { quillEditor } from "vue-quill-editor";

export default {
    components: {
        tableList,
        search,
        normalTab,
        selftag,
        statisticsWay,
        publicTime,
        normalColumnChart,
        quillEditor
    },
    data() {
        return {
            //随访计划
            followPlanVisible: false,
            followPlanData: [],
            infoForm: {
                a_title: "",
                a_source: "",
                a_content: "",
                editorOption: {}
            },
            questList: [],
            articleTableVisible: false,
            addFollowBtnVis: false,
            questVisible: false,
            addFollowData: {
                department: [""],
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
                        contentModels: [
                            {
                                followUpType: "REMIND",
                                title: "天气转凉注意吃药",
                                contentId: null
                            },
                            {
                                followUpType: "ESSAY",
                                title: "他改变了中国(上)",
                                contentId: "5b162dbd6132c62d846fb793"
                            },
                            {
                                followUpType: "INQUIRY",
                                title: "问诊模板修改标题",
                                contentId: "282b6e6499104c538fc98df1cc3ee072"
                            }
                        ]
                    },
                    {
                        calcVal: 2,
                        calcUnit: "天",
                        state: true,
                        contentModels: [
                            {
                                followUpType: "REMIND",
                                title: "天气转凉注意吃药",
                                contentId: null
                            },
                            {
                                followUpType: "ESSAY",
                                title: "他改变了中国(中)",
                                contentId: "5b162dbd6132c62d846fb794"
                            },
                            {
                                followUpType: "INQUIRY",
                                title: "问诊模板修改标题",
                                contentId: "282b6e6499104c538fc98df1cc3ee072"
                            }
                        ]
                    },
                    {
                        calcVal: 3,
                        calcUnit: "天",
                        state: true,
                        contentModels: [
                            {
                                followUpType: "REMIND",
                                title: "天气转凉注意吃药",
                                contentId: null
                            },
                            {
                                followUpType: "ESSAY",
                                title: "他改变了中国(下)",
                                contentId: "5b162dbd6132c62d846fb795"
                            },
                            {
                                followUpType: "INQUIRY",
                                title: "问诊模板修改标题",
                                contentId: "282b6e6499104c538fc98df1cc3ee072"
                            }
                        ]
                    }
                ]
            },
            followSelectTime: "",
            addFollowRadio: "INHOSPITAL",
            addFollowTime: [
                {
                    value: "选项1",
                    label: "3月后"
                },
                {
                    value: "选项2",
                    label: "6月后"
                },
                {
                    value: "选项3",
                    label: "9月后"
                },
                {
                    value: "选项4",
                    label: "一年后"
                }
            ],
            addFollowTimeTx: [
                {
                    value: "1",
                    label: "1"
                },
                {
                    value: "2",
                    label: "2"
                },
                {
                    value: "3",
                    label: "3"
                },
                {
                    value: "4",
                    label: "4"
                }
            ],
            odata1: [
                {
                    prop: "name",
                    label: "姓名"
                }
            ],
            odata2: [
                {
                    name: "谭莹"
                }
            ],
            wayVisible1: true,
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
            columns: [
                {
                    prop: "department",
                    label: "科室"
                },
                {
                    prop: "type",
                    label: " 类型 "
                },
                {
                    prop: "title",
                    label: "随访模板名 "
                },
                {
                    prop: "doctor",
                    label: "医生 "
                },
                {
                    prop: "useNumber ",
                    label: " 病人"
                },
                {
                    prop: "appNum",
                    label: "App "
                },
                {
                    prop: "phoneNum",
                    label: "电话"
                },
                {
                    prop: "remind",
                    label: "提醒 "
                },
                {
                    prop: "inquiry",
                    label: "问卷 "
                },
                {
                    prop: "knowledge",
                    label: "知识 "
                },
                {
                    prop: "selfAssessment ",
                    label: " 自评"
                },
                {
                    prop: "deviceTest",
                    label: "自测 "
                },
                {
                    prop: "state",
                    label: "状态 "
                }
            ],
            columnsFa: [
                {
                    prop: "department",
                    label: "科室"
                },
                {
                    prop: "deviceType",
                    label: "设备类型 "
                },
                {
                    prop: "serialNumber",
                    label: "设备编号 "
                },
                {
                    prop: "userName",
                    label: "用户 "
                },
                {
                    prop: "useNumber ",
                    label: " 使用量"
                },
                {
                    prop: "alertInfo",
                    label: "告警情况 "
                }
            ],
            tableDataList: [],
            tableDataListFa: [],
            tableBtn: [
                {
                    name: "查看随访",
                    oclass: "viewFollow",
                    method: (index, row) => {
                        this.seeFollow(index, row);
                    }
                }
            ],
            //满意度数据
            sendTemplate1: [],
            mydTableChecked: false,
            mydTemplateTitle: [],
            sendTemplateId: [], //要发送的模板id
            userList: [], //要发送的用户id
            templateVisible: false, //发送满意度模板
            sendTemplateListVis: false,
            followTableVisible: false,
            satisfiedList: [],
            defaultProps: {
                children: "children",
                label: "label"
            },
            satisfiedColumns: [
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
            ],
            SatisfiedBtn: [
                {
                    name: "查看随访",
                    oclass: "viewFollow",
                    method: (index, row) => {
                        this.handleDel(index, row);
                    }
                }
            ],
            oTab6: {
                more: false,
                title: "类型",
                list: [
                    {
                        text: "全部",
                        value: ""
                    },
                    {
                        text: "门诊调查",
                        value: "OUTPATIENT"
                    },
                    {
                        text: "医技调查",
                        value: "MEDICALTECHNOLOGY"
                    },
                    {
                        text: "住院调查",
                        value: "INHOSPITAL"
                    },
                    {
                        text: "行政调查",
                        value: "ADMINISTRATION"
                    },
                    {
                        text: "推送链接",
                        value: "URL"
                    }
                ]
            },
            oTab7: {
                more: false,
                title: "类型",
                list: [
                    {
                        text: "全部",
                        value: ""
                    },
                    {
                        text: "病人",
                        value: "USER"
                    },
                    {
                        text: "医生",
                        value: "DOCTOR"
                    }
                ]
            },
            userType: "",
            mydType: "",
            mydStartTime: "",
            mydEndTime: "",
            mydMode: "",
            mydSearchData: "",
            wayVisible2: true,
            wayVisible3: false,
            //统计数据
            //申请科室统计图
            drawData: {
                dataAxis: [], //每个柱子代表的类名
                data: [], //具体数值
                title: " ", //图表标题
                totalNumber: "555"
            },
            //发起科室统计图
            drawDataStart: {
                dataAxis: [], //每个柱子代表的类名
                data: [], //具体数值
                title: " ", //图表标题
                totalNumber: "555"
            },
            tjType: "DEPT",
            tjStartTime: "",
            tjEndTime: "",
            //医生
            doctorSxVisiable: true,
            doctorList: [],
            doctorBtn: [
                {
                    name: "删除",
                    oclass: "viewFollow",
                    method: row => {
                        this.docFollowDelete(row);
                    }
                }
            ],
            doctorColumns: [
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
                },
                {
                    prop: "nearlyUpdater",
                    label: "最近修改"
                }
            ],
            docSearchData: "",
            docDepartment: "",
            followPlan: [
                {
                    more: false,
                    title: "类型",
                    list: [
                        {
                            text: "全部",
                            value: ""
                        },
                        {
                            text: "病人",
                            value: "USER"
                        },
                        {
                            text: "医生",
                            value: "DOCTOR"
                        }
                    ]
                }
            ],
            followPlan: [
                {
                    more: false,
                    title: "类型",
                    list: [
                        {
                            text: "全部",
                            value: ""
                        },
                        {
                            text: "病人",
                            value: "USER"
                        },
                        {
                            text: "医生",
                            value: "DOCTOR"
                        }
                    ]
                }
            ],
            followPlan: [
                {
                    more: false,
                    title: "类型",
                    list: [
                        {
                            text: "全部",
                            value: ""
                        },
                        {
                            text: "病人",
                            value: "USER"
                        },
                        {
                            text: "医生",
                            value: "DOCTOR"
                        }
                    ]
                }
            ]
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo,
            viewRoot: state => state.user.viewRoot
        })
    },
    async created() {
        this.circularData(this.odata["header"]);
        this.getFoList(); //随访列表
        this.getfamiliList(); //家用设备列表
        this.getDepartment(); //科室列表
        this.oGetFollowupGraph(); //住院随访统计图
        this.oGetFollowupRemarks(); //门诊随访统计图
        this.oGetResultList(); //满意度调查 调查管理列表
        console.log(this.$store.state.user.viewRoot.now.name);
    },
    mounted() {},
    methods: {
        onEditorReady(editor) {},
        // 新增随访表接口
        //添加问诊表
        addQuest() {
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
                contentModels: [
                    {
                        followUpType: "REMIND",
                        title: "天气转凉注意吃药",
                        contentId: null
                    },
                    {
                        followUpType: "ESSAY",
                        title: "他改变了中国(上)",
                        contentId: "5b162dbd6132c62d846fb793"
                    },
                    {
                        followUpType: "INQUIRY",
                        title: "问诊模板修改标题",
                        contentId: "282b6e6499104c538fc98df1cc3ee072"
                    }
                ]
            });
        },
        //删除当前项
        deleteFollowTimeList(index) {
            this.addFollowData.itemModels.splice(index, 1);
        },
        //新增随访表
        async addFollowTable() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = this.addFollowData;
            const res = await add(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "新增成功"
                });
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //筛选
        getOTab1(data) {
            this.odepartment = data.index.value;
            this.getFoList();
            this.getfamiliList();

            this.oGetModelList();
            this.oGetResultList();
            this.oGetMissileList();
            this.oGetFollowupGraph();
            this.oGetFollowupRemarks();
        },
        getOTab2(data) {
            this.otype = data.index.value;
            this.getFoList();
            this.getfamiliList();

            this.oGetMissileList();
        },
        getOTab3(data) {
            this.oTheWay = data.index.value;
            this.getFoList();
            this.getfamiliList();
            this.oGetResultList();
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
        getOTab6(data) {
            this.mydType = data.index.value;
            this.oGetModelList();
            this.oGetResultList();
        },
        getOTab7(data) {
            this.userType = data.index.value;
            this.oGetMissileList();
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

        //随访计划接口
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
        //获取家用设备列表
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
                // _this.tableDataListFa = res.data.body.data2.list;
                // _this.tableDataListFa=[{
                //     department:"ddd"
                // }]
                _this.tableDataListFa = res.data.body.data2.list;
                console.log(_this.columns);

                console.log(_this.columnsFa);
                console.log(_this.tableDataListFa);
                // alert(_this.tableDataListFa[0].alertInfo)
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
            this.indexTab2 = index;

            if (index == 0) {
                (this.mydTableChecked = false),
                    (this.sendTemplateListVis = false),
                    (this.wayVisible1 = true);
                this.wayVisible2 = true;
                (this.wayVisible3 = false), this.oGetResultList();
                this.satisfiedColumns = [
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
                ];
                this.SatisfiedBtn = [
                    {
                        name: "查看随访",
                        oclass: "viewFollow",
                        method: (index, row) => {
                            this.handleDel(index, row);
                        }
                    }
                ];
            } else if (index == 1) {
                (this.mydTableChecked = false),
                    (this.sendTemplateListVis = false),
                    (this.wayVisible1 = true);
                this.wayVisible2 = false;
                this.wayVisible3 = false;
                this.oGetModelList();
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
                            this.handleDel(index, row);
                        }
                    },
                    {
                        name: "删除",
                        oclass: "viewFollow",
                        method: row => {
                            this.deleteModel(row.id);
                        }
                    }
                ];
            } else {
                (this.mydTableChecked = true),
                    (this.sendTemplateListVis = true);
                this.wayVisible1 = false;
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
                department: this.odepartment,
                pageNum: 1,
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
                department: this.odepartment,
                start: this.mydStartTime,
                end: this.mydEndTime,
                pageNum: 1,
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
        //满意度发送模板3
        async sendTemplateList() {
            this.templateVisible = true;
            let _this = this;
            let query = {
                token: this.userState.token,
                type: this.mydType
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
        //选中满意度模板进行操作
        selectTemplate(index, text) {
            this.mydTemplateTitle.splice(index, 1);
            this.sendTemplateId.push(text.associationId);
            this.sendTemplate1.push(text);
        },
        //删除满意度模板
        deleteMydTemplate(index, text) {
            this.sendTemplate1.splice(index, 1);
            let oindex = sendTemplateId.indexOf(text.associationId);
            this.sendTemplateId.splice(oindex, 1);
            this.mydTemplateTitle.push(text);
        },
        getUserId(row) {

            $.each(row, (text,index)=> {
                this.userList.push(text.userId);
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
                this.sendTemplateList()
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
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //  三
        //获取可发送的用户列表3
        async oGetMissileList() {
            let _this = this;
            const options = {
                token: this.userState.token,
                userType: this.userType,
                search: this.mydSearchData,
                department: this.odepartment,
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
        //家用设备接口
        //家用设备列表接口
        async oManagerGetDeviceList() {
            let _this = this;
            const options = {
                token: this.userState.token,
                houseDeviceType: this.houseDeviceType,
                search: this.searchData,
                department: this.department,
                pageNum: 1,
                pageSize: 10
            };
            const res = await managerGetDeviceList(options);
            if (res.data && res.data.errCode === 0) {
                _this.equipmentList = res.data.body.data2.list;
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
                department: this.odepartment,
                type: this.tjType,
                startDate: this.tjStartTime,
                endDate: this.tjEndTime
            };
            const res = await INHOSPITAL(options);
            if (res.data && res.data.errCode === 0) {
                $.each(res.data.body.data, function(index, text) {
                    _this.drawData.dataAxis.push(text.unit);
                    _this.drawData.data.push(text.number);
                });
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
                department: this.odepartment,
                type: this.tjType,
                startDate: this.tjStartTime,
                endDate: this.tjEndTime
            };
            const res = await OUTPATIENT(options);
            if (res.data && res.data.errCode === 0) {
                $.each(res.data.body.data, function(index, text) {
                    _this.drawDataStart.dataAxis.push(text.unit);
                    _this.drawDataStart.data.push(text.number);
                });
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
            this.tjStartTime = data.time[0];
            this.tjEndTime = data.time[0];
            this.oGetFollowupGraph();
            this.oGetFollowupRemarks();
        },

        getConsulTabData(res) {
            this.oMainShow = res.i;
            if (res.i == 2) {
                this.oManagerGetDeviceList(); //家用设备列表
            }
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
            this.oGetModelList();
            this.oGetResultList();
        },
        //医生端接口
        //医生端tab切换
        docTab(oindex) {
            this.oDocThis = oindex;
            // this.odocVisable = oindex;
            if (oindex == 0) {
                this.doctorSxVisiable = true;
            } else {
                this.doctorSxVisiable = false;
            }
            if (oindex == 0) {
                this.getUsFollow();
                this.oGetTemplate();
                this.doctorBtn = [
                    {
                        name: "删除",
                        oclass: "viewFollow",
                        method: row => {
                            this.docFollowDelete0(0, row);
                        }
                    }
                ];
            } else if (oindex == 1) {
                this.oGetTemplate();
                this.doctorBtn = [
                    {
                        name: "删除",
                        oclass: "viewFollow",
                        method: row => {
                            this.docFollowDelete1(1, row);
                        }
                    }
                ];
            } else if (oindex == 2) {
                this.oQueryList();
                this.doctorBtn = [
                    {
                        name: "删除",
                        oclass: "viewFollow",
                        method: row => {
                            this.docFollowDelete2(2, row);
                        }
                    }
                ];
            } else if (oindex == 3) {
                this.oQueryArticleList();
                this.doctorBtn = [
                    {
                        name: "删除",
                        oclass: "viewFollow",
                        method: row => {
                            this.docFollowDelete3(3, row);
                        }
                    }
                ];
            } else if (oindex == 4) {
                this.doctorBtn = [
                    {
                        name: "删除",
                        oclass: "viewFollow",
                        method: row => {
                            this.docFollowDelete4(4, row);
                        }
                    }
                ];
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
        //删除
        async docFollowDelete(index, row) {
            let _this = this;
            const query = {
                token: this.userState.token
            };
            const options = {
                id: row.id
            };
            if (index == 0) {
                const res = await managerGetDeviceList(query, options);
            } else if (index == 1) {
                const res = await deleteTemplate(query, options);
            } else if (index == 2) {
                const res = await deleteInquiry(query, options);
            } else if (index == 3) {
                const res = await deleteArticle(query, options);
            } else if (index == 4) {
                const res = await managerGetDeviceList(query, options);
            }

            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "删除成功"
                });
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },

        //切换
        docDeperment(data) {
            this.docDepartment = data.index.value;
            this.getUsFollow();
            this.oGetTemplate();
            this.oQueryList();
            this.oQueryArticleList();
        },
        //我的随访
        async getUsFollow() {
            let _this = this;
            const options = {
                token: this.userState.token,
                houseDeviceType: this.houseDeviceType,
                search: this.docSearchData,
                department: this.docDepartment,
                pageNum: 1,
                pageSize: 10
            };
            const res = await managerGetDeviceList(options);
            if (res.data && res.data.errCode === 0) {
                _this.equipmentList = res.data.body.data2.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },

        //随访模板
        //随访模板列表

        async oGetTemplate() {
            let _this = this;
            const options = {
                token: this.userState.token,
                search: this.docSearchData,
                department: this.docDepartment,
                pageNum: 1,
                pageSize: 10
            };
            const res = await getTemplate(options);
            if (res.data && res.data.errCode === 0) {
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
                pageNum: 1,
                pageSize: 10
            };
            const res = await queryList(options);
            if (res.data && res.data.errCode === 0) {
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
                pageNum: 1,
                pageSize: 10
            };
            const res = await queryArticleList(options);
            if (res.data && res.data.errCode === 0) {
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
        async getUsFollow() {
            let _this = this;
            const options = {
                token: this.userState.token,
                search: this.docSearchData,
                department: this.docDepartment,
                pageNum: 1,
                pageSize: 10
            };
            const res = await managerGetDeviceList(options);
            if (res.data && res.data.errCode === 0) {
                _this.doctorList = res.data.body.data2.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
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

/* 新增随访表 */
.addFollowTitle > input {
    margin-bottom: 20px;
    width: 338px;
    height: 27px;
}
.questTableName {
    color: red;
}
.addFollowMain input {
    height: 27px;
}
.addFollowMain li {
    margin-bottom: 10px;
}
.addFollowM-bot {
    margin-bottom: 20px;
}
.addFollowMain .oTime input {
    width: 158px;
    height: 27px;
}
.questBox > li {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    padding-left: 20px;
}
.addFollowBtn {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    width: 555px;
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

.addArticleImg {
    position: relative;
    margin-bottom: 33px;
    width: 100px;
    height: 82px;
}
.addArticleImg > div:first-child {
    width: 100%;
    height: 100%;
}
.addArticleImg > div:first-child > img {
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
    background: rgba(0, 0, 0, 0.6);
    font-family: .PingFangSC-Regular;
    font-size: 12px;
    color: #ffffff;
    letter-spacing: -0.17px;
}
.ql-container {
    height: 144px;
}
.addArticleEditor {
    margin-bottom: 10px;
}
.sendTemplateBox {
    margin:20px 0;
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
</style>