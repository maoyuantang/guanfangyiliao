<template>
  <div class="Account-authority">
    <div class="select-div">
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
        <el-radio-button label="left" :class="tabPosition==='left'?'left-btn-select':''">本院人员</el-radio-button>
        <el-radio-button label="right" :class="tabPosition==='right'?'right-btn-select':''">院外协作人员</el-radio-button>
      </el-radio-group>
    </div>
    <el-tabs>
      <div class="left-model" v-show="tabPosition==='left'">
        <div class="left-model-head">
          <div class="left-model-head-flag">
            <selftag v-model="ourStaff.department" @reback="ourStaffDepartmentSelect"></selftag>
          </div>
          <div class="left-model-head-operating">
            <search @searchValue="ourStaffSearchChange"></search>
            <!-- <el-input
                            placeholder="Search by keywords…"
                            suffix-icon="el-icon-search">
            </el-input>-->
            <el-button type="primary" @click="openourStafAlert">新增</el-button>
            <!-- <el-button type="primary" @click="alertStatus(1)">新增</el-button> -->
          </div>
        </div>
        <div class="left-model-body">
          <table class="account-authority">
            <thead class="account-authority-thead">
              <tr>
                <th>科室</th>
                <th>姓名</th>
                <th>账号</th>
                <th>手机号</th>
                <th>业务范围</th>
                <th>注册时间</th>
                <th>科室管理</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody class="account-authority-tbody">
              <tr v-for="(item,index) in ourStaff.ourStaffUser.list" :key="index">
                <th>{{item.departmentName}}</th>
                <th>{{item.name}}</th>
                <th>{{item.account}}</th>
                <th>{{item.phone}}</th>
                <th>{{item.busRange.length}}</th>
                <th>{{item.regTime}}</th>
                <th>{{item.hasDeptManage?'有':'无'}}</th>
                <th>
                  <el-button type="success" size="mini" plain @click="modifyUserInfo(item)">编辑</el-button>
                  <el-button type="danger" size="mini" plain>删除</el-button>
                </th>
              </tr>
            </tbody>
          </table>
          <!-- <publicList :tableData="newModules.tableData" :columns="newModules.columns" :tableBtn="newModules.tableBtn"></publicList> -->
        </div>
        <div class="pagination-div">
          <!-- :page-size="10"
                @current-change="listSelectPage"
                :current-page="parseInt(listCondition.page.pageNum)"
                v-if="listCondition.page.total!=0"
          :total="listCondition.page.total"-->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="ourStaff.ourStaffUser.page.pageSize"
            :current-page="ourStaff.ourStaffUser.page.pageNum"
            :total="ourStaff.ourStaffUser.page.total"
            v-if="ourStaff.ourStaffUser.page.total!=0"
            @current-change="ourStaffChangePage"
          ></el-pagination>
        </div>
      </div>
      <div class="right-model" v-show="tabPosition==='right'">
        <div class="right-model-head">
          <div class="right-model-head-flag">
            <div>
              <selftag @reBack="gitIndex" v-model="rightListHospital"></selftag>
              <selftag @reBack="gitIndex" v-model="rightListDepartment"></selftag>
            </div>
          </div>
          <div class="right-model-head-operating">
            <search></search>
            <!-- <el-input
                            placeholder="Search by keywords…"
                            suffix-icon="el-icon-search">
            </el-input>-->
            <el-button type="primary" @click="alertStatus(2)">邀请协作</el-button>
          </div>
        </div>
        <div class="left-model-body">
          <publicList
            :tableData="inviteModules.tableData"
            :columns="inviteModules.columns"
            :tableBtn="inviteModules.tableBtn"
          ></publicList>
        </div>
      </div>
    </el-tabs>

    <el-dialog
      :title="ourStafAlert.type===0?'新增':'修改'"
      :visible.sync="ourStafAlert.show"
      width="602px"
      hight="607px"
      center
      :before-close="ourStafClose"
    >
      <div class="ourStaf-alert">
        <div class="ourStaf-alert-item-text">
          <div class="ourStaf-alert-item-text-ch">
            <span>姓名:</span>
            <el-input placeholder="请输入内容" v-model="ourStafAlert.data.name" size="mini" clearable></el-input>
            <i class="iconfont ourStaf-alert-icon">&#xe7b0;</i>
          </div>
          <div class="ourStaf-alert-item-text-ch">
            <span>电话:</span>
            <el-input placeholder="请输入内容" v-model="ourStafAlert.data.phone" size="mini" clearable></el-input>
            <i class="iconfont ourStaf-alert-icon"></i>
          </div>
        </div>
        <div class="ourStaf-alert-item-text">
          <div class="ourStaf-alert-item-text-ch">
            <span>账号:</span>
            <el-input placeholder="请输入内容" v-model="ourStafAlert.data.account" size="mini" clearable></el-input>
            <i class="iconfont ourStaf-alert-icon">&#xe7b0;</i>
          </div>
          <div class="ourStaf-alert-item-text-ch">
            <span>密码:</span>
            <el-input placeholder="请输入内容" v-model="ourStafAlert.data.psd" size="mini" clearable></el-input>
            <i class="iconfont ourStaf-alert-icon">&#xe7b0;</i>
          </div>
        </div>
        <div class="ourStaf-alert-item-select">
          <span>科室:</span>
          <div class="ourStaf-alert-item-select-div">
            <el-select
              v-model="ourStafAlert.data.department.select"
              size="mini"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in global.departmentList"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
            <i class="iconfont ourStaf-alert-icon">&#xe7b0;</i>
          </div>
        </div>
        <div class="ourStaf-alert-item-select">
          <span>医生业务范围:</span>
          <div class="ourStaf-alert-item-select-div">
            <selectTree
              :inData="ourStafAlert.data.docBus.list"
              :select="ourStafAlert.data.docBus.select"
              @reback="getOurStafDocBus"
            ></selectTree>
          </div>
        </div>
        <div class="ourStaf-alert-item-select">
          <span></span>
          <div class="ourStaf-alert-item-select-div">
            <div class="ourStaf-alert-item-select-div-con">
              <span
                v-for="(item,index) in ourStafAlert.data.docBus.select"
                :key="index"
                class="show-select-item"
              >{{item.label}}</span>
            </div>
          </div>
        </div>
        <div class="ourStaf-alert-item-select">
          <span>科室:</span>
          <div class="ourStaf-alert-item-select-div">
            <el-select
              v-model="ourStafAlert.data.manDepartment.select"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in global.departmentList"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
            <i class="iconfont ourStaf-alert-icon">&#xe7b0;</i>
          </div>
        </div>
        <div class="ourStaf-alert-item-select">
          <span>科室管理权限范围::</span>
          <div class="ourStaf-alert-item-select-div">
            <selectTree
              :inData="ourStafAlert.data.manbus.list"
              :select="ourStafAlert.data.manbus.select"
              @reback="getOurStafManbus"
            ></selectTree>
          </div>
        </div>
        <div class="ourStaf-alert-item-select">
          <span></span>
          <div class="ourStaf-alert-item-select-div">
            <div class="ourStaf-alert-item-select-div-con">
              <span
                v-for="(item,index) in ourStafAlert.data.manbus.select"
                :key="index"
                class="show-select-item"
              >{{item.label}}</span>
            </div>
          </div>
        </div>
        <div class="ourStaf-alert-sub">
          <el-button type="primary" @click="submission">确定</el-button>
        </div>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>

    <!-- {{ourStafAlert}}
       {{userInfo.token}}
    远程教育系统-->
  </div>
