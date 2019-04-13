<template>
  <div class="medical">
    <div class="medical_top">
      <normalTab v-model="barInfo" @reBack="getBar"></normalTab>
    </div>

    <!--    弹框子组件  引入 -->

    <div v-if="doctorVisible">
      <el-dialog title=" 医院及科室范围" :visible.sync="doctorVisible" width="602px" hight="356px" center>
        <hosptialAndDepartmentArea :doctorDetailData="doctorDetailData"></hosptialAndDepartmentArea>
      </el-dialog>
    </div>
    <!-- 新增业务   弹框    1 -->

    <div v-if="kuangData1.show">
      <el-dialog title="疾病分级分类" :visible.sync="kuangData1.show" :before-close="handleClose1" center>
        <el-form :model="kuangData1.form">
          <el-form-item label="科室" :label-width="kuangData1.formLabelWidth">
            <el-select v-model="kuangData1.options1.value" placeholder="选择科室（单选）" style="width:80%">
              <el-option v-for="(item,index) in kuangData1.options1.list||[]" :key="index" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="类型" :label-width="kuangData1.formLabelWidth">
            <el-select v-model="kuangData1.options2.value" filterable allow-create default-first-option
              placeholder="填写或选择" style="width: 80%;" @change='isHaveDepartment11' ref="ceshi1">
              <el-option v-for="(item,index) in kuangData1.options2.list||[]" :key="index" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="名称" :label-width="kuangData1.formLabelWidth">
            <el-select v-model="kuangData1.options3.value" filterable allow-create default-first-option
              placeholder="填写或选择" style="width: 80%;" @change="inputReturn12" ref="ceshi2">
              <el-option v-for="(item,index) in kuangData1.options3.list||[]" :key="index" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="分级" :label-width="kuangData1.formLabelWidth">
            <el-select v-model="kuangData1.options4.value" placeholder="请选择1-4级" style="width:80%">
              <el-option v-for="(item,index) in kuangData1.options4.list||[]" :key="index" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="YesList1 == 1" type="primary" @click="kuangData1Fun11" style="width:80%">新 增
          </el-button>
          <el-button v-if="YesList1 == 2" type="primary" @click="kuangData1Fun12" style="width:80%">编 辑
          </el-button>
        </div>
      </el-dialog>
    </div>




    <!-- 新增业务   弹框  2  -->
    <div v-if="kuangData2.show">
      <el-dialog title="转入控制" :visible.sync="kuangData2.show" :before-close="handleClose2" center>
        <el-form>
          <!-- :model="kuangData2.options" -->
          <el-form-item label="科         室:" :label-width="kuangData2.formLabelWidth">
            <el-select v-model="kuangData2.options1.value" placeholder="单选" style="width:80%"
              @change='isHaveDepartment21'>
              <el-option v-for="(item,index) in kuangData2.options1.list||[]" :key="index" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="接诊疾病等级:" :label-width="kuangData2.formLabelWidth">
            <el-select v-model="kuangData2.options2.value" multiple placeholder="多选" style="width:80%"
              @change="inputReturn21">
              <el-option v-for="(item,index) in kuangData2.options2.list||[]" :key="index" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <div class="block" style="margin-bottom: 22px;">
            <span class="demonstration"
              style="display: inline-block;font-weight: 700;width: 115px;text-align: right;">申请医院和科室:</span>
            <el-cascader :options="kuangData2.options3.list" v-model="kuangData2.options3.value" @change="inputReturn22"
              placeholder="多选" clearable style="width:65%;">
            </el-cascader>
          </div>

          <div class="input-item-div bieDou">
            <span class="input-item-name demonstration" style="display: inline-block;font-weight: 700;width: 115px;text-align: right;">申请医院和科室:</span>
            <div class="input-item-value-div">
              <el-select v-model="kuangData2.options3.value" multiple placeholder="请选择" size="mini">
                <el-option v-for="(item,index) in kuangData2.options3.list" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <i class="iconfont required-icon">&#xe7b0;</i>
            </div>
          </div>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="YesList2 == 1" type="primary" @click="kuangData1Fun21" style="width:80%">新 增</el-button>
          <el-button v-if="YesList2 == 2" type="primary" @click="kuangData1Fun22" style="width:80%">编 辑</el-button>
        </div>
      </el-dialog>
      {{kuangData2.options3.value}}
    </div>






    <!-- 管理    疾病分级分类管理 -->
    <div v-if="barInfo.i == 0" class="medical_body0">
      <div class="medical_nav ">
        <div class="medical_nav_left">
          <selftag :inData="onLineList.topFlag[0]" @reback="getFilter0" v-if="chongZ"></selftag>
          <selftag :inData="onLineList.topFlag[1]" @reback="getFilter1" v-if="chongZ"></selftag>
          <selftag :inData="onLineList.topFlag[2]" @reback="getFilter2" v-if="chongZ"></selftag>
        </div>
        <div class="medical_nav_right">
          <search @searchValue="adminSearchOne"></search>
          <el-button type="primary" @click="addBusinessFun1">新增</el-button>
        </div>
      </div>
      <div class="medical_body0_table">
        <!-- <el-table :data="medical_body0_Data" style="width: 100%" @cell-click="cellClick1" :max-height="400"> -->
        <el-table :data="medical_body0_Data" style="width: 100%" @cell-click="cellClick1">
          <el-table-column prop="deptName" label="科室" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="typeName" label="类型" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="id" label="编号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="medicalName" label="名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="levelName" label="分级" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <button class="bianJi" @click="editList1(scope.row)">编 辑</button>
              <button class="jingYong" @click="delectList1(scope.row)">删 除</button>
              <!-- <el-button @click="editList1(scope.row)" type="success" plain size="mini"
                style="margin:0.05rem 0 0.05rem 0;">编辑</el-button>
              <el-button @click="delectList1(scope.row)" type="danger" plain size="mini"
                style="margin:0.05rem 0 0.05rem 0;">删除</el-button> -->
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
    <!-- 管理   流程和权限控制 -->
    <div v-if="barInfo.i == 1" class="medical_body1">
      <div class="medical_nav ">
        <div class="medical_nav_left">
          <selftag :inData="onLineList.topFlag[0]" @reback="getFilter0" v-if="chongZ"></selftag>
        </div>
        <div class="medical_nav_right">
          <search @searchValue="adminSearchOne"></search>
          <el-button type="primary" @click="addBusinessFun2">新增</el-button>
        </div>
      </div>
      <div class="medical_body1_table">
        <el-table :data="medical_body1_Data" style="width: 100%" @cell-click="cellClick2" :cell-class-name="ceshi0"
          :key="Math.random()">
          <el-table-column prop="deptName" label="科室" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="direction" label="方向" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="scope" label="范围" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="levelDesc" label="疾病等级" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="" width="300">
            <template slot-scope="scope">
              <button v-if="scope.row.direction == '转入'" class="bianJi" @click="editList2(scope.row)">编 辑</button>
              <button v-if="scope.row.direction == '转入'" class="jingYong" @click="delectList2(scope.row)">删 除</button>
              </el-button>
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



    <!-- 管理   统计 -->
    <div v-if="barInfo.i == 2" class="medical_body2">
      <div class="manager_count_top mainTab">
        <div class="manager_count_top_left">
          <selftag v-model="onLineList.topFlag[0]" @reback="getFilter0" v-if="chongZ"></selftag>
        </div>
        <div class="manager_count_top_right">
          <!-- <statisticsWay v-model="time" @reBack="getFilterTime"></statisticsWay> -->
        </div>
      </div>
      <div class="manager_count_midle">
        <div>
          <normalColumnChart :inData="testdata1"> </normalColumnChart>

        </div>
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
    fetchHospitalDepts,//2.2.获取医院科室列表


    fetchMedicalClassify,//13.1.分类管理-列表
    addMedicalClassify,//13.2.分类管理-新增
    editMedicalClassify,//13.3.分级管理-修改
    delMedicalClassify,//13.4.分级管理-删除
    chooseDept,//13.5.权限控制-科室列表下拉框
    chooseAcceptsLevel,//13.6.权限控制-接诊疾病等级下拉框
    chooseApplyDept,//13.7.权限控制-申请医院和科室下拉框
    addMedicalControl,//13.8.权限控制-新增
    editMedicalControl,//13.9.权限控制-编辑
    delMedicalControl,//13.10.权限控制-删除
    fetchMedicalControl,//13.11.权限控制-列表
    medicalControlCharts,//13.12.统计-统计图
    fetchMedicalType,//13.13.分级管理-类型下拉数据
    fetchMedicalDict,//13.14.分级管理-名称与类型联动的名称下拉列表
    fetchHospitalDeptAuth,//1.2.1.获取医院科室列表（新）主要用于表单选择
  } from "../../api/apiAll.js";
  //引入组件
  import normalTab from './../../public/publicComponents/normalTab.vue'
  import selftag from './../../public/publicComponents/selftag.vue'
  import search from './../../public/publicComponents/search.vue'
  import diseaseGrade from './../../public/publicComponents/diseaseGrade.vue'
  import statisticsWay from './../../public/publicComponents/statisticsWay.vue'
  import normalColumnChart from './../../public/publicComponents/normalColumnChart.vue'
  import hosptialAndDepartmentArea from './../xiezuo/hosptialAndDepartmentArea.vue'
  //引入token
  import { mapState } from "vuex";
  export default {
    components: {
      normalTab,
      selftag,
      search,
      diseaseGrade,
      statisticsWay,
      normalColumnChart,
      hosptialAndDepartmentArea,
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo,
        userSelfInfo: state => state.user.userSelfInfo,
        global: state => state.global
      }),
    },
    data() {
      return {
        chongZ: true,
        // 弹框  1  参数
        kuangData1: {
          show: false,
          options1: {
            value: "",
            list: []
          },
          options2: {
            value: "",
            list: []
          },
          options3: {
            value: "",
            list: []
          },
          options4: {
            value: null,
            list: [{ value: 1, label: '一级' }, { value: 2, label: '二级' }, { value: 3, label: '三级' }, { value: 4, label: '四级' },]
          },
          formLabelWidth: '120px',
        },
        YesList1: null,
        YesList2: null,
        // 弹框  2  参数
        kuangData2: {
          show: false,
          options1: {
            value: "",
            list: []
          },
          options2: {
            value: [],
            list: []
          },
          options3: {
            value: [],
            list: [],
          },
          formLabelWidth: '120px',
        },

        // 常用参数
        //管理1表 查看记录  弹框
        editKuang: false,//显示  编辑
        adds: "",//保存表一新增弹框，编辑时某一行的id
        adds2: "",//保存表2新增弹框，编辑时某一行的id
        totals: 0,
        //筛选返回值接收
        //管理1端  筛选工具栏  筛选返回值  接收参数
        departmentId: "",//科室id   selftag
        typeId: "",//类型id   selftag
        gradeId: "",//分级id   selftag
        searchValue: "",//返回搜索框输入   search
        pageNum: 1,
        pageSize: 10,
        // 管理1.2表  表体点击  范围  传入参数
        doctorVisible: false,
        doctorDetailData: [
          {
            hosptial: "西南医院第三附属医院",
            department: "神经内科",
          },
          {
            hosptial: "西南医院第三附属医院",
            department: "神经内科",
          },

        ],
        //管理统计端  筛选工具栏  统计筛选返回值  接收参数
        time0: "",///统计筛选开始时间     DatePicker 日期选择器
        time1: "",//统计筛选结束时间      DatePicker 日期选择器
        type: 'DAY', //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天       Select 选择器
        types: '', //String MANAGE账号是什么权限
        //医生端  筛选工具栏  日期筛选返回值  接收参数
        // 新增
        dialogFormVisible: false,
        //管理操作区
        //医生操作区










        // element

        // 必备参数
        time: null, // 时间筛选组件    statisticsWay
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
              list: []
            }
          ],
        },
        medical_body0_Data: [],
        medical_body1_Data: [],



        //统计
        //申请科室统计图
        monthToYear: [],
        //统计图
        yTotal1: 0,//统计y轴相加
        testdata1: {
          dataAxis: [],//每个柱子代表的类名
          data: [],//具体数值
          title: '',//图表标题
          total: ''
        },
      }
    },
    methods: {

      //自调用组件函数
      //  管理  切换数据
      getBar(data) {
        console.log(data)
        if (data.i == 0) {
          this.goNo();
          this.getList1()
        } else if (data.i == 1) {
          this.goNo();
          this.getList2()
        } else if (data.i == 2) {
          this.departmentId = ""
          this.time0 = "";//统计筛选开始时间
          this.time1 = "";//统计筛选结束时间
          this.getList1().then(val => {
            this.goNo();
            this.getList3();
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
        this.getList1()
        this.getList2()
        this.getList3()
      },
      getFilter1(data) {//类型筛选
        this.typeId = data.index.value;
        console.log(this.typeId)
        this.getList1()
      },
      getFilter2(data) {//分级筛选
        console.log(data)
        this.gradeId = data.index.value;
        console.log(this.gradeId)
        this.getList1()
      },
      adminSearchOne(data) {//搜索（筛选右边）
        this.searchValue = data;
        console.log(this.searchValue)
        this.getList1()
        this.getList2()
      },
      getFilterTime(data) {//统计		//时间选择器返回函数
        console.log(data)
        this.time0 = data.time[0];//统计筛选开始时间
        this.time1 = data.time[1];//统计筛选结束时间
        this.type = data.select.value
        this.getList3()
      },
      handleClose1(done) {
        this.kuangData1.options1.value = "";
        this.kuangData1.options2.value = "";
        this.kuangData1.options3.value = "";
        this.kuangData1.options4.value = null;
        done();
      },
      handleClose2(done) {
        this.kuangData2.options1.value = "";
        this.kuangData2.options2.value = [];
        this.kuangData2.options3.value = [];
        done();
      },
      inputReturn11(value) {
        console.log(value);
      },
      inputReturn12(value) {
        console.log(value);
      },
      inputReturn21(value) {
        console.log(value);
      },
      inputReturn22(value) {
        console.log(value);
      },




      //筛选工具栏  请求  管理端
      //1.21.1.科室筛选  工具栏 (管理) (管理)
      async getSelect1(oindex) {
        let _this = this;
        let query = {
          token: this.userInfo.token,
          type: 'MANAGE'
        };
        const res = await toolDept(query);                                       //1.21.1.科室筛选  工具栏 (管理) (管理)
        if (res.data && res.data.errCode === 0) {
          console.log('1.21.1.科室工具栏 +成功')
          // console.log(res.data.body);
          if (res.data.body.length > 6) {
            this.onLineList.topFlag[0].more = true;
          } else {
            this.onLineList.topFlag[0].more = false;
          }
          this.onLineList.topFlag[0].list.length = 0;
          $.each(res.data.body, function (index, text) {
            _this.onLineList.topFlag[0].list.push(
              {
                text: text.name,
                value: text.id
              }
            );
          });
          // this.kuangData1.options1.list = this.onLineList.topFlag[0].list
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
          token: this.userInfo.token,
        };
        const res = await toolMedicalType(query);                                     //1.21.26.类型筛选  工具栏 (管理)
        if (res.data && res.data.errCode === 0) {
          console.log('1.21.26.类型筛选  工具栏 +成功')
          console.log(res.data.body);
          if (res.data.body.length > 6) {
            this.onLineList.topFlag[1].more = true;
          } else {
            this.onLineList.topFlag[1].more = false;
          }
          this.onLineList.topFlag[1].list.length = 0;
          $.each(res.data.body, function (index, text) {
            //   类型   筛选列表   管理1
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
      //1.21.26.分级筛选  工具栏 (管理)
      async getSelect3(oindex) {
        let _this = this;
        let query = {
          token: this.userInfo.token,
        };
        const res = await toolMedicalGrading(query);                                        //1.21.27.分级诊疗-分级
        if (res.data && res.data.errCode === 0) {
          console.log('1.21.27.分级诊疗-分级  工具栏 +成功')
          // console.log(res.data.body);
          if (res.data.body.length > 6) {
            this.onLineList.topFlag[2].more = true;
          } else {
            this.onLineList.topFlag[2].more = false;
          }
          this.onLineList.topFlag[2].list.length = 0;
          $.each(res.data.body, function (index, text) {
            _this.onLineList.topFlag[2].list.push({
              text: text.name,
              value: text.id
            });
          });
        } else {
          console.log('1.21.27.分级诊疗-分级 工具栏 +失败')
          //失败
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },



      // 管理1.1表
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
          search: this.searchValue,
          level: this.gradeId,
          diseaseTypeId: this.typeId,
        };
        const res = await fetchMedicalClassify(query);                               // 13.1.分类管理-列表 
        if (res.data && res.data.errCode === 0) {
          console.log('管理1.1表+成功')
          console.log("time0:", this.time0)
          console.log("time1:", this.time1)
          console.log("res:", res)
          console.log("list:", res.data.body.data2.list)
          console.log("total:", res.data.body.data2.total)
          this.totals = res.data.body.data2.total
          console.log(this.totals)
          this.medical_body0_Data = res.data.body.data2.list
        } else {
          console.log('管理1.1表+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      // 管理1.2表
      async getList2() {
        let _this = this;
        let query = {
          token: this.userInfo.token,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          deptId: this.departmentId,
        };
        const res = await fetchMedicalControl(query);                               //13.11.权限控制-列表 
        if (res.data && res.data.errCode === 0) {
          console.log('管理1.2表+成功')
          console.log("time0:", this.time0)
          console.log("time1:", this.time1)
          console.log("res:", res)
          console.log("list:", res.data.body.data2.list)
          console.log("total", res.data.body.data2.total)
          this.totals = res.data.body.data2.total
          console.log(this.totals)
          this.medical_body1_Data = res.data.body.data2.list
        } else {
          console.log('管理1.2表+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      //管理2表（统计）
      async getList3() {
        const _this = this
        let query = {
          token: this.userInfo.token,
          deptId: this.departmentId, //String false 科室ID 
          type: "DEPT", //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天
        };
        const res = await medicalControlCharts(query);                                            //13.12.统计-统计图 
        if (res.data && res.data.errCode === 0) {
          console.log('统计+疾病库+成功')
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
          this.testdata1.title = "疾病库"
          this.testdata1.total = "总数：" + this.yTotal1
          this.testdata1 = Object.assign({}, this.testdata1);
          console.log(this.yTotal1)
          console.log(this.testdata1)
        } else {
          //失败
          console.log('统计+疾病库+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
























      // 管理    1.1表  表体  
      cellClick1(row, column, cell, event) {

      },
      // 管理     1.2表  表体  
      cellClick2(row, column, cell, event) {
        // console.log(row, column)
        if (column.label == "范围") {//当范围被点击
          console.log(row)//找到对应行的科室id
          this.doctorVisible = true;
          this.doctorDetailData = row.deptRels
        }
      },
      //范围弹框（子组件  reback函数）
      doctorDetailFun() {
        alert()
      },
      // 管理    1.1表   操作区
      // 表一编辑
      editList1(data) {
        this.YesList1 = 2;
        this.kuangData1.show = true;
        this.fetchHospitalDepts().then(val => {//执行完科室获取再执行获取名称list
          this.isHaveDepartment11();
        });
        console.log(data)
        const _this = this
        console.log(this.kuangData1.options1.list)
        console.log(this.kuangData1.options2.list)
        console.log(this.kuangData1.options3.list)
        this.adds = data.id
        this.kuangData1.options1.value = data.deptId
        this.kuangData1.options2.value = data.diseaseTypeId
        this.kuangData1.options3.value = data.diseaseId//疾病ID
        this.kuangData1 = Object.assign({}, this.kuangData1)
        $.each(this.kuangData1.options4.list, function (index, text) {
          if (_this.kuangData1.options4.list[index].label == data.levelName) {
            _this.kuangData1.options4.value = _this.kuangData1.options4.list[index].value
          }
        })

        // console.log()
      },
      // 表一编辑   提交
      async kuangData1Fun12() {
        let abc = []
        const _this = this
        console.log(this.kuangData1.options2.list)
        $.each(this.kuangData1.options2.list, function (index, text) {
          if (_this.$refs.ceshi1.query == _this.kuangData1.options2.list[index].label) {
            console.log("编辑匹配到了下拉，直接提交")
            abc.push("1")
            _this.editMedicalClassify();
          } else { }
        })
        console.log(this.abc)
        if (abc.length == 0) {
          console.log("编辑无匹配，传空新增类型")
          this.addMedicalClassify2();
        } else { }
        this.kuangData1.show = false;
      },
      //表一编辑提交函数
      async editMedicalClassify() {
        let query = {
          token: this.userInfo.token,
        };
        let options = {//访问data里面自定义的参数（表格value）
          id: this.adds,//此行id
          deptId: this.kuangData1.options1.value,
          diseaseTypeId: this.kuangData1.options2.value,//类型ID
          diseaseTypeName: this.$refs.ceshi1.query,//类型名称
          diseaseId: this.kuangData1.options3.value,//疾病ID
          diseaseName: this.$refs.ceshi2.query,//疾病名称
          level: this.kuangData1.options4.value
        };
        const res = await editMedicalClassify(query, options);//表1新增   提交                   //13.3.分级管理-修改
        if (res.data && res.data.errCode === 0) {
          console.log('表1-编辑  +成功')
          console.log(res)
          this.getList1()
          this.getSelect2()
          this.handleClose1();
        } else {
          //失败
          console.log('表1-编辑  +失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },

      // 表一删除
      async delectList1(data) {
        console.log(data)
        const _this = this
        let query = {
          token: this.userInfo.token,
        };
        let options = {
          id: data.id
        }
        const res = await delMedicalClassify(query, options);                                 //13.4.分级管理-删除
        if (res.data && res.data.errCode === 0) {
          console.log('表1-删除 +成功')
          console.log(res)
          this.getList1()
          this.getSelect2()
        } else {
          //失败
          console.log('表1-删除 +失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      // 管理   1.2表   操作区
      //1.2表   操作区   编辑
      editList2(data) {
        const _this = this
        console.log(data)
        this.YesList2 = 2;
        this.kuangData2.show = true;
        this.adds2 = data.id
        this.chooseDept().then(val => {//执行完科室获取再执行获取名称list
          this.isHaveDepartment21();
        });
        this.kuangData2.options1.value = data.deptId
        this.kuangData2.options2.value.length = 0
        this.kuangData2.options3.value.length = 0
        $.each(data.levels, function (index, text) {
          _this.kuangData2.options2.value.push(text.level)
        })
        console.log(this.kuangData2.options2.value)
        this.kuangData2.options3.value.push(data.deptRels[0].hospitalId, data.deptRels[0].deptId)
      },
      // 表2编辑   提交
      async kuangData1Fun22() {
        this.editMedicalControl();
        this.kuangData2.show = false;
      },
      //表2编辑提交函数 
      async editMedicalControl() {
        let query = {
          token: this.userInfo.token,
        };
        let options = {
          id: this.adds2,
          deptId: this.kuangData2.options1.value,
          levels: this.kuangData2.options2.value,
          applyDepts: [
            {
              hospitalId: this.kuangData2.options3.value[0],
              deptIds: [this.kuangData2.options3.value[1]]
            }
          ]
        }
        const res = await editMedicalControl(query, options);//               //13.9.权限控制-编辑 
        if (res.data && res.data.errCode === 0) {
          console.log('表1.2-编辑  +成功')
          console.log(res)
          this.getList2()
          // this.handleClose2();
        } else {
          //失败
          console.log('表1.2-编辑  +失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      // 表2  删除
      async delectList2(data) {
        console.log(data)
        const _this = this
        let query = {
          token: this.userInfo.token,
        };
        let options = {
          id: data.id
        }
        const res = await delMedicalControl(query, options);                                 //13.10.权限控制-删除 
        if (res.data && res.data.errCode === 0) {
          console.log('表1.2-删除 +成功')
          console.log(res)
          this.getList2()
          this.getSelect2()
        } else {
          //失败
          console.log('表1.2-删除 +失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
















      //弹出  新增业务1  表单
      async addBusinessFun1() {
        this.YesList1 = 1;
        this.kuangData1.options2.list.length = 0
        this.kuangData1.show = true;
        this.fetchHospitalDepts();
      },
      //2.2.获取医院科室列表    新增弹框
      async fetchHospitalDepts() {
        const _this = this
        // 获取下拉   科室
        let query = {
          orgCode: this.userInfo.hospitalCode,
          token: this.userInfo.token,//用户登录标识
          deptId: "",//科室ID，无该参数则返回医院全部科室，有该参数则会过滤科室列表
          type: "MANAGE"//使用来源，DOCTOR医生端标签来源，MANAGE管理端标签页使用
        };
        const res1 = await fetchHospitalDeptAuth(query);                                 //1.2.1.获取医院科室列表（新）主要用于表单选择()
        if (res1.data && res1.data.errCode === 0) {
          console.log('表1-新增2.2.获取医院科室列表 +成功')
          console.log(res1)
          console.log(this.kuangData1.options1.list)
          _this.kuangData1.options1.list = res1.data.body.map(item => {
            return {
              label: item.deptName,
              value: item.deptId
            }
          })
        } else {
          //失败
          console.log('表1-新增2.2.获取医院科室列表 +失败')
          this.$notify.error({
            title: "警告",
            message: res1.data.errMsg
          });
        }
        //获取类型下拉
        let query2 = {
          token: this.userInfo.token,
        };
        const res2 = await fetchMedicalType(query2);                                //13.13.分级管理-类型下拉数据
        if (res2.data && res2.data.errCode === 0) {
          console.log('表1-新增13.13.分级管理-类型下拉数据 +成功')
          console.log(res2)
          this.kuangData1.options2.list.length = 0;
          $.each(res2.data.body, function (index, text) {
            _this.kuangData1.options2.list.push({
              label: text.name,
              value: text.id
            });
          });
          console.log(this.kuangData1.options2)
        } else {
          //失败
          console.log('表1-新增13.13.分级管理-类型下拉数据 +失败')
          this.$notify.error({
            title: "警告",
            message: res2.data.errMsg
          });
        }
      },
      //13.14.分级管理-名称与类型联动的名称下拉列表
      async isHaveDepartment11() {
        const _this = this
        if (this.kuangData2.options2.value) {//等待  询问
          // this.kuangData1.options3.value = ""
          this.kuangData1.options3.list.length = 0
          let query3 = {
            token: this.userInfo.token,
            diseaseTypeId: this.kuangData1.options2.value//类型ID
          };
          const res = await fetchMedicalDict(query3);                                 //13.14.分级管理-名称与类型联动的名称下拉列表
          if (res.data && res.data.errCode === 0) {
            console.log('表1-新增13.14.分级管理-名称与类型联动的名称下拉列表 +成功')
            console.log(res)
            $.each(res.data.body, function (index, text) {
              _this.kuangData1.options3.list.push({
                label: text.name,
                value: text.id
              });
            });
          } else {
            //失败
            console.log('表1-新增13.14.分级管理-名称与类型联动的名称下拉列表 +失败')
            this.$notify.error({
              title: "警告",
              message: res.data.errMsg
            });
          }
        }
      },
      //弹出  新增业务1   提交 
      async kuangData1Fun11() {
        let abc = []
        // console.log(abc)
        const _this = this
        console.log(this.kuangData1.options2.list)
        // console.log(Object.prototype.toString.call(this.kuangData1.options3.list))
        $.each(this.kuangData1.options2.list, function (index, text) {
          // console.log(`_this.$refs.ceshi2.query => ${_this.$refs.ceshi2.query}`);
          // console.log(`_this.kuangData1.options3.list[index].label => ${_this.kuangData1.options3.list[index].label}`);
          if (_this.$refs.ceshi1.query == _this.kuangData1.options2.list[index].label) {
            console.log("新增匹配到了下拉，直接加列表数据")
            abc.push("1")
            _this.addMedicalClassify1();
          } else {
            // alert(2)
          }
        })
        console.log(this.abc)
        if (abc.length == 0) {
          console.log("新增无匹配，新增类型")
          this.addMedicalClassify2();
        } else {
          // alert(5)
        }
        this.kuangData1.show = false
      },
      //表一新增提交函数
      async addMedicalClassify1() {
        let query = {
          token: this.userInfo.token,
        };
        let options = {//访问data里面自定义的参数（表格value）
          deptId: this.kuangData1.options1.value,
          diseaseTypeId: this.kuangData1.options2.value,//类型ID
          diseaseTypeName: this.$refs.ceshi1.query,//类型名称
          diseaseId: this.kuangData1.options3.value,//疾病ID
          diseaseName: this.$refs.ceshi2.query,//疾病名称
          level: this.kuangData1.options4.value
        };
        const res = await addMedicalClassify(query, options);//表1新增   提交                   //13.2.分类管理-新增 
        if (res.data && res.data.errCode === 0) {
          console.log('表1-新增  +成功')
          console.log(res)
          this.getList1()
          this.getSelect2()
          this.handleClose1();
        } else {
          //失败
          console.log('表1-新增  +失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      async addMedicalClassify2() {
        let query = {
          token: this.userInfo.token,
        };
        let options = {//访问data里面自定义的参数（表格value）
          deptId: this.kuangData1.options1.value,
          diseaseTypeId: "",//类型ID
          diseaseTypeName: this.$refs.ceshi1.query,//类型名称
          diseaseId: "",//疾病ID
          diseaseName: this.$refs.ceshi2.query,//疾病名称
          level: this.kuangData1.options4.value
        };
        const res = await addMedicalClassify(query, options);//表1新增   提交                   //13.2.分类管理-新增 
        if (res.data && res.data.errCode === 0) {
          console.log('表1-新增  +成功')
          console.log(res)
          this.getList1()
          this.getSelect2()
          this.handleClose1();
        } else {
          //失败
          console.log('表1-新增  +失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },


      //弹出  新增业务2  表单
      async addBusinessFun2() {
        this.YesList2 = 1;
        this.kuangData2.show = true;
        this.chooseDept().then(val => {//执行完科室获取再执行获取名称list
          this.isHaveDepartment21();
        });
      },
      async chooseDept() {
        const _this = this
        let query1 = {
          orgCode: this.userInfo.hospitalCode,
          token: this.userInfo.token,//用户登录标识
          deptId: "",//科室ID，无该参数则返回医院全部科室，有该参数则会过滤科室列表
          type: "MANAGE"//使用来源，DOCTOR医生端标签来源，MANAGE管理端标签页使用
        };

        const res1 = await fetchHospitalDeptAuth(query1);                                            //1.2.1.获取医院科室列表（新）主要用于表单选择()
        if (res1.data && res1.data.errCode === 0) {
          console.log('权限控制-科室列表下拉框 +成功')
          console.log(res1)
          // const testJson = this.setJson(res1.data.body);
          // console.log(testJson)
          // this.kuangData2.options1.list = testJson.data
          this.kuangData2.options1.list.length = 0;
          $.each(res1.data.body, function (index, text) {
            _this.kuangData2.options1.list.push(
              {
                label: text.deptName,
                value: text.deptId,
              }
            )
          })
          console.log(this.kuangData2.options1.list)
        } else {
          //失败
          console.log('权限控制-科室列表下拉框 +失败')
          this.$notify.error({
            title: "警告",
            message: res1.data.errMsg
          });
        }
        let query2 = {
          token: this.userInfo.token,
        };
        const res2 = await chooseApplyDept(query2);                                 //13.7.权限控制-申请医院和科室下拉框 
        if (res2.data && res2.data.errCode === 0) {
          console.log('权限控制-申请医院和科室下拉框 +成功')
          console.log(res2)
          this.kuangData2.options3.list.length = 0;
          $.each(res2.data.body, function (index, text) {
            _this.kuangData2.options3.list.push(
              {
                label: text.label,
                value: text.id,
                type: text.type,
                children: []
              }
            )
            if (text.children.length != 0) {
              $.each(text.children, function (index, text) {
                _this.kuangData2.options3.list[index].children.push(
                  {
                    label: text.label,
                    value: text.id,
                    type: text.type,
                  }
                )
              })
            }
          })
          console.log(this.kuangData2.options3.list)
        } else {
          //失败
          console.log('权限控制-申请医院和科室下拉框 +失败')
          this.$notify.error({
            title: "警告",
            message: res2.data.errMsg
          });
        }
      },
      //13.6.权限控制-接诊疾病等级下拉框
      async isHaveDepartment21() {
        // this.kuangData2.options2.value.length = 0;
        this.kuangData2.options3.value.length = 0;
        if (this.kuangData2.options1.value != "") {
          let query = {
            token: this.userInfo.token,
            deptId: this.kuangData2.options1.value//依靠   上面一层获取科室id
          };
          const res = await chooseAcceptsLevel(query);                                 //13.6.权限控制-接诊疾病等级下拉框
          if (res.data && res.data.errCode === 0) {
            console.log('权限控制-接诊疾病等级下拉框 +成功')
            console.log(res)
            const testJson = this.setJson(res.data.body);
            this.kuangData2.options2.list = testJson.data
            console.log(this.kuangData2.options2.list)
          } else {
            //失败
            console.log('权限控制-接诊疾病等级下拉框 +失败')
            this.$notify.error({
              title: "警告",
              message: res.data.errMsg
            });
          }
        }
      },
      //弹出  新增业务2   提交 
      async kuangData1Fun21() {
        console.log(this.kuangData2.options1.value)
        console.log(this.kuangData2.options2.value)
        console.log(this.kuangData2.options3.value)
        this.kuangData2.show = false
        let query = {
          token: this.userInfo.token,
        };
        let options = {
          deptId: this.kuangData2.options1.value,
          levels: this.kuangData2.options2.value,
          applyDepts: [
            {
              hospitalId: this.kuangData2.options3.value[0],
              deptIds: [this.kuangData2.options3.value[1]]
            }
          ]
        }
        const res = await addMedicalControl(query, options);                                 //13.8.权限控制-新增  
        if (res.data && res.data.errCode === 0) {
          console.log('权限控制-新增  +成功')
          console.log(res)
          this.getList2();
          this.handleClose2();
        } else {
          //失败
          console.log('权限控制-新增  +失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },




      /**
       * 数组提取json
       */
      setJson(data) {
        if (Object.prototype.toString.call(data) !== "[object Array]") return { ok: false, data: null };
        const reJson = [];
        for (const i of data) {
          for (const j in i) {
            reJson.push({
              label: i[j],
              value: parseInt(j)
            })
          }
        };
        return {
          ok: true,
          data: reJson
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
        this.getList2()
      },


      //表格样式
      ceshi0(data) {
        if (data.columnIndex == 2) {
          return 'ceshiLan'
        }
      }
    },



    async created() {
      this.getSelect1()
      this.getSelect2()
      this.getSelect3()
      this.getList1()
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
    overflow: auto;
  }

  .medical_body1 {
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

  .medical_body2 {
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
    white-space: nowrap;
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

  .manager_count_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mainTab {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
  }

  .manager_count_top>div {
    flex: 1;
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

  .ceshi {
    color: red !important;
  }

  .chaKanXiangQing {
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

  .bianJi {
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

  .jingYong {
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

  .jieChuJingYong {
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
  .required-icon {
        font-size: 12px;
        color: #ff7485;
    }
</style>