<template>
    <div class="evaluateBox addQuestBox">
        <el-form ref="form" :model="addQuestData" label-width="80px">

            <el-form-item>
                <el-input class="addFollowTitle" v-model="addQuestData.title" placeholder="请输入问诊标题"></el-input>
            </el-form-item>
            <div class="addFollowMain">
                <ul class="addQuestUl">
                    <li v-for="(text,index) in addQuestData.bankModels" :key="index">
                        <span class="deleteQuestList" @click="deleteQuestList(index)">
                            <img src="../../assets/img/questDelete.png" />
                        </span>
                        <div v-show="text.questionType=='RADIO'">
                            <el-form-item :label="index+1">
                                <el-input class="" v-model="text.title" placeholder="请输入问诊标题"></el-input>
                            </el-form-item>
                            <el-radio-group class="redioSingle">
                                <el-radio v-for="(text1,index1) in text.solutionModels" :key="index1" :label="index1">
                                    <span>{{text1.tag}}</span>
                                    <el-input class="" v-model="text1.answerDescribe" placeholder="请输入问诊标题"></el-input>
                                </el-radio>
                            </el-radio-group>
                        </div>
                        <div v-show="text.questionType=='CHECKBOX'">
                            <el-form-item :label="index+1">
                                <el-input class="" v-model="text.title" placeholder="请输入问诊标题"></el-input>
                            </el-form-item>
                            <el-checkbox-group class="redioSingle">
                                <el-checkbox v-for="(text1,index1) in text.solutionModels" :key="index1" :label="index1">
                                    <span>{{text1.tag}}</span>
                                    <el-input class="" v-model="text1.answerDescribe" placeholder="请输入问诊标题"></el-input>
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div v-show="text.questionType=='TEXT'">
                            <el-form-item :label="index+1">
                                <el-input class="" v-model="text.title" placeholder="请输入问诊标题"></el-input>
                            </el-form-item>
                        </div>
                    </li>
                </ul>
                <el-button @click="addQuestTable()" type="primary">发送</el-button>
            </div>

        </el-form>
    </div>
</template>
<script>
import apiBaseURL from "../../enums/apiBaseURL.js";
import { mapState } from "vuex";
import {
    generateInquiryPlan
} from "../../api/apiAll.js";
export default {
    data() {
        return {
            addFollowBtnVis: true,
            questVisible: false
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    methods: {
        async addQuestTable() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = this.addFollowData;
            const res = await generateInquiryPlan(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "编辑成功"
                });
                let oMessage = {
                    id: res.data.body.planId,
                    title: this.addFollowData.title,
                    firstTreatmentTime: this.addFollowData.firstTreatmentTime
                };
                this.$emit("osendmessagechat", oMessage);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        }
    },
    props: {
        addQuestData: Object
    },
    model: {
        prop: ["addQuestData"],
        event: "reBack"
    },
    created() {
    }
};
</script>
<style>
.addQuestBox .el-form-item__label {
    width: 20px !important;
}
.addQuestBox .el-form-item__content {
    margin-left: 20px !important;
}
.addFollowTitle > input {
    width: 338px;
    height: 27px;
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
.redioSingle > label {
    display: block;
}
.redioSingle > label:first-child {
    margin-left: 30px;
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
.choiceItemBox > span {
    padding: 0 5px;
    cursor: pointer;
}
</style>
