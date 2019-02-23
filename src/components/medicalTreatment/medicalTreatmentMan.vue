<template>
  <div class="medical">
    <div class="medical_top">
      <normalTab v-model="barInfo" @reBack="getBar"></normalTab>
    </div>

    <!--    弹框子组件  引入 -->
    <el-dialog title=" 医院及科室范围" :visible.sync="doctorVisible" width="602px" hight="356px" center>
      <hosptialAndDepartmentArea :doctorDetailData="doctorDetailData"></hosptialAndDepartmentArea>
    </el-dialog>

    <!-- 新增业务   弹框    1 -->
    <el-dialog title="疾病分级分类" :visible.sync="kuangData1.show" center>
      <el-form :model="kuangData1.form">
        <el-form-item label="科室" :label-width="kuangData1.formLabelWidth">
          <el-select v-model="kuangData1.options1.default.label" placeholder="选择科室（单选）" style="width:80%">
            <el-option v-for="item in kuangData1.options1.list||[]" :key="item.value" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="类型" :label-width="kuangData1.formLabelWidth">
          <el-select v-model="kuangData1.options2.default.label" placeholder="单选" style="width:80%">
            <el-option v-for="item in kuangData1.options2.list||[]" :key="item.value" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="名称" :label-width="kuangData1.formLabelWidth">
          <el-select v-model="kuangData1.options3.default.label" placeholder="单选" style="width:80%">
            <el-option v-for="item in kuangData1.options3.list||[]" :key="item.value" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分级" :label-width="kuangData1.formLabelWidth">
          <el-select v-model="kuangData1.options4.default.label" placeholder="请选择1-4级" style="width:80%">
            <el-option v-for="item in kuangData1.options4.list||[]" :key="item.value" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="kuangData1Fun" style="width:80%">确 定</el-button>
      </div>
    </el-dialog>




    <!-- 新增业务   弹框  2  -->
    <el-dialog title="转入控制" :visible.sync="kuangData2.show" center>
      <el-form>
        <!-- :model="kuangData2.options" -->
        <el-form-item label="科         室:" :label-width="kuangData2.formLabelWidth">
          <el-select v-model="kuangData2.options1.default.label" placeholder="单选" style="width:80%">
            <el-option v-for="item in kuangData2.options1.list||[]" :key="item.value" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="接诊疾病等级:" :label-width="kuangData2.formLabelWidth">
          <el-select v-model="kuangData2.options2.default.label" multiple placeholder="请选择" style="width:80%">
            <el-option v-for="item in kuangData2.options2.list||[]" :key="item.value" :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="申请医院和科室:" :label-width="kuangData2.formLabelWidth">
          <el-select v-model="kuangData2.options3.default.label" multiple placeholder="请选择" style="width:80%">
            <el-option v-for="item in kuangData2.options3.list||[]" :key="item.value" :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="kuangData2Fun" style="width:80%">确 定</el-button>
      </div>
    </el-dialog>






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
          <el-button type="primary" @click="addBusinessFun1">新增</el-button>
        </div>
      </div>
      <div class="medical_body0_table">
        <el-table :data="medical_body0_Data" border style="width: 100%" @cell-click="cellClick1">
          <el-table-column prop="deptName" label="科室"></el-table-column>
          <el-table-column prop="typeName" label="类型"></el-table-column>
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="medicalName" label="名称"></el-table-column>
          <el-table-column prop="levelName" label="分级"></el-table-column>
          <el-table-column fixed="right" label="" width="250">
            <template slot-scope="scope">
              <el-button @click="editList1(scope.row)" type="success" plain size="mini"
                style="margin:0.05rem 0 0.05rem 0;">编辑</el-button>
              <el-button @click="delectList1(scope.row)" type="danger" plain size="mini"
                style="margin:0.05rem 0 0.05rem 0;">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
    <!-- 管理   流程和权限控制 -->
    <div v-if="barInfo.i == 1" class="medical_body1">
      <div class="medical_nav ">
        <div class="medical_nav_left">
          <selftag :inData="onLineList.topFlag[0]" @reback="getFilter0"></selftag>
        </div>
        <div class="medical_nav_right">
          <search @searchValue="adminSearchOne"></search>
          <el-button type="primary" @click="addBusinessFun2">新增</el-button>
        </div>
      </div>
      <div class="medical_body1_table">
        <el-table :data="medical_body1_Data" border style="width: 100%" @cell-click="cellClick2">
          <el-table-column prop="deptName" label="科室"></el-table-column>
          <el-table-column prop="direction" label="方向"></el-table-column>
          <el-table-column prop="scope" label="范围"></el-table-column>
          <el-table-column prop="levelDesc" label="疾病等级"></el-table-column>
          <el-table-column fixed="right" label="" width="250">
            <template slot-scope="scope">
              <el-button @click="editList2(scope.row)" type="success" plain size="mini"
                style="margin:0.05rem 0 0.05rem 0;">编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 管理   统计 -->
    <div v-if="barInfo.i == 2" class="medical_body2">
      <div class="manager_count_top mainTab">
        <div class="manager_count_top_left">
          <selftag v-model="onLineList.topFlag[0]" @reback="getFilter0"></selftag>
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
        userState: state => state.user.userInfo,
        userSelfInfo: state => state.user.userSelfInfo,
        global: state => state.global
      }),
    },
    data() {
      return {
        // 弹框  1  参数
        kuangData1: {
          show: false,
          options1: {
            default: { value: '', label: '' },
            list: [
              // {
              //   value: '',
              //   label: '黄金糕'
              // },
            ]
          },
          options2: {
            default: { value: '', label: '' },
            list: []
          },
          options3: {
            default: { value: '', label: '' },
            list: []
          },
          options3: {
            default: { value: '', label: '' },
            list: []
          },
          options4: {
            default: { value: '', label: '' },
            list: [{ value: '1', label: '一级' }, { value: '2', label: '二级' }, { value: '3', label: '三级' }, { value: '4', label: '四级' },]
          },
          formLabelWidth: '120px',
        },
        // 弹框  2  参数
        kuangData2: {
          show: false,
          options1: {
            default: { value: '', label: '' },
            list: []
          },
          options2: {
            default: { value: '', label: '' },
            list: []
          },
          options3: {
            default: { value: '', label: '' },
            list: []
          },
          formLabelWidth: '120px',
        },

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
        type: 'MONTH', //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天       Select 选择器
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
        this.time0 = data.time[0];//统计筛选开始时间
        this.time1 = data.time[1];//统计筛选结束时间
        this.type = data.select.value
        this.getList3()
      },




      //筛选工具栏  请求  管理端
      //1.21.1.科室筛选  工具栏 (管理) (管理)
      async getSelect1(oindex) {
        let _this = this;
        let query = {
          token: this.userState.token,
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
          $.each(res.data.body, function (index, text) {
            _this.onLineList.topFlag[0].list.push(
              {
                text: text.name,
                value: text.id
              }
            );
          });
          this.kuangData1.options1.list = this.onLineList.topFlag[0].list
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
        };
        const res = await toolMedicalType(query);                                     //1.21.26.类型筛选  工具栏 (管理)
        if (res.data && res.data.errCode === 0) {
          console.log('1.21.26.类型筛选  工具栏 +成功')
          // console.log(res.data.body);
          if (res.data.body.length > 6) {
            this.onLineList.topFlag[1].more = true;
          } else {
            this.onLineList.topFlag[1].more = false;
          }
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
          token: this.userState.token,
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
        let _this = this;
        let query = {
          token: this.userState.token,
          pageNum: 1,
          pageSize: 10,
          deptId: this.departmentId,
          search: this.searchValue,
          level: this.gradeId,
          diseaseTypeId: this.typeId,
        };
        const res = await fetchMedicalClassify(query);                               // 13.1.分类管理-列表 
        if (res.data && res.data.errCode === 0) {
          console.log('管理1.1表+成功')
          console.log(res)
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
          token: this.userState.token,
          pageNum: 1,
          pageSize: 10,
          deptId: this.departmentId,
        };
        const res = await fetchMedicalControl(query);                               //13.11.权限控制-列表 
        if (res.data && res.data.errCode === 0) {
          console.log('管理1.2表+成功')
          console.log(res)
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
          token: this.userState.token,
          deptId: this.departmentId, //String false 科室ID 
          type: "DEPT", //String true 类型，DEPT按科室，YEAR按年，MONTH按月，DAY按天
        };
        const res = await medicalControlCharts(query);                                            //13.12.统计-统计图 
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





      // 管理    1.1表  表体  
      cellClick1(row, column, cell, event) {

      },
      // 管理     1.2表  表体  
      cellClick2(row, column, cell, event) {
        // console.log(row, column)
        if (column.label == "范围") {//当范围被点击
          console.log(row.aa)//找到对应行的科室id
          this.doctorVisible = true;
        }
      },
      //范围弹框（子组件  reback函数）
      doctorDetailFun() {
        alert()
      },
      // 管理    1.1表   操作区
      editList1(data) {
        console.log(data)
      },
      delectList1(data) {
        console.log(data)
      },
      // 管理   1.2表   操作区
      editList2(data) {
        console.log(data)
      },









      //弹出  新增业务1  表单
      async addBusinessFun1() {
        this.kuangData1.show = true;
        // 获取下拉   科室
        let query1 = {
          orgCode:"1545649424290" ,//医院代码
          deptId: ""//科室ID，无该参数则返回医院全部科室，有该参数则会过滤科室列表
        };
        const res = await fetchHospitalDepts(query1);                                 //2.2.获取医院科室列表
        if (res.data && res.data.errCode === 0) {
          console.log('表1-新增2.2.获取医院科室列表 +成功')
          console.log(res)
        } else {
          //失败
          console.log('表1-新增2.2.获取医院科室列表 +失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
      //弹出  新增业务1   提交 
      async kuangData1Fun() {
        this.kuangData1.show = false
        let query = {
          token: this.userState.token,
        };
        let options = {//访问data里面自定义的参数（表格default）
          deptId: 12345654,
          diseaseTypeId: "",
          diseaseTypeName: "阿斯顿发生的",
          diseaseId: "",
          diseaseName: "阿斯顿发生的",
          level: "一级"
        };
        const res = await addMedicalClassify(query,options);//表1新增   提交                   //13.2.分类管理-新增 
        if (res.data && res.data.errCode === 0) {
          console.log('表1-新增  +成功')
          console.log(res)
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
        this.kuangData2.show = true;
        let query1 = {
          token: this.userState.token,
        };
        const res = await chooseDept(query1);                                            //13.5.权限控制-科室列表下拉框 
        if (res.data && res.data.errCode === 0) {
          console.log('权限控制-科室列表下拉框 +成功')
          console.log(res)
          this.kuangData2.options1.list = res.data.body
          console.log(res.data.body)
          //13.6.权限控制-接诊疾病等级下拉框
          if (res.data.body) {
            let query = {
              token: this.userState.token,
              deptId: null//依靠   上面一层获取科室id
            };
            const res = await chooseAcceptsLevel(query);                                 //13.6.权限控制-接诊疾病等级下拉框
            if (res.data && res.data.errCode === 0) {
              console.log('权限控制-接诊疾病等级下拉框 +成功')
              console.log(res)
              this.kuangData2.options2.list = res.data.body
              console.log(res.data.body)
            } else {
              //失败
              console.log('权限控制-接诊疾病等级下拉框 +失败')
              this.$notify.error({
                title: "警告",
                message: res.data.errMsg
              });
            }
          }
          let query2 = {
            token: this.userState.token,
          };
          const res = await chooseApplyDept(query2);                                 //13.7.权限控制-申请医院和科室下拉框 
          if (res.data && res.data.errCode === 0) {
            console.log('权限控制-申请医院和科室下拉框 +成功')
            console.log(res)
            this.kuangData2.options3.list = res.data.body
            console.log(res.data.body)
          } else {
            //失败
            console.log('权限控制-申请医院和科室下拉框 +失败')
            this.$notify.error({
              title: "警告",
              message: res.data.errMsg
            });
          }
        } else {
          //失败
          console.log('权限控制-科室列表下拉框 +失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }

      },
      //弹出  新增业务2   提交 
      async kuangData2Fun() {
        this.kuangData2.show = false
        let query = {
          token: this.userState.token,
        };
        const res = await addMedicalControl(query);                                 //13.8.权限控制-新增  
        if (res.data && res.data.errCode === 0) {
          console.log('权限控制-新增  +成功')
          console.log(res)
        } else {
          //失败
          console.log('权限控制-新增  +失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
      },
    },



    async created() {
      this.getSelect1()
      this.getSelect2()
      this.getSelect3()
      this.getList1()
      this.getList2()
      this.getList3()

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
</style>