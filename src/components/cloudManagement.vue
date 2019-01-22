<template>
	<div class="cloud-management">
		云存储管理
		<div class="cloud-management-head">
			<search></search>
		</div>
		<div class="cloud-management-body">
			<div class="config-module">
				<div class="config-module-content">
					<div class="config-module-content-head">
						<span>{{cloudStorage.fullName||'缺失'}}</span>
						<i class="iconfont edit-business" @click="editBusiness">&#xe608;</i>
					</div>
					<div class="config-module-content-price-list">
						<div class="config-module-content-price" v-for="(item,index) in cloudStorage.price" :key="index" v-show="index<3">
							<span class="price-to">To</span>
							<span class="price-symbol"><i class="iconfont price-symbol-icon">&#xe76d;</i></span>
							<span class="price-num">{{item.worth}}<span>/{{item.valueUnit}}年</span></span>
						</div>
					</div>
					<div class="config-module-content-config">
						<p class="config-module-content-config-title">医院配置</p>
						<div class="config-module-content-config-body">
							<div class="business-item" v-for="(item,index) in cloudStorage.hospital" :key="index">
								{{item.hospitalName}}
								<!-- <p>
									<span>重庆市西南医院</span>
									<span>档案数(18)</span>
								</p>
								<p>
									<span>重庆市西南医院</span>
									<span>档案数(18)</span>
								</p> -->
							</div> 
							<p v-if="cloudStorage.hospital.length<=0">暂无数据</p>
						</div>
					</div>
				</div>
			</div>
			<div class="cloud-management-table">
				<table>
					<thead class="cloud-management-table-thead">
					    <tr class="cloud-management-table-thead-tr">
							<th ><span>{{tableInfo.header.userName||'缺失'}}</span></th>
							<th ><span>{{tableInfo.header.phone||'缺失'}}</span></th>
							<th ><span>{{tableInfo.header.members||'缺失'}}</span></th>
							<th ><span>{{tableInfo.header.archives||'缺失'}}</span></th>
							<th ><span>{{tableInfo.header.hospitals||'缺失'}}</span></th>
							<th ><span>{{tableInfo.header.orders||'缺失'}}</span></th>
							<th ><span>{{tableInfo.header.expiredTime||'缺失'}}</span></th>
							<!-- <th ><span>操作</span></th> -->
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in tableInfo.data.list" :key="index">
							<th><span>{{item.userName||'缺失'}}</span></th>
							<th><span>{{item.phone||'缺失'}}</span></th>
							<th><span>{{item.members||'缺失'}}</span></th>
							<th><span>{{item.archives||'缺失'}}</span></th>
							<th><span>{{item.hospitals||'缺失'}}</span></th>
							<th><span>{{item.orders||'缺失'}}</span></th>
							<th><span>{{item.expiredTime||'缺失'}}</span></th>
							<!-- <th ><el-button type="success" plain size="mini">编辑</el-button></th> -->
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<addNewFrame :inData="haveATry" @reback="getData"></addNewFrame>
		<Modal
			v-model="editingBusiness.show"
			title="编辑"
			
			footer-hide
			@on-ok="editOk"
			@on-cancel="editCancel">
			<div class="editing-business-alert">
				<div class="editing-business-alert-item">
					<span class="editing-business-alert-item-name">业务名称</span>
					<div class="editing-business-alert-item-value">
						<el-input
						placeholder="请输入内容"
						size="mini"
						v-model="editingBusiness.name"
						clearable>
						</el-input>
					</div>
				</div>
				<div class="editing-business-alert-item">
					<span class="editing-business-alert-item-name">医院配置</span>
					<div class="editing-business-alert-item-value">
						<el-select v-model="editingBusiness.configurations" multiple placeholder="请选择">
							<el-option
							size="mini"
							v-for="item in editingBusiness.configurationsList"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
			</div>
		</Modal>
		<!-- <render :propData="propTest"></render> -->
	</div>
</template>

