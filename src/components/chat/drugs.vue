<template>
    <div>
        <div class="drugs_box">
            <div class="drugs_box_lf">
                <div>
                    <div class="drugs_box_lf_headImg">
                        <img src="../../assets/img/sendNew2.png" />
                    </div>
                    <div>
                        <h4>{{familyMessage.name}}</h4>
                        性别: {{familyMessage.sex}}<br /> 年龄: {{familyMessage.age}}<br /> 出生日期: {{familyMessage.birthday}} <br />联系方式: {{familyMessage.phone}} <br />常用地址: {{familyMessage.address}}<br />
                    </div>
                </div>
                <div>
                    门诊号: 23568459 <br />费别: 自费<br /> 医保类型: 职工医保
                </div>
            </div>
            <div class="drugs_box_rg">
                <div>
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="活动名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="活动形式">
                            <el-input type="textarea" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="活动名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="活动名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                                <el-checkbox label="地推活动" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>

                </div>
                <div>
                    <search></search>
                    <div>
                        <el-table :data="drugsData" border style="width: 100%">
                            <el-table-column fixed prop="date" label="序号" width="150">
                            </el-table-column>
                            <el-table-column prop="drugName" label="药品名称" width="120">
                            </el-table-column>
                            <el-table-column prop="drugUse" label="用法" width="120">
                            </el-table-column>
                            <el-table-column prop="drugTimes" label="频率" width="120">
                            </el-table-column>
                            <el-table-column prop="drugDosage" label="用量" width="300">
                            </el-table-column>
                            <el-table-column prop="drugPrice" label="单价" width="120">
                            </el-table-column>
                            <el-table-column prop="drugQuantity" label="数量" width="120">
                            </el-table-column>
                            <el-table-column prop="drugPriceAll" label="合计" width="120">
                            </el-table-column>
                            <el-table-column prop="ask" label="医生嘱托" width="120">
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                    <el-button type="text" size="small">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div>
                        <div>
                            总金额：199
                        </div>
                        <div>
                            <el-button type="primary">预览</el-button>
                            <el-button type="primary">提交审核</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import search from "../../public/publicComponents/search.vue";
import apiBaseURL from "../../enums/apiBaseURL.js";
import { mapState } from "vuex";
import { getFamilyMemberInfoByDoctor, drugsByCondition } from "../../api/apiAll.js";
export default {
    components: {
        search
    },
    data() {
        return {
            form: {
                name: ""
            },
            familyMessage: {
                name: "",
                age: "",
                sex: "",
                birthday: "",
                phone: "",
                address: ""
            },
            drugsData: []
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    methods: {
        //获取处方信息
        async getDrugsMessage() {
            let query = {
                token: this.userState.token,
                familyMemberId: this.sendToUserId
            };
            const res = await getFamilyMemberInfoByDoctor(query);
            if (res.data && res.data.errCode === 0) {
                this.familyMessage = {
                    name: res.data.body.name,
                    age: res.data.body.age,
                    sex: res.data.body.sex,
                    birthday: res.data.body.birthday,
                    phone: res.data.body.phone,
                    address: res.data.body.address
                };
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //获取处方信息
        async getDrugsByCondition() {
            let query = {
                token: this.userState.token,
                drugName: ""
            };
            const res = await drugsByCondition(query);
            if (res.data && res.data.errCode === 0) {
                // console.log()
                this.drugsData = res.data.body;
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
        sendToUserId: String
    },
    model: {
        prop: ["sendToUserId"],
        event: "reBack"
    },
    created() {
        this.getDrugsMessage();
        this.getDrugsByCondition();
        alert(this.sendToUserId)
    },
    beforeDestroy() {}
};
</script>

<style>
.drugs_box {
    display: flex;
    display: -webkit-flex;
    opacity: 0.8;
    font-family: PingFangSC-Light;
    font-size: 12px;
    color: #212223;
    line-height: 20px;
}
.drugs_box_lf {
    width: 30%;
    box-sizing: border-box;
    margin-right: 10px;
    padding: 18px;
    padding-top: 79px;
    background: #ffffff;
    border: 1px solid #e4e8eb;
    border-radius: 3px;
}
.drugs_box_lf > div:first-child {
    display: flex;
    display: -webkit-flex;
    padding-bottom: 79px;
    border-bottom: #e4e8eb;
}
.drugs_box_lf > div:first-child h4 {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #212223;
    line-height: 20px;
}
.drugs_box_rg {
    width: 70%;
}
.drugs_box_rg > div:first-child {
    padding-top: 30px;
    background: #ffffff;
    border: 1px solid #e4e8eb;
    border-radius: 3px;
}
.drugs_box_rg > div:first-child label {
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #4285f4;
}
.drugs_box_rg > div:first-child .el-input__inner {
    height: 32px !important;
}
.drugs_box_rg > div:nth-child(2) {
    padding-top: 15px;
}
.drugs_box_rg > div:nth-child(2) .search {
    margin-bottom: 15px;
}
.drugs_box_lf_headImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.drugs_box_lf_headImg > img {
    width: 100%;
    height: 100%;
}
</style>