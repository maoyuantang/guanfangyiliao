<template>
    <div>
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
        return {
            oData: []
        };
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
            let _this = this;
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
                    _this.oData.push({
                        value: i,
                        name: ""
                    });
                }
                // $.each(this.inData.data,function(index,text){
                //     _this.oData.push({
                //          value:text.x,
                //         name:text.y
                //     })
                // })
                console.log(setData.dataAxis)
                for (let i = 0; i < setData.dataAxis.length; i++) {
                    _this.oData[i].name =setData.dataAxis[i] ;
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
                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    color: ["#1CD1A1", "#6C5CE7", "#FECA57"],
                    // legend: {
                    //     orient: "vertical",
                    //     right: "10px",
                    //     data: ["数量"]
                    // },
                    xAxis: {
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
                            name: "数量",
                            type: "pie",
                            label: {
                                normal: {
                                    show: false,
                                    position: "center"
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: _this.oData
                        }
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
        //  this.draw()
    },
    async beforeMount() {}
};
</script>

<style scoped>
.normal-column-chart {
    width: 300px;
    height: 300px;
}
</style>