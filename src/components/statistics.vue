<template>
	<div class="statistics">
		默认首页
		<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

		<el-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose">
			<span>这是一段信息</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>


		<!-- <div class="mark">
			<div class="mark-inner">
				<div class="mark-content">
					<div class="mark-add" v-if="isAdd">
						<p class="mark-add-title">新增<p>
						<div class="add-module">
							<div class="input-layer">
								<div class="leyer-item">
									<span class="leyer-item-name">姓名::</span>
									<el-input  placeholder="请输入内容" size="mini"></el-input>
								</div>
								<div class="leyer-item">
									<span class="leyer-item-name">电话::</span>
									<el-input  placeholder="请输入内容" size="mini"></el-input>
								</div>
							</div>
							<div class="input-layer">
								<div class="leyer-item">
									<span class="leyer-item-name">姓名::</span>
									<el-input  placeholder="请输入内容" size="mini"></el-input>
								</div>
								<div class="leyer-item">
									<span class="leyer-item-name">电话::</span>
									<el-input  placeholder="请输入内容" size="mini"></el-input>
								</div>
							</div>
							<div class="input-layer">
								<span class="leyer-item-name">姓名::</span>
								<el-select v-model="value" placeholder="请选择" size="mini">
										<el-option
											v-for="item in departmentlist"
											:key="item.name"
											:label="item.name"
											:value="item.name">
											</el-option>
										</el-select>
							</div>

						</div>	
						<div></div>	
						<div></div>	
						<div></div>	
					</div>
					<div class="mark-invite" v-else>
						
					</div>
				</div>
			</div>
		</div> -->
		<div>
			<normalTab v-model="some" @reBack="reData"></normalTab>
		</div>
		
		<div class="set-flex">
			<normalColumnChart v-model="drawData" v-for="i in 6"></normalColumnChart>
		</div>
		<!-- <div>
			<el-dropdown >
				<el-button type="primary">
					更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="testSomeThing">黄金糕</el-dropdown-item>
					<el-dropdown-item>狮子头</el-dropdown-item>
					<el-dropdown-item>螺蛳粉</el-dropdown-item>
					<el-dropdown-item>双皮奶</el-dropdown-item>
					<el-dropdown-item>蚵仔煎</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div> -->
		<!-- <div>
			<div class="block">
				<span class="demonstration">默认</span>
				{{value6}}
				<el-date-picker
				v-model="value6"
				type="daterange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期">
				</el-date-picker>
			</div>
		</div>  -->
		<!-- <selftag @reBack="gitIndex" v-model="test"></selftag> -->
		<!-- <selftag @reBack="gitIndex" v-model="test"></selftag> -->
		<el-button type="primary" @click="changeComFun">主要按钮</el-button>
		<div>
			<div :is="changeCom?'test':'testb'"></div>
			<!-- <test></test> -->
		</div>
		<div>
			<statisticsWay @reBack='getTime'></statisticsWay>
		</div>
	</div>
</template>

<script>
import normalTab from '../public/publicComponents/normalTab.vue'
import normalColumnChart from '../public/publicComponents/normalColumnChart.vue'
import selftag from '../public/publicComponents/selftag.vue'
import statisticsWay from '../public/publicComponents/statisticsWay.vue'


