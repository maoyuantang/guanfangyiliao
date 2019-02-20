<!--双向转诊系统-->
<template>
  <div class="referral">
    <!--弹框1  管理查看记录 -->
    <el-dialog title="" :visible.sync="isShowmoveUser" width="40%" center>
      <div class="moved">
        <!-- 头像姓名 -->
        <div class="moved_top">
          <img src="../assets/img/ME.png" />
          <p>Teresa Lloyd</p>
        </div>
        <!-- 转院路程 -->
        <div class="moved_middle">
          <span class="Hospital1">重庆冉家坝社区医院</span>
          <img src="../assets/img/ME.png" />
          <span class="Hospital1">重庆冉家坝社区医院</span>
        </div>
        <!-- 转院详情 -->
        <div class="moved_footer">
          <ul v-for=''>
            <li>2018-12-25 10:00 冉家坝 胸内科申请转入</li>
            <li>2018-12-25 10:00 重庆冉家坝社区医院</li>
            <li>2018-12-25 10:00 重庆冉家坝社区医院</li>
            <li>2018-12-25 10:00 重庆冉家坝社区医院</li>
          </ul>
        </div>
      </div>
    </el-dialog>

    <!-- <button @click='addMove'>新增转诊</button> -->
    <!-- 弹框2 新增转诊 -->
    <el-dialog title="新增转诊" :visible.sync="isShowaddMove">
      <el-form :model="form">
        <div style="display:flex;margin:10px 0;">
          <el-form-item label="转诊类型:" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="上转/下转">
              <el-option label="上转" value="shanghai"></el-option>
              <el-option label="下转" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="疾病名称:" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="上转" value="shanghai"></el-option>
              <el-option label="下转" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="病     人:" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="单选">
            <el-option label="上转" value="shanghai"></el-option>
            <el-option label="下转" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <div class="block" style="margin-bottom: 22px;">
          <span class="demonstration" style="display: inline-block;font-weight: 700;width: 115px;text-align: right;">转入医院:</span>
          <el-cascader :options="options" v-model="selectedOptions" @change="handleChange">
          </el-cascader>
        </div>
        <el-form-item label="病历授权:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item label="转诊时间:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请选择"></el-input>
        </el-form-item>
        <el-form-item label="转诊目的:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="初步诊断:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请填写"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" @click="yesMove" style="width:70%;">确 定</el-button>
      </div>
    </el-dialog>



    <!-- 管理端 -->
    <div v-if="$store.state.user.viewRoot.now.name==='manager'">
      <div>
        <normalTab v-model="navInfo" @reBack="getNav"></normalTab>
      </div>
      <div class="out-border">
        <!-- 转诊管理 -->
        <div class="manager_moveManage" v-if="navInfo.i===0">
          <div class="manager_moveManage_top mainTab">
            <div class="manager_moveManage_top_left">
              <selftag :inData="onLineList.topFlag[0]" @reback="getFilter0"></selftag>
              <selftag v-model="onLineList.topFlag[1]" @reback="getFilter1"></selftag>
              <selftag v-model="onLineList.topFlag[2]" @reback="getFilter2"></selftag>
            </div>
            <div class="manager_moveManage_top_right">
              <search @searchValue="adminSearchOne"></search>
            </div>
          </div>
          <div class="dataBody">
            <el-table :data="manageBodyData" border style="width: 100%">
              <el-table-column fixed prop="referralNo" label="编号"></el-table-column>
              <el-table-column prop="deptName" label="科室"></el-table-column>
              <el-table-column prop="applyOrgName" label="申请医院"></el-table-column>
              <el-table-column prop="applyDeptName" label="申请科室"></el-table-column>
              <el-table-column prop="" label="申请人"></el-table-column>
              <el-table-column prop="applyTime" label="申请时间"></el-table-column>
              <el-table-column prop="intention" label="目的"></el-table-column>
              <el-table-column prop="patientName" label="病人"></el-table-column>
              <el-table-column prop="" label="预约类型"></el-table-column>
              <el-table-column prop="" label="方向"></el-table-column>
              <el-table-column prop="receiveTime" label="接诊时间"></el-table-column>
              <el-table-column prop="stateName" label="转诊状态"></el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button @click="viewFile(scope.row)" type="text" size="small">查看记录</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 统计 -->
        <div v-else-if="navInfo.i===1" class="count">
          <div class="manager_count_top mainTab">
            <div class="manager_count_top_left">
              <selftag v-model="statistics.topFlag[0]" @reback="getFilter0"></selftag>
            </div>
            <div class="manager_count_top_right">
              <statisticsWay v-model="time" @reBack="getFilterTime"></statisticsWay>
            </div>
          </div>
          <div class="manager_count_midle">
            <div style="display:flex">
              <normalColumnChart :inData="drawData"> </normalColumnChart>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 医生端 -->
    <div v-else>
      <div class="doctorStyle">
        <selftag :inData="oTab4" @reback="getOTab4"></selftag>
        <div class="manager_count_top_right">
          <statisticsWay1 v-model="time" @reBack="getFilterTime"></statisticsWay1>
        </div>
        <!-- <div>
          <span>时间段：</span>
          <el-date-picker v-model="time" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </div> -->
        <el-button class="startConsul" type="text" @click="addMove">新增转诊</el-button>
      </div>
      <div>
        <el-table :data="docTableData" border style="width: 100%">
          <el-table-column fixed prop="referralNo" label="编号"></el-table-column>
          <el-table-column fixed prop="applyOrgName" label="申请医院"></el-table-column>
          <el-table-column fixed prop="applyDeptName" label="申请科室"></el-table-column>
          <el-table-column fixed prop="" label="申请人"></el-table-column>
          <el-table-column fixed prop="phone" label="手机号"></el-table-column>
          <el-table-column fixed prop="applyTime" label="申请时间"></el-table-column>
          <el-table-column fixed prop="patientName" label="病人"></el-table-column>
          <el-table-column fixed prop="intention" label="目的"></el-table-column>
          <el-table-column fixed prop="typeName" label="转诊类型"></el-table-column>
          <el-table-column fixed prop="stateName" label="转诊状态"></el-table-column>
          <el-table-column fixed="right" label="" width="400">
            <template slot-scope="scope" style="flex">
              <el-button @click="doctorListFun1(scope.row)" type="primary" plain size="mini">查看档案</el-button>
              <el-button @click="doctorListFun2(scope.row)" type="success" plain size="mini">转诊记录</el-button>
              <el-button @click="doctorListFun3(scope.row)" type="info" plain size="mini">编辑</el-button>
              <el-button @click="doctorListFun4(scope.row)" type="warning" plain size="mini">删除</el-button>
              <el-button @click="doctorListFun5(scope.row)" type="danger" plain size="mini">取消</el-button>
              <el-button @click="doctorListFun6(scope.row)" type="primary" plain size="mini">审核通过</el-button>
              <el-button @click="doctorListFun7(scope.row)" type="success" plain size="mini">接诊</el-button>
              <el-button @click="doctorListFun8(scope.row)" type="warning" plain size="mini">出院</el-button>
              <el-button @click="doctorListFun9(scope.row)" type="danger" plain size="mini">转诊</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
  //引入接口
  import {
    // 已使用接口
    //筛选接口
    toolDept,//1.21.1.管理  科室列表
    toolMedicalType,//1.21.26.分级诊疗-类型
    toolMedicalGrading,//1.21.27.分级诊疗-分级
    toolReferralType,//1.21.28.双向转诊-方向


    readMedicals,//14.1.双向转诊-WEB医生端-疾病名称下拉框
    readMedicalsOfHospitalAndDept,//14.2.双向转诊-WEB医生端-医院与科室下拉框联动
    dualReferralManagePage,//14.3.双向转诊-WEB管理端-管理列表
    statistics,//14.4.双向转诊-WEB管理端-统计
    dualReferralPage,//14.5.双向转诊-WEB医生端-列表
    //点击保存
    dualReferralAdd,//14.6.双向转诊-WEB医生端-申请转诊
    //管理的 查看记录 和医生的 转诊记录   点击
    dualReferralRecord,//14.7.双向转诊-WEB医生端-查询记录
    //编辑（申请方）
    dualReferralUpdate,//14.8.双向转诊-WEB医生端-修改

    applicantCANCEL,//14.9.双向转诊-WEB医生端-申请人操作
    dualReferralReception,//3.3首页-账号及权限-创建用户      //14.10.双向转诊-WEB医生端-接诊人操作

    //审核通过  点击（接收方）
    receptionAudit,//14.11.双向转诊-WEB医生端-审核


  } from "../api/apiAll.js";
  //引入组件
  import normalTab from '../public/publicComponents/normalTab.vue'
  import selftag from '../public/publicComponents/selftag.vue'
  import normalColumnChart from '../public/publicComponents/normalColumnChart.vue'
  import statisticsWay from '../public/publicComponents/statisticsWay.vue'
  import statisticsWay1 from '../public/publicComponents/statisticsWay1.vue'
  import search from '../public/publicComponents/search.vue'

  //引入token
  import { mapState } from "vuex";

  export default {
    components: {
      normalTab,
      selftag,
      normalColumnChart,
      statisticsWay,
      statisticsWay1,
      search,
    },
    data() {
      return {
        // 常用参数
        //管理1表 查看记录  弹框
        isShowmoveUser: false,//显示转诊记录

        //筛选返回值接收
        //管理1端  筛选工具栏  筛选返回值  接收参数
        departmentId: "",//筛选科室id   selftag
        typeId: "",//筛选类型id   selftag
        direction: "",//筛选分级id    selftag
        searchValue: "",//返回搜索框输入   search
        pageNum: 1,
        pageSize: 15,
        //管理统计端  筛选工具栏  统计筛选返回值  接收参数
        time0: "",///统计筛选开始时间
        time1: "",//统计筛选结束时间
        type: 'MONTH', //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天 
        //医生端  筛选工具栏  日期筛选返回值  接收参数
        doctorDate: '',//日期筛选



        // element

        // 必备参数
        time: null, // 时间筛选组件    statisticsWay
        //管理切换（复用组件 ）
        navInfo: {
          i: 0,
          list: [
            {
              en: 'TWO-WAY REFERRAL',//选项英文，类型 string
              zh: '转诊管理'//选项中文，类型string
            },
            {
              en: 'STATISTICS',
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
              more: false,
              title: '方向',
              list: [{ text: '全部', value: '' }, { text: '转入', value: '' }, { text: '转出', value: '' }]
            }
          ],
        },
        //统计 数据
        statistics: {
          topFlag: [
            {
              more: true,
              title: '科室',
              list: []
            },
          ]
        },
        oTab4: {
          more: false,
          title: "日期",
          list: [{ text: "全部", value: "ALL" }, { text: "今日", value: "TODAY" }]
        },
        // 管理表体（自定义组件 ）
        manageBodyData: [],
        //新增转诊（自定义组件 ）
        isShowaddMove: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        //统计
        //申请科室统计图
        monthToYear: [],
        drawData: {
          dataAxis: ['点', '击', '柱', '子', '点', '击', '柱', '子', '点', '击', '柱', '子'], //每个柱子代表的类名
          data: [220, 182, 191, 234, 220, 182, 191, 234, 220, 182, 191, 234], //具体数值
          title: "申请科室统计图", //图表标题
          totalNumber: "555"
        },
        //发起科室统计图
        drawDataStart: {
          dataAxis: ['点', '击', '柱', '子', '点', '击', '柱', '子', '点', '击', '柱', '子'], //每个柱子代表的类名
          data: [220, 182, 191, 234, 220, 182, 191, 234, 220, 182, 191, 234], //具体数值
          title: "发起科室统计图", //图表标题
          totalNumber: "555"
        },
        //医生端列表（自定义组件 ）
        docTableData: [],
        options: [
          {
            value: 'zhinan',
            label: '指南',
            children: [
              {
                value: 'shejiyuanze',
                label: '设计原则',
              },
              {
                value: 'daohang',
                label: '导航',
              }
            ]
          },
          {
            value: 'zujian',
            label: '组件',
            children: [
              {
                value: 'basic',
                label: 'Basic',
              },
              {
                value: 'form',
                label: 'Form',
              },
              {
                value: 'data',
                label: 'Data',
              },
              {
                value: 'notice',
                label: 'Notice',
              },
              {
                value: 'navigation',
                label: 'Navigation',
              },
              {
                value: 'others',
                label: 'Others',
              }
            ]
          },
          {
            value: 'ziyuan',
            label: '资源',
            children: [
              {
                value: 'axure',
                label: 'Axure Components'
              },
              {
                value: 'sketch',
                label: 'Sketch Templates'
              },
              {
                value: 'jiaohu',
                label: '组件交互文档'
              }
            ]
          }
        ],
        selectedOptions: [],
      }
    },
    computed: {
      //引入token
      ...mapState({
        userState: state => state.user.userInfo,
        userSelfInfo: state => state.user.userSelfInfo,
        userInfo: state => state.user.userInfo,
      }),
    },
    methods: {
      //自调用组件函数
      //转诊管理、统计、切换插件返回值（管理端）
      getNav(data) {
        if (data.i == 1) {
          this.getList2()
        }
      },
      //筛选返回值  管理端
      getFilter0(data) {//科室筛选
        this.departmentId = data.index.value;
        console.log(this.departmentId)
        this.getList1();
        this.getList2();
      },
      getFilter1(data) {//类型筛选
        this.typeId = data.index.value;
        console.log(this.typeId)
        this.getList1();
      },
      getFilter2(data) {//方向筛选
        this.direction = data.index.value;
        console.log(this.direction)
        this.getList1();
      },
      adminSearchOne(data) {//搜索（筛选右边）
        this.searchValue = data;
        console.log(this.searchValue)
        this.getList1();
        this.getList2();
      },
      getFilterTime(data) {//统计		//时间选择器返回函数
        this.time0 = data.time[0];//统计筛选开始时间
        this.time1 = data.time[1];//统计筛选结束时间
        this.type = data.select.value
        this.getList2();
        this.DoctorList();
      },
      //点击筛选日期    医生端
      getOTab4(data) {
        this.doctorDate = data.index.value;
        this.getList2();
        this.DoctorList();//医生端列表
      },
      handleChange(value) {
        console.log(value);
      },




      //筛选列表  管理端
      //1.21.1.科室筛选  工具栏 (管理) (管理)
      async getSelect1(oindex) {
        let _this = this;
        let query = {
          token: this.userState.token,
          type: 'MANAGE'
        };
        const res = await toolDept(query);
        if (res.data && res.data.errCode === 0) {
          console.log('1.21.1.科室工具栏 +成功')
          // console.log(res.data.body);
          if (res.data.body.length > 6) {
            this.onLineList.topFlag[0].more = true;
            this.statistics.topFlag[0].more = true;
          } else {
            this.onLineList.topFlag[0].more = false;
            this.statistics.topFlag[0].more = false;
          }
          $.each(res.data.body, function (index, text) {
            //双向转诊   科室   筛选列表   管理1
            _this.onLineList.topFlag[0].list.push({
              text: text.name,
              value: text.id
            });
            //双向转诊   科室   筛选列表   管理统计
            _this.statistics.topFlag[0].list.push({
              text: text.name,
              value: text.id
            });
          });
        } else {
          console.log('1.21.1.科室工具栏 +失败')
          //失败
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      //1.21.26.类型筛选  工具栏 (管理)
      async getSelect2(oindex) {
        let _this = this;
        let query = {
          token: this.userState.token,
          // type: 'MANAGE'
        };
        const res = await toolMedicalType(query);
        if (res.data && res.data.errCode === 0) {
          console.log('1.21.26.类型筛选  工具栏 +成功')
          // console.log(res.data.body);
          if (res.data.body.length > 6) {
            this.onLineList.topFlag[1].more = true;
          } else {
            this.onLineList.topFlag[1].more = false;
          }
          $.each(res.data.body, function (index, text) {
            //双向转诊   类型   筛选列表   管理1
            _this.onLineList.topFlag[1].list.push({
              text: text.name,
              value: text.id
            });
          });
        } else {
          console.log('1.21.26.类型筛选  工具栏 +失败')
          //失败
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },

      // 管理1表
      async getList1() {
        console.log('管理1表接口还没出来')
        let _this = this;
        let query = {
          token: this.userState.token,
          pageNum: 1,
          pageSize: 10,
          deptId: this.departmentId,
          direction: this.direction,
          query: this.searchValue,
        };
        const res = await dualReferralManagePage(query);//14.3.双向转诊-WEB管理端-管理列表
        if (res.data && res.data.errCode === 0) {
          console.log('管理1表+成功')
          console.log(res)
          const lists = res.data.body.data2.list
          this.manageBodyData = lists
        } else {
          console.log('管理1表+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      // 管理1表   操作区  
      //查看记录
      viewFile() {
        this.isShowmoveUser = !this.isShowmoveUser
        console.log(this.isShowmoveUser)
      },
      //管理2表（统计）
      async getList2() {
        const _this = this
        let query = {
          token: this.userState.token,
          deptId: this.departmentId, //String false 科室ID 
          statisticalType: this.type, //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天
          direction: this.direction,//方向：into转入，转出out
          startTime: this.time0,
          endTime: this.time1
        };
        const res = await statistics(query);
        if (res.data && res.data.errCode === 0) {
          console.log('统计+成功')
          console.log(res)
          const lists = res.data.body.data
        } else {
          //失败
          console.log('统计+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      // 医生表
      async DoctorList() {
        let _this = this;
        const options = {
          token: this.userState.token,
          pageNum: 1,
          pageSize: 15,
          direction: this.direction,//方向：into转入，转出out
          startTime: this.time0,
          endTime: this.time1,
          query: this.searchValue,
        };
        const res = await dualReferralPage(options);//14.5.双向转诊-WEB医生端-列表
        if (res.data && res.data.errCode === 0) {
          console.log('医生表+成功')
          console.log(res)
          const lists = res.data.body.data2.list
          this.docTableData = lists
        } else {
          //失败
          console.log('医生表+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      // 医生表  操作区  点击事件
      //查看档案
      doctorListFun1(data) {
        console.log(data)
      },
      //转诊记录
      doctorListFun2(data) {
        console.log(data)
      },
      //编辑
      doctorListFun3(data) {
        console.log(data)
      },
      //删除
      doctorListFun4(data) {
        console.log(data)
      },
      //取消
      doctorListFun5(data) {
        console.log(data)
      },
      //审核通过
      doctorListFun6(data) {
        console.log(data)
      },
      //接诊
      doctorListFun7(data) {
        console.log(data)
      },
      //出院
      doctorListFun8(data) {
        console.log(data)
      },
      //转诊
      doctorListFun9(data) {
        console.log(data)
      },


      //新增转诊
      addMove() {
        this.isShowaddMove = !this.isShowaddMove
      },
      //点击确定    新增门诊
      yesMove() {
        alert('确定新增门诊')
      }
    },
    async created() {
      this.getSelect1()
      this.getSelect2()
      this.getList1()
      this.DoctorList()
    }
  }
</script>

<style lang="scss" scoped>
  .out-border {
    background: #FFF;
    border: 1px solid var(--color5);
    box-shadow: 0 0.06rem 0.36rem 0 rgba(0, 62, 100, 0.04);
    border-radius: 0.04rem;
    padding-top: 0.32rem;
    padding-right: 0.69rem;
    padding-left: 0.38rem;
    min-height: 76vh;
    margin-right: 0.36rem;
    margin-top: 0.42rem;
  }

  .manager_moveManage_top {
    display: flex;
    justify-content: space-between;
  }


  .manager_count_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .manager_count_top>div {
    flex: 1;
  }

  /* 医生端样式 */
  .doctorStyle {
    display: flex;
    display: -webkit-flex;
    /* justify-content: space-evenly; */
    align-items: baseline;
    margin-bottom: 52px;
  }

  .startConsul {
    width: 196px;
    height: 40px;
    background: #4da1ff;
    border-radius: 4px;
    font-family: PingFangSC-Semibold;
    font-size: 22px;
    color: #ffffff;
    letter-spacing: 0.92px;
    text-align: center;
    line-height: 0px;
  }

  .moved {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%
  }

  .moved .moved_top {
    margin: 10px 0px;
  }

  .moved .moved_middle {
    margin: 10px 0px;
  }

  .moved .moved_footer {
    margin: 10px 0px;
  }

  .moved .moved_top img {
    width: 1.48rem;
    height: 1.48rem;
    border-radius: 50%;
  }

  .moved .moved_top p {
    font-family: Helvetica;
    font-size: 20px;
    color: #252631;
    text-align: center;
    margin: 10px 0px;
  }

  .moved .moved_middle span {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #98A9BC;
    text-align: center;
    line-height: 21px;
  }

  .moved .moved_middle img {
    width: 30px;
    height: 30px;
  }

  .moved .moved_footer ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }

  .moved .moved_footer ul li {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #98A9BC;
    line-height: 21px;
  }

  .moved .moved_footer ul li:last-child {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #646464;
    line-height: 21px;
  }

  .mainTab {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
  }
</style>