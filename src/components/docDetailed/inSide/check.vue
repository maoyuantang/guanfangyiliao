<!-- 检验 -->
<template>
    <div>
        <!-- <div class="examination">
            <Timeline>
                <TimelineItem v-for="(item,index) in 3" :key="index">
                    <p class="visiting-hospital">重庆市医科大学第三附属医院</p>
                    <p class="visiting-department">
                        <span class="visiting-department-on">on</span>
                        <span class="visiting-department-name">科室名称 | 门诊</span>
                    </p>
                    <div class="visiting-content-spe">
                        <div class="visiting-content-info">
                            <div class="visiting-content-info-right-change">
                                <table class="visiting-content-info-right-change-table">
                                    <thead class="visiting-content-info-right-change-thead">
                                        <tr>
                                            <th>检查项目</th>
                                            <th>英文名称</th>
                                            <th>参考值/单位</th>
                                            <th>结果</th>
                                        </tr>
                                    </thead>
                                    <tbody class="visiting-content-info-right-change-tbody">
                                        <tr v-for="(item,index) in 9" :key="index">
                                            <th>Y-谷酰转肽酶</th>
                                            <th>GGT</th>
                                            <th>10-60/U/L</th>
                                            <th>94<i class="iconfont">&#xe777;</i></th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="visiting-content-btn">
                            <el-button type="danger" size="mini" @click="examinationDetailsClick" plain>看报告</el-button>
                        </div>
                    </div>
                </TimelineItem>
            </Timeline>
        </div> -->

        <el-dialog title=" " append-to-body :visible.sync="examinationDetails.show" :fullscreen="true"
            :before-close="examinationDetailsClose">
            <div class="examination-details">
                <div class="examination-details-content">
                    <div class="examination-details-content-head">
                        <p>凝血[检验报告]</p>
                    </div>
                    <div class="examination-details-content-body">
                        <div class="examination-details-content-body-tip">
                            <p>检查单号[2030045]</p>
                        </div>
                        <div class="examination-details-content-body-content">
                            <table class="examination-details-table">
                                <thead class="examination-details--thead">
                                    <tr>
                                        <th>检查项目</th>
                                        <th>检查项目</th>
                                        <th>检查项目</th>
                                        <th>检查项目</th>
                                        <th>检查项目</th>
                                    </tr>
                                </thead>
                                <tbody class="examination-details-tbody">
                                    <tr v-for="(item,index) in 9" :key="index">
                                        <th>凝血酶时间</th>
                                        <th>凝血酶时间</th>
                                        <th>凝血酶时间</th>
                                        <th>凝血酶时间</th>
                                        <th>凝血酶时间</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="examination-details-content-foot">
                        <p>i is fish</p>
                    </div>
                </div>
            </div>
        </el-dialog>
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
                examinationDetails: {
                    show: false
                }
            }
        },

        methods: {
            examinationDetailsClose() {
                this.examinationDetails.show = false;
            },
            examinationDetailsClick() {
                this.examinationDetails.show = true;
            },
        },
        async created() {

        }
    }
</script>

<style scoped>
    .examination-details-table {
        width: 100%;
    }

    .examination-details-table tr {
        display: flex;
    }

    .examination-details-table th {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0.48rem;
        ;
    }

    .examination-details--thead tr {
        background-color: #ecedf2;
    }

    .examination-details-tbody tr:nth-of-type(even) {
        background: #f8f7fc;
    }

    .examination-details-content {
        box-sizing: border-box;
        border-top: 0.14rem solid #eaedf2;
        border-left: 0.06rem solid #eaedf2;
        border-right: 0.06rem solid #eaedf2;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
    }

    .examination-details-content-head {
        height: 0.72rem;
        display: flex;
        border-bottom: 0.1rem solid #eaedf2;
    }

    .examination-details-content-head p {
        display: flex;
        font-size: var(--fontSize5);
        font-weight: bold;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .examination-details-content-body-tip {
        font-size: var(--fontSize3);
        color: #f7a060;
    }
</style>