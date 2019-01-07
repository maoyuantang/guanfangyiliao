import protobuf from "protobufjs";
// import aaa from "../common/reconnecting-websocket.min.js"
const imessage = require('./imessage.json')
let webSocket = null;
//let global_callback = null;
let lockReconnect = false; //避免重复连接
let tt;
let IMessage;
const port = '8080'
let ticket; //票据，登录即可返回
let sequence; //序列号

//初始化websocket
// alert(this.$store.state.token)
function initWebSocket(otoken) { 
        console.log(otoken)
        //封装自定义的消息协议
        // protobuf.load('../common/imessage.json', (error, root) => {
        let root = protobuf.Root.fromJSON(imessage);
        //获取消息协议类型
        IMessage = root.lookupType("IMessage");
        console.log(IMessage)
        //创建Message对象,进行Im登录
        //getCookie('token'),
        let message = loginIM(otoken)
        console.log(message)
        // Encode a message to an Uint8Array (browser) or Buffer (node)
        let buffer = IMessage.encode(message).finish();
    
    
        //ws地址
        let wsUrl = 'wss://demo.chuntaoyisheng.com:10002/chat'
        // let wsUrl = 'wss://echo.websocket.org'
        console.log(wsUrl)
        if(!window.webSocket){
        
            webSocket = new WebSocket(wsUrl);
            window.webSocket=webSocket
            console.log(window.webSocket)
            
        }
           


        


        webSocket.binaryType = "arraybuffer" 
        //接受消息
        webSocket.onmessage = function (e) {
            
            console.log(IMessage.decode(new Uint8Array(e.data)));
            let odata = IMessage.decode(new Uint8Array(e.data));
    
            webSocketonmessage(odata);
            //心跳. 
            
    
    
        }
        webSocket.onclose = function (e) {
            webSocketonclose(e);
        }
        webSocket.onopen = function () {
            webSocketonopen(buffer);
        }
    
        //连接发生错误的回调方法
        webSocket.onerror = function () {
            console.log("WebSocket连接发生错误");
            reconnect(otoken);
        }
        // })
       
   
return webSocket
}


// 实际调用的方法 ,按照协议生辰一个data数据agentData
function sendMessage(agentData) {
    if (webSocket.readyState === webSocket.OPEN) {
        //若是ws开启状态
        websocketsend(agentData)
    } else if (webSocket.readyState === webSocket.CONNECTING) {
        // 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function () {
            sendMessage(agentData, callback);
        }, 1000);
    } else {
        // 若未开启 ，则等待1s后重新调用
        setTimeout(function () {
            sendMessage(agentData, callback);
        }, 1000);
    }
}

//数据接收
function webSocketonmessage(odata) {
    let RequestType = odata.RequestType;
    if (RequestType == 101 && odata.status.state) {
        console.log('登录成功')
        ticket = odata.ticket
        heartCheck.start()




    }else if(RequestType==102){
        alert('您在其他设备上进行了登录')
    }else if(RequestType==0){//同步  

    }  
    //global_callback(e.data, IMessage)
    //将接收到的数据进行处理
    // let data = IMessage.decode(new Uint8Array(e.data));
    // //将接收到的数据进行处理
    // console.dir('客户端接收到消息:====>' + data);
    // let RequestType = IMessage.decode(new Uint8Array(e.data)).RequestType;

    // if (RequestType === 101 || RequestType === 104) {
    //     sequence = IMessage.decode(new Uint8Array(e.data)).status.sequence;
    //     if (RequestType === 101) {
    //         ticket = IMessage.decode(new Uint8Array(e.data)).ticket;
    //     }
    // } else {
    //     //需要处理的消息
    //     //把接收到的数据暴露出去
    //     //acceptMessageData(data)
    //     console.log("接收到的数据:" + data)
    // }
    //将所有的数据交给外部进行处理,当连接成功够进行回调调用
}

//数据发送
function websocketsend(data) {


    //websock.send(JSON.stringify(agentData));
    // let Message = {
    //     RequestType: 4,
    //     ticket: ticket,
    //     info: {
    //         messageType: 0, //消息
    //         childMessageType: data.childMessageType, //文本
    //         from: data.from, //userid
    //         fromNickName: data.fromNickName, //昵称
    //         toNickName: data.toNickName,
    //         to: data.to, //发给谁，接收者的用户ID
    //         body: data.body, //消息内容
    //         sequence: sequence, //消息发送序号。
    //         chatType: 2, //单聊  GROUP 群聊
    //         clientTime: '',
    //         serverTime: "",
    //         conferenceId: data.conferenceId
    //     }
    // }

    
    let Message = data;
    console.log(Message);
    let msg = IMessage.encode(Message).finish();
    webSocket.send(msg);
}

//关闭
function webSocketonclose(e) {
    console.log("connection closed (" + e.code + ")");
    reconnect();
}

function webSocketonopen(buffer) {
    if (webSocket.readyState === 1) {
        console.log("连接成功");

        webSocket.send(buffer);
    } else {
        console.log("链接状态" + webSocket.readyState);
    }

    //发送心跳  进行保持长连接 /心跳检测重置
    heartCheck.start();
}
//心跳检测
let heartCheck = {
    timeout: 20000,
    timeoutObj: null,
    serverTimeoutObj: null,
    start: function () {
        // console.log('heart');
        let self = this;
        let data = {
            'RequestType': 3,
            'ticket': ticket
        };
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            let buffer = IMessage.encode(data).finish();
            webSocket.send(buffer); //心跳的内容需要根据实际情况进行自己定义
            console.log('send-heart', data);
        }, this.timeout)
    }
}




//重新连接IM
function reconnect(otoken) {

    console.log(otoken)
    if (lockReconnect) {
        return;
    };
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    tt && clearTimeout(tt);
    tt = setTimeout(function () {
        //每4s中进行一次连接IM
        initWebSocket(otoken);
        lockReconnect = false;
    }, 4000);
}

function loginIM(token) {
    console.log(token)
    var odata = new Date()
    console.log(odata.getTime())
    //消息类型按照这样传递
    let message = IMessage.create({
        RequestType: 1,
        login: {
            token: token,
            timestamp: odata.getTime(),
            systemType: 'WEB',
            deviceType: 'WEB'
        }
    });
    return message
}

//客户端接收到的数据,暴露给外面使用


export default { sendMessage, initWebSocket }