<template>
    <div class="outpatient">
        <!-- 远程门诊系统
		<button @click="openChat()">聊天</button>
		<el-dialog class="chatDialog" title="" :visible.sync="chatVisible" width="680px">
			<chat :sessionId="sessionId"></chat>
		</el-dialog> -->

        <div class="outpatient" v-if="$store.state.user.viewRoot.now.name==='manager'">
            <outPatientHospitalManagent></outPatientHospitalManagent>
        </div>

        <div class="outPatientDoctor" v-else>
            <outPatientDoctor></outPatientDoctor>
        </div>







        <div class="mark" v-if="false">
            <div class="mark-inner">
                <div class="outpatient-alert">
                    <p class="outpatient-alert-title">医生详情</p>
                    <div class="outpatient-alert-body">
                        <ul>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { fetchChatSession } from "../api/apiAll.js";
    import { mapState } from "vuex";
    import outPatientHospitalManagent from "./outPatientHospitalManagent.vue";
    import outPatientDoctor from "./outPatientDoctor.vue";
    export default {
        components: {
            outPatientHospitalManagent,
            outPatientDoctor
        },
        data() {
            return {
                manageOrDoctor: true,


                // chatVisible: false,
                // sessionId: "",
                doctorsInfo: {
                    //医生信息
                    headImg: "",
                    name: ""
                }
            };
        },
        computed: {
            ...mapState({
                userState: state => state.user.userInfo,
                userSelfInfo: state => state.user.userSelfInfo
            })
        },
        methods: {
            //创建会话框
            async openChat() {

                let query = {
                    token: this.userState.token
                };
                const options = {
                    to: "b9736cc01ac34daaa4aa4c68b38fff91"
                };
                console.log(fetchChatSession);
                const res = await fetchChatSession(query, options);
                console.log(res);
                if (res.data && res.data.errCode === 0) {
                    this.sessionId = res.data.body
                    this.chatVisible = true;

                } else {
                    //失败
                    this.$notify.error({
                        title: "警告",
                        message: res.data.errMsg
                    });
                }
            }
        },

        async created() { }
    };
</script>

<style>
    .outpatient {}

    .outPatientDoctor {}

    .outpatient-alert {
        width: 5.03rem;
        height: 200px;
        background-color: var(--bgColor5);
    }

    .chatDialog .el-dialog__header {
        height: 10px
    }

    .chatDialog .el-dialog__body {
        padding-top: 0px
    }

    .ceshi {
        color: red !important;
    }

    .ceshiLan {
        color: #0064D9 !important;
        font-weight: bold;

    }

    .ceshiHui {
        color: #97A3B4 !important;

    }

    .btn1 {
        background: #f0f9eb;
        border-color: #c2e7b0;
        color: #67C23A;

        font-size: 12px;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        padding: 7px 15px;
    }

    .btn2 {
        color: #409EFF;
        background: #ecf5ff;
        border-color: #b3d8ff;

        font-size: 12px;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        padding: 7px 15px;
    }

    .btn3 {
        color: #F56C6C;
        background: #fef0f0;
        border-color: #fbc4c4;

        font-size: 12px;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        padding: 7px 15px;
    }

    .btn1:hover {
        background: #67C23A;
        border-color: #67C23A;
        color: #FFF;
    }

    .btn1:active {
        background: #67C23A;
    }

    .btn1:focus {
        background: #67C23A;
        color: #FFF;
    }

    .btn2:hover {
        background: #409EFF;
        border-color: #409EFF;
        color: #FFF;
    }

    .btn2:active {
        background: #409EFF;
    }

    .btn2:focus {
        background: #409EFF;
        color: #FFF;
    }

    .btn3:hover {
        background: #F56C6C;
        border-color: #F56C6C;
        color: #FFF;
    }

    .btn3:active {
        background: #F56C6C;
    }

    .btn3:focus {
        background: #F56C6C;
        color: #FFF;
    }

    .lanSe:focus {
        outline: none;
    }

    .lvSe:focus {
        outline: none;
    }

    .fenSe:focus {
        outline: none;
    }

    .huangSe:focus {
        outline: none;
    }

    .lanSe {
        width: 57px;
        height: 20px;
        background: rgba(66, 133, 244, 0.1);
        border: 1px solid rgba(66, 133, 244, 0.6);
        border-radius: 3px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #4d7cfe;
        line-height: 3px;
        margin: 0 14px 0 14px;
    }

    .lvSe {
        width: 57px;
        height: 20px;
        background: rgba(46, 189, 65, 0.10);
        border: 1px solid rgba(46, 189, 65, 0.60);
        border-radius: 3px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #2EBD41;
        line-height: 3px;
        margin: 0 14px 0 14px;
    }

    .fenSe {
        width: 57px;
        height: 20px;
        background: rgba(254, 77, 151, 0.10);
        border: 1px solid rgba(254, 77, 151, 0.60);
        border-radius: 3px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #FE4D97;
        line-height: 3px;
        margin: 0 14px 0 14px;
    }

    .huangSe {
        width: 57px;
        height: 20px;
        background: rgba(255, 171, 43, 0.10);
        border: 1px solid rgba(255, 171, 43, 0.60);
        border-radius: 3px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #FFAB2B;
        line-height: 3px;
        margin: 0 14px 0 14px;
    }

    .tanKuang1 {
        width: 88px;
        height: 30px;
        background: rgba(66, 133, 244, 0.1);
        border-radius: 4px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #4D7CFE;
        text-align: center;
    }

    .tanKuang2 {
        width: 88px;
        height: 30px;
        background: rgba(254, 77, 151, 0.10);
        border-radius: 4px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FE4D97;
        text-align: center;
    }

    .tanKuang3 {
        width: 88px;
        height: 30px;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #97A3B4;
        line-height: 30px;
        text-align: center;
    }


    /deep/ .el-table__header-wrapper th {
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #5E6875;
        letter-spacing: 0;
    }

    /deep/ .el-table__body-wrapper td {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #5E6875;
        letter-spacing: 0;
    }
</style>