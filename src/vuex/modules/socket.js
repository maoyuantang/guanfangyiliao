export default {
    namespaced: true,
    state: {
        socketObj: null,//socket对象
        IMessage: "",
        ifVideoImg: 0,
        synchroMessage: {},
        ifEnterVideo:0,
        msgBox: {//消息盒子
            a: {
                msg: [
                ],
                type: 0
            }
        },
        videoUser:0,
        osessionId:'',
        chatTypeBox:{},
        receiveVideoVisable:false,
        receiveVideoUserId:"",
        createVideoRoomData:{},
        messageTicket: {
            ticket: "", //票据，登录即可返回
            sequence: "", //序列号
            content: "", //消息内容
            serverTime: "", //服务器时间
            oMsgId: "",
        },
        headImg:process.env.IMG_PREFIX+'/m/v1/api/user/user/avatar/',//头像公共前缀
        imgUrl: process.env.IMG_PREFIX + '/m/v1/api/hdfs/fs/download/',//图片下载地址前缀
        imgUrl1:process.env.IMG_PREFIX
    },
    mutations: {
        /**
         * 
         * @param {*} state 
         * @param {*} data 
         */
        SETSOCKET(state, data) {
            state.socketObj = data;
        },
        IMESSAGE(state, data) {
            state.IMessage = data;
        },
        //同步消息
        SYNCHROIMESSAGE(state, data) {
            state.synchroMessage = data;
        },
        MESSAGETICKET(state, data) {
            state.messageTicket.ticket = data.ticket;
            state.messageTicket.sequence = data.sequence;
            state.messageTicket.content = data.content;
            state.messageTicket.serverTime = data.serverTime;
            state.messageTicket.oMsgId = data.oMsgId;
        },
        MSGBOX(state, data) {
            state.msgBox.a.msg.push(data)
        },
        IFVIDEOIMG(state, data) {
            state.ifVideoImg = data
        },
        IFENTERVIDEO(state, data) {
            state.ifEnterVideo = data
        },
        VIDEOUSER(state,data){
            if(data==0){
                state.videoUser  -=1
            }else if(data==1){
                state.videoUser += 1
            }
           
        },
        
        RECEIVEVIDEOVIS(state,data){
            state.receiveVideoVisable =data
        },
        
        CREATEVUDEIROOM(state,data){
            state.createVideoRoomData =data
        },
        OSESSIONID(state,data){
            state.osessionId =data
        },
        CHATTYPEBOX(state,data){
            state.chatTypeBox =data
        },
        // 接收视频对方id
        
        RECEIVEVIDEOUSERID(state,data){
            state.receiveVideoUserId =data
        },
    },
    actions: {
        setSocket(context, data) {
            context.commit("SETSOCKET", data);
        },
        IMessage(context, data) {
            context.commit("IMESSAGE", data);
        },
        synchroIMessage(context, data) {
            context.commit("SYNCHROIMESSAGE", data);
        },
        messageTicket(context, data) {
            context.commit("MESSAGETICKET", data);
        },
        oIfVideoImg(context, data) {
            context.commit("IFVIDEOIMG", data);
        },
        oIfEnterVideo(context, data) {
            context.commit("IFENTERVIDEO", data);
        },
        VIDEOUSER(context, data) {
            context.commit("VIDEOUSER", data);
        },
        RECEIVEVIDEOVIS(state,data){
            context.commit("RECEIVEVIDEOVIS", data);
        },
        CREATEVUDEIROOM(state,data){
            context.commit("CREATEVUDEIROOM", data);
        },
        OSESSIONID(state,data){
            context.commit("OSESSIONID", data);
        },
        CHATTYPEBOX(state,data){
            context.commit("CHATTYPEBOX", data);
        },
        RECEIVEVIDEOUSERID(state,data){

            context.commit("RECEIVEVIDEOUSERID", data);
        },
    }
}