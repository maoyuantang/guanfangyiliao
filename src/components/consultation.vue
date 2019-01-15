<template>
	<!-- 远程会诊系统 -->
	<div class="consultation">
		远程会诊系统

		<el-button type="text" @click="evaluateVisible = true">评价</el-button>
		<el-button type="text" @click="departVisible = true">接收科室</el-button>
		<el-button type="text" @click="doctorVisible = true">医生详情</el-button>
		<el-button type="text" @click="groupVisible = true">会诊评价</el-button>
		<el-button type="text" @click="recordVisible = true">查看记录</el-button>
		会诊评价
		<!-- 发起会诊弹窗 -->
		<el-dialog class="startGroup" title="发起会诊" :visible.sync="centerDialogVisible" width="602px" hight="607px" center>
			<el-form ref="form" :model="startHz" label-width="80px">
				<el-form-item label="类型">
					<el-radio-group v-model="startHz.type">
						<el-radio label="专科会诊"></el-radio>
						<el-radio label="专家会诊"></el-radio>
					</el-radio-group>
				</el-form-item>
				<div style="display:flex">
					<el-form-item label="申请医院:">
						<el-select placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="申请科室:">
						<el-select v-model="startHz.deptId" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</div>

				<el-form-item label="会诊病人:">
					<el-input v-model="startHz.userId"></el-input>
				</el-form-item>
				<el-form-item label="病人病历:">
					<el-input v-model="startHz.medicalHistory"></el-input>
				</el-form-item>
				<el-form-item label="申请时间:">
					<el-input v-model="startHz.applicationTime"></el-input>
				</el-form-item>
				<el-form-item label="会诊目的:">
					<el-input v-model="startHz.consultationPurpose"></el-input>
				</el-form-item>
				<el-form-item class="confirmBtnBox">
					<el-button class="confirmBtn" type="primary">确认</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 打开评价 -->
		<el-dialog class="evaluateBox" title=" " :visible.sync="evaluateVisible" width="602px" hight="356px" center>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item class="evaluateMargin evaluateMargin1">
					<el-input class="evaluateInput" type="textarea" v-model="form.desc" placeholder="请选择活动区域"></el-input>
				</el-form-item>

				<el-form-item class="evaluateMargin">
					<el-button class="confirmBtn" type="primary">确认</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 接收科室 -->
		<el-dialog class="evaluateBox" title=" 接收科室" :visible.sync="departVisible" width="602px" hight="356px" center>
			<ul>
				<li>
					<div>
						<img src="" />
					</div>
					<div class="evaluateCont">
						<h5>西南医院第三附属医院</h5>
						<div>神经内科</div>
					</div>
				</li>
				<li>
					<div>
						<img src="" />
					</div>
					<div class="evaluateCont">
						<h5>西南医院第三附属医院</h5>
						<div>神经内科</div>
					</div>
				</li>
			</ul>
		</el-dialog>
		<!-- 医生详情 -->
		<el-dialog class="evaluateBox evaluateBox2" title=" 医生详情" :visible.sync="doctorVisible" width="602px" hight="356px" center>
			<ul>
				<li>
					<div>
						<img src="" />
					</div>
					<div class="evaluateCont">
						<h5>西南医院第三附属医院</h5>
						<div>神经内科</div>
					</div>
					<div>
						文字
					</div>
				</li>
				<li>
					<div>
						<img src="" />
					</div>
					<div class="evaluateCont">
						<h5>西南医院第三附属医院</h5>
						<div>神经内科</div>
					</div>
					<div>
						文字
					</div>
				</li>
			</ul>
		</el-dialog>
		<!-- 会诊评价 -->
		<el-dialog class="evaluateBox evaluateBox2" title=" 会诊评价" :visible.sync="groupVisible" width="602px" hight="356px" center>
			<ul>
				<li>
					<div>
						<img src="" />
					</div>
					<div class="evaluateCont">
						<h5>西南医院第三附属医院</h5>
						<div>神经内科</div>
					</div>
					<div>
						文字
					</div>
				</li>
				<li>
					<div>
						<img src="" />
					</div>
					<div class="evaluateCont">
						<h5>西南医院第三附属医院</h5>
						<div>神经内科</div>
					</div>
					<div>
						文字
					</div>
				</li>
			</ul>
		</el-dialog>
		<!-- 查看记录 -->
		<el-dialog class="  " title="  " :visible.sync="recordVisible" width="602px" hight="356px" center>
			<ul>
				<li class="ohisList">
					<h3>2018年4月4日</h3>
					<ul>
						<li class="ohisListMain">
							<div>
								<img src="../assets/a-6.png" />
							</div>
							<div class="ohisListRg">
								<div>张某人
									<span> 17:54:34</span>
								</div>
								<div>那就等带节后再说吧。</div>
							</div>
						</li>
					</ul>
				</li>
				<li class="ohisList">
					<h3>2018年4月4日</h3>
					<ul>
						<li class="ohisListMain">
							<div>
								<img src="../assets/a-6.png" />
							</div>
							<div class="ohisListRg">
								<div>张某人
									<span> 17:54:34</span>
								</div>
								<div>那就等带节后再说吧。</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</el-dialog>
		<!-- 管理端 -->
		<div class="consultation" v-if="oVisable">
			<div class="Admin-title">
				<normalTab :inData="oAdminTab" @reBack="getConsulTabData"></normalTab>
			</div>
			<div class="admin-oMain">
				<!-- 会诊管理 -->
				<div v-if="oconsulVisable">
					<div class="mainTab">
						<div>
							<selftag :inData="oTab1" @reback="getOTab1"></selftag>
							<selftag :inData="oTab1" @reback="getOTab11"></selftag>
							<selftag :inData="oTab2" @reback="getOTab2"></selftag>
							<selftag :inData="oTab3" @reback="getOTab3"></selftag>
						</div>

						<search @searchValue="adminSearchChange"></search>
					</div>
					<div>
						<tableList :tableData="adminTableData" :columns="columns" :tableBtn="tableBtn"> </tableList>
					</div>
				</div>
				<!-- 统计 -->
				<div v-else>
					<div class="mainTab">
						<div>
							<selftag :inData="oTab1"  @reback="getOTab1"></selftag>
						</div>
						<statisticsWay @reBack="getTjData"></statisticsWay>
					</div>
					<div style="display:flex">
						<normalColumnChart :inData="drawData"> </normalColumnChart>
						<normalColumnChart :inData="drawDataStart"> </normalColumnChart>
						{{drawDataStart}}
					</div>
				</div>
			</div>
		</div>
		<!-- 医生端 -->
		<div class="consultation" v-else>
			<div class="doc-title">
				<selftag :inData="oTab4"></selftag>
				<div class="statistics-way">
					<span>时间段：</span>
					<el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
				<el-button class="startConsul" type="text" @click="centerDialogVisible = true">发起会诊</el-button>
			</div>

			<div>
				<tableList :tableData="docTableData" :columns="columnsDoc" :tableBtn="docTableBtn"> </tableList>
			</div>

		</div>

	</div>
