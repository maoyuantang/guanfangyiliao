<!-- 今日计划 -->
<template>
	<div>
		<!-- 今日计划 -->
		<div class="indexClassBox">
			<div>
				<h4>今日计划</h4>
				<div>
					查看历史计划
				</div>
			</div>

			<div class="indexClassTable">
				<el-table :data="tableData" border style="width: 100%" :show-header="showHeadViable">
					<el-table-column fixed prop="date" label=" " width="70">
						<template slot-scope="scope">
							<img src="../../../assets/img/publicHeadImg.png" />
						</template>
					</el-table-column>
					<el-table-column prop="name" label=" " width="120">
					</el-table-column>
					<el-table-column prop="phone" label=" " width="120">
						<template slot-scope="scope">
							{{scope.row.phone}}
						</template>
					</el-table-column>
					<el-table-column prop="time" label=" " width="120">
					</el-table-column>
					<el-table-column prop="text" label=" " width="300">
					</el-table-column>
					<el-table-column prop="zip" label=" " width="240">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="text" size="small">发消息</el-button>
							<el-button type="text" size="small">看备注</el-button>
							<el-button type="text" size="small">看档案</el-button>
							<el-button type="text" size="small">录入档案</el-button>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label=" " width="100">
						<template slot-scope="scope">
							<el-button class="solveOver" @click="handleClick(scope.row)" type="text" size="small">处理完成</el-button>
						</template>
					</el-table-column>
				</el-table>

			</div>
		</div>
	</div>
</template>

<script>
export default {
    components: {},
    watch: {},
    computed: {},

    data() {
        return {
            showHeadViable: false,
            tableData: [
                {
                    data: "dd",
                    name: "Amanda Reyes",
                    phone: "(499)-430-5810",
                    time: "拟定时间:2018-05.25",
                    text:
                        "拟定内容的内容有点多 自动换行并全部显示 打电话通知体检  检查尿酸"
                },
                {
                    data: "dd",
                    name: "Amanda Reyes"
                }
            ]
        };
    },

    methods: {},
    async created() {}
};
</script>

<style >
.indexClassBox {
    padding: 0 10px;
    background: #ffffff;
    border: 1px solid #ebf0f4;
    border-radius: 3px;
}
.indexClassBox .el-table--border {
    border-left: none;
}
.indexClassBox>div:first-child{
	display: flex;
	display: -webkit-flex;
	justify-content:space-between;
}
.indexClassBox>div:first-child > h4 {
    font-family: PingFangSC-Regular;
    font-size: 22px;
    color: #323c47;
    letter-spacing: 0;
    line-height: 78px;
}
.indexClassBox>div:first-child>div{
	margin-top: 22px;
	width:113px;
	height: 32px;
	text-align: center;
	line-height: 32px;
	background: #FFFFFF;
border: 1px solid #E4E8EB;
border-radius: 5px;
font-family: PingFangSC-Regular;
font-size: 14px;
color: #4285F4;
cursor: pointer;
}
.indexClassTable .el-table--border td,
.indexClassTable .el-table--border th {
    border-right: none;
}

.solveOver {
    width: 57px;
    height: 20px;
    background: rgba(244, 120, 66, 0.1);
    border: 1px solid rgba(244, 123, 66, 0.6);
    border-radius: 3px;
    text-align: center;
    line-height: 1px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #f54813;
}
</style>