<template>
    <div>
        <!-- 返回 -->
        <div class="doc-detailed-button">
            <el-button type="text" icon="el-icon-arrow-left" @click="reBack" class="doc-detailed-back" v-if="!inData">
            </el-button>
        </div>
        <div class="danganTitle">
            <span :class="{'danganTitleAct':index==titleIndex}" v-for="(text,index) in titleList" :key="index" @click="danganTitleClick(index)">{{text}}</span>
        </div>
        <div>
            <!-- 电子病历 -->
            <div class="danganMain" v-if="titleIndex==0">
                <!-- 左边 -->
                <div class="danganLeft">
                    <div class="danganLeft-top">
                        <div>
                            <img src="../assets/img/bingNan.png" />
                        </div>

                        <div>
                            {{danganLeftMain.patientName}}
                        </div>
                        <!-- <div>
                            性别：<br /> 年龄：
                            <br /> 身份证：
                            <br />
                        </div> -->
                    </div>
                    <ul class="danganLeft-main">
                        <li :class="{'danganLeftAct':index==danganLeftIndex}" v-for="(text,index) in danganLeftMain.historys" :key="index" @click="danganLeftClick(text,index)">
                            入住医院:{{text.hospitalName}}<br /> 入院时间：{{text.visitDtime}}<br /> 入住科室：{{text.deptName}}
                            <br /> 床号：{{text.bedNo}}
                            <br />
                        </li>
                    </ul>
                </div>
                <div class="danganRg">
                    <ul>
                        <li :class="{'danganRgAct':index==danganRgIndex}" v-for="(text,index) in danganRgList" :key="index" @click="switchLi(text,index)">
                            {{text.name}}
                        </li>
                    </ul>
                    <div>
                        <div v-for="(text,index) in danganRgMainText" :key="index" class="danganRgMainTextClass">
                            <ul>
                                <li v-for="(text1,index1) in text.contents" :key="index1">
                                    <div>{{text1.title}}</div>
                                    <div>{{text1.content}}</div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <!-- 院内档案 -->
            <div v-else>
                <!-- 左边 -->
                <div class="danganLeft">
                    <div class="danganLeft-top">
                        <div>
                            <img src="../assets/img/bingNan.png" />
                        </div>

                        <div>
                            {{danganLeftMain.patientName}}
                        </div>
                        <!-- <div>
                            性别：<br /> 年龄：
                            <br /> 身份证：
                            <br />
                        </div> -->
                    </div>
                    <ul class="danganLeft-main">
                        <li :class="{'danganLeftAct':index==danganLeftIndex1}" v-for="(text,index) in danganLeftMain.visits" :key="index" @click="inHospitalClick(text,index)">
                            <div>
                                <span v-if="text.visitType==1">
                                    门诊记录
                                </span>
                                <span v-if="text.visitType==2">
                                    住院记录
                                </span>
                            </div>
                            <span v-if="text.visitType==2">入住医院:</span>
                            <span v-else>就诊医院:</span> {{text.hospitalName}}<br />
                            <span v-if="text.visitType==2">入住时间：</span>
                            <span v-else>就诊时间：</span>{{text.visitDtime}}<br />
                            <span v-if="text.visitType==2">入住科室：</span>
                            <span v-else>就诊科室：</span>{{text.deptName}}
                            <br /> 床号：{{text.bedNo}}
                            <br />
                        </li>
                    </ul>
                </div>
                <div class="danganRg">
                    <ul>
                        <li :class="{'danganRgAct':index==danganRgIndex1}" v-for="(text,index) in danganRgList1" :key="index" @click="inHospitalSwitch(text,index)">
                            {{text.name}}
                        </li>
                    </ul>
                    <div>
                        <!-- 处方 -->
                        <div class="recipeClass" v-show="danganRgValue=='recipe'">
                            <img v-for="(text,index) in orecipe" :key="index" :src="text.src" alt="">
                        </div>
                        <!-- 检验 -->
                        <div class="testBox" v-show="danganRgValue=='checkout'">
                            <ul class="testList">
                                <li v-for="(text,index) in inHospitalList1" :key="index">
                                    <div>
                                        <span>{{text.hospitalName}}</span>
                                        <span>{{text.labDtime}}</span>
                                    </div>
                                    <div>
                                        <span>on</span> {{text.labItemName}}</div>
                                    <table>
                                        <tr>
                                            <th>检查项目</th>
                                            <th>英文名称</th>
                                            <th>参考值/单位</th>
                                            <th>结果</th>
                                        </tr>
                                        <tr v-for="(text1,index1) in text.checkoutDetails" :key="index1">
                                            <td>{{text1.itemName}}</td>
                                            <td>{{text1.itemEnName}}</td>
                                            <td>{{text1.reference}}</td>
                                            <td>{{text1.labResult}}</td>
                                        </tr>
                                    </table>

                                </li>
                            </ul>
                        </div>
                        <!-- 影像 -->
                        <div class="testBox" v-show="danganRgValue=='screenage'">
                            <ul class="testList">
                                <li v-for="(text,index) in inHospitalList1" :key="index">
                                    <div>
                                        <span>{{ohospitalName}}</span>
                                    </div>
                                    <div>
                                        <span>on</span> 检查ID：{{text.studyId}}</div>
                                    <dl>
                                        <dt>影像所见</dt>
                                        <dd>
                                            {{text.examDesc}}
                                        </dd>
                                        <dt>诊断结论</dt>
                                        <dd>
                                            {{text.examResultDesc}}
                                        </dd>
                                    </dl>

                                </li>
                            </ul>
                        </div>
                        <!-- 医嘱 -->

                        <div class="testBox doctorAdvice" v-show="danganRgValue=='order'" style="min-width:844px;">
                            <table>
                                <tr>
                                    <th>医嘱名称</th>
                                    <th>规格</th>
                                    <th>途径</th>
                                    <th>时间</th>
                                    <th>频次</th>
                                    <th>剂量</th>
                                    <th>类别</th>
                                    <th>医嘱科室</th>
                                    <th>医嘱医生</th>
                                </tr>
                                <tr v-for="(text,index) in danganRgMainText1" :key="index">
                                    <td>{{text.name}}</td>
                                    <td>{{text.std}}</td>
                                    <td>{{text.usage}}</td>
                                    <td>
                                        开始时间：{{text.startDtime}}<br /> 结束时间：{{text.endDtime}}
                                    </td>
                                    <td>{{text.freq}}</td>
                                    <td>{{text.dose}}</td>
                                    <td>{{text.orderType}}</td>
                                    <td>{{text.deptName}}</td>
                                    <td>{{text.docName}}</td>
                                </tr>
                            </table>
                        </div>
                        <!-- 入院记录 -->
                        <div v-for="(text,index) in danganRgMainText1" :key="index" class="danganRgMainTextClass" v-show="danganRgValue=='hospitalized'">
                            <ul>
                                <li v-for="(text1,index1) in text.contents" :key="index1">
                                    <div>{{text1.title}}</div>
                                    <div>{{text1.content}}</div>
                                </li>
                            </ul>
                        </div>

                        <!-- 就诊记录 -->
                        <div v-for="(text,index) in danganRgMainText1" :key="index" class="danganRgMainTextClass" v-show="danganRgValue=='visitInfo'">
                            <ul>
                                <li v-for="(text1,index1) in text.contents" :key="index1">
                                    <div>{{text1.title}}</div>
                                    <div>{{text1.content}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    queryByMedicalHistoryInfo,
    chufanImg,
    patientMedicalDetail,
    recordByMedicalHistoryInfo
} from "../api/apiAll.js";
import { mapState } from "vuex";
export default {
    name: "consultationFiles",
    data() {
        return {
            titleList: ["电子病历", "院内档案"],
            danganRgList: [
                {
                    name: "首次入院记录"
                },
                {
                    name: "首次病程记录"
                },
                {
                    name: "日常病程记录"
                },
                {
                    name: "出院记录"
                },
                {
                    name: "体温表"
                }
            ],
            danganRgList1: [
                {
                    name: "入院记录",
                    value: "hospitalized"
                },
                {
                    name: "医嘱",
                    value: "order"
                },
                {
                    name: "检验",
                    value: "checkout"
                },
                {
                    name: "影像检查",
                    value: "screenage"
                }
            ],
            titleIndex: 0,
            danganRgIndex: 0,
            danganRgIndex1: 0,
            danganRgValue: "",
            danganRgMainList: [],
            danganLeftMain: {},
            danganLeftIndex: 0,
            danganLeftIndex1: 0,
            danganLeftIndex11: 1,
            danganRgMainText: [],
            danganRgMainText1: [],
            inHospitalList: {},
            inHospitalList1: [],
            ohospitalName: "",
            orecipe: []
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo,
            userSocketInfo: state => state.socket
        })
    },
    props: ["inData"],
    methods: {
        //根据会诊or协作or转诊id获取信息
        async getMessage(getFollowScreen) {
            let _this = this;
            let query = {
                token: this.userState.token,
                id: _this.$route.query.id,
                type: _this.$route.query.type
            };
            const res = await getFollowScreen(query);
            if (res.data && res.data.errCode === 0) {
                console.log(res.data);
                // res.data.body.historys.info
                // _this.danganLeftMainList= res.data.body.historys
                _this.danganLeftMain = res.data.body;
                if (_this.danganLeftMain.visits.length > 0) {
                    if (_this.danganLeftMain.visits[0].visitType == 1) {
                        _this.danganLeftIndex11 = 1;
                    } else if (_this.danganLeftMain.visits[0].visitType == 1) {
                        _this.danganLeftIndex11 = 2;
                    }
                }

                if (_this.danganLeftMain.historys.length > 0) {
                    if (_this.danganLeftMain) {
                        _this.danganRgMainText.push(
                            _this.danganLeftMain.historys[_this.danganLeftIndex]
                                .info.inRecord
                        );
                    }
                }
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //处方
        async getPrescription(oid) {
            let _this = this;
            let query = {
                token: this.userState.token,
                type: _this.$route.query.type,
                id: _this.$route.query.id,
                prescNo: oid
            };
            const res = await chufanImg(query);
            if (res.data && res.data.errCode === 0) {
                console.log(res.data);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        switchLi(text, index) {
            this.danganRgIndex = index;
            this.danganRgMainText = [];
            if (this.danganLeftMain.historys.length > 0) {
                if (index == 0) {
                    this.danganRgMainText.push(
                        this.danganLeftMain.historys[this.danganLeftIndex].info
                            .inRecord
                    );
                } else if (index == 1) {
                    this.danganRgMainText = this.danganLeftMain.historys[
                        this.danganLeftIndex
                    ].info.firstCourse;
                } else if (index == 2) {
                    this.danganRgMainText = this.danganLeftMain.historys[
                        this.danganLeftIndex
                    ].info.everydayCourse;
                } else if (index == 3) {
                    this.danganRgMainText = this.danganLeftMain.historys[
                        this.danganLeftIndex
                    ].info.leaveHospital;
                }
            }
        },
        danganLeftClick(text, index) {
            this.danganLeftIndex = index;
            this.danganRgIndex = 0;
            this.danganRgMainText = [];
            if (this.danganLeftMain.historys.length > 0) {
                this.danganRgMainText.push(
                    this.danganLeftMain.historys[this.danganLeftIndex].info
                        .inRecord
                );
            }
        },
        //院内左边切换
        inHospitalClick(text, index) {
            this.danganLeftIndex1 = index;
            this.danganRgIndex1 = 0;
            this.inHospitalList1 = [];
            this.danganRgMainText1 = "";

            this.ohospitalName = this.danganLeftMain.visits[
                this.danganLeftIndex1
            ].hospitalName;
            if (text.visitType == 1) {
                this.danganLeftIndex11 = 1;
                //门诊记录
                this.danganRgList1 = [
                    {
                        name: "就诊记录",
                        value: "recipe"
                    },
                    {
                        name: "处方",
                        value: "recipe"
                    },
                    {
                        name: "检验",
                        value: "checkout"
                    },
                    {
                        name: "影像检查",
                        value: "screenage"
                    }
                ];
                this.danganRgValue = "visitInfo";
                this.danganRgMainText1 = [];
            } else if (text.visitType == 2) {
                this.danganLeftIndex11 = 2;
                //住院记录
                this.danganRgList1 = [
                    {
                        name: "入院记录",
                        value: "hospitalized"
                    },
                    {
                        name: "医嘱",
                        value: "orde"
                    },
                    {
                        name: "检验",
                        value: "checkout"
                    },
                    {
                        name: "影像检查",
                        value: "screenage"
                    },
                    {
                        name: "手术麻醉",
                        value: "operation"
                    },
                    {
                        name: "护理记录",
                        value: "nurse"
                    }
                ];
                this.danganRgValue = "hospitalized";
                if (
                    this.danganLeftMain.visits.length > 0 &&
                    this.danganLeftMain.visits
                ) {
                    this.danganRgMainText1 = this.inHospitalList1 = this.danganLeftMain.visits[
                        this.danganLeftIndex1
                    ].info.hospitalized;
                }
            }
        },
        //院内右边切换
        inHospitalSwitch(text, index) {
            this.danganRgIndex1 = index;
            this.danganRgValue = text.value;
            if (this.danganLeftMain.visits.length > 0) {
                if (this.danganLeftIndex11 == 1) {
                    //门诊
                    if (index == 0) {
                        this.danganRgValue = "visitInfo";
                        this.danganRgMainText1 = [];
                    } else if (index == 1) {
                        //处方
                        this.orecipe = [];
                        let orecipe1 = this.danganLeftMain.visits[
                            this.danganLeftIndex1
                        ].info.recipe;
                        if (orecipe1) {
                            orecipe1.forEach((text, index) => {
                                //  this.getPrescription(text)
                                this.orecipe.push({
                                    src: `${
                                        this.userSocketInfo.imgUrl1
                                    }/m/v1/api/basics/record/recordInfo?token=${
                                        this.userState.token
                                    }&type=${this.$route.query.type}&id=${
                                        this.$route.query.id
                                    }&prescNo=${text}`
                                });
                            });
                        }
                    } else if (index == 2) {
                        //检验
                        this.inHospitalList1 = this.danganLeftMain.visits[
                            this.danganLeftIndex1
                        ].info.checkout;
                    } else if (index == 3) {
                        //影响
                        this.inHospitalList1 = this.danganLeftMain.visits[
                            this.danganLeftIndex1
                        ].info.screenage;
                    }
                } else if (this.danganLeftIndex11 == 2) {
                    //住院记录
                    console.log(index);
                    if (index == 0) {
                        //入院记录
                        this.danganRgMainText1 = this.inHospitalList1 = this.danganLeftMain.visits[
                            this.danganLeftIndex1
                        ].info.hospitalized;
                    } else if (index == 1) {
                        //医嘱
                        this.danganRgMainText1 = this.danganLeftMain.visits[
                            this.danganLeftIndex1
                        ].info.order;
                    } else if (index == 2) {
                        //检验
                        this.inHospitalList1 = this.danganLeftMain.visits[
                            this.danganLeftIndex1
                        ].info.checkout;
                    } else if (index == 3) {
                        this.inHospitalList1 = this.danganLeftMain.visits[
                            this.danganLeftIndex1
                        ].info.screenage;
                    }
                }
            }
        },
        reBack() {
            this.$router.go(-1);
        },
        danganTitleClick(index) {
            this.danganLeftIndex1 = 0;
            this.danganRgIndex1 = 0;
            this.danganLeftIndex = 0;
            this.danganRgIndex = 0;
            this.titleIndex = index;
            if (index == 1) {
                if (
                    this.danganLeftMain.visits[this.danganLeftIndex1]
                        .visitType == 2
                ) {
                    this.danganRgList1 = [
                        {
                            name: "入院记录",
                            value: "hospitalized"
                        },
                        {
                            name: "医嘱",
                            value: "orde"
                        },
                        {
                            name: "检验",
                            value: "checkout"
                        },
                        {
                            name: "影像检查",
                            value: "screenage"
                        },
                        {
                            name: "手术麻醉",
                            value: "operation"
                        },
                        {
                            name: "护理记录",
                            value: "nurse"
                        }
                    ];
                    this.danganRgValue = "hospitalized";
                    this.danganRgMainText1 = this.danganLeftMain.visits[
                        this.danganLeftIndex1
                    ].info.hospitalized;
                } else if (
                    this.danganLeftMain.visits[this.danganLeftIndex1]
                        .visitType == 1
                ) {
                    this.danganRgList1 = [
                        {
                            name: "就诊记录",
                            value: "recipe"
                        },
                        {
                            name: "处方",
                            value: "recipe"
                        },
                        {
                            name: "检验",
                            value: "checkout"
                        },
                        {
                            name: "影像检查",
                            value: "screenage"
                        }
                    ];
                    this.danganRgValue = "visitInfo";
                    this.danganRgMainText1 = [];
                    // this.danganRgValue = "recipe";
                    // this.orecipe = [];
                    // let orecipe1 = this.danganLeftMain.visits[
                    //     this.danganLeftIndex1
                    // ].info.recipe;
                    // orecipe1.forEach((text, index) => {
                    //     this.orecipe.push({
                    //         src: `${
                    //             this.userSocketInfo.imgUrl1
                    //         }/m/v1/api/basics/record/recordInfo?token=${
                    //             this.userState.token
                    //         }&type=${this.$route.query.type}&id=${
                    //             this.$route.query.id
                    //         }&prescNo==${text}`
                    //     });
                    // });
                }
            } else if (index == 0) {
                console.log(
                    this.danganLeftMain.historys[this.danganLeftIndex].info
                        .inRecord
                );
                this.danganRgMainText.push(
                    this.danganLeftMain.historys[this.danganLeftIndex].info
                        .inRecord
                );
            }
        }
    },
    created() {
        if (this.$route.query.type == "CONSULTATION") {
            // 会诊
            this.getMessage(queryByMedicalHistoryInfo);
        } else if (this.$route.query.type == "SYNERGY") {
            // 协作
            this.getMessage(recordByMedicalHistoryInfo);
        } else if (this.$route.query.type == "REFERRAL") {
            // 转诊
            this.getMessage(patientMedicalDetail);
        }
        // console.log(this.danganLeftMain.visits)
        // alert(this.danganLeftMain.visits.length)
    }
};
</script>
<style>
.danganTitle {
    text-align: center;
    margin-bottom: 42px;
}

.danganTitle > span {
    display: inline-block;
    width: 176px;
    height: 40px;
    line-height: 40px;

    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #0064d9;

    letter-spacing: 0.35px;
    text-align: center;
    cursor: pointer;
}
.danganTitleAct {
    background: #0064d9;
    color: #ffffff !important;
}
.danganLeft {
    float: left;
    padding: 0 5px;
    width: 340px;
    background: #ffffff;
    border: 1px solid #e5e7e9;
}
.danganLeft-top {
    padding-top: 19px;
    /* border-bottom: 1px solid #00D983; */
}
.danganLeft-top > div:first-child {
    margin: 0 auto;
    width: 98px;
    height: 98px;
    border-radius: 50%;
    margin-bottom: 12px;
}
.danganLeft-top > div:first-child img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.danganLeft-top > div:nth-child(2) {
    margin-bottom: 32px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #97a3b4;
    line-height: 22px;
    text-align: center;
}
.danganLeft-top > div:nth-child(3) {
    padding: 0 20px;
    margin-bottom: 30px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #97a3b4;
    line-height: 22px;
}
.danganLeft-main > li {
    margin: 0 -5px;
    padding: 6px 20px;
    margin-bottom: 30px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #97a3b4;
    line-height: 30px;
    cursor: pointer;
}
.danganLeft-main > li > div {
    font-family: PingFangSC-Semibold;
    font-size: 13px;
    color: #002257;
    line-height: 22px;
    font-weight: bold;
}
.danganLeft-main > li:nth-child(1) {
    border-top: 1px solid #00d983;
}
.danganLeft-main > li:nth-child(2) {
    border-top: 1px solid #ffdb00;
}
.danganLeft-main > li:nth-child(3) {
    border-top: 1px solid #0064ff;
}
.danganMain {
    /* display: flex */
}
.danganRg {
    /* width:100%; */
    margin-left: 370px;
    border: 1px solid #e5e7e9;
    overflow: auto;
    zoom: 1;
}
.danganRg > ul {
    float: left;
    width: 192px;
}
.danganRg > div {
    margin-left: 192px;
}
.danganRg > ul > li {
    width: 192px;
    height: 145px;
    text-align: center;
    line-height: 145px;
    font-family: PingFangSC-Semibold;
    font-size: 13px;
    color: #002257;
    font-weight: bold;
    border-bottom: 1px solid #e5e7e9;
    border-right: 1px solid #e5e7e9;
    cursor: pointer;
}
.danganRgAct {
    border-left: 2px solid #00a3ff;
}
.danganLeftAct {
    background: rgba(0, 163, 255, 0.1);
}
.testBox {
    padding: 0 56px;
    padding-top: 74px;
}
.testList > li {
    position: relative;
    width: 100%;
    margin-bottom: 28px;
}
.testList > li > div:nth-child(1) {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
}
.testList > li > div:nth-child(1) > span:nth-child(1) {
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #002257;
    line-height: 22px;
}
.testList > li > div:nth-child(1) > span:nth-child(2) {
    font-family: OpenSans;
    font-size: 13px;
    color: #97a3b4;
    text-align: right;
    line-height: 22px;
}
.testList > li > div:nth-child(2) {
    font-family: PingFangSC-Semibold;
    font-size: 13px;
    color: #0064ff;
    margin-bottom: 8px;
}
.testList > li > div:nth-child(2) > span {
    font-family: OpenSans;
    font-size: 13px;
    color: #97a3b4;
    line-height: 22px;
}
.testList > li > table {
    width: 100%;
    background: #f3f6fa;
    border-radius: 4px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #646464;
    text-align: left;
}
.testList > li > table th,
.testList > li > table td {
    padding: 5px 0;
}
.testList > li::after {
    content: "";
    display: inline-block;
    position: absolute;
    left: -21px;
    top: 7px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #0064ff;
}
.testList > li > dl > dt {
    margin-bottom: 15px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #030303;
    letter-spacing: -0.28px;
    text-align: left;
}
.testList > li > dl > dd {
    margin-bottom: 28px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #5d5d5d;
    letter-spacing: 0.08px;
}
.doctorAdvice table {
    width: 100%;
}
.doctorAdvice th {
    padding-left: 20px;
    height: 48px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.87);
    text-align: left;
    background: #e9c457;
}
.doctorAdvice td {
    padding: 5px 0;
    padding-left: 20px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #646464;
    text-align: left;
}
.recipeClass > img {
    width: 500px;
    height: 500px;
}
.danganRgMainTextClass {
    padding: 30px 30px;
    color: #646464;
}
.danganRgMainTextClass > ul > li {
    margin-bottom: 10px;
}
.danganRgMainTextClass > ul > li > div:nth-child(1) {
    color: #1474a9;
    font-family: PingFangSC-Light;
    font-size: 13px;
    letter-spacing: -0.13px;
    line-height: 33px;
}
.danganRgMainTextClass > ul > li > div:nth-child(2) {
    color: #282828;
    font-family: PingFangSC-Light;
    font-size: 13px;
    letter-spacing: -0.13px;
    line-height: 33px;
}
</style>
