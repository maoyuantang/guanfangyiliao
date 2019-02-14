<template>
	<div class="family-medicine-management">
		<div class="family-medicine-management-top">
			<normalTab v-model="barInfo" @reBack="getBar"></normalTab>
		</div>
		<div class="family-medicine-management-body">
			<div class="family-medicine-management-body-part-one" v-show="barInfo.i===0">
				<div class="family-medicine-management-middle">
					<div class="family-medicine-management-middle-left">
						<selftag v-model="departmentList" @reback="getDepartmentSelect"></selftag>
						<selftag v-model="bussModuleList" @reback="bussModuleSelect"></selftag>
						<selftag v-model="bussTypeList" @reback="bussTypeSelect"></selftag>
					</div>
					<div class="family-medicine-management-middle-right">
						<div class="family-medicine-search"><search></search></div>
						<div><el-button type="primary" @click="addBuss">新增业务</el-button></div>
					</div>
				</div>
				<div class="family-medicine-management-content">
					<div class="family-medicine-management-content-layout">
						<publicInfoModule v-for="i in 8" :key="i"></publicInfoModule>
					</div>
				</div>
			</div>
			<div class="family-medicine-management-body-part-two" v-show="barInfo.i===1">
				<div class="part-two-head">
					<div class="part-two-head-left">
						<selftag v-model="departmentList" @reback="getDepartmentSelect"></selftag>
					</div>
					<div class="part-two-head-right">
						<publicTime></publicTime>
						<el-select v-model="countMethod.select" clearable placeholder="请选择">
							<el-option
							v-for="(item,index) in countMethod.list"
							:key="index"
							:label="item.name"
							:value="item.name">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="part-two-body">
					<div class="part-two-body-layout">
						<normalColumnChart v-model="drawData"></normalColumnChart>
					</div>
				</div>
			</div>
		</div>
		<Modal
        :styles="{width: '850px'}"
        v-model="testData.show"
        title=" "
        footer-hide>
			<div class="family-new-alert">

				<!-- 业务类型 -->
				<div class="family-new-alert-normal-item" v-if="testData.businessTypeList.show">
					<div class="family-new-alert-normal-item-name">
						<span>业务类型:</span>
					</div>
					<div class="family-new-alert-normal-item-value">
						<el-select v-model="testData.businessTypeList.default.value" clearable placeholder="请选择" size="mini" v-if="testData.businessTypeList.default.value!=='-1'">
							<el-option
							v-for="item in testData.businessTypeList.list"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
						<el-input
						v-else
						placeholder="请输入内容"
						v-model="testData.businessTypeList.default.label"
						size="mini"
						@clear='closeTextClass'
						clearable>
						</el-input>
					</div>
				</div>

				<!-- 业务模板 -->
				<div class="family-new-alert-normal-item" v-if="testData.businessTemplate.show">
					<div class="family-new-alert-normal-item-name">
						<span>业务模板:</span>
					</div>
					<div class="family-new-alert-normal-item-value">
						<el-select v-model="testData.businessTemplate.default.value" clearable placeholder="请选择" size="mini" @change="byStencilModel(testData.businessTemplate.default.value)">
							<el-option
							v-for="item in testData.businessTemplate.list"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>

				<!-- 业务名称 -->
				<div class="family-new-alert-normal-item" v-if="testData.businessName.show">
					<div class="family-new-alert-normal-item-name">
						<span>业务名称:</span>
					</div>
					<div class="family-new-alert-normal-item-value">
						<el-input
						placeholder="请输入内容"
						v-model="testData.businessName.label"
						size="mini"
						clearable>
						</el-input>
					</div>
				</div>

				<!-- 业务定价 -->
				<div class="family-new-alert-normal-item" v-if="testData.businessTemplate.default.value!=='JTYS'">
					<div class="family-new-alert-normal-item-name">
						<span>业务定价:</span>
					</div>
					<div class="family-new-alert-normal-item-value">
						<el-input
						placeholder="请输入内容"
						v-model="testData.businessPrice.data[0].worth"
						size="mini"
						clearable>
						</el-input>
					</div>
				</div>

				<!-- 科室 -->
				<div class="family-new-alert-normal-item" v-if="testData.departmentList.show">
					<div class="family-new-alert-normal-item-name">
						<span>科室:</span>
					</div>
					<div class="family-new-alert-normal-item-value">
						<el-select v-model="testData.departmentList.default.value" clearable placeholder="请选择" size="mini">
							<el-option
							v-for="item in testData.departmentList.list"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>

				<!-- 关联医生 -->
				<div class="family-new-alert-normal-item" v-if="testData.doctorList.show">
					<div class="family-new-alert-normal-item-name">
						<span>关联医生:</span>
					</div>
					<div class="family-new-alert-normal-item-value">
						<el-select v-model="testData.doctorList.default" clearable placeholder="请选择" size="mini" multiple>
							<el-option
							v-for="item in testData.doctorList.list"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>

				<!-- 显示医生 -->
				<div class="family-new-alert-normal-item" v-if="testData.doctorList.show">
					<div class="family-new-alert-normal-item-name">
						<span></span>
					</div>
					<div class="family-new-alert-normal-item-value">
						<div v-for="(item,index) in testData.doctorList.default" :key="index">
							<div class="family-new-alert-normal-userhead-">
								<div class="family-new-alert-normal-userhead">
									<img src="../../assets/img/a-6.png" alt="">
									<i class="iconfont" >&#xe611;</i>
								</div>
							</div>
							<p>{{testData.doctorList.list.find(i=>i.value===item)&&testData.doctorList.list.find(i=>i.value===item).label}}</p>
						</div>
						
					</div>
				</div>


				<!-- 特殊的价格 -->
				<div class="family-new-alert-spe-price" v-if="testData.businessTemplate.default.value==='JTYS'">
					<div class="family-new-alert-spe-price-item">
						<div class="family-new-alert-spe-price-item-head">
							<div class="family-new-alert-spe-price-item-head-input-div">
								<i class="iconfont family-new-alert-spe-price-item-head-icon">&#xe76d;</i>
								<input type="text" v-model="testData.businessPrice.data[1].worth" class="family-new-alert-spe-price-item-head-content-input">
								<p class="family-new-alert-spe-price-item-head-unit">/月</p>
							</div>
						</div>
						<div class="family-new-alert-spe-price-item-body">
							<ul>
								<li>
									<div class="family-new-alert-spe-price-item-body-item" v-for="(item,index) in testData.businessPrice.data[1].childList " :key="index">
										<span class="family-new-alert-spe-price-item-body-item-name">{{item.childName}}</span>
										<input type="number" min="0" class="family-new-alert-spe-price-item-body-item-count" v-model="item.times">
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="family-new-alert-spe-price-item-segmentation"></div>
					<div class="family-new-alert-spe-price-item">
						<div class="family-new-alert-spe-price-item-head">
							<div class="family-new-alert-spe-price-item-head-input-div">
								<i class="iconfont family-new-alert-spe-price-item-head-icon">&#xe76d;</i>
								<input type="text" v-model="testData.businessPrice.data[2].worth" class="family-new-alert-spe-price-item-head-content-input">
								<p class="family-new-alert-spe-price-item-head-unit">/季</p>
							</div>
						</div>
						<div class="family-new-alert-spe-price-item-body">
							<ul>
								<li>
									<div class="family-new-alert-spe-price-item-body-item" v-for="(item,index) in testData.businessPrice.data[2].childList " :key="index">
										<span class="family-new-alert-spe-price-item-body-item-name">{{item.childName}}</span>
										<input type="number" min="0" class="family-new-alert-spe-price-item-body-item-count" v-model="item.times">
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="family-new-alert-spe-price-item-segmentation"></div>
					<div class="family-new-alert-spe-price-item">
						<div class="family-new-alert-spe-price-item-head">
							<div class="family-new-alert-spe-price-item-head-input-div">
								<i class="iconfont family-new-alert-spe-price-item-head-icon">&#xe76d;</i>
								<input type="text" v-model="testData.businessPrice.data[3].worth" class="family-new-alert-spe-price-item-head-content-input">
								<p class="family-new-alert-spe-price-item-head-unit">/年</p>
							</div>
						</div>
						<div class="family-new-alert-spe-price-item-body">
							<ul>
								<li>
									<div class="family-new-alert-spe-price-item-body-item" v-for="(item,index) in testData.businessPrice.data[3].childList " :key="index">
										<span class="family-new-alert-spe-price-item-body-item-name">{{item.childName}}</span>
										<input type="number" min="0" class="family-new-alert-spe-price-item-body-item-count" v-model="item.times">
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- 业务描述: -->
				<div class="family-new-alert-normal-item" v-if="testData.businessDescription.show">
					<div class="family-new-alert-normal-item-name">
						<span>业务描述:</span>
					</div>
					<div class="family-new-alert-normal-item-value family-new-alert-normal-item-value-spe">
						 <div class="input-item-value-div">
							<el-input
							type="textarea"
							autosize
							placeholder="请输入内容"
							v-model="testData.businessDescription.label">
							</el-input>
						</div>
					</div>
				</div>
				
				<!-- 定义协议: -->
				<div class="family-new-alert-normal-item" v-if="testData.agreement.show">
					<div class="family-new-alert-normal-item-name">
						<span>定义协议:</span>
					</div>
					<div class="family-new-alert-normal-item-value family-new-alert-normal-item-value-spe">
						 <div class="input-item-value-div input-item-value-div-spe">
							<div class="family-new-alert-agreement-head">
								<input type="text" v-model="testData.agreement.default.label" class="family-new-alert-edit-agreement">
								<!-- <span>{{testData.agreement.default.label||''}}</span> -->
								<Dropdown>
									<p>
										<Icon type="ios-arrow-down" class="agreement-arrow-down"></Icon>
									</p>
									<DropdownMenu slot="list">
										<DropdownItem v-for="(item,index) in testData.agreement.list" :key="index" @click.native="getAgreementSelect(item,index)">{{item.label}}</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</div>
							<div class="family-new-alert-agreement-content">
								<textarea name="" id="" cols="15" rows="5" v-model="testData.agreement.showContent" class="family-new-alert-edit-agreement-content"></textarea>
								<!-- {{testData.agreement.showContent||''}} -->
							</div>
						</div>
					</div>
				</div>

				<!-- 服务电话 -->
				<div class="family-new-alert-normal-item" v-if="testData.servicePhone.show">
					<div class="family-new-alert-normal-item-name">
						<span>服务电话:</span>
					</div>
					<div class="family-new-alert-normal-item-value">
						<el-input
						placeholder="请输入内容"
						v-model="testData.servicePhone.label"
						size="mini"
						clearable>
						</el-input>
					</div>
				</div>

				<div class="save-btn">
					<el-button type="primary" size="mini" @click="saveInfo">保存</el-button>
				</div>
			</div>
		</Modal>
		<!-- <addNewFrame :inData="testData" @reback="getAddData" @getAgreementSelect="getAgreementSelect" @department="getSelectDepartment"></addNewFrame> -->
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import normalTab from './../../public/publicComponents/normalTab.vue'
	import selftag from './../../public/publicComponents/selftag.vue'
	import search from './../../public/publicComponents/search.vue'
	import publicInfoModule from './../../public/publicComponents/publicInfoModule.vue'
	import publicTime from './../../public/publicComponents/publicTime.vue'
	import normalColumnChart from './../../public/publicComponents/normalColumnChart.vue'
	import addNewFrame from './../../public/publicComponents/addNewFrame.vue'
	import { 
		stencilName, toolBusinessType, toolDept, doctorsByOrgCodeAndDeptId, fetchHospitalDepts, businessType, protocols, protocolById,
		addBusiness, stencilModel
	} from '../../api/apiAll.js'
	export default {
		watch:{
			/**
			 * 检查科室变化，请求数据
			 */
			'testData.departmentList.default.value':{
				handler(n){
					console.log(n);
					this.getSelectDepartment(n)
				}
			}
		},
		components:{
			normalTab,
			selftag,
			search,
			publicInfoModule,
			publicTime,
			normalColumnChart,
			addNewFrame
        },
        computed:{
			...mapState({
				userInfo:state => state.user.userInfo,
				userSelfInfo:state => state.user.userSelfInfo 
			}),
		},
		data () {
			return {
				testData:{
					show:false,//是否显示新增弹窗
					businessId:'',//业务id(新增为空，编辑不为空)
					// type:'2',//1是表示新增家医，2是表示新增在线诊室业务    
					businessTypeList:{//新增在线诊室业务类型  
						show:true,//是否显示
						default:{//默认选项
							label:'', //名称  
							value:''//值
						},
						list:[//所有选择项
							// {
							// 	label:'新增在线诊室业务类型1',
							// 	value:'1'
							// },
							// {
							// 	label:'新增在线诊室业务类型2',
							// 	value:'2'
							// }
						]
					},
					businessTemplate:{//新增家医业务模板  
						show:true,
						default:{
							label:'', 
							value:''
						},
						list:[
							// {
							// 	label:'新增家医业务模板1',
							// 	value:'1'
							// },
							// {
							// 	label:'新增家医业务模板2',
							// 	value:'2'
							// }
						]
					},
					businessName:{//业务名称 
						show:false,
						label:''
					}, 
					businessPrice:{//业务定价  为何如此坑  
						show:false, 
						// countList:[//次数选项  
						// 	{
						// 		name:'0',
						// 		value:0
						// 	},
						// 	{
						// 		name:'1',
						// 		value:1
						// 	},
						// 	{
						// 		name:'2',
						// 		value:2
						// 	},
						// 	{
						// 		name:'3',
						// 		value:3
						// 	},
						// 	{
						// 		name:'无限次',
						// 		value:-1
						// 	}
						// ],
						data:[
							{
								worth:0,//价格数值    
								unitEnum:'',//价格单位  （HOUR//小时；TIMES//次；DAY//天；MONTH//月；QUARTER//季；YEAR//年；）
								valueUnit:1,//价格单位值
								childList:[//该价格下的子业务 
									// {
									// 	childId:'',//子业务id
									// 	childName:'',//子业务名称
									// 	childDepName:'',//子业务科室名
									// 	childDoctors:'',//子业务人员
									// 	stencilEnum:'',//子业务模版（"JTYS", //家庭医生；"SMFW", //上门服务；"ZNPJ", //智能陪检；"YCJH", //远程监护；"ZXZX", //在线咨询；"JYSB", //家用设备； "PHFW" //陪护服务；）
									// 	times:0//子业务次数
									// }
								]
							},
							{
								worth:0,//价格数值   
								unitEnum:'MONTH',//价格单位  （HOUR//小时；TIMES//次；DAY//天；MONTH//月；QUARTER//季；YEAR//年；）
								valueUnit:1,//价格单位值
								childList:[//该价格下的子业务
									// {
									// 	childId:'',//子业务id
									// 	childName:'新华医院健康诊室',//子业务名称
									// 	childDepName:'',//子业务科室名
									// 	childDoctors:'',//子业务人员
									// 	stencilEnum:'',//子业务模版（"JTYS", //家庭医生；"SMFW", //上门服务；"ZNPJ", //智能陪检；"YCJH", //远程监护；"ZXZX", //在线咨询；"JYSB", //家用设备； "PHFW" //陪护服务；）
									// 	times:0//子业务次数
									// },
									// {
									// 	childId:'',//子业务id
									// 	childName:'新华医院健康诊室',//子业务名称
									// 	childDepName:'',//子业务科室名
									// 	childDoctors:'',//子业务人员
									// 	stencilEnum:'',//子业务模版（"JTYS", //家庭医生；"SMFW", //上门服务；"ZNPJ", //智能陪检；"YCJH", //远程监护；"ZXZX", //在线咨询；"JYSB", //家用设备； "PHFW" //陪护服务；）
									// 	times:0//子业务次数
									// }
								]
							},
							{
								worth:0,//价格数值
								unitEnum:'QUARTER',//价格单位  （HOUR//小时；TIMES//次；DAY//天；MONTH//月；QUARTER//季；YEAR//年；）
								valueUnit:1,//价格单位值
								childList:[//该价格下的子业务
									// {
									// 	childId:'',//子业务id
									// 	childName:'',//子业务名称
									// 	childDepName:'',//子业务科室名
									// 	childDoctors:'',//子业务人员
									// 	stencilEnum:'',//子业务模版（"JTYS", //家庭医生；"SMFW", //上门服务；"ZNPJ", //智能陪检；"YCJH", //远程监护；"ZXZX", //在线咨询；"JYSB", //家用设备； "PHFW" //陪护服务；）
									// 	times:0//子业务次数
									// }
								]
							},
							{
								worth:0,//价格数值
								unitEnum:'YEAR',//价格单位  （HOUR//小时；TIMES//次；DAY//天；MONTH//月；QUARTER//季；YEAR//年；）
								valueUnit:1,//价格单位值
								childList:[//该价格下的子业务
									// {
									// 	childId:'',//子业务id
									// 	childName:'',//子业务名称
									// 	childDepName:'',//子业务科室名
									// 	childDoctors:'',//子业务人员
									// 	stencilEnum:'',//子业务模版（"JTYS", //家庭医生；"SMFW", //上门服务；"ZNPJ", //智能陪检；"YCJH", //远程监护；"ZXZX", //在线咨询；"JYSB", //家用设备； "PHFW" //陪护服务；）
									// 	times:0//子业务次数
									// }
								]
							},
						]
					},
					departmentList:{//科室列表   
							show:true,
							default:{
								label:'',
								value:''
							},
							list:[
								// {
								// 	label:'科室列表1',
								// 	value:'1'
								// },
								// {
								// 	label:'科室列表2',
								// 	value:'2'
								// }
							]
					}, 
					doctorList:{//医生列表    
							show:false,
							default:[], 
							list:[
								// {
								// 	label:'医生1',
								// 	value:'1'
								// },
								// {
								// 	label:'医生2',
								// 	value:'2'
								// },
								// {
								// 	label:'医生3',
								// 	value:'3'
								// }   
							]
					},
					businessDescription:{ 
						show:false,
						label:''
					},//业务描述
					servicePhone:{ 
						show:false,
						label:''
					},//服务电话
					agreement:{ 
						show:false, 
						default:{ 
							label:'', 
							value:''
						},

						list:[
							// {label:'协议1',value:'1'},
							// {label:'协议2',value:'2'},
						],
						showContent:''
					}
				},











/********************************************************* */





				/**
				 * bar 数据
				 */
				barInfo:{
					i:0,//当前页面
					list:[
						{
							en:'Family Doctor Service',
							zh:'家医服务管理'
						},
						{
							en:'STATISTICS',
							zh:'统计'
						},
					]	
				},

				/**
				 * 科室标签信息
				 */
				departmentList:{
					more:false,
                    title:'科室',
                    list:[
                        {
                            text:'全部'
                        },
                        {
                            text:'今日'
                        }
                    ]
				},

				/**
				 * 业务模块信息
				 */
				bussModuleList:{
					more:false,
                    title:'业务模块',
                    list:[
                        {
                            text:'全部'
                        },
                        {
                            text:'今日'
                        }
                    ]
				},

				/**
				 * 业务类型信息
				 */
				bussTypeList:{
					more:false,
                    title:'业务类型 ',
                    list:[
                        {
                            text:'全部'
                        },
                        {
                            text:'今日'
                        }
                    ]
				},

				/**
				 * 统计模块 时间段
				 */
				countTime:[],

				/**
				 * 统计模块 统计方式
				 */
				countMethod:{
					select:{name:'按科室统计'}, 
					list:[
						{name:'按科室统计'},
						{name:'按日统计'},
						{name:'按月统计'},
						{name:'按年统计'},
					]
				},

				/***
				 * 统计模块  图表
				 */
				drawData:{
					dataAxis:['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'],//每个柱子代表的类名
					data:[220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234],//具体数值
					title:'测试测试,修改修改'//图表标题
				}
			}
		},
		methods:{
			
			/**
			 * 协议被选择，重新获取具体协议内容
			 */
			getAgreementSelect(item,index){
				this.getProtocolById(item.protocolId);
				console.log(item);
			},

			/****************** */
			/**
			 * 获取科室列表
			 */
			async getFetchHospitalDepts(){
				const res = await fetchHospitalDepts({
					orgCode:this.userSelfInfo.orgCode,
					deptId:''
				});
				console.log(res)
				if(res.data&&res.data.errCode===0){
					const initArr = [{text:'全部'}];
					res.data.body.forEach(element => {
						element.text = element.deptName;
						initArr.push(element);
					});
					this.departmentList.list = initArr;
					this.testData.departmentList.list = res.data.body.map(item => {
						return {
							label:item.deptName,
							value:item.deptId
						}
					});
					// this.testData.departmentList.default = {
					// 	label:this.testData.departmentList.list[0].label,
					// 	value:this.testData.departmentList.list[0].value,
					// };
					this.getSelectDepartment(this.testData.departmentList.list[0].value);
					this.getProtocols(this.testData.departmentList.list[0].value);
				}
				
			},
			/**
			 * bar 切换数据
			 */
			getBar(data){
				console.log(data)
			},

			/**
			 * 科室标签 被点击
			 */
			getDepartmentSelect(item){
				console.log(item)
			},

			/**
			 * 业务模块 被点击
			 */
			bussModuleSelect(item){
				console.log(item)
			},

			/**
			 * 业务类型 被点击
			 */
			bussTypeSelect(item){
				console.log(item)
			},

			/**
			 * 新增业务
			 */
			addBuss(){
				console.log('enter')
				Promise.all([
					this.getToolBusinessType(),
					this.getStencilName(),
					// this.toolDept()
				])
				.then(res=>{
					console.log(res)
					for(const i of res){
						if(!i){
							console.log('defaile');
							return;
						}
					}
					this.testData.show = true;
				})
				.catch(err=>{

				})
				
			},

			/**
			 * 17.1获取所有业务模版名
			 */
			async getStencilName(){
				const res = await stencilName({token:this.userInfo.token});
				console.log(res);
				if(res.data&&res.data.errCode===0){
					const modulesMap = [
                        {
                            text:'家庭医生',
                            en:'JTYS'
                        },
                        {
                            text:'上门服务',
                            en:'SMFW'
                        },
                        {
                            text:'智能陪检',
                            en:'ZNPJ'
                        },
                        {
                            text:'远程监护',
                            en:'YCJH'
                        },
                        {
                            text:'在线咨询',
                            en:'ZXZX'
                        },
                        {
                            text:'家用设备',
                            en:'JYSB'
                        },
                        {
                            text:'陪护服务',
                            en:'PHFW'
                        }
					];
					this.testData.businessTemplate.list = res.data.body.map(item=>{
						for(const i of modulesMap){
							if(i.en === item)return {label:i.text,value:item};
						}
					});
					return true;
				}else{
					return false;
				}
				
			},

			/**
			 * 获取 1.21.14.业务类型
			 */
			async getToolBusinessType(){
				const res = await toolBusinessType({token:this.userInfo.token});
				console.log(res);
				if(res.data&&res.data.errCode===0){
					const middle = res.data.body.map(item=>{
						item.label = item.name;
						item.value = item.id;
						return item;
					});
					middle.push({label:'自定义',value:'-1'})
					this.testData.businessTypeList.list = middle;
					// this.testData.businessTypeList.default = {
					// 	label:this.testData.businessTypeList.list[0].label,
					// 	value:this.testData.businessTypeList.list[0].value,
					// };
					return true;
				}else{
					return false;
				}
				
			},

			/**
			 * 获取选择科室,并请求该科室下的医生和协议
			 */
			async getSelectDepartment(data){
				
				console.log(data);
				this.getProtocols(data)
				const res = await doctorsByOrgCodeAndDeptId({
					token:this.userInfo.token,
					orgCode:this.userInfo.hospitalCode,
					deptId:data
				});
				console.log(res)
				if(res.data&&res.data.errCode===0){
					this.testData.doctorList.list = res.data.body.map(item => {
						item.label = item.doctorName;
						item.value = item.doctorId;
						return item;
					});
					// this.testData.doctorList.default = [this.testData.doctorList.list[0].value,this.testData.doctorList.list[2].value]
				}else{

				}
			},

			/**
			 * 获取业务模块
			 */
			getBussModuleList(){
				let result = this.$store.state.user.userInfo.hasAuth.filter(item => item.type === '1');//筛选出管理权限
				let mapList = [//全部列表
					{
						authorityId:'10000',
						text:'远程门诊'
					},
					{
						authorityId:'20000',
						text:'远程会诊'
					},
					{
						authorityId:'30000',
						text:'远程协作'
					},
					{
						authorityId:'40000',
						text:'智能随访'
					},
					{
						authorityId:'50000',
						text:'健康档案'
					},
					{
						authorityId:'60000',
						text:'远程教育'
					},
					{
						authorityId:'70000',
						text:'分级诊疗'
					},
					{
						authorityId:'80000',
						text:'双向转诊'
					},
					{
						authorityId:'90000',
						text:'移动查房'
					},
					{
						authorityId:'100000',
						text:'终端管理'
					},
					{
						authorityId:'110000',
						text:'家医服务'
					},
				];
				this.bussModuleList.list = [{text:'全部'},...result.map(item => {
					for(const i of mapList){
						if(i.authorityId === item.authorityId) return i;
					}
				})];
			},

			/**
			 * 获取业务类型
			 */
			async getBussTypeList(){
				const res = await businessType({
					token:this.userInfo.token,
					orgCode:this.userInfo.hospitalCode,
					departmentId:''
				});
				console.log(res);
				if(res.data&&res.data.errCode===0){
					this.bussTypeList.list = 
					this.bussTypeList.list = [{text:'全部'},...res.data.body.map(item => {
						return {text:item};
					})]
				}else{

				}
			},

			/**
			 * 根据科室获取协议
			 */
			async getProtocols(data){
				const res = await protocols({
					token:this.userInfo.token,
					departmentId:data
				});
				console.log(res);
				if(res.data&&res.data.errCode===0){
					this.testData.agreement.list = res.data.body.map(item => {
						item.label = item.protocolName;
						item.value = item.protocolId;
						return item;
					});
					this.testData.agreement.default = {
						label:this.testData.agreement.list[0].label,
						value:this.testData.agreement.list[0].value,
					};
					this.getProtocolById(this.testData.agreement.default.value)
				}else{

				}
			},

			/**
			 * 获取协议具体内容
			 */
			async getProtocolById(data){
				const res = await protocolById({
					token:this.userInfo.token,
					protocolId:data
				});
				console.log(res);
				if(res.data&&res.data.errCode===0){
					this.testData.agreement.showContent = res.data.body.protocolContent;
					this.testData.agreement.default = {
						label:res.data.body.protocolName,
						value:res.data.body.protocolId
					};
					
				}else{

				}
			},

			/**
			 * 取消文本模式
			 */
			closeTextClass(){
				console.log('clear');
				this.testData.businessTypeList.default = {
					label:'', 
					value:''
				}
			},

			/**
			 * 17.2传入模版名获取模版
			 */
			async byStencilModel(data){
				const modelMap = {
					YCJH:'HOUR',
					ZXZX:'TIMES',
					SMFW:'TIMES',
					JYSB:'DAY',
					ZNPJ:'TIMES',
					PHFW:'DAY',
				};
				this.testData.businessPrice.data[0].unitEnum = modelMap[data];
				console.log(data)
				const res = await stencilModel({
					token:this.userInfo.token,
					stencilName:data
				});
				console.log(res);
				if(res.data&&res.data.errCode===0){
					const resMap = {
						typeExist:'businessTypeList',//模版业务类型 (true 表示有；false表示无)
						nameExist:'businessName',//模版业务名 (true 表示有；false表示无)
						departmentExist:'departmentList',//模版业务科室 (true 表示有；false表示无)
						doctorExist:'doctorList',//模版业务医生 (true 表示有；false表示无)
						descExist:'businessDescription',//模版业务描述 (true 表示有；false表示无)
						protocolExist:'agreement',//模版业务协议 (true 表示有；false表示无)
						phoneExist:'servicePhone',//模版业务电话 (true 表示有；false表示无)
						priceExist:'businessPrice',//模版业务价格 (true 表示有；false表示无)
					};
					for(const i in res.data.body){
						// resMap[i] && res.data.body[i]===true ? this.testData[resMap[i]].show = true : null
						if(resMap[i]){
							if(res.data.body[i]===true){
								this.testData[resMap[i]].show = true
							}else if(res.data.body[i]===false){
								this.testData[resMap[i]].show = false
							}
						}
					}
					console.log(this.testData)
					
				}else{

				}
			},

			/**
			 * 保存信息(新增业务)
			 */
			async saveInfo(){
				console.log(this.testData);
				const postData = [//请求参数
					{token:this.userInfo.token},
					{
						businessId:this.testData.businessId,//业务id
						businessType:this.testData.businessTypeList.default.value,//业务类型
						stencilEnum:this.testData.businessTemplate.default.value,//业务模版
						businessName:this.testData.businessName.label,//业务名
						businessDepartmentId:this.testData.departmentList.default.value,//业务科室id
						orgCode:this.userSelfInfo.orgCode,//业务医院id
						businessDoctors:this.testData.doctorList.default,//业务医生
						businessDesc:this.testData.businessDescription.label,//业务描述
						businessProtocolId:this.testData.agreement.default.value,//业务协议id
						businessProtocolName:this.testData.agreement.default.label,//业务协议名
						businessProtocolContent:this.testData.agreement.showContent,//业务协议内容
						businessPhone:this.testData.servicePhone.label,//业务电话
						status:false,//业务状态
						businessPrice:[],//业务价格
					}
				];
				if(this.testData.businessTemplate.default.value==='JTYS'){//家庭医生 这个模板和其他模板的价格是不一样的，判断下
					let i = 1; 
					for(i;i<4;i++){
						postData[1].businessPrice.push({ 
							worth:this.testData.businessPrice.data[i].worth,//价格数值
							unitEnum:this.testData.businessPrice.data[i].unitEnum,//价格单位  （HOUR//小时；TIMES//次；DAY//天；MONTH//月；QUARTER//季；YEAR//年；）
							valueUnit:1,//价格单位值
							childList:[//该价格下的子业务
								...this.testData.businessPrice.data[i].childList.map(v=>{
									return {
										childId:v.childId,
										childName:v.childName,
										childDepName:v.childDepName,
										childDoctors:v.childDoctors,
										stencilEnum:v.stencilEnum,
										times:v.times
									};
								})
							]
						});
					}
					
				}else{
					postData[1].businessPrice.push({
						worth:this.testData.businessPrice.data[0].worth,//价格数值
						unitEnum:this.testData.businessPrice.data[0].unitEnum,//价格单位  （HOUR//小时；TIMES//次；DAY//天；MONTH//月；QUARTER//季；YEAR//年；）
						valueUnit:1,//价格单位值
						childList:[]
					})
				}
				const res = await addBusiness(...postData);
				console.log(res);
				if(res.data&&res.data.errCode===0){
					console.log('success')
				}else{
					console.log('error')
				}
			},

			/**
			 * 新增业务被提交
			 */
			async getAddData(data){
				console.log(data);
				// const postData = [
				// 	{token:this.userInfo.token},
				// 	{
				// 		businessId:'',//业务id
				// 		businessType:'',//业务类型
				// 		stencilEnum:data.businessTemplate.default.value,//业务模版
				// 		businessName:data.businessName.label,//业务名
				// 		businessDepartmentId:data.departmentList.default.value,//业务科室id
				// 		orgCode:'',//业务医院id
				// 		businessDoctors:data.doctorList.default,//业务医生
				// 		businessDesc:data.businessDescription,//业务描述
				// 		businessProtocolId:agreement.default.value,//业务协议id
				// 		businessProtocolName:agreement.default.label,//业务协议名
				// 		businessProtocolContent:agreement.showContent,//业务协议内容
				// 		businessPhone:data.servicePhone,//业务电话
				// 		status:false,//业务状态
				// 		businessPrice:[],//业务价格
				// 		childList:[],//业务子业务
				// 	}
				// ];
				// const res = await addBusiness();
			},

			test(){console.log('click')},
		},
		async created(){
			this.getFetchHospitalDepts();
			this.getBussModuleList();
			this.getBussTypeList();
		}
	}
