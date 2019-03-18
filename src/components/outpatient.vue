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
</style>