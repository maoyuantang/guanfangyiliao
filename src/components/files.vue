<template>
    <div class="files">
        健康档案系统

        <tableList :tableData="tableDataList" :columns="columns" :tableBtn="tableBtn"></tableList>
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="opageSize" @current-change="seeCurrentChange">
        </el-pagination>
        <div id="myChart" :style="{width: '100%', height: '300px'}"></div>

        <search @searchValue="searchChange"></search>
    </div>
</template>

<script>
import echarts from "../plugs/echarts.js";
import tableList from "../public/publicComponents/publicList.vue";
import search from "../public/publicComponents/search.vue";
export default {
    components: {
        tableList,
        search
    },
    data() {
        return {
            odata: 1,
            odata: {
                header: {
                    deviceNum: "家用设备数",
                    superOrgNum: "上级医院数",
                    childOrgNum: "下级医院数",
                    deptManageNum: "科室管理员数",
                    consNum: "会诊范围",
                    name: "医院名称",
                    subSystemNum: "子系统数",
                    deptNum: "科室数",
                    id: "操作",
                    teamNum: "协作人员",
                    doctorNum: "医生数",
                    account: "医院账号"
                },
                data: {
                    pageNum: 1,
                    pageSize: 10,
                    size: 2,
                    startRow: 1,
                    endRow: 2,
                    total: 2,
                    pages: 1,
                    list: [
                        {
                            id: "91F0B9D25A474B6FA0CDBAC872035984",
                            code: "1545649424290",
                            name: "冠方医院",
                            account: "admin2",
                            subSystemNum: 0,
                            deptNum: 0,
                            deptManageNum: 0,
                            doctorNum: 0,
                            superOrgNum: 0,
                            childOrgNum: 0,
                            teamNum: 0,
                            consNum: 0,
                            deviceNum: 0
                        },
                        {
                            id: "120BAE29C23C470E9E73DED3D8C071BF",
                            code: "1545618639429",
                            name: "测试医院",
                            account: "admin",
                            subSystemNum: 0,
                            deptNum: 0,
                            deptManageNum: 0,
                            doctorNum: 0,
                            superOrgNum: 0,
                            childOrgNum: 0,
                            teamNum: 0,
                            consNum: 0,
                            deviceNum: 0
                        }
                    ],
                    prePage: 0,
                    nextPage: 0,
                    isFirstPage: true,
                    isLastPage: true,
                    hasPreviousPage: false,
                    hasNextPage: false,
                    navigatePages: 8,
                    navigatepageNums: [1],
                    navigateFirstPage: 1,
                    navigateLastPage: 1,
                    firstPage: 1,
                    lastPage: 1
                }
            },
            columns: [
                {
                    prop:"name",
                    label:"姓名"
                },
                {
                    prop:"age",
                    label:"年龄"
                }
            ],
            tableDataList: [
                {
                    age: "1545649424290",
                    name: "冠方医院",
                },
                {
                    age: "1545618639429",
                    name: "测试医院",
                },
            ],
            tableBtn: [
                {
                    name: "查看记录",
                    method: (index, row) => {
                        this.handleDel(index, row);
                    }
                },
                {
                    name: "查看记录",
                    method: (index, row) => {
                        this.handleDel(index, row);
                    }
                },
                {
                    name: "查看记录",
                    method: (index, row) => {
                        this.handleDel(index, row);
                    }
                }
            ]
        };
    },
    async created() {
        this.circularData(this.odata["header"]);
        // this.drawLine();
    },
    mounted() {
        this.drawLine();
    },
    methods: {
        // 表格分页
        seeCurrentChange(){

        },
        handleDel(index, row) {
            alert(index)
        },
        //处理标题数据好方便传入子组件
        circularData(data) {
            // var _this = this;
            // $.each(data, function(key, value) {
            //     _this.columns.push({
            //         prop: key,
            //         label: data[key]
            //     });
            // });
        },
        //搜索框
        searchChange(data){
            alert(data)
        },
        drawLine() {
            var myChart = echarts.init(document.getElementById("myChart"));
            // app.title = "多 Y 轴示例";

            var colors = ["#1875F0", "#1CD1A1 ", "#FE5578"];

           var option = {
                color: colors,

                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross"
                    }
                },
                grid: {
                    right: "20%"
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ["档案查询提取", "档案主动推送", "平均温度"]
                },
                xAxis: [
                    {
                        type: "category",
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: [
                            "1月",
                            "2月",
                            "3月",
                            "4月",
                            "5月",
                            "6月",
                            "7月",
                            "8月",
                            "9月",
                            "10月",
                            "11月",
                            "12月"
                        ]
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "蒸发量",
                        min: 0,
                        max: 250,
                        position: "right",
                        axisLine: {
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisLabel: {
                            formatter: "{value} ml"
                        }
                    },
                    {
                        type: "value",
                        name: "降水量",
                        min: 0,
                        max: 250,
                        position: "right",
                        offset: 80,
                        axisLine: {
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        axisLabel: {
                            formatter: "{value} ml"
                        }
                    },
                    {
                        type: "value",
                        name: "温度",
                        min: 0,
                        max: 25,
                        position: "left",
                        axisLine: {
                            lineStyle: {
                                color: colors[2]
                            }
                        },
                        axisLabel: {
                            formatter: "{value} °C"
                        }
                    }
                ],
                series: [
                    {
                        name: "蒸发量",
                        type: "bar",
                        data: [
                            2.0,
                            4.9,
                            7.0,
                            23.2,
                            25.6,
                            76.7,
                            135.6,
                            162.2,
                            32.6,
                            20.0,
                            6.4,
                            3.3
                        ]
                    },
                    {
                        name: "降水量",
                        type: "bar",
                        yAxisIndex: 1,
                        data: [
                            2.6,
                            5.9,
                            9.0,
                            26.4,
                            28.7,
                            70.7,
                            175.6,
                            182.2,
                            48.7,
                            18.8,
                            6.0,
                            2.3
                        ]
                    },
                    {
                        name: "平均温度",
                        type: "line",
                        yAxisIndex: 2,
                        data: [
                            2.0,
                            2.2,
                            3.3,
                            4.5,
                            6.3,
                            10.2,
                            20.3,
                            23.4,
                            23.0,
                            16.5,
                            12.0,
                            6.2
                        ]
                    }
                ]
            };
            myChart.setOption(option);
        }
    }
};
</script>

<style scoped>
.files {
}
</style>