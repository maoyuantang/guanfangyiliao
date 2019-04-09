<template>
    <!-- 远程协作系统 -->
    <div class="cooperation">
         <admin v-if="$store.state.user.viewRoot.now.name==='manager'"></admin>
       <doctor v-else></doctor>
    </div>
</template>
<script>
import doctor from "./cooperation/doctor.vue";
import admin from "./cooperation/admin.vue";
export default {
    components: {
        doctor,
        admin,
       
    },
    data() {
        return {
        };
    },



    methods: {
    },

    async created() {
        // this.getToolDept();
        // this.getSelect2();

        // this.getList1(); //管理列表

        // this.otherDoctor(); //可协作医生  列表
        // this.dialogCase(); //可协作医生  列表
        // this.dialogPurpose(); //可协作医生  列表
        // this.DoctorList(); //医生协作列表
        // console.log(this.$store.state.socket.messageTicket.msgId);
    },
     watch: {
        "$store.state.user.viewRoot.now.name": {
            handler(data) {
                this.oUserType=data
            }
        }
    }
};
</script>

<style>
.invitationClass .btnClass {
    width: 100%;
    height: 39px;
    background: #4da1ff;
    border-radius: 4px;
    font-family: PingFangSC-Semibold;
    font-size: 12px;
    color: #ffffff;
    letter-spacing: 0.5px;
    text-align: center;
}
.invitationClass .el-dialog__body {
    padding: 18px 12px 30px;
    overflow: hidden;
}
.invitationClass .el-tree {
    margin-left: -23px;
    background: none;
    margin-bottom: 14px;
}
.invitationClass .el-checkbox__inner {
    width: 20px;
    height: 20px;
}
.invitationClass .el-tree-node__label {
    margin-top: -6px;
}
.invitationClass .el-checkbox__inner::after {
    left: 7px;
    top: 3px;
}
/* 公共样式 */
.Admin-title {
    margin-bottom: 42px;
}

.admin-oMain {
    padding: 30px 38px;
    background: #ffffff;
    border: 1px solid #e5edf3;
    box-shadow: 0 6px 36px 0 rgba(0, 62, 100, 0.04);
    border-radius: 4px;
}

.admin-oMain > div {
    position: relative;
}

.mainTab {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
}

.mainTab > div:first-child {
    width: auto !important;
}

/* 医生端样式 */
.cooperation .doc-title {
    display: flex;
    display: -webkit-flex;
    /* justify-content: space-evenly; */
    align-items: baseline;
    margin-bottom: 52px;
}

.el-tree-node__content {
    margin: 0 0 20px 20px !important;
}

.el-tree-node__content .el-checkbox__inner {
    width: 20px !important;
    height: 20px !important;
}

.evaluateBtn {
    width: 57px;
    height: 20px;
    background: rgba(119, 140, 162, 0.1);
    border: 1px solid rgba(119, 140, 162, 0.6);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #778ca2;
    line-height: 3px;
}

.startConsul {
    width: 196px;
    height: 40px;
    background: #4da1ff;
    border-radius: 4px;
    font-family: PingFangSC-Semibold;
    font-size: 22px;
    color: #ffffff;
    letter-spacing: 0.92px;
    text-align: center;
    line-height: 0px;
}

/* 管理端端样式 */

.mainTab {
    margin-bottom: 30px;
}

.recordBtn {
    width: 57px;
    height: 20px;
    background: rgba(66, 133, 244, 0.1);
    border: 1px solid rgba(66, 133, 244, 0.6);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #4d7cfe;
    line-height: 3px;
}

/* .startGroupXiezuo {
    width: 30%;
    margin: auto;
}

.startGroupXiezuo input {
    height: 30px;
} */

.confirmBtn {
    width: 100%;
    height: 39px;
    background: #4da1ff;
    border-radius: 4px;
    color: white;
    font-size: 12px;
    line-height: 21px;
}

.confirmBtnBox {
    display: flex;
}

.confirmBtnBox > div {
    margin-left: 0;
}

.evaluateInput > textarea {
    width: 478px;
    height: 177px;
}

.evaluateMargin1 {
    margin-bottom: 68px;
}

.evaluateMargin > div {
    margin-left: 0px !important;
}

.evaluateBox .el-dialog__body {
    padding: 25px 60px;
}

.evaluateCont {
    width: 90%;
}

.evaluateCont > h5 {
    font-family: Helvetica;
    font-size: 0.14rem;
    color: #252631;
}

.evaluateCont > div {
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #98a9bc;
    line-height: 21px;
}

/* .evaluateBox2 li {
    margin-bottom: 18px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
} */

.invitationClass .el-form-item__label{
    font-family: PingFangSC-Regular;
font-size: 14px;
color: #939EAB;
letter-spacing: 0;
    width:46px !important
}
.invitationClassInput .el-form-item__content{
    margin-left: 48px !important;
}
.invitationClass .el-input__inner{
    width:162px;
    height: 28px;
    border: 1px solid #E6EAEE;
border-radius: 4px;
}
.invitationClassInputBtn .el-form-item__content{
    margin-left: 0px !important;
}
.chatDialog .el-dialog__body{
    padding-top:0 !important
}
</style>