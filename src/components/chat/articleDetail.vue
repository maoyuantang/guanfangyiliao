<template>

    <div>
        <el-form ref="form" :model="addArticleData" label-width="80px">
            <!-- {{addArticleData}} -->
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
                <!-- <el-input class="addFollowTitle" v-model="addFollowData.title" placeholder="请输入随访标题"></el-input> -->
            </div>
            <div class="addFollowMain">
                <div>
                    <el-checkbox v-model="addArticleData.visible">所有人可见</el-checkbox>
                    <el-checkbox v-model="addArticleData.openComment">开放讨论</el-checkbox>
                </div>
                <el-button @click="addArticleTable()" type="primary">保存</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import apiBaseURL from "../../enums/apiBaseURL.js";
import { mapState } from "vuex";
import { getArticleDetails,queryTypeList } from "../../api/apiAll.js";
import { quillEditor } from "vue-quill-editor";

export default {
    components: {},
    data() {
        return {
            addArticleData:{},
            oTab14: { list: [] },
             infoForm: {
                a_title: "",
                a_source: "",
                a_content: "",
                editorOption: {}
            },
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    methods: {
        async getArticleDetail() {
            this.followVisible = true;
             let query = {
                token: this.userState.token,
                articleId: this.articleClickId
            };
            const res = await getArticleDetails(query);
            if (res.data && res.data.errCode === 0) {
                _this.addArticleData=res.data.body
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
        // 上传图片
        articleImgSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.addArticleData.pictureId = res.body;
            console.log(this.addArticleData.pictureId);
        },
    },
    created() {
        this.getArticleDetail();
        this.screenPublic(this.oTab14, queryTypeList, "文章类型"); //随访类型
    },
    props: {
        articleClickId: String
    },
    model: {
        prop: ["articleClickId"],
        event: "reBack"
    }
};
</script>
<style>
.addFollowTitle > input {
    width: 338px;
    height: 27px;
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
.addArticleEditor {
    margin-bottom: 10px;
}
</style>


