<template>
	<div class="super-management">
		超级管理员
        <Button type="primary" @click="testData.show = true">Display dialog box</Button>
        <alertTree :inData="testData" @reback="getSelect"></alertTree>
        <div class="super-management-top">
            <search></search>
        </div>
        <div class="super-management-middle">
           <table class="super-management-middle-table">
               <thead>
                    <tr class="super-management-middle-table-tr table-thead-tr">
                       <th ><span>{{tableData.head.name||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.account||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.subSystemNum||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.deptNum||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.deptManageNum||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.doctorNum||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.superOrgNum||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.childOrgNum||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.teamNum||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.consNum||'缺失'}}</span></th>
                       <th ><span>{{tableData.head.deviceNum||'缺失'}}</span></th>
                       <th v-if="tableData.operating.length>0"><span>操作</span></th>
                    </tr>
               </thead>
               <tbody>
                   <tr v-for="(item,index) in tableData.data" :key="index" class="super-management-middle-table-tr table-tbody-tr">
                       <th><span>{{item.name}}</span></th>
                       <th><span>{{item.account}}</span></th>
                       <th @click="subSystemNum({type:'subSystemNum',value:item})"><span>{{item.subSystemNum||'缺失'}}</span></th>
                       <th @click="deptNum({type:'deptNum',value:item})"><span>{{item.deptNum||'缺失'}}</span></th>
                       <th @click="deptManageNum({type:'deptManageNum',value:item})"><span>{{item.deptManageNum||'缺失'}}</span></th>
                       <th @click="doctorNum({type:'doctorNum',value:item})"><span>{{item.doctorNum||'缺失'}}</span></th>
                       <th @click="superOrgNum({type:'superOrgNum',value:item})"><span>{{item.superOrgNum||'缺失'}}</span></th>
                       <th @click="superOrgNum({type:'childOrgNum',value:item})"><span>{{item.childOrgNum||'缺失'}}</span></th>
                       <th @click="teamNum({type:'teamNum',value:item})"><span>{{item.teamNum||'缺失'}}</span></th>
                       <th @click="getHeadClick({type:'consNum',value:item})"><span>{{item.consNum||'缺失'}}</span></th>
                       <th ><span>{{item.deviceNum}}</span></th>
                       <th v-if="tableData.operating.length>0">
                           <span v-for="(v,k) in tableData.operating" :key="k" class="operating-span">
                               <el-button type="primary" size="mini" @click="btnClick(v)">{{v.name}}</el-button>
                            </span>
                        </th>
                   </tr>
               </tbody>
           </table>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
	</div>
</template>

