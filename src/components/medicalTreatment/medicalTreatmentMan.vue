<template>
  <div class="medical">
    <div class="medical_top">
      <normalTab v-model="barInfo" @reBack="getBar"></normalTab>
    </div>
    <!-- 管理    疾病分级分类管理 -->
    <div v-if="barInfo.i == 0" class="medical_body0">
      <div class="medical_nav ">
        <div class="medical_nav_left">
          <selftag :inData="onLineList.topFlag[0]" @reback="getFilter0"></selftag>
          <selftag v-model="onLineList.topFlag[1]" @reback="getFilter1"></selftag>
          <selftag v-model="onLineList.topFlag[2]" @reback="getFilter2"></selftag>
        </div>
        <div class="medical_nav_right">
          <search @searchValue="adminSearchOne"></search>
          <el-button type="primary" @click="isShowNewOutPatientFun">新增</el-button>
        </div>
      </div>
      <div class="medical_body0_table">
        <el-table :data="medical_body0_Data" border style="width: 100%">
          <el-table-column prop="1" label="科室"></el-table-column>
          <el-table-column prop="2" label="类型"></el-table-column>
          <el-table-column prop="3" label="编号"></el-table-column>
          <el-table-column prop="4" label="名称"></el-table-column>
          <el-table-column prop="5" label="分级"></el-table-column>
          <el-table-column fixed="right" label="" width="250">
            <template slot-scope="scope">
              <el-button @click="dualReferralRecord1(scope.row)" type="success" plain size="mini" style="margin:0.05rem 0 0.05rem 0;">编辑</el-button>
              <el-button @click="viewFile2(scope.row)" type="danger" plain size="mini" style="margin:0.05rem 0 0.05rem 0;">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
    <!-- 管理   流程和权限控制 -->
    <div v-if="barInfo.i == 1" class="">1</div>
    <!-- 管理   统计 -->
    <div v-if="barInfo.i == 2" class="">2</div>
  </div>
</template>

<script>
  import normalTab from './../../public/publicComponents/normalTab.vue'
  import selftag from './../../public/publicComponents/selftag.vue'
  import search from './../../public/publicComponents/search.vue'
  export default {
    components: {
      normalTab,
      selftag,
      search
    },
    data() {
      return {
        // 常用参数
        //管理1表 查看记录  弹框
        editKuang: false,//显示  编辑

        //筛选返回值接收
        //管理1端  筛选工具栏  筛选返回值  接收参数
        departmentId: "",//科室id   selftag
        typeId: "",//类型id   selftag
        gradeId: "",//分级id   selftag
        searchValue: "",//返回搜索框输入   search
        pageNum: 1,
        pageSize: 15,
        //管理统计端  筛选工具栏  统计筛选返回值  接收参数
        time0: "",///统计筛选开始时间     DatePicker 日期选择器
        time1: "",//统计筛选结束时间      DatePicker 日期选择器
        type: 'MONTH', //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天       Select 选择器
        //医生端  筛选工具栏  日期筛选返回值  接收参数
        // 新增转诊
        //管理操作区
        //医生操作区








        // element

        // 必备参数
        // bar 数据
        barInfo: {
          i: 0,//当前页面
          list: [
            {
              en: 'Classification of diseases',
              zh: '疾病分级分类管理'
            },
            {
              en: 'Process & privilege control',
              zh: '流程和权限控制'
            },
            {
              en: 'statistics',
              zh: '统计'
            },
          ]
        },
        //筛选工具栏  管理1（自定义）
        onLineList: {
          topFlag: [
            {
              more: true,
              title: '科室',
              list: []
            },
            {
              more: true,
              title: '类型',
              list: []
            },
            {
              more: true,
              title: '分级',
              list: [{ text: '全部', value: '' }, { text: '一级', value: '' }, { text: '二级', value: '' }]
            }
          ],
        },
        medical_body0_Data: [
          {
            1: "1",
            2: "2",
            3: "3",
            4: "4",
            5: "5",
          }
        ],
      }
    },
    methods: {
      //自调用组件函数
      //  管理  切换数据
      getBar(data) {
        console.log(data)
      },
      //筛选返回值  管理端
      getFilter0(data) {//科室筛选
        this.departmentId = data.index.value;
        console.log(this.departmentId)
      },
      getFilter1(data) {//类型筛选
        this.typeId = data.index.value;
        console.log(this.typeId)
      },
      getFilter2(data) {//分级筛选
        this.gradeId = data.index.value;
        console.log(this.gradeId)
      },
      adminSearchOne(data) {//搜索（筛选右边）
        this.searchValue = data;
        console.log(this.searchValue)
      },
      getFilterTime(data) {//统计		//时间选择器返回函数
        this.time0 = data.time[0];//统计筛选开始时间
        this.time1 = data.time[1];//统计筛选结束时间
        this.type = data.select.value
      },










      //弹出  新增业务  表单
      isShowNewOutPatientFun() {
        this.addData.show = true
        this.sureVisiable = 0;
        this.newClinic0();//新增门诊弹框  数据渲染
        this.getList1()
      },
    },



    async created() {

    }
  }
</script>

<style scoped>
  .medical_body0 {
    background: #FFF;
    border: 1px solid var(--color5);
    box-shadow: 0 0.06rem 0.36rem 0 rgba(0, 62, 100, 0.04);
    border-radius: 0.04rem;
    padding-top: 0.32rem;
    padding-right: 0.69rem;
    padding-left: 0.38rem;
    margin-right: 0.36rem;
    margin-top: 0.42rem;
  }

  .medical_nav {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    margin: 0 0 0.2rem 0;
  }

  .medical_nav_left {
    width: auto;
  }

  .medical_nav_right {
    display: flex;
    justify-content: space-around;
  }

  .medical_nav_right>.el-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.96rem;
    height: 0.4rem;
    margin: 0 1rem;
    font-size: var(--fontSize6);
  }

  .medical_body0_table {
    margin: 0 0 0.2rem 0;
  }
</style>