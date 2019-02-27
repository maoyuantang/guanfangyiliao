<template>
	<div class="visiting">
		<Timeline>
            <TimelineItem>
                <p class="visiting-hospital">重庆市医科大学第三附属医院</p>
                <p class="visiting-department">
                    <span class="visiting-department-on">on</span>
                    <span class="visiting-department-name">科室名称  |  门诊</span>
                </p>
                <p class="visiting-content">主诉: 小孩夜晚不咳嗽，白天咳嗽；咳嗽无痰。</p>
            </TimelineItem>
            <TimelineItem>
                <p class="visiting-hospital">重庆市医科大学第三附属医院</p>
                <p class="visiting-department">
                    <span class="visiting-department-on">on</span>
                    <span class="visiting-department-name">科室名称  |  门诊</span>
                </p>
                <p class="visiting-content">主诉: 小孩夜晚不咳嗽，白天咳嗽；咳嗽无痰。</p>
            </TimelineItem>
            <TimelineItem>
                <p class="visiting-hospital">重庆市医科大学第三附属医院</p>
                <p class="visiting-department">
                    <span class="visiting-department-on">on</span>
                    <span class="visiting-department-name">科室名称  |  门诊</span>
                </p>
                <p class="visiting-content">主诉: 小孩夜晚不咳嗽，白天咳嗽；咳嗽无痰。</p>
            </TimelineItem>
            <TimelineItem>
                <p class="visiting-hospital">重庆市医科大学第三附属医院</p>
                <p class="visiting-department">
                    <span class="visiting-department-on">on</span>
                    <span class="visiting-department-name">科室名称  |  门诊</span>
                </p>
                <p class="visiting-content">主诉: 小孩夜晚不咳嗽，白天咳嗽；咳嗽无痰。</p>
            </TimelineItem>
        </Timeline>
	</div>
</template>

<script>
	export default {
		watch:{
			
		},
		data () {
			return {
				
			}
		},
		computed:{
			
		},
		methods:{
		},
		components:{
            
		},
		async created(){
		}
	}
</script>

<style scoped>
	.visiting{
		
	}
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
        height: 0.76rem;
        background: #F3F6FA;
        border-radius: 4px;
    }
</style>