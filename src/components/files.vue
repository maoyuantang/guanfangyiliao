<template>
	<div class="files">
		健康档案系统

		<tableList :tableData="tableDataList" :columns="columns" :tableBtn="tableBtn"></tableList>
		<!-- <input type="text" v-model="odata"> -->
	</div>
</template>

<script>
import tableList from "../public/publicComponents/publicList.vue";
export default {
	 components: {
        tableList
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
            columns: [],
            // columns: [
            //     {
            //         prop: "deviceNum",
            //         label: "家用设备数",
            //         align: "center",
            //         oclass: ""
            //     },
            //     {
            //         prop: "superOrgNum",
            //         label: "上级医院数",
            //         align: "center"
            //     },
            //     {
            //         prop: "deviceNum",
            //         label: "家用设备数",
            //         align: "center",
            //         oclass: ""
            //     },
            //     {
            //         prop: "superOrgNum",
            //         label: "上级医院数",
            //         align: "center"
            //     }
            // ],
            tableDataList: [
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
            tableBtn: [
                {
                    name: "查看记录",
                    address: "上海市普陀区金沙江路 1518 弄",
                    method: (index, row) => {
                        this.handleDel(index, row);
                    }
                },
                {
                    name: "查看记录",
                    address: "上海市普陀区金沙江路 1518 弄",
                    method: (index, row) => {
                        this.handleDel(index, row);
                    }
                },
                {
                    name: "查看记录",
                    address: "上海市普陀区金沙江路 1518 弄",
                    method: (index, row) => {
                        this.handleDel(index, row);
                    }
                }
            ]
        };
    },
    async created() {
		this.circularData(this.odata["header"]);
	},
    methods: {
        handleDel(index, row) {
            alert(" index:", index);
            alert(" row:", row);
		},
		//处理标题数据好方便传入子组件
        circularData(data) {
			var _this=this;
            $.each(data, function(key, value) {
                _this.columns.push({
                    prop: key,
                    label: data[key]
				});
			});
			
		}
		
    },
};
</script>

<style scoped>
.files {
}
</style>