</template>

<script>
import { mapState } from "vuex";
import selftag from "../../../public/publicComponents/selftag.vue";
import markLayer from "../../../public/publicComponents/markLayer.vue";
import publicList from "../../../public/publicComponents/publicList.vue";
import selectTree from "../../../public/publicComponents/selectTree.vue";
import sensitiveWordCheck from "../../../public/publicJs/sensitiveWordCheck.js";
import search from "../../../public/publicComponents/search.vue";
import { deepCopy } from "../../../public/publicJs/deepCopy.js";
import {
  fetchHospitalDepts,
  fetchDoctorSubSystems,
  hospitalDepartmentManagementSubsystemList,
  createUser,
  synergyManageList,
  userList,
  userInfo,
  updateUser
} from "../../../api/apiAll.js";

export default {
  watch: {},
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      userSelfInfo: state => state.user.userSelfInfo,
      global: state => state.global
    })
  },
  data() {
    return {
      addData: {
        //新增时，收集信息
        name: "", //姓名
        phone: "", //电话
        account: "", //账号
        passwd: "" //密码
      },
      deptIds: [], //科室数组 (已选择)
      DoctorBusinessScope: [], //医生业务范围选项
      DoctorBusinessScopeSelect: [], //‘医生业务范围’已选择项id
      DepartmentManagementAuthority: [
        //科室管理权限范围选择项
      ],
      DepartmentManagementAuthoritySelect: [], //‘科室管理权限范围’已选择项
      departmentlist: [
        //科室列表
        // {deptId:'',deptName:''}
      ],
      ourStaff: {
        //本院人员 数据
        department: {
          index: 0,
          more: false,
          title: "科室",
          list: []
        },
        departmentSelect: {}, //选中科室 
        searchKey: {}, //搜索关键字
        ourStaffUser: { 
          //账号列表
          page: { 
            //页码相关
            pageSize: 10, //每页多少数据
            pageNum: 1, //当前页
            total: 0 //总条数
          },
          list: [] //本院人员列表
        }
      },
      ourStafAlert: {
        //弹窗
        show: false,
        type: 0, //0 新增， 1 修改
        userId: "", //新增没有，修改才有
        data: {
          name: "", //姓名
          phone: "", //电话
          account: "", //账号
          psd: "", //密码
          department: {
            //科室
            select: [], //选中 科室
            list: [] // 科室列表
          },
          manDepartment: {
            //管理科室
            select: "", //选中 科室
            list: [] // 科室列表
          },
          docBus: {
            //医生业务范围
            select: [], //选中 医生业务
            list: [] // 医生业务 列表
          },
          manbus: {
            //科室管理权限范围
            select: [], //选中 科室管理权限
            list: [] //科室管理权限 列表
          }
        }
      },
      /********************************** */
      otrue: false,
      tabPosition: "left",
      leftListDepartment: {
        //本院人员的科室标签列表
        index: 0,
        more: true,
        title: "科室",
        list: [
          {
            text: "全部"
          },
          {
            text: "急诊科"
          },
          {
            text: "骨科"
          },
          {
            text: "普外科"
          },
          {
            text: "肿瘤科"
          },
          {
            text: "脑病科"
          }
        ]
      },
      rightListDepartment: {
        //院外协作人员的科室标签列表
        more: true,
        title: "科室",
        list: [
          {
            text: "全部"
          },
          {
            text: "急诊科"
          },
          {
            text: "骨科"
          },
          {
            text: "普外科"
          },
          {
            text: "肿瘤科"
          },
          {
            text: "脑病科"
          }
        ]
      },
      rightListHospital: {
        //院外协作人员的医院标签列表
        more: true,
        title: "科室",
        list: [
          {
            text: "全部"
          },
          {
            text: "急诊科"
          },
          {
            text: "骨科"
          },
          {
            text: "普外科"
          },
          {
            text: "肿瘤科"
          },
          {
            text: "脑病科"
          }
        ]
      },
      isAdd: 1, //1是新增弹窗，2是邀请弹窗，其余隐藏弹窗，建议选0
      inviteNumber: "",
      CollaborationScopeOk: null,
      CollaborationScope: [
        //协作范围科室选择列表
        { name: "全部" },
        { name: "糖尿病康复科" },
        { name: "新生儿保健科" },
        { name: "XXXXXXXX" }
      ],
      businessScope: [
        //业务范围选择项
        {
          name: "远程门诊",
          select: false
        },
        {
          name: "远程会诊",
          select: false
        },
        {
          name: "远程协作",
          select: true
        },
        {
          name: "家医服务",
          select: false
        }
      ],
      newModules: {
        columns: [
          {
            prop: "department",
            label: "科室"
          },
          {
            prop: "name",
            label: "姓名"
          },
          {
            prop: "accountNumber",
            label: "账号"
          },
          {
            prop: "phone",
            label: "手机号"
          },
          {
            prop: "businessScope",
            label: "业务范围"
          },
          {
            prop: "registeredTime",
            label: "注册时间"
          },
          {
            prop: "departmentManagement",
            label: "科室管理"
          }
        ],
        tableData: [
          {
            id: "91F0B9D25A474B6FA0CDBAC872035984",
            department: "急诊科",
            name: "Verge",
            accountNumber: "201805261024526",
            phone: "一连串字符",
            businessScope: "10",
            registeredTime: "2018-03-22",
            departmentManagement: "有"
          },
          {
            id: "91F0B9D25A474B6FA0CDBAC872035984",
            department: "急诊科",
            name: "Verge",
            accountNumber: "201805261024526",
            phone: "一连串字符",
            businessScope: "10",
            registeredTime: "2018-03-22",
            departmentManagement: "有"
          }
        ],
        tableBtn: [
          {
            name: "编辑",
            method: (index, row) => {
              console.log(row);
            }
          },
          {
            name: "删除",
            method: (index, row) => {
              console.log(row);
            }
          }
        ]
      },
      inviteModules: {
        columns: [
          {
            prop: "hospital",
            label: "医院"
          },
          {
            prop: "department",
            label: "科室"
          },
          {
            prop: "name",
            label: "姓名"
          },
          // {
          //     prop:"age",
          //     label:"年龄"
          // },
          {
            prop: "accountNumber",
            label: "账号"
          },
          {
            prop: "phone",
            label: "手机号"
          },
          {
            prop: "businessScope",
            label: "业务范围"
          },
          {
            prop: "enterTime",
            label: "入住时间"
          }
        ],
        tableData: [
          {
            id: "91F0B9D25A474B6FA0CDBAC872035984",
            hospital: "重庆冠方智慧医院",
            department: "急诊科",
            name: "Verge",
            accountNumber: "201805261024526",
            phone: "一连串字符",
            businessScope: "10",
            enterTime: "2018-03-22"
          },
          {
            id: "91F0B9D25A474B6FA0CDBAC872035984",
            hospital: "重庆冠方智慧医院",
            department: "急诊科",
            name: "Verge",
            accountNumber: "201805261024526",
            phone: "一连串字符",
            businessScope: "10",
            enterTime: "2018-03-22"
          },
          {
            id: "91F0B9D25A474B6FA0CDBAC872035984",
            hospital: "重庆冠方智慧医院",
            department: "急诊科",
            name: "Verge",
            accountNumber: "201805261024526",
            phone: "一连串字符",
            businessScope: "10",
            enterTime: "2018-03-22"
          }
        ],
        tableBtn: [
          {
            name: "新增",
            method: (index, row) => {
              console.log(index);
              console.log(row);
              // this.handleDel(index, row);
            }
          },
          {
            name: "编辑",
            method: (index, row) => {
              this.handleDel(index, row);
            }
          }
        ]
      }
    };
  },
  watch: {
    /**
     * 监听科室变化
     */
    "global.departmentList": {
      handler(n) {
        this.ourStafAlert.data.department.list = deepCopy(n);
        this.ourStafAlert.data.manDepartment.list = deepCopy(n);
      }
    }
  },
  methods: {
      /**
       * 初始化 本院人员 弹窗数据
       */
      initOurStafAlertData(){
          this.ourStafAlert.show = false;
          this.ourStafAlert.type = 0;
          this.ourStafAlert.userId = '';
            this.ourStafAlert.data.name = '';
            this.ourStafAlert.data.phone = '';
            this.ourStafAlert.data.account = '';
            this.ourStafAlert.data.psd = '';
            this.ourStafAlert.data.department.select = [];
            this.ourStafAlert.data.manDepartment.select = '';
            this.ourStafAlert.data.docBus.select = [];
            this.ourStafAlert.data.manbus.select = [];
      },
      /**
       * 本院人员 页码被选中
       */
      ourStaffChangePage(data){
          console.log(data)
          this.ourStaff.page.pageNum = data;
          this.getUserList();
      },
    /**
     * 修改用户信息
     */
    async modifyUserInfo(item) {
      console.log(item);
      const res = await this.getUserInfo({
        token: this.userInfo.token,
        userId: item.id,
        oneself: item.id === this.userSelfInfo.userId
      });
      console.log(res);
      if (res.success) {
        this.ourStafAlert.type = 1;
        (this.ourStafAlert.data.userId = res.data.userId),
          (this.ourStafAlert.data.name = item.name);
        this.ourStafAlert.data.phone = item.phone;
        this.ourStafAlert.data.account = item.account;
        this.ourStafAlert.data.department.select = res.data.depts.map(
          item => item.deptId
        );
        // this.ourStafAlert.data.manDepartment.select =
        //   res.data.managerDepts[0].deptId;

        this.ourStafAlert.data.docBus.select = res.data.systemBusList.map(
          item => {
            item.id = item.subCode;
            item.label = item.subName;
            return item;
          }
        );
        this.ourStafAlert.data.manbus.select = res.data.systemList.map(item => {
          item.id = item.subCode;
          item.label = item.subName;
          return item;
        });
        this.ourStafAlert.show = true;
        console.log(this.ourStafAlert);
      }
    },
    /**
     * 3.8获取用户信息
     */
    async getUserInfo(data) {
      const res = await userInfo(data);
      console.log(res);
      if (res.data.errCode === 0) {
        return {
          success: true,
          data: res.data.body
        };
      } else {
        this.$notify.error({
          title: "用户信息获取失败",
          message: res.data.errMsg
        });
        return {
          success: false,
          data: null
        };
      }
    },
    /**
     * 获取 医生业务范围 选中
     */
    getOurStafManbus(data) {
      console.log(data);
      this.ourStafAlert.data.manbus.select = data;
    },
    /**
     * 获取 科室管理权限范围 选中
     */
    getOurStafDocBus(data) {
      this.ourStafAlert.data.docBus.select = data;
      console.log(data);
      // .map(element => element.id);
      return;
      console.log(data);
      let mid = deepCopy(this.ourStafAlert.data.docBus.list);
      const setStatus = (arr, tag) => {
        for (const i of arr) {
          for (const j of tag) {
            if (i.id === j.id) {
              i.select = true;
            }
            if (i.children.length > 0) {
              setStatus(i.children, tag);
            }
          }
        }
      };
      const deleteChild = data => {
        for (const i in data) {
          if (!data[i].select) {
            console.log("delete");
            const test = data.splice(i, 1);
            console.log(test);
          }
          console.log(data[i]);

          if (data[i] && data[i].children.length > 0) {
            console.log("enter");
            deleteChild[data[i].children];
          }
        }
      };
      setStatus(mid, data);
      deleteChild(mid);
      console.log(mid);
    },

    /**
     * 打开 新增 弹窗
     */
    openourStafAlert() {
      this.ourStafAlert.type = 0;
      this.ourStafAlert.show = true;
    },
    /**
     * 关闭 本院人员 弹窗
     */
    ourStafClose(done) {
      this.initOurStafAlertData();
      done();
    },
    /**
     * 取出嵌套数组需要的值
     */
    iterationArr(a, b) {
      if (Object.prototype.toString.call(a) !== "[object Array]")
        return { ok: false, mag: "传参需要是数组", data: null };
      const arr = [];
      const setFun = data => {
        for (const i of data) {
          for (const j of b) {
            if (j == i.id) {
              arr.push(i);
            }
          }
          if (i.children.length > 0) {
            setFun(i.children);
          }
        }
      };
      setFun(a);
      return { ok: true, mag: "", data: arr };
    },

    /**
     * 设置‘医生业务范围’已选择项
     */
    getDoctorBusinessScopeSelect(data) {
      const result = this.iterationArr(this.DoctorBusinessScope, data);
      this.DoctorBusinessScopeSelect = result.ok ? result.data : [];
    },
    getDepartmentManagementAuthoritySelect(data) {
      const result = this.iterationArr(
        this.DepartmentManagementAuthority,
        data
      );
      this.DepartmentManagementAuthoritySelect = result.ok ? result.data : [];
      console.log(this.DepartmentManagementAuthoritySelect);
    },
    /**
     * 大致检查新增用户数据是否正确,是否为空，是否有敏感字
     */
    checkAddInfo() {
      const option = {
        account: {
          zh: "账号",
          data: this.addData.account
        },
        name: {
          zh: "姓名",
          data: this.addData.name
        },
        passwd: {
          zh: "密码",
          data: this.addData.passwd
        }
      };
      for (const i in option) {
        if (!option[i].data)
          return {
            ok: false,
            msg: `${option[i].zh}为空`
          };
        const isSensitive = sensitiveWordCheck(option[i].data);
        if (!isSensitive.ok)
          return {
            ok: false,
            msg: `${option[i].zh}包含敏感字${isSensitive.key}`
          };
      }
      return {
        ok: true,
        msg: ``
      };
    },

    /**
     * 获取新增用户提交数据
     */
    getAddSubData() {
      // debugger
      const options = {
        //提交数据
        account: this.addData.account,
        name: this.addData.name,
        passwd: this.addData.passwd,
        deptIds: [],
        phone: this.addData.phone,
        authorizes: [],
        userType: "0" //用户类型 0(医生),1(患者),2(医院管理员),3(超级管理员)
      };
      const deptIds = []; //已选中的科室列表。element-ui 不能绑定json，只能按照其中一个属性获取到该json,这个过程比较恶心，有众多for循环
      const arr = []; //已选中的科室管理权限范围列表。
      for (const i of this.DoctorBusinessScopeSelect) {
        //这个'医生业务范围'由于自己写的（非element-ui），所以可以直接获取json，直接循环取出值
        options.authorizes.push({
          type: 2,
          authorityId: i.id
        });
      }
      for (const i of this.DepartmentManagementAuthoritySelect) {
        options.authorizes.push({
          type: 1,
          authorityId: i.id
        });
      }
      for (const i of this.deptIds) {
        //获取被选中的科室列表
        for (const j of this.departmentlist) {
          j.deptName === i ? deptIds.push(j) : null;
        }
      }
      for (const i of deptIds) {
        //取出被选中的科室列表的id，放入需要的数据组
        options.deptIds.push(i.deptId);
      }
      console.log(options);
      return options;
    },
    /**
     * 提交数据
     */
    async submission() {
      this.ourStafAlert.type === 0 ? thisaddSub() : this.modifyUser();
    },
    /**
     * 修改用户
     */
    async modifyUser() {
      console.log("modifyUser");
      const postData = [
        { token: this.userInfo.token },
        {
          userId: this.ourStafAlert.data.userId,
          name: this.ourStafAlert.data.name,
          passwd: this.ourStafAlert.data.psd,
          phone: this.ourStafAlert.data.phone,
          deptIds: this.ourStafAlert.data.department.select,
          manageDeptId: [this.ourStafAlert.data.manDepartment.select],
          authorizes: [
            ...this.ourStafAlert.data.docBus.select.map(item => {
              return {
                type: 2,
                authorityId: item.id
              };
            }),
            ...this.ourStafAlert.data.manbus.select.map(item => {
              return {
                type: 1,
                authorityId: item.id
              };
            })
          ]
        }
      ];
      const res = await updateUser(...postData);
      console.log(res);
      if (res.data.errCode === 0) {
        this.$notify({
          title: "失败",
          message: "修改失败",
          type: "success"
        });
        this.initOurStafAlertData();
        this.getUserList();
      } else {
        this.$notify({
          title: "成功",
          message: "修改成功",
          type: "error"
        });
      }
    },
    /**
     * 新增用户
     */
    async addSub() {
      // this.ourStafAlert.type = 1;
      // console.log(this.ourStafAlert)
      // return
      // const postData = this.getAddSubData();
      const postData = {
        account: this.ourStafAlert.data.account,
        name: this.ourStafAlert.data.name,
        passwd: this.ourStafAlert.data.psd,
        phone: this.ourStafAlert.data.phone,
        userType: "0",
        deptIds: this.ourStafAlert.data.department.select,
        manageDeptId: [this.ourStafAlert.data.manDepartment.select],
        authorizes: [],
        authorizes: [
          ...this.ourStafAlert.data.manbus.select.map(item => {
            return {
              type: 1,
              authorityId: item.id
            };
          }),
          ...this.ourStafAlert.data.docBus.select.map(item => {
            return {
              type: 2,
              authorityId: item.id
            };
          })
        ]
      };
      const postQuery = { token: this.userInfo.token };
      const res = await createUser(postQuery, postData);
      console.log(res);
      if (res.data.errCode === 0) {
        this.$message({
          type: "info",
          message: `添加成功`
        });
        this.initOurStafAlertData();
        this.getUserList();
      } else {
        this.$message({
          type: "info",
          message: `添加失败`
        });
      }
    },

    /**
     * 获取科室列表
     */
    async getDepartmentList() {
      const res = await fetchHospitalDepts({
        orgCode: this.userSelfInfo.orgCode
      });
      if (res.data.errCode === 0) {
        this.departmentlist = JSON.parse(JSON.stringify(res.data.body));
        this.ourStaff.department.list = JSON.parse(
          JSON.stringify(
            res.data.body.map(item => {
              item.text = item.deptName;
              return item;
            })
          )
        );

        console.log(this.departmentlist);
      } else {
        this.$notify.error({
          title: "数据获取失败",
          message: res.data.errMsg
        });
      }
    },

    /**
     * 获取 3.2.1.首页-医院医生业务子系统列表（新）
     *
     */
    async fetchDoctorSubSystems() {
      const res = await fetchDoctorSubSystems({
        token: this.userInfo.token,
        orgCode: this.userSelfInfo.orgCode
      });
      if (res.data.errCode === 0) {
        this.ourStafAlert.data.docBus.list = res.data.body;
        // this.DoctorBusinessScope = res.data.body;
        // console.log(this.DoctorBusinessScope)
      } else {
        this.$notify.error({
          title: "数据获取失败",
          message: res.data.errMsg
        });
      }
    },

    /**
     * 获取 3.1.首页-医院科室管理子系统列表
     *
     */
    async hospitalDepartmentManagementSubsystemList() {
      const res = await hospitalDepartmentManagementSubsystemList({
        token: this.userInfo.token,
        orgCode: this.userSelfInfo.orgCode
      });
      if (res.data && res.data.errCode === 0) {
        this.ourStafAlert.data.manbus.list = res.data.body.map(item => {
          item.id = item.subCode;
          item.label = item.subName;
          return item;
        });

        // this.DepartmentManagementAuthority = res.data.body.map(item=>{
        //     return Object.assign({},{
        //        children:[],
        //        id:item.subCode,
        //        label:item.subName,
        //        select:item.checkbox
        //     },item)
        // });
        // this.DepartmentManagementAuthority = res.data.body;
        // console.log( this.DepartmentManagementAuthority)
      } else {
        this.$notify.error({
          title: "数据获取失败",
          message: res.data.errMsg
        });
      }
    },

    /**
     * 3.6首页-账号及权限-用户列表
     */
    async getUserList() {
      const res = await userList({
        token: this.userInfo.token,         
        pageNum: this.ourStaff.ourStaffUser.page.pageNum,
        pageSize: this.ourStaff.ourStaffUser.page.pageSize,
        departmentId:this.ourStaff.departmentSelect
      });
      if (res.data && res.data.errCode === 0) {
        console.log(res);
        this.ourStaff.ourStaffUser.list = res.data.body.data2.list;
        this.ourStaff.ourStaffUser.page.total = res.data.body.data2.size;
      } else {
      }

      // const res = await synergyManageList({
      //     token:this.userInfo.token,
      //     pageNum:this.ourStaff.page.currentPage,
      //     pageSize:this.ourStaff.page.pageSize,
      // });
      // console.log(res);
      // if(res.data && res.data.errCode === 0){

      // }else{

      // }
    },
    /**
     * 本院人员 搜索框搜索
     */
    async ourStaffSearchChange(data) {
      console.log(data);
    },
    /******************** */
    gitIndex(index) {
      // console.log(456)
      // console.log(index)
    },

    inviteSub() {
      console.log("邀请");
    },
    alertStatus(num) {
      //操作弹框状态，传入1个数字，1表示新增弹窗，2表示邀请弹窗，其余隐藏弹窗，建议选0
      if (Object.prototype.toString.call(num) !== "[object Number]") return;
      num === 1 || num === 2 ? (this.otrue = true) : (this.otrue = false);
      this.isAdd = num;
    },
    ourStaffDepartmentSelect(data) {
      this.ourStaff.departmentSelect = data.index;
      this.getUserList();
      console.log(data);
    }
  },
  components: {
    selftag,
    markLayer,
    publicList,
    selectTree,
    search
  },
  async created() {
    this.getDepartmentList();
    this.fetchDoctorSubSystems();
    this.hospitalDepartmentManagementSubsystemList();
    this.getUserList();
    // console.log(this.$store.state.user)
  }
};
</script>

