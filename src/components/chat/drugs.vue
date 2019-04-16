<template>
    <div>
        <div class="drugs_box">
            <div class="drugs_box_lf">
                <div>
                    <div class="drugs_box_lf_headImg">
                        <!-- <img :src="userSocketInfo.imgUrl+familyMessage.userId" /> -->
                        <img class='headImgClass' :src="userSocketInfo.headImg+familyMessage.userId" :onerror="defaultImg" />
                    </div>
                    <div class="drugsMessage">
                        <h4>{{familyMessage.name}}</h4>
                        <div>
                            性别: {{familyMessage.sex}}<br /> 年龄: {{familyMessage.age}}<br /> 出生日期: {{familyMessage.birthday}} <br />联系方式: {{familyMessage.phone}} <br />常用地址: {{familyMessage.address}}<br />

                        </div>
                    </div>
                </div>
                <div class="drugsMzNum">
                    门诊号: 23568459 <br />费别: 自费<br /> 医保类型: 职工医保
                </div>
            </div>
            <div class="drugs_box_rg">
                <div>
                    <el-form ref="form" :model="chufangData" label-width="80px">
                        <el-form-item label="主    诉: ">
                            <el-input v-model="chufangData.complained"></el-input>
                        </el-form-item>
                        <el-form-item label="现 病 史: ">
                            <el-input type="textarea" v-model="chufangData.medicalHistory"></el-input>
                        </el-form-item>
                        <el-form-item label="过 敏 史: ">
                            <el-input v-model="chufangData.allergyHistory"></el-input>
                        </el-form-item>
                        <el-form-item label="门诊诊断: ">
                            <el-input v-model="chufangData.diagnosis"></el-input>
                        </el-form-item>
                        <div class="drugsCheckBox">
                            <el-form-item>
                                <el-checkbox-group v-model="chufangData.report">
                                    <el-checkbox label="疫情报告" name="type"></el-checkbox>
                                </el-checkbox-group>
                                <el-checkbox-group v-model="chufangData.review">
                                    <el-checkbox label="复诊" name="type"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="发病日期: ">
                                <el-date-picker type="date" placeholder="选择日期" v-model="chufangData.occurTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            <el-form-item class="nextTimeClass" label="下次复查日期: ">
                                <el-date-picker type="date" placeholder="选择日期" v-model="chufangData.reviewTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </div>

                    </el-form>

                </div>
                <div>
                    <div class='drugsSearchClass'>
                        <search @searchValue="searchChange" @inputChange="inputChange"></search>
                        <ul>
                            <li @click="sureYao(text1)" v-for="(text1,index) in searchList" :key="index">{{text1.drugName}}</li>
                        </ul>
                    </div>

                    <div class="public-list drugTable">
                        <el-table :data="chufangData.drugDetails" border style="width: 100%">
                            <el-table-column prop="date" label="序号" width="">
                                <template slot-scope="scope">
                                    <!-- {{scope.row}} -->
                                </template>
                            </el-table-column>
                            <el-table-column prop="drugName" label="药品名称" width=" ">
                            </el-table-column>
                            <el-table-column prop="drugUse" label="用法" width=" ">
                            </el-table-column>
                            <el-table-column prop="drugTimes" label="频率" width=" ">
                                <template slot-scope="scope">
                                    <input class="drugsListInput" v-model="scope.row.drugTimes" type="text" @change="countAll()" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="drugDosage" label="用量" width=" ">
                                <template slot-scope="scope">
                                    <input class="drugsListInput" v-model="scope.row.drugDosage" type="text" @change="countAll()" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="drugPrice" label="单价" width=" ">
                            </el-table-column>
                            <el-table-column prop="drugQuantity" label="数量" width=" ">
                                <template slot-scope="scope">
                                    <input class="drugsListInput" v-model="scope.row.drugQuantity" type="number" @input="countAll()" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="drugPriceAll" label="合计" width=" ">
                                <template slot-scope="scope">
                                    <input class="drugsListInput" disabled v-model="scope.row.drugQuantity * scope.row.drugPrice" type="text" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="doctorAsk" label="医生嘱托" width=" ">
                                <template slot-scope="scope">
                                    <input class="drugsListInput" v-model="scope.row.doctorAsk" type="text" />
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width=" ">
                                <template slot-scope="scope">
                                    <el-button @click="deleteDrugs(scope.row)" type="text" size="small">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div>
                        <div class="allPrice">
                            总金额： {{countAllPrice}}
                        </div>
                        <div class="drugsBtnClass">
                            <!-- <el-button type="primary" @click="dialogTableVisibleFun()">预览</el-button> -->
                            <el-button type="primary" @click="submitAudit()">提交审核</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 预览弹窗 -->
        <div v-if="dialogTableVisible">
            <el-dialog title="预览" :visible.sync="dialogTableVisible" center>
                <img style="width:100%" :src='"https://demo.chuntaoyisheng.com:10002/m/v1/api/prescription/prescription/prescriptionDetailById?token="+userInfo.token+"&prescriptionId="+srcs'>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import search from "../../public/publicComponents/search.vue";
