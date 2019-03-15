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
				<el-table :data="planData" border style="width: 100%" :show-header="showHeadViable">
					<el-table-column fixed  label=" " width="70">
						<template slot-scope="scope">
							<img src="../../../assets/img/publicHeadImg.png" />
						</template>
					</el-table-column>
					<el-table-column prop="userName" label=" " width="120">
					</el-table-column>
					<el-table-column prop="phone" label=" " width="120">
						<template slot-scope="scope">
							{{scope.row.phone}}
						</template>
					</el-table-column>
					<el-table-column prop="planCreateTime" label=" " width="120">
					</el-table-column>
					<el-table-column prop="content" label=" " width="300">
					</el-table-column>
					<el-table-column label=" " width="300">
						<template slot-scope="scope">
							<el-button class="btnClass" @click="handleClick(scope.row)" type="text" size="small">发消息</el-button>
							<el-button class="btnClass" type="text" size="small">看备注</el-button>
							<el-button class="btnClass" type="text" size="small">看档案</el-button>
							<div class="entryFile">
								<el-button class="btnClass" type="text" size="small">录入档案</el-button>
								<ul>
									<li>普通档案</li>
									<li>孕妇档案</li>
								</ul>
							</div>

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
		<!-- 今日告警 -->
		<div class="indexClassBox">
			<div>
				<h4>今日告警</h4>
				<div>
					查看历史告警
				</div>
			</div>

			<div class="indexClassTable">
				<el-table :data="warnData" border style="width: 100%" :show-header="showHeadViable">
					<el-table-column fixed  label=" " width="70">
						<template slot-scope="scope">
							<img src="../../../assets/img/publicHeadImg.png" />
						</template>
					</el-table-column>
					<el-table-column prop="userName" label=" " width="120">
					</el-table-column>
					<el-table-column prop="phone" label=" " width="120">
						<template slot-scope="scope">
							{{scope.row.phone}}
						</template>
					</el-table-column>
					<el-table-column prop="value" label=" " width="120">
					</el-table-column>
					<el-table-column label=" " width="300">
						<template slot-scope="scope">
							<el-button class="btnClass" @click="handleClick(scope.row)" type="text" size="small">发消息</el-button>
							<el-button class="btnClass" type="text" size="small">看备注</el-button>
							<el-button class="btnClass" type="text" size="small">看档案</el-button>
							<div class="entryFile">
								<el-button class="btnClass" type="text" size="small">录入档案</el-button>
								<ul>
									<li>普通档案</li>
									<li>孕妇档案</li>
								</ul>
							</div>

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
		<!-- 随访计划 -->
		<div class="indexClassBox">
			<div>
				<h4>近期随访</h4>
				<div>
					查看更多
				</div>
			</div>

			<div class="indexClassTable">
				<el-table :data="followData" border style="width: 100%" :show-header="showHeadViable">
					<el-table-column fixed  label=" " width="70">
						<template slot-scope="scope">
							<img src="../../../assets/img/publicHeadImg.png" />
						</template>
					</el-table-column>
					<el-table-column prop="userName" label=" " width="120">
					</el-table-column>
					<el-table-column prop="phone" label=" " width="120">
						<template slot-scope="scope">
							{{scope.row.phone}}
						</template>
					</el-table-column>
					<el-table-column  label=" " width="120">
						<template slot-scope="scope">
							<div>
								<div>随访制定时间{{scope.row.createTime}}</div>
								<div>近期随访时间{{scope.row.followupTime}}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column  label=" " width="300">
						<template slot-scope="scope">
							<div>
								<div>  {{scope.row.complete}}</div>
								<div> {{scope.row.ongoing}}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label=" " width="60">
						<template slot-scope="scope">
							<el-button class="btnClass" @click="handleClick(scope.row)" type="text" size="small">查看</el-button>

						</template>
					</el-table-column>
					<el-table-column label=" " width="300">
						<template slot-scope="scope">
							<el-button class="btnClass" @click="handleClick(scope.row)" type="text" size="small">发消息</el-button>
							<el-button class="btnClass" type="text" size="small">看备注</el-button>
							<el-button class="btnClass" type="text" size="small">看档案</el-button>
							<div class="entryFile">
								<el-button class="btnClass" type="text" size="small">录入档案</el-button>
								<ul>
									<li>普通档案</li>
									<li>孕妇档案</li>
								</ul>
							</div>

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
		<!-- 会诊 -->
		<div class="indexClassBox">
			<div>
				<h4>远程会诊</h4>
				<div>
					查看更多
				</div>
			</div>

			<div class="indexClassTable">
				<el-table :data="followData" border style="width: 100%" :show-header="showHeadViable">
					<el-table-column fixed  label=" " width="70">
						<template slot-scope="scope">
							<img src="../../../assets/img/publicHeadImg.png" />
						</template>
					</el-table-column>
					<el-table-column prop="userName" label=" " width="120">
					</el-table-column>
					<el-table-column prop="phone" label=" " width="120">
						<template slot-scope="scope">
							{{scope.row.phone}}
						</template>
					</el-table-column>
					<el-table-column  label=" " width="120">
						<template slot-scope="scope">
							<div>
								<div>随访制定时间{{scope.row.createTime}}</div>
								<div>近期随访时间{{scope.row.followupTime}}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column  label=" " width="300">
						<template slot-scope="scope">
							<div>
								<div>  {{scope.row.complete}}</div>
								<div> {{scope.row.ongoing}}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label=" " width="60">
						<template slot-scope="scope">
							<el-button class="btnClass" @click="handleClick(scope.row)" type="text" size="small">查看</el-button>

						</template>
					</el-table-column>
					<el-table-column label=" " width="300">
						<template slot-scope="scope">
							<el-button class="btnClass" @click="handleClick(scope.row)" type="text" size="small">发消息</el-button>
							<el-button class="btnClass" type="text" size="small">看备注</el-button>
							<el-button class="btnClass" type="text" size="small">看档案</el-button>
							<div class="entryFile">
								<el-button class="btnClass" type="text" size="small">录入档案</el-button>
								<ul>
									<li>普通档案</li>
									<li>孕妇档案</li>
								</ul>
							</div>

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
		<!-- 协作 -->
		<div class="indexClassBox">
			<div>
				<h4>远程协作</h4>
				<div>
					查看更多
				</div>
			</div>

			<div class="indexClassTable">
				<el-table :data="followData" border style="width: 100%" :show-header="showHeadViable">
					<el-table-column fixed  label=" " width="70">
						<template slot-scope="scope">
							<img src="../../../assets/img/publicHeadImg.png" />
						</template>
					</el-table-column>
					<el-table-column prop="userName" label=" " width="120">
					</el-table-column>
					<el-table-column prop="phone" label=" " width="120">
						<template slot-scope="scope">
							{{scope.row.phone}}
						</template>
					</el-table-column>
					<el-table-column  label=" " width="120">
						<template slot-scope="scope">
							<div>
								<div>随访制定时间{{scope.row.createTime}}</div>
								<div>近期随访时间{{scope.row.followupTime}}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column  label=" " width="300">
						<template slot-scope="scope">
							<div>
								<div>  {{scope.row.complete}}</div>
								<div> {{scope.row.ongoing}}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label=" " width="60">
						<template slot-scope="scope">
							<el-button class="btnClass" @click="handleClick(scope.row)" type="text" size="small">查看</el-button>

						</template>
					</el-table-column>
					<el-table-column label=" " width="300">
						<template slot-scope="scope">
							<el-button class="btnClass" @click="handleClick(scope.row)" type="text" size="small">发消息</el-button>
							<el-button class="btnClass" type="text" size="small">看备注</el-button>
							<el-button class="btnClass" type="text" size="small">看档案</el-button>
							<div class="entryFile">
								<el-button class="btnClass" type="text" size="small">录入档案</el-button>
								<ul>
									<li>普通档案</li>
									<li>孕妇档案</li>
								</ul>
							</div>

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
import apiBaseURL from "../../../enums/apiBaseURL.js";
import { mapState } from "vuex";
import { todayPlan,todayAlert,todayFollowup } from "../../../api/apiAll.js";
export default {
    components: {},
    watch: {},
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    data() {
        return {
            showHeadViable: false,
            planData: [
			],
			followData:[],
			warnData:[]
        };
    },

    methods: {
		//计划列表
        async getPlanList(index) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const res = await todayPlan(query);
            if (res.data && res.data.errCode === 0) {
                _this.planData = res.data.body;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
		},
		//告警列表
		  async getWarnList(index) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const res = await todayAlert(query);
            if (res.data && res.data.errCode === 0) {
                _this.warnData = res.data.body;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
		},
		// 随访列表
		  async getFollowList(index) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const res = await todayFollowup(query);
            if (res.data && res.data.errCode === 0) {
                _this.followData = res.data.body;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
		},
    },
    async created() {
		this.getPlanList();
		this.getWarnList();
		this.getFollowList();
    }
};
</script>

<style >
.indexClassBox {
	margin-bottom: 40px;
    padding: 0 10px;
    background: #ffffff;
    border: 1px solid #ebf0f4;
    border-radius: 3px;
}
.indexClassBox .el-table--border {
    border-left: none;
}
.indexClassBox > div:first-child {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
}
.indexClassBox > div:first-child > h4 {
    font-family: PingFangSC-Regular;
    font-size: 22px;
    color: #323c47;
    letter-spacing: 0;
    line-height: 78px;
}
.indexClassBox > div:first-child > div {
    margin-top: 22px;
    width: 113px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    background: #ffffff;
    border: 1px solid #e4e8eb;
    border-radius: 5px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4285f4;
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
.indexClassBox .btnClass {
    width: 57px;
    height: 20px;
    background: rgba(66, 133, 244, 0.1);
    border: 1px solid rgba(66, 133, 244, 0.6);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #4285f4;
    line-height: 1px;
}
.entryFile{
	position: relative;
	display: inline-block
}
.entryFile:hover ul{
display: block
}
.entryFile>ul{
	position: absolute;
	left: 0;
	top: 20px;
		display: none
}
.indexClassBox .el-table .cell, .indexClassBox .el-table th div{
	overflow: inherit
}
</style>