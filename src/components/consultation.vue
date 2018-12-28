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
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="类型">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<div style="display:flex">
					<el-form-item label="申请医院:">
						<el-select v-model="form.region" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="申请科室:">
						<el-select v-model="form.region" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</div>

				<el-form-item label="会诊病人:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="病人病历:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="申请时间:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="会诊目的:">
					<el-input v-model="form.name"></el-input>
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
		<!-- 医生端 -->
		<div class="consultation" v-if="oVisable">
			<div class="doc-title">
				<selftag :inData="oTab"></selftag>
				<el-button type="text" @click="centerDialogVisible = true">发起会诊</el-button>
			</div>
			<div>
				<tableList :tableData="tableData" :columns="columns" :tableBtn="tableBtn"> </tableList>
			</div>

		</div>
		<!-- 管理端 -->
		<div class="consultation" v-else>
			<div class="Admin-title">
				<normalTab :inData="oAdminTab" @reBack="getConsulTabData"></normalTab>
			</div>
			<div class="admin-oMain">
				<!-- 会诊管理 -->
				<div v-if="oconsulVisable">
					<div>
						<selftag :inData="oTab"></selftag>
						<selftag :inData="oTab"></selftag>
						<selftag :inData="oTab"></selftag>
						<selftag :inData="oTab"></selftag>
						<search @searchValue="searchChange"></search>
					</div>
					<div>
						<tableList :tableData="tableData" :columns="columns" :tableBtn="tableBtn"> </tableList>
					</div>
				</div>
				<!-- 统计 -->
				<div v-else>
					<div>
						<selftag :inData="oTab"></selftag>
					</div>
					<div>
						<normalColumnChart :inData="drawData"> </normalColumnChart>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import echarts from "../plugs/echarts.js";
import tableList from "../public/publicComponents/publicList.vue";
import selftag from "../public/publicComponents/selftag.vue";
import normalTab from "../public/publicComponents/normalTab.vue";
import normalColumnChart from "../public/publicComponents/normalColumnChart.vue";

export default {
    components: {
        selftag,
        tableList,
        normalTab,
        normalColumnChart
    },
    data() {
        return {
            oVisable: false,
            oconsulVisable: true, //切换会诊管理和统计的显示
            centerDialogVisible: false, //是否发起会诊
            evaluateVisible: false, //是否打开评价
            departVisible: false, //是否接收科室
            doctorVisible: false, //医生详情
            groupVisible: false, //会诊评价
            recordVisible: false, //查看记录
            form: "",
            oTab: {
                more: true,
                title: "日期",
                list: [
                    {
                        text: "全部"
                    },
                    {
                        text: "今日"
                    }
                ]
            }, //医生端tab
            columns: [
                {
                    prop: "name",
                    label: "姓名"
                },
                {
                    prop: "age",
                    label: "年龄"
                }
            ],
            tableData: [
                {
                    id: "91F0B9D25A474B6FA0CDBAC872035984",
                    age: "1545649424290",
                    name: "冠方医院"
                },
                {
                    id: "120BAE29C23C470E9E73DED3D8C071BF",
                    age: "1545618639429",
                    name: "测试医院"
                }
            ],
            tableBtn: [
                {
                    name: "评价",
                    oclass: "evaluateBtn",
                    method: (index, row) => {
                        this.evaluateFun(index, row);
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
            //统计图
            drawData: {
                dataAxis: [
                    "点",
                    "击",
                    "柱",
                    "子",
                    "点",
                    "击",
                    "柱",
                    "子",
                    "点",
                    "击",
                    "柱",
                    "子"
                ], //每个柱子代表的类名
                data: [
                    220,
                    182,
                    191,
                    234,
                    220,
                    182,
                    191,
                    234,
                    220,
                    182,
                    191,
                    234
                ], //具体数值
                title: "测试测试,修改修改" //图表标题
            }
        };
    },
    methods: {
        //医生端事件
        //评价
        evaluateFun(oid) {
            // alert(oid);
            this.evaluateVisible = true;
        },
        //查看记录
        recordFun() {},
        searchChange() {},
        //管理端事件
        getConsulTabData(res) {
            if (res.i == 0) {
                this.oconsulVisable = true;
            } else if (res.i == 1) {
                this.oconsulVisable = false;
            }
        }
    },
    async created() {}
};
</script>

<style>
/* 医生端样式 */
.consultation .doc-title {
    display: flex;
    display: -webkit-flex;
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
/* 管理端端样式 */
.consultation .Admin-title {
    margin-bottom: 42px;
}
.consultation .admin-oMain {
    padding: 30px 38px;
    background: #ffffff;
    border: 1px solid #e5edf3;
    box-shadow: 0 6px 36px 0 rgba(0, 62, 100, 0.04);
    border-radius: 4px;
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