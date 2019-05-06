<!-- 院内档案 -->
<template>
	<div class="new-content">

		<div class="new-content-nav">
			<!-- 左上 -->
			<div class="new-content-userinfo">
				<!-- <div class="new-content-userinfo" v-if='inData'> -->
				<div class="new-content-headimg">
					<img src="../../../static/assets/img/a-6.png" alt="">
				</div>
				<p class="new-content-username">{{patients.name}}</p>
				<div class="new-content-msg">
					<p class="new-content--msg-item">性别：{{patients.sex}}</p>
					<p class="new-content--msg-item">年龄：{{patients.age}}</p>
					<p class="new-content--msg-item">身份证：{{patients.idNo}}</p>
				</div>
			</div>
			<!-- 左下 -->
			<div class="new-content-content" v-if="current==='1'">
				<div class="new-content-content-item" v-for="(item,index) in navList" :key="index"
					:class="nowNav===index?'new-content-content-item-select':''" @click="setNowNav(item,index)">
					<p class="new-content-content-item-title">{{item.name}}</p>
					<p class="new-content-content-item-info" v-for="(value,key) in item.infoList" :key="key">{{value}}
					</p>
				</div>
			</div>
		</div>



		<div class="new-content-body">
			<!-- 中间 -->
			<div class="new-content-body-nav">
				<div class="new-content-body-nav-item" :class="showModules.index===index?'new-content-body-nav-item-select':''"
					v-for="(item,index) in showModules.list" :key="index" @click="selectChildItem(item,index)">
					<div class="new-content-body-nav-item-name">{{item.name}}</div>
					<div class="new-content-body-nav-item-time">{{item.time}}</div>
				</div>
			</div>
			<!-- 右侧 -->
			<div class="new-content-body-content" v-if='relode'>
				<div :is="showModules.list[showModules.index]?showModules.list[showModules.index].code:''"
					:in-data="showModules.list[showModules.index]?showModules.list[showModules.index].data:{}">
				</div>
			</div>
		</div>

	</div>
</template>