import test from './test.vue'//测试动态渲染组件
import testb from './testb.vue'
	export default {
		watch:{
			value6(n,o){
				console.log(n)
			}
		},
		data () {
			return {
				dialogVisible: false,
				isAdd:true,//新增还是邀请协作，默认新增
				departmentlist:[//科室列表
					{name:'第一科'},
					{name:'第2科'},
					{name:'第3科'},
					{name:'第4科'},
					{name:'第5科'},
					{name:'第6科'},
					{name:'第7科'},
					{name:'第8科'},
				],
				value:null,
				/**************************************** */
				changeCom:false,
				some:{
					i:1,
					list:[
						{
							en:'STATISTICS',
							zh:'统计'
						},
						{
							en:'Account number & authority',
							zh:'账号及权限'
						},
						{
							en:'Dr. WEB',
							zh:'医生端'
						},
					]
				},
				drawData:{
					dataAxis:['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'],
					data:[220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234],
					title:'测试测试,修改修改',
					total:308
				},
				value6:'miaoa',
				test:{
                    more:true,
                    title:'测试456465',
                    list:[
                        {
                            text:'all'
                        },
                        {
                            text:'1st'
                        },
                        {
                            text:'2st'
                        },
                        {
                            text:'3st'
                        },
                        {
                            text:'4st'
                        },
                    ]
				},
				
			}
		},
		methods:{
			reData(data){
				console.log(data);
				console.log(this.some)
				// this.some.i = data.index
			},
			gitIndex(index){
				console.log(index)
			},
			testSomeThing(){
				console.log('simida')
			},
			changeComFun(){
				this.changeCom = !this.changeCom  
			},
			getTime(msg){
				console.log(msg)
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
			}
		},
		components:{
			normalTab,
			normalColumnChart,
			selftag,
			statisticsWay,
			test,
			testb
		},
		async created(){
			
		}
	}
</script>

<style scoped>
	.statistics{
		min-height: 100%;
	}
	.mark{
		position:fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	.mark-inner{
		position: relative;
		width: 100%;
		height: 100%;
		background: rgba(37,38,49,.6);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.mark-content{
		width: 6.02rem;
		/* height: 602px; */
		background: var(--whiteColor);
		border: 1px solid var(--color6);
		border-radius: 0.048rem;
		padding-left: 0.52rem;
		padding-right: 0.52rem;
	}
	.mark-add-title{
		font-family: var(--fontFamily3);
		font-size: var(--fontSize7);
		color: var(--color7);
		line-height: 0.33rem;
		text-align: center;
		margin-bottom: 0.24rem;
	}
	.input-layer{
		
		display: flex;
		
	}
	.leyer-item{
		
		flex: 1;
		display: flex;
		/* justify-content: space-around; */
		align-items: center;
	}
	.leyer-item-name{
		/* width: 20%; */
	}
	.leyer-item .el-input {
		width: 60%;
	}
	.leyer-item .el-select{
		width: 80% !important;
	}
	.star-five{
		width: 0;
		height: 0;
		color: red;
		margin: 50px 0;
		position: relative;
		display: block;
		border-left: 100px solid transparent;
		border-right: 100px solid transparent;
		border-bottom: 70px solid red;
		-moz-transfrom:rotate(35deg);
		-webkit-transform:rotate(35deg);
		-ms-transform:rotate(35deg);
		-o-transform:rotate(35deg);
	}

	.star-five:before{
		width: 0;
		height: 0;
		border-left: 30px solid transparent ;
		border-right: 30px solid transparent;
		border-bottom: 80px solid red;
		position: absolute;
		top: -45px;
		left: -65px;
		 color: white;
		display: block;
		content: "";
		-moz-transform:rotate(-35deg);
		-webkit-transform:rotate(-35deg);
		-ms-transform:rotate(-35deg);
		-o-transform:rotate(-35deg);
	}
	.star-five:after{
		width: 0;
		height: 0;
		display: block;
		position: absolute;
		color: red;
		top: 3px;
		left: -105px;
		border-left: 100px solid transparent;
		border-right: 100px solid transparent;
		border-bottom: 70px solid red;
		content: "";
		-moz-transform:rotate(-70deg);
		-webkit-transform:rotate(-70deg);
		-ms-transform:rotate(-70deg);
		-o-transform:rotate(-70deg);
	}

	/***************************************************************/

/* 
	.add-module{
		
	}
	.module-layer{
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.18rem;
	}
	.input-part{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 2rem;
	}
	.input-part .el-input{
		width: 60%;
	}
	.suffix-icon{
		color: red;
		font-size: 0.12rem;
	} */
	/***************************************************************/
	.set-flex{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.set-flex>div{
		max-width: 30%;
		min-width: 30%;
		flex: 1;
	}
</style>