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

export const getLoginCode = query => axios({//获取登录验证码
    method: 'get',
    url: apiList.getLoginCode,
    params: query
})
export const login = data => axios({//登录
    method: 'post',
    url: apiList.login,
    data: data
})
export const hospitalDepartmentManagementSubsystemList = query => {//3.1.首页-医院科室管理子系统列表
    return axios({
        method: 'get',
        url: `${apiList.hospitalDepartmentManagementSubsystemList}?token=${query.token}&orgCode=${query.orgCode}`,
    })
}
export const hospitalDoctorBusinessSubsystemList = query => axios({//医院医生业务子系统列表
    method: 'get',
    url: `${apiList.hospitalDoctorBusinessSubsystemList}?token=${query.token}&orgCode=${query.orgCode}`,
})
export const fileDownload = query => {//5.1.文件下载
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: `${apiList.fileDownload}${query.id}`,//这个不太确定，等待后端答复
        params: query,
        headers: {
            sign
        }
    })
}
export const initializeTheCreationOfHospital = (query, data) => {//初始化创建医院
    // const store = require('./../vuex/index.js');
    // const token = store.default.state.user.userInfo.token;
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.initializeTheCreationOfHospital}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const userList = query => {//首页-账号及权限-用户列表
    // const store = require('./../vuex/index.js');
    // const token = store.default.state.user.userInfo.token;
    const sign = getQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.userList,
        params: query,
        headers: {
            sign
        }
    })
}
export const getAllHospital = query => {//2.2.获取医院列表
    return axios({
        method: 'get',
        url: apiList.getAllHospital,
        params: query,
    })
}
export const fetchHospitalDepts = query => {//2.2.获取医院科室列表
    return axios({
        method: 'get',
        url: apiList.fetchHospitalDepts,
        params: query,
    })
}
export const fetchDoctorSubSystems = query => {//3.2.1.首页-医院医生业务子系统列表（新）
    return axios({
        method: 'get',
        url: apiList.fetchDoctorSubSystems,
        params: query,
    })
}
export const createUser = (query, data) => {//3.3首页-账号及权限-创建用户
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.createUser}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const updateUser = (query, data) => {//3.4首页-账号及权限-编辑用户
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.updateUser}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const deleteUser = query => {//3.5首页-账号及权限-删除用户
    const sign = postQueryHandle(query);
    return axios({
        method: 'post',
        url: apiList.deleteUser,
        url: `${apiList.deleteUser}?token=${query.token}&userId=${query.userId}`,
        headers: {
            sign
        }
    })
}
export const userInfo = query => {//13.4.3 查看计划详情
    return axios({
        method: 'get',
        url: apiList.userInfo,
        params: query,
    })
}
export const createQrInfo = () => axios({//4.4.创建登录码（WEB）
    method: 'get',
    url: apiList.createQrInfo
})
export const scanMonitor = query => axios({//4.5.登录码扫码监听（WEB）
    method: 'get',
    url: apiList.scanMonitor,
    params: query
})
export const queryByDoctorPage = query => {//8.1.医生WEB分页列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryByDoctorPage,
        params: query,
        headers: {
            sign
        }
    })
}
export const updateHospital = (query, data) => {//8.2.更新医院名称和密码
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.updateHospital}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const fetchHospitalList = query => axios({//8.3.医院列表查询
    method: 'get',
    url: apiList.fetchHospitalList,
    params: query
})
export const fetchAllSubSystem = query => axios({//8.4.获取医院子系统设置列表
    method: 'get',
    url: apiList.fetchAllSubSystem,
    params: query
})
export const updateSubSystemRel = (query, data) => {//8.5.变更医院子系统授权
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.updateSubSystemRel}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const createHospitalDept = (query, data) => {//8.6.新增医院科室
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.createHospitalDept}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const updateHospitalDept = (query, data) => {//8.7.变更科室名称
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.updateHospitalDept}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const deleteHospitalDept = (query, data) => {//8.8.删除医院科室
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.deleteHospitalDept}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
// export const settingsList = query=>{//8.9获取协作人员设置树(这个留着实验实验)
//     const sign = postQueryHandle(query);
//     return axios({
//         method:'get',
//         url:apiList.settingsList,
//         params:query,
//         headers:{
//             sign
//         }
//     })
// }
// export const settingsUpdate = (query,data)=>{//8.10超级管理员更新协作人员
//     const sign = postQueryHandle(Object.assign({},data,query));
//     return axios({
//         method:'post',
//         url:`${apiList.settingsUpdate}?token=${query.token}`,
//         data:data,
//         headers:{
//             sign
//         }
//     })
// }
export const addCloud = (query, data) => {//11.1.新增云存储业务
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.addCloud}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const updateCloud = (query, data) => {//11.2.更新云存储业务
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.updateCloud}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const cloudDetail = query => {//11.3.查看云存储服务
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.cloudDetail,
        params: query,
        headers: {
            sign
        }
    })
}
export const publishArticle = (query, data) => {//13.1.1 文章发布【医生web】
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.publishArticle}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const editArticle = (query, data) => {//13.1.2 文章编辑【医生web】
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.editArticle}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const deleteArticle = (query, data) => {//13.1.3 删除文章
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.deleteArticle}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const getArticleDetails = query => {//13.1.4 查看文章详情
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getArticleDetails,
        params: query,
        headers: {
            sign
        }
    })
}
export const queryTypeList = query => {//13.1.5  获取文章类型列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryTypeList,
        params: query,
        headers: {
            sign
        }
    })
}
export const submitArticleComment = (query, data) => {//13.1.8 提交评论
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.submitArticleComment}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const changeArticleStatus = query => {//13.1.9 改变文章状态
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.changeArticleStatus,
        params: query,
        headers: {
            sign
        }
    })
}
export const queryArticleList = query => {//13.1.10 获取文章列表【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryArticleList,
        params: query,
        headers: {
            sign
        }
    })
}
export const add = (query, data) => {//13.2.1 新增随访模板
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.add}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const webGetTitleList = (query) => {//10.2.11获取随访标题列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.webGetTitleList,
        params: query,
        headers: {
            sign
        }
    })
}

