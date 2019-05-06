<!-- 体检记录 -->
<template>
    <div>
        <!-- <p>文本</p> -->
        
        
        <!-- <Timeline>
            <TimelineItem v-for="(item,index) in 5" :key="index">
                <p class="visiting-hospital">
                    <span>重庆市医科大学第三附属医院</span>
                    <span class="visiting-hospital-time">2018-12-25</span>
                </p>
                <p class="visiting-department">
                    <span class="visiting-department-on">on</span>
                    <span class="visiting-department-name">科室名称 | 门诊</span>
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
            reportDetailsClick() { }

        },
        async created() {

        }
    }
</script>

<style scoped>
    .visiting-hospital {
        color: var(--color18);
        line-height: 0.22rem;
        display: flex;
        justify-content: space-between;
    }

    .visiting-hospital-time {
        font-family: OpenSans;
        font-size: 13px;
        color: #97A3B4;
        text-align: right;
        line-height: 22px;
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
</style>