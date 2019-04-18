<template>
	<div class="cloud-management">
		<div class="cloud-management-head">
			<search @searchValue="searchChange"></search>
		</div>
		<div class="cloud-management-body">
			<div class="config-module">
				<div class="config-module-content">
					<div class="config-module-content-head">
						<span>{{cloudStorage.fullName||'缺失'}}</span>
						<i class="iconfont edit-business" @click="editBusiness">&#xe608;</i>
					</div>
					<div class="config-module-content-price-list">
						<span class="price-to">To</span>
						<div  class="config-module-content-price-out">
							<div class="config-module-content-price" v-for="(item,index) in cloudStorage.price" :key="index" v-show="index<3">
								<!-- <span class="price-to">To</span> -->
								<span class="price-symbol"><i class="iconfont price-symbol-icon">&#xe76d;</i></span>
								<span class="price-num">{{item.worth}}<span>/{{item.valueUnit}}年</span></span>
							</div>
						</div>
						
					</div>
					<div class="config-module-content-config">
						<p class="config-module-content-config-title">医院配置</p>
						<div class="config-module-content-config-body">
							<div class="business-item" v-for="(item,index) in showsSelectList" :key="index" v-text="item.hospitalName || ''"></div> 
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
		<div class="pagination">
			<el-pagination
					background
					layout="prev, pager, next"
					:page-size="queryConditions.page.size"               
					:current-page="queryConditions.page.current"
					:total="queryConditions.page.total"
					v-if="queryConditions.page.total!=0"
					@current-change="ChangePage"
			></el-pagination>
		</div>
		<Modal
			v-model="editingBusiness.show"
			title="编辑"
			footer-hide
			@on-ok="editOk"
			@on-cancel="getBusinessInfo">
			<div class="editing-business-alert">
				<div class="editing-business-alert-item">
					<span class="editing-business-alert-item-name">业务名称</span>
					<div class="editing-business-alert-item-value">
						<el-input
						placeholder=""
						size="mini"
						v-model="cloudStorageCopy.fullName"
						clearable>
						</el-input>
					</div>
				</div>
				<div class="editing-business-alert-item">
					<span class="editing-business-alert-item-name">价格</span>
					<div class="editing-business-alert-item-value">
						<div class="editing-business-price-item" v-for="(item,index) in cloudStorageCopy.price" :key="index">
							<div class="editing-business-alert-input-price">
								<el-input
								placeholder=""
								size="mini"
								v-model="item.worth"
								clearable>
								</el-input>
							</div>
							<div class="editing-business-alert-selcert">
								<el-dropdown>
								<span class="el-dropdown-link">
									<span>{{item.valueUnit}}</span>年<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item v-for="i in [1,2,5]" :key="i" :command="i" @click.native="handleCommand(i,index)">{{i}}年</el-dropdown-item>
								</el-dropdown-menu>
								</el-dropdown>
							</div>
						</div>
					</div>
					<el-button type="primary" icon="el-icon-plus" size="mini" @click="addPriceItem"></el-button>
				</div>
				<div class="editing-business-alert-item">
					<span class="editing-business-alert-item-name">医院配置</span>
					<div class="editing-business-alert-item-value">
						<el-select v-model="cloudStorageCopy.hospital" multiple placeholder="" size="mini">
							<el-option
							v-for="item in configurationsList"
							:key="item.hospitalOrgCode"
							:label="item.hospitalName"
							:value="item.hospitalOrgCode">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="editing-business-alert-item">
					<span class="editing-business-alert-item-name"></span>
					<div class="editing-business-alert-item-right-set">
						<span v-for="(item,index) in showsSelectList" :key="index" class="editing-business-show-config" v-text="item.hospitalName || ''"></span>
					</div>
				</div>
				<div class="editing-business-alert-item">
					<el-checkbox v-model="cloudStorageCopy.agree">用户协议</el-checkbox>
				</div>
				<div class="editing-business-alert-item editing-business-sub">
					<el-button type="primary" @click="subHospitalConfig">确定</el-button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { mapState } from "vuex"
	import search from '../public/publicComponents/search.vue'
	import {fetchUserCloud, viewCloud, hospitalsByCloud, updateCloud, addCloud} from '../api/apiAll.js'
	import { deepCopy } from '../public/publicJs/deepCopy.js'
	export default {
		watch:{
			'cloudStorageCopy.hospital':{
				handler(n){
					let newArr = [...new Set(n)];
					this.showsSelectList = this.configurationsList.filter(v=>{
						for(const i of newArr){
							if(i === v.hospitalOrgCode) return v;
						}
					});
				}
			},
		},
		components:{
			search,
		},
		computed: {
			...mapState({
				userState: state => state.user.userInfo
			})
		},
		data () {
			return {
				queryConditions:{//查询条件    
					page:{//分页
						current:1,
						size:10,
						total:0
					},
					keyWorlds:'' 
				},
				showsSelectList:[],
				editingBusiness:{//编辑业务  
					show:false,//是否显示
					name:'',//名称
					configurations:[],//医院配置（已选择）
					configurationsList:[],//医院配置（所有）
					configurationsObj:[],//医院配置（已选择）,坑爹的返回的只有id,手动改下 
					priceList:[//价格 
						{
							price:'',
							year:'1'
						}
					],
					agree:false,//是否同意协议

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
					protocolName:null,
					agree:false
				},
				cloudStorageCopy:{//云存储 副本,给弹窗用的，免得相互影响
					description:'',//
					fullName:'',//
					hospital:[],
					hospitalCount:0,//
					id:'',//
					phone:'',//
					price:[],
					protocolContent:null, 
					protocolId:null,
					protocolName:null,
					agree:false
				},

				/**
				 * 医院配置
				 */
				configurationsList:[],

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
			 * 关键字 搜索
			 */
			searchChange(data){
				this.queryConditions.keyWorlds = data;
				this.getTableInfo();
			},
			/**
			 * 分页切换
			 */
			ChangePage(data){
				console.log(data);
				this.queryConditions.page.current = data;
				this.getTableInfo();
			},
			/**
			 * 获取业务信息
			 */
			async getBusinessInfo(){
				const res = await viewCloud({token: this.userState.token});
				console.log(res);
				if(res.data && res.data.errCode === 0){
					res.data.body.agree = res.data.body.protocolId!=='';
					res.data.body.hospital = res.data.body.hospital.map(item=>item.hospitalOrgCode);//拍平，只留下hospitalOrgCode。特么反回个null什么意思
					this.cloudStorage = res.data.body;
					let newArr = [...new Set(this.cloudStorage.hospital)];
					this.showsSelectList = this.configurationsList.filter(v=>{  
						for(const i of newArr){
							if(i === v.hospitalOrgCode) return v;
						}
					});
					// this.showsSelectList = res.data.body.hospital;
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
				const res = await fetchUserCloud({
					token: this.userState.token,
					search:this.queryConditions.keyWorlds,
					pageNum:this.queryConditions.page.current,
					pageSize:this.queryConditions.page.size
				});
				console.log(res);
				if(res.data && res.data.errCode === 0){
					this.tableInfo.header = res.data.body.header;
					this.tableInfo.data = res.data.body.data2;
					this.queryConditions.page.total = res.data.body.data2.total
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
				this.cloudStorageCopy = deepCopy(this.cloudStorage); 
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

			/**
			 * 编辑业务 -> 添加'价格'
			 */
			addPriceItem(){
				if(this.cloudStorageCopy.price.length>=3){
					this.$notify({
						title: '添加失败',
						message: '最多只能添加三个!!',
						type: 'error'
					});
				}else{
					this.cloudStorageCopy.price.push({worth: 0,unitEnum: "YEAR",valueUnit: 1 });
				}
			},

			/**
			 * 用户选择年限
			 */
			handleCommand(i,index){
				console.log(i)
				console.log(index)
				const newObj = this.cloudStorageCopy.price[index];
				// console.log(newObj)
				newObj.valueUnit = i;
				this.cloudStorageCopy.price.splice(index,1,newObj);
			},

			/**
			 * 8.21.6（仅用于云存储）获取所有医院机构码和医院名
			 */
			async getHospitalsByCloud(){
				const res = await hospitalsByCloud({token: this.userState.token});
				console.log(res)
				if(res.data && res.data.errCode === 0){
					this.configurationsList = res.data.body.map(item=>{
						item.hospitalOrgCode = item.code;
						return item;
					});
					const newArr = [...new Set(this.cloudStorageCopy.hospital)];
					this.showsSelectList = this.configurationsList.filter(v=>{
						for(const i of newArr){
							if(i === v.hospitalOrgCode) return v;
						}
					})
				}else{
					this.$notify({
						title: '数据获取失败',
						message: '医院机构码和医院名获取失败',
						type: 'error'
					});
				}
			},

			/**
			 * 提交医院配置
			 */
			async subHospitalConfig(){
				const options = [
					{token: this.userState.token},
					{
						cloudId:this.cloudStorageCopy.id,
						cloudName:this.cloudStorageCopy.fullName,
						price:this.cloudStorageCopy.price,
						cloudDesc:this.cloudStorageCopy.description,
						protocolId:this.cloudStorageCopy.protocolId,
						protocolName:this.cloudStorageCopy.protocolName,
						protocolContent:this.cloudStorageCopy.protocolContent,
						phone:this.cloudStorageCopy.phone,
						hospital:this.showsSelectList
					}
				];
				console.log(options)
				options[1].cloudId ? this.editOption(options) : this.addOption(options);
			},
			/**
			 * 修改 医院配置
			 */
			async editOption(options){
				const res = await updateCloud(...options);
				console.log(res);
				if(res.data && res.data.errCode === 0){
					this.$notify({
						title: '成功',
						message: '修改成功',
						type: 'success'
					});
					// this.getBusinessInfo();
					this.editingBusiness.show = false;
					this.cloudStorage = deepCopy(this.cloudStorageCopy);
					let newArr = [...new Set(this.cloudStorageCopy.hospital)];
					this.showsSelectList = this.configurationsList.filter(v=>{
						for(const i of newArr){
							if(i === v.hospitalOrgCode) return v;
						}
					});
				}else{
					this.$notify({
						title: '修改失败',
						message: res.data.errMsg,
						type: 'error'
					});
				}
			},
			/**
			 * 添加 医院配置
			 */
			async addOption(options){
				const res = await addCloud(...options);
				console.log(res);
				if(res.data && res.data.errCode === 0){
					this.$notify({
						title: '成功',
						message: '添加成功',
						type: 'success'
					});
					// this.getBusinessInfo();
					this.editingBusiness.show = false;
					this.cloudStorage = deepCopy(this.cloudStorageCopy);
					let newArr = [...new Set(this.cloudStorageCopy.hospital)];
					this.showsSelectList = this.configurationsList.filter(v=>{
						for(const i of newArr){
							if(i === v.hospitalOrgCode) return v;
						}
					});
				}else{
					this.$notify({
						title: '添加失败',
						message: res.data.errMsg,
						type: 'error'
					});
				}
			},
		},
		async created(){
			this.getTableInfo();
			this.getBusinessInfo();
			this.getHospitalsByCloud();
		}
	}
</script>

<style>
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
		display: flex;
		align-items: flex-end;
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
		position: relative;
	}
	.price-num>span{
		font-size: var(--fontSize3);
	}
	.editing-business-alert-item{
		display: flex;
		align-items: center;
		padding-left: 0.2rem;
		margin-bottom: 0.1rem;
	}
	.editing-business-alert-item-name{
		padding-right: 0.2rem;
		text-align: justify;
		width: 0.8rem;
	}
	/* .editing-business-alert-item-name::after{
		content: " ";
		display: inline-block;
		width: 100%;
	} */
	.editing-business-alert-item-value{
		display: flex;
		/* flex: 1; */
	}
	.editing-business-price-item{
		display: flex;
		align-items: center;
		margin-right: 0.1rem;
	}
	.editing-business-alert-input-price .el-input{
		width: 01rem;
	}
	.editing-business-price-item .editing-business-alert-selcert{
		display: flex;
		align-items: center;
		background-color: var(--color8);
		height: 100%;
		/* background: red !important; */
		display: flex;
		align-items: center;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		width: 0.42rem;
	}
	.editing-business-sub>.el-button--primary{
		width: 100%;
	}
	.editing-business-alert-input-price>.el-input{ 
		width: 0.6rem;
	}
	.editing-business-alert-input-price input{
		margin: 0;
		width:0.6rem;
	}
	.editing-business-alert-item-right-set{
		display: flex;
		flex-wrap: wrap;
	}
	.editing-business-show-config{
		margin-right: 0.1rem;
	}
	.pagination{
		text-align: center;
		width:100%;
	}
	.config-module-content-price-out{
		display: flex;
	}
</style>