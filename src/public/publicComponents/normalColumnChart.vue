<template>
	<div class="normal-column-chart" ref="testEcharts"></div>
</template>

<script>
    // import echarts from '../../plugs/echarts.js'
    import echarts from 'echarts/lib/echarts'
    require('echarts/lib/chart/bar')
    require('echarts/lib/component/title')
	export default {
		data () {
			return {	
			}
        },
        props:{
            inData:Object
        },
        model:{
            prop:['inData']  
        },
        watch:{
            inData(n){
                this.draw({
                    dataAxis:n.dataAxis,
                    data:n.data,
                    title:n.title,
                    total:n.total
                });
                console.log('change')
            }
        },
		methods:{
            getNum(num){//高位加一，其余位置0
                if(Object.prototype.toString.call(num)!=="[object Number]"){
                    return {
                        ok:false,
                        msg:'数据类型错误',
                        data:{}
                    }
                }
                num = Math.ceil(num);
                num = num.toString();
                if(num.length === 1){//个位数
                    num = parseInt(num);
                    return {
                        data:num,
                        ok:true,
                        msg:'',
                    }
                }
                let bs = parseInt(num[0]) + 1;
                return {
                    data:bs * Math.pow(10,num.length-1),
                    ok:true,
                    msg:'',
                }
            },
            getMax(arr){//选出最大值
                if(Object.prototype.toString.call(arr)!=="[object Array]"){
                    return {
                        ok:false,
                        msg:'数据类型错误',
                        max:0
                    }
                }
                let max = 0;
                try{
                    for(let i of arr){
                        i>max?max=i:null;
                    }
                }catch(e){
                    return {
                        ok:false,
                        msg:'出现错误',
                        max:0
                    }
                }
                return{
                    ok:true,
                    msg:'',
                    max:max 
                } 
            },
			draw(setData){
                this.$nextTick(arg=>{
                    if(!this.$refs.testEcharts)return;
                    const myChart = echarts.init(this.$refs.testEcharts);
                    let getMaxNum = this.getMax(setData.data);
                    if(!getMaxNum.ok){
                        console.log(getMaxNum.msg);
                        return;
                    }
                    let yMax = this.getNum(getMaxNum.max);
                    yMax = yMax.data;
                    var dataShadow = [];
                    for(const i of setData.data){
                        dataShadow.push(yMax);
                    }
                    const option = {
                        title:[
                            {
                                text: setData.title,//标题文字
                                textStyle:{//标题样式
                                    color:'#000',
                                    fontFamily:'PingFangSC-Light',
                                    fontSize: '25',
                                    fontWeight:'normal'
                                },
                            },
                            {
                                text: setData.total,//标题文字
                                backgroundColor:'#FE5578',
                                borderRadius: '4px',
                                // x:'right',
                                right:'60px',
                                // padding: 15,
                                textStyle:{//标题样式
                                    color:'#fff',
                                    borderRadius: '4px',
                                    fontFamily:'PingFangSC-Light',
                                    fontSize: '14',
                                    fontWeight:'normal',
                                    width:'1000px',
                                    height:32,
                                    verticalAlign:'middle',
                                },
                               
                            }
                            
                             
                        ],
                       
                        xAxis: {
                            data: setData.dataAxis,
                            axisTick: {
                                show: false
                            },
                            
                            axisLabel:{
                                textStyle: {
                                    color: '#8C8C8C',//坐标值得具体的颜色
            
                                }
                            }
                        },
                        yAxis: {
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#999'
                                }
                            }
                        },
                        dataZoom: [
                            {
                                type: 'inside'
                            }
                        ],
                        series: [
                            { // For shadow
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        color: 'rgba(172,195,226,0.1)',
                                        // barBorderRadius:[10, 10, 10, 10],
                                    },
                                },
                                barGap:'-100%',
                                barCategoryGap:'40%',
                                data: dataShadow,
                                animation: false,
                                barMaxWidth:14,
                                
                            },
                            {
                                type: 'bar',
                                barMaxWidth:14,
                                itemStyle: {
                                    normal: {
                                        barBorderRadius:[5, 5, 5, 5],
                                        color: '#59BCFB'
                                        // color: new echarts.graphic.LinearGradient(
                                        //     0, 0, 0, 1,
                                        //     [
                                        //         {offset: 0, color: '#83bff6'},
                                        //         {offset: 0.5, color: '#188df0'},
                                        //         {offset: 1, color: '#188df0'}
                                        //     ]
                                        // )
                                    },
                                    emphasis: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                {offset: 0, color: '#2378f7'},
                                                {offset: 0.7, color: '#2378f7'},
                                                {offset: 1, color: '#83bff6'}
                                            ]
                                        )
                                    }
                                },
                                data: setData.data
                            }
                        ]
                    };
                    myChart.setOption(option)
                });
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
            console.log(this.inData)
            this.draw({
                dataAxis:this.inData.dataAxis,
                data:this.inData.data,
                title:this.inData.title,
                total:this.inData.total
            });
        },
        async beforeMount(){
            
        }
	}
</script>

<style scoped>
	.normal-column-chart{
        width: 500px;
        height: 300px;
        /* border: 1px solid red; */
    }
</style>
<!--
    使用先知：
        -该组件功能为显示柱形图，引用echarts.js
        -传入参数为一个对象
        -传参结构(已经处理过，可以直接v-model绑定)：{
            dataAxis:['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'],//每个柱子代表的类名
            data:[220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234],//具体数值
            title:'测试测试,修改修改'//图表标题
        }
        -没有事件返回
        -实例：
        <template>
			<div class="father">
				<normalColumnChart v-model="setData" @reBack="getData"></normalColumnChart>
			</div>
		</template>
		<script>
            import normalColumnChart from '../xxx/normalColumnChart.vue'//第一步：引入
			export default {
				data(){
					return{
						drawData:{
                            dataAxis:['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'],//每个柱子代表的类名
                            data:[220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234],//具体数值
                            title:'测试测试,修改修改'//图表标题
                        }
					}
				},
				components:{
                    normalColumnChart
                }
			}
		</script>
-->