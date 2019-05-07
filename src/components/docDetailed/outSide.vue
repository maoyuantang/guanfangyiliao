<!-- 电子病历 -->
<template>
    <div class="new-content">
        <div class="new-content-nav">
            <div class="new-content-userinfo">
                <div class="new-content-headimg">
                    <img :src="patientInfo.sex?'../../../static/assets/img/bingNan.png':'../../../static/assets/img/bingNv.png'"
                        alt="">
                </div>
                <p class="new-content-username">{{patientInfo.name}}</p>
                <div class="new-content-msg">
                    <p class="new-content--msg-item">性别：{{patientInfo.sex ? '男' : '女'}}</p>
                    <p class="new-content--msg-item">年龄：{{patientInfo.age}}</p>
                    <p class="new-content--msg-item">身份证：{{patientInfo.idNo}}</p>
                </div>
            </div>
            <div class="new-content-content">
                <!-- <div class="new-content-content-item" v-for="(item,index) in 9" :key="index">
                    <p class="new-content-content-item-title">门诊记录</p>
                    <p class="new-content-content-item-info">就诊医院：xxx医院</p>
                    <p class="new-content-content-item-info">就诊时间：2018-12-12</p>
                    <p class="new-content-content-item-info">就诊医院：xxx科室</p>
                    <p class="new-content-content-item-info">接诊医生：xxx</p>
                </div> -->
            </div>
        </div>
        <div class="new-content-body">
            <div class="new-content-body-nav">
                <div class="new-content-body-nav-item"
                    :class="showInfo.index===index?'new-content-body-nav-item-select':''" @click="changeNav(index)"
                    v-for="(item,index) in showInfo.navList" :key="index">
                    <div class="new-content-body-nav-item-name">{{item.name}}</div>
                    <div class="new-content-body-nav-item-time">{{item.time}}</div>
                </div>
            </div>
            <div class="new-content-body-content">
                <div :is="showInfo.navList[showInfo.index].component" :inData="inData"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { patientInfo, lastAssessPlan, lastUserRecord, nearlyFollowup, nearlyDevice, getDoctorMessage1 } from '../../api/apiAll.js'
    import plan from './outSide/plan.vue'
    import assessment from './outSide/assessment.vue'
    import equipment from './outSide/equipment.vue'
    import doc from './outSide/doc.vue'

    export default {
        props: ['inData'],
        components: {
            plan,
            assessment,
            equipment,
            doc
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
                showInfo: {
                    index: 0,
                    navList: [
                        {
                            name: '随访计划',
                            time: '',
                            component: 'plan',
                            msg: ''
                        },
                        {
                            name: '风险评估',
                            time: '',
                            component: 'assessment',
                            msg: ''
                        },
                        {
                            name: '设备自测',
                            time: '',
                            component: 'equipment',
                            msg: ''
                        },
                        {
                            name: '上传档案',
                            time: '',
                            component: 'doc',
                            msg: ''
                        },
                    ]
                },
                /**
                 * 患者信息
                 */
                patientInfo: {
                    name: '',//姓名
                    sex: '',//性别
                    age: '',//年龄
                    idNo: ''//身份证
                },
            }
        },

        methods: {
            /**
             * 11.获取成员最后一次评估相关
             */
            async getLastAssessPlan() {
                // console.log({
                //     token:this.userInfo.token,
                //     userId:this.inData.userId,
                //     familyMemberId:this.inData.id,
                // })
                const res = await lastAssessPlan({
                    token: this.userInfo.token,
                    userId: this.inData.userId,
                    familyMemberId: this.inData.id,
                });
            //console.log(res);
                if (res.data && res.data.errCode === 0) {
                    if (!res.data.body) return;
                    this.showInfo.navList[1].time = res.data.body.lastDate || '';//后端有时候啊，直接不返回这玩意，弄个默认值
                } else {
                    this.$notify({
                        title: '获取成员最后一次评估相关失败',
                        message: res.data.errMsg,
                        type: 'error'
                    });
                }
            },
            /**
             * 7.获取患者最后一次上传档案信息
             */
            async getLastUserRecord() {
                // console.log({
                //     token:this.userInfo.token,
                //     userId:this.inData.userId,
                //     familyMemberId:this.inData.id,
                // })
                const res = await lastUserRecord({
                    token: this.userInfo.token,
                    userId: this.inData.userId,
                    familyMemberId: this.inData.id,
                });
            //console.log(res);
                if (res.data && res.data.errCode === 0) {
                    // if (this.inData == null) return;
                    if(!res.data.body) return;
                    this.showInfo.navList[3].time = res.data.body.lastDate
                } else {
                    this.$notify({
                        title: '获取成员最后一次评估相关失败',
                        message: res.data.errMsg,
                        type: 'error'
                    });
                }
            },
            /**
             * 1.医生查看成员最近随访
             */
            async getNearlyFollowup() {
                const res = await nearlyFollowup({
                    token: this.userInfo.token,
                    userId: this.inData.userId,
                    memberId: this.inData.id,
                });
            //console.log(res);
                if (res.data && res.data.errCode === 0) {
                    this.showInfo.navList[0].time = res.data.body.nearDate
                } else {
                    this.$notify({
                        title: '成员最近随访获取失败',
                        message: res.data.errMsg,
                        type: 'error'
                    });
                }
            },
            /**
             * 1.医生查看成员最近自测
             */
            async getNearlyDevice() {
                const res = await nearlyDevice({
                    token: this.userInfo.token,
                    userId: this.inData.userId,
                    memberId: this.inData.id,
                });
                // console.log(res);
                if (res.data && res.data.errCode === 0) {
                    this.showInfo.navList[2].time = res.data.body.nearlyDate
                } else {
                    this.$notify({
                        title: '成员最近自测获取失败',
                        message: res.data.errMsg,
                        type: 'error'
                    });
                }
            },
			/**
             * 切换 菜单
             */
            changeNav(index) {
                this.showInfo.index = index;
            },
            /**
             * 获取 患者信息
             */
            async getPatientInfo() {
                // console.log('enter')
                if (sessionStorage.getItem('showPatientList') === 'false') return;//新加功能
                const res = await getDoctorMessage1({
                    token: this.userInfo.token,
                    // orgCode:this.userSelfInfo.orgCode,
                    familyMemberId: this.inData.id
                });
                // console.log(res);
                if (res.data && res.data.errCode === 0) {
                    this.patientInfo = {
                        userId: res.data.body.userId,
                        id: res.data.body.id,
                        name: res.data.body.name,
                        sex: res.data.body.sex,//性别
                        age: res.data.body.age,//年龄
                        birthday: res.data.body.birthday,
                        phone: res.data.body.phone,
                        address: res.data.body.address,
                        isVisible: res.data.body.isVisible,
                        papersType: res.data.body.papersType,
                        idNo: res.data.body.identityCard//身份证
                    }
                    // this.patientInfo = res.data.body[0].name;
                } else {
                    this.$notify({
                        title: '患者信息获取失败',
                        message: res.data.errMsg,
                        type: 'error'
                    });
                }
            },

        },
        async created() {
            // console.log(this.inData);
            this.getPatientInfo();
            Promise.all([
                this.getLastAssessPlan(),
                this.getLastUserRecord(),
                this.getNearlyFollowup(),
                this.getNearlyDevice()
            ]);
        }
    }