<style >
.Account-authority {
}
.Account-authority > .el-tabs {
  background: #fff;
  border: 1px solid var(--color5);
  box-shadow: 0 0.06rem 0.36rem 0 rgba(0, 62, 100, 0.04);
  border-radius: 0.04rem;
}
.left-model-head-operating .el-input__inner {
  border-radius: 0.22rem;
}
.left-model-head {
  display: flex;
  justify-content: space-between;
}
.left-model-head-operating {
  display: flex;
  padding-right: 0.7rem;
}
.left-model-head-operating .el-icon-search:before {
  color: var(--color6);
}
.left-model-head-operating > .el-input {
  margin-right: 0.99rem;
}
.left-model-head-operating .el-button {
  width: 1.96rem;
  height: 0.4rem;
}
.left-model-head-operating ::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: var(--color6);
}
.left-model-head-operating :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: var(--color6);
}
.left-model-head-operating ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: var(--color6);
}
.left-model-head-operating :-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: var(--color6);
}
.right-model-head {
  display: flex;
  justify-content: space-between;
}
.right-model-head-operating {
  display: flex;
  padding-right: 0.7rem;
}
.right-model-head-operating > .el-input {
  margin-right: 0.99rem;
  height: 0.4rem;
}
.right-model-head-operating .el-button {
  width: 1.96rem;
  height: 0.4rem;
  background-color: var(--bgColor7);
  transition: 0.3s;
}
.right-model-head-operating .el-button:hover {
  opacity: 0.6;
}
.right-model-head-operating .el-input__inner {
  border-radius: 0.22rem;
}
.select-div {
  text-align: center;
}

