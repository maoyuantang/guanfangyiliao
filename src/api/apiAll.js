/**
 * api请求列表，返回promise（axios已经包装）
 */
import apiList from '../enums/apiList.js'
import axios from '../plugs/axios.js'
import qs from 'qs'
import getQueryHandle from './../public/publicJs/getQueryHandle.js'
import postQueryHandle from './../public/publicJs/postQueryHandle.js'




// import store from './../vuex/index.js'

// const sign = store.state.user.userInfo.sign;//签名
// console.log('sign')
// console.log(sign)



export const getLoginCode = data=>axios({//获取登录验证码
	method:'get',
	url:apiList.getLoginCode,
    params:data
    // {phone:'17302332851'}
})
export const login = data=>axios({//登录
	method:'post',
    url:apiList.login,
    data:data
    // qs.stringify(data)
})
export const hospitalDepartmentManagementSubsystemList = data=>axios({//医院科室管理子系统列表
	method:'get',
    url:apiList.hospitalDepartmentManagementSubsystemList,
    params:data
})
export const hospitalDoctorBusinessSubsystemList = data=>axios({//医院医生业务子系统列表
	method:'get',
    url:apiList.hospitalDoctorBusinessSubsystemList,
    params:data
})
export const fileDownload = data=>axios({//医院医生业务子系统列表
	method:'get',
    url:`${apiList.fileDownload}${data.id}`,//这个不太确定，等待后端答复
    params:data
})
export const initializeTheCreationOfHospital = data=>{//初始化创建医院
    const store = require('./../vuex/index.js');
    // const sign = store.state.user.userInfo.sign;
    const token = store.default.state.user.userInfo.token;
    const sign = postQueryHandle(data);
    return axios({
        method:'post',
        url:`${apiList.initializeTheCreationOfHospital}?token=${token}`,
        data:data,
        headers:{
            sign
        }
    })
}

export const userList = data=>{//首页-账号及权限-用户列表
    // const store = require('./../vuex/index.js');
    // const token = store.default.state.user.userInfo.token;
    const sign = getQueryHandle(data);
    return axios({
        method:'get',
        url:apiList.userList,
        params:data,
        headers:{
            sign
        }
    })
}

