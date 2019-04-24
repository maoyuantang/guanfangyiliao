<!-- 今日计划 -->
<template>
    <div>
        <div v-if="authMap.find(item=>item.authorityId==='40000')">
            <!-- 今日计划 -->
            <div class="indexClassBox" v-if="planTableVisable">
                <div>
                    <h4>今日计划</h4>
                    <div @click='seeMore(1)'>
                        查看历史计划
                    </div>
                </div>

                <div class="indexClassTable">
                    <el-table :data="planData" border style="width: 100%" :show-header="showHeadViable">
                        <el-table-column label=" " width="70">
                            <template slot-scope="scope">
                                <div class='indexHeadImgClass'>
                                    <img :src="userSocketInfo.headImg+scope.row.headId" :onerror="defaultImg" />
                                </div>
                                <!-- {{scope.row.userName}} -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="userName" label=" " width="100">
                        </el-table-column>
                        <el-table-column prop="phone" label=" " width="">
                            <template slot-scope="scope">
                                <img src="../../../assets/img/ic_phone.png" /> {{scope.row.phone}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="planCreateTime" label=" " width="">
                        </el-table-column>
                        <el-table-column prop="content" label=" " width="">
                        </el-table-column>
                        <el-table-column label=" " width="300">
                            <template slot-scope="scope">
                                <el-button class="btnClass" @click="sendMessage(scope.row)" type="text" size="small">发消息</el-button>
                                <div class=" remarkListClass" @mouseenter="seeRemarks(scope.row,1)">
                                    <!-- <el-button class="btnClass" type="text" size="small">看备注</el-button>
                                    <ul>
                                        <li v-for="(text,index) in remarks" :key="index">
                                            <div>{{text.createTime}}</div>
                                            <div>{{text.content}}</div>
                                        </li>
                                    </ul> -->
                                    <el-dropdown trigger="click">
                                        <el-button @click="seeRemarks(scope.row)" class="btnClass" type="danger" size="mini" plain>看备注</el-button>
                                        <el-dropdown-menu slot="dropdown">

                                            <el-dropdown-item v-for="(text,index) in remarks" :key="index">
                                                <div>{{text.createTime}}</div>
                                                <div>{{text.content}}</div>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                                <el-button class="btnClass" @click="sendArchives(scope.row)" type="text" size="small">看档案</el-button>
                                <div class="entryFile">
                                    <!-- <el-button class="btnClass" type="text" size="small">录入档案</el-button>
                                    <ul>
                                        <li @click="addPublicDangan(scope.row)">普通档案</li>
                                        <li @click="addWomanDangan(scope.row)">孕妇档案</li>
                                    </ul> -->
                                    <el-dropdown>
                                        <el-button class="btnClass" type="danger" size="mini" plain>录入档案</el-button>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item @click.native="addWomanDangan(scope.row)">孕妇信息</el-dropdown-item>
                                            <el-dropdown-item @click.native="addPublicDangan(scope.row)">普通档案</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label=" " width="100">
                            <template slot-scope="scope">
                                <el-button class="solveOver" @click="solveOver(scope.row,0)" type="text" size="small">处理完成</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
            </div>
            <!-- 今日告警 -->
            <div class="indexClassBox" v-if="warnTableVisable">
                <div>
                    <h4>今日告警</h4>
                    <div @click='seeMore(2)'>
                        查看历史告警
                    </div>
                </div>

                <div class="indexClassTable">
                    <el-table :data="warnData" border style="width: 100%" :show-header="showHeadViable">
                        <el-table-column label=" " width="70">
                            <template slot-scope="scope">
                                <div class='indexHeadImgClass'>
                                    <img :src="userSocketInfo.headImg+scope.row.headId" :onerror="defaultImg" />
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="userName" label=" " width="100">
                        </el-table-column>
                        <el-table-column prop="phone" label=" " width="">
                            <template slot-scope="scope">
                                <img src="../../../assets/img/ic_phone.png" /> {{scope.row.phone}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="value" label=" " width="320">
                            <template slot-scope="scope">
                                血压项
                                <span class="redWord">&nbsp;&nbsp;&nbsp;{{scope.row.value}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label=" " width="300">
                            <template slot-scope="scope">
                                <el-button class="btnClass" @click="sendMessage(scope.row)" type="text" size="small">发消息</el-button>
                                <!-- <el-button class="btnClass" @click="seeRemarks(scope.row)" type="text" size="small">看备注</el-button> -->
                                <el-dropdown trigger="click">
                                    <el-button @click="seeRemarks(scope.row)" class="btnClass" type="danger" size="mini" plain>看备注</el-button>
                                    <el-dropdown-menu slot="dropdown">

                                        <el-dropdown-item v-for="(text,index) in remarks" :key="index">
                                            <div>{{text.createTime}}</div>
                                            <div>{{text.content}}</div>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                <el-button class="btnClass" @click="sendArchives(scope.row)" type="text" size="small">看档案</el-button>
                                <div class="entryFile">
                                    <el-dropdown>
                                        <el-button class="btnClass" type="danger" size="mini" plain>录入档案</el-button>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item @click.native="addWomanDangan(scope.row)">孕妇信息</el-dropdown-item>
                                            <el-dropdown-item @click.native="addPublicDangan(scope.row)">普通档案</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label=" " width="100">
                            <template slot-scope="scope">
                                <el-button class="solveOver" @click="solveOver(scope.row,1)" type="text" size="small">处理完成</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
            </div>
            <!-- 随访计划 -->
            <div class="indexClassBox" v-if="followTableVisable">
                <div>
                    <h4>近期随访</h4>
                    <div @click='seeMore(3)'>
                        查看历史随访
                    </div>
                </div>

                <div class="indexClassTable">
                    <el-table :data="followData" border style="width: 100%" :show-header="showHeadViable">
                        <el-table-column label=" " width="70">
                            <template slot-scope="scope">
                                <div class='indexHeadImgClass'>
                                    <img :src="userSocketInfo.headImg+scope.row.headId" :onerror="defaultImg" />
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="userName" label=" " width="100">
                        </el-table-column>
                        <el-table-column prop="phone" label=" " width="">
                            <template slot-scope="scope">
                                <img src="../../../assets/img/ic_phone.png" /> {{scope.row.phone}}
                            </template>
                        </el-table-column>
                        <el-table-column label=" " width="220">
                            <template slot-scope="scope">
                                <div>
                                    <div>随访制定时间{{scope.row.createTime}}</div>
                                    <div>近期随访时间{{scope.row.followupTime}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label=" " width="">
                            <template slot-scope="scope">
                                <div>
                                    <div> {{scope.row.complete}}</div>
                                    <div class="redWord"> {{scope.row.ongoing}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label=" " width="">
                            <template slot-scope="scope">
                                <el-button class="btnClass" @click="seeFollowPlan(scope.row)" type="text" size="small">查看</el-button>

                            </template>
                        </el-table-column>
                        <el-table-column label=" " width="300">
                            <template slot-scope="scope">
                                <el-button class="btnClass" @click="sendMessage(scope.row)" type="text" size="small">发消息</el-button>
                                <!-- <el-button class="btnClass" @click="seeRemarks(scope.row)" type="text" size="small">看备注</el-button> -->
                                <el-dropdown trigger="click">
                                    <el-button @click="seeRemarks(scope.row)" class="btnClass" type="danger" size="mini" plain>看备注</el-button>
                                    <el-dropdown-menu slot="dropdown">

                                        <el-dropdown-item v-for="(text,index) in remarks" :key="index">
                                            <div>{{text.createTime}}</div>
                                            <div>{{text.content}}</div>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                <el-button class="btnClass" @click="sendArchives(scope.row)" type="text" size="small">看档案</el-button>
                                <div class="entryFile">
                                    <!-- <el-button class="btnClass" type="text" size="small">录入档案</el-button>
                                    <ul>
                                        <li @click="addPublicDangan()">普通档案</li>
                                        <li @click="addWomanDangan()">孕妇档案</li>
                                    </ul> -->
                                    <el-dropdown>
                                        <el-button class="btnClass" type="danger" size="mini" plain>录入档案</el-button>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item @click.native="addWomanDangan(scope.row)">孕妇信息</el-dropdown-item>
                                            <el-dropdown-item @click.native="addPublicDangan(scope.row)">普通档案</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label=" " width="100">
                            <template slot-scope="scope">
                                <el-button class="solveOver" @click="solveOver(scope.row,2)" type="text" size="small">处理完成</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
            </div>
        </div>
        <!-- 会诊 -->
        <div v-if="authMap.find(item=>item.authorityId==='20000')">
            <div class="indexClassBox" v-if="huizTableVisable">
                <div>
                    <h4>远程会诊</h4>
                    <div @click='seeMore(4)'>
                        查看更多
                    </div>
                </div>

                <div class="indexClassTable">
                    <el-table :data="consultationData" border style="width: 100%" :show-header="showHeadViable">
                        <el-table-column label=" " width="70">
                            <template slot-scope="scope">
                                <div class='indexHeadImgClass'>
                                    <img :src="userSocketInfo.headImg+scope.row.headId" :onerror="defaultImgDoc" />
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="doctor" label=" " width="200">
                        </el-table-column>
                        <el-table-column label=" " width="">
                            <template slot-scope="scope">
                                {{scope.row.hospital}}|{{scope.row.department}}
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="consultationId" label=" " width="">
                        </el-table-column> -->
                        <el-table-column prop="applicationTime" label=" " width="">
                        </el-table-column>
                        <el-table-column prop="status" label=" " width="">
                            <template slot-scope="scope">
                                <span class="noStart" v-show="scope.row.status=='NEW'">未开始</span>
                                <span class="startIng" v-show="scope.row.status=='UNDERWAY'">进行中</span>
                                <span class="noStart" v-show="scope.row.status=='OVER'">结束</span>

                            </template>
                        </el-table-column>
                        <el-table-column label=" " width="220">
                            <template slot-scope="scope">
                                <el-button class="seeDanganClass" @click="sendArchives(scope.row)" type="text" size="small">查看档案</el-button>
                                <el-button class="enterHuizClass" @click="enterHuiz(scope.row,'会诊')" type="text" size="small">进入会诊</el-button>
                                <el-button class="invitedClass" @click="invitedUser(scope.row)" type="text" size="small">邀请</el-button>

                            </template>
                        </el-table-column>
                    </el-table>

                </div>
            </div>
        </div>
        <!-- 协作 -->
        <div v-if="authMap.find(item=>item.authorityId==='30000')">
            <div class="indexClassBox" v-if="xiezTableVisable">
                <div>
                    <h4>远程协作</h4>
                    <div @click='seeMore(5)'>
                        查看更多
                    </div>
                </div>

                <div class="indexClassTable">
                    <el-table :data="cooperationData" border style="width: 100%" :show-header="showHeadViable">
                        <el-table-column label=" " width="70">
                            <template slot-scope="scope">
                                <div class='indexHeadImgClass'>
                                    <img :src="userSocketInfo.headImg+scope.row.applyUserId" :onerror="defaultImgDoc" />
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label=" " width="200">
                            <template slot-scope="scope">
                                {{scope.row.applyUserName}}|{{scope.row.applyDeptName}}
                            </template>
                        </el-table-column>
                        <el-table-column label=" " width="">
                            <template slot-scope="scope">
                                接受协作医生：{{scope.row.synergyUserName[0]}}|{{scope.row.synergyDeptName[0]}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label=" " width="">
                        </el-table-column>
                        <el-table-column prop="synergyStatus" label=" " width="">
                            <template slot-scope="scope">
                                <span class="noStart" v-show="scope.row.synergyStatus==0">未开始</span>
                                <span class="startIng" v-show="scope.row.synergyStatus==1">进行中</span>
                                <span class="noStart" v-show="scope.row.synergyStatus==2">结束</span>

                            </template>
                        </el-table-column>
                        <el-table-column label=" " width="220">
                            <template slot-scope="scope">
                                <el-button class="seeDanganClass" @click="sendArchives(scope.row)" type="text" size="small">查看档案</el-button>
                                <el-button class="enterHuizClass" @click="enterHuiz(scope.row,'协作')" type="text" size="small">进入协作</el-button>
                                <el-button class="invitedClass" @click="invitedUserXie(scope.row)" type="text" size="small">邀请</el-button>

                            </template>
                        </el-table-column>
                    </el-table>

                </div>
            </div>
        </div>
        <!-- 谭莹聊天弹窗 -->

        <div v-if="chatVisible">
            <el-dialog class="chatDialog" title="" :visible.sync="chatVisible" width="680px">
                <chat :sessionId="sessionId" :doctorVis="doctorVis" :chatTypeBox="chatTypeBox" :userMessage="userMessage"></chat>
            </el-dialog>
        </div>
        <!-- 谭莹备注 -->

        <div v-if="remarksVisible">
            <el-dialog class="chatDialog" title="备注" :visible.sync="remarksVisible" width="680px">
                <div>
                    {{remarks}}
                </div>
            </el-dialog>
        </div>
        <!-- 录入档案 -->
        <norDocAlert :inData="puBlicFileData" @reback="addPublicFile"></norDocAlert>
        <!-- 孕妇档案 -->
        <WomanDoc :inData="puBlicManData" @reback="addPublicMan"></WomanDoc>
        <!-- 会诊邀请弹框 -->
        <div v-if="invitationVisibleHui">
            <el-dialog class="invitationClass" title="" :visible.sync="invitationVisibleHui" width="240px" hight="356px" center>
                <el-tree :data="invitationData" :props="defaultProps" @check="handleCheckChange" show-checkbox></el-tree>
                <el-button class='btnClass' type="primary" @click="sureInvitation()">确认邀请</el-button>
            </el-dialog>
        </div>

        <!-- 协作邀请弹框 -->
        <div v-if="invitationVisible">
            <el-dialog class="invitationClass" title="" :visible.sync="invitationVisible" width="240px" hight="356px" center>
                <el-tree :data="invitationDataXiez" :props="defaultProps" @check="handleCheckChangeXiez" show-checkbox></el-tree>
                <el-button class='btnClass' type="primary" @click="sureInvitationXiez()">确认邀请</el-button>
            </el-dialog>
        </div>
        <!-- 更多计划 -->
        <div v-if="planVisible">
            <el-dialog class="evaluateBox evaluateBox2" title="历史计划" :visible.sync="planVisible" width="782px" hight="356px" center :show-header="showHeadViable">
                <el-table :data="morePlanList" style="width: 100%">
                    <el-table-column label="" width="60">
                        <template slot-scope="scope">
                            <img src="../../../assets/img/publicHeadImg.png" />
                        </template>
                    </el-table-column>
                    <el-table-column label=" " width="120">
                        <template slot-scope="scope">
                            <div>
                                <h4>{{scope.row.userName}}</h4>
                                <div class='planWarnPhone'>{{scope.row.phone}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label=" " width="200">
                        <template slot-scope="scope">
                            制定时间{{scope.row.planCreateTime}}
                        </template>
                    </el-table-column>
                    <el-table-column label=" " width="220">
                        <template slot-scope="scope">
                            开始时间{{scope.row.planStartTime}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="planStatus" label=" " width="80">
                        <template slot-scope="scope">
                            <span class="statusClass">{{scope.row.planStatus}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="prev, pager, next" :page-sizes="planSize" :total="planTotal" @current-change="currentChangePlan">
                </el-pagination>
            </el-dialog>
        </div>
        <!-- 更多告警 -->
        <div v-if="warnVisible">
            <el-dialog class="planWarnClass" title="历史告警" :visible.sync="warnVisible" width="782px" hight="356px" center>
                <el-table :data="moreWarnList" style="width: 100%">
                    <el-table-column label="" width="60">
                        <template slot-scope="scope">
                            <img src="../../../assets/img/publicHeadImg.png" />
                        </template>
                    </el-table-column>
                    <el-table-column label=" " width="120">
                        <template slot-scope="scope">
                            <div>
                                <h4>张某人</h4>
                                <div class='planWarnPhone'>18912345689</div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column label=" " width="460">
                        <template slot-scope="scope">
                            血压项
                            <span class="redWord">{{scope.row.value}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="planStatus" label=" " width="80">
                        <template slot-scope="scope">
                            <span class="statusClass">{{scope.row.planStatus}}</span>
                        </template>
                    </el-table-column>

                </el-table>
                <el-pagination background layout="prev, pager, next" :page-sizes="planSize" :total="warnTotal" @current-change="currentChangeWarn">
                </el-pagination>
            </el-dialog>
        </div>
        <!-- 查看随访计划详情 -->
        <div v-if="followPlanVisible">
            <el-dialog class="planWarnClass evaluateBox addFollowBoxFollow" title="随访计划详情" :visible.sync="followPlanVisible" width="602px" hight="356px" center>
                <followDetail :addFollowData="addFollowData"></followDetail>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import WomanDoc from "../../../public/publicComponents/WomanDoc.vue";
import norDocAlert from "../../../public/publicComponents/norDocAlert.vue";
import apiBaseURL from "../../../enums/apiBaseURL.js";
import chat from "../../../public/publicComponents/chat.vue";
import followDetail from "../../followUpBox/followDetail.vue";

import { mapState } from "vuex";
import {
    todayPlan,
    todayAlert,
    todayFollowup,
    queryByDoctorPage,
    fetchChatSession,
    seeRemark,
    queryListByUserId,
    addWomanMessage,
    addOrdinaryArchives,
    updateConsultationStatus,
    changeStatus,
    warnStatus,
    signStatus,
    queryConsultationInformList,
    sponsorConsultationInform,
    synergyPage,
    enableSynergyDoctor,
    sendSynergy,
    alertHistory,
    planHistory,
    getFollowUpPlan
} from "../../../api/apiAll.js";
import { exists } from "fs";
export default {
    components: {
        chat,
        WomanDoc,
        norDocAlert,
        followDetail
    },
    watch: {},
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo,
            userSocketInfo: state => state.socket
        }),
        authMap() {
            return this.userState.hasAuth.filter(item => item.type === "2");
        }
    },
    data() {
        return {
            planSize: [10],
            userMessage: {},
            oclick: "click",
            chatTypeBox: {
                startDoctorName: "",
                startDoctorTYpe: "随访",
                archivesUrl: "/",
                bingUserId:''
            },
            // seeRemarksListVisable1: false,
            // seeRemarksListVisable2: false,
            // seeRemarksListVisable3: false,
            addFollowData: {},
            followPlanVisible: false,
            planTableVisable: false,
            warnTableVisable: false,
            followTableVisable: false,
            huizTableVisable: false,
            xiezTableVisable: false,
            planVisible: false,
            warnVisible: false,
            defaultProps: {
                children: "children",
                label: "name"
            },
            invitationData: [],
            invitationDataXiez: [],
            showHeadViable: false,
            planData: [],
            followData: [],
            warnData: [],
            consultationData: [],
            cooperationData: [],
            sessionId: "",
            chatVisible: false,
            doctorVis: 1,
            remarks: [],
            remarksVisible: false,
            invitationVisibleHui: false,
            invitationVisible: false,
            puBlicFileData: {
                //新增 普通档案  弹窗数据
                // id:'1231321',
                show: false, //是否显示
                nameSelectId: "", //选择名字
                nameList: [], //名字列表
                sexList: [
                    //性别
                    { label: "女", value: 0 },
                    { label: "男", value: 1 }
                ],
                sexSelectId: 0,
                age: "", //年龄
                addr: "", //地址
                org: "", //机构
                diagnosis: "", //诊断
                deal: "" //处理意见
            },
            puBlicManData: {
                //新增 孕妇档案  弹窗数据
                show: false,
                nameSelectId: "", //选择名字
                nameList: [], //名字列表
                husband: "", //丈夫
                phone: "", //电话
                addr: "", //地址
                LastMenstrualPeriod: null //末次月经
            },
            invitationSelectList: [],
            invitationSelectListXiez: [],
            consultationId: "",
            xiezuoId: "",
            morePlanList: [],
            moreWarnList: [],
            planTotal: 0,
            warnTotal: 0,
            warnNum: 0,
            planNum: 0,
            defaultImg:
                'this.src="' + require("../../../assets/img/a-6.png") + '"',
            defaultImgDoc:
                'this.src="' + require("../../../assets/img/doctorImg.png") + '"'
        };
    },

    methods: {
        // 分页
        currentChangePlan(data) {
            this.planNum = data;
            this.getMorePlanList();
        },
        currentChangeWarn(data) {
            this.warnNum = data;
            this.getMoreWarnList();
        },
        //计划列表
        async getPlanList(index) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const res = await todayPlan(query);
            if (res.data && res.data.errCode === 0) {
                _this.planData = res.data.body;
                if (res.data.body.length > 0) {
                    _this.planTableVisable = true;
                } else {
                    _this.planTableVisable = false;
                }
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //更多计划列表
        async getMorePlanList(index) {
            let _this = this;
            let query = {
                token: this.userState.token,
                search: "",
                startTime: "",
                endTime: "",
                pageNum: this.planNum,
                pageSize: 10
            };
            const res = await planHistory(query);
            if (res.data && res.data.errCode === 0) {
                _this.planTotal = res.data.body.total;
                _this.morePlanList = res.data.body.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //告警列表
        async getWarnList() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const res = await todayAlert(query);
            if (res.data && res.data.errCode === 0) {
                this.warnData = res.data.body;
                if (res.data.body.length > 0) {
                    _this.warnTableVisable = true;
                } else {
                    _this.warnTableVisable = false;
                }
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        async getMoreWarnList() {
            let _this = this;
            let query = {
                token: this.userState.token,
                search: "",
                startTime: "",
                endTime: "",
                pageNum: this.warnNum,
                pageSize: 10
            };
            const res = await alertHistory(query);
            if (res.data && res.data.errCode === 0) {
                _this.warnTotal = res.data.body.total;
                _this.moreWarnList = res.data.body.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 随访列表
        async getFollowList(index) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const res = await todayFollowup(query);
            if (res.data && res.data.errCode === 0) {
                _this.followData = res.data.body;
                if (res.data.body.length > 0) {
                    _this.followTableVisable = true;
                } else {
                    _this.followTableVisable = false;
                }
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 会诊列表
        async getConsultationList(index) {
            let _this = this;
            let query = {
                token: this.userState.token,
                dateType: "ALL",
                startDate: "",
                endDate: "",
                pageNum: 1,
                pageSize: 2
            };
            const res = await queryByDoctorPage(query);
            if (res.data && res.data.errCode === 0) {
                _this.consultationData = res.data.body.data2.list;
                if (res.data.body.data2.list.length > 0) {
                    _this.huizTableVisable = true;
                } else {
                    _this.huizTableVisable = false;
                }
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 协作列表
        async getCooperationList(index) {
            let _this = this;
            let query = {
                token: this.userState.token,
                pageNum: 1,
                pageSize: 2,
                query: "",
                applyDeptId: "",
                synergyDeptId: "",
                status: "",
                startTime: "",
                endTime: ""
            };
            const res = await synergyPage(query);
            if (res.data && res.data.errCode === 0) {
                _this.cooperationData = res.data.body.data2.list;
                if (res.data.body.data2.list.length > 0) {
                    _this.xiezTableVisable = true;
                } else {
                    _this.xiezTableVisable = false;
                }
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //发送消息
        sendMessage(row) {

            this.doctorVis = 1;
            this.userMessage = {
                userId: row.userId
            };
            this.chatTypeBox.startDoctorTYpe = "随访";
            this.chatTypeBox.bingUserId=row.userId
            this.createChat(row);
        },
        //查看档案
        sendArchives(row) {
            this.$router.push({
                path: "/docDetailed",
                query: {
                    id: row.userId
                }
            });
        },
        //查看随访计划详情
        async seeFollowPlan(row) {
            let _this = this;
            let query = {
                token: this.userState.token,
                planId: row.followupPlanId
            };
            const res = await getFollowUpPlan(query);
            if (res.data && res.data.errCode === 0) {
                _this.addFollowData = res.data.body;
                _this.followPlanVisible = true;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //看备注remarks
        async seeRemarks(row, num) {
            // if (num == 1) {
            //     if (this.seeRemarksListVisable1) {
            //         this.seeRemarksListVisable1 = false;
            //     } else {
            //         this.seeRemarksListVisable1 = true;
            //     }
            // } else if (num == 2) {
            //     if (this.seeRemarksListVisable2) {
            //         this.seeRemarksListVisable2 = false;
            //     } else {
            //         this.seeRemarksListVisable2 = true;
            //     }
            // } else if (num == 3) {
            //     if (this.seeRemarksListVisable3) {
            //         this.seeRemarksListVisable3 = false;
            //     } else {
            //         this.seeRemarksListVisable3 = true;
            //     }
            // }
            console.log(row);
            let _this = this;
            let query = {
                token: this.userState.token,
                userId: row.userId
            };
            const res = await seeRemark(query);
            if (res.data && res.data.errCode === 0) {
                this.remarks = res.data.body;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //新增普通档案
        addPublicDangan(row) {
            this.puBlicFileData.show = true;
            console.log(this.puBlicFileData);
            this.getFamily(row);
        },
        //新增孕妇档案
        addWomanDangan(row) {
            this.puBlicManData.show = true;
            this.getFamily(row);
        },
        //处理完成
        async solveOver(row, num) {
            if (num == 0) {
                let _this = this;
                let query = {
                    token: this.userState.token
                };
                let options = {
                    id: row.infoId
                };
                const res = await signStatus(query, options);
                if (res.data && res.data.errCode === 0) {
                    this.$notify.success({
                        title: "成功",
                        message: "处理成功"
                    });
                    this.getPlanList();
                } else {
                    //失败
                    this.$notify.error({
                        title: "警告",
                        message: res.data.errMsg
                    });
                }
            } else if (num == 1) {
                let _this = this;
                let query = {
                    token: this.userState.token
                };
                let options = {
                    id: row.infoId
                };
                const res = await warnStatus(query, options);
                if (res.data && res.data.errCode === 0) {
                    this.$notify.success({
                        title: "成功",
                        message: "处理成功"
                    });
                    this.getWarnList();
                } else {
                    //失败
                    this.$notify.error({
                        title: "警告",
                        message: res.data.errMsg
                    });
                }
            } else if (num == 2) {
                let _this = this;
                let query = {
                    token: this.userState.token
                };
                let options = {
                    id: row.infoId
                };
                const res = await changeStatus(query, options);
                if (res.data && res.data.errCode === 0) {
                    this.$notify.success({
                        title: "成功",
                        message: "处理成功"
                    });
                    this.getFollowList();
                } else {
                    //失败
                    this.$notify.error({
                        title: "警告",
                        message: res.data.errMsg
                    });
                }
            }
        },
        //进入会诊
        enterHuiz(row, type) {
            if (type == "会诊") {
                this.chatTypeBox.startDoctorName = row.doctor;
            } else if (type == "协作") {
                this.chatTypeBox.startDoctorName = row.applyUserName;
            }

            this.chatVisible = true;
            this.sessionId = row.sessionId;
            this.doctorVis = 0;
            this.chatTypeBox.startDoctorTYpe = type;
            if (row.state == "NEW") {
                row.state = "UNDERWAY";
                this.overclick(row, "on");
            }
        },
        //邀请
        invitedUser(row) {
            this.Invitation(row);
        },
        //进入协作
        enterXiez() {},
        //协作邀请
        invitedUserXie() {},
        //查看更多
        seeMore(num) {
            if (num == 1) {
                this.planVisible = true;
                this.planNum = 1;
                this.getMorePlanList();
            } else if (num == 2) {
                this.warnVisible = true;
                this.warnNum = 1;
                this.getMoreWarnList();
            } else if (num == 3) {
                sessionStorage.setItem(
                    "page",
                    JSON.stringify({
                        //存缓存
                        name: "智能随访系统",
                        select: false,
                        path: "/followUp",
                        code: "40000"
                    })
                );
                this.$router.push({
                    path: "/followUp"
                });
            } else if (num == 4) {
                sessionStorage.setItem(
                    "page",
                    JSON.stringify({
                        //存缓存
                        name: "远程会诊系统",
                        select: false,
                        path: "/consultation",
                        code: "20000"
                    })
                );
                this.$router.push({
                    path: "/consultation"
                });
            } else if (num == 5) {
                sessionStorage.setItem(
                    "page",
                    JSON.stringify({
                        //存缓存
                        name: "远程会诊系统",
                        select: false,
                        path: "/cooperation",
                        code: "30000"
                    })
                );
                this.$router.push({
                    path: "/cooperation"
                });
            }
        },

        //点击按钮需要掉的接口
        // 发消息

        //创建会话
        async createChat(row) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                to: row.userId
            };
            const res = await fetchChatSession(query, options);
            if (res.data && res.data.errCode === 0) {
                this.sessionId = res.data.body;
                this.chatVisible = true;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //获取家庭成员
        async getFamily(row) {
            this.puBlicFileData.nameList = [];
            this.puBlicManData.nameList = [];
            let _this = this;
            let query = {
                token: this.userState.token,
                userId: row.userId
            };
            const res = await queryListByUserId(query);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                $.each(res.data.body, function(index, text) {
                    console.log(_this.puBlicFileData);
                    _this.puBlicFileData.nameList.push({
                        name: text.name,
                        id: text.id
                    });
                    _this.puBlicManData.nameList.push({
                        name: text.name,
                        id: text.id
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
        // 录入档案
        async addPublicMan(data) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                memberId: data.nameSelectId,
                memberName: data.nameList.find(value => {
                    return value.id === data.nameSelectId;
                }).name,
                husband: data.husband,
                phone: data.phone,
                home: data.addr,
                ultimate: data.LastMenstrualPeriod
            };
            const res = await addWomanMessage(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "录入成功"
                });
                setTimeout(function() {
                    _this.puBlicManData = {
                        //新增 孕妇档案  弹窗数据
                        show: false,
                        nameSelectId: "", //选择名字
                        nameList: [], //名字列表
                        husband: "", //丈夫
                        phone: "", //电话
                        addr: "", //地址
                        LastMenstrualPeriod: null //末次月经
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
        async addPublicFile(data) {
            console.log(data);
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                memberId: data.nameSelectId,
                sex: data.sexSelectId,
                age: data.age,
                address: data.addr,
                diagnosis: data.diagnosis,
                opinion: data.deal
            };
            const res = await addOrdinaryArchives(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "录入成功"
                });
                setTimeout(function() {
                    _this.puBlicFileData = {
                        //新增 普通档案  弹窗数据
                        // id:'1231321',
                        show: false, //是否显示
                        nameSelectId: "", //选择名字
                        nameList: [], //名字列表
                        sexList: [
                            //性别
                            { label: "女", value: 0 },
                            { label: "男", value: 1 }
                        ],
                        sexSelectId: 0,
                        age: "", //年龄
                        addr: "", //地址
                        org: "", //机构
                        diagnosis: "", //诊断
                        deal: "" //处理意见
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
        //会诊
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
        //获取邀请列表
        async Invitation(row) {
            this.consultationId = row.id;
            this.invitationData = [];
            this.invitationVisibleHui = true;
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
        handleCheckChange(data, odata) {
            this.invitationSelectList = [];
            let _this = this;

            $.each(odata.checkedNodes, function(index, text) {
                if (text.type == 2) {
                    if (text.id) {
                        _this.invitationSelectList.push(text.id);
                    }
                }
            });
            console.log(this.invitationSelectList);
            console.log(odata);
        },
        handleCheckChangeXiez(data, checked, indeterminate) {
            console.log(checked);
            let _this = this;
            $.each(checked.checkedNodes, function(index, text) {
                if (text.type == 3) {
                    console.log(_this.requestXiezuo);
                    _this.invitationSelectListXiez.push(text.id);
                }
            });
        },
        //会诊确认邀请
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
                    setTimeout(function() {
                        _this.invitationVisibleHui = false;
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

        //协作
        //获取邀请列表
        async invitedUserXie(row) {
            this.xiezuoId = row.id;
            this.invitationData = [];
            this.invitationVisible = true;
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const res = await enableSynergyDoctor(query);
            if (res.data && res.data.errCode === 0) {
                _this.invitationDataXiez = res.data.body;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //会诊确认邀请
        async sureInvitationXiez() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                id: this.xiezuoId,
                intention: "",
                recordId: "",
                receiverId: this.invitationSelectListXiez
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
        }
    },
    async created() {
        if (this.authMap.find(item => item.authorityId === "40000")) {
            this.getPlanList();
            this.getWarnList();
            this.getFollowList();
        }
        if (this.authMap.find(item => item.authorityId === "20000")) {
            this.getConsultationList();
        }
        if (this.authMap.find(item => item.authorityId === "30000")) {
            this.getCooperationList();
        }
    }
};
</script>

<style >
.indexClassBox {
    margin-bottom: 40px;
    padding: 0 10px;
    background: #ffffff;
    border: 1px solid #ebf0f4;
    border-radius: 3px;
}
.indexClassBox .el-table--border {
    border-left: none;
}
.indexClassBox > div:first-child {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
}
.indexClassBox > div:first-child > h4 {
    font-family: PingFangSC-Regular;
    font-size: 22px;
    color: #323c47;
    letter-spacing: 0;
    line-height: 78px;
}
.indexClassBox > div:first-child > div {
    margin-top: 22px;
    width: 113px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    background: #ffffff;
    border: 1px solid #e4e8eb;
    border-radius: 5px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4285f4;
    cursor: pointer;
}
.indexClassTable .el-table--border td,
.indexClassTable .el-table--border th {
    border-right: none;
}

.solveOver {
    width: 57px;
    height: 20px;
    background: rgba(244, 120, 66, 0.1);
    border: 1px solid rgba(244, 123, 66, 0.6);
    border-radius: 3px;
    text-align: center;
    line-height: 1px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #f54813;
}
.indexClassBox .btnClass {
    width: 57px;
    height: 20px;
    background: rgba(66, 133, 244, 0.1);
    border: 1px solid rgba(66, 133, 244, 0.6);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #4285f4;
    line-height: 1px;
}
.indexClassBox .btnClass:hover {
    border: 1px solid rgba(66, 133, 244, 0.6);
    background: rgba(66, 133, 244, 0.1);
    color: #4285f4;
}
.indexClassBox .btnClass:focus {
    border: 1px solid rgba(66, 133, 244, 0.6);
    background: rgba(66, 133, 244, 0.1);
    color: #4285f4;
}
.entryFile {
    position: relative;
    display: inline-block;
}
.entryFile:hover ul {
    display: block;
}
.entryFile > ul {
    position: absolute;
    left: 0;
    top: 20px;
    display: none;
    cursor: pointer;
}
.indexClassBox .el-table .cell,
.indexClassBox .el-table th div {
    overflow: inherit;
}
.redWord {
    color: #f54813;
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
.enterHuizClass {
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
.invitedClass {
    width: 57px;
    height: 20px;
    background: rgba(254, 77, 151, 0.1);
    border: 1px solid rgba(254, 77, 151, 0.6);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #fe4d97;
    line-height: 1px;
}
.noStart {
    color: #ffab2b;
}
.startIng {
    color: #fe4d97;
}
.planWarnClass {
    font-size: 14px;
}
.planWarnClass h4 {
    font-family: PingFangSC-Semibold;
    font-size: 12px;
    color: #323c47;
    letter-spacing: 0.5px;
    line-height: 23px;
}
.planWarnPhone {
    font-family: Lato-Regular;
    font-size: 14px;
    color: #939eab;
    letter-spacing: 0;
    line-height: 27px;
}
.statusClass {
    font-family: Lato-Regular;
    font-size: 14px;
    color: #939eab;
    letter-spacing: 0;
    line-height: 27px;
}
.indexHeadImgClass {
    width: 42px;
    height: 42px;
    border-radius: 50%;
}
.indexHeadImgClass > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.indexClassTable .el-table__body-wrapper {
    overflow: auto;
}
.remarkListClass {
    position: relative;
    display: inline-block;
}
.remarkListClass > ul {
    position: absolute;
    left: 0;
    display: none;
    cursor: pointer;
    width: 130px;
    background: white;
    top: 20px;
}
.remarkListClass > ul > li {
    margin-bottom: 5px;
}
.remarkListClass:hover ul {
    display: block;
}
</style>