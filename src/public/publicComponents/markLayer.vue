<template>
	<div class="mark">
        <div class="mark-inner">
            <slot></slot>
        </div>
    </div>
</template>

<script>
	export default {
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
	.mark{
	position:fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
    }
    .mark-inner{
        position: relative;
        width: 100%;
        height: 100%;
        background: rgba(37,38,49,.6);
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>