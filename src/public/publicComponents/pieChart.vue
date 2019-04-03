<template>
    <div>
        {{inData}}
        <div class="normal-column-chart" ref="testEcharts">

        </div>
    </div>

</template>

<script>
import echarts from "../../plugs/echarts.js";
// import echarts from 'echarts'
// import echarts from 'echarts/lib/echarts'
require("echarts/lib/chart/bar");
require("echarts/lib/component/title");
require("echarts/lib/component/dataZoom");

export default {
    data() {
        return {};
    },
    props: {
        inData: Object
    },
    model: {
        prop: ["inData"]
    },
    watch: {
        inData(n) {
            this.draw({
                dataAxis: n.dataAxis,
                data: n.data,
                title: n.title
            });
            console.log("change");
        }
    },
    methods: {
        getNum(num) {
            //高位加一，其余位置0
            if (Object.prototype.toString.call(num) !== "[object Number]") {
                return {
                    ok: false,
                    msg: "数据类型错误",
                    data: {}
                };
            }
            num = Math.ceil(num);
            num = num.toString();
            if (num.length === 1) {
                //个位数
                num = parseInt(num);
                return {
                    data: num,
                    ok: true,
                    msg: ""
                };
            }
            let bs = parseInt(num[0]) + 1;
            return {
                data: bs * Math.pow(10, num.length - 1),
                ok: true,
                msg: ""
            };
        },
        getMax(arr) {
            //选出最大值
            if (Object.prototype.toString.call(arr) !== "[object Array]") {
                return {
                    ok: false,
                    msg: "数据类型错误",
                    max: 0
                };
            }
            let max = 0;
            try {
                for (let i of arr) {
                    i > max ? (max = i) : null;
                }
            } catch (e) {
                return {
                    ok: false,
                    msg: "出现错误",
                    max: 0
                };
            }
            return {
                ok: true,
                msg: "",
                max: max
            };
        },
        draw(setData) {
            this.$nextTick(arg => {
                if (!this.$refs.testEcharts) return;
                const myChart = echarts.init(this.$refs.testEcharts);
                let getMaxNum = this.getMax(setData.data);
                if (!getMaxNum.ok) {
                    console.log(getMaxNum.msg);
                    return;
                }
                let yMax = this.getNum(getMaxNum.max);
                yMax = yMax.data;
                var dataShadow = [];
                for (const i of setData.data) {
                    dataShadow.push(yMax);
                }
                console.log(dataShadow);
                const option = {
                    title: [
                        {
                            text: setData.title, //标题文字
                            x: "center",
                            y: "top",
                            // textAlign:'center',
                            textStyle: {
                                //标题样式
                                color: "#000",
                                fontFamily: "PingFangSC-Light",
                                fontSize: "18",
                                fontWeight: "normal"
                            }
                        }
                    ],
                    color: ["#1CD1A1", "#6C5CE7", "#FECA57"],
                    legend: {
                        data: ["销量"]
                    },
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
                        show: false
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
                                color: "#999"
                            }
                        }
                    },
                    dataZoom: [
                        {
                            type: "inside"
                        }
                    ],
                    series: [
                        {
                            name: "销量",
                            type: "pie",
                            data: [5, 20, 36, 10, 10, 20]
                        },
                        //  {
                        //     name: "销量",
                        //     type: "pie",
                        //     data: [5, 20, 36, 10, 10, 20]
                        // }
                        // {
                        //     // For shadow
                        //     type: "pie",
                        //     itemStyle: {
                        //         normal: {
                        //             color: 'rgba(172,195,226,0.1)',
                        //         },
                        //     },
                        //     barGap: "-100%",
                        //     barCategoryGap: "40%",
                        //     data: dataShadow,
                        //     animation: false,
                        //     barMaxWidth: 14
                        // },
                        // {
                        //     type: "pie",
                        //     barMaxWidth: 14,
                        //     itemStyle: {
                        //         normal: {
                        //             barBorderRadius:[5, 5, 5, 5],
                        //             color: ['#59BCFB','red']
                        //         },
                        //         emphasis: {
                        //             color: new echarts.graphic.LinearGradient(
                        //                 0, 0, 0, 1,
                        //                 [
                        //                     {offset: 0, color: 'yellow'},
                        //                     {offset: 0.7, color: '#2378f7'},
                        //                     {offset: 1, color: '#83bff6'}
                        //                 ]
                        //             )
                        //         }
                        //     },
                        //     data: setData.data
                        // }
                    ]
                };
                myChart.setOption(option);
            });
        }
    },
    props: {
        inData: Object
    },
    model: {
        prop: ["inData"],
        event: "reBack"
    },
    async created() {
        console.log(this.inData);
        this.draw({
            dataAxis: this.inData.dataAxis,
            data: this.inData.data,
            title: this.inData.title
        });
    },
    async beforeMount() {}
};
</script>

<style scoped>
.normal-column-chart {
    width: 200px;
    height: 300px;
    /* border: 1px solid red; */
}
</style>