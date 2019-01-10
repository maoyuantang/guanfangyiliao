<template>
	<div class="outpatient">
		远程门诊系统
		<button @click="openChat()">聊天</button>
		<el-dialog title=" 张医生/或者群名称" :visible.sync="chatVisible" width="680px">
			<chat :sessionId="sessionId"></chat>
		</el-dialog>

		<div class="view-curr">
			<outPatientHospitalManagent></outPatientHospitalManagent>
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
import chat from "../public/publicComponents/chat.vue";
import outPatientHospitalManagent from "./outPatientHospitalManagent.vue";
export default {
    data() {
        return {
            chatVisible: false,
            sessionId: "",
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
                to: "B43F34E1D4014D4F98ED57BA86B2239F"
            };
            console.log(fetchChatSession);
            const res = await fetchChatSession(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
				this.sessionId=res.data.body
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
    components: {
        outPatientHospitalManagent,
        chat
    },
    async created() {}
};
</script>

<style scoped>
.outpatient {
}
.outpatient-alert {
    width: 5.03rem;
    height: 200px;
    background-color: var(--bgColor5);
}
</style>