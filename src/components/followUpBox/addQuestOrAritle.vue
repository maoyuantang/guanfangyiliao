<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="addQueatOrArticle" class="addQueatOrArticle">
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
    </div>
</template>

<script>
import apiBaseURL from "../../enums/apiBaseURL.js";
import { mapState } from "vuex";
import {getModelTitleList,queryArticleList } from "../../api/apiAll.js";
export default {
    components: {},
    data() {
        return {
             activeName: "first",
            questCheckList:[],
            articleCheckList:[],
            questList:[],
            articleList:[],
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
        //添加文章表
        async addAricle(index) {
            this.articleList=[]
            let _this = this;
            let query = {
                token: this.userState.token,
                search: "",
                department: "",
                pageNum: 1,
                pageSize: 111110
            };
            const res = await queryArticleList(query);
            if (res.data && res.data.errCode === 0) {
                $.each(res.data.body.data2.list, function(index, text) {
                    _this.articleList.push({
                        id: text.id,
                        title: text.title
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
        //确认添加问诊表和文章
        sureAddQuest() {
            
            let checkObject={
                questList:this.questList,
                articleList:this.articleList,
                questCheckList:this.questCheckList,
                articleCheckList:this.articleCheckList

            }
            console.log(checkObject)
            this.$emit("reback",checkObject);
        },
        addQueatOrArticle(){}
    },
      props: {
    },
     model: {
        prop: [],
        event: "reBack"
    },
    created() {
       this.addQuest();
            this.addAricle();
    },
    beforeDestroy() {}
};
</script>

<style>
.addQueatOrArticle .el-checkbox{
    display: block;
    margin-left: 30px;
}
</style>