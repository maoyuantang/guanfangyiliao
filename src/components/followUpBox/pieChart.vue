<template>
    <div>
        <!-- <div :id='inData.id' style='width：600px;height:600px'>
        </div> -->
        <div id='myChart' style='width：600px;height:600px'>
        </div>
    </div>
</template>

<script>
import echarts from "../../plugs/echarts.js";
// import echarts from "echarts";
export default {
    data() {
        return {
            oX: [],
            oY: []
        };
    },
    mounted() {
        this.drawLine();
    },
    methods: {
        drawLine() {

            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('myChart'));

            // 绘制图表
            myChart.setOption({
                title: { text: "在Vue中使用echarts" },
                tooltip: {},
                xAxis: {
                    data: [
                        "衬衫",
                        "羊毛衫",
                        "雪纺衫",
                        "裤子",
                        "高跟鞋",
                        "袜子"
                    ],
                    // show : false
                },
                yAxis: {
                    // show : false
                },
                series: [
                    {
                        name: "销量",
                        type: "pie",
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            });
        }
    },
    props: { inData: Object },
    model: {
        prop: ["inData"],
        event: "reBack"
    },
    async created() {
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