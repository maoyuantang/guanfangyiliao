<template>
	<div class="medical-record">
		<div class="doc-nor-item" @click="prescriptionClick">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/上传@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">住院处方</p>
                <p class="doc-nor-item-time">最近一次处方时间 </p>
                <p class="doc-nor-item-text">此处显示最近一次处方门诊医生的处理意见或者医嘱或者其他 反正是留一段字符 备用</p>
            </div>
        </div>

        <div class="doc-nor-item" @click="medicalOrderClick">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/住院医嘱@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">住院医嘱</p>
                <p class="doc-nor-item-time">最近一次处方时间 </p>
                <p class="doc-nor-item-text">此处显示最近一次处方门诊医生的处理意见或者医嘱或者其他 反正是留一段字符 备用</p>
            </div>
        </div>

        <div class="doc-nor-item" @click="examinationClick">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/检验检查@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">检验检查</p>
                <p class="doc-nor-item-time">最近一次处方时间 </p>
                <p class="doc-nor-item-text">此处显示最近一次处方门诊医生的处理意见或者医嘱或者其他 反正是留一段字符 备用</p>
            </div>
        </div>

        <div class="doc-nor-item" @click="reportClick">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/体检报告@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">体检报告</p>
                <p class="doc-nor-item-time">最近一次处方时间 </p>
                <p class="doc-nor-item-text">此处显示最近一次处方门诊医生的处理意见或者医嘱或者其他 反正是留一段字符 备用</p>
            </div>
        </div>

        <div class="doc-nor-item" @click="imageClick">
            <div class="doc-nor-item-left">
                <img src="../../../static/assets/img/综合影像@2x.png" alt="" srcset="">
            </div>
            <div class="doc-nor-item-right">
                <p class="doc-nor-item-title">综合影像</p>
                <p class="doc-nor-item-time">最近一次处方时间 </p>
                <p class="doc-nor-item-text">此处显示最近一次处方门诊医生的处理意见或者医嘱或者其他 反正是留一段字符 备用</p>
            </div>
        </div>

        
        <el-dialog
        title=" "
        append-to-body
        :visible.sync="prescription.show"
        :fullscreen="true"
        :before-close="prescriptionClose"
        >
            <div class="prescription">
                <Timeline>
                    <TimelineItem>
                        <p class="visiting-hospital">重庆市医科大学第三附属医院</p>
                        <p class="visiting-department">
                            <span class="visiting-department-on">on</span>
                            <span class="visiting-department-name">科室名称  |  门诊</span>
                        </p>
                        <div class="visiting-content">
                            <div class="visiting-content-info">
                                <div class="visiting-content-info-left"><span>R:</span></div>
                                <div class="visiting-content-info-right">
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
                            <div class="visiting-content-btn">
                                <el-button type="danger" size="mini" plain>看处方</el-button>
                            </div>
                        </div>
                    </TimelineItem>
                    <TimelineItem>
                        <p class="visiting-hospital">重庆市医科大学第三附属医院</p>
                        <p class="visiting-department">
                            <span class="visiting-department-on">on</span>
                            <span class="visiting-department-name">科室名称  |  门诊</span>
                        </p>
                        <div class="visiting-content">
                            <div class="visiting-content-info">
                                <div class="visiting-content-info-left"><span>R:</span></div>
                                <div class="visiting-content-info-right">
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
                            <div class="visiting-content-btn">
                                <el-button type="danger" size="mini" plain>看处方</el-button>
                            </div>
                        </div>
                    </TimelineItem>
                </Timeline>
            </div>
        </el-dialog>
	</div>
</template>

<script>
	export default {
        props:[
            "inData"
        ],
		watch:{
			
		},
		data () {
			return {
				prescription:{//住院处方  
                    show:false, 
                },
                medicalOrder:{//住院医嘱
                    show:false,
                },
                examination:{//检验检查
                    show:false,
                },
                report:{//体检报告
                    show:false,
                },
                image:{//综合影像
                    show:false,
                }
			}
		},
		computed:{
			
		},
		methods:{
            /**
             * 切换显示弹窗
             */
            changeAlert(item){
                const showMap = {
                    prescription:false,
                    medicalOrder:false,
                    examination:false,
                    report:false,
                    image:false,
                }
                showMap[item] = true;
                for(const i in showMap){
                    this[i].show = showMap[i]
                }
            },
            /**
             * 住院处方 被点击
             */
            prescriptionClick(){
                console.log('住院处方 被点击');
                this.prescription.show = true;
            },
            /**
             * 住院医嘱 被点击
             */
            medicalOrderClick(){
                console.log('住院医嘱 被点击')
            },
            /**
             * 检验检查 被点击
             */
            examinationClick(){
                console.log('检验检查 被点击')
            },
            /**
             * 体检报告  被点击
             */
            reportClick(){
                console.log('体检报告 被点击')
            },
            /**
             * 综合影像 被点击
             */
            imageClick(){
                console.log('综合影像 被点击')
            },
            //////////////
            prescriptionClose(){//住院处方 关闭
                this.prescription.show = false;
            },
		},
		components:{
            
		},
		async created(){
            console.log(this.inData)
		}
	}
</script>

<style scoped>
	.medical-record{
		display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 0.2rem;
	}
	.doc-nor-item{
        display: flex;
        background: #FFFFFF;
        border: 1px solid #E1E8EE;
        border-radius: 4px;
        width: 6.7rem;
        height: 1.62rem;
        margin-bottom: 0.15rem;
    }
    .doc-nor-item-left{
        flex:1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
	.doc-nor-item-right{
        flex:3;
    }
    .doc-nor-item-title{
        margin-top: 0.28rem;
        color: var(--color18);
        line-height: 0.22rem;
        font-weight: bold;
    }
    .doc-nor-item-time{
        font-family: var(--fontFamily3);
        font-size: var(--fontSize1);
        color: var(--color19);
        line-height: 0.22rem;
    }
    .doc-nor-item-text{
        font-family: var(--fontFamily3);
        font-size: var(--fontSize1);
        color: var(--color19);
        line-height: 0.22rem;
    }
    /* ///////////// */
    .visiting-hospital{
        color: var(--color18);
        line-height: 0.22rem;
    }
	.visiting-department-on{
        font-family: var(--fontFamily4);
        font-size: var(--fontSize1);
        color: var(--color19);
        line-height: 0.22rem;
    }
    .visiting-department-name{
        font-size: var(--fontSize1);
        color: var(--borderColor5);
    }
    .visiting-content{
        height: 0.76rem;
        background: #F3F6FA;
        border-radius: 4px;
        display: flex;
    }
    .visiting-content-info{
        flex:9;
        display: flex;
        /* background: red; */
    }
    .visiting-content-btn{
        flex:1;
        /* background: green; */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .visiting-content-info-left{
        display: inline-block;
    }
    .visiting-content-info-right{
        flex: 1;
    }
    .visiting-content-info-right-span{
        padding-right: 0.3rem;
    }
</style>
</style>