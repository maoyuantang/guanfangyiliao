<template>
  <div class="oneTangRef" v-show="docTableData.length != 0">
    <div v-if="isShowaddMove">
      <el-dialog title="新增转诊" :visible.sync="isShowaddMove" :before-close="handleClose1">
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

          <div class="block" style="margin-bottom: 22px;">
            <span class="demonstration"
              style="display: inline-block;font-weight: 700;width: 115px;text-align: right;">转入医院:</span>
            <el-cascader :options="addForm.intoHospital.list" v-model="addForm.intoHospital.value"
              @change="handleChange" clearable ref="ceshi3">
            </el-cascader>
          </div>

          <el-form-item label="病历授权:" :label-width="formLabelWidth">
            <el-select v-model="addForm.giveRight.value" placeholder="单选" clearable>
              <el-option v-for="item in addForm.giveRight.list||[]" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <div class="block" style="margin-bottom: 22px;">
            <span class="demonstration"
              style="display: inline-block;font-weight: 700;width: 115px;text-align: right;">转诊时间:</span>
            <el-date-picker v-model="addForm.moveTime.value" type="datetime" placeholder="请选择" default-time="12:00:00">
            </el-date-picker>
          </div>

          <el-form-item label="转诊目的:" :label-width="formLabelWidth">
            <el-input v-model="addForm.movePurpose" autocomplete="off" placeholder="请填写"></el-input>
          </el-form-item>

          <el-form-item label="初步诊断:" :label-width="formLabelWidth">
            <el-input v-model="addForm.beginIdea" autocomplete="off" placeholder="请填写"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer" style="text-align:center;">
          <el-button type="primary" v-if="kuang2Save == true" @click="dualReferralAdd1" style="width:70%;">新 增
          </el-button>
          <el-button type="primary" v-if="kuang2Save == false" @click="dualReferralAdd2" style="width:70%;">编 辑
          </el-button>
        </div>

      </el-dialog>
    </div>


    <!--弹框1.1  管理查看记录 -->
    <div v-if="isShowmoveUser1">
      <el-dialog title="" :visible.sync="isShowmoveUser1" width="40%" center>
        <div class="moved">
          <!-- 头像姓名 -->
          <div class="moved_top">
            <img src="../../../assets/img/a-6.png" />
            <p>{{dualReferralRecordFile.patientName}}</p>
          </div>
          <!-- 转院路程 -->
          <div class="moved_middle">
            <span class="Hospital1">{{dualReferralRecordFile.applyOrgName}}</span>
            <img src="../../../assets/img/a-6.png" />
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




    <div class="top">
      <div class="top1">双向转诊</div>
      <!-- <el-button type="primary" size="small" @click="goMore">查看更多</el-button> -->
      <button class="primary" @click="goMore">查看更多</button>
    </div>
    <div class="body">
      <!-- {{docTableData}} -->
      <el-table :data="docTableData" style="width: 100%" :show-header="false">
        <el-table-column label=" " width="70">
          <template slot-scope="scope">
            <!-- <img src="../../../assets/img/a-6.png" style="width:42px;" /> -->
            <img v-if="docTableData.applyDoctorHead == null" src="../../../assets/img/a-6.png" alt="医生头像"
              style="width:42px;">
            <img v-if="docTableData.applyDoctorHead"
              :src='"https://demo.chuntaoyisheng.com:10002/m/v1/api/hdfs/fs/download/"+docTableData.applyDoctorHead'
              alt="医生头像" style="width:42px;">
          </template>
        </el-table-column>
        <el-table-column prop="patientName" label="病人" :show-overflow-tooltip="true"></el-table-column>
        <!-- <el-table-column prop="applyOrgName" label="申请医院" :show-overflow-tooltip="true"></el-table-column> -->
        <el-table-column :data="docTableData" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{docTableData[0].applyOrgName}}|{{docTableData[0].applyDeptName}}
          </template>
        </el-table-column>
        <el-table-column prop="referralNo" label="编号" :show-overflow-tooltip="true"></el-table-column>
        <!-- <el-table-column prop="applyDeptName" label="申请科室" :show-overflow-tooltip="true"></el-table-column> -->
        <!-- <el-table-column prop="" label="申请人" :show-overflow-tooltip="true"></el-table-column> -->
        <!-- <el-table-column prop="phone" label="手机号" :show-overflow-tooltip="true"></el-table-column> -->
        <el-table-column prop="applyTime" label="申请时间" :show-overflow-tooltip="true"></el-table-column>
        <!-- <el-table-column prop="intention" label="目的" :show-overflow-tooltip="true"></el-table-column> -->
        <!-- <el-table-column prop="typeName" label="转诊类型" :show-overflow-tooltip="true"></el-table-column> -->
        <el-table-column prop="stateName" label="转诊状态" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="" width="450">
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
  } from "../../../api/apiAll.js";
  import { mapState } from 'vuex'

  export default {
    watch: {

    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo,
        userSelfInfo: state => state.user.userSelfInfo
      })
    },

    data() {
      return {
        docTableData: [],//医生端列表数据接收
        dualReferralRecordFile: {},
        isShowmoveUser1: false,//显示  转诊记录
        kuang2Save: true,//医生端新增框哪个保存按钮显示
        isShowaddMove: false,
        toolReferralType,//1.21.28.双向转诊-方向
        medicalId: '',//疾病ID(readMedicals  接口返回)
        referralId: "",//转诊ID
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
              {
                label: 123,
                value: 456,
                children: [
                  {
                    label: 321,
                    value: 654
                  }
                ]
              }
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
      }
    },

    methods: {
      // 医生表
      async DoctorList() {
        let _this = this;
        const options = {
          token: this.userInfo.token,
          pageNum: 1,
          pageSize: 4,
          startTime: "",//时间段返回值
          endTime: "",
          query: "",//查询数据  (不能用)用的日期筛选返回值
          direction: "",//方向：into转入，转出out
        };
        const res = await dualReferralPage(options);                  //14.5.双向转诊-WEB医生端-列表
        if (res.data && res.data.errCode === 0) {
          console.log('双向转诊医生表+成功')
          console.log(res)
          const lists = res.data.body.data2.list
          this.docTableData = lists
        } else {
          //失败
          console.log('双向转诊医生表+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
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


      async list2Done(data1, data2) {
        console.log(data1, data2)
        this.referralId = data2.referralId
        if (data1 == "UPDATE") {//编辑
          this.dualReferralUpdate(data2);
          this.kuang2Save = false
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















      // 操作区

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
          intention: this.addForm.movePurpose,//转诊目的
          diagnose: this.addForm.beginIdea,//初步诊断
          archivesAuthority: this.addForm.giveRight.value,//病历授权
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
        let query = {
          token: this.userInfo.token,
          operate: 'REFERRAL'
        };
        let options = {
          referralId: data2.referralId,//转诊ID
        };
        const res = await dualReferralReception(query, options);                                   //14.10.双向转诊-WEB医生端-接诊人操作
        if (res.data && res.data.errCode === 0) {
          console.log('医生端-转诊 (按钮)+成功')
          console.log(res)
          this.DoctorList()
        } else {
          //失败
          console.log('医生端-转诊 (按钮)+失败')
          this.$notify.error({
            title: "警告",
            message: res.data.errMsg
          });
        }
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
          $.each(res.data.body, function (index, text) {
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
                _this.addForm.intoHospital.list[index].children.push(
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








      handleChange(value) {
        console.log(value);
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
        // done();
        this.isShowaddMove = false
      },
      async goMore(data) {
        sessionStorage.setItem('page', JSON.stringify({//存缓存
          name: '双向转诊系统',
          select: false,
          path: '/referral',
          code: '80000'
        }));
        console.log(data)
        this.$router.push({
          path: "/referral",
        })
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
    components: {
    },
    async created() {
      this.DoctorList()

    }
  }
</script>

<style lang="scss" scoped>
  .oneTangRef {
    width: 100%;
    height: auto;
    background: #FFFFFF;
    border: 1px solid #EBF0F4;
    border-radius: 3px;
    padding: 12px;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .top1 {
        font-family: PingFangSC-Regular;
        font-size: 22px;
        color: #323C47;
        letter-spacing: 0;
        line-height: 28px;
      }

      .top2 {}
    }

    .body {}
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

  .primary {
    margin-top: 22px;
    width: 113px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    background: #ffffff;
    border: 1px solid #e4e8eb;
    border-radius: 5px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4285f4;
    cursor: pointer;
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

  /deep/ th {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #5E6875;
    letter-spacing: 0;
  }

  /deep/ td {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #5E6875;
    letter-spacing: 0;
  }
</style>
<!--
    医生界面
-->