import axios from '../plugs/axios.js'

export const testA = data=>axios({
	method:'get',
	url:'/testGet',
})
export const testC = data=>axios({
	method:'get',
	url:'/m/v1/api/login/sendCaptcha',
	params:{phone:'17302332851'}
})
// export default {
// 	testC:data=>axios({
// 		method:'get',
// 		url:'/m/v1/api/login/sendCaptcha',
// 		params:{phone:'1739944268'}
// 	}),
// 	testA:data=>axios({
// 		method:'get',
// 		url:'/testGet',
// 	})
// }
	









// module.exports =  {
// 	testA:function(){
// 		return axios({
// 			method:'get',
// 			url:'/testGet',
// 		})
// 	},
// 	testB:function(){
// 		return axios({
// 			method:'post',
// 			url:'/testPost',
// 		})
// 	},
// 	testC:str=>axios({
// 		method:'get',
// 		url:'/testPost',
// 		params:{phone:str}
// 	})
// }
