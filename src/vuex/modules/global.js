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



	},
	mutations:{
         
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