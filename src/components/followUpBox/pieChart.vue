<template>
    <div>
        {{inData}}
        <div :id='inData.id' style='width：600px;height:600px'>
        </div>
    </div>
</template>

<script>
// import echarts from "../../plugs/echarts.js";
import echarts from "echarts";
export default {
    watch:{
        inData(n){
            this.$nextTick(arg=>this.drawLine())
        }
    },
    data() {
        return {
            oX:[],
            oY:[],
        };
    },
    mounted() {
       
        
    },
    methods: {
         async drawLine() {
            // debugger
            // 基于准备好的dom，初始化echarts实例
            let myChart1 = await echarts.init(document.getElementById(this.inData.id));
            // 绘制图表
            myChart1.setOption({
                title: {
                    text: "某站点用户访问来源",
                    subtext: "纯属虚构",
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: [
                        "直接访问",
                        "邮件营销",
                        "联盟广告",
                        "视频广告",
                        "搜索引擎"
                    ]
                },
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: [
                            { value: 335, name: "直接访问" },
                            { value: 310, name: "邮件营销" },
                            { value: 234, name: "联盟广告" },
                            { value: 135, name: "视频广告" },
                            { value: 1548, name: "搜索引擎" }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
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
        //  this.$nextTick(arg=>this.drawLine())
        $.each(inData.data.data,function(index,text){
            this.oX.push(text.x)
             this.oY.push(text.y)
        })
        this.drawLine();
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