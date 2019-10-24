<template>
  <div class="Account-authority">
    <div class="select-div">
      <el-radio-group
        v-model="tabPosition"
        style="margin-bottom: 30px;"
      >
        <el-radio-button
          label="left"
          :class="tabPosition==='left'?'left-btn-select':''"
        >本院人员</el-radio-button>
        <el-radio-button
          label="right"
          :class="tabPosition==='right'?'right-btn-select':''"
        >院外协作人员</el-radio-button>
      </el-radio-group>
    </div>
    <el-tabs>
      <div
        class="left-model"
        v-show="tabPosition==='left'"
      >
        <div class="left-model-head">
          <div class="left-model-head-flag">
            <selftag
              v-model="ourStaff.department"
              @reback="ourStaffDepartmentSelect"
            ></selftag>
          </div>
          <div class="left-model-head-operating">
            <search @searchValue="ourStaffSearchChange"></search>
            <el-button
              type="primary"
              @click="openourStafAlert"
            >新增</el-button>
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
              <tr
                v-for="(item,index) in ourStaff.ourStaffUser.list"
                :key="index"
              >
                <th>{{item.departmentName}}</th>
                <th>{{item.name}}</th>
                <th>{{item.account}}</th>
                <th>{{item.phone}}</th>
                <th>
                  <el-tooltip
                    class="item"
                    effect="light"
                    placement="right"
                  >
                    <div
                      slot="content"
                      v-loading="item.pendding"
                    >
                      <div class="content-item">
                        <p class="content-item-title">医生业务范围</p>
                        <p
                          v-for="(value,key) in item.addAttributeDoc?item.addAttributeDoc.authorizes:[]"
                          :key="key"
                        >{{value.authorityName || ''}}</p>
                      </div>
                      <div class="content-item">
                        <p class="content-item-title">科室管理权限范围</p>
                        <p
                          v-for="(value,key) in item.addAttributeMan?item.addAttributeMan.authorizes:[]"
                          :key="key"
                        >{{value.authorityName || ''}}</p>
                      </div>
                    </div>
                    <div
                      class="Account-authority-append-class"
                      @mouseenter="getItemInfo(item,index)"
                    >{{item.busRange.length}}</div>
                  </el-tooltip>
                </th>
                <th>{{item.newTime}}</th>
                <th>{{item.hasDeptManage?'有':'无'}}</th>
                <th>
                  <el-button
                    type="success"
                    size="mini"
                    plain
                    @click="modifyUserInfo(item)"
                  >编辑</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    plain
                    @click="deleteItem(item,index)"
                  >删除</el-button>
                </th>
              </tr>
            </tbody>
          </table>
          <tableNoMore v-if="ourStaff.ourStaffUser.list.length <= 0"></tableNoMore>
        </div>
        <div class="pagination-div">
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
      <div
        class="right-model"
        v-show="tabPosition==='right'"
      >
        <div class="right-model-head">
          <div class="right-model-head-flag">
            <div>
              <!-- <selftag @reback="outerCourtUserHospitalSelect" v-model="outerCourt.hospital"></selftag> -->
              <selftag
                @reback="outerCourtUserDepartmentSelect"
                v-model="outerCourt.department"
              ></selftag>
            </div>
          </div>
          <div class="right-model-head-operating">
            <search @searchValue="outSearch"></search>
            <el-button
              type="primary"
              @click="inviteCollaboration"
            >邀请协作</el-button>
          </div>
        </div>
        <div class="left-model-body">
          <table class="account-authority">
            <thead class="account-authority-thead">
              <tr>
                <th>医院</th>
                <th>科室</th>
                <th>姓名</th>
                <th>账号</th>
                <th>手机号</th>
                <!-- <th>业务范围</th> -->
                <th>入驻时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody class="account-authority-tbody">
              <tr
                v-for="(item,index) in outerCourt.list"
                :key="index"
              >
                <th>{{item.userOrgName}}</th>
                <th>{{item.userDeptName}}</th>
                <th>{{item.userName}}</th>
                <th>{{item.account}}</th>
                <th>{{item.phone}}</th>
                <!-- <th>
                  <el-tooltip class="item" effect="light" placement="top">
                      <div slot="content">
                          <p v-for="(value,key) in item.busRange" :key="key">{{value}}</p>
                      </div>
                      <div class="Account-authority-append-class">{{item.busRange.length}}</div>
                  </el-tooltip>
                </th>-->
                <th>{{item.updateTime?item.updateTime.substring(0,10):''}}</th>
                <th>
                  <el-button
                    type="success"
                    size="mini"
                    plain
                    @click="revisionCollaboration(item)"
                  >编辑</el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    plain
                    @click="deleteDoctor(item)"
                  >删除</el-button>
                </th>
              </tr>
            </tbody>
          </table>
          <tableNoMore v-if="outerCourt.list.length <= 0"></tableNoMore>
          <!-- <div class="pagination-div">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="ourStaff.ourStaffUser.page.pageSize"
              :current-page="ourStaff.ourStaffUser.page.pageNum"
              :total="ourStaff.ourStaffUser.page.total"
              v-if="ourStaff.ourStaffUser.page.total!=0"
              @current-change="ourStaffChangePage2"
            ></el-pagination>
          </div>-->
          <div class="pagination-div">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="outerCourt.page.pageSize"
              :current-page="outerCourt.page.pageNum"
              :total="outerCourt.page.total"
              v-if="outerCourt.page.total!=0"
              @current-change="outerCourtChangePage"
            ></el-pagination>
          </div>
        </div>
      </div>
    </el-tabs>

    <!-- 本院人员 弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
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
            <!-- v-if="ourStafAlert.type===0" -->
            <el-autocomplete
              class="Account-authority-append-class-new-class"
              v-model="ourStafAlert.data.name"
              size="mini"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
            <!-- <el-input placeholder="请输入内容" v-else v-model="ourStafAlert.data.name" size="mini" clearable></el-input> -->
            <i class="iconfont ourStaf-alert-icon">&#xe7b0;</i>
          </div>
          <div class="ourStaf-alert-item-text-ch">
            <span>电话:</span>
            <el-input
              placeholder="请输入内容"
              v-model="ourStafAlert.data.phone"
              size="mini"
              clearable
            ></el-input>
            <i class="iconfont ourStaf-alert-icon"></i>
          </div>
        </div>
        <div class="ourStaf-alert-item-text">
          <div class="ourStaf-alert-item-text-ch">
            <span>账号:</span>
            <el-input
              placeholder="请输入内容"
              v-model="ourStafAlert.data.account"
              size="mini"
              clearable
              :disabled="ourStafAlert.type!==0"
            ></el-input>
            <i class="iconfont ourStaf-alert-icon">&#xe7b0;</i>
          </div>
          <div class="ourStaf-alert-item-text-ch">
            <span>密码:</span>
            <el-input
              :placeholder="ourStafAlert.type===0?'':'***************'"
              v-model="ourStafAlert.data.psd"
              size="mini"
              clearable
              type="password"
            ></el-input>
            <i class="iconfont ourStaf-alert-icon">&#xe7b0;</i>
          </div>
        </div>
        <div class="ourStaf-alert-item-select">
          <span>科室:</span>
          <div class="ourStaf-alert-item-select-div">
            <el-select
              v-model="ourStafAlert.data.department.select"
              clearable
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
          <span>科室管理权限范围:</span>
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
          <el-button
            type="primary"
            @click="submission"
          >确定</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 院外协作人员 弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      :title="ourStafAlert.type===0?'邀请协作':'修改协作'"
      :visible.sync="outerCourtAlert.show"
      width="602px"
      hight="607px"
      center
      :before-close="outerCourtAlertClose"
    >
      <div class="our-staf-alert">
        <div class="our-staf-alert-item">
          <span class="our-staf-alert-item-key">账号/手机号:</span>
          <div class="our-staf-alert-item-value-out">
            <el-input
              placeholder="请输入对方账号和手机号"
              :disabled="outerCourtAlert.type!==0"
              size="mini"
              v-model="outerCourtAlert.account"
              clearable
            ></el-input>
          </div>
          <i class="iconfont ourStaf-alert-icon">&#xe7b0;</i>
        </div>
        <div class="our-staf-alert-item">
          <span class="our-staf-alert-item-key">协作范围:</span>
          <div class="our-staf-alert-item-value-out">
            <el-select
              v-model="outerCourtAlert.range.select"
              size="mini"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in outerCourt.department.list"
                :key="index"
                size="mini"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <i class="iconfont ourStaf-alert-icon">&#xe7b0;</i>
        </div>
        <div class="our-staf-alert-sub">
          <el-button
            type="primary"
            @click="outerCourtAlertSub"
          >确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import selftag from '../../../public/publicComponents/selftag.vue'
