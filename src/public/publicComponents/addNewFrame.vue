<template>
    <div class="add-new-frame">
        <Modal :styles="{width: '850px'}" v-model="inData.show" title=" " footer-hide @on-ok="ok" @on-cancel="cancel">
            <div class="alert-body">
                <!-- 新增家医业务类型 -->
                <div class="input-item-div" v-if="inData.type==='2'">
                    <span class="input-item-name">业务类型:</span>
                    <div class="input-item-value-div">
                        <div class="particular-handle">
                            <el-select v-model="inData.businessTypeList.default.value" clearable placeholder="请选择" size="mini"
                                v-if="inData.businessTypeList.default.value!=='-1'">
                                <el-option v-for="item in inData.businessTypeList.list||[]" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input placeholder="请输入内容" size="mini" v-else @mouseover.native="showClose=true"
                                @mouseout.native="showClose=false" v-model="inData.businessTypeList.default.label">
                            </el-input>
                            <i class="iconfont particular-handle-icon" @mouseover="showClose=true" :style="{display:showClose?'inline-block':'none'}"
                                @click="changeStatus" v-if="inData.businessTypeList.default.value==='-1'">&#xe7b7;</i>
                            
                        </div>
                    </div>
                </div>
                <!-- 新增在线诊室业务类型 -->
                <div class="input-item-div" v-if="inData.type==='1'">
                    <span class="input-item-name">业务类型:</span>
                    <div class="input-item-value-div">
                        <el-input placeholder="请输入内容" size="mini" v-model="inData.businessTypeList.default.label"
                            clearable>
                        </el-input>
                    </div>
                </div>
                <!-- 新增家医业务模板 -->
                <div class="input-item-div" v-if="inData.type==='2'">
                    <span class="input-item-name">业务模板:</span>
                    <div class="input-item-value-div">
                        <el-select v-model="inData.businessTemplate.default.value" clearable placeholder="请选择" size="mini">
                            <el-option v-for="item in inData.businessTemplate.list||[]" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <!-- 业务名称 -->
                <div class="input-item-div">
                    <span class="input-item-name">业务名称:</span>
                    <div class="input-item-value-div">
                        <el-input placeholder="请输入内容" size="mini" v-model="inData.businessName.label" clearable>
                        </el-input>
                        <i class="iconfont required-icon" v-if="inData.type==='1'">&#xe7b0;</i>
                    </div>
                </div>
                <!-- 业务定价 -->
                <div class="input-item-div">
                    <span class="input-item-name">业务定价:</span>
                    <div class="input-item-value-div">
                        <el-input placeholder="请输入内容" size="mini" v-model="inData.businessPrice.label" clearable>
                        </el-input>
                        <i class="iconfont required-icon" v-if="inData.type==='1'">&#xe7b0;</i>
                    </div>
                </div>
                <!-- 选择科室 -->
                <div class="input-item-div">
                    <span class="input-item-name">选择科室:</span>
                    <div class="input-item-value-div">
                        <el-select v-model="inData.departmentList.default.value" clearable placeholder="请选择" size="mini">
                            <el-option v-for="item in inData.departmentList.list||[]" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <i class="iconfont required-icon" v-if="inData.type==='1'">&#xe7b0;</i>
                    </div>
                </div>
                <!-- 关联医生 -->
                <div class="input-item-div">
                    <span class="input-item-name">关联医生:</span>
                    <div class="input-item-value-div">
                        <el-select v-model="inData.doctorList.default" multiple placeholder="请选择" size="mini">
                            <el-option v-for="(item,index) in inData.doctorList.list||[]" :key="index" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <i class="iconfont required-icon" v-if="inData.type==='1'">&#xe7b0;</i>
                        <!-- <el-select v-model="info.department" clearable placeholder="请选择" multiple size="mini">
                        <el-option
                        v-for="item in inData.doctorList||[]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select> -->
                    </div>
                </div>
                <!-- 显示选择了哪些医生 -->
                <div class="input-item-div">
                    <span class="input-item-name"></span>
                    <div class="input-item-value-div">
                        <div class="show-select-doctores-list">
                            <div class="select-doctores-list-item" v-for="(item,index) in inData.doctorList.default"
                                :key="index">
                                <div class="select-doctores-list-item-pic">
                                    <img src="../../assets/img/a-6.png" alt="">
                                    <i class="iconfont cancel-doctor">&#xe611;</i>
                                </div>
                                <p>{{inData.doctorList.list.find(i=>i.value===item).label}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 业务描述 -->
                <div class="input-item-div">
                    <span class="input-item-name">业务描述:</span>
                    <div class="input-item-value-div">
                        <el-input type="textarea" autosize placeholder="请输入内容" v-model="inData.businessDescription">
                        </el-input>
                    </div>
                </div>
                <!-- 定义协议 -->
                <div class="input-item-div">
                    <span class="input-item-name">定义协议:</span>
                    <div class="input-item-value-div agreement-div">
                        <div class="make-agreement">
                            <div class="agreement-list">
                                <span class="select-agreement-name">{{inData.agreement.default.label||''}}</span>
                                <Dropdown>
                                    <p>
                                        <Icon type="ios-arrow-down" class="agreement-arrow-down"></Icon>
                                    </p>
                                    <DropdownMenu slot="list">
                                        <DropdownItem v-for="(item,index) in inData.agreement.list" :key="index"
                                            @click.native="chooseAgreement(item,index)">{{item.label}}</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <div class="show-agreement">
                                {{inData.agreement.showContent||''}}
                            </div>
                        </div>
                    </div>

                </div>
                <!-- 服务电话 -->
                <div class="input-item-div">
                    <span class="input-item-name">服务电话:</span>
                    <div class="input-item-value-div">
                        <el-input placeholder="请输入内容" v-model="inData.servicePhone" size="mini" clearable>
                        </el-input>
                    </div>
                </div>
                <div class="save-btn">
                    <el-button type="primary" size="mini" @click="saveInfo">保存</el-button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import sensitiveWordCheck from "../publicJs/sensitiveWordCheck.js";
    export default {
        watch: {
            'inData.departmentList.default.value': {
                handler(n) {
                    this.$emit("department", n);
                }
            },
            inData(n) { console.log(n) }
        },
        data() {
            return {
                showClose: false,
                info: {
                    businessType1: '',//业务类型1,1表示新增家医
                    businessType2: '',//业务类型2，2表示新增在线诊室业务
                    businessTemplate: '',//业务模板
                    businessName: '',//业务名称
                    businessPrice: '',//业务定价
                    department: '',//科室
                    doctors: [],//医生
                    businessDescription: '',//业务描述
                    selectAgreement: this.inData.agreement,
                    // {//协议
                    //     name:'',
                    //     content:''
                    // },
                    servicePhone: '',//服务电话

                },
                data: {
                    show: false,//是否显示
                    type: '1',//1是表示新增家医，2是表示新增在线诊室业务
                    businessTypeList: [//新增在线诊室业务类型
                        {
                            label: '',
                            value: ''
                        }
                    ],
                    businessTemplate: [//新增家医业务模板
                        {
                            label: '',
                            value: ''
                        }
                    ],
                    departmentList: [//科室列表
                        {
                            label: '',
                            value: ''
                        }
                    ],
                    doctorList: [//医生列表
                        {
                            label: '',
                            value: ''
                        }
                    ],
                    agreement: [//协议
                        {
                            name: '',
                            content: ''
                        }
                    ]
                }
            };
        },
        methods: {
            test() { console.log(555) },
            ok() {
                // this.$emit("reback",'666');
                // setTimeout(() => {
                //     this.$Modal.remove();
                //     this.$Message.info('Asynchronously close the dialog box');
                // }, 2000);
            },
            changeStatus() {
                this.inData.businessTypeList.default = { label: '', value: '' }
            },
            cancel() { },
            saveInfo() {
                // const resData = {};
                // if(this.inData.type==='1'){//新增在线诊室
                //     resData.businessType = this.info.businessType1;
                //     resData.businessName = this.info.businessName;
                //     resData.businessPrice = this.info.businessPrice;
                //     resData.department = this.info.department;
                //     resData.doctors = this.info.doctors;
                //     const isPass = [sensitiveWordCheck(resData.businessName),sensitiveWordCheck(resData.businessPrice)];
                //     for(const i of isPass){
                //         if(!i.ok){
                //             this.$notify({
                //                 title: '输入验证失败',
                //                 message: i.msg,
                //                 type: 'error'
                //             });
                //             return;
                //         }
                //     }
                // }else if(this.inData.type==='2'){//新增家医业务
                //     resData.businessType = this.info.businessType2,
                //     resData.businessTemplate = this.info.businessTemplate,
                //     resData.businessName = this.info.businessName,
                //     resData.businessPrice = this.info.businessPrice,
                //     resData.department = this.info.department,
                //     resData.doctors = this.info.doctors
                //     console.log(resData)
                // }else{
                //     console.log('传入参数格式错误');
                //     return;
                // }
                // resData.businessDescription = this.info.businessDescription;
                // resData.selectAgreement = this.info.selectAgreement;
                // resData.servicePhone = this.info.servicePhone;
                this.$emit("reback", this.inData);
                // this.inData.show = false;
            },
            chooseAgreement(item, index) {
                this.inData.agreement.default = item;
                this.$emit("getAgreementSelect", { item, index });

            }
        },
        props: [
            'inData'
        ],
        created() {
            this.inData.businessTypeList.list.push({
                label: '自定义',
                value: '-1'
            });
            // alert('enter')
            setTimeout(() => {
                console.log(this.inData)
            }, 10000);
        },
        beforeDestroy() {
        }
    };
</script>

<style>
    .add-new-frame {}

    .input-item-div {
        display: flex;
        align-items: center;
        margin-bottom: 0.24rem;
        padding-left: 0.34rem;
    }

    .input-item-name {
        /* flex: 1; */
        width: 1rem;
        font-family: var(--fontFamily3);
        font-size: var(--fontSize1);
        color: var(--color20);
        padding-right: 0.2rem;
    }

    .input-item-value-div {
        flex: 4;
    }

    .input-item-value-div input {
        width: 2.92rem;
        height: 0.28rem;
    }

    .show-doctors {
        padding-left: 0.34rem;
    }

    .show-select-doctores-list {
        display: flex;
        flex-wrap: wrap;
    }

    .select-doctores-list-item>p {
        text-align: center;
        width: 0.4rem;
    }

    .select-doctores-list-item-pic {
        width: 0.4rem;
        height: 0.4rem;
        position: relative;
        margin-right: 0.3rem;
    }

    .select-doctores-list-item-pic>img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .cancel-doctor {
        color: var(--color6);
        cursor: pointer;
        position: absolute;
        right: -10px;
        bottom: -8px;
        margin: 0;
    }

    .input-item-value-div>.el-textarea {
        /* width: 652px; */
    }

    .agreement-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* width: 632px; */
        border-bottom: 1px solid #DDDDDD;
    }

    .agreement-div {
        border: 1px solid #DDDDDD;
        width: 652px;
        min-height: 137px;
        padding-left: 20px;
        padding-right: 24px;
    }

    .select-agreement-name {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #4C4C4C;
        letter-spacing: -0.17px;
    }

    .agreement-arrow-down {
        color: #4C4C4C;
    }

    .show-agreement {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #646464;
        letter-spacing: -0.17px;
        line-height: 16px;
    }

    .required-icon {
        font-size: 12px;
        color: #FF7485;
    }

    .input-item-value-div>.el-input {
        width: auto;
    }

    .save-btn {
        text-align: center;
    }

    .particular-handle>.el-input {
        display: inline-block;
        width: auto;
    }

    /* .particular-handle>.el-input:hover .particular-handle-icon{
        display: inline-block;
    } */
    .particular-handle-icon {
        transform: translate(-180%);
        display: inline-block;
        color: #909399;
        font-size: 12px;
        cursor: pointer;
    }
