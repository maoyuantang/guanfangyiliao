<template>
    <div>
        <div class="bs-docs-header" id="content">
            <div class="container-fluid text-center">
                <h3>Welcome to manis meeting system!</h3>
                <p>Manis web sdk</p>
                <p class="bg-danger hidden">Get error callback</p>
                <p class="bg-success hidden">Get success callback</p>
            </div>
        </div>
        <div class="container-fluid bs-docs-container">
            <div class="row">
                <div class="col-xs-2">
                    <div class="bs-docs-sidebar hidden-print  affix-top" role="complementary">
                        <ol class="nav bs-docs-side-nav">
                            <li>
                                <select name="type" id="connect_type" class="form-control">
                                    <option value="conference">会议室</option>
                                    <option value="p2p">点对点</option>
                                </select>
                            </li>
                            <li>
                                <input type="text" placeholder="服务器地址" id="server" class="form-control" value="meet.xiaoqiangio.com">
                            </li>
                            <li>
                                <button class="btn btn-block btn-default" id="initBtn" @click="firstSet()">初始化配置</button>
                            </li>
                            <li>
                                <input type="text" placeholder="用户名" id="username" class="form-control" value="gfkj">
                            </li>
                            <li>
                                <input type="password" placeholder="密码" id="password" class="form-control" value="1qaz@WSX">
                            </li>
                            <li>
                                <button class="btn btn-block btn-default" id="signInBtn">登录</button>
                            </li>
                            <li>
                                <button class="btn btn-block btn-default" id="createRoomBtn">创建会议室</button>
                            </li>
                            <li>
                                <button class="btn btn-block btn-danger" id="leaveRoomBtn">离开会议室</button>
                            </li>
                            <li>
                                <button class="btn btn-block btn-default" id="memberList">用户列表</button>
                                <ul id="members" class="list-group">
                                </ul>
                            </li>
                            <li>
                                <input type="text" placeholder="管理员密码" id="fetchAdminPass" class="form-control">
                            </li>
                            <li>
                                <button class="btn btn-block btn-default" id="fetchAdminBtn">获取管理权限</button>
                            </li>
                            <!--<li>
              <button class="btn btn-block btn-default" id="replaceScreenShareBtn">屏幕分享(替换模式)</button>
          </li>-->
                            <li>
                                <button class="btn btn-block btn-default" id="whiteboardShareBtn">共享白板</button>
                            </li>
                            <li>
                                <button class="btn btn-block btn-default" id="screenShareBtn">屏幕分享(双流模式)</button>
                            </li>
                            <li>
                                <button class="btn btn-block btn-default" id="getFriendsBtn">我的好友列表</button>
                            </li>
                            <li>
                                <button class="btn btn-block btn-danger" id="lockRoomBtn">锁定房间</button>
                            </li>
                        </ol>
                    </div>
                    <div class="bs-docs-sidebar chart-list">
                        <div class="alert alert-info" role="alert">
                            <h3>会议室消息</h3>
                            <div id="text-messages"></div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-8 mani-media-box">
                    <div id="presentation" class="col-xs-12"></div>
                    <div class="col-xs-12 media-box">
                        <h4>本地视频</h4>
                        <div id="localVideos"></div>
                    </div>
                    <div class="col-xs-12 media-box">
                        <h4>遠端视频</h4>
                        <div id="remoteVideos"></div>
                    </div>
                </div>
                <div class="col-xs-2">
                    <div class="bs-docs-sidebar hidden-print  affix-top" role="complementary">
                        <ol class="nav bs-docs-side-nav">
                            <li>
                                <input type="text" placeholder="会议室号" id="checkRoomExistNum" class="form-control">
                            </li>
                            <li>
                                <button class="btn btn-block btn-warning" id="isRoomExistBtn">查询会议室</button>
                            </li>
                        </ol>
                    </div>
                    <div class="bs-docs-sidebar hidden-print  affix-top" role="complementary">
                        <ol class="nav bs-docs-side-nav">
                            <li>
                                <input type="text" placeholder="会议室号" id="conferenceName" class="form-control">
                            </li>
                            <li>
                                <input type="text" placeholder="会议室密码" id="conferencePassword" class="form-control">
                            </li>
                            <li>
                                <button class="btn btn-block btn-default" id="joinRoomBtn">进入会议室</button>
                            </li>
                        </ol>
                    </div>
                    <div class="bs-docs-sidebar hidden-print  affix-top" role="complementary">
                        <ol class="nav bs-docs-side-nav">
                            <li>
                                <input type="text" placeholder="会议室号" id="anonymousConferenceName" class="form-control">
                            </li>
                            <li>
                                <input type="text" placeholder="会议室密码" id="anonymousConferencePassword" class="form-control">
                            </li>
                            <li>
                                <input type="text" placeholder="参会昵称" id="anonymousNickname" class="form-control">
                            </li>
                            <li>
                                <button class="btn btn-block btn-default" id="anonymousJoinRoomBtn">匿名加入会议</button>
                            </li>
                        </ol>
                    </div>
                    <div class="bs-docs-sidebar hidden-print  affix-top" role="complementary">
                        <ol class="nav bs-docs-side-nav">
                            <li>
                                <input type="text" placeholder="收件人" id="receiver" class="form-control">
                            </li>
                            <li>
                                <input type="text" placeholder="消息" id="messageText" class="form-control">
                            </li>
                            <li>
                                <button class="btn btn-block btn-default" id="sendTextMessageBtn">发送消息</button>
                            </li>
                        </ol>
                    </div>
                    <div class="bs-docs-sidebar hidden-print  affix-top" role="complementary">
                        <ol class="nav bs-docs-side-nav">
                            <li>
                                <input type="text" placeholder="Sip" id="sip" class="form-control" value="">
                            </li>
                            <li>
                                <button class="btn btn-block btn-default" id="sendSipBtn">呼叫SIP</button>
                            </li>
                        </ol>
                    </div>
                    <div class="bs-docs-sidebar hidden-print  affix-top" role="complementary">
                        <ol class="nav bs-docs-side-nav">
                            <li>
                                <input type="text" placeholder="record" id="recordRule" class="form-control" value="07">
                            </li>
                            <li>
                                <button class="btn btn-block btn-danger" id="recordBtn">SIP录制</button>
                            </li>
                        </ol>
                    </div>
                    <div class="bs-docs-sidebar hidden-print  affix-top" role="complementary">
                        <ol class="nav bs-docs-side-nav">
                            <li>
                                <input type="text" placeholder="被叫人JID" id="InvitePerson" class="form-control">
                            </li>
                            <li>
                                <button class="btn btn-block btn-success" id="ringUpBtn">拨号</button>
                            </li>
                        </ol>
                    </div>
                    <div class="bs-docs-sidebar hidden-print  affix-top" role="complementary">
                        <ol class="nav bs-docs-side-nav">
                            <li>
                                <input type="text" placeholder="主持人JID" id="operatorJid" class="form-control" value="">
                            </li>
                            <li>
                                <input type="text" placeholder="申请人昵称" id="requestNickname" class="form-control" value="举手人">
                            </li>
                            <li>
                                <button class="btn btn-block btn-default" id="handsUp">举手</button>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import "../../static/assets/css/bootstrap.original.css"
