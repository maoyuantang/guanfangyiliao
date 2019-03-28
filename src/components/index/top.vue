<template>
    <div class="top">
        <!-- {{viewRoot.now}}
        {{userInfo.hasAuth.filter(item=>item.type==='1')}} -->
        <!-- <div class="change-root" v-if="!userInfo.rooter">
			<el-menu :default-active="viewRoot.now.type" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="showTopNav">
				<el-menu-item index="1">管理权限</el-menu-item>
				<el-menu-item index="2" :disabled="!canGotoDoctor">医生端</el-menu-item>
			</el-menu>
		</div> -->
        <div class="change-root" v-if="!userInfo.rooter">
            <el-menu :default-active="viewRoot.now.type" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">管理权限</el-menu-item>
                <el-menu-item index="2" :disabled="!canGotoDoctor">医生端</el-menu-item>
            </el-menu>
        </div>
        <div class="top-left" @click="openNotice()">
            <marquee class="title-marquee">{{noticeList}}</marquee>
            <div class="msg">
                <i id="noticeIconClass" v-show="noticeRedVisable" class="iconfont">&#xe8c0;</i>
            </div>
        </div>
        <div class="top-right">
            <div class="top-right-posi">
                <img :src="imgSrc" alt="" class="user-head">
                <span class="user-name">{{userSelfInfo.name}}</span>
                <Dropdown>
                    <a href="javascript:void(0)">
                        <i class="iconfont user-select">&#xe65a;</i>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem @click.native="logout">退出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <div v-if="noticeVisible">
            <el-dialog class="noticeClass" title="通知" :visible.sync="noticeVisible" width="60%">
                <notice></notice>
            </el-dialog>
        </div>

    </div>
</template>

<script>
import { mapState } from "vuex";
import notice from "../publicFrame/notice.vue";
import apiBaseURL from "../../enums/apiBaseURL.js";
import { fetchNoticeInfo } from "../../api/apiAll.js";

