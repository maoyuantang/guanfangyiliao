<!-- 随访计划 -->
<template>
    <div class="plan">
        <div class="plan-content">
            <table class="plan-table" cellpadding="10" v-if="list.length != 0">
                <thead class="plan-thead">
                    <tr>
                        <th>名称</th>
                        <th>发送医生</th>
                        <th>发送时间</th>
                        <th>下次随访时间</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="plan-tbody">
                    <tr v-for="(item,index) in list" :key="index">
                        <th>{{item.title}}</th>
                        <th>{{item.docName}}</th>
                        <th>{{item.sendTime}}</th>
                        <th>{{item.nextDate}}</th>
                        <th class="see" @click="see(item,index)">查看</th>
                    </tr>
                </tbody>
            </table>
            <tableNoMore v-if="list.length <= 0"></tableNoMore>
            <div class="page" v-if="list.length != 0">
                <el-pagination background layout="prev, pager, next" :page-size="page.size" :current-page="page.current"
                    :total="page.total" v-if="page.total!=0" @current-change="ChangePage"></el-pagination>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog :close-on-click-modal="false" title=" " append-to-body :visible.sync="alertData.show" width="40vw" :before-close="closeAlert">
            <div class="plan-alert">
                <iframe :src="alertData.src" class="plan-alert-iframe"></iframe>
                <!-- <div class="plan-alert-top plan-alert-has-border-bttom">
                    <div class="plan-alert-top-left">
                        <span>首次治疗</span>
                    </div>
                    <div class="plan-alert-top-right">
                        <div class="plan-alert-top-right-time-select">
                            <el-date-picker
                            size="mini"
                            value-format="yyyy-MM-dd"
                            v-model="alertData.data.time"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div class="plan-alert-top-right-time-show">
                            <span class="plan-alert-top-right-time-show-span">{{alertData.data.time}}</span>
                        </div>
                    </div>
                </div>
                <div class="plan-alert-fg plan-alert-has-border-bttom">
                    <span>可编辑</span>
                </div>
                <div class="plan-alert-content">
                    <div class="plan-alert-content-item plan-alert-has-border-bttom plan-alert-tip-me">
                        <div class="plan-alert-content-item-left">
                            <span>提醒我</span>
                        </div>
                        <div class="plan-alert-content-item-right">
                            <el-switch
                            v-model="alertData.data.tipMe"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                            </el-switch>
                        </div>
                    </div>

                    <div class="plan-alert-content-item">
                        <div class="plan-alert-content-item-left">
                            <span>提醒他</span>
                        </div>
                        <div class="plan-alert-content-item-right">
                            <span class="plan-alert-content-item-right-spefont" @click="changeTipHimStatus">{{alertData.data.tipHim?'开':'关'}}</span>
                        </div>
                    </div>

                    <div class="plan-alert-content-item">
                        <div class="plan-alert-content-item-left">
                            <span>提醒时间</span>
                        </div>
                        <div class="plan-alert-content-item-right">
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    {{`提前${alertData.data.tipTime.list[alertData.data.tipTime.index].num}${alertData.data.tipTime.list[alertData.data.tipTime.index].unit}`}}<i class="el-icon--right"></i>         
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item 
                                    v-for="(item,index) in alertData.data.tipTime.list" 
                                    @click.native="selectTime(index)"
                                    :key="index">{{`提前${item.num}${item.unit}`}}</el-dropdown-item>
                                    
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </div> -->
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { webDocGetFollowupPlan, getFollowUpPlan } from '../../../api/apiAll.js'
    import apiBaseURL from '../../../enums/apiBaseURL.js'
    import tableNoMore from '../../../public/publicComponents/tableNoMore.vue'
    export default {
        props: ['inData'],
        components: {
            tableNoMore
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
                page: {//分页
                    size: 10,
                    current: 1,
                    total: 0
                },
                list: [],//列表数据
                alertData: { //弹窗信息
                    show: false,//是否显示  
                    src: ''
                    // data:{  //弹窗具体信息
                    //     time:'',//首次治疗时间
                    //     tipMe:true,//提醒我
                    //     tipHim:true,//提醒他
                    //     // tipTime:'',//提醒时间  alertData.tipTime.list[alertData.tipTime.index]
                    //     tipTime:{
                    //         index:0,
                    //         list:[
                    //             {num:1,unit:'天',value:'天'},
                    //             {num:2,unit:'天',value:'天'},
                    //             {num:3,unit:'天',value:'天'},
                    //             {num:4,unit:'天',value:'天'},
                    //             {num:5,unit:'天',value:'天'},
                    //             {num:6,unit:'天',value:'天'},
                    //             {num:1,unit:'周',value:'天'},
                    //             {num:2,unit:'周',value:'天'},
                    //             {num:5,unit:'周',value:'天'},
                    //         ]
                    //     }
                    // }
                }
            }
        },

        methods: {
            /**
             * 选择 提醒时间
             */
            selectTime(index) {
                this.alertData.data.tipTime.index = index;
            },
            /**
             * 改变 提醒他 状态
             */
            changeTipHimStatus() {
                this.alertData.data.tipHim = !this.alertData.data.tipHim;
            },
            /**
             * 关闭弹窗
             */
            closeAlert() {
                this.alertData.src = '';
                this.alertData.show = false;
            },
            /**
             * 查看被点击
             * 10.2.5 查看随访计划详情【通用】
             */
            async see(item, index) {
                this.alertData.src = `${apiBaseURL.developmentEnvironment}/v1/peachApp/FollowupPlanUser.html?token=${this.userInfo.token}&id=${item.id}`;
                // console.log(this.alertData.src)
                this.alertData.show = true;
                // const res = await getFollowUpPlan({
                //     token:this.userInfo.token,
                //     planId:item.id
                // });
                // console.log(res);
                // if(res.data && res.data.errCode === 0){
                //     this.alertData.show = true;
                // }else{
                // 	this.$notify({
                // 		title: '随访计划详情获取失败',
                // 		message: res.data.errMsg,  
                // 		type: 'error'
                // 	});
                // }
                // this.$router.push({path:'/followUp'});
                // console.log(item);
            },
            /**
             * 获取表格信息
             */
            async getWebDocGetFollowupPlan() {
                const res = await webDocGetFollowupPlan({
                    token: this.userInfo.token,
                    userId: this.inData.userId,
                    memberId: this.inData.id,
                    pageNum: this.page.current,
                    pageSize: this.page.size
                });
                // console.log(res);
                if (res.data && res.data.errCode === 0) {
                    this.list = res.data.body.data2.list;
                    this.page.total = res.data.body.data2.total;
                } else {
                    this.$notify({
                        title: '成员随访计划列表获取失败',
                        message: res.data.errMsg,
                        type: 'error'
                    });
                }

            },
            /**
             * 触发分页
             */
            ChangePage(num) {
                this.page.current = num;
                this.getWebDocGetFollowupPlan();
            },
        },
        async created() {
            this.getWebDocGetFollowupPlan();
        }
    }
