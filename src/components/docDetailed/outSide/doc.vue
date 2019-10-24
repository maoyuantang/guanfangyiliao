<!-- 上传档案 -->
<template>
    <div class="doc">
        <tableNoMore v-if="listData.length <= 0"></tableNoMore>
        <div class="doc-content">
            <Timeline>
                <TimelineItem v-for="(item,index) in listData" :key="index" v-if="listData.length != 0">
                    <p class="visiting-hospital">{{item.hospital}}</p>
                    <p class="visiting-department">
                        <span class="visiting-department-on">on</span>
                        <span class="visiting-department-name">{{item.dept}} | {{item.zhType}}</span>
                    </p>
                    <div class="visiting-content">
                        <img :src="value.imgSrc || ''" alt="" srcset="" v-for="(value,key) in item.imgs" :key="key"
                            @click="showBigImg(value)">
                        <!-- <img src="../../../../static/assets/img/ME.png" alt="" srcset="" v-for="(value,key) in item.imgs" :key="key"> -->
                    </div>
                </TimelineItem>
            </Timeline>
        </div>
        <div class="doc-page" v-if="listData.length != 0">
            <el-pagination background layout="prev, pager, next" :page-size="page.size" :current-page="page.current"
                :total="page.total" v-if="page.total!=0" @current-change="ChangePage"></el-pagination>
        </div>
        <!-- 查看大图 弹窗 -->
        <el-dialog :close-on-click-modal="false" title=" " append-to-body :visible.sync="alertData.show" :before-close="closeAlert">
            <div class="doc-alert-div">
                <img :src="alertData.imgSrc" alt="" srcset="">
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { getUserUpDocList } from '../../../api/apiAll.js'
    import apiBaseURL from "../../../enums/apiBaseURL.js"
    import tableNoMore from '../../../public/publicComponents/tableNoMore.vue'
    export default {
        props: ['inData'],
        components: {
            tableNoMore,
        },
        watch: {

        },
        computed: {
            ...mapState({
                userInfo: state => state.user.userInfo,
                userSelfInfo: state => state.user.userSelfInfo,
                global: state => state.global
            })
        },
        data() {
            return {
                page: {
                    size: 2,
                    current: 1,
                    total: 0
                },
                listData: [],
                alertData: {
                    show: false,
                    imgSrc: ''
                }
            }
        },

        methods: {
            /**
             * 展示大图弹窗
             */
            showBigImg(item) {
                // console.log(item);
                this.alertData.imgSrc = item.imgSrc;
                this.alertData.show = true;
            },
            /**
             * 关闭 查看大图弹窗
             */
            closeAlert() {
                this.alertData.show = false;
                this.alertData.imgSrc = '';
            },
            /**
             * 分页
             */
            ChangePage(num) {
                this.page.current = num;
                this.getUserUpDocList();
            },
            /**
             * 获取 数据
             */
            async getUserUpDocList() {
                const res = await getUserUpDocList({
                    token: this.userInfo.token,
                    userId: this.inData.userId,
                    memberId: this.inData.id,
                    pageNum: this.page.current,
                    pageSize: this.page.size
                });
                // console.log(res);
                if (res.data && res.data.errCode === 0) {
                    const typeMap = {
                        SURVEYING: '检验检查',
                        RECIPE: '处方',
                        IMAGE: '影像',
                        DIAGNOSISL: '诊断结论',
                        OTHER: '其他'
                    };
                    this.listData = res.data.body.data2.list.map(item => {
                        item.zhType = typeMap[item.type] || '其他';
                        item.imgs = item.imgs.map(ele => {
                            ele.imgSrc = ele.imgId ? `${apiBaseURL.imgBaseUrl}/m/v1/api/hdfs/fs/download/${ele.imgId}` : ele.imgId;
                            return ele;
                        })
                        return item;
                    });
                    this.page.total = res.data.body.total
                } else {
                    this.$notify({
                        title: '用户上传档案列表获取失败',
                        message: res.data.errMsg,
                        type: 'error'
                    });
                }
            },

        },
        async created() {
            this.getUserUpDocList();
        }
    }
</script>

<style scoped>
    .doc {}

    .doc-content {
        padding-left: .27rem;
        padding-top: .36rem;
    }

    .doc-page {
        text-align: center;
    }

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
        height: 1.6rem;
        background: #F3F6FA;
        border-radius: 4px;
        display: flex;
        padding-left: .48rem;
        align-items: center;
    }

    .visiting-content>img {
        margin-right: .15rem;
        width: 1.25rem;
        height: 1.38rem;
    }

    .doc-alert-div>img {
        max-width: 100%;
    }
</style>