/**
 * api请求列表，返回promise（axios已经包装）
 */
import apiList from '../enums/apiList.js'
import axios from '../plugs/axios.js'
import qs from 'qs'

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