<template>
    <!-- 远程会诊系统 -->

    <div class="consultationBox">
         
         <admin v-if="$store.state.user.viewRoot.now.name==='manager'"></admin>
       <doctor v-else></doctor>
       
    </div>
</template>
<script>
import doctor from "./consultation/doctor.vue";
import admin from "./consultation/admin.vue";
export default {
    components: {
        admin,
        doctor
    },
    data() {
        return {
        };
    },
    methods: {
    },
    async created() {
    },
    watch: {
        "$store.state.user.viewRoot.now.name": {
            handler(data) {
                // this.oUserType=data
                // alert(data)
                // if(data=='doctor')
                // {
                //      this.getDocList();
                // }else{
                //    this.getAdminList(); 
                // }
            }
        }
    }
};
</script>

<style>
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
}
.mainTab > div:first-child {
    width: 100%;
}
/* 医生端样式 */
.consultationBox {
    padding-top: 50px;
}
.doc-title {
    display: flex;
    display: -webkit-flex;
    margin-bottom: 52px;
    justify-content: space-between;
}
.doc-title > div:nth-child(2) {
    margin-left: 178px;
}
.doc-title > button {
    margin-top: -7px;
    margin-right: 44px;
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
.startGroup input {
    width: 162px;
    height: 28px;
}
.confirmBtn {
    width: 100%;
    height: 39px;
    background: #4da1ff;
    border-radius: 4px;
    color: white;
    font-size: 12px;
    line-height: 21px;
}
.confirmBtnBox > div {
    margin-left: 0 !important;
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
.evaluateBox2 li {
    margin-bottom: 18px;
    /* display: flex;
    display: -webkit-flex;
    justify-content: space-between; */
}
/* 查看记录 */
.hisMain {
    padding: 10px 28px;
}
.ohisList {
    margin-bottom: 25px;
}
.ohisList > h3 {
    margin-bottom: 15px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #000000;
    letter-spacing: -0.4px;
    font-weight: normal;
}
.ohisListMain {
    display: flex;
    display: -webkit-flex;
    margin-bottom: 15px;
}
.ohisListMain > div:first-child {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 12px;
}
.ohisListMain > div:first-child > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.ohisListRg > div {
    font-size: 0.14rem;
    font-family: PingFangSC-Regular;
    color: #323c47;
}
.ohisListRg > div:first-child {
    color: #939eab;
    font-size: 0.12rem;
}
.ooRed {
    color: red !important;
}
.addHospitalBox {
    position: relative;
}
.addHospital {
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    right: -3px;
    top: 8px;
}
.addHospital > img {
    width: 100%;
    height: 100%;
}
.tablePublicClass {
    border: none;
}
.tablePublicClass .el-table td,
.tablePublicClass .el-table th {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #5e6875;
    letter-spacing: 0;
    border-right: none;
}
.tablePublicClass .el-table td {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #5e6875;
    letter-spacing: 0;
}


.el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
    border-right: none;
}
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
.startGroup .el-form-item__label {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #939eab;
    letter-spacing: 0;
}
.startGroup .el-dialog__title {
    font-family: PingFangSC-Regular;
    font-size: 23px;
    color: #323c47;
    letter-spacing: 0;
    text-align: center;
    line-height: 33px;
}
.startGroup .el-dialog__body {
    padding: 3px 45px 1px;
}
.startGroup .el-form-item {
    margin-bottom: 19px;
}
</style>