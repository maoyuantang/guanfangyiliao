<!-- 电子病历 -->
<template>
	<div class="new-content">

		<div class="new-content-nav">
			<!-- 左上 -->
			<div class="new-content-userinfo">
				<div class="new-content-headimg">
					<img src="../../../static/assets/img/a-6.png" alt="">
				</div>
				<p class="new-content-username">kition</p>
				<!-- <p class="new-content-username">{{patients.name}}</p> -->
				<div class="new-content-msg">
					<p class="new-content--msg-item">性别：男</p>
					<!-- <p class="new-content--msg-item">性别：{{patients.sex}}</p> -->
					<p class="new-content--msg-item">年龄：20</p>
					<!-- <p class="new-content--msg-item">年龄：{{patients.age}}</p> -->
					<p class="new-content--msg-item">省份证：500222111111111111</p>
					<!-- <p class="new-content--msg-item">身份证：{{patients.idNo}}</p> -->
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
				<!-- {{showModules.list[showModules.index].code}} -->
				<!-- {{showModules.list[showModules.index].data}} -->
				<div :is="showModules.list[showModules.index]?showModules.list[showModules.index].code:''"
					:in-data="showModules.list[showModules.index]?showModules.list[showModules.index].data:{}">
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { mapState } from 'vuex'

	import visitingRecord from './inSide/visitingRecord.vue'//就诊记录
	import prescription from './inSide/prescription.vue'//处方
	import check from './inSide/check.vue'//检验
	import oimage from './inSide/image.vue'//影像检查
	import admissionRecord from './inSide/admissionRecord.vue'//入院记录
	import medicalOrder from './inSide/medicalOrder.vue'//医嘱
	import anaesthesia from './inSide/anaesthesia.vue'//手术麻醉
	import nursing from './inSide/nursing.vue'//护理记录
	import examinationRecord from './inSide/examinationRecord.vue'//体检记录
	import allItems from './inSide/allItems.vue'//所有项目
	import hospitalizationOrder from './inSide/hospitalizationOrder.vue'//住院医嘱
	import comprehensive from './inSide/comprehensive.vue'//综合影像

	import men_zhenchufang1 from './inSide/men_zhenchufang1.vue'//综合影像
	import men_zhenchufang2 from './inSide/men_zhenchufang2.vue'//综合影像
	import men_zhenchufang3 from './inSide/men_zhenchufang3.vue'//综合影像
	import men_zhenchufang4 from './inSide/men_zhenchufang4.vue'//综合影像
	import men_zhenchufang5 from './inSide/men_zhenchufang5.vue'//综合影像
	import men_zhenchufang6 from './inSide/men_zhenchufang6.vue'//综合影像

	import { patientInfo } from '../../api/apiAll.js'
	export default {
		props: ['inData', 'current'],
		components: {
			visitingRecord,
			prescription,
			check,
			oimage,
			admissionRecord,
			medicalOrder,
			anaesthesia,
			nursing,
			examinationRecord,
			allItems,
			hospitalizationOrder,
			comprehensive,

			men_zhenchufang1,
			men_zhenchufang2,
			men_zhenchufang3,
			men_zhenchufang4,
			men_zhenchufang5,
			men_zhenchufang6,
		},
		watch: {

		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo,
				userSelfInfo: state => state.user.userSelfInfo
			}),
		},

		data() {
			return {
				relode: true,
				patients: {},
				nowNav: 0,//当前模块索引
				showModules: {//显示子模块索列表，，，心烦    
					index: 0,
					list: []
				},
				// 左边没有的时候的中间的内容
				noLeftBottom: [//子模块
					{
						name: '门诊处方',
						code: 'men_zhenchufang1',
						time: '2018-12-25',
						data: {
							data: '门诊处方'
						}
					},
					{
						name: '住院医嘱',
						code: 'men_zhenchufang2',
						time: '2018-12-25',
						data: {
							data: '住院医嘱'
						}
					},
					{
						name: '体检报告',
						code: 'men_zhenchufang3',
						time: '2018-12-25',
						data: {
							data: '体检报告'
						}
					},
					{
						name: '检验检查',
						code: 'men_zhenchufang4',
						time: '2018-12-25',
						data: {
							data: '检验检查'
						}
					},
					{
						name: '手术麻醉',
						code: 'men_zhenchufang5',
						time: '2018-12-25',
						data: {
							data: '手术麻醉'
						}
					},
					{
						name: '综合影像',
						code: 'men_zhenchufang6',
						time: '2018-12-25',
						data: {
							data: '综合影像'
						}
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
								data: {
									data: '就诊记录'
								}
							},
							{
								name: '处方',
								code: 'prescription',
								time: '2018-12-25',
								data: {
									data: '处方'
								}
							},
							{
								name: '检验',
								code: 'check',
								time: '2018-12-25',
								data: {
									data: '检验'
								}
							},
							{
								name: '影像检查',
								code: 'oimage',
								time: '2018-12-25',
								data: {
									data: '影像检查'
								}
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
								data: {
									data: '入院记录'
								}
							},
							{
								name: '医嘱',
								code: 'medicalOrder',
								time: '2018-12-25',
								data: {
									data: '医嘱'
								}
							},
							{
								name: '检验',
								code: 'check',
								time: '2018-12-25',
								data: {
									data: '检验'
								}
							},
							{
								name: '影像检查',
								code: 'oimage',
								time: '2018-12-25',
								data: {
									data: '影像检查'
								}
							},
							{
								name: '手术麻醉',
								code: 'anaesthesia',
								time: '2018-12-25',
								data: {
									data: '手术麻醉'
								}
							},
							{
								name: '护理记录',
								code: 'nursing',
								time: '2018-12-25',
								data: {
									data: '护理记录'
								}
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
								name: '体检记录',
								code: 'examinationRecord',
								time: '2018-12-25',
								data: {
									data: '体检记录'
								}
							},
							{
								name: '所有项目',
								code: 'allItems',
								time: '2018-12-25',
								data: {
									data: '所有项目'
								}
							},
							{
								name: '检验',
								code: 'check',
								time: '2018-12-25',
								data: {
									data: '检验'
								}
							},
							{
								name: '影像检查',
								code: 'oimage',
								time: '2018-12-25',
								data: {
									data: '影像检查'
								}
							}
						]
					},
				],

			}
		},

		methods: {
			setNowNav(item, index) {
				this.nowNav = index;
				this.showModules.list = item.childModule;
				// this.showModules.list = this.navList[this.nowNav].childModule
			},
			selectChildItem(item, index) {
				// console.log(item)
				// console.log(index)
				// item.index = index;
				// this.navList[this.nowNav].childModuleIndex = index;
				this.showModules.index = index;

				// 重载右边
				this.relode = false;
				this.$nextTick(() => {
					this.relode = true;
				});

			},
			setView() {
				if (this.current === '2') {
					this.showModules.list = this.noLeftBottom;
					this.showModules = Object({}, this.showModules)

				} else {

				}
			},
			// 开始请求

			async getPatientInfo() {																		//1.获取患者信息	id
				console.log(this.inData)
				const res = await patientInfo({
					token: this.userInfo.token,
					orgCode: this.userSelfInfo.orgCode,
					familyMemberId: this.inData.id
				});
				console.log(res)
				this.patients = res.data.body
			},

			async eMRInRecord4() {																			//4.就诊记录列表
				console.log(this.inData)
				const res = await eMRInRecord4({
					token: this.userInfo.token,
					orgCode: this.userSelfInfo.orgCode,
					familyMemberId: this.inData.id
				});
				console.log(res)
				console.log(res.data.body)
			},

			// async eMRInRecord6() {																			//6.获取处方记录（等待）
			// 	console.log(this.inData)
			// 	const res = await eMRInRecord6({
			// 		token: this.userInfo.token,
			// 		orgCode: this.userSelfInfo.orgCode,
			// 		familyMemberId: this.inData.id,

			// 		visitNo: '就诊ID'/////////////////////////
			// 	});
			// 	console.log(res)
			// 	console.log(res.data.body)
			// },

			// async eMRInRecord7() {																			//7.获取检验记录（等待）
			// 	console.log(this.inData)
			// 	const res = await eMRInRecord7({
			// 		token: this.userInfo.token,
			// 		orgCode: this.userSelfInfo.orgCode,
			// 		familyMemberId: this.inData.id,

			// 		visitNo: '就诊ID'/////////////////////////
			// 	});
			// 	console.log(res)
			// 	console.log(res.data.body)
			// },

			// async eMRInRecord8() {																			//8.获取医嘱记录（等待）
			// 	console.log(this.inData)
			// 	const res = await eMRInRecord8({
			// 		token: this.userInfo.token,
			// 		orgCode: this.userSelfInfo.orgCode,
			// 		familyMemberId: this.inData.id,

			// 		visitNo: '就诊ID'/////////////////////////
			// 	});
			// 	console.log(res)
			// 	console.log(res.data.body)
			// },

			// async eMRInRecord11() {																			//11.获取处方单图片（等待）
			// 	console.log(this.inData)
			// 	const res = await eMRInRecord11({
			// 		token: this.userInfo.token,
			// 		orgCode: this.userSelfInfo.orgCode,
			// 		familyMemberId: this.inData.id,

			// 		id: '处方ID'/////////////////////////////
			// 	});
			// 	console.log(res)
			// 	console.log(res.data.body)
			// },

			// async eMRInRecord15() {																			//15.根据就诊ID获取入院记录（等待）
			// 	console.log(this.inData)
			// 	const res = await eMRInRecord15({
			// 		token: this.userInfo.token,
			// 		orgCode: this.userSelfInfo.orgCode,
			// 		familyMemberId: this.inData.id,

			// 		visitNo: '就诊ID'/////////////////////////
			// 	});
			// 	console.log(res)
			// 	console.log(res.data.body)
			// },

			// async eMRInRecord16() {																			//16.获取影像记录（等待）
			// 	console.log(this.inData)
			// 	const res = await eMRInRecord16({
			// 		token: this.userInfo.token,
			// 		orgCode: this.userSelfInfo.orgCode,
			// 		familyMemberId: this.inData.id,

			// 		visitNo: '就诊ID'/////////////////////////
			// 	});
			// 	console.log(res)
			// 	console.log(res.data.body)
			// },





		},
		async created() {
			console.log('11111111');
			if (this.current === '1') {
				this.showModules.list = this.navList[0].childModule;
			} else {
				this.showModules.list = this.noLeftBottom;
			}
			this.eMRInRecord4();//等待
			// console.log(this.inData);
			// this.getPatientInfo();
			// this.setView();
		},
		beforeMounted() {
			console.log(this.inData);
			this.getPatientInfo();
			this.setView();

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