// import "Manis-Meetings-Chrome-Extension_v0.0.9.crx"
import "../../static/assets/css/jquery-impromptu.css";

export default {
    name: "video",
    data() {
        return {};
    },
    methods: {
        //初始化配置
        firstSet() {
            var server = $("#server").val();
            if (!server) {
                alert("请输入服务器地址");
                return false;
            }
            var type = $("#connect_type").val();
            Manis.initial(
                {
                    server: server,
                    domain: server,
                    type: type
                },
                function(result) {
                    if (result.code == 200) {
                        $("#initBtn").toggleClass("btn-primary disabled");
                    } else {
                        alert(result.msg);
                    }
                }
            );
        },
        //登录
        videoLogin() {
            var username = $("#username").val();
            if (!username) {
                alert("请输入用户名");
                return false;
            }
            var password = $("#password").val();
            if (!password) {
                alert("请输入密码");
                return false;
            }
            Manis.signIn(
                username,
                password,
                "",
                function(connection) {
                    console.log("sign success : ", connection);
                },
                function(error) {
                    console.error("sign error : ", error);
                },
                true
            );
            $(this).toggleClass("btn-primary disabled");
        },
        //创建会议室
        createRoomBtn() {
            $("#localVideos").html("");
            Manis.createConference(
                "",
                "",
                function(result) {
                    if (result.code == 200) {
                        $("#createRoomBtn").toggleClass("btn-primary disabled");
                        console.info("generate conference complete : ", result);
                        $("#localVideos").append(
                            generateParticipant(result, true)
                        );
                    }
                },
                function(error) {
                    console.error("get error : ", error);
                }
            );
        }
    },
    created() {
    },
    beforeCreate() {
        const linkData = document.createElement("link");
        linkData.id = "linkdata";
        linkData.href = "../../static/Manis-Meetings-Chrome-Extension_v0.0.9.crx";
        document.body.appendChild(linkData);
    },
    beforeDestroy() {
        document.body.removeChild(document.getElementById(linkdata));
    }
};
</script>
<style  scope>
video {
    width: 100%;
    padding: 0.2em 0em;
    background-color: #222;
}

#localVideos div,
#remoteVideos div {
    background-color: #222;
    color: #fefefe;
    margin-top: 0.2em;
}

.nav > li {
    position: relative;
    display: block;
    padding: 5px 1px;
}

.btn,
.form-control {
    padding: 2px 2px;
    border-radius: 1px;
}

.over {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: lightgray;
    z-index: 1000;
}

.layout {
    display: block;
    position: absolute;
    top: 40%;
    left: 40%;
    width: 20%;
    height: 20%;
    z-index: 1001;
    opacity: 1;
    text-align: center;
    color: #000;
}
</style>

