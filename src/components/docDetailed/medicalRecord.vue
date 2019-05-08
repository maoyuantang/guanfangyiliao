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

        <!-- 住院处方 弹窗 -->
        <el-dialog :close-on-click-modal="false"
        title=" "
        append-to-body
        :visible.sync="prescription.show"
        :fullscreen="true"
        :before-close="prescriptionClose"
        >
            <div class="prescription">
                <Timeline>
                    <TimelineItem v-for="(item,index) in 5" :key="index">
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
                                <el-button type="danger" size="mini" @click="prescriptionDetailsClick" plain>看处方</el-button>
                            </div>
                        </div>
                    </TimelineItem>
                </Timeline>
            </div>
        </el-dialog>

        <!-- 住院医嘱 弹窗 -->
        <el-dialog :close-on-click-modal="false"
        title=" "
        append-to-body
        :visible.sync="medicalOrder.show"
        :fullscreen="true"
        :before-close="medicalOrderClose"
        >
        <div class="medicalOrder">
            <div class="medicalOrder-top">
                <p class="medicalOrder-top-item">医嘱名称</p>
                <p class="medicalOrder-top-item">用法</p>
                <p class="medicalOrder-top-item">开始时间</p>
                <p class="medicalOrder-top-item">结束时间</p>
                <p class="medicalOrder-top-item">频次</p>
                <p class="medicalOrder-top-item">数量</p>  
                <p class="medicalOrder-top-item">执行情况</p>      
            </div>
            <div class="medicalOrder-body">
                <div class="medicalOrder-body-list" v-for="(item,index) in 5" :key="index">
                    <div class="medicalOrder-body-list-item">
                        <p class="medicalOrder-body-list-item-item">头孢硫脒[乙]</p>
                        <p class="medicalOrder-body-list-item-item">静脉滴入</p>
                        <p class="medicalOrder-body-list-item-item">2018-05-22  08:22:21</p>
                        <p class="medicalOrder-body-list-item-item">2018-05-22  08:22:21</p>
                        <p class="medicalOrder-body-list-item-item">每天一次</p>
                        <p class="medicalOrder-body-list-item-item">0.2g</p>
                        <p class="medicalOrder-body-list-item-item medicalOrder-body-list-item-item-status">执行中</p>
                    </div>
                    <div class="medicalOrder-body-list-item">
                        <p class="medicalOrder-body-list-item-item">头孢硫脒[乙]</p>
                        <p class="medicalOrder-body-list-item-item">静脉滴入</p>
                        <p class="medicalOrder-body-list-item-item">2018-05-22  08:22:21</p>
                        <p class="medicalOrder-body-list-item-item">2018-05-22  08:22:21</p>
                        <p class="medicalOrder-body-list-item-item">每天一次</p>
                        <p class="medicalOrder-body-list-item-item">0.2g</p>
                        <p class="medicalOrder-body-list-item-item medicalOrder-body-list-item-item-status">执行中</p>
                    </div>
                </div>
            </div>
        </div>
        </el-dialog>

        <!-- 检验检查 弹窗 -->
        <el-dialog :close-on-click-modal="false"
        title=" "
        append-to-body
        :visible.sync="examination.show"
        :fullscreen="true"
        :before-close="examinationClose"
        >
        <div class="examination">
            <Timeline>
                <TimelineItem>
                    <p class="visiting-hospital">重庆市医科大学第三附属医院</p>
                    <p class="visiting-department">
                        <span class="visiting-department-on">on</span>
                        <span class="visiting-department-name">科室名称  |  门诊</span>
                    </p>
                    <div class="visiting-content-spe">
                        <div class="visiting-content-info">
                            <div class="visiting-content-info-left-change"></div>
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
        </div>
        </el-dialog>

        <!-- 体检报告 弹窗 -->
        <el-dialog :close-on-click-modal="false"
        title=" "
        append-to-body
        :visible.sync="report.show"
        :fullscreen="true"
        :before-close="reportClose"
        >
        <div class="report">
            <Timeline>
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
            </Timeline>
        </div>
        </el-dialog>

        <!-- 体检报告详情 弹窗 -->
        <el-dialog :close-on-click-modal="false"
        title=" "
        append-to-body
        :visible.sync="reportDetails.show"
        :fullscreen="true"
        :before-close="reportDetailsClose"
        >
        <div class="report-details">
            <div class="report-details-top">
                <div class="report-details-headimg">
                    <img src="./../../../static/assets/img/a-6.png" alt="">
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
        </el-dialog>

        <!-- 综合影像 弹窗 -->
        <el-dialog :close-on-click-modal="false"
        title=" "
        append-to-body
        :visible.sync="image.show"
        :fullscreen="true"
        :before-close="imageClose"
        >
        <div class="image">
            <div class="image-item">
                <div class="image-item-head">
                    <span class="image-item-head-name">张丽丽</span>
                    <span class="image-item-head-vice">性别: 女</span>
                    <span class="image-item-head-vice">年龄: 38</span>
                </div>
                <div class="image-item-body">
                    <div class="image-item-body-item-spe">
                        <span>检查ID: 460523</span>
                    </div>
                    <div class="image-item-body-item-spe">
                        <span>重庆市医科大学第三附属医院</span>
                        <span class="image-item-body-item-spe-time">2017.08.09</span>
                    </div>
                </div>
            </div>

            <div class="image-item">
                <div class="image-item-head">
                    <span class="image-item-head-name">影像所见</span>
                </div>
                <div class="image-item-body">
                    <p class="image-item-body-item">胸部CT平扫示，胸廓对称，胸壁软组织结构清晰。气管纵隔局中，纵隔内未见明显肿大淋巴结。气管支气管开口通常。两肺内见斑片状、多发粟粒结节影，密度不均，部分病变内见点状钙化影。双侧胸腔内未见液性密度影。心影大小形态未见异常。</p>
                </div>
            </div>

            <div class="image-item">
                <div class="image-item-head">
                    <span class="image-item-head-name">诊断结论</span>
                </div>
                <div class="image-item-body">
                    <p class="image-item-body-item">两肺病变，考虑结核伴钙化</p>
                </div>
            </div>

            <div class="image-btn-div">
                <el-button type="primary" @click="seeImageClick">查看影像</el-button>
            </div>
        </div>
        </el-dialog>

        <!-- 综合影像 弹窗 -->
        <el-dialog :close-on-click-modal="false"
        title=" "
        append-to-body
        :visible.sync="seeImage.show"
        :fullscreen="true"
        :before-close="seeImageClose"
        >
        <div class="see-image">
            <img src="./../../../static/assets/img/a-6.png" alt="">
        </div>
        </el-dialog>

        <!-- 检验检查列表（详细） 弹窗 -->
        <el-dialog :close-on-click-modal="false"
        title=" "
        append-to-body
        :visible.sync="examinationDetails.show"
        :fullscreen="true"
        :before-close="examinationDetailsClose"
        >
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

        <!-- 处方详情 弹窗 -->
        <el-dialog :close-on-click-modal="false"
        title=" "
        append-to-body
        :visible.sync="prescriptionDetails.show"
        :fullscreen="true"
        :before-close="prescriptionDetailsClose"
        >
        <div class="see-image">
            <img src="./../../../static/assets/img/a-6.png" alt="">
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
                prescriptionDetails:{//处方详情
                    show:false, 
                },
                medicalOrder:{//住院医嘱
                    show:false,
                },
                examination:{//检验检查
                    show:false,
                },
                examinationDetails:{//检验检查列表（详细）
                    show:false,
                },
                report:{//体检报告
                    show:false,
                },
                reportDetails:{//体检报告 详情
                    show:false,
                },
                image:{//综合影像
                    show:false,
                },
                seeImage:{//查看影像
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
                // if(!showMap[item])return;
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
                this.changeAlert('prescription');
            },
            /**
             * 住院医嘱 被点击
             */
            medicalOrderClick(){
                console.log('住院医嘱 被点击')
                this.changeAlert('medicalOrder');
            },
            /**
             * 检验检查 被点击
             */
            examinationClick(){
                console.log('检验检查 被点击')
                this.changeAlert('examination');
            },
            /**
             * 体检报告  被点击
             */
            reportClick(){
                console.log('体检报告 被点击')
                this.changeAlert('report');
            },
            /**
             * 综合影像 被点击
             */
            imageClick(){
                console.log('综合影像 被点击')
                this.changeAlert('image');
            },
            /**
             * 处方详情 详情 弹窗
             */
            prescriptionDetailsClick(){
                this.prescriptionDetails.show = true;
            },
            /**
             * 检验检查列表（详细） 被点击
             */
            examinationDetailsClick(){
                this.examinationDetails.show = true;
            },
            /**
             * 体检报告 详情 弹窗
             */
            reportDetailsClick(){
                this.reportDetails.show = true;
            },
            /**
             * 查看影像 弹窗
             */
            seeImageClick(){
                this.seeImage.show = true;
            },
            //////////////
            /**
             * 住院处方 关闭
             */
            prescriptionClose(){
                this.prescription.show = false;
            },
            /**
             * 住院医嘱 关闭
             */
            medicalOrderClose(){
                this.medicalOrder.show = false;
            },
            /**
             * 检验检查 关闭
             */
            examinationClose(){
                this.examination.show = false;
            },
            /**
             * 体检报告 关闭
             */
            reportClose(){
                this.report.show = false;
            },
            /**
             * 体检报告详情 关闭
             */
            reportDetailsClose(){
                this.reportDetails.show = false;
            },
            /**
             * 综合影像 关闭
             */
            imageClose(){
                this.image.show = false;
            },
            /**
             * 综合影像 关闭
             */
            seeImageClose(){
                this.seeImage.show = false;
            },
            /**
             *检验检查列表（详细） 关闭 
             */
            examinationDetailsClose(){
                this.examinationDetails.show = false;
            },
            /**
             *处方详情 关闭 
             */
            prescriptionDetailsClose(){
                this.prescriptionDetails.show = false;
            },
		},
		components:{
            
		},
		async created(){
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
        padding-left: 0.15rem;
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
    .medicalOrder-top{
        display: flex;
        background-color: #E9C457;
        height: 0.48rem;
    }
    .medicalOrder-top-item{
        flex:1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: MicrosoftYaHei;
        font-size: var(--fontSize4);
        color: rgba(0,0,0,0.87);
    }
    .medicalOrder-body-list-item{
        display: flex;
        height: 0.48rem;
    }
    .medicalOrder-body-list-item-item{
        flex:1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: MicrosoftYaHei;
        font-size: var(--fontSize4);
        color: var(--color20);
    }
    .medicalOrder-body-list:nth-of-type(odd){
        background-color: #F1F5F8;
    }
    .medicalOrder-body-list-item-item-status{
        color: #108E26;
    }
    .visiting-content-info-left-change{
        flex: 1;
    }
    .visiting-content-info-right-change{
        flex: 3;
    }
    .visiting-content-info-right-change-table{
        width: 100%;
    }
    .visiting-content-spe{
        background: #F3F6FA;
        border-radius: 4px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
    .visiting-content-info-right-inner{
        display: flex;
        align-items: center;
        height: 100%;
    }
    .report-details-top{
        display: flex;
        align-items: center;
        padding-left: 1rem;
    }
    .report-details-headimg{
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.2rem;
    }
    .report-details-headimg>img{
        display: block;
        width:100%;
        height: 100%;
        border-radius: 50%;
    }
    .report-details-info-item{
        margin-right: 1rem;
    }
    .report-details-info-item-child2{
        margin-top: 0.1rem;
    }
    .report-details-content-item-body-item{
        display: flex;
       border-bottom: 1px solid white;
       box-sizing: border-box;
    }
    .report-details-content-item-body-item-name{
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
    .report-details-content-item-body-item-value{
        flex: 1;
        padding-left: 0.2rem;
        padding-top: 0.1rem;
    }
    .report-details-content-item-head{
        height: 0.56rem;
        background-color: #E9C457;
        display: flex;
        padding-left: 0.2rem;
        align-items: center;
        font-family: MicrosoftYaHei;
        font-size: var(--fontSize4);
        color: rgba(0,0,0,0.87);
    }
    .image{
        /* border: 1px solid red; */
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .image-item-head{
        display: flex;
        justify-content: space-between;
    }
    .image-item-head-name{
        font-family: var(--fontFamily3);
        font-size: 0.34rem;
        color: #030303;
    }
    .image-item-head-vice{
        font-family: var(--fontFamily3);
        font-size: var(--fontSize6);
        color: var(--color20)
    }
    .image-item-body-item-spe{
        display: flex;
        justify-content: space-between;
        font-family: var(--fontFamily3);
        font-size: var(--fontSize6);
        color: #281012;
        padding-top: .4rem;
    }
    .image-item-body-item-spe-time{
        font-family: var(--fontFamily3);
        font-size: var(--fontSize6);
        color: #646464;
    }
    .image-item{
        padding-bottom: .45rem;
    }
    .image-item-body-item{
        font-family: var(--fontFamily3);
        font-size: var(--fontSize9);
        color: #5D5D5D;
    }
    .image-item-body{
        /* padding-top: .4rem; */
    }
    .image-btn-div{
        text-align: right;
    }
    .see-image{
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
    }
    .examination-details-table{
        width: 100%;
    }
    .examination-details-table tr{
        display: flex;
    }
    .examination-details-table th{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0.48rem;;
    }
    .examination-details--thead tr{
        background-color: #ecedf2;
    }
    .examination-details-tbody tr:nth-of-type(even){
        background: #f8f7fc;
    }
    .examination-details-content{
        box-sizing: border-box;
        border-top: 0.14rem solid #eaedf2;
        border-left: 0.06rem solid #eaedf2;
        border-right: 0.06rem solid #eaedf2;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
    }
    .examination-details-content-head{
        height: 0.72rem;
        display: flex;
        border-bottom: 0.1rem solid #eaedf2;
    }
    .examination-details-content-head p{
        display: flex;
        font-size: var(--fontSize5);
        font-weight: bold;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .examination-details-content-body-tip{
        font-size: var(--fontSize3);
        color: #f7a060;
    }
</style>