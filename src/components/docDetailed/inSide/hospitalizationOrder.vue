<!-- 住院医嘱 -->
<template>
    <div>
        <!-- {{inData}} -->
        <div class="medicalOrder" v-if="inData.length == 0?false:true">
            <!-- <div class="medicalOrder-top">
                <p class="medicalOrder-top-item">医嘱名称</p>
                <p class="medicalOrder-top-item">规格</p>
                <p class="medicalOrder-top-item">途径</p>
                <p class="medicalOrder-top-item">开始时间</p>
                <p class="medicalOrder-top-item">结束时间</p>
                <p class="medicalOrder-top-item">频次</p>
                <p class="medicalOrder-top-item">剂量</p>
                <p class="medicalOrder-top-item">类别</p>
                <p class="medicalOrder-top-item">医嘱科室</p>
                <p class="medicalOrder-top-item">医嘱医生</p>
            </div>
            <div class="medicalOrder-body">
                <div class="medicalOrder-body-list" v-for="(item,index) in inData" :key="index">
                    <div class="medicalOrder-body-list-item">
                        <p class="medicalOrder-body-list-item-item">{{item.name}}</p>
                        <p class="medicalOrder-body-list-item-item">{{item.std}}</p>
                        <p class="medicalOrder-body-list-item-item">{{item.usage}}</p>
                        <p class="medicalOrder-body-list-item-item">{{item.startDtime}}</p>
                        <p class="medicalOrder-body-list-item-item">{{item.endDtime}}</p>
                        <p class="medicalOrder-body-list-item-item">{{item.freq}}</p>
                        <p class="medicalOrder-body-list-item-item">{{item.unit}}</p>
                        <p class="medicalOrder-body-list-item-item">{{item.orderType}}</p>
                        <p class="medicalOrder-body-list-item-item">{{item.deptName}}</p>
                        <p class="medicalOrder-body-list-item-item medicalOrder-body-list-item-item-status">
                            {{item.docName}}</p>
                    </div>
                </div>
            </div> -->



            <el-table :data="inData" style="width: 100%" v-if="inData.length == 0?false:true">
                <el-table-column prop="name" label="医嘱名称" width=""></el-table-column>
                <el-table-column prop="std" label="规格" width=""></el-table-column>
                <el-table-column prop="usage" label="途径" width=""></el-table-column>
                <el-table-column prop="startDtime" label="开始时间"></el-table-column>
                <el-table-column prop="endDtime" label="结束时间"></el-table-column>
                <el-table-column prop="freq" label="频次"></el-table-column>
                <el-table-column prop="unit" label="剂量"></el-table-column>
                <el-table-column prop="orderType" label="类别"></el-table-column>
                <el-table-column prop="deptName" label="医嘱科室"></el-table-column>
                <el-table-column prop="docName" label="医嘱医生"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            "inData"
        ],
        components: {

        },
        watch: {

        },
        computed: {

        },

        data() {
            return {
            }
        },

        methods: {


        },
        async created() {

        }
    }
</script>

<style scoped>
    .medicalOrder {
        padding: 25px 40px;
    }

    .medicalOrder-top {
        display: flex;
        background-color: #E9C457;
        height: 0.48rem;
    }

    .medicalOrder-top-item {
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.87);
        text-align: left;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        word-wrap: break-word;


    }

    .medicalOrder-body-list-item {
        display: flex;
        height: 0.48rem;
    }

    .medicalOrder-body-list-item-item {
        /* flex: 1; */
        /* display: flex; */
        /* flex-wrap: wrap; */
        /* align-items: center; */
        /* justify-content: center; */
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: var(--color20);

        text-align: left;
        /* word-wrap: break-word; */
        word-break: break-all;
        /* height: auto; */


    }

    .medicalOrder-body-list:nth-of-type(odd) {
        background-color: #F1F5F8;
    }

    .medicalOrder-body-list-item-item-status {
        color: #108E26;
    }

    /deep/ .el-table__body-wrapper{
        /* overflow-x: auto; */
    }

    /deep/ .el-table__body-wrapper td {
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #646464;
        text-align: left;
        letter-spacing: 0;
    }

    /deep/ .el-table__header-wrapper th {
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.87);
        text-align: left;
    }

    .ceshiLan {
        color: #108E26 !important;
        font-weight: bold;

    }
</style>