</script>

<style scoped>
    .new-content {
        display: flex;
    }

    .new-content-nav {
        width: 3.4rem;
        min-height: 100%;
        border: 1px solid #E5E7E9;
        padding-left: 6px;
        padding-right: 22px;
        margin-right: .3rem;
    }

    .new-content-userinfo {
        padding-left: .15rem;
    }

    .new-content-headimg {
        padding-top: .18rem;
    }

    .new-content-headimg>img {
        display: block;
        width: 0.98rem;
        height: 0.98rem;
        border-radius: 50%;
        margin: 0 auto;
    }

    .new-content-username {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #97A3B4;
        line-height: 22px;
        text-align: center;
        padding-top: .18rem;
        margin-bottom: 0.43rem;
    }

    .new-content--msg-item {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #97A3B4;
        line-height: 22px;
        padding-bottom: .18rem;
    }

    .new-content-content-item {
        border-top: 1px solid;
        padding-bottom: .35rem;
        padding-left: .15rem;
        cursor: pointer;
    }

    .new-content-content-item:hover {
        background-color: #e3f5ff;
    }

    .new-content-content-item:nth-child(3n+0) {
        border-color: #0064FF;
    }

    .new-content-content-item:nth-child(3n+1) {
        border-color: #00d983;
    }

    .new-content-content-item:nth-child(3n+2) {
        border-color: #FFDB00;
    }

    .new-content-content-item-title {
        font-family: PingFangSC-Semibold;
        font-size: 13px;
        color: #002257;
        line-height: 22px;
        font-weight: bold;
    }

    .new-content-content-item-info {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #97A3B4;
        line-height: 22px;
    }

    .new-content-body {
        border: 1px solid #E5E7E9;
        flex: 1;
        display: flex;
    }

    .new-content-body-nav {
        width: 1.9rem;
        border-right: 1px solid #E5E7E9;
    }

    .new-content-body-content {
        /* background-color: grey; */
        flex: 1;
    }

    .new-content-body-nav-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 1.5rem;
        border-bottom: 1px solid #E5E7E9;
        cursor: pointer;
    }

    .new-content-body-nav-item:last-child {
        /* border: none; */
    }

    .new-content-body-nav-item-name {
        font-family: PingFangSC-Semibold;
        font-size: 13px;
        color: #002257;
        line-height: 22px;
    }

    .new-content-body-nav-item-time {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #97A3B4;
        line-height: 22px;
    }

    .new-content-body-nav-item-select {
        border-left: #00A3FF 2px solid !important;
    }
</style>