<script>

	import visitingRecord from './inSide/visitingRecord.vue'//就诊记录
	import prescription from './inSide/prescription.vue'//门诊处方
	import check from './inSide/check.vue'//检验检查
	import comprehensive from './inSide/comprehensive.vue'//综合影像

	import admissionRecord from './inSide/admissionRecord.vue'//入院记录
	import hospitalizationOrder from './inSide/hospitalizationOrder.vue'//住院医嘱
	// import check from './inSide/check.vue'//检验检查
	// import comprehensive from './inSide/comprehensive.vue'//综合影像
	import anaesthesia from './inSide/anaesthesia.vue'//手术麻醉
	import nursing from './inSide/nursing.vue'//护理记录

	import examinationRecord from './inSide/examinationRecord.vue'//体检记录
	import allItems from './inSide/allItems.vue'//所有项目
	// import check from './inSide/check.vue'//检验检查
	// import comprehensive from './inSide/comprehensive.vue'//综合影像


	import { mapState } from 'vuex'
	import {
		patientInfo,
		eMRInRecord4,
		eMRInRecord6,
		eMRInRecord7,
		eMRInRecord8,
		eMRInRecord11,
		eMRInRecord15,
		eMRInRecord16,
	} from '../../api/apiAll.js'
	export default {
		props: ['inData', 'current', 'teshuId'],
		components: {
			visitingRecord,
			prescription,
			check,
			admissionRecord,
			anaesthesia,
			nursing,
			examinationRecord,
			allItems,
			hospitalizationOrder,
			comprehensive,

		},
		watch: {

		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo,
				userSelfInfo: state => state.user.userSelfInfo,
				userSocketInfo: state => state.socket
			}),
		},

		data() {
			return {
				relode: true,
				patients: {},
				patientJiuZen: [],
				jiuZhenId: '',

				chuFangArray: [],

				nowNav: 0,//当前模块索引
				showModules: {//显示子模块索列表，，，心烦    
					index: 0,
					list: []
				},
				// 左边没有的时候的中间的内容
				noLeftBottom: [//子模块
					{
						name: '门诊处方',
						code: 'prescription',
						time: '2018-12-25',
						data: []
					},
					{
						name: '住院医嘱',
						code: 'hospitalizationOrder',
						time: '2018-12-25',
						data: []
					},
					{
						name: '体检报告',
						code: 'examinationRecord',
						time: '2018-12-25',
						data: []
					},
					{
						name: '检验检查',
						code: 'check',
						time: '2018-12-25',
						data: []
					},
					{
						name: '手术麻醉',
						code: 'anaesthesia',
						time: '2018-12-25',
						data: []
					},
					{
						name: '综合影像',
						code: 'comprehensive',
						time: '2018-12-25',
						data: []
					},
				],
				// 左下有的时候中间的内容
				navList: [
					{
						name: '门诊记录',//模块名称  navList[nowNav]?        
						infoList: [//名称下边 信息
							'就诊医院：XXXX医院',
							'就诊时间：2018-12-25',
							'就诊医院： XXXX科室',
							'接诊医生：XXX'
						],
						childModuleIndex: 0,//显示子模块索引
						childModule: [//子模块
							{
								name: '就诊记录',
								code: 'visitingRecord',
								time: '2018-12-25',
								data: []
							},
							{
								name: '门诊处方',
								code: 'prescription',
								time: '2018-12-25',
								data: []
							},
							{
								name: '检验检查',
								code: 'check',
								time: '2018-12-25',
								data: []
							},
							{
								name: '综合影像',
								code: 'comprehensive',
								time: '2018-12-25',
								data: []
							},
						]
					},
					{
						name: '住院记录',//模块名称
						infoList: [//名称下边 信息
							'入住医院: 住院记录',
							'入院时间: 2018-12-25',
							'入住科室: XXXX科室',
							'床 号:外科大楼5楼504'
						],
						childModuleIndex: 0,//显示子模块索引
						childModule: [//子模块
							{
								name: '入院记录',
								code: 'admissionRecord',
								time: '2018-12-25',
								data: []
							},
							{
								name: '住院医嘱',
								code: 'hospitalizationOrder',
								time: '2018-12-25',
								data: []
							},
							{
								name: '检验检查',
								code: 'check',
								time: '2018-12-25',
								data: []
							},
							{
								name: '影像检查',
								code: 'comprehensive',
								time: '2018-12-25',
								data: []
							},
							{
								name: '手术麻醉',
								code: 'anaesthesia',
								time: '2018-12-25',
								data: []
							},
							{
								name: '护理记录',
								code: 'nursing',
								time: '2018-12-25',
								data: []
							},
						]
					},
					{
						name: '体检记录',//模块名称
						infoList: [//名称下边 信息
							'体检医院: XXXX医院',
							'体检时间: 2018-12-25',
						],
						childModuleIndex: 0,//显示子模块索引
						childModule: [//子模块
							{
								name: '体检报告',
								code: 'examinationRecord',
								time: '2018-12-25',
								data: []
							},
							{
								name: '所有项目',
								code: 'allItems',
								time: '2018-12-25',
								data: []
							},
							{
								name: '检验',
								code: 'check',
								time: '2018-12-25',
								data: []
							},
							{
								name: '影像检查',
								code: 'comprehensive',
								time: '2018-12-25',
								data: []
							}
						]
					},
				],

			}
		},

		methods: {
			selectChildItem(item, index) {
				console.log(item)
				console.log(index)
				console.log(this.nowNav)
				// item.index = index;
				// this.navList[this.nowNav].childModuleIndex = index;
				// 重载右边

				this.showModules.index = index;
				this.eMRInRecord7(item, index)
				this.eMRInRecord8(item, index)
				this.eMRInRecord11(item, index)
				this.eMRInRecord15(item, index)
				this.eMRInRecord16(item, index)

				this.relode = false;
				this.$nextTick(() => {
					this.relode = true;
				});

			},
			setView() {
				if (this.current === '2') {
					this.showModules.list = this.noLeftBottom;
					this.showModules = Object({}, this.showModules)

					console.log('---------------------')
					this.eMRInRecord7(this.noLeftBottom[3], 3)//检验记录
					this.eMRInRecord8(this.noLeftBottom[1], 1)//医嘱
					this.eMRInRecord11(this.noLeftBottom[0], 0)//处方
					this.eMRInRecord16(this.noLeftBottom[5], 5)//影像
					//手术麻醉
					//体检报告
				} else { }
			},
			// 开始请求

			async getPatientInfo() {																		//1.获取患者信息	通过id
				// console.log(this.inData);
				// console.log(this.current);
				// console.log(this.teshuId);

				if (!this.inData) return
				const res = await patientInfo({
					token: this.userInfo.token,
					orgCode: this.userSelfInfo.orgCode,
					familyMemberId: this.inData.id
				});
				console.log(res)
				this.patients = res.data.body
			},

			async getEMRInRecord4() {																				//4.就诊记录列表
				if (!this.inData) return
				console.log(this.inData)
				const res = await eMRInRecord4({
					token: this.userInfo.token,
					orgCode: this.userSelfInfo.orgCode,
					familyMemberId: this.inData.id
				});
				console.log(res)
				if (res.data.body) {
					this.patientJiuZen = res.data.body
				}
			},

			setNowNav(item, index) {
				this.nowNav = index;
				this.showModules.list = item.childModule;
				// this.showModules.list = this.navList[this.nowNav].childModule

				this.patientJiuZen.map((obj, e) => {
					if (obj.visitType == index + 1) {
						this.jiuZhenId = obj.visitNo
					}
				})
				if (index == 0) {
					// this.eMRInRecord5()//就诊记录详情
					// this.eMRInRecord6()//处方记录
					this.eMRInRecord7(this.navList[0].childModule[2], 2)//检验记录
					this.eMRInRecord11(this.navList[0].childModule[1], 1)//处方
					this.eMRInRecord16(this.navList[0].childModule[3], 3)//影像
				} else if (index == 1) {
					this.eMRInRecord15(this.navList[1].childModule[0], 0)//入院记录
					this.eMRInRecord8(this.navList[1].childModule[1], 1)//医嘱
					this.eMRInRecord7(this.navList[1].childModule[2], 2)//检验记录
					this.eMRInRecord16(this.navList[1].childModule[3], 3)//影像
					//手术麻醉
					//护理记录
				} else if (index == 2) {
					//体检报告
					//所有项目
					this.eMRInRecord7(this.navList[2].childModule[2], 2)//检验记录
					this.eMRInRecord16(this.navList[2].childModule[3], 3)//影像
				}
			},

			async eMRInRecord6() {																			//6.获取处方记录
				const res = await eMRInRecord6({
					token: this.userInfo.token,
					orgCode: this.userSelfInfo.orgCode,
					familyMemberId: this.inData.id,
					visitNo: this.jiuZhenId
				});
				console.log(res)
				console.log(res.data.body)//处方ID数组
				if (res.data.body) {
					this.chuFangArray = res.data.body
				}
			},


			async eMRInRecord11(item, index) {																			//11.获取处方单图片
				if (this.nowNav == 0 && index == 1
					|| this.current === '2' && index == 0) {
					item.data = [];
					this.chuFangArray.forEach((e, i) => {
						item.data.push(
							`${this.userSocketInfo.imgUrl1}/m/v1/api/record/nosocomialRecord/recordInfo?token=${this.userInfo.token}&orgCode=${this.userSelfInfo.orgCode}&familyMemberId=${this.inData.id}&id=${e}`
						)
					});
					console.log(item.data)
				}
			},

			async eMRInRecord7(item, index) {																			//7.获取检验记录
				if (this.nowNav == 0 && index == 2 ||
					this.nowNav == 1 && index == 2 ||
					this.nowNav == 2 && index == 2
					|| this.current === '2' && index == 3) {
					const res = await eMRInRecord7({
						token: this.userInfo.token,
						orgCode: this.userSelfInfo.orgCode,
						familyMemberId: this.inData.id,
						visitNo: this.jiuZhenId
					})
					console.log(res.data.body)
					if (res.data.body) {
						item.data = [];
						item.data = res.data.body;
					}
				}
			},

			async eMRInRecord8(item, index) {																			//8.获取医嘱记录
				if (this.nowNav == 1 && index == 1
					|| this.current === '2' && index == 1) {
					const res = await eMRInRecord8({
						token: this.userInfo.token,
						orgCode: this.userSelfInfo.orgCode,
						familyMemberId: this.inData.id,
						visitNo: this.jiuZhenId
					});
					console.log(res.data.body)
					if (res.data.body) {
						item.data = [];
						item.data = res.data.body;
					}
				}
			},

			async eMRInRecord15(item, index) {																			//15.根据就诊ID获取入院记录
				if (this.nowNav == 1 && index == 0) {
					const res = await eMRInRecord15({
						token: this.userInfo.token,
						orgCode: this.userSelfInfo.orgCode,
						familyMemberId: this.inData.id,
						visitNo: this.jiuZhenId
					});
					console.log(res.data.body)
					if (res.data.body) {
						item.data = [];
						item.data = res.data.body;
					}
				}
			},

			async eMRInRecord16(item, index) {																			//16.获取影像记录（等待）
				if (this.nowNav == 0 && index == 3 ||
					this.nowNav == 1 && index == 3 ||
					this.nowNav == 2 && index == 3
					|| this.current === '2' && index == 5) {
					const res = await eMRInRecord16({
						token: this.userInfo.token,
						orgCode: this.userSelfInfo.orgCode,
						familyMemberId: this.inData.id,
						visitNo: this.jiuZhenId
					});
					console.log(res.data.body)
					if (res.data.body) {
						item.data = [];
						item.data = res.data.body;
					}
				}
			},





		},
		async created() {
			console.log('created,this.inData: ' + this.inData); 
			this.setView();
			if (this.current === '1') {
				this.showModules.list = this.navList[0].childModule;
			} else {
				this.showModules.list = this.noLeftBottom;
			}
		},
		beforeMounted() {
			this.setView();
		},
		mounted() {
			this.getPatientInfo();
			this.getEMRInRecord4();
			this.eMRInRecord6();
		},
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
		text-align: center;
	}

	.new-content-body-nav-item-time {
		font-family: PingFangSC-Regular;
		font-size: 13px;
		color: #97A3B4;
		line-height: 22px;
	}

	.new-content-content-item-select {
		background-color: #e3f5ff;
	}

	.new-content-body-nav-item-select {
		border-left: #00A3FF 2px solid !important;
	}
</style>