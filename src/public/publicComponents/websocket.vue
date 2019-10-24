<template>
    <div class="steps">
        <div class="stept-item">
        </div>
    </div>
</template>

<script>
const imessage = require("./imessage.json");
export default {
    name: "steps",
    props: ["inData"],
    computed: {},
    data() {
        return {
            webSocket: null,
            //let global_callback = null;
            lockReconnect: false, //避免重复连接
            tt: "",
            IMessage: "",
            port: "8080",
            ticket: "", //票据，登录即可返回
            sequence: "", //序列号
            content: "", //消息内容
            serverTime: "", //服务器时间
            oMsgId: ""
        };
    },
    methods: {
        initWebSocket(otoken) {
            console.log(otoken);
            //封装自定义的消息协议
            // protobuf.load('../common/imessage.json', (error, root) => {
            let root = protobuf.Root.fromJSON(imessage);
            //获取消息协议类型
            IMessage = root.lookupType("IMessage");
            // console.log(IMessage)
            //创建Message对象,进行Im登录
            //getCookie('token'),
            let message = loginIM(otoken);
            // console.log(message)
            // Encode a message to an Uint8Array (browser) or Buffer (node)
            let buffer = IMessage.encode(message).finish();

            //ws地址
            let wsUrl = "wss://demo.chuntaoyisheng.com:10002/chat";
            // let wsUrl = 'wss://echo.websocket.org'
            // console.log(wsUrl)
            if (!window.webSocket) {
                webSocket = new WebSocket(wsUrl);
                window.webSocket = webSocket;
                // console.log(window.webSocket)
            }

            webSocket.binaryType = "arraybuffer";
            //接受消息
            webSocket.onmessage = function(e) {
                console.log(IMessage.decode(new Uint8Array(e.data)));
                let odata = IMessage.decode(new Uint8Array(e.data));

                webSocketonmessage(odata);
                //心跳.
            };
            webSocket.onclose = function(e) {
                webSocketonclose(e);
            };
            webSocket.onopen = function() {
                webSocketonopen(buffer);
            };

            //连接发生错误的回调方法
            webSocket.onerror = function() {
                console.log("WebSocket连接发生错误");
                reconnect(otoken);
            };
            // })

            return webSocket;
        }
    },
    async created() {}
};
</script>

<style scoped>
.steps {
}
</style>