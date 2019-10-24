export default {
	namespaced: true,
	state:{
        departmentList:[],//科室
        group:[],//分组
        documentsClassification:[],//档案分类
        userSource:[],//用户来源
        hospitalArchives:[],//院内档案
        prescriptionReviewStatus:[],//1.21.2.处方审核状态
        prescriptionDistributionStatus:[],//处方配送状态
        prescriptionAuditDoctor:[],//处方审核医生
        PrescriptionDispenser:[],//处方发药医生
        consultationType:[],//会诊类型
        consultationStatus:[],//会诊状态
        collaborationState:[],//协作状态
        fileSource:[],//档案来源
        businessModule:[],//业务模块
        businessType:[],//业务类型
        followupType:[],//随访类型
        followupMode:[],//随访方式
        followupContents:[],//随访内容
        surveyTypes:[],//调查类型 
        investigationMethod:[],//调查方式
        equipmentType:[],//设备类型
        followupPlan:[],//随访计划
        articleListTypes:[],//文章类型列表
        teachingMethodsScreeningList:[],//授课方式筛选列表(接口还没出)
        classifiedTreatmentDiagnosisTypes:[],//分级诊疗 类型
        classificationDiagnosisTreatment:[],//分级诊疗 分级
        TwoReferralDirection:[],//双向转诊 方向
        allHospital:[],//所有医院
        manToolDept:[],//筛选 科室列表(管理端)
        docToolDept:[],//筛选 科室列表(医生端)
        
       
	},
	mutations:{
        /**
         * 设置 筛选 科室列表(医生端)
         */
        SETDOCTOOLDEPT(state,data){
            state.docToolDept = data;
        },
        /**
         * 设置 筛选 科室列表(管理端)
         */
        SETMANTOOLDEPT(state,data){
            state.manToolDept = data;
        },
         /**
         * 设置 所有医院
         */
        SETALLHOSPITAL(state,data){
            state.allHospital = data;
        },
        /**
         * 设置 双向转诊 方向
         */
        SETTWOREFERRALDIRECTION(state,data){
            state.TwoReferralDirection = data;
        },
         /**
         * 设置 分级诊疗 分级
         */
        SETCLASSIFICATIONDIAGNOSISTREATMENT(state,data){
            state.classificationDiagnosisTreatment = data;
        },
        /**
         * 设置 分级诊疗 类型
         */
        SETLASSIFEDTREATMNTDIAGNOSISTYPES(state,data){
            state.classifiedTreatmentDiagnosisTypes = data;
        },
        
        /**
         * 设置 文章类型列表
         */
        SETARTCLELISTTYPES(state,data){
            state.articleListTypes = data;
        },
        /**
         * 设置 随访计划
         */
        SETFOLLOWUPPLAN(state,data){
            state.followupPlan = data;
        },
        /**
         * 设置 设备类型
         */
        SETEQUIPMENTTYPE(state,data){
            state.equipmentType = data;
        },
        /**
         * 设置 调查方式
         */
        SETINVESTIGATIONMETHOD(state,data){
            state.investigationMethod = data;
        },
        /**
         * 设置 调查类型
         */
        SETSURVEYTYPES(state,data){
            state.surveyTypes = data;
        },
        /**
         * 设置 随访方式
         */
        SETFOLLOWUPCONTENT(state,data){
            state.followupContents = data;
        },
         
        /**
         * 设置 随访方式
         */
        SETFOLLOWUPMODE(state,data){
            state.followupMode = data;
        },
        /**
         * 设置 随访类型
         */
        SETFOLLOWUPTYPE(state,data){
            state.followupType = data;
        },
        /**
         *  设置 业务类型
         */
        SETBUSINESSTYPE(state,data){
            state.businessType = data;
        },
        /**
         * 设置 业务模块
         */
        SETBUSINESSMODULE(state,data){
            state.businessModule = data;
        },
        /**
         * 设置 档案来源
         */
        SETFILESOURCE(state,data){
            state.fileSource = data;
        },
        /**
         * 设置 协作状态
         */
        SETCOLLABORATIONSTATE(state,data){
            state.collaborationState = data;
        },
        /**
         * 设置 会诊状态
         */
        SETCONSULTATIONSTATUS(state,data){
            state.consultationStatus = data;
        },
        /**
         * 设置 会诊类型
         */
        SETCONSULTATONTYPE(state,data){
            state.consultationType = data;
        },
        /**
         * 设置科室
         */
        SETDEPARTENTLIST(state,data){
            state.departmentList = data;
        },
        /**
         * 设置分组
         */
        SETGROUP(state,data){
            state.group = data;
        },

        /**
         * 设置 档案分类
         */
        SETDOCUMENTSCLASSIFICATION(state,data){
            state.documentsClassification = data;
        },

        /**
         * 设置 用户来源
         */
        SETUSERSOURCE(state,data){
            state.userSource = data;
        },

        /**
         * 设置 院内档案
         */
        SETHOSPITALARCHIVES(state,data){
            state.hospitalArchives = data;
        },

        /**
         * 设置 处方审核状态
         */
        SETPRESCRIPTIONREVIEWSTATUS(state,data){
            state.prescriptionReviewStatus = data;
        },

        /**
         * 设置 处方配送状态
         */
        SETPRESCRIPTIONDISTRIBUTIONSTATUS(state,data){
            state.prescriptionDistributionStatus = data;
        },

        /**
         * 设置 处方审核医生
         */
        SETPRESCRIPTIONAUDITDOCTOR(state,data){
            state.prescriptionAuditDoctor = data;
        },
        
        /**
         * 设置 处方发药医生
         */
        SETPRESCRIPTIONDISPENSER(state,data){
            state.PrescriptionDispenser = data;
        },
        
        
	},
	actions:{
		// setSocket(context,data){
		// 	context.commit("SETSOCKET",data);
        // },
        
	}
}
/**
 * 存放全局都需要的接口数据
 */