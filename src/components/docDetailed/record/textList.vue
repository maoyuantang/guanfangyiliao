<!-- 普通文本 列表 -->
<template>
	<div class="text-list">
		<div class="text-list-content">
            <div class="text-list-content-item" v-for="(item,index) in inData" :key="index">
                <p class="text-list-content-item-name">{{item.title}}</p>
                <p class="text-list-content-item-value">{{item.content}}</p>
            </div>
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
	.text-list{}
    .text-list-content{}
    .text-list-content-item{}
    .text-list-content-item-name{
        font-size: 0.14rem;
        font-weight: bold;
        color: #4cb0e7;
        padding-bottom: .35rem;
    }
    .text-list-content-item-value{
        font-size: 0.14rem;
        color: #4cb0e7;
        padding-bottom: .35rem;
    }
</style>