export const getFollowDetail = query => {//13.2.2 获取模板详情
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getFollowDetail,
        params: query,
        headers: {
            sign
        }
    })
}
export const update = (query, data) => {//13.2.3 编辑随访模板
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.update}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const deleteTemplate = (query, data) => {//13.2.4 删除随访模板
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.deleteTemplate}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const getTemplate = query => {//13.2.5 获取随访模板列表【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getTemplate,
        params: query,
        headers: {
            sign
        }
    })
}
export const createFollowUpPlan = (query, data) => {//13.2.6 创建随访计划
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.createFollowUpPlan}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const getFollowUpPlan = query => {//13.2.7 查看随访计划详情
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getFollowUpPlan,
        params: query,
        headers: {
            sign
        }
    })
}
export const userListUnfFollowUpPlan = query => {//13.2.8 用户获取未完成随访计划
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.userListUnfFollowUpPlan,
        params: query,
        headers: {
            sign
        }
    })
}
export const userListFinFollowUpPlan = query => {//13.2.9 用户获取已完成的随访计划
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.userListFinFollowUpPlan,
        params: query,
        headers: {
            sign
        }
    })
}
export const managerGetPlanList = query => {//13.2.10 管理者获取随访计划列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.managerGetPlanList,
        params: query,
        headers: {
            sign
        }
    })
}
export const todayFollowup = query => {//13.3.1 今日随访【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.todayFollowup,
        params: query,
        headers: {
            sign
        }
    })
}
export const historyFollowup = query => {//13.3.2 历史随访【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.historyFollowup,
        params: query,
        headers: {
            sign
        }
    })
}
export const changeStatus = (query, data) => {//13.3.3 标记随访状态
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.changeStatus}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const todayPlan = query => {//13.3.4 今日计划【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.todayPlan,
        params: query,
        headers: {
            sign
        }
    })
}
export const planHistory = query => {//13.3.5 历史计划【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.planHistory,
        params: query,
        headers: {
            sign
        }
    })
}