<script>
	import { mapState } from "vuex"
	import addNewFrame from '../public/publicComponents/addNewFrame.vue'
	import search from '../public/publicComponents/search.vue'
	import {fetchUserCloud, viewCloud} from '../api/apiAll.js'
	


	import render from '../public/publicComponents/render.vue'
	export default {
		components:{
			search,
			addNewFrame,
			render
		},
		computed: {
			...mapState({
				userState: state => state.user.userInfo
			})
		},
		data () {
			return {
				propTest:[
					['a'],
					[
						[
							'b'
						],
						[
							'c',
							'd'
						]
					]
				],
				haveATry:{
					show:false,
					type:'1',//1表示新增在线诊室，2表示新增家医业务
					businessTypeList:[//新增在线诊室业务类型
						{
							label:'//新增在线诊室业务类型1',
							value:'//新增在线诊室业务类型value1'
						},
						{
							label:'//新增在线诊室业务类型2',
							value:'//新增在线诊室业务类型value2'
						}
					],
					businessTemplate:[//新增家医业务模板
						{
							label:'//新增家医业务模板1',
							value:'//新增家医业务模板value1'
						},
						{
							label:'//新增家医业务模板2',
							value:'//新增家医业务模板value2'
						},
					],
					departmentList:[//科室列表
						{
							label:'//科室列表1',
							value:'//科室列表value1'
						},
						{
							label:'//科室列表2',
							value:'//科室列表value2'
						},
					],
					doctorList:[//医生列表
						{
							label:'//医生列表1',
							value:'//医生列表value1'
						},
						{
							label:'//医生列表2',
							value:'//医生列表value2'
						},
					],
					agreement:[
						{
							name:'1st',
							content:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
						},
						{
							name:'2nd',
							content:'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
						},
					]
				},
				

/*********************************************************************************************** */
				
				editingBusiness:{//编辑业务
					show:false,//是否显示
					name:'',//名称
					configurations:[],//医院配置（已选择）
					configurationsList:[],//医院配置（所有）
					priceList:[//价格
						// {
						// 	price:'',
						// 	year:0
						// }
					]

				},
				cloudStorage:{//云存储 第一个表格数据
					description:'',//这是云存储的描述
					fullName:'',//云存储业务
					hospital:[
						// {
						// 	hospitalOrgCode:'',//医院机构码
						// 	hospitalName:'',//医院机构名
						// 	days:0//配置天数
						// }
					],
					hospitalCount:0,//
					id:'',//
					phone:'',//
					price:[
						// {
						// 	worth:0,//价格数值
						// 	unitEnum:'',//价格单位  (HOUR,//小时   TIMES,//次   DAY,//天   MONTH,//月   QUARTER,//季   YEAR,//年)
						// 	valueUnit:0//价格单位值
						// },
						// {
						// 	worth:0,//价格数值
						// 	unitEnum:'',//价格单位  (HOUR,//小时   TIMES,//次   DAY,//天   MONTH,//月   QUARTER,//季   YEAR,//年)
						// 	valueUnit:0//价格单位值
						// },
						// {
						// 	worth:0,//价格数值
						// 	unitEnum:'',//价格单位  (HOUR,//小时   TIMES,//次   DAY,//天   MONTH,//月   QUARTER,//季   YEAR,//年)
						// 	valueUnit:0//价格单位值
						// },
						// {
						// 	worth:0,//价格数值
						// 	unitEnum:'',//价格单位  (HOUR,//小时   TIMES,//次   DAY,//天   MONTH,//月   QUARTER,//季   YEAR,//年)
						// 	valueUnit:0//价格单位值
						// }
					],
					protocolContent:null,
					protocolId:null,
					protocolName:null
				},

				/**
				 * 表格信息
				 */
				tableInfo:{
					header:{
						archives:'',
						expiredTime:'',
						hospitals:'',
						members:'',
						orders:'',
						phone:'',
						userName:''
					},
					data:{
						endRow:0,
						firstPage:0,
						hasNextPage:false,
						hasPreviousPage:false,
						isFirstPage:true,
						isLastPage:true,
						lastPage:0,
						list:[
							// {
							// 	archives:0,
							// 	expiredTime:'',
							// 	hospitals:'',
							// 	members:'',
							// 	orders:'',
							// 	phone:'',
							// 	userId:'',
							// 	userName:''
							// }
						]
					},
				},

				/**
				 * 业务信息
				 */
				businessInfo:{
					id:'',
					fullName:'',
					description:'',//云存储的描述
					phone:'',
					protocolId:'',
					protocolName:'',
					protocolContent:'',
					price:[
						// {
						// 	worth: 0,     //价格数值
						// 	unitEnum: "YEAR",     //价格单位  (HOUR,//小时   TIMES,//次   DAY,//天   MONTH,//月   QUARTER,//季   YEAR,//年)
						// 	valueUnit: 3      //价格单位值
						// }
					],
					hospital:[
						// {
						// 	hospitalOrgCode: "1545649424290",     //医院机构码
						// 	hospitalName: "冠方",                   //医院机构名
						// 	days: 30                              //配置天数
						// }
					],
					hospitalCount:0
				}
			}
		},
		methods:{





			/**
			 * 获取业务信息
			 */
			async getBusinessInfo(){
				const res = await viewCloud({token: this.userState.token});
				console.log(res);
				if(res.data && res.data.errCode === 0){
					this.cloudStorage = res.data.body;
				}else{
					this.$notify({
						title: '失败',
						message: '业务信息数据获取失败',
						type: 'error'
					});
				}
			},

			/**
			 * 获取表格信息
			 */
			async getTableInfo(){
				const res = await fetchUserCloud({token: this.userState.token});
				console.log(res);
				if(res.data && res.data.errCode === 0){
					this.tableInfo.header = res.data.body.header;
					this.tableInfo.data = res.data.body.data2;
				}else{
					console.log('fail')
					this.$notify({
						title: '失败',
						message: '表格数据获取失败',
						type: 'error'
					});
				}
			},

			/**
			 * 编辑业务
			 * 
			 */
			editBusiness(){
				this.editingBusiness.show = true;
			},

			/**
			 * 确认编辑
			 */
			editOk(){

			},

			/**
			 * 取消编辑
			 */
			editCancel(){},
			/******************** */
			getData(data){
				console.log(data)
			}
		},
		async created(){
			this.getTableInfo();
			this.getBusinessInfo();
		}
	}
