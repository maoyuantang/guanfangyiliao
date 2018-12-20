import axios from '../plugs/axios.js'

export default {
	testA:function(){
		return axios({
			method:'get',
			url:'/testGet',
		})
	},
	testB:function(){
		return axios({
			method:'post',
			url:'/testPost',
		})
	},
}