import apiBaseURL from "../../enums/apiBaseURL.js";
import { mapState } from "vuex";
import {
    getDoctorMessage1,
    drugsByCondition,
    addPrescription
} from "../../api/apiAll.js";
export default {
    components: {
        search
    },
    data() {
        return {
            defaultImg:
                'this.src="' +
                require("../../assets/img/publicHeadImg.png") +
                '"',
            imgUrl:
                "https://demo.chuntaoyisheng.com:10002/m/v1/api/hdfs/fs/download/",
            form: {
                name: ""
            },
            dialogTableVisible: false,
            familyMessage: {
                name: "",
                age: "",
                sex: "",
                birthday: "",
                phone: "",
                address: ""
            },
            drugsData: [],
            chufangData: {
                id: "", //空
                clinicId: "",
                departmentId: "",
                userId: "",
                firstDoctorId: "",
                secondDoctorId: "", //空
                reviewEnum: null, //空
                orgCode: "",
                complained: "",
                medicalHistory: "",
                allergyHistory: "",
                diagnosis: "",
                report: true,
                review: false,
                occurTime: "",
                reviewTime: "",
                remark: "",
                rxRelOrderId: "",
                drugDetails: [
                    // {
                    //     id: "H33020485", //药品id
                    //     drugPrice: 30.0, //药品价格
                    //     drugQuantity: 2, //药品数量
                    //     subtotal: 60.0, //药品🐤小计
                    //     doctorAsk: "一定要按时按量吃药" //医生嘱托
                    // }
                ]
            },
            searchList: [],
            countAllPrice: 0,
            searchData: ""
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo,
            userSocketInfo: state => state.socket
        })
    },
    methods: {
        inputChange(data) {
            this.searchData = data;
            this.getDrugsByCondition(0);
        },
        sureYao(data) {
            let _this = this;
            if (_this.chufangData.drugDetails.length > 0) {
                $.each(_this.chufangData.drugDetails, function(index, text) {
                    if (data.id == text.id) {
                        text.drugQuantity += 1;
                    } else {
                        _this.chufangData.drugDetails.push(data);
                    }
                });
            } else {
                _this.chufangData.drugDetails.push(data);
            }

            this.countAll();
        },
        //获取处方信息
        async getDrugsMessage() {
            let _this = this;
            let query = {
                token: this.userState.token,
                familyMemberId: this.sendToUserId
            };
            const res = await getDoctorMessage1(query);

            if (res.data && res.data.errCode === 0) {
                _this.familyMessage = {
                    name: res.data.body.name,
                    age: res.data.body.age,
                    sex: res.data.body.sex,
                    birthday: res.data.body.birthday,
                    phone: res.data.body.phone,
                    address: res.data.body.address,
                    userId: res.data.body.userId
                };
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //获取处方表格信息
        async getDrugsByCondition(num) {
            let _this = this;
            let query = {
                token: this.userState.token,
                drugName: this.searchData
            };
            const res = await drugsByCondition(query);
            if (res.data && res.data.errCode === 0) {
                _this.searchList = [];
                _this.searchList = res.data.body;
                // if (num == 0) {

                // } else if (num == 1) {
                //      _this.chufangData.drugDetails = [];
                //     _this.chufangData.drugDetails = res.data.body;
                // }
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 搜索
        searchChange(data) {
            this.searchData = data;
            this.getDrugsByCondition(0);
        },
        //提交审核
        async submitAudit() {
            $.each(this.chufangData.drugDetails, function(index, text) {
                text.drugPriceAll = text.drugPrice * text.drugQuantity;
            });
            let query = {
                token: this.userState.token
            };
            let options = this.chufangData;
            const res = await addPrescription(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "审核成功"
                });
                this.$emit("reback");
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //计算总价格
        countAll() {
            this.countAllPrice = 0;
            let _this = this;
            $.each(this.chufangData.drugDetails, function(index, text) {
                _this.countAllPrice += text.drugPrice * text.drugQuantity;
            });
        },
        setMessage() {
            console.log(this.userMessage);
            this.chufangData.firstDoctorId = this.userSelfInfo.userId;
            this.chufangData.clinicId = this.userMessage.clinicId;
            this.chufangData.departmentId = this.userMessage.departmentId;
            this.chufangData.userId = this.userMessage.userId;
            this.chufangData.orgCode = this.userMessage.orgCode;
            this.chufangData.rxRelOrderId = this.userMessage.clinicOrderId;
        },
        // 预览
        dialogTableVisibleFun(row) {
            console.log(row);
            this.dialogTableVisible = true;
            this.srcs = row;
            this.preLook();
        },
        //删除药品
        deleteDrugs(row) {
            console.log(row);
            let _this = this;
            $.each(this.chufangData.drugDetails, function(index, text) {
                if (row.id == text.id) {
                    _this.chufangData.drugDetails.splice(index, 1);
                }
                _this.countAll();
            });
        }
    },
    props: {
        sendToUserId: String,
        userMessage: Object
    },
    model: {
        prop: ["sendToUserId", "userMessage"],
        event: "reBack"
    },
    created() {
        this.getDrugsMessage();
        // this.getDrugsByCondition();
        this.setMessage();
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
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.drugs_box_lf_headImg > img {
    width: 100%;
    height: 100%;
}
.drugsMessage > h4 {
    margin-bottom: 10px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #212223;
    line-height: 20px;
}
.drugsMessage > div {
    line-height: 27px;
}
.drugsMzNum {
    padding-left: 45px;
    line-height: 27px;
}
.drugsCheckBox {
    display: flex;
    display: -webkit-flex;
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #212223;
    line-height: 20px;
}
.drugsCheckBox > div:first-child > div {
    display: flex;
    display: -webkit-flex;
}
.drugsCheckBox > div:first-child > div > div {
    margin: 0 5px;
}
.drugsCheckBox .el-checkbox__label,
.drugsCheckBox .el-form-item__label {
    color: #212223 !important;
}
.drugsListInput {
    width: 77px;
    height: 20px;
    font-size: 12px;
}
.nextTimeClass label {
    width: 104px !important;
}
.nextTimeClass .el-form-item__content {
    margin-left: 104px !important;
}
.drugTable .el-table--border th,
.drugTable .el-table--border td {
    border-right: none;
}
.drugsBtnClass {
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: flex-end;
    padding-top: 12px;
    height: 60px;
    background: #ffffff;
    border: 1px solid #e4e8eb;
}
.drugsBtnClass > button:first-child {
    width: 80px;
    height: 32px;
    border: 1px solid #4285f4;
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #4285f4;
    background: white;
    line-height: 0px;
}
.drugsBtnClass > button:last-child {
    width: 80px;
    height: 32px;
    border: 1px solid #4285f4;
    background: #4285f4;
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #ffffff;
    line-height: 0px;
}
.allPrice {
    text-align: right;
    line-height: 70px;
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #5e6875;
    letter-spacing: 0;
}
.drugsSearchClass {
    position: relative;
}
.drugsSearchClass > ul {
    position: relative;
    left: 9px;
    cursor: pointer;
}
</style>