<template>
    <div>
        <!-- <div :id='inData.id' style='width：600px;height:600px'>
        </div> -->
        dd
        <div id='myChart' style='width：600px;height:600px'>
        </div>
    </div>
</template>

<script>
// import echarts from "../../plugs/echarts.js";
// import echarts from "echarts";
import echarts from 'echarts/lib/echarts'
export default {
    data() {
        return {
            oX: [],
            oY: []
        };
    },
    mounted() {
       
    },
    methods: {
        drawLine() {
            // // 基于准备好的dom，初始化echarts实例
            // let myChart = echarts.init(document.getElementById('myChart'));

            // // 绘制图表
            // myChart.setOption({
            //     title: { text: "在Vue中使用echarts" },
            //     tooltip: {},
            //     xAxis: {
            //         data: [
            //             "衬衫",
            //             "羊毛衫",
            //             "雪纺衫",
            //             "裤子",
            //             "高跟鞋",
            //             "袜子"
            //         ],
            //         // show : false
            //     },
            //     yAxis: {
            //         // show : false
            //     },
            //     series: [
            //         {
            //             name: "销量",
            //             type: "pie",
            //             data: [5, 20, 36, 10, 10, 20]
            //         }
            //     ]
            // });
            // 基于准备好的dom，初始化echarts实例
             this.$nextTick(arg=>{
            var myChart = echarts.init(document.getElementById("myChart"));

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: "ECharts 入门示例"
                },
                tooltip: {},
                legend: {
                    data: ["销量"]
                },
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
             })
        }
    },
    props: { inData: Object },
    model: {
        prop: ["inData"],
        event: "reBack"
    },
    async created() {
         this.drawLine();
        let _this = this;
        // $.each(this.inData.data.data, function(index, text) {
        //     _this.oX.push(text.x);
        //     _this.oY.push(text.y);
        // });
    },
    async beforeMount() {}
};
</script>

<style scoped>
.normal-column-chart {
    width: 500px;
    height: 300px;
    /* border: 1px solid red; */
}
</style>