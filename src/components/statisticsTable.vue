<template>
<div class="statistics-table">
    <div class="statistics-table-option">
        <div class="statistics-table-option-left">
            <selftag @reback="gitIndex" v-model="test"></selftag>
        </div>
        <div class="statistics-table-option-right">
            <statisticsWay @reBack='getTime'></statisticsWay>
        </div>
    </div>
    <div class="statistics-table-content">
        <normalColumnChart  v-for="(item,index) in drawData" :key="index" v-model="item.data"></normalColumnChart>
    </div>
	{{msg}}
</div>
</template>

<script>
    import selftag from '../public/publicComponents/selftag.vue'
    import statisticsWay from '../public/publicComponents/statisticsWay.vue'
    import normalColumnChart from '../public/publicComponents/normalColumnChart.vue'
	export default {
		name : 'top',
		data(){
			return {
                msg:'statisticsTable',
                test:{
                    more:true,
                    title:'科室',
                    list:[
                        {
                            text:'全部'
                        },
                        {
                            text:'急诊科'
                        },
                        {
                            text:'骨科'
                        },
                        {
                            text:'普外科'
                        },
                        {
                            text:'肿瘤科'
                        },
                        {
                            text:'脑病科'
                        },
                    ]
                },
                drawData:[
                    {
                        data:{
                            dataAxis:['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'],
                            data:[220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234],
                            title:'测试测试,修改修改',
                            total:308
                        }
                    },
                    {
                        data:{
                            dataAxis:['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'],
                            data:[220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234],
                            title:'测试测试,修改修改',
                            total:308
                        }
                    },
                    {
                        data:{
                            dataAxis:['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'],
                            data:[220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234],
                            title:'测试测试,修改修改',
                            total:308
                        }
                    },
                    {
                        data:{
                            dataAxis:['点', '击', '柱', '子','点', '击', '柱', '子','点', '击', '柱', '子'],
                            data:[220, 182, 191, 234,220, 182, 191, 234,220, 182, 191, 234],
                            title:'测试测试,修改修改',
                            total:308
                        }
                    },
                    
                ]
			}
        },
        methods:{
            gitIndex(index){
                console.log(index)
            },
            getTime(time){

            }
        },
        components:{
            selftag,
            statisticsWay,
            normalColumnChart
        }
	}
</script>

<style scoped>
	.statistics-table{
        margin-top: 0.42rem;
        /* height: 300px; */
        background: #FFF;
        border: 1px solid var(--color5);
        box-shadow: 0 0.06rem 0.36rem 0 rgba(0,62,100,0.04);
        border-radius: 0.04rem;
    }
    .statistics-table-option{
        display: flex;
        justify-content: space-between;
        margin-top: 0.33rem;
        padding-left: 0.38rem;
        padding-right: 0.28rem;
    }
    .statistics-table-content{
        display: flex;
        flex-wrap: wrap;
        /* justify-content: space-around; */
    }
    .statistics-table-content{
        padding-left: 1.09rem;
        margin-top: 1.02rem;
    }
</style>