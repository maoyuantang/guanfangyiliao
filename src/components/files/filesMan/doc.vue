<template>
    <div class="doc">
        <div class="doc-top">
            <div class="doc-top-left">
                <selftag :inData="queryConditions.department" @reback="getDepartmentSelect"></selftag>
            </div>
            <div class="doc-top-right">
                <search @searchValue="searchChange"></search>
            </div>
        </div>
        <div class="doc-body">
            <table class="doc-table">
                <thead class="doc-thead">
                    <tr>
                        <th>科室</th>
                        <th>姓名</th>
                        <th>手机号</th>
                        <th>MPIID</th>
                        <th>性别</th>
                        <th>出生日期</th>
                        <th>身份证号</th>
                        <th>社保卡号</th>
                        <th>健康卡号</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="doc-tbody">
                    <tr>
                        <th>急诊科</th>
                        <th>Verge</th>
                        <th>28</th>
                        <th>一连串字符</th>
                        <th>一连串字符</th>
                        <th>2018-12-25</th>
                        <th>一串字符</th>
                        <th>ID+姓名</th>
                        <th>ID+姓名</th>
                        <th><el-button type="primary" size="mini" plain>主要按钮</el-button></th>
                    </tr>
                </tbody>
            </table>
            <tableNoMore></tableNoMore>
            <div class="doc-page">
                <el-pagination
                background
                layout="prev, pager, next"
                :page-size="queryConditions.page.size"
                @current-change="listSelectPage"
                :current-page="parseInt(queryConditions.page.current)"
                v-if="queryConditions.page.total!=0"
                :total="queryConditions.page.total"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex"
import selftag from "../../../public/publicComponents/selftag.vue"
import search from "../../../public/publicComponents/search.vue"
import tableNoMore from "../../../public/publicComponents/tableNoMore.vue"
export default {
    components:{
        selftag,
        search,
        tableNoMore
    },
    watch:{},
    computed:{
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo,
            global: state => state.global
        }),
    },
    data(){
        return {
            queryConditions:{//查询条件   
                department:{//科室
                    title:'科室',//标题
                    select:0,//当前选中项
                    list:
                    [
                        // {
                        //     label:'全部',
                        //     value:''
                        // }
                    ],
                    more:false
                },
                searchKey:'',//搜索关键字  
                page:{//分页   
                    current:1,//当前页
                    size:10,//一页数据条数
                    total:100//总条数
                },
            },
        }
    },
    created(){
        this.setDepartmentData();
    },
    methods:{
        /**
         * 列表分页被选择
         */
        listSelectPage(data) {
            this.queryConditions.page.current = data;
        },
        /**
         * 获取 搜索关键字
         */
        searchChange(data){
            this.queryConditions.searchKey = data;
        },
        /**
         * 科室 被选中
         */
        getDepartmentSelect(data){
            this.queryConditions.department.select = data.select;
        },
        /**
         * 获取科室列表
         */
        setDepartmentData(){
            this.queryConditions.department.list = this.global.manToolDept.map(item=>{
                item.label = item.name;
                item.value = item.id;
                return item;
            });
        },
    },

};
</script>
<style scoped>
.doc{
    background: #FFFFFF;
    border: 1px solid #E5EDF3;
    box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
    border-radius: 4px;
    padding-top: .32rem;
    padding-left: .38rem;
    padding-right: .68rem;
    padding-bottom: .68rem;	
    margin-top: .44rem;
}
.doc-top{
    display: flex;
}
.doc-top-left{
    flex: 1;
}
.doc-top-right{
    flex: 1;
    padding-left: 20%;
}
.doc-table {
  /* width: 100%; */
  min-width: 17rem;;
}
.doc-table tr{
  display: flex;
}
.doc-table th {
  border-bottom: 1px solid var(--color5);
  padding-top: 0.12rem;
  padding-bottom: 0.1rem;
  flex:1;
}
.doc-thead th {
  color: var(--color3);
  letter-spacing: 0;
  font-size: 13px;
}
.doc-tbody th {
  font-size: var(--fontSize1);
  color: var(--color3);
  letter-spacing: 0;
  font-weight: 100;
}
.doc-page{
    text-align: center;
}
.doc-body{
    overflow-x: scroll;
}
</style>
