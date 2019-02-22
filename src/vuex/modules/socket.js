export default {
	namespaced: true,
	state:{
        socketObj:null,//socket对象
        IMessage:"",
        msgBox:{//消息盒子
            a:{
                msg:[
                ],
                type:0
            }
        },
        messageTicket:{
            ticket: "", //票据，登录即可返回
            sequence: "", //序列号
            content: "", //消息内容
            serverTime: "", //服务器时间
            oMsgId: "",
        }
	},
	mutations:{
        /**
         * 
         * @param {*} state 
         * @param {*} data 
         */
		SETSOCKET(state,data){
			state.socketObj = data;
        },
        IMESSAGE(state,data){
			state.IMessage = data;
        },
        MESSAGETICKET(state,data){
            state.messageTicket.ticket = data.ticket;
            state.messageTicket.sequence = data.sequence;
            state.messageTicket.content = data.content;
            state.messageTicket.serverTime = data.serverTime;
            state.messageTicket.oMsgId = data.oMsgId;
        },
        MSGBOX(state,data){
            state.msgBox.a.msg.push(data)
        },
	},
	actions:{
		setSocket(context,data){
			context.commit("SETSOCKET",data);
        },
        IMessage(context,data){
			context.commit("IMESSAGE",data);
        },
        messageTicket(context,data){
            context.commit("MESSAGETICKET",data);
        },
	}
}