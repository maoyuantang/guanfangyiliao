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
                        <el-form-item class="addFollowM-bot firstZhiliao" label="首次治疗">
                            <el-date-picker class="oTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                        <ul>
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
                                        <div>
                                            <span v-show="otext.followUpType=='REMIND'">提醒：</span>
                                            <span v-show="otext.followUpType=='ESSAY'">健康知识：</span>
                                            <span v-show="otext.followUpType=='INQUIRY'">问诊：</span>
                                            <span v-show="otext.followUpType=='MEDICAL'">疾病自评：</span>
                                            <span v-show="otext.followUpType=='DEVICE'">设备监测：</span>
                                            <span class="questTableName">{{otext.title}}</span>
                                        </div>

                                        <span @click="deleteQuest(index,oindex)" class="questDelete">
                                            <img src="../assets/img/addFollowDelete2.png" />
                                        </span>
                                    </li>
                                </ul>
                                <div class="addFollowBtn" v-show="addFollowBtnVis">
                                    <div @click="addQuestOrAricle(index)">
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
                        <div class="addFollowM-bot remindTime">
                            提醒时间
                            <el-select class="addFollowHou" v-model="addFollowData.remindDays" placeholder="请选择">
                                <el-option v-for="(text,index) in 100" :key="index" :label="text" :value="text">
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
            <el-dialog class="evaluateBox addQuestBox " title=" " :visible.sync="QuestTableVisible" width="602px" hight="356px" center>
                <el-form ref="form" :model="addQuestData" label-width="80px">

                    <el-form-item>
                        <el-input class="addFollowTitle" v-model="addQuestData.title" placeholder="请输入问诊标题"></el-input>
                    </el-form-item>
                    <div class="addFollowMain">
                        <ul class="addQuestUl">
                            <li v-for="(text,index) in addQuestData.bankModels" :key="index">
                                <span class="deleteQuestList" @click="deleteQuestList(index)">
                                    <img src="../assets/img/questDelete.png" />
                                </span>
                                <div v-show="text.questionType=='RADIO'">
                                    <el-form-item :label="index+1">
                                        <el-input class="" v-model="text.title" placeholder="请输入问诊标题"></el-input>
                                    </el-form-item>
                                    <el-radio-group class="redioSingle">
                                        <el-radio v-for="(text1,index1) in text.solutionModels" :key="index1" :label="index1">
                                            <span>{{text1.tag}}</span>
                                            <el-input class="" v-model="text1.answerDescribe" placeholder="请输入问诊标题"></el-input>
                                            <span class="questItemDelete" @click="deleteQuestText(index,index1)">
                                                <img src="../assets/img/questDelete.png" />
                                            </span>
                                        </el-radio>
                                    </el-radio-group>
                                    <div class="itemChoiceItemBox" @click="itemChoiceItemFun(index,text.questionType)">
                                        添加一项
                                    </div>
                                </div>
                                <div v-show="text.questionType=='CHECKBOX'">
                                    <el-form-item :label="index+1">
                                        <el-input class="" v-model="text.title" placeholder="请输入问诊标题"></el-input>
                                    </el-form-item>
                                    <el-checkbox-group class="redioSingle">
                                        <el-checkbox v-for="(text1,index1) in text.solutionModels" :key="index1" :label="index1">
                                            <span>{{text1.tag}}</span>
                                            <el-input class="" v-model="text1.answerDescribe" placeholder="请输入问诊标题"></el-input>
                                            <span class="questItemDelete" @click="deleteQuestText(index,index1)">
                                                <img src="../assets/img/questDelete.png" />
                                            </span>
                                        </el-checkbox>
                                    </el-checkbox-group>
                                    <div class="itemChoiceItemBox" @click="itemChoiceItemFun(index,text.questionType)">
                                        添加一项
                                    </div>
                                </div>
                                <div v-show="text.questionType=='TEXT'">
                                    <el-form-item :label="index+1">
                                        <el-input class="" v-model="text.title" placeholder="请输入问诊标题"></el-input>
                                    </el-form-item>
                                </div>
                            </li>
                        </ul>
                        <div class="choiceItemBox">
                            <span v-for="(text2,index2) in choiceItem" :key="index2" @click="choiceItemFun(index2)">{{text2}}</span>
                        </div>
                        <el-button @click="addQuestTable()" type="primary">保存</el-button>
                    </div>

                </el-form>
            </el-dialog>
        </div>
        <!-- 随访计划详情 -->
        <div v-if="followPlanVisible">
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
                        <el-input class="addFollowTitle" v-model="addArticleData.title" placeholder="请输入随访标题"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-select v-model="addArticleData.articleType" placeholder="请选择活动区域">

                            <el-option v-for="(text1,index) in oTab14.list " :label="text1.text" :value="text1.value" :key="index">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div class="addArticleImg">
                        <el-upload class="avatar-uploader" :action="articleImg" :show-file-list="false" :on-success="articleImgSuccess">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <div>
                        <div>
                            您可以通过自编原创、URL转载、从Word导入完成文章编辑
                        </div>
                        <div class="addArticleEditor">
                            <quill-editor v-model="addArticleData.content" ref="myQuillEditor" class="editer" :options="infoForm.editorOption" @ready="onEditorReady($event)">
                            </quill-editor>
                        </div>
                        <el-input class="addFollowTitle" v-model="addFollowData.title" placeholder="请输入随访标题"></el-input>
                    </div>
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
        <!-- 满意度新增模板 -->
        <div v-if="mydAddTemplate">
            <el-dialog class="evaluateBox" title=" " :visible.sync="mydAddTemplate" width="770px" hight="356px" center>
                <div class="mydAddTemplate-title">
                    <img src="../assets/img/Bitmap.png" />
                </div>
                <el-form ref="form" :model="mydAddData" label-width="80px">
                    <el-form-item label="所属分类">
                        <el-select v-model="mydAddData.type" placeholder="请选择活动区域">
                            <el-option v-for="(text,index) in oTab6.list" :label="text.text" :value="text.value" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动名称">
                        <el-input v-model="mydAddData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="模板内容">
                        <el-input type="textarea" v-model="mydAddData.context"></el-input>
                    </el-form-item>
                    <div>
                        <div>回复选项关联(系统根据回复自动发送后续的关联问卷)</div>
                        <div>
                            <ul>
                                <li class="mydQuestList" v-for="(text,index) in mydAddData.associations" :key="index">
                                    <div>
                                        <el-form-item label="活动名称">
                                            <el-input v-model="text.answer"></el-input>
                                        </el-form-item>

                                        <el-form-item label="所属分类" class="classification">
                                            <div class="ificationBox">
                                                <el-input v-model="mydTemlateName.title">dfdfdfd</el-input>
                                                <div @click="ificationBoxClick()">
                                                    <img src="../../static/assets/img/downXia.png" />
                                                </div>
                                            </div>
                                            <div class="mydAddSuosuClass" v-show="mydAddSuosuClassVis">
                                                <ul>
                                                    <li v-for="(text1,index1) in oTab66.list" :key="index1" :value="text1.value" @click="sendTemplateList1(text1.value)">
                                                        {{text1.text}}>
                                                    </li>

                                                </ul>
                                                <ul>
                                                    <li v-for="(text2,index2) in mydTemlateName.nameList" :key="index2" :value="text2.associationId" @click="sendTemplateContext(text2.title,index2,text2.associationId)">
                                                        {{text2.title}}
                                                    </li>

                                                </ul>
                                                <div>
                                                    {{mydTemlateName.context}}
                                                </div>
                                            </div>
                                        </el-form-item>
                                    </div>
                                    <span>
                                        删除
                                    </span>
                                </li>
                            </ul>
                            <span @click="addMydList()">
                                添加
                            </span>
                        </div>
                    </div>
                    <el-form-item>
                        <!-- 新增完成按钮 -->
                        <el-button type="primary" @click="addMydTemplate()" v-if="addMydTemplateVis">完成</el-button>
                        <!-- 编辑完成按钮 -->
                        <el-button type="primary" @click="editMydTemplate()" v-else>完成</el-button>
                    </el-form-item>
                </el-form>

            </el-dialog>
        </div>
        <!-- 满意度发送的模板列表 -->
        <div v-if="templateVisible">
            <el-dialog class="evaluateBox" title=" " :visible.sync="templateVisible" width="240px" hight="356px" center>
                <ul>
                    <li v-for="(text,index) in mydTemplateTitle" :key="index" @click="selectTemplate(index,text)">
                        {{text.title}}
                    </li>
                </ul>
            </el-dialog>
        </div>
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

                        <search @searchValue="adminSearchChange"></search>
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
                            <selftag :inData="oTab8" @reback="getOTab8" v-show="wayVisible2"></selftag>
                            <selftag :inData="oTab7" @reback="getOTab7" v-show="wayVisible3"></selftag>
                        </div>

                        <el-button class="startConsul" v-show="addFollowVis" type="text" @click="mydAddTemplate = true;addMydTemplateVis=true">新增模板</el-button>
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
                                <img src="../assets/img/mydAdd.png" />
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
                    <!-- 123
                    <pieChart></pieChart> -->
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
                        <statisticsWay @reBack="tjTimeValueFun"></statisticsWay>
                    </div>
                    <div style="display:flex">
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
                            <selftag :inData="oTab2" @reback="getOTab2" v-show="doctorTemplateVisiable"></selftag>
                            <selftag :inData="oTab9" @reback="getOTab9" v-show="doctorSxVisiable"></selftag>
                            <selftag :inData="oTab10" @reback="getOTab10" v-show="doctorSxVisiable"></selftag>
                            <selftag :inData="oTab11" @reback="getOTab11" v-show="doctorSxVisiable"></selftag>
                        </div>
                        <search @searchValue="docSearchChange"></search>
                        <el-button class="startConsul" v-show="docAddTemplate" type="text" @click="docAddTemplateFun()">新增模板</el-button>
                    </div>
                    <div>
                        <div v-if="myFollowVisable">
                            <el-table :data="myFollowList" border style="width: 100%">
                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <el-table-column fixed prop="userName" label="姓名" width="150">
                                </el-table-column>
                                <el-table-column prop="origin" label="来源" width="120">
                                </el-table-column>
                                <el-table-column prop="phone" label="手机号" width="120">
                                </el-table-column>
                                <el-table-column prop="group" label="分组" width="120">
                                </el-table-column>
                                <el-table-column prop="nearlyFollowup" label="近期随访" width="300">
                                </el-table-column>
                                <el-table-column prop="phoneFollowup" label="电话随访" width="120">
                                    <template slot-scope="scope">
                                        <el-switch v-model="scope.row.phoneFollowup" active-color="#13ce66" inactive-color="#ff4949" @change="phoneFollow(scope.row)">
                                        </el-switch>
                                    </template>

                                </el-table-column>
                                <el-table-column prop="deviceAlert" label="设备告警" width="120">
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
                                <el-table-column fixed="right" label="操作" width="100">
                                    <template slot-scope="scope">
                                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看档案</el-button>
                                        <el-button @click="sendMessage(scope.row)" type="text" size="small">发送</el-button>
                                        <el-button @click="myFollowDetail(scope.row)" type="text" size="small">查看详情</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option key="0" label="新增组" value="0" @click="addGroup()">
                                </el-option>
                                <el-option v-for="item in groupList" :key="item.groupId" :label="item.groupName" :value="item.groupId" @click="fenGroup(item.groupId)">
                                </el-option>
                            </el-select>
                        </div>
                        <tableList v-else :tableData="doctorList" :columns="doctorColumns" :checkVisable="docTableChecked" :tableBtn="doctorBtn"></tableList>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div v-if="followDetailVisible">
                <el-dialog class="evaluateBox addFollowBox" title=" " :visible.sync="followDetailVisible" width="602px" hight="356px" center>
                    <followDetail :addFollowData="followDetailData"></followDetail>
                </el-dialog>
            </div>
        </div>
        <div v-if="chatVisible">
            <el-dialog class="chatDialog" title="" :visible.sync="chatVisible" width="680px">
                <chat :sessionId="sessionId" :doctorVis="doctorVis"></chat>
            </el-dialog>
        </div>
        <div v-if="groupVisible">
            <el-dialog class="chatDialog" title="创建分组" :visible.sync="groupVisible" width="680px">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
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
    groupList
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
import pieChart from "./followUpBox/pieChart.vue";
import addQuestOrAritle from "./followUpBox/addQuestOrAritle.vue";
import followDetail from "./followUpBox/followDetail.vue";
import warnSet from "./followUpBox/warnSet.vue";
import { quillEditor } from "vue-quill-editor";
import chat from "../public/publicComponents/chat.vue";

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
            groupVisible: false,
            doctorVis: 0,
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
                department: [""],
                title: " ",
                type: "INHOSPITAL",
                remindMe: true,
                remindHe: true,
                remindDays: "",
                itemModels: [
                    {
                        calcVal: 1,
                        calcUnit: "天",
                        state: true,
                        contentModels: []
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
                deptId: [" "],
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
                title: " ", //图表标题
                total: "555"
            },
            //发起科室统计图
            drawDataStart: {
                dataAxis: [], //每个柱子代表的类名
                data: [], //具体数值
                title: " ", //图表标题
                total: "555"
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
            hadFollowup: true, //有无随访计划
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
                departmentList: [""],
                title: "",
                bankModels: [
                    {
                        title: "这是个文字问题",
                        questionType: "TEXT"
                    },
                    {
                        title: "这是选项",
                        questionType: "CHECKBOX",
                        solutionModels: [
                            {
                                sortId: 1,
                                tag: "a",
                                answerDescribe: "对"
                            },
                            {
                                sortId: 2,
                                tag: "b",
                                answerDescribe: "不对"
                            }
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
                department: [" "],
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
            groupList: []
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
        this.articleImg =
            "/m/v1/api/hdfs/fs/upload?token=" + this.userState.token;
        this.circularData(this.odata["header"]);
        this.getFoList(); //随访列表
        this.getUsFollow(); //我的随访
        this.screenPublic(this.oTab2, toolFollowupType, "类型"); //随访类型
        this.screenPublic(this.oTab3, toolFollowupMode, "方式"); //随访方式
        this.screenPublic(this.oTab4, toolFollowupContent, "内容"); //随访内容

        this.screenPublic(this.oTab6, toolSurveyType, "类型"); //调查类型
        this.screenPublic(this.oTab66, toolSurveyType, "类型"); //调查类型
        this.oTab66Remove();
        this.screenPublic(this.oTab8, toolSurveyMode, "方式"); //调查方式
        this.screenPublic(this.oTab5, toolDeviceType, "设备类型"); //设备类型
        this.screenPublic(this.oTab9, toolFollowupHasPlan, "随访计划"); //有无计划
        // 医生
        this.screenPublic(this.oTab11, toolFollowupMode, "随访类型"); //随访类型
        this.screenPublic(this.oTab14, queryTypeList, "文章类型"); //随访类型
        if (this.userState.rooter || this.userState.manager) {
            this.partDoctorType = "MANAGE";
        } else {
            this.partDoctorType = "DOCTOR";
        }
        this.getDepartment(); //科室列表
    },
    mounted() {},
    methods: {
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

        //满意度新增模板借口
        // async handleChange(value) {
        //     console.log(value);

        //     this.sendTemplateList1(value, "");
        //     console.log(this.mydTemplateTitle);
        // },
        onEditorReady(editor) {},

        //筛选
        getOTab1(data) {
            this.odepartment = data.index.value;
            if (this.switchNum == 0) {
                this.getFoList();
            } else if (this.switchNum == 2) {
                this.oManagerGetDeviceList();
            } else if (this.switchNum == 3) {
                this.oGetFollowupGraph();
                this.oGetFollowupRemarks();
            }

            // this.oGetModelList();
            // this.oGetResultList();
            // this.oGetMissileList();
        },
        getOTab2(data) {
            this.otype = data.index.value;
            this.getFoList();
            this.getUsFollow();
            this.oQueryList();
        },
        getOTab3(data) {
            this.oTheWay = data.index.value;
            this.getFoList();
            this.getUsFollow();
        },
        getOTab4(data) {
            this.oContent = data.index.value;
            this.getFoList();
            this.getUsFollow();
        },
        getOTab5(data) {
            this.equiType = data.index.value;
            this.getFoList();
            // this.getfamiliList();
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
        getOTab8() {},
        //有无随访计划
        getOTab9(data) {
            this.houseDeviceType = data.index.value;
            this.getUsFollow();
        },
        //有无随访时间
        getOTab10(data) {
            this.houseDeviceType = data.index.value;
            this.getUsFollow();
        },
        //有无随访类型
        getOTab11(data) {
            this.houseDeviceType = data.index.value;
            this.getUsFollow();
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
        //满意度接口
        // 满意度调查切换
        followUp2Fun(index) {
            this.mydChoice = index;
            this.indexTab2 = index;
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
                department: this.odepartment,
                type: this.tjType,
                startDate: this.tjStartTime,
                endDate: this.tjEndTime
            };
            const res = await INHOSPITAL(options);
            if (res.data && res.data.errCode === 0) {
                _this.drawData.totalNumber = res.data.body.total;
                $.each(res.data.body.data, function(index, text) {
                    _this.drawData.dataAxis.push(text.x);
                    _this.drawData.data.push(text.y);
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
                _this.drawDataStart.totalNumber = res.data.body.total;
                $.each(res.data.body.data, function(index, text) {
                    _this.drawDataStart.dataAxis.push(text.x);
                    _this.drawDataStart.data.push(text.y);
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
            this.odepartment = "";
            this.switchNum = res.i;
            if (res.i == 0) {
                this.getFoList();
            } else if (res.i == 1) {
                this.oGetResultList();
            } else if (res.i == 2) {
                this.oManagerGetDeviceList(); //家用设备列表
            } else if (res.i == 3) {
                this.oGetFollowupGraph();
                this.oGetFollowupRemarks();
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
                this.doctorBtn = [
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
                    (this.doctorTemplateVisiable = false);
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
                        prop: "title",
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
                    (this.doctorTemplateVisiable = true);
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
                userId: this.userSelfInfo.userId,
                homepage: true
            };
            const res = await groupList(query);
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
        addGroup() {
            this.groupVisible = true;
        },
        //移动分组
        async fenGroup(oid) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                groupId: "",
                userId: ""
            };
            const res = await addGroupMember(query);
            if (res.data && res.data.errCode === 0) {
               this.$notify.success({
                    title: "成功",
                    message: '移动成功！'
                });
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
            this.docDepartment = data.index.value;
            this.getUsFollow();
            this.oGetTemplate();
            this.oQueryList();
            this.oQueryArticleList();
            this.getQueryPageByDoctorWeb();
        },
        //我的随访
        async getUsFollow() {
            let _this = this;
            const options = {
                token: this.userState.token,
                hadFollowup: this.hadFollowup,
                search: this.docSearchData,
                groupId: this.docDepartment,
                startTime: this.docStartTime,
                endTime: this.docEndTime,
                mode: ""
            };
            const res = await myFollowup(options);
            if (res.data && res.data.errCode === 0) {
                // _this.doctorList = res.data.body.data2.list;
                _this.myFollowList = res.data.body.data2.list;
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
        async getQueryPageByDoctorWeb() {
            let _this = this;
            const query = {
                token: this.userState.token,
                pageNum: 1,
                pageSize: 10
            };
            const res = await queryPageByDoctorWeb(query);
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
                setTimeout(function() {
                    _this.followTableVisible = false;
                    _this.oGetTemplate();
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
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
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
                    this.oQueryArticleList();
                    _this.articleTableVisible = false;
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
                department: this.odepartment
            };
            const res = await getResultGraph(query);
            if (res.data && res.data.errCode === 0) {
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
            this.followDetailVisible = true;
            let _this = this;
            let query = {
                token: this.userState.token,
                userId: row.userId
            };
            const res = await myFollowDetailFun(query);
            if (res.data && res.data.errCode === 0) {
                this.followDetailData = res.data.body;
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
.addQuestBox .el-form-item__label {
    width: 20px !important;
}
.addQuestBox .el-form-item__content {
    margin-left: 20px !important;
}
.redioSingle > label {
    display: block;
}
.redioSingle > label:first-child {
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
    right: -19px;
    top: 20px;
    width: 13px;
    height: 13px;
    cursor: pointer;
}
.deleteQuestList > img {
    width: 100%;
    height: 100%;
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
    width: 110px;
}
</style>