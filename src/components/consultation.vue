<template>
	<div class="consultation">
		远程会诊系统
		<el-button type="text" @click="centerDialogVisible = true">发起会诊</el-button>
		<el-button type="text" @click="evaluateVisible = true">评价</el-button>
		<el-button type="text" @click="departVisible = true">接收科室</el-button>
		<el-button type="text" @click="doctorVisible = true">医生详情</el-button>
		<!-- 发起会诊弹窗 --> 
		<el-dialog class="startGroup" title="发起会诊" :visible.sync="centerDialogVisible" width="602px" hight="607px" center>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="类型">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<div style="display:flex">
					<el-form-item label="申请医院:">
						<el-select v-model="form.region" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="申请科室:">
						<el-select v-model="form.region" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</div>

				<el-form-item label="会诊病人:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="病人病历:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="申请时间:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="会诊目的:">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item class="confirmBtnBox">
					<el-button class="confirmBtn" type="primary" >确认</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 打开评价 --> 
		<el-dialog class="evaluateBox"   title=" " :visible.sync="evaluateVisible" width="602px" hight="356px" center>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item class="evaluateMargin evaluateMargin1"  >
					 <el-input class="evaluateInput" type="textarea" v-model="form.desc" placeholder="请选择活动区域"></el-input>
				</el-form-item>
				
				<el-form-item  class="evaluateMargin" >
					<el-button class="confirmBtn" type="primary" >确认</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 接收科室 --> 
		<el-dialog class="evaluateBox"   title=" 接收科室" :visible.sync="departVisible" width="602px" hight="356px" center>
			<ul>
				<li>
					<div>
						<img src="" />
					</div>
					<div class="">
						<h5>西南医院第三附属医院</h5>
						<div>神经内科</div>
					</div>
				</li>
				<li>
					<div>
						<img src="" />
					</div>
					<div class="">
						<h5>西南医院第三附属医院</h5>
						<div>神经内科</div>
					</div>
				</li>
			</ul>
		</el-dialog>
		<!-- 医生详情 --> 
		<el-dialog class="evaluateBox"   title=" 医生详情" :visible.sync="doctorVisible" width="602px" hight="356px" center>
			<ul>
				<li>
					<div>
						<img src="" />
					</div>
					<div class="">
						<h5>西南医院第三附属医院</h5>
						<div>神经内科</div>
					</div>
					<div>
						文字
					</div>
				</li>
				<li>
					<div>
						<img src="" />
					</div>
					<div class="">
						<h5>西南医院第三附属医院</h5>
						<div>神经内科</div>
					</div>
				</li>
			</ul>
		</el-dialog>
	</div>
</template>

<script>
export default {
    data() {
        return {
			centerDialogVisible: false, //是否发起会诊
			evaluateVisible:false,//是否打开评价
			departVisible:false,//是否接收科室
			doctorVisible:false,//医生详情
            form: ""
        };
    },
    methods: {},
    async created() {}
};
</script>

<style>
.consultation {
}
.startGroup input{
	width:162px;
	height: 28px;
}
.confirmBtn{
	width:100%;
	height: 39px;
	background: #4DA1FF;
border-radius: 4px;
color:white;
font-size: 12px;
line-height: 21px
}
.confirmBtnBox>div{
	margin-left:0
}
.evaluateInput>textarea{
	width:478px;
	height: 177px;
}
.evaluateMargin1{
	margin-bottom: 68px;
}
.evaluateMargin>div{
	margin-left: 0px !important
}
.evaluateBox .el-dialog__body{
	padding: 25px 60px;
}
</style>