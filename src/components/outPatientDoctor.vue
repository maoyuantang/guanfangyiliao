<!--
门诊系统医院管理页面


-->
<template>
  <div class="outPatientDoctor">

    <doctorTab :inData="oAdminTab" @reBack="getConsulTabData"></doctorTab>
    <!-- 我的诊室-循环 -->
    <ul v-for="" v-if="oconsulVisable==0" class="outpatient_s">
      <li class="outpatient_left">
        <p class="title">冠方医疗2.0-健康管理中心</p>
        <div class="outpatient_user">
          <img src="../assets/img/ME.png" alt="">
          <div class="outpatient_name">
            <p class="p1">Alejandro Garza</p>
            <p class="p2">接诊中…</p>
          </div>
        </div>
        <i></i>
        <tableList class="tableList" :tableData="adminTableData" :columns="columns"></tableList>
        <el-button class="startConsul" type="text" @click="centerDialogVisible = true">进入门诊</el-button>
      </li>
      <li class="outpatient_right">
        <!-- 病人个数循环 -->
        <ul v-for="" class="patientDetail">
          <li class="name">
            张某某(患者)
          </li>
          <li class="medicalExpenses">
            问诊费用<span><span>￥</span>8.00</span>
          </li>
          <li class="drug">
            <div class="fee">处方费用 ¥ <span>8.00</span></div>
            <ul>
              <li class="drugTitle">Rx:</li>
              <li>
                <ul v-for="" class="drugDetail">
                  <li>
                    <ul>
                      <li>(1)</li>
                      <li>祛痰止咳胶囊</li>
                      <li>0.45g*24粒/盒</li>
                      <li>1盒</li>
                      <li>用法: 4粒</li>
                      <li>口服</li>
                      <li>每天二次</li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li>(2)</li>
                      <li>祖卡木</li>
                      <li>12g*6袋</li>
                      <li>1盒</li>
                      <li>用法: 3片</li>
                      <li>口服</li>
                      <li>每天二次</li>
                    </ul>
                  </li>
                  <li></li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="orderTime">
            <span>下单时间:</span>
            <span class="span">2018-12-23 10:32:24</span>
          </li>
          <li class="acceptTime">
            <span>下单时间:</span>
            <span class="span">2018-12-23 10:32:24</span>
          </li>
        </ul>



      </li>
    </ul>
    <ul v-if="oconsulVisable == 1" class="prescriptionCheck">
      <li class="checkList">
        <div class="title">
          <span class="title1">审核列表</span>
          <span class="title2">...</span>
        </div>
        <ul>
          <li>
            <img src="../assets/img/ME.png" alt="头像">
            <div>
              <p class="name">Sally Castro</p>
              <p class="depart">问诊医生: <span>王医生</span> | <span>健康中心患者</span></p>
            </div>
          </li>
          <li>
            <img src="../assets/img/ME.png" alt="头像">
            <div>
              <p class="name">Sally Castro</p>
              <p class="depart">问诊医生: <span>王医生</span> | <span>健康中心患者</span></p>
            </div>
          </li>
          <li>
            <img src="../assets/img/ME.png" alt="头像">
            <div>
              <p class="name">Sally Castro</p>
              <p class="depart">问诊医生: <span>王医生</span> | <span>健康中心患者</span></p>
            </div>
          </li>
        </ul>
      </li>
      <li class="waitPeople">
        <ul>
          <li>
            <ul class="title">
              <li class="wait">
                <i class="iconfont">&#xe8c0;</i>
                <span>等待审方人数</span>
              </li>
              <li class="num">15</li>
            </ul>
          </li>
          <li class="wait1">
            <ul>
              <li class="name">道明寺</li>
              <li class="gender">性别: <span>男</span></li>
              <li class="age">年龄: <span>23</span></li>
              <li class="birthday">出生日期: <span>1988-02-26</span></li>
              <li class="phoneNumber">联系方式: <span>18952645896</span></li>
              <li class="address">常用地址: <span>黑龙江省哈尔滨市绥化地区</span></li>

            </ul>
          </li>
          <li class="wait2">
            <ul>
              <li class="patientNumber">门诊号: <span>23568459</span></li>
              <li class="feeType">费别: <span>自费</span></li>
              <li class="medicalInsurance">医保类型: <span>职工医保</span></li>
            </ul>
          </li>
          <li class="wait3">
            <ul>
              <li class="healDoctor">开方医生: <span>黄某人</span></li>
              <li class="checkDoctor">审方医生: <span>李某人</span></li>
              <li class="giveDoctor">发药医生: <span>sdafdas</span></li>
            </ul>
          </li>
        </ul>
      </li>
      <li class="prescriptionDetail">
        <ul>
          <li class="detailHead">

          </li>
          <li class="detailCount">
            <div class="sign">
              <ul>
                <li>主诉: <span>四岁宝宝偶尔干咳,没有其他任何症状</span></li>
                <li>现病史: <span>干咳一个月 白天咳嗽 夜晚不咳嗽 干咳无痰 检查喉咙无红肿</span></li>
                <li>过敏史: <span>无</span></li>
                <li>门诊诊断: <span>气候变化引起的支气管过敏</span></li>
              </ul>
            </div>
            <div class="result">
              <div class="front">
                <ul>
                  <li>
                    <el-checkbox v-model="checked1">疫情报告</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox v-model="checked2">复诊</el-checkbox>
                  </li>
                  <li>
                    <div class="block">
                      <span class="demonstration">发病日期： </span>
                      <el-date-picker @blur="demonstration1" v-model="value1" align="right" type="date" placeholder="选择日期">
                      </el-date-picker>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="behind">
                <div class="block">
                  <span class="demonstration">下次复查日期: </span>
                  <el-date-picker @blur="demonstration2" v-model="value2" align="right" type="date" placeholder="选择日期">
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="dates">
              <ul>
                <li class="orderTime">
                  <span>下单时间:</span>
                  <span class="span">2018-12-23 10:32:24</span>
                </li>
                <li class="acceptTime">
                  <span>接诊时间:</span>
                  <span class="span">2018-12-23 10:32:24</span>
                </li>
              </ul>
            </div>
          </li>
          <li class="detailList">
            <search @searchValue="adminSearchChange"></search>
            <div class="listBao">
              <div class="lists">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="serialNumber" label="序号">
                  </el-table-column>
                  <el-table-column prop="DrugName" label="药品名称">
                  </el-table-column>
                  <el-table-column prop="usage" label="用法">
                  </el-table-column>
                  <el-table-column prop="frequency" label="频率">
                  </el-table-column>
                  <el-table-column prop="dose" label="用量">
                  </el-table-column>
                  <el-table-column prop="unitPrice" label="单价">
                  </el-table-column>
                  <el-table-column prop="quantity" label="数量">
                  </el-table-column>
                  <el-table-column prop="total" label="合计">
                  </el-table-column>
                  <el-table-column prop="suggest" label="医生嘱托">
                  </el-table-column>
                  <el-table-column prop="delect" label="删除">
                  </el-table-column>
                </el-table>
              </div>
              <div class="totals">
                <div class="totalMoney">总金额: <span>109</span></div>
              </div>
            </div>
          </li>
          <li class="detailFooter">
            <el-button class="preview" type="primary" @click="dialogTableVisible = true" plain>预览</el-button>
            <el-button class="fail" type="info">不通过</el-button>
            <el-button class="success" type="success">生成电子处方</el-button>
          </li>
        </ul>
      </li>
    </ul>



    <ul v-if="oconsulVisable == 2" class="transport">
      <li class="checkList">
        <div class="title">
          <span class="title1">审核列表</span>
          <span class="title2">...</span>
        </div>
        <ul>
          <li>
            <img src="../assets/img/ME.png" alt="头像">
            <div>
              <p class="name">Sally Castro</p>
              <p class="depart">问诊医生: <span>王医生</span> | <span>健康中心患者</span></p>
            </div>
          </li>
          <li>
            <img src="../assets/img/ME.png" alt="头像">
            <div>
              <p class="name">Sally Castro</p>
              <p class="depart">问诊医生: <span>王医生</span> | <span>健康中心患者</span></p>
            </div>
          </li>
          <li>
            <img src="../assets/img/ME.png" alt="头像">
            <div>
              <p class="name">Sally Castro</p>
              <p class="depart">问诊医生: <span>王医生</span> | <span>健康中心患者</span></p>
            </div>
          </li>
        </ul>
      </li>
      <li class="waitPeople">
        <ul>
          <li>
            <ul class="title">
              <li class="wait">
                <i class="iconfont">&#xe8c0;</i>
                <span>等待发药人数</span>
              </li>
              <li class="num">15</li>
            </ul>
          </li>
          <li class="wait1">
            <ul>
              <li class="name">道明寺</li>
              <li class="gender">性别: <span>男</span></li>
              <li class="age">年龄: <span>23</span></li>
              <li class="birthday">出生日期: <span>1988-02-26</span></li>
              <li class="phoneNumber">联系方式: <span>18952645896</span></li>
              <li class="address">常用地址: <span>黑龙江省哈尔滨市绥化地区</span></li>

            </ul>
          </li>
          <li class="wait2">
            <ul>
              <li class="patientNumber">门诊号: <span>23568459</span></li>
              <li class="feeType">费别: <span>自费</span></li>
              <li class="medicalInsurance">医保类型: <span>职工医保</span></li>
            </ul>
          </li>
          <li class="wait3">
            <ul>
              <li class="healDoctor">开方医生: <span>黄某人</span></li>
              <li class="checkDoctor">审方医生: <span>李某人</span></li>
              <li class="giveDoctor">发药医生: <span>sdafdas</span></li>
            </ul>
          </li>
        </ul>
      </li>
      <li class="prescriptionDetail">
        <ul>
          <li class="detailHead">

          </li>
          <li class="detailCount">
            <div class="sign">
              <ul>
                <li>主诉: <span>四岁宝宝偶尔干咳,没有其他任何症状</span></li>
                <li>现病史: <span>干咳一个月 白天咳嗽 夜晚不咳嗽 干咳无痰 检查喉咙无红肿</span></li>
                <li>过敏史: <span>无</span></li>
                <li>门诊诊断: <span>气候变化引起的支气管过敏</span></li>
              </ul>
            </div>
            <div class="result">
              <div class="front">
                <ul>
                  <li>
                    <el-checkbox v-model="checked1">疫情报告</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox v-model="checked2">复诊</el-checkbox>
                  </li>
                  <li>
                    <div class="block">
                      <span class="demonstration">发病日期： </span>
                      <el-date-picker @blur="demonstration1" v-model="value1" align="right" type="date" placeholder="选择日期">
                      </el-date-picker>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="behind">
                <div class="block">
                  <span class="demonstration">下次复查日期: </span>
                  <el-date-picker @blur="demonstration2" v-model="value2" align="right" type="date" placeholder="选择日期">
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="dates">
              <ul>
                <li class="orderTime">
                  <span>下单时间:</span>
                  <span class="span">2018-12-23 10:32:24</span>
                </li>
                <li class="acceptTime">
                  <span>接诊时间:</span>
                  <span class="span">2018-12-23 10:32:24</span>
                </li>
              </ul>
            </div>
          </li>
          <li class="detailList">
            <search @searchValue="adminSearchChange"></search>
            <div class="listBao">
              <div class="lists">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="serialNumber" label="序号">
                  </el-table-column>
                  <el-table-column prop="DrugName" label="药品名称">
                  </el-table-column>
                  <el-table-column prop="usage" label="用法">
                  </el-table-column>
                  <el-table-column prop="frequency" label="频率">
                  </el-table-column>
                  <el-table-column prop="dose" label="用量">
                  </el-table-column>
                  <el-table-column prop="unitPrice" label="单价">
                  </el-table-column>
                  <el-table-column prop="quantity" label="数量">
                  </el-table-column>
                  <el-table-column prop="total" label="合计">
                  </el-table-column>
                  <el-table-column prop="suggest" label="医生嘱托">
                  </el-table-column>
                  <el-table-column prop="delect" label="删除">
                  </el-table-column>
                </el-table>
              </div>
              <div class="totals">
                <div class="totalMoney">总金额: <span>109</span></div>
              </div>
            </div>
          </li>
          <li class="detailFooter">
            <el-button class="preview" type="primary" @click="dialogTableVisible = true" plain>预览</el-button>
            <el-button class="ship" type="primary" plain>发货</el-button>
          </li>
        </ul>
      </li>

    </ul>

    <!-- 进入诊室弹窗 -->
    <el-dialog class="startGroup" title="进入诊室" :visible.sync="centerDialogVisible" width="602px" hight="607px" center>
      dgasgasddgas
    </el-dialog>
    <!-- 预览弹窗 -->
    <el-dialog title="预览" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="serialNumber" label="序号">
        </el-table-column>
        <el-table-column property="DrugName" label="药品名称">
        </el-table-column>
        <el-table-column property="usage" label="用法">
        </el-table-column>
        <el-table-column property="frequency" label="频率">
        </el-table-column>
        <el-table-column property="dose" label="用量">
        </el-table-column>
        <el-table-column property="unitPrice" label="单价">
        </el-table-column>
        <el-table-column property="quantity" label="数量">
        </el-table-column>
        <el-table-column property="total" label="合计">
        </el-table-column>
        <el-table-column property="suggest" label="医生嘱托">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import doctorTab from '../public/publicComponents/doctorTab.vue'
  import tableList from "../public/publicComponents/publicListNo.vue";
  import search from "../public/publicComponents/search.vue";
  export default {
    components: {
      doctorTab,
      tableList,
      search
    },
    data() {
      return {
        checked1: true,
        checked2: false,
        value1: '',
        value2: '',
        searchValue: "",
        oAdminTab: {
          i: 0, //选中的是第几项，类型为int(注意：从0开始计数)
          list: [
            //选项列表，类型Array
            {
              // en: "", //选项英文，类型 string
              zh: "我的诊室" //选项中文，类型string
            },
            {
              // en: "",
              zh: "处方审核"
            },
            {
              // en: "",
              zh: "药品配送"
            }
          ]
        },
        columns: [
          {
            prop: "noOver",
            label: "待处理"
          },
          {
            prop: "overed",
            label: "已处理"
          },
          {
            prop: "otherDocter",
            label: "其他医生"
          }
        ],
        adminTableData: [
          {
            noOver: "11111",
            overed: "22222",
            otherDocter: "sdafadsf",
            oclass: "redColor"
          }
        ],
        centerDialogVisible: false,
        oconsulVisable: 0,
        //药物详情
        tableData: [
          {
            serialNumber: '01',
            DrugName: '阿莫西林胶囊',
            usage: '口服',
            frequency: '一天两次',
            dose: '一粒',
            unitPrice: '25',
            quantity: '1',
            total: '25',
            suggest: '饭后使用',
            delect: '删除',
          }, {
            serialNumber: '01',
            DrugName: '阿莫西林胶囊',
            usage: '口服',
            frequency: '一天两次',
            dose: '一粒',
            unitPrice: '25',
            quantity: '1',
            total: '25',
            suggest: '饭后使用',
            delect: '删除',
          },
        ],
        //预览
        gridData: [
          {
            serialNumber: '01',
            DrugName: '阿莫西林胶囊',
            usage: '口服',
            frequency: '一天两次',
            dose: '一粒',
            unitPrice: '25',
            quantity: '1',
            total: '25',
            suggest: '饭后使用',
            delect: '删除',
          }, {
            serialNumber: '01',
            DrugName: '阿莫西林胶囊',
            usage: '口服',
            frequency: '一天两次',
            dose: '一粒',
            unitPrice: '25',
            quantity: '1',
            total: '25',
            suggest: '饭后使用',
          },
        ],
        dialogTableVisible: false,
      }

    },
    methods: {
      getConsulTabData(res) {
        // alert(res.i)
        this.oconsulVisable = res.i
      },
      demonstration1(res) {
        console.log(res)
      },
      demonstration2(res) {
        console.log(res)
      },
      adminSearchChange(data) {
        alert()
        this.searchValue = data;
        // console.log(data)
      }

    },
    async created() {

    }
  }
