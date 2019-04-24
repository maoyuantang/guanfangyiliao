<!-- 综合影像 -->
<template>
	<div>
		<!-- <Timeline>
            <TimelineItem>
                <p class="visiting-hospital">重庆市医科大学第三附属医院</p>
                <p class="visiting-department">
                    <span class="visiting-department-on">on</span>
                    <span class="visiting-department-name">科室名称  |  门诊</span>
                </p>
                <div class="visiting-content">
                    <div class="visiting-content-item">
                        <p class="visiting-content-item-title">影像所见</p>
                        <div class="visiting-content-item-body">
                            <p class="visiting-content-item-body-content">
                                胸部CT平扫示，胸廓对称，胸壁软组织结构清晰。气管纵隔局中，纵隔内未见明显肿大淋巴结。气管支气管开口通常。两肺内见斑片状、多发粟粒结节影，密度不均，部分病变内见点状钙化影。双侧胸腔内未见液性密度影。心影大小形态未见异常。
                            </p>
                        </div>
                    </div>
                    <div class="visiting-content-item">
                        <p class="visiting-content-item-title">诊断结论</p>
                        <div class="visiting-content-item-body">
                            <p class="visiting-content-item-body-content">
                                两肺病变，考虑结核伴钙化。
                            </p>
                        </div>
                    </div>
                </div>
            </TimelineItem>
        </Timeline> -->
        <div class="btn-div">
            <el-button type="primary" size="mini">查看影像</el-button>
        </div>
	</div>
</template>

<script>
	export default {
        props:[
            "inData"
        ],
		components:{
			
		},
		watch:{
			
		},
		computed:{
			
		},
		
		data () {
			return {	
			}
		},
		
		methods:{
			
			
		},
		async created(){
			
		}
	}
</script>

<style scoped>
.visiting-hospital{
    color: var(--color18);
    line-height: 0.22rem;
}
.visiting-department-on{
    font-family: var(--fontFamily4);
    font-size: var(--fontSize1);
    color: var(--color19);
    line-height: 0.22rem;
}
.visiting-department-name{
    font-size: var(--fontSize1);
    color: var(--borderColor5);
}
.visiting-content{
    /* height: 0.76rem; */
    /* background: #F3F6FA; */
    border-radius: 4px;
}
.visiting-content-item-title{
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #030303;
    letter-spacing: -0.28px;
    text-align: left;
    padding-top: 0.33rem;
    padding-bottom: .2rem;
}
.visiting-content-item-body-content{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #5D5D5D;
    letter-spacing: 0.08px;
}
.btn-div{
    text-align: right;
}
</style>