<template>
    <div class="followUp">
        <!-- 随访表模板 -->
        <div v-if="followTableVisible">
            <el-dialog class="evaluateBox addFollowBox addFollowBoxFollow" title=" " :visible.sync="followTableVisible" width="602px" hight="356px" center>
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
                    <div class="addFollowMain addFollowMain1">
                        <ul class='addQuestBoxUlBox'>
                            <li v-for="(text,index) in addFollowData.itemModels" :key="index">
                                <div class="addFollowM-bot" style="display:flex">
                                    <el-form-item class="addFollowM-bot firstDoctorTime" label="距离首次治疗">
                                        <div class="DistanceFirst">
                                            <el-form-item label=" ">
                                                <el-select v-model="text.calcVal" placeholder=" ">
                                                    <el-option v-for="(text,index) in 21" :label="text" :value="text" :key="index"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label=" ">
                                                <el-select v-model="text.calcUnit" placeholder=" ">
                                                    <el-option label="日" value="日"></el-option>
                                                    <el-option label="周" value="周"></el-option>
                                                    <el-option label="月" value="月"></el-option>
                                                    <el-option label="年" value="年"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                    </el-form-item>

                                </div>
                                <ul class="questBox">

                                    <li v-for="(otext,oindex) in text.contentModels" :key="oindex">
                                        <div v-if="otext.followUpType=='REMIND'">
                                            <span>复查提醒：</span>
                                            <input class='remindText' style="border:none" type='text' v-model="otext.title" />
                                        </div>
                                        <div v-else>
                                            <div>
                                                <span v-show="otext.followUpType=='REMIND'">提醒：</span>
                                                <span v-show="otext.followUpType=='ESSAY'">健康知识：</span>
                                                <span v-show="otext.followUpType=='INQUIRY'">问诊：</span>
                                                <span v-show="otext.followUpType=='MEDICAL'">疾病自评：</span>
                                                <span v-show="otext.followUpType=='DEVICE'">设备监测：</span>
                                                <span class="questTableName">{{otext.title}}</span>
                                            </div>
                                            <span @click="deleteQuest(index,oindex)" class="questDelete questDeleteSend">
                                                <img src="../../assets/img/addFollowDelete2.png" />
                                            </span>
                                        </div>

                                    </li>
                                </ul>
                                <div class="addFollowBtn" v-show="addFollowBtnVis">
                                    <div @click="addQuestOrAricle(index,text.contentModels)">
                                        <span class="questDelete"><img src="../../assets/img/addFollowJa2.png" /></span>
                                        问诊表/健康知识
                                    </div>
                                    <div>
                                        <span @click="addFollowTimeList()">
                                            <span class="questDelete"><img src="../../assets/img/addFollowJa1.png" />
                                            </span> 添加一项</span>
                                        <span @click="deleteFollowTimeList(index)">
                                            <span class="questDelete"> <img src="../../assets/img/addFollowDelete.png" /> </span>
                                            删除此项</span>
                                    </div>
                                </div>

                            </li>
                        </ul>
                        <div class="addFollowM-bot remindTime">
                            提醒时间
                            <el-select class="addFollowHou" v-model="addFollowData.remindDays" placeholder="请选择">
                                <el-option v-for="(text,index) in 100" :key="index" :label="text" :value="text">
                                </el-option>
                            </el-select>
                        </div>
                        <div class='addFollowWarnClass'>
                            <el-checkbox v-model="addFollowData.remindMe">提醒我</el-checkbox>
                            <el-checkbox v-model="addFollowData.remindHe">提醒他</el-checkbox>
                        </div>
                        <el-button class='addFollowTableClass' @click="addFollowTable()" type="primary">保存</el-button>
                    </div>

                </el-form>
            </el-dialog>
        </div>
        <!-- 添加问诊或文章 -->
        <div v-if="questVisible">
            <el-dialog title="添加问诊或文章" :visible.sync="questVisible" center append-to-body width="400px">
                <addQuestOrAritle @reback="sureQuestArticle"></addQuestOrAritle>

            </el-dialog>
        </div>
        <!-- 设备告警 -->
        <div v-if="warnVisible">
            <el-dialog title="添加问诊或文章" :visible.sync="warnVisible" center append-to-body>
                <warnSet :warnList="warnList" @reback="sureSetWarn"></warnSet>

            </el-dialog>
        </div>
        <!--新增问诊模板 -->
        <div v-if="QuestTableVisible">
            <el-dialog class="addQuestBox " title=" " :visible.sync="QuestTableVisible" width="717px" hight="356px" center>
                <el-form ref="form" :model="addQuestData" label-width="80px" style="height: 600px; overflow: auto;">
                    <el-form-item style="margin-bottom:30px">
                        <el-input class="addFollowTitle" v-model="addQuestData.title" placeholder="请输入问诊标题(40字内)" onfocus="this.placeholder=''" onblur="this.placeholder='请输入问诊标题(40字内)'"></el-input>
                    </el-form-item>
                    <div class="addFollowMain">
                        <ul class="addQuestUl">
                            <li v-for="(text,index) in addQuestData.bankModels" :key="index">
                                <span class="deleteQuestList" @click="deleteQuestList(index)">
                                    <img src="../../assets/img/questCha.png" />
                                </span>
                                <div v-show="text.questionType=='RADIO'">
                                    <el-form-item :label="index+1+'.'">
                                        <el-input class="" v-model="text.title" placeholder="请输入题目名称"></el-input>
                                    </el-form-item>
                                    <el-radio-group class="redioSingle redioSingleInput">
                                        <el-radio v-for="(text1,index1) in text.solutionModels" :key="index1" :label="index1">
                                            <span>{{text1.tag}}</span>
                                            <el-input class="" v-model="text1.answerDescribe" placeholder="请输入选项内容">
                                            </el-input>
                                            <span class="questItemDelete" @click="deleteQuestText(index,index1)">
                                                <img src="../../assets/img/questDelete1.png" />
                                            </span>
                                        </el-radio>
                                    </el-radio-group>
                                    <div class="itemChoiceItemBox" @click="itemChoiceItemFun(index,text.questionType)">
                                        <!-- 添加一项 -->
                                        <img src="../../assets/img/addFollowJa1.png" />
                                    </div>
                                </div>
                                <div v-show="text.questionType=='CHECKBOX'">
                                    <el-form-item :label="index+1">
                                        <el-input class="" v-model="text.title" placeholder="请输入题目名称"></el-input>
                                    </el-form-item>
                                    <el-checkbox-group class="redioSingle redioSingleInput">
                                        <el-checkbox v-for="(text1,index1) in text.solutionModels" :key="index1" :label="index1">
                                            <span>{{text1.tag}}</span>
                                            <el-input class="" v-model="text1.answerDescribe" placeholder="请输入选项内容">
                                            </el-input>
                                            <span class="questItemDelete" @click="deleteQuestText(index,index1)">
                                                <img src="../../assets/img/questDelete1.png" />
                                            </span>
                                        </el-checkbox>
                                    </el-checkbox-group>
                                    <div class="itemChoiceItemBox" @click="itemChoiceItemFun(index,text.questionType)">
                                        <!-- 添加一项 -->
                                        <img src="../../assets/img/addFollowJa1.png" />
                                    </div>
                                </div>
                                <div v-show="text.questionType=='TEXT'">
                                    <el-form-item :label="index+1">
                                        <el-input class="" v-model="text.title" placeholder="请输入题目名称"></el-input>
                                    </el-form-item>
                                </div>
                            </li>
                        </ul>
                        <div class="choiceItemBox">
                            <span :class="{'choiceItemBoxAtc':index2==questChoiceIndex}" v-for="(text2,index2) in choiceItem" :key="index2" @click="choiceItemFun(index2)">{{text2}}</span>
                        </div>
                        <el-button class='addQuestTable' @click="addQuestTable()" type="primary">保存</el-button>
                    </div>

                </el-form>
            </el-dialog>
        </div>
        <!-- 随访计划详情 -->
        <div v-if="followPlanVisible">
            <el-dialog class="evaluateBox addFollowBox addFollowBoxFollow" title=" " :visible.sync="followPlanVisible" width="602px" hight="356px" center>

                <el-form ref="form" :model="followPlanData" label-width="80px">

                    <el-form-item>
                        <el-input class="addFollowTitle" v-model="followPlanData.title" placeholder="请输入随访标题">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-radio-group v-model="followPlanData.type">
                            <el-radio label="INHOSPITAL">住院随访</el-radio>
                            <el-radio label="OUTPATIENT">门诊随访</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div class="addFollowMain addFollowMain1">
                        <el-form-item class="addFollowM-bot" label="首次治疗">
                            <el-date-picker class="oTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                        <ul>
                            <li v-for="(text,index) in followPlanData.planItemResults" :key="index">
                                <div class="addFollowM-bot" style="display:flex">
                                    <el-form-item class="addFollowM-bot" label="距离首次治疗">
                                        <div class="DistanceFirst">
                                            <el-form-item label=" ">
                                                <el-select v-model="text.calcVal" placeholder=" ">
                                                    <el-option v-for="(text,index) in 21" :label="text" :value="text" :key="index"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label=" ">
                                                <el-select v-model="text.calcUnit" placeholder=" ">
                                                    <el-option label="日" value="日"></el-option>
                                                    <el-option label="周" value="周"></el-option>
                                                    <el-option label="月" value="月"></el-option>
                                                    <el-option label="年" value="年"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                    </el-form-item>

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

                                        <!-- <span @click="deleteQuest(index,oindex)" class="questDelete">
                                        <img src="../assets/img/addFollowDelete2.png" />
                                    </span> -->
                                    </li>
                                </ul>
                                <div class="addFollowBtn" v-show="addFollowBtnVis">
                                    <!-- <div @click="addQuest(index)">
                                    <span class="questDelete"><img src="../assets/img/addFollowJa2.png" /></span> 问诊表/健康知识
                                </div> -->
                                    <!-- <div>
                                    <span @click="addFollowTimeList()">
                                        <span class="questDelete"><img src="../assets/img/addFollowJa1.png" /> </span> 添加一项</span>
                                    <span @click="deleteFollowTimeList(index)">
                                        <span class="questDelete"> <img src="../assets/img/addFollowDelete.png" /> </span>
                                        此项</span>
                                </div> -->
                                </div>

                            </li>
                        </ul>
                    </div>

                </el-form>
            </el-dialog>
        </div>
        <!-- 新增文章 -->
        <div v-if="articleTableVisible">
            <el-dialog class="evaluateBox ArcticClass" title=" " :visible.sync="articleTableVisible" width="770px" hight="356px" center>
                <el-form ref="form" :model="addArticleData" label-width="80px">
                    <el-form-item>
                        <el-input class="addFollowTitle" v-model="addArticleData.title" placeholder="请输入文章标题">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-select v-model="addArticleData.articleType" placeholder="请选择活动区域">

                            <el-option v-for="(text1,index) in oTab144 " :label="text1.text" :value="text1.value" :key="index">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div class="addArticleImg">
                        <el-upload class="avatar-uploader" :action="articleImg" :show-file-list="false" :on-success="articleImgSuccess">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <img v-else src="../../assets/img/addImg.png" class="addImgClass">
                            <i style="display:none" class="el-icon-plus avatar-uploader-icon"></i>

                        </el-upload>
                    </div>
                    <div>
                        <div class='articleContent'>
                            您可以通过自编原创、URL转载、从Word导入完成文章编辑
                        </div>
                        <div class="addArticleEditor">
                            <quill-editor :disabled='quillDiabled' v-model="addArticleData.content" ref="myQuillEditor" class="editer" :options="infoForm.editorOption" @ready="onEditorReady($event)" @change="quillChange(addArticleData.content)">
                            </quill-editor>
                        </div>
                    </div>
                    <el-form-item label="">
                        <el-input class=" addArticleUrlClass" :disabled='urlDiabled' v-model="addArticleData.url" placeholder="URL链接" @change="urlChange(addArticleData.url)"></el-input>
                    </el-form-item>
                    <div class="addFollowMain">
                        <div>
                            <el-checkbox v-model="addArticleData.visible">所有人可见</el-checkbox>
                            <el-checkbox v-model="addArticleData.openComment">开放讨论</el-checkbox>
                        </div>
                        <el-button @click="addArticleTable()" type="primary">保存</el-button>
                    </div>
                </el-form>
            </el-dialog>
        </div>
        <!-- 满意度发送的模板列表 -->
        <!-- <div v-if="templateVisible">
            <el-dialog class="evaluateBox" title=" " :visible.sync="templateVisible" width="240px" hight="356px" center>
                <ul>
                    <li v-for="(text,index) in mydTemplateTitle" :key="index" @click="selectTemplate(index,text)">
                        {{text.title}}
                    </li>
                </ul>
            </el-dialog>
        </div> -->

        <!-- 医生端 -->
        <div class=" followDoc">
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

                            <selftag :inData="oTab15" @reback="docDeperment" v-show="doctorSxVisiable"></selftag>
                            <selftag :inData="oTab2" @reback="getOTab2" v-show="doctorTemplateVisiable"></selftag>
                            <selftag :inData="oTab9" @reback="getOTab9" v-show="doctorSxVisiable"></selftag>
                            <selftag :inData="oTab14" @reback="getOTab14" v-show="doctorArticleVisiable"></selftag>
                            <div style='display:flex'>
                                <selftag :inData="oTab10" @reback="getOTab10" v-show="doctorSxVisiable"></selftag>
                                <publicTime v-show="doctorSxVisiable" style='    margin-top: -1px;
    margin-left: 55px;' @timeValue="getDocTime"></publicTime>
                            </div>

                            <selftag :inData="oTab11" @reback="getOTab11" v-show="doctorSxVisiable"></selftag>
                        </div>
                        <div class="statistics-way" style='margin-top:4px;'>

                        </div>
                        <search @searchValue="docSearchChange"></search>
                        <el-button class="startConsul myStartConsul" v-show="docAddTemplate" type="text" @click="docAddTemplateFun()">新增模板</el-button>
                    </div>
                    <div>
                        <div v-if="myFollowVisable" class="public-list">
                            <el-table :data="myFollowList" border style="width: 100%" @selection-change="followCheckChange" >
                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <el-table-column prop="userName" label="姓名">
                                </el-table-column>
                                <el-table-column prop="origin" label="来源">
                                </el-table-column>
                                <el-table-column prop="phone" label="手机号">
                                </el-table-column>
                                <el-table-column prop="group" label="分组">
                                </el-table-column>
                                <el-table-column prop="nearlyFollowup" label="近期随访">
                                </el-table-column>
                                <el-table-column prop="phoneFollowup" label="电话随访">
                                    <template slot-scope="scope">
                                        <el-switch v-model="scope.row.phoneFollowup" active-color="#13ce66" inactive-color="#ff4949" @change="phoneFollow(scope.row)">
                                        </el-switch>
                                    </template>

                                </el-table-column>
                                <el-table-column prop="deviceAlert" label="设备告警">
                                    <template slot-scope="scope">
                                        <div class="warnNumBox">
                                            <el-switch v-model="scope.row.deviceAlert" active-color="#13ce66" inactive-color="#ff4949" @change="warnFollow(scope.row)">
                                            </el-switch>
                                            <div class="warnNum" @click="setWarn(scope.row)">
                                                设置：180
                                            </div>
                                        </div>

                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="250">
                                    <template slot-scope="scope">
                                        <el-button class='seeDanganClass' @click="seeDanganClick(scope.row)" type="text" size="small">查看档案</el-button>
                                        <el-button class='sendMessage' @click="sendMessage(scope.row)" type="text" size="small">发送</el-button>
                                        <el-button class='seeDetail' @click="myFollowDetail(scope.row)" type="text" size="small">查看详情</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination style='text-align:center' background layout="prev, pager, next" :total="adminTotal5" :current-change="changeCurrent5">
                            </el-pagination>
                            <div class="groupClass">
                                <div>移动到</div>
                                <ul>
                                    <li :class="oGroupClick==-1?'groupClick':''" @click="addGroup()">新增组</li>
                                    <li :class="oGroupClick==index?'groupClick':''" v-for="(item,index) in groupList" :key="index" @click="changeGroup(item.groupId,index)">
                                        {{item.groupName}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <tableList v-else :tableData="doctorList" :columns="doctorColumns" :checkVisable="docTableChecked" :tableBtn="doctorBtn" :total="adminTotal4" @rebackFenye="changeCurrent4"></tableList>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div v-if="followDetailVisible">
                <el-dialog class="evaluateBox addFollowBox  addFollowBoxFollow" title=" " :visible.sync="followDetailVisible" width="602px" hight="356px" center>
                    <followDetail :addFollowData="followDetailData"></followDetail>
                </el-dialog>
            </div>
        </div>
        <div v-if="chatVisible">
            <el-dialog class="chatDialog" title="" :visible.sync="chatVisible" width="680px">
                <chat :sessionId="sessionId" :doctorVis="doctorVis" :chatTypeBox="chatTypeBox" :userMessage="userMessage"></chat>
            </el-dialog>
        </div>
        <div v-if="groupVisible">
            <el-dialog title="创建分组" :visible.sync="groupVisible" width="680px">
                <el-input v-model="groupName" placeholder="请输入内容"></el-input>
                <el-button type="primary" @click="sureAddGroup()">确认</el-button>
            </el-dialog>
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
    publishNotice, //发送模板
    toolDept,
    toolFollowupType,
    toolFollowupMode,
    toolFollowupContent,
    myFollowup,
    toolSurveyType,
    toolSurveyMode,
    toolDeviceType,
    toolFollowupHasPlan,
    getModelTitleList,
    queryPageByDoctorWeb,
    createInquiry,
    publishArticle,
    queryTypeList,
    getResultGraph,
    modelInsert,
    getTemplateInfo,
    editModel,
    phoneFollowupSwitch,
    myFollowDetailFun,
    alertGet,
    alertSet,
    fetchChatSession,
    groupList,
    addGroupMember,
    addfenzu,
    groupSelects,
    SETEQUIPMENT,
    SETFOLLOWCHART,
    toolMemberGroup,
    alertSwitch
} from "../../api/apiAll.js";
import { mapState } from "vuex";
import echarts from "../../plugs/echarts.js";
import normalTab from "../../public/publicComponents/normalTab.vue";
import tableList from "../../public/publicComponents/publicList.vue";
import search from "../../public/publicComponents/search.vue";
import selftag from "../../public/publicComponents/selftag.vue";
import statisticsWay from "../../public/publicComponents/statisticsWay.vue";
import publicTime from "../../public/publicComponents/publicTime.vue";
import normalColumnChart from "../../public/publicComponents/normalColumnChart.vue";
import pieChart from "./../followUpBox/pieChart.vue";
import addQuestOrAritle from "./../followUpBox/addQuestOrAritle.vue";
import followDetail from "./../followUpBox/followDetail.vue";
import warnSet from "./../followUpBox/warnSet.vue";
import { quillEditor } from "vue-quill-editor";
import chat from "../../public/publicComponents/chat.vue";
export default {
    components: {
        tableList,
        search,
        normalTab,
        selftag,
        statisticsWay,
        publicTime,
        normalColumnChart,
        quillEditor,
        pieChart,
        addQuestOrAritle,
        followDetail,
        warnSet,
        chat
    },
    data() {
        return {
            userMessage:{},
            chatTypeBox: {
                startDoctorName: "",
                startDoctorTYpe: "随访",
                archivesUrl:'/followUp'
            },
            quillDiabled: false,
            urlDiabled: false,
            doctorArticleVisiable: false,
            groupId: "",
            pieChart1: {
                id: "myChart1",
                data: {
                    total: 95,
                    data: [
                        {
                            x: "没问题？？",
                            y: 1
                        },
                        {
                            x: "1",
                            y: 31
                        },
                        {
                            x: "2",
                            y: 31
                        },
                        {
                            x: "3",
                            y: 31
                        },
                        {
                            x: "好的满意",
                            y: 1
                        }
                    ]
                }
            },
            pieChart2: { id: "myChart2", data: {} },
            pieChart3: { id: "myChart3", data: {} },
            groupValue: "",
            groupName: "",
            groupVisible: false,
            doctorVis: 1,
            chatVisible: false,
            sessionId: "",
            switchNum: 0,
            //随访计划
            warnVisible: false,
            warnList: [],
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
            addFollowBtnVis: true,
            questVisible: false,
            addFollowData: {
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
                        contentModels: [
                            {
                                followUpType: "REMIND",
                                title: "",
                                contentId: null
                            }
                        ]
                    }
                ]
            },
            selectData: {},
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
            odepartment1: "",
            odepartment2: "",
            odepartment3: "",
            odepartment4: "",
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
                list: []
            }, //管理端tab
            oTab2: {
                list: []
            }, //管理端tab
            oTab3: {
                list: []
            }, //管理端tab
            oTab4: {
                list: []
            }, //管理端tab
            oTab5: {
                list: []
            }, //管理端tab
            oTab6: {
                list: []
            },
            oTab66: {
                list: []
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
            oTab8: { list: [] },
            oTab9: { list: [] }, //有无随访计划
            oTab10: {
                more: false,
                title: "随访时间",
                list: [
                    {
                        text: "全部",
                        value: ""
                    },
                    {
                        text: "今天",
                        value: "USER"
                    },
                    {
                        text: "未来3天",
                        value: "DOCTOR"
                    }
                ]
            },
            oTab11: { list: [] },
            oTab12: { list: [] }, //我的随访分组
            oTab14: { list: [] },
            oTab144:[],
            oTab15: { list: [] },
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
            mydChoice: "",
            addMydTemplateVis: true,
            mydTemlateName: {
                title: "",
                context: "",
                nameList: []
            },
            associationId: [],
            sendTemplate1: [],
            mydAddData: {
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
            },
            selectedOptions: [],
            mydAddoptions: [
                {
                    value: "OUTPATIENT",
                    label: "门诊调查",
                    cities: []
                },
                {
                    value: "MEDICALTECHNOLOGY",
                    label: "医技调查",
                    cities: []
                },
                {
                    value: "INHOSPITAL",
                    label: "住院调查",
                    cities: []
                },
                {
                    value: "ADMINISTRATION",
                    label: "行政调查",
                    cities: []
                },
                {
                    value: "URL",
                    label: "推送链接",
                    cities: []
                }
            ],
            props: {
                value: "value",
                children: "cities"
            },
            mydTableChecked: false,
            mydTemplateTitle: [],
            sendTemplateId: [], //要发送的模板id
            userList: [], //要发送的用户id
            templateVisible: false, //发送满意度模板
            sendTemplateListVis: false,
            followTableVisible: false,
            addFollowVis: false,
            mydAddTemplate: false,
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
            SatisfiedBtn: [],

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
                title: "住院随访统计 ", //图表标题
                total: 0
            },
            //发起科室统计图
            drawDataStart: {
                dataAxis: [], //每个柱子代表的类名
                data: [], //具体数值
                title: " 门诊随访统计", //图表标题
                total: 0
            },
            drawDataEquipment: {
                dataAxis: [], //每个柱子代表的类名
                data: [], //具体数值
                title: " 设备监测人次", //图表标题
                total: 0
            },
            drawDataFollow: {
                dataAxis: [], //每个柱子代表的类名
                data: [], //具体数值
                title: "智能随访人次 ", //图表标题
                total: 0
            },
            tjType: "DEPT",
            tjStartTime: "",
            tjEndTime: "",
            //医生数据
            activeName: "first",
            questOindex: "",
            articleCheckList: [],
            questCheckList: [],
            articleList: [],
            questList: [],
            docAddTemplate: false,
            doctorTemplateVisiable: false,
            docTableChecked: false,
            hadFollowup: "", //有无随访计划
            docStartTime: "",
            docEndTime: "",
            groupId: "",
            doctorSxVisiable: true,
            doctorList: [],
            doctorBtn: [
                {
                    name: "查看档案",
                    oclass: "viewFollow",
                    method: (index, row) => {
                        this.docFollowDelete0(index, row);
                    }
                },
                {
                    name: "发送",
                    oclass: "viewFollow",
                    method: (index, row) => {
                        this.docFollowDelete0(index, row);
                    }
                },
                {
                    name: "查看详情",
                    oclass: "viewFollow",
                    method: (index, row) => {
                        this.docFollowDelete0(index, row);
                    }
                }
            ],
            doctorColumns: [
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
            ],
            partDoctorType: "",
            addQuestData: {
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
            },
            QuestTableVisible: false,
            choiceItem: ["单选", "多选", "问答"],
            addArticleData: {
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
            },
            imageUrl: "",
            articleImg: "",
            myFollowList: [],
            myFollowVisable: true,
            followDetailData: {},
            followDetailVisible: false,
            mydAddSuosuClassVis: false,
            groupList: [],
            oGroupClick: -1,
            groupUserId: [],
            // 分页变量
            adminPageNum1: 0,
            adminPageNum2: 0,
            adminPageNum3: 0,
            adminPageNum4: 0,
            adminPageNum5: 0,
            adminTotal1: 0,
            adminTotal2: 0,

            adminTotal3: 0,
            adminTotal4: 0,
            adminTotal5: 0,
            adminTotal6: 0,
            followMobanType: "",
            articleType: "",
            questChoiceIndex: 0
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
        this.getUsFollow();
        this.getGroupList();
        this.articleImg =
            "/m/v1/api/hdfs/fs/upload?token=" + this.userState.token;
        // 医生
        this.screenPublic(this.oTab9, toolFollowupHasPlan, "随访计划"); //有无计划
        this.screenPublic(this.oTab2, toolFollowupType, "类型"); //随访类型
        this.screenPublic(this.oTab11, toolFollowupMode, "随访类型"); //随访类型
        this.screenPublic(this.oTab14, queryTypeList, "文章类型"); //随访类型
        this.screenPublic(this.oTab15, toolMemberGroup, "分组"); //我的随访分组
        if (this.userState.rooter || this.userState.manager) {
            this.partDoctorType = "MANAGE";
        } else {
            this.partDoctorType = "DOCTOR";
        }
        this.getDepartment(); //科室列表
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
                type: "DOCTOR",
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
        quillChange(data) {
            if (data) {
                this.urlDiabled = true;
            } else {
                this.urlDiabled = false;
            }
        },
        urlChange(data) {
            if (data) {
                this.quillDiabled = true;
            } else {
                this.quillDiabled = false;
            }
        },
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
        //文章筛选条件
        getOTab14(data) {
            this.articleType = data.index.value;
            this.oQueryArticleList();
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
                this.screenPublic(this.oTab15, toolMemberGroup, "分组"); //我的随访分组
                //我的随访
                this.myFollowVisable = true;
                this.docAddTemplate = false;
                this.doctorArticleVisiable = false;
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
                this.doctorArticleVisiable = false;
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
                this.doctorArticleVisiable = false;
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
                this.doctorArticleVisiable = true;
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
                this.doctorArticleVisiable = false;
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
            this.userMessage.userId=row.userId
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
                _this.screenPublic(this.oTab15, toolMemberGroup, "分组"); //我的随访分组
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
            
                $.each(this.oTab14.list,function(index,text){
                    if(index!=0){
                        this.oTab144.push(text)
                    }
                })
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
                // department: this.docDepartment,
                type: this.articleType,
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
            _this.addFollowData.itemModels[
                _this.questOindex
            ].contentModels.unshift(this.selectData);
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
        addQuestOrAricle(index, object) {
            this.selectData = object[0];
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
                contentModels: [
                    {
                        followUpType: "REMIND",
                        title: "",
                        contentId: null
                    }
                ]
            });
        },
        //删除当前项
        deleteFollowTimeList(index) {
            if (this.addFollowData.itemModels.length == 1) {
                // this.$notify.warn({
                //     title: "警告",
                //     message: "随访事件"
                // });
            } else {
                this.addFollowData.itemModels.splice(index, 1);
            }
        },
        //新增随访表
        async addFollowTable() {
            let addFollowData1 = JSON.parse(
                JSON.stringify(this.addFollowData.itemModels)
            );

            let olength = $(".addQuestBoxUlBox>li").length;
            // for (let i = 0; i < olength; i++) {
            //     addFollowData1[i].contentModels.unshift({
            //         followUpType: "REMIND",
            //         title: $(".addQuestBoxUlBox>li:eq(" + i + ")")
            //             .find(".remindText")
            //             .val(),
            //         contentId: null
            //     });
            // }
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
                                contentModels: [
                                    {
                                        followUpType: "REMIND",
                                        title: "",
                                        contentId: null
                                    }
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

        // 单选or多选or问答
        choiceItemFun(index2) {
            this.questChoiceIndex = index2;
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
                    _this.addQuestData = {
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
                    _this.imageUrl = "";
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
.el-switch.is-checked .el-switch__core::after {
    margin-left: -12px !important;
}

.el-switch.is-checked .el-switch__core {
    background: #4d7cfe !important;
}

.addFollowTitle .el-input__inner::-webkit-input-placeholder {
    /* font-family: .PingFangSC-Regular;
    font-size: 18px;
    color: #281012;
    letter-spacing: -0.25px; */
}
</style>