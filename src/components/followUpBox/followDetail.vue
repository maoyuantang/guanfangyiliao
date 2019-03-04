<template>
<!-- 随访计划详情 -->
    <div>
        <div class="addFollowBox">
            <el-form ref="form" :model="addFollowData" label-width="80px">

                <el-form-item>
                    <el-input class="addFollowTitle"  v-model="addFollowData.title" placeholder="请输入随访标题"></el-input>
                </el-form-item>
                <div class="addFollowMain">
                    <ul>
                        <li v-for="(text,index) in addFollowData.planItemResults" :key="index">
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

                                    
                                </li>
                            </ul>

                        </li>
                    </ul>
                </div>

            </el-form>
        </div>
        <!-- 添加问诊或文章 -->
        <!-- <el-dialog title="添加问诊或文章" :visible.sync="questVisible" center append-to-body>
            <el-tabs v-model="activeName" @tab-click="addQueatOrArticle">
                <el-tab-pane label="问诊" name="first">
                    <el-checkbox-group v-model="questCheckList">
                        <el-checkbox v-for="(text,index) in questList" :key="index" :label="text.id">{{text.title}}</el-checkbox><br />
                    </el-checkbox-group>

                </el-tab-pane>
                <el-tab-pane label="文章" name="second">
                    <el-checkbox-group v-model="articleCheckList">
                        <el-checkbox v-for="(text,index) in articleList" :key="index" :label="text.id">{{text.title}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
            </el-tabs>
            <button @click="sureAddQuest()">确认</button>
        </el-dialog> -->
    </div>
</template>

<script>
import apiBaseURL from "../../enums/apiBaseURL.js";
import { mapState } from "vuex";
import { getModelTitleList,update } from "../../api/apiAll.js";
export default {
    components: {},
    data() {
        return {
            addFollowBtnVis: true,
            questVisible:false,
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
        //新增随访表
        async addFollowTable() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = this.addFollowData;
            const res = await update(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "编辑成功"
                });
                let oMessage={
                    id:this.addFollowData.id,
                    title:this.addFollowData.title,
                    firstTreatmentTime:this.addFollowData.firstTreatmentTime
                }
                this.$emit('osendmessagechat',oMessage)
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
            
        },
    },
      props: {
        addFollowData: Object
    },
     model: {
        prop: ["addFollowData"],
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
    padding: 25px 26px;
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