.left-btn-select,
.left-btn-select span {
  background-color: var(--bgColor6) !important;
  border-color: var(--bgColor6) !important;
  border-radius: 0.04rem 0 0 0.04rem !important;
}
.right-btn-select,
.right-btn-select span {
  background-color: var(--bgColor6) !important;
  border-color: var(--bgColor6) !important;
  border-radius: 0 0.04rem 0.04rem 0 !important;
}
.select-div label {
  width: 1.18rem;
}
.select-div .el-radio-group label .el-radio-button__inner {
  width: 100% !important;
}
.select-item-list {
  min-height: 0.86rem;
  padding-left: 0.96rem;
  padding-right: 0.52rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  overflow: hidden;
}
.select-item-span {
  font-family: var(--fontFamily3);
  color: var(--color7);
  letter-spacing: 0;
  line-height: 0.27rem;
  margin-right: 0.25rem;
}
.account-authority {
  width: 100%;
}
.account-authority th {
  border-bottom: 1px solid var(--color5);
  padding-top: 0.12rem;
  padding-bottom: 0.1rem;
  padding-left: 0.2rem;
}
.ourStaf-alert-item-text {
  display: flex;
  margin-bottom: 0.2rem;
}
.ourStaf-alert-item-text-ch {
  display: flex;
  flex: 1;
  align-items: center;
}
.ourStaf-alert-item-text-ch > span {
  flex: 1;
  text-align: center;
}
.ourStaf-alert-item-text-ch > .el-input {
  flex: 4;
}
.ourStaf-alert-icon {
  font-size: var(--fontSize1);
  color: red;
  width: 0.2rem;
}
.ourStaf-alert-item-select {
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
}
.ourStaf-alert-item-select > span {
  flex: 2;
}
.ourStaf-alert-item-select-div {
  flex: 5;
}
.ourStaf-alert-item-select-div-con {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
.ourStaf-alert-sub {
  text-align: center;
}

/******************************************************/
.mark-content {
  width: 6.02rem;
  /* height: 602px; */
  background: var(--whiteColor);
  border: 1px solid var(--color8);
  border-radius: 0.048rem;
  padding-left: 0.52rem;
  padding-right: 0.52rem;
}
.mark-add-title {
  font-family: var(--fontFamily3);
  font-size: var(--fontSize7);
  color: var(--color7);
  line-height: 0.33rem;
  text-align: center;
  margin-bottom: 0.24rem;
  margin-top: 1.1%;
}
.input-layer {
  margin-bottom: 0.18rem;
  display: flex;
}
.select-layer {
  display: flex;
  align-items: center;
  padding-right: 0.52rem;
}

.leyer-item {
  flex: 1;
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
}
.leyer-item-name {
  /* width: 20%; */
}
.leyer-item .el-input {
  width: 60%;
}
.check-div {
  margin-top: 0.25rem;
}
.check-div-content {
  display: flex;
}
.check-div-item {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
}
.has-border {
  border: 2px dashed #d8dfe5;
  border-radius: 5px;
}
.check-div-item .el-checkbox {
  margin-left: 0;
}
.check-div-item > span {
  /* font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #323C47;
		letter-spacing: 0;
		line-height: 27px; */
  height: 0.27rem;
}
.sub-add {
  margin-top: 0.35rem;
  margin-bottom: 0.17rem;
}
.sub-add > .el-button {
  width: 100%;
  height: 0.4rem;
  font-size: var(--fontSize1);
}
.leyer-item > .ivu-icon-md-star {
  color: red;
  margin-left: 0.12rem;
}
.select-layer > .ivu-icon-md-star {
  color: red;
  margin-left: 0.12rem;
}
.invite-iput-layer {
  display: flex;
  align-items: center;
  margin-bottom: 0.18rem;
}
.invite-input-name {
  flex: 1;
}
.invite-iput-layer .el-input {
  flex: 5;
}
.invite-iput-layer > .ivu-icon-md-star {
  color: red;
  margin-left: 0.12rem;
}
.invite-iput-layer .el-select {
  flex: 5;
}
.mark-invite-check {
  border: 1px solid var(--borderColor1);
  border-radius: 0.04rem;
  margin-right: 0.24rem;
  padding-top: 0.13rem;
  padding-left: 0.1rem;
  padding-bottom: 0.2rem;
  margin-bottom: 0.57rem;
}
.mark-invite-check-title {
  color: var(--color9);
}
.mark-invite-sub {
  padding-bottom: 0.32rem;
}
.mark-invite-sub > .el-button {
  width: 100%;
  height: 0.4rem;
}
.left-model-body {
  padding-top: 0.2rem;
}
.pagination-div {
  display: flex;
  justify-content: center;
}
</style>