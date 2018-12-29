<template>
	<div class="login">
		login
        
	</div>
</template>

<script>
    import {testA} from '../api/test.js'
    import {testC} from '../api/test.js'
	export default {
		data () {
			return {
				
			}
		},
		methods:{
			
		},
		async created(){
            console.log(testC)
            testC()
            .then(res=>console.log(res))
            //  testA()
            // .then(res=>console.log(res))



            // test.testC()
            // .then(res=>console.log(res))

            //    console.log(Object.prototype.toString.call(testC)) 
            //     const test =  testC()
            //     console.log(test) 
        //     return
        //     const test = testC();
        //     console.log(test)

        //     return
        //    test()
        //    .then(res=>console.log(res))
		}
	}
</script>

<style scoped>
	.login{
        width: 100%;
        height: 100%;
        background: url(../assets/login_background.png) no-repeat;
        background-size: cover;
    }
</style>