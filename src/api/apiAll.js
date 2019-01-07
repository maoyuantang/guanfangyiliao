/**
 * api请求列表，返回promise（axios已经包装）
 * 请求头部分已经处理，只需传入参数（如果有的话）
 * 参数说明：参数分为两类(query和data),query => get参数（写在url上的参数，也就是api接口文档上说的‘请求参数’） data => post参数（也就是api接口文档上说的‘Body请求参数’）
 * 注意：若同时有query和data，query放在前边  =>  比如： test(query,data)
 * 注意：所有参数传入格式都是json => 比如 test({a:1},{b:2})//即使该json只有一个属性，也需要写成json格式
 */
import apiList from '../enums/apiList.js'
import axios from '../plugs/axios.js'
import qs from 'qs'
import getQueryHandle from './../public/publicJs/getQueryHandle.js'
import postQueryHandle from './../public/publicJs/postQueryHandle.js'

export const getLoginCode = query=>axios({//获取登录验证码
	method:'get',
	url:apiList.getLoginCode,
    params:query
})
export const login = data=>axios({//登录
	method:'post',
    url:apiList.login,
    data:data
})
export const hospitalDepartmentManagementSubsystemList = query=>{//3.1.首页-医院科室管理子系统列表
    return axios({
        method:'get',
        url:`${apiList.hospitalDepartmentManagementSubsystemList}?token=${query.token}&orgCode=${query.orgCode}`,
    })
}
export const hospitalDoctorBusinessSubsystemList = query=>axios({//医院医生业务子系统列表
	method:'get',
    url:`${apiList.hospitalDoctorBusinessSubsystemList}?token=${query.token}&orgCode=${query.orgCode}`,
})
export const fileDownload = query=>{//5.1.文件下载
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:`${apiList.fileDownload}${query.id}`,//这个不太确定，等待后端答复
        params:query,
        headers:{
            sign
        }
    })
}
export const initializeTheCreationOfHospital = (query,data)=>{//初始化创建医院
    // const store = require('./../vuex/index.js');
    // const token = store.default.state.user.userInfo.token;
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.initializeTheCreationOfHospital}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const userList = query=>{//首页-账号及权限-用户列表
    // const store = require('./../vuex/index.js');
    // const token = store.default.state.user.userInfo.token;
    const sign = getQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.userList,
        params:query,
        headers:{
            sign
        }
    })
}
export const fetchHospitalDepts = query=>{//13.4.3 查看计划详情
    return axios({
        method:'get',
        url:apiList.fetchHospitalDepts,
        params:query,
    })
}
export const createUser = (query,data)=>{//3.3首页-账号及权限-创建用户
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.createUser}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const updateUser = (query,data)=>{//3.4首页-账号及权限-编辑用户
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.updateUser}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const deleteUser = query=>{//3.5首页-账号及权限-删除用户
    const sign = postQueryHandle(query);
    return axios({
        method:'post',
        url:apiList.deleteUser,
        url:`${apiList.deleteUser}?token=${query.token}&userId=${query.userId}`,
        headers:{
            sign
        }
    })
}
export const userInfo = query=>{//13.4.3 查看计划详情
    return axios({
        method:'get',
        url:apiList.userInfo,
        params:query,
    })
}
export const createQrInfo = ()=>axios({//4.4.创建登录码（WEB）
	method:'get',
	url:apiList.createQrInfo
})
export const scanMonitor = query=>axios({//4.5.登录码扫码监听（WEB）
	method:'get',
	url:apiList.scanMonitor,
    params:query
})
export const updateHospital = (query,data)=>{//8.2.更新医院名称和密码
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.updateHospital}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const fetchHospitalList = query=>axios({//8.3.医院列表查询
	method:'get',
	url:apiList.fetchHospitalList,
    params:query
})
export const fetchAllSubSystem = query=>axios({//8.4.获取医院子系统设置列表
	method:'get',
	url:apiList.fetchAllSubSystem,
    params:query
})
export const updateSubSystemRel = (query,data)=>{//8.5.变更医院子系统授权
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.updateSubSystemRel}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const createHospitalDept = (query,data)=>{//8.6.新增医院科室
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.createHospitalDept}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const updateHospitalDept = (query,data)=>{//8.7.变更科室名称
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.updateHospitalDept}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const deleteHospitalDept = (query,data)=>{//8.8.删除医院科室
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.deleteHospitalDept}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const settingsList = query=>{//8.9获取协作人员设置树(这个留着实验实验)
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.settingsList,
        params:query,
        headers:{
            sign
        }
    })
}
export const settingsUpdate = (query,data)=>{//8.10超级管理员更新协作人员
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.settingsUpdate}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const addCloud = (query,data)=>{//11.1.新增云存储业务
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.addCloud}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const updateCloud = (query,data)=>{//11.2.更新云存储业务
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.updateCloud}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const cloudDetail = query=>{//11.3.查看云存储服务
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.cloudDetail,
        params:query,
        headers:{
            sign
        }
    })
}
export const publishArticle = (query,data)=>{//13.1.1 文章发布【医生web】
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.publishArticle}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const editArticle = (query,data)=>{//13.1.2 文章编辑【医生web】
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.editArticle}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const deleteArticle = (query,data)=>{//13.1.3 删除文章
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.deleteArticle}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const getArticleDetails = query=>{//13.1.4 查看文章详情
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.getArticleDetails,
        params:query,
        headers:{
            sign
        }
    })
}
export const queryTypeList = query=>{//13.1.5  获取文章类型列表
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.queryTypeList,
        params:query,
        headers:{
            sign
        }
    })
}
export const submitArticleComment = (query,data)=>{//13.1.8 提交评论
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.submitArticleComment}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const changeArticleStatus = query=>{//13.1.9 改变文章状态
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.changeArticleStatus,
        params:query,
        headers:{
            sign
        }
    })
}
export const queryArticleList = query=>{//13.1.10 获取文章列表【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.queryArticleList,
        params:query,
        headers:{
            sign
        }
    })
}
export const add = (query,data)=>{//13.2.1 新增随访模板
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.add}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const get = query=>{//13.2.2 获取模板详情
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.get,
        params:query,
        headers:{
            sign
        }
    })
}
export const update = (query,data)=>{//13.2.3 编辑随访模板
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.update}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const deleteTemplate = (query,data)=>{//13.2.4 删除随访模板
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.deleteTemplate}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const getTemplate = query=>{//13.2.5 获取随访模板列表【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.getTemplate,
        params:query,
        headers:{
            sign
        }
    })
}
export const createFollowUpPlan = (query,data)=>{//13.2.6 创建随访计划
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.createFollowUpPlan}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const getFollowUpPlan = query=>{//13.2.7 查看随访计划详情
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.getFollowUpPlan,
        params:query,
        headers:{
            sign
        }
    })
}
export const userListUnfFollowUpPlan = query=>{//13.2.8 用户获取未完成随访计划
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.userListUnfFollowUpPlan,
        params:query,
        headers:{
            sign
        }
    })
}
export const userListFinFollowUpPlan = query=>{//13.2.9 用户获取已完成的随访计划
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.userListFinFollowUpPlan,
        params:query,
        headers:{
            sign
        }
    })
}
export const managerGetPlanList = query=>{//13.2.10 管理者获取随访计划列表
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.managerGetPlanList,
        params:query,
        headers:{
            sign
        }
    })
}
export const todayFollowup = query=>{//13.3.1 今日随访【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.todayFollowup,
        params:query,
        headers:{
            sign
        }
    })
}
export const historyFollowup = query=>{//13.3.2 历史随访【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.historyFollowup,
        params:query,
        headers:{
            sign
        }
    })
}
export const changeStatus = (query,data)=>{//13.3.3 标记随访状态
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.changeStatus}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const todayPlan = query=>{//13.3.4 今日计划【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.todayPlan,
        params:query,
        headers:{
            sign
        }
    })
}
export const planHistory = query=>{//13.3.5 历史计划【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.planHistory,
        params:query,
        headers:{
            sign
        }
    })
}
export const signStatus = query=>{//13.3.6 标记计划状态
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.signStatus,
        params:query,
        headers:{
            sign
        }
    })
}
export const savePlan = (query,data)=>{//13.4.1 创建计划
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.savePlan}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const changePlan = (query,data)=>{//13.4.2 修改计划
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.changePlan}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}
export const getPlan = query=>{//13.4.3 查看计划详情
    const sign = postQueryHandle(query);
    return axios({
        method:'get',
        url:apiList.getPlan,
        params:query,
        headers:{
            sign
        }
    })
}
export const cancelPlan = (query,data)=>{//13.4.4 取消计划
    const sign = postQueryHandle(Object.assign({},data,query));
    return axios({
        method:'post',
        url:`${apiList.cancelPlan}?token=${query.token}`,
        data:data,
        headers:{
            sign
        }
    })
}