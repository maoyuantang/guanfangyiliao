<template>
	<div class="normal-column-chart" ref="testEcharts"></div>
</template>

<script>
    import echarts from '../../plugs/echarts.js'
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
                                x:'right',
                                textStyle:{//标题样式
                                    color:'#fff',
                                    borderRadius: '4px',
                                    fontFamily:'PingFangSC-Light',
                                    fontSize: '14',
                                    fontWeight:'normal',
                                    width:'1000px',
                                    height:32,
                                    verticalAlign:'middle',
                                    // label: {
                                    // // 在文本中，可以对部分文本采用 rich 中定义样式。
                                    // // 这里需要在文本中使用标记符号：
                                    // // `{styleName|text content text content}` 标记样式名。
                                    // // 注意，换行仍是使用 '\n'。
                                    //     formatter: [
                                    //         '{a|这段文本采用样式a}',
                                    //         '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
                                    //     ].join('\n'),

                                    //     rich: {
                                    //         a: {
                                    //             color: 'red',
                                    //             lineHeight: 10
                                    //         },
                                    //         b: {
                                    //             backgroundColor: {
                                    //                 image: 'xxx/xxx.jpg'
                                    //             },
                                    //             height: 40
                                    //         },
                                    //         x: {
                                    //             fontSize: 18,
                                    //             fontFamily: 'Microsoft YaHei',
                                    //             borderColor: '#449933',
                                    //             borderRadius: 4
                                    //         },
                                            
                                    //     }
                                    // }
                                },
                               
                            }
                            
                             
                        ],
                        
                        // title: {
                        //     text: setData.title,//标题文字
                        //     textStyle:{//标题样式
                        //         color:'#000',
                        //         fontFamily:'PingFangSC-Light',
                        //         fontSize: '25',
                        //         fontWeight:'normal'
                        //     },
                        //     subtext:'fubiaoti',//副标题
                        //     subtextStyle:{//副标题样式
                        //         width:100,
                        //         height:32,
                        //         textBorderColor:'blue',
                        //         backgroundColor:'red',//标题背景色
                        //         fontSize:'50px',
                        //         align:'right',
                        //         color:'red',
                        //         x:'right'
                        //     }
                        // },
                        
                        xAxis: {
                            data: setData.dataAxis
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
                                    normal: {color: 'rgba(0,0,0,0.05)'}
                                },
                                barGap:'-100%',
                                barCategoryGap:'40%',
                                data: dataShadow,
                                animation: false
                            },
                            {
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                {offset: 0, color: '#83bff6'},
                                                {offset: 0.5, color: '#188df0'},
                                                {offset: 1, color: '#188df0'}
                                            ]
                                        )
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
            this.draw({
                dataAxis:this.inData.dataAxis,
                data:this.inData.data,
                title:this.inData.title,
                total:this.inData.total
            });
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