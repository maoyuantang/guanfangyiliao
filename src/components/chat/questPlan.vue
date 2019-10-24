<template>
    <div class="evaluateBox addQuestBox">
        <!-- <el-form ref="form" :model="addQuestData" label-width="80px">

            <el-form-item>
                <el-input class="addFollowTitle" v-model="addQuestData.title" placeholder="请输入问诊标题"></el-input>
            </el-form-item>
            <div class="addFollowMain">
                <ul class="addQuestUl">
                    <li v-for="(text,index) in addQuestData.solutionDtos" :key="index">
                        <div v-show="text.questionType=='RADIO'">
                            <el-form-item :label="index+1">
                                <el-input class="" v-model="text.title" placeholder="请输入问诊标题"></el-input>
                            </el-form-item>
                            <el-radio-group class="redioSingle">
                                <el-radio v-for="(text1,index1) in text.solutionAsDtos" :key="index1" :label="index1">
                                    <span>{{text1.tag}}</span>
                                    <el-input class="" v-model="text1.desc" placeholder="请输入问诊标题"></el-input>
                                </el-radio>
                            </el-radio-group>
                        </div>
                        <div v-show="text.questionType=='CHECKBOX'">
                            <el-form-item :label="index+1">
                                <el-input class="" v-model="text.title" placeholder="请输入问诊标题"></el-input>
                            </el-form-item>
                            <el-checkbox-group class="redioSingle">
                                <el-checkbox v-for="(text1,index1) in text.solutionAsDtos" :key="index1" :label="index1">
                                    <span>{{text1.tag}}</span>
                                    <el-input class="" v-model="text1.desc" placeholder="请输入问诊标题"></el-input>
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
            </div>

        </el-form> -->
        <el-form ref="form" :model="addQuestData" label-width="80px" style="height: 600px; overflow: auto;">
            <el-form-item style="margin-bottom:30px">
                <el-input class="addFollowTitle" v-model="addQuestData.title" placeholder="请输入问诊标题(40字内)" onfocus="this.placeholder=''" onblur="this.placeholder='请输入问诊标题(40字内)'"></el-input>
            </el-form-item>
            <div class="addFollowMain">
                <ul class="addQuestUl">
                    <li v-for="(text,index) in addQuestData.solutionDtos" :key="index">
                        <div v-show="text.questionType=='RADIO'">
                            <el-form-item :label="index+1+'.'">
                                <el-input class="" v-model="text.title" placeholder="请输入题目名称"></el-input>
                            </el-form-item>

                            <el-radio-group v-model="text.selectType1" class="redioSingle redioSingleInput">
                                <el-radio v-for="(text1,index1) in text.solutionAsDtos" :key="index1" :label="text1.desc">
                                    <span>{{text1.tag}}</span>
                                    <el-input class="" v-model="text1.desc" placeholder="请输入选项内容">
                                    </el-input>
                                </el-radio>
                            </el-radio-group>
                        </div>

                        <div v-show="text.questionType=='CHECKBOX'">
                            <el-form-item :label="index+1">
                                <el-input class="" v-model="text.title" placeholder="请输入题目名称"></el-input>
                            </el-form-item>
                            <el-checkbox-group v-model="text.selectType" class="redioSingle redioSingleInput">
                                <el-checkbox v-for="(text1,index1) in text.solutionAsDtos" :key="index1" :label="text1.desc">
                                    <span>{{text1.tag}}</span>
                                    <el-input class="" v-model="text1.desc" placeholder="请输入选项内容">
                                    </el-input>
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div v-show="text.questionType=='TEXT'">
                            <el-form-item :label="index+1">
                                <el-input class="" v-model="text.title"></el-input>

                            </el-form-item>
                            <el-form-item>
                                <el-input class="" v-model="text.text"></el-input>

                            </el-form-item>

                        </div>
                    </li>
                </ul>
            </div>

        </el-form>
    </div>
</template>
<script>
import apiBaseURL from "../../enums/apiBaseURL.js";
import { mapState } from "vuex";
import { queryInquiryPlan } from "../../api/apiAll.js";
export default {
    data() {
        return {
            addFollowBtnVis: true,
            questVisible: false,
            addQuestData: {}
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    methods: {
        //问诊详情
        async QuestDetail(oid) {
            let _this = this;
            let query = {
                token: this.userState.token,
                planId: this.addQuestId
            };
            const res = await queryInquiryPlan(query);
            if (res.data && res.data.errCode === 0) {
                this.addQuestData = res.data.body;
                $.each(this.addQuestData.solutionDtos, function(index, text) {
                    text.selectType=[]
                    if (text.questionType == "CHECKBOX") {
                        $.each(text.solutionAsDtos, function(index1, text1) {
                            if (text1.checked) {
                                text.selectType.push(text1.desc);
                            }
                        });
                    } else if (text.questionType == "RADIO") {
                        $.each(text.solutionAsDtos, function(index1, text1) {
                            if (text1.checked) {
                                text.selectType1 = text1.desc;
                            }
                        });
                    }
                });
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
        addQuestId: String
    },
    model: {
        prop: ["addQuestId"],
        event: "reBack"
    },
    created() {
        this.QuestDetail();
    }
};
</script>
<style>
/* .addQuestBox .el-form-item__label {
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
} */
</style>
