<!-- 门诊处方 -->
<template>
    <div class="prescription">
        <div v-for='(o,i) in inData' class="imgP">
            <img :src = o title="处方单">
        </div>
        <!-- <Timeline>
            <TimelineItem v-for="(item,index) in 5" :key="index">
                <p class="visiting-hospital">重庆市医科大学第三附属医院</p>
                <p class="visiting-department">
                    <span class="visiting-department-on">on</span>
                    <span class="visiting-department-name">科室名称  |  门诊</span>
                </p>
                <div class="visiting-content">
                    <div class="visiting-content-info">
                        <div class="visiting-content-info-left"><span></span></div>
                        <div class="visiting-content-info-right">
                            <div class="visiting-content-info-right-inner">
                                <div class="visiting-content-info-right-inner-content">
                                    <p class="visiting-content-info-right-p">
                                        <span class="visiting-content-info-right-span">祛痰止咳胶囊</span>
                                        <span class="visiting-content-info-right-span">12g*6袋</span>
                                        <span class="visiting-content-info-right-span">1盒</span>
                                        <span class="visiting-content-info-right-span">1用法: 1袋</span>
                                        <span class="visiting-content-info-right-span">口服</span>
                                        <span class="visiting-content-info-right-span">每天三次</span>
                                    </p>
                                    <p class="visiting-content-info-right-p">
                                        <span class="visiting-content-info-right-span">祛痰止咳胶囊</span>
                                        <span class="visiting-content-info-right-span">12g*6袋</span>
                                        <span class="visiting-content-info-right-span">1盒</span>
                                        <span class="visiting-content-info-right-span">1用法: 1袋</span>
                                        <span class="visiting-content-info-right-span">口服</span>
                                        <span class="visiting-content-info-right-span">每天三次</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="visiting-content-btn">
                        <el-button type="danger" size="mini" @click="reportDetailsClick" plain>看报告</el-button>
                    </div>
                </div>
            </TimelineItem>
        </Timeline> -->
        <!-- 体检报告详情 弹窗 -->
        <!-- <el-dialog :close-on-click-modal="false"
        title=" "
        append-to-body
        :visible.sync="reportDetails.show"
        :fullscreen="true"
        :before-close="reportDetailsClose"
        >
        <div class="report-details">
            <div class="report-details-top">
                <div class="report-details-headimg">
                    <img src="../../../../static/assets/img/a-6.png" alt="">
                </div>
                <div class="report-details-info-item">
                    <p class="report-details-info-item-child1">姓 名:  用户甲</p>
                    <p class="report-details-info-item-child2">联系电话: 189XXXXXXXX</p>
                </div>
                <div class="report-details-info-item">
                    <p class="report-details-info-item-child1">年 龄:  14岁</p>
                    <p class="report-details-info-item-child2">证件号码: XXXX19XX10XX06XX</p>
                </div>
                <div class="report-details-info-item">
                    <p class="report-details-info-item-child1">性 别:  男</p>
                    <p class="report-details-info-item-child2">家庭住址: 北京市大兴区XXX街道XXX里XXXXXXXX/ 暂无记录</p>
                </div>
            </div>
            <div class="report-details-content">
                <div class="report-details-content-item">
                    <div class="report-details-content-item-head">
                        <span>体检报告</span>
                    </div>
                    <div class="report-details-content-item-body">
                        <div class="report-details-content-item-body-item">
                            <div class="report-details-content-item-body-item-name">
                                <span>异常项</span>
                            </div>
                            <div class="report-details-content-item-body-item-value">
                                <p v-for="(item,index) in 9" :key="index">幽门螺旋杆菌检测: 1.幽门螺杆菌检幽门螺旋杆菌检测: 1.</p>
                            </div>
                        </div>

                        <div class="report-details-content-item-body-item">
                            <div class="report-details-content-item-body-item-name">
                                <span>结论</span>
                            </div>
                            <div class="report-details-content-item-body-item-value">
                                <p v-for="(item,index) in 9" :key="index">幽门螺旋杆菌检测: 1.幽门螺杆菌检幽门螺旋杆菌检测: 1.</p>
                            </div>
                        </div>

                        <div class="report-details-content-item-body-item">
                            <div class="report-details-content-item-body-item-name">
                                <span>建议</span>
                            </div>
                            <div class="report-details-content-item-body-item-value">
                                <p v-for="(item,index) in 9" :key="index">幽门螺旋杆菌检测: 1.幽门螺杆菌检幽门螺旋杆菌检测: 1.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="report-details-content-item">
                    <div class="report-details-content-item-head">
                        <span>所有项</span>
                    </div>
                    <div class="report-details-content-item-body">
                        <div class="report-details-content-item-body-item">
                            <div class="report-details-content-item-body-item-name">
                                <span>异常项</span>
                            </div>
                            <div class="report-details-content-item-body-item-value">
                                <p v-for="(item,index) in 9" :key="index">幽门螺旋杆菌检测: 1.幽门螺杆菌检幽门螺旋杆菌检测: 1.</p>
                            </div>
                        </div>

                        <div class="report-details-content-item-body-item">
                            <div class="report-details-content-item-body-item-name">
                                <span>结论</span>
                            </div>
                            <div class="report-details-content-item-body-item-value">
                                <p v-for="(item,index) in 9" :key="index">幽门螺旋杆菌检测: 1.幽门螺杆菌检幽门螺旋杆菌检测: 1.</p>
                            </div>
                        </div>

                        <div class="report-details-content-item-body-item">
                            <div class="report-details-content-item-body-item-name">
                                <span>建议</span>
                            </div>
                            <div class="report-details-content-item-body-item-value">
                                <p v-for="(item,index) in 9" :key="index">幽门螺旋杆菌检测: 1.幽门螺杆菌检幽门螺旋杆菌检测: 1.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </el-dialog> -->
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
                reportDetails: {
                    show: false
                }
            }
        },

        methods: {
            reportDetailsClick() {
                this.reportDetails.show = true;
            },
            reportDetailsClose() {
                this.reportDetails.show = false;
            }

        },
        async created() {

        }
    }
