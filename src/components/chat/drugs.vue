<template>
    <div>
        <div class="drugs_box">
            <div class="drugs_box_lf">
                <div>
                    <div class="drugs_box_lf_headImg">
                        <img src="../../assets/img/sendNew2.png" />
                    </div>
                    <div>
                        <h4>道明寺</h4>
                        性别: 男<br /> 年龄: 23<br /> 出生日期: 1988-02-26 <br />联系方式: 18952645896 <br />常用地址: 黑龙江省哈尔滨市绥化地区<br />
                    </div>
                </div>
                <div>
                    门诊号: 23568459 <br />费别: 自费<br /> 医保类型: 职工医保
                </div>
            </div>
            <div class="drugs_box_rg">
                <div>
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="活动名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="活动形式">
                            <el-input type="textarea" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="活动名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="活动名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                                <el-checkbox label="地推活动" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>

                </div>
                <div>
                    <search></search>
                    <div>
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column fixed prop="date" label="日期" width="150">
                            </el-table-column>
                            <el-table-column prop="name" label="姓名" width="120">
                            </el-table-column>
                            <el-table-column prop="province" label="省份" width="120">
                            </el-table-column>
                            <el-table-column prop="city" label="市区" width="120">
                            </el-table-column>
                            <el-table-column prop="address" label="地址" width="300">
                            </el-table-column>
                            <el-table-column prop="zip" label="邮编" width="120">
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                    <el-button type="text" size="small">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div>
                        <div>
                        总金额：199
                        </div>
                        <div>
                            <el-button type="primary">预览</el-button>
                            <el-button type="primary">提交审核</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import search from "../../public/publicComponents/search.vue";
import apiBaseURL from "../../enums/apiBaseURL.js";
import { mapState } from "vuex";
import {
   getFamilyMemberInfo
} from "../../api/apiAll.js";
export default {
    components: {
        search
    },
    data() {
        return {
            form: {
                name: ""
            }
        };
    },
        computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    methods: {
        //获取处方信息
        async getDrugsMessage() {
            this.followVisible = true;
            let query = {
                token: this.userState.token,
                familyMemberId:''
            };
            const res = await getFamilyMemberInfo(query);
            if (res.data && res.data.errCode === 0) {
                alert('dd')
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
    },
    props: ["inData"],
    created() {
        this.getDrugsMessage() 
    },
    beforeDestroy() {}
};
</script>

<style>
.drugs_box {
    display: flex;
    display: -webkit-flex;
    opacity: 0.8;
    font-family: PingFangSC-Light;
    font-size: 12px;
    color: #212223;
    line-height: 20px;
}
.drugs_box_lf {
    width:333px;
    box-sizing: border-box;
    margin-right:10px;
    padding: 18px;
    padding-top: 79px;
    background: #ffffff;
    border: 1px solid #e4e8eb;
    border-radius: 3px;
}
.drugs_box_lf > div:first-child {
    display: flex;
    display: -webkit-flex;
    padding-bottom: 79px;
    border-bottom: #e4e8eb;
}
.drugs_box_lf > div:first-child h4 {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #212223;
    line-height: 20px;
}
.drugs_box_rg > div:first-child {
    padding-top:30px;
    background: #ffffff;
    border: 1px solid #e4e8eb;
    border-radius: 3px;
}
.drugs_box_rg > div:first-child label {
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #4285f4;
}
.drugs_box_rg > div:first-child .el-input__inner {
    height: 32px !important;
}
.drugs_box_rg > div:nth-child(2){
    padding-top:15px;
}
.drugs_box_rg > div:nth-child(2) .search{
    margin-bottom:15px;
}
.drugs_box_lf_headImg{
    width:40px;
    height: 40px;
    border-radius: 50%;
}
.drugs_box_lf_headImg>img{
    width:100%;
    height: 100%;
}
</style>