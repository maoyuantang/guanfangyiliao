<template>
    <div class="queryPush">
        <div class="files-man-body-top">
          <div class="files-man-body-top-left">
            <selftag v-model="listCondition.departmentList" @reback="DepartmentListSelect"></selftag>
            <selftag v-model="listCondition.types" @reback="getTypeSelect"></selftag>
          </div>
          <div class="files-man-body-top-right">
            <search @searchValue="searchChange"></search>
          </div>
        </div>
        <div class="files-man-body-list">
          <table class="files-man-body-list-table">
            <thead class="files-man-body-list-thead">
              <tr>
                <th>科室</th>
                <th>姓名</th>
                <th>手机号</th>
                <th>ID</th>
                <th>档案类型</th>
                <th>档案人</th>
                <th>类型</th>
                <th>提取方式</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody class="files-man-body-list-tbody">
              <tr v-for="(item,index) in listData" :key="index">
                <th>{{item.deptName || '暂缺'}}</th>
                <th>{{item.userName || '暂缺'}}</th>
                <th>{{item.phone || '暂缺'}}</th>
                <th>{{item.recordId || '暂缺'}}</th>
                <th class="limit-size">
                  <el-tooltip class="item" effect="light" :content="item.recordType" placement="top">
                    <div>{{item.recordType.length>7?`${item.recordType.substring(0,7)}...`:item.recordType}}</div>
                  </el-tooltip>
                </th>
                <th>
                  <el-tooltip class="item" effect="light" :content="item.recordUserName" placement="top">
                    <div>{{item.recordUserName.length>7?`${item.recordUserName.substring(0,7)}...`:item.recordUserName}}</div>
                  </el-tooltip>
                  </th>
                <th>{{item.type || '暂缺'}}</th>
                <th>
                  <el-tooltip class="item" effect="light" :content="item.extractType" placement="top">
                    <div>{{item.extractType.length>7?`${item.extractType.substring(0,7)}...`:item.extractType}}</div>
                  </el-tooltip>
                </th>
                <th>
                  <el-tooltip class="item" effect="light" :content="item.createTime" placement="top">
                    <div>{{item.createTime.length>7?`${item.createTime.substring(0,7)}...`:item.createTime}}</div>
                  </el-tooltip>
                </th>
              </tr>
            </tbody>
          </table>
          <tableNoMore v-if="listData.length<=0"></tableNoMore>
          </div>
          <div class="files-man-page">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="10"
              @current-change="listSelectPage"
              :current-page="parseInt(listCondition.page.pageNum)"
              v-if="listCondition.page.total!=0"
              :total="listCondition.page.total"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import normalTab from "../../../public/publicComponents/normalTab.vue";
import selftag from "../../../public/publicComponents/selftag.vue";
import search from "../../../public/publicComponents/search.vue";
import publicTime from "../../../public/publicComponents/publicTime.vue";
import normalColumnChart from "../../../public/publicComponents/normalColumnChart.vue";
import tableNoMore from "../../../public/publicComponents/tableNoMore.vue";

