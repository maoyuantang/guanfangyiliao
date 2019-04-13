<!--
医生端未处理：  处方单  预览   查看档案

点击生成处方，7.9审核处方，后台返回审方医生id未null，无法请求
-->
<template>
    <div class="outPatientDoctor">
        <doctorTab :inData="oAdminTab" @reBack="getConsulTabData"></doctorTab>

        <!-- 我的诊室-循环 -->

        <div class="myOuts" v-if="oconsulVisable==0">
            <ul v-for="(text,index1) in myHomes" :key="index1" class="outpatient_s">
                <li class="outpatient_left">
                    <!-- <p class="title">{{text.orgName}}-{{text.clinicName}}</p> -->
                    <p class="title">{{text.clinicName}}</p>
                    <div class="outpatient_user">
                        <img v-if="text.doctor[0].headId == null" src="../assets/img/a-6.png" alt="医生头像">
                        <img v-if="text.doctor[0].headId"
                            :src='"https://demo.chuntaoyisheng.com:10002/m/v1/api/hdfs/fs/download/"+text.doctor[0].headId'
                            alt="医生头像">
                        <div class="outpatient_name">
                            <p class="p1">{{text.doctor[0].doctorName}}</p>
                            <p class="p2">{{text.doctor[0].doctorStates?'接诊中...':'未接诊'}}</p>
                        </div>
                    </div>
                    <i></i>
                    <div v-for="(text,index) in tableDataList1" :key="index" v-if='myHomesBiao[index1]==index'
                        style="width: 90%;margin: auto;">
                        <el-table :data="text" :cell-class-name="ceshi0" :header-cell-style="rowClass">
                            <el-table-column prop="unProcess" label="未处理"></el-table-column>
                            <el-table-column prop="process" label="已处理"></el-table-column>
                            <el-table-column prop="doctorCount" label="其他医生"></el-table-column>
                        </el-table>
                    </div>
                    <el-button class="startConsul" type="text" @click="enterRoomBtn(text)">进入诊室</el-button>

                </li>

                <li class="outpatient_right">
                    <!-- 病人个数循环 -->
                    <noData v-if="text.clinicOrders.length == 0"></noData>
                    <span class="dian" @click="lookList(text)" v-if="text.clinicOrders.length != 0">...</span>
                    <ul v-for="(text1,index) in text.clinicOrders" :key="index" class="patientDetail" v-show="index <2"
                        v-if="text.clinicOrders.length != 0">

                        <li class="name" style="display:-webkit-flex;justify-content: space-between;width: 90%;">
                            <h1>{{text1.userName}}</h1>
                            <div style="display:-webkit-flex;justify-content: space-around;margin: 0 0.1rem 0 0">
                                <span class="tanKuang1" @click="seeHistory(text1.userId)">查看档案</span>
                                <button class="tanKuang2" @click="sendMessage(text,text1)"
                                    :disabled="text1.disabledStatus">发送</button>
                                <div class="tanKuang3">{{text1.orderState}}</div>
                                <!-- <el-button type="success" plain @click="seeHistory(text1.userId)">查看档案</el-button> -->
                                <!-- <el-button type="danger" @click="sendMessage(text,text1)">发送</el-button> -->
                                <!-- <el-button type="info" plain>{{text.doctor.doctorStates?'未开始':'进行中'}}</el-button> -->
                            </div>
                        </li>
                        <li class="medicalExpenses">
                            问诊费用
                            <span>
                                <span>￥</span>
                                {{text1.askPrice}}
                            </span>
                        </li>
                        <li class="drug" v-if="text1.drugDetail.length != 0">
                            <!-- <li class="drug"> -->
                            <div class="fee">处方费用 ¥
                                <span>{{text1.prescriptionPrice}}</span>
                            </div>
                            <ul style="margin: 0 0 20px 0;">
                                <li class="drugTitle">Rx:</li>
                                <li>
                                    <ul class="drugDetail">
                                        <li>
                                            <ul v-for="(text,index) in text1.drugDetail" :key="index">
                                                <li>（{{index+1}}）</li>
                                                <li>{{text.drugName}}</li>
                                                <li>{{text.norm}}</li>
                                                <li>{{text.drugQuantity}}</li>
                                                <li>{{text.drugDosage}}</li>
                                                <li>{{text.drugUse}}</li>
                                                <li>{{text.drugTimes}}</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="orderTime">
                            <span>下单时间:</span>
                            <span class="span">{{text1.clinicOrderTime}}</span>
                        </li>
                        <li class="acceptTime">
                            <span>接诊时间:</span>
                            <span class="span">{{text1.askTime}}</span>
                        </li>
                    </ul>

                </li>
            </ul>
        </div>

        <ul v-if="oconsulVisable == 1" class="prescriptionCheck">
            <li class="checkList">
                <div class="title">
                    <span class="title1">审核列表</span>
                    <span class="title2">...</span>
                </div>
                <div class="div">
                    <ul v-for="(text,index) in bcd" :key="index" @click='whichUserFun(index,text)'
                        :class="whichUser==index?'backgroundUser':''">
                        <li>
                            <img v-if="text.headId == null" src="../assets/img/a-6.png" alt="医生头像">
                            <img v-if="text.headId"
                                :src='"https://demo.chuntaoyisheng.com:10002/m/v1/api/hdfs/fs/download/"+text.headId'
                                alt="医生头像">
                            <div>
                                <p class="name">{{text.userName}}</p>
                                <p class="depart">问诊医生:
                                    <span>{{text.createDoctor}}</span> |
                                    <span>{{text.clinicName}}</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
            <li v-for="(text,index) in bcd" :key="index+ '-label'" v-show='whichUser==index' class="waitPeople">

                <ul>
                    <li>
                        <ul class="title">
                            <li class="wait">
                                <i class="iconfont">&#xe8c0;</i>
                                <span>等待审方人数</span>
                            </li>
                            <li class="num">{{text.number}}</li>
                        </ul>
                    </li>
                    <li class="wait1">
                        <ul>
                            <li class="name">{{text.userName}}</li>
                            <li class="gender">性别:
                                <span>{{text.userSex}}</span>
                            </li>
                            <li class="age">年龄:
                                <span>{{text.userAge}}</span>
                            </li>
                            <li class="birthday">出生日期:
                                <span>{{text.birthday}}</span>
                            </li>
                            <li class="phoneNumber">联系方式:
                                <span>{{text.phone}}</span>
                            </li>
                            <li class="address">常用地址:
                                <span>{{text.address}}</span>
                            </li>

                        </ul>
                    </li>
                    <li class="wait2">
                        <ul>
                            <li class="patientNumber">门诊号:
                                <span>{{text.clinicId}}</span>
                            </li>
                            <li class="feeType">费别:
                                <span>{{text.priceDesc}}</span>
                            </li>
                            <li class="medicalInsurance">医保类型:
                                <span>{{text.medicalInsurance}}</span>
                            </li>
                        </ul>
                    </li>
                    <li class="wait3">
                        <ul>
                            <li class="healDoctor">开方医生:
                                <span>{{text.createDoctor}}</span>
                            </li>
                            <li class="checkDoctor">审方医生:
                                <span>{{text.reviewDoctor}}</span>
                            </li>
                            <li class="giveDoctor">发药医生:
                                <span>{{text.sendDoctor}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li v-for="(text,index) in bcd" :key="index" v-show='whichUser==index' class="prescriptionDetail">
                <ul>
                    <!-- <li class="detailHead">
          </li> -->
                    <li class="detailCount">
                        <div class="sign">
                            <ul>
                                <li>主诉:
                                    <span>{{text.pb.complained}}</span>
                                </li>
                                <li>现病史:
                                    <span>{{text.pb.medicalHistory}}</span>
                                </li>
                                <li>过敏史:
                                    <span>{{text.pb.allergyHistory}}</span>
                                </li>
                                <li>门诊诊断:
                                    <span>{{text.pb.diagnosis}}</span>
                                </li>
                            </ul>
                        </div>
                        <!-- <div class="result">
                            <div class="front">
                                <ul>
                                    <li>
                                        <el-checkbox v-model="text.pb.report" disabled>疫情报告</el-checkbox>
                                    </li>
                                    <li>
                                        <el-checkbox v-model="text.pb.review" disabled>复诊</el-checkbox>
                                    </li>
                                    <li>

                                        <div class="block">
                                            <span class="demonstration">发病日期：</span>
                                            <el-date-picker @blur="demonstration1" v-model="text.pb.occurTime"
                                                align="right" type="date" placeholder="选择日期" disabled>
                                            </el-date-picker>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="behind">
                                <div class="block">
                                    <span class="demonstration">下次复查日期:</span>
                                    <el-date-picker @blur="demonstration2" v-model="text.pb.reviewTime" align="right" type="date" placeholder="选择日期" disabled>
                                    </el-date-picker>
                                </div>
                            </div>
                        </div> -->
                        <div>
                            <el-form ref="form" label-width="80px">
                                <div class="drugsCheckBox">
                                    <el-form-item>
                                        <el-checkbox-group v-model="text.pb.report">
                                            <el-checkbox label="疫情报告" name="type"></el-checkbox>
                                        </el-checkbox-group>
                                        <el-checkbox-group v-model="text.pb.review">
                                            <el-checkbox label="复诊" name="type"></el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>
                                    <el-form-item label="发病日期: ">
                                        <el-date-picker @blur="demonstration1" type="date" placeholder="选择日期"
                                            v-model="text.pb.occurTime" style="width: 100%;">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item class="nextTimeClass" label="下次复查日期: ">
                                        <el-date-picker @blur="demonstration2" type="date" placeholder="选择日期"
                                            v-model="text.pb.occurTime" style="width: 100%;">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </el-form>
                        </div>
                        <div class="dates">
                            <ul>
                                <li class="orderTime">
                                    <span>下单时间:</span>
                                    <span class="span">{{text.pb.createTime}}</span>
                                </li>
                                <li class="acceptTime">
                                    <span>接诊时间:</span>
                                    <span class="span">{{text.pb.createTime}}</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="detailList">
                        <!-- <search @searchValue="adminSearchChange"></search> -->
                        <div class="listBao">
                            <div class="lists" v-for="(text,index) in ARR" :key="index" v-show='whichUser==index'>
                                <el-table :data="text" style="width: 100%">
                                    <!-- <el-table-column prop="index" label="序号"></el-table-column> -->
                                    <el-table-column prop="drugName" label="药品名称">
                                    </el-table-column>
                                    <el-table-column prop="drugUse" label="用法">
                                    </el-table-column>
                                    <el-table-column prop="drugTimes" label="频率">
                                    </el-table-column>
                                    <el-table-column prop="drugDosage" label="用量">
                                    </el-table-column>
                                    <el-table-column prop="drugPrice" label="单价">
                                    </el-table-column>
                                    <el-table-column prop="drugQuantity" label="数量">
                                    </el-table-column>
                                    <el-table-column prop="subtotal" label="合计">
                                    </el-table-column>
                                    <el-table-column prop="doctorAsk" label="医生嘱托">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="totals">
                                <div class="totalMoney">总金额:
                                    <span>{{text.pb.drugPrice}}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <!-- <div style="font-family: PingFangSC-Semibold;font-size: 14px;color: #5E6875;letter-spacing: 0;font-weight: bold;">备注：</div> -->
                    <textarea v-model="remark" class="doctorTalk" name="" id="" placeholder="备注："></textarea>
                    <li class="detailFooter">
                        <div></div>
                        <div>
                            <button class="preview" @click="dialogTableVisibleFun(text.pb.id)">预览</button>
                            <button class="preview" @click='checkPrescription0'>不通过</button>
                            <button class="preview" @click='checkPrescription'>生成电子处方</button>
                        </div>

                        <!-- <el-button class="preview" type="primary" @click="dialogTableVisibleFun(text.pb.id)" plain>预览</el-button>
            <el-button class="fail" type="info" @click='checkPrescription0'>不通过</el-button>
            <el-button class="success" type="success" @click='checkPrescription'>生成电子处方</el-button> -->
                    </li>
                    <!-- <div>
            4555
            <div>
              <span v-for="(item,index) in testData.list" :key="index" @click="getData(item,index)">{{item.name}}</span>
            </div>
            <div>
              <p>{{testData.select.name}}</p>
            </div>

          </div> -->
                </ul>
            </li>
        </ul>

        <ul v-if="oconsulVisable == 2" class="transport">
            <li class="checkList">
                <div class="title">
                    <span class="title1">审核列表</span>
                    <span class="title2">...</span>
                </div>
                <div class="div">
                    <ul v-for="(text,index) in bcd" :key="index" @click='whichUserFun(index)'
                        :class="whichUser==index?'backgroundUser':''">
                        <li>
                            <img v-if="text.headId == null" src="../assets/img/a-6.png" alt="医生头像">
                            <img v-if="text.headId"
                                :src='"https://demo.chuntaoyisheng.com:10002/m/v1/api/hdfs/fs/download/"+text.headId'
                                alt="医生头像">
                            <div>
                                <p class="name">{{text.userName}}</p>
                                <p class="depart">问诊医生:
                                    <span>{{text.createDoctor}}</span> |
                                    <span>{{text.clinicName}}</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
            <li v-for="(text,index) in bcd" :key="index+ '-label'" v-show='whichUser==index' class="waitPeople">
                <ul>
                    <li>
                        <ul class="title">
                            <li class="wait">
                                <i class="iconfont">&#xe8c0;</i>
                                <span>等待发药人数</span>
                            </li>
                            <li class="num">{{text.number}}</li>
                        </ul>
                    </li>
                    <li class="wait1">
                        <ul>
                            <li class="name">{{text.userName}}</li>
                            <li class="gender">性别:
                                <span>{{text.userSex}}</span>
                            </li>
                            <li class="age">年龄:
                                <span>{{text.userAge}}</span>
                            </li>
                            <li class="birthday">出生日期:
                                <span>{{text.birthday}}</span>
                            </li>
                            <li class="phoneNumber">联系方式:
                                <span>{{text.phone}}</span>
                            </li>
                            <li class="address">常用地址:
                                <span>{{text.address}}</span>
                            </li>

                        </ul>
                    </li>
                    <li class="wait2">
                        <ul>
                            <li class="patientNumber">门诊号:
                                <span>{{text.clinicId}}</span>
                            </li>
                            <li class="feeType">费别:
                                <span>{{text.priceDesc}}</span>
                            </li>
                            <li class="medicalInsurance">医保类型:
                                <span>{{text.medicalInsurance}}</span>
                            </li>
                        </ul>
                    </li>
                    <li class="wait3">
                        <ul>
                            <li class="healDoctor">开方医生:
                                <span>{{text.createDoctor}}</span>
                            </li>
                            <li class="checkDoctor">审方医生:
                                <span>{{text.reviewDoctor}}</span>
                            </li>
                            <li class="giveDoctor">发药医生:
                                <span>{{text.sendDoctor}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li v-for="(text,index) in bcd" :key="index" v-show='whichUser==index' class="prescriptionDetail">
                <ul>
                    <!-- <li class="detailHead">
          </li> -->
                    <li class="detailCount">
                        <div class="sign">
                            <ul>
                                <li>主诉:
                                    <span>{{text.pb.complained}}</span>
                                </li>
                                <li>现病史:
                                    <span>{{text.pb.medicalHistory}}</span>
                                </li>
                                <li>过敏史:
                                    <span>{{text.pb.allergyHistory}}</span>
                                </li>
                                <li>门诊诊断:
                                    <span>{{text.pb.diagnosis}}</span>
                                </li>
                            </ul>
                        </div>
                        <!-- <div class="result">
                            <div class="front">
                                <ul>
                                    <li>
                                        <el-checkbox v-model="text.pb.report" disabled>疫情报告</el-checkbox>
                                    </li>
                                    <li>
                                        <el-checkbox v-model="text.pb.review" disabled>复诊</el-checkbox>
                                    </li>
                                    <li>

                                        <div class="block">
                                            <span class="demonstration">发病日期：</span>
                                            <el-date-picker @blur="demonstration1" v-model="text.pb.occurTime"
                                                align="right" type="date" placeholder="选择日期" disabled>
                                            </el-date-picker>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="behind">
                                <div class="block">
                                    <span class="demonstration">下次复查日期:</span>
                                    <el-date-picker @blur="demonstration2" v-model="text.pb.reviewTime" align="right" type="date" placeholder="选择日期" disabled>
                                    </el-date-picker>
                                </div>
                            </div>
                        </div> -->
                        <div>
                            <el-form ref="form" label-width="80px">
                                <div class="drugsCheckBox">
                                    <el-form-item>
                                        <el-checkbox-group v-model="text.pb.report">
                                            <el-checkbox label="疫情报告" name="type"></el-checkbox>
                                        </el-checkbox-group>
                                        <el-checkbox-group v-model="text.pb.review">
                                            <el-checkbox label="复诊" name="type"></el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>
                                    <el-form-item label="发病日期: ">
                                        <el-date-picker @blur="demonstration1" type="date" placeholder="选择日期"
                                            v-model="text.pb.occurTime" style="width: 100%;">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item class="nextTimeClass" label="下次复查日期: ">
                                        <el-date-picker @blur="demonstration2" type="date" placeholder="选择日期"
                                            v-model="text.pb.reviewTime" style="width: 100%;">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </el-form>
                        </div>
                        <div class="dates">
                            <ul>
                                <li class="orderTime">
                                    <span>下单时间:</span>
                                    <span class="span">{{text.pb.createTime}}</span>
                                </li>
                                <li class="acceptTime">
                                    <span>接诊时间:</span>
                                    <span class="span">{{text.pb.createTime}}</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="detailList">
                        <!-- <search @searchValue="adminSearchChange"></search> -->
                        <div class="listBao">
                            <div class="lists" v-for="(text,index) in ARR" :key="index" v-show='whichUser==index'>
                                <el-table :data="text" style="width: 100%">
                                    <!-- <el-table-column prop="index" label="序号"></el-table-column> -->
                                    <el-table-column prop="drugName" label="药品名称">
                                    </el-table-column>
                                    <el-table-column prop="drugUse" label="用法">
                                    </el-table-column>
                                    <el-table-column prop="drugTimes" label="频率">
                                    </el-table-column>
                                    <el-table-column prop="drugDosage" label="用量">
                                    </el-table-column>
                                    <el-table-column prop="drugPrice" label="单价">
                                    </el-table-column>
                                    <el-table-column prop="drugQuantity" label="数量">
                                    </el-table-column>
                                    <el-table-column prop="subtotal" label="合计">
                                    </el-table-column>
                                    <el-table-column prop="doctorAsk" label="医生嘱托">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="totals">
                                <div class="totalMoney">总金额:
                                    <span>{{text.pb.drugPrice}}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <!-- <div style="font-family: PingFangSC-Semibold;font-size: 14px;color: #5E6875;letter-spacing: 0;font-weight: bold;">备注：</div> -->
                    <textarea v-model="remark" class="doctorTalk" name="" id="" placeholder="备注："></textarea>
                    <li class="detailFooter">
                        <div></div>
                        <div>
                            <button class="preview" @click="dialogTableVisibleFun(text.pb.id)">预览</button>
                            <button class="preview" @click="goMy">发货</button>
                        </div>

                        <!-- <el-button class="preview" type="primary" @click="dialogTableVisibleFun(text.pb.id)" plain>预览</el-button>
            <el-button class="ship" type="primary" plain @click="goMy">发货</el-button> -->
                    </li>
                </ul>
            </li>

        </ul>

        <!-- //某诊室的所有病人列表 -->
        <div v-if="isShowPatient">
            <el-dialog title="就诊列表" :visible.sync="isShowPatient" width="60%" center>
                <ul v-for="(text5,index) in huanzheList" :key="index" class=""
                    style="margin: 0 0 30px 0;border: 1px solid #d8d8d8;padding: 10px 15px;">
                    <li class="name"
                        style="display:-webkit-flex;justify-content: space-between;width: 100%;margin:0 0 20px 0;align-items: center;">
                        <div style="display: flex; align-items: center;">
                            <img style="width: 53px; margin: 0 30px 0 0;" src="../assets/img/a-6.png" alt="">
                            <div>
                                <!-- <img src="../assets/img/a-6.png" alt=""> -->
                                <h1
                                    style="margin: 0 0 10px 0;font-family: PingFangSC-Semibold;font-size: 15px;color: #002257;letter-spacing: 0.1px;">
                                    {{text5.userName}}</h1>
                                <div class="orderTime">
                                    <span>下单时间:</span>
                                    <span class="span">{{text5.clinicOrderTime}}</span>
                                </div>
                            </div>
                        </div>
                        <div
                            style="display:-webkit-flex;justify-content: space-around;margin: 0 0.1rem 0 0;height: 40px;">
                            <span class="tanKuang1" @click="seeHistory(text5.userId)">查看档案</span>
                            <span class="tanKuang2" @click="sendMessage(huanzheList3,text5)">发送</span>
                            <!-- <el-button type="success" plain @click="seeHistory(text5.userId)">查看档案</el-button>
              <el-button type="danger" @click="sendMessage(huanzheList3,text5)">发送</el-button> -->
                            <!-- <el-button type="info" plain>{{huanzheList[index].doctorStates?'未开始':'进行中'}}</el-button> -->
                        </div>
                    </li>

                    <li v-if="text5.drugDetail.length != 0" class="drug"
                        style="padding:0 0 20px 0;border-bottom:1px solid #d8d8d8">
                        <div>
                            <div class="drugTitle">Rx:</div>
                            <div>
                                <div class="drugDetail">
                                    <div>

                                        <ul v-for="(text,index) in text5.drugDetail" :key="index"
                                            class="flex-cell flex-row">
                                            <li class="flex-cell flex-row">（{{index+1}}）</li>
                                            <li class="flex-cell flex-row">{{text.drugName}}</li>
                                            <li class="flex-cell flex-row">{{text.norm}}</li>
                                            <li class="flex-cell flex-row">{{text.drugQuantity}}</li>
                                            <li class="flex-cell flex-row">{{text.drugDosage}}</li>
                                            <li class="flex-cell flex-row">{{text.drugUse}}</li>
                                            <li class="flex-cell flex-row">{{text.drugTimes}}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li class="noBorder">
                        <el-table :data="huanzheList4[index]" style="border:none;">
                            <el-table-column prop="askTime" label="接诊时间"></el-table-column>
                            <el-table-column prop="doctorName" label="首诊医生"></el-table-column>
                            <el-table-column prop="askPrice" label="问诊费用"></el-table-column>
                            <el-table-column prop="prescriptionPrice" label="处方费"></el-table-column>
                        </el-table>
                    </li>

                </ul>
            </el-dialog>
        </div>

        <!-- 预览弹窗 -->
        <div v-if="dialogTableVisible">
            <el-dialog title="预览" :visible.sync="dialogTableVisible" center>
                <img style="width:100%"
                    :src='"https://demo.chuntaoyisheng.com:10002/m/v1/api/prescription/prescription/prescriptionDetailById?token="+userInfo.token+"&prescriptionId="+srcs'>
            </el-dialog>
        </div>

        <!-- 谭莹聊天弹窗 -->

        <div v-if="chatVisible">
            <el-dialog class="chatDialog" title="" :visible.sync="chatVisible" width="680px">
                <chat :sessionId="sessionId" :doctorVis="doctorVis" :userMessage="userMessage" :chatType1="videoType" :chatTypeBox="chatTypeBox"></chat>
            </el-dialog>
        </div>

        <!-- 视频聊天 -->
        <div v-if="centerDialogVisible">
            <el-dialog class='videoClassBox' title="" :visible.sync="centerDialogVisible" center append-to-body fullscreen @close="closeVideo()" :showClose="VideoshowClose">
                <ovideo :createVideoRoomData="createVideoRoomData" :videoType="videoType" :oClinicId="oClinicId" @reback="videoclick" :doctorVis='doctorVis' :userMessage="userMessage" :chatTypeBox="chatTypeBox">
                </ovideo>
            </el-dialog>
        </div>

    </div>
</template>

<script>
//引入接口
import {
    bindSession,
    // 已使用接口
    addClinic, //7.1新增业务
    searchClinic, //7.5门诊列表1
    disableClinic, //7.4禁用远程门诊业务和诊室
    updatePrescription, //7.9审核处方
    onlineRoomsByDoctor, //7.6(WEB医生)获取所有该医生的在线诊室
    reviewList, //7.10按审方医生获取处方审核列表
    prescriptionDetailByCondition, //7.11出方列表2
    addPrescription, //7.8开处方
    fsDownload, //1.9.文件下载

    //未使用接口
    updateClinic, //7.2更新远程门诊业务
    clinicDetail, //7.3查看远程门诊业务详情
    prescriptionDetailById, //7.12根据处方id获取处方电子版
    drugSendRecord, //7.13根据处方id获取处方发货记录
    drugsByCondition, //7.16药品名称搜索药品信息
    // clinicOrders, //7.18(WEB医生)获取所有该诊室的订单信息
    clinicOrder, //7.4.2(WEB医生)获取所有该诊室的订单信息

    // 谭莹
    fetchChatSession, //创建单聊会话
    doctorInto, //进入门诊
    sendBtnVisable
    // 废弃接口
    // fetchHospitalDepts,//2.2.获取医院科室列表
} from "../api/apiAll.js";
// import {  prescriptionDetailById } from '../enums/apiList.js'

//引入token
import { mapState } from "vuex";
import chat from "../public/publicComponents/chat.vue";
import doctorTab from "../public/publicComponents/doctorTab.vue";
import search from "../public/publicComponents/search.vue";
import noData from "../public/publicComponents/noData.vue";
import ovideo from "../video/oVideo.vue";
export default {
    components: {
        doctorTab,
        search,
        chat,
        noData,
        ovideo
    },
    data() {
        return {
            //谭莹变量
            chatTypeBox: {
                startDoctorName: "",
                startDoctorTYpe: "门诊"
            },
            VideoshowClose: false,
            videoType: "门诊",
            chatVisible1: true,
            doctorVis: 1, //医生跟患者单聊
            sessionId: "", //会话id
            chatVisible: false,
            userMessage: {},
            createVideoRoomData: {
                conferenceId: "",
                conferenceNumber: ""
            },
            oClinicId: [], //当前进入门诊id
            //谭莹变量
            // testData: {
            //   select: {
            //     name: 2
            //   },
            //   list: [
            //     { name: 1 },
            //     { name: 2 },
            //     { name: 3 },
            //   ]
            // },

            // new
            myHomes: [],
            tableDataList1: [
                // [
                //   {
                //     unProcess: '1',
                //     process: '2',
                //     otherDocter: '3'
                //   }
                // ],
            ],
            whichUser: 0,
            myHomesBiao: [],
            imgChuFangDan: "",

            //函数传参
            // 公共
            pageNum: 1, //页数
            pageSize: 10, //条数
            searchValue: "", //搜索框接收参数
            businessType: "", //业务类型接收参数
            remark: "",

            orgCode: "", // 医院机构码
            departmentId: "", //科室id
            clinicId: "", //诊室id
            secondDoctorId: "", // 审方医生id（为空）
            prescriptionId: "0", //处方id     // 7.12根据处方id获取处方电子版  (预览)
            reviewEnum0: "REVIEWED", // 7.9审核处方  审核状态（REVIEWED, //已审核；UNREVIEWED, //未审核；FAILREVIEWED, //不通过）
            reviewEnum1: null, // 7.8开处方    审方状态（为空）
            userId: "", //7.8用户id（患者id）
            lookType: 0, //7.10查看类型(lookType ==0 待审核列表； lookType ==1 审核通过列表)
            isShowPatient: false, //就诊列表是否出现
            isShowPatientList: [], //就诊列表数据
            text5Array: [], //就诊列表弹框底部table数据
            huanzheList: [],
            // huanzheList2: [],
            huanzheList3: {},
            huanzheList4: [],
            srcs: "", //处方id   用于拼接图片src

            // 7.8开处方 医生端列表2
            // firstDoctorId: '',//开方医生id
            // complained: '',// 主诉
            // medicalHistory: '',//现病史
            // allergyHistory: '',//过敏史
            // diagnosis: '',//门诊诊断
            // report: true,// 疫情报告（true：勾选；false：不勾选）
            // review: false,// 复诊（true：勾选；false：不勾选）
            // occurTime: '',//发病日期
            // reviewTime: '',//下次复查日期
            // //药品详情（详情看返回值说明）
            // drugId: '',                   //药品id
            // drugPrice: '',                  //药品价格
            // drugQuantity: '',                   //药品数量
            // subtotal: '',                   //药品🐤小计
            // doctorAsk: '', //医生嘱托

            // checked1: true,
            // checked2: false,
            // value1: '',
            // value2: '',
            // searchValue: "",
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
            ARR: [],

            tableDataList3: [
                // {
                //   serialNumber: '01',
                //   DrugName: '',
                //   usage: '口服',
                //   frequency: '一天两次',
                //   dose: '一粒',
                //   unitPrice: '25',
                //   quantity: '1',
                //   total: '25',
                //   suggest: '饭后使用',
                // }, {
                //   serialNumber: '01',
                //   DrugName: '阿莫西林胶囊',
                //   usage: '口服',
                //   frequency: '一天两次',
                //   dose: '一粒',
                //   unitPrice: '25',
                //   quantity: '1',
                //   total: '25',
                //   suggest: '饭后使用',
                // },
            ],

            dialogTableVisible: false,
            // 处方审核列表
            bcd: []
        };
    },
    computed: {
        //引入token
        ...mapState({
            userInfo: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo,
            userSocketInfo: state => state.socket
        })
    },
    // methods: {
    //     // 谭莹事件
    //     videoclick(data) {
    //         this.centerDialogVisible = false;
    //     },
    //     //进入门诊
    //     async enterRoomBtn(text) {
    //         this.userMessage = {
    //             clinicId: text.id,
    //             departmentId: text.departmentId
    //         };

    //         this.oClinicId = text.id;
    //         this.centerDialogVisible = true;
    //         // let _this = this;
    //         // let query = {
    //         //   token: this.userInfo.token
    //         // };
    //         // const options = {
    //         //   clinicId: text.id
    //         // };
    //         // const res = await doctorInto(query, options);
    //         // console.log(res);
    //         // if (res.data && res.data.errCode === 0) {
    //         //   _this.centerDialogVisible = true;
    //         // } else {
    //         //   //失败
    //         //   this.$notify.error({
    //         //     title: "警告",
    //         //     message: res.data.errMsg
    //         //   });
    //         // }
    //     },
    //     //退出视频
    //     // async closeVideo() {
    //     //     let _this = this;
    //     //     let query = {
    //     //         token: this.userInfo.token
    //     //     };
    //     //     const options = {
    //     //         conferenceId: this.createVideoRoomData.conferenceId,
    //     //         state: "OFF"
    //     //     };
    //     //     const res = await storageUsers(query, options);
    //     //     console.log(res);
    //     //     if (res.data && res.data.errCode === 0) {
    //     //         this.$notify.success({
    //     //             title: "成功",
    //     //             message: "退出成功！"
    //     //         });
    //     //         _this.createVideoVisable = false;
    //     //         _this.sendMessageChat(6, "cancle", "VIDEO");
    //     //     } else {
    //     //         //失败
    //     //         this.$notify.error({
    //     //             title: "警告",
    //     //             message: res.data.errMsg
    //     //         });
    //     //     }
    //     // },
    //     //退出诊室
    //     async closeVideo() {
    //         let _this = this;
    //         let query = {
    //             token: this.userInfo.token
    //         };
    //         const options = {
    //             conferenceId: this.createVideoRoomData.conferenceId,
    //             state: "OFF"
    //         };
    //         const res = await storageUsers(query, options);
    //         console.log(res);
    //         if (res.data && res.data.errCode === 0) {
    //             this.$notify.success({
    //                 title: "成功",
    //                 message: "退出成功！"
    //             });
    //             _this.createVideoVisable = false;
    //             _this.sendMessageChat(6, "cancle", "VIDEO");
    //         } else {
    //             //失败
    //             this.$notify.error({
    //                 title: "警告",
    //                 message: res.data.errMsg
    //             });
    //         }
    //     },
    //     // 我的诊室发送消息
    //     // async sendMessage(text, text1) {
    //     //     console.log(text);
    //     //     console.log(text1);

    //     //     this.userMessage = {
    //     //         clinicId: text.id,
    //     //         departmentId: text.departmentId,
    //     //         userId: text1.userId,
    //     //         orgCode: text.orgCode,
    //     //         clinicOrderId: text1.clinicOrderId //订单id
    //     //     };
    //     //     console.log(this.userMessage);
    //     //     let _this = this;
    //     //     let query = {
    //     //         token: this.userInfo.token,
    //     //         userId: text1.userId,
    //     //         orderId: text1.clinicOrderId
    //     //     };
    //     //     const res = await sendBtnVisable(query);
    //     //     if (res.data && res.data.errCode === 0) {
    //     //         _this.sessionId = res.data.body.bindSession;
    //     //         if (res.data.body.bindSession && res.data.body.bindDoctor) {
    //     //             text1.disabledStatus = false;
    //     //             _this.chatVisible = true;
    //     //         } else if (
    //     //             !res.data.body.bindSession &&
    //     //             !res.data.body.bindDoctor
    //     //         ) {
    //     //             text1.disabledStatus = false;
    //     //             _this.chatVisible = true;
    //     //         } else if (
    //     //             res.data.body.bindSession ||
    //     //             res.data.body.bindDoctor
    //     //         ) {
    //     //             text1.disabledStatus = true;
    //     //         }

    //     //     } else {
    //     //         this.$notify.error({
    //     //             title: "警告",
    //     //             message: res.data.errMsg
    //     //         });
    //     //     }
    //     // },
    //     // 我的诊室发送消息
    //     async sendMessage(text, text1) {
    //         console.log(text);
    //         console.log(text1);

    //         this.userMessage = {
    //             clinicId: text.id,
    //             departmentId: text.departmentId,
    //             userId: text1.userId,
    //             orgCode: text.orgCode,
    //             clinicOrderId: text1.clinicOrderId //订单id
    //         };
    //         console.log(this.userMessage);
    //         let _this = this;
    //         let query = {
    //             token: this.userInfo.token,
    //             userId: text1.userId,
    //             orderId: text1.clinicOrderId
    //         };
    //         const res = await sendBtnVisable(query);
    //         if (res.data && res.data.errCode === 0) {
    //             if (res.data.body.bindSession && res.data.body.bindDoctor) {
    //                 text1.disabledStatus = false;

    //                 _this.sendMessage1(text, text1);
    //             } else if (
    //                 !res.data.body.bindSession &&
    //                 !res.data.body.bindDoctor
    //             ) {
    //                 text1.disabledStatus = false;
    //                 _this.sendMessage1(text, text1);
    //             } else if (
    //                 res.data.body.bindSession ||
    //                 res.data.body.bindDoctor
    //             ) {
    //                 text1.disabledStatus = true;
    //                 this.$notify.error({
    //                     title: "警告",
    //                     message: "该订单已绑定服务人"
    //                 });
    //             }
    //         } else {
    //             this.$notify.error({
    //                 title: "警告",
    //                 message: res.data.errMsg
    //             });
    //         }
    //     },
    //     async sendMessage1(text, text1) {
    //         let _this = this;
    //         let query = {
    //             token: this.userInfo.token
    //         };
    //         let options = {
    //             orderId: text1.clinicOrderId,
    //             orderNo: ""
    //         };
    //         const res = await bindSession(query, options);
    //         if (res.data && res.data.errCode === 0) {
    //             _this.sessionId = res.data.body;
    //             _this.chatVisible = true;
    //         } else {
    //             this.$notify.error({
    //                 title: "警告",
    //                 message: res.data.errMsg
    //             });
    //         }
    //     },
    //     //返回赋值函数
    //     getConsulTabData(res) {
    //         //顶部切换返回函数
    //         this.oconsulVisable = res.i;
    //         console.log(res.i);
    //         if (res.i == 0) {
    //             this.getList1();
    //         } else if (res.i == 1) {
    //             this.getList2().then(val => {
    //                 this.whichUserFun(0, this.bcd[0]); //刷新默认读取第一条数据
    //             });
    //         } else if (res.i == 2) {
    //             this.getList3();
    //         }
    //     },
    //     demonstration1(res) {
    //         //时间插件返回函数
    //         // console.log(res)
    //     },
    //     demonstration2(res) {
    //         //时间插件返回函数
    //         // console.log(res)
    //     },
    //     adminSearchChange(data) {
    //         //审核列表
    //         this.searchValue = data;
    //         // console.log(data)
    //     },
    //     whichUserFun(index, data) {
    //         console.log(index, data);
    //         this.whichUser = index;
    //         if (data) {
    //             console.log(data);
    //             this.prescriptionId = data.pb.id;
    //             this.secondDoctorId = data.reviewDoctor;
    //             console.log(this.whichUser);
    //             console.log(this.prescriptionId);
    //             console.log(this.secondDoctorId);
    //         }
    //     },
    //     // 预览
    //     dialogTableVisibleFun(row) {
    //         console.log(row);
    //         this.dialogTableVisible = true;
    //         this.srcs = row;
    //         this.preLook();
    //     },
    //     // 发货
    //     goMy() {
    //         alert("没有接口");
    //     },
    //     // getData(item, index) {
    //     //   this.testData.select = item
    //     // },

    //     //列表
    //     // 7.6(WEB医生)获取所有该医生的在线诊室(医生端列表1)
    //     async getList1() {
    //         var date = new Date();
    //         var year = date.getFullYear();
    //         var month = date.getMonth() + 1;
    //         var day = date.getDate();
    //         if (month < 10) {
    //             month = "0" + month;
    //         }
    //         if (day < 10) {
    //             day = "0" + day;
    //         }
    //         var nowDate = year + "-" + month + "-" + day;
    //         this.time0 = nowDate;
    //         this.time1 = nowDate;

    //         const _this = this;
    //         let query = {
    //             token: this.userInfo.token,
    //             pageNum: this.pageNum,
    //             pageSize: this.pageSize
    //         };
    //         const res = await onlineRoomsByDoctor(query);
    //         if (res.data && res.data.errCode === 0) {
    //             console.log("医生端列表1+成功");
    //             console.log(this.time0);
    //             console.log(this.time1);
    //             this.myHomes = res.data.body.data2.list;
    //             $.each(this.myHomes, function(index, text) {
    //                 $.each(text.clinicOrders, function(index1, text1) {
    //                     text1.disabledStatus = false;
        methods: {
            // 谭莹事件
            videoclick(data) {
                this.centerDialogVisible = false;
            },
            //进入门诊
            async enterRoomBtn(text) {
                this.userMessage = {
                    clinicId: text.id,
                    departmentId: text.departmentId
                };

                this.oClinicId = text.id;
                this.centerDialogVisible = true;
                // let _this = this;
                // let query = {
                //   token: this.userInfo.token
                // };
                // const options = {
                //   clinicId: text.id
                // };
                // const res = await doctorInto(query, options);
                // console.log(res);
                // if (res.data && res.data.errCode === 0) {
                //   _this.centerDialogVisible = true;
                // } else {
                //   //失败
                //   this.$notify.error({
                //     title: "警告",
                //     message: res.data.errMsg
                //   });
                // }
            },
            //退出视频
            // async closeVideo() {
            //     let _this = this;
            //     let query = {
            //         token: this.userInfo.token
            //     };
            //     const options = {
            //         conferenceId: this.createVideoRoomData.conferenceId,
            //         state: "OFF"
            //     };
            //     const res = await storageUsers(query, options);
            //     console.log(res);
            //     if (res.data && res.data.errCode === 0) {
            //         this.$notify.success({
            //             title: "成功",
            //             message: "退出成功！"
            //         });
            //         _this.createVideoVisable = false;
            //         _this.sendMessageChat(6, "cancle", "VIDEO");
            //     } else {
            //         //失败
            //         this.$notify.error({
            //             title: "警告",
            //             message: res.data.errMsg
            //         });
            //     }
            // },
            //退出诊室
            async closeVideo() {
                let _this = this;
                let query = {
                    token: this.userInfo.token
                };
                const options = {
                    conferenceId: this.createVideoRoomData.conferenceId,
                    state: "OFF"
                };
                const res = await storageUsers(query, options);
                console.log(res);
                if (res.data && res.data.errCode === 0) {
                    this.$notify.success({
                        title: "成功",
                        message: "退出成功！"
                    });
                    _this.createVideoVisable = false;
                    _this.sendMessageChat(6, "cancle", "VIDEO");
                } else {
                    //失败
                    this.$notify.error({
                        title: "警告",
                        message: res.data.errMsg
                    });
                }
            },
            // 我的诊室发送消息
            // async sendMessage(text, text1) {
            //     console.log(text);
            //     console.log(text1);

            //     this.userMessage = {
            //         clinicId: text.id,
            //         departmentId: text.departmentId,
            //         userId: text1.userId,
            //         orgCode: text.orgCode,
            //         clinicOrderId: text1.clinicOrderId //订单id
            //     };
            //     console.log(this.userMessage);
            //     let _this = this;
            //     let query = {
            //         token: this.userInfo.token,
            //         userId: text1.userId,
            //         orderId: text1.clinicOrderId
            //     };
            //     const res = await sendBtnVisable(query);
            //     if (res.data && res.data.errCode === 0) {
            //         _this.sessionId = res.data.body.bindSession;
            //         if (res.data.body.bindSession && res.data.body.bindDoctor) {
            //             text1.disabledStatus = false;
            //             _this.chatVisible = true;
            //         } else if (
            //             !res.data.body.bindSession &&
            //             !res.data.body.bindDoctor
            //         ) {
            //             text1.disabledStatus = false;
            //             _this.chatVisible = true;
            //         } else if (
            //             res.data.body.bindSession ||
            //             res.data.body.bindDoctor
            //         ) {
            //             text1.disabledStatus = true;
            //         }

            //     } else {
            //         this.$notify.error({
            //             title: "警告",
            //             message: res.data.errMsg
            //         });
            //     }
            // },
            // 我的诊室发送消息
            async sendMessage(text, text1) {
                console.log(text);
                console.log(text1);

                this.userMessage = {
                    clinicId: text.id,
                    departmentId: text.departmentId,
                    userId: text1.userId,
                    orgCode: text.orgCode,
                    clinicOrderId: text1.clinicOrderId //订单id
                };
                console.log(this.userMessage);
                let _this = this;
                let query = {
                    token: this.userInfo.token,
                    userId: text1.userId,
                    orderId: text1.clinicOrderId
                };
                const res = await sendBtnVisable(query);
                if (res.data && res.data.errCode === 0) {

                    if (res.data.body.bindSession && res.data.body.bindDoctor) {
                        text1.disabledStatus = false;

                        _this.sendMessage1(text, text1)
                    } else if (
                        !res.data.body.bindSession &&
                        !res.data.body.bindDoctor
                    ) {
                        text1.disabledStatus = false;
                        _this.sendMessage1(text, text1)
                    } else if (
                        res.data.body.bindSession ||
                        res.data.body.bindDoctor
                    ) {
                        text1.disabledStatus = true;
                        this.$notify.error({
                            title: "警告",
                            message: '该订单已绑定服务人'
                        });
                    }
                }
            },
            async sendMessage1(text, text1) {
                let _this = this;
                let query = {
                    token: this.userInfo.token
                };
                let options = {
                    orderId: text1.clinicOrderId,
                    orderNo: ""
                };
                const res = await bindSession(query, options);
                if (res.data && res.data.errCode === 0) {
                    _this.sessionId = res.data.body
                    _this.chatVisible = true;
                } else {
                    this.$notify.error({
                        title: "警告",
                        message: res.data.errMsg
                    });
                }
            },
            //返回赋值函数
            getConsulTabData(res) {
                //顶部切换返回函数
                this.oconsulVisable = res.i;
                console.log(res.i);
                if (res.i == 0) {
                    this.getList1();
                } else if (res.i == 1) {
                    this.getList2().then(val => {
                        this.whichUserFun(0, this.bcd[0]); //刷新默认读取第一条数据
                    });
                } else if (res.i == 2) {
                    this.getList3();
                }
            },
            demonstration1(res) {
                //时间插件返回函数
                // console.log(res)
            },
            demonstration2(res) {
                //时间插件返回函数
                // console.log(res)
            },
            adminSearchChange(data) {
                //审核列表
                this.searchValue = data;
                // console.log(data)
            },
            whichUserFun(index, data) {
                console.log(index, data);
                this.whichUser = index;
                if (data) {
                    console.log(data);
                    this.prescriptionId = data.pb.id;
                    this.secondDoctorId = data.reviewDoctor;
                    console.log(this.whichUser);
                    console.log(this.prescriptionId);
                    console.log(this.secondDoctorId);
                }
            },
            // 预览
            dialogTableVisibleFun(row) {
                console.log(row);
                this.dialogTableVisible = true;
                this.srcs = row;
                this.preLook();
            },
            // 发货
            goMy() {
                alert("没有接口");
            },
            // getData(item, index) {
            //   this.testData.select = item
            // },

            //列表
            // 7.6(WEB医生)获取所有该医生的在线诊室(医生端列表1)
            async getList1() {
                // var date = new Date();
                // var year = date.getFullYear();
                // var month = date.getMonth() + 1;
                // var day = date.getDate();
                // if (month < 10) {
                //     month = "0" + month;
                // }
                // if (day < 10) {
                //     day = "0" + day;
                // }
                // var nowDate = year + "-" + month + "-" + day;
                // this.time0 = nowDate;
                // this.time1 = nowDate;

                const _this = this;
                let query = {
                    token: this.userInfo.token,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                };
                const res = await onlineRoomsByDoctor(query);
                if (res.data && res.data.errCode === 0) {
                    console.log("医生端列表1+成功");
                    console.log(this.time0);
                    console.log(this.time1);
                    this.myHomes = res.data.body.data2.list;
                    $.each(this.myHomes, function (index, text) {
                        $.each(text.clinicOrders, function (index1, text1) {
                            text1.disabledStatus = false;
                        });
                    });
                    console.log(this.myHomes);
                    this.myHomesBiao.length = 0;
                    $.each(res.data.body.data2.list, function (index, text) {
                        _this.myHomesBiao.push(index);
                        _this.tableDataList1.push([
                            {
                                process: text.process,
                                unProcess: text.unProcess,
                                doctorCount: text.doctorCount
                            }
                        ]);
                    });
                    console.log(this.tableDataList1);
                } else {
                    //失败
                    console.log("医生端列表1+失败");
                    this.$notify.error({
                        title: "警告",
                        message: res.data.errMsg
                    });
                };
                console.log(this.myHomes);
                this.myHomesBiao.length = 0;
                $.each(res.data.body.data2.list, function(index, text) {
                    _this.myHomesBiao.push(index);
                    _this.tableDataList1.push([
                        {
                            process: text.process,
                            unProcess: text.unProcess,
                            doctorCount: text.doctorCount
                        }
                    ]);
                });
                console.log(this.tableDataList1);
            // } else {
            //     //失败
            //     console.log("医生端列表1+失败");
            //     this.$notify.error({
            //         title: "警告",
            //         message: res.data.errMsg
            //     });
            // }
        },
        async lookList(data) {
            console.log(data);
            const _this = this;
            this.isShowPatient = true;
            // this.huanzheList = data.clinicOrders
            // // this.huanzheList2 = data.doctor
            this.huanzheList3 = data;
            let query = {
                token: this.userInfo.token,
                clinicId: data.id
            };
            const res = await clinicOrder(query); //7.4.2(WEB医生)获取所有该诊室的订单信息
            if (res.data && res.data.errCode === 0) {
                console.log("7.4.2(WEB医生)获取所有该诊室的订单信息 +成功");
                console.log(res);
                console.log(res.data.body);
                this.huanzheList = res.data.body;

                this.huanzheList4.length = 0;
                if (this.huanzheList4.length == 0) {
                    $.each(res.data.body, function(index, text) {
                        _this.huanzheList4.push([text]);
                    });
                }
                console.log(this.huanzheList4);
            } else {
                //失败
                console.log("7.4.2(WEB医生)获取所有该诊室的订单信息 +失败");
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        async seeHistory(data) {
            console.log(data);
            this.$router.push({
                path: "/docDetailed",
                query: {
                    id: data
                }
            });
        },
        // 7.10.1按审方医生获取处方审核列表 (医生列表2)
        async getList2() {
            const _this = this;
            let query = {
                token: this.userInfo.token,
                lookType: this.lookType
            };
            const res = await reviewList(query);
            if (res.data && res.data.errCode === 0) {
                console.log("医生端列表2(审核)+成功");
                console.log(res);
                this.bcd = res.data.body;
                console.log(this.bcd);
                if (this.bcd[0]) {
                    this.prescriptionId = this.bcd[0].pb.id;
                    $.each(this.bcd, function(index, text) {
                        _this.ARR.push(text.pb.prescriptionDrugs);
                    });
                }
            } else {
                //失败
                console.log("医生端列表2(审核)+失败");
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 7.10.2药品配送列表 (医生列表3)
        async getList3() {
            const _this = this;
            let query = {
                token: this.userInfo.token,
                lookType: 1
            };
            const res = await reviewList(query);
            if (res.data && res.data.errCode === 0) {
                console.log("医生端列表3(发药)+成功");
                console.log(res);
                this.bcd = res.data.body;
                console.log(this.bcd);
                $.each(this.bcd, function(index, text) {
                    _this.ARR.length = 0;
                    _this.ARR.push(text.pb.prescriptionDrugs);
                });
                console.log(this.tableDataList3);
            } else {
                //失败
                console.log("医生端列表3(发药)+失败");
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 7.12根据处方id获取处方电子版  (预览)
        async preLook() {
            // console.log(this.prescriptionId);
            // let query = {
            //   token: this.userInfo.token,
            //   prescriptionId: this.prescriptionId
            // };
            // const res = await prescriptionDetailById(query);
            // console.log(res.data);
            // if (res.data && res.data.errCode === 0) {
            //   console.log("预览+成功");
            //   console.log(res);
            // } else {
            //   //失败
            //   console.log("预览+失败");
            //   this.$notify.error({
            //     title: "警告",
            //     message: res.data.errMsg
            //   });
            // }
        },
        // 1.9.文件下载
        async getList4() {
            const _this = this;
            let query = {
                id: xxxxx,
                fileName: "门诊处方签",
                width: 600,
                height: 800
            };
            const res = await fsDownload(query);
            if (res.data && res.data.errCode === 0) {
                console.log("1.9.文件下载 +成功");
                console.log(res);
            } else {
                //失败
                console.log("1.9.文件下载 +失败");
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },

        // 7.8开处方
        // async addPrescription() {
        //   let _this = this;
        //   let query = {
        //     token: this.userInfo.token
        //   };
        //   let options = {
        //     id: this.prescriptionId,
        //     clinicId: this.clinicId,
        //     departmentId: this.departmentId,
        //     userId: this.userId,
        //     firstDoctorId: this.firstDoctorId,
        //     secondDoctorId: this.secondDoctorId,
        //     reviewEnum: this.reviewEnum,
        //     orgCode: this.orgCode,
        //     complained: this.complained,
        //     medicalHistory: this.medicalHistory,
        //     allergyHistory: this.allergyHistory,
        //     diagnosis: this.diagnosis,
        //     report: this.report,
        //     review: this.review,
        //     occurTime: this.occurTime,
        //     reviewTime: this.reviewTime,
        //     drugDetails:
        //       [{
        //         id: this.drugId,                   //药品id
        //         drugPrice: this.drugPrice,                  //药品价格
        //         drugQuantity: this.drugQuantity,                   //药品数量
        //         subtotal: this.subtotal,                   //药品🐤小计
        //         doctorAsk: this.doctorAsk //医生嘱托
        //       }]
        //   };
        //   const res = await addPrescription(query, options);
        //   if (res.data && res.data.errCode === 0) {
        //     console.log('开处方医生列表2+成功')
        //     console.log(res)
        //   } else {
        //     console.log('开处方医生列表2+失败')
        //     this.$notify.error({
        //       title: "警告",
        //       message: res.data.errMsg
        //     });
        //   }
        // },
        // 7.9审核处方   点击生成处方
        async checkPrescription() {
            let _this = this;
            let query = {
                token: this.userInfo.token
            };
            let options = {
                prescriptionId: this.prescriptionId,
                secondDoctorId: this.secondDoctorId,
                // secondDoctorId: "",
                reviewEnum: "REVIEWED", //等待
                remark: this.remark
            };
            const res = await updatePrescription(query, options);
            if (res.data && res.data.errCode === 0) {
                console.log("点击生成处方+成功");
                console.log(res);
                this.getList2();
            } else {
                console.log("点击生成处方+失败");
                this.getList2();
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 7.9审核处方   不通过
        async checkPrescription0() {
            let _this = this;
            let query = {
                token: this.userInfo.token
            };
            let options = {
                prescriptionId: this.prescriptionId,
                secondDoctorId: this.secondDoctorId,
                reviewEnum: "FAILREVIEWED"
            };
            const res = await updatePrescription(query, options);
            if (res.data && res.data.errCode === 0) {
                console.log("不通过+成功");
                console.log(res);
                this.getList2();
            } else {
                console.log("不通过+失败");
                this.getList2();
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },

        //表格样式
        ceshi0(data) {
            console.log(data);
            // if (data.rowIndex == 0) {
            //   return 'ceshiLan'
            // }
            if (data.columnIndex == 0) {
                return "ceshiLan";
            } else if (data.columnIndex == 1 || data.columnIndex == 2) {
                return "ceshiHui";
            }
        },
        rowClass({ row, rowIndex }) {
            // console.log({ row, rowIndex }) //表头行标号为0
            // if(row.label == "未处理"){
            //   return 'background:red'
            // }
        }
    },

    async created() {
        this.getList1(); //7.6医生列表1
        // this.addPrescription();//7.8开处方
    },
    watch: {
        "userSocketInfo.synchroMessage": {
            handler(n, o) {
                let _this = this;
                $.each(n.syncData, function(index, text) {
                    if (text.command == "SYNC_DOCTOR_ROOM") {
                        _this.getList1();
                    }
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.myOuts {
    background: #fff;
    border: 1px solid var(--color5);
    box-shadow: 0 0.06rem 0.36rem 0 rgba(0, 62, 100, 0.04);
    border-radius: 0.04rem;
    padding: 0rem 0.2rem;
    margin: 0.3rem 0.3rem 0.3rem 0;

    /* overflow: auto;
        max-height: 750px; */
}

.outpatient_s {
    display: flex;
    background: #fff;
    margin: 20px 0 30px 0;
    padding: 0.3rem 0;
    background: #ffffff;
    border: 1px solid #e5edf3;
    box-shadow: 0 6px 36px 0 rgba(0, 62, 100, 0.04);
    border-radius: 4px;
    width: 98%;
    position: relative;

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
                    color: #97a3b4;
                    line-height: 22px;
                    margin: 7px 0 0 0;
                }
            }
        }

        i {
            border: 1px solid #e4e8ee;
            width: 90%;
            margin: auto;
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
        border-left: 1px solid #e7edf3;
        padding: 0 0 0 0.3rem;
        width: 70%;

        .dian {
            position: absolute;
            font-size: 30px;
            top: 2%;
            right: 2%;
            transform: rotate(90deg);
            cursor: pointer;
        }

        .patientDetail {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin: 0.18rem 0 0 0;

            .name {
                margin: 5% 0 0 0;
            }

            h1 {
                ont-family: PingFangSC-Regular;
                font-size: 13px;
                color: #002257;
                line-height: 22px;
                margin: 0 0 0.1rem 0;
            }

            .medicalExpenses {
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #97a3b4;
                line-height: 22px;
                margin: 0 0 0.1rem 0;

                span {
                    font-family: OpenSans-Semibold;
                    font-size: 13px;
                    color: #0064ff;
                }
            }

            .drug {
                border: 1px solid #e9eff4;
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
                    color: #0064ff;
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
                                        /* min-width: 1rem; */
                                        width: auto;
                                        font-family: OpenSans;
                                        font-size: 13px;
                                        color: #002257;
                                        line-height: 22px;
                                        margin: 0 0.2rem 0 0;
                                    }

                                    li:first-child {
                                        /* width: 0.1rem; */
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
                    color: #97a3b4;
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
                    color: #97a3b4;
                    line-height: 22px;
                    margin: 0 0 0.1rem 0;
                }

                .span {
                    /* color: red; */
                }
            }
        }
    }

    .startGroup input {
        width: 162px;
        height: 28px;
    }
}

.checkList {
    /* width: 20%; */
    height: 7rem;
    background: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
    border-radius: 3px 3px 0 0;

    display: flex;
    flex-direction: column;
    padding: 0.1rem 0;

    .title {
        display: flex;
        justify-content: space-between;
        align-content: center;
        padding: 0 0.2rem;

        .title1 {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #5c5c5c;
            letter-spacing: 0;
        }

        .title2 {
            font-family: PingFangSC-Regular;
            font-size: 20px;
            color: #5c5c5c;
            letter-spacing: 0;
            font-weight: bold;
            opacity: 0;
        }
    }

    .div {
        overflow: auto;

        ul {
            display: flex;
            flex-direction: column;
            margin: 0.1rem 0;
            padding: 0.17rem 0.2rem;

            li {
                display: flex;
                align-items: center;

                img {
                    width: 0.5rem;
                    height: 0.5rem;
                    border-radius: 50%;
                    margin: 0 0.1rem 0 0;
                }

                div {
                    display: flex;
                    flex-direction: column;

                    .name {
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #1b1e24;
                    }

                    .depart {
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #98a9bc;
                        letter-spacing: 0.2px;
                        line-height: 21px;
                    }
                }
            }
        }
    }
}

.waitPeople {
    /* width: 15%; */
    /* height: 95%; */
    background: #ffffff;
    border: 1px solid #e4e8eb;
    border-radius: 0 0 3px 3px;
    margin: 0 0 0 0.3rem;
    display: flex;
    flex-direction: column;

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.12rem;
        border-left: 3px solid #4285f4;

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
                color: #4285f4;
                letter-spacing: 0;
                margin: 0 0 0 0.05rem;
            }
        }

        .num {
            font-family: PingFangSC-Regular;
            font-size: 22px;
            color: #4285f4;
            letter-spacing: 0;
            line-height: 22px;
        }
    }

    .wait1 {
        margin: 0.1rem 0.15rem;
        padding: 0 0 0.05rem 0;
        border-bottom: 1px solid #e4e8eb;

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
                opacity: 1;
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #212223;
                line-height: 20px;
            }
        }
    }

    .wait2 {
        padding: 0.1rem 0.15rem;
        border-bottom: 1px solid #e4e8eb;

        ul {
            li {
                opacity: 0.8;
                font-family: PingFangSC-Light;
                font-size: 12px;
                color: #212223;
                line-height: 20px;
                margin: 0 0 0.1rem 0;

                span {
                    word-wrap: break-word;
                    word-break: normal;
                }
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
    /* width: 65%; */
    /* height: 95%; */
    /* background: #FFFFFF; */
    /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.20); */
    margin: 0 0 0 0.2rem;

    ul {
        .detailHead {
            width: 100%;
            height: 5%;
            background: #ffffff;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
            margin: 0 0 2% 0;
        }

        .detailCount {
            width: 100%;
            height: 38%;
            background: #ffffff;
            border: 1px solid #e4e8eb;
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
                            color: #0f1011;
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
                            color: #97a3b4;
                            line-height: 22px;
                        }

                        .span {
                            /* color: red; */
                        }
                    }

                    .acceptTime {
                        span {
                            font-family: PingFangSC-Regular;
                            font-size: 13px;
                            color: #97a3b4;
                            line-height: 22px;
                            margin: 0 0 0.1rem 0;
                        }

                        .span {
                            /* color: red; */
                        }
                    }
                }
            }
        }

        .detailList {
            width: 100%;
            /* height: 41%; */
            /* background: #FFFFFF; */
            border-radius: 3px;
            margin: 3% 0 0 0;

            .listBao {
                margin: 3% 0 0 0;
                height: 85%;

                .lists {
                    margin: 0.3rem 0 0 0;
                }

                .totals {
                    height: 0.5rem;
                    position: relative;

                    .totalMoney {
                        font-family: PingFangSC-Semibold;
                        font-size: 14px;
                        color: #5e6875;
                        letter-spacing: 0;
                        margin: 0 0 0 0;
                        position: absolute;
                        right: 20%;
                        bottom: 20%;
                        font-weight: bold;

                        span {
                            font-family: PingFangSC-Semibold;
                            font-size: 14px;
                            color: #5e6875;
                            letter-spacing: 0;
                        }
                    }
                }
            }
        }

        .doctorTalk {
            padding: 2px;
            width: 100%;
            height: 10%;
            background: #ffffff;
            border: 1px solid #e4e8eb;

            font-family: PingFangSC-Semibold;
            font-size: 14px;
            color: rgb(94, 104, 117);
            letter-spacing: 0px;
            font-weight: bold;
        }

        .detailFooter {
            width: 100%;
            margin: 2.5% 0 0 0;
            background: #ffffff;
            border: 1px solid #e4e8eb;
            display: flex;
            padding: 10px;
            justify-content: space-between;

            .preview {
                width: 90px;
                height: 32px;
                border: 1px solid #4285f4;
                border-radius: 3px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #4285f4;
                background: #ffffff;
                margin: 0 20px 0 0;
            }

            .fail {
                border: 1px solid #4285f4;
                border-radius: 3px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #4285f4;
            }

            .success {
                border: 1px solid #4285f4;
                border-radius: 3px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #4285f4;
            }
        }
    }
}

.prescriptionCheck {
    background: #fff;
    border: 1px solid var(--color5);
    box-shadow: 0 0.06rem 0.36rem 0 rgba(0, 62, 100, 0.04);
    border-radius: 0.04rem;
    padding: 0.1rem;
    margin: 0.3rem 0.3rem 0.3rem 0;

    display: flex;
    max-height: 750px;
    overflow: auto;
}

.transport {
    background: #fff;
    border: 1px solid var(--color5);
    box-shadow: 0 0.06rem 0.36rem 0 rgba(0, 62, 100, 0.04);
    border-radius: 0.04rem;
    padding: 0.1rem;
    margin: 0.3rem 0.3rem 0.3rem 0;

    display: flex;
    max-height: 750px;
    overflow: auto;

    .checkList {
        /* width: 20%; */
        height: 7rem;
        background: #ffffff;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
        border-radius: 3px 3px 0 0;

        display: flex;
        flex-direction: column;
        padding: 0.1rem 0;

        .title {
            display: flex;
            justify-content: space-between;
            align-content: center;
            padding: 0 0.2rem;

            .title1 {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #5c5c5c;
            }

            .title2 {
                font-family: PingFangSC-Regular;
                font-size: 20px;
                color: #5c5c5c;
                letter-spacing: 0;
                font-weight: bold;
                opacity: 0;
            }
        }

        .div {
            overflow: auto;

            ul {
                display: flex;
                flex-direction: column;
                margin: 0.1rem 0;
                padding: 0.17rem 0.2rem;

                li {
                    display: flex;
                    align-items: center;

                    img {
                        width: 0.5rem;
                        height: 0.5rem;
                        border-radius: 50%;
                        margin: 0 0.1rem 0 0;
                    }

                    div {
                        display: flex;
                        flex-direction: column;

                        .name {
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #1b1e24;
                        }

                        .depart {
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #98a9bc;
                            letter-spacing: 0.2px;
                            line-height: 21px;
                        }
                    }
                }
            }
        }
    }
}

    .waitPeople {
        /* width: 15%; */
        /* height: 95%; */
        background: #ffffff;
        border: 1px solid #e4e8eb;
        border-radius: 0 0 3px 3px;
        margin: 0 0 0 0.3rem;
        display: flex;
        flex-direction: column;

        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.12rem;
            border-left: 3px solid #4285f4;

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
                    color: #4285f4;
                    letter-spacing: 0;
                    margin: 0 0 0 0.05rem;
                }
            }

            .num {
                font-family: PingFangSC-Regular;
                font-size: 22px;
                color: #4285f4;
                letter-spacing: 0;
                line-height: 22px;
            }
        }

        .wait1 {
            margin: 0.1rem 0.15rem;
            padding: 0 0 0.05rem 0;
            border-bottom: 1px solid #e4e8eb;

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
                    opacity: 1;
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #212223;
                    line-height: 20px;
                }
            }
        }

        .wait2 {
            padding: 0.1rem 0.15rem;
            border-bottom: 1px solid #e4e8eb;

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
        /* width: 65%; */
        /* height: 95%; */
        /* background: #FFFFFF; */
        /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.20); */
        margin: 0 0 0 0.2rem;

        ul {
            .detailHead {
                width: 100%;
                height: 5%;
                background: #ffffff;
                box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
                margin: 0 0 2% 0;
            }

            .detailCount {
                width: 100%;
                height: 38%;
                background: #ffffff;
                border: 1px solid #e4e8eb;
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
                                color: #0f1011;
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
                                color: #97a3b4;
                                line-height: 22px;
                            }

                            .span {
                                /* color: red; */
                            }
                        }

                        .acceptTime {
                            span {
                                font-family: PingFangSC-Regular;
                                font-size: 13px;
                                color: #97a3b4;
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
                /* height: 41%; */
                /* background: #FFFFFF; */
                border-radius: 3px;
                margin: 3% 0 0 0;

                .listBao {
                    margin: 3% 0 0 0;
                    height: 85%;

                    .lists {
                        margin: 0.3rem 0 0 0;
                    }

                    .totals {
                        height: 0.5rem;
                        position: relative;

                        .totalMoney {
                            font-family: PingFangSC-Semibold;
                            font-size: 14px;
                            color: #5e6875;
                            letter-spacing: 0;
                            margin: 0 0 0 0;
                            position: absolute;
                            right: 20%;
                            bottom: 20%;
                            font-weight: bold;

                            span {
                                font-family: PingFangSC-Semibold;
                                font-size: 14px;
                                color: #5e6875;
                                letter-spacing: 0;
                            }
                        }
                    }
                }
            }

            .doctorTalk {
                padding: 2px;
                width: 100%;
                height: 10%;
                background: #ffffff;
                border: 1px solid #e4e8eb;

                font-family: PingFangSC-Semibold;
                font-size: 14px;
                color: rgb(94, 104, 117);
                letter-spacing: 0px;
                font-weight: bold;
            }

            .detailFooter {
                width: 100%;
                margin: 2.5% 0 0 0;
                background: #ffffff;
                border: 1px solid #e4e8eb;
                display: flex;
                padding: 10px;
                justify-content: space-between;

                .preview {
                }

                .ship {
                }
            }
        }
    }

    .backgroundUser {
        background: #eeeaea;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .flex-cell {
        flex: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /deep/ .el-table__header-wrapper th {
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #5e6875;
        letter-spacing: 0;
        border: none;
    }

    /deep/ .el-table__body-wrapper td {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #5e6875;
        letter-spacing: 0;
        border: none;
    }

    /deep/ .el-form-item {
        /* margin-left: 0 !important; */
        position: relative;
        left: -80px;
    }

    .noBorder>div::before {
        display: none;
    }

    .drugsCheckBox {
        display: flex;
        display: -webkit-flex;
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #212223;
        line-height: 20px;
    }

    .drugsCheckBox>div:first-child>div {
        display: flex;
        display: -webkit-flex;
    }

    .drugsCheckBox>div:first-child>div>div {
        margin: 0 5px;
    }

    .drugsCheckBox .el-checkbox__label,
    .drugsCheckBox .el-form-item__label {
        color: #212223 !important;
    }
</style>