</style>
<!--
    使用先知：
        新增在线诊室 和 新增家医业务 比较类似，所以直接写成一个
    使用方法： 
        1:传入参数 {
					show:true,
					type:'1',//1是表示新增家医，2是表示新增在线诊室业务
					businessTypeList:{//新增在线诊室业务类型 
						default:{
							label:'新增在线诊室业务类型1',
							value:'1'
						},
						list:[
							{
								label:'新增在线诊室业务类型1',
								value:'1'
							},
							{
								label:'新增在线诊室业务类型2',
								value:'2'
							}
						]
					},
					businessTemplate:{//新增家医业务模板
						default:{
							label:'新增家医业务模板1', 
							value:'1'
						},
						list:[
							{
								label:'新增家医业务模板1',
								value:'1'
							},
							{
								label:'新增家医业务模板2',
								value:'2'
							}
						]
					},
					businessName:{//业务名称
						label:'kkkk'
					},
					businessPrice:{//业务定价
						label:'6666'
					},
					departmentList:{//科室列表 
							default:{
								label:'',
								value:'1'
							},
							list:[
								{
									label:'科室列表1',
									value:'1'
								},
								{
									label:'科室列表2',
									value:'2'
								}
							]
					}, 
					doctorList:{//医生列表
							default:[],
							list:[
								{
									label:'医生1',
									value:'1'
								},
								{
									label:'医生2',
									value:'2'
								},
								{
									label:'医生3',
									value:'3'
								}   
							]
					},
					businessDescription:'业务描述',//业务描述
					servicePhone:'服务电话',//服务电话
					agreement:{  
						default:{ 
							label:'协议1',
							value:'1'
						},

						list:[
							{label:'协议1',value:'1'},
							{label:'协议2',value:'2'},
						],
						showContent:''
					}
				},
        2:返回结果
            2.1:新增在线诊室
                {
                    businessType:'',//业务类型
                    businessName:'',//业务名称
                    businessPrice:'',//业务定价
                    department:'',//科室
                    doctors:[],//医生

                }
            2.2:新增家医业务
                {
                    businessType:'',//业务类型,
                    businessTemplate:'',//业务模板
                    businessName:'',//业务名称,
                    businessPrice:'',//业务定价
                    department:'',//科室
                    doctors:[],//医生
                }
        实例： 
        
        <template>
            <addNewFrame :inData="testData" @reback="getData"></addNewFrame>
        </template>
        
        import addNewFrame from 'xxx/addNewFrame.vue'
        <script>
            export default{
                data(){
                    return testData:{
					show:true,
					type:'1',//1是表示新增家医，2是表示新增在线诊室业务
					businessTypeList:{//新增在线诊室业务类型 
						default:{
							label:'新增在线诊室业务类型1',
							value:'1'
						},
						list:[
							{
								label:'新增在线诊室业务类型1',
								value:'1'
							},
							{
								label:'新增在线诊室业务类型2',
								value:'2'
							}
						]
					},
					businessTemplate:{//新增家医业务模板
						default:{
							label:'新增家医业务模板1', 
							value:'1'
						},
						list:[
							{
								label:'新增家医业务模板1',
								value:'1'
							},
							{
								label:'新增家医业务模板2',
								value:'2'
							}
						]
					},
					businessName:{//业务名称
						label:'kkkk'
					},
					businessPrice:{//业务定价
						label:'6666'
					},
					departmentList:{//科室列表 
							default:{
								label:'',
								value:'1'
							},
							list:[
								{
									label:'科室列表1',
									value:'1'
								},
								{
									label:'科室列表2',
									value:'2'
								}
							]
					}, 
					doctorList:{//医生列表
							default:[],
							list:[
								{
									label:'医生1',
									value:'1'
								},
								{
									label:'医生2',
									value:'2'
								},
								{
									label:'医生3',
									value:'3'
								}   
							]
					},
					businessDescription:'业务描述',//业务描述
					servicePhone:'服务电话',//服务电话
					agreement:{  
						default:{ 
							label:'协议1',
							value:'1'
						},

						list:[
							{label:'协议1',value:'1'},
							{label:'协议2',value:'2'},
						],
						showContent:''
					}
				},
            methods:{
                getData(data){
                    console.log(data)
                }
            }
            
        </script>





-->