import { queryPageByPushAndQuery, queryStatisticalData, pushStatisticalData } from "../../../api/apiAll.js";
export default {
  components: {
    normalTab,
    selftag,
    search,
    publicTime,
    normalColumnChart,
    tableNoMore
  },
  watch: {
    "global.manToolDept": {
      handler(n) {
        this.listCondition.departmentList.list = n.map(item => {
            item.text = item.name;
            item.deptId = item.id;
            return item;
          });
        this.chartCondition.departmentList.list = n.map(item => {
            item.text = item.name;
            item.deptId = item.id;
            return item;
          });
      }
    },
    'chartCondition.statisticsMethods.select.value':{
        handler(n){
          this.getQueryStatisticalData();
          this.getPushStatisticalData();
            // this.getChartData();
        }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      userSelfInfo: state => state.user.userSelfInfo,
      global: state => state.global
    })
  },
  data() {
    return {
      barInfo: {
        i: 0, //当前页面
        list: [
          {
            en: "Archives Inquiry & Delivery",
            zh: "档案查询和推送"
          },
          {
            en: "STATISTICS",
            zh: "统计"
          }
        ]
      },

      /**
       * 档案列表查询条件
       */
      listCondition: {
        departmentList: {
          //科室标签信息(档案查询和推送)
          more: false,
          title: "科室",
          list: [],
          select: {} //选中
        },
        types: {
          //类型
          more: false,
          title: "类型",
          list: [
            {
              text: "全部",
              value: ""
            },
            {
              text: "查询提取",
              value: "QUERY"
            },
            {
              text: "主动推送",
              value: "PUSH"
            }
          ],
          select: {}, //选中  
          searchKey:'',//搜索关键字 
        },
        page: {
          //页码
          pageNum: 1, //当前页码
          pageSize: 10, //每页多少数据
          total: 0 //总条数
        }
      },

      /**
       * 列表数据
       */
      listData: [],

      /**
       * 档案图表查询条件
       */
      chartCondition: {  
        departmentList: {
          //科室标签信息(统计)
          more: false,
          title: "科室",
          list: [],
          select:{}
        },
        period:null,//时间段   
        statisticsMethods:{  
            select:{
                // label:'按科室统计', 
                value:'DEPT'
            },
            list:[
                {
                    label:'按科室统计',
                    value:'DEPT'
                },
                {
                    label:'按日统计',
                    value:'DAY'
                },
                {
                    label:'按月统计',
                    value:'MONTH'
                },
                {
                    label:'按年统计',
                    value:'YEAR'
                },
            ]
        }//统计方式
      },

      /**
       * 图表数据
       */
      chartData: {  
        queryData:{
            dataAxis:[],
            data:[],
            title:'档案查询',
            total:''
        },
        pushData:{
            dataAxis:[],
            data:[],
            title:'档案推送',
            total:''
        }
      },
      
      
    //   [
    //     {
    //         dataAxis:['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'],//每个柱子代表的类名
    //         data:[220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234],//具体数值
    //         title:'测试测试,修改修改',//图表标题
    //         total:'total'
    //     }
    //   ]
    };
  },

  async created() {
    this.getDataFromURL();
    this.getDepartmentList();
    this.getQueryStatisticalData();
    this.getPushStatisticalData();
    // this.getChartData();
  },
  methods: {
    getBar(data) {
      console.log(data);
      this.setQueryInURL();
    },
    getDepartmentSelect(data) {
      console.log(data);
    },
    /**
     * 获取 搜索关键字
     */
    searchChange(data){
      console.log(data);
      this.listCondition.searchKey = data;
      this.getListData();
    },

    /**
     * 获取科室列表
     */
    getDepartmentList() {
      this.listCondition.departmentList.list = this.global.manToolDept.map(item => {
          item.text = item.name;
          item.deptId = item.id;
          return item;
        });
      this.chartCondition.departmentList.list = this.global.manToolDept.map(item => {
          item.text = item.name;
          item.deptId = item.id;
          return item;
        });
    },

    /**
     * 1.查询提取和推送档案分页列表
     */
    async getListData() {
      const ajaxQuery = {
        token: this.userInfo.token,
        deptId: this.listCondition.departmentList.select.deptId || "",
        type: this.listCondition.types.select.value || "",
        pageNum: this.listCondition.page.pageNum || 1,
        pageSize: this.listCondition.page.pageSize || 10,
        searchKey:this.listCondition.searchKey
      };
      for (const i in ajaxQuery) {
        console.log(`${i} ==> ${ajaxQuery[i]}`);
        if (!ajaxQuery[i]) {
          console.log("enter");
          delete ajaxQuery[i];
        }
      }
      console.log(ajaxQuery);
      // return;
      const res = await queryPageByPushAndQuery(ajaxQuery);
      console.log(res);
      if (res.data && res.data.errCode === 0) {
        this.listData = res.data.body.data2.list;
        this.listCondition.page.total = res.data.body.data2.total;
      } else {
        this.$notify({
          title: "失败",
          message: "列表数据获取失败",
          type: "error"
        });
      }
    },

    /**
     * 1.查询提取
     */
    async getQueryStatisticalData(){
				const query = {
					token:this.userInfo.token,
          type:this.chartCondition.statisticsMethods.select.value,
          deptId:this.chartCondition.departmentList.select.deptId|| ''
        };
        // this.chartCondition.period
				if(this.chartCondition.period){
					query.startDate = this.chartCondition.period[0];
					query.endDate = this.chartCondition.period[1];
					// query.deptId = this.statisticsInfo.department.id || ''
        }
        console.log(query)
				const res = await queryStatisticalData(query);
				console.log(res);
				if(res.data&&res.data.errCode===0){
          this.chartData.queryData.dataAxis = res.data.body.data.map(item=>item.x);
          this.chartData.queryData.data = res.data.body.data.map(item=>item.y);
          this.chartData.queryData.total = res.data.body.total;
          this.chartData.queryData = Object.assign({},this.chartData.queryData);
				}else{
					this.$notify({
						title: '失败',
						message: '查询提取统计获取失败',
						type: 'error'
					});
				}
			},
    // async getChartData(){
    //     const getChartDataQuery = {};
    //     getChartDataQuery.token = this.userInfo.token;
    //     getChartDataQuery.type = this.chartCondition.statisticsMethods.select.value;
    //     if(this.chartCondition.period){
    //         getChartDataQuery.startDate = this.chartCondition.period[0];
    //         getChartDataQuery.endDate = this.chartCondition.period[1];
    //     }
    //     if(this.chartCondition.departmentList.select.deptId){
    //         getChartDataQuery.deptId = this.chartCondition.departmentList.select.deptId;
    //     }
    //     console.log(6666666)
    //     console.log(getChartDataQuery)
    //     // return 
    //     const res = await queryStatisticalData(getChartDataQuery);
    //     console.log(res);
    //     if (res.data && res.data.errCode === 0){

    //     }else{
    //         this.$notify({
    //             title: "失败",
    //             message: "图表数据获取失败",
    //             type: "error"
    //         });
    //     }
    // },
    /**
     * 推送档案
     */
    async getPushStatisticalData(){
				const query = {
					token:this.userInfo.token,
          type:this.chartCondition.statisticsMethods.select.value,
          deptId:this.chartCondition.departmentList.select.deptId|| ''
        };
        // this.chartCondition.period
				if(this.chartCondition.period){
					query.startDate = this.chartCondition.period[0];
					query.endDate = this.chartCondition.period[1];
					// query.deptId = this.statisticsInfo.department.id || ''
        }
        console.log(query)
				const res = await pushStatisticalData(query);
				console.log(res);
				if(res.data&&res.data.errCode===0){
          this.chartData.pushData.dataAxis = res.data.body.data.map(item=>item.x);
          this.chartData.pushData.data = res.data.body.data.map(item=>item.y);
          this.chartData.pushData.total = res.data.body.total;
          this.chartData.pushData = Object.assign({},this.chartData.pushData);
				}else{
					this.$notify({
						title: '失败',
						message: '推送档案统计获取失败',
						type: 'error'
					});
				}
			},
    
    /**
     * 档案列表查询条件   科室被选择
     */
    DepartmentListSelect(data) {
      console.log(data);
      this.listCondition.departmentList.select = data.select;
      console.log(this.listCondition.departmentList.select);
      this.getListData();
    },

    /**
     * 档案列表查询条件    类型被选择
     */
    getTypeSelect(data) {
      console.log(data);
      this.listCondition.types.select = data.select;
      this.getListData();
    },

    /**
     * 列表分页被选择
     */
    listSelectPage(data) {
      console.log(data);
      this.listCondition.page.pageNum = data;
      this.setQueryInURL();
      this.getDataFromURL();
    },

    /**
     * 将一些数据填写到url
     *
     */
    setQueryInURL() {
      this.$router.replace({
        path: "/files",
        query: {
          i: this.barInfo.i,
          deptId: this.listCondition.departmentList.select.deptId || "",
          type: this.listCondition.types.select.value || "",
          pageNum: this.listCondition.page.pageNum,
          pageSize: this.listCondition.page.pageSize
        }
      });
      console.log({
        i: this.barInfo.i,
        deptId: this.listCondition.departmentList.select.deptId || "",
        type: this.listCondition.types.select.value || "",
        pageNum: this.listCondition.page.pageNum,
        pageSize: this.listCondition.page.pageSize
      });
    },

    /**
     * 从url获取数据，并设置一下,主要用来防止刷新丢失数据
     * 这个没有存缓存，主要用来拉取数据，直接放到url
     */
    getDataFromURL() {
      console.log(this.$route.query);
      this.barInfo.i = parseInt(this.$route.query.i || "0");
      this.listCondition.departmentList.select.deptId =
        this.$route.query.deptId || "";
      this.listCondition.types.select.value = this.$route.query.type || "";
      this.listCondition.page.pageNum = this.$route.query.pageNum || 1;
      this.listCondition.page.pageSize = this.$route.query.pageSize || 10;
      console.log(this.listCondition.page.pageNum);
      
      this.getListData();
    },

    /**
     * 获取时间段
     */
    timeValueFun(data){
        console.log(data);
        this.chartCondition.period = data;
        this.getQueryStatisticalData();
        this.getPushStatisticalData();
        // this.getChartData();
    },

    /**
     * 统计图  科室被选中
     */
    chartDepartmentListSelect(data){
        console.log(data);
        this.chartCondition.departmentList.select = data.index;
        this.getQueryStatisticalData();
        this.getPushStatisticalData();
        // this.getChartData();
    },

  }
};
</script>      
<style scoped>
.files-man {
}
.files-man-body-top {
  display: flex;
  align-items: center;
}
.files-man-body-top > div {
  flex: 1;
}
.files-man-body-list{
  overflow-x: auto;
}
.files-man-body-list-table {
  /* width: 100%; */
  min-width: 13rem;
}
.files-man-body-list-table tr{
  display: flex;
}
.files-man-body-list-table th {
  border-bottom: 1px solid var(--color5);
  padding-top: 0.12rem;
  padding-bottom: 0.1rem;
  flex:1;
}
.files-man-body-list-thead th {
  color: var(--color3);
  letter-spacing: 0;
  font-size: 13px;
}
.files-man-body-list-tbody th {
  /* font-family: var(--fontFamily3); */
  font-size: var(--fontSize1);
  color: var(--color3);
  letter-spacing: 0;
  font-weight: 100;
}
.files-man-body-top-right{
    display: flex;
    align-items: center;
}
.files-man-chart-body{
  display: flex;
}
.files-man-page{
  text-align: center;
}
.limit-size>button{
  border: none;
  font-size: var(--fontSize1);
  color: var(--color3);
  letter-spacing: 0;
}
.queryPush{
    background: #FFFFFF;
    border: 1px solid #E5EDF3;
    box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
    border-radius: 4px;
    padding-top: .32rem;
    padding-left: .38rem;
    padding-right: .68rem;
    padding-bottom: .68rem;	
    margin-top: .44rem;
    overflow-x: auto;
		
}
</style>