<script>
import { fetchHospitalList, fetchAllSubSystem ,fetchHospitalDepts,fetchHospitalRel,getSettingsList} from "../../api/apiAll.js"; 
import { mapState } from "vuex";
import search from "../../public/publicComponents/search.vue";
import publicList from "../../public/publicComponents/publicList.vue";
import alertTree from "../../public/publicComponents/alertTree.vue";
import selfTab from "../../public/publicComponents/selfTab.vue";
export default {
    components: {
        search,
        publicList,
        alertTree,
        selfTab
    },
    data() {
        return {
           spinShow:false,



            modal1:false,
            testData:{
                title:'test title',
                canClick:true,
                show:false,
                data:[{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                        id: 9,
                        label: '三级 1-1-1'
                        }, {
                        id: 10,
                        label: '三级 1-1-2'
                        }]
                    }]
                    }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                    }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
            },
            
            tableData:{
                head:{},
                data:[],
                operating:[
                    {
                        name:'修改'
                    },
                    // {
                    //     name:'删除'
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
        ok(){},
        cancel(){},
        selectItem(){},
        getSelect(data){
            console.log(data)
        },
        getSendData(data){
            console.log(data)
        },
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
                this.tableData.head = res.data.body.header;
                this.tableData.data = res.data.body.data2.list;
            } else { //失败
                this.$notify.error({
                    title: "数据获取失败",
                    message: res.data.errMsg
                });
            }
        },

        /**
         * 获取医院子系统列表
         */
        


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
                    key:i,
                    name:newJson[i]
                })
            }
            return {ok:true,msg:'',data:reArr} 
        },
        /**
         * 子系统
         */
        async subSystemNum(item){
            const res = await fetchAllSubSystem({
                hospitalId:item.value.id,
                token:this.userState.token
            });
            if(res.data&&res.data.errCode===0){
                this.testData.data = res.data.body.map(value=>{
                    return {
                        id: value.subCode,
                        label: value.subName,
                    }
                });
                this.testData.title = '子系统';
                this.testData.canClick = true;
                this.testData.show = true
            }else{

            }
        },

        /**
         * 科室
         */
        async deptNum(item){
            const res = await fetchHospitalDepts({orgCode:item.value.code});
            console.log(res)
            if(res.data&&res.data.errCode===0){
                
            }else{

            }
        },
        /**
         * 科室管理员
         */
        async deptManageNum(item){//接口还没有
            console.log(item)
        },

        /**
         * 医生
         */
        async doctorNum(item){//接口还没有
            console.log(item)
        },

        /**
         * 上级医院，下级医院(后端说这两个其实就是一个玩意)
         */
        async superOrgNum(item){
            const res = await fetchHospitalRel({
                hospitalId:item.value.id,
                token:this.userState.token
            });
            console.log(res)
            if(res.data&&res.data.errCode===0){
                this.testData.data = res.data.body.map(value=>{
                    return {
                        id:value.id,
                        label:value.name
                    }
                });
                this.testData.title = item.type==='superOrgNum'?'上级医院':'下级医院';
                this.testData.canClick = true;
                this.testData.show = true
            }else{

            }
        },

        /**
         * 协作人员
         */
        async teamNum(item){
            const res = await getSettingsList({token:this.userState.token});
            console.log(res)
            if(res.data&&res.data.errCode===0){
                function iteration(arr){
                    const newArr = arr.map(value=>{
                        value.label = value.name;
                        if(value.children)iteration(value.children);
                        return value
                    });
                    return newArr
                }
                this.testData.data = iteration(res.data.body);
                // this.testData.data = res.data.body.map(value=>{
                //     value.label = value.name;
                //     return value;
                // });
                this.testData.title = '协作人员';
                this.testData.canClick = true;
                this.testData.show = true
            }else{

            }
        },

        /**
         * 表格头部被点击
         */
        /*
        async getHeadClick(item){
            const obj = {
                subSystemNum:{
                    type:'1',
                    title:'子系统',
                    fun:fetchAllSubSystem,
                    data:[
                        {
                            hospitalId:item.value.id,
                            token:this.userState.token
                        }
                    ]
                },
                deptNum:{
                    type:'2',
                    title:'科室',
                    fun:fetchHospitalDepts,
                    data:[
                        {
                            orgCode:item.value.code
                        }
                    ]
                },
                deptManageNum:{//接口还没有
                    type:'3',
                    title:'科室管理员',
                    fun:()=>{},
                    data:[
                        {
                            orgCode:item.value.code
                        }
                    ]
                },
                doctorNum:{//接口还没有
                    type:'3',
                    title:'医生',
                    fun:()=>{},
                    data:[
                        {
                            orgCode:item.value.code
                        }
                    ]
                },
                superOrgNum:{
                    type:'1',
                    title:'上级医院',
                    fun:fetchHospitalRel,
                    data:[
                        {
                            hospitalId:item.value.id,
                            token:this.userState.token
                        }
                    ]
                },
                childOrgNum:{
                    type:'1',
                    title:'下级医院',
                    fun:fetchHospitalRel,
                    data:[
                        {
                            hospitalId:item.value.id,
                            token:this.userState.token
                        }
                    ]
                },
                teamNum:{
                    type:'1',
                    title:'协作人员',
                    fun:settingsList,
                    data:[
                        {
                            token:this.userState.token
                        }
                    ]
                    
                },
                consNum:{
                    type:'1',
                    title:'会诊范围',
                    fun:()=>{},
                    data:[
                        {
                            token:this.userState.token
                        }
                    ]
                    
                },
                deviceNum:'',
            };
            if(!obj[item.type])return;
            const res = await obj[item.type].fun(...obj[item.type].data);
            console.log(res)
            return;
            if(res.data&&res.data.errCode===0){
                const useData = res.data.body.map(value=>{
                    return {
                        id: value.subCode,
                        label: value.subName,
                        // children:[]
                    }
                })
                this.testData.title =  obj[item.title];
                this.testData.canClick = true;
                this.testData.data = useData;
                this.testData.show = true
            }

            return;
            console.log(item);
            this.testData.show = true
        },*/
        /**
         * 按钮被点击
         */
        btnClick(item){
            console.log(item)
        },
        canClick(){
            console.log('can click')
        }
    },
    async created() {
        this.getTableData();
    }
};
</script>

<style scoped>
.super-management {
}
.super-management-top{
    padding: 0.2rem;
}
.super-management-middle-table{
    width: 100%;
}
.super-management-middle-table-tr{
    border-bottom: 1px solid var(--borderColor1);
    height: 0.4rem;
    color: var(--color3);
}
.table-thead-tr span{
    font-weight: bold;
    cursor: pointer;
    font-size: var(--fontSize3);
}
.table-tbody-tr{
    
}
.operating-span{
    padding: 0.05rem;
}
</style>
<!--
    超级管理员界面
-->