import selectTree from '../../../public/publicComponents/selectTree.vue'
import sensitiveWordCheck from '../../../public/publicJs/sensitiveWordCheck.js'
import search from '../../../public/publicComponents/search.vue'
import { deepCopy } from '../../../public/publicJs/deepCopy.js'
import tableNoMore from '../../../public/publicComponents/tableNoMore.vue'
import {
  fetchHospitalDepts,
  fetchDoctorSubSystems,
  hospitalDepartmentManagementSubsystemList,
  createUser,
  synergyManageList,
  userList,
  userInfo,
  updateUser,
  synergyManageInvite,
  getUserItemInfo,
  deleteUserItem,
  listBusRange,
  fetchHospitalDeptAuth,
  internalHospitalDoctor,
  synergyManageUpdate,
  synergyManageDelete,
} from '../../../api/apiAll.js'

export default {
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      userSelfInfo: state => state.user.userSelfInfo,
      global: state => state.global,
    }),
  },
  data() {
    return {
      newAppend: [
        //新增功能 边输入边筛选 原始数据
        // { "value": "三全鲜食（北新泾店）", "doctorCode": "长宁区新渔路144号" },
        // { "value": "Hot honey 首尔炸鸡（仙霞路）", "doctorCode": "上海市长宁区淞虹路661号" },
        // { "value": "新旺角茶餐厅", "doctorCode": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        // { "value": "泷千家(天山西路店)", "doctorCode": "天山西路438号" },
        // { "value": "胖仙女纸杯蛋糕（上海凌空店）", "doctorCode": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
        // { "value": "贡茶", "doctorCode": "上海市长宁区金钟路633号" },
        // { "value": "豪大大香鸡排超级奶爸", "doctorCode": "上海市嘉定区曹安公路曹安路1685号" },
        // { "value": "茶芝兰（奶茶，手抓饼）", "doctorCode": "上海市普陀区同普路1435号" },
        // { "value": "十二泷町", "doctorCode": "上海市北翟路1444弄81号B幢-107" },
        // { "value": "星移浓缩咖啡", "doctorCode": "上海市嘉定区新郁路817号" },
        // { "value": "阿姨奶茶/豪大大", "doctorCode": "嘉定区曹安路1611号" },
        // { "value": "新麦甜四季甜品炸鸡", "doctorCode": "嘉定区曹安公路2383弄55号" },
        // { "value": "Monica摩托主题咖啡店", "doctorCode": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
        // { "value": "浮生若茶（凌空soho店）", "doctorCode": "上海长宁区金钟路968号9号楼地下一层" },
        // { "value": "NONO JUICE  鲜榨果汁", "doctorCode": "上海市长宁区天山西路119号" },
        // { "value": "CoCo都可(北新泾店）", "doctorCode": "上海市长宁区仙霞西路" },
        // { "value": "快乐柠檬（神州智慧店）", "doctorCode": "上海市长宁区天山西路567号1层R117号店铺" },
        // { "value": "Merci Paul cafe", "doctorCode": "上海市普陀区光复西路丹巴路28弄6号楼819" },
      ],
      addData: {
        //新增时，收集信息
        name: '', //姓名
        phone: '', //电话
        account: '', //账号
        passwd: '', //密码
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
          title: '科室',
          list: [],
        },
        departmentSelect: {}, //选中科室
        searchKey: '', //搜索关键字
        ourStaffUser: {
          //账号列表
          page: {
            //页码相关
            pageSize: 10, //每页多少数据
            pageNum: 1, //当前页
            total: 0, //总条数
          },
          list: [], //本院人员列表
        },
      },
      outerCourt: {
        //外院人员 数据
        hospital: {
          //医院
          index: 0,
          more: false,
          title: '医院',
          list: [],
        },
        page: {
          //页码相关
          pageSize: 10, //每页多少数据
          pageNum: 1, //当前页
          total: 0, //总条数
        },
        searchKey: '', //搜索关键字
        hospitalSelect: {}, //选中医院
        department: {
          //科室
          index: 0,
          more: false,
          title: '科室',
          list: [],
        },
        departmentSelect: {}, //选中科室
        list: [], //外院人员列表
      },
      ourStafAlert: {
        //弹窗
        show: false,
        type: 0, //0 新增， 1 修改
        userId: '', //新增没有，修改才有
        data: {
          name: '', //姓名
          phone: '', //电话
          account: '', //账号
          psd: '', //密码
          doctorNo: '',
          department: {
            //科室
            select: '', //选中 科室
            list: [], // 科室列表
          },
          manDepartment: {
            //管理科室
            select: [], //选中 科室
            list: [], // 科室列表
          },
          docBus: {
            //医生业务范围
            select: [], //选中 医生业务
            list: [], // 医生业务 列表
          },
          manbus: {
            //科室管理权限范围
            select: [], //选中 科室管理权限
            list: [], //科室管理权限 列表
          },
        },
      },
      outerCourtAlert: {
        //院外协作人员 弹窗数据
        show: false, //是否显示
        type: 0, //0 表示邀请(新增)， 1表示 编辑
        account: '', //账号
        range: {
          //范围
          select: [], //选中
          list: [], //没用这个  直接用的 outerCourt.department
        },
        id: '',
      },
      tabPosition: 'left',
    }
  },
  watch: {
    /**
     * 监听科室变化
     */
    'global.manToolDept': {
      handler(n) {
        this.ourStafAlert.data.department.list = n.map(item => {
          item.text = item.name
          item.deptId = item.value
        })
        // [
        //   { text: "全部", deptId: "" },
        //   ...deepCopy(n)
        // ];
        this.ourStafAlert.data.manDepartment.list = n.map(item => {
          item.text = item.name
          item.deptId = item.value
        })
        // [
        //   { text: "全部", deptId: "" },
        //   ...deepCopy(n)
        // ];
      },
    },
    /**
     * 检查医院变化，请求数据
     */
    'global.allHospital': {
      handler(n) {
        // console.log(n);
        this.setHospitalList(n)
      },
    },
  },
  methods: {
    /**
     * 删除 协作医生
     */
    async deleteDoctor(item) {
      console.log(item)
      const res = await synergyManageDelete({
        token: this.userInfo.token,
        id: item.id,
      })
      if (res.data && res.data.errCode === 0) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
        })
        this.outerCourtAlertClose()
        this.getSynergyManageList()
      } else {
        this.$notify.error({
          title: '删除失败',
          message: res.data.errMsg,
        })
      }
    },
    /**
     * 获取 新增功能的 数据
     */
    async getInternalHospitalDoctor() {
      const res = await internalHospitalDoctor({
        token: this.userInfo.token,
        orgCode: this.userSelfInfo.orgCode,
      })
      if (res.data && res.data.errCode === 0) {
        console.warn(res)
        this.newAppend = res.data.body.map(item => {
          item.value = item.doctorName
          return item
        })
      } else {
        this.$notify.error({
          title: '院内用户信息获取失败',
          message: res.data.errMsg,
        })
      }
    },
    /**
     * 新增 需求 边输入边筛选
     */
    querySearch(queryString, cb) {
      console.log(queryString)
      // 调用 callback 返回建议列表的数据
      cb(
        queryString
          ? this.newAppend.filter(
              item => item.value.indexOf(queryString) !== -1,
            )
          : this.newAppend,
      )
      // cb(queryString ? this.newAppend.filter(item=>item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) : this.newAppend);
    },
    /**
     * 新增需求  选中
     */
    handleSelect(item) {
      console.log(item)
      this.ourStafAlert.data.doctorNo = item.doctorCode
    },
    /**
     * 删除 用户
     */
    async deleteItem(item, index) {
      // console.log(item)
      if (this.userSelfInfo.userId === item.id) {
        this.$notify.error({
          title: '删除失败',
          message: '不能删除自己',
        })
        return
      }
      const res = await deleteUserItem({
        token: this.userInfo.token,
        userId: item.id,
      })
      if (res.data && res.data.errCode === 0) {
        this.ourStaff.ourStaffUser.list.splice(index, 1)
      } else {
        this.$notify.error({
          title: '删除失败',
          message: res.data.errMsg,
        })
      }
    },
    /**
     * 获取 具体业务范围
     */
    async getItemInfo(item, index) {
      // console.log(item)
      // console.log(index)
      // return;
      if (this.ourStaff.ourStaffUser.list[index].addAttribute) return
      if (this.ourStaff.ourStaffUser.list[index].pendding) return
      this.ourStaff.ourStaffUser.list[index].pendding = true
      const res = await listBusRange({
        token: this.userInfo.token,
        userId: item.id,
      })
      // console.log(res);
      if (res.data && res.data.errCode === 0) {
        this.ourStaff.ourStaffUser.list[index].addAttributeDoc =
          res.data.body[0]
        this.ourStaff.ourStaffUser.list[index].addAttributeMan =
          res.data.body[1]
      } else {
      }
      this.ourStaff.ourStaffUser.list[index].pendding = false
      this.ourStaff = Object.assign({}, this.ourStaff)
    },
    // /**
    //  * 删除 本院人员 数据
    //  */
    // async deleteItem(item){},
    /**
     * 修改协作 按钮 被点击
     */
    revisionCollaboration(item) {
      console.log(item)
      this.outerCourtAlert.account = item.account
      this.outerCourtAlert.id = item.id
      this.outerCourtAlert.range.select = item.deptIds || [] //后台会返回null 弄个默认值
      // this.outerCourt.department.list = item.busRange;
      this.outerCourtAlert.show = true
      this.outerCourtAlert.type = 1
    },
    /**
     * 邀请协作 按钮 被点击
     */
    inviteCollaboration() {
      this.outerCourtAlert.show = true
      this.outerCourtAlert.type = 0
    },
    /**
     * 院外协作人员 弹窗 被提交
     */
    outerCourtAlertSub() {
      this.outerCourtAlert.type === 0
        ? this.outerCourtNew()
        : this.outerCourtModify()
    },
    /**
     * 院外协作人员 弹窗 新增
     */
    async outerCourtNew() {
      const postData = [
        { token: this.userInfo.token },
        {
          account: this.outerCourtAlert.account,
          deptId: this.outerCourtAlert.range.select,
        },
      ]
      const res = await synergyManageInvite(...postData)
      if (res.data && res.data.errCode === 0) {
        this.$notify({
          title: '成功',
          message: '邀请成功',
          type: 'success',
        })
        this.outerCourtAlertClose()
        this.getSynergyManageList()
      } else {
        this.$notify.error({
          title: '邀请失败',
          message: res.data.errMsg,
        })
      }
    },
    /**
     * 院外协作人员 弹窗 修改
     */
    async outerCourtModify() {
      const postData = [
        { token: this.userInfo.token },
        {
          id: this.outerCourtAlert.id,
          deptId: this.outerCourtAlert.range.select,
        },
      ]
      const res = await synergyManageUpdate(...postData)
      if (res.data && res.data.errCode === 0) {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
        })
        this.outerCourtAlertClose()
        this.getSynergyManageList()
      } else {
        this.$notify.error({
          title: '修改失败',
          message: res.data.errMsg,
        })
      }
      //
    },
    /**
     * 外院 弹窗 关闭
     */
    outerCourtAlertClose(done) {
      this.outerCourtAlert.show = false
      this.outerCourtAlert.type = 0
      this.outerCourtAlert.account = ''
      this.outerCourtAlert.range.select = []
    },
    /**
     * 外院 分页 选择
     */
    outerCourtChangePage(data) {
      this.outerCourt.page.pageNum = data
      this.getSynergyManageList()
    },
    /**
     * 外院 科室 被选中
     */
    outerCourtUserDepartmentSelect(data) {
      this.outerCourt.departmentSelect = data.select
      this.getSynergyManageList()
    },
    /**
     * 外院 医院 被选中
     */
    outerCourtUserHospitalSelect(data) {
      // console.log(data)
      this.outerCourt.hospitalSelect = data.select
      this.getSynergyManageList()
    },
    /**
     * 院外 关键字搜索
     */
    outSearch(value) {
      // console.log(value)
      this.outerCourt.searchKey = value
      this.getSynergyManageList()
    },
    /**
     * 获取 15.1首页-账号及权限-院外协作列表
     */
    async getSynergyManageList() {
      const res = await synergyManageList({
        token: this.userInfo.token,
        pageNum: this.outerCourt.page.pageNum,
        pageSize: this.outerCourt.page.pageSize,
        query: this.outerCourt.searchKey,
        departmentId: this.outerCourt.departmentSelect.deptId,
        // departmentId : this.outerCourt.department.list[this.outerCourt.department.index]?this.outerCourt.department.list[this.outerCourt.department.index].deptId:''
        // departmentId: this.outerCourt.departmentSelect.orgCode || ""
      })
      console.log(res)
      if (res.data.errCode === 0) {
        this.outerCourt.list = res.data.body.data2.list.map(item => {
          item.deptIds ? (item.deptIds = item.deptIds.split(',')) : null
          return item
        })
        this.outerCourt.page.total = res.data.body.data2.total
      } else {
        this.$notify.error({
          title: '院外协作列表获取失败',
          message: res.data.errMsg,
        })
      }
    },
    /**
     * 设置 医院列表
     */
    setHospitalList(data) {
      const hospitalList = deepCopy(data)
      this.outerCourt.hospital.list = [
        { text: '全部', id: '' },
        ...hospitalList.map(item => {
          item.text = item.orgName
          return item
        }),
      ]
    },
    /**
     * 初始化 本院人员 弹窗数据
     */
    initOurStafAlertData() {
      this.ourStafAlert.show = false
      this.ourStafAlert.type = 0
      this.ourStafAlert.userId = ''
      this.ourStafAlert.data.name = ''
      this.ourStafAlert.data.phone = ''
      this.ourStafAlert.data.account = ''
      this.ourStafAlert.data.psd = ''
      this.ourStafAlert.data.department.select = ''
      this.ourStafAlert.data.manDepartment.select = []
      this.ourStafAlert.data.docBus.select = []
      this.ourStafAlert.data.manbus.select = []
      this.ourStafAlert = Object.assign({}, this.ourStafAlert)
    },
    /**
     * 本院人员 页码被选中
     */
    ourStaffChangePage(data) {
      this.ourStaff.ourStaffUser.page.pageNum = data
      this.getUserList()
    },
    /**
     * 修改用户信息
     */
    async modifyUserInfo(item) {
      // console.log(item)
      const res = await this.getUserInfo({
        token: this.userInfo.token,
        userId: item.id,
        oneself: item.id === this.userSelfInfo.userId,
      })
      if (res.success) {
        this.ourStafAlert.type = 1
        ;(this.ourStafAlert.data.userId = res.data.userId),
          (this.ourStafAlert.data.name = item.name)
        this.ourStafAlert.data.phone = item.phone
        this.ourStafAlert.data.account = item.account
        // this.ourStafAlert.data.department.select = res.data.depts.map(
        //   item => item.deptId
        // );
        this.ourStafAlert.data.department.select = res.data.depts.map(
          item => item.deptId,
        )[0]
        // console.log(res.data.depts.map(
        //   item => item.deptId
        // )[0])
        // console.log(res.data.systemBusList)
        let resultList = []
        const getValue = data => {
          for (const i of data) {
            if (i.checkbox) {
              resultList.push(i)
            }
            if (i.biz.length > 0) {
              getValue(i.biz)
            }
          }
        }
        getValue(res.data.systemBusList)
        resultList = resultList.map(item => {
          item.id = item.subCode
          item.label = item.subName
          return item
        })
        if (resultList.find(item => item.id === '10000')) {
          //这个位置有重大隐患，如果添加子模块这里要出bug，但是关我什么事，都特么要做完了在给我说这些
          const hasAllChildren =
            resultList.find(item => item.id === '10001') &&
            resultList.find(item => item.id === '10002') &&
            resultList.find(item => item.id === '10003') //是否拥有远程门诊下所有子模块
          hasAllChildren
            ? null
            : (resultList = resultList.filter(ele => ele.id !== '10000')) //如果未拥有远程门诊下所有子模块，删除掉远程门诊，因为element-ui这玩意有了父节点，底下节点全部选中
        }
        if (resultList.find((item, index) => item.id === '80001')) {
          //这个位置情况和上面一样
          const hasAllChildren =
            resultList.find(item => item.id === '80004') &&
            resultList.find(item => item.id === '80002') &&
            resultList.find(item => item.id === '80003') //是否拥有我的转诊下所有子模块
          hasAllChildren
            ? null
            : (resultList = resultList.filter(ele => ele.id !== '80001')) //如果未拥有我的转诊下所有子模块，删除掉我的转诊，因为element-ui这玩意有了父节点，底下节点全部选中
          hasAllChildren
            ? null
            : (resultList = resultList.filter(ele => ele.id !== '80000')) //如果未拥有我的转诊下所有子模块，删除掉双向转诊，因为element-ui这玩意有了父节点，底下节点全部选中
        }
        // console.log(resultList)
        // resultList = resultList.filter(ele=>ele.id == '80002');
        this.ourStafAlert.data.docBus.select = resultList
        // resultList.map(item=>{
        //   item.id = item.subCode;
        //   item.label = item.subName;
        //   return item;
        // });
        console.log(this.ourStafAlert.data.docBus.select)
        // return;
        // const mid = res.data.systemBusList.filter(item=>item.checkbox);
        // this.ourStafAlert.data.docBus.select = mid.map(item=>{
        //   item.id = item.subCode;
        //   item.label = item.subName;
        //   return item;
        // });
        // this.ourStafAlert.data.docBus.select = res.data.systemBusList.map(
        //   item => {
        //     item.id = item.subCode;
        //     item.label = item.subName;
        //     return item;
        //   }
        // );
        const mid2 = res.data.systemList.filter(item => item.checkbox)
        this.ourStafAlert.data.manbus.select = mid2.map(item => {
          item.id = item.subCode
          item.label = item.subName
          return item
        })
        // this.ourStafAlert.data.manbus.select = res.data.systemList.map(item => {
        //   item.id = item.subCode;
        //   item.label = item.subName;
        //   return item;
        // });
        this.ourStafAlert.data.manDepartment.select = res.data.managerDepts.map(
          item => item.deptId,
        )
        this.ourStafAlert.show = true
      }
    },
    /**
     * 3.8获取用户信息
     */
    async getUserInfo(data) {
      const res = await userInfo(data)
      if (res.data.errCode === 0) {
        return {
          success: true,
          data: res.data.body,
        }
      } else {
        this.$notify.error({
          title: '用户信息获取失败',
          message: res.data.errMsg,
        })
        return {
          success: false,
          data: null,
        }
      }
    },
    /**
     * 获取 医生业务范围 选中
     */
    getOurStafManbus(data) {
      this.ourStafAlert.data.manbus.select = data
    },
    /**
     * 获取 科室管理权限范围 选中
     */
    getOurStafDocBus(data) {
      // let mid = deepCopy(this.ourStafAlert.data.docBus.list);
      // const setMap = (arr,tag,key) => {//拷贝原数组，找出被选值
      //     return arr.map(item=>{
      //         tag.forEach(v=>item[key] === v[key]?item.select = true:null);
      //         (item.children&&item.children.length>0)?setMap(item.children,tag,key):null;
      //         return item
      //     })
      // }
      // mid = setMap(mid,data,'id');
      // console.log(data);
      // console.log(mid)
      this.ourStafAlert.data.docBus.select = data
      // let mid = deepCopy(this.ourStafAlert.data.docBus.list);
      // const setStatus = (arr, tag) => {
      //   for (const i of arr) {
      //     for (const j of tag) {
      //       if (i.id === j.id) {
      //         i.select = true;
      //       }
      //       if (i.children.length > 0) {
      //         setStatus(i.children, tag);
      //       }
      //     }
      //   }
      // };
      // const deleteChild = data => {
      //   for (const i in data) {
      //     if (!data[i].select) {
      //       const test = data.splice(i, 1);
      //     }
      //     if (data[i] && data[i].children.length > 0) {
      //       deleteChild[data[i].children];
      //     }
      //   }
      // };
      // setStatus(mid, data);
      // deleteChild(mid);
      // console.log(this.ourStafAlert.data.docBus.select)
      // console.log(mid)
    },
    /**
     * 设置选中
     */
    setStatus(list, selectList, key) {
      selectList.forEach(item => {
        for (let i = 0; i < list.length; i++) {
          if (i[key] === item[key]) {
            list[i].select = true
          }
          if (i.children && i.children.length > 0) {
            list[i].children = this.setStatus(i.children, selectList, key)
          }
        }
      })
      return list
    },
    /**
     * 打开 新增 弹窗
     */
    openourStafAlert() {
      this.ourStafAlert.type = 0
      this.ourStafAlert.show = true
    },
    /**
     * 关闭 本院人员 弹窗
     */
    ourStafClose(done) {
      this.initOurStafAlertData()
      // done();
    },
    /**
     * 取出嵌套数组需要的值
     */
    iterationArr(a, b) {
      if (Object.prototype.toString.call(a) !== '[object Array]')
        return { ok: false, mag: '传参需要是数组', data: null }
      const arr = []
      const setFun = data => {
        for (const i of data) {
          for (const j of b) {
            if (j == i.id) {
              arr.push(i)
            }
          }
          if (i.children.length > 0) {
            setFun(i.children)
          }
        }
      }
      setFun(a)
      return { ok: true, mag: '', data: arr }
    },

    /**
     * 设置‘医生业务范围’已选择项
     */
    getDoctorBusinessScopeSelect(data) {
      const result = this.iterationArr(this.DoctorBusinessScope, data)
      this.DoctorBusinessScopeSelect = result.ok ? result.data : []
    },
    getDepartmentManagementAuthoritySelect(data) {
      const result = this.iterationArr(this.DepartmentManagementAuthority, data)
      this.DepartmentManagementAuthoritySelect = result.ok ? result.data : []
      // console.log(this.DepartmentManagementAuthoritySelect);
    },
    /**
     * 大致检查新增用户数据是否正确,是否为空，是否有敏感字
     */
    checkAddInfo() {
      const option = {
        account: {
          zh: '账号',
          data: this.addData.account,
        },
        name: {
          zh: '姓名',
          data: this.addData.name,
        },
        passwd: {
          zh: '密码',
          data: this.addData.passwd,
        },
      }
      for (const i in option) {
        if (!option[i].data)
          return {
            ok: false,
            msg: `${option[i].zh}为空`,
          }
        const isSensitive = sensitiveWordCheck(option[i].data)
        if (!isSensitive.ok)
          return {
            ok: false,
            msg: `${option[i].zh}包含敏感字${isSensitive.key}`,
          }
      }
      return {
        ok: true,
        msg: ``,
      }
    },

    /**
     * 获取新增用户提交数据
     */
    getAddSubData() {
      const options = {
        //提交数据
        account: this.addData.account,
        name: this.addData.name,
        passwd: this.addData.passwd,
        deptIds: [],
        phone: this.addData.phone,
        authorizes: [],
        userType: '0', //用户类型 0(医生),1(患者),2(医院管理员),3(超级管理员)
      }
      const deptIds = [] //已选中的科室列表。element-ui 不能绑定json，只能按照其中一个属性获取到该json,这个过程比较恶心，有众多for循环
      const arr = [] //已选中的科室管理权限范围列表。
      for (const i of this.DoctorBusinessScopeSelect) {
        //这个'医生业务范围'由于自己写的（非element-ui），所以可以直接获取json，直接循环取出值
        options.authorizes.push({
          type: 2,
          authorityId: i.id,
        })
      }
      for (const i of this.DepartmentManagementAuthoritySelect) {
        options.authorizes.push({
          type: 1,
          authorityId: i.id,
        })
      }
      for (const i of this.deptIds) {
        //获取被选中的科室列表
        for (const j of this.departmentlist) {
          j.deptName === i ? deptIds.push(j) : null
        }
      }
      for (const i of deptIds) {
        //取出被选中的科室列表的id，放入需要的数据组
        options.deptIds.push(i.deptId)
      }
      // console.log(options);
      return options
    },
    /**
     * 提交数据
     */
    async submission() {
      const err = await (this.ourStafAlert.type === 0 ? this.addSub() : this.modifyUser())
      
      err || this.ourStafClose()
    },
    /**
     * 修改用户
     */
    async modifyUser() {
      // console.log("modifyUser");
      const postData = [
        { token: this.userInfo.token },
        {
          userId: this.ourStafAlert.data.userId,
          doctorNo: this.ourStafAlert.data.doctorNo,
          name: this.ourStafAlert.data.name,
          passwd: this.ourStafAlert.data.psd,
          phone: this.ourStafAlert.data.phone,
          deptIds: this.ourStafAlert.data.department.select
            ? [this.ourStafAlert.data.department.select]
            : [],
          manageDeptId: this.ourStafAlert.data.manDepartment.select,
          authorizes: [
            ...this.ourStafAlert.data.docBus.select.map(item => {
              return {
                type: 2,
                authorityId: item.id,
              }
            }),
            ...this.ourStafAlert.data.manbus.select.map(item => {
              return {
                type: 1,
                authorityId: item.id,
              }
            }),
          ],
        },
      ]
      // console.log(postData[1]);
      // return;
      const res = await updateUser(...postData)
      // console.log(res);
      if (res.data.errCode === 0) {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
        })
        this.initOurStafAlertData()
        this.getUserList()
      } else {
        this.$notify({
          title: '失败',
          message: res.data.errMsg,
          type: 'error',
        })

        return true
      }
    },
    /**
     * 新增用户
     */
    async addSub() {
      const postData = {
        account: this.ourStafAlert.data.account,
        doctorNo: this.ourStafAlert.data.doctorNo,
        name: this.ourStafAlert.data.name,
        passwd: this.ourStafAlert.data.psd,
        phone: this.ourStafAlert.data.phone,
        userType: '0',
        deptIds: this.ourStafAlert.data.department.select
          ? [this.ourStafAlert.data.department.select]
          : [],
        manageDeptId: this.ourStafAlert.data.manDepartment.select,
        // authorizes: [],
        authorizes: [
          ...this.ourStafAlert.data.manbus.select.map(item => {
            return {
              type: 1,
              authorityId: item.id,
            }
          }),
          ...this.ourStafAlert.data.docBus.select.map(item => {
            return {
              type: 2,
              authorityId: item.id,
            }
          }),
        ],
      }
      // console.log(postData);
      // return;
      const postQuery = { token: this.userInfo.token }
      const res = await createUser(postQuery, postData)
      // console.log(res);
      if (res.data.errCode === 0) {
        this.$notify({
          title: '成功',
          message: '添加成功',
          type: 'success',
        })
        // this.$message({
        //   type: "info",
        //   message: `添加成功`
        // });
        this.initOurStafAlertData()
        this.getUserList()
      } else {
        this.$notify({
          title: '添加失败',
          message: res.data.errMsg,
          type: 'error',
        })
        // this.$message({
        //   type: "info",
        //   message: `添加失败`
        // });

        return true
      }
    },

    /**
     * 获取科室列表
     */
    async getDepartmentList() {
      // this.departmentlist = this.global.manToolDept.map(item=>{
      //   item.
      // });

      this.ourStaff.department.list = this.global.manToolDept.map(item => {
        item.text = item.name
        item.value = item.id
        return item
      })
      // this.outerCourt.department.list = this.global.manToolDept.map(item=>{
      //   item.text = item.name;
      //   item.value = item.id;
      //   return item;
      // });
      const res = await fetchHospitalDeptAuth({
        orgCode: this.userSelfInfo.orgCode,
        token: this.userInfo.token,
        type: 'MANAGE',
      })
      // console.log(res)
      if (res.data.errCode === 0) {
        this.departmentlist = JSON.parse(JSON.stringify(res.data.body))
        this.outerCourt.department.list = JSON.parse(
          JSON.stringify(
            res.data.body.map(item => {
              item.text = item.deptName
              item.value = item.deptId
              return item
            }),
          ),
        )
        // this.ourStaff.department.list = JSON.parse(
        //   JSON.stringify([
        //     { text: "全部", deptId: "" },
        //     ...res.data.body.map(item => {
        //       item.text = item.deptName;
        //       return item;
        //     })
        //   ])
        // );
        // this.outerCourt.department.list = JSON.parse(
        //   JSON.stringify([
        //     { text: "全部", deptId: "" },
        //     ...res.data.body.map(item => {
        //       item.text = item.deptName;
        //       return item;
        //     })
        //   ])
        // );
        // console.log(this.departmentlist);
      } else {
        this.$notify.error({
          title: '数据获取失败',
          message: res.data.errMsg,
        })
      }
    },

    /**
     * 获取 3.2.1.首页-医院医生业务子系统列表（新）
     *
     */
    async fetchDoctorSubSystems() {
      const res = await fetchDoctorSubSystems({
        token: this.userInfo.token,
        orgCode: this.userSelfInfo.orgCode,
      })
      if (res.data.errCode === 0) {
        this.ourStafAlert.data.docBus.list = res.data.body
      } else {
        this.$notify.error({
          title: '数据获取失败',
          message: res.data.errMsg,
        })
      }
    },

    /**
     * 获取 3.1.首页-医院科室管理子系统列表
     *
     */
    async hospitalDepartmentManagementSubsystemList() {
      const res = await hospitalDepartmentManagementSubsystemList({
        token: this.userInfo.token,
        orgCode: this.userSelfInfo.orgCode,
      })
      if (res.data && res.data.errCode === 0) {
        this.ourStafAlert.data.manbus.list = res.data.body.map(item => {
          item.id = item.subCode
          item.label = item.subName
          return item
        })
      } else {
        this.$notify.error({
          title: '数据获取失败',
          message: res.data.errMsg,
        })
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
        departmentId: this.ourStaff.departmentSelect.value || '',
        query: this.ourStaff.searchKey,
      })
      if (res.data && res.data.errCode === 0) {
        // console.log(res);
        this.ourStaff.ourStaffUser.list = res.data.body.data2.list.map(item => {
          const now = new Date(item.regTime)
          item.newTime = `${now.getFullYear()}-${now.getMonth() +
            1}-${now.getDate()}`
          return item
        })
        this.ourStaff.ourStaffUser.page.total = res.data.body.data2.total
      } else {
      }
    },
    /**
     * 本院人员 搜索框搜索
     */
    async ourStaffSearchChange(data) {
      // console.log(data);
      this.ourStaff.searchKey = data
      this.getUserList()
    },
    ourStaffDepartmentSelect(data) {
      this.ourStaff.departmentSelect = data.select
      this.getUserList()
    },
  },
  components: {
    selftag,
    selectTree,
    search,
    tableNoMore,
  },
  created() {
    this.getDepartmentList()
    this.fetchDoctorSubSystems()
    this.hospitalDepartmentManagementSubsystemList()
    this.getUserList()
    this.setHospitalList(this.global.allHospital)
    this.getSynergyManageList()
    this.getInternalHospitalDoctor()
  },
}
</script>

<style >
.Account-authority {
}
.Account-authority > .el-tabs {
  background: #fff;
  border: 1px solid var(--color5);
  box-shadow: 0 0.06rem 0.36rem 0 rgba(0, 62, 100, 0.04);
  border-radius: 0.04rem;
  padding-top: 0.32rem;
  padding-left: 0.38rem;
  padding-right: 0.68rem;
  padding-bottom: 0.68rem;
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
.our-staf-alert-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
}
.our-staf-alert-item-key {
  flex: 1;
}
.our-staf-alert-item-value-out {
  flex: 4;
}
.our-staf-alert-item-value-out > div {
  width: 100%;
}
.our-staf-alert-sub {
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
  border-left: 2px dashed #d8dfe5;
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
.Account-authority-append-class {
  color: red;
}
.ourStaf-alert-sub > button {
  width: 100%;
}
.Account-authority-append-class-new-class {
  width: 2.04rem;
}
.account-authority-tbody th {
  font-weight: 100;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #5e6875;
  letter-spacing: 0;
}
.content-item-title {
  color: #d4d4d4;
}
.item {
  width: 0.2rem;
}
.search {
  margin-right: 1rem;
}
.account-authority-thead th {
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #5e6875;
  letter-spacing: 0;
}
</style>