</script>

<style scoped>
	.cloud-management{

	}
	.cloud-management-head{
		padding: 0.2rem;
	}
	.cloud-management-body{

	}
	.config-module{

	}
	.config-module-content{
		width: 6.3rem;
		/* height: 2.18rem; */
		border: 1px solid var(--color5);
		box-shadow: 0 0.06rem 0.36rem 0 rgba(0,62,100,0.04);
		border-radius: 0.04rem;
		padding-left: 0.36rem;
		padding-bottom: 0.16rem;
	}
	.cloud-management-table{
		padding-top: 0.44rem;
	}
	.config-module-content-config{
		width: 5.22rem;
		/* height: 1.18rem; */
		border: 1px solid var(--borderColor6);
		border-left: 2px solid var(--borderColor5);
		padding-left: 0.14rem;
		padding-top: 0.13rem;
	}
	.config-module-content-head{
		padding-top: 0.13rem;
		padding-right: 0.33rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: var(--color18);
		font-weight: bold;
	}
	.config-module-content-price{
		padding-top: 0.2rem;
		display: flex;
		align-items: center;
		margin-right: 0.5rem;
	}
	.config-module-content-config-body{
		/* padding-top: 0.15rem;
		padding-bottom: 0.12rem; */
		display: grid;
		grid-template-columns:1fr 1fr;
		justify-content: start;
		align-items: center;
	}
	.price-to{
		font-family: var(--fontFamily4);
		color: var(--color19);
		padding-right: 0.08rem;
	}
	.price-symbol-icon{
		color: var(--borderColor5);
	}
	.price-num{
		font-size: var(--fontSize6);
		color: var(--borderColor5);
		padding-left: 0.08rem;
	}
	.config-module-content-config-title{
		font-family: var(--fontFamily3);
		color: var(--color18);
	}
	.business-item span{
		font-family: var(--fontFamily3);
		color: var(--color18);
	}
	.business-item {
		/* display: grid;
		grid-template-columns:1fr 1fr; */
		/* display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 0.1rem; */
	}
	.business-item > p{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 0.8rem;
	}
	.cloud-management-table>table{
		width: 100%;
	}
	.cloud-management-table>table tr{
		border-bottom: 1px solid var(--borderColor1);
		height: 0.4rem;
		color: var(--color3);
		
	}
	.cloud-management-table>table th{
		text-align: center;
	}
	.cloud-management-table-thead-tr th{
		color: var(--color3);
		font-weight: bold;
    	cursor: pointer;
	}
	.edit-business{
		cursor: pointer;
		color: var(--borderColor5);
	}
	.config-module-content-price-list{
		display: flex;
	}
	.price-num>span{
		font-size: var(--fontSize3);
	}
	.editing-business-alert-item{
		display: flex;
		align-items: center;
	}
</style>