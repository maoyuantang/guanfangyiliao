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
        messageTicket: {
            ticket: "", //票据，登录即可返回
            sequence: "", //序列号
            content: "", //消息内容
            serverTime: "", //服务器时间
            oMsgId: "",
        }
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
    }
}