</script>

<style lang="scss" scoped>
  .outpatient_s {
    display: flex;
    background: #fff;
    margin: 60px 0 0 0;
    padding: 0.3rem 0;
    background: #FFFFFF;
    border: 1px solid #E5EDF3;
    box-shadow: 0 6px 36px 0 rgba(0, 62, 100, 0.04);
    border-radius: 4px;
    width: 98%;

    .outpatient_left {
      width: 30%;
      display: -webkit-flex;
      flex-direction: column;

      .title {
        font-family: PingFangSC-Semibold;
        font-size: 0.15rem;
        color: #002257;
        letter-spacing: 0.1px;
        margin: 0px 0 30px 30px;
      }

      .outpatient_user {
        display: flex;
        align-items: center;
        margin: 10px 0 30px 30px;


        img {
          width: 0.74rem;
          height: 0.74rem;
          border-radius: 50%;
        }

        .outpatient_name {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 10px 0 10px 10px;


          .p1 {
            font-family: OpenSans-Semibold;
            font-size: 15px;
            color: #002257;
            letter-spacing: 0.1px;
          }

          .p2 {
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #97A3B4;
            line-height: 22px;
            margin: 7px 0 0 0;
          }
        }
      }

      i {
        border: 1px solid #E4E8EE;
        width: 70%;
        margin: 0 0 0 7%;
      }

      .tableList {
        width: 70%;
        margin: 0px 0 0 6%;
      }

      .startConsul {
        width: 60%;
        height: 0.4rem;
        background: #4da1ff;
        border-radius: 4px;
        font-family: PingFangSC-Semibold;
        font-size: 22px;
        color: #ffffff;
        letter-spacing: 0.92px;
        text-align: center;
        line-height: 0px;
        margin: 0.4rem 0 1rem 6%;
      }
    }

    .outpatient_right {
      display: -webkit-flex;
      flex-direction: column;
      border-left: 1px solid #E7EDF3;
      padding: 0 0 0 0.3rem;
      width: 70%;

      .patientDetail {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 0.18rem 0 0 0;

        .name {
          ont-family: PingFangSC-Regular;
          font-size: 13px;
          color: #002257;
          line-height: 22px;
          margin: 0 0 0.1rem 0;
        }

        .medicalExpenses {
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #97A3B4;
          line-height: 22px;
          margin: 0 0 0.1rem 0;

          span {
            font-family: OpenSans-Semibold;
            font-size: 13px;
            color: #0064FF;
          }
        }

        .drug {
          border: 1px solid #E9EFF4;
          border-left: 1px solid blue;
          margin: 0 0 0.1rem 0;
          padding: 0.1rem 0 0.1rem 0.15rem;
          position: relative;
          width: 90%;

          .fee {
            position: absolute;
            bottom: 0.1rem;
            right: 0.1rem;
            font-family: PingFangSC-Semibold;
            font-size: 13px;
            color: #0064FF;
            text-align: right;
          }

          ul {
            display: flex;

            li {
              ul {
                display: flex;
                flex-direction: column;
                margin: 0 0 0 0.04rem;

                li {
                  ul {
                    display: flex;
                    flex-direction: row;

                    li {
                      min-width: 1rem;
                      font-family: OpenSans;
                      font-size: 13px;
                      color: #002257;
                      line-height: 22px;
                      margin: 0 0.2rem 0 0;
                    }

                    li:first-child {
                      min-width: 0;
                      margin: 0;
                      margin-right: 0.08rem;
                    }
                  }

                }
              }
            }
          }
        }

        .orderTime {
          margin: 0 0 0.1rem 0;

          span {
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #97A3B4;
            line-height: 22px;
          }

          .span {
            color: red;
          }
        }

        .acceptTime {
          span {
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #97A3B4;
            line-height: 22px;
            margin: 0 0 0.1rem 0;
          }

          .span {
            color: red;
          }
        }
      }
    }



    .startGroup input {
      width: 162px;
      height: 28px;
    }
  }

  .prescriptionCheck {
    display: flex;
    height: 100%;
    margin: 0.4rem 0 0 0;

    .checkList {
      width: 23%;
      background: #FFFFFF;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
      border-radius: 3px 3px 0 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0.1rem 0.2rem;
      height: 100%;

      .title {
        display: flex;
        justify-content: space-between;
        align-content: center;

        .title1 {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #5C5C5C;
          padding-top: 0.1rem;
        }

        .title2 {
          font-family: PingFangSC-Regular;
          font-size: 20px;
          color: #5C5C5C;
          letter-spacing: 0;
          font-weight: bold;
        }
      }

      ul {
        display: flex;
        flex-direction: column;
        padding: 0.17rem 0;

        li {
          display: flex;
          margin: 0.1rem 0;
          align-items: center;


          img {
            width: 0.36rem;
            height: 0.36rem;
            border-radius: 50%;
            margin: 0 0.1rem 0 0;
          }

          div {
            display: flex;
            flex-direction: column;

            .name {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #1B1E24;
            }

            .depart {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #98A9BC;
              letter-spacing: 0.2px;
              line-height: 21px;
            }
          }
        }
      }
    }

    .waitPeople {
      width: 15%;
      height: 95%;
      background: #FFFFFF;
      border: 1px solid #E4E8EB;
      border-radius: 0 0 3px 3px;
      margin: 0 0 0 0.3rem;
      display: flex;
      flex-direction: column;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.12rem;
        border-left: 3px solid #4285F4;

        .wait {
          display: flex;
          justify-content: space-between;
          align-items: center;

          i {
            font-size: 20px;
            color: blue;
          }

          span {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #4285F4;
            letter-spacing: 0;
            margin: 0 0 0 0.05rem;
          }
        }

        .num {
          font-family: PingFangSC-Regular;
          font-size: 22px;
          color: #4285F4;
          letter-spacing: 0;
          line-height: 22px;
        }
      }

      .wait1 {
        margin: 0.1rem 0.15rem;
        padding: 0 0 0.05rem 0;
        border-bottom: 1px solid #E4E8EB;

        ul {
          li {
            opacity: 0.8;
            font-family: PingFangSC-Light;
            font-size: 12px;
            color: #212223;
            line-height: 20px;
            margin: 0 0 0.1rem 0;
            letter-spacing: 0.005rem;
          }

          .name {
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: black;
            line-height: 20px;
          }
        }
      }

      .wait2 {
        padding: 0.1rem 0.15rem;
        border-bottom: 1px solid #E4E8EB;

        ul {
          li {
            opacity: 0.8;
            font-family: PingFangSC-Light;
            font-size: 12px;
            color: #212223;
            line-height: 20px;
            margin: 0 0 0.1rem 0;
          }

        }
      }

      .wait3 {
        padding: 0.1rem 0.15rem;

        ul {
          li {
            opacity: 0.8;
            font-family: PingFangSC-Light;
            font-size: 12px;
            color: #212223;
            line-height: 20px;
            margin: 0 0 0.1rem 0;
          }

        }
      }

    }

    .prescriptionDetail {
      width: 55%;
      height: 95%;
      /* background: #FFFFFF; */
      /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.20); */
      margin: 0 0 0 0.2rem;

      ul {
        height: 100%;

        .detailHead {
          width: 100%;
          height: 5%;
          background: #FFFFFF;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.20);
          margin: 0 0 2% 0;
        }

        .detailCount {
          width: 100%;
          height: 38%;
          background: #FFFFFF;
          border: 1px solid #E4E8EB;
          border-radius: 3px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 0 0.25rem 0 0.35rem;

          .sign {
            ul {
              display: flex;
              flex-direction: column;
              justify-content: space-around;

              li {
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #212223;
                line-height: 0.25rem;
                font-weight: bold;

                span {
                  font-family: PingFangSC-Light;
                  font-size: 14px;
                  color: #0F1011;
                  line-height: 30px;
                  font-weight: normal;
                }
              }
            }
          }

          .result {
            display: flex;
            justify-content: space-between;

            .front {
              ul {
                display: flex;
                justify-content: space-around;
                align-items: center;

                li {
                  margin: 0 0.25rem 0 0;
                  font-family: PingFangSC-Light;
                  font-size: 14px;
                  color: #212223;
                  line-height: 20px;

                  .demonstration {
                    font-family: PingFangSC-Light;
                    font-size: 14px;
                    color: #212223;
                    line-height: 20px;
                  }
                }
              }
            }

            .behind {
              .demonstration {
                font-family: PingFangSC-Light;
                font-size: 14px;
                color: #212223;
                line-height: 20px;
              }
            }
          }

          .dates {
            ul {
              .orderTime {
                margin: 0 0 0.1rem 0;

                span {
                  font-family: PingFangSC-Regular;
                  font-size: 13px;
                  color: #97A3B4;
                  line-height: 22px;
                }

                .span {
                  color: red;
                }
              }

              .acceptTime {
                span {
                  font-family: PingFangSC-Regular;
                  font-size: 13px;
                  color: #97A3B4;
                  line-height: 22px;
                  margin: 0 0 0.1rem 0;
                }

                .span {
                  color: red;
                }
              }
            }
          }
        }

        .detailList {
          width: 100%;
          height: 41%;
          /* background: #FFFFFF; */
          border-radius: 3px;
          margin: 3% 0 0 0;

          .listBao {
            margin: 3% 0 0 0;
            height: 85%;
            overflow-y: scroll;

            .lists {
              margin: 0.3rem 0 0 0;
            }

            .totals {
              height: 0.5rem;
              position: relative;

              .totalMoney {
                color: red;
                font-family: PingFangSC-Semibold;
                font-size: 14px;
                color: #5E6875;
                letter-spacing: 0;
                margin: 0 0 0 0;
                position: absolute;
                right: 20%;
                bottom: 20%;
              }
            }
          }
        }

        .detailFooter {
          width: 100%;
          height: 8%;
          margin: 2.5% 0 0 0;
          background: #FFFFFF;
          border: 1px solid #E4E8EB;
          display: flex;
          align-items: center;
          position: relative;

          .preview {
            position: absolute;
            right: 3rem;
          }

          .fail {
            position: absolute;
            right: 2rem;
          }

          .success {
            position: absolute;
            right: 0.5rem;
          }
        }
      }
    }
  }

  .transport {
    display: flex;
    height: 100%;
    margin: 0.4rem 0 0 0;

    .checkList {
      width: 23%;
      background: #FFFFFF;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
      border-radius: 3px 3px 0 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0.1rem 0.2rem;
      height: 100%;

      .title {
        display: flex;
        justify-content: space-between;
        align-content: center;

        .title1 {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #5C5C5C;
          padding-top: 0.1rem;
        }

        .title2 {
          font-family: PingFangSC-Regular;
          font-size: 20px;
          color: #5C5C5C;
          letter-spacing: 0;
          font-weight: bold;
        }
      }

      ul {
        display: flex;
        flex-direction: column;
        padding: 0.17rem 0;

        li {
          display: flex;
          margin: 0.1rem 0;
          align-items: center;


          img {
            width: 0.36rem;
            height: 0.36rem;
            border-radius: 50%;
            margin: 0 0.1rem 0 0;
          }

          div {
            display: flex;
            flex-direction: column;

            .name {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #1B1E24;
            }

            .depart {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #98A9BC;
              letter-spacing: 0.2px;
              line-height: 21px;
            }
          }
        }
      }
    }

    .waitPeople {
      width: 15%;
      height: 95%;
      background: #FFFFFF;
      border: 1px solid #E4E8EB;
      border-radius: 0 0 3px 3px;
      margin: 0 0 0 0.3rem;
      display: flex;
      flex-direction: column;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.12rem;
        border-left: 3px solid #4285F4;

        .wait {
          display: flex;
          justify-content: space-between;
          align-items: center;

          i {
            font-size: 20px;
            color: blue;
          }

          span {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #4285F4;
            letter-spacing: 0;
            margin: 0 0 0 0.05rem;
          }
        }

        .num {
          font-family: PingFangSC-Regular;
          font-size: 22px;
          color: #4285F4;
          letter-spacing: 0;
          line-height: 22px;
        }
      }

      .wait1 {
        margin: 0.1rem 0.15rem;
        padding: 0 0 0.05rem 0;
        border-bottom: 1px solid #E4E8EB;

        ul {
          li {
            opacity: 0.8;
            font-family: PingFangSC-Light;
            font-size: 12px;
            color: #212223;
            line-height: 20px;
            margin: 0 0 0.1rem 0;
            letter-spacing: 0.005rem;
          }

          .name {
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: black;
            line-height: 20px;
          }
        }
      }

      .wait2 {
        padding: 0.1rem 0.15rem;
        border-bottom: 1px solid #E4E8EB;

        ul {
          li {
            opacity: 0.8;
            font-family: PingFangSC-Light;
            font-size: 12px;
            color: #212223;
            line-height: 20px;
            margin: 0 0 0.1rem 0;
          }

        }
      }

      .wait3 {
        padding: 0.1rem 0.15rem;

        ul {
          li {
            opacity: 0.8;
            font-family: PingFangSC-Light;
            font-size: 12px;
            color: #212223;
            line-height: 20px;
            margin: 0 0 0.1rem 0;
          }

        }
      }

    }

    .prescriptionDetail {
      width: 55%;
      height: 95%;
      /* background: #FFFFFF; */
      /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.20); */
      margin: 0 0 0 0.2rem;

      ul {
        height: 100%;

        .detailHead {
          width: 100%;
          height: 5%;
          background: #FFFFFF;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.20);
          margin: 0 0 2% 0;
        }

        .detailCount {
          width: 100%;
          height: 38%;
          background: #FFFFFF;
          border: 1px solid #E4E8EB;
          border-radius: 3px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 0 0.25rem 0 0.35rem;

          .sign {
            ul {
              display: flex;
              flex-direction: column;
              justify-content: space-around;

              li {
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #212223;
                line-height: 0.25rem;
                font-weight: bold;

                span {
                  font-family: PingFangSC-Light;
                  font-size: 14px;
                  color: #0F1011;
                  line-height: 30px;
                  font-weight: normal;
                }
              }
            }
          }

          .result {
            display: flex;
            justify-content: space-between;

            .front {
              ul {
                display: flex;
                justify-content: space-around;
                align-items: center;

                li {
                  margin: 0 0.25rem 0 0;
                  font-family: PingFangSC-Light;
                  font-size: 14px;
                  color: #212223;
                  line-height: 20px;

                  .demonstration {
                    font-family: PingFangSC-Light;
                    font-size: 14px;
                    color: #212223;
                    line-height: 20px;
                  }
                }
              }
            }

            .behind {
              .demonstration {
                font-family: PingFangSC-Light;
                font-size: 14px;
                color: #212223;
                line-height: 20px;
              }
            }
          }

          .dates {
            ul {
              .orderTime {
                margin: 0 0 0.1rem 0;

                span {
                  font-family: PingFangSC-Regular;
                  font-size: 13px;
                  color: #97A3B4;
                  line-height: 22px;
                }

                .span {
                  color: red;
                }
              }

              .acceptTime {
                span {
                  font-family: PingFangSC-Regular;
                  font-size: 13px;
                  color: #97A3B4;
                  line-height: 22px;
                  margin: 0 0 0.1rem 0;
                }

                .span {
                  color: red;
                }
              }
            }
          }
        }

        .detailList {
          width: 100%;
          height: 41%;
          /* background: #FFFFFF; */
          border-radius: 3px;
          margin: 3% 0 0 0;

          .listBao {
            margin: 3% 0 0 0;
            height: 85%;
            overflow-y: scroll;

            .lists {
              margin: 0.3rem 0 0 0;
            }

            .totals {
              height: 0.5rem;
              position: relative;

              .totalMoney {
                color: red;
                font-family: PingFangSC-Semibold;
                font-size: 14px;
                color: #5E6875;
                letter-spacing: 0;
                margin: 0 0 0 0;
                position: absolute;
                right: 20%;
                bottom: 20%;
              }
            }
          }
        }

        .detailFooter {
          width: 100%;
          height: 8%;
          margin: 2.5% 0 0 0;
          background: #FFFFFF;
          border: 1px solid #E4E8EB;
          display: flex;
          align-items: center;
          position: relative;

          .preview {
            position: absolute;
            right: 1.5rem;
          }

          .ship {
            position: absolute;
            right: 0.5rem;
          }
        }
      }
    }
  }
</style>