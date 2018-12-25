<template>
	<div class="files">
		健康档案系统

		<tableList  :tableData="tableDataList" :columns="columns" :tableBtn="tableBtn" ></tableList>
		<!-- <input type="text" v-model="odata"> -->
	</div>
</template>

<script>
import tableList from "../public/publicComponents/publicList.vue";
export default {
    data() {
        return {
            odata: 1,
                columns: [
                    {
                        prop: "date",
                        label: "姓名",
						align: "center",
						oclass:""
					},
					{
                        prop: "name",
                        label: "年龄",
                        align: "center"
                    },{
                        prop: "date",
                        label: "年龄",
                        align: "center"
                    },{
                        prop: "name",
                        label: "年龄",
                        align: "center"
                    },
                ],
                tableDataList: [
                    {
                        date: "2016-05-02",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                        date: "2016-05-04",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1517 弄"
                    },
                    {
                        date: "2016-05-01",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1519 弄"
                    },
                    {
                        date: "2016-05-03",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1516 弄"
                    }
                ],
                tableBtn: [
                    {
                        name: "查看记录",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                        name: "查看记录",
                        address: "上海市普陀区金沙江路 1518 弄"
                    },
                    {
                        name: "查看记录",
                        address: "上海市普陀区金沙江路 1518 弄"
                    }
                ]
        };
    },
    methods: {},
    components: {
        tableList
    },
    async created() {}
};
</script>

<style scoped>
.files {
}
</style>