</script>

<style scoped>
	.family-medicine-management{

	}
	.family-medicine-management-top{
		margin-bottom: 0.3rem;
	}
	.family-medicine-management-middle{
		display: flex;
	}
	.family-medicine-management-middle > div{
		flex: 1;
	}
	.family-medicine-management-middle-right{	
		display: flex;
		justify-content: space-around;	
	}
	.family-medicine-management-middle-right>div{
		display: inline-block;
	}
	.family-medicine-management-content-layout{
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
	.family-medicine-management-body-part-two{
		border-radius: 0.04rem;
		border: 1px solid var(--color5);
		/* box-shadow: 0 0.06rem 0.36rem 0  */
	}
	.part-two-head{
		display: flex;
		padding-top: 0.2rem;
	}
	.part-two-body{
		padding-top: 0.2rem;
	}
	.part-two-head>div{
		flex: 1;
	}
	.part-two-head-right{
		display: flex;
	}
	.family-new-alert-normal-item{
		display:flex;
		align-items: center;
		margin-bottom: 0.24rem;
	}
	.family-new-alert-normal-item-value{
		display: flex;
		flex-wrap: wrap;
	}
	.family-new-alert-normal-item-value>.el-input{
		width:3rem !important;
	}
	.family-new-alert-normal-item-value>.el-select{
		width:3rem;
	}
	.family-new-alert-spe-price{
		display: grid;
		grid-template-columns: 1fr 1px 1fr 1px 1fr;
		box-sizing: border-box;
		border: 1px solid var(--color8);
		border-radius: 4px;
		margin-bottom: 0.24rem;
		/* height: 300px; */
	}
	.family-new-alert-spe-price-item{
		padding-top: 0.22rem;
		
	}
	.family-new-alert-spe-price-item-segmentation{
		background: var(--color8);
	}
	.family-new-alert-spe-price-item-head-input-div{
		display: flex;
		align-items: center;
		border: 1px solid #FE5578;
		border-radius: 4px;
		width: 1.96rem;
		padding-left: 0.2rem;
		height: .39rem;
		margin: 0 auto;
		margin-bottom: 0.28rem;
	}
	.family-new-alert-spe-price-item-head-icon{
		margin-right: 0.2rem;
		font-size: var(--fontsize1)
	}
	.family-new-alert-spe-price-item-head-content-input{
		width: 0.8rem;
		background:none;  
		outline:none;  
		border:0px;
	}
	.family-new-alert-spe-price-item-head-unit{
		background-color: #FE5578;
		flex: 1;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
	}
	.family-new-alert-spe-price-item-body-item{
		display: flex;
		align-items: center;
		border: 1px solid #EBEBEB;
		border-radius: 4px;
		width: 2.11rem;
		margin: 0 auto;
		justify-content: space-between;
		padding-right: 0.1rem;
		padding-left: 0.1rem;
		height: 0.3rem;
		margin-bottom: 0.09rem;
	}
	.family-new-alert-spe-price-item-body-item-count{
		width:0.4rem;
		outline:none;  
		border:0px;
	}
	.family-new-alert-spe-price-item-body-item-name{
		font-size: var(--fontSize1);
		color: var(--color7);
		letter-spacing: 0.5px;
	}
	.family-new-alert-normal-item-name{
		width: .8rem;
	}
	.family-new-alert-normal-userhead{
		width:0.4rem;
        height: 0.4rem;
        position: relative;
        margin-right: 0.3rem;
	}
	.family-new-alert-normal-userhead>img{
		display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
	}
	.family-new-alert-normal-userhead>i{
		color: var(--color6);
        cursor: pointer;
        position: absolute;
        right: -10px;
        bottom: -8px;
        margin: 0;
	}
	.family-new-alert-normal-userhead>p{

	}
	.family-new-alert-normal-item-value-spe{
		width: 80%;
	}
	.input-item-value-div{
		width: 100%;
		
		
	}
	.family-new-alert-edit-agreement{
		outline:none;  
		border:0px;
	}
	.family-new-alert-edit-agreement-content{
		width: 100%;
		border: none;
		outline:none;  
		margin-top: 0.22rem;
	}
	.family-new-alert-agreement-head{
		border-bottom: 1px solid #DCDCDC;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.input-item-value-div-spe{
		border: 1px solid #DCDCDC;
		padding-left: 0.1rem;
		padding-right: 0.1rem;
	}
	.save-btn{
		display: flex;
		justify-content: center;
	}
	.show-with-edit-count{
		border: none;
		outline:none; 
		width: .4rem;
	}
</style>