</template>
<script>
import {
    managerGetPlanList,
    managerGetDeviceList,
    fetchHospitalDepts,
    queryByManagerPage,
    queryByAppraiseList,
	queryStatisticalByApplication,
	queryStatisticalBySponsor
} from "../api/apiAll.js";
import { mapState } from "vuex";
import echarts from "../plugs/echarts.js";
import tableList from "../public/publicComponents/publicList.vue";
import selftag from "../public/publicComponents/selftag.vue";
import normalTab from "../public/publicComponents/normalTab.vue";
import normalColumnChart from "../public/publicComponents/normalColumnChart.vue";
import search from "../public/publicComponents/search.vue";
import statisticsWay from "../public/publicComponents/statisticsWay.vue";

export default {
    components: {
        selftag,
        tableList,
        normalTab,
        normalColumnChart,
        search,
        statisticsWay
    },
    data() {
        return {
            oVisable: true,
            oconsulVisable: true, //切换会诊管理和统计的显示
            centerDialogVisible: false, //是否发起会诊
            evaluateVisible: false, //是否打开评价
            departVisible: false, //是否接收科室
            doctorVisible: false, //医生详情
            groupVisible: false, //会诊评价
            recordVisible: false, //查看记录
            applicationDeptId: "", //发起科室
            receiveDeptId: "", //接收科室
            searchValue: "", //管理端搜索框
            adminType: "",
            adminStatus: "",
            statisticsStart: "",
            statisticsType: "DEPT",
            statisticsEnd: "",
            departmentsId: "",

            form: "",
            oTab1: {
                more: true,
                title: "全部",
                list: [
                    {
                        text: "全部"
                    }
                ]
            },
            oTab2: {
                more: false,
                title: "全部",
                list: [
                    {
                        text: "全部"
                    },
                    {
                        text: "专科会诊",
                        value: "SPECIALIST"
                    },
                    {
                        text: "专家会诊",
                        value: "EXPERT"
                    }
                ]
            },
            oTab3: {
                more: false,
                title: "全部",
                list: [
                    {
                        text: "全部"
                    },
                    {
                        text: "未开始",
                        value: "NEW"
                    },
                    {
                        text: "进行中",
                        value: "UNDERWAY"
                    },
                    {
                        text: "结束",
                        value: "OVER"
                    }
                ]
            },
            //医生端
            oDocTime: "",
            startDate: "",
            endDate: "",
            startHz: {
                type: "会诊类型",
                deptId: "发起科室ID",
                userId: "会诊病人ID",
                medicalHistory: "病历",
                applicationTime: "申请时间",
                consultationPurpose: "目的",
                consultationHospitalDept: [
                    {
                        hospitalId: "申请医院ID",
                        departmentsId: "申请科室ID"
                    }
                ]
            },
            oTab4: {
                more: false,
                title: "全部",
                list: [
                    {
                        text: "全部",
                        value: "ALL"
                    },
                    {
                        text: "今日",
                        value: "TODAY"
                    }
                ]
            },
            columnsDoc: [
                {
                    prop: "consultationId",
                    label: "会诊编号"
                },
                {
                    prop: "hospital",
                    label: "发起医院"
                },
                {
                    prop: "department",
                    label: "发起科室"
                },
                {
                    prop: "doctor",
                    label: "发起医生"
                },
                {
                    prop: "applicationTime",
                    label: "发起时间"
                },
                {
                    prop: "type",
                    label: "会诊类型"
                },
                {
                    prop: "consultationPurpose",
                    label: "目的"
                },
                {
                    prop: "doctorNumber",
                    label: "参与专家"
                },
                {
                    prop: "status",
                    label: "状态"
                }
            ],
            columns: [
                {
                    prop: "consultationId",
                    label: "会诊编号"
                },
                {
                    prop: "hospital",
                    label: "发起医院"
                },
                {
                    prop: "department",
                    label: "发起科室"
                },
                {
                    prop: "doctor",
                    label: "发起医生"
                },
                {
                    prop: "applicationTime",
                    label: "发起时间"
                },
                {
                    prop: "type",
                    label: "会诊类型"
                },
                {
                    prop: "userName",
                    label: "会诊病人"
                },
                {
                    prop: "startTime",
                    label: "会诊时间"
                },
                {
                    prop: "consultationTimeNumber",
                    label: "会诊用时"
                },
                {
                    prop: "receiveDeptNumber",
                    label: "接收科室"
                },
                {
                    prop: "medicalHistory",
                    label: "病历"
                },
                {
                    prop: "doctorNumber",
                    label: "参与专家"
                },
                {
                    prop: "status",
                    label: "状态"
                }
            ],
            adminTableData: [], //管理端列表
            docTableData: [], //医生端列表
            tableBtn: [
                {
                    name: "查看记录",
                    oclass: "recordBtn",
                    method: (index, row) => {
                        this.recordFun(index, row);
                    }
                }
            ],
            docTableBtn: [
                {
                    name: "病历",
                    oclass: "recordBtn",
                    method: (index, row) => {
                        this.recordFun(index, row);
                    }
                },
                {
                    name: "查看记录",
                    oclass: "recordBtn",
                    method: (index, row) => {
                        this.recordFun(index, row);
                    }
                }
            ],
            oAdminTab: {
                i: 0, //选中的是第几项，类型为int(注意：从0开始计数)
                list: [
                    //选项列表，类型Array
                    {
                        en: "CONSULTATION", //选项英文，类型 string
                        zh: "会诊管理" //选项中文，类型string
                    },
                    {
                        en: "STATISTICS",
                        zh: "统计"
                    }
                ]
            },
            //申请科室统计图
            drawData: {
                dataAxis: [
                ], //每个柱子代表的类名
                data: [
                ], //具体数值
                title: " ", //图表标题
                totalNumber: "555"
			},
			//发起科室统计图
            drawDataStart: {
                dataAxis: [
                ], //每个柱子代表的类名
                data: [
                ], //具体数值
                title: " ", //图表标题
                totalNumber: "555"
            }
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    methods: {
        // 管理端事件
        getOTab1(data) {
			this.applicationDeptId = data.index.value;
			this.getAdminList();
			this.getAdminTjList();
			this.getApplyTjList();
        },
        getOTab11(data) {
            this.receiveDeptId = data.index.value;
            this.getAdminList();
        },
        getOTab2(data) {
            this.adminType = data.index.value;
            this.getAdminList();
        },
        getOTab3(data) {
            this.adminStatus = data.index.value;
            this.getAdminList();
        },
        //查看记录
        recordFun() {
            this.recordVisible = true;
        },
        //医生端事件
        getOTab4(data) {
            this.oDocTime = data.index.value;
            this.getDocList();
        },

        adminSearchChange(data) {
            this.searchValue = data;
            this.getAdminList();
        },
        //管理端事件
        getConsulTabData(res) {
            if (res.i == 0) {
                this.oconsulVisable = true;
            } else if (res.i == 1) {
                this.oconsulVisable = false;
            }
        },
        //获取科室列表
        async getDepartment() {
            let _this = this;
            let query = {
                orgCode: this.userSelfInfo.orgCode,
                deptId: ""
            };
            const res = await fetchHospitalDepts(query);
            if (res.data && res.data.errCode === 0) {
                console.log(res.data.body);
                if (res.data.body.length > 6) {
                    this.oTab1.more = true;
                } else {
                    this.oTab1.more = false;
                }
                $.each(res.data.body, function(index, text) {
                    _this.oTab1.list.push({
                        text: text.deptName,
                        value: text.deptId
                    });
                });
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //获取管理端列表
        async getAdminList() {
            let _this = this;
            const options = {
                token: this.userState.token,
                searchKey: this.searchValue,
                applicationDeptId: this.applicationDeptId,
                receiveDeptId: this.receiveDeptId,
                pageNum: 1,
                pageSize: 10,
                type: this.adminType,
                status: this.adminStatus
            };
            const res = await queryByManagerPage(options);
            if (res.data && res.data.errCode === 0) {
                this.adminTableData = res.data.body.data2.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //获取管理端申请科室统计列表
        async getApplyTjList() {
			this.drawData.dataAxis=[];
			this.drawData.data=[]
            let _this = this;
            const options = {
                token: this.userState.token,
                type: this.statisticsType,
                startDate: this.statisticsStart,
                endDate: this.statisticsEnd,
                deptId: this.applicationDeptId
            };
            const res = await queryStatisticalByApplication(options);
            if (res.data && res.data.errCode === 0) {
                $.each(res.data.body.data, function(index, text) {
                    _this.drawData.dataAxis.push(text.unit);
                    _this.drawData.data.push(text.number);
                });
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
		},
		        //获取管理端发起科室统计列表
        async getAdminTjList() {
			this.drawDataStart.dataAxis=[];
			this.drawDataStart.data=[]
            let _this = this;
            const options = {
                token: this.userState.token,
                type: this.statisticsType,
                startDate: this.statisticsStart,
                endDate: this.statisticsEnd,
                deptId: this.applicationDeptId
            };
            const res = await queryStatisticalBySponsor(options);
            if (res.data && res.data.errCode === 0) {
                $.each(res.data.body.data, function(index, text) {
                    _this.drawDataStart.dataAxis.push(text.unit);
					_this.drawDataStart.data.push(text.number);
                });
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //获取统计类型
        getTjData(data) {
			console.log(data)
			this.statisticsType = data.select.value;
			this.statisticsStart=data.time[0]
			this.statisticsEnd=data.time[1]
			this.getAdminTjList();
			this.getApplyTjList();

        },
        //获取医生端列表
        async getDocList() {
            let _this = this;
            const options = {
                token: this.userState.token,
                dateType: this.oDocTime,
                startDate: this.startDate,
                endDate: this.endDate,
                pageNum: 1,
                pageSize: 10
            };
            const res = await queryByManagerPage(options);
            if (res.data && res.data.errCode === 0) {
                this.docTableData = res.data.body.data2.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        }
    },
    async created() {
        this.getDepartment();
        this.getAdminList();
        this.getDocList();
		this.getAdminTjList();
		this.getApplyTjList();
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
.consultation .doc-title {
    display: flex;
    display: -webkit-flex;
    margin-bottom: 52px;
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
.startConsul {
    width: 196px;
    height: 40px;
    background: #4da1ff;
    border-radius: 4px;
    font-family: PingFangSC-Semibold;
    font-size: 22px;
    color: #ffffff;
    letter-spacing: 0.92px;
    text-align: center;
    line-height: 0px;
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
.consultation {
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
    margin-left: 0;
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
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
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
</style>