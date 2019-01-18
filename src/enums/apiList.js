export default {
    getLoginCode:'/m/v1/api/login/sendCaptcha',//获取登录验证码
    login:'/m/v1/api/login/index',//登录
    hospitalDepartmentManagementSubsystemList:'/m/v1/api/basics/hospital/fetchHospitalSubSystem',//3.1.首页-医院科室管理子系统列表
    hospitalDoctorBusinessSubsystemList:'/m/v1/api/basics/hospital/fetchDoctorSubSystem',//医院医生业务子系统列表
    fileDownload:'/m/v1/api/fs/download/',//文件下载
    initializeTheCreationOfHospital:'/m/v1/api/basics/hospital/init',//初始化创建医院
    userList:'/m/v1/api/user/list',//首页-账号及权限-用户列表
    fetchHospitalDepts:'/m/v1/api/basics/hospital/fetchHospitalDepts',//2.2.获取医院科室列表
    fetchDoctorSubSystems:'/m/v1/api/basics/hospital/fetchDoctorSubSystems',//3.2.1.首页-医院医生业务子系统列表（新）
    createUser:'/m/v1/api/user/user/createUser',//3.3首页-账号及权限-创建用户
    updateUser:'/m/v1/api/user/user/updateUser',//3.4首页-账号及权限-编辑用户
    deleteUser:'/m/v1/api/user/user/deleteUser',//3.5首页-账号及权限-删除用户
    userInfo:'/m/v1/api/user/user/userInfo',//3.8获取用户信息
    createQrInfo:'/m/v1/api/login/createQrInfo',//4.4.创建登录码（WEB）
    scanMonitor:'/m/v1/api/login/scanMonitor',//4.5.登录码扫码监听（WEB）
    queryByDoctorPage:'/m/v1/api/consultation/queryByDoctorPage',//8.1.医生WEB分页列表
    updateHospital:'/m/v1/api/basics/hospital/updateHospital',//8.2.更新医院名称和密码
    fetchHospitalList:'/m/v1/api/basics/hospital/fetchHospitalList',//8.3.医院列表查询
    fetchAllSubSystem:'/m/v1/api/basics/hospital/fetchAllSubSystem',//8.4.获取医院子系统设置列表
    updateSubSystemRel:'/m/v1/api/basics/hospital/updateSubSystemRel',//8.5.变更医院子系统授权
    createHospitalDept:'/m/v1/api/basics/hospital/createHospitalDept',//8.6.新增医院科室
    updateHospitalDept:'/m/v1/api/basics/hospital/updateHospitalDept',//8.7.变更科室名称
    deleteHospitalDept:'/m/v1/api/basics/hospital/deleteHospitalDept',//8.8.删除医院科室
    settingsList:'/m/v1/api/basics/hospital/fetchHospitalDepts',//8.9获取协作人员设置树
    settingsUpdate:'/m/v1/api/synergySystem/settingsUpdate',//8.10超级管理员更新协作人员
    addCloud:'/m/v1/api/cloud/addCloud',//11.1.新增云存储业务
    updateCloud:'/m/v1/api/cloud/updateCloud',//11.2.更新云存储业务
    cloudDetail:'/m/v1/api/cloud/cloudDetail',//11.3.查看云存储服务
    publishArticle:'/m/v1/api/inquiry/article/publishArticle',//13.1.1 文章发布【医生web】
    editArticle:'/m/v1/api/inquiry/article/editArticle',//13.1.2 文章编辑【医生web】
    deleteArticle:'/m/v1/api/inquiry/article/deleteArticle',//13.1.3 删除文章
    getArticleDetails:'/m/v1/api/inquiry/article/getArticleDetails',//13.1.4 查看文章详情
    queryTypeList:'/m/v1/api/inquiry/article/queryTypeList',//13.1.5  获取文章类型列表
    submitArticleComment:'/m/v1/api/inquiry/article/submitArticleComment',//13.1.8 提交评论
    changeArticleStatus:'/m/v1/api/inquiry/article/changeArticleStatus',//13.1.9 改变文章状态
    queryArticleList:'/m/v1/api/inquiry/article/queryArticleList',//13.1.10 获取文章列表【医生web】
    add:'/m/v1/api/followup/followupModel/add',//13.2.1 新增随访模板
    get:'/m/v1/api/followup/followupModel/get',//13.2.2 获取模板详情
    update:'/m/v1/api/followup/followupModel/update',//13.2.3 编辑随访模板
    deleteTemplate:'/m/v1/api/followup/followupModel/delete',//13.2.4 删除随访模板
    getTemplate:'/m/v1/api/followup/followupModel/add',//13.2.5 获取随访模板列表【医生web】
    createFollowUpPlan:'/m/v1/api/followup/followupPlan/createFollowUpPlan',//13.2.6 创建随访计划
    getFollowUpPlan:'/m/v1/api/followup/followupPlan/getFollowUpPlan',//13.2.7 查看随访计划详情
    userListUnfFollowUpPlan:'/m/v1/api/followup/followupPlan/userListUnfFollowUpPlan',//13.2.8 用户获取未完成随访计划
    userListFinFollowUpPlan:'/m/v1/api/followup/followupPlan/userListFinFollowUpPlan',//13.2.9 用户获取已完成的随访计划
    managerGetPlanList:'/m/v1/api/followup/followupPlan/managerGetPlanList',//13.2.10 管理者获取随访计划列表
    todayFollowup:'/m/v1/api/followup/followupRemind/todayFollowup',//13.3.1 今日随访【医生web】
    historyFollowup:'/m/v1/api/followup/followupRemind/historyFollowup',//13.3.2 历史随访【医生web】
    changeStatus:'/m/v1/api/followup/followupRemind/changeStatus',//13.3.3 标记随访状态
    todayPlan:'/m/v1/api/followup/plan/todayPlan',//13.3.4 今日计划【医生web】
    planHistory:'/m/v1/api/followup/plan/planHistory',//13.3.5 历史计划【医生web】
    signStatus:'/m/v1/api/followup/plan/changeStatus',//13.3.6 标记计划状态
    savePlan:'/m/v1/api/followup/plan/savePlan',//13.4.1 创建计划
    changePlan:'/m/v1/api/followup/plan/savePlan',//13.4.2 修改计划
    getPlan:'/m/v1/api/followup/plan/getPlan',//13.4.3 查看计划详情
    cancelPlan:'/m/v1/api/followup/plan/cancelPlan',//13.4.4 取消计划
    managerGetDeviceList:'/m/v1/api/device/manager/managerGetDeviceList',//13.5.2 管理获取设备列表【管理web】
    getUseDetail:'/m/v1/api/device/manager/getUseDetail',//13.5.3 管理查看单个设备使用详情【管理web】
    getAlertDetail:'/m/v1/api/device/manager/getAlertDetail',//13.5.4 管理查看告警详情【管理web】
    fetchChatSession:'/m/v1/api/im/session/fetchChatSession',//14.1.创建或获取单聊会话
    putUser:'/m/v1/api/im/session/putUser',//14.2.新增成员加入聊天会话
    removeUser:'/m/v1/api/im/session/removeUser',//14.3.从聊天会话中移除成员
    fetchHistoryMessage:'/m/v1/api/im/session/fetchHistoryMessage',//14.4.拉取历史消息记录
    fetchSessionMembers:'/m/v1/api/im/session/fetchSessionMembers',//14.5.获取会话成员列表
    userSendMessageId:'/m/v1/api/im/session/userSendMessageId',//14.6.用户接收到消息后更新同步
    fetchReadMessageId:'/m/v1/api/im/session/fetchReadMessageId',//14.7.医生进入会话获取用户已读managePage位置
    fetchNoticeInfo:'/m/v1/api/im/sys/message/fetchNoticeInfo',//14.8.获取通知列表
    fetchSyncMaxVersionId:'/m/v1/api/im/sys/message/fetchSyncMaxVersionId',//14.9.获取最大同步指令的版本号
    fetchSyncInfo:'/m/v1/api/im/sys/message/fetchSyncInfo',//14.10.拉取同步消息列表
    synergyManageList:'/m/v1/api/synergy/synergyManage/list',//15.1首页-账号及权限-院外协作列表
    synergyManageInvite:'/m/v1/api/synergy/synergyManage/invite',//15.2首页-账号及权限-院外协作邀请
    synergyManageUpdate:'/m/v1/api/synergy/synergyManage/update',//15.3首页-账号及权限-更新协作范围
    synergyManageDelete:'/m/v1/api/synergy/synergyManage/delete',//15.4首页-账号及权限-删除协作医生
    addConsultation:'/m/v1/api/consultation/add',//2.新增会诊
    appraiseConsultation:'/m/v1/api/consultation/appraiseConsultation',//3.评价会诊
    updateConsultationStatus:'/m/v1/api/consultation/updateConsultationStatus',//4.更新会诊状态
    queryByManagerPage:'/m/v1/api/consultation/queryByManagerPage',//5.管理端WEB分页列表
    queryByDeptList:'/m/v1/api/consultation/queryByDeptList',//6.查询会诊申请科室列表
    queryByAppraiseList:'/m/v1/api/consultation/queryByAppraiseList',//7.查询会诊评论列表
    queryStatisticalByApplication:'/m/v1/api/consultation/queryStatisticalByApplication',//8.查询申请科室统计
    queryStatisticalBySponsor:'/m/v1/api/consultation/queryStatisticalBySponsor',//9.查询发起科室统计
    getAllHospital:'/m/v1/api/basics/hospital/getAllHospital',//1.20获取所有医院
    webGetTitleList:'/m/v1/api/followup/followupModel/webGetTitleList',//10.2.11获取随访标题列表
    managePage:'/m/v1/api/synergy/manage/page',//9.2协作管理列表
    manageStatistics:'/m/v1/api/synergy/manage/statistics',//9.3协作管理统计
    synergyPage:'/m/v1/api/synergy/page',//9.4医生协作列表
    enableSynergyDoctor:'/m/v1/api/synergy/enableSynergyDoctor',//9.5获取可协作医生（本院、院外协作）
    sendSynergy:'/m/v1/api/synergy/sendSynergy',//9.6发起协作
    synergyChangeStatus:'/m/v1/api/synergy/changeStatus',//9.7开始/结束协作
    synergyInto:'/m/v1/api/synergy/into',//9.8进入协作
    receiveDept:"/m/v1/api/synergy/receiveDept",//9.9本院参与科室
    receiveDoctor:'/m/v1/api/synergy/receiveDoctor',//9.10本院参与科室
    createVideoRoom:'/m/v1/api/videoMeeting/createVideoRoom',//1.3.创建视频
    storageUsers:'/m/v1/api/videoMeeting/storageUsers',//1.4.进入/退出视频房间
    queryStorageUsers:'/m/v1/api/videoMeeting/queryStorageUsers/',//1.5.根据房间号获取用户列表
    closeVideoRoom:'/m/v1/api/videoMeeting/closeVideoRoom/',//1.6.删除视频会议房间
    videoMeetingInvited:'/m/v1/api/videoMeeting/invited/',//1.7.邀请用户进行视频通话
    invitedOff:'/m/v1/api/videoMeeting/invited/off/',//1.8.通知邀请者已经进入会议视频
    upload:'/m/v1/api/hdfs/fs/upload',//1.9.1文件上传
    fsDownload:'/m/v1/api/hdfs/fs/download/',//1.9.文件下载
    fetchHospitalRel:'/m/v1/api/basics/hospital/fetchHospitalRel',//8.11.获取医院上下级是否已选中列表
    modelInsert:'/m/v1/api/satisfaction/model/insert',//10.3.1 创建满意度模板
    getModelInsert:'/m/v1/api/satisfaction/model/select',//10.3.2 获取模板列表
    editModel:'/m/v1/api/satisfaction/model/edit',//10.3.3 编辑模板
    deleteModel:'/m/v1/api/satisfaction/model/delete',//10.3.4 删除模板
    getTemplateInfo:'/m/v1/api/satisfaction/model/getTemplateInfo',//10.3.5 查看模板详情
    getTitleList:'/m/v1/api/satisfaction/model/getTitleList',//10.3.6 获取可使用的模板标题列表
    examine:'/m/v1/api/satisfaction/model/examine',//10.3.7 模板审核
    getMissileList:'/m/v1/api/satisfaction/send/getMissileList',//10.3.8 获取可发送的用户列表
    publishNotice:'/m/v1/api/satisfaction/send/publishNotice',//10.3.9 通过短信发送满意度调查
    rePublish:'/m/v1/api/satisfaction/send/rePublish',//10.3.10 失败重发
    getResultList:'/m/v1/api/satisfaction/send/getResultList',//10.3.11 调查管理列表
    sendExport:'/m/v1/api/satisfaction/send/export',//10.3.12 导出短信回复
}