export default {
    name: "top",
    components: {
        notice
    },
    computed: {
        ...mapState({
            userSelfInfo: state => state.user.userSelfInfo,
            viewRoot: state => state.user.viewRoot,
            userInfo: state => state.user.userInfo,
            userSocketInfo: state => state.socket,
            userState: state => state.user.userInfo
        }),
        // ...mapState({
        //     viewRoot: state => state.user.viewRoot
        // }),
        // ...mapState({
        //     userInfo: state => state.user.userInfo
        // }),
        // ...mapState({
        //     userSocketInfo: state => state.socket
        // }),
        imgSrc() {
            return this.userSelfInfo.headId
                ? `${apiBaseURL.imgBaseUrl}/m/v1/api/hdfs/fs/download/${
                      this.userSelfInfo.headId
                  }`
                : "../../../static/assets/img/a-6.png";
        }
    },
    data() {
        return {
            noticeRedVisable: true,
            noticeVisible: false,
            marquee: "tanying",
            canGotoManager: true,
            canGotoDoctor: true,
            showTopNav: false,
            noticeList: ""
        };
    },
    methods: {
        async getNoticeList() {
            this.msgId = this.$store.state.socket.messageTicket.oMsgId;
            let _this = this;
            let query = {
                token: this.userState.token,
                msgId: this.msgId,
                pageNums: 10
            };
            _this.noticeList = "";
            const res = await fetchNoticeInfo(query);
            if (res.data && res.data.errCode === 0) {
                $.each(res.data.body, function(index, text) {
                    if (res.data.body.length < 1) {
                        _this.noticeList += text.noticeData.body;
                    } else {
                        _this.noticeList += text.noticeData.body + "--";
                    }
                });
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        switchStatus() {
            console.log("444");
        },
        handleSelect(index) {
            console.log(index);
            const obj = {
                "1": "manager",
                "2": "doctors"
            };
            let sendData = {
                name: obj[index],
                type: index
            };
            this.$store.commit("user/CHANGEVIEWAUTH", sendData);
            sessionStorage.setItem("viewRoot", JSON.stringify(this.viewRoot));
            console.log(index);
            // sessionStorage.setItem('page',JSON.stringify(item));
            console.log(this.$store.state.user.viewRoot.now);
        },
        /**
         * 注销
         */
        logout() {
            this.$store.commit("user/CLEARUSERINFO");
            this.$store.commit("user/CLAERUSERSELFINFO");
            sessionStorage.clear();
            this.$store.state.socket.socketObj.close()
            this.$router.replace({
                path: "/login"
            });
            // location.reload();
        },
        setCanClic() {
            if (this.userInfo.manager && this.$route.path === "/") {
                this.canGotoDoctor = false;
            }
        },
        openNotice() {
            this.noticeVisible = true;
        },
        /**
         * 新增功能 只有管理权限和医生权限才显示顶部视图切换
         */
        countShowWhich() {
            // const doc = this.userInfo.hasAuth.filter(item=>item.type==='2');
            // const man = this.userInfo.hasAuth.filter(item=>item.type==='1');
            if (this.userInfo.rooter) return; //超级管理员不要判断,在以前的地方处理过
            if (
                this.userInfo.hasAuth.filter(item => item.type === "1")
                    .length <= 0
            ) {
                this.showTopNav = false;
                this.$store.commit("user/CHANGEVIEWAUTH", {
                    name: "doctors",
                    type: "2"
                });
            } else if (
                this.userInfo.hasAuth.filter(item => item.type === "2")
                    .length <= 0
            ) {
                this.showTopNav = false;
                this.$store.commit("user/CHANGEVIEWAUTH", {
                    name: "manager",
                    type: "1"
                });
            } else {
                this.showTopNav = true;
                this.$store.commit("user/CHANGEVIEWAUTH", {
                    name: "manager",
                    type: "1"
                });
            }
            sessionStorage.setItem("viewRoot", JSON.stringify(this.viewRoot));
        }
    },
    async created() {
        this.countShowWhich();
        this.getNoticeList();
    },
    // beforeRouteEnter(to,from,next){
    //     next(vm=>{
    //         console.log(vm);
    //             const doc = this.userInfo.hasAuth.filter(item=>item.type==='2');
    //             const man = this.userInfo.hasAuth.filter(item=>item.type==='1');
    //             console.log(doc)
    //             console.log(man)
    //             return;
    //             if(man.length<=0){//没有管理权限
    //                 vm.showTopNav = false;
    //                 vm.$store.commit("user/CHANGEVIEWAUTH", {
    //                     name:'doctors',
    //                     type:'2'
    //                 });
    //             }else if(doc.length<=0){//没有医生权限
    //                 vm.showTopNav = false;
    //                 vm.$store.commit("user/CHANGEVIEWAUTH", {
    //                     name:'manager',
    //                     type:'1'
    //                 });
    //             }else{
    //                 vm.showTopNav = true;
    //                 vm.$store.commit("user/CHANGEVIEWAUTH", {
    //                     name:'manager',
    //                     type:'1'
    //                 });
    //             }
    //             sessionStorage.setItem("viewRoot", JSON.stringify(this.viewRoot));
    //     });
    // },
    watch: {
        "userSocketInfo.synchroMessage": {
            handler(n, o) {
                $("#noticeIconClass").removeClass("msg-icon");
                let _this = this;
                $.each(n.syncData, function(index, text) {
                    if (text.command == "NOTICE") {
                        $("#noticeIconClass").addClass("msg-icon");
                    }
                });
            }
        }
    }
};
</script>

<style scoped>
.top {
    background-color: var(--whiteColor);
    box-shadow: 0 0.06rem 0.36rem 0 rgba(0, 62, 100, 0.04);
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
.top-left {
    flex: 1;
    width: 0;
    height: 100%;
    display: flex;
    align-items: center;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
}
.top-right {
    width: 1.8rem;
    height: 100%;
    display: flex;
    align-items: center;
}
.top-right-posi {
    position: relative;
    display: flex;
    align-items: center;
}
.user-head {
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    margin-left: 0.16rem;
}
.user-name {
    font-family: Helvetica;
    font-size: var(--fontSize3);
    color: var(--color1);
    margin-left: 0.16rem;
}
.user-select {
    font-size: 0.12rem;
    margin-left: 0.16rem;
    transition: 0.5s;
    transform: rotate(0deg);
    cursor: pointer;
    color: var(--color1);
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently*/
}
.user-select-true {
    transform: rotate(180deg);
}
.detailed-info {
    width: 300px;
    height: 200px;
    background-color: yellow;
    position: absolute;
    top: 0.3rem;
}
.title-marquee {
    color: var(--color2);
    font-family: PingFangSC-Regular;
    letter-spacing: 0.005rem;
    line-height: 0.3rem;
    width: 20%;
}
.msg {
    width: 0.73rem;
    display: flex;
    justify-content: center;
    color: var(--color2);
    cursor: pointer;
}
.msg-icon {
    position: relative;
}
.msg-icon::after {
    content: "";
    display: block;
    width: 0.08rem;
    height: 0.08rem;
    border-radius: 50%;
    background: var(--bgColor2);
    position: absolute;
    top: 0;
    right: -0.08rem;
}
.change-root {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.noticeClass {
    height: 700px;
}
</style>