</script>

<style scoped>
    .plan {}

    .plan-table {
        width: 80%;
        margin: 0 auto;
        margin-top: .24rem;
    }

    .plan-thead {
        background-color: #E9C457;
    }

    .plan-tbody {}

    .plan-thead>tr {
        height: .48rem;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.87);
    }

    .plan-table th {
        padding-left: .2rem;
    }

    .plan-tbody>tr {
        height: .6rem;
        ;
        padding-left: .1rem;
        padding-right: .1rem;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #646464;
        text-align: left;
    }

    .plan-tbody>tr:nth-child(odd) {
        background-color: #F1F5F8;
    }

    .see {
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #108E26;
        cursor: pointer;
    }

    .plan-alert-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* margin-bottom: .2rem; */
        height: 46px;

    }

    .plan-alert-has-border-bttom {
        /* border-top: 1px solid #f1f1f1; */
        border-bottom: 1px solid #f1f1f1;
    }

    .plan-alert-top-left {
        flex: 1;
        font-size: 17px;
    }

    .plan-alert-top-right {
        flex: 1;
        position: relative;
    }

    .plan-alert-top-right-time-select {
        position: absolute;
        /* visibility: hidden; */
        opacity: 0;
        right: 0;
        z-index: 1;
        top: -17px;
    }

    .plan-alert-top-right-time-show {
        text-align: right;
        display: flex;
        flex-direction: row-reverse;
        /* position: absolute; */
        /* right: 0; */
    }

    .plan-alert-top-right-time-show-span {
        position: relative;
        color: #00A3FF;
        font-size: 17px;
        cursor: pointer;
        height: 100%;
    }

    .plan-alert-top-right-time-show-span::after {
        content: "";
        position: absolute;
        bottom: 0px;
        right: -7px;
        width: 0;
        height: 0;
        border-bottom: 10px solid #00A3FF;
        border-left: 10px solid transparent;
    }

    .plan-alert-fg {
        height: 82px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fafafa;
        /* background-color: #e5e5e5; */
        /* text-align: center; */
    }

    .plan-alert-fg>span {
        position: relative;
        color: #999;
    }

    .plan-alert-fg>span::before {
        content: "";
        position: absolute;
        width: 100px;
        height: 1px;
        background-color: #999;
        top: 50%;
        left: -110px;
    }

    .plan-alert-fg>span::after {
        content: "";
        position: absolute;
        width: 100px;
        height: 1px;
        background-color: #999;
        top: 50%;
        right: -110px;
    }

    .plan-alert-content-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: .4rem;
        ;
        /* padding-bottom: .2rem; */
    }

    .plan-alert-content-item-right-spefont {
        cursor: pointer;
    }

    .plan-alert {
        height: 50vw;
    }

    .plan-alert-tip-me {
        border-top: 1px solid #f1f1f1;
        margin-top: .1rem;
        height: .4rem;
        ;
    }

    .plan-alert-iframe {
        width: 100%;
        height: 100%;
    }

    .page {
        text-align: center;
    }
</style>