</script>

<style scoped lang="scss">
    .medical-record {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 0.2rem;
    }

    .doc-nor-item {
        display: flex;
        background: #FFFFFF;
        border: 1px solid #E1E8EE;
        border-radius: 4px;
        width: 6.7rem;
        height: 1.62rem;
        margin-bottom: 0.15rem;
    }

    .doc-nor-item-left {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .doc-nor-item-right {
        flex: 3;
    }

    .doc-nor-item-title {
        margin-top: 0.28rem;
        color: var(--color18);
        line-height: 0.22rem;
        font-weight: bold;
    }

    .doc-nor-item-time {
        font-family: var(--fontFamily3);
        font-size: var(--fontSize1);
        color: var(--color19);
        line-height: 0.22rem;
    }

    .doc-nor-item-text {
        font-family: var(--fontFamily3);
        font-size: var(--fontSize1);
        color: var(--color19);
        line-height: 0.22rem;
    }

    /* ///////////// */
    .visiting-hospital {
        color: var(--color18);
        line-height: 0.22rem;
    }

    .visiting-department-on {
        font-family: var(--fontFamily4);
        font-size: var(--fontSize1);
        color: var(--color19);
        line-height: 0.22rem;
    }

    .visiting-department-name {
        font-size: var(--fontSize1);
        color: var(--borderColor5);
    }

    .visiting-content {
        height: 0.76rem;
        background: #F3F6FA;
        border-radius: 4px;
        display: flex;
    }

    .visiting-content-info {
        flex: 9;
        display: flex;
        padding-left: 0.15rem;
        /* background: red; */
    }

    .visiting-content-btn {
        flex: 1;
        /* background: green; */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .visiting-content-info-left {
        display: inline-block;
    }

    .visiting-content-info-right {
        flex: 1;
    }

    .visiting-content-info-right-span {
        padding-right: 0.3rem;
    }

    .medicalOrder-top {
        display: flex;
        background-color: #E9C457;
        height: 0.48rem;
    }

    .medicalOrder-top-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: MicrosoftYaHei;
        font-size: var(--fontSize4);
        color: rgba(0, 0, 0, 0.87);
    }

    .medicalOrder-body-list-item {
        display: flex;
        height: 0.48rem;
    }

    .medicalOrder-body-list-item-item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: MicrosoftYaHei;
        font-size: var(--fontSize4);
        color: var(--color20);
    }

    .medicalOrder-body-list:nth-of-type(odd) {
        background-color: #F1F5F8;
    }

    .medicalOrder-body-list-item-item-status {
        color: #108E26;
    }

    .visiting-content-info-left-change {
        flex: 1;
    }

    .visiting-content-info-right-change {
        flex: 3;
    }

    .visiting-content-info-right-change-table {
        width: 100%;
    }

    .visiting-content-spe {
        background: #F3F6FA;
        border-radius: 4px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }

    .visiting-content-info-right-inner {
        display: flex;
        align-items: center;
        height: 100%;
    }

    .report-details-top {
        display: flex;
        align-items: center;
        padding-left: 1rem;
    }

    .report-details-headimg {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.2rem;
    }

    .report-details-headimg>img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .report-details-info-item {
        margin-right: 1rem;
    }

    .report-details-info-item-child2 {
        margin-top: 0.1rem;
    }

    .report-details-content-item-body-item {
        display: flex;
        border-bottom: 1px solid white;
        box-sizing: border-box;
    }

    .report-details-content-item-body-item-name {
        width: 1.55rem;
        background-color: #EDEDED;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: PingFangSC-Light;
        font-size: var(--fontSize6);
        color: var(--color20);
        letter-spacing: -0.24px;
    }

    .report-details-content-item-body-item-value {
        flex: 1;
        padding-left: 0.2rem;
        padding-top: 0.1rem;
    }

    .report-details-content-item-head {
        height: 0.56rem;
        background-color: #E9C457;
        display: flex;
        padding-left: 0.2rem;
        align-items: center;
        font-family: MicrosoftYaHei;
        font-size: var(--fontSize4);
        color: rgba(0, 0, 0, 0.87);
    }

    .image {
        /* border: 1px solid red; */
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .image-item-head {
        display: flex;
        justify-content: space-between;
    }

    .image-item-head-name {
        font-family: var(--fontFamily3);
        font-size: 0.34rem;
        color: #030303;
    }

    .image-item-head-vice {
        font-family: var(--fontFamily3);
        font-size: var(--fontSize6);
        color: var(--color20)
    }

    .image-item-body-item-spe {
        display: flex;
        justify-content: space-between;
        font-family: var(--fontFamily3);
        font-size: var(--fontSize6);
        color: #281012;
        padding-top: .4rem;
    }

    .image-item-body-item-spe-time {
        font-family: var(--fontFamily3);
        font-size: var(--fontSize6);
        color: #646464;
    }

    .image-item {
        padding-bottom: .45rem;
    }

    .image-item-body-item {
        font-family: var(--fontFamily3);
        font-size: var(--fontSize9);
        color: #5D5D5D;
    }

    .image-item-body {
        /* padding-top: .4rem; */
    }

    .image-btn-div {
        text-align: right;
    }

    .see-image {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
    }

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

    .visiting-content-info-right-inner-content {
        position: relative;
    }

    .visiting-content-info-right-inner-content::before {
        content: 'R: ';
        position: absolute;
        left: 0;
        transform: translateX(-100%)
    }



    .prescription {
        text-align: center;
        display: flex;
        flex-wrap: wrap;

        .imgP {
            width: 500px;

            img {}
        }
    }
</style>