export const signStatus = (query, data) => {//13.4.4 取消计划
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.signStatus}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const savePlan = (query, data) => {//13.4.1 创建计划
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.savePlan}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const changePlan = (query, data) => {//13.4.2 修改计划
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.changePlan}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const getPlan = query => {//13.4.3 查看计划详情
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getPlan,
        params: query,
        headers: {
            sign
        }
    })
}
export const cancelPlan = (query, data) => {//13.4.4 取消计划
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.cancelPlan}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const managerGetDeviceList = query => {//13.5.2 管理获取设备列表【管理web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.managerGetDeviceList,
        params: query,
        headers: {
            sign
        }
    })
}
export const getUseDetail = query => {//13.5.3 管理查看单个设备使用详情【管理web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getUseDetail,
        params: query,
        headers: {
            sign
        }
    })
}
export const getAlertDetail = query => {//13.5.4 管理查看告警详情【管理web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getAlertDetail,
        params: query,
        headers: {
            sign
        }
    })
}
export const fetchChatSession = (query, data) => {//14.1.创建或获取单聊会话
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.fetchChatSession}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const putUser = (query, data) => {//14.2.新增成员加入聊天会话
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.putUser}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const removeUser = (query, data) => {//14.3.从聊天会话中移除成员
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.removeUser}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const fetchHistoryMessage = (query, data) => {////14.4.拉取历史消息记录
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.fetchHistoryMessage}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const fetchSessionMembers = (query, data) => {//14.5.获取会话成员列表
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.fetchSessionMembers}?token=${query.token}`,
        data: data,
        // headers:{
        //     sign
        // }
    })
}
export const userSendMessageId = (query, data) => {//14.6.用户接收到消息后更新同步
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.userSendMessageId}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const fetchReadMessageId = (query, data) => {//14.7.医生进入会话获取用户已读位置
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.fetchReadMessageId}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const fetchNoticeInfo = query => {//14.8.获取通知列表
    return axios({
        method: 'get',
        url: apiList.fetchNoticeInfo,
        params: query
    })
}
export const fetchSyncMaxVersionId = query => {//14.9.获取最大同步指令的版本号
    return axios({
        method: 'get',
        url: apiList.fetchSyncMaxVersionId,
        params: query
    })
}
export const fetchSyncInfo = query => {//14.10.拉取同步消息列表
    return axios({
        method: 'get',
        url: apiList.fetchSyncInfo,
        params: query
    })
}
export const synergyManageList = query => {//15.1首页-账号及权限-院外协作列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.synergyManageList,
        params: query,
        headers: {
            sign
        }
    })
}
export const synergyManageInvite = (query, data) => {//15.2首页-账号及权限-院外协作邀请
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.synergyManageInvite}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const synergyManageUpdate = (query, data) => {//15.3首页-账号及权限-更新协作范围
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.synergyManageUpdate}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const synergyManageDelete = query => {//15.4首页-账号及权限-删除协作医生
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.synergyManageDelete,
        params: query,
        headers: {
            sign
        }
    })
}
export const addConsultation = (query, data) => {//2.新增会诊
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.addConsultation}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const appraiseConsultation = (query, data) => {//3.评价会诊
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.appraiseConsultation}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const updateConsultationStatus = (query, data) => {//4.更新会诊状态
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.updateConsultationStatus}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const queryByManagerPage = query => {//5.管理端WEB分页列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryByManagerPage,
        params: query,
        headers: {
            sign
        }
    })
}
export const queryByDeptList = query => {//6.查询会诊申请科室列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryByDeptList,
        params: query,
        headers: {
            sign
        }
    })
}
export const queryByAppraiseList = query => {//7.查询会诊评论列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryByAppraiseList,
        params: query,
        headers: {
            sign
        }
    })
}
export const queryStatisticalByApplication = query => {//8.查询申请科室统计
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryStatisticalByApplication,
        params: query,
        headers: {
            sign
        }
    })
}
export const queryStatisticalBySponsor = query => {//9.查询发起科室统计
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryStatisticalBySponsor,
        params: query,
        headers: {
            sign
        }
    })
}
export const getxiezuoList = (query, data) => {//13.1.8 提交评论
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.getxiezuoList}?token=${query.token}`,
        data: data,
        headers: {
            sign
        }
    })
}
export const managePage = query => {//9.2协作管理列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.managePage,
        params: query,
        headers: {
            sign
        }
    })
}
export const manageStatistics = query => {//9.3协作管理统计
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.manageStatistics,
        params: query,
        headers: {
            sign
        }
    })
}
export const synergyPage = query => {//9.4医生协作列表 
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.synergyPage,
        params: query,
        headers: {
            sign
        }
    })
}
export const enableSynergyDoctor = query => {//9.5获取可协作医生（本院、院外协作）
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.enableSynergyDoctor,
        params: query,
        headers: {
            sign
        }
    })
}
export const sendSynergy = (query, data) => {//9.6发起协作
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.sendSynergy}`,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const synergyChangeStatus = query => {//9.8进入协作
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.synergyChangeStatus,
        params: query,
        headers: {
            sign
        }
    })
}
export const synergyInto = query => {//9.8进入协作
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.synergyInto,
        params: query,
        headers: {
            sign
        }
    })
}
export const receiveDept = query => {//9.9本院参与科室
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.receiveDept,
        params: query,
        headers: {
            sign
        }
    })
}
export const CONSULTATIONHOSPITAL = query => {//9.9本院参与科室
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.CONSULTATIONHOSPITAL,
        params: query,
        headers: {
            sign
        }
    })
}
export const CONSULTATIONDER = query => {//9.9本院参与科室
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.CONSULTATIONDER,
        params: query,
        headers: {
            sign
        }
    })
}

export const receiveDoctor = query => {//9.10本院参与科室
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.receiveDoctor,
        params: query,
        headers: {
            sign
        }
    })
}
export const createVideoRoom = (query, data) => {//1.3.创建视频
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.createVideoRoom,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const inviteReply = (query, data) => {//1.3.创建视频
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.inviteReply,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}

export const storageUsers = (query, data) => {//1.4.进入/退出视频房间
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.storageUsers,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const bindSession = (query, data) => {//1.4.进入/退出视频房间
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.bindSession,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}


export const queryStorageUsers = query => {//1.5.根据房间号获取用户列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: `${apiList.queryStorageUsers}${query.conferenceId}`,
        params: query,
        headers: {
            sign
        }
    })
}


export const closeVideoRoom = query => {//1.6.删除视频会议房间   注意：除了需要传入query 还需要parse
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: `${apiList.closeVideoRoom}${query.cID}?token=${query.token}`,
        // params:query,
        headers: {
            sign
        }
    })
}
export const videoMeetingInvited = query => {//1.7.邀请用户进行视频通话 注意：除了需要传入query 还需要parse
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: `${apiList.videoMeetingInvited}${query.userId}/${query.conferenceId}?token=${query.token}`,
        // params:query,
        headers: {
            sign
        }
    })
}
export const invitedOff = query => {//1.8.通知邀请者已经进入会议视频 注意：除了需要传入query 还需要parse
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: `${apiList.invitedOff}${query.userId}/${query.conferenceId}?token=${query.token}`,
        // params:query,
        headers: {
            sign
        }
    })
}
export const fsDownload = query => {//1.9.文件下载 注意：除了需要传入query 还需要parse
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: `${apiList.fsDownload}${query.id}`,
        params: query,
        headers: {
            sign
        }
    })
}
export const fetchHospitalRel = query => {//8.11.获取医院上下级是否已选中列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.fetchHospitalRel,
        params: query,
        headers: {
            sign
        }
    })
}
export const sendBtnVisable = query => {//8.11.获取医院上下级是否已选中列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.sendBtnVisable,
        params: query,
        headers: {
            sign
        }
    })
}

export const modelInsert = (query, data) => {//10.3.1 创建满意度模板
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.modelInsert,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const getModelInsert = query => {//10.3.2 获取模板列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getModelInsert,
        params: query,
        headers: {
            sign
        }
    })
}
export const editModel = (query, data) => {//10.3.3 编辑模板
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.editModel,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const deleteModel = (query, data) => {//10.3.4 删除模板
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.deleteModel,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const getTemplateInfo = query => {//10.3.5 查看模板详情
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getTemplateInfo,
        params: query,
        headers: {
            sign
        }
    })
}
export const getTitleList = query => {//10.3.6 获取可使用的模板标题列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getTitleList,
        params: query,
        headers: {
            sign
        }
    })
}
export const examine = (query, data) => {//10.3.7 模板审核
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.examine,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const getMissileList = query => {//10.3.8 获取可发送的用户列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getMissileList,
        params: query,
        headers: {
            sign
        }
    })
}
export const publishNotice = (query, data) => {//10.3.9 通过短信发送满意度调查
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.publishNotice,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const rePublish = (query, data) => {//10.3.10 失败重发
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.rePublish,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const getResultList = query => {//10.3.11 调查管理列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getResultList,
        params: query,
        headers: {
            sign
        }
    })
}
export const sendExport = query => {//10.3.12 导出短信回复
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.sendExport,
        params: query,
        headers: {
            sign
        }
    })
}
export const createInquiry = (query, data) => {//10.6.1 新建问诊模板【医生web】
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.createInquiry,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const editInquiry = (query, data) => {//10.6.2 编辑问诊模板【医生web】
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.editInquiry,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const queryInquiry = query => {//10.6.3 查询问诊模板
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryInquiry,
        params: query,
        headers: {
            sign
        }
    })
}
export const deleteInquiry = (query, data) => {//10.6.4 删除问诊模板【医生web】
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.deleteInquiry,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const queryList = query => {//10.6.5 获取问诊模板列表【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryList,
        params: query,
        headers: {
            sign
        }
    })
}
export const getModelTitleList = query => {//10.6.6 获取问诊模板标题列表【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getModelTitleList,
        params: query,
        headers: {
            sign
        }
    })
}
export const generateInquiryPlan = (query, data) => {//10.6.8 生成问诊计划
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.generateInquiryPlan,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const handleInquiryPlan = (query, data) => {//10.6.9 用户处理问诊计划
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.handleInquiryPlan,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const queryInquiryPlan = query => {//10.6.10 查看问诊计划详情
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryInquiryPlan,
        params: query,
        headers: {
            sign
        }
    })
}
export const INHOSPITAL = query => {//10.7.1 获取住院随访统计
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.INHOSPITAL,
        params: query,
        headers: {
            sign
        }
    })
}
export const OUTPATIENT = query => {//10.7.2 获取门诊随访统计
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.OUTPATIENT,
        params: query,
        headers: {
            sign
        }
    })
}
export const alertGet = query => {//10.9.1 获取设备告警信息【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.alertGet,
        params: query,
        headers: {
            sign
        }
    })
}
export const myFollowDetailFun = query => {//10.9.1 获取设备告警信息【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.myFollowDetailFun,
        params: query,
        headers: {
            sign
        }
    })
}

export const alertSwitch = (query, data) => {//10.9.2 设备告警开关改变【医生web】
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.alertSwitch,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const alertSet = (query, data) => {//10.9.3 告警值修改【医生web】
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.alertSet,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const getSettingsList = query => {//8.9获取协作人员设置树
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getSettingsList,
        params: query,
        headers: {
            sign
        }
    })
}
export const fetchUserCloud = query => {//11.4.云存储用户统计信息列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.fetchUserCloud,
        params: query,
        headers: {
            sign
        }
    })
}
export const viewCloud = query => {//11.3.查看云存储服务
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.viewCloud,
        params: query,
        headers: {
            sign
        }
    })
}
export const addClinic = (query, data) => {//7.1新增远程门诊业务
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.addClinic,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const updateClinic = (query, data) => {//7.2更新远程门诊业务
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.updateClinic,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const clinicDetail = query => {//7.3查看远程门诊业务详情
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.clinicDetail,
        params: query,
        headers: {
            sign
        }
    })
}
export const disableClinic = (query, data) => {//7.4禁用远程门诊业务和诊室
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.disableClinic,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const searchClinic = query => {//7.5根据条件搜索在线诊室业务
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.searchClinic,
        params: query,
        headers: {
            sign
        }
    })
}
export const onlineRoomsByDoctor = query => {//7.6(WEB医生)获取所有该医生的在线诊室
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.onlineRoomsByDoctor,
        params: query,
        headers: {
            sign
        }
    })
}
export const addPrescription = (query, data) => {//7.8开处方
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.addPrescription,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const updatePrescription = (query, data) => {//7.9审核处方
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.updatePrescription,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const reviewList = query => {//7.10按审方医生获取处方审核列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.reviewList,
        params: query,
        headers: {
            sign
        }
    })
}
export const prescriptionDetailByCondition = query => {//7.11根据条件获取处方信息
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.prescriptionDetailByCondition,
        params: query,
        headers: {
            sign
        }
    })
}
export const prescriptionDetailById = query => {//7.12根据处方id获取处方电子版
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.prescriptionDetailById,
        params: query,
        headers: {
            sign
        }
    })
}
export const drugSendRecord = query => {//7.13根据处方id获取处方发货记录
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.drugSendRecord,
        params: query,
        headers: {
            sign
        }
    })
}



//唐茂原
export const drugHaulStatus = query => {//7.2.5根据处方id获取处方的物流状态 
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.drugHaulStatus,
        params: query,
        headers: {
            sign
        }
    })
}









export const drugsByCondition = query => {//7.16药品名称搜索药品信息
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.drugsByCondition,
        params: query,
        headers: {
            sign
        }
    })
}
export const clinicOrders = query => {//7.18(WEB医生)获取所有该诊室的订单信息
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.clinicOrders,
        params: query,
        headers: {
            sign
        }
    })
}
export const clinicOrder = query => {//7.4.2(WEB医生)获取所有该诊室的订单信息 
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.clinicOrder,
        params: query,
        headers: {
            sign
        }
    })
}
export const settingsUpdate = (query, data) => {//8.10超级管理员更新协作人员
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.settingsUpdate,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const getConsultationTree = query => {//8.13获取会诊范围树
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getConsultationTree,
        params: query,
        headers: {
            sign
        }
    })
}
export const updateConsultationTree = (query, data) => {//8.14更新会诊范围
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.updateConsultationTree,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const queryConsultationInformList = query => {//10.邀请会诊范围树
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryConsultationInformList,
        params: query,
        headers: {
            sign
        }
    })
}
export const sponsorConsultationInform = (query, data) => {//11.发起会诊通知
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.sponsorConsultationInform,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
// 唐茂原
export const toolDept = query => {//1.21.1.科室工具栏
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolDept,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolRxReviewStatus = query => {//1.21.2.处方审核状态
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolRxReviewStatus,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolRxSendStatus = query => {//1.21.3.处方配送状态
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolRxSendStatus,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolRxReviewDoctors = query => {//1.21.4.处方审核医生
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolRxReviewDoctors,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolRxSendDoctors = query => {//1.21.5.处方发药医生
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolRxSendDoctors,
        params: query,
        headers: {
            sign
        }
    })
}
export const hospitalsByCloud = query => {//8.21.6（仅用于云存储）获取所有医院机构码和医院名
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.hospitalsByCloud,
        params: query,
        headers: {
            sign
        }
    })
}

// 随访筛选列表

export const toolFollowupType = query => { //随访类型
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolFollowupType,
        params: query,
        headers: {
            sign
        }
    })
}
export const todayAlert = query => {//2.5.7 今日告警【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.todayAlert,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolFollowupMode = query => { //随访方式
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolFollowupMode,
        params: query,
        headers: {
            sign
        }
    })
}
export const alertHistory = query => {//2.5.8 历史告警【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.alertHistory,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolFollowupContent = query => { //随访内容
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolFollowupContent,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolSurveyType = query => { //1.21.18.调查类型
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolSurveyType,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolSurveyMode = query => { //1.21.19.调查方式
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolSurveyMode,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolDeviceType = query => { //1.21.20.设备类型
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolDeviceType,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolFollowupHasPlan = query => { //1.21.21.有无随访计划
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolFollowupHasPlan,
        params: query,
        headers: {
            sign
        }
    })
}

//我的随风

export const myFollowup = query => { //我的随访用户列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.myFollowup,
        params: query,
        headers: {
            sign
        }
    })
}
export const phoneFollowupSwitch = (query, data) => {//
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.phoneFollowupSwitch,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const queryPageByDoctorWeb = query => { //10.医生WEB查询评估模板分页列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryPageByDoctorWeb,
        params: query,
        headers: {
            sign
        }
    })
}



export const getResultGraph = query => { //10.3.1.3 统计
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getResultGraph,
        params: query,
        headers: {
            sign
        }
    })
}


export const doctorsByOrgCodeAndDeptId = query => { //1.22医院机构码和科室id获取医生集合
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.doctorsByOrgCodeAndDeptId,
        params: query,
        headers: {
            sign
        }
    })
}
export const protocols = query => { //17.12 获取该科室的协议
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.protocols,
        params: query,
        headers: {
            sign
        }
    })
}
export const protocolById = query => { //17.13 根据协议id获取协议
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.protocolById,
        params: query,
        headers: {
            sign
        }
    })
}
export const stencilName = query => { //17.1获取所有业务模版名
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.stencilName,
        params: query,
        headers: {
            sign
        }
    })
}
export const fetchOrderInfo = query => { //6.7.家医系统中订单列表（WEB端使用）
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.fetchOrderInfo,
        params: query,
        headers: {
            sign
        }
    })
}
export const updateOrderServices = (query, data) => {//11.发起会诊通知
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.updateOrderServices,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const fetchMzOrderInfo = query => { //6.8.远程门诊订单列表弹框数据（WEB端使用）
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.fetchMzOrderInfo,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolBusinessType = query => { //1.21.14.业务类型
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolBusinessType,
        params: query,
        headers: {
            sign
        }
    })
}
export const orderYcmzCharts = query => { //6.9.远程门诊订单统计柱状图
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.orderYcmzCharts,
        params: query,
        headers: {
            sign
        }
    })
}
export const orderRxCharts = query => { //6.10.处方订单统计柱状图
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.orderRxCharts,
        params: query,
        headers: {
            sign
        }
    })
}

// 健康档案系统

export const getFamilyMemberInfo = query => { //6.10.处方订单统计柱状图
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getFamilyMemberInfo,
        params: query,
        headers: {
            sign
        }
    })
}
export const businessType = query => { //17.3(管理、APP患者)获取所有业务类型
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.businessType,
        params: query,
        headers: {
            sign
        }
    })
}
export const addBusiness = (query, data) => {//17.4新增业务
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.addBusiness,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const stencilModel = query => { //17.2传入模版名获取模版
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.stencilModel,
        params: query,
        headers: {
            sign
        }
    })
}
export const updateHospitalRel = (query, data) => {//8.12.更新医院上下级医院关系
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.updateHospitalRel,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const toolSynergyStatus = query => { //1.21.8.协作状态
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolSynergyStatus,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolMedicalType = query => { //1.21.26.分级诊疗-类型
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolMedicalType,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolMedicalGrading = query => { //1.21.27.分级诊疗-分级
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolMedicalGrading,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolReferralType = query => { //1.21.28.双向转诊-方向
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolReferralType,
        params: query,
        headers: {
            sign
        }
    })
}
export const getChildrenByDepartmentId = query => { //1.21.28.双向转诊-方向
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getChildrenByDepartmentId,
        params: query,
        headers: {
            sign
        }
    })
}
export const businessCondition = query => { //17.7按条件筛选业务
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.businessCondition,
        params: query,
        headers: {
            sign
        }
    })
}
export const updateBusiness = (query, data) => {//17.5更新业务
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.updateBusiness,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const queryPageByPushAndQuery = query => { //1.查询提取和推送档案分页列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryPageByPushAndQuery,
        params: query,
        headers: {
            sign
        }
    })
}
export const queryStatisticalData = query => { //2.查询提取统计
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryStatisticalData,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolMemberGroup = query => { //1.21.25.健康档案/随访-用户分组
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolMemberGroup,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolArchivesType = query => { //1.21.10.档案分类
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolArchivesType,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolUserSource = query => { //1.21.11.用户来源
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolUserSource,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolArchivesInside = query => { //1.21.12.院内档案
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolArchivesInside,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolConsultationType = query => { //1.21.6.会诊类型
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolConsultationType,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolConsultationStatus = query => { //1.21.7.会诊状态
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolConsultationStatus,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolArchivesSource = query => { //1.21.9.档案来源
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolArchivesSource,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolBusinessModel = query => { //1.21.13.业务模块
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolBusinessModel,
        params: query,
        headers: {
            sign
        }
    })
}
export const readMedicals = query => { //14.1.双向转诊-WEB医生端-疾病名称下拉框
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.readMedicals,
        params: query,
        headers: {
            sign
        }
    })
}
export const readMedicalsOfHospitalAndDept = query => { //14.2.双向转诊-WEB医生端-医院与科室下拉框联动
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.readMedicalsOfHospitalAndDept,
        params: query,
        headers: {
            sign
        }
    })
}
export const dualReferralManagePage = query => { //14.3.双向转诊-WEB管理端-管理列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.dualReferralManagePage,
        params: query,
        headers: {
            sign
        }
    })
}
export const statistics = query => { //14.4.双向转诊-WEB管理端-统计
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.statistics,
        params: query,
        headers: {
            sign
        }
    })
}
export const dualReferralPage = query => { //14.5.双向转诊-WEB医生端-列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.dualReferralPage,
        params: query,
        headers: {
            sign
        }
    })
}
export const dualReferralAdd = (query, data) => {//14.6.双向转诊-WEB医生端-申请转诊
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.dualReferralAdd,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const dualReferralRecord = query => { //14.7.双向转诊-WEB医生端-查询记录
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.dualReferralRecord,
        params: query,
        headers: {
            sign
        }
    })
}
export const dualReferralUpdate = (query, data) => {//14.8.双向转诊-WEB医生端-修改
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.dualReferralUpdate,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const applicantCANCEL = (query, data) => {//14.9.双向转诊-WEB医生端-申请人操作
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.applicantCANCEL,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const dualReferralReception = (query, data) => {//3.3首页-账号及权限-创建用户
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: `${apiList.dualReferralReception}${query.operate}`,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const receptionAudit = (query, data) => {//14.11.双向转诊-WEB医生端-审核
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.receptionAudit,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const queryByPage = query => { //1.患者分页列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryByPage,
        params: query,
        headers: {
            sign
        }
    })
}

export const getDoctorMessage1 = query => { //14.7.双向转诊-WEB医生端-查询记录
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getDoctorMessage1,
        params: query,
        headers: {
            sign
        }
    })
}
export const queryListByUserId = query => { //2.医生端获取家庭成员列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryListByUserId,
        params: query,
        headers: {
            sign
        }
    })
}
export const queryConsultationDoctorList = query => { //2.医生端获取家庭成员列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryConsultationDoctorList,
        params: query,
        headers: {
            sign
        }
    })
}
export const fetchMedicalClassify = query => { //13.1.分类管理-列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.fetchMedicalClassify,
        params: query,
        headers: {
            sign
        }
    })
}
export const addMedicalClassify = (query, data) => {//13.2.分类管理-新增
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.addMedicalClassify,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const editMedicalClassify = (query, data) => {//13.3.分级管理-修改
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.editMedicalClassify,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const delMedicalClassify = (query, data) => {//13.4.分级管理-删除
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.delMedicalClassify,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const chooseDept = query => { //13.5.权限控制-科室列表下拉框
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.chooseDept,
        params: query,
        headers: {
            sign
        }
    })
}
export const chooseAcceptsLevel = query => { //13.6.权限控制-接诊疾病等级下拉框
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.chooseAcceptsLevel,
        params: query,
        headers: {
            sign
        }
    })
}
export const chooseApplyDept = query => { //13.7.权限控制-申请医院和科室下拉框
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.chooseApplyDept,
        params: query,
        headers: {
            sign
        }
    })
}
export const addMedicalControl = (query, data) => {//13.8.权限控制-新增
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.addMedicalControl,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const editMedicalControl = (query, data) => {//13.9.权限控制-编辑
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.editMedicalControl,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const delMedicalControl = (query, data) => {//13.10.权限控制-删除
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.delMedicalControl,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const fetchMedicalControl = query => { //13.11.权限控制-列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.fetchMedicalControl,
        params: query,
        headers: {
            sign
        }
    })
}
export const medicalControlCharts = query => { //13.12.统计-统计图
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.medicalControlCharts,
        params: query,
        headers: {
            sign
        }
    })
}
export const fetchMedicalType = query => { //13.13.分级管理-类型下拉数据
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.fetchMedicalType,
        params: query,
        headers: {
            sign
        }
    })
}
export const fetchMedicalDict = query => { //13.14.分级管理-名称与类型联动的名称下拉列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.fetchMedicalDict,
        params: query,
        headers: {
            sign
        }
    })
}
export const pushStatisticalData = query => { //3.推送档案统计
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.pushStatisticalData,
        params: query,
        headers: {
            sign
        }
    })
}
export const doctorInto = (query, data) => {//20.1医生进入诊室
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.doctorInto,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const doctorGetList = (query, data) => {//20.2医生获取视频列表状态
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.doctorGetList,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const doctorHangupNext = (query, data) => {//20.3医生就诊完毕，挂断视频
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.doctorHangupNext,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const doctorClickList = (query, data) => {//20.4医生获取未完成排队列表
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.doctorClickList,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const doctorQuit = (query, data) => {//20.5医生退出诊室
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.doctorQuit,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const userInto = (query, data) => {//20.6患者进入诊室排队
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.userInto,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const userQueueHangUp = (query, data) => {//20.7患者排队中，挂断
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.userQueueHangUp,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const userHangUp = (query, data) => {//20.8患者视频中，主动挂断
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.userHangUp,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const userRefresh = (query, data) => {//20.9患者动态刷新
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.userRefresh,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const groupList = query => { //19.3用户组列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.groupList,
        params: query,
        headers: {
            sign
        }
    })
}
export const addfenzu = (query, data) => {//19.4创建用户组
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.addfenzu,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}

export const groupSelects = query => { //19.8用户组条件选项
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.groupSelects,
        params: query,
        headers: {
            sign
        }
    })
}
export const addGroupMember = (query, data) => {//19.5分配用户到小组中
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.addGroupMember,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const addOrdinaryArchives = (query, data) => {//2.新增患者普通档案
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.addOrdinaryArchives,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const addWomanMessage = (query, data) => {//4.新增孕妇档案
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.addWomanMessage,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const typeList = query => { //6.授课方式筛选条件列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.typeList,
        params: query,
        headers: {
            sign
        }
    })
}
export const arrangeList = query => { //5.获取排课计划列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.arrangeList,
        params: query,
        headers: {
            sign
        }
    })
}
export const eduCourseArrange = (query, data) => {//1.新增排课计划
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.eduCourseArrange,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const getArrange = query => { //3.获取用于编辑的排课计划详情
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getArrange,
        params: query,
        headers: {
            sign
        }
    })
}
export const eduCourseEdit = (query, data) => {//2.编辑排课计划
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.eduCourseEdit,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const countTeacher = query => { //1. 统计授课人次
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.countTeacher,
        params: query,
        headers: {
            sign
        }
    })
}
export const SETEQUIPMENT = query => { //1. 统计授课人次
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.SETEQUIPMENT,
        params: query,
        headers: {
            sign
        }
    })
}
export const SETFOLLOWCHART = query => { //1. 统计授课人次
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.SETFOLLOWCHART,
        params: query,
        headers: {
            sign
        }
    })
}


export const countStudent = query => { //2. 统计听课人次
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.countStudent,
        params: query,
        headers: {
            sign
        }
    })
}
export const eduCourseCancel = (query, data) => {//4.取消排课计划
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.eduCourseCancel,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const setRemark = (query, data) => {//添加备注
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.setRemark,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const warnStatus = (query, data) => {//添加备注
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.warnStatus,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}


export const seeRemark = query => { //查看备注
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.seeRemark,
        params: query,
        headers: {
            sign
        }
    })
}
export const webCourseList = query => { //12.7 web获取课程列表【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.webCourseList,
        params: query,
        headers: {
            sign
        }
    })
}
export const signUp = query => { //12.6 报名
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.signUp,
        params: query,
        headers: {
            sign
        }
    })
}
export const intoClassroom = query => { //12.5 进入学习（临时）
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.intoClassroom,
        params: query,
        headers: {
            sign
        }
    })
}
export const intoPlatform = query => { //12.4 进入教学（临时）
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.intoPlatform,
        params: query,
        headers: {
            sign
        }
    })
}
export const nearlyFollowup = query => { //1.医生查看成员最近随访
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.nearlyFollowup,
        params: query,
        headers: {
            sign
        }
    })
}
export const nearlyDevice = query => { //1.医生查看成员最近随访
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.nearlyDevice,
        params: query,
        headers: {
            sign
        }
    })
}
export const statisticsPeople = query => { //7.3.1远程门诊就诊人次柱状统计图
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.statisticsPeople,
        params: query,
        headers: {
            sign
        }
    })
}
export const lastAssessPlan = query => { //11.获取成员最后一次评估相关
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.lastAssessPlan,
        params: query,
        headers: {
            sign
        }
    })
}
export const queryPageByRecordUser = query => { //1.查询我的档案列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryPageByRecordUser,
        params: query,
        headers: {
            sign
        }
    })
}
export const lastUserRecord = query => { //7.获取患者最后一次上传档案信息
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.lastUserRecord,
        params: query,
        headers: {
            sign
        }
    })
}
export const getUserUpDocList = query => { //5.医生WEB查询用户上传档案列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getUserUpDocList,
        params: query,
        headers: {
            sign
        }
    })
}
export const indexCourseList = query => { //1. 远程教育首页排课列表【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.indexCourseList,
        params: query,
        headers: {
            sign
        }
    })
}
export const roundsManager = query => { //15.1（管理）移动查房管理
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.roundsManager,
        params: query,
        headers: {
            sign
        }
    })
}
export const roundsStatistics = query => { //15.2（管理）查房人次统计
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.roundsStatistics,
        params: query,
        headers: {
            sign
        }
    })
}
export const myRounds = query => { //15.5（医生）我的查房
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.myRounds,
        params: query,
        headers: {
            sign
        }
    })
}
export const queryByWebPage = query => { //1.终端管理web分页列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.queryByWebPage,
        params: query,
        headers: {
            sign
        }
    })
}
export const terminalManagementStatistics = query => { //2.终端管理统计
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.terminalManagementStatistics,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolTerminalType = query => { //1.21.29.终端管理-类型
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolTerminalType,
        params: query,
        headers: {
            sign
        }
    })
}
export const toolTerminalArea = query => { //1.21.30.终端管理-区域
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.toolTerminalArea,
        params: query,
        headers: {
            sign
        }
    })
}
export const todayRounds = query => { //15.9（医生）首页-移动查房
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.todayRounds,
        params: query,
        headers: {
            sign
        }
    })
}
export const patientInfo = query => { //1.获取患者信息
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.patientInfo,
        params: query,
        headers: {
            sign
        }
    })
}
export const getUserItemInfo = query => { //3.8获取用户信息
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.getUserItemInfo,
        params: query,
        headers: {
            sign
        }
    })
}
export const deleteUserItem = (query, data) => {//3.5首页-账号及权限-删除用户
    const sign = postQueryHandle(Object.assign({}, data, query));
    return axios({
        method: 'post',
        url: apiList.deleteUserItem,
        params: query,
        data: data,
        headers: {
            sign
        }
    })
}
export const listBusRange = query => { //3.9获取医生业务范围
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.listBusRange,
        params: query,
        headers: {
            sign
        }
    })
}
export const fetchHospitalDeptAuth = query => { //1.2.1.获取医院科室列表（新）主要用于表单选择
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.fetchHospitalDeptAuth,
        params: query,
        headers: {
            sign
        }
    })
}
export const stateList = query => { //7.进行状态筛选条件列表
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.stateList,
        params: query,
        headers: {
            sign
        }
    })
}
export const internalHospitalDoctor = query => { //3.10获取院内用户信息
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.internalHospitalDoctor,
        params: query,
        headers: {
            sign
        }
    })
}
export const webDocGetFollowupPlan = query => { //2.医生查看成员随访计划列表【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.webDocGetFollowupPlan,
        params: query,
        headers: {
            sign
        }
    })
}
export const webDocGetDeviceList = query => { //2.医生查看成员设备数据列表【医生web】
    const sign = postQueryHandle(query);
    return axios({
        method: 'get',
        url: apiList.webDocGetDeviceList,
        params: query,
        headers: {
            sign
        }
    })
}