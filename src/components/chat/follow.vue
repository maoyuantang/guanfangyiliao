<template>
    <div>
        <div class="addFollowBox">
            <el-form ref="form" :model="addFollowData" label-width="80px">

                <el-form-item>
                    <el-input class="addFollowTitle" disabled v-model="addFollowData.title" placeholder="请输入随访标题"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-radio-group v-model="addFollowData.type">
                        <el-radio label="INHOSPITAL" disabled>住院随访</el-radio>
                        <el-radio label="OUTPATIENT" disabled>门诊随访</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="addFollowMain">
                    <el-form-item class="addFollowM-bot" label="首次治疗">
                        <el-date-picker  v-model="addFollowData.firstTreatmentTime" class="oTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <ul>
                        <li v-for="(text,index) in addFollowData.itemModels" :key="index">
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
                                        <img src="../../assets/img/addFollowDelete2.png" />
                                    </span>
                                </li>
                            </ul>
                            <div class="addFollowBtn" v-show="addFollowBtnVis">
                                <div @click="addQuest(index)">
                                    <span class="questDelete"><img src="../../assets/img/addFollowJa2.png" /></span> 问诊表/健康知识
                                </div>
                                <div>
                                    <span @click="addFollowTimeList()">
                                        <span class="questDelete"><img src="../../assets/img/addFollowJa1.png" /> </span> 添加一项</span>
                                    <span @click="deleteFollowTimeList(index)">
                                        <span class="questDelete"> <img src="../../assets/img/addFollowDelete.png" /> </span>
                                        此项</span>
                                </div>
                            </div>

                        </li>
                    </ul>
                    <div class="addFollowM-bot">
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
                    <el-button @click="addFollowTable()" type="primary">发送</el-button>
                </div>

            </el-form>
        </div>
        <!-- 添加问诊或文章 -->
        <div v-if="questVisible">
            <el-dialog title="添加问诊或文章" :visible.sync="questVisible" center append-to-body>
                <addQuestOrAritle @reback="sureQuestArticle"></addQuestOrAritle>

            </el-dialog>
        </div>
    </div>
</template>

<script>
import apiBaseURL from "../../enums/apiBaseURL.js";
import { mapState } from "vuex";
import {
    getFamilyMemberInfo,
    getModelTitleList,
    createFollowUpPlan
} from "../../api/apiAll.js";
import { setTimeout } from "timers";
import addQuestOrAritle from "../followUpBox/addQuestOrAritle.vue";
export default {
    components: {
        addQuestOrAritle
    },
    data() {
        return {
            addFollowBtnVis: true,
            questVisible: false,
            questCheckList: "",
            articleCheckList: "",
            questList: "",
            articleList: ""
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    methods: {
        
        //添加问诊表
        async addQuest(index) {
            this.questOindex = index;
            this.questVisible = true;
            let _this = this;
            let query = {
                token: this.userState.token,
                pageNum: 1,
                pageSize: 10
            };
            const res = await getModelTitleList(query);
            if (res.data && res.data.errCode === 0) {
                _this.questList = res.data.body.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //删除当前项
        deleteFollowTimeList(index) {
            this.addFollowData.itemModels.splice(index, 1);
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
        //创建随访计划
        async addFollowTable() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            this.addFollowData.userId = this.sendToUserId;
            const options = this.addFollowData;
            const res = await createFollowUpPlan(query, options);
            if (res.data && res.data.errCode === 0) {
                let oMessage = {
                    url: res.data.body.planId,
                    title: this.addFollowData.title,
                    firstTreatmentTime: this.addFollowData.firstTreatmentTime,
                    content:'',
                    status:''
                };
                this.$emit("osendmessagechat", oMessage);
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
                        ].contentModels=[]
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
        }
    },
    props: {
        addFollowData: Object,
        sendToUserId: String
    },
    model: {
        prop: ["addFollowData", "sendToUserId"],
        event: "reBack"
    },
    created() {
    },
    beforeDestroy() {}
};
</script>

<style>
.addFollowBox .el-form-item__content {
    margin-left: 0 !important;
}
.addFollowBox .el-dialog__body {
    padding: 25px 50px;
}
.addQuestBox .el-dialog__header,
.addQuestBox .el-dialog__body {
    background: #eff5fb;
}
.addFollowMain input {
    height: 27px;
}
.addFollowMain li {
    margin-bottom: 10px;
}
.addFollowMain .oTime input {
    width: 158px;
    height: 27px;
}
.DistanceFirst {
    display: flex;
    display: -webkit-flex;
}
.DistanceFirst > div {
    width: 70px;
}
.questBox > li {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    padding-left: 40px;
}
.questTableName {
    color: red;
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
.addFollowBtn {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    height: 27px;
    background: white;
}
.addFollowHou {
    width: 100px;
}
</style>