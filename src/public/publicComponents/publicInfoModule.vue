<template>
	<div class="public-info-module" v-loading="inData.loading">
		<div class="public-info-module-layout">
            <!-- <i class="iconfont public-info-module-icon">&#xe612;</i> -->
            <div class="public-info-module-icon">
                <Dropdown>
                    <a href="javascript:void(0)">
                        <i class="iconfont">&#xe612;</i>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem @click.native="edit">编辑</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div class="public-info-module-layout-top">
                <div class="public-info-module-logo"><span class="public-info-module-logo-content" :style="{color:inData.color,borderColor:inData.color,background:inData.bgColor}">{{inData.logoName}}</span></div>
                <div class="public-info-module-Introduction">
                    <h2 class="public-info-module-name">{{inData.businessName}}</h2>
                    <div class="public-info-module-Introduction-bottom">
                        <span>{{inData.businessType}}</span>
                        <span class="public-info-module-Introduction-bottom-span">
                            <!-- <el-tooltip class="item" effect="light" :content="inData.departmentId" placement="top">
                                <el-button>{{inData.departmentId.substring(0,12)}}...</el-button>
                            </el-tooltip>   -->
                        </span>
                    </div>
                </div>
            </div>
            <div class="public-info-module-layout-bottom">
                <table>
                    <thead class="public-info-module-thead">
                        <tr>
                            <th>价格</th>
                            <th class="add-padding">服务人员</th>
                            <th>业务人次</th>
                            <th>总收入</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="public-info-module-tbody">
                        <tr>
                            <th class="public-info-item-price">
                                <el-tooltip class="item" effect="light" :content="inData.price.map(item=>item.priceDesc).join('\n')" placement="top">
                                    <el-button>{{inData.price[0].priceDesc}}</el-button>
                                </el-tooltip> 
                            </th>
                            <th class="public-info-item-num">
                                <!-- 都测试了再来个新增功能新增功能 -->
                                <el-tooltip class="item" effect="light" placement="top">
                                    <div slot="content">
                                        <p v-for="(item,index) in inData.businessDoctors" :key="index">{{item.doctorName}}</p>
                                    </div>
                                    <div class="Account-authority-append-class">{{inData.businessDoctors.length}}</div>
                                </el-tooltip>
                                <!-- {{inData.businessDoctors[0].doctorName}} -->
                                </th>
                            <th class="public-info-item-count"> 总 {{inData.totalNumber}} | <span class="public-info-item-count-spe">今 {{inData.todayNumber}}</span></th>
                            <th class="public-info-item-total">{{inData.totalPrice}}</th>
                            <th class="public-info-item-disable" @click="changeStatus">{{inData.state?'禁用':'解除禁用'}}</th> 
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
	</div>
</template>

<script>
	export default {
        watch:{
            inData(n){console.log('change')}
        },
        props:[
            'inData'
        ],
		components:{
			
		},
		computed:{
			
		},
		data () {
			return {
			}
		},
		methods:{
			changeStatus(){
                this.$emit("changeStatus",{
                    item:Object.assign({},this.inData),
                    tagStatus:!this.inData.state
                });
            },
            /**
             * 编辑被点击
             */
            edit(){
                this.$emit("edit",Object.assign({},this.inData));
                console.log(Object.assign({},this.inData))
            },
		},
		async created(){
		}
	}
</script>

<style scoped>
	.public-info-module{
        padding: 15px;
    }
    .public-info-module-layout{
        height: 1.69rem;
        position: relative;
        padding: 0.1rem;
        border: 1px solid #E1E8EE;
        border-radius: 4px;
    }
    .public-info-module-icon{
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .public-info-module-layout-top{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #E4E8EE;
        padding-top: 14px;
        padding-bottom: 16px;
    }
    .public-info-module-logo{
        padding-right: 10px;
    }
    .public-info-module-logo-content{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 0.53rem;
        height: 0.53rem;
        box-sizing: border-box;
        border-radius: 50%;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        border: 1px solid #4285F4;
        color: #4285F4;
        background: rgba(66,133,244,0.20);
    }
    .public-info-module-name{
        font-family: PingFangSC-Semibold;
        font-size: 15px;
        color: #002257;
        letter-spacing: 0.1px;
        font-weight: bold;
    }
    .public-info-module-Introduction-bottom{
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #97A3B4;
        line-height: 22px;
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
    }
    .public-info-module-Introduction-bottom>span{
        flex: 1;
        overflow: hidden;
    }
    .public-info-module-Introduction{
        flex: 1;
    }
    .public-info-module-layout-bottom{
        padding-top: 10px;
    }
    .public-info-module-layout-bottom>table{
        width: 100%;
    }
    .public-info-module-thead{
        font-family: PingFangSC-Semibold;
        font-size: 13px;
        color: #97A3B4;
    }
    .public-info-item-price{
        font-family: OpenSans-Semibold;
        font-size: 13px;
        color: #002257;
        line-height: 22px;
    }
    .public-info-item-num{
        font-family: OpenSans-Semibold;
        font-size: 13px;
        color: #4D7CFE;
        line-height: 22px;
        padding-left: .1rem;
    }
    .add-padding{
        padding-left: .1rem;
    }
    .public-info-item-count{
        font-family: PingFangSC-Semibold;
        font-size: 13px;
        color: #002257;
        line-height: 22px;
    }
    .public-info-item-count-spe{
        color: #FE4D97;
    }
    .public-info-item-total{
        font-family: PingFangSC-Semibold;
        font-size: 13px;
        color: #4D7CFE;
        line-height: 22px;
    }
    .public-info-item-disable{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #FE4D97;
        text-align: center;
        cursor: pointer;
    }
    .public-info-module-Introduction-bottom-span>button{
        display: inline;
        border: none;
        background-color: transparent;
        padding: 0;
    }
    .public-info-item-price>button{
        display: inline;
        border: none;
        background-color: transparent;
        padding: 0;
    }
</style>