<template>
	<div class="followUp">
		<!-- 管理端 -->
		<div v-if="oVisable">
			<div class="Admin-title">
				<normalTab :inData="oAdminTab" @reBack="getConsulTabData"></normalTab>
			</div>

			<div class="admin-oMain">
				<!-- 随访管理 -->
				<div v-show="0==oMainShow">
					<div class="mainTab">
						<div>
							<selftag :inData="oTab"></selftag>
							<selftag :inData="oTab"></selftag>
							<selftag :inData="oTab"></selftag>
							<selftag :inData="oTab"></selftag>
						</div>

						<search @searchValue="searchChange"></search>
					</div>
					<div>
						<tableList :tableData="tableDataList" :columns="columns" :tableBtn="tableBtn"></tableList>
						<!-- <el-pagination background layout="prev, pager, next" :total="total" :page-size="opageSize" @current-change="seeCurrentChange">
                        </el-pagination> -->
					</div>
				</div>
				<!-- 满意度调查 -->
				<div  v-show="1==oMainShow">
					<div style="display:flex;">
						<ul class="followUp2-tab">
							<li :class="{followUp2This:indexTab2==index}" v-for="(text,index) in followUpTab" :key="index" @click="followUp2Fun(index)">{{text.name}}</li>
						</ul>
						<search @searchValue="searchChange"></search>
					</div>

					<div class="mainTab">
						<div>
							<selftag :inData="oTab"></selftag>
							<selftag :inData="oTab"></selftag>
							<selftag :inData="oTab"></selftag>
						</div>

						<el-button class="startConsul" type="text" @click="centerDialogVisible = true">新增模板</el-button>
					</div>
					<div>

					</div>
					<div>
						<tableList :tableData="tableDataList" :columns="columns" :tableBtn="tableBtn"></tableList>
					</div>
				</div>
				<!-- 家用设备检测 -->
				<div v-show="2==oMainShow">
					<div class="mainTab">
						<div>
							<selftag :inData="oTab"></selftag>
							<selftag :inData="oTab"></selftag>
						</div>

						<search @searchValue="searchChange"></search>
					</div>
					<div>
						<tableList :tableData="tableDataList" :columns="columns" :tableBtn="tableBtn"></tableList>
						<!-- <el-pagination background layout="prev, pager, next" :total="total" :page-size="opageSize" @current-change="seeCurrentChange">
                        </el-pagination> -->
					</div>
				</div>
				<!-- 统计 -->
				<div v-show="3==oMainShow">
					<div class="mainTab">
						<div>
							<selftag :inData="oTab"></selftag>
						</div>

						<publicTime @timeValue="timeValueFun"></publicTime>
					</div>
					<div>

					</div>
				</div>
			</div>
		</div>
		<!-- 医生端 -->
		<div v-else class="admin-oMain">
			<div v-if="oconsulVisable">
				<div class="mainTab">
					<div>
						<selftag :inData="oTab"></selftag>
						<selftag :inData="oTab"></selftag>
						<selftag :inData="oTab"></selftag>
						<selftag :inData="oTab"></selftag>
					</div>
					<search @searchValue="searchChange"></search>
				</div>
				<div>
					<tableList :tableData="tableDataList" :columns="columns" :tableBtn="tableBtn"></tableList>
					<!-- <el-pagination background layout="prev, pager, next" :total="total" :page-size="opageSize" @current-change="seeCurrentChange">
                        </el-pagination> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import echarts from "../plugs/echarts.js";
import normalTab from "../public/publicComponents/normalTab.vue";
import tableList from "../public/publicComponents/publicList.vue";
import search from "../public/publicComponents/search.vue";
import selftag from "../public/publicComponents/selftag.vue";
import statisticsWay from "../public/publicComponents/statisticsWay.vue";
import publicTime from "../public/publicComponents/publicTime.vue";
export default {
    components: {
        tableList,
        search,
        normalTab,
        selftag,
		statisticsWay,
		publicTime
    },
    data() {
        return {
			oMainShow:0,
            indexTab2: 0,
            oVisable: true,
            oconsulVisable: true,
            followUpTab: [
                {
                    name: "调查管理",
                    value: ""
                },
                {
                    name: "调查模板",
                    value: ""
                },
                {
                    name: "调查发送",
                    value: ""
                }
            ],
            oAdminTab: {
                i: 0, //选中的是第几项，类型为int(注意：从0开始计数)
                list: [
                    //选项列表，类型Array
                    {
                        en: "MEDICAL FOLLOW-UP", //选项英文，类型 string
                        zh: "随访管理" //选项中文，类型string
                    },
                    {
                        en: "DEGREE OF SATISFACTION",
                        zh: "满意度调查"
                    },
                    {
                        en: "MONITOR",
                        zh: "家用设备监测"
                    },
                    {
                        en: "STATISTICS",
                        zh: "统计"
                    }
                ]
            },
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
            }, //管理端tab
            odata: 1,
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
            tableDataList: [
                {
                    age: "1545649424290",
                    name: "冠方医院"
                },
                {
                    age: "1545618639429",
                    name: "测试医院"
                }
            ],
            tableBtn: [
                {
                    name: "查看记录",
                    method: (index, row) => {
                        this.handleDel(index, row);
                    }
                },
                {
                    name: "查看记录",
                    method: (index, row) => {
                        this.handleDel(index, row);
                    }
                },
                {
                    name: "查看记录",
                    method: (index, row) => {
                        this.handleDel(index, row);
                    }
                }
            ]
        };
    },
    async created() {
        this.circularData(this.odata["header"]);
    },
    mounted() {
    },
    methods: {
		timeValueFun(data){
		},
        // 满意度调查切换
        followUp2Fun(index) {
            this.indexTab2 = index;
        },
        getConsulTabData(res) {
           this.oMainShow=res.i
        },
        // 表格分页
        seeCurrentChange() {},
        handleDel(index, row) {
            alert(index);
        },
        //处理标题数据好方便传入子组件
        circularData(data) {
            // var _this = this;
            // $.each(data, function(key, value) {
            //     _this.columns.push({
            //         prop: key,
            //         label: data[key]
            //     });
            // });
        },
        //搜索框
        searchChange(data) {
            alert(data);
        },
    }
};
</script>

<style scoped>
.followUp2-tab {
    margin: 0 auto;
    display: flex;
    display: -webkit-flex;
    width: 314px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border: 1px solid #e5edf3;
    border-radius: 4px;
}
.followUp2-tab > li {
    flex-grow: 1;
    cursor: pointer;
}
.followUp2This {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #ffffff;
    letter-spacing: 0.3px;
    background: #195bdd;
    border-radius: 4px 0 0 4px;
}
.startConsul {
	    margin-top: 21px;
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
</style>