<!-- 
  医生端   新增弹框内的病例授权、病人列表都没得接口，而且多选的输入框在编辑状态下都无法正常显示
 -->


<!--双向转诊系统-->
<template>
  <div class="referral">
    <!-- 病例授权 -->



    <!--弹框1.1  管理查看记录 -->
    <div v-if="isShowmoveUser1">
      <el-dialog title="" :visible.sync="isShowmoveUser1" width="40%" center>
        <div class="moved">
          <!-- 头像姓名 -->
          <div class="moved_top">
            <img v-if="dualReferralRecordFile.headId == null" src="../assets/img/a-6.png" alt="医生头像">
            <img v-if="dualReferralRecordFile.headId"
              :src='process.env.IMG_PREFIX+"/m/v1/api/hdfs/fs/download/"+dualReferralRecordFile.headId' alt="医生头像">
            <p>{{dualReferralRecordFile.patientName}}</p>
          </div>
          <!-- 转院路程 -->
          <div class="moved_middle">
            <span class="Hospital1">{{dualReferralRecordFile.applyOrgName}}</span>
            <i class="el-icon-refresh"></i>
            <span class="Hospital1">{{dualReferralRecordFile.receiveOrgName}}</span>
          </div>
          <!-- 转院详情 -->
          <div class="moved_footer">
            <ul>
              <li v-for='(text,index) in dualReferralRecordFile.records'>{{text.optTime}} {{text.orgName}}
                {{text.deptName}} {{text.stateName}}</li>
            </ul>
          </div>
        </div>
      </el-dialog>
    </div>


    <!--弹框1.2  管理查看反馈-->

    <div v-if="isShowmoveUser2">
      <el-dialog title="查看反馈" :visible.sync="isShowmoveUser2" width="40%" center>
        <el-table :data="rebackInformation">
          <el-table-column property="1" label="医院"></el-table-column>
          <el-table-column property="2" label="科室"></el-table-column>
          <el-table-column property="3" label="姓名"></el-table-column>
          <el-table-column property="4" label="反馈信息"></el-table-column>
        </el-table>
      </el-dialog>
    </div>

    <!-- <button @click='addMove'>新增转诊</button> -->
    <!-- 弹框2 新增转诊 -->

    <div v-if="isShowaddMove">
      <el-dialog class="eldialog" title="新增转诊" :visible.sync="isShowaddMove" :before-close="handleClose1">
        <el-dialog class="eldialogs" :visible.sync="isShowaddMoveNei" append-to-body>
          <el-tree :data="invitationData1" :props="defaultProps" @check="handleCheckChange" show-checkbox></el-tree>
        </el-dialog>
        <el-form :model="addForm">
          <div style="display:flex;margin:10px 0;">
            <el-form-item label="转诊类型:" :label-width="formLabelWidth">
              <el-select v-model="addForm.typeList.value" placeholder="上转/下转" clearable @change='upOrDown()'>
                <el-option v-for="item in addForm.typeList.list||[]" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="疾病名称:" :label-width="formLabelWidth">
              <el-select v-model="addForm.diseaseName.value" placeholder="请选择" clearable @change='diseaseNameId()'
                ref="ceshi1">
                <el-option v-for="item in addForm.diseaseName.list||[]" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>

          <el-form-item label="病     人:" :label-width="formLabelWidth">
            <el-select v-model="addForm.patient.value" placeholder="请选择" clearable ref="ceshi2">
              <el-option v-for="item in addForm.patient.list||[]" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <!-- <div class="block" style="margin-bottom: 22px;">
            <span class="demonstration"
              style="display: inline-block;font-weight: 700;width: 115px;text-align: right;">转入医院:</span>
            <el-cascader :options="addForm.intoHospital.list" v-model="addForm.intoHospital.value"
              @change="handleChange" clearable ref="ceshi3">
            </el-cascader>
          </div> -->

          <div class="block" style="margin-bottom: 22px;">
            <span class="demonstration"
              style="display: inline-block;font-weight: 700;width: 115px;text-align: right;">转入医院</span>
            <el-cascader expand-trigger="hover" placeholder="单选" clearable style="width:65%;"
              :options="addForm.intoHospital.list" @change="handleChange" ref="ceshi3">
            </el-cascader>
          </div>

          <div class="block" style="margin-bottom: 22px;">
            <span class="demonstration"
              style="display: inline-block;font-weight: 700;width: 115px;text-align: right;">申请时间:</span>
            <el-date-picker v-model="addForm.moveTime.value" type="datetime" placeholder="请选择" default-time="12:00:00">
            </el-date-picker>
          </div>

          <el-form-item label="病历授权:" :label-width="formLabelWidth">
            <div @click="medicalDone">
              <el-input v-model="addForm.giveRight.value" placeholder="请选择"></el-input>
            </div>
          </el-form-item>

          <!-- <el-form-item label="病历授权:" :label-width="formLabelWidth">
            <el-select v-model="addForm.giveRight.value" placeholder="单选" clearable @click="medicalDone">
              <el-option v-for="item in addForm.giveRight.list||[]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->

          <el-form-item label="转诊目的:" :label-width="formLabelWidth">
            <el-input v-model="addForm.movePurpose" autocomplete="off" placeholder="请填写"></el-input>
          </el-form-item>

          <el-form-item label="初步诊断:" :label-width="formLabelWidth">
            <el-input v-model="addForm.beginIdea" autocomplete="off" placeholder="请填写"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer" style="text-align:center;">
          <el-button type="primary" v-if="kuang2Save == 1" @click="dualReferralAdd1" style="width:70%;">新 增
          </el-button>
          <el-button type="primary" v-if="kuang2Save == 2" @click="dualReferralAdd2" style="width:70%;">编 辑
          </el-button>
          <el-button type="primary" v-if="kuang2Save == 3" @click="dualReferralAdd3" style="width:70%;">再转
          </el-button>
        </div>

      </el-dialog>
    </div>




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
              <selftag :inData="onLineList.topFlag[0]" @reback="getFilter0" v-if="chongZ"></selftag>
              <selftag :inData="onLineList.topFlag[2]" @reback="getFilter2" v-if="chongZ"></selftag>
            </div>
            <div class="manager_moveManage_top_right">
              <search @searchValue="adminSearchOne"></search>
            </div>
          </div>
          <div class="dataBody">
            <el-table :data="manageBodyData" style="width: 100%">
              <!-- <el-table-column prop="referralNo" label="编号" :show-overflow-tooltip="true"></el-table-column> -->
              <el-table-column prop="deptName" label="科室" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="applyOrgName" label="申请医院" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="applyDeptName" label="申请科室" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="applyDoctorName" label="申请人" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="applyTime" label="申请时间" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="intention" label="目的" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="patientName" label="病人" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="" label="预约类型" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="direction" label="方向" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="receiveTime" label="接诊时间" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="stateName" label="转诊状态" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                  <button class="lanSe" @click="dualReferralRecord1(scope.row)">查看记录</button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="text-align: center;padding: 10px 0;">
            <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totals"
              @current-change="currentChange1">
            </el-pagination>
          </div>
        </div>
        <!-- 统计 -->
        <div v-else-if="navInfo.i===1" class="count">
          <div class="manager_count_top mainTab">
            <div class="manager_count_top_left">
              <selftag v-model="statistics.topFlag[0]" @reback="getFilter0" v-if="chongZ"></selftag>
            </div>
            <div class="manager_count_top_right">
              <statisticsWay v-model="time" @reBack="getFilterTime"></statisticsWay>
            </div>
          </div>
          <div class="manager_count_midle">
            <div>
              <normalColumnChart :inData="testdata1"> </normalColumnChart>
              <normalColumnChart :inData="testdata2"> </normalColumnChart>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 医生端 -->
    <div v-else>
      <div class="doctorStyle">
        <selftag :inData="oTab4" @reback="getOTab4" v-if="chongZ"></selftag>
        <div style="display: flex;align-items: center;">
          <div class="manager_count_top_right">
            <statisticsWay1 v-model="time" @reBack="getFilterTime"></statisticsWay1>
          </div>
          <el-button class="startConsul" type="text" @click="addMove" style="margin:0;">新增转诊</el-button>
        </div>
      </div>
      <div class="doctorStyleBody">
        <div>
          <el-table :data="docTableData" style="width: 100%">
            <!-- <el-table-column prop="referralNo" label="编号" :show-overflow-tooltip="true"></el-table-column> -->
            <el-table-column prop="applyOrgName" label="申请医院" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="applyDeptName" label="申请科室" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="applyDoctorName" label="申请人" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="phone" label="手机号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="applyTime" label="申请时间" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="patientName" label="病人" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="intention" label="目的" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="typeName" label="方向" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="stateName" label="转诊状态" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="操作" min-width="400">
              <template slot-scope="scope">
                <button class="huangSe" @click="seeHistory(scope.row.patientId)">查看档案</button>
                <button class="lanSe" @click="dualReferralRecord2(scope.row)">转诊记录</button>
                <button
                  :class='text.btnCommand == "UPDATE"?"lvSe":"CANCEL"?"fenSe":"AUDIT"?"huangSe":"RECEPTION"?"lanSe":"LEAVE_HOSPITAL"?"huangSe":"REFERRAL"?"fenSe":"lanSe"'
                  v-for="(text,index) in scope.row.buttons" :key="index"
                  @click="list2Done(text.btnCommand,scope.row)">{{text.btnName}}</button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="text-align: center;padding: 10px 0;">
          <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totals"
            @current-change="currentChange2">
          </el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  //引入接口
  import {

    enableSynergyDoctor, //9.5获取可协作医生（本院、院外协作）





    // 已使用接口
    //筛选接口
    toolDept,//1.21.1.管理  科室列表
    toolMedicalType,//1.21.26.分级诊疗-类型
    toolMedicalGrading,//1.21.27.分级诊疗-分级
    toolReferralType,//1.21.28.双向转诊-方向



    dualReferralManagePage,//14.3.双向转诊-WEB管理端-管理列表
    statistics,//14.4.双向转诊-WEB管理端-统计
    dualReferralPage,//14.5.双向转诊-WEB医生端-列表



    readMedicals,//14.1.双向转诊-WEB医生端-疾病名称下拉框
    readMedicalsOfHospitalAndDept,//14.2.双向转诊-WEB医生端-医院与科室下拉框联动
    //点击保存
    dualReferralAdd,//14.6.双向转诊-WEB医生端-申请转诊
    //管理的 查看记录 和医生的 转诊记录   点击
    dualReferralRecord,//14.7.双向转诊-WEB医生端-查询记录
    //编辑（申请方）
    dualReferralUpdate,//14.8.双向转诊-WEB医生端-修改

    applicantCANCEL,//14.9.双向转诊-WEB医生端-申请人操作
    dualReferralReception,//3.3首页-账号及权限-创建用户(自定义)      //14.10.双向转诊-WEB医生端-接诊人操作

    //审核通过  点击（接收方）
    receptionAudit,//14.11.双向转诊-WEB医生端-审核
    dualReferraltransfer,//14.13.双向转诊-WEB医生端-接受医生再次转诊 
    dualReferralget,//14.14.双向转诊-WEB医生端-获取需要再次转诊的记录 


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
  // import { deepCopy } from '../public/publicJs/deepCopy.js'
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
        chongZ: true,
        // 常用参数
        //管理1表 查看记录  弹框
        isShowmoveUser1: false,//显示  转诊记录
        //管理1表 查看反馈  弹框
        isShowmoveUser2: false,//显示  反馈详情
        kuang2Save: 1,//医生端新增框哪个保存按钮显示

        //筛选返回值接收
        //管理1端  筛选工具栏  筛选返回值  接收参数
        departmentId: "",//筛选科室id   selftag
        // typeId: "",//筛选类型id   selftag（已取消）
        direction: "",//方向：into转入，转出out    selftag   筛选工具栏
        searchValue: "",//返回搜索框输入   search
        pageNum: 1,
        pageSize: 10,
        totals: 0,
        //管理统计端  筛选工具栏  统计筛选返回值  接收参数
        time0: "",///统计筛选开始时间     DatePicker 日期选择器
        time1: "",//统计筛选结束时间      DatePicker 日期选择器
        type: 'DAY', //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天       Select 选择器
        types: '', //String MANAGE账号是什么权限
        yTotal1: 0,//统计y轴相加
        yTotal2: 0,//统计y轴相加
        //医生端  筛选工具栏  日期筛选返回值  接收参数
        doctorDate: '',//日期筛选
        // 新增转诊
        referralType: '',//方向，UP上转，DOWN下转
        medicalId: '',//疾病ID(readMedicals  接口返回)
        arrayMed: [],
        //管理操作区
        dualReferralRecordFile: {},
        //医生操作区
        referralId: "",//转诊ID



        // element

        // 病历授权
        invitationData1: [],
        defaultProps: {
          label: "name",
          children: "children"
        },

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
              more: true,
              title: '方向',
              list: [
                {
                  text: "全部",
                  value: ""
                },
                {
                  text: "转入",
                  value: "into"
                },
                {
                  text: "转出",
                  value: "out"
                }
              ]
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
        isShowaddMoveNei: false,
        addForm: {
          typeList: {//转诊类型
            value: "",
            list: [
              {
                label: "上转",
                value: "UP"
              },
              {
                label: "下转",
                value: "DOWN"
              }
            ],
          },
          diseaseName: {//疾病名称
            value: "",
            list: [],
          },
          patient: {//病人
            value: "",
            list: [
              {
                label: "病人1",
                value: "paientId1"
              }
            ],
          },
          intoHospital: {//转入医院
            value: [],
            list: [
              // {
              //   label: 123,
              //   value: 456,
              //   children: [
              //     {
              //       label: 321,
              //       value: 654
              //     }
              //   ]
              // }
            ],
          },
          giveRight: {//病历授权
            value: "",
            list: [
              {
                value: '12',
                label: '21',
              }
            ],
          },
          moveTime: {//转诊时间
            value: "",
            list: [],
          },
          movePurpose: "",
          beginIdea: "",
        },
        formLabelWidth: '120px',
        //查看反馈信息弹框参数
        rebackInformation: [
          {
            1: "无",
            2: "无",
            3: "无",
            4: "无",
            5: "无",
          }
        ],
        //统计
        //申请科室统计图
        monthToYear: [],
        //统计图
        testdata1: {
          dataAxis: [],//每个柱子代表的类名
          data: [],//具体数值
          title: '',//图表标题
          total: ''
        },
        testdata2: {
          dataAxis: [],//每个柱子代表的类名
          data: [],//具体数值
          title: '',//图表标题
          total: ''
        },
        //医生端列表（自定义组件 ）
        docTableData: [],//医生端列表数据接收
      }
    },
    computed: {
      //引入token
      ...mapState({
        userSelfInfo: state => state.user.userSelfInfo,
        userInfo: state => state.user.userInfo,
      }),
    },
    methods: {
      //自调用组件函数
      //转诊管理、统计、切换插件返回值（管理端）
      getNav(data) {
        this.getList1();
        if (data.i == 0) {
          this.goNo();
          this.getList1()
        } else if (data.i == 1) {
          this.time0 = "";//统计筛选开始时间
          this.time1 = "";//统计筛选结束时间
          this.getList1().then(val => {
            this.goNo();
            this.getList2();
          });
        }
      },
      goNo() {
        this.chongZ = false;
        this.$nextTick(() => {
          this.chongZ = true;
        });
      },
      //筛选返回值  管理端
      getFilter0(data) {//科室筛选
        this.departmentId = data.index.value;
        console.log(this.departmentId)
        this.getList1();
        this.getList2();
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
        console.log(data)
        // var date = new Date();
        // var year = date.getFullYear();
        // var month = date.getMonth() + 1;
        // var day = date.getDate();
        // if (month < 10) {
        //   month = "0" + month;
        // }
        // if (day < 10) {
        //   day = "0" + day;
        // }
        // var nowDate = year + "-" + month + "-" + day;
        // if (data.index.value == "TODAY") {
        //   this.time0 = nowDate;
        //   this.time1 = nowDate;
        // } else if (data.index.value == "ALL") {
        //   this.time0 = "";
        //   this.time1 = "";
        // }
        // this.doctorDate = data.index.value;//这个参数不用了
        this.getList2();
        this.DoctorList();//医生端列表
      },
      handleChange(value) {
        console.log(value);
        this.addForm.intoHospital.value = value
      },
      handleClose1(done) {
        this.addForm.typeList.value = "";
        this.addForm.diseaseName.value = "";
        this.addForm.patient.value = "";
        this.addForm.intoHospital.value.length = 0;
        this.addForm.giveRight.value = "";
        this.addForm.moveTime.value = "";
        this.addForm.movePurpose = "";
        this.addForm.beginIdea = "";

        // this.addForm.typeList.list.length = 0;
        this.addForm.diseaseName.list.length = 0;
        // this.addForm.patient.list.length = 0;//等待释放
        this.addForm.intoHospital.list.length = 0;
        this.addForm.giveRight.list.length = 0;
        this.addForm.moveTime.list.length = 0;
        // done();
        this.isShowaddMove = false
      },




      //筛选列表  管理端
      //1.21.1.科室筛选  工具栏 (管理) (管理)
      async getSelect1(oindex) {
        // console.log(this.userInfo.rooter)
        // console.log(this.userInfo.manager)
        // if (this.userInfo.manager) {
        //   this.types = 'MANAGE'
        // } else {
        //   this.types = 'DOCTOR'
        // }
        let _this = this;
        let query = {
          token: this.userInfo.token,
          type: 'MANAGE'
        };
        const res = await toolDept(query);                     //1.21.1.科室筛选  工具栏 (管理) (管理)
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

          //深拷贝
          // this.onLineList.topFlag[0].list = deepCopy(res.data.body).map(item => {
          //   item.text = item.name;
          //   item.value = item.id;
          //   return item;
          // });
          // this.statistics.topFlag[0].list = deepCopy(res.data.body).map(item => {
          //   item.text = item.name;
          //   item.value = item.id;
          //   return item;
          // })



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
      //1.21.28.方向筛选  工具栏 (管理)
      async getSelect3(oindex) {
        // let _this = this;
        // let query = {
        //   token: this.userInfo.token,
        // };
        // const res = await toolReferralType(query);                     //1.21.28.方向筛选  工具栏 (管理)
        // if (res.data && res.data.errCode === 0) {
        //   console.log('1.21.28.方向筛选  工具栏 +成功')
        //   console.log(res.data.body);
        //   if (res.data.body.length > 6) {
        //     this.onLineList.topFlag[2].more = true;
        //   } else {
        //     this.onLineList.topFlag[2].more = false;
        //   }
        //   $.each(res.data.body, function (index, text) {
        //     //双向转诊   类型   筛选列表   管理1
        //     _this.onLineList.topFlag[2].list.push({
        //       text: text.name,
        //       value: text.id
        //     });
        //   });
        // } else {
        //   console.log('1.21.28.方向筛选  工具栏 +失败')
        //   //失败
        //   this.$notify.error({
        //     title: "警告",
        //     message: res.data.errMsg
        //   });
        // }
      },

      // 管理1表
      async getList1() {
        // var date = new Date();
        // var year = date.getFullYear();
        // var month = date.getMonth() + 1;
        // var day = date.getDate();
        // if (month < 10) {
        //   month = "0" + month;
        // }
        // if (day < 10) {
        //   day = "0" + day;
        // }
        // var nowDate = year + "-" + month + "-" + day;
        // this.time0 = nowDate;
        // this.time1 = nowDate;

        let _this = this;
        let query = {
          token: this.userInfo.token,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          deptId: this.departmentId,
          direction: this.direction,
          query: this.searchValue,
        };
        const res = await dualReferralManagePage(query);            //14.3.双向转诊-WEB管理端-管理列表
        if (res.data && res.data.errCode === 0) {
          console.log('管理1表+成功')
          console.log("time0", this.time0)
          console.log("time1", this.time1)
          console.log("res", res)
          console.log("list", res.data.body.data2.list)
          console.log("total", res.data.body.data2.total)
          const lists = res.data.body.data2.list
          this.totals = res.data.body.data2.total
          this.manageBodyData = lists
          this.departmentId = ""
        } else {
          console.log('管理1表+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      //管理2表（统计）
      async getList2() {
        this.getList21()
        this.getList22()
      },
      //14.4.双向转诊-WEB管理端-统计 
      async getList21() {
        const _this = this
        let query = {
          token: this.userInfo.token,
          deptId: this.departmentId, //String false 科室ID 
          statisticalType: this.type, //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天
          direction: "into",//方向：into转入，转出out
          startTime: this.time0,
          endTime: this.time1
        };
        const res = await statistics(query);            //14.4.双向转诊-WEB管理端-统计 
        if (res.data && res.data.errCode === 0) {
          console.log('统计+转入人次+成功')
          console.log(res)
          const lists = res.data.body.data
          this.yTotal1 = 0
          this.testdata1.dataAxis.length = 0
          this.testdata1.data.length = 0
          $.each(lists, function (index, text) {
            _this.yTotal1 += text.y;
            _this.testdata1.dataAxis.push(text.x)
            _this.testdata1.data.push(text.y)
          });
          this.testdata1.title = "转入人次"
          this.testdata1.total = "总数：" + this.yTotal1
          this.testdata1 = Object.assign({}, this.testdata1);
          console.log(this.yTotal1)
          console.log(this.testdata1)
        } else {
          //失败
          console.log('统计+转入人次+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      async getList22() {
        const _this = this
        let query = {
          token: this.userInfo.token,
          deptId: this.departmentId, //String false 科室ID 
          statisticalType: this.type, //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天
          direction: "out",//方向：into转入，转出out
          startTime: this.time0,
          endTime: this.time1
        };
        const res = await statistics(query);            //14.4.双向转诊-WEB管理端-统计 
        if (res.data && res.data.errCode === 0) {
          console.log('统计+转出人次+成功')
          console.log(res)
          const lists = res.data.body.data
          this.yTotal2 = 0
          this.testdata2.dataAxis.length = 0
          this.testdata2.data.length = 0
          $.each(lists, function (index, text) {
            _this.yTotal2 += text.y;
            _this.testdata2.dataAxis.push(text.x)
            _this.testdata2.data.push(text.y)
          });
          this.testdata2.title = "转出人次"
          this.testdata2.total = "总数：" + this.yTotal2
          this.testdata2 = Object.assign({}, this.testdata2);
          console.log(this.yTotal2)
          console.log(this.testdata2)
        } else {
          //失败
          console.log('统计+转出人次+失败')
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
          token: this.userInfo.token,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          startTime: this.time0,//时间段返回值
          endTime: this.time1,
          query: this.doctorDate,//查询数据  (不能用)用的日期筛选返回值
          direction: this.direction,//方向：into转入，转出out
        };
        const res = await dualReferralPage(options);                  //14.5.双向转诊-WEB医生端-列表
        if (res.data && res.data.errCode === 0) {
          console.log('医生表+成功')
          console.log("time0:", this.time0)
          console.log("time1:", this.time1)
          console.log("res:", res)
          console.log("list:", res.data.body.data2.list)
          console.log("total:", res.data.body.data2.total)
          const lists = res.data.body.data2.list
          this.totals = res.data.body.data2.total
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


















      //新增转诊
      async addMove() {
        this.isShowaddMove = true
        this.kuang2Save = 1
      },
      //新增弹框首选项   转诊类型选的什么
      upOrDown() {
        return new Promise(t => {
          this.referralType = this.addForm.typeList.value
          this.readMedicals();
          t();
        });
      },
      //返回所选病症id
      diseaseNameId() {
        // console.log(this.addForm.diseaseName)
        this.medicalId = this.addForm.diseaseName.value
        console.log(this.medicalId)
        if (this.medicalId) {
          this.readMedicalsOfHospitalAndDept();
        }
      },
      // 疾病名称下拉框 列表
      async readMedicals() {
        console.log(this.referralType)
        let _this = this;
        const options = {
          token: this.userInfo.token,
          referralType: this.referralType,//方向，UP上转，DOWN下转
        };
        const res = await readMedicals(options);                  //14.1.双向转诊-WEB医生端-疾病名称下拉框 
        if (res.data && res.data.errCode === 0) {
          console.log('疾病名称下拉框 +成功')
          console.log(res)
          this.addForm.diseaseName.list.length = 0
          $.each(res.data.body, function (index, text) {
            _this.addForm.diseaseName.list.push(
              {
                label: text.name,
                value: text.id
              }
            )
          })
        } else {
          //失败
          console.log('疾病名称下拉框 +失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      // 14.2.双向转诊-WEB医生端-医院与科室下拉框联动 
      async readMedicalsOfHospitalAndDept() {
        this.referralType = this.addForm.typeList.value
        console.log(this.referralType)
        let _this = this;
        const options = {
          token: this.userInfo.token,
          referralType: this.referralType,//方向，UP上转，DOWN下转
          medicalId: this.medicalId//疾病ID(readMedicals  接口返回)
        };
        const res = await readMedicalsOfHospitalAndDept(options);                  // 14.2.双向转诊-WEB医生端-医院与科室下拉框联动 
        if (res.data && res.data.errCode === 0) {
          console.log('医生端-医院与科室下拉框联动 +成功')
          console.log(res)
          this.addForm.intoHospital.list.length = 0;
          $.each(res.data.body, function (index1, text) {
            _this.addForm.intoHospital.list.push(
              {
                label: text.label,
                value: text.id,
                type: text.type,
                children: []
              }
            )
            if (text.children.length != 0) {
              $.each(text.children, function (index, text) {
                _this.addForm.intoHospital.list[index1].children.push(
                  {
                    label: text.label,
                    value: text.id,
                    type: text.type,
                  }
                )
              })
            }
          })
          console.log(this.addForm.intoHospital.list)
        } else {
          //失败
          console.log('医生端-医院与科室下拉框联动 +失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      // 病历授权
      async medicalDone() {
        this.isShowaddMoveNei = true
        // this.consultationId = row.id;
        this.invitationData1 = [];
        // this.invitationVisible = true;
        let _this = this;
        let query = {
          token: this.userInfo.token
        };
        const res = await enableSynergyDoctor(query);
        if (res.data && res.data.errCode === 0) {
          console.log(res.data.body);
          this.invitationData1 = res.data.body;
        } else {
          //失败
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      handleCheckChange(data, checked, indeterminate) {
        this.addForm.giveRight.value = "";
        this.addForm.giveRight.list.length = 0;
        console.log(checked);
        let _this = this;
        $.each(checked.checkedNodes, function (index, text) {
          console.log(text);
          if (text.type == 3) {
            _this.addForm.giveRight.value = _this.addForm.giveRight.value + " " + text.name;
            _this.addForm.giveRight.list.push({
              label: text.name,
              value: text.id,
            })
          }
        });
        console.log(this.addForm.giveRight.list)
      },
      //点击确定    新增门诊
      async dualReferralAdd1() {
        const _this = this;
        console.log(this.addForm)
        this.arrayMed.length = 0
        $.each(this.addForm.giveRight.list, function (index, text) {
          _this.arrayMed.push(text.value)
        });
        console.log(this.arrayMed)
        let query = {
          token: this.userInfo.token
        };
        let options = {
          referralType: this.addForm.typeList.value,//转诊类型：UP上转，DOWN下转
          illnessId: this.addForm.diseaseName.value,
          illnessName: this.$refs.ceshi1.selectedLabel,
          patientId: this.addForm.patient.value,
          patientName: this.$refs.ceshi2.selectedLabel,
          receiveOrgName: this.$refs.ceshi3.currentLabels[0],//接收医生名称 
          receiveOrgCode: this.addForm.intoHospital.value[0],//	接收医院代码  
          receiveDeptName: this.$refs.ceshi3.currentLabels[1],//	接收科室名称 
          receiveDeptId: this.addForm.intoHospital.value[1],//接收科室ID 
          applyTime: this.addForm.moveTime.value,
          intention: this.addForm.movePurpose,//转诊目的 
          diagnose: this.addForm.beginIdea,//	初步诊断 
          // archivesAuthority: this.addForm.giveRight.value,
          // id:"", //上次转诊记录ID
          medicalRecordIds: this.arrayMed//病历授权（数组） 
        };
        console.log(options)
        const res = await dualReferralAdd(query, options);                                   //  14.6.双向转诊-WEB医生端-申请转诊 
        if (res.data && res.data.errCode === 0) {
          this.isShowaddMove = false
          console.log('新增门诊 +成功')
          console.log(res)
          // this.referralId = res.data.body
          // console.log(this.referralId)
          this.DoctorList();
          this.handleClose1()
        } else {
          //失败
          console.log('新增门诊 +失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },

























      // 管理1表      操作区  
      //查看记录
      async dualReferralRecord1(data) {
        console.log(data)
        console.log(data.referralId)
        this.isShowmoveUser1 = !this.isShowmoveUser1
        let _this = this;
        const options = {
          token: this.userInfo.token,
          referralId: data.referralId,//转诊ID
        };
        const res = await dualReferralRecord(options);                  //14.7.双向转诊-WEB医生端-查询记录 
        if (res.data && res.data.errCode === 0) {
          console.log('管理1表 -查询记录 (按钮)+成功')
          console.log(res)
          this.dualReferralRecordFile = res.data.body
        } else {
          //失败
          console.log('管理1表 -查询记录 (按钮)+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      //查看反馈
      async viewFile2(data) {
        this.isShowmoveUser2 = !this.isShowmoveUser2
        console.log(data)
      },


      // 医生表     操作区 
      //查看档案     (按钮)
      async doctorListFun1(data) {
        console.log(data)
        // this.isShowaddMove = !this.isShowaddMove
        // this.isShowmoveUser1 = !this.isShowmoveUser1
      },
      //表2点击  操作区    (按钮)
      //按钮 UPDATE("修改"), CANCEL("取消"), AUDIT("审核"), RECEPTION("接诊"), LEAVE_HOSPITAL("出院"), REFERRAL("转诊"),
      async list2Done(data1, data2) {
        console.log(data1, data2)
        this.referralId = data2.referralId
        if (data1 == "UPDATE") {//编辑
          this.dualReferralUpdate(data2);
          this.kuang2Save = 2
          this.DoctorList()
        } else if (data1 == "CANCEL") {//取消
          this.applicantCANCEL(data2)
          this.DoctorList()
        }
        else if (data1 == "AUDIT") {//审核
          this.receptionAudit(data2)
          this.DoctorList()
        }
        else if (data1 == "RECEPTION") {//接诊
          this.dualReferralReception1(data2)
          this.DoctorList()
        }
        else if (data1 == "LEAVE_HOSPITAL") {//出院
          this.dualReferralReception2(data2)
          this.DoctorList()
        }
        else if (data1 == "REFERRAL") {//转诊
          this.dualReferralReception3(data2)
          this.DoctorList()
        }
      },
      //转诊记录     (按钮)   (管理医生端都有的查看 详情按钮)
      async dualReferralRecord2(data) {
        console.log(data)
        this.isShowmoveUser1 = !this.isShowmoveUser1
        let _this = this;
        const options = {
          token: this.userInfo.token,
          referralId: data.referralId,//转诊ID
        };
        const res = await dualReferralRecord(options);                  //14.7.双向转诊-WEB医生端-查询记录 
        if (res.data && res.data.errCode === 0) {
          console.log('医生端-查询记录 (按钮)+成功')
          console.log(res)
          this.dualReferralRecordFile = res.data.body
        } else {
          //失败
          console.log('医生端-查询记录 (按钮)+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },



      //编辑     (按钮)
      //开始渲染
      async dualReferralUpdate(data2) {
        this.isShowaddMove = true
        this.referralId = data2.referralId
        console.log(data2)
        let _this = this;
        const options = {
          token: this.userInfo.token,
          referralId: data2.referralId,//转诊ID
        };
        const res = await dualReferralRecord(options);                  //14.7.双向转诊-WEB医生端-查询记录 
        if (res.data && res.data.errCode === 0) {
          console.log('医生端-查询记录 (按钮)+成功')
          console.log(res)
          this.addForm.typeList.value = res.data.body.typeCode
          this.addForm.diseaseName.value = res.data.body.illnessId
          this.addForm.patient.value = res.data.body.patientId
          this.addForm.intoHospital.value = [res.data.body.receiveOrgCode, res.data.body.receiveDeptId]
          this.addForm.giveRight.value = res.data.body.archivesAuthority
          this.addForm.moveTime.value = res.data.body.applyTime
          this.addForm.movePurpose = res.data.body.intention
          this.addForm.beginIdea = res.data.body.diagnose
          console.log(this.addForm)
          this.upOrDown().then(val => {
            this.diseaseNameId();
          });
        } else {
          //失败
          console.log('医生端-查询记录 (按钮)+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      async dualReferralAdd2(data2) {
        console.log(this.addForm)
        let query = {
          token: this.userInfo.token
        };
        let options = {
          id: this.referralId,//ID
          referralType: this.addForm.typeList.value,//转诊类型：UP上转，DOWN下转
          illnessId: this.addForm.diseaseName.value,//疾病ID
          illnessName: this.$refs.ceshi1.selectedLabel,//疾病名称
          patientId: this.addForm.patient.value,//病人ID（编号） 
          patientName: this.$refs.ceshi2.selectedLabel,//病人名称 
          receiveOrgCode: this.addForm.intoHospital.value[0],//接收医院代码 
          receiveOrgName: this.$refs.ceshi3.currentLabels[0],//接收医生名称 
          receiveDeptId: this.addForm.intoHospital.value[1],//接收科室ID
          receiveDeptName: this.$refs.ceshi3.currentLabels[1],//接收科室名称
          // applyTime: this.addForm.moveTime.value,
          intention: this.addForm.movePurpose,//转诊目的
          diagnose: this.addForm.beginIdea,//初步诊断
          // archivesAuthority: this.addForm.giveRight.value,//病历授权
          medicalRecordIds: this.arrayMed
        };
        console.log(options)
        const res = await dualReferralUpdate(query, options);                                   //  14.8.双向转诊-WEB医生端-修改
        if (res.data && res.data.errCode === 0) {
          this.isShowaddMove = false
          console.log('WEB医生端编辑 +成功')
          console.log(res)
          this.DoctorList();
          this.handleClose1()
        } else {
          //失败
          console.log('WEB医生端编辑 +失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      // //删除     (按钮)
      // async doctorListFun4(data) {
      //   console.log(data)
      // },
      //取消     (按钮)
      async applicantCANCEL(data2) {
        let _this = this;
        const query = {
          token: this.userInfo.token,
        };
        const options = {
          referralId: data2.referralId,//转诊ID
        };
        const res = await applicantCANCEL(query, options);                  //14.9.双向转诊-WEB医生端-申请人操作
        if (res.data && res.data.errCode === 0) {
          console.log('医生端-取消 (按钮)+成功')
          console.log(res)
          this.getList1()
          this.DoctorList()
        } else {
          //失败
          console.log('医生端-取消 (按钮)+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      //审核通过      (按钮)
      async receptionAudit(data2) {
        let query = {
          token: this.userInfo.token,
        };
        let options = {
          referralId: data2.referralId,//转诊ID
        };
        const res = await receptionAudit(query, options);                                   //14.11.双向转诊-WEB医生端-审核
        if (res.data && res.data.errCode === 0) {
          console.log('医生端-接诊 (按钮)+成功')
          console.log(res)
          this.getList1()
          this.DoctorList()
        } else {
          //失败
          console.log('医生端-接诊 (按钮)+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      //接诊     (按钮)
      async dualReferralReception1(data2) {
        let query = {
          token: this.userInfo.token,
          operate: 'RECEPTION'
        };
        let options = {
          referralId: data2.referralId,//转诊ID
        };
        const res = await dualReferralReception(query, options);                                   //14.10.双向转诊-WEB医生端-接诊人操作
        if (res.data && res.data.errCode === 0) {
          console.log('医生端-接诊 (按钮)+成功')
          console.log(res)
          this.getList1()
          this.DoctorList()
        } else {
          //失败
          console.log('医生端-接诊 (按钮)+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      //出院     (按钮)
      async dualReferralReception2(data2) {
        let query = {
          token: this.userInfo.token,
          operate: 'LEAVE_HOSPITAL'
        };
        let options = {
          referralId: data2.referralId,//转诊ID
        };
        const res = await dualReferralReception(query, options);                                   //14.10.双向转诊-WEB医生端-接诊人操作
        if (res.data && res.data.errCode === 0) {
          console.log('医生端-出院 (按钮)+成功')
          console.log(res)
          this.getList1()
          this.DoctorList()
        } else {
          //失败
          console.log('医生端-出院 (按钮)+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      //转诊     (按钮)
      async dualReferralReception3(data2) {
        this.isShowaddMove = true
        this.kuang2Save = 3
        let query = {
          token: this.userInfo.token,
          referralId: data2.referralId,//转诊ID
        };
        const res = await dualReferralget(query);                                   //14.14.双向转诊-WEB医生端-获取需要再次转诊的记录 
        if (res.data && res.data.errCode === 0) {
          console.log('医生端-再次转诊渲染信息+成功')
          console.log(res)
          // this.addForm.typeList.value = res.data.body.typeCode
          // this.addForm.diseaseName.value = res.data.body.illnessId
          this.addForm.patient.value = res.data.body.patientId
          // this.addForm.intoHospital.value = [res.data.body.receiveOrgCode, res.data.body.receiveDeptId]
          // this.addForm.giveRight.value = res.data.body.archivesAuthority
          // this.addForm.moveTime.value = res.data.body.applyTime
          // this.addForm.movePurpose = res.data.body.intention
          // this.addForm.beginIdea = res.data.body.diagnose
          console.log(this.addForm)
          // this.upOrDown().then(val => {
          //   this.diseaseNameId();
          // });
          this.getList1()
          this.DoctorList()
        } else {
          //失败
          console.log('医生端-再次渲染信息+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      async dualReferralAdd3(data2) {
        console.log(this.addForm)
        let query = {
          token: this.userInfo.token
        };
        let options = {
          id: this.referralId,//ID
          referralType: this.addForm.typeList.value,//转诊类型：UP上转，DOWN下转
          illnessId: this.addForm.diseaseName.value,//疾病ID
          illnessName: this.$refs.ceshi1.selectedLabel,//疾病名称
          patientId: this.addForm.patient.value,//病人ID（编号） 
          patientName: this.$refs.ceshi2.selectedLabel,//病人名称 
          receiveOrgCode: this.addForm.intoHospital.value[0],//接收医院代码 
          receiveOrgName: this.$refs.ceshi3.currentLabels[0],//接收医生名称 
          receiveDeptId: this.addForm.intoHospital.value[1],//接收科室ID
          receiveDeptName: this.$refs.ceshi3.currentLabels[1],//接收科室名称
          applyTime: this.addForm.moveTime.value,
          intention: this.addForm.movePurpose,//转诊目的
          diagnose: this.addForm.beginIdea,//初步诊断
          // archivesAuthority: this.addForm.giveRight.value,//病历授权
          medicalRecordIds: this.arrayMed
        };
        console.log(options)
        const res = await dualReferraltransfer(query, options);                                   //  14.13.双向转诊-WEB医生端-接受医生再次转诊 
        if (res.data && res.data.errCode === 0) {
          this.isShowaddMove = false
          console.log('WEB医生端再次转诊 +成功')
          console.log(res)
          this.DoctorList();
          this.handleClose1()
        } else {
          //失败
          console.log('WEB医生端再次转诊 +失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },






      // 、、分页
      currentChange1(data) {
        console.log(data)
        this.pageNum = data
        this.getList1()
      },
      currentChange2(data) {
        console.log(data)
        this.pageNum = data
        this.DoctorList()
      },
      async seeHistory(data) {
        console.log(data)
        this.$router.push({
          path: "/docDetailed",
          query: {
            id: data
          }
        })
      },
    },
    watch: {
      '$store.state.user.viewRoot.now.name': {
        handler(n) {
          if (n === 'manager') {
            this.getSelect1()
            this.getList1()
          } else {
            this.getSelect1()
            this.DoctorList()
          }
        }
      }
    },





    async created() {
      if (this.$store.state.user.viewRoot.now.name === 'manager') {
        this.getSelect1()
        this.getList1()
        // this.getSelect2()
        // this.getSelect3()
      } else {
        this.getSelect1()
        this.DoctorList()
      }
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
    /* min-height: 76vh; */
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
    margin: 50px 2.36rem 35px 0;
    justify-content: space-between;
    align-items: center;
  }

  .doctorStyleBody {
    background: #FFF;
    border: 1px solid var(--color5);
    box-shadow: 0 0.06rem 0.36rem 0 rgba(0, 62, 100, 0.04);
    border-radius: 0.04rem;
    padding-top: 0.32rem;
    padding-right: 0.69rem;
    padding-left: 0.38rem;
    /* min-height: 76vh; */
    margin-right: 0.36rem;
    margin-top: 0.42rem;
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
    display: flex;
    justify-content: center;
    align-items: center;
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

  .manager_count_midle {
    margin: 40px 0 0 0;

    div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-content: start;
      align-items: center;
      /* flex-wrap: wrap; */
    }
  }

  .el-icon-refresh {
    margin: 0 20px;
    font-size: 30px;
    color: #27AD9A;
  }

  .lanSe:focus {
    outline: none;
  }

  .lvSe:focus {
    outline: none;
  }

  .fenSe:focus {
    outline: none;
  }

  .huangSe:focus {
    outline: none;
  }

  .lanSe {
    width: 57px;
    height: 20px;
    background: rgba(66, 133, 244, 0.1);
    border: 1px solid rgba(66, 133, 244, 0.6);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #4d7cfe;
    line-height: 3px;
    margin: 0 14px 0 14px;
  }

  .lvSe {
    width: 57px;
    height: 20px;
    background: rgba(46, 189, 65, 0.10);
    border: 1px solid rgba(46, 189, 65, 0.60);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #2EBD41;
    line-height: 3px;
    margin: 0 14px 0 14px;
  }

  .fenSe {
    width: 57px;
    height: 20px;
    background: rgba(254, 77, 151, 0.10);
    border: 1px solid rgba(254, 77, 151, 0.60);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #FE4D97;
    line-height: 3px;
    margin: 0 14px 0 14px;
  }

  .huangSe {
    width: 57px;
    height: 20px;
    background: rgba(255, 171, 43, 0.10);
    border: 1px solid rgba(255, 171, 43, 0.60);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #FFAB2B;
    line-height: 3px;
    margin: 0 14px 0 14px;
  }

  /deep/ .el-table__header-wrapper th {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #5E6875;
    letter-spacing: 0;
  }

  /deep/ .el-table__body-wrapper td {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #5E6875;
    letter-spacing: 0;
  }

  .eldialog /deep/ .el-dialog {
    width: 40%;
    margin-left: 20%;
  }

  .eldialogs /deep/ .el-dialog {
    border: 1px solid red;
    width: 30%;
    margin-left: 60%;
  }
</style>