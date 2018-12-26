<template>
	<div class="statistics-way">
		<span>时间段：</span>
        <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
        <span>
            <Dropdown>
                <a href="javascript:void(0)">
                   {{defaultSelect.name}}
                    <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="(item,index) in testData" :key="index" @click.native="getIndex(index)">{{item.name}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </span>
	</div>
</template>

<script>
	export default {
		data () {
			return {
                time:null,
                testData:[
                    {name:'按科室统计'},
                    {name:'按日统计'},
                    {name:'按月统计'},
                    {name:'按年统计'}
                ],
                defaultSelect:{name:'按月统计'}
			}
        },
        watch:{
            time(n,o){
                // console.log(n);
                this.sendData();
            }
        },
		methods:{
            sendData(){//发送消息
                 this.$emit('reBack',{
                    time:this.time,
                    select:this.defaultSelect
                })
            },
            getIndex(index){//点击调用该函数
                this.defaultSelect = this.testData[index];
                this.sendData();
            }
		},
		props: {
			inData:Object
		},
		model:{
			prop:['inData'],
			event:'reBack' 
		},
		async created(){
		}
	}
</script>

<style>
	.statistics-way{

    }
    .statistics-way>.el-date-editor{
        width: 247px;
        border: none;
    }
   .statistics-way .el-input__icon{
        display: none;
    }
    .statistics-way .el-range-input{
       border: 1px solid #E5EDF3;
       border-radius: 4px;
    }
    .statistics-way .el-date-editor .el-range-separator{
        width: 10%;
    }
    .statistics-way .ivu-dropdown{
        display:inline-flex;
        width: 163px;
        height: 35px;
        justify-content: center;
        align-items: center;
        border: 1px solid #4DA1FF;
        border-radius: 4px;
    }
</style>

<!--
    使用先知：
        -该组件功能：1.获取时间段，2：获取统计方式
        -传参：无
        -用reBack接收数据
        -数据结构：{
            time：null/Array//time为null或者数组，没有选择时为null，选择时，time[0]开始时间，time[1]结束时间
            select：{name:"按月统计"}
        }
        -实例：
        	父组件 :
		<template>
			<div class="father">
				<statisticsWay v-model="setData" @reBack="getData"></statisticsWay>
			</div>
		</template>
		<script>
			import statisticsWay from '../xxx/statisticsWay.vue'//第一步：引入
			export default {
				data(){
					return{
					}
				},
				components:{
					statisticsWay//注册组件
				},
				methods:{
					getData(res){//接收返回值
						console.log(res);
					}
				}
			}
		</script>
-->