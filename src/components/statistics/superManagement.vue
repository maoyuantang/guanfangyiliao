<template>
	<div class="super-management">
		超级管理员
        <div class="super-management-top">
            <search></search>
        </div>
        <div class="super-management-middle">
            <publicList :columns="tableData.head" :tableData="tableData.data" :tableBtn="tableData.btns"></publicList> 
        </div>
	</div>
</template>

<script>
import { fetchHospitalList } from "../../api/apiAll.js";
import { mapState } from "vuex";
import search from "../../public/publicComponents/search.vue";
import publicList from "../../public/publicComponents/publicList.vue";
import { constants } from 'zlib';
export default {
    components: {
        search,
        publicList
    },
    data() {
        return {
            tableData:{
                head:[
                    {
                        prop:"name",
                        label:"姓名"
                    },
                    {
                        prop:"age",
                        label:"年龄"
                    }
                ],
                data:[
                    {
                        age: "1545649424290",
                        name: "冠方医院",
                        oclass:"redColor"
                    },
                    {
                        age: "1545618639429",
                        name: "测试医院",
                        oclass:"redColor"
                    }

                ],
                btns:[
                    {
                        name: "编辑",
                        oclass:"evaluateBtn",
                        method: (index, row) => {
                            this.evaluateFun(index, row);
                        }
                    },
                    // {
                    //     name: "查看记录",
                    //     oclass:"recordBtn",
                    //     method: (index, row) => {
                    //         this.recordFun(index, row);
                    //     }
                    // }
                ]
            },
            body: {
                "header": {
                    "deviceNum": "家用设备数",
                    "superOrgNum": "上级医院数",
                    "childOrgNum": "下级医院数",
                    "deptManageNum": "科室管理员数",
                    "consNum": "会诊范围",
                    "name": "医院名称",
                    "subSystemNum": "子系统数",
                    "deptNum": "科室数",
                    "id": "操作",
                    "teamNum": "协作人员",
                    "doctorNum": "医生数",
                    "account": "医院账号"
                },
                "data1": null,
                "data2": {
                    "pageNum": 1,
                    "pageSize": 10,
                    "size": 1,
                    "startRow": 1,
                    "endRow": 1,
                    "total": 1,
                    "pages": 1,
                    "list": [
                        {
                            "id": "91F0B9D25A474B6FA0CDBAC872035984",
                            "code": "1545649424290",
                            "name": "冠方医院",
                            "account": "admin2",
                            "subSystemNum": 0,
                            "deptNum": 0,
                            "deptManageNum": 0,
                            "doctorNum": 0,
                            "superOrgNum": 0,
                            "childOrgNum": 0,
                            "teamNum": 0,
                            "consNum": 0,
                            "deviceNum": 0
                        }
                    ],
                    "prePage": 0,
                    "nextPage": 0,
                    "isFirstPage": true,
                    "isLastPage": true,
                    "hasPreviousPage": false,
                    "hasNextPage": false,
                    "navigatePages": 8,
                    "navigatepageNums": [
                        1
                    ],
                    "navigateFirstPage": 1,
                    "navigateLastPage": 1,
                    "firstPage": 1,
                    "lastPage": 1
                }
            },
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    methods: {
        /**
         * 获取表格数据
         */
        async getTableData(data){
            const options = {
                token: this.userState.token,
                search: "",
                pageNum: 1,
                pageSize: 10
            };
            data = data || options;
            const res = await fetchHospitalList(data);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                console.log(this.jsonToArray(res.data.body.header))
                const tableHead = this.jsonToArray(res.data.body.header);
                tableHead.ok?this.tableData.head=tableHead.data:this.$notify.error({title: "数据解析失败",message:tableHead.msg});
                this.tableData.data = res.data.body.data2.list
            } else { //失败
                this.$notify.error({
                    title: "数据获取失败",
                    message: res.data.errMsg
                });
            }
        },
        /**
         * json转数组
         * 传入 json
         * 输出json
         * 输出格式：{
         *  ok:boolean,//是否成功，true表示成功
         *  msg:string,//错误信息
         *  data：array（null）//返回数据，若有错误，返回null，成功返回数组
         * }
         */
        jsonToArray(json){
            if(Object.prototype.toString.call(json)!=="[object Object]")return {ok:false,msg:'数据类型需要是json',data:null};
            const newJson = {//一种很坑的排序，扩展性差，但是没法，数据就这样返回的
                name:json.name||'',
                account:json.account||'',
                subSystemNum:json.subSystemNum||'',
                deptNum:json.deptNum||'',
                deptManageNum:json.deptManageNum||'',
                doctorNum:json.doctorNum||'',
                superOrgNum:json.superOrgNum||'',
                childOrgNum:json.childOrgNum||'',
                teamNum:json.teamNum||'',
                consNum:json.consNum||'',
                deviceNum:json.deviceNum||''
            }
            const reArr = [];
            for(let i in newJson){
                reArr.push({
                    prop:i,
                    label:newJson[i]
                })
            }
            return {ok:true,msg:'',data:reArr} 
        },
        fun1(data){
            this.$alert(`<h1 @click="consoleSome">
                ${data}
            </h1>`, 'HTML 片段', {
            dangerouslyUseHTMLString: true,
            callback: action=>{
                console.log('click')
            }
            });
        },
        consoleSome(){
            console.log('i have a test')
        }
    },
    async created() {
        this.getTableData();
        this.fun1('i is fish');
    }
};
</script>

<style scoped>
.super-management {
}
.super-management-top{
    padding: 0.2rem;
}
</style>
<!--
    超级管理员界面
-->