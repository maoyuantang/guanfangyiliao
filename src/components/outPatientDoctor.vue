<!--
门诊系统医院管理页面


-->
<template>
  <div class="outPatientDoctor">
    <doctorTab :inData="oAdminTab" @reBack="getConsulTabData"></doctorTab>
    <!-- 我的诊室-循环 -->
    <ul v-for="" class="outpatient_s">
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
      </li>
      <li class="outpatient_right">sdfasdf</li>
    </ul>
  </div>
</template>

<script>
  import doctorTab from '../public/publicComponents/doctorTab.vue'
  import tableList from "../public/publicComponents/publicListNo.vue";

  export default {
    components: {
      doctorTab,
      tableList,
    },
    data() {
      return {
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
          otherDocter:"sdafadsf",
          oclass: "redColor"
        },
        {
          noOver: "11111",
          overed: "22222",
          otherDocter:"sdafadsf",
          oclass: "redColor"
        },
        {
          noOver: "11111",
          overed: "22222",
          otherDocter:"sdafadsf",
          oclass: "redColor"
        }
      ],
      }
    },
    methods: {
      getConsulTabData(res) {
        if (res.i == 0) {
          this.oconsulVisable = true;
        } else if (res.i == 1) {
          this.oconsulVisable = false;
        }
      },
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
    background: #FFFFFF;
    border: 1px solid #E5EDF3;
    box-shadow: 0 6px 36px 0 rgba(0, 62, 100, 0.04);
    border-radius: 4px;

    .outpatient_left {
      width: 5rem;
      display: -webkit-flex;
      flex-direction: column;

      .title {
        font-family: PingFangSC-Semibold;
        font-size: 0.15rem;
        color: #002257;
        letter-spacing: 0.1px;
        margin: 30px 0 30px 30px;
      }

      .outpatient_user {
        display: flex;
        align-items: center;


        img {
          width: 0.74rem;
          height: 0.74rem;
          border-radius: 50%;
          margin: 10px 0 40px 30px;
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
        width: 60%;
        margin: 0 0 0 7%;
      }

      .tableList {
        width: 60%;
        margin: 0px 0 0 6%;

      }
    }

    .outpatient_right {
      display: -webkit-flex;
      flex-direction: column;
    }
  }
</style>