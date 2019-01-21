console.log('enter')
Manis = function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(o.exports, o, o.exports, t),
        o.loaded = !0,
        o.exports
    }
    var n = {};
    return t.m = e,
    t.c = n,
    t.p = "",
    t(0)
} ([function(e, exports, t) {
    e.exports = t(1)
},
function(e, exports, t) {
    "use strict";
    function n(e) {
        console.log("check resources response:", e)
    }
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
        return typeof e
    }: function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    },
    o = t(2),
    i = t(55),
    s = t(7),
    a = t(42),
    c = t(30),
    d = t(26),
    u = t(122),
    l = t(12),
    p = t(28),
    f = t(27),
    h = "https://",
    m = "/clientApi/loginClient",
    g = "/user/createConferenceClient",
    _ = "/clientApi/loginClientAnonymous",
    v = "audioinput",
    y = "audiooutput",
    w = "videoinput",
    b = ["1080", "720", "768", "540", "480", "240", "180"],
    S = ["agree", "refuse"];
    window.checkResourcesCallBack = n,
    window.participants = [],
    window.myself = null,
    window.stream = null,
    window.isRemoteControl = !1,
    window.focusJid = null,
    window.incomingCall = !1,
    window.lock = !1,
    window.removeScreenInprogress = !1,
    window.manisConfg = {},
    window.sendOnly = !1,
    window.config = {
        channelLastN: -1,
        adaptiveLastN: !1,
        adaptiveSimulcast: !1,
        openSctp: !0,
        enableFirefoxHacks: !1,
        nat: "stun:124.202.164.3",
        focuser: null,
        enableSimulcast: !1,
        focusUserJid: "focus@60.206.107.181",
        audioBandwidth: 64,
        videoBandwidth: 1024,
        enableRtpStats: !0,
        role: "NONE",
        nickname: null,
        chromeExtensionUrl: "static/dist/Manis-Meetings-Chrome-Extension_v0.0.9.crx",
        chromeExtensionId: "lmmbdcmikgbfpgegokhgedahimdimcnh",
        desktopSharing: "ext",
        gw: null,
        withModerator: !1
    },
    window.RTC = {
        getLocalSSRC: function(e, t) {
            t(null)
        },
        browser: a.getBrowserName(),
        isSafari: function() {
            return a.isSafari()
        },
        isChrome: function() {
            return a.isChrome()
        }
    },
    window.isUsingScreenStream = !1,
    window.roomName = null,
    window.mediaStreams = {},
    window._dataChannels = [],
    window.ssrc2jid = {},
    window.jid2Ssrc = {},
    window.ssrc2videoType = {},
    window.ssrc2resolution = {},
    window.activecall = null,
    window.statsCollector = null,
    window.mutedAudios = {},
    window.mutedVideos = {},
    window.forceMuted = !1,
    window.forceSetVideo = !1,
    window.currentVideoInputDeviceId = null,
    window.currentAudioInputDeviceId = null,
    window.currentAudioOutputDeviceId = null,
    window.connectType = null,
    window.localSSRCS = [];
    var C = {
        keepAliveTimer: null,
        browserSupportCheck: function() {
            var e = a.browserInfo;
            return e.name.indexOf("chrome") > -1 && e.version >= 53 || (e.name.indexOf("opera") > -1 && e.version >= 52 || e.name.indexOf("safari") > -1 && e.version >= 11)
        },
        initial: function(e, t) {
            if ("function" != typeof t) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (!this.browserSupportCheck()) return void t({
                code: d.code_400,
                msg: d.no_test_browser_type_or_version,
                errorCode: f.no_test_browser_type_or_version
            });
            if ("object" != ("undefined" == typeof e ? "undefined": r(e)) || !e.server) return void t({
                code: d.code_421,
                msg: d.params_error,
                errorCode: f.init_params_error
            });
            try {
                this.manisParams = e,
                window.manisParams = e,
                window.serverPath = h + e.server,
                "p2p" == e.type ? window.connectType = "p2p": (u.setDesktopSharing(config.desktopSharing), i.initDefaultInputDevices(e.audioInput, e.videoInput, e.audioOutput), config.chromeExtensionId && u.initInlineInstalls()),
                t({
                    code: d.code_200,
                    msg: d.init_success,
                    errorCode: f.no_error
                })
            } catch(e) {
                console.error(e)
            }
        },
        signIn: function(e, t, n, r, i, s) {
            if ("function" != typeof r || "function" != typeof i) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (!e) return void i({
                code: d.code_421,
                msg: d.username_password_except,
                errorCode: f.username_except
            });
            if (!t) return void i({
                code: d.code_421,
                msg: d.username_password_except,
                errorCode: f.user_password_except
            });
            var a = h + this.manisParams.server + m;
            o.signInMeetingCtl(e, t, n, r, i, a, this.manisParams.domain, s)
        },
        signOut: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : (window.connection && (window.connection.disconnect(), window.connection = null), this.keepAliveTimer && (window.clearInterval(this.keepAliveTimer), this.keepAliveTimer = null), void e({
                code: d.code_200,
                msg: d.sign_out_success,
                errorCode: f.no_error
            }))
        },
        signInMessageServer: function(e, t, n) {
            var r = this;
            return "function" != typeof t || "function" != typeof n ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : void o.signInXMPP(function(e) {
                r.keepAlive(),
                t(e)
            },
            n, e)
        },
        keepAlive: function() {
            if (config.mUserId && config.endpoint && config.currentTimeMillis && connection) {
                this.keepAliveTimer && (window.clearInterval(this.keepAliveTimer), this.keepAliveTimer = null);
                var e = window.setInterval(function() {
                    c.keepAlive(config.mUserId, config.endpoint, config.currentTimeMillis)
                },
                6e5);
                this.keepAliveTimer = e
            }
        },
        createConference: function(e, t, n, r) {
            var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
            s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : null;
            if ("function" != typeof n || "function" != typeof r) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (void 0 == window.connection) return void r({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            });
            h + this.manisParams.server + g;
            i.createOrJoinRoom(null, e, t, n, r, o, s)
        },
        joinConference: function(e, t, n, r) {
            var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
            s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : null;
            return "function" != typeof n || "function" != typeof r ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : !e || e.length <= 0 ? void r({
                code: d.code_421,
                msg: d.room_number_except,
                errorCode: f.conference_room_except
            }) : void 0 == window.connection ? void r({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            }) : void i.createOrJoinRoom(e, t, null, n, r, o, s)
        },
        joinByAnonymous: function(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
            i = arguments[4],
            s = arguments[5],
            a = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : null,
            c = this;
            if ("function" != typeof i || "function" != typeof s) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (!e) return void s({
                code: d.code_421,
                msg: d.room_number_and_nickname_except,
                errorCode: f.conference_room_except
            });
            if (!t) return void s({
                code: d.code_421,
                msg: d.room_number_and_nickname_except,
                errorCode: f.conference_room_nickname_except
            });
            var u = h + this.manisParams.server + _;
            o.signInMeetingCtlByAnonymous(u, t,
            function() {
                c.keepAlive(),
                C.joinConference(e, n, i, s, r, a)
            },
            function() {
                C.joinByAnonymous(e, t, n, r, i, s, a)
            })
        },
        leaveConference: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : void 0 == window.connection ? void e({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            }) : c.isInRoom() ? (s.disposeConference(), i.leaveConferenceRoom(), window.participants = [], window.mutedAudios = {},
            void e({
                code: d.code_200,
                msg: d.leave_room,
                errorCode: f.no_error
            })) : void e({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            })
        },
        onJoinConference: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.room.someone.joined"), void $(document).bind("manis.room.someone.joined",
            function(t, n) {
                e({
                    code: d.code_200,
                    msg: d.on_participant_joined,
                    response: n,
                    errorCode: f.no_error
                })
            }))
        },
        onLeaveConference: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.room.someone.left"), void $(document).bind("manis.room.someone.left",
            function(t, n) {
                e({
                    code: d.code_200,
                    msg: d.on_participant_left,
                    response: n,
                    errorCode: f.no_error
                })
            }))
        },
        memberList: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : void 0 == window.connection ? void e({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            }) : c.isInRoom() ? void e(window.participants.length ? {
                code: d.code_200,
                msg: d.got_participants,
                response: window.participants,
                errorCode: f.no_error
            }: {
                code: d.code_404,
                msg: d.room_unopend,
                errorCode: f.conference_room_un_open
            }) : void e({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            })
        },
        audioToggleMute: function(e, t, n) {
            if ("function" != typeof e || "function" != typeof t) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (void 0 == window.connection) return void t({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            });
            if (!c.isInRoom()) return void t({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            });
            if ("p2p" == window.connectType) return void p.muteAudio(e, t);
            var r = void 0 != n ? n: !c.isAudioMuted(),
            o = connection.jingle.localAudio.getAudioTracks();
            if (o.length > 0) for (var i = 0; i < o.length; i++) o[i].enabled = !r;
            var s = (connection.jid.split("/")[1], $iq({
                to: window.focusJid,
                type: "set",
                from: connection.jid
            }).c("mute", {
                xmlns: "http://jitsi.org/jitmeet/audio",
                jid: connection.jid,
                userjid: connection.jid
            }).t(r.toString()).up());
            connection.sendIQ(s,
            function(t) {
                connection.emuc.addAudioInfoToPresence(r),
                connection.emuc.sendPresence(),
                $(document).trigger("audiomuted.muc", [connection.jid, r.toString()]),
                e({
                    code: d.code_200,
                    msg: d.set_audio_toggle_complete,
                    response: r,
                    errorCode: f.no_error
                })
            },
            function(e) {
                t({
                    code: d.code_400,
                    msg: d.set_audio_toggle_failed,
                    response: !r,
                    errorCode: f.audio_switch_mute_failed
                })
            })
        },
        onAudioToggleMute: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("audiomuted.muc"), void $(document).bind("audiomuted.muc",
            function(t, n, r) {
                r = "true" == r;
                for (var o = 0; o < window.participants.length; o++) {
                    var i = window.participants[o];
                    i.resource == Strophe.getResourceFromJid(n) && (i.audio_muted = r, window.participants[o] = i)
                }
                mutedAudios[n] !== r && (mutedAudios[n] = r, e({
                    user: c.getUserInfoByJid(n),
                    mute: r,
                    errorCode: f.no_error
                }))
            }))
        },
        videoToggleMute: function(e, t, n) {
            if ("function" != typeof e || "function" != typeof t) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (void 0 == window.connection) return void t({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            });
            if (!c.isInRoom()) return void t({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            });
            if ("p2p" == window.connectType) return void p.muteVideo(e, t);
            var r = window.activecall,
            o = void 0 != n ? n: !r.isVideoMute();
            r ? c.setVideoMute(o,
            function() {
                e({
                    code: d.code_200,
                    msg: d.set_video_toggle_complete,
                    response: o,
                    errorCode: f.no_error
                })
            },
            function(t) {
                e({
                    code: d.code_400,
                    msg: d.set_video_toggle_failed,
                    response: !o,
                    errorCode: f.video_switch_mute_failed
                })
            }) : t({
                code: d.code_400,
                msg: d.set_video_toggle_failed,
                errorCode: f.conference_room_wait_others
            })
        },
        onVideoToggleMute: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("videomuted.muc"), void $(document).bind("videomuted.muc",
            function(t, n, r) {
                r = "true" == r.toString();
                for (var o = 0; o < window.participants.length; o++) {
                    var i = window.participants[o];
                    i.resource == Strophe.getResourceFromJid(n) && (i.video_muted = r)
                }
                mutedVideos[n] !== r && (mutedVideos[n] = r, e({
                    user: c.getUserInfoByJid(n),
                    mute: r,
                    errorCode: f.no_error
                }))
            }))
        },
        isAdmin: function() {
            return c.isAdmin()
        },
        grantAdmin: function(e, t, n) {
            if ("function" != typeof t || "function" != typeof n) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (void 0 == window.connection) return void n({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            });
            if (!c.isInRoom()) return void n({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            });
            if (!e) return void n({
                code: d.code_421,
                msg: d.resource_except,
                errorCode: f.grant_admin_participant_except
            });
            var r = c.getUserByResource(e);
            if (!r) return void n({
                code: d.code_404,
                msg: d.participant_not_in_room,
                errorCode: f.grant_admin_participant_not_exist
            });
            var o = roomName ? roomName.split("@")[0] : null;
            return o ? c.isAdmin() ? void i.grantAdmin(r, o, t, n) : void n({
                code: d.code_403,
                msg: d.out_of_authority,
                errorCode: f.without_permission_for_the_operation
            }) : void n({
                code: d.code_404,
                msg: d.room_unopend,
                errorCode: f.conference_room_un_open
            })
        },
        onGrantAdmin: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.on.grant.admin"), void $(document).bind("manis.on.grant.admin",
            function(t) {
                e({
                    code: d.code_200,
                    msg: d.on_grant_admin_completed,
                    errorCode: f.no_error
                })
            }))
        },
        fetchAdmin: function(e, t, n) {
            if ("function" != typeof t || "function" != typeof n) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (!e) return void n({
                code: d.code_421,
                msg: d.compere_password_except,
                errorCode: f.fetch_admin_password_except
            });
            if (void 0 == window.connection) return void n({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            });
            if (!c.isInRoom()) return void n({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            });
            var r = c.getUserByResource(Strophe.getResourceFromJid(connection.jid)),
            o = roomName ? roomName.split("@")[0] : null;
            return r && o ? c.isAdmin() ? void n({
                code: d.code_403,
                msg: d.compere_authority_own,
                errorCode: f.fetch_admin_failed_owen_it
            }) : void i.fetchAdmin(r, o, e, t, n) : void n({
                code: d.code_404,
                msg: d.room_unopend,
                errorCode: f.conference_room_un_open
            })
        },
        sendTextMessage: function(e, t, n, r) {
            if ("function" != typeof n || "function" != typeof r) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (!e) return void r({
                code: d.code_421,
                msg: d.message_content_null,
                errorCode: f.text_message_except
            });
            if (void 0 == window.connection) return void r({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            });
            if (!c.isInRoom()) return void r({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            });
            if (t) {
                var i = c.getUserByResource(t);
                if (!i) return void r({
                    code: d.code_404,
                    msg: d.participant_not_in_room,
                    errorCode: f.private_text_message_receiver_not_exist
                });
                o.sendPrivateMessage(e, i, window.self.nickname, n),
                $(document).trigger("onmessage.muc", [window.connection.jid, window.self.nickname, e, !0, i.nickname])
            } else window.connection.emuc.sendMessage(e, window.self.nickname),
            $(document).trigger("onmessage.muc", [window.connection.jid, window.self.nickname, e, !1, ""]),
            n({
                code: d.code_200,
                msg: d.message_send_complete,
                errorCode: f.no_error
            })
        },
        onTextMessage: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("onmessage.muc"), void $(document).bind("onmessage.muc",
            function(t, n, r, o, i, s) {
                if (Strophe.getResourceFromJid(n) == Strophe.getResourceFromJid(connection.jid)) var a = !0;
                else var a = !1;
                e({
                    code: d.code_200,
                    msg: d.receive_text_message_complete,
                    response: {
                        from: r,
                        content: o,
                        isPrivateMsg: i === !0,
                        to: void 0 === s && i === !0 ? "all": s,
                        sendFromMe: a
                    },
                    errorCode: f.no_error
                })
            }))
        },
        setSomeoneAudioMute: function(e, t, n, r) {
            return "function" != typeof n || "function" != typeof r ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : e ? void 0 == window.connection ? void r({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            }) : c.isInRoom() ? c.isAdmin() ? void i.setAudioMute(e, t, n, r) : void r({
                code: d.code_403,
                msg: d.out_of_authority,
                errorCode: f.without_permission_for_the_operation
            }) : void r({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            }) : void r({
                code: d.code_421,
                msg: d.becontrol_user_resource_except,
                errorCode: f.operate_someone_audio_participant_except
            })
        },
        onAudioMuteBeSet: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("onmute.audio.muc"), void $(document).bind("onmute.audio.muc",
            function(t, n) {
                window.forceMuted = n,
                e({
                    code: d.code_200,
                    msg: d.be_set_mute_complete,
                    response: n,
                    errorCode: f.no_error
                })
            }))
        },
        setSomeoneVideoMute: function(e, t, n, r) {
            return "function" != typeof n || "function" != typeof r ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.no_error
            }) : e ? void 0 == window.connection ? void r({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            }) : c.isInRoom() ? c.isAdmin() ? void i.setVideoMute(e, t, n, r) : void r({
                code: d.code_403,
                msg: d.out_of_authority,
                errorCode: f.without_permission_for_the_operation
            }) : void r({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            }) : void r({
                code: d.code_421,
                msg: d.becontrol_user_resource_except,
                errorCode: f.operate_someone_video_participant_except
            })
        },
        onVideoMuteBeSet: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("onmute.video.muc"), void $(document).bind("onmute.video.muc",
            function(t, n) {
                window.forceSetVideo = n,
                e({
                    code: d.code_200,
                    msg: d.be_set_video_complete,
                    response: n,
                    errorCode: f.no_error
                })
            }))
        },
        eject: function(e, t, n) {
            if ("function" != typeof t || "function" != typeof n) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (!e) return void n({
                code: d.code_421,
                msg: d.becontrol_user_resource_except,
                errorCode: f.eject_participant_except
            });
            if (void 0 == window.connection) return void n({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            });
            if (!c.isInRoom()) return void n({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            });
            if (!c.isAdmin()) return void n({
                code: d.code_403,
                msg: d.out_of_authority,
                errorCode: f.without_permission_for_the_operation
            });
            var r = c.getUserByResource(e);
            return r ? void i.eject(r, t, n) : void n({
                code: d.code_404,
                msg: d.participant_not_in_room,
                errorCode: f.eject_participant_not_exist
            })
        },
        onEject: function(e) {
            var t = this;
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("oneject.muc"), void $(document).bind("oneject.muc",
            function(n) {
                e({
                    code: d.code_200,
                    msg: d.you_have_been_eject,
                    errorCode: f.no_error
                }),
                t.leaveConference(function(e) {
                    console.log(e)
                })
            }))
        },
        getVideoInputDevices: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : void s.getDevices(w, e)
        },
        changeVideoInputDevice: function(e, t, n) {
            if ("function" != typeof t) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            var r = n ? n: config.currentResolution;
            e || r || t({
                code: d.code_421,
                msg: d.video_device_id_except,
                errorCode: f.change_video_input_device_except
            }),
            window.currentVideoInputDeviceId = e,
            config.resolution = config.storeResolution,
            s.modifyLocalVideoStream(r, e, t)
        },
        changeResolution: function(e, t) {
            if ("function" != typeof t) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (void 0 == window.connection) return void t({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            });
            if (!c.isInRoom()) return void t({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            });
            if (!e || b.indexOf(e) < 0) return void t({
                code: d.code_421,
                msg: d.resolution_params_error,
                error: e,
                errorCode: f.change_resolution_not_match
            });
            try {
                s.changeResolutionByApplyConstraints(e, window.currentVideoInputDeviceId, t)
            } catch(n) {
                console.error(n),
                s.modifyLocalVideoStream(e, window.currentVideoInputDeviceId, t)
            }
        },
        audioInputDevices: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : void s.getDevices(v, e)
        },
        audioInputChange: function(e, t) {
            return "function" != typeof t ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : e ? (window.currentAudioInputDeviceId = e, void s.modifyLocalAudioStream(e, t)) : void t({
                code: d.code_421,
                msg: d.video_device_id_except,
                errorCode: f.change_audio_input_device_except
            })
        },
        audioOutputDevices: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : void s.getDevices(y, e)
        },
        audioOutputDeviceChange: function(e, t) {
            var n = this;
            return "function" != typeof t ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : e ? (document.querySelectorAll("audio").forEach(function(t, r) {
                n.attachSinkId(t, e)
            }), void t({
                code: d.code_200,
                msg: d.audio_output_change_completed,
                errorCode: f.no_error
            })) : void t({
                code: d.code_421,
                msg: d.audio_output_except,
                errorCode: f.change_audio_output_device_except
            })
        },
        attachSinkId: function(e, t) {
            "undefined" != typeof e.sinkId ? e.setSinkId(t).then(function() {
                console.log("Success, audio output device attached: " + t)
            }).
            catch(function(e) {
                var t = e;
                "SecurityError" !== e.name && "SecurityError" !== e.constructor.name || (t = "You need to use HTTPS for selecting audio output device: " + e),
                console.error(t)
            }) : console.warn("Browser does not support output device selection.")
        },
        callSip: function(e, t, n, r, s) {
            if ("function" != typeof t || "function" != typeof n) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (e || n({
                code: d.code_421,
                msg: d.sip_number_except,
                errorCode: f.sip_client_except
            }), void 0 == window.connection) return void n({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            });
            if (!c.isInRoom()) return void n({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            });
            try {
                i.updateGWConfig(function(e) {
                    config.gw = e
                })
            } catch(e) {
                config.gw = config.gw
            }
            return null == config.gw && n({
                code: d.code_421,
                msg: d.sip_gateway_except,
                errorCode: f.sip_gateway_except
            }),
            c.isAdmin() ? void o.callSip(config.gw, e, t, n, r, s, config.roomPassword) : void n({
                code: d.code_403,
                msg: d.out_of_authority,
                errorCode: f.without_permission_for_the_operation
            })
        },
        ringUp: function(e, t, n, r, i) {
            return "function" != typeof r || "function" != typeof i ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : e ? void 0 == window.connection ? void i({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            }) : void o.ringUp(e, t,
            function(e) {
                window.withReply = !1,
                window.incomingCall = !0,
                setTimeout(function() {
                    window.withReply === !1 && (window.incomingCall = !1, $(document).trigger("manis.onringup.reply", [null, null, null, "timeout", d.code_406, d.invite_time_out]))
                },
                d.time_out_seconds),
                r(e)
            },
            i, 0, n) : void i({
                code: d.code_421,
                msg: d.be_inviste_user_except,
                errorCode: f.invoke_receiver_except
            })
        },
        onRingUp: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("oninvite.muc"), void $(document).bind("oninvite.muc",
            function(t, n, r, i, s, a) {
                return 0 != window.incomingCall || c.isInRoom() ? void o.sendInviteBusy(n, i, self.nickname) : (window.incomingCall = !0, window.ringCallStartAt = (new Date).valueOf(), void e({
                    code: d.code_200,
                    msg: d.on_ring_up,
                    response: {
                        uuid: n,
                        nickname: r,
                        password: s,
                        roomName: i,
                        callType: a
                    },
                    errorCode: f.no_error
                }))
            }))
        },
        responseRingUp: function(e, t, n, r, i) {
            if ("function" != typeof i) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (void 0 == window.connection) return void i({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            });
            if (window.incomingCall = !1, window.ringCallStartAt) {
                var s = (new Date).valueOf();
                if (s - window.ringCallStartAt > d.time_out_seconds) return void i({
                    code: d.code_406,
                    msg: d.reply_invite_time_out,
                    errorCode: f.called_expired
                })
            }
            if (1 == n) var a = o.sendInviteAccept(r, e, self.nickname);
            else var a = o.sendInviteReject(r, e, self.nickname);
            i({
                code: d.code_200,
                msg: d.response_invite_msg_complete,
                response: a,
                errorCode: f.no_error
            })
        },
        onRingUpResponse: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.onringup.reply"), void $(document).bind("manis.onringup.reply",
            function(t, n, r, o, i, s, a) {
                window.withReply = !0,
                window.incomingCall = !1,
                e({
                    code: s ? s: d.code_200,
                    msg: a ? a: d.on_ring_up_reply,
                    response: {
                        uuid: n,
                        nickname: r,
                        roomName: o,
                        answer: i
                    },
                    errorCode: f.no_error
                })
            }))
        },
        sendRoomComplete: function(e, t, n, r) {
            if ("function" != typeof r) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (!e) return void r({
                code: d.code_421,
                msg: d.be_inviste_user_except,
                errorCode: f.invoke_room_ready_receiver_except
            });
            if (void 0 == window.connection) return void r({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            });
            try {
                o.sendJoinAfterRingCallAccept(e, t, n, config.nickname || ""),
                r({
                    code: d.code_200,
                    msg: d.send_inviste_success,
                    errorCode: f.no_error
                })
            } catch(e) {
                r({
                    code: d.code_400,
                    msg: d.send_inviste_failed,
                    errorCode: f.send_room_ready_msg_failed
                })
            }
        },
        onRoomComplete: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("oninvite.room.complete.after.accept.request"), void $(document).bind("oninvite.room.complete.after.accept.request",
            function(t, n, r) {
                e({
                    code: d.code_200,
                    msg: d.room_opened,
                    response: {
                        roomNumber: n,
                        roomPassword: r
                    },
                    errorCode: f.no_error
                })
            }))
        },
        sendRingCallProcessed: function(e) {
            if ("function" != typeof e) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            try {
                var t = connection.jid ? connection.jid.split("/")[0] : config.mUserId + "@conference." + manisConfg.messageServer;
                o.sendRingCallProcessedMsg(t),
                e({
                    code: d.code_200,
                    msg: d.ring_call_request_in_processed_sent_success,
                    errorCode: f.no_error
                })
            } catch(t) {
                e({
                    code: d.code_400,
                    msg: d.ring_call_request_in_processed_sent_failed,
                    errorCode: f.called_request_in_processed_sent_failed
                })
            }
        },
        onRingCallProcessed: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("oninvite.room.processed"), void $(document).bind("oninvite.room.processed",
            function(t) {
                e({
                    code: d.code_200,
                    msg: d.ring_call_request_in_processed,
                    errorCode: f.no_error
                })
            }))
        },
        isRoomExist: function(e, t) {
            if ("function" != typeof t) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (void 0 == window.connection) return void t({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            });
            var n = e + "@conference." + config.focusUserJid.replace("focus@", ""),
            r = $iq({
                type: "get",
                to: n,
                id: connection.getUniqueId()
            }).c("query", {
                xmlns: "http://jabber.org/protocol/disco#info"
            }).tree();
            connection.sendIQ(r,
            function(e) {
                t({
                    code: d.code_200,
                    msg: d.room_opened,
                    errorCode: f.conference_room_opened
                })
            },
            function(e) {
                t({
                    code: d.code_404,
                    msg: d.room_unopend,
                    errorCode: f.conference_room_un_open
                })
            })
        },
        whiteboardShare: function(e, t) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : void 0 == window.connection ? void e({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            }) : c.isInRoom() ? c.isAdmin() ? void connection.ofmuc.openAppsDialog(!1, t ? t: "apps/drawing/index.html", e) : void e({
                code: d.code_403,
                msg: d.out_of_authority,
                errorCode: f.without_permission_for_the_operation
            }) : void e({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            })
        },
        addScreenSourceToConnection: function(e) {
            if ("function" != typeof e) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (void 0 == window.connection) return void e({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            });
            if (!c.isInRoom()) return void e({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            });
            if (!c.isAdmin()) return void e({
                code: d.code_403,
                msg: d.out_of_authority,
                errorCode: f.without_permission_for_the_operation
            });
            var t = window.activecall;
            return t ? u.isDesktopSharingEnabled() ? void u.toggleScreenSharing(function(t) {
                t.response.stream ? (window.isUsingScreenStream = !0, s.addScreenSourceToConnection(t.response.stream, e)) : e({
                    code: d.code_400,
                    msg: d.share_screen_failed,
                    errorCode: t.errorCode
                })
            },
            function(t) {
                e({
                    code: d.code_400,
                    msg: d.share_screen_failed,
                    errorCode: t.errorCode
                })
            }) : void e({
                code: d.code_400,
                msg: d.share_screen_failed,
                errorCode: f.share_screen_nonsupport
            }) : void e({
                code: d.code_400,
                msg: d.share_screen_failed,
                errorCode: f.conference_room_wait_others
            })
        },
        removeScreenSourceFromConnection: function(e) {
            if ("function" != typeof e) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (void 0 == window.connection) return void e({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            });
            if (!c.isInRoom()) return void e({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            });
            try {
                window.removeScreenInprogress = !0,
                window.isUsingScreenStream = !1,
                s.removeScreenSourceFromConnection(e)
            } catch(t) {
                e({
                    code: d.code_400,
                    msg: d.share_screen_error,
                    errorCode: f.share_screen_stop_failed
                })
            }
        },
        onShareScreenStart: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("mains.on.screen.share.start"), void $(document).bind("mains.on.screen.share.start",
            function(t) {
                e({
                    code: d.code_200,
                    msg: d.share_screen_success,
                    errorCode: f.no_error
                })
            }))
        },
        onShareScreenEnd: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("mains.on.screen.share.end"), void $(document).bind("mains.on.screen.share.end",
            function(t) {
                e({
                    code: d.code_200,
                    msg: d.share_screen_ended,
                    errorCode: f.no_error
                })
            }))
        },
        onStreamSourceRemoved: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("mains.on.stream.removed"), void $(document).bind("mains.on.stream.removed",
            function(t, n, r, o) {
                e({
                    code: d.code_200,
                    errorCode: f.no_error,
                    msg: d.on_stream_removed,
                    response: {
                        type: n,
                        ssrc: r,
                        hardRemove: o
                    }
                })
            }))
        },
        onStreamSourceAdded: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).bind("mains.on.stream.added"), void $(document).bind("mains.on.stream.added",
            function(t, n) {
                e({
                    code: d.code_200,
                    errorCode: f.no_error,
                    msg: d.on_stream_added,
                    response: n
                })
            }))
        },
        getFriends: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : void 0 == window.connection ? void e({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            }) : void o.myFriends(e)
        },
        lockRoom: function(e, t) {
            return "function" != typeof t ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : void 0 == window.connection ? void t({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            }) : c.isInRoom() ? c.isAdmin() ? void i.lockRoom(e, t) : void t({
                code: d.code_403,
                msg: d.out_of_authority,
                errorCode: f.without_permission_for_the_operation
            }) : void t({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            })
        },
        changeDisplayMode: function(e, t, n) {
            return "function" != typeof t ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : void 0 === e || null === e || "" === e ? void t({
                code: d.code_421,
                msg: d.display_mode_execpet,
                errorCode: f.display_model_except
            }) : void 0 == window.connection ? void t({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            }) : c.isInRoom() ? c.isAdmin() ? void c.sendChangeDisplayModeMsg(e, t, n) : void t({
                code: d.code_403,
                msg: d.out_of_authority,
                errorCode: f.without_permission_for_the_operation
            }) : void t({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            })
        },
        onDisplayModeChange: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.display.mode.changed"), void $(document).bind("manis.display.mode.changed",
            function(t, n) {
                e({
                    code: d.code_200,
                    msg: d.display_mode_change_complete,
                    response: n,
                    errorCode: f.no_error
                })
            }))
        },
        changeMainDisplayBlock: function(e, t, n, r) {
            return "function" != typeof t ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : e ? void c.sendChangeMainBlockSourceMsg(e, n, t, r) : void t({
                code: d.code_421,
                msg: d.dispaly_block_source_except,
                errorCode: f.main_display_source_except
            })
        },
        onMainDisplayChange: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.main.display.changed"), void $(document).bind("manis.main.display.changed",
            function(t, n, r) {
                e({
                    code: d.code_200,
                    errorCode: f.no_error,
                    msg: d.main_display_block_changed,
                    response: {
                        resource: n,
                        ssrc: r
                    }
                })
            }))
        },
        initModerator: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : void c.initModerator(e)
        },
        updateLocalStreamSSRC: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.local.stream.ssrc.update"), void $(document).bind("manis.local.stream.ssrc.update",
            function(t, n, r) {
                e({
                    code: d.code_200,
                    errorCode: f.no_error,
                    msg: d.local_stream_ssrc_updated,
                    response: {
                        type: r,
                        ssrc: n,
                        resource: Strophe.getResourceFromJid(connection.jid)
                    }
                })
            }))
        },
        onWithModeratorChanged: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.on.with.moderator.changed"), void $(document).bind("manis.on.with.moderator.changed",
            function(t, n, r) {
                window.config.withModerator = n,
                e({
                    code: d.code_200,
                    errorCode: f.no_error,
                    msg: d.with_moderator_status_changed,
                    response: {
                        moderator: n,
                        time: r
                    }
                })
            }))
        },
        systemError: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.on.unknown.error"), void $(document).bind("manis.on.unknown.error",
            function(t, n) {
                e({
                    code: d.code_500,
                    errorCode: f.unknown_error,
                    msg: d.network_error,
                    error: n
                })
            }))
        },
        addSecondStreamToConnection: function(e, t) {
            if ("function" != typeof t) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (void 0 == window.connection) return void t({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            });
            if (!c.isInRoom()) return void t({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            });
            if (!c.isAdmin()) return void t({
                code: d.code_403,
                msg: d.out_of_authority,
                errorCode: f.without_permission_for_the_operation
            });
            var n = window.activecall;
            if (!n) return void t({
                code: d.code_400,
                msg: d.connection_lost,
                errorCode: f.conference_room_wait_others
            });
            if (!e) return void t({
                code: d.code_400,
                msg: d.second_stream_except,
                errorCode: f.second_stream_except
            });
            try {
                window.isUsingScreenStream = !0,
                s.addScreenSourceToConnection(e, t)
            } catch(e) {
                t({
                    errorCode: f.second_stream_share_failed
                })
            }
        },
        getUserMediaByConstraints: function(e, t, n) {
            return "function" != typeof t || "function" != typeof n ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : e ? void l.getMedia(e,
            function(e) {
                t({
                    code: d.code_200,
                    msg: d.get_user_media_success,
                    response: e,
                    errorCode: f.no_error
                })
            },
            function(e) {
                n({
                    code: d.code_400,
                    msg: d.get_user_media_failed,
                    errorCode: f.media_device_get_local_media_failed
                })
            }) : void n({
                code: d.code_421,
                msg: d.order_change_resolution_resulotion_except,
                errorCode: f.get_user_media_constraints_except
            })
        },
        participantAudioConnected: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.room.someone.audio.added"), void $(document).bind("manis.room.someone.audio.added",
            function(t, n) {
                e({
                    code: d.code_200,
                    msg: d.on_participant_audio_joined,
                    response: n,
                    errorCode: f.no_error
                })
            }))
        },
        killedByManager: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.management.kill"), void $(document).bind("manis.management.kill",
            function(t, n) {
                e({
                    code: d.code_200,
                    errorCode: f.no_error,
                    msg: d.room_kill_by_manager,
                    response: n
                })
            }))
        },
        lockStatusChanged: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.room.lock.status.change"), void $(document).bind("manis.room.lock.status.change",
            function(t, n) {
                e({
                    code: d.code_200,
                    errorCode: f.no_error,
                    msg: d.room_lock_status_change + (n ? "锁定": "解锁"),
                    response: "true" == n.toString()
                })
            }))
        },
        onParticipantStatusUpdate: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.participant.status.update"), void $(document).bind("manis.participant.status.update",
            function(t, n) {
                for (var r = 0; r < window.participants.length; r++) {
                    var o = window.participants[r];
                    o.resource == Strophe.getResourceFromJid(n.from) && (o.nickname = n.nickName, o.audio_muted = "true" == n.audioMuted, o.video_muted = "true" == n.videoMuted, o.is_moderator = "CRUO" == n.configRole || "CRUA" == n.configRole, o.status = n.status, o.resources = n.resources, window.participants.splice(r, 1, o), e({
                        code: d.code_200,
                        errorCode: f.no_error,
                        msg: d.participant_status_update,
                        response: o
                    }))
                }
            }))
        },
        onRecordStatusChanged: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.recorder.status.change"), void $(document).bind("manis.recorder.status.change",
            function(t, n, r) {
                e({
                    code: d.code_200,
                    errorCode: f.no_error,
                    msg: d.manis_recorder_status_changed,
                    response: {
                        status: n,
                        resource: r
                    }
                })
            }))
        },
        handsUp: function(e, t, n, r, o) {
            if ("function" != typeof o) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (!e) return void o({
                code: d.code_421,
                msg: d.params_error,
                errorCode: f.hand_up_receiver_except
            });
            var i = n ? n: "",
            s = r ? r: "apply";
            c.sendHandsUpMsg(e, t, i, s,
            function() {
                o({
                    code: d.code_200,
                    msg: d.hands_up_send_success,
                    errorCode: f.no_error
                })
            },
            function(e) {
                o({
                    code: d.code_400,
                    msg: d.hands_up_send_failed,
                    errorCode: f.hand_up_send_failed
                })
            })
        },
        onHandsUp: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.on.hands.up.msg"), void $(document).bind("manis.on.hands.up.msg",
            function(t, n, r, o, i) {
                e({
                    code: d.code_200,
                    errorCode: f.no_error,
                    msg: d.on_hands_up_msg,
                    response: {
                        from: n,
                        nickname: r,
                        action: o,
                        content: i
                    }
                })
            }))
        },
        responseHandsUp: function(e, t, n, r) {
            return "function" != typeof r ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : e ? !t || S.indexOf(t) < 0 ? void r({
                code: d.code_421,
                msg: d.response_hands_up_action_error,
                errorCode: f.hand_up_response_action_illegality
            }) : void c.responseHandsUpMsg(e, t, n,
            function() {
                r({
                    code: d.code_200,
                    msg: d.response_hands_up_msg_success,
                    errorCode: f.no_error
                })
            },
            function(e) {
                r({
                    code: d.code_400,
                    msg: d.response_hands_up_msg_failed,
                    errorCode: f.response_hands_up_msg_failed
                })
            }) : void r({
                code: d.code_421,
                msg: d.params_error,
                errorCode: f.hand_up_receiver_except
            })
        },
        onHandsUpResponse: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.on.hands.up.response"), void $(document).bind("manis.on.hands.up.response",
            function(t, n, r) {
                e({
                    code: d.code_200,
                    errorCode: f.no_error,
                    msg: d.on_hands_up_response,
                    response: r
                })
            }))
        },
        sendOnlyParticipant: function(e, t, n, r, s) {
            if ("function" != typeof s) return void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            });
            if (!e) return void s({
                code: d.code_421,
                msg: d.room_number_except,
                errorCode: f.conference_room_except
            });
            if (!r) return void s({
                code: d.code_421,
                msg: d.media_stream_except,
                errorCode: f.send_only_stream_except
            });
            var a = this;
            window.sendOnly = !0;
            var c = h + this.manisParams.server + _;
            o.signInMeetingCtlByAnonymous(c, n,
            function() {
                if (a.keepAlive(), window.webkitMediaStream) {
                    for (var n = new webkitMediaStream,
                    o = new webkitMediaStream,
                    c = r.getAudioTracks(), d = r.getVideoTracks(), u = 0; u < c.length; u++) n.addTrack(c[u]);
                    for (u = 0; u < d.length; u++) o.addTrack(d[u]);
                    connection.jingle.localAudio = n,
                    connection.jingle.localVideo = o
                } else connection.jingle.localAudio = r,
                connection.jingle.localVideo = r;
                i.joinConferenceWithMedia(e, t, r, s)
            },
            function() {
                a.sendOnlyParticipant(e, t, n, r, s)
            })
        },
        onRoomCountdown: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.on.room.countdown"), void $(document).bind("manis.on.room.countdown",
            function(t, n) {
                e({
                    code: d.code_200,
                    errorCode: f.no_error,
                    msg: d.room_countdown,
                    response: {
                        countdown: n
                    }
                })
            }))
        },
        delayRoom: function(e, t) {
            return "function" != typeof t ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : parseInt(e) < 0 ? void t({
                code: d.code_421,
                msg: d.room_extend_time_require,
                errorCode: f.conference_delay_time_require
            }) : void 0 == window.connection ? void t({
                code: d.code_401,
                msg: d.connection_except,
                errorCode: f.mss_connection_except
            }) : c.isInRoom() ? c.isAdmin() ? void i.roomDelay(e, t) : void t({
                code: d.code_403,
                msg: d.out_of_authority,
                errorCode: f.without_permission_for_the_operation
            }) : void t({
                code: d.code_407,
                msg: d.you_are_not_in_room,
                errorCode: f.conference_room_not_participate
            })
        },
        handleChangeModelNotice: function(e) {
            return "function" != typeof e ? void console.error({
                code: d.code_421,
                msg: d.callback_function_except,
                errorCode: f.callback_except
            }) : ($(document).unbind("manis.on.switch.to.audio.model"), void $(document).bind("manis.on.switch.to.audio.model",
            function(t, n) {
                e({
                    code: d.code_200,
                    errorCode: f.no_error,
                    msg: d.on_room_model_change_to_audio_only
                })
            }))
        }
    };
    e.exports = C
},
function(e, exports, t) {
    function n(e, t, n) {
        var r = "https://" + window.manisConfg.messageServer + "/http-bind/",
        o = new k.Connection(r, window.manisConfg.endpoint);
        if (!manisConfg.messageServer) return t({
            code: C.code_421,
            msg: C.sign_failed,
            errorCode: x.message_server_except
        }),
        !1;
        if (!manisConfg.mUserId) return t({
            code: C.code_421,
            msg: C.sign_failed,
            errorCode: x.message_server_user_except
        }),
        !1;
        var i = manisConfg.mUserId.toLowerCase() + "@" + manisConfg.messageServer,
        s = manisConfg.token || "";
        o.connect(i, s,
        function(t) {
            if (t == Strophe.Status.CONNECTED) {
                window.connection = o,
                n && (config.nickname = n, o.emuc.addDisplayNameToPresence(n)),
                o.emuc.addUserIdToPresence(g()),
                o.emuc.addConfigRoleToPresence(config.role),
                o.addHandler(l, null, "message", null, null, null),
                o.addHandler(p, "http://jitsi.org/jitmeet/audio", "iq", "set", null, null),
                o.addHandler(f, "http://jitsi.org/jitmeet/video", "iq", "set", null, null),
                _();
                $pres();
                window.self = {
                    nickname: config.nickname ? config.nickname: manisConfg.mUserName,
                    jid: o.jid,
                    resource: Strophe.getResourceFromJid(o.jid)
                },
                e({
                    code: C.code_200,
                    msg: C.connect_server_success,
                    response: {
                        call_id: o.jid
                    },
                    errorCode: x.no_error
                })
            }
        },
        function(e) {
            t({
                code: C.code_500,
                msg: C.sign_failed,
                errorCode: x.message_server_connect_failed
            })
        })
    }
    function r(e, t, n, r, o, i, s) {
        void 0 == o && (o = "chat"),
        void 0 == i && (i = "http://jabber.org/protocol/nick"),
        void 0 == s && (s = "nick");
        var a = $msg({
            to: t.jid,
            type: o
        });
        a.c("body", e).up(),
        n && a.c(s, {
            xmlns: i
        }).t(n).up().up(),
        window.connection.send(a),
        r({
            code: C.code_200,
            msg: C.message_send_complete
        })
    }
    function o(e, t, n, r, o, i) {
        try {
            var s = (new Date).valueOf(),
            a = e.indexOf("@") > -1 ? e: e + "@" + manisConfg.messageServer,
            c = $msg({
                to: a,
                type: "chat",
                from: window.connection.jid
            });
            c.c("body", {
                xmlns: "http://igniterealtime.org/protocol/ringing"
            }).up(),
            c.c("call", {
                xmlns: "http://igniterealtime.org/protocol/ringing",
                type: "invite",
                roomID: t,
                resource: t + "@conference." + manisConfg.messageServer,
                nickname: self.nickname,
                callType: o,
                meetPassword: i,
                createTime: s
            }).up(),
            console.info("1111111111111111111 send ring up", c.tree()),
            window.connection.send(c),
            n({
                code: C.code_200,
                msg: C.send_inviste_success,
                errorCode: x.no_error
            })
        } catch(e) {
            r({
                code: C.code_400,
                msg: C.send_inviste_failed,
                errorCode: x.invoke_send_failed
            })
        }
    }
    function i(e, t, n) {
        try {
            var r = $msg({
                to: e,
                type: "chat",
                from: window.connection.jid
            });
            return r.c("body", {
                xmlns: "http://igniterealtime.org/protocol/ringing"
            }).up(),
            r.c("call", {
                xmlns: "http://igniterealtime.org/protocol/ringing",
                type: "accept",
                roomID: t,
                resource: t + "@conference." + manisConfg.messageServer,
                nickname: n
            }).up(),
            console.info("33333333333333333333333 accept ring up ", r.tree()),
            window.connection.send(r),
            !0
        } catch(e) {
            return ! 1
        }
    }
    function s(e, t, n) {
        try {
            var r = $msg({
                to: e,
                type: "chat",
                from: window.connection.jid
            });
            return r.c("body", {
                xmlns: "http://igniterealtime.org/protocol/ringing"
            }).up(),
            r.c("call", {
                xmlns: "http://igniterealtime.org/protocol/ringing",
                type: "reject",
                roomID: t,
                resource: t + "@conference." + manisConfg.messageServer,
                nickname: n,
                isCaller: "0"
            }).up(),
            console.info("4444444444444444444444 reject ring up ", r.tree()),
            window.connection.send(r),
            !0
        } catch(e) {
            return ! 1
        }
    }
    function a(e, t, n) {
        try {
            var r = $msg({
                to: e,
                type: "chat",
                from: window.connection.jid
            });
            return r.c("body", {
                xmlns: "http://igniterealtime.org/protocol/ringing"
            }).up(),
            r.c("call", {
                xmlns: "http://igniterealtime.org/protocol/ringing",
                type: "busy",
                roomID: t,
                resource: t + "@conference." + manisConfg.messageServer,
                nickname: n
            }).up(),
            console.info("77777777777777777 replay ring up busy ", r.tree()),
            window.connection.send(r),
            !0
        } catch(e) {
            return ! 1
        }
    }
    function c(e, t, n, r) {
        try {
            var o = $msg({
                to: e,
                type: "chat",
                from: window.connection.jid
            });
            return o.c("body", {
                xmlns: "http://igniterealtime.org/protocol/ringing"
            }).up(),
            o.c("call", {
                xmlns: "http://igniterealtime.org/protocol/ringing",
                type: "join",
                roomID: t,
                resource: t + "@conference." + manisConfg.messageServer,
                nickname: r,
                meetPassword: n
            }).up(),
            console.info("8888888888888888888 send join after create room ", o.tree()),
            window.connection.send(o),
            !0
        } catch(e) {
            return ! 1
        }
    }
    function d(e) {
        try {
            var t = $msg({
                to: e,
                type: "chat",
                from: window.connection.jid
            });
            return t.c("body", {
                xmlns: "http://igniterealtime.org/protocol/ringing"
            }).up(),
            t.c("call", {
                xmlns: "http://igniterealtime.org/protocol/ringing",
                type: "processed"
            }).up(),
            console.info("yyyyyyyyyyyyyyyyyyyyyyyy send ring call has been processed ", t.tree()),
            window.connection.send(t),
            !0
        } catch(e) {
            return ! 1
        }
    }
    function u(e, t, n, r, o, i, s) {
        var a = $iq({
            to: e,
            from: window.connection.jid,
            type: "set"
        }),
        c = a.c("dial", {
            xmlns: "urn:xmpp:rayo:1",
            to: t,
            from: connection.emuc.roomjid
        });
        c.c("header", {
            name: "JvbRoomName",
            value: window.connection.emuc.roomjid
        }).up().c("header", {
            name: "JvbRoomPassword",
            value: s
        }).up().c("header", {
            name: "JvbRoomInfo",
            value: window.config.title
        }).up(),
        o && (c.c("header", {
            name: "JvbRoomRecorder",
            value: o
        }).up(), c.c("header", {
            name: "JvbUserNum",
            value: i
        }).up()),
        c = c.up(),
        console.log("send call sip iq : ", a.tree()),
        window.connection.sendIQ(a,
        function(e) {
            var t = $(e).find('ref[xmlns="urn:xmpp:rayo:1"]').attr("uri");
            if (200 == t) n({
                code: C.code_200,
                msg: C.call_sip_success,
                errorCode: x.no_error
            });
            else if (201 == t) {
                var o = $(e).find('header[name="recordResult"]') || null;
                if (o) {
                    var i = o.attr("value") || null;
                    i && n({
                        code: C.code_200,
                        msg: C.call_sip_success,
                        errorCode: x.no_error
                    })
                }
            } else r(400 == t ? {
                code: C.code_422,
                msg: C.call_sip_aready_in,
                errorCode: x.sip_call_in_progress
            }: 401 == t ? {
                code: C.code_400,
                msg: C.call_sip_failed,
                errorCode: x.sip_call_failed_error_password
            }: 413 == t ? {
                code: C.code_400,
                msg: C.call_sip_failed,
                errorCode: x.sip_call_signalling_error
            }: 488 == t ? {
                code: C.code_400,
                msg: C.call_sip_failed,
                errorCode: x.sip_call_hang_up
            }: {
                code: C.code_400,
                msg: C.call_sip_failed,
                errorCode: x.sip_call_unknown_error
            })
        },
        function(e) {
            r({
                code: C.code_400,
                msg: C.call_sip_failed,
                errorCode: x.sip_call_send_failed
            })
        })
    }
    function l(e) {
        var t = e.getAttribute("from"),
        n = $(e).find('>call[xmlns="http://igniterealtime.org/protocol/ringing"]'),
        r = $(e).find('>screen[xmlns="http://jitsi.org/protocol/screen"]');
        if (r.length) {
            var o = $(e).find("property").attr("value");
            return console.log("sssssssssssssssssssssss1111111111111", o),
            !0
        }
        var i = $(e).find('>body[xmlns="http://igniterealtime.org/protocol/handsUp"]');
        if (i.length) {
            var s = i[0].getAttribute("type") || "",
            a = i.find("nickname").text() || "",
            c = i.find("content").text() || "";
            return "apply" == s ? $(document).trigger("manis.on.hands.up.msg", [t, a, s, c]) : "agree" == s || "refuse" == s ? $(document).trigger("manis.on.hands.up.response", [t, s]) : console.error("unknown hands up msg", t, s, a, c),
            !0
        }
        var d = $(e).find('>body[xmlns="http://igniterealtime.org/protocol/changeNickname"]');
        if (d.length) {
            var u = d.text();
            return console.log("moderator order me change my nickname to : ", u),
            connection.emuc.addDisplayNameToPresence(u),
            connection.emuc.sendPresence(),
            !0
        }
        if (void 0 != n && n.length > 0) {
            var l = n[0].getAttribute("type");
            if ("invite" == l) {
                var p = n[0].getAttribute("roomID"),
                f = n[0].getAttribute("nickname"),
                g = n[0].getAttribute("meetPassword"),
                _ = $(e).find('>delay[xmlns="urn:xmpp:delay"]'),
                v = n[0].getAttribute("callType") || "0";
                if (console.info("22222222222222222222222 on ring up", e), _.length) return;
                $(document).trigger("oninvite.muc", [t, f, p, g, v])
            } else if ("accept" == l) {
                var p = n[0].getAttribute("roomID"),
                f = n[0].getAttribute("nickname");
                console.info("5555555555555555555555 on ring up accept ", e),
                $(document).trigger("manis.onringup.reply", [t, f, p, "accept"])
            } else if ("reject" == l) {
                var p = n[0].getAttribute("roomID"),
                f = n[0].getAttribute("nickname");
                console.info("666666666666666666666 on ring up reject ", e);
                var y = n[0].getAttribute("isCaller") || "0";
                "1" == y ? (window.incomingCall = !1, $(document).trigger("manis.onringup.reply", [t, f, p, "cancel"])) : $(document).trigger("manis.onringup.reply", [t, f, p, "reject"])
            } else if ("busy" == l) {
                var p = n[0].getAttribute("roomID"),
                f = n[0].getAttribute("nickname");
                console.info("999999999999999999999 on ring up busy ", e),
                $(document).trigger("manis.onringup.reply", [t, f, p, "busy"])
            } else if ("join" == l) {
                var p = n[0].getAttribute("roomID"),
                g = n[0].getAttribute("meetPassword");
                console.log("zzzzzzzzzzzzzzzzzzzz on room complete ", e),
                $(document).trigger("oninvite.room.complete.after.accept.request", [p, g])
            } else "processed" == l && (console.log("xxxxxxxxxxxxxxxxxxxxxx on ring call was processed ", e), $(document).trigger("oninvite.room.processed"))
        }
        var w = e.getAttribute("type");
        if (w && w.length && "chat" == w) {
            var b = $(e).find(">body").text(),
            S = $(e).find('>resolution[xmlns="http://jabber.org/protocol/resolution"]');
            if (S.length) {
                var C = S.text(),
                x = b;
                return "orderChangeResolution" != C || ($(document).trigger("manis.on.change.resolution.request", [t, x]), !0)
            }
            var f = $(e).find('>nick[xmlns="http://jabber.org/protocol/nick"]').text(),
            T = !0;
            b && f && $(document).trigger("onmessage.muc", [t, f, b, T, "yourself"])
        }
        var k = $(e).find('>body[xmlns="http://igniterealtime.org/protocol/grantAdmin"]');
        k.length && m(e);
        var R = $(e).find('>body[xmlns="http://igniterealtime.org/protocol/eject"]');
        return R.length && h(e),
        !0
    }
    function p(e) {
        var t = (e.getAttribute("from"), $(e).find("mute"));
        if (t.length) {
            var n = "true" === t.text();
            b.setAudioMute(n),
            window.forceMuted = n,
            $(document).trigger("onmute.audio.muc", n)
        }
        return ! 0
    }
    function f(e) {
        var t = (e.getAttribute("from"), e.getAttribute("to"), $(e).find("mute"));
        if (t.length) {
            var n = "true" === t.text();
            b.setVideoMute(n),
            window.forceSetVideo = n,
            $(document).trigger("onmute.video.muc", n)
        }
        return ! 0
    }
    function h(e) {
        var t = (e.getAttribute("to"), Strophe.getResourceFromJid(connection.jid)),
        n = $(e).find("body");
        return Strophe.getResourceFromJid(n.attr("jid")) == t && ("true" == n.text() && (R = !0, 1 == window.isUsingScreenStream && $(document).trigger("manis.been.stop.screen.share"), S.disposeConference(!1), connection.emuc.doLeave(), $(document).trigger("oneject.muc")), !0)
    }
    function m(e) {
        var t = (e.getAttribute("to"), Strophe.getResourceFromJid(connection.emuc.connection.jid)),
        n = $(e).find("body");
        if (Strophe.getResourceFromJid(n.attr("jid")) == t) {
            if ("true" == n.text()) {
                b.setAdmin(!0),
                connection.emuc.addConfigRoleToPresence(config.role),
                connection.emuc.addIsModeratorToPresence(b.isAdmin()),
                connection.emuc.sendPresence();
                for (var r = 0; r < window.participants.length; r++) {
                    var o = window.participants[r];
                    o.jid == connection.jid && (o.is_moderator = b.isAdmin(), window.participants[r] = o)
                }
                $(document).trigger("manis.on.grant.admin")
            }
            return ! 0
        }
        return ! 1
    }
    function g() {
        if (b.supportsLocalStorage()) {
            if (!window.localStorage.getItem("manisMeetId")) {
                var e = b.generateUniqueId();
                return window.localStorage.setItem("manisMeetId", e),
                e
            }
            return window.localStorage.getItem("manisMeetId")
        }
        return b.generateUniqueId()
    }
    function _() {
        const e = this.connection.disco;
        e && (e.addFeature("urn:xmpp:jingle:1"), e.addFeature("urn:xmpp:jingle:apps:rtp:1"), e.addFeature("urn:xmpp:jingle:transports:ice-udp:1"), e.addFeature("urn:xmpp:jingle:apps:rtp:audio"), e.addFeature("urn:xmpp:jingle:apps:rtp:video"), e.addFeature("urn:ietf:rfc:5761"), e.addFeature("urn:ietf:rfc:5888"))
    }
    function v(e, t, r, o, i, s, a, c) {
        $.ajax({
            url: s,
            data: {
                username: e,
                password: t,
                domain: a,
                clientType: "web"
            },
            type: "GET",
            timeout: 2e3,
            success: function(e) {
                if (200 == e.code) {
                    if (console.info("sign in manis meeting system control center success: ", e), window.manisConfg = e.obj, !manisConfg.messageServer) return i({
                        code: C.code_401,
                        msg: C.mesage_server_except,
                        errorCode: x.message_server_except
                    }),
                    !1;
                    if (manisConfg.turn && manisConfg.turn.iceServers[0].url && (config.nat = manisConfg.turn.iceServers[0].url), manisConfg.messageServer && (config.focusUserJid = "focus@" + manisConfg.messageServer), "p2p" == window.connectType) {
                        var t = manisConfg.mUserId.toLowerCase() + "@" + manisConfg.messageServer,
                        r = manisConfg.token,
                        s = s ? s: manisConfg.mUserName;
                        T.connect(t, r, s, o, i)
                    } else {
                        var a = Object.assign(window.config, window.manisConfg);
                        window.config = a,
                        c ? n(o, i, s ? s: manisConfg.mUserName) : o({
                            code: C.code_200,
                            msg: C.sign_success,
                            response: window.config,
                            errorCode: x.no_error
                        })
                    }
                } else i(504 == e.code ? {
                    code: C.code_401,
                    msg: C.sign_username_password_error,
                    errorCode: x.username_not_exist
                }: 500 == e.code ? {
                    code: C.code_500,
                    msg: C.sign_failed,
                    errorCode: x.username_not_exist
                }: {
                    code: C.code_500,
                    msg: C.sign_failed,
                    errorCode: e.code
                })
            },
            error: function(e, t) {
                console.error("xOptions : ", e, "textStatus : ", t, "error status : ", e.status),
                i({
                    code: C.code_500,
                    msg: C.sign_failed,
                    errorCode: x.api_fetch_failed
                })
            }
        })
    }
    function y(e, t, r, o) {
        $.ajax({
            url: e,
            dataType: "json",
            data: {
                nickname: t,
                clientType: "web"
            },
            timeout: 2e3,
            success: function(e) {
                if (200 == e.code) {
                    window.manisConfg = e.obj,
                    manisConfg.turn && manisConfg.turn.iceServers[0].url && (config.nat = manisConfg.turn.iceServers[0].url),
                    manisConfg.messageServer && (config.focusUserJid = "focus@" + manisConfg.messageServer);
                    var i = Object.assign(window.config, window.manisConfg);
                    window.config = i,
                    n(r, o, t)
                } else o({
                    code: C.code_403,
                    msg: C.out_of_source_limit,
                    errorCode: x.anonymous_login_failed
                })
            },
            error: function(e, t) {
                o({
                    code: C.code_500,
                    msg: C.join_room_failed,
                    errorCode: x.api_fetch_failed
                })
            }
        })
    }
    function w(e) {
        $.ajax({
            url: window.serverPath + A + manisConfg.mUserId,
            dataType: "jsonp",
            timeout: 2e3,
            success: function(t) {
                e({
                    code: C.code_200,
                    msg: C.get_my_friends_list,
                    response: t.obj,
                    errorCode: x.no_error
                })
            },
            error: function(t, n) {
                e({
                    code: n,
                    msg: C.network_error,
                    errorCode: x.user_friends_fetch_failed
                })
            }
        })
    }
    var b = (t(3), t(4), t(5), t(31), t(52), t(53), t(30)),
    S = t(7),
    C = t(26),
    x = t(27),
    T = t(28),
    k = t(29),
    R = !1,
    A = "/clientApi/friends/";
    e.exports = {
        signInMeetingCtlByAnonymous: y,
        signInMeetingCtl: v,
        callSip: u,
        sendInviteReject: s,
        sendInviteAccept: i,
        sendInviteBusy: a,
        ringUp: o,
        sendJoinAfterRingCallAccept: c,
        sendRingCallProcessedMsg: d,
        sendPrivateMessage: r,
        myFriends: w,
        signInXMPP: n
    }
},
function(e, exports, t) {
    var n, r, o, i, s, a, s, c, s, d, s, u, s, l; !
    function(p) {
        if (function(r, o) { ! (n = function() {
                return o()
            }.call(exports, t, exports, e))
        } (this,
        function() {
            var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            t = {
                encode: function(t) {
                    var n, r, o, i, s, a, c, d = "",
                    u = 0;
                    do n = t.charCodeAt(u++),
                    r = t.charCodeAt(u++),
                    o = t.charCodeAt(u++),
                    i = n >> 2,
                    s = (3 & n) << 4 | r >> 4,
                    a = (15 & r) << 2 | o >> 6,
                    c = 63 & o,
                    isNaN(r) ? (s = (3 & n) << 4, a = c = 64) : isNaN(o) && (c = 64),
                    d = d + e.charAt(i) + e.charAt(s) + e.charAt(a) + e.charAt(c);
                    while (u < t.length);
                    return d
                },
                decode: function(t) {
                    var n, r, o, i, s, a, c, d = "",
                    u = 0;
                    t = t.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                    do i = e.indexOf(t.charAt(u++)),
                    s = e.indexOf(t.charAt(u++)),
                    a = e.indexOf(t.charAt(u++)),
                    c = e.indexOf(t.charAt(u++)),
                    n = i << 2 | s >> 4,
                    r = (15 & s) << 4 | a >> 2,
                    o = (3 & a) << 6 | c,
                    d += String.fromCharCode(n),
                    64 != a && (d += String.fromCharCode(r)),
                    64 != c && (d += String.fromCharCode(o));
                    while (u < t.length);
                    return d
                }
            };
            return t
        }),
        function(n, o) { ! (r = function() {
                return o()
            }.call(exports, t, exports, e))
        } (this,
        function() {
            function e(e, r) {
                e[r >> 5] |= 128 << 24 - r % 32,
                e[(r + 64 >> 9 << 4) + 15] = r;
                var s, a, c, d, u, l, p, f, h = new Array(80),
                m = 1732584193,
                g = -271733879,
                _ = -1732584194,
                v = 271733878,
                y = -1009589776;
                for (s = 0; s < e.length; s += 16) {
                    for (d = m, u = g, l = _, p = v, f = y, a = 0; a < 80; a++) a < 16 ? h[a] = e[s + a] : h[a] = i(h[a - 3] ^ h[a - 8] ^ h[a - 14] ^ h[a - 16], 1),
                    c = o(o(i(m, 5), t(a, g, _, v)), o(o(y, h[a]), n(a))),
                    y = v,
                    v = _,
                    _ = i(g, 30),
                    g = m,
                    m = c;
                    m = o(m, d),
                    g = o(g, u),
                    _ = o(_, l),
                    v = o(v, p),
                    y = o(y, f)
                }
                return [m, g, _, v, y]
            }
            function t(e, t, n, r) {
                return e < 20 ? t & n | ~t & r: e < 40 ? t ^ n ^ r: e < 60 ? t & n | t & r | n & r: t ^ n ^ r
            }
            function n(e) {
                return e < 20 ? 1518500249 : e < 40 ? 1859775393 : e < 60 ? -1894007588 : -899497514
            }
            function r(t, n) {
                var r = s(t);
                r.length > 16 && (r = e(r, 8 * t.length));
                for (var o = new Array(16), i = new Array(16), a = 0; a < 16; a++) o[a] = 909522486 ^ r[a],
                i[a] = 1549556828 ^ r[a];
                var c = e(o.concat(s(n)), 512 + 8 * n.length);
                return e(i.concat(c), 672)
            }
            function o(e, t) {
                var n = (65535 & e) + (65535 & t),
                r = (e >> 16) + (t >> 16) + (n >> 16);
                return r << 16 | 65535 & n
            }
            function i(e, t) {
                return e << t | e >>> 32 - t
            }
            function s(e) {
                for (var t = [], n = 255, r = 0; r < 8 * e.length; r += 8) t[r >> 5] |= (e.charCodeAt(r / 8) & n) << 24 - r % 32;
                return t
            }
            function a(e) {
                for (var t = "",
                n = 255,
                r = 0; r < 32 * e.length; r += 8) t += String.fromCharCode(e[r >> 5] >>> 24 - r % 32 & n);
                return t
            }
            function c(e) {
                for (var t, n, r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                o = "",
                i = 0; i < 4 * e.length; i += 3) for (t = (e[i >> 2] >> 8 * (3 - i % 4) & 255) << 16 | (e[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4) & 255) << 8 | e[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4) & 255, n = 0; n < 4; n++) o += 8 * i + 6 * n > 32 * e.length ? "=": r.charAt(t >> 6 * (3 - n) & 63);
                return o
            }
            return {
                b64_hmac_sha1: function(e, t) {
                    return c(r(e, t))
                },
                b64_sha1: function(t) {
                    return c(e(s(t), 8 * t.length))
                },
                binb2str: a,
                core_hmac_sha1: r,
                str_hmac_sha1: function(e, t) {
                    return a(r(e, t))
                },
                str_sha1: function(t) {
                    return a(e(s(t), 8 * t.length))
                }
            }
        }),
        function(n, r) { ! (o = function() {
                return r()
            }.call(exports, t, exports, e))
        } (this,
        function(e) {
            var t = function(e, t) {
                var n = (65535 & e) + (65535 & t),
                r = (e >> 16) + (t >> 16) + (n >> 16);
                return r << 16 | 65535 & n
            },
            n = function(e, t) {
                return e << t | e >>> 32 - t
            },
            r = function(e) {
                for (var t = [], n = 0; n < 8 * e.length; n += 8) t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << n % 32;
                return t
            },
            o = function(e) {
                for (var t = "",
                n = 0; n < 32 * e.length; n += 8) t += String.fromCharCode(e[n >> 5] >>> n % 32 & 255);
                return t
            },
            i = function(e) {
                for (var t = "0123456789abcdef",
                n = "",
                r = 0; r < 4 * e.length; r++) n += t.charAt(e[r >> 2] >> r % 4 * 8 + 4 & 15) + t.charAt(e[r >> 2] >> r % 4 * 8 & 15);
                return n
            },
            s = function(e, r, o, i, s, a) {
                return t(n(t(t(r, e), t(i, a)), s), o)
            },
            a = function(e, t, n, r, o, i, a) {
                return s(t & n | ~t & r, e, t, o, i, a)
            },
            c = function(e, t, n, r, o, i, a) {
                return s(t & r | n & ~r, e, t, o, i, a)
            },
            d = function(e, t, n, r, o, i, a) {
                return s(t ^ n ^ r, e, t, o, i, a)
            },
            u = function(e, t, n, r, o, i, a) {
                return s(n ^ (t | ~r), e, t, o, i, a)
            },
            l = function(e, n) {
                e[n >> 5] |= 128 << n % 32,
                e[(n + 64 >>> 9 << 4) + 14] = n;
                for (var r, o, i, s, l = 1732584193,
                p = -271733879,
                f = -1732584194,
                h = 271733878,
                m = 0; m < e.length; m += 16) r = l,
                o = p,
                i = f,
                s = h,
                l = a(l, p, f, h, e[m + 0], 7, -680876936),
                h = a(h, l, p, f, e[m + 1], 12, -389564586),
                f = a(f, h, l, p, e[m + 2], 17, 606105819),
                p = a(p, f, h, l, e[m + 3], 22, -1044525330),
                l = a(l, p, f, h, e[m + 4], 7, -176418897),
                h = a(h, l, p, f, e[m + 5], 12, 1200080426),
                f = a(f, h, l, p, e[m + 6], 17, -1473231341),
                p = a(p, f, h, l, e[m + 7], 22, -45705983),
                l = a(l, p, f, h, e[m + 8], 7, 1770035416),
                h = a(h, l, p, f, e[m + 9], 12, -1958414417),
                f = a(f, h, l, p, e[m + 10], 17, -42063),
                p = a(p, f, h, l, e[m + 11], 22, -1990404162),
                l = a(l, p, f, h, e[m + 12], 7, 1804603682),
                h = a(h, l, p, f, e[m + 13], 12, -40341101),
                f = a(f, h, l, p, e[m + 14], 17, -1502002290),
                p = a(p, f, h, l, e[m + 15], 22, 1236535329),
                l = c(l, p, f, h, e[m + 1], 5, -165796510),
                h = c(h, l, p, f, e[m + 6], 9, -1069501632),
                f = c(f, h, l, p, e[m + 11], 14, 643717713),
                p = c(p, f, h, l, e[m + 0], 20, -373897302),
                l = c(l, p, f, h, e[m + 5], 5, -701558691),
                h = c(h, l, p, f, e[m + 10], 9, 38016083),
                f = c(f, h, l, p, e[m + 15], 14, -660478335),
                p = c(p, f, h, l, e[m + 4], 20, -405537848),
                l = c(l, p, f, h, e[m + 9], 5, 568446438),
                h = c(h, l, p, f, e[m + 14], 9, -1019803690),
                f = c(f, h, l, p, e[m + 3], 14, -187363961),
                p = c(p, f, h, l, e[m + 8], 20, 1163531501),
                l = c(l, p, f, h, e[m + 13], 5, -1444681467),
                h = c(h, l, p, f, e[m + 2], 9, -51403784),
                f = c(f, h, l, p, e[m + 7], 14, 1735328473),
                p = c(p, f, h, l, e[m + 12], 20, -1926607734),
                l = d(l, p, f, h, e[m + 5], 4, -378558),
                h = d(h, l, p, f, e[m + 8], 11, -2022574463),
                f = d(f, h, l, p, e[m + 11], 16, 1839030562),
                p = d(p, f, h, l, e[m + 14], 23, -35309556),
                l = d(l, p, f, h, e[m + 1], 4, -1530992060),
                h = d(h, l, p, f, e[m + 4], 11, 1272893353),
                f = d(f, h, l, p, e[m + 7], 16, -155497632),
                p = d(p, f, h, l, e[m + 10], 23, -1094730640),
                l = d(l, p, f, h, e[m + 13], 4, 681279174),
                h = d(h, l, p, f, e[m + 0], 11, -358537222),
                f = d(f, h, l, p, e[m + 3], 16, -722521979),
                p = d(p, f, h, l, e[m + 6], 23, 76029189),
                l = d(l, p, f, h, e[m + 9], 4, -640364487),
                h = d(h, l, p, f, e[m + 12], 11, -421815835),
                f = d(f, h, l, p, e[m + 15], 16, 530742520),
                p = d(p, f, h, l, e[m + 2], 23, -995338651),
                l = u(l, p, f, h, e[m + 0], 6, -198630844),
                h = u(h, l, p, f, e[m + 7], 10, 1126891415),
                f = u(f, h, l, p, e[m + 14], 15, -1416354905),
                p = u(p, f, h, l, e[m + 5], 21, -57434055),
                l = u(l, p, f, h, e[m + 12], 6, 1700485571),
                h = u(h, l, p, f, e[m + 3], 10, -1894986606),
                f = u(f, h, l, p, e[m + 10], 15, -1051523),
                p = u(p, f, h, l, e[m + 1], 21, -2054922799),
                l = u(l, p, f, h, e[m + 8], 6, 1873313359),
                h = u(h, l, p, f, e[m + 15], 10, -30611744),
                f = u(f, h, l, p, e[m + 6], 15, -1560198380),
                p = u(p, f, h, l, e[m + 13], 21, 1309151649),
                l = u(l, p, f, h, e[m + 4], 6, -145523070),
                h = u(h, l, p, f, e[m + 11], 10, -1120210379),
                f = u(f, h, l, p, e[m + 2], 15, 718787259),
                p = u(p, f, h, l, e[m + 9], 21, -343485551),
                l = t(l, r),
                p = t(p, o),
                f = t(f, i),
                h = t(h, s);
                return [l, p, f, h]
            },
            p = {
                hexdigest: function(e) {
                    return i(l(r(e), 8 * e.length))
                },
                hash: function(e) {
                    return o(l(r(e), 8 * e.length))
                }
            };
            return p
        }),
        function(n, r) { ! (i = function() {
                return r()
            }.call(exports, t, exports, e))
        } (this,
        function() {
            var e = {
                utf16to8: function(e) {
                    var t, n, r = "",
                    o = e.length;
                    for (t = 0; t < o; t++) n = e.charCodeAt(t),
                    n >= 0 && n <= 127 ? r += e.charAt(t) : n > 2047 ? (r += String.fromCharCode(224 | n >> 12 & 15), r += String.fromCharCode(128 | n >> 6 & 63), r += String.fromCharCode(128 | n >> 0 & 63)) : (r += String.fromCharCode(192 | n >> 6 & 31), r += String.fromCharCode(128 | n >> 0 & 63));
                    return r
                }
            };
            return e
        }),
        function(e, t) {
            s = [],
            !(a = function() {
                return t()
            }.apply(exports, s))
        } (this,
        function() {
            Function.prototype.bind || (Function.prototype.bind = function(e) {
                var t = this,
                n = Array.prototype.slice,
                r = Array.prototype.concat,
                o = n.call(arguments, 1);
                return function() {
                    return t.apply(e ? e: this, r.call(o, n.call(arguments, 0)))
                }
            }),
            Array.isArray || (Array.isArray = function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }),
            Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
                var t = this.length,
                n = Number(arguments[1]) || 0;
                for (n = n < 0 ? Math.ceil(n) : Math.floor(n), n < 0 && (n += t); n < t; n++) if (n in this && this[n] === e) return n;
                return - 1
            })
        }),
        function(e, t) {
            s = [r, n, o, i, a],
            !(c = function() {
                return t.apply(this, arguments)
            }.apply(exports, s))
        } (this,
        function(e, t, n, r) {
            function o(e, t) {
                return new c.Builder(e, t)
            }
            function i(e) {
                return new c.Builder("message", e)
            }
            function s(e) {
                return new c.Builder("iq", e)
            }
            function a(e) {
                return new c.Builder("presence", e)
            }
            var c;
            return c = {
                VERSION: "1.2.4",
                NS: {
                    HTTPBIND: "http://jabber.org/protocol/httpbind",
                    BOSH: "urn:xmpp:xbosh",
                    CLIENT: "jabber:client",
                    AUTH: "jabber:iq:auth",
                    ROSTER: "jabber:iq:roster",
                    PROFILE: "jabber:iq:profile",
                    DISCO_INFO: "http://jabber.org/protocol/disco#info",
                    DISCO_ITEMS: "http://jabber.org/protocol/disco#items",
                    MUC: "http://jabber.org/protocol/muc",
                    SASL: "urn:ietf:params:xml:ns:xmpp-sasl",
                    STREAM: "http://etherx.jabber.org/streams",
                    FRAMING: "urn:ietf:params:xml:ns:xmpp-framing",
                    BIND: "urn:ietf:params:xml:ns:xmpp-bind",
                    SESSION: "urn:ietf:params:xml:ns:xmpp-session",
                    VERSION: "jabber:iq:version",
                    STANZAS: "urn:ietf:params:xml:ns:xmpp-stanzas",
                    XHTML_IM: "http://jabber.org/protocol/xhtml-im",
                    XHTML: "http://www.w3.org/1999/xhtml"
                },
                XHTML: {
                    tags: ["a", "blockquote", "br", "cite", "em", "img", "li", "ol", "p", "span", "strong", "ul", "body"],
                    attributes: {
                        a: ["href"],
                        blockquote: ["style"],
                        br: [],
                        cite: ["style"],
                        em: [],
                        img: ["src", "alt", "style", "height", "width"],
                        li: ["style"],
                        ol: ["style"],
                        p: ["style"],
                        span: ["style"],
                        strong: [],
                        ul: ["style"],
                        body: []
                    },
                    css: ["background-color", "color", "font-family", "font-size", "font-style", "font-weight", "margin-left", "margin-right", "text-align", "text-decoration"],
                    validTag: function(e) {
                        for (var t = 0; t < c.XHTML.tags.length; t++) if (e == c.XHTML.tags[t]) return ! 0;
                        return ! 1
                    },
                    validAttribute: function(e, t) {
                        if ("undefined" != typeof c.XHTML.attributes[e] && c.XHTML.attributes[e].length > 0) for (var n = 0; n < c.XHTML.attributes[e].length; n++) if (t == c.XHTML.attributes[e][n]) return ! 0;
                        return ! 1
                    },
                    validCSS: function(e) {
                        for (var t = 0; t < c.XHTML.css.length; t++) if (e == c.XHTML.css[t]) return ! 0;
                        return ! 1
                    }
                },
                Status: {
                    ERROR: 0,
                    CONNECTING: 1,
                    CONNFAIL: 2,
                    AUTHENTICATING: 3,
                    AUTHFAIL: 4,
                    CONNECTED: 5,
                    DISCONNECTED: 6,
                    DISCONNECTING: 7,
                    ATTACHED: 8,
                    REDIRECT: 9
                },
                LogLevel: {
                    DEBUG: 0,
                    INFO: 1,
                    WARN: 2,
                    ERROR: 3,
                    FATAL: 4
                },
                ElementType: {
                    NORMAL: 1,
                    TEXT: 3,
                    CDATA: 4,
                    FRAGMENT: 11
                },
                TIMEOUT: 1.1,
                SECONDARY_TIMEOUT: .1,
                addNamespace: function(e, t) {
                    c.NS[e] = t
                },
                forEachChild: function(e, t, n) {
                    var r, o;
                    for (r = 0; r < e.childNodes.length; r++) o = e.childNodes[r],
                    o.nodeType != c.ElementType.NORMAL || t && !this.isTagEqual(o, t) || n(o)
                },
                isTagEqual: function(e, t) {
                    return e.tagName == t
                },
                _xmlGenerator: null,
                _makeGenerator: function() {
                    var e;
                    return void 0 === document.implementation.createDocument || document.implementation.createDocument && document.documentMode && document.documentMode < 10 ? (e = this._getIEXmlDom(), e.appendChild(e.createElement("strophe"))) : e = document.implementation.createDocument("jabber:client", "strophe", null),
                    e
                },
                xmlGenerator: function() {
                    return c._xmlGenerator || (c._xmlGenerator = c._makeGenerator()),
                    c._xmlGenerator
                },
                _getIEXmlDom: function() {
                    for (var e = null,
                    t = ["Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.5.0", "Msxml2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument", "MSXML.DOMDocument", "Microsoft.XMLDOM"], n = 0; n < t.length && null === e; n++) try {
                        e = new ActiveXObject(t[n])
                    } catch(t) {
                        e = null
                    }
                    return e
                },
                xmlElement: function(e) {
                    if (!e) return null;
                    var t, n, r, o = c.xmlGenerator().createElement(e);
                    for (t = 1; t < arguments.length; t++) {
                        var i = arguments[t];
                        if (i) if ("string" == typeof i || "number" == typeof i) o.appendChild(c.xmlTextNode(i));
                        else if ("object" == typeof i && "function" == typeof i.sort) for (n = 0; n < i.length; n++) {
                            var s = i[n];
                            "object" == typeof s && "function" == typeof s.sort && void 0 !== s[1] && null !== s[1] && o.setAttribute(s[0], s[1])
                        } else if ("object" == typeof i) for (r in i) i.hasOwnProperty(r) && void 0 !== i[r] && null !== i[r] && o.setAttribute(r, i[r])
                    }
                    return o
                },
                xmlescape: function(e) {
                    return e = e.replace(/\&/g, "&amp;"),
                    e = e.replace(/</g, "&lt;"),
                    e = e.replace(/>/g, "&gt;"),
                    e = e.replace(/'/g, "&apos;"),
                    e = e.replace(/"/g, "&quot;")
                },
                xmlunescape: function(e) {
                    return e = e.replace(/\&amp;/g, "&"),
                    e = e.replace(/&lt;/g, "<"),
                    e = e.replace(/&gt;/g, ">"),
                    e = e.replace(/&apos;/g, "'"),
                    e = e.replace(/&quot;/g, '"')
                },
                xmlTextNode: function(e) {
                    return c.xmlGenerator().createTextNode(e)
                },
                xmlHtmlNode: function(e) {
                    var t;
                    if (window.DOMParser) {
                        var n = new DOMParser;
                        t = n.parseFromString(e, "text/xml")
                    } else t = new ActiveXObject("Microsoft.XMLDOM"),
                    t.async = "false",
                    t.loadXML(e);
                    return t
                },
                getText: function(e) {
                    if (!e) return null;
                    var t = "";
                    0 === e.childNodes.length && e.nodeType == c.ElementType.TEXT && (t += e.nodeValue);
                    for (var n = 0; n < e.childNodes.length; n++) e.childNodes[n].nodeType == c.ElementType.TEXT && (t += e.childNodes[n].nodeValue);
                    return c.xmlescape(t)
                },
                copyElement: function(e) {
                    var t, n;
                    if (e.nodeType == c.ElementType.NORMAL) {
                        for (n = c.xmlElement(e.tagName), t = 0; t < e.attributes.length; t++) n.setAttribute(e.attributes[t].nodeName, e.attributes[t].value);
                        for (t = 0; t < e.childNodes.length; t++) n.appendChild(c.copyElement(e.childNodes[t]))
                    } else e.nodeType == c.ElementType.TEXT && (n = c.xmlGenerator().createTextNode(e.nodeValue));
                    return n
                },
                createHtml: function(e) {
                    var t, n, r, o, i, s, a, d, u, l, p;
                    if (e.nodeType == c.ElementType.NORMAL) if (o = e.nodeName.toLowerCase(), c.XHTML.validTag(o)) try {
                        for (n = c.xmlElement(o), t = 0; t < c.XHTML.attributes[o].length; t++) if (i = c.XHTML.attributes[o][t], s = e.getAttribute(i), "undefined" != typeof s && null !== s && "" !== s && s !== !1 && 0 !== s) if ("style" == i && "object" == typeof s && "undefined" != typeof s.cssText && (s = s.cssText), "style" == i) {
                            for (a = [], d = s.split(";"), r = 0; r < d.length; r++) u = d[r].split(":"),
                            l = u[0].replace(/^\s*/, "").replace(/\s*$/, "").toLowerCase(),
                            c.XHTML.validCSS(l) && (p = u[1].replace(/^\s*/, "").replace(/\s*$/, ""), a.push(l + ": " + p));
                            a.length > 0 && (s = a.join("; "), n.setAttribute(i, s))
                        } else n.setAttribute(i, s);
                        for (t = 0; t < e.childNodes.length; t++) n.appendChild(c.createHtml(e.childNodes[t]))
                    } catch(e) {
                        n = c.xmlTextNode("")
                    } else for (n = c.xmlGenerator().createDocumentFragment(), t = 0; t < e.childNodes.length; t++) n.appendChild(c.createHtml(e.childNodes[t]));
                    else if (e.nodeType == c.ElementType.FRAGMENT) for (n = c.xmlGenerator().createDocumentFragment(), t = 0; t < e.childNodes.length; t++) n.appendChild(c.createHtml(e.childNodes[t]));
                    else e.nodeType == c.ElementType.TEXT && (n = c.xmlTextNode(e.nodeValue));
                    return n
                },
                escapeNode: function(e) {
                    return "string" != typeof e ? e: e.replace(/^\s+|\s+$/g, "").replace(/\\/g, "\\5c").replace(/ /g, "\\20").replace(/\"/g, "\\22").replace(/\&/g, "\\26").replace(/\'/g, "\\27").replace(/\//g, "\\2f").replace(/:/g, "\\3a").replace(/</g, "\\3c").replace(/>/g, "\\3e").replace(/@/g, "\\40")
                },
                unescapeNode: function(e) {
                    return "string" != typeof e ? e: e.replace(/\\20/g, " ").replace(/\\22/g, '"').replace(/\\26/g, "&").replace(/\\27/g, "'").replace(/\\2f/g, "/").replace(/\\3a/g, ":").replace(/\\3c/g, "<").replace(/\\3e/g, ">").replace(/\\40/g, "@").replace(/\\5c/g, "\\")
                },
                getNodeFromJid: function(e) {
                    return e.indexOf("@") < 0 ? null: e.split("@")[0]
                },
                getDomainFromJid: function(e) {
                    var t = c.getBareJidFromJid(e);
                    if (t.indexOf("@") < 0) return t;
                    var n = t.split("@");
                    return n.splice(0, 1),
                    n.join("@")
                },
                getResourceFromJid: function(e) {
                    var t = e.split("/");
                    return t.length < 2 ? null: (t.splice(0, 1), t.join("/"))
                },
                getBareJidFromJid: function(e) {
                    return e ? e.split("/")[0] : null
                },
                log: function(e, t) {},
                debug: function(e) {
                    this.log(this.LogLevel.DEBUG, e)
                },
                info: function(e) {
                    this.log(this.LogLevel.INFO, e)
                },
                warn: function(e) {
                    this.log(this.LogLevel.WARN, e)
                },
                error: function(e) {
                    this.log(this.LogLevel.ERROR, e)
                },
                fatal: function(e) {
                    this.log(this.LogLevel.FATAL, e)
                },
                serialize: function(e) {
                    var t;
                    if (!e) return null;
                    "function" == typeof e.tree && (e = e.tree());
                    var n, r, o = e.nodeName;
                    for (e.getAttribute("_realname") && (o = e.getAttribute("_realname")), t = "<" + o, n = 0; n < e.attributes.length; n++)"_realname" != e.attributes[n].nodeName && (t += " " + e.attributes[n].nodeName + "='" + e.attributes[n].value.replace(/&/g, "&amp;").replace(/\'/g, "&apos;").replace(/>/g, "&gt;").replace(/</g, "&lt;") + "'");
                    if (e.childNodes.length > 0) {
                        for (t += ">", n = 0; n < e.childNodes.length; n++) switch (r = e.childNodes[n], r.nodeType) {
                        case c.ElementType.NORMAL:
                            t += c.serialize(r);
                            break;
                        case c.ElementType.TEXT:
                            t += c.xmlescape(r.nodeValue);
                            break;
                        case c.ElementType.CDATA:
                            t += "<![CDATA[" + r.nodeValue + "]]>"
                        }
                        t += "</" + o + ">"
                    } else t += "/>";
                    return t
                },
                _requestId: 0,
                _connectionPlugins: {},
                addConnectionPlugin: function(e, t) {
                    c._connectionPlugins[e] = t
                }
            },
            c.Builder = function(e, t) {
                "presence" != e && "message" != e && "iq" != e || (t && !t.xmlns ? t.xmlns = c.NS.CLIENT: t || (t = {
                    xmlns: c.NS.CLIENT
                })),
                this.nodeTree = c.xmlElement(e, t),
                this.node = this.nodeTree
            },
            c.Builder.prototype = {
                tree: function() {
                    return this.nodeTree
                },
                toString: function() {
                    return c.serialize(this.nodeTree)
                },
                up: function() {
                    return this.node = this.node.parentNode,
                    this
                },
                attrs: function(e) {
                    for (var t in e) e.hasOwnProperty(t) && (void 0 === e[t] ? this.node.removeAttribute(t) : this.node.setAttribute(t, e[t]));
                    return this
                },
                c: function(e, t, n) {
                    var r = c.xmlElement(e, t, n);
                    return this.node.appendChild(r),
                    "string" != typeof n && (this.node = r),
                    this
                },
                cnode: function(e) {
                    var t, n = c.xmlGenerator();
                    try {
                        t = void 0 !== n.importNode
                    } catch(e) {
                        t = !1
                    }
                    var r = t ? n.importNode(e, !0) : c.copyElement(e);
                    return this.node.appendChild(r),
                    this.node = r,
                    this
                },
                t: function(e) {
                    var t = c.xmlTextNode(e);
                    return this.node.appendChild(t),
                    this
                },
                h: function(e) {
                    var t = document.createElement("body");
                    t.innerHTML = e;
                    for (var n = c.createHtml(t); n.childNodes.length > 0;) this.node.appendChild(n.childNodes[0]);
                    return this
                }
            },
            c.Handler = function(e, t, n, r, o, i, s) {
                this.handler = e,
                this.ns = t,
                this.name = n,
                this.type = r,
                this.id = o,
                this.options = s || {
                    matchBare: !1
                },
                this.options.matchBare || (this.options.matchBare = !1),
                this.options.matchBare ? this.from = i ? c.getBareJidFromJid(i) : null: this.from = i,
                this.user = !0
            },
            c.Handler.prototype = {
                isMatch: function(e) {
                    var t, n = null;
                    if (n = this.options.matchBare ? c.getBareJidFromJid(e.getAttribute("from")) : e.getAttribute("from"), t = !1, this.ns) {
                        var r = this;
                        c.forEachChild(e, null,
                        function(e) {
                            e.getAttribute("xmlns") == r.ns && (t = !0)
                        }),
                        t = t || e.getAttribute("xmlns") == this.ns
                    } else t = !0;
                    var o = e.getAttribute("type");
                    return ! (!t || this.name && !c.isTagEqual(e, this.name) || this.type && (Array.isArray(this.type) ? this.type.indexOf(o) == -1 : o != this.type) || this.id && e.getAttribute("id") != this.id || this.from && n != this.from)
                },
                run: function(e) {
                    var t = null;
                    try {
                        t = this.handler(e)
                    } catch(e) {
                        throw e.sourceURL ? c.fatal("error: " + this.handler + " " + e.sourceURL + ":" + e.line + " - " + e.name + ": " + e.message) : e.fileName ? ("undefined" != typeof console && (console.trace(), console.error(this.handler, " - error - ", e, e.message)), c.fatal("error: " + this.handler + " " + e.fileName + ":" + e.lineNumber + " - " + e.name + ": " + e.message)) : c.fatal("error: " + e.message + "\n" + e.stack),
                        e
                    }
                    return t
                },
                toString: function() {
                    return "{Handler: " + this.handler + "(" + this.name + "," + this.id + "," + this.ns + ")}"
                }
            },
            c.TimedHandler = function(e, t) {
                this.period = e,
                this.handler = t,
                this.lastCalled = (new Date).getTime(),
                this.user = !0
            },
            c.TimedHandler.prototype = {
                run: function() {
                    return this.lastCalled = (new Date).getTime(),
                    this.handler()
                },
                reset: function() {
                    this.lastCalled = (new Date).getTime()
                },
                toString: function() {
                    return "{TimedHandler: " + this.handler + "(" + this.period + ")}"
                }
            },
            c.Connection = function(e, t) {
                this.service = e,
                this.options = t || {};
                var n = this.options.protocol || "";
                0 === e.indexOf("ws:") || 0 === e.indexOf("wss:") || 0 === n.indexOf("ws") ? this._proto = new c.Websocket(this) : this._proto = new c.Bosh(this),
                this.jid = "",
                this.domain = null,
                this.features = null,
                this._sasl_data = {},
                this.do_session = !1,
                this.do_bind = !1,
                this.timedHandlers = [],
                this.handlers = [],
                this.removeTimeds = [],
                this.removeHandlers = [],
                this.addTimeds = [],
                this.addHandlers = [],
                this._authentication = {},
                this._idleTimeout = null,
                this._disconnectTimeout = null,
                this.authenticated = !1,
                this.connected = !1,
                this.disconnecting = !1,
                this.do_authentication = !0,
                this.paused = !1,
                this.restored = !1,
                this._data = [],
                this._uniqueId = 0,
                this._sasl_success_handler = null,
                this._sasl_failure_handler = null,
                this._sasl_challenge_handler = null,
                this.maxRetries = 5,
                this._idleTimeout = setTimeout(this._onIdle.bind(this), 100);
                for (var r in c._connectionPlugins) if (c._connectionPlugins.hasOwnProperty(r)) {
                    var o = c._connectionPlugins[r],
                    i = function() {};
                    i.prototype = o,
                    this[r] = new i,
                    this[r].init(this)
                }
            },
            c.Connection.prototype = {
                reset: function() {
                    this._proto._reset(),
                    this.do_session = !1,
                    this.do_bind = !1,
                    this.timedHandlers = [],
                    this.handlers = [],
                    this.removeTimeds = [],
                    this.removeHandlers = [],
                    this.addTimeds = [],
                    this.addHandlers = [],
                    this._authentication = {},
                    this.authenticated = !1,
                    this.connected = !1,
                    this.disconnecting = !1,
                    this.restored = !1,
                    this._data = [],
                    this._requests = [],
                    this._uniqueId = 0
                },
                pause: function() {
                    this.paused = !0
                },
                resume: function() {
                    this.paused = !1
                },
                getUniqueId: function(e) {
                    var t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,
                    function(e) {
                        var t = 16 * Math.random() | 0,
                        n = "x" == e ? t: 3 & t | 8;
                        return n.toString(16)
                    });
                    return "string" == typeof e || "number" == typeof e ? t + ":" + e: t + ""
                },
                connect: function(e, t, n, r, o, i, s) {
                    this.jid = e,
                    this.authzid = c.getBareJidFromJid(this.jid),
                    this.authcid = s || c.getNodeFromJid(this.jid),
                    this.pass = t,
                    this.servtype = "xmpp",
                    this.connect_callback = n,
                    this.disconnecting = !1,
                    this.connected = !1,
                    this.authenticated = !1,
                    this.restored = !1,
                    this.domain = c.getDomainFromJid(this.jid),
                    this._changeConnectStatus(c.Status.CONNECTING, null),
                    this._proto._connect(r, o, i)
                },
                attach: function(e, t, n, r, o, i, s) {
                    if (! (this._proto instanceof c.Bosh)) throw {
                        name: "StropheSessionError",
                        message: 'The "attach" method can only be used with a BOSH connection.'
                    };
                    this._proto._attach(e, t, n, r, o, i, s)
                },
                restore: function(e, t, n, r, o) {
                    if (!this._sessionCachingSupported()) throw {
                        name: "StropheSessionError",
                        message: 'The "restore" method can only be used with a BOSH connection.'
                    };
                    this._proto._restore(e, t, n, r, o)
                },
                _sessionCachingSupported: function() {
                    if (this._proto instanceof c.Bosh) {
                        if (!JSON) return ! 1;
                        try {
                            window.sessionStorage.setItem("_strophe_", "_strophe_"),
                            window.sessionStorage.removeItem("_strophe_")
                        } catch(e) {
                            return ! 1
                        }
                        return ! 0
                    }
                    return ! 1
                },
                xmlInput: function(e) {},
                xmlOutput: function(e) {},
                rawInput: function(e) {},
                rawOutput: function(e) {},
                nextValidRid: function(e) {},
                send: function(e) {
                    if (null !== e) {
                        if ("function" == typeof e.sort) for (var t = 0; t < e.length; t++) this._queueData(e[t]);
                        else "function" == typeof e.tree ? this._queueData(e.tree()) : this._queueData(e);
                        this._proto._send()
                    }
                },
                flush: function() {
                    clearTimeout(this._idleTimeout),
                    this._onIdle()
                },
                sendIQ: function(e, t, n, r) {
                    var o = null,
                    i = this;
                    "function" == typeof e.tree && (e = e.tree());
                    var s = e.getAttribute("id");
                    s || (s = this.getUniqueId("sendIQ"), e.setAttribute("id", s));
                    var a = e.getAttribute("to"),
                    d = this.jid,
                    u = this.addHandler(function(e) {
                        o && i.deleteTimedHandler(o);
                        var r = !1,
                        s = e.getAttribute("from");
                        if (s !== a && (a || s !== c.getBareJidFromJid(d) && s !== c.getDomainFromJid(d) && s !== d) || (r = !0), !r) throw {
                            name: "StropheError",
                            message: "Got answer to IQ from wrong jid:" + s + "\nExpected jid: " + a
                        };
                        var u = e.getAttribute("type");
                        if ("result" == u) t && t(e);
                        else {
                            if ("error" != u) throw {
                                name: "StropheError",
                                message: "Got bad IQ type of " + u
                            };
                            n && n(e)
                        }
                    },
                    null, "iq", ["error", "result"], s);
                    return r && (o = this.addTimedHandler(r,
                    function() {
                        return i.deleteHandler(u),
                        n && n(null),
                        !1
                    })),
                    this.send(e),
                    s
                },
                _queueData: function(e) {
                    if (null === e || !e.tagName || !e.childNodes) throw {
                        name: "StropheError",
                        message: "Cannot queue non-DOMElement."
                    };
                    this._data.push(e)
                },
                _sendRestart: function() {
                    this._data.push("restart"),
                    this._proto._sendRestart(),
                    this._idleTimeout = setTimeout(this._onIdle.bind(this), 100)
                },
                addTimedHandler: function(e, t) {
                    var n = new c.TimedHandler(e, t);
                    return this.addTimeds.push(n),
                    n
                },
                deleteTimedHandler: function(e) {
                    this.removeTimeds.push(e)
                },
                addHandler: function(e, t, n, r, o, i, s) {
                    var a = new c.Handler(e, t, n, r, o, i, s);
                    return this.addHandlers.push(a),
                    a
                },
                deleteHandler: function(e) {
                    this.removeHandlers.push(e);
                    var t = this.addHandlers.indexOf(e);
                    t >= 0 && this.addHandlers.splice(t, 1)
                },
                disconnect: function(e) {
                    if (this._changeConnectStatus(c.Status.DISCONNECTING, e), c.info("Disconnect was called because: " + e), this.connected) {
                        var t = !1;
                        this.disconnecting = !0,
                        this.authenticated && (t = a({
                            xmlns: c.NS.CLIENT,
                            type: "unavailable"
                        })),
                        this._disconnectTimeout = this._addSysTimedHandler(3e3, this._onDisconnectTimeout.bind(this)),
                        this._proto._disconnect(t)
                    } else c.info("Disconnect was called before Strophe connected to the server"),
                    this._proto._abortAllRequests()
                },
                _changeConnectStatus: function(e, t) {
                    for (var n in c._connectionPlugins) if (c._connectionPlugins.hasOwnProperty(n)) {
                        var r = this[n];
                        if (r.statusChanged) try {
                            r.statusChanged(e, t)
                        } catch(e) {
                            c.error("" + n + " plugin caused an exception changing status: " + e)
                        }
                    }
                    if (this.connect_callback) try {
                        this.connect_callback(e, t)
                    } catch(e) {
                        c.error("User connection callback caused an exception: " + e)
                    }
                },
                _doDisconnect: function(e) {
                    "number" == typeof this._idleTimeout && clearTimeout(this._idleTimeout),
                    null !== this._disconnectTimeout && (this.deleteTimedHandler(this._disconnectTimeout), this._disconnectTimeout = null),
                    c.info("_doDisconnect was called"),
                    this._proto._doDisconnect(),
                    this.authenticated = !1,
                    this.disconnecting = !1,
                    this.restored = !1,
                    this.handlers = [],
                    this.timedHandlers = [],
                    this.removeTimeds = [],
                    this.removeHandlers = [],
                    this.addTimeds = [],
                    this.addHandlers = [],
                    this._changeConnectStatus(c.Status.DISCONNECTED, e),
                    this.connected = !1
                },
                _dataRecv: function(e, t) {
                    c.info("_dataRecv called");
                    var n = this._proto._reqToData(e);
                    if (null !== n) {
                        this.xmlInput !== c.Connection.prototype.xmlInput && (n.nodeName === this._proto.strip && n.childNodes.length ? this.xmlInput(n.childNodes[0]) : this.xmlInput(n)),
                        this.rawInput !== c.Connection.prototype.rawInput && (t ? this.rawInput(t) : this.rawInput(c.serialize(n)));
                        for (var r, o; this.removeHandlers.length > 0;) o = this.removeHandlers.pop(),
                        r = this.handlers.indexOf(o),
                        r >= 0 && this.handlers.splice(r, 1);
                        for (; this.addHandlers.length > 0;) this.handlers.push(this.addHandlers.pop());
                        if (this.disconnecting && this._proto._emptyQueue()) return void this._doDisconnect();
                        var i, s, a = n.getAttribute("type");
                        if (null !== a && "terminate" == a) {
                            if (this.disconnecting) return;
                            return i = n.getAttribute("condition"),
                            s = n.getElementsByTagName("conflict"),
                            null !== i ? ("remote-stream-error" == i && s.length > 0 && (i = "conflict"), this._changeConnectStatus(c.Status.CONNFAIL, i)) : this._changeConnectStatus(c.Status.CONNFAIL, "unknown"),
                            void this._doDisconnect(i)
                        }
                        var d = this;
                        c.forEachChild(n, null,
                        function(e) {
                            var t, n;
                            for (n = d.handlers, d.handlers = [], t = 0; t < n.length; t++) {
                                var r = n[t];
                                try { ! r.isMatch(e) || !d.authenticated && r.user ? d.handlers.push(r) : r.run(e) && d.handlers.push(r)
                                } catch(e) {
                                    c.warn("Removing Strophe handlers due to uncaught exception: " + e.message)
                                }
                            }
                        })
                    }
                },
                mechanisms: {},
                _connect_cb: function(e, t, n) {
                    c.info("_connect_cb was called"),
                    this.connected = !0;
                    var r;
                    try {
                        r = this._proto._reqToData(e)
                    } catch(e) {
                        if ("badformat" != e) throw e;
                        this._changeConnectStatus(c.Status.CONNFAIL, "bad-format"),
                        this._doDisconnect("bad-format")
                    }
                    if (r) {
                        this.xmlInput !== c.Connection.prototype.xmlInput && (r.nodeName === this._proto.strip && r.childNodes.length ? this.xmlInput(r.childNodes[0]) : this.xmlInput(r)),
                        this.rawInput !== c.Connection.prototype.rawInput && (n ? this.rawInput(n) : this.rawInput(c.serialize(r)));
                        var o = this._proto._connect_cb(r);
                        if (o !== c.Status.CONNFAIL) {
                            this._authentication.sasl_scram_sha1 = !1,
                            this._authentication.sasl_plain = !1,
                            this._authentication.sasl_digest_md5 = !1,
                            this._authentication.sasl_anonymous = !1,
                            this._authentication.legacy_auth = !1;
                            var i;
                            i = r.getElementsByTagNameNS ? r.getElementsByTagNameNS(c.NS.STREAM, "features").length > 0 : r.getElementsByTagName("stream:features").length > 0 || r.getElementsByTagName("features").length > 0;
                            var s, a, d = r.getElementsByTagName("mechanism"),
                            u = [],
                            l = !1;
                            if (!i) return void this._proto._no_auth_received(t);
                            if (d.length > 0) for (s = 0; s < d.length; s++) a = c.getText(d[s]),
                            this.mechanisms[a] && u.push(this.mechanisms[a]);
                            return this._authentication.legacy_auth = r.getElementsByTagName("auth").length > 0,
                            (l = this._authentication.legacy_auth || u.length > 0) ? void(this.do_authentication !== !1 && this.authenticate(u)) : void this._proto._no_auth_received(t)
                        }
                    }
                },
                authenticate: function(e) {
                    var n;
                    for (n = 0; n < e.length - 1; ++n) {
                        for (var r = n,
                        i = n + 1; i < e.length; ++i) e[i].prototype.priority > e[r].prototype.priority && (r = i);
                        if (r != n) {
                            var a = e[n];
                            e[n] = e[r],
                            e[r] = a
                        }
                    }
                    var d = !1;
                    for (n = 0; n < e.length; ++n) if (e[n].test(this)) {
                        this._sasl_success_handler = this._addSysHandler(this._sasl_success_cb.bind(this), null, "success", null, null),
                        this._sasl_failure_handler = this._addSysHandler(this._sasl_failure_cb.bind(this), null, "failure", null, null),
                        this._sasl_challenge_handler = this._addSysHandler(this._sasl_challenge_cb.bind(this), null, "challenge", null, null),
                        this._sasl_mechanism = new e[n],
                        this._sasl_mechanism.onStart(this);
                        var u = o("auth", {
                            xmlns: c.NS.SASL,
                            mechanism: this._sasl_mechanism.name
                        });
                        if (this._sasl_mechanism.isClientFirst) {
                            var l = this._sasl_mechanism.onChallenge(this, null);
                            u.t(t.encode(l))
                        }
                        this.send(u.tree()),
                        d = !0;
                        break
                    }
                    d || (null === c.getNodeFromJid(this.jid) ? (this._changeConnectStatus(c.Status.CONNFAIL, "x-strophe-bad-non-anon-jid"), this.disconnect("x-strophe-bad-non-anon-jid")) : (this._changeConnectStatus(c.Status.AUTHENTICATING, null), this._addSysHandler(this._auth1_cb.bind(this), null, null, null, "_auth_1"), this.send(s({
                        type: "get",
                        to: this.domain,
                        id: "_auth_1"
                    }).c("query", {
                        xmlns: c.NS.AUTH
                    }).c("username", {}).t(c.getNodeFromJid(this.jid)).tree())))
                },
                _sasl_challenge_cb: function(e) {
                    var n = t.decode(c.getText(e)),
                    r = this._sasl_mechanism.onChallenge(this, n),
                    i = o("response", {
                        xmlns: c.NS.SASL
                    });
                    return "" !== r && i.t(t.encode(r)),
                    this.send(i.tree()),
                    !0
                },
                _auth1_cb: function(e) {
                    var t = s({
                        type: "set",
                        id: "_auth_2"
                    }).c("query", {
                        xmlns: c.NS.AUTH
                    }).c("username", {}).t(c.getNodeFromJid(this.jid)).up().c("password").t(this.pass);
                    return c.getResourceFromJid(this.jid) || (this.jid = c.getBareJidFromJid(this.jid) + "/strophe"),
                    t.up().c("resource", {}).t(c.getResourceFromJid(this.jid)),
                    this._addSysHandler(this._auth2_cb.bind(this), null, null, null, "_auth_2"),
                    this.send(t.tree()),
                    !1
                },
                _sasl_success_cb: function(e) {
                    if (this._sasl_data["server-signature"]) {
                        var n, r = t.decode(c.getText(e)),
                        o = /([a-z]+)=([^,]+)(,|$)/,
                        i = r.match(o);
                        if ("v" == i[1] && (n = i[2]), n != this._sasl_data["server-signature"]) return this.deleteHandler(this._sasl_failure_handler),
                        this._sasl_failure_handler = null,
                        this._sasl_challenge_handler && (this.deleteHandler(this._sasl_challenge_handler), this._sasl_challenge_handler = null),
                        this._sasl_data = {},
                        this._sasl_failure_cb(null)
                    }
                    c.info("SASL authentication succeeded."),
                    this._sasl_mechanism && this._sasl_mechanism.onSuccess(),
                    this.deleteHandler(this._sasl_failure_handler),
                    this._sasl_failure_handler = null,
                    this._sasl_challenge_handler && (this.deleteHandler(this._sasl_challenge_handler), this._sasl_challenge_handler = null);
                    var s = [],
                    a = function(e, t) {
                        for (; e.length;) this.deleteHandler(e.pop());
                        return this._sasl_auth1_cb.bind(this)(t),
                        !1
                    };
                    return s.push(this._addSysHandler(function(e) {
                        a.bind(this)(s, e)
                    }.bind(this), null, "stream:features", null, null)),
                    s.push(this._addSysHandler(function(e) {
                        a.bind(this)(s, e)
                    }.bind(this), c.NS.STREAM, "features", null, null)),
                    this._sendRestart(),
                    !1
                },
                _sasl_auth1_cb: function(e) {
                    this.features = e;
                    var t, n;
                    for (t = 0; t < e.childNodes.length; t++) n = e.childNodes[t],
                    "bind" == n.nodeName && (this.do_bind = !0),
                    "session" == n.nodeName && (this.do_session = !0);
                    if (!this.do_bind) return this._changeConnectStatus(c.Status.AUTHFAIL, null),
                    !1;
                    this._addSysHandler(this._sasl_bind_cb.bind(this), null, null, null, "_bind_auth_2");
                    var r = c.getResourceFromJid(this.jid);
                    return r ? this.send(s({
                        type: "set",
                        id: "_bind_auth_2"
                    }).c("bind", {
                        xmlns: c.NS.BIND
                    }).c("resource", {}).t(r).tree()) : this.send(s({
                        type: "set",
                        id: "_bind_auth_2"
                    }).c("bind", {
                        xmlns: c.NS.BIND
                    }).tree()),
                    !1
                },
                _sasl_bind_cb: function(e) {
                    if ("error" == e.getAttribute("type")) {
                        c.info("SASL binding failed.");
                        var t, n = e.getElementsByTagName("conflict");
                        return n.length > 0 && (t = "conflict"),
                        this._changeConnectStatus(c.Status.AUTHFAIL, t),
                        !1
                    }
                    var r, o = e.getElementsByTagName("bind");
                    return o.length > 0 ? (r = o[0].getElementsByTagName("jid"), void(r.length > 0 && (this.jid = c.getText(r[0]), this.do_session ? (this._addSysHandler(this._sasl_session_cb.bind(this), null, null, null, "_session_auth_2"), this.send(s({
                        type: "set",
                        id: "_session_auth_2"
                    }).c("session", {
                        xmlns: c.NS.SESSION
                    }).tree())) : (this.authenticated = !0, this._changeConnectStatus(c.Status.CONNECTED, null))))) : (c.info("SASL binding failed."), this._changeConnectStatus(c.Status.AUTHFAIL, null), !1)
                },
                _sasl_session_cb: function(e) {
                    if ("result" == e.getAttribute("type")) this.authenticated = !0,
                    this._changeConnectStatus(c.Status.CONNECTED, null);
                    else if ("error" == e.getAttribute("type")) return c.info("Session creation failed."),
                    this._changeConnectStatus(c.Status.AUTHFAIL, null),
                    !1;
                    return ! 1
                },
                _sasl_failure_cb: function(e) {
                    return this._sasl_success_handler && (this.deleteHandler(this._sasl_success_handler), this._sasl_success_handler = null),
                    this._sasl_challenge_handler && (this.deleteHandler(this._sasl_challenge_handler), this._sasl_challenge_handler = null),
                    this._sasl_mechanism && this._sasl_mechanism.onFailure(),
                    this._changeConnectStatus(c.Status.AUTHFAIL, null),
                    !1
                },
                _auth2_cb: function(e) {
                    return "result" == e.getAttribute("type") ? (this.authenticated = !0, this._changeConnectStatus(c.Status.CONNECTED, null)) : "error" == e.getAttribute("type") && (this._changeConnectStatus(c.Status.AUTHFAIL, null), this.disconnect("authentication failed")),
                    !1
                },
                _addSysTimedHandler: function(e, t) {
                    var n = new c.TimedHandler(e, t);
                    return n.user = !1,
                    this.addTimeds.push(n),
                    n
                },
                _addSysHandler: function(e, t, n, r, o) {
                    var i = new c.Handler(e, t, n, r, o);
                    return i.user = !1,
                    this.addHandlers.push(i),
                    i
                },
                _onDisconnectTimeout: function() {
                    return c.info("_onDisconnectTimeout was called"),
                    this._proto._onDisconnectTimeout(),
                    this._doDisconnect(),
                    !1
                },
                _onIdle: function() {
                    for (var e, t, n, r; this.addTimeds.length > 0;) this.timedHandlers.push(this.addTimeds.pop());
                    for (; this.removeTimeds.length > 0;) t = this.removeTimeds.pop(),
                    e = this.timedHandlers.indexOf(t),
                    e >= 0 && this.timedHandlers.splice(e, 1);
                    var o = (new Date).getTime();
                    for (r = [], e = 0; e < this.timedHandlers.length; e++) t = this.timedHandlers[e],
                    !this.authenticated && t.user || (n = t.lastCalled + t.period, n - o <= 0 ? t.run() && r.push(t) : r.push(t));
                    this.timedHandlers = r,
                    clearTimeout(this._idleTimeout),
                    this._proto._onIdle(),
                    this.connected && (this._idleTimeout = setTimeout(this._onIdle.bind(this), 100))
                }
            },
            c.SASLMechanism = function(e, t, n) {
                this.name = e,
                this.isClientFirst = t,
                this.priority = n
            },
            c.SASLMechanism.prototype = {
                test: function(e) {
                    return ! 0
                },
                onStart: function(e) {
                    this._connection = e
                },
                onChallenge: function(e, t) {
                    throw new Error("You should implement challenge handling!")
                },
                onFailure: function() {
                    this._connection = null
                },
                onSuccess: function() {
                    this._connection = null
                }
            },
            c.SASLAnonymous = function() {},
            c.SASLAnonymous.prototype = new c.SASLMechanism("ANONYMOUS", !1, 10),
            c.SASLAnonymous.test = function(e) {
                return null === e.authcid
            },
            c.Connection.prototype.mechanisms[c.SASLAnonymous.prototype.name] = c.SASLAnonymous,
            c.SASLPlain = function() {},
            c.SASLPlain.prototype = new c.SASLMechanism("PLAIN", !0, 20),
            c.SASLPlain.test = function(e) {
                return null !== e.authcid
            },
            c.SASLPlain.prototype.onChallenge = function(e) {
                var t = e.authzid;
                return t += "\0",
                t += e.authcid,
                t += "\0",
                t += e.pass,
                r.utf16to8(t)
            },
            c.Connection.prototype.mechanisms[c.SASLPlain.prototype.name] = c.SASLPlain,
            c.SASLSHA1 = function() {},
            c.SASLSHA1.prototype = new c.SASLMechanism("SCRAM-SHA-1", !0, 40),
            c.SASLSHA1.test = function(e) {
                return null !== e.authcid
            },
            c.SASLSHA1.prototype.onChallenge = function(o, i, s) {
                var a = s || n.hexdigest(1234567890 * Math.random()),
                c = "n=" + r.utf16to8(o.authcid);
                return c += ",r=",
                c += a,
                o._sasl_data.cnonce = a,
                o._sasl_data["client-first-message-bare"] = c,
                c = "n,," + c,
                this.onChallenge = function(n, o) {
                    for (var i, s, a, c, d, u, l, p, f, h, m, g, _ = "c=biws,",
                    v = n._sasl_data["client-first-message-bare"] + "," + o + ",", y = n._sasl_data.cnonce, w = /([a-z]+)=([^,]+)(,|$)/; o.match(w);) {
                        var b = o.match(w);
                        switch (o = o.replace(b[0], ""), b[1]) {
                        case "r":
                            i = b[2];
                            break;
                        case "s":
                            s = b[2];
                            break;
                        case "i":
                            a = b[2]
                        }
                    }
                    if (i.substr(0, y.length) !== y) return n._sasl_data = {},
                    n._sasl_failure_cb();
                    for (_ += "r=" + i, v += _, s = t.decode(s), s += "\0\0\0", f = r.utf16to8(n.pass), c = u = e.core_hmac_sha1(f, s), l = 1; l < a; l++) {
                        for (d = e.core_hmac_sha1(f, e.binb2str(u)), p = 0; p < 5; p++) c[p] ^= d[p];
                        u = d
                    }
                    for (c = e.binb2str(c), h = e.core_hmac_sha1(c, "Client Key"), m = e.str_hmac_sha1(c, "Server Key"), g = e.core_hmac_sha1(e.str_sha1(e.binb2str(h)), v), n._sasl_data["server-signature"] = e.b64_hmac_sha1(m, v), p = 0; p < 5; p++) h[p] ^= g[p];
                    return _ += ",p=" + t.encode(e.binb2str(h))
                }.bind(this),
                c
            },
            c.Connection.prototype.mechanisms[c.SASLSHA1.prototype.name] = c.SASLSHA1,
            c.SASLMD5 = function() {},
            c.SASLMD5.prototype = new c.SASLMechanism("DIGEST-MD5", !1, 30),
            c.SASLMD5.test = function(e) {
                return null !== e.authcid
            },
            c.SASLMD5.prototype._quote = function(e) {
                return '"' + e.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"'
            },
            c.SASLMD5.prototype.onChallenge = function(e, t, o) {
                for (var i, s = /([a-z]+)=("[^"]+"|[^,"]+)(?:,|$)/,
                a = o || n.hexdigest("" + 1234567890 * Math.random()), c = "", d = null, u = "", l = ""; t.match(s);) switch (i = t.match(s), t = t.replace(i[0], ""), i[2] = i[2].replace(/^"(.+)"$/, "$1"), i[1]) {
                case "realm":
                    c = i[2];
                    break;
                case "nonce":
                    u = i[2];
                    break;
                case "qop":
                    l = i[2];
                    break;
                case "host":
                    d = i[2]
                }
                var p = e.servtype + "/" + e.domain;
                null !== d && (p = p + "/" + d);
                var f = r.utf16to8(e.authcid + ":" + c + ":" + this._connection.pass),
                h = n.hash(f) + ":" + u + ":" + a,
                m = "AUTHENTICATE:" + p,
                g = "";
                return g += "charset=utf-8,",
                g += "username=" + this._quote(r.utf16to8(e.authcid)) + ",",
                g += "realm=" + this._quote(c) + ",",
                g += "nonce=" + this._quote(u) + ",",
                g += "nc=00000001,",
                g += "cnonce=" + this._quote(a) + ",",
                g += "digest-uri=" + this._quote(p) + ",",
                g += "response=" + n.hexdigest(n.hexdigest(h) + ":" + u + ":00000001:" + a + ":auth:" + n.hexdigest(m)) + ",",
                g += "qop=auth",
                this.onChallenge = function() {
                    return ""
                }.bind(this),
                g
            },
            c.Connection.prototype.mechanisms[c.SASLMD5.prototype.name] = c.SASLMD5,
            {
                Strophe: c,
                $build: o,
                $msg: i,
                $iq: s,
                $pres: a,
                SHA1: e,
                Base64: t,
                MD5: n
            }
        }),
        function(e, t) {
            s = [c],
            !(d = function(e) {
                return t(e.Strophe, e.$build)
            }.apply(exports, s))
        } (this,
        function(e, t) {
            return e.Request = function(t, n, r, o) {
                this.id = ++e._requestId,
                this.xmlData = t,
                this.data = e.serialize(t),
                this.origFunc = n,
                this.func = n,
                this.rid = r,
                this.date = NaN,
                this.sends = o || 0,
                this.abort = !1,
                this.dead = null,
                this.age = function() {
                    if (!this.date) return 0;
                    var e = new Date;
                    return (e - this.date) / 1e3
                },
                this.timeDead = function() {
                    if (!this.dead) return 0;
                    var e = new Date;
                    return (e - this.dead) / 1e3
                },
                this.xhr = this._newXHR()
            },
            e.Request.prototype = {
                getResponse: function() {
                    var t = null;
                    if (this.xhr.responseXML && this.xhr.responseXML.documentElement) {
                        if (t = this.xhr.responseXML.documentElement, "parsererror" == t.tagName) throw e.error("invalid response received"),
                        e.error("responseText: " + this.xhr.responseText),
                        e.error("responseXML: " + e.serialize(this.xhr.responseXML)),
                        "parsererror"
                    } else if (this.xhr.responseText) throw e.error("invalid response received"),
                    e.error("responseText: " + this.xhr.responseText),
                    "badformat";
                    return t
                },
                _newXHR: function() {
                    var e = null;
                    return window.XMLHttpRequest ? (e = new XMLHttpRequest, e.overrideMimeType && e.overrideMimeType("text/xml; charset=utf-8")) : window.ActiveXObject && (e = new ActiveXObject("Microsoft.XMLHTTP")),
                    e.onreadystatechange = this.func.bind(null, this),
                    e
                }
            },
            e.Bosh = function(e) {
                this._conn = e,
                this.rid = Math.floor(4294967295 * Math.random()),
                this.sid = null,
                this.hold = 1,
                this.wait = 60,
                this.window = 5,
                this.errors = 0,
                this._requests = []
            },
            e.Bosh.prototype = {
                strip: null,
                _buildBody: function() {
                    var n = t("body", {
                        rid: this.rid++,
                        xmlns: e.NS.HTTPBIND
                    });
                    return null !== this.sid && n.attrs({
                        sid: this.sid
                    }),
                    this._conn.options.keepalive && this._cacheSession(),
                    n
                },
                _reset: function() {
                    this.rid = Math.floor(4294967295 * Math.random()),
                    this.sid = null,
                    this.errors = 0,
                    window.sessionStorage.removeItem("strophe-bosh-session"),
                    this._conn.nextValidRid(this.rid)
                },
                _connect: function(t, n, r) {
                    this.wait = t || this.wait,
                    this.hold = n || this.hold,
                    this.errors = 0;
                    var o = this._buildBody().attrs({
                        to: this._conn.domain,
                        "xml:lang": "en",
                        wait: this.wait,
                        hold: this.hold,
                        content: "text/xml; charset=utf-8",
                        ver: "1.6",
                        "xmpp:version": "1.0",
                        "xmlns:xmpp": e.NS.BOSH
                    });
                    r && o.attrs({
                        route: r
                    });
                    var i = this._conn._connect_cb;
                    this._requests.push(new e.Request(o.tree(), this._onRequestStateChange.bind(this, i.bind(this._conn)), o.tree().getAttribute("rid"))),
                    this._throttledRequestHandler()
                },
                _attach: function(t, n, r, o, i, s, a) {
                    this._conn.jid = t,
                    this.sid = n,
                    this.rid = r,
                    this._conn.connect_callback = o,
                    this._conn.domain = e.getDomainFromJid(this._conn.jid),
                    this._conn.authenticated = !0,
                    this._conn.connected = !0,
                    this.wait = i || this.wait,
                    this.hold = s || this.hold,
                    this.window = a || this.window,
                    this._conn._changeConnectStatus(e.Status.ATTACHED, null)
                },
                _restore: function(t, n, r, o, i) {
                    var s = JSON.parse(window.sessionStorage.getItem("strophe-bosh-session"));
                    if (! ("undefined" != typeof s && null !== s && s.rid && s.sid && s.jid) || "undefined" != typeof t && "null" !== t && e.getBareJidFromJid(s.jid) != e.getBareJidFromJid(t)) throw {
                        name: "StropheSessionError",
                        message: "_restore: no restoreable session."
                    };
                    this._conn.restored = !0,
                    this._attach(s.jid, s.sid, s.rid, n, r, o, i)
                },
                _cacheSession: function() {
                    this._conn.authenticated ? this._conn.jid && this.rid && this.sid && window.sessionStorage.setItem("strophe-bosh-session", JSON.stringify({
                        jid: this._conn.jid,
                        rid: this.rid,
                        sid: this.sid
                    })) : window.sessionStorage.removeItem("strophe-bosh-session")
                },
                _connect_cb: function(t) {
                    var n, r, o = t.getAttribute("type");
                    if (null !== o && "terminate" == o) return n = t.getAttribute("condition"),
                    e.error("BOSH-Connection failed: " + n),
                    r = t.getElementsByTagName("conflict"),
                    null !== n ? ("remote-stream-error" == n && r.length > 0 && (n = "conflict"), this._conn._changeConnectStatus(e.Status.CONNFAIL, n)) : this._conn._changeConnectStatus(e.Status.CONNFAIL, "unknown"),
                    this._conn._doDisconnect(n),
                    e.Status.CONNFAIL;
                    this.sid || (this.sid = t.getAttribute("sid"));
                    var i = t.getAttribute("requests");
                    i && (this.window = parseInt(i, 10));
                    var s = t.getAttribute("hold");
                    s && (this.hold = parseInt(s, 10));
                    var a = t.getAttribute("wait");
                    a && (this.wait = parseInt(a, 10))
                },
                _disconnect: function(e) {
                    this._sendTerminate(e)
                },
                _doDisconnect: function() {
                    this.sid = null,
                    this.rid = Math.floor(4294967295 * Math.random()),
                    window.sessionStorage.removeItem("strophe-bosh-session"),
                    this._conn.nextValidRid(this.rid)
                },
                _emptyQueue: function() {
                    return 0 === this._requests.length
                },
                _hitError: function(t) {
                    this.errors++,
                    e.warn("request errored, status: " + t + ", number of errors: " + this.errors),
                    this.errors > 4 && this._conn._onDisconnectTimeout()
                },
                _no_auth_received: function(t) {
                    t = t ? t.bind(this._conn) : this._conn._connect_cb.bind(this._conn);
                    var n = this._buildBody();
                    this._requests.push(new e.Request(n.tree(), this._onRequestStateChange.bind(this, t.bind(this._conn)), n.tree().getAttribute("rid"))),
                    this._throttledRequestHandler()
                },
                _onDisconnectTimeout: function() {
                    this._abortAllRequests()
                },
                _abortAllRequests: function() {
                    for (var e; this._requests.length > 0;) e = this._requests.pop(),
                    e.abort = !0,
                    e.xhr.abort(),
                    e.xhr.onreadystatechange = function() {}
                },
                _onIdle: function() {
                    var t = this._conn._data;
                    if (this._conn.authenticated && 0 === this._requests.length && 0 === t.length && !this._conn.disconnecting && (e.info("no requests during idle cycle, sending blank request"), t.push(null)), !this._conn.paused) {
                        if (this._requests.length < 2 && t.length > 0) {
                            for (var n = this._buildBody(), r = 0; r < t.length; r++) null !== t[r] && ("restart" === t[r] ? n.attrs({
                                to: this._conn.domain,
                                "xml:lang": "en",
                                "xmpp:restart": "true",
                                "xmlns:xmpp": e.NS.BOSH
                            }) : n.cnode(t[r]).up());
                            delete this._conn._data,
                            this._conn._data = [],
                            this._requests.push(new e.Request(n.tree(), this._onRequestStateChange.bind(this, this._conn._dataRecv.bind(this._conn)), n.tree().getAttribute("rid"))),
                            this._throttledRequestHandler()
                        }
                        if (this._requests.length > 0) {
                            var o = this._requests[0].age();
                            null !== this._requests[0].dead && this._requests[0].timeDead() > Math.floor(e.SECONDARY_TIMEOUT * this.wait) && this._throttledRequestHandler(),
                            o > Math.floor(e.TIMEOUT * this.wait) && (e.warn("Request " + this._requests[0].id + " timed out, over " + Math.floor(e.TIMEOUT * this.wait) + " seconds since last activity"), this._throttledRequestHandler())
                        }
                    }
                },
                _onRequestStateChange: function(t, n) {
                    if (e.debug("request id " + n.id + "." + n.sends + " state changed to " + n.xhr.readyState), n.abort) return void(n.abort = !1);
                    var r;
                    if (4 == n.xhr.readyState) {
                        r = 0;
                        try {
                            r = n.xhr.status
                        } catch(e) {}
                        if ("undefined" == typeof r && (r = 0), this.disconnecting && r >= 400) return void this._hitError(r);
                        var o = this._requests[0] == n,
                        i = this._requests[1] == n; (r > 0 && r < 500 || n.sends > 5) && (this._removeRequest(n), e.debug("request id " + n.id + " should now be removed")),
                        200 == r ? ((i || o && this._requests.length > 0 && this._requests[0].age() > Math.floor(e.SECONDARY_TIMEOUT * this.wait)) && this._restartRequest(0), this._conn.nextValidRid(Number(n.rid) + 1), e.debug("request id " + n.id + "." + n.sends + " got 200"), t(n), this.errors = 0) : (e.error("request id " + n.id + "." + n.sends + " error " + r + " happened"), (0 === r || r >= 400 && r < 600 || r >= 12e3) && (this._hitError(r), r >= 400 && r < 500 && (this._conn._changeConnectStatus(e.Status.DISCONNECTING, null), this._conn._doDisconnect()))),
                        r > 0 && r < 500 || n.sends > 5 || this._throttledRequestHandler()
                    }
                },
                _processRequest: function(t) {
                    var n = this,
                    r = this._requests[t],
                    o = -1;
                    try {
                        4 == r.xhr.readyState && (o = r.xhr.status)
                    } catch(n) {
                        e.error("caught an error in _requests[" + t + "], reqStatus: " + o)
                    }
                    if ("undefined" == typeof o && (o = -1), r.sends > this._conn.maxRetries) return void this._conn._onDisconnectTimeout();
                    var i = r.age(),
                    s = !isNaN(i) && i > Math.floor(e.TIMEOUT * this.wait),
                    a = null !== r.dead && r.timeDead() > Math.floor(e.SECONDARY_TIMEOUT * this.wait),
                    c = 4 == r.xhr.readyState && (o < 1 || o >= 500);
                    if ((s || a || c) && (a && e.error("Request " + this._requests[t].id + " timed out (secondary), restarting"), r.abort = !0, r.xhr.abort(), r.xhr.onreadystatechange = function() {},
                    this._requests[t] = new e.Request(r.xmlData, r.origFunc, r.rid, r.sends), r = this._requests[t]), 0 === r.xhr.readyState) {
                        e.debug("request id " + r.id + "." + r.sends + " posting");
                        try {
                            r.xhr.open("POST", this._conn.service, !this._conn.options.sync),
                            r.xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8")
                        } catch(t) {
                            return e.error("XHR open failed."),
                            this._conn.connected || this._conn._changeConnectStatus(e.Status.CONNFAIL, "bad-service"),
                            void this._conn.disconnect()
                        }
                        var d = function() {
                            if (r.date = new Date, n._conn.options.customHeaders) {
                                var e = n._conn.options.customHeaders;
                                for (var t in e) e.hasOwnProperty(t) && r.xhr.setRequestHeader(t, e[t])
                            }
                            r.xhr.send(r.data)
                        };
                        if (r.sends > 1) {
                            var u = 1e3 * Math.min(Math.floor(e.TIMEOUT * this.wait), Math.pow(r.sends, 3));
                            setTimeout(d, u)
                        } else d();
                        r.sends++,
                        this._conn.xmlOutput !== e.Connection.prototype.xmlOutput && (r.xmlData.nodeName === this.strip && r.xmlData.childNodes.length ? this._conn.xmlOutput(r.xmlData.childNodes[0]) : this._conn.xmlOutput(r.xmlData)),
                        this._conn.rawOutput !== e.Connection.prototype.rawOutput && this._conn.rawOutput(r.data)
                    } else e.debug("_processRequest: " + (0 === t ? "first": "second") + " request has readyState of " + r.xhr.readyState)
                },
                _removeRequest: function(t) {
                    e.debug("removing request");
                    var n;
                    for (n = this._requests.length - 1; n >= 0; n--) t == this._requests[n] && this._requests.splice(n, 1);
                    t.xhr.onreadystatechange = function() {},
                    this._throttledRequestHandler()
                },
                _restartRequest: function(e) {
                    var t = this._requests[e];
                    null === t.dead && (t.dead = new Date),
                    this._processRequest(e)
                },
                _reqToData: function(e) {
                    try {
                        return e.getResponse()
                    } catch(e) {
                        if ("parsererror" != e) throw e;
                        this._conn.disconnect("strophe-parsererror")
                    }
                },
                _sendTerminate: function(t) {
                    e.info("_sendTerminate was called");
                    var n = this._buildBody().attrs({
                        type: "terminate"
                    });
                    t && n.cnode(t.tree());
                    var r = new e.Request(n.tree(), this._onRequestStateChange.bind(this, this._conn._dataRecv.bind(this._conn)), n.tree().getAttribute("rid"));
                    this._requests.push(r),
                    this._throttledRequestHandler()
                },
                _send: function() {
                    clearTimeout(this._conn._idleTimeout),
                    this._throttledRequestHandler(),
                    this._conn._idleTimeout = setTimeout(this._conn._onIdle.bind(this._conn), 100)
                },
                _sendRestart: function() {
                    this._throttledRequestHandler(),
                    clearTimeout(this._conn._idleTimeout)
                },
                _throttledRequestHandler: function() {
                    this._requests ? e.debug("_throttledRequestHandler called with " + this._requests.length + " requests") : e.debug("_throttledRequestHandler called with undefined requests"),
                    this._requests && 0 !== this._requests.length && (this._requests.length > 0 && this._processRequest(0), this._requests.length > 1 && Math.abs(this._requests[0].rid - this._requests[1].rid) < this.window && this._processRequest(1))
                }
            },
            e
        }),
        function(e, t) {
            s = [c],
            !(u = function(e) {
                return t(e.Strophe, e.$build)
            }.apply(exports, s))
        } (this,
        function(e, t) {
            return e.Websocket = function(e) {
                this._conn = e,
                this.strip = "wrapper";
                var t = e.service;
                if (0 !== t.indexOf("ws:") && 0 !== t.indexOf("wss:")) {
                    var n = "";
                    n += "ws" === e.options.protocol && "https:" !== window.location.protocol ? "ws": "wss",
                    n += "://" + window.location.host,
                    n += 0 !== t.indexOf("/") ? window.location.pathname + t: t,
                    e.service = n
                }
            },
            e.Websocket.prototype = {
                _buildStream: function() {
                    return t("open", {
                        xmlns: e.NS.FRAMING,
                        to: this._conn.domain,
                        version: "1.0"
                    })
                },
                _check_streamerror: function(t, n) {
                    var r;
                    if (r = t.getElementsByTagNameNS ? t.getElementsByTagNameNS(e.NS.STREAM, "error") : t.getElementsByTagName("stream:error"), 0 === r.length) return ! 1;
                    for (var o = r[0], i = "", s = "", a = "urn:ietf:params:xml:ns:xmpp-streams", c = 0; c < o.childNodes.length; c++) {
                        var d = o.childNodes[c];
                        if (d.getAttribute("xmlns") !== a) break;
                        "text" === d.nodeName ? s = d.textContent: i = d.nodeName
                    }
                    var u = "WebSocket stream error: ";
                    return u += i ? i: "unknown",
                    s && (u += " - " + i),
                    e.error(u),
                    this._conn._changeConnectStatus(n, i),
                    this._conn._doDisconnect(),
                    !0
                },
                _reset: function() {},
                _connect: function() {
                    this._closeSocket(),
                    this.socket = new WebSocket(this._conn.service, "xmpp"),
                    this.socket.onopen = this._onOpen.bind(this),
                    this.socket.onerror = this._onError.bind(this),
                    this.socket.onclose = this._onClose.bind(this),
                    this.socket.onmessage = this._connect_cb_wrapper.bind(this)
                },
                _connect_cb: function(t) {
                    var n = this._check_streamerror(t, e.Status.CONNFAIL);
                    if (n) return e.Status.CONNFAIL
                },
                _handleStreamStart: function(t) {
                    var n = !1,
                    r = t.getAttribute("xmlns");
                    "string" != typeof r ? n = "Missing xmlns in <open />": r !== e.NS.FRAMING && (n = "Wrong xmlns in <open />: " + r);
                    var o = t.getAttribute("version");
                    return "string" != typeof o ? n = "Missing version in <open />": "1.0" !== o && (n = "Wrong version in <open />: " + o),
                    !n || (this._conn._changeConnectStatus(e.Status.CONNFAIL, n), this._conn._doDisconnect(), !1)
                },
                _connect_cb_wrapper: function(t) {
                    if (0 === t.data.indexOf("<open ") || 0 === t.data.indexOf("<?xml")) {
                        var n = t.data.replace(/^(<\?.*?\?>\s*)*/, "");
                        if ("" === n) return;
                        var r = (new DOMParser).parseFromString(n, "text/xml").documentElement;
                        this._conn.xmlInput(r),
                        this._conn.rawInput(t.data),
                        this._handleStreamStart(r) && this._connect_cb(r)
                    } else if (0 === t.data.indexOf("<close ")) {
                        this._conn.rawInput(t.data),
                        this._conn.xmlInput(t);
                        var o = t.getAttribute("see-other-uri");
                        o ? (this._conn._changeConnectStatus(e.Status.REDIRECT, "Received see-other-uri, resetting connection"), this._conn.reset(), this._conn.service = o, this._connect()) : (this._conn._changeConnectStatus(e.Status.CONNFAIL, "Received closing stream"), this._conn._doDisconnect())
                    } else {
                        var i = this._streamWrap(t.data),
                        s = (new DOMParser).parseFromString(i, "text/xml").documentElement;
                        this.socket.onmessage = this._onMessage.bind(this),
                        this._conn._connect_cb(s, null, t.data)
                    }
                },
                _disconnect: function(n) {
                    if (this.socket && this.socket.readyState !== WebSocket.CLOSED) {
                        n && this._conn.send(n);
                        var r = t("close", {
                            xmlns: e.NS.FRAMING
                        });
                        this._conn.xmlOutput(r);
                        var o = e.serialize(r);
                        this._conn.rawOutput(o);
                        try {
                            this.socket.send(o)
                        } catch(t) {
                            e.info("Couldn't send <close /> tag.")
                        }
                    }
                    this._conn._doDisconnect()
                },
                _doDisconnect: function() {
                    e.info("WebSockets _doDisconnect was called"),
                    this._closeSocket()
                },
                _streamWrap: function(e) {
                    return "<wrapper>" + e + "</wrapper>"
                },
                _closeSocket: function() {
                    if (this.socket) try {
                        this.socket.close()
                    } catch(e) {}
                    this.socket = null
                },
                _emptyQueue: function() {
                    return ! 0
                },
                _onClose: function() {
                    this._conn.connected && !this._conn.disconnecting ? (e.error("Websocket closed unexcectedly"), this._conn._doDisconnect()) : e.info("Websocket closed")
                },
                _no_auth_received: function(t) {
                    e.error("Server did not send any auth methods"),
                    this._conn._changeConnectStatus(e.Status.CONNFAIL, "Server did not send any auth methods"),
                    t && (t = t.bind(this._conn))(),
                    this._conn._doDisconnect()
                },
                _onDisconnectTimeout: function() {},
                _abortAllRequests: function() {},
                _onError: function(t) {
                    e.error("Websocket error " + t),
                    this._conn._changeConnectStatus(e.Status.CONNFAIL, "The WebSocket connection could not be established was disconnected."),
                    this._disconnect()
                },
                _onIdle: function() {
                    var t = this._conn._data;
                    if (t.length > 0 && !this._conn.paused) {
                        for (var n = 0; n < t.length; n++) if (null !== t[n]) {
                            var r, o;
                            r = "restart" === t[n] ? this._buildStream().tree() : t[n],
                            o = e.serialize(r),
                            this._conn.xmlOutput(r),
                            this._conn.rawOutput(o),
                            this.socket.send(o)
                        }
                        this._conn._data = []
                    }
                },
                _onMessage: function(t) {
                    var n, r, o = '<close xmlns="urn:ietf:params:xml:ns:xmpp-framing" />';
                    if (t.data === o) return this._conn.rawInput(o),
                    this._conn.xmlInput(t),
                    void(this._conn.disconnecting || this._conn._doDisconnect());
                    if (0 === t.data.search("<open ")) {
                        if (n = (new DOMParser).parseFromString(t.data, "text/xml").documentElement, !this._handleStreamStart(n)) return
                    } else r = this._streamWrap(t.data),
                    n = (new DOMParser).parseFromString(r, "text/xml").documentElement;
                    return this._check_streamerror(n, e.Status.ERROR) ? void 0 : this._conn.disconnecting && "presence" === n.firstChild.nodeName && "unavailable" === n.firstChild.getAttribute("type") ? (this._conn.xmlInput(n), void this._conn.rawInput(e.serialize(n))) : void this._conn._dataRecv(n, t.data)
                },
                _onOpen: function() {
                    e.info("Websocket open");
                    var t = this._buildStream();
                    this._conn.xmlOutput(t.tree());
                    var n = e.serialize(t);
                    this._conn.rawOutput(n),
                    this.socket.send(n)
                },
                _reqToData: function(e) {
                    return e
                },
                _send: function() {
                    this._conn.flush()
                },
                _sendRestart: function() {
                    clearTimeout(this._conn._idleTimeout),
                    this._conn._onIdle.bind(this._conn)()
                }
            },
            e
        }),
        function(e) {
            s = [c, d, u],
            !(l = function(e) {
                return e
            }.apply(exports, s))
        } (this), p) {
            var f = p; !
            function() {
                var e = [l]; (function(e) {
                    f(e.Strophe, e.$build, e.$msg, e.$iq, e.$pres)
                }).apply(null, e)
            } ()
        }
    } (function(e, t, n, r, o) {
        window.Strophe = e,
        window.$build = t,
        window.$msg = n,
        window.$iq = r,
        window.$pres = o
    })
},
function(e, exports) {
    Strophe.addConnectionPlugin("disco", {
        _connection: null,
        _identities: [],
        _features: [],
        _items: [],
        init: function(e) {
            this._connection = e,
            this._identities = [],
            this._features = [],
            this._items = [],
            e.addHandler(this._onDiscoInfo.bind(this), Strophe.NS.DISCO_INFO, "iq", "get", null, null),
            e.addHandler(this._onDiscoItems.bind(this), Strophe.NS.DISCO_ITEMS, "iq", "get", null, null)
        },
        addIdentity: function(e, t, n, r) {
            for (var o = 0; o < this._identities.length; o++) if (this._identities[o].category == e && this._identities[o].type == t && this._identities[o].name == n && this._identities[o].lang == r) return ! 1;
            return this._identities.push({
                category: e,
                type: t,
                name: n,
                lang: r
            }),
            !0
        },
        addFeature: function(e) {
            for (var t = 0; t < this._features.length; t++) if (this._features[t] == e) return ! 1;
            return this._features.push(e),
            !0
        },
        removeFeature: function(e) {
            for (var t = 0; t < this._features.length; t++) if (this._features[t] === e) return this._features.splice(t, 1),
            !0;
            return ! 1
        },
        addItem: function(e, t, n, r) {
            return ! (n && !r) && (this._items.push({
                jid: e,
                name: t,
                node: n,
                call_back: r
            }), !0)
        },
        info: function(e, t, n, r, o) {
            var i = {
                xmlns: Strophe.NS.DISCO_INFO
            };
            t && (i.node = t);
            var s = $iq({
                from: this._connection.jid,
                to: e,
                type: "get"
            }).c("query", i);
            this._connection.sendIQ(s, n, r, o)
        },
        items: function(e, t, n, r, o) {
            var i = {
                xmlns: Strophe.NS.DISCO_ITEMS
            };
            t && (i.node = t);
            var s = $iq({
                from: this._connection.jid,
                to: e,
                type: "get"
            }).c("query", i);
            this._connection.sendIQ(s, n, r, o)
        },
        _buildIQResult: function(e, t) {
            var n = e.getAttribute("id"),
            r = e.getAttribute("from"),
            o = $iq({
                type: "result",
                id: n
            });
            return null !== r && o.attrs({
                to: r
            }),
            o.c("query", t)
        },
        _onDiscoInfo: function(e) {
            var t, n = e.getElementsByTagName("query")[0].getAttribute("node"),
            r = {
                xmlns: Strophe.NS.DISCO_INFO
            };
            n && (r.node = n);
            var o = this._buildIQResult(e, r);
            for (t = 0; t < this._identities.length; t++) r = {
                category: this._identities[t].category,
                type: this._identities[t].type
            },
            this._identities[t].name && (r.name = this._identities[t].name),
            this._identities[t].lang && (r["xml:lang"] = this._identities[t].lang),
            o.c("identity", r).up();
            for (t = 0; t < this._features.length; t++) o.c("feature", {
                var: this._features[t]
            }).up();
            return this._connection.send(o.tree()),
            !0
        },
        _onDiscoItems: function(e) {
            var t, n, r = {
                xmlns: Strophe.NS.DISCO_ITEMS
            },
            o = e.getElementsByTagName("query")[0].getAttribute("node");
            if (o) {
                for (r.node = o, t = [], n = 0; n < this._items.length; n++) if (this._items[n].node == o) {
                    t = this._items[n].call_back(e);
                    break
                }
            } else t = this._items;
            var i = this._buildIQResult(e, r);
            for (n = 0; n < t.length; n++) {
                var s = {
                    jid: t[n].jid
                };
                t[n].name && (s.name = t[n].name),
                t[n].node && (s.node = t[n].node),
                i.c("item", s).up()
            }
            return this._connection.send(i.tree()),
            !0
        }
    })
},
function(e, exports, t) {
    var n = t(6);
    Strophe.addConnectionPlugin("emuc", {
        connection: null,
        roomjid: null,
        myroomjid: null,
        members: {},
        list_members: [],
        presMap: {},
        preziMap: {},
        joined: !1,
        isOwner: !1,
        role: null,
        init: function(e) {
            this.connection = e
        },
        initPresenceMap: function(e) {
            this.presMap.to = e,
            this.presMap.xns = "http://igniterealtime.org/protocol/ofmeet"
        },
        doJoin: function(e, t) {
            this.members = {},
            this.list_members = [],
            this.myroomjid = e,
            console.info("Joined MUC as " + this.myroomjid),
            this.initPresenceMap(this.myroomjid.split("/")[0]),
            this.roomjid || (this.roomjid = Strophe.getBareJidFromJid(e), this.connection.addHandler(this.handleManageIq.bind(this), null, "iq", "set", null, null), this.connection.addHandler(this.onPresence.bind(this), null, "presence", null, null, null, {
                matchBare: !0
            }), this.connection.addHandler(this.onPresenceUnavailable.bind(this), null, "presence", "unavailable", null, null, {
                matchBare: !0
            }), this.connection.addHandler(this.onPresenceError.bind(this), null, "presence", "error", null, null, {
                matchBare: !0
            }), this.connection.addHandler(this.onMessage.bind(this), null, "message", null, null, null, {
                matchBare: !0
            }), this.connection.addHandler(this.handleRecordResultIq.bind(this), null, "iq", "result")),
            void 0 !== t && (this.presMap.password = t),
            this.roomjid = Strophe.getBareJidFromJid(e),
            this.sendPresence();
            var n = {
                nickname: config.nickname ? config.nickname: manisConfg.mUserName,
                jid: connection.jid,
                resource: Strophe.getResourceFromJid(connection.jid),
                audio_muted: !1,
                video_muted: !1,
                is_moderator: connection.jid == config.moderatorJid
            };
            window.participants.push(n)
        },
        handleManageIq: function(e) {
            var t = e.getAttribute("from");
            return t.indexOf("admin") > -1 && n.handleManageMsg(e),
            !0
        },
        doLeave: function() {
            console.log("do leave", this.myroomjid);
            var e = $pres({
                to: this.myroomjid,
                type: "unavailable"
            });
            this.presMap.length = 0,
            this.members = {},
            this.list_members = [],
            this.roomjid = null,
            this.connection.send(e)
        },
        onPresence: function(e) {
            var t = e.getAttribute("from"),
            n = e.getAttribute("type");
            if (null != n) return ! 0;
            var r = $(e).find("etherpad");
            r.length && $(document).trigger("etherpadadded.muc", [t, r.text()]);
            var o = $(e).find("prezi");
            if (o.length) {
                var i = o.attr("url"),
                s = o.find(">current").text();
                null == this.preziMap[t] ? (this.preziMap[t] = i, $(document).trigger("presentationadded.muc", [t, i, s])) : $(document).trigger("gotoslide.muc", [t, i, s])
            } else if (null != this.preziMap[t]) {
                var i = this.preziMap[t];
                delete this.preziMap[t],
                $(document).trigger("presentationremoved.muc", [t, i])
            }
            var a = $(e).find("audiomuted");
            a.length && $(document).trigger("audiomuted.muc", [t, a.text()]);
            var c = $(e).find("videomuted");
            c.length && $(document).trigger("videomuted.muc", [t, c.text()]);
            var d = $(e).find("configRole").text();
            if (d.length) {
                if ("CRUO" == d || "CRUA" == d) var u = !0;
                else var u = !1;
                $(document).trigger("moderatored.muc", [t, u])
            }
            if ($(e).find('>x[xmlns="http://jabber.org/protocol/muc#user"]>status[code="201"]').length) {
                this.isOwner = !0;
                var l = $iq({
                    type: "set",
                    to: this.roomjid
                }).c("query", {
                    xmlns: "http://jabber.org/protocol/muc#owner"
                }).c("x", {
                    xmlns: "jabber:x:data",
                    type: "submit"
                });
                this.connection.sendIQ(l)
            }
            var p = {};
            p.show = $(e).find(">show").text(),
            p.status = "";
            var f = $(e).find('>x[xmlns="http://jabber.org/protocol/muc#user"]>item');
            p.affiliation = f.attr("affiliation"),
            p.role = f.attr("role"),
            p.jid = f.attr("jid") ? f.attr("jid") : t,
            p.isFocus = !1,
            p.jid && 0 == p.jid.indexOf(config.focusUserJid + "/") && (p.isFocus = !0);
            var h = $(e).find('nick[xmlns="http://jabber.org/protocol/nick"]');
            p.displayName = h.length > 0 ? h.text() : null,
            1 == config.debug && console.log("receive presence >>>>>>", "\r\n", e, "\r\n", "<<<<<<"),
            t && void 0 === this.members[t] && (this.members[t] = p, this.list_members.push(t), $(document).trigger("entered.muc", [t, p, e])),
            $(document).trigger("presence.muc", [t, p, e]),
            $(document).trigger("presence.status", [e]);
            var m = $(e).find(">refIqStatus");
            if (m.length) {
                var g = m.find(">refIqStatus") || null;
                if (g && g.length) {
                    var _ = g.text() || null;
                    "301" == _ && $(document).trigger("manis.recorder.status.change", [!0, t])
                }
            }
            return ! 0
        },
        onParticipantLeave: function(e) {
            return delete this.members[e],
            this.list_members.splice(this.list_members.indexOf(e), 1),
            !0
        },
        onPresenceUnavailable: function(e) {
            var t = e.getAttribute("from");
            return this.onParticipantLeave(t),
            $(document).trigger("left.muc", [t]),
            !0
        },
        onPresenceError: function(e) {
            var t = e.getAttribute("from");
            if ($(e).find('>error[type="auth"]>not-authorized[xmlns="urn:ietf:params:xml:ns:xmpp-stanzas"]').length) $(document).trigger("passwordrequired.muc", [t]);
            else if ($(e).find('>error[type="cancel"]>not-allowed[xmlns="urn:ietf:params:xml:ns:xmpp-stanzas"]').length) {
                var n = Strophe.getDomainFromJid(e.getAttribute("to"));
                n === config.hosts.anonymousdomain ? $(document).trigger("passwordrequired.main") : console.warn("onPresError ", e)
            } else console.warn("onPresError ", e);
            return ! 0
        },
        sendMessage: function(e, t) {
            var n = $msg({
                to: this.roomjid,
                type: "groupchat"
            });
            n.c("body", e).up(),
            t && n.c("nick", {
                xmlns: "http://jabber.org/protocol/nick"
            }).t(t).up(),
            this.connection.send(n),
            console.log("send message ", e, t)
        },
        setSubject: function(e) {
            var t = $msg({
                to: this.roomjid,
                type: "groupchat"
            });
            t.c("subject", e),
            this.connection.send(t)
        },
        onMessage: function(e) {
            var t = e.getAttribute("from"),
            n = $(e).find('>screen[xmlns="http://jitsi.org/protocol/screen"]');
            if (n.length) {
                var r = $(e).find("property").attr("value");
                return 1 == window.isUsingScreenStream && null != connection.jingle.localScreen && (console.log("sssssssssssssssssssssss222222222222", r), $(document).trigger("manis.been.stop.screen.share")),
                !0
            }
            var o = $(e).find('>nick[xmlns="http://jabber.org/protocol/nick"]').text() || !1,
            i = $(e).find('>nick[xmlns="http://jabber.org/protocol/nick"]').text() || Strophe.getResourceFromJid(t),
            s = $(e).find(">body").text(),
            a = e.getAttribute("type");
            if ("error" == a) return console.log("message error", $(e).find(">text").text(), s),
            !0;
            var c = $(e).find('>body[xmlns="http://igniterealtime.org/protocol/splitScreen"]');
            if (c.length) {
                var d = $(e).find('>delay[xmlns="urn:xmpp:delay"]');
                return d.length || $(document).trigger("manis.display.mode.changed", [s]),
                !0
            }
            var u = $(e).find('>body[xmlns="http://igniterealtime.org/protocol/roomlock"]');
            if (u.length) {
                var l = u.find(">status").text();
                return $(document).trigger("manis.room.lock.status.change", [l]),
                !0
            }
            var p = $(e).find('>body[xmlns="http://igniterealtime.org/protocol/stage"]');
            if (p.length) {
                var f = $(e).find('>resource[xmlns="http://igniterealtime.org/protocol/endpoint"]') ? $(e).find('>resource[xmlns="http://igniterealtime.org/protocol/endpoint"]').text() : s,
                h = $(e).find('>ssrc[xmlns="http://igniterealtime.org/protocol/streamssrc"]') ? $(e).find('>ssrc[xmlns="http://igniterealtime.org/protocol/streamssrc"]').text() : null,
                d = $(e).find('>delay[xmlns="urn:xmpp:delay"]');
                return d.length || $(document).trigger("manis.main.display.changed", [f, h]),
                !0
            }
            var m = $(e).find('>body[xmlns="http://igniterealtime.org/protocol/hardremove"]');
            if (m.length) {
                var h = $(e).find('>ssrc[xmlns="http://igniterealtime.org/protocol/streamssrc"]') ? $(e).find('>ssrc[xmlns="http://igniterealtime.org/protocol/streamssrc"]').text() : null;
                return $(document).trigger("mains.on.stream.removed", ["video", h, !0]),
                !0
            }
            var g = $(e).find(">subject");
            if (g.length) {
                var _ = g.text(); (_ || "" == _) && console.log("Subject is changed to " + _)
            }
            return t.lastIndexOf("admin") != -1 || (s && o && $(document).trigger("onmessage.muc", [t, i, s]), !0)
        },
        handleRecordResultIq: function(e) {
            var t = $(e).attr("from"),
            n = $(e).find('>ref[xmlns="urn:xmpp:rayo:1"]');
            if (n.length) {
                console.log("handle recorder result iq", e, t);
                var r = n.attr("uri") || null;
                "301" == r && $(document).trigger("manis.recorder.status.change", [!0, t])
            }
            return ! 0
        },
        kick: function(e) {
            var t = $iq({
                to: this.roomjid,
                type: "set"
            }).c("query", {
                xmlns: "http://jabber.org/protocol/muc#admin"
            }).c("item", {
                nick: Strophe.getResourceFromJid(e),
                role: "none"
            }).c("reason").t("You have been kicked.").up().up().up();
            this.connection.sendIQ(t,
            function(e) {},
            function(e) {})
        },
        sendPresence: function() {
            if (this.presMap.to) {
                if (this.presMap.password) {
                    var e = $pres({
                        to: this.presMap.to
                    });
                    return e.c("x", {
                        xmlns: "http://jabber.org/protocol/muc"
                    }),
                    e.c("password").t(this.presMap.password).up(),
                    connection.caps && (connection.caps.node = config.clientNode, e.c("c", connection.caps.generateCapsAttrs()).up()),
                    connection.send(e),
                    void(this.presMap.password = null)
                }
                var t = $pres({
                    to: this.presMap.to,
                    from: connection.jid
                });
                if (t.c("x", {
                    xmlns: this.presMap.xns
                }), t.c("user-agent", {
                    xmlns: "http://jitsi.org/jitmeet/user-agent"
                }).t(navigator.userAgent).up(), this.presMap.bridgeIsDown && t.c("bridgeIsDown").up(), this.presMap.configRole && t.c("configRole").t(this.presMap.configRole).up(), this.presMap.email && t.c("email").t(this.presMap.email).up(), this.presMap.userId && t.c("userId").t(this.presMap.userId).up(), this.presMap.avartar && t.c("avartar", {
                    xmlns: "http://jabber.org/protocol/avartar"
                }).t(this.presMap.avartar).up(), this.presMap.displayName && t.c("nick", {
                    xmlns: "http://jabber.org/protocol/nick"
                }).t(this.presMap.displayName).up(), this.presMap.audions && t.c("audiomuted", {
                    xmlns: this.presMap.audions
                }).t(this.presMap.audiomuted).up(), this.presMap.videons && t.c("videomuted", {
                    xmlns: this.presMap.videons
                }).t(this.presMap.videomuted).up(), this.presMap.moderatorns && t.c("isModerator", {
                    xmlns: this.presMap.moderatorns
                }).t(this.presMap.isModerator).up(), this.presMap.masterStreamSSRC && t.c("withMasterStream", {
                    value: this.presMap.withMasterStream
                }).t(this.presMap.masterStreamSSRC).up(), this.presMap.statsns) {
                    var n = t.c("stats", {
                        xmlns: this.presMap.statsns
                    });
                    for (var r in this.presMap.stats) null != this.presMap.stats[r] && n.c("stat", {
                        name: r,
                        value: this.presMap.stats[r]
                    }).up();
                    t.up()
                }
                if (this.presMap.prezins && t.c("prezi", {
                    xmlns: this.presMap.prezins,
                    url: this.presMap.preziurl
                }).c("current").t(this.presMap.prezicurrent).up().up(), this.presMap.etherpadns && t.c("etherpad", {
                    xmlns: this.presMap.etherpadns
                }).t(this.presMap.etherpadname).up(), this.presMap.medians) {
                    t.c("media", {
                        xmlns: this.presMap.medians
                    });
                    var o = 0;
                    if (Object.keys(this.presMap).forEach(function(e) {
                        e.indexOf("source") >= 0 && o++
                    }), o > 0) for (var i = 1; i <= o / 3; i++) t.c("source", {
                        type: this.presMap["source" + i + "_type"],
                        ssrc: this.presMap["source" + i + "_ssrc"],
                        direction: this.presMap["source" + i + "_direction"] || "sendrecv"
                    }).up()
                }
                t.up(),
                1 == config.debug && console.log("send presence <<<<<<<", "\r\n", t.tree(), "\r\n", ">>>>>>>"),
                console.log("send presence at : ", new Date),
                connection.send(t),
                $(document).trigger("presence.status", [t.tree()])
            }
        },
        addDisplayNameToPresence: function(e) {
            this.presMap.displayName = e
        },
        addMediaToPresence: function(e, t, n, r) {
            this.presMap.medians || (this.presMap.medians = "http://estos.de/ns/mjs"),
            this.presMap["source" + e + "_type"] = t,
            this.presMap["source" + e + "_ssrc"] = n,
            this.presMap["source" + e + "_direction"] = r
        },
        clearPresenceMedia: function() {
            var e = this;
            Object.keys(this.presMap).forEach(function(t) {
                t.indexOf("source") != -1 && delete e.presMap[t]
            })
        },
        addPreziToPresence: function(e, t) {
            this.presMap.prezins = "http://jitsi.org/jitmeet/prezi",
            this.presMap.preziurl = e,
            this.presMap.prezicurrent = t
        },
        removePreziFromPresence: function() {
            delete this.presMap.prezins,
            delete this.presMap.preziurl,
            delete this.presMap.prezicurrent
        },
        addCurrentSlideToPresence: function(e) {
            this.presMap.prezicurrent = e
        },
        getPrezi: function(e) {
            return this.preziMap[e]
        },
        addEtherpadToPresence: function(e) {
            this.presMap.etherpadns = "http://jitsi.org/jitmeet/etherpad",
            this.presMap.etherpadname = e
        },
        addAudioInfoToPresence: function(e) {
            this.presMap.audions = "http://jitsi.org/jitmeet/audio",
            this.presMap.audiomuted = e.toString()
        },
        addVideoInfoToPresence: function(e) {
            this.presMap.videons = "http://jitsi.org/jitmeet/video",
            this.presMap.videomuted = e.toString()
        },
        addConnectionInfoToPresence: function(e) {
            this.presMap.statsns = "http://jitsi.org/jitmeet/stats",
            this.presMap.stats = e
        },
        addConfigRoleToPresence: function(e) {
            this.presMap.configRole = e
        },
        findJidFromResource: function(e) {
            if (e && e === Strophe.getResourceFromJid(connection.emuc.myroomjid)) return connection.emuc.myroomjid;
            var t = null;
            return Object.keys(this.members).some(function(n) {
                return t = n,
                Strophe.getResourceFromJid(n) === e
            }),
            t
        },
        addBridgeIsDownToPresence: function() {
            this.presMap.bridgeIsDown = !0
        },
        addEmailToPresence: function(e) {
            this.presMap.email = e
        },
        addIsModeratorToPresence: function(e) {
            this.presMap.moderatorns = "http://jitsi.org/jitmeet/moderator",
            this.presMap.isModerator = e
        },
        addMasterStreamToPresence: function(e, t) {
            this.presMap.withMasterStream = e,
            this.presMap.masterStreamSSRC = t
        },
        addUserIdToPresence: function(e) {
            this.presMap.userId = e
        },
        isModerator: function() {
            return "moderator" === this.role
        },
        addAvartarToPresence: function(e) {
            this.presMap.avartar = e
        }
    })
},
function(e, exports, t) {
    var n = (t(7), t(30)),
    r = {
        onMsg: null,
        onMsgTime: null,
        allMsg: 0,
        audioRetryTimes: 10,
        videoRetryTimes: 10,
        managerSetAudioMuteTry: null,
        managerSetVideoMuteTry: null,
        handleManageMsg: function(e) {
            console.log("handle manage message from administrator: ", e);
            var t = $(e).find('>conferenceCtrl[xmlns="http://jitsi.org/jitmeet/allAudio"]');
            if (t.length) {
                var r = "true" == t.text();
                return this.setAllAudioMute(r),
                !0
            }
            var o = $(e).find('>conferenceCtrl[xmlns="http://jitsi.org/jitmeet/allVideo"]');
            if (o.length) {
                var i = "true" == o.text();
                return this.setAllVideoMute(i),
                !0
            }
            var s = $(e).find('>conferenceCtrl[xmlns="http://jitsi.org/jitmeet/audio"]');
            if (s.length) {
                var a = "true" == s.text();
                return this.managerSetAudioMute(a),
                !0
            }
            var s = $(e).find('>conferenceCtrl[xmlns="http://jitsi.org/jitmeet/video"]');
            if (s.length) {
                var a = "true" == s.text();
                return this.managerSetVideoMute(a),
                !0
            }
            var c = $(e).find('>conferenceCtrl[xmlns="http://jitsi.org/jitmeet/toClose"]');
            if (c.length) {
                var d = c.attr("time-left") || 0;
                return $(document).trigger("manis.on.room.countdown", [d]),
                !0
            }
            var u = $(e).find('>conferenceCtrl[xmlns="http://jitsi.org/jitmeet/lostModerator"]');
            if (u.length) {
                var l = "true" == u.text(),
                d = u.attr("time-left") || null;
                return $(document).trigger("manis.on.with.moderator.changed", [!l, d]),
                !0
            }
            var p = $(e).find('>conferenceCtrl[xmlns="http://jitsi.org/jitmeet/lock"]');
            if (p.length) {
                if (n.isAdmin()) {
                    var f = "true" == p.text();
                    this.manageLockRoom(f)
                }
                return ! 0
            }
            var h = $(e).find('>conferenceCtrl[xmlns="http://jitsi.org/jitmeet/groupChat"]');
            if (h.length) return textContent = h.text() || "",
            this.onManagementMsg(textContent, null),
            !0;
            var m = $(e).find('>conferenceCtrl[xmlns="http://jitsi.org/jitmeet/privateChat"]');
            return ! m.length || (textContent = m.text() || "", this.onManagementMsg(textContent, null), !0)
        },
        onManagementMsg: function(e, t) {
            this.textMsgFromManager(e, t)
        },
        textMsgFromManager: function(e, t) {
            var n = window.localStorage.getItem("defaultLanguage") || "zh";
            if ("en" == n) var r = "Manager";
            else var r = "会控管理员";
            return $(document).trigger("onmessage.muc", [config.focusUserJid, t ? t: r, e]),
            !0
        },
        setAllAudioMute: function(e) {
            return ! ("CRUA" != config.role && "CRUO" != config.role || !e) || void this.managerSetAudioMute(e)
        },
        setAllVideoMute: function(e) {
            return ! ("CRUA" != config.role && "CRUO" != config.role || !e) || void this.managerSetVideoMute(e)
        },
        manageLockRoom: function(e) {
            if (e == window.lock) return console.log("now room is : ", e, "do nothing"),
            !0;
            try {
                var t = manisConfg.mUserId,
                n = roomName.split("@")[0];
                $.ajax({
                    url: window.serverPath + "/conference/lock?i=" + t + "&r=" + n + "&l=" + e,
                    dataType: "jsonp",
                    processData: !1,
                    type: "get",
                    success: function(t) {
                        200 == t.code && (window.lock = e, console.info("lock or unlock room by management success, now room lock status : ", e), $(document).trigger("manis.room.lock.status.change", [e]))
                    }
                })
            } catch(t) {
                console.error("lock or unlock room by management failed, now room lock status : ", !e)
            }
        },
        hangup: function() {
            $(document).trigger("manis.management.kill", [!0])
        },
        managerSetAudioMute: function(e) {
            return window.participants.length < 2 ? (console.warn("other participant not join yet"), this.audioRetryTimes > 0 && (this.managerSetAudioMuteTry = setTimeout(function() {
                clearTimeout(r.managerSetAudioMuteTry),
                r.audioRetryTimes--,
                r.managerSetAudioMute(e)
            },
            2e3)), !0) : (this.audioRetryTimes = 0, n.setAudioMute(e,
            function() {
                window.forceMuted = e,
                $(document).trigger("onmute.audio.muc", [e]),
                $(document).trigger("audiomuted.muc", [connection.jid, e.toString()])
            },
            function(e) {
                console.error("managerSetAudioMute ----------", e)
            }), !0)
        },
        managerSetVideoMute: function(e) {
            return window.participants.length < 2 ? (console.warn("other participant not join yet"), this.videoRetryTimes > 0 && (this.managerSetVideoMuteTry = setTimeout(function() {
                clearTimeout(r.managerSetVideoMuteTry),
                r.videoRetryTimes--,
                r.managerSetVideoMute(e)
            },
            2e3)), !0) : (this.videoRetryTimes = 0, void n.setVideoMute(e,
            function() {
                $(document).trigger("videomuted.muc", [connection.jid, e]),
                $(document).trigger("onmute.video.muc", [e])
            },
            function(e) {
                console.error("manage set video mute switch failed ", e)
            }))
        }
    };
    e.exports = r
},
function(e, exports, t) {
    function n() {
        r(),
        config.enableRtpStats && (statsCollector = new y(o().peerconnection, 200, i, 2e3, v.updateLocalStats), statsCollector.start())
    }
    function r() {
        statsCollector && (statsCollector.stop(), statsCollector = null, v.stopSendingStats())
    }
    function o() {
        return activecall
    }
    function i(e, t) {
        var n;
        e === w.LOCAL_JID ? (n = b.LOCAL_LEVEL, s() && (t = 0)) : n = Strophe.getResourceFromJid(e),
        b.updateAudioLevel(n, t)
    }
    function s() {
        for (var e = connection.jingle.localAudio,
        t = 0; t < e.getAudioTracks().length; t++) if (e.getAudioTracks()[t].enabled === !0) return ! 1;
        return ! 0
    }
    function a(e) {
        var t = o();
        t && t.peerconnection && (connection.jingle.localAudio && t.peerconnection.removeStream(connection.jingle.localAudio, e), connection.jingle.localVideo && t.peerconnection.removeStream(connection.jingle.localVideo, e), connection.jingle.localScreen && (t.peerconnection.removeStream(connection.jingle.localScreen, e), connection.jingle.localScreen = null, window.localSSRCS = []), t.peerconnection.close()),
        r(),
        e && c(),
        connection.ofmuc.appDestory(),
        activecall = null
    }
    function c() {
        localStatsCollector && (localStatsCollector.stop(), localStatsCollector = null)
    }
    function d(e, t, n, r) {
        var i = o();
        if (!i) return void n({
            code: C.code_404,
            msg: C.room_unopend
        });
        var s = connection.jingle.localVideo;
        i.switchStreams(e, s, t)
    }
    function u(e, t) {
        var n = o();
        return n ? void n.addScreen(e, t) : void t({
            code: C.code_404,
            msg: C.room_unopend,
            errorCode: x.conference_room_un_open
        })
    }
    function l(e) {
        var t = o();
        if (!t) return void e({
            code: C.code_404,
            msg: C.room_unopend,
            errorCode: x.conference_room_un_open
        });
        var n = connection.jingle.localScreen;
        t.removeScreen(n, e)
    }
    function p(e, t, n) {
        var r = connection.jingle.localVideo;
        if (this.currentTargetResolution == e && this.currentTargetVideoInput == t && r.getVideoTracks().length) return 1 == config.debug && console.log("resolution and video input device is not changed, maybe video stop, reset again"),
        !1;
        var i = m(!1, !0, null, t, e);
        console.log("new resolution constraints : ", i);
        const s = {
            width: i.video.width,
            height: i.video.height
        };
        var a = this;
        if (r && s) {
            const c = r.getVideoTracks()[0];
            if (void 0 == c.applyConstraints) throw console.error("ApplyConstraints undefined error "),
            Error("ApplyConstraints undefined error ");
            c.applyConstraints(s).then(function(s) {
                var c = {
                    videoInput: t,
                    resolution: e,
                    replace: !1
                };
                c.stream = r,
                config.currentResolution = e,
                a.currentTargetResolution = e,
                a.currentTargetVideoInput = t;
                var d = o();
                d && d.peerconnectionNegotiate(function() {
                    console.log("Change bandwidth on the fly complete")
                }),
                n({
                    code: C.code_200,
                    msg: C.change_video_resolution_complete,
                    response: c,
                    errorCode: x.no_error
                }),
                console.log("mediaStream apply contraints complete", i)
            }).
            catch(function(r) {
                if (console.info("mediaStream apply contraints failed : ", r), !r.name.match(/OverconstrainedError/) && !r.constructor.name.match(/OverconstrainedError/)) throw console.error("Other error : ", r),
                Error("Other error ");
                if (! (parseInt(e) > 180)) throw console.error("Over lest constrained error", r),
                Error("Over lest constrained error");
                return 1080 == i.video.height.exact ? void p("720", t, n) : 720 == i.video.height.exact ? void p("768", t, n) : 768 == i.video.height.exact ? void p("540", t, n) : 540 == i.video.height.exact ? void p("480", t, n) : 480 == i.video.height.exact ? void p("240", t, n) : 240 == i.video.height.exact ? void p("180", t, n) : void 0
            })
        }
    }
    function f(e, t, n, r) {
        var i = connection.jingle.localVideo;
        if (this.currentTargetResolution == e && this.currentTargetVideoInput == t && i.getVideoTracks().length) return 1 == config.debug && console.log("resolution and video input device is not changed, maybe video stop, reset again"),
        !1;
        r !== !0 && (this.currentTargetResolution = e, this.currentTargetVideoInput = t);
        var s = o();
        i.getVideoTracks().length && i.getVideoTracks().forEach(function(e) {
            1 == config.debug && console.log("-------------------------  remove video track : ", e),
            e.stop()
        });
        var a = m(!1, !0, null, t, e);
        1 == config.debug && console.log("============== will get new stream by new resolution : ", a),
        S.getMedia(a,
        function(r) {
            config.currentResolution = e;
            var o = {
                videoInput: t,
                resolution: e,
                replace: !0
            };
            if (r.ssrc = window.localStreamSSRC, "p2p" == window.connectType) T.switchStream(i, r, n, o);
            else {
                if (o.resource = Strophe.getResourceFromJid(connection.jid), o.stream = r, !s && "p2p" != window.connectType) return connection.jingle.localVideo = r,
                void n({
                    code: C.code_200,
                    msg: C.change_video_resolution_complete,
                    response: o,
                    errorCode: x.no_error
                });
                0 == s.peerconnection.negotiationInprogress ? s.replaceMediaTrack(r, i,
                function() {
                    o.stream.ssrc != window.localStreamSSRC && (o.stream.ssrc = window.localStreamSSRC),
                    n({
                        code: C.code_200,
                        msg: C.change_video_resolution_complete,
                        response: o,
                        errorCode: x.no_error
                    })
                }) : setTimeout(function() {
                    f(e, t, n)
                },
                1e3)
            }
        },
        function(e) {
            if ("DevicesNotFoundError" == e.name || "DevicesNotFoundError" == e.constructor.name || "NotFoundError" == e.name || "NotFoundError" == e.constructor.name) return void n({
                code: C.code_404,
                msg: C.without_usefull_video_device,
                errorCode: x.media_device_except
            });
            if (("OverconstrainedError" == e.name || "OverconstrainedError" == e.constructor.name) && (a.video.width.exact > 320 || a.video.height.exact > 180)) {
                if (1080 == a.video.height.exact) return void f("720", t, n);
                if (720 == a.video.height.exact) return void f("768", t, n);
                if (768 == a.video.height.exact) return void f("540", t, n);
                if (540 == a.video.height.exact) return void f("480", t, n);
                if (480 == a.video.height.exact) return void f("240", t, n);
                if (240 == a.video.height.exact) return void f("180", t, n)
            }
            n({
                code: C.code_402,
                msg: C.unsupport_resolution,
                errorCode: x.media_device_resolution_nonsupport
            })
        })
    }
    function h(e, t) {
        var n = o(),
        r = connection.jingle.localVideo;
        r.getAudioTracks().length && r.getAudioTracks().forEach(function(e) {
            1 == config.debug && console.log("-------------------------  remove audio track : ", e),
            e.stop()
        });
        var i = m(!0, !1, e, null, null);
        S.getMedia(i,
        function(o) {
            return n ? 0 != n.peerconnection.negotiationInprogress ? void setTimeout(function() {
                h(e, t)
            },
            1e3) : void n.replaceMediaTrack(o, r,
            function() {
                t({
                    code: C.code_200,
                    msg: C.audio_input_change_completed,
                    response: {
                        activeAudioInput: e
                    },
                    errorCode: x.no_error
                })
            },
            "audio") : (connection.jingle.localAudio = o, void t({
                code: C.code_200,
                msg: C.audio_input_change_completed,
                errorCode: x.no_error
            }))
        },
        function(e) {
            t({
                code: C.code_400,
                msg: C.audio_input_change_failed,
                error: e,
                errorCode: x.change_audio_input_device_failed
            })
        })
    }
    function m(e, t, n, r, o) {
        var i = {
            audio: !!e && {},
            video: !!t && {}
        };
        if (e === !0 && (i.audio.deviceId = n ? {
            exact: n
        }: void 0), t === !0 && (i.video.deviceId = r ? {
            exact: r
        }: void 0), t === !0 && o) switch (o.toString()) {
        case "1080":
            i.video.width = {
                exact: 1920
            },
            i.video.height = {
                exact: 1080
            },
            config.videoBandwidth = 4096 == config.videoBandwidth ? config.videoBandwidth: 2048;
            break;
        case "720":
            i.video.width = {
                exact: 1280
            },
            i.video.height = {
                exact: 720
            },
            config.videoBandwidth = 2048 == config.videoBandwidth ? config.videoBandwidth: 1024;
            break;
        case "768":
            i.video.width = {
                exact: 1024
            },
            i.video.height = {
                exact: 768
            },
            config.videoBandwidth = 2048 == config.videoBandwidth ? config.videoBandwidth: 1024;
            break;
        case "540":
            i.video.width = {
                exact: 960
            },
            i.video.height = {
                exact: 540
            },
            config.videoBandwidth = 1024 == config.videoBandwidth ? config.videoBandwidth: 512;
            break;
        case "480":
            i.video.width = {
                exact: 640
            },
            i.video.height = {
                exact: 480
            },
            config.videoBandwidth = 1024 == config.videoBandwidth ? config.videoBandwidth: 512;
            break;
        case "240":
            i.video.width = {
                exact: 320
            },
            i.video.height = {
                exact: 240
            },
            config.videoBandwidth = 512 == config.videoBandwidth ? config.videoBandwidth: 256;
            break;
        case "180":
            i.video.width = {
                exact: 320
            },
            i.video.height = {
                exact: 180
            },
            config.videoBandwidth = 512 == config.videoBandwidth ? config.videoBandwidth: 256;
            break;
        default:
            i.video.width = {
                exact: 320
            },
            i.video.height = {
                exact: 180
            },
            config.videoBandwidth = 512 == config.videoBandwidth ? config.videoBandwidth: 256
        }
        return i
    }
    function g(e, t) {
        var n = [],
        r = [],
        o = [],
        i = [],
        s = [];
        navigator.mediaDevices.enumerateDevices().then(function(a) {
            for (var c = 0; c !== a.length; ++c) {
                var d = a[c],
                u = {
                    value: d.deviceId
                };
                "audioinput" === d.kind ? RTC.isSafari() && d.label && d.label.match("输出") ? (u.label = d.label || "speaker " + (r.length + 1), r.push(u)) : (u.label = d.label || "microphone " + (n.length + 1), n.push(u)) : "audiooutput" === d.kind ? (u.label = d.label || "speaker " + (r.length + 1), r.push(u)) : "videoinput" === d.kind ? (u.label = d.label || "camera " + (o.length + 1), o.push(u)) : (u.label = d.label || "Some other kind of source/device: ", i.push(u))
            }
            if (s = {
                audioInputDevices: r,
                audioOutputDevices: r,
                videoInputDevices: o,
                otherDevices: i
            },
            "audioinput" == e) var l = n;
            else if ("audiooutput" == e) var l = r;
            else if ("videoinput" == e) var l = o;
            else var l = s;
            t({
                code: C.code_200,
                msg: C.find_devices,
                response: l,
                errorCode: x.no_error
            })
        }).
        catch(function() {
            t({
                code: C.code_404,
                msg: C.unfind_devices,
                errorCode: x.media_device_except
            })
        })
    }
    function _(e) {
        if (activecall && activecall.peerconnection) {
            var t = activecall.peerconnection.channel;
            if (t) {
                var n = {
                    colibriClass: "AttendMessageEvent",
                    type: "sendonly"
                },
                r = JSON.stringify(n);
                try {
                    console.log("will send sendonly channel msg: ", r),
                    t.send(r),
                    e({
                        code: C.code_200,
                        msg: C.message_send_complete
                    })
                } catch(t) {
                    console.error("send channel msg failed: ", t),
                    e({
                        code: C.code_400,
                        msg: C.send_inviste_failed
                    })
                }
            } else e({
                code: C.code_400,
                msg: C.send_inviste_failed
            })
        }
    }
    var v = t(8),
    y = t(9),
    w = t(10),
    b = t(11),
    S = t(12),
    C = t(26),
    x = t(27),
    T = t(28);
    e.exports = {
        currentTargetResolution: null,
        currentTargetVideoInput: null,
        getDevices: g,
        modifyLocalVideoStream: f,
        modifyLocalAudioStream: h,
        removeScreenSourceFromConnection: l,
        addScreenSourceToConnection: u,
        modifyScreenStream: d,
        disposeConference: a,
        isAudioMuted: s,
        startRtpStatsCollector: n,
        stopRTPStatsCollector: r,
        changeResolutionByApplyConstraints: p,
        sendOnlyChannelMsg: _
    }
},
function(e, exports) {
    var t = function() {
        function e() {}
        function t() {
            n(),
            a = setInterval(n, 1e4)
        }
        function n() {
            connection.emuc.addConnectionInfoToPresence(r(i)),
            connection.emuc.sendPresence()
        }
        function r(e) {
            return {
                bitrate_download: e.bitrate && e.bitrate.download ? e.bitrate.download: 0,
                bitrate_upload: e.bitrate && e.bitrate.upload ? e.bitrate.upload: 0,
                packetLoss_total: e.packetLoss && e.packetLoss.total ? e.packetLoss.total: 0,
                packetLoss_download: e.packetLoss && e.packetLoss.download ? e.packetLoss.download: 0,
                packetLoss_upload: e.packetLoss && e.packetLoss.upload ? e.packetLoss.upload: 0
            }
        }
        function o(e) {
            return {
                bitrate: {
                    download: e.bitrate_download,
                    upload: e.bitrate_upload
                },
                packetLoss: {
                    total: e.packetLoss_total,
                    download: e.packetLoss_download,
                    upload: e.packetLoss_upload
                }
            }
        }
        var i = {},
        s = {},
        a = null;
        return e.updateLocalStats = function(e) {
            i = e,
            null == a && t()
        },
        e.updateRemoteStats = function(e, t, n) {
            if (null != t && null != t.packetLoss_total) {
                s[e] = o(t);
                var r = Strophe.getResourceFromJid(e),
                i = "NaN";
                if (null != document.querySelector("#upload_package_lost_" + r) && (document.querySelector("#upload_package_lost_" + r).innerHTML = t.packetLoss_upload + "%", document.querySelector("#download_package_lost_" + r).innerHTML = t.packetLoss_download + "%", document.querySelector("#upload_bitrate_" + r).innerHTML = t.bitrate_upload + " Kbps", document.querySelector("#download_bitrate_" + r).innerHTML = t.bitrate_download + " Kbps"), document.querySelectorAll(".upload_package_lost_" + r).length) for (var a = document.querySelectorAll(".upload_package_lost_" + r), c = 0; c < a.length; c++) a[c].innerHTML = t.packetLoss_upload + "%";
                if (document.querySelectorAll(".download_package_lost_" + r).length) for (var a = document.querySelectorAll(".download_package_lost_" + r), c = 0; c < a.length; c++) a[c].innerHTML = t.packetLoss_download + "%";
                if (document.querySelectorAll(".upload_bitrate_" + r).length) for (var a = document.querySelectorAll(".upload_bitrate_" + r), c = 0; c < a.length; c++) a[c].innerHTML = t.bitrate_upload + " Kbps";
                if (document.querySelectorAll(".download_bitrate_" + r).length) for (var a = document.querySelectorAll(".download_bitrate_" + r), c = 0; c < a.length; c++) a[c].innerHTML = t.bitrate_download + " Kbps";
                if (null != n) {
                    var d = ssrc2resolution[n];
                    if (void 0 != d && (i = d.width + " X " + d.height, null != document.querySelector("#resolution_" + r) && (document.querySelector("#resolution_" + r).innerHTML = i), document.querySelectorAll(".resolution_" + r).length)) for (var a = document.querySelectorAll(".resolution_" + r), c = 0; c < a.length; c++) a[c].innerHTML = i
                }
                for (var c = 0; c < window.participants.length; c++) {
                    var u = window.participants[c];
                    u.resource == r && (u.resolution = i, u.parket_loss_upload = t.packetLoss_upload + "%", u.packet_loss_download = t.packetLoss_download + "%", u.bitrate_upload = t.bitrate_upload + " Kbps", u.bitrate_download = t.bitrate_download + " Kbps")
                }
            }
        },
        e.stopSendingStats = function() {
            clearInterval(a),
            a = null
        },
        e.getStats = function() {
            return i
        },
        e
    } ();
    exports = e.exports = t
},
function(e, exports) {
    function t(e, t) {
        return ! t || t <= 0 || !e || e <= 0 ? 0 : Math.round(e / t * 100)
    }
    function n() {
        this.ssrc2Loss = {},
        this.ssrc2AudioLevel = {},
        this.ssrc2bitrate = {},
        this.ssrc2resolution = {}
    }
    function r(e, t, n, r, o) {
        this.peerconnection = e,
        this.baselineAudioLevelsReport = null,
        this.currentAudioLevelsReport = null,
        this.currentStatsReport = null,
        this.baselineStatsReport = null,
        this.audioLevelsIntervalId = null,
        this.GATHER_INTERVAL = 1e4,
        this.LOG_INTERVAL = 6e4,
        this.gatherStatsIntervalId = null,
        this.logStatsIntervalId = null,
        this.statsToBeLogged = {
            timestamps: [],
            stats: {}
        },
        this.audioLevelsIntervalMilis = t,
        this.statsIntervalId = null,
        this.statsIntervalMilis = r,
        this.jid2stats = {},
        this.audioLevelsUpdateCallback = n,
        this.statsUpdateCallback = o
    }
    function o(e, t) {
        if (!i[RTC.browser][t]) throw "The property isn't supported!";
        var n = i[RTC.browser][t];
        return "chrome" == RTC.browser ? e.stat(n) : e[n]
    }
    n.bandwidth = {},
    n.bitrate = {},
    n.packetLoss = null,
    n.prototype.setSsrcLoss = function(e, t) {
        this.ssrc2Loss[e] = t
    },
    n.prototype.setSsrcResolution = function(e, t) {
        null === t && this.ssrc2resolution[e] ? delete this.ssrc2resolution[e] : null !== t && (window.ssrc2resolution[e] = this.ssrc2resolution[e] = t)
    },
    n.prototype.setSsrcBitrate = function(e, t) {
        this.ssrc2bitrate[e] ? (this.ssrc2bitrate[e].download += t.download, this.ssrc2bitrate[e].upload += t.upload) : this.ssrc2bitrate[e] = t
    },
    n.prototype.setSsrcAudioLevel = function(e, t) {
        this.ssrc2AudioLevel[e] = Math.min(Math.max(t, 0), 1)
    },
    n.transport = [],
    r.prototype.stop = function() {
        this.audioLevelsIntervalId && (clearInterval(this.audioLevelsIntervalId), this.audioLevelsIntervalId = null, clearInterval(this.statsIntervalId), this.statsIntervalId = null, clearInterval(this.logStatsIntervalId), this.logStatsIntervalId = null, clearInterval(this.gatherStatsIntervalId), this.gatherStatsIntervalId = null)
    },
    r.prototype.errorCallback = function(e) {
        console.error("Get stats error", e),
        this.stop()
    },
    r.prototype.start = function() {
        var e = this;
        this.audioLevelsIntervalId = setInterval(function() {
            e.peerconnection.getStats(function(t) {
                var n = null;
                n = t && t.result && "function" == typeof t.result ? t.result() : t,
                RTC.isSafari() ? (e.currentAudioLevelsReport = [], n.forEach(function(t) {
                    e.currentAudioLevelsReport.push(t)
                })) : e.currentAudioLevelsReport = n,
                e.processAudioLevelReport(),
                e.baselineAudioLevelsReport = e.currentAudioLevelsReport
            },
            e.errorCallback)
        },
        e.audioLevelsIntervalMilis),
        this.statsIntervalId = setInterval(function() {
            e.peerconnection.getStats(function(t) {
                var n = null;
                n = t && t.result && "function" == typeof t.result ? t.result() : t,
                RTC.isSafari() ? (e.currentStatsReport = [], n.forEach(function(t) {
                    e.currentStatsReport.push(t)
                })) : e.currentStatsReport = n;
                try {
                    e.processStatsReport()
                } catch(e) {
                    console.error("Unsupported key:" + e)
                }
                e.baselineStatsReport = e.currentStatsReport
            },
            e.errorCallback)
        },
        e.statsIntervalMilis),
        config.logStats && (this.gatherStatsIntervalId = setInterval(function() {
            e.peerconnection.getStats(function(t) {
                e.addStatsToBeLogged(t.result())
            },
            function() {})
        },
        this.GATHER_INTERVAL), this.logStatsIntervalId = setInterval(function() {
            e.logStats()
        },
        this.LOG_INTERVAL))
    },
    r.prototype.addStatsToBeLogged = function(e) {
        var t = this,
        n = this.statsToBeLogged.timestamps.length;
        this.statsToBeLogged.timestamps.push((new Date).getTime()),
        e.map(function(e) {
            var r = t.statsToBeLogged.stats[e.id];
            r || (r = t.statsToBeLogged.stats[e.id] = {}),
            r.type = e.type,
            e.names().map(function(t) {
                var o = r[t];
                for (o || (o = r[t] = []); o.length < n;) o.push(null);
                o.push(e.stat(t))
            })
        })
    },
    r.prototype.logStats = function() {
        if (window.focusJid) {
            var e = !0,
            t = JSON.stringify(this.statsToBeLogged);
            e && (t = String.fromCharCode.apply(null, Pako.deflateRaw(t))),
            t = Base64.encode(t);
            var n = $msg({
                to: window.focusJid,
                type: "normal"
            });
            n.c("log", {
                xmlns: "urn:xmpp:eventlog",
                id: "PeerConnectionStats"
            }),
            n.c("message").t(t).up(),
            e && n.c("tag", {
                name: "deflated",
                value: "true"
            }).up(),
            n.up(),
            connection.send(n),
            this.statsToBeLogged.stats = {},
            this.statsToBeLogged.timestamps = []
        }
    };
    var i = {
        firefox: {
            ssrc: "ssrc",
            packetsReceived: "packetsReceived",
            packetsLost: "packetsLost",
            packetsSent: "packetsSent",
            bytesReceived: "bytesReceived",
            bytesSent: "bytesSent"
        },
        safari: {
            ssrc: "ssrc",
            packetsReceived: "packetsReceived",
            packetsSent: "packetsSent",
            packetsLost: "packetsLost",
            bytesReceived: "bytesReceived",
            bytesSent: "bytesSent",
            frameHeight: "frameHeight",
            frameWidth: "frameWidth"
        },
        chrome: {
            receiveBandwidth: "googAvailableReceiveBandwidth",
            sendBandwidth: "googAvailableSendBandwidth",
            remoteAddress: "googRemoteAddress",
            transportType: "googTransportType",
            localAddress: "googLocalAddress",
            activeConnection: "googActiveConnection",
            ssrc: "ssrc",
            packetsReceived: "packetsReceived",
            packetsSent: "packetsSent",
            packetsLost: "packetsLost",
            bytesReceived: "bytesReceived",
            bytesSent: "bytesSent",
            googFrameHeightReceived: "googFrameHeightReceived",
            googFrameWidthReceived: "googFrameWidthReceived",
            googFrameHeightSent: "googFrameHeightSent",
            googFrameWidthSent: "googFrameWidthSent",
            audioInputLevel: "audioInputLevel",
            audioOutputLevel: "audioOutputLevel"
        },
        opera: {
            receiveBandwidth: "googAvailableReceiveBandwidth",
            sendBandwidth: "googAvailableSendBandwidth",
            remoteAddress: "googRemoteAddress",
            transportType: "googTransportType",
            localAddress: "googLocalAddress",
            activeConnection: "googActiveConnection",
            ssrc: "ssrc",
            packetsReceived: "packetsReceived",
            packetsSent: "packetsSent",
            packetsLost: "packetsLost",
            bytesReceived: "bytesReceived",
            bytesSent: "bytesSent",
            googFrameHeightReceived: "googFrameHeightReceived",
            googFrameWidthReceived: "googFrameWidthReceived",
            googFrameHeightSent: "googFrameHeightSent",
            googFrameWidthSent: "googFrameWidthSent",
            audioInputLevel: "audioInputLevel",
            audioOutputLevel: "audioOutputLevel"
        }
    };
    r.prototype.processStatsReport = function() {
        if (this.baselineStatsReport) {
            for (var e in this.currentStatsReport) {
                var r = this.currentStatsReport[e];
                try { (o(r, "receiveBandwidth") || o(r, "sendBandwidth")) && (n.bandwidth = {
                        download: Math.round(o(r, "receiveBandwidth") / 1e3),
                        upload: Math.round(o(r, "sendBandwidth") / 1e3)
                    })
                } catch(e) {}
                if ("googCandidatePair" != r.type) {
                    if (RTC.isSafari() && "candidate-pair" == r.type) {
                        if ("succeeded" == r.state) continue;
                        var i = this.currentStatsReport[r.localCandidateId],
                        s = this.currentStatsReport[r.remoteCandidateId]
                    }
                    if ("candidatepair" == r.type) {
                        if ("succeeded" == r.state) continue;
                        var i = this.currentStatsReport[r.localCandidateId],
                        s = this.currentStatsReport[r.remoteCandidateId];
                        n.transport.push({
                            localip: i.ipAddress + ":" + i.portNumber,
                            ip: s.ipAddress + ":" + s.portNumber,
                            type: i.transport
                        })
                    }
                    if ("ssrc" == r.type || "outboundrtp" == r.type || "inboundrtp" == r.type || "track" == r.type || "outbound-rtp" == r.type || "inbound-rtp" == r.type) { ! RTC.isSafari() || "inbound-rtp" != r.type && "track" != r.type || (r.ssrc = r.id.match(/_([\d.]+)$/)[1]);
                        var a = this.baselineStatsReport[e];
                        if (a) {
                            var c = o(r, "ssrc");
                            if (c) {
                                var d = ssrc2jid[c];
                                if (d) {
                                    var u = this.jid2stats[d];
                                    u || (u = new n, this.jid2stats[d] = u);
                                    var l = !0,
                                    p = "packetsReceived";
                                    if (RTC.isSafari() && "track" == r.type);
                                    else if (!o(r, p) && (l = !1, p = "packetsSent", !o(r, p))) {
                                        console.warn("No packetsReceived nor packetSent stat found");
                                        continue
                                    }
                                    var f = o(r, p); (!f || f < 0) && (f = 0);
                                    var h = o(a, p); (!h || h < 0) && (h = 0);
                                    var m = f - h; (!m || m < 0) && (m = 0);
                                    var g = o(r, "packetsLost"); (!g || g < 0) && (g = 0);
                                    var _ = o(a, "packetsLost"); (!_ || _ < 0) && (_ = 0);
                                    var v = g - _; (!v || v < 0) && (v = 0);
                                    var y = m + v;
                                    u.setSsrcLoss(c, {
                                        packetsTotal: y,
                                        packetsLost: v,
                                        isDownloadStream: l
                                    });
                                    var w = 0,
                                    b = 0;
                                    o(r, "bytesReceived") && (w = o(r, "bytesReceived") - o(a, "bytesReceived")),
                                    o(r, "bytesSent") && (b = o(r, "bytesSent") - o(a, "bytesSent"));
                                    var S = r.timestamp - a.timestamp;
                                    w = w <= 0 || S <= 0 ? 0 : Math.round(8 * w * 1e3 / S / 1024),
                                    b = b <= 0 || S <= 0 ? 0 : Math.round(8 * b * 1e3 / S / 1024),
                                    u.setSsrcBitrate(c, {
                                        download: w,
                                        upload: b
                                    });
                                    var C = {
                                        height: null,
                                        width: null
                                    };
                                    try {
                                        RTC.isSafari() ? (C.height = o(r, "frameHeight"), C.width = o(r, "frameWidth"), C.height || localStreamSSRC != c || (C = {
                                            height: constraints.video.height.exact,
                                            width: constraints.video.width.exact
                                        })) : o(r, "googFrameHeightReceived") && o(r, "googFrameWidthReceived") ? (C.height = o(r, "googFrameHeightReceived"), C.width = o(r, "googFrameWidthReceived")) : o(r, "googFrameHeightSent") && o(r, "googFrameWidthSent") && (C.height = o(r, "googFrameHeightSent"), C.width = o(r, "googFrameWidthSent"))
                                    } catch(e) {}
                                    C.height && C.width ? u.setSsrcResolution(c, C) : u.setSsrcResolution(c, null)
                                }
                            }
                        } else console.warn(o(r, "ssrc") + " not enough data")
                    }
                } else {
                    var x, T, k, R;
                    try {
                        x = o(r, "remoteAddress"),
                        T = o(r, "transportType"),
                        k = o(r, "localAddress"),
                        R = o(r, "activeConnection")
                    } catch(e) {}
                    if (!x || !T || !k || "true" != R) continue;
                    for (var A = !1,
                    j = 0; j < n.transport.length; j++) n.transport[j].ip == x && n.transport[j].type == T && n.transport[j].localip == k && (A = !0);
                    if (A) continue;
                    n.transport.push({
                        localip: k,
                        ip: x,
                        type: T
                    })
                }
            }
            var E = this,
            M = {
                download: 0,
                upload: 0
            },
            I = {
                download: 0,
                upload: 0
            },
            P = 0,
            O = 0,
            D = {};
            Object.keys(this.jid2stats).forEach(function(e) {
                Object.keys(E.jid2stats[e].ssrc2Loss).forEach(function(t) {
                    var n = "upload";
                    E.jid2stats[e].ssrc2Loss[t].isDownloadStream && (n = "download"),
                    M[n] += E.jid2stats[e].ssrc2Loss[t].packetsTotal,
                    I[n] += E.jid2stats[e].ssrc2Loss[t].packetsLost
                }),
                Object.keys(E.jid2stats[e].ssrc2bitrate).forEach(function(t) {
                    P += E.jid2stats[e].ssrc2bitrate[t].download,
                    O += E.jid2stats[e].ssrc2bitrate[t].upload,
                    delete E.jid2stats[e].ssrc2bitrate[t]
                }),
                D[e] = E.jid2stats[e].ssrc2resolution
            }),
            n.bitrate = {
                upload: O,
                download: P
            },
            n.packetLoss = {
                total: t(I.download + I.upload, M.download + M.upload),
                download: t(I.download, M.download),
                upload: t(I.upload, M.upload)
            },
            this.statsUpdateCallback({
                bitrate: n.bitrate,
                packetLoss: n.packetLoss,
                bandwidth: n.bandwidth,
                resolution: D,
                transport: n.transport
            }),
            n.transport = []
        }
    },
    r.prototype.processAudioLevelReport = function() {
        if (this.baselineAudioLevelsReport) for (var e in this.currentAudioLevelsReport) {
            var t = this.currentAudioLevelsReport[e];
            if ("ssrc" == t.type) {
                var r = this.baselineAudioLevelsReport[e];
                if (r) {
                    var i = o(t, "ssrc"),
                    s = ssrc2jid[i];
                    if (s) {
                        var a = this.jid2stats[s];
                        a || (a = new n, this.jid2stats[s] = a);
                        var c = null;
                        try {
                            c = o(t, "audioInputLevel"),
                            c || (c = o(t, "audioOutputLevel"))
                        } catch(e) {
                            return console.warn("Audio Levels are not available in the statistics."),
                            void clearInterval(this.audioLevelsIntervalId)
                        }
                        c && (c /= 32767, a.setSsrcAudioLevel(i, c), s != connection.emuc.myroomjid && this.audioLevelsUpdateCallback(s, c))
                    }
                }
            }
        }
    },
    exports = e.exports = r
},
function(e, exports) { (function() {
        function e(e, t, n) {
            window.AudioContext = window.AudioContext || window.webkitAudioContext,
            this.stream = e,
            this.intervalId = null,
            this.intervalMilis = t,
            this.audioLevelsUpdateCallback = n,
            this.audioLevel = 0
        }
        function t(e, t) {
            var n = 0,
            r = t - e;
            return n = r > .2 ? t - .2 : r < -.4 ? t + .4 : e,
            parseFloat(n.toFixed(3))
        }
        var n = 2048,
        r = .8;
        e.prototype.start = function() {
            if (window.AudioContext) {
                var i = new AudioContext,
                s = i.createAnalyser();
                s.smoothingTimeConstant = r,
                s.fftSize = n;
                var a = i.createMediaStreamSource(this.stream);
                a.connect(s);
                var c = this;
                this.intervalId = setInterval(function() {
                    var n = new Uint8Array(s.frequencyBinCount);
                    s.getByteTimeDomainData(n);
                    var r = o(n);
                    r != c.audioLevel && (c.audioLevel = t(r, c.audioLevel), c.audioLevelsUpdateCallback(e.LOCAL_JID, c.audioLevel))
                },
                this.intervalMilis)
            }
        },
        e.prototype.stop = function() {
            this.intervalId && (clearInterval(this.intervalId), this.intervalId = null)
        };
        var o = function(e) {
            for (var t = 0,
            n = e.length,
            r = 0; r < n; r++) t < e[r] && (t = e[r]);
            return parseFloat(((t - 127) / 128).toFixed(3))
        };
        return e.LOCAL_JID = "local",
        e
    })()
},
function(e, exports) {
    var t = function(e) {
        function n(e, t, n) {
            e.width = t + interfaceConfig.CANVAS_EXTRA,
            e.height = n + interfaceConfig.CANVAS_EXTRA
        }
        function r(e, t) {
            if (!s[e]) {
                var n = i(e),
                r = $("#" + n + ">canvas").get(0);
                r && (s[e] = CanvasUtil.cloneCanvas(r))
            }
            var a = s[e];
            if (a) {
                var c = a.getContext("2d");
                c.clearRect(0, 0, a.width, a.height);
                var d = o(t);
                d > 0 && CanvasUtil.drawRoundRectGlow(c, interfaceConfig.CANVAS_EXTRA / 2, interfaceConfig.CANVAS_EXTRA / 2, a.width - interfaceConfig.CANVAS_EXTRA, a.height - interfaceConfig.CANVAS_EXTRA, interfaceConfig.CANVAS_RADIUS, interfaceConfig.SHADOW_COLOR, d)
            }
        }
        function o(e) {
            var t = 0;
            return t = e <= .3 ? Math.round(interfaceConfig.CANVAS_EXTRA / 2 * (e / .3)) : e <= .6 ? Math.round(interfaceConfig.CANVAS_EXTRA / 2 * ((e - .3) / .3)) : Math.round(interfaceConfig.CANVAS_EXTRA / 2 * ((e - .6) / .4))
        }
        function i(e) {
            var n = null;
            return n = e === t.LOCAL_LEVEL || connection.emuc.myroomjid && e === Strophe.getResourceFromJid(connection.emuc.myroomjid) ? "localVideoContainer": "participant_" + e
        }
        var s = {};
        return e.LOCAL_LEVEL = "local",
        e.updateAudioLevelCanvas = function(e) {
            var t = null,
            r = null;
            e ? (t = Strophe.getResourceFromJid(e), r = "participant_" + t) : r = "localVideoContainer";
            var o = document.getElementById(r);
            if (!o) return void(t ? console.error("No video element for jid", t) : console.error("No video element for local video."));
            var i = $("#" + r + ">canvas"),
            s = $("#remoteVideos").width(),
            a = VideoLayout.calculateThumbnailSize(s),
            c = a[0],
            d = a[1];
            i && 0 !== i.length ? (i = i.get(0), n(i, c, d)) : (i = document.createElement("canvas"), i.className = "audiolevel", i.style.bottom = "-" + interfaceConfig.CANVAS_EXTRA / 2 + "px", i.style.left = "-" + interfaceConfig.CANVAS_EXTRA / 2 + "px", n(i, c, d), o.appendChild(i))
        },
        e.updateAudioLevel = function(e, n) {
            r(e, n);
            var o = i(e),
            a = $("#" + o + ">canvas").get(0);
            if (a) {
                var c = a.getContext("2d"),
                d = s[e];
                if (c.clearRect(0, 0, a.width, a.height), c.drawImage(d, 0, 0), e === t.LOCAL_LEVEL) {
                    if (!connection.emuc.myroomjid) return;
                    e = Strophe.getResourceFromJid(connection.emuc.myroomjid)
                }
                e === VideoLayout.getLargeVideoState().userResourceJid && t.updateActiveSpeakerAudioLevel(n)
            }
        },
        e.updateActiveSpeakerAudioLevel = function(e) {
            var t = $("#activeSpeakerAudioLevel")[0].getContext("2d"),
            n = interfaceConfig.ACTIVE_SPEAKER_AVATAR_SIZE / 2,
            r = (interfaceConfig.ACTIVE_SPEAKER_AVATAR_SIZE + n) / 2;
            t.save(),
            t.clearRect(0, 0, 300, 300),
            t.arc(r, r, n, 0, 2 * Math.PI),
            t.shadowColor = interfaceConfig.SHADOW_COLOR,
            t.shadowBlur = o(e),
            t.shadowOffsetX = 0,
            t.shadowOffsetY = 0,
            t.fill(),
            t.save(),
            t.restore(),
            t.arc(r, r, n, 0, 2 * Math.PI),
            t.clip(),
            t.clearRect(0, 0, 277, 200),
            t.restore()
        },
        $(document).bind("remotevideo.resized",
        function(e, t, n) {
            var r = !1;
            $("#remoteVideos>span>canvas").each(function() {
                var e = $(this).get(0);
                e.width !== t + interfaceConfig.CANVAS_EXTRA && (e.width = t + interfaceConfig.CANVAS_EXTRA, r = !0),
                e.heigh !== n + interfaceConfig.CANVAS_EXTRA && (e.height = n + interfaceConfig.CANVAS_EXTRA, r = !0)
            }),
            r && Object.keys(s).forEach(function(e) {
                s[e].width = t + interfaceConfig.CANVAS_EXTRA,
                s[e].height = n + interfaceConfig.CANVAS_EXTRA
            })
        }),
        e
    } (t || {});
    exports = e.exports = t
},
function(e, exports, t) {
    function n(e, t, n) {
        stream && stream.getTracks().forEach(function(e) {
            e.stop()
        }),
        navigator.mediaDevices.getUserMedia(e).then(t).
        catch(function(e) {
            n(e)
        })
    }
    t(13);
    e.exports = {
        getMedia: n
    }
},
function(e, exports, t) { (function(n) {
        "use strict";
        console.log(n)                                                                                                                          
        var r = t(14);
        e.exports = r({
            window: window
        })
    }).call(exports,
    function() {
        return this
    } ())
},
function(e, exports, t) {
    "use strict";
    var n = t(15);
    e.exports = function(e, r) {
        var o = e && e.window,
        i = {
            shimChrome: !0,
            shimFirefox: !0,
            shimEdge: !0,
            shimSafari: !0
        };
        for (var s in r) hasOwnProperty.call(r, s) && (i[s] = r[s]);
        var a = n.log,
        c = n.detectBrowser(o),
        d = t(16) || null,
        u = t(18) || null,
        l = t(22) || null,
        p = t(24) || null,
        f = t(25) || null,
        h = {
            browserDetails: c,
            commonShim: f,
            extractVersion: n.extractVersion,
            disableLog: n.disableLog,
            disableWarnings: n.disableWarnings
        };
        switch (c.browser) {
        case "chrome":
            if (!d || !d.shimPeerConnection || !i.shimChrome) return a("Chrome shim is not included in this adapter release."),
            h;
            a("adapter.js shimming chrome."),
            h.browserShim = d,
            f.shimCreateObjectURL(o),
            d.shimGetUserMedia(o),
            d.shimMediaStream(o),
            d.shimSourceObject(o),
            d.shimPeerConnection(o),
            d.shimOnTrack(o),
            d.shimAddTrackRemoveTrack(o),
            d.shimGetSendersWithDtmf(o),
            f.shimRTCIceCandidate(o),
            f.shimMaxMessageSize(o),
            f.shimSendThrowTypeError(o);
            break;
        case "firefox":
            if (!l || !l.shimPeerConnection || !i.shimFirefox) return a("Firefox shim is not included in this adapter release."),
            h;
            a("adapter.js shimming firefox."),
            h.browserShim = l,
            f.shimCreateObjectURL(o),
            l.shimGetUserMedia(o),
            l.shimSourceObject(o),
            l.shimPeerConnection(o),
            l.shimOnTrack(o),
            l.shimRemoveStream(o),
            f.shimRTCIceCandidate(o),
            f.shimMaxMessageSize(o),
            f.shimSendThrowTypeError(o);
            break;
        case "edge":
            if (!u || !u.shimPeerConnection || !i.shimEdge) return a("MS edge shim is not included in this adapter release."),
            h;
            a("adapter.js shimming edge."),
            h.browserShim = u,
            f.shimCreateObjectURL(o),
            u.shimGetUserMedia(o),
            u.shimPeerConnection(o),
            u.shimReplaceTrack(o),
            f.shimMaxMessageSize(o),
            f.shimSendThrowTypeError(o);
            break;
        case "safari":
            if (!p || !i.shimSafari) return a("Safari shim is not included in this adapter release."),
            h;
            a("adapter.js shimming safari."),
            h.browserShim = p,
            f.shimCreateObjectURL(o),
            p.shimRTCIceServerUrls(o),
            p.shimCallbacksAPI(o),
            p.shimLocalStreamsAPI(o),
            p.shimRemoteStreamsAPI(o),
            p.shimTrackEventTransceiver(o),
            p.shimGetUserMedia(o),
            p.shimCreateOfferLegacy(o),
            f.shimRTCIceCandidate(o),
            f.shimMaxMessageSize(o),
            f.shimSendThrowTypeError(o);
            break;
        default:
            a("Unsupported browser!")
        }
        return h
    }
},
function(e, exports) {
    "use strict";
    function t(e, t, n) {
        var r = e.match(t);
        return r && r.length >= n && parseInt(r[n], 10)
    }
    function n(e, t, n) {
        if (e.RTCPeerConnection) {
            var r = e.RTCPeerConnection.prototype,
            o = r.addEventListener;
            r.addEventListener = function(e, r) {
                if (e !== t) return o.apply(this, arguments);
                var i = function(e) {
                    r(n(e))
                };
                return this._eventMap = this._eventMap || {},
                this._eventMap[r] = i,
                o.apply(this, [e, i])
            };
            var i = r.removeEventListener;
            r.removeEventListener = function(e, n) {
                if (e !== t || !this._eventMap || !this._eventMap[n]) return i.apply(this, arguments);
                var r = this._eventMap[n];
                return delete this._eventMap[n],
                i.apply(this, [e, r])
            },
            Object.defineProperty(r, "on" + t, {
                get: function() {
                    return this["_on" + t]
                },
                set: function(e) {
                    this["_on" + t] && (this.removeEventListener(t, this["_on" + t]), delete this["_on" + t]),
                    e && this.addEventListener(t, this["_on" + t] = e)
                }
            })
        }
    }
    var r = !0,
    o = !0;
    e.exports = {
        extractVersion: t,
        wrapPeerConnectionEvent: n,
        disableLog: function(e) {
            return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (r = e, e ? "adapter.js logging disabled": "adapter.js logging enabled")
        },
        disableWarnings: function(e) {
            return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (o = !e, "adapter.js deprecation warnings " + (e ? "disabled": "enabled"))
        },
        log: function() {
            if ("object" == typeof window) {
                if (r) return;
                "undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments)
            }
        },
        deprecated: function(e, t) {
            o && console.warn(e + " is deprecated, please use " + t + " instead.")
        },
        detectBrowser: function(e) {
            var n = e && e.navigator,
            r = {};
            if (r.browser = null, r.version = null, "undefined" == typeof e || !e.navigator) return r.browser = "Not a browser.",
            r;
            if (n.mozGetUserMedia) r.browser = "firefox",
            r.version = t(n.userAgent, /Firefox\/(\d+)\./, 1);
            else if (n.webkitGetUserMedia) r.browser = "chrome",
            r.version = t(n.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
            else if (n.mediaDevices && n.userAgent.match(/Edge\/(\d+).(\d+)$/)) r.browser = "edge",
            r.version = t(n.userAgent, /Edge\/(\d+).(\d+)$/, 2);
            else {
                if (!e.RTCPeerConnection || !n.userAgent.match(/AppleWebKit\/(\d+)\./)) return r.browser = "Not a supported browser.",
                r;
                r.browser = "safari",
                r.version = t(n.userAgent, /AppleWebKit\/(\d+)\./, 1)
            }
            return r
        }
    }
},
function(e, exports, t) {
    "use strict";
    var n = t(15),
    r = n.log;
    e.exports = {
        shimGetUserMedia: t(17),
        shimMediaStream: function(e) {
            e.MediaStream = e.MediaStream || e.webkitMediaStream
        },
        shimOnTrack: function(e) {
            if ("object" != typeof e || !e.RTCPeerConnection || "ontrack" in e.RTCPeerConnection.prototype)"RTCRtpTransceiver" in e || n.wrapPeerConnectionEvent(e, "track",
            function(e) {
                return e.transceiver || (e.transceiver = {
                    receiver: e.receiver
                }),
                e
            });
            else {
                Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
                    get: function() {
                        return this._ontrack
                    },
                    set: function(e) {
                        this._ontrack && this.removeEventListener("track", this._ontrack),
                        this.addEventListener("track", this._ontrack = e)
                    }
                });
                var t = e.RTCPeerConnection.prototype.setRemoteDescription;
                e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                    var n = this;
                    return n._ontrackpoly || (n._ontrackpoly = function(t) {
                        t.stream.addEventListener("addtrack",
                        function(r) {
                            var o;
                            o = e.RTCPeerConnection.prototype.getReceivers ? n.getReceivers().find(function(e) {
                                return e.track && e.track.id === r.track.id
                            }) : {
                                track: r.track
                            };
                            var i = new Event("track");
                            i.track = r.track,
                            i.receiver = o,
                            i.transceiver = {
                                receiver: o
                            },
                            i.streams = [t.stream],
                            n.dispatchEvent(i)
                        }),
                        t.stream.getTracks().forEach(function(r) {
                            var o;
                            o = e.RTCPeerConnection.prototype.getReceivers ? n.getReceivers().find(function(e) {
                                return e.track && e.track.id === r.id
                            }) : {
                                track: r
                            };
                            var i = new Event("track");
                            i.track = r,
                            i.receiver = o,
                            i.transceiver = {
                                receiver: o
                            },
                            i.streams = [t.stream],
                            n.dispatchEvent(i)
                        })
                    },
                    n.addEventListener("addstream", n._ontrackpoly)),
                    t.apply(n, arguments)
                }
            }
        },
        shimGetSendersWithDtmf: function(e) {
            if ("object" == typeof e && e.RTCPeerConnection && !("getSenders" in e.RTCPeerConnection.prototype) && "createDTMFSender" in e.RTCPeerConnection.prototype) {
                var t = function(e, t) {
                    return {
                        track: t,
                        get dtmf() {
                            return void 0 === this._dtmf && ("audio" === t.kind ? this._dtmf = e.createDTMFSender(t) : this._dtmf = null),
                            this._dtmf
                        },
                        _pc: e
                    }
                };
                if (!e.RTCPeerConnection.prototype.getSenders) {
                    e.RTCPeerConnection.prototype.getSenders = function() {
                        return this._senders = this._senders || [],
                        this._senders.slice()
                    };
                    var n = e.RTCPeerConnection.prototype.addTrack;
                    e.RTCPeerConnection.prototype.addTrack = function(e, r) {
                        var o = this,
                        i = n.apply(o, arguments);
                        return i || (i = t(o, e), o._senders.push(i)),
                        i
                    };
                    var r = e.RTCPeerConnection.prototype.removeTrack;
                    e.RTCPeerConnection.prototype.removeTrack = function(e) {
                        var t = this;
                        r.apply(t, arguments);
                        var n = t._senders.indexOf(e);
                        n !== -1 && t._senders.splice(n, 1)
                    }
                }
                var o = e.RTCPeerConnection.prototype.addStream;
                e.RTCPeerConnection.prototype.addStream = function(e) {
                    var n = this;
                    n._senders = n._senders || [],
                    o.apply(n, [e]),
                    e.getTracks().forEach(function(e) {
                        n._senders.push(t(n, e))
                    })
                };
                var i = e.RTCPeerConnection.prototype.removeStream;
                e.RTCPeerConnection.prototype.removeStream = function(e) {
                    var t = this;
                    t._senders = t._senders || [],
                    i.apply(t, [e]),
                    e.getTracks().forEach(function(e) {
                        var n = t._senders.find(function(t) {
                            return t.track === e
                        });
                        n && t._senders.splice(t._senders.indexOf(n), 1)
                    })
                }
            } else if ("object" == typeof e && e.RTCPeerConnection && "getSenders" in e.RTCPeerConnection.prototype && "createDTMFSender" in e.RTCPeerConnection.prototype && e.RTCRtpSender && !("dtmf" in e.RTCRtpSender.prototype)) {
                var s = e.RTCPeerConnection.prototype.getSenders;
                e.RTCPeerConnection.prototype.getSenders = function() {
                    var e = this,
                    t = s.apply(e, []);
                    return t.forEach(function(t) {
                        t._pc = e
                    }),
                    t
                },
                Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
                    get: function() {
                        return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null),
                        this._dtmf
                    }
                })
            }
        },
        shimSourceObject: function(e) {
            var t = e && e.URL;
            "object" == typeof e && (!e.HTMLMediaElement || "srcObject" in e.HTMLMediaElement.prototype || Object.defineProperty(e.HTMLMediaElement.prototype, "srcObject", {
                get: function() {
                    return this._srcObject
                },
                set: function(e) {
                    var n = this;
                    return this._srcObject = e,
                    this.src && t.revokeObjectURL(this.src),
                    e ? (this.src = t.createObjectURL(e), e.addEventListener("addtrack",
                    function() {
                        n.src && t.revokeObjectURL(n.src),
                        n.src = t.createObjectURL(e)
                    }), void e.addEventListener("removetrack",
                    function() {
                        n.src && t.revokeObjectURL(n.src),
                        n.src = t.createObjectURL(e)
                    })) : void(this.src = "")
                }
            }))
        },
        shimAddTrackRemoveTrackWithNative: function(e) {
            e.RTCPeerConnection.prototype.getLocalStreams = function() {
                var e = this;
                return this._shimmedLocalStreams = this._shimmedLocalStreams || {},
                Object.keys(this._shimmedLocalStreams).map(function(t) {
                    return e._shimmedLocalStreams[t][0]
                })
            };
            var t = e.RTCPeerConnection.prototype.addTrack;
            e.RTCPeerConnection.prototype.addTrack = function(e, n) {
                if (!n) return t.apply(this, arguments);
                this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                var r = t.apply(this, arguments);
                return this._shimmedLocalStreams[n.id] ? this._shimmedLocalStreams[n.id].indexOf(r) === -1 && this._shimmedLocalStreams[n.id].push(r) : this._shimmedLocalStreams[n.id] = [n, r],
                r
            };
            var n = e.RTCPeerConnection.prototype.addStream;
            e.RTCPeerConnection.prototype.addStream = function(e) {
                var t = this;
                this._shimmedLocalStreams = this._shimmedLocalStreams || {},
                e.getTracks().forEach(function(e) {
                    var n = t.getSenders().find(function(t) {
                        return t.track === e
                    });
                    if (n) throw new DOMException("Track already exists.", "InvalidAccessError")
                });
                var r = t.getSenders();
                n.apply(this, arguments);
                var o = t.getSenders().filter(function(e) {
                    return r.indexOf(e) === -1
                });
                this._shimmedLocalStreams[e.id] = [e].concat(o)
            };
            var r = e.RTCPeerConnection.prototype.removeStream;
            e.RTCPeerConnection.prototype.removeStream = function(e) {
                return this._shimmedLocalStreams = this._shimmedLocalStreams || {},
                delete this._shimmedLocalStreams[e.id],
                r.apply(this, arguments)
            };
            var o = e.RTCPeerConnection.prototype.removeTrack;
            e.RTCPeerConnection.prototype.removeTrack = function(e) {
                var t = this;
                return this._shimmedLocalStreams = this._shimmedLocalStreams || {},
                e && Object.keys(this._shimmedLocalStreams).forEach(function(n) {
                    var r = t._shimmedLocalStreams[n].indexOf(e);
                    r !== -1 && t._shimmedLocalStreams[n].splice(r, 1),
                    1 === t._shimmedLocalStreams[n].length && delete t._shimmedLocalStreams[n]
                }),
                o.apply(this, arguments)
            }
        },
        shimAddTrackRemoveTrack: function(e) {
            function t(e, t) {
                var n = t.sdp;
                return Object.keys(e._reverseStreams || []).forEach(function(t) {
                    var r = e._reverseStreams[t],
                    o = e._streams[r.id];
                    n = n.replace(new RegExp(o.id, "g"), r.id)
                }),
                new RTCSessionDescription({
                    type: t.type,
                    sdp: n
                })
            }
            function r(e, t) {
                var n = t.sdp;
                return Object.keys(e._reverseStreams || []).forEach(function(t) {
                    var r = e._reverseStreams[t],
                    o = e._streams[r.id];
                    n = n.replace(new RegExp(r.id, "g"), o.id)
                }),
                new RTCSessionDescription({
                    type: t.type,
                    sdp: n
                })
            }
            var o = n.detectBrowser(e);
            if (e.RTCPeerConnection.prototype.addTrack && o.version >= 65) return this.shimAddTrackRemoveTrackWithNative(e);
            var i = e.RTCPeerConnection.prototype.getLocalStreams;
            e.RTCPeerConnection.prototype.getLocalStreams = function() {
                var e = this,
                t = i.apply(this);
                return e._reverseStreams = e._reverseStreams || {},
                t.map(function(t) {
                    return e._reverseStreams[t.id]
                })
            };
            var s = e.RTCPeerConnection.prototype.addStream;
            e.RTCPeerConnection.prototype.addStream = function(t) {
                var n = this;
                if (n._streams = n._streams || {},
                n._reverseStreams = n._reverseStreams || {},
                t.getTracks().forEach(function(e) {
                    var t = n.getSenders().find(function(t) {
                        return t.track === e
                    });
                    if (t) throw new DOMException("Track already exists.", "InvalidAccessError")
                }), !n._reverseStreams[t.id]) {
                    var r = new e.MediaStream(t.getTracks());
                    n._streams[t.id] = r,
                    n._reverseStreams[r.id] = t,
                    t = r
                }
                s.apply(n, [t])
            };
            var a = e.RTCPeerConnection.prototype.removeStream;
            e.RTCPeerConnection.prototype.removeStream = function(e) {
                var t = this;
                t._streams = t._streams || {},
                t._reverseStreams = t._reverseStreams || {},
                a.apply(t, [t._streams[e.id] || e]),
                delete t._reverseStreams[t._streams[e.id] ? t._streams[e.id].id: e.id],
                delete t._streams[e.id]
            },
            e.RTCPeerConnection.prototype.addTrack = function(t, n) {
                var r = this;
                if ("closed" === r.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                var o = [].slice.call(arguments, 1);
                if (1 !== o.length || !o[0].getTracks().find(function(e) {
                    return e === t
                })) throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
                var i = r.getSenders().find(function(e) {
                    return e.track === t
                });
                if (i) throw new DOMException("Track already exists.", "InvalidAccessError");
                r._streams = r._streams || {},
                r._reverseStreams = r._reverseStreams || {};
                var s = r._streams[n.id];
                if (s) s.addTrack(t),
                Promise.resolve().then(function() {
                    r.dispatchEvent(new Event("negotiationneeded"))
                });
                else {
                    var a = new e.MediaStream([t]);
                    r._streams[n.id] = a,
                    r._reverseStreams[a.id] = n,
                    r.addStream(a)
                }
                return r.getSenders().find(function(e) {
                    return e.track === t
                })
            },
            ["createOffer", "createAnswer"].forEach(function(n) {
                var r = e.RTCPeerConnection.prototype[n];
                e.RTCPeerConnection.prototype[n] = function() {
                    var e = this,
                    n = arguments,
                    o = arguments.length && "function" == typeof arguments[0];
                    return o ? r.apply(e, [function(r) {
                        var o = t(e, r);
                        n[0].apply(null, [o])
                    },
                    function(e) {
                        n[1] && n[1].apply(null, e)
                    },
                    arguments[2]]) : r.apply(e, arguments).then(function(n) {
                        return t(e, n)
                    })
                }
            });
            var c = e.RTCPeerConnection.prototype.setLocalDescription;
            e.RTCPeerConnection.prototype.setLocalDescription = function() {
                var e = this;
                return arguments.length && arguments[0].type ? (arguments[0] = r(e, arguments[0]), c.apply(e, arguments)) : c.apply(e, arguments)
            };
            var d = Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype, "localDescription");
            Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", {
                get: function() {
                    var e = this,
                    n = d.get.apply(this);
                    return "" === n.type ? n: t(e, n)
                }
            }),
            e.RTCPeerConnection.prototype.removeTrack = function(e) {
                var t = this;
                if ("closed" === t.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                if (!e._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
                var n = e._pc === t;
                if (!n) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
                t._streams = t._streams || {};
                var r;
                Object.keys(t._streams).forEach(function(n) {
                    var o = t._streams[n].getTracks().find(function(t) {
                        return e.track === t
                    });
                    o && (r = t._streams[n])
                }),
                r && (1 === r.getTracks().length ? t.removeStream(t._reverseStreams[r.id]) : r.removeTrack(e.track), t.dispatchEvent(new Event("negotiationneeded")))
            }
        },
        shimPeerConnection: function(e) {
            var t = n.detectBrowser(e);
            if (!e.RTCPeerConnection && e.webkitRTCPeerConnection) e.RTCPeerConnection = function(t, n) {
                return r("PeerConnection"),
                t && t.iceTransportPolicy && (t.iceTransports = t.iceTransportPolicy),
                new e.webkitRTCPeerConnection(t, n)
            },
            e.RTCPeerConnection.prototype = e.webkitRTCPeerConnection.prototype,
            e.webkitRTCPeerConnection.generateCertificate && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
                get: function() {
                    return e.webkitRTCPeerConnection.generateCertificate
                }
            });
            else {
                var o = e.RTCPeerConnection;
                e.RTCPeerConnection = function(e, t) {
                    if (e && e.iceServers) {
                        for (var r = [], i = 0; i < e.iceServers.length; i++) {
                            var s = e.iceServers[i]; ! s.hasOwnProperty("urls") && s.hasOwnProperty("url") ? (n.deprecated("RTCIceServer.url", "RTCIceServer.urls"), s = JSON.parse(JSON.stringify(s)), s.urls = s.url, r.push(s)) : r.push(e.iceServers[i])
                        }
                        e.iceServers = r
                    }
                    return new o(e, t)
                },
                e.RTCPeerConnection.prototype = o.prototype,
                Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
                    get: function() {
                        return o.generateCertificate
                    }
                })
            }
            var i = e.RTCPeerConnection.prototype.getStats;
            e.RTCPeerConnection.prototype.getStats = function(e, t, n) {
                var r = this,
                o = arguments;
                if (arguments.length > 0 && "function" == typeof e) return i.apply(this, arguments);
                if (0 === i.length && (0 === arguments.length || "function" != typeof arguments[0])) return i.apply(this, []);
                var s = function(e) {
                    var t = {},
                    n = e.result();
                    return n.forEach(function(e) {
                        var n = {
                            id: e.id,
                            timestamp: e.timestamp,
                            type: {
                                localcandidate: "local-candidate",
                                remotecandidate: "remote-candidate"
                            } [e.type] || e.type
                        };
                        e.names().forEach(function(t) {
                            n[t] = e.stat(t)
                        }),
                        t[n.id] = n
                    }),
                    t
                },
                a = function(e) {
                    return new Map(Object.keys(e).map(function(t) {
                        return [t, e[t]]
                    }))
                };
                if (arguments.length >= 2) {
                    var c = function(e) {
                        o[1](a(s(e)))
                    };
                    return i.apply(this, [c, arguments[0]])
                }
                return new Promise(function(e, t) {
                    i.apply(r, [function(t) {
                        e(a(s(t)))
                    },
                    t])
                }).then(t, n)
            },
            t.version < 51 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
                var n = e.RTCPeerConnection.prototype[t];
                e.RTCPeerConnection.prototype[t] = function() {
                    var e = arguments,
                    t = this,
                    r = new Promise(function(r, o) {
                        n.apply(t, [e[0], r, o])
                    });
                    return e.length < 2 ? r: r.then(function() {
                        e[1].apply(null, [])
                    },
                    function(t) {
                        e.length >= 3 && e[2].apply(null, [t])
                    })
                }
            }),
            t.version < 52 && ["createOffer", "createAnswer"].forEach(function(t) {
                var n = e.RTCPeerConnection.prototype[t];
                e.RTCPeerConnection.prototype[t] = function() {
                    var e = this;
                    if (arguments.length < 1 || 1 === arguments.length && "object" == typeof arguments[0]) {
                        var t = 1 === arguments.length ? arguments[0] : void 0;
                        return new Promise(function(r, o) {
                            n.apply(e, [r, o, t])
                        })
                    }
                    return n.apply(this, arguments)
                }
            }),
            ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
                var n = e.RTCPeerConnection.prototype[t];
                e.RTCPeerConnection.prototype[t] = function() {
                    return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate: e.RTCSessionDescription)(arguments[0]),
                    n.apply(this, arguments)
                }
            });
            var s = e.RTCPeerConnection.prototype.addIceCandidate;
            e.RTCPeerConnection.prototype.addIceCandidate = function() {
                return arguments[0] ? s.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
            }
        }
    }
},
function(e, exports, t) {
    "use strict";
    var n = t(15),
    r = n.log;
    e.exports = function(e) {
        var t = n.detectBrowser(e),
        o = e && e.navigator,
        i = function(e) {
            if ("object" != typeof e || e.mandatory || e.optional) return e;
            var t = {};
            return Object.keys(e).forEach(function(n) {
                if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
                    var r = "object" == typeof e[n] ? e[n] : {
                        ideal: e[n]
                    };
                    void 0 !== r.exact && "number" == typeof r.exact && (r.min = r.max = r.exact);
                    var o = function(e, t) {
                        return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId": t
                    };
                    if (void 0 !== r.ideal) {
                        t.optional = t.optional || [];
                        var i = {};
                        "number" == typeof r.ideal ? (i[o("min", n)] = r.ideal, t.optional.push(i), i = {},
                        i[o("max", n)] = r.ideal, t.optional.push(i)) : (i[o("", n)] = r.ideal, t.optional.push(i))
                    }
                    void 0 !== r.exact && "number" != typeof r.exact ? (t.mandatory = t.mandatory || {},
                    t.mandatory[o("", n)] = r.exact) : ["min", "max"].forEach(function(e) {
                        void 0 !== r[e] && (t.mandatory = t.mandatory || {},
                        t.mandatory[o(e, n)] = r[e])
                    })
                }
            }),
            e.advanced && (t.optional = (t.optional || []).concat(e.advanced)),
            t
        },
        s = function(e, n) {
            if (t.version >= 61) return n(e);
            if (e = JSON.parse(JSON.stringify(e)), e && "object" == typeof e.audio) {
                var s = function(e, t, n) {
                    t in e && !(n in e) && (e[n] = e[t], delete e[t])
                };
                e = JSON.parse(JSON.stringify(e)),
                s(e.audio, "autoGainControl", "googAutoGainControl"),
                s(e.audio, "noiseSuppression", "googNoiseSuppression"),
                e.audio = i(e.audio)
            }
            if (e && "object" == typeof e.video) {
                var a = e.video.facingMode;
                a = a && ("object" == typeof a ? a: {
                    ideal: a
                });
                var c = t.version < 66;
                if (a && ("user" === a.exact || "environment" === a.exact || "user" === a.ideal || "environment" === a.ideal) && (!o.mediaDevices.getSupportedConstraints || !o.mediaDevices.getSupportedConstraints().facingMode || c)) {
                    delete e.video.facingMode;
                    var d;
                    if ("environment" === a.exact || "environment" === a.ideal ? d = ["back", "rear"] : "user" !== a.exact && "user" !== a.ideal || (d = ["front"]), d) return o.mediaDevices.enumerateDevices().then(function(t) {
                        t = t.filter(function(e) {
                            return "videoinput" === e.kind
                        });
                        var o = t.find(function(e) {
                            return d.some(function(t) {
                                return e.label.toLowerCase().indexOf(t) !== -1
                            })
                        });
                        return ! o && t.length && d.indexOf("back") !== -1 && (o = t[t.length - 1]),
                        o && (e.video.deviceId = a.exact ? {
                            exact: o.deviceId
                        }: {
                            ideal: o.deviceId
                        }),
                        e.video = i(e.video),
                        r("chrome: " + JSON.stringify(e)),
                        n(e)
                    })
                }
                e.video = i(e.video)
            }
            return r("chrome: " + JSON.stringify(e)),
            n(e)
        },
        a = function(e) {
            return {
                name: {
                    PermissionDeniedError: "NotAllowedError",
                    PermissionDismissedError: "NotAllowedError",
                    InvalidStateError: "NotAllowedError",
                    DevicesNotFoundError: "NotFoundError",
                    ConstraintNotSatisfiedError: "OverconstrainedError",
                    TrackStartError: "NotReadableError",
                    MediaDeviceFailedDueToShutdown: "NotAllowedError",
                    MediaDeviceKillSwitchOn: "NotAllowedError",
                    TabCaptureError: "AbortError",
                    ScreenCaptureError: "AbortError",
                    DeviceCaptureError: "AbortError"
                } [e.name] || e.name,
                message: e.message,
                constraint: e.constraintName,
                toString: function() {
                    return this.name + (this.message && ": ") + this.message
                }
            }
        },
        c = function(e, t, n) {
            s(e,
            function(e) {
                o.webkitGetUserMedia(e, t,
                function(e) {
                    n && n(a(e))
                })
            })
        };
        o.getUserMedia = c;
        var d = function(e) {
            return new Promise(function(t, n) {
                o.getUserMedia(e, t, n)
            })
        };
        if (o.mediaDevices || (o.mediaDevices = {
            getUserMedia: d,
            enumerateDevices: function() {
                return new Promise(function(t) {
                    var n = {
                        audio: "audioinput",
                        video: "videoinput"
                    };
                    return e.MediaStreamTrack.getSources(function(e) {
                        t(e.map(function(e) {
                            return {
                                label: e.label,
                                kind: n[e.kind],
                                deviceId: e.id,
                                groupId: ""
                            }
                        }))
                    })
                })
            },
            getSupportedConstraints: function() {
                return {
                    deviceId: !0,
                    echoCancellation: !0,
                    facingMode: !0,
                    frameRate: !0,
                    height: !0,
                    width: !0
                }
            }
        }), o.mediaDevices.getUserMedia) {
            var u = o.mediaDevices.getUserMedia.bind(o.mediaDevices);
            o.mediaDevices.getUserMedia = function(e) {
                return s(e,
                function(e) {
                    return u(e).then(function(t) {
                        if (e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length) throw t.getTracks().forEach(function(e) {
                            e.stop()
                        }),
                        new DOMException("", "NotFoundError");
                        return t
                    },
                    function(e) {
                        return Promise.reject(a(e))
                    })
                })
            }
        } else o.mediaDevices.getUserMedia = function(e) {
            return d(e)
        };
        "undefined" == typeof o.mediaDevices.addEventListener && (o.mediaDevices.addEventListener = function() {
            r("Dummy mediaDevices.addEventListener called.")
        }),
        "undefined" == typeof o.mediaDevices.removeEventListener && (o.mediaDevices.removeEventListener = function() {
            r("Dummy mediaDevices.removeEventListener called.")
        })
    }
},
function(e, exports, t) {
    "use strict";
    var n = t(15),
    r = t(19);
    e.exports = {
        shimGetUserMedia: t(21),
        shimPeerConnection: function(e) {
            var t = n.detectBrowser(e);
            if (e.RTCIceGatherer && (e.RTCIceCandidate || (e.RTCIceCandidate = function(e) {
                return e
            }), e.RTCSessionDescription || (e.RTCSessionDescription = function(e) {
                return e
            }), t.version < 15025)) {
                var o = Object.getOwnPropertyDescriptor(e.MediaStreamTrack.prototype, "enabled");
                Object.defineProperty(e.MediaStreamTrack.prototype, "enabled", {
                    set: function(e) {
                        o.set.call(this, e);
                        var t = new Event("enabled");
                        t.enabled = e,
                        this.dispatchEvent(t)
                    }
                })
            } ! e.RTCRtpSender || "dtmf" in e.RTCRtpSender.prototype || Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
                get: function() {
                    return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = new e.RTCDtmfSender(this) : "video" === this.track.kind && (this._dtmf = null)),
                    this._dtmf
                }
            }),
            e.RTCDtmfSender && !e.RTCDTMFSender && (e.RTCDTMFSender = e.RTCDtmfSender),
            e.RTCPeerConnection = r(e, t.version)
        },
        shimReplaceTrack: function(e) { ! e.RTCRtpSender || "replaceTrack" in e.RTCRtpSender.prototype || (e.RTCRtpSender.prototype.replaceTrack = e.RTCRtpSender.prototype.setTrack)
        }
    }
},
function(e, exports, t) {
    "use strict";
    function n(e) {
        return {
            inboundrtp: "inbound-rtp",
            outboundrtp: "outbound-rtp",
            candidatepair: "candidate-pair",
            localcandidate: "local-candidate",
            remotecandidate: "remote-candidate"
        } [e.type] || e.type
    }
    function r(e, t, n, r, o) {
        var i = d.writeRtpDescription(e.kind, t);
        if (i += d.writeIceParameters(e.iceGatherer.getLocalParameters()), i += d.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === n ? "actpass": o || "active"), i += "a=mid:" + e.mid + "\r\n", i += e.rtpSender && e.rtpReceiver ? "a=sendrecv\r\n": e.rtpSender ? "a=sendonly\r\n": e.rtpReceiver ? "a=recvonly\r\n": "a=inactive\r\n", e.rtpSender) {
            var s = e.rtpSender._initialTrackId || e.rtpSender.track.id;
            e.rtpSender._initialTrackId = s;
            var a = "msid:" + (r ? r.id: "-") + " " + s + "\r\n";
            i += "a=" + a,
            i += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + a,
            e.sendEncodingParameters[0].rtx && (i += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + a, i += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
        }
        return i += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + d.localCName + "\r\n",
        e.rtpSender && e.sendEncodingParameters[0].rtx && (i += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + d.localCName + "\r\n"),
        i
    }
    function o(e, t) {
        var n = !1;
        return e = JSON.parse(JSON.stringify(e)),
        e.filter(function(e) {
            if (e && (e.urls || e.url)) {
                var r = e.urls || e.url;
                e.url && !e.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
                var o = "string" == typeof r;
                return o && (r = [r]),
                r = r.filter(function(e) {
                    var r = 0 === e.indexOf("turn:") && e.indexOf("transport=udp") !== -1 && e.indexOf("turn:[") === -1 && !n;
                    return r ? (n = !0, !0) : 0 === e.indexOf("stun:") && t >= 14393 && e.indexOf("?transport=udp") === -1
                }),
                delete e.url,
                e.urls = o ? r[0] : r,
                !!r.length
            }
        })
    }
    function i(e, t) {
        var n = {
            codecs: [],
            headerExtensions: [],
            fecMechanisms: []
        },
        r = function(e, t) {
            e = parseInt(e, 10);
            for (var n = 0; n < t.length; n++) if (t[n].payloadType === e || t[n].preferredPayloadType === e) return t[n]
        },
        o = function(e, t, n, o) {
            var i = r(e.parameters.apt, n),
            s = r(t.parameters.apt, o);
            return i && s && i.name.toLowerCase() === s.name.toLowerCase()
        };
        return e.codecs.forEach(function(r) {
            for (var i = 0; i < t.codecs.length; i++) {
                var s = t.codecs[i];
                if (r.name.toLowerCase() === s.name.toLowerCase() && r.clockRate === s.clockRate) {
                    if ("rtx" === r.name.toLowerCase() && r.parameters && s.parameters.apt && !o(r, s, e.codecs, t.codecs)) continue;
                    s = JSON.parse(JSON.stringify(s)),
                    s.numChannels = Math.min(r.numChannels, s.numChannels),
                    n.codecs.push(s),
                    s.rtcpFeedback = s.rtcpFeedback.filter(function(e) {
                        for (var t = 0; t < r.rtcpFeedback.length; t++) if (r.rtcpFeedback[t].type === e.type && r.rtcpFeedback[t].parameter === e.parameter) return ! 0;
                        return ! 1
                    });
                    break
                }
            }
        }),
        e.headerExtensions.forEach(function(e) {
            for (var r = 0; r < t.headerExtensions.length; r++) {
                var o = t.headerExtensions[r];
                if (e.uri === o.uri) {
                    n.headerExtensions.push(o);
                    break
                }
            }
        }),
        n
    }
    function s(e, t, n) {
        return {
            offer: {
                setLocalDescription: ["stable", "have-local-offer"],
                setRemoteDescription: ["stable", "have-remote-offer"]
            },
            answer: {
                setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
                setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
            }
        } [t][e].indexOf(n) !== -1
    }
    function a(e, t) {
        var n = e.getRemoteCandidates().find(function(e) {
            return t.foundation === e.foundation && t.ip === e.ip && t.port === e.port && t.priority === e.priority && t.protocol === e.protocol && t.type === e.type
        });
        return n || e.addRemoteCandidate(t),
        !n
    }
    function c(e, t) {
        var n = new Error(t);
        return n.name = e,
        n.code = {
            NotSupportedError: 9,
            InvalidStateError: 11,
            InvalidAccessError: 15,
            TypeError: void 0,
            OperationError: void 0
        } [e],
        n
    }
    var d = t(20);
    e.exports = function(e, t) {
        function u(t, n) {
            n.addTrack(t),
            n.dispatchEvent(new e.MediaStreamTrackEvent("addtrack", {
                track: t
            }))
        }
        function l(t, n) {
            n.removeTrack(t),
            n.dispatchEvent(new e.MediaStreamTrackEvent("removetrack", {
                track: t
            }))
        }
        function p(t, n, r, o) {
            var i = new Event("track");
            i.track = n,
            i.receiver = r,
            i.transceiver = {
                receiver: r
            },
            i.streams = o,
            e.setTimeout(function() {
                t._dispatchEvent("track", i)
            })
        }
        var f = function(n) {
            var r = this,
            i = document.createDocumentFragment();
            if (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(e) {
                r[e] = i[e].bind(i)
            }), this.canTrickleIceCandidates = null, this.needNegotiation = !1, this.localStreams = [], this.remoteStreams = [], this.localDescription = null, this.remoteDescription = null, this.signalingState = "stable", this.iceConnectionState = "new", this.connectionState = "new", this.iceGatheringState = "new", n = JSON.parse(JSON.stringify(n || {})), this.usingBundle = "max-bundle" === n.bundlePolicy, "negotiate" === n.rtcpMuxPolicy) throw c("NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported");
            switch (n.rtcpMuxPolicy || (n.rtcpMuxPolicy = "require"), n.iceTransportPolicy) {
            case "all":
            case "relay":
                break;
            default:
                n.iceTransportPolicy = "all"
            }
            switch (n.bundlePolicy) {
            case "balanced":
            case "max-compat":
            case "max-bundle":
                break;
            default:
                n.bundlePolicy = "balanced"
            }
            if (n.iceServers = o(n.iceServers || [], t), this._iceGatherers = [], n.iceCandidatePoolSize) for (var s = n.iceCandidatePoolSize; s > 0; s--) this._iceGatherers.push(new e.RTCIceGatherer({
                iceServers: n.iceServers,
                gatherPolicy: n.iceTransportPolicy
            }));
            else n.iceCandidatePoolSize = 0;
            this._config = n,
            this.transceivers = [],
            this._sdpSessionId = d.generateSessionId(),
            this._sdpSessionVersion = 0,
            this._dtlsRole = void 0,
            this._isClosed = !1
        };
        f.prototype.onicecandidate = null,
        f.prototype.onaddstream = null,
        f.prototype.ontrack = null,
        f.prototype.onremovestream = null,
        f.prototype.onsignalingstatechange = null,
        f.prototype.oniceconnectionstatechange = null,
        f.prototype.onconnectionstatechange = null,
        f.prototype.onicegatheringstatechange = null,
        f.prototype.onnegotiationneeded = null,
        f.prototype.ondatachannel = null,
        f.prototype._dispatchEvent = function(e, t) {
            this._isClosed || (this.dispatchEvent(t), "function" == typeof this["on" + e] && this["on" + e](t))
        },
        f.prototype._emitGatheringStateChange = function() {
            var e = new Event("icegatheringstatechange");
            this._dispatchEvent("icegatheringstatechange", e)
        },
        f.prototype.getConfiguration = function() {
            return this._config
        },
        f.prototype.getLocalStreams = function() {
            return this.localStreams
        },
        f.prototype.getRemoteStreams = function() {
            return this.remoteStreams
        },
        f.prototype._createTransceiver = function(e, t) {
            var n = this.transceivers.length > 0,
            r = {
                track: null,
                iceGatherer: null,
                iceTransport: null,
                dtlsTransport: null,
                localCapabilities: null,
                remoteCapabilities: null,
                rtpSender: null,
                rtpReceiver: null,
                kind: e,
                mid: null,
                sendEncodingParameters: null,
                recvEncodingParameters: null,
                stream: null,
                associatedRemoteMediaStreams: [],
                wantReceive: !0
            };
            if (this.usingBundle && n) r.iceTransport = this.transceivers[0].iceTransport,
            r.dtlsTransport = this.transceivers[0].dtlsTransport;
            else {
                var o = this._createIceAndDtlsTransports();
                r.iceTransport = o.iceTransport,
                r.dtlsTransport = o.dtlsTransport
            }
            return t || this.transceivers.push(r),
            r
        },
        f.prototype.addTrack = function(t, n) {
            if (this._isClosed) throw c("InvalidStateError", "Attempted to call addTrack on a closed peerconnection.");
            var r = this.transceivers.find(function(e) {
                return e.track === t
            });
            if (r) throw c("InvalidAccessError", "Track already exists.");
            for (var o, i = 0; i < this.transceivers.length; i++) this.transceivers[i].track || this.transceivers[i].kind !== t.kind || (o = this.transceivers[i]);
            return o || (o = this._createTransceiver(t.kind)),
            this._maybeFireNegotiationNeeded(),
            this.localStreams.indexOf(n) === -1 && this.localStreams.push(n),
            o.track = t,
            o.stream = n,
            o.rtpSender = new e.RTCRtpSender(t, o.dtlsTransport),
            o.rtpSender
        },
        f.prototype.addStream = function(e) {
            var n = this;
            if (t >= 15025) e.getTracks().forEach(function(t) {
                n.addTrack(t, e)
            });
            else {
                var r = e.clone();
                e.getTracks().forEach(function(e, t) {
                    var n = r.getTracks()[t];
                    e.addEventListener("enabled",
                    function(e) {
                        n.enabled = e.enabled
                    })
                }),
                r.getTracks().forEach(function(e) {
                    n.addTrack(e, r)
                })
            }
        },
        f.prototype.removeTrack = function(t) {
            if (this._isClosed) throw c("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection.");
            if (! (t instanceof e.RTCRtpSender)) throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
            var n = this.transceivers.find(function(e) {
                return e.rtpSender === t
            });
            if (!n) throw c("InvalidAccessError", "Sender was not created by this connection.");
            var r = n.stream;
            n.rtpSender.stop(),
            n.rtpSender = null,
            n.track = null,
            n.stream = null;
            var o = this.transceivers.map(function(e) {
                return e.stream
            });
            o.indexOf(r) === -1 && this.localStreams.indexOf(r) > -1 && this.localStreams.splice(this.localStreams.indexOf(r), 1),
            this._maybeFireNegotiationNeeded()
        },
        f.prototype.removeStream = function(e) {
            var t = this;
            e.getTracks().forEach(function(e) {
                var n = t.getSenders().find(function(t) {
                    return t.track === e
                });
                n && t.removeTrack(n)
            })
        },
        f.prototype.getSenders = function() {
            return this.transceivers.filter(function(e) {
                return !! e.rtpSender
            }).map(function(e) {
                return e.rtpSender
            })
        },
        f.prototype.getReceivers = function() {
            return this.transceivers.filter(function(e) {
                return !! e.rtpReceiver
            }).map(function(e) {
                return e.rtpReceiver
            })
        },
        f.prototype._createIceGatherer = function(t, n) {
            var r = this;
            if (n && t > 0) return this.transceivers[0].iceGatherer;
            if (this._iceGatherers.length) return this._iceGatherers.shift();
            var o = new e.RTCIceGatherer({
                iceServers: this._config.iceServers,
                gatherPolicy: this._config.iceTransportPolicy
            });
            return Object.defineProperty(o, "state", {
                value: "new",
                writable: !0
            }),
            this.transceivers[t].bufferedCandidateEvents = [],
            this.transceivers[t].bufferCandidates = function(e) {
                var n = !e.candidate || 0 === Object.keys(e.candidate).length;
                o.state = n ? "completed": "gathering",
                null !== r.transceivers[t].bufferedCandidateEvents && r.transceivers[t].bufferedCandidateEvents.push(e)
            },
            o.addEventListener("localcandidate", this.transceivers[t].bufferCandidates),
            o
        },
        f.prototype._gather = function(t, n) {
            var r = this,
            o = this.transceivers[n].iceGatherer;
            if (!o.onlocalcandidate) {
                var i = this.transceivers[n].bufferedCandidateEvents;
                this.transceivers[n].bufferedCandidateEvents = null,
                o.removeEventListener("localcandidate", this.transceivers[n].bufferCandidates),
                o.onlocalcandidate = function(e) {
                    if (! (r.usingBundle && n > 0)) {
                        var i = new Event("icecandidate");
                        i.candidate = {
                            sdpMid: t,
                            sdpMLineIndex: n
                        };
                        var s = e.candidate,
                        a = !s || 0 === Object.keys(s).length;
                        if (a)"new" !== o.state && "gathering" !== o.state || (o.state = "completed");
                        else {
                            "new" === o.state && (o.state = "gathering"),
                            s.component = 1,
                            s.ufrag = o.getLocalParameters().usernameFragment;
                            var c = d.writeCandidate(s);
                            i.candidate = Object.assign(i.candidate, d.parseCandidate(c)),
                            i.candidate.candidate = c,
                            i.candidate.toJSON = function() {
                                return {
                                    candidate: i.candidate.candidate,
                                    sdpMid: i.candidate.sdpMid,
                                    sdpMLineIndex: i.candidate.sdpMLineIndex,
                                    usernameFragment: i.candidate.usernameFragment
                                }
                            }
                        }
                        var u = d.getMediaSections(r.localDescription.sdp);
                        a ? u[i.candidate.sdpMLineIndex] += "a=end-of-candidates\r\n": u[i.candidate.sdpMLineIndex] += "a=" + i.candidate.candidate + "\r\n",
                        r.localDescription.sdp = d.getDescription(r.localDescription.sdp) + u.join("");
                        var l = r.transceivers.every(function(e) {
                            return e.iceGatherer && "completed" === e.iceGatherer.state
                        });
                        "gathering" !== r.iceGatheringState && (r.iceGatheringState = "gathering", r._emitGatheringStateChange()),
                        a || r._dispatchEvent("icecandidate", i),
                        l && (r._dispatchEvent("icecandidate", new Event("icecandidate")), r.iceGatheringState = "complete", r._emitGatheringStateChange())
                    }
                },
                e.setTimeout(function() {
                    i.forEach(function(e) {
                        o.onlocalcandidate(e)
                    })
                },
                0)
            }
        },
        f.prototype._createIceAndDtlsTransports = function() {
            var t = this,
            n = new e.RTCIceTransport(null);
            n.onicestatechange = function() {
                t._updateIceConnectionState(),
                t._updateConnectionState()
            };
            var r = new e.RTCDtlsTransport(n);
            return r.ondtlsstatechange = function() {
                t._updateConnectionState()
            },
            r.onerror = function() {
                Object.defineProperty(r, "state", {
                    value: "failed",
                    writable: !0
                }),
                t._updateConnectionState()
            },
            {
                iceTransport: n,
                dtlsTransport: r
            }
        },
        f.prototype._disposeIceAndDtlsTransports = function(e) {
            var t = this.transceivers[e].iceGatherer;
            t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer);
            var n = this.transceivers[e].iceTransport;
            n && (delete n.onicestatechange, delete this.transceivers[e].iceTransport);
            var r = this.transceivers[e].dtlsTransport;
            r && (delete r.ondtlsstatechange, delete r.onerror, delete this.transceivers[e].dtlsTransport)
        },
        f.prototype._transceive = function(e, n, r) {
            var o = i(e.localCapabilities, e.remoteCapabilities);
            n && e.rtpSender && (o.encodings = e.sendEncodingParameters, o.rtcp = {
                cname: d.localCName,
                compound: e.rtcpParameters.compound
            },
            e.recvEncodingParameters.length && (o.rtcp.ssrc = e.recvEncodingParameters[0].ssrc), e.rtpSender.send(o)),
            r && e.rtpReceiver && o.codecs.length > 0 && ("video" === e.kind && e.recvEncodingParameters && t < 15019 && e.recvEncodingParameters.forEach(function(e) {
                delete e.rtx
            }), e.recvEncodingParameters.length ? o.encodings = e.recvEncodingParameters: o.encodings = [{}], o.rtcp = {
                compound: e.rtcpParameters.compound
            },
            e.rtcpParameters.cname && (o.rtcp.cname = e.rtcpParameters.cname), e.sendEncodingParameters.length && (o.rtcp.ssrc = e.sendEncodingParameters[0].ssrc), e.rtpReceiver.receive(o))
        },
        f.prototype.setLocalDescription = function(e) {
            var t = this;
            if (["offer", "answer"].indexOf(e.type) === -1) return Promise.reject(c("TypeError", 'Unsupported type "' + e.type + '"'));
            if (!s("setLocalDescription", e.type, t.signalingState) || t._isClosed) return Promise.reject(c("InvalidStateError", "Can not set local " + e.type + " in state " + t.signalingState));
            var n, r;
            if ("offer" === e.type) n = d.splitSections(e.sdp),
            r = n.shift(),
            n.forEach(function(e, n) {
                var r = d.parseRtpParameters(e);
                t.transceivers[n].localCapabilities = r
            }),
            t.transceivers.forEach(function(e, n) {
                t._gather(e.mid, n)
            });
            else if ("answer" === e.type) {
                n = d.splitSections(t.remoteDescription.sdp),
                r = n.shift();
                var o = d.matchPrefix(r, "a=ice-lite").length > 0;
                n.forEach(function(e, n) {
                    var s = t.transceivers[n],
                    a = s.iceGatherer,
                    c = s.iceTransport,
                    u = s.dtlsTransport,
                    l = s.localCapabilities,
                    p = s.remoteCapabilities,
                    f = d.isRejected(e) && 0 === d.matchPrefix(e, "a=bundle-only").length;
                    if (!f && !s.rejected) {
                        var h = d.getIceParameters(e, r),
                        m = d.getDtlsParameters(e, r);
                        o && (m.role = "server"),
                        t.usingBundle && 0 !== n || (t._gather(s.mid, n), "new" === c.state && c.start(a, h, o ? "controlling": "controlled"), "new" === u.state && u.start(m));
                        var g = i(l, p);
                        t._transceive(s, g.codecs.length > 0, !1)
                    }
                })
            }
            return t.localDescription = {
                type: e.type,
                sdp: e.sdp
            },
            "offer" === e.type ? t._updateSignalingState("have-local-offer") : t._updateSignalingState("stable"),
            Promise.resolve()
        },
        f.prototype.setRemoteDescription = function(n) {
            var r = this;
            if (["offer", "answer"].indexOf(n.type) === -1) return Promise.reject(c("TypeError", 'Unsupported type "' + n.type + '"'));
            if (!s("setRemoteDescription", n.type, r.signalingState) || r._isClosed) return Promise.reject(c("InvalidStateError", "Can not set remote " + n.type + " in state " + r.signalingState));
            var o = {};
            r.remoteStreams.forEach(function(e) {
                o[e.id] = e
            });
            var i = [],
            f = d.splitSections(n.sdp),
            h = f.shift(),
            m = d.matchPrefix(h, "a=ice-lite").length > 0,
            g = d.matchPrefix(h, "a=group:BUNDLE ").length > 0;
            r.usingBundle = g;
            var _ = d.matchPrefix(h, "a=ice-options:")[0];
            return _ ? r.canTrickleIceCandidates = _.substr(14).split(" ").indexOf("trickle") >= 0 : r.canTrickleIceCandidates = !1,
            f.forEach(function(s, c) {
                var p = d.splitLines(s),
                f = d.getKind(s),
                _ = d.isRejected(s) && 0 === d.matchPrefix(s, "a=bundle-only").length,
                v = p[0].substr(2).split(" ")[2],
                y = d.getDirection(s, h),
                w = d.parseMsid(s),
                b = d.getMid(s) || d.generateIdentifier();
                if ("application" === f && "DTLS/SCTP" === v || _) return void(r.transceivers[c] = {
                    mid: b,
                    kind: f,
                    rejected: !0
                }); ! _ && r.transceivers[c] && r.transceivers[c].rejected && (r.transceivers[c] = r._createTransceiver(f, !0));
                var S, C, x, T, k, R, A, j, E, M, I, P = d.parseRtpParameters(s);
                _ || (M = d.getIceParameters(s, h), I = d.getDtlsParameters(s, h), I.role = "client"),
                A = d.parseRtpEncodingParameters(s);
                var O = d.parseRtcpParameters(s),
                D = d.matchPrefix(s, "a=end-of-candidates", h).length > 0,
                L = d.matchPrefix(s, "a=candidate:").map(function(e) {
                    return d.parseCandidate(e)
                }).filter(function(e) {
                    return 1 === e.component
                });
                if (("offer" === n.type || "answer" === n.type) && !_ && g && c > 0 && r.transceivers[c] && (r._disposeIceAndDtlsTransports(c), r.transceivers[c].iceGatherer = r.transceivers[0].iceGatherer, r.transceivers[c].iceTransport = r.transceivers[0].iceTransport, r.transceivers[c].dtlsTransport = r.transceivers[0].dtlsTransport, r.transceivers[c].rtpSender && r.transceivers[c].rtpSender.setTransport(r.transceivers[0].dtlsTransport), r.transceivers[c].rtpReceiver && r.transceivers[c].rtpReceiver.setTransport(r.transceivers[0].dtlsTransport)), "offer" !== n.type || _)"answer" !== n.type || _ || (S = r.transceivers[c], C = S.iceGatherer, x = S.iceTransport, T = S.dtlsTransport, k = S.rtpReceiver, R = S.sendEncodingParameters, j = S.localCapabilities, r.transceivers[c].recvEncodingParameters = A, r.transceivers[c].remoteCapabilities = P, r.transceivers[c].rtcpParameters = O, L.length && "new" === x.state && (!m && !D || g && 0 !== c ? L.forEach(function(e) {
                    a(S.iceTransport, e)
                }) : x.setRemoteCandidates(L)), g && 0 !== c || ("new" === x.state && x.start(C, M, "controlling"), "new" === T.state && T.start(I)), r._transceive(S, "sendrecv" === y || "recvonly" === y, "sendrecv" === y || "sendonly" === y), !k || "sendrecv" !== y && "sendonly" !== y ? delete S.rtpReceiver: (E = k.track, w ? (o[w.stream] || (o[w.stream] = new e.MediaStream), u(E, o[w.stream]), i.push([E, k, o[w.stream]])) : (o.
            default || (o.
            default = new e.MediaStream), u(E, o.
            default), i.push([E, k, o.
            default]))));
                else {
                    S = r.transceivers[c] || r._createTransceiver(f),
                    S.mid = b,
                    S.iceGatherer || (S.iceGatherer = r._createIceGatherer(c, g)),
                    L.length && "new" === S.iceTransport.state && (!D || g && 0 !== c ? L.forEach(function(e) {
                        a(S.iceTransport, e)
                    }) : S.iceTransport.setRemoteCandidates(L)),
                    j = e.RTCRtpReceiver.getCapabilities(f),
                    t < 15019 && (j.codecs = j.codecs.filter(function(e) {
                        return "rtx" !== e.name
                    })),
                    R = S.sendEncodingParameters || [{
                        ssrc: 1001 * (2 * c + 2)
                    }];
                    var N = !1;
                    if ("sendrecv" === y || "sendonly" === y) {
                        if (N = !S.rtpReceiver, k = S.rtpReceiver || new e.RTCRtpReceiver(S.dtlsTransport, f), N) {
                            var B;
                            E = k.track,
                            w && "-" === w.stream || (w ? (o[w.stream] || (o[w.stream] = new e.MediaStream, Object.defineProperty(o[w.stream], "id", {
                                get: function() {
                                    return w.stream
                                }
                            })), Object.defineProperty(E, "id", {
                                get: function() {
                                    return w.track
                                }
                            }), B = o[w.stream]) : (o.
                        default || (o.
                        default = new e.MediaStream), B = o.
                        default)),
                            B && (u(E, B), S.associatedRemoteMediaStreams.push(B)),
                            i.push([E, k, B])
                        }
                    } else S.rtpReceiver && S.rtpReceiver.track && (S.associatedRemoteMediaStreams.forEach(function(e) {
                        var t = e.getTracks().find(function(e) {
                            return e.id === S.rtpReceiver.track.id
                        });
                        t && l(t, e)
                    }), S.associatedRemoteMediaStreams = []);
                    S.localCapabilities = j,
                    S.remoteCapabilities = P,
                    S.rtpReceiver = k,
                    S.rtcpParameters = O,
                    S.sendEncodingParameters = R,
                    S.recvEncodingParameters = A,
                    r._transceive(r.transceivers[c], !1, N)
                }
            }),
            void 0 === r._dtlsRole && (r._dtlsRole = "offer" === n.type ? "active": "passive"),
            r.remoteDescription = {
                type: n.type,
                sdp: n.sdp
            },
            "offer" === n.type ? r._updateSignalingState("have-remote-offer") : r._updateSignalingState("stable"),
            Object.keys(o).forEach(function(t) {
                var n = o[t];
                if (n.getTracks().length) {
                    if (r.remoteStreams.indexOf(n) === -1) {
                        r.remoteStreams.push(n);
                        var s = new Event("addstream");
                        s.stream = n,
                        e.setTimeout(function() {
                            r._dispatchEvent("addstream", s)
                        })
                    }
                    i.forEach(function(e) {
                        var t = e[0],
                        o = e[1];
                        n.id === e[2].id && p(r, t, o, [n])
                    })
                }
            }),
            i.forEach(function(e) {
                e[2] || p(r, e[0], e[1], [])
            }),
            e.setTimeout(function() {
                r && r.transceivers && r.transceivers.forEach(function(e) {
                    e.iceTransport && "new" === e.iceTransport.state && e.iceTransport.getRemoteCandidates().length > 0 && (console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"), e.iceTransport.addRemoteCandidate({}))
                })
            },
            4e3),
            Promise.resolve()
        },
        f.prototype.close = function() {
            this.transceivers.forEach(function(e) {
                e.iceTransport && e.iceTransport.stop(),
                e.dtlsTransport && e.dtlsTransport.stop(),
                e.rtpSender && e.rtpSender.stop(),
                e.rtpReceiver && e.rtpReceiver.stop()
            }),
            this._isClosed = !0,
            this._updateSignalingState("closed")
        },
        f.prototype._updateSignalingState = function(e) {
            this.signalingState = e;
            var t = new Event("signalingstatechange");
            this._dispatchEvent("signalingstatechange", t)
        },
        f.prototype._maybeFireNegotiationNeeded = function() {
            var t = this;
            "stable" === this.signalingState && this.needNegotiation !== !0 && (this.needNegotiation = !0, e.setTimeout(function() {
                if (t.needNegotiation) {
                    t.needNegotiation = !1;
                    var e = new Event("negotiationneeded");
                    t._dispatchEvent("negotiationneeded", e)
                }
            },
            0))
        },
        f.prototype._updateIceConnectionState = function() {
            var e, t = {
                new: 0,
                closed: 0,
                checking: 0,
                connected: 0,
                completed: 0,
                disconnected: 0,
                failed: 0
            };
            if (this.transceivers.forEach(function(e) {
                t[e.iceTransport.state]++
            }), e = "new", t.failed > 0 ? e = "failed": t.checking > 0 ? e = "checking": t.disconnected > 0 ? e = "disconnected": t.new > 0 ? e = "new": t.connected > 0 ? e = "connected": t.completed > 0 && (e = "completed"), e !== this.iceConnectionState) {
                this.iceConnectionState = e;
                var n = new Event("iceconnectionstatechange");
                this._dispatchEvent("iceconnectionstatechange", n)
            }
        },
        f.prototype._updateConnectionState = function() {
            var e, t = {
                new: 0,
                closed: 0,
                connecting: 0,
                connected: 0,
                completed: 0,
                disconnected: 0,
                failed: 0
            };
            if (this.transceivers.forEach(function(e) {
                t[e.iceTransport.state]++,
                t[e.dtlsTransport.state]++
            }), t.connected += t.completed, e = "new", t.failed > 0 ? e = "failed": t.connecting > 0 ? e = "connecting": t.disconnected > 0 ? e = "disconnected": t.new > 0 ? e = "new": t.connected > 0 && (e = "connected"), e !== this.connectionState) {
                this.connectionState = e;
                var n = new Event("connectionstatechange");
                this._dispatchEvent("connectionstatechange", n)
            }
        },
        f.prototype.createOffer = function() {
            var n = this;
            if (n._isClosed) return Promise.reject(c("InvalidStateError", "Can not call createOffer after close"));
            var o = n.transceivers.filter(function(e) {
                return "audio" === e.kind
            }).length,
            i = n.transceivers.filter(function(e) {
                return "video" === e.kind
            }).length,
            s = arguments[0];
            if (s) {
                if (s.mandatory || s.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
                void 0 !== s.offerToReceiveAudio && (o = s.offerToReceiveAudio === !0 ? 1 : s.offerToReceiveAudio === !1 ? 0 : s.offerToReceiveAudio),
                void 0 !== s.offerToReceiveVideo && (i = s.offerToReceiveVideo === !0 ? 1 : s.offerToReceiveVideo === !1 ? 0 : s.offerToReceiveVideo)
            }
            for (n.transceivers.forEach(function(e) {
                "audio" === e.kind ? (o--, o < 0 && (e.wantReceive = !1)) : "video" === e.kind && (i--, i < 0 && (e.wantReceive = !1))
            }); o > 0 || i > 0;) o > 0 && (n._createTransceiver("audio"), o--),
            i > 0 && (n._createTransceiver("video"), i--);
            var a = d.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++);
            n.transceivers.forEach(function(r, o) {
                var i = r.track,
                s = r.kind,
                a = r.mid || d.generateIdentifier();
                r.mid = a,
                r.iceGatherer || (r.iceGatherer = n._createIceGatherer(o, n.usingBundle));
                var c = e.RTCRtpSender.getCapabilities(s);
                t < 15019 && (c.codecs = c.codecs.filter(function(e) {
                    return "rtx" !== e.name
                })),
                c.codecs.forEach(function(e) {
                    "H264" === e.name && void 0 === e.parameters["level-asymmetry-allowed"] && (e.parameters["level-asymmetry-allowed"] = "1"),
                    r.remoteCapabilities && r.remoteCapabilities.codecs && r.remoteCapabilities.codecs.forEach(function(t) {
                        e.name.toLowerCase() === t.name.toLowerCase() && e.clockRate === t.clockRate && (e.preferredPayloadType = t.payloadType)
                    })
                }),
                c.headerExtensions.forEach(function(e) {
                    var t = r.remoteCapabilities && r.remoteCapabilities.headerExtensions || [];
                    t.forEach(function(t) {
                        e.uri === t.uri && (e.id = t.id)
                    })
                });
                var u = r.sendEncodingParameters || [{
                    ssrc: 1001 * (2 * o + 1)
                }];
                i && t >= 15019 && "video" === s && !u[0].rtx && (u[0].rtx = {
                    ssrc: u[0].ssrc + 1
                }),
                r.wantReceive && (r.rtpReceiver = new e.RTCRtpReceiver(r.dtlsTransport, s)),
                r.localCapabilities = c,
                r.sendEncodingParameters = u
            }),
            "max-compat" !== n._config.bundlePolicy && (a += "a=group:BUNDLE " + n.transceivers.map(function(e) {
                return e.mid
            }).join(" ") + "\r\n"),
            a += "a=ice-options:trickle\r\n",
            n.transceivers.forEach(function(e, t) {
                a += r(e, e.localCapabilities, "offer", e.stream, n._dtlsRole),
                a += "a=rtcp-rsize\r\n",
                !e.iceGatherer || "new" === n.iceGatheringState || 0 !== t && n.usingBundle || (e.iceGatherer.getLocalCandidates().forEach(function(e) {
                    e.component = 1,
                    a += "a=" + d.writeCandidate(e) + "\r\n"
                }), "completed" === e.iceGatherer.state && (a += "a=end-of-candidates\r\n"))
            });
            var u = new e.RTCSessionDescription({
                type: "offer",
                sdp: a
            });
            return Promise.resolve(u)
        },
        f.prototype.createAnswer = function() {
            var n = this;
            if (n._isClosed) return Promise.reject(c("InvalidStateError", "Can not call createAnswer after close"));
            if ("have-remote-offer" !== n.signalingState && "have-local-pranswer" !== n.signalingState) return Promise.reject(c("InvalidStateError", "Can not call createAnswer in signalingState " + n.signalingState));
            var o = d.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++);
            n.usingBundle && (o += "a=group:BUNDLE " + n.transceivers.map(function(e) {
                return e.mid
            }).join(" ") + "\r\n");
            var s = d.getMediaSections(n.remoteDescription.sdp).length;
            n.transceivers.forEach(function(e, a) {
                if (! (a + 1 > s)) {
                    if (e.rejected) return "application" === e.kind ? o += "m=application 0 DTLS/SCTP 5000\r\n": "audio" === e.kind ? o += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n": "video" === e.kind && (o += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"),
                    void(o += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + e.mid + "\r\n");
                    if (e.stream) {
                        var c;
                        "audio" === e.kind ? c = e.stream.getAudioTracks()[0] : "video" === e.kind && (c = e.stream.getVideoTracks()[0]),
                        c && t >= 15019 && "video" === e.kind && !e.sendEncodingParameters[0].rtx && (e.sendEncodingParameters[0].rtx = {
                            ssrc: e.sendEncodingParameters[0].ssrc + 1
                        })
                    }
                    var d = i(e.localCapabilities, e.remoteCapabilities),
                    u = d.codecs.filter(function(e) {
                        return "rtx" === e.name.toLowerCase()
                    }).length; ! u && e.sendEncodingParameters[0].rtx && delete e.sendEncodingParameters[0].rtx,
                    o += r(e, d, "answer", e.stream, n._dtlsRole),
                    e.rtcpParameters && e.rtcpParameters.reducedSize && (o += "a=rtcp-rsize\r\n")
                }
            });
            var a = new e.RTCSessionDescription({
                type: "answer",
                sdp: o
            });
            return Promise.resolve(a)
        },
        f.prototype.addIceCandidate = function(e) {
            var t, n = this;
            return e && void 0 === e.sdpMLineIndex && !e.sdpMid ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required")) : new Promise(function(r, o) {
                if (!n.remoteDescription) return o(c("InvalidStateError", "Can not add ICE candidate without a remote description"));
                if (e && "" !== e.candidate) {
                    var i = e.sdpMLineIndex;
                    if (e.sdpMid) for (var s = 0; s < n.transceivers.length; s++) if (n.transceivers[s].mid === e.sdpMid) {
                        i = s;
                        break
                    }
                    var u = n.transceivers[i];
                    if (!u) return o(c("OperationError", "Can not add ICE candidate"));
                    if (u.rejected) return r();
                    var l = Object.keys(e.candidate).length > 0 ? d.parseCandidate(e.candidate) : {};
                    if ("tcp" === l.protocol && (0 === l.port || 9 === l.port)) return r();
                    if (l.component && 1 !== l.component) return r();
                    if ((0 === i || i > 0 && u.iceTransport !== n.transceivers[0].iceTransport) && !a(u.iceTransport, l)) return o(c("OperationError", "Can not add ICE candidate"));
                    var p = e.candidate.trim();
                    0 === p.indexOf("a=") && (p = p.substr(2)),
                    t = d.getMediaSections(n.remoteDescription.sdp),
                    t[i] += "a=" + (l.type ? p: "end-of-candidates") + "\r\n",
                    n.remoteDescription.sdp = d.getDescription(n.remoteDescription.sdp) + t.join("")
                } else for (var f = 0; f < n.transceivers.length && (n.transceivers[f].rejected || (n.transceivers[f].iceTransport.addRemoteCandidate({}), t = d.getMediaSections(n.remoteDescription.sdp), t[f] += "a=end-of-candidates\r\n", n.remoteDescription.sdp = d.getDescription(n.remoteDescription.sdp) + t.join(""), !n.usingBundle)); f++);
                r()
            })
        },
        f.prototype.getStats = function(t) {
            if (t && t instanceof e.MediaStreamTrack) {
                var n = null;
                if (this.transceivers.forEach(function(e) {
                    e.rtpSender && e.rtpSender.track === t ? n = e.rtpSender: e.rtpReceiver && e.rtpReceiver.track === t && (n = e.rtpReceiver)
                }), !n) throw c("InvalidAccessError", "Invalid selector.");
                return n.getStats()
            }
            var r = [];
            return this.transceivers.forEach(function(e) { ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function(t) {
                    e[t] && r.push(e[t].getStats())
                })
            }),
            Promise.all(r).then(function(e) {
                var t = new Map;
                return e.forEach(function(e) {
                    e.forEach(function(e) {
                        t.set(e.id, e)
                    })
                }),
                t
            })
        };
        var h = ["RTCRtpSender", "RTCRtpReceiver", "RTCIceGatherer", "RTCIceTransport", "RTCDtlsTransport"];
        h.forEach(function(t) {
            var r = e[t];
            if (r && r.prototype && r.prototype.getStats) {
                var o = r.prototype.getStats;
                r.prototype.getStats = function() {
                    return o.apply(this).then(function(e) {
                        var t = new Map;
                        return Object.keys(e).forEach(function(r) {
                            e[r].type = n(e[r]),
                            t.set(r, e[r])
                        }),
                        t
                    })
                }
            }
        });
        var m = ["createOffer", "createAnswer"];
        return m.forEach(function(e) {
            var t = f.prototype[e];
            f.prototype[e] = function() {
                var e = arguments;
                return "function" == typeof e[0] || "function" == typeof e[1] ? t.apply(this, [arguments[2]]).then(function(t) {
                    "function" == typeof e[0] && e[0].apply(null, [t])
                },
                function(t) {
                    "function" == typeof e[1] && e[1].apply(null, [t])
                }) : t.apply(this, arguments)
            }
        }),
        m = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"],
        m.forEach(function(e) {
            var t = f.prototype[e];
            f.prototype[e] = function() {
                var e = arguments;
                return "function" == typeof e[1] || "function" == typeof e[2] ? t.apply(this, arguments).then(function() {
                    "function" == typeof e[1] && e[1].apply(null)
                },
                function(t) {
                    "function" == typeof e[2] && e[2].apply(null, [t])
                }) : t.apply(this, arguments)
            }
        }),
        ["getStats"].forEach(function(e) {
            var t = f.prototype[e];
            f.prototype[e] = function() {
                var e = arguments;
                return "function" == typeof e[1] ? t.apply(this, arguments).then(function() {
                    "function" == typeof e[1] && e[1].apply(null)
                }) : t.apply(this, arguments)
            }
        }),
        f
    }
},
function(e, exports, t) {
    "use strict";
    var n = {};
    n.generateIdentifier = function() {
        return Math.random().toString(36).substr(2, 10)
    },
    n.localCName = n.generateIdentifier(),
    n.splitLines = function(e) {
        return e.trim().split("\n").map(function(e) {
            return e.trim()
        })
    },
    n.splitSections = function(e) {
        var t = e.split("\nm=");
        return t.map(function(e, t) {
            return (t > 0 ? "m=" + e: e).trim() + "\r\n"
        })
    },
    n.getDescription = function(e) {
        var t = n.splitSections(e);
        return t && t[0]
    },
    n.getMediaSections = function(e) {
        var t = n.splitSections(e);
        return t.shift(),
        t
    },
    n.matchPrefix = function(e, t) {
        return n.splitLines(e).filter(function(e) {
            return 0 === e.indexOf(t)
        })
    },
    n.parseCandidate = function(e) {
        var t;
        t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" ");
        for (var n = {
            foundation: t[0],
            component: parseInt(t[1], 10),
            protocol: t[2].toLowerCase(),
            priority: parseInt(t[3], 10),
            ip: t[4],
            port: parseInt(t[5], 10),
            type: t[7]
        },
        r = 8; r < t.length; r += 2) switch (t[r]) {
        case "raddr":
            n.relatedAddress = t[r + 1];
            break;
        case "rport":
            n.relatedPort = parseInt(t[r + 1], 10);
            break;
        case "tcptype":
            n.tcpType = t[r + 1];
            break;
        case "ufrag":
            n.ufrag = t[r + 1],
            n.usernameFragment = t[r + 1];
            break;
        default:
            n[t[r]] = t[r + 1]
        }
        return n
    },
    n.writeCandidate = function(e) {
        var t = [];
        t.push(e.foundation),
        t.push(e.component),
        t.push(e.protocol.toUpperCase()),
        t.push(e.priority),
        t.push(e.ip),
        t.push(e.port);
        var n = e.type;
        return t.push("typ"),
        t.push(n),
        "host" !== n && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)),
        e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)),
        (e.usernameFragment || e.ufrag) && (t.push("ufrag"), t.push(e.usernameFragment || e.ufrag)),
        "candidate:" + t.join(" ")
    },
    n.parseIceOptions = function(e) {
        return e.substr(14).split(" ")
    },
    n.parseRtpMap = function(e) {
        var t = e.substr(9).split(" "),
        n = {
            payloadType: parseInt(t.shift(), 10)
        };
        return t = t[0].split("/"),
        n.name = t[0],
        n.clockRate = parseInt(t[1], 10),
        n.numChannels = 3 === t.length ? parseInt(t[2], 10) : 1,
        n
    },
    n.writeRtpMap = function(e) {
        var t = e.payloadType;
        return void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType),
        "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== e.numChannels ? "/" + e.numChannels: "") + "\r\n"
    },
    n.parseExtmap = function(e) {
        var t = e.substr(9).split(" ");
        return {
            id: parseInt(t[0], 10),
            direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
            uri: t[1]
        }
    },
    n.writeExtmap = function(e) {
        return "a=extmap:" + (e.id || e.preferredId) + (e.direction && "sendrecv" !== e.direction ? "/" + e.direction: "") + " " + e.uri + "\r\n"
    },
    n.parseFmtp = function(e) {
        for (var t, n = {},
        r = e.substr(e.indexOf(" ") + 1).split(";"), o = 0; o < r.length; o++) t = r[o].trim().split("="),
        n[t[0].trim()] = t[1];
        return n
    },
    n.writeFmtp = function(e) {
        var t = "",
        n = e.payloadType;
        if (void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.parameters && Object.keys(e.parameters).length) {
            var r = [];
            Object.keys(e.parameters).forEach(function(t) {
                e.parameters[t] ? r.push(t + "=" + e.parameters[t]) : r.push(t)
            }),
            t += "a=fmtp:" + n + " " + r.join(";") + "\r\n"
        }
        return t
    },
    n.parseRtcpFb = function(e) {
        var t = e.substr(e.indexOf(" ") + 1).split(" ");
        return {
            type: t.shift(),
            parameter: t.join(" ")
        }
    },
    n.writeRtcpFb = function(e) {
        var t = "",
        n = e.payloadType;
        return void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType),
        e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(function(e) {
            t += "a=rtcp-fb:" + n + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter: "") + "\r\n"
        }),
        t
    },
    n.parseSsrcMedia = function(e) {
        var t = e.indexOf(" "),
        n = {
            ssrc: parseInt(e.substr(7, t - 7), 10)
        },
        r = e.indexOf(":", t);
        return r > -1 ? (n.attribute = e.substr(t + 1, r - t - 1), n.value = e.substr(r + 1)) : n.attribute = e.substr(t + 1),
        n
    },
    n.getMid = function(e) {
        var t = n.matchPrefix(e, "a=mid:")[0];
        if (t) return t.substr(6)
    },
    n.parseFingerprint = function(e) {
        var t = e.substr(14).split(" ");
        return {
            algorithm: t[0].toLowerCase(),
            value: t[1]
        }
    },
    n.getDtlsParameters = function(e, t) {
        var r = n.matchPrefix(e + t, "a=fingerprint:");
        return {
            role: "auto",
            fingerprints: r.map(n.parseFingerprint)
        }
    },
    n.writeDtlsParameters = function(e, t) {
        var n = "a=setup:" + t + "\r\n";
        return e.fingerprints.forEach(function(e) {
            n += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
        }),
        n
    },
    n.getIceParameters = function(e, t) {
        var r = n.splitLines(e);
        r = r.concat(n.splitLines(t));
        var o = {
            usernameFragment: r.filter(function(e) {
                return 0 === e.indexOf("a=ice-ufrag:")
            })[0].substr(12),
            password: r.filter(function(e) {
                return 0 === e.indexOf("a=ice-pwd:")
            })[0].substr(10)
        };
        return o
    },
    n.writeIceParameters = function(e) {
        return "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n"
    },
    n.parseRtpParameters = function(e) {
        for (var t = {
            codecs: [],
            headerExtensions: [],
            fecMechanisms: [],
            rtcp: []
        },
        r = n.splitLines(e), o = r[0].split(" "), i = 3; i < o.length; i++) {
            var s = o[i],
            a = n.matchPrefix(e, "a=rtpmap:" + s + " ")[0];
            if (a) {
                var c = n.parseRtpMap(a),
                d = n.matchPrefix(e, "a=fmtp:" + s + " ");
                switch (c.parameters = d.length ? n.parseFmtp(d[0]) : {},
                c.rtcpFeedback = n.matchPrefix(e, "a=rtcp-fb:" + s + " ").map(n.parseRtcpFb), t.codecs.push(c), c.name.toUpperCase()) {
                case "RED":
                case "ULPFEC":
                    t.fecMechanisms.push(c.name.toUpperCase())
                }
            }
        }
        return n.matchPrefix(e, "a=extmap:").forEach(function(e) {
            t.headerExtensions.push(n.parseExtmap(e))
        }),
        t
    },
    n.writeRtpDescription = function(e, t) {
        var r = "";
        r += "m=" + e + " ",
        r += t.codecs.length > 0 ? "9": "0",
        r += " UDP/TLS/RTP/SAVPF ",
        r += t.codecs.map(function(e) {
            return void 0 !== e.preferredPayloadType ? e.preferredPayloadType: e.payloadType
        }).join(" ") + "\r\n",
        r += "c=IN IP4 0.0.0.0\r\n",
        r += "a=rtcp:9 IN IP4 0.0.0.0\r\n",
        t.codecs.forEach(function(e) {
            r += n.writeRtpMap(e),
            r += n.writeFmtp(e),
            r += n.writeRtcpFb(e)
        });
        var o = 0;
        return t.codecs.forEach(function(e) {
            e.maxptime > o && (o = e.maxptime)
        }),
        o > 0 && (r += "a=maxptime:" + o + "\r\n"),
        r += "a=rtcp-mux\r\n",
        t.headerExtensions.forEach(function(e) {
            r += n.writeExtmap(e)
        }),
        r
    },
    n.parseRtpEncodingParameters = function(e) {
        var t, r = [],
        o = n.parseRtpParameters(e),
        i = o.fecMechanisms.indexOf("RED") !== -1,
        s = o.fecMechanisms.indexOf("ULPFEC") !== -1,
        a = n.matchPrefix(e, "a=ssrc:").map(function(e) {
            return n.parseSsrcMedia(e)
        }).filter(function(e) {
            return "cname" === e.attribute
        }),
        c = a.length > 0 && a[0].ssrc,
        d = n.matchPrefix(e, "a=ssrc-group:FID").map(function(e) {
            var t = e.substr(17).split(" ");
            return t.map(function(e) {
                return parseInt(e, 10)
            })
        });
        d.length > 0 && d[0].length > 1 && d[0][0] === c && (t = d[0][1]),
        o.codecs.forEach(function(e) {
            if ("RTX" === e.name.toUpperCase() && e.parameters.apt) {
                var n = {
                    ssrc: c,
                    codecPayloadType: parseInt(e.parameters.apt, 10)
                };
                c && t && (n.rtx = {
                    ssrc: t
                }),
                r.push(n),
                i && (n = JSON.parse(JSON.stringify(n)), n.fec = {
                    ssrc: t,
                    mechanism: s ? "red+ulpfec": "red"
                },
                r.push(n))
            }
        }),
        0 === r.length && c && r.push({
            ssrc: c
        });
        var u = n.matchPrefix(e, "b=");
        return u.length && (u = 0 === u[0].indexOf("b=TIAS:") ? parseInt(u[0].substr(7), 10) : 0 === u[0].indexOf("b=AS:") ? 1e3 * parseInt(u[0].substr(5), 10) * .95 - 16e3: void 0, r.forEach(function(e) {
            e.maxBitrate = u
        })),
        r
    },
    n.parseRtcpParameters = function(e) {
        var t = {},
        r = n.matchPrefix(e, "a=ssrc:").map(function(e) {
            return n.parseSsrcMedia(e)
        }).filter(function(e) {
            return "cname" === e.attribute
        })[0];
        r && (t.cname = r.value, t.ssrc = r.ssrc);
        var o = n.matchPrefix(e, "a=rtcp-rsize");
        t.reducedSize = o.length > 0,
        t.compound = 0 === o.length;
        var i = n.matchPrefix(e, "a=rtcp-mux");
        return t.mux = i.length > 0,
        t
    },
    n.parseMsid = function(e) {
        var t, r = n.matchPrefix(e, "a=msid:");
        if (1 === r.length) return t = r[0].substr(7).split(" "),
        {
            stream: t[0],
            track: t[1]
        };
        var o = n.matchPrefix(e, "a=ssrc:").map(function(e) {
            return n.parseSsrcMedia(e)
        }).filter(function(e) {
            return "msid" === e.attribute
        });
        return o.length > 0 ? (t = o[0].value.split(" "), {
            stream: t[0],
            track: t[1]
        }) : void 0
    },
    n.generateSessionId = function() {
        return Math.random().toString().substr(2, 21)
    },
    n.writeSessionBoilerplate = function(e, t) {
        var r, o = void 0 !== t ? t: 2;
        return r = e ? e: n.generateSessionId(),
        "v=0\r\no=thisisadapterortc " + r + " " + o + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
    },
    n.writeMediaSection = function(e, t, r, o) {
        var i = n.writeRtpDescription(e.kind, t);
        if (i += n.writeIceParameters(e.iceGatherer.getLocalParameters()), i += n.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === r ? "actpass": "active"), i += "a=mid:" + e.mid + "\r\n", i += e.direction ? "a=" + e.direction + "\r\n": e.rtpSender && e.rtpReceiver ? "a=sendrecv\r\n": e.rtpSender ? "a=sendonly\r\n": e.rtpReceiver ? "a=recvonly\r\n": "a=inactive\r\n", e.rtpSender) {
            var s = "msid:" + o.id + " " + e.rtpSender.track.id + "\r\n";
            i += "a=" + s,
            i += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + s,
            e.sendEncodingParameters[0].rtx && (i += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + s, i += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
        }
        return i += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + n.localCName + "\r\n",
        e.rtpSender && e.sendEncodingParameters[0].rtx && (i += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + n.localCName + "\r\n"),
        i
    },
    n.getDirection = function(e, t) {
        for (var r = n.splitLines(e), o = 0; o < r.length; o++) switch (r[o]) {
        case "a=sendrecv":
        case "a=sendonly":
        case "a=recvonly":
        case "a=inactive":
            return r[o].substr(2)
        }
        return t ? n.getDirection(t) : "sendrecv"
    },
    n.getKind = function(e) {
        var t = n.splitLines(e),
        r = t[0].split(" ");
        return r[0].substr(2)
    },
    n.isRejected = function(e) {
        return "0" === e.split(" ", 2)[1]
    },
    n.parseMLine = function(e) {
        var t = n.splitLines(e),
        r = t[0].substr(2).split(" ");
        return {
            kind: r[0],
            port: parseInt(r[1], 10),
            protocol: r[2],
            fmt: r.slice(3).join(" ")
        }
    },
    n.parseOLine = function(e) {
        var t = n.matchPrefix(e, "o=")[0],
        r = t.substr(2).split(" ");
        return {
            username: r[0],
            sessionId: r[1],
            sessionVersion: parseInt(r[2], 10),
            netType: r[3],
            addressType: r[4],
            address: r[5]
        }
    },
    e.exports = n
},
function(e, exports) {
    "use strict";
    e.exports = function(e) {
        var t = e && e.navigator,
        n = function(e) {
            return {
                name: {
                    PermissionDeniedError: "NotAllowedError"
                } [e.name] || e.name,
                message: e.message,
                constraint: e.constraint,
                toString: function() {
                    return this.name
                }
            }
        },
        r = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
        t.mediaDevices.getUserMedia = function(e) {
            return r(e).
            catch(function(e) {
                return Promise.reject(n(e))
            })
        }
    }
},
function(e, exports, t) {
    "use strict";
    var n = t(15);
    e.exports = {
        shimGetUserMedia: t(23),
        shimOnTrack: function(e) {
            "object" != typeof e || !e.RTCPeerConnection || "ontrack" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
                get: function() {
                    return this._ontrack
                },
                set: function(e) {
                    this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)),
                    this.addEventListener("track", this._ontrack = e),
                    this.addEventListener("addstream", this._ontrackpoly = function(e) {
                        e.stream.getTracks().forEach(function(t) {
                            var n = new Event("track");
                            n.track = t,
                            n.receiver = {
                                track: t
                            },
                            n.transceiver = {
                                receiver: n.receiver
                            },
                            n.streams = [e.stream],
                            this.dispatchEvent(n)
                        }.bind(this))
                    }.bind(this))
                }
            }),
            "object" == typeof e && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
                get: function() {
                    return {
                        receiver: this.receiver
                    }
                }
            })
        },
        shimSourceObject: function(e) {
            "object" == typeof e && (!e.HTMLMediaElement || "srcObject" in e.HTMLMediaElement.prototype || Object.defineProperty(e.HTMLMediaElement.prototype, "srcObject", {
                get: function() {
                    return this.mozSrcObject
                },
                set: function(e) {
                    this.mozSrcObject = e
                }
            }))
        },
        shimPeerConnection: function(e) {
            var t = n.detectBrowser(e);
            if ("object" == typeof e && (e.RTCPeerConnection || e.mozRTCPeerConnection)) {
                e.RTCPeerConnection || (e.RTCPeerConnection = function(n, r) {
                    if (t.version < 38 && n && n.iceServers) {
                        for (var o = [], i = 0; i < n.iceServers.length; i++) {
                            var s = n.iceServers[i];
                            if (s.hasOwnProperty("urls")) for (var a = 0; a < s.urls.length; a++) {
                                var c = {
                                    url: s.urls[a]
                                };
                                0 === s.urls[a].indexOf("turn") && (c.username = s.username, c.credential = s.credential),
                                o.push(c)
                            } else o.push(n.iceServers[i])
                        }
                        n.iceServers = o
                    }
                    return new e.mozRTCPeerConnection(n, r)
                },
                e.RTCPeerConnection.prototype = e.mozRTCPeerConnection.prototype, e.mozRTCPeerConnection.generateCertificate && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
                    get: function() {
                        return e.mozRTCPeerConnection.generateCertificate
                    }
                }), e.RTCSessionDescription = e.mozRTCSessionDescription, e.RTCIceCandidate = e.mozRTCIceCandidate),
                ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
                    var n = e.RTCPeerConnection.prototype[t];
                    e.RTCPeerConnection.prototype[t] = function() {
                        return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate: e.RTCSessionDescription)(arguments[0]),
                        n.apply(this, arguments)
                    }
                });
                var r = e.RTCPeerConnection.prototype.addIceCandidate;
                e.RTCPeerConnection.prototype.addIceCandidate = function() {
                    return arguments[0] ? r.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
                };
                var o = function(e) {
                    var t = new Map;
                    return Object.keys(e).forEach(function(n) {
                        t.set(n, e[n]),
                        t[n] = e[n]
                    }),
                    t
                },
                i = {
                    inboundrtp: "inbound-rtp",
                    outboundrtp: "outbound-rtp",
                    candidatepair: "candidate-pair",
                    localcandidate: "local-candidate",
                    remotecandidate: "remote-candidate"
                },
                s = e.RTCPeerConnection.prototype.getStats;
                e.RTCPeerConnection.prototype.getStats = function(e, n, r) {
                    return s.apply(this, [e || null]).then(function(e) {
                        if (t.version < 48 && (e = o(e)), t.version < 53 && !n) try {
                            e.forEach(function(e) {
                                e.type = i[e.type] || e.type
                            })
                        } catch(t) {
                            if ("TypeError" !== t.name) throw t;
                            e.forEach(function(t, n) {
                                e.set(n, Object.assign({},
                                t, {
                                    type: i[t.type] || t.type
                                }))
                            })
                        }
                        return e
                    }).then(n, r)
                }
            }
        },
        shimRemoveStream: function(e) { ! e.RTCPeerConnection || "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
                var t = this;
                n.deprecated("removeStream", "removeTrack"),
                this.getSenders().forEach(function(n) {
                    n.track && e.getTracks().indexOf(n.track) !== -1 && t.removeTrack(n)
                })
            })
        }
    }
},
function(e, exports, t) {
    "use strict";
    var n = t(15),
    r = n.log;
    e.exports = function(e) {
        var t = n.detectBrowser(e),
        o = e && e.navigator,
        i = e && e.MediaStreamTrack,
        s = function(e) {
            return {
                name: {
                    InternalError: "NotReadableError",
                    NotSupportedError: "TypeError",
                    PermissionDeniedError: "NotAllowedError",
                    SecurityError: "NotAllowedError"
                } [e.name] || e.name,
                message: {
                    "The operation is insecure.": "The request is not allowed by the user agent or the platform in the current context."
                } [e.message] || e.message,
                constraint: e.constraint,
                toString: function() {
                    return this.name + (this.message && ": ") + this.message
                }
            }
        },
        a = function(e, n, i) {
            var a = function(e) {
                if ("object" != typeof e || e.require) return e;
                var require = [];
                return Object.keys(e).forEach(function(t) {
                    if ("require" !== t && "advanced" !== t && "mediaSource" !== t) {
                        var n = e[t] = "object" == typeof e[t] ? e[t] : {
                            ideal: e[t]
                        };
                        if (void 0 === n.min && void 0 === n.max && void 0 === n.exact || require.push(t), void 0 !== n.exact && ("number" == typeof n.exact ? n.min = n.max = n.exact: e[t] = n.exact, delete n.exact), void 0 !== n.ideal) {
                            e.advanced = e.advanced || [];
                            var r = {};
                            "number" == typeof n.ideal ? r[t] = {
                                min: n.ideal,
                                max: n.ideal
                            }: r[t] = n.ideal,
                            e.advanced.push(r),
                            delete n.ideal,
                            Object.keys(n).length || delete e[t]
                        }
                    }
                }),
                require.length && (e.require = require),
                e
            };
            return e = JSON.parse(JSON.stringify(e)),
            t.version < 38 && (r("spec: " + JSON.stringify(e)), e.audio && (e.audio = a(e.audio)), e.video && (e.video = a(e.video)), r("ff37: " + JSON.stringify(e))),
            o.mozGetUserMedia(e, n,
            function(e) {
                i(s(e))
            })
        },
        c = function(e) {
            return new Promise(function(t, n) {
                a(e, t, n)
            })
        };
        if (o.mediaDevices || (o.mediaDevices = {
            getUserMedia: c,
            addEventListener: function() {},
            removeEventListener: function() {}
        }), o.mediaDevices.enumerateDevices = o.mediaDevices.enumerateDevices ||
        function() {
            return new Promise(function(e) {
                var t = [{
                    kind: "audioinput",
                    deviceId: "default",
                    label: "",
                    groupId: ""
                },
                {
                    kind: "videoinput",
                    deviceId: "default",
                    label: "",
                    groupId: ""
                }];
                e(t)
            })
        },
        t.version < 41) {
            var d = o.mediaDevices.enumerateDevices.bind(o.mediaDevices);
            o.mediaDevices.enumerateDevices = function() {
                return d().then(void 0,
                function(e) {
                    if ("NotFoundError" === e.name) return [];
                    throw e
                })
            }
        }
        if (t.version < 49) {
            var u = o.mediaDevices.getUserMedia.bind(o.mediaDevices);
            o.mediaDevices.getUserMedia = function(e) {
                return u(e).then(function(t) {
                    if (e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length) throw t.getTracks().forEach(function(e) {
                        e.stop()
                    }),
                    new DOMException("The object can not be found here.", "NotFoundError");
                    return t
                },
                function(e) {
                    return Promise.reject(s(e))
                })
            }
        }
        if (! (t.version > 55 && "autoGainControl" in o.mediaDevices.getSupportedConstraints())) {
            var l = function(e, t, n) {
                t in e && !(n in e) && (e[n] = e[t], delete e[t])
            },
            p = o.mediaDevices.getUserMedia.bind(o.mediaDevices);
            if (o.mediaDevices.getUserMedia = function(e) {
                return "object" == typeof e && "object" == typeof e.audio && (e = JSON.parse(JSON.stringify(e)), l(e.audio, "autoGainControl", "mozAutoGainControl"), l(e.audio, "noiseSuppression", "mozNoiseSuppression")),
                p(e)
            },
            i && i.prototype.getSettings) {
                var f = i.prototype.getSettings;
                i.prototype.getSettings = function() {
                    var e = f.apply(this, arguments);
                    return l(e, "mozAutoGainControl", "autoGainControl"),
                    l(e, "mozNoiseSuppression", "noiseSuppression"),
                    e
                }
            }
            if (i && i.prototype.applyConstraints) {
                var h = i.prototype.applyConstraints;
                i.prototype.applyConstraints = function(e) {
                    return "audio" === this.kind && "object" == typeof e && (e = JSON.parse(JSON.stringify(e)), l(e, "autoGainControl", "mozAutoGainControl"), l(e, "noiseSuppression", "mozNoiseSuppression")),
                    h.apply(this, [e])
                }
            }
        }
        o.getUserMedia = function(e, r, i) {
            return t.version < 44 ? a(e, r, i) : (n.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), void o.mediaDevices.getUserMedia(e).then(r, i))
        }
    }
},
function(e, exports, t) {
    "use strict";
    var n = t(15);
    e.exports = {
        shimLocalStreamsAPI: function(e) {
            if ("object" == typeof e && e.RTCPeerConnection) {
                if ("getLocalStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getLocalStreams = function() {
                    return this._localStreams || (this._localStreams = []),
                    this._localStreams
                }), "getStreamById" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getStreamById = function(e) {
                    var t = null;
                    return this._localStreams && this._localStreams.forEach(function(n) {
                        n.id === e && (t = n)
                    }),
                    this._remoteStreams && this._remoteStreams.forEach(function(n) {
                        n.id === e && (t = n)
                    }),
                    t
                }), !("addStream" in e.RTCPeerConnection.prototype)) {
                    var t = e.RTCPeerConnection.prototype.addTrack;
                    e.RTCPeerConnection.prototype.addStream = function(e) {
                        this._localStreams || (this._localStreams = []),
                        this._localStreams.indexOf(e) === -1 && this._localStreams.push(e);
                        var n = this;
                        e.getTracks().forEach(function(r) {
                            t.call(n, r, e)
                        })
                    },
                    e.RTCPeerConnection.prototype.addTrack = function(e, n) {
                        return n && (this._localStreams ? this._localStreams.indexOf(n) === -1 && this._localStreams.push(n) : this._localStreams = [n]),
                        t.call(this, e, n)
                    }
                }
                "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
                    this._localStreams || (this._localStreams = []);
                    var t = this._localStreams.indexOf(e);
                    if (t !== -1) {
                        this._localStreams.splice(t, 1);
                        var n = this,
                        r = e.getTracks();
                        this.getSenders().forEach(function(e) {
                            r.indexOf(e.track) !== -1 && n.removeTrack(e)
                        })
                    }
                })
            }
        },
        shimRemoteStreamsAPI: function(e) {
            "object" == typeof e && e.RTCPeerConnection && ("getRemoteStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getRemoteStreams = function() {
                return this._remoteStreams ? this._remoteStreams: []
            }), "onaddstream" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", {
                get: function() {
                    return this._onaddstream
                },
                set: function(e) {
                    var t = this;
                    this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)),
                    this.addEventListener("addstream", this._onaddstream = e),
                    this.addEventListener("track", this._onaddstreampoly = function(e) {
                        e.streams.forEach(function(e) {
                            if (t._remoteStreams || (t._remoteStreams = []), !(t._remoteStreams.indexOf(e) >= 0)) {
                                t._remoteStreams.push(e);
                                var n = new Event("addstream");
                                n.stream = e,
                                t.dispatchEvent(n)
                            }
                        })
                    })
                }
            }))
        },
        shimCallbacksAPI: function(e) {
            if ("object" == typeof e && e.RTCPeerConnection) {
                var t = e.RTCPeerConnection.prototype,
                n = t.createOffer,
                r = t.createAnswer,
                o = t.setLocalDescription,
                i = t.setRemoteDescription,
                s = t.addIceCandidate;
                t.createOffer = function(e, t) {
                    var r = arguments.length >= 2 ? arguments[2] : arguments[0],
                    o = n.apply(this, [r]);
                    return t ? (o.then(e, t), Promise.resolve()) : o
                },
                t.createAnswer = function(e, t) {
                    var n = arguments.length >= 2 ? arguments[2] : arguments[0],
                    o = r.apply(this, [n]);
                    return t ? (o.then(e, t), Promise.resolve()) : o
                };
                var a = function(e, t, n) {
                    var r = o.apply(this, [e]);
                    return n ? (r.then(t, n), Promise.resolve()) : r
                };
                t.setLocalDescription = a,
                a = function(e, t, n) {
                    var r = i.apply(this, [e]);
                    return n ? (r.then(t, n), Promise.resolve()) : r
                },
                t.setRemoteDescription = a,
                a = function(e, t, n) {
                    var r = s.apply(this, [e]);
                    return n ? (r.then(t, n), Promise.resolve()) : r
                },
                t.addIceCandidate = a
            }
        },
        shimGetUserMedia: function(e) {
            var t = e && e.navigator;
            t.getUserMedia || (t.webkitGetUserMedia ? t.getUserMedia = t.webkitGetUserMedia.bind(t) : t.mediaDevices && t.mediaDevices.getUserMedia && (t.getUserMedia = function(e, n, r) {
                t.mediaDevices.getUserMedia(e).then(n, r)
            }.bind(t)))
        },
        shimRTCIceServerUrls: function(e) {
            var t = e.RTCPeerConnection;
            e.RTCPeerConnection = function(e, r) {
                if (e && e.iceServers) {
                    for (var o = [], i = 0; i < e.iceServers.length; i++) {
                        var s = e.iceServers[i]; ! s.hasOwnProperty("urls") && s.hasOwnProperty("url") ? (n.deprecated("RTCIceServer.url", "RTCIceServer.urls"), s = JSON.parse(JSON.stringify(s)), s.urls = s.url, delete s.url, o.push(s)) : o.push(e.iceServers[i])
                    }
                    e.iceServers = o
                }
                return new t(e, r)
            },
            e.RTCPeerConnection.prototype = t.prototype,
            "generateCertificate" in e.RTCPeerConnection && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
                get: function() {
                    return t.generateCertificate
                }
            })
        },
        shimTrackEventTransceiver: function(e) {
            "object" == typeof e && e.RTCPeerConnection && "receiver" in e.RTCTrackEvent.prototype && !e.RTCTransceiver && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
                get: function() {
                    return {
                        receiver: this.receiver
                    }
                }
            })
        },
        shimCreateOfferLegacy: function(e) {
            var t = e.RTCPeerConnection.prototype.createOffer;
            e.RTCPeerConnection.prototype.createOffer = function(e) {
                var n = this;
                if (e) {
                    "undefined" != typeof e.offerToReceiveAudio && (e.offerToReceiveAudio = !!e.offerToReceiveAudio);
                    var r = n.getTransceivers().find(function(e) {
                        return e.sender.track && "audio" === e.sender.track.kind
                    });
                    e.offerToReceiveAudio === !1 && r ? "sendrecv" === r.direction ? r.setDirection ? r.setDirection("sendonly") : r.direction = "sendonly": "recvonly" === r.direction && (r.setDirection ? r.setDirection("inactive") : r.direction = "inactive") : e.offerToReceiveAudio !== !0 || r || n.addTransceiver("audio"),
                    "undefined" != typeof e.offerToReceiveAudio && (e.offerToReceiveVideo = !!e.offerToReceiveVideo);
                    var o = n.getTransceivers().find(function(e) {
                        return e.sender.track && "video" === e.sender.track.kind
                    });
                    e.offerToReceiveVideo === !1 && o ? "sendrecv" === o.direction ? o.setDirection("sendonly") : "recvonly" === o.direction && o.setDirection("inactive") : e.offerToReceiveVideo !== !0 || o || n.addTransceiver("video")
                }
                return t.apply(n, arguments)
            }
        }
    }
},
function(e, exports, t) {
    "use strict";
    var n = t(20),
    r = t(15);
    e.exports = {
        shimRTCIceCandidate: function(e) {
            if (e.RTCIceCandidate && !(e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype)) {
                var t = e.RTCIceCandidate;
                e.RTCIceCandidate = function(e) {
                    if ("object" == typeof e && e.candidate && 0 === e.candidate.indexOf("a=") && (e = JSON.parse(JSON.stringify(e)), e.candidate = e.candidate.substr(2)), e.candidate && e.candidate.length) {
                        var r = new t(e),
                        o = n.parseCandidate(e.candidate),
                        i = Object.assign(r, o);
                        return i.toJSON = function() {
                            return {
                                candidate: i.candidate,
                                sdpMid: i.sdpMid,
                                sdpMLineIndex: i.sdpMLineIndex,
                                usernameFragment: i.usernameFragment
                            }
                        },
                        i
                    }
                    return new t(e)
                },
                e.RTCIceCandidate.prototype = t.prototype,
                r.wrapPeerConnectionEvent(e, "icecandidate",
                function(t) {
                    return t.candidate && Object.defineProperty(t, "candidate", {
                        value: new e.RTCIceCandidate(t.candidate),
                        writable: "false"
                    }),
                    t
                })
            }
        },
        shimCreateObjectURL: function(e) {
            var t = e && e.URL;
            if ("object" == typeof e && e.HTMLMediaElement && "srcObject" in e.HTMLMediaElement.prototype && t.createObjectURL && t.revokeObjectURL) {
                var n = t.createObjectURL.bind(t),
                o = t.revokeObjectURL.bind(t),
                i = new Map,
                s = 0;
                t.createObjectURL = function(e) {
                    if ("getTracks" in e) {
                        var t = "polyblob:" + ++s;
                        return i.set(t, e),
                        r.deprecated("URL.createObjectURL(stream)", "elem.srcObject = stream"),
                        t
                    }
                    return n(e)
                },
                t.revokeObjectURL = function(e) {
                    o(e),
                    i.delete(e)
                };
                var a = Object.getOwnPropertyDescriptor(e.HTMLMediaElement.prototype, "src");
                Object.defineProperty(e.HTMLMediaElement.prototype, "src", {
                    get: function() {
                        return a.get.apply(this)
                    },
                    set: function(e) {
                        return this.srcObject = i.get(e) || null,
                        a.set.apply(this, [e])
                    }
                });
                var c = e.HTMLMediaElement.prototype.setAttribute;
                e.HTMLMediaElement.prototype.setAttribute = function() {
                    return 2 === arguments.length && "src" === ("" + arguments[0]).toLowerCase() && (this.srcObject = i.get(arguments[1]) || null),
                    c.apply(this, arguments)
                }
            }
        },
        shimMaxMessageSize: function(e) {
            if (!e.RTCSctpTransport && e.RTCPeerConnection) {
                var t = r.detectBrowser(e);
                "sctp" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "sctp", {
                    get: function() {
                        return "undefined" == typeof this._sctp ? null: this._sctp
                    }
                });
                var o = function(e) {
                    var t = n.splitSections(e.sdp);
                    return t.shift(),
                    t.some(function(e) {
                        var t = n.parseMLine(e);
                        return t && "application" === t.kind && t.protocol.indexOf("SCTP") !== -1
                    })
                },
                i = function(e) {
                    var t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                    if (null === t || t.length < 2) return - 1;
                    var n = parseInt(t[1], 10);
                    return n !== n ? -1 : n
                },
                s = function(e) {
                    var n = 65536;
                    return "firefox" === t.browser && (n = t.version < 57 ? e === -1 ? 16384 : 2147483637 : 57 === t.version ? 65535 : 65536),
                    n
                },
                a = function(e, r) {
                    var o = 65536;
                    "firefox" === t.browser && 57 === t.version && (o = 65535);
                    var i = n.matchPrefix(e.sdp, "a=max-message-size:");
                    return i.length > 0 ? o = parseInt(i[0].substr(19), 10) : "firefox" === t.browser && r !== -1 && (o = 2147483637),
                    o
                },
                c = e.RTCPeerConnection.prototype.setRemoteDescription;
                e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                    var e = this;
                    if (e._sctp = null, o(arguments[0])) {
                        var t, n = i(arguments[0]),
                        r = s(n),
                        d = a(arguments[0], n);
                        t = 0 === r && 0 === d ? Number.POSITIVE_INFINITY: 0 === r || 0 === d ? Math.max(r, d) : Math.min(r, d);
                        var u = {};
                        Object.defineProperty(u, "maxMessageSize", {
                            get: function() {
                                return t
                            }
                        }),
                        e._sctp = u
                    }
                    return c.apply(e, arguments)
                }
            }
        },
        shimSendThrowTypeError: function(e) {
            if (e.RTCPeerConnection && "createDataChannel" in e.RTCPeerConnection.prototype) {
                var t = e.RTCPeerConnection.prototype.createDataChannel;
                e.RTCPeerConnection.prototype.createDataChannel = function() {
                    var e = this,
                    n = t.apply(e, arguments),
                    r = n.send;
                    return n.send = function() {
                        var t = this,
                        n = arguments[0],
                        o = n.length || n.size || n.byteLength;
                        if (o > e.sctp.maxMessageSize) throw new DOMException("Message too large (can send a maximum of " + e.sctp.maxMessageSize + " bytes)", "TypeError");
                        return r.apply(t, arguments)
                    },
                    n
                }
            }
        }
    }
},
function(e, exports) {
    var t = {};
    t.code_200 = 200,
    t.code_400 = 400,
    t.code_401 = 401,
    t.code_402 = 402,
    t.code_403 = 403,
    t.code_404 = 404,
    t.code_405 = 405,
    t.code_406 = 406,
    t.code_407 = 407,
    t.code_408 = 408,
    t.code_409 = 409,
    t.code_410 = 410,
    t.code_411 = 411,
    t.code_412 = 412,
    t.code_413 = 413,
    t.code_414 = 414,
    t.code_415 = 415,
    t.code_416 = 416,
    t.code_421 = 421,
    t.code_422 = 422,
    t.code_500 = 500,
    t.time_out_seconds = 6e4,
    t.no_test_browser_type_or_version = "非测试通过的浏览器类型或版本",
    t.init_success = "初始化配置完成",
    t.init_failed = "尚未正确配置初始化信息,请检测后再尝试连接",
    t.params_error = "参数错误，缺少服务器地址",
    t.resolution_params_error = "参数错误，分辨率错误",
    t.username_password_except = "参数错误，用户名密码不能为空",
    t.callback_function_except = "参数错误，回调函数不是一个可执行的function",
    t.connection_except = "尚未接入服务器,请先登陆服务器建立链接",
    t.connection_lost = "链接已断开",
    t.mesage_server_except = "服务器配置错误,缺少MSS配置",
    t.sign_failed = "登录失败,请确认服务器地址是否正确",
    t.sign_username_password_error = "登录失败,请确认账号及密码是否正确",
    t.sign_success = "登陆服务器成功",
    t.sign_out_success = "已断开连接并退出登录",
    t.connect_server_success = "服务连接已连接",
    t.create_room_failed = "创建会议失败,请确认服务是否正常,请联系服务提供商",
    t.out_of_source_limit = "接入会议室失败,超出会议资源使用限制",
    t.conference_participant_time_error = "会议尚未开始,请在会议开始前15分钟内入场",
    t.conference_focus_except = "会议室未能正确分配到focus",
    t.conference_vb_except = "会议室未能正确分配到video bridge",
    t.without_usefull_video_device = "没有发现可用的视频输入设备",
    t.out_of_video_device_resolution = "视频输入设备分辨率不满足当前会议系统视频采集需求",
    t.join_room_failed = "接入会议室失败,请确认是否资源超限并联系服务提供商",
    t.join_room_success = "成功进入会议室",
    t.room_locked = "会议室已经被锁定",
    t.room_password_expect = "会议室不存在或密码错误",
    t.room_number_except = "参数错误，请输入正确的会议室号",
    t.room_number_and_nickname_except = "参数错误，请输入正确的会议室号和昵称",
    t.leave_room = "已经离开会议室",
    t.on_participant_joined = "有新的参会者进入到会议室",
    t.on_participant_audio_joined = "参会人员音频接入成功",
    t.on_participant_left = "有人离开了会议室",
    t.got_participants = "获取到参会人员列表",
    t.got_participant_info = "获取到参会人员信息",
    t.got_participant_info_failed = "未找到响应的参会人员",
    t.room_unopend = "会议室尚未开启或不存在",
    t.set_audio_toggle_complete = "设置开关音频完成",
    t.set_audio_toggle_failed = "设置开关音频失败",
    t.set_video_toggle_complete = "设置开关视频完成",
    t.set_video_toggle_failed = "设置开关视频失败",
    t.change_video_resolution_complete = "修改分辨率成功",
    t.unsupport_resolution = "你的设备不支持当前分辨率，请调低分辨率尝试",
    t.unfind_devices = "没有发现可用的音视频设备",
    t.find_devices = "获取到相应的设备列表",
    t.resource_except = "参数错误，缺少用户定位标识",
    t.out_of_authority = "对不起，你不是管理员，没有权限执行此操作",
    t.network_error = "网络错误，请确认服务是否正常并联系服务提供商",
    t.transferc_compere_success = "移交主持人权限成功",
    t.transferc_compere_failed = "移交主持人权限失败",
    t.compere_authority_own = "已经拥有主持人权限，无需再次获取",
    t.compere_password_except = "参数错误，请输入主持人密码",
    t.fetch_compere_error = "获取主持人权限失败，房间存在主持人",
    t.fetch_compere_success = "获取主持人权限成功",
    t.you_are_not_in_room = "你尚未进入会议室",
    t.you_are_in_a_room = "你正在开会或已经在会议室中,无法拨号",
    t.message_content_null = "消息不能为空",
    t.message_send_complete = "消息文本发送成功",
    t.receive_text_message_complete = "收到文本消息",
    t.becontrol_user_resource_except = "请输入被操作的用户唯一标识",
    t.manage_set_audio_mute_success = "主持人设置静音成功",
    t.manage_set_audio_mute_failed = "主持人设置静音失败",
    t.be_set_mute_complete = "被主持人修改音频状态",
    t.be_set_video_complete = "被主持人修改视频状态",
    t.participant_not_in_room = "参会人员已不再会议室",
    t.remove_participant_complete = "成功移除参会人员",
    t.remove_participant_failed = "移除参会人员失败",
    t.you_have_been_eject = "你已经被踢出了房间",
    t.video_device_id_except = "请传入视频输入设备ID",
    t.sip_gateway_except = "网关（Gateway）地址未正确配置",
    t.sip_number_except = "请输入被叫SIP号",
    t.call_sip_success = "呼叫SIP终端成功",
    t.call_sip_failed = "呼叫SIP终端失败",
    t.call_sip_aready_in = "呼叫SIP终端已经在会议室中",
    t.be_inviste_user_except = "请输入被邀请人的用户号",
    t.send_inviste_success = "发送邀请成功",
    t.send_inviste_failed = "发送邀请失败",
    t.on_ring_up = "收到邀请入会的响铃",
    t.on_ring_up_reply = "收到邀请入会的答复",
    t.get_my_jid = "获取到我的被叫ID",
    t.room_opened = "会议室已经开启",
    t.share_screen_success = "屏幕共享成功",
    t.share_screen_failed = "屏幕共享失败",
    t.share_screen_error = "屏幕共享失败,请联系服务提供商",
    t.share_screen_ended = "屏幕分享结束,感谢使用;请移除相应节点",
    t.share_app_except = "请传入需要分享的应用路径",
    t.share_app_completed = "成功(开始/关闭)共享应用",
    t.on_stream_added = "收到新的流增加到连接中",
    t.on_stream_added = "收到新的流增加到连接中",
    t.second_stream_except = "需要添加的流不存在",
    t.lock_or_unlock_room_completed = "锁定/解锁房间完成",
    t.lock_or_unlock_room_failed = "锁定/解锁房间失败",
    t.display_mode_execpet = "请传入需要切换的分屏模式",
    t.display_mode_change_complete = "切换显示模式成功",
    t.display_mode_change_failed = "切换显示模式失败",
    t.on_grant_admin_completed = "被授权了主持人权限",
    t.dispaly_block_source_except = "请传入正确的新主屏",
    t.lock_main_display_complete = "切换主屏完成",
    t.lock_main_display_failed = "切换主屏失败",
    t.main_display_block_changed = "主屏资源已经被更改",
    t.order_change_resolution_receiver_except = "需要修改分辨率的用户ID不能为空",
    t.order_change_resolution_resulotion_except = "需要修改到的分辨率不能为空",
    t.order_change_resolution_resulotion_complete = "发送修改分辨率通知成功",
    t.order_change_resolution_resulotion_failed = "发送修改分辨率通知失败",
    t.on_order_change_resolution_order = "收到修改分辨率通知",
    t.nickname_except = "请输入正确的用户昵称",
    t.init_moderator_complete = "初始化权限完成",
    t.init_moderator_failed = "初始化权限失败",
    t.invite_time_out = "请求超时,被叫无人接听",
    t.reply_invite_time_out = "请求超时,对方已挂机",
    t.reject_invite_msg = "已拒绝呼叫",
    t.response_invite_msg_complete = "已处理呼叫信息",
    t.get_my_friends_list = "获取到我的好友列表",
    t.send_hard_remove_strem_msg = "流已从连接中被移除",
    t.local_stream_ssrc_updated = "本地流SSRC已经更新",
    t.with_moderator_status_changed = "存在主持人状态发生变化",
    t.get_user_media_success = "获取到流媒体资源",
    t.get_user_media_failed = "获取流媒体资源失败",
    t.audio_output_except = "音频输出设备不正确",
    t.audio_output_change_completed = "音频输出设备已改变",
    t.audio_input_change_completed = "音频输入设备已改变",
    t.audio_input_change_failed = "音频输入设备切换失败",
    t.room_kill_by_manager = "管理员关闭了会议室",
    t.room_lock_status_change = "房间已",
    t.participant_status_update = "参会用户信息更新",
    t.manis_recorder_status_changed = "Manis recorder status changed ",
    t.hands_up_send_success = "举手消息已发送",
    t.hands_up_send_failed = "举手发送失败",
    t.on_hands_up_msg = "收到有人举手消息",
    t.response_hands_up_msg_success = "答复举手消息成功",
    t.response_hands_up_msg_failed = "答复举手消息失败",
    t.response_hands_up_action_error = "响应参数中action错误",
    t.on_hands_up_response = "收到举手响应消息",
    t.ring_call_request_in_processed_sent_success = "呼叫消息已处理消息已发送",
    t.ring_call_request_in_processed_sent_failed = "呼叫消息已处理消息发送失败",
    t.ring_call_request_in_processed = "呼叫消息在其他终端上已处理",
    t.media_stream_except = "仅发送模式流媒体资源不能为空",
    t.room_countdown = "会议房间预约时间即将到期,请确认是否需要延长会议时间",
    t.room_extend_time_require = "请输入合法的延长时间,单位为分钟",
    t.room_extend_time_success = "会议延长时间成功",
    t.room_extend_time_failed = "会议延长时间失败",
    t.on_room_model_change_to_audio_only = "获取本地视频失败,自动尝试音频方式入会",
    e.exports = t
},
function(e, exports) {
    var t = {
        no_error: "000000",
        no_test_browser_type_or_version: "300000",
        callback_except: "300001",
        init_params_error: "300002",
        username_except: "300103",
        user_password_except: "300104",
        user_login_client_failed: "300105",
        username_not_exist: "300106",
        user_client_auth_failed: "300107",
        user_login_status_error: "300108",
        anonymous_login_failed: "300109",
        user_friends_fetch_failed: "300110",
        message_server_except: "300201",
        message_server_user_except: "300202",
        message_server_connect_failed: "300203",
        mss_connection_except: "300204",
        conference_room_not_exist: "300301",
        conference_room_locked: "300302",
        conference_room_source_limit: "300303",
        conference_room_participant_failed: "300304",
        conference_room_participant_out_time: "300305",
        conference_room_focus_except: "300306",
        conference_room_vb_except: "300307",
        conference_room_participant_failed_unknown_response_code: "300308",
        conference_room_except: "300309",
        conference_room_nickname_except: "300310",
        conference_room_not_participate: "300311",
        conference_room_un_open: "300312",
        conference_room_wait_others: "300313",
        conference_room_opened: "300314",
        grant_admin_participant_except: "300401",
        grant_admin_participant_failed: "300402",
        without_permission_for_the_operation: "300403",
        grant_admin_participant_not_exist: "300404",
        fetch_admin_password_except: "300405",
        fetch_admin_failed_owen_it: "300406",
        fetch_admin_failed: "300407",
        eject_participant_except: "300408",
        eject_participant_not_exist: "300409",
        eject_participant_failed: "300410",
        init_moderator_right_failed: "300411",
        hand_up_receiver_except: "300412",
        hand_up_send_failed: "300413",
        hand_up_response_action_illegality: "300414",
        response_hands_up_msg_failed: "300415",
        conference_delay_failed: "300416",
        conference_delay_time_require: "300417",
        text_message_except: "300501",
        private_text_message_receiver_not_exist: "300502",
        sip_gateway_except: "300601",
        sip_client_except: "300602",
        sip_call_in_progress: "300603",
        sip_call_signalling_error: "300604",
        sip_call_failed_error_password: "300605",
        sip_call_hang_up: "300606",
        sip_call_unknown_error: "300607",
        sip_call_send_failed: "300608",
        display_model_except: "300701",
        display_model_broadcast_failed: "300702",
        main_display_source_except: "300703",
        audio_switch_mute_failed: "400101",
        video_switch_mute_failed: "400102",
        operate_someone_audio_participant_except: "400201",
        operate_someone_audio_failed: "400202",
        operate_someone_video_participant_except: "400301",
        operate_someone_video_failed: "400302",
        media_device_get_local_media_failed: "400401",
        media_device_resolution_nonsupport: "400402",
        media_device_except: "400404",
        change_video_input_device_except: "400405",
        change_resolution_not_match: "400406",
        change_audio_input_device_except: "400407",
        change_audio_input_device_failed: "400408",
        change_audio_output_device_except: "400409",
        second_stream_except: "400501",
        second_stream_share_failed: "400502",
        get_user_media_constraints_except: "400601",
        send_only_stream_except: "400701",
        api_fetch_failed: "500000",
        unknown_error: "500500",
        invoke_receiver_except: "600101",
        invoke_send_failed: "600102",
        called_expired: "600103",
        invoke_room_ready_receiver_except: "600104",
        send_room_ready_msg_failed: "600105",
        called_request_in_processed_sent_failed: "600106",
        share_screen_extended_plugin_except: "700101",
        share_screen_fetch_stream_failed: "700102",
        share_screen_stop_failed: "700103",
        share_screen_nonsupport: "700104"
    };
    e.exports = t
},
function(e, exports, t) {
    function n(e, t, n, s, a) {
        var c = window.serverPath + "/http-bind/";
        connection = new h.Connection(c);
        try {
            connection.connect(e, t, r),
            n && (config.nickname = n, connection.emuc.addDisplayNameToPresence(n)),
            connection.addHandler(o, null, "message"),
            connection.addHandler(i, "urn:xmpp:jingle:1", "iq", "set", null, null),
            s({
                code: g.code_200,
                msg: g.sign_success
            }),
            console.info("userId : ", e.split("@")[0])
        } catch(e) {
            a({
                code: g.code_400,
                msg: g.sign_failed,
                error: e
            })
        }
    }
    function r(e) {
        e == Strophe.Status.CONNECTED && (window.connection = connection, console.log("xmpp connected"), connection.sendIQ($pres().tree()))
    }
    function o(e) {
        if ("p2p" == window.connectType) {
            console.log(e),
            roomId = e.getAttribute("from"),
            f = e.getAttribute("to");
            var t = $(e).find(">join");
            if (t.length) for (var n = t[0].childNodes, r = 0; r < n.length; r++) {
                var o = n[r].getAttribute("jid");
                if (o != f && o != roomId) {
                    var i = s(o);
                    a(i, o)
                }
            }
            var c = $(e).find(">left");
            if (c.length) {
                var d = Strophe.getResourceFromJid(c[0].childNodes[0].textContent);
                if (window.participants.length > 0) for (var u = 0; u <= window.participants.length; u++) {
                    var l = window.participants[u];
                    l && l.resource === Strophe.getResourceFromJid(d) && window.participants.splice(u, 1)
                }
                $(document).trigger("manis.room.someone.left", {
                    resource: Strophe.getResourceFromJid(d)
                }),
                v[d].close(),
                delete v[d],
                console.log("sid>>>>", d)
            }
            return console.log("peers>>>>>>>>", v),
            !0
        }
    }
    function i(e) {
        if ("p2p" == window.connectType) {
            var t = $(e).find("jingle").attr("rid"),
            n = $(e).find("jingle").attr("sid"),
            r = s(n),
            o = $(e).find("jingle").attr("action"),
            i = $(e).find("jingle").attr("sdp").split("||").join("\r\n");
            if (roomId = e.getAttribute("from"), console.log("action>>>>>>>>>>>>>>>>:", o, "   rid:", t), "session-initiate" == o && (f = t, r.setRemoteDescription(new RTCSessionDescription({
                type: "offer",
                sdp: i
            })), r.createAnswer(function(e) {
                r.setLocalDescription(e);
                var o = $iq({
                    to: roomId,
                    type: "set"
                }).c("jingle", {
                    xmlns: "urn:xmpp:jingle:1",
                    action: "session-accept",
                    sid: n,
                    rid: t,
                    sdp: e.sdp.split("\r\n").join("||")
                });
                console.log("发送 createAnswer", o.tree()),
                connection.sendIQ(o)
            },
            function(e) {
                console.log("Failure callback: " + e)
            })), "session-accept" == o && r.setRemoteDescription(new RTCSessionDescription({
                type: "answer",
                sdp: i
            })), "transport-info" == o) {
                var a = $(e).find("jingle").attr("sdp").split("||"),
                c = new RTCIceCandidate({
                    candidate: a[0],
                    sdpMLineIndex: a[1],
                    sdpMid: a[2]
                });
                r.addIceCandidate(c)
            }
            return ! 0
        }
    }
    function s(e) {
        var t = v[Strophe.getResourceFromJid(e)];
        if (!t) {
            var n = {
                iceServers: [{
                    url: config.nat
                }]
            };
            t = new RTCPeerConnection(n),
            t.onicecandidate = function(t) {
                if (t.candidate) {
                    var n = $iq({
                        to: roomId,
                        type: "set"
                    }).c("jingle", {
                        xmlns: "urn:xmpp:jingle:1",
                        action: "transport-info",
                        sid: e,
                        rid: f,
                        sdp: t.candidate.candidate + "||" + t.candidate.sdpMLineIndex + "||" + t.candidate.sdpMid
                    });
                    console.log("发送 event.candidate", e, " myjid:", f),
                    connection.sendIQ(n)
                } else console.log("End of candidates.")
            },
            t.onaddstream = function(t) {
                var n = {
                    info: _.getUserInfoByJid(e),
                    stream: t.stream,
                    status: _.generateStatusNode(Strophe.getResourceFromJid(e))
                };
                $(document).trigger("manis.room.someone.joined", [n])
            },
            t.onremovestream = function(e) {
                console.log("远程视频移除", e)
            },
            t.addStream(localStream),
            v[Strophe.getResourceFromJid(e)] = t
        }
        return t
    }
    function a(e, t) {
        e.createOffer(function(n) {
            e.setLocalDescription(n);
            var r = $iq({
                to: roomId,
                type: "set"
            }).c("jingle", {
                xmlns: "urn:xmpp:jingle:1",
                action: "session-initiate",
                sid: t,
                rid: f,
                sdp: n.sdp.split("\r\n").join("||")
            });
            console.log("event.createOffer", r.tree()),
            connection.sendIQ(r)
        },
        function(e) {
            console.log("Failure callback: " + e)
        })
    }
    function c(e, t, n) {
        m.getMedia(constraints,
        function(r) {
            var o = localStream = r;
            if (window.webkitMediaStream) {
                for (var i = new webkitMediaStream,
                s = new webkitMediaStream,
                a = o.getAudioTracks(), c = o.getVideoTracks(), u = 0; u < a.length; u++) i.addTrack(a[u]);
                for (u = 0; u < c.length; u++) s.addTrack(c[u]);
                connection.jingle.localAudio = i,
                connection.jingle.localVideo = s
            } else connection.jingle.localAudio = o,
            connection.jingle.localVideo = o;
            var l = e + "@conference." + manisConfg.messageServer,
            p = d(l);
            connection.sendIQ(p,
            function(e) {
                connection.emuc.doJoin(l + "/" + Strophe.getResourceFromJid(connection.jid));
                var n = Strophe.getResourceFromJid(connection.jid),
                r = {
                    info: {
                        nickname: config.nickname ? config.nickname: manisConfg.mUsername,
                        resource: n
                    },
                    stream: localStream,
                    status: _.generateStatusNode(n),
                    constraints: constraints
                };
                t({
                    code: g.code_200,
                    msg: g.join_room_success,
                    response: r
                })
            },
            function(e) {
                n({
                    code: g.code_400,
                    msg: g.join_room_failed,
                    error: e
                })
            })
        },
        function(r) {
            if ("DevicesNotFoundError" == r.name || "DevicesNotFoundError" == r.constructor.name || "NotFoundError" == r.name || "NotFoundError" == r.constructor.name) return void n({
                code: g.code_404,
                msg: g.without_usefull_video_device
            });
            if ("OverconstrainedError" == r.name || "OverconstrainedError" == r.constructor.name) {
                if (! ("width" == r.constraint && constraints.video.width.exact > 320 || "height" == r.constraint && constraints.video.height.exact > 240)) return void n({
                    code: g.code_402,
                    msg: g.out_of_video_device_resolution
                });
                1080 == constraints.video.height.exact ? (constraints.video.width.exact = 1280, constraints.video.height.exact = 720, c(e, t, n)) : 720 == constraints.video.height.exact ? (constraints.video.width.exact = 640, constraints.video.height.exact = 480, c(e, t, n)) : 480 == constraints.video.height.exact && (constraints.video.width.exact = 320, constraints.video.height.exact = 240, c(e, t, n, constraints))
            }
        })
    }
    function d(e) {
        var t = $iq({
            to: "p2p." + manisConfg.messageServer,
            type: "set"
        });
        return t.c("conference", {
            xmlns: "http://jitsi.org/protocol/focus",
            room: e
        }),
        t.up(),
        t
    }
    function u(e, t) {
        var n = !_.isAudioMuted();
        try {
            var r = connection.jingle.localAudio.getAudioTracks();
            if (r.length > 0) for (var o = 0; o < r.length; o++) r[o].enabled = !n;
            connection.emuc.addAudioInfoToPresence(n),
            connection.emuc.sendPresence(),
            e({
                code: g.code_200,
                msg: g.set_audio_toggle_complete,
                response: n
            })
        } catch(e) {
            t({
                code: g.code_400,
                msg: g.set_audio_toggle_failed,
                response: !n
            })
        }
    }
    function l(e, t) {
        var n = !_.isVideoMuted();
        try {
            for (var r = connection.jingle.localVideo.getVideoTracks(), o = 0; o < r.length; ++o) r[o].enabled = !n;
            connection.emuc.addAudioInfoToPresence(n),
            connection.emuc.sendPresence(),
            e({
                code: g.code_200,
                msg: g.set_video_toggle_complete,
                response: n
            })
        } catch(e) {
            t({
                code: g.code_400,
                msg: g.set_video_toggle_failed,
                response: !n
            })
        }
    }
    function p(e, t, n, r) {
        console.info("old stream : ", e, "\r\n", "new stream : ", t)
    }
    var f, h = (t(3), t(5), t(29)),
    m = t(12),
    g = t(26),
    _ = t(30),
    v = {};
    e.exports = {
        connect: n,
        join: c,
        muteVideo: l,
        muteAudio: u,
        switchStream: p
    }
},
function(e, exports) {
    var t = {};
    t.Connection = function(e, t) {
        if (!window.WebSocket && (window.WebSocket = window.MozWebSocket, !window.WebSocket)) {
            var n = "WebSocket not supported by this browser";
            throw alert(n),
            Error(n)
        }
        this.host = e.indexOf("/") < 0 ? e: e.split("/")[2],
        this.protocol = e.indexOf("/") < 0 ? "wss:": "http:" == e.split("/")[0] ? "ws:": "wss:",
        this.jid = "",
        this.resource = t ? t: "",
        this.streamId = null,
        this.timedHandlers = [],
        this.handlers = [],
        this.removeTimeds = [],
        this.removeHandlers = [],
        this.addTimeds = [],
        this.addHandlers = [],
        this._idleTimeout = null,
        this.authenticated = !1,
        this.disconnecting = !1,
        this.connected = !1,
        this.errors = 0,
        this._uniqueId = Math.round(1e4 * Math.random()),
        this._idleTimeout = setTimeout(this._onIdle.bind(this), 100);
        for (var r in Strophe._connectionPlugins) if (Strophe._connectionPlugins.hasOwnProperty(r)) {
            var o = Strophe._connectionPlugins[r],
            i = function() {};
            i.prototype = o,
            this[r] = new i,
            this[r].init(this)
        }
    },
    t.Connection.prototype = {
        reset: function() {
            this.streamId = null,
            this.timedHandlers = [],
            this.handlers = [],
            this.removeTimeds = [],
            this.removeHandlers = [],
            this.addTimeds = [],
            this.addHandlers = [],
            this.authenticated = !1,
            this.disconnecting = !1,
            this.connected = !1,
            this.errorCallback = null,
            this.errors = 0
        },
        pause: function() {},
        resume: function() {},
        getUniqueId: function(e) {
            return "string" == typeof e || "number" == typeof e ? ++this._uniqueId + ":" + e: ++this._uniqueId + ""
        },
        connect: function(e, t, n, r, o, i, s) {
            this.jid = e.indexOf("/") > -1 ? e: e + "/" + this.resource,
            this.username = e.indexOf("@") < 0 ? e: e.split("@")[0],
            this.pass = "" == t ? null: t,
            this.connect_callback = n,
            this.disconnecting = !1,
            this.errorCallback = r,
            this.connected = !1,
            this.authenticated = !1,
            this.errors = 0;
            var a = window.manisParams.domain ? window.manisParams.domain: "";
            this._changeConnectStatus(Strophe.Status.CONNECTING, null),
            this.url = this.protocol + "//" + this.host + ":" + manisConfg.messageServerPort + "/websocket?uid=" + this.username + "&domain=" + a + "&endpoint=" + this.resource + "&t=" + window.manisConfg.currentTimeMillis,
            this._ws = new WebSocket(this.url),
            this._ws.onopen = this._onopen.bind(this),
            this._ws.onmessage = this._onmessage.bind(this),
            this._ws.onclose = this._onclose.bind(this),
            this._ws.onerror = this._onerror.bind(this),
            window.openfireWebSocket = this,
            this.jid = this.jid.indexOf("@") < 0 ? this.resource + "@" + this.jid: this.jid,
            this._changeConnectStatus(Strophe.Status.AUTHENTICATING, null)
        },
        _onerror: function(e) {
            console.error(e),
            this.errorCallback && this.errorCallback(e)
        },
        _onopen: function() {
            this.connected = !0,
            this.authenticated = !0,
            this.resource = Strophe.getResourceFromJid(this.jid),
            this.domain = Strophe.getDomainFromJid(this.jid);
            try {
                this._changeConnectStatus(Strophe.Status.CONNECTED, null)
            } catch(e) {
                throw Error("User connection callback caused an exception: " + e)
            }
            this.interval = setInterval(function() {
                window.openfireWebSocket.sendRaw("ping")
            },
            1e4)
        },
        attach: function() {},
        xmlInput: function(e) {},
        xmlOutput: function(e) {},
        rawInput: function(e) {},
        rawOutput: function(e) {},
        sendRaw: function(e) {
            if (!this.connected || null == this._ws) throw Error("Not connected, cannot send packets.");
            "ping" != e && (this.xmlOutput(this._textToXML(e)), this.rawOutput(e)),
            this.doSend(e)
        },
        doSend: function(e) {
            var t = this;
            try {
                1 == config.debug && console.log("Will send content: \n", e),
                t._ws.send(e)
            } catch(n) {
                console.warn("send failed, try again after 200 ms: ", n),
                setTimeout(function() {
                    t.doSend(e)
                },
                1e3)
            }
        },
        send: function(e) { (null == this._ws || this._ws.readyState > WebSocket.OPEN) && console.warn("Not connected, cannot send packets.");
            var t = "";
            if (null !== e) {
                if ("function" == typeof e.sort) for (var n = 0; n < e.length; n++) t += Strophe.serialize(e[n]),
                this.xmlOutput(e[n]);
                else "function" == typeof e.tree ? (e.attrs({
                    from: connection.jid
                }), t = Strophe.serialize(e.tree()), this.xmlOutput(e.tree())) : (e.setAttribute("from", connection.jid), t = Strophe.serialize(e), this.xmlOutput(e));
                this.rawOutput(t),
                1 == config.debug && console.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>> to send >>>>>>>>>>>>>>>>>>>>>>>>> \r\n ", t, " \r\n >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"),
                this.doSend(t)
            }
        },
        flush: function() {},
        sendIQ: function(e, t, n, r) {
            var o = null,
            i = this;
            "function" == typeof e.tree && (e = e.tree()),
            e.setAttribute("from", connection.jid);
            var s = e.getAttribute("id");
            s || (s = this.getUniqueId("sendIQ"), e.setAttribute("id", s));
            var a = this.addHandler(function(e) {
                o && i.deleteTimedHandler(o);
                var r = e.getAttribute("type");
                if ("result" == r) t && t(e);
                else if ("get" == r);
                else {
                    if ("error" != r) throw {
                        name: "StropheError",
                        message: "Got bad IQ type of " + r
                    };
                    n && n(e)
                }
            },
            null, "iq", null, s);
            return r && (o = this.addTimedHandler(r,
            function() {
                return i.deleteHandler(a),
                n && n(null),
                !1
            })),
            this.send(e),
            s
        },
        addTimedHandler: function(e, t) {
            var n = new Strophe.TimedHandler(e, t);
            return this.addTimeds.push(n),
            n
        },
        deleteTimedHandler: function(e) {
            this.removeTimeds.push(e)
        },
        addHandler: function(e, t, n, r, o, i, s) {
            var a = new Strophe.Handler(e, t, n, r, o, i, s);
            return this.addHandlers.push(a),
            a
        },
        deleteHandler: function(e) {
            this.removeHandlers.push(e)
        },
        disconnect: function(e) {
            this.connected && null != this._ws && (this._changeConnectStatus(Strophe.Status.DISCONNECTING, e), Strophe.info("Disconnect was called because: " + e), this._ws.close())
        },
        _onDisconnectTimeout: function() {
            return Strophe.info("_onDisconnectTimeout was called"),
            this._doDisconnect(),
            !1
        },
        _doDisconnect: function() {
            Strophe.info("_doDisconnect was called"),
            this._onclose()
        },
        _changeConnectStatus: function(e, t) {
            for (var n in Strophe._connectionPlugins) if (Strophe._connectionPlugins.hasOwnProperty(n)) {
                var r = this[n];
                if (r.statusChanged) try {
                    r.statusChanged(e, t)
                } catch(e) {
                    Strophe.error("" + n + " plugin caused an exception changing status: " + e)
                }
            }
            if ("function" == typeof this.connect_callback) try {
                this.connect_callback(e, t)
            } catch(e) {
                Strophe.error("User connection callback caused an exception: " + e)
            }
        },
        _onclose: function() {
            Strophe.info("websocket closed"),
            console.log("_onclose - disconnected"),
            clearInterval(this.interval),
            this.authenticated = !1,
            this.disconnecting = !1,
            this.streamId = null,
            this._changeConnectStatus(Strophe.Status.DISCONNECTED, null),
            this.connected = !1,
            this.handlers = [],
            this.timedHandlers = [],
            this.removeTimeds = [],
            this.removeHandlers = [],
            this.addTimeds = [],
            this.addHandlers = [],
            this._ws.readyState != this._ws.CLOSED && this._ws.close(),
            $(document).trigger("manis.on.unknown.error", [{
                code: 404,
                msg: "connection lost"
            }])
        },
        _onmessage: function(e) {
            var t;
            if ("message" != e.type || "pong" != e.data) {
                try {
                    t = this._textToXML(e.data),
                    1 == config.debug && console.warn("<<<<<<<<<<<<<<<<<<<<<<<<<<<<< on message <<<<<<<<<<<<<<<<<<< \r\n ", t, " \r\n <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< \r\n ", e)
                } catch(e) {
                    if ("parsererror" != e) throw e;
                    this.disconnect("strophe-parsererror")
                }
                if (null !== t) {
                    this.xmlInput(t),
                    this.rawInput(e.data);
                    for (var n, r; this.removeHandlers.length > 0;) r = this.removeHandlers.pop(),
                    n = this.handlers.indexOf(r),
                    n >= 0 && this.handlers.splice(n, 1);
                    for (; this.addHandlers.length > 0;) this.handlers.push(this.addHandlers.pop());
                    var n, o;
                    for (o = this.handlers, this.handlers = [], n = 0; n < o.length; n++) {
                        var r = o[n]; ! r.isMatch(t) || !this.authenticated && r.user ? this.handlers.push(r) : r.run(t) && this.handlers.push(r)
                    }
                    this._handleConferenceLeaveIq(e)
                }
            }
        },
        _handleConferenceLeaveIq: function(e) {
            var t = e.data,
            n = $(t).attr("from") || null,
            r = $(t).find('>conference[xmlns="http://jitsi.org/protocol/focus"]') || null;
            if (r) {
                var o = r.attr("type");
                if ("leave" == o) connection.emuc.onParticipantLeave(n),
                connection.ofmuc.onParticipantLeave(n),
                $(document).trigger("left.muc", [n]);
                else if ("kickout" == o) {
                    var i = r.attr("kickout");
                    Strophe.getResourceFromJid(connection.jid) == Strophe.getResourceFromJid(i) ? (1 == window.isUsingScreenStream && $(document).trigger("manis.been.stop.screen.share"), $(document).trigger("oneject.muc")) : $(document).trigger("left.muc", [i])
                }
            }
        },
        _textToXML: function(e) {
            var t = null;
            if (window.DOMParser) {
                var n = new DOMParser;
                t = n.parseFromString(e, "text/xml")
            } else {
                if (!window.ActiveXObject) throw Error("No DOMParser object found.");
                var t = new ActiveXObject("MSXML2.DOMDocument");
                t.async = !1,
                t.loadXML(e)
            }
            return t.firstChild
        },
        _onIdle: function() {
            for (var e, t, n, r; this.removeTimeds.length > 0;) t = this.removeTimeds.pop(),
            e = this.timedHandlers.indexOf(t),
            e >= 0 && this.timedHandlers.splice(e, 1);
            for (; this.addTimeds.length > 0;) this.timedHandlers.push(this.addTimeds.pop());
            var o = (new Date).getTime();
            for (r = [], e = 0; e < this.timedHandlers.length; e++) t = this.timedHandlers[e],
            !this.authenticated && t.user || (n = t.lastCalled + t.period, n - o <= 0 ? t.run() && r.push(t) : r.push(t));
            this.timedHandlers = r,
            clearTimeout(this._idleTimeout),
            this._idleTimeout = setTimeout(this._onIdle.bind(this), 100)
        }
    },
    exports = e.exports = t
},
function(e, exports, t) {
    var n = t(26),
    r = t(27),
    o = {
        currentMainResource: "",
        currentMainSSRC: "",
        supportsLocalStorage: function() {
            try {
                return "localStorage" in window && null !== window.localStorage
            } catch(e) {
                return console.log("localstorage is not supported"),
                !1
            }
        },
        generateUniqueId: function() {
            function e() {
                return (Math.random().toString(16) + "000000000").substr(2, 8)
            }
            return e() + e() + e() + e()
        },
        isAudioMuted: function() {
            for (var e = connection.jingle.localAudio,
            t = 0; t < e.getAudioTracks().length; t++) if (e.getAudioTracks()[t].enabled === !0) return ! 1;
            return ! 0
        },
        isVideoMuted: function() {
            for (var e = connection.jingle.localVideo.getVideoTracks(), t = !0, n = 0; n < e.length; ++n) if (e[n].enabled) {
                t = !1;
                break
            }
            return t
        },
        setAdmin: function(e) {
            e ? config.role = "CRUO": config.role = "NONE"
        },
        isAdmin: function() {
            return "CRUO" == config.role || "CRUA" == config.role || ("CRUM" == config.role, !1)
        },
        initModerator: function(e) {
            var t = this;
            try {
                if ("function" == typeof config.getroomnode) var o = config.getroomnode();
                else if (null != window.roomName) var o = window.roomName.split("@")[0];
                else var o = null;
                o && $.ajax({
                    url: window.serverPath + "/user/initModerator?j=" + connection.jid + "&r=" + o,
                    dataType: "jsonp",
                    processData: !1,
                    type: "get",
                    async: !1,
                    success: function(o) {
                        if (200 == o.code) {
                            config.role = o.obj[0];
                            var i = t.isAdmin();
                            connection.emuc.addConfigRoleToPresence(config.role),
                            connection.emuc.addIsModeratorToPresence(i),
                            connection.emuc.sendPresence();
                            for (var s = 0; s < window.participants.length; s++) {
                                var a = window.participants[s];
                                a.jid == connection.jid && (a.is_moderator = i, window.participants[s] = a)
                            }
                            e({
                                code: n.code_200,
                                msg: n.init_moderator_complete,
                                response: i,
                                master: Strophe.getResourceFromJid(o.obj[1]),
                                errorCode: r.no_error
                            })
                        }
                    },
                    error: function(t, o, i) {
                        e({
                            code: n.code_500,
                            msg: n.init_moderator_failed,
                            errorCode: r.init_moderator_right_failed
                        })
                    }
                })
            } catch(t) {
                e({
                    code: n.code_500,
                    msg: n.init_moderator_failed,
                    errorCode: r.api_fetch_failed
                })
            }
        },
        setAudioMute: function(e, t, n) {
            try {
                if (e == this.isAudioMuted()) return;
                var r = connection.jingle.localAudio.getAudioTracks();
                if (r.length > 0) for (var o = 0; o < r.length; o++) r[o].enabled = !e;
                connection.emuc.addAudioInfoToPresence(e),
                connection.emuc.sendPresence(),
                $(document).trigger("audiomuted.muc", [connection.jid, e.toString()]),
                t && t()
            } catch(e) {
                n(e)
            }
        },
        setVideoMute: function(e, t, n) {
            if (window.participants.length < 2) return console.warn("other participant not join yet"),
            !0;
            var r = window.activecall;
            r ? r.setVideoMute(e,
            function(e) {
                connection.emuc.addVideoInfoToPresence(e),
                connection.emuc.sendPresence(),
                t && t()
            },
            null) : (console.warn("connection lost"), n && n(), $(document).trigger("manis.management.kill", [!0]))
        },
        getUserInfoByJid: function(e) {
            if (window.participants.length) for (var t = 0; t < window.participants.length; t++) {
                var n = window.participants[t];
                if (n.resource == Strophe.getResourceFromJid(e)) return {
                    nickname: n.nickname,
                    resource: n.resource,
                    jid: e
                }
            }
            return {
                resource: Strophe.getResourceFromJid(e),
                nickname: "",
                jid: e
            }
        },
        getUserByResource: function(e) {
            if (window.participants.length) for (var t = 0; t < window.participants.length; t++) {
                var n = window.participants[t];
                if (n.resource == e) return n
            }
            return null
        },
        isInRoom: function() {
            return null != connection.emuc.myroomjid && window.participants.length > 0
        },
        generateStatusNode: function(e) {
            var t = {
                resolutionId: "resolution_" + e,
                uploadPackageLostId: "upload_package_lost_" + e,
                downloadPackageLostId: "download_package_lost_" + e,
                uploadBitrateId: "upload_bitrate_" + e,
                downloadBitrateId: "download_bitrate_" + e
            };
            return t
        },
        sendChangeDisplayModeMsg: function(e, t, o) {
            var i = $msg({
                to: connection.emuc.roomjid,
                type: "groupchat"
            });
            i.c("body", {
                xmlns: "http://igniterealtime.org/protocol/splitScreen",
                jid: o
            }).t(e).up();
            try {
                window.connection.send(i),
                t({
                    code: n.code_200,
                    msg: n.display_mode_change_complete,
                    response: e,
                    errorCode: r.no_error
                })
            } catch(e) {
                t({
                    code: n.code_500,
                    msg: n.display_mode_change_failed,
                    errorCode: r.display_model_broadcast_failed
                })
            }
        },
        sendChangeMainBlockSourceMsg: function(e, t, o, i) {
            var s = !!i,
            a = $msg({
                to: connection.emuc.roomjid,
                type: "groupchat"
            }),
            c = this.getUserByResource(e);
            if (c && c.jid) var d = c.jid;
            else var d = connection.emuc.roomJid + "/" + e;
            a.c("body", {
                xmlns: "http://igniterealtime.org/protocol/stage",
                jid: d,
                screen: s
            }).t(e).up(),
            a.c("resource", {
                xmlns: "http://igniterealtime.org/protocol/endpoint"
            }).t(e).up(),
            t && a.c("ssrc", {
                xmlns: "http://igniterealtime.org/protocol/streamssrc"
            }).t(t).up(),
            window.connection.send(a),
            o({
                code: n.code_200,
                msg: n.lock_main_display_complete,
                response: e,
                errorCode: r.no_error
            }),
            $(document).trigger("manis.main.display.changed", [e, t]);
            var u = this;
            if (u.currentMainResource != e || u.currentMainSSRC != t) try {
                $.ajax({
                    url: window.serverPath + "/user/setStage?j=" + d + "&r=" + window.roomName.split("@")[0],
                    dataType: "jsonp",
                    processData: !1,
                    type: "get",
                    async: !1,
                    success: function(n) {
                        200 == n.code && (console.log("set stage success! "), u.currentMainResource = e, u.currentMainSSRC = t)
                    },
                    error: function(e, t, n) {
                        console.error("set stage failure!", e, t, n)
                    }
                })
            } catch(e) {}
        },
        sendHardRemoveStreamMsg: function(e, t, r) {
            var o = $msg({
                to: connection.emuc.roomjid,
                type: "groupchat"
            });
            o.c("body", {
                xmlns: "http://igniterealtime.org/protocol/hardremove",
                jid: connection.emuc.connection.jid
            }).t(e).up(),
            o.c("resource", {
                xmlns: "http://igniterealtime.org/protocol/endpoint"
            }).t(e).up(),
            t && o.c("ssrc", {
                xmlns: "http://igniterealtime.org/protocol/streamssrc"
            }).t(t).up(),
            console.log("send hard remove stream msg : ", o.tree()),
            window.connection.send(o),
            r({
                code: n.code_200,
                msg: n.send_hard_remove_strem_msg
            })
        },
        keepAlive: function(e, t, n) {
            $.ajax({
                url: window.serverPath + "/clientApi/keepAlive/" + e + "/" + t + "/" + n,
                processData: !1,
                type: "get",
                async: !1,
                success: function(e) {
                    console.log("send keep alive request success : ", e)
                },
                error: function(e, t, n) {
                    console.error("send keep alive request failed :", e, t, n)
                }
            })
        },
        sendHandsUpMsg: function(e, t, n, r, o, i) {
            var s = $msg({
                type: "chat",
                to: e
            });
            s.c("body", {
                xmlns: "http://igniterealtime.org/protocol/handsUp",
                type: r
            }),
            s.c("nickname").t(t).up(),
            n && s.c("content").t(n).up(),
            s.up();
            try {
                window.connection.send(s),
                o()
            } catch(e) {
                i(e)
            }
        },
        responseHandsUpMsg: function(e, t, n, r, o) {
            var i = $msg({
                type: "chat",
                to: e
            });
            i.c("body", {
                xmlns: "http://igniterealtime.org/protocol/handsUp",
                type: t
            }),
            n && i.c("content").t(n).up(),
            i.up();
            try {
                window.connection.send(i),
                r()
            } catch(e) {
                o(e)
            }
        },
        broadcastRoomLockStatus: function(e) {
            var t = $msg({
                to: connection.emuc.roomjid,
                type: "groupchat"
            });
            return t.c("body", {
                xmlns: "http://igniterealtime.org/protocol/roomlock",
                jid: connection.emuc.connection.jid
            }),
            t.c("status").t(e).up().up(),
            window.connection.send(t),
            !0
        }
    };
    e.exports = o
},
function(e, exports, t) {
    var n = t(32);
    Strophe.addConnectionPlugin("jingle", {
        connection: null,
        sessions: {},
        jid2session: {},
        ice_config: void 0 !== window.config && void 0 !== window.config.nat ? {
            iceServers: [{
                url: window.config.nat
            }]
        }: {
            iceServers: [{
                url: "stun:stun.l.google.com:19302"
            }]
        },
        pc_constraints: {},
        media_constraints: {
            mandatory: {
                OfferToReceiveAudio: !0,
                OfferToReceiveVideo: !0
            }
        },
        localAudio: null,
        localVideo: null,
        localScreen: null,
        init: function(e) {
            this.connection = e,
            this.connection.disco && (this.connection.disco.addFeature("urn:xmpp:jingle:1"), this.connection.disco.addFeature("urn:xmpp:jingle:apps:rtp:1"), this.connection.disco.addFeature("urn:xmpp:jingle:transports:ice-udp:1"), this.connection.disco.addFeature("urn:xmpp:jingle:apps:rtp:audio"), this.connection.disco.addFeature("urn:xmpp:jingle:apps:rtp:video"), config.useRtcpMux && this.connection.disco.addFeature("urn:ietf:rfc:5761"), config.useBundle && this.connection.disco.addFeature("urn:ietf:rfc:5888")),
            this.connection.addHandler(this.onJingle.bind(this), "urn:xmpp:jingle:1", "iq", "set", null, null)
        },
        onJingle: function(e) {
            if ("p2p" != window.connectType) {
                var t = $(e).find("jingle").attr("sid"),
                r = $(e).find("jingle").attr("action"),
                o = e.getAttribute("from"),
                i = $iq({
                    type: "result",
                    to: o,
                    id: e.getAttribute("id")
                });
                console.log("on jingle " + r + " from " + o, e, t, this.sessions);
                var s = this.sessions[t];
                if ("session-initiate" != r) {
                    if (null === s) return i.type = "error",
                    i.c("error", {
                        type: "cancel"
                    }).c("item-not-found", {
                        xmlns: "urn:ietf:params:xml:ns:xmpp-stanzas"
                    }).up().c("unknown-session", {
                        xmlns: "urn:xmpp:jingle:errors:1"
                    }),
                    this.connection.send(i),
                    !0;
                    if (Strophe.getBareJidFromJid(o) != Strophe.getBareJidFromJid(s.peerjid)) return console.warn("jid mismatch for session id", t, o, s.peerjid),
                    i.type = "error",
                    i.c("error", {
                        type: "cancel"
                    }).c("item-not-found", {
                        xmlns: "urn:ietf:params:xml:ns:xmpp-stanzas"
                    }).up().c("unknown-session", {
                        xmlns: "urn:xmpp:jingle:errors:1"
                    }),
                    this.connection.send(i),
                    !0
                } else if (void 0 !== s) return i.type = "error",
                i.c("error", {
                    type: "cancel"
                }).c("service-unavailable", {
                    xmlns: "urn:ietf:params:xml:ns:xmpp-stanzas"
                }).up(),
                console.warn("duplicate session id", t),
                this.connection.send(i),
                !0;
                switch (this.connection.send(i), r) {
                case "session-initiate":
                    s = new n($(e).attr("to"), $(e).find("jingle").attr("sid"), this.connection),
                    this.localAudio != this.localVideo && s.localStreams.push(this.localAudio),
                    this.localVideo && s.localStreams.push(this.localVideo),
                    s.media_constraints = this.media_constraints,
                    s.pc_constraints = this.pc_constraints,
                    s.ice_config = this.ice_config,
                    s.initiate(o, !1),
                    s.setRemoteDescription($(e).find(">jingle"), "offer"),
                    this.sessions[s.sid] = s,
                    this.jid2session[s.peerjid] = s,
                    $(document).trigger("callincoming.jingle", [s.sid]);
                    break;
                case "session-accept":
                    s.setRemoteDescription($(e).find(">jingle"), "answer"),
                    s.accept(),
                    $(document).trigger("callaccepted.jingle", [s.sid]);
                    break;
                case "session-terminate":
                    if (Object.keys(this.sessions).length < 1 || !(this.sessions[Object.keys(this.sessions)[0]] instanceof n)) break;
                    console.log("terminating...", s.sid),
                    s.terminate(),
                    this.terminate(s.sid),
                    $(e).find(">jingle>reason").length ? $(document).trigger("callterminated.jingle", [s.sid, s.peerjid, $(e).find(">jingle>reason>:first")[0].tagName, $(e).find(">jingle>reason>text").text()]) : $(document).trigger("callterminated.jingle", [s.sid, s.peerjid]);
                    break;
                case "transport-info":
                    s.addIceCandidate($(e).find(">jingle>content"));
                    break;
                case "session-info":
                    var a;
                    $(e).find('>jingle>ringing[xmlns="urn:xmpp:jingle:apps:rtp:info:1"]').length ? $(document).trigger("ringing.jingle", [s.sid]) : $(e).find('>jingle>mute[xmlns="urn:xmpp:jingle:apps:rtp:info:1"]').length ? (a = $(e).find('>jingle>mute[xmlns="urn:xmpp:jingle:apps:rtp:info:1"]').attr("name"), $(document).trigger("mute.jingle", [s.sid, a])) : $(e).find('>jingle>unmute[xmlns="urn:xmpp:jingle:apps:rtp:info:1"]').length && (a = $(e).find('>jingle>unmute[xmlns="urn:xmpp:jingle:apps:rtp:info:1"]').attr("name"), $(document).trigger("unmute.jingle", [s.sid, a]));
                    break;
                case "addsource":
                case "source-add":
                    s.addSource($(e).find(">jingle>content"), o);
                    break;
                case "removesource":
                case "source-remove":
                    s.removeSource($(e).find(">jingle>content"), o);
                    break;
                default:
                    console.warn("jingle action not implemented", r)
                }
                return ! 0
            }
        },
        initiate: function(e, t) {
            var r = new n(t || this.connection.jid, Math.random().toString(36).substr(2, 12), this.connection);
            return this.localAudio != this.localVideo && r.localStreams.push(this.localAudio),
            this.localVideo && r.localStreams.push(this.localVideo),
            r.media_constraints = this.media_constraints,
            r.pc_constraints = this.pc_constraints,
            r.ice_config = this.ice_config,
            r.initiate(e, !0),
            this.sessions[r.sid] = r,
            this.jid2session[r.peerjid] = r,
            r.sendOffer(),
            r
        },
        terminate: function(e, t, n) {
            if (null === e || void 0 === e) for (e in this.sessions)"ended" != this.sessions[e].state && (this.sessions[e].sendTerminate(t || !this.sessions[e].active() ? "cancel": null, n), this.sessions[e].terminate()),
            delete this.jid2session[this.sessions[e].peerjid],
            delete this.sessions[e];
            else this.sessions.hasOwnProperty(e) && ("ended" != this.sessions[e].state && (this.sessions[e].sendTerminate(t || !this.sessions[e].active() ? "cancel": null, n), this.sessions[e].terminate()), delete this.jid2session[this.sessions[e].peerjid], delete this.sessions[e])
        },
        terminateByJid: function(e) {
            if (this.jid2session.hasOwnProperty(e)) {
                var t = this.jid2session[e];
                t && (t.terminate(), console.log("peer went away silently", e), delete this.sessions[t.sid], delete this.jid2session[e], $(document).trigger("callterminated.jingle", [t.sid, e], "gone"))
            }
        },
        terminateRemoteByJid: function(e, t) {
            if (this.jid2session.hasOwnProperty(e)) {
                var n = this.jid2session[e];
                n && (n.sendTerminate(t || !n.active() ? "kick": null), n.terminate(), console.log("terminate peer with jid", n.sid, e), delete this.sessions[n.sid], delete this.jid2session[e], $(document).trigger("callterminated.jingle", [n.sid, e, "kicked"]))
            }
        },
        getStunAndTurnCredentials: function() {
            var e = this;
            this.connection.sendIQ($iq({
                type: "get",
                to: this.connection.domain
            }).c("services", {
                xmlns: "urn:xmpp:extdisco:1"
            }).c("service", {
                host: "turn." + this.connection.domain
            }),
            function(t) {
                var n = [];
                $(t).find(">services>service").each(function(e, t) {
                    t = $(t);
                    var r = {},
                    o = t.attr("type");
                    switch (o) {
                    case "stun":
                        r.url = "stun:" + t.attr("host"),
                        t.attr("port") && (r.url += ":" + t.attr("port")),
                        n.push(r);
                        break;
                    case "turn":
                    case "turns":
                        r.url = o + ":",
                        t.attr("username") && (navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./) && parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10) < 28 ? r.url += t.attr("username") + "@": r.username = t.attr("username")),
                        r.url += t.attr("host"),
                        t.attr("port") && "3478" != t.attr("port") && (r.url += ":" + t.attr("port")),
                        t.attr("transport") && "udp" != t.attr("transport") && (r.url += "?transport=" + t.attr("transport")),
                        t.attr("password") && (r.credential = t.attr("password")),
                        n.push(r)
                    }
                }),
                e.ice_config.iceServers = n
            },
            function(e) {
                console.warn("getting turn credentials failed", e),
                console.warn("is mod_turncredentials or similar installed?")
            })
        }
    })
},
function(e, exports, t) {
    function n(e, t, n) {
        r.call(this, n, t),
        this.me = e,
        this.initiator = null,
        this.responder = null,
        this.isInitiator = null,
        this.peerjid = null,
        this.state = null,
        this.localSDP = null,
        this.remoteSDP = null,
        this.localStreams = [],
        this.relayedStreams = [],
        this.remoteStreams = [],
        this.startTime = null,
        this.stopTime = null,
        this.media_constraints = null,
        this.pc_constraints = null,
        this.ice_config = {},
        this.drip_container = [],
        this.usetrickle = !0,
        this.usepranswer = !1,
        this.usedrip = !1,
        this.hadstuncandidate = !1,
        this.hadturncandidate = !1,
        this.lasticecandidate = !1,
        this.statsinterval = null,
        this.reason = null,
        this.relayHost = null,
        this.relayLocalPort = null,
        this.relayRemotePort = null,
        this.wait = !0,
        this.localStreamsSSRC = null
    }
    var r = t(33),
    o = t(34),
    i = t(41),
    s = t(36);
    n.prototype = Object.create(r.prototype),
    n.prototype.initiate = function(e, t) {
        var n = this;
        return null !== this.state ? void console.error("attempt to initiate on session " + this.sid + "in state " + this.state) : (this.isInitiator = t, this.state = "pending", this.initiator = t ? this.me: e, this.responder = t ? e: this.me, this.peerjid = e, this.hadstuncandidate = !1, this.hadturncandidate = !1, this.lasticecandidate = !1, this.peerconnection = new i(this.connection.jingle.ice_config, this.connection.jingle.pc_constraints), this.peerconnection.onicecandidate = function(e) {
            n.sendIceCandidate(e.candidate)
        },
        this.peerconnection.onaddstream = function(e) {
            n.remoteStreams.push(e.stream),
            console.log("REMOTE STREAM ADDED:", e, "\n stream ", e.stream, " \n stream id:  ", e.stream.id),
            $(document).trigger("remotestreamadded.jingle", [e, n.sid])
        },
        this.peerconnection.onremovestream = function(e) {
            var t = n.remoteStreams.indexOf(e.stream);
            t !== -1 && n.remoteStreams.splice(t, 1),
            $(document).trigger("remotestreamremoved.jingle", [e, n.sid])
        },
        this.peerconnection.onsignalingstatechange = function(e) { ! n || !n.peerconnection
        },
        this.peerconnection.oniceconnectionstatechange = function(e) {
            if (n && n.peerconnection) {
                switch (n.peerconnection.iceConnectionState) {
                case "connected":
                    this.startTime = new Date;
                    break;
                case "disconnected":
                    this.stopTime = new Date
                }
                $(document).trigger("iceconnectionstatechange.jingle", [n.sid, n])
            }
        },
        this.localStreams.forEach(function(e) {
            n.peerconnection.addStream(e)
        }), void this.relayedStreams.forEach(function(e) {
            n.peerconnection.addStream(e)
        }))
    },
    n.prototype.accept = function() {
        var e = this;
        this.state = "active";
        var t = this.peerconnection.localDescription;
        if (t && "pranswer" == t.type) {
            if (console.log("going from pranswer to answer"), this.usetrickle) for (var n = SDPUtil.find_lines(t.sdp, "a=candidate:"), r = 0; r < n.length; r++) t.sdp = t.sdp.replace(n[r] + "\r\n", "");
            for (; SDPUtil.find_line(t.sdp, "a=inactive");) t.sdp = t.sdp.replace("a=inactive", "a=sendrecv");
            t = s.reverseTransformLocalDescription(t);
            var i = new o(t.sdp),
            a = $iq({
                to: this.peerjid,
                type: "set"
            }).c("jingle", {
                xmlns: "urn:xmpp:jingle:1",
                action: "session-accept",
                initiator: this.initiator,
                responder: this.responder,
                sid: this.sid
            });
            i.toJingle(a, this.initiator == this.me ? "initiator": "responder", this.localStreamsSSRC);
            for (var c = this.peerconnection.localDescription.sdp; SDPUtil.find_line(c, "a=inactive");) c = c.replace("a=inactive", "a=sendrecv");
            this.peerconnection.setLocalDescription(new RTCSessionDescription({
                type: "answer",
                sdp: c
            }),
            function() {
                $(document).trigger("setLocalDescription.jingle", [e.sid]),
                this.connection.sendIQ(a,
                function() {
                    var t = {};
                    t.source = "answer",
                    $(document).trigger("ack.jingle", [e.sid, t])
                },
                function(t) {
                    var n = $(t).find("error").length ? {
                        code: $(t).find("error").attr("code"),
                        reason: $(t).find("error :first")[0].tagName
                    }: {};
                    n.source = "answer",
                    $(document).trigger("error.jingle", [e.sid, n])
                })
            },
            function(e) {
                console.error("setLocalDescription failed", e)
            })
        }
    },
    n.prototype.sendSSRCUpdate = function(e, t, n) {
        var r = this;
        this.sendSSRCUpdateIq(e, r.sid, r.initiator, r.peerjid, n)
    },
    n.prototype.terminate = function(e) {
        this.state = "ended",
        this.reason = e,
        this.peerconnection.close(),
        null !== this.statsinterval && (window.clearInterval(this.statsinterval), this.statsinterval = null)
    },
    n.prototype.active = function() {
        return "active" == this.state
    },
    n.prototype.sendIceCandidate = function(e) {
        var t = this;
        if (e && !this.lasticecandidate) {
            var n = SDPUtil.iceparams(this.localSDP.media[e.sdpMLineIndex], this.localSDP.session),
            r = SDPUtil.candidateToJingle(e.candidate);
            if (!n || !r) return void console.error("failed to get ice && jcand");
            if (n.xmlns = "urn:xmpp:jingle:transports:ice-udp:1", "srflx" === r.type ? this.hadstuncandidate = !0 : "relay" === r.type && (this.hadturncandidate = !0), this.usetrickle) {
                if (this.usedrip) return 0 === this.drip_container.length && window.setTimeout(function() {
                    0 !== t.drip_container.length && (t.sendIceCandidates(t.drip_container), t.drip_container = [])
                },
                20),
                void this.drip_container.push(e);
                t.sendIceCandidates([e])
            }
        } else {
            if (!this.usetrickle) {
                var i = $iq({
                    to: this.peerjid,
                    type: "set"
                }).c("jingle", {
                    xmlns: "urn:xmpp:jingle:1",
                    action: "offer" == this.peerconnection.localDescription.type ? "session-initiate": "session-accept",
                    initiator: this.initiator,
                    sid: this.sid
                });
                this.localSDP = new o(this.peerconnection.localDescription.sdp);
                var t = this,
                s = function(e) {
                    e || (e = {}),
                    t.localSDP.toJingle(i, t.initiator == t.me ? "initiator": "responder", e),
                    t.connection.sendIQ(i,
                    function() {
                        var e = {};
                        e.source = "offer",
                        $(document).trigger("ack.jingle", [t.sid, e])
                    },
                    function(e) {
                        t.state = "error",
                        t.peerconnection.close();
                        var n = $(e).find("error").length ? {
                            code: $(e).find("error").attr("code"),
                            reason: $(e).find("error :first")[0].tagName
                        }: {};
                        n.source = "offer",
                        $(document).trigger("error.jingle", [t.sid, n])
                    })
                };
                RTC.getLocalSSRC(this,
                function(e) {
                    e ? (s(e), $(document).trigger("setLocalDescription.jingle", [t.sid])) : s()
                })
            }
            this.lasticecandidate = !0,
            console.log("Have we encountered any srflx candidates? " + this.hadstuncandidate),
            console.log("Have we encountered any relay candidates? " + this.hadturncandidate),
            this.hadstuncandidate || this.hadturncandidate || "closed" == this.peerconnection.signalingState || $(document).trigger("nostuncandidates.jingle", [this.sid])
        }
    },
    n.prototype.sendIceCandidates = function(e) {
        console.log("sendIceCandidates", e);
        for (var t = this,
        n = !1,
        r = $iq({
            to: this.peerjid,
            type: "set"
        }).c("jingle", {
            xmlns: "urn:xmpp:jingle:1",
            action: "transport-info",
            initiator: this.initiator,
            sid: this.sid
        }), o = 0; o < this.localSDP.media.length; o++) {
            var i = e.filter(function(e) {
                return e.sdpMLineIndex == o
            }),
            s = SDPUtil.parse_mline(this.localSDP.media[o].split("\r\n")[0]);
            if (i.length > 0) {
                var a = SDPUtil.iceparams(this.localSDP.media[o], this.localSDP.session);
                a.xmlns = "urn:xmpp:jingle:transports:ice-udp:1",
                r.c("content", {
                    creator: this.initiator == this.me ? "initiator": "responder",
                    name: i[0].sdpMid ? i[0].sdpMid: s.media
                }).c("transport", a);
                for (var c = 0; c < i.length; c++) r.c("candidate", SDPUtil.candidateToJingle(i[c].candidate)).up();
                if (SDPUtil.find_line(this.localSDP.media[o], "a=fingerprint:", this.localSDP.session)) {
                    var d = SDPUtil.parse_fingerprint(SDPUtil.find_line(this.localSDP.media[o], "a=fingerprint:", this.localSDP.session));
                    d.required = !0,
                    r.c("fingerprint", {
                        xmlns: "urn:xmpp:jingle:apps:dtls:0"
                    }).t(d.fingerprint),
                    delete d.fingerprint,
                    r.attrs(d),
                    r.up()
                }
                r.up(),
                r.up()
            }
            t.relayDone = n
        }
        this.connection.sendIQ(r,
        function() {
            var e = {};
            e.source = "transportinfo",
            $(document).trigger("ack.jingle", [this.sid, e])
        },
        function(e) {
            var t = $(e).find("error").length ? {
                code: $(e).find("error").attr("code"),
                reason: $(e).find("error :first")[0].tagName
            }: {};
            t.source = "transportinfo",
            $(document).trigger("error.jingle", [this.sid, t])
        })
    },
    n.prototype.sendOffer = function() {
        var e = this;
        this.peerconnection.createOffer(function(t) {
            e.createdOffer(t)
        },
        function(e) {
            console.error("createOffer failed", e)
        },
        this.media_constraints)
    },
    n.prototype.createdOffer = function(e) {
        var t = this;
        this.localSDP = new o(e.sdp);
        var n = function() {
            var e = $iq({
                to: this.peerjid,
                type: "set"
            }).c("jingle", {
                xmlns: "urn:xmpp:jingle:1",
                action: "session-initiate",
                initiator: this.initiator,
                sid: this.sid
            });
            this.localSDP.toJingle(e, this.initiator == this.me ? "initiator": "responder", this.localStreamsSSRC),
            this.connection.sendIQ(e,
            function() {
                var e = {};
                e.source = "offer",
                $(document).trigger("ack.jingle", [t.sid, e])
            },
            function(e) {
                t.state = "error",
                t.peerconnection.close();
                var n = $(e).find("error").length ? {
                    code: $(e).find("error").attr("code"),
                    reason: $(e).find("error :first")[0].tagName
                }: {};
                n.source = "offer",
                $(document).trigger("error.jingle", [t.sid, n])
            })
        };
        this.peerconnection.setLocalDescription(e,
        function() {
            this.usetrickle ? RTC.getLocalSSRC(function(e) {
                n(e),
                $(document).trigger("setLocalDescription.jingle", [t.sid])
            }) : $(document).trigger("setLocalDescription.jingle", [t.sid])
        },
        function(e) {
            console.error("setLocalDescription failed", e)
        });
        for (var r = SDPUtil.find_lines(this.localSDP.raw, "a=candidate:"), i = 0; i < r.length; i++) {
            var s = SDPUtil.parse_icecandidate(r[i]);
            "srflx" == s.type ? this.hadstuncandidate = !0 : "relay" == s.type && (this.hadturncandidate = !0)
        }
    },
    n.prototype.setRemoteDescription = function(e, t) {
        if (this.remoteSDP = new o(""), this.remoteSDP.fromJingle(e), null !== this.peerconnection.remoteDescription && (console.log("setRemoteDescription when remote description is not null, should be pranswer", this.peerconnection.remoteDescription), "pranswer" == this.peerconnection.remoteDescription.type)) {
            for (var n = new o(this.peerconnection.remoteDescription.sdp), r = 0; r < n.media.length; r++) {
                SDPUtil.find_line(this.remoteSDP.media[r], "a=ice-ufrag:", this.remoteSDP.session) || (SDPUtil.find_line(n.media[r], "a=ice-ufrag:", n.session) ? this.remoteSDP.media[r] += SDPUtil.find_line(n.media[r], "a=ice-ufrag:", n.session) + "\r\n": console.warn("no ice ufrag?"), SDPUtil.find_line(n.media[r], "a=ice-pwd:", n.session) ? this.remoteSDP.media[r] += SDPUtil.find_line(n.media[r], "a=ice-pwd:", n.session) + "\r\n": console.warn("no ice pwd?"));
                for (var i = SDPUtil.find_lines(n.media[r], "a=candidate:"), s = 0; s < i.length; s++) this.remoteSDP.media[r] += i[s] + "\r\n"
            }
            this.remoteSDP.raw = this.remoteSDP.session + this.remoteSDP.media.join("")
        }
        var a = new RTCSessionDescription({
            type: t,
            sdp: this.remoteSDP.raw
        }),
        c = this;
        this.peerconnection.setRemoteDescription(a,
        function() {
            console.log("setRemoteDescription success")
        },
        function(e) {
            console.error("setRemoteDescription error", e),
            $(document).trigger("fatalError.jingle", [c, e])
        })
    },
    n.prototype.addIceCandidate = function(e) {
        var t = this;
        if ("closed" != this.peerconnection.signalingState) {
            if (!this.peerconnection.remoteDescription && "have-local-offer" == this.peerconnection.signalingState) {
                if (console.log("trickle ice candidate arriving before session accept..."), !this.remoteSDP) {
                    for (var n = "v=0\r\no=- 1923518516 2 IN IP4 0.0.0.0\r\ns=-\r\nt=0 0\r\n",
                    r = 0; r < this.localSDP.media.length; r++) n += SDPUtil.find_line(this.localSDP.media[r], "m=") + "\r\n",
                    n += SDPUtil.find_lines(this.localSDP.media[r], "a=rtpmap:").join("\r\n") + "\r\n",
                    SDPUtil.find_line(this.localSDP.media[r], "a=mid:") && (n += SDPUtil.find_line(this.localSDP.media[r], "a=mid:") + "\r\n"),
                    n += "a=inactive\r\n";
                    this.remoteSDP = new o(n)
                }
                e.each(function() {
                    for (var e = 0; e < t.remoteSDP.media.length; e++) if ((SDPUtil.find_line(t.remoteSDP.media[e], "a=mid:" + $(this).attr("name")) || 0 === t.remoteSDP.media[e].indexOf("m=" + $(this).attr("name"))) && !SDPUtil.find_line(t.remoteSDP.media[e], "a=ice-ufrag:")) {
                        var n = $(this).find("transport");
                        t.remoteSDP.media[e] += "a=ice-ufrag:" + n.attr("ufrag") + "\r\n",
                        t.remoteSDP.media[e] += "a=ice-pwd:" + n.attr("pwd") + "\r\n",
                        n = $(this).find("transport>fingerprint"),
                        n.length ? t.remoteSDP.media[e] += "a=fingerprint:" + n.attr("hash") + " " + n.text() + "\r\n": (console.log("no dtls fingerprint (webrtc issue #1718?)"), t.remoteSDP.media[e] += "a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:BAADBAADBAADBAADBAADBAADBAADBAADBAADBAAD\r\n");
                        break
                    }
                }),
                this.remoteSDP.raw = this.remoteSDP.session + this.remoteSDP.media.join("");
                var i = this.remoteSDP.media.filter(function(e) {
                    return SDPUtil.find_line(e, "a=ice-ufrag:")
                }).length == this.remoteSDP.media.length;
                if (i) {
                    console.log("setting pranswer");
                    try {
                        this.peerconnection.setRemoteDescription(new RTCSessionDescription({
                            type: "pranswer",
                            sdp: this.remoteSDP.raw
                        }),
                        function() {},
                        function(e) {
                            console.log("setRemoteDescription pranswer failed", e.toString())
                        })
                    } catch(e) {
                        console.error("setting pranswer failed", e)
                    }
                }
            }
            e.each(function() {
                var e, n = -1;
                for (e = 0; e < t.remoteSDP.media.length; e++) if (SDPUtil.find_line(t.remoteSDP.media[e], "a=mid:" + $(this).attr("name")) || 0 === t.remoteSDP.media[e].indexOf("m=" + $(this).attr("name"))) {
                    n = e;
                    break
                }
                if (n == -1) for (e = 0; e < t.localSDP.media.length; e++) if (SDPUtil.find_line(t.localSDP.media[e], "a=mid:" + $(this).attr("name")) || 0 === t.localSDP.media[e].indexOf("m=" + $(this).attr("name"))) {
                    n = e;
                    break
                }
                var r = $(this).attr("name");
                $(this).find("transport>candidate").each(function() {
                    var e, o;
                    e = SDPUtil.candidateFromJingle(this),
                    o = new RTCIceCandidate({
                        sdpMLineIndex: n,
                        sdpMid: r,
                        candidate: e
                    });
                    try {
                        t.peerconnection.addIceCandidate(o)
                    } catch(t) {
                        console.error("addIceCandidate failed", t.toString(), e)
                    }
                })
            })
        }
    },
    n.prototype.sendAnswer = function(e) {
        var t = this;
        this.peerconnection.createAnswer(function(n) {
            console.log("createAnswer", e),
            console.log("createAnswer sdp", n),
            t.createdAnswer(n, e)
        },
        function(e) {
            console.error("createAnswer failed", e)
        },
        this.media_constraints)
    },
    n.prototype.createdAnswer = function(e, t) {
        var n = this;
        if (this.localSDP = new o(e.sdp), this.usepranswer = t === !0, this.usetrickle && this.usepranswer) {
            e.type = "pranswer";
            for (var r = 0; r < this.localSDP.media.length; r++) this.localSDP.media[r] = this.localSDP.media[r].replace("a=sendrecv\r\n", "a=inactive\r\n");
            this.localSDP.raw = this.localSDP.session + "\r\n" + this.localSDP.media.join("")
        }
        var n = this,
        i = function(t) {
            var r = $iq({
                to: n.peerjid,
                type: "set"
            }).c("jingle", {
                xmlns: "urn:xmpp:jingle:1",
                action: "session-accept",
                initiator: n.initiator,
                responder: n.responder,
                sid: n.sid
            });
            r.c("attend", {
                xmlns: "http://jitsi.org/protocol/colibri",
                type: "singlevoice",
                endpoint: ""
            }).up();
            var i = s.reverseTransformLocalDescription(e),
            a = new o(i.sdp);
            a.toJingle(r, n.initiator == n.me ? "initiator": "responder", t),
            this.connection.sendIQ(r,
            function() {
                var e = {};
                e.source = "answer",
                $(document).trigger("ack.jingle", [n.sid, e])
            },
            function(e) {
                var t = $(e).find("error").length ? {
                    code: $(e).find("error").attr("code"),
                    reason: $(e).find("error :first")[0].tagName
                }: {};
                t.source = "answer",
                $(document).trigger("error.jingle", [n.sid, t])
            })
        };
        this.peerconnection.setLocalDescription(e,
        function() {
            n.usetrickle && !n.usepranswer ? RTC.getLocalSSRC(n,
            function(e) {
                i(e),
                $(document).trigger("setLocalDescription.jingle", [n.sid])
            }) : $(document).trigger("setLocalDescription.jingle", [n.sid])
        },
        function(e) {
            console.error("setLocalDescription failed", e)
        });
        for (var a = SDPUtil.find_lines(this.localSDP.raw, "a=candidate:"), c = 0; c < a.length; c++) {
            var d = SDPUtil.parse_icecandidate(a[c]);
            "srflx" == d.type ? this.hadstuncandidate = !0 : "relay" == d.type && (this.hadturncandidate = !0)
        }
    },
    n.prototype.sendTerminate = function(e, t) {
        var n = this,
        r = $iq({
            to: this.peerjid,
            type: "set"
        }).c("jingle", {
            xmlns: "urn:xmpp:jingle:1",
            action: "session-terminate",
            initiator: this.initiator,
            sid: this.sid
        }).c("reason").c(e || "success");
        t && r.up().c("text").t(t),
        this.connection.sendIQ(r,
        function() {
            n.peerconnection.close(),
            n.peerconnection = null,
            n.terminate();
            var e = {};
            e.source = "terminate",
            $(document).trigger("ack.jingle", [n.sid, e])
        },
        function(e) {
            var t = $(e).find("error").length ? {
                code: $(e).find("error").attr("code"),
                reason: $(e).find("error :first")[0].tagName
            }: {};
            $(document).trigger("ack.jingle", [n.sid, t])
        }),
        null !== this.statsinterval && (window.clearInterval(this.statsinterval), this.statsinterval = null)
    },
    n.prototype.sendMute = function(e, t) {
        var n = $iq({
            to: this.peerjid,
            type: "set"
        }).c("jingle", {
            xmlns: "urn:xmpp:jingle:1",
            action: "session-info",
            initiator: this.initiator,
            sid: this.sid
        });
        n.c(e ? "mute": "unmute", {
            xmlns: "urn:xmpp:jingle:apps:rtp:info:1"
        }),
        n.attrs({
            creator: this.me == this.initiator ? "creator": "responder"
        }),
        t && n.attrs({
            name: t
        }),
        this.connection.send(n)
    },
    n.prototype.sendRinging = function() {
        var e = $iq({
            to: this.peerjid,
            type: "set"
        }).c("jingle", {
            xmlns: "urn:xmpp:jingle:1",
            action: "session-info",
            initiator: this.initiator,
            sid: this.sid
        });
        e.c("ringing", {
            xmlns: "urn:xmpp:jingle:apps:rtp:info:1"
        }),
        this.connection.send(e)
    },
    n.prototype.getStats = function(e) {
        var t = this,
        n = {
            audio: 0,
            video: 0
        },
        r = {
            audio: 0,
            video: 0
        },
        o = {
            audio: 0,
            video: 0
        },
        i = {
            audio: 0,
            video: 0
        },
        s = {
            audio: 0,
            video: 0
        },
        a = {
            audio: 0,
            video: 0
        };
        return this.statsinterval = window.setInterval(function() {
            t && t.peerconnection && t.peerconnection.getStats && t.peerconnection.getStats(function(e) {
                for (var c = e.result(), d = 0; d < c.length; ++d) if ("ssrc" == c[d].type) {
                    var u = c[d].stat("packetsReceived"),
                    l = c[d].stat("packetsLost");
                    u && l && (u = parseInt(u, 10), l = parseInt(l, 10), c[d].stat("googFrameRateReceived") ? (i.video = r.video, o.video = n.video, n.video = u, r.video = l) : (i.audio = r.audio, o.audio = n.audio, n.audio = u, r.audio = l))
                }
                a.audio = n.audio - o.audio,
                a.video = n.video - o.video,
                s.audio = a.audio > 0 ? Math.ceil(100 * (r.audio - i.audio) / a.audio) : 0,
                s.video = a.video > 0 ? Math.ceil(100 * (r.video - i.video) / a.video) : 0,
                $(document).trigger("packetloss.jingle", [t.sid, s])
            })
        },
        e || 3e3),
        this.statsinterval
    },
    exports = e.exports = n
},
function(e, exports, t) {
    function n(e, t) {
        this.connection = e,
        this.sid = t,
        this.screenSender = null,
        this.videoMuteByUser = !1
    }
    var r = t(34),
    o = t(30),
    i = (t(36), t(37)),
    s = t(27);
    n.prototype.modifySources = function(e) {
        var t = this;
        if (this.peerconnection) {
            var n = !1;
            e && (n = !0),
            this.peerconnection.modifySources(function() {
                console.log("AAAAA will set local description , sid : ", t.sid),
                $(document).trigger("setLocalDescription.jingle", [t.sid]),
                e && e()
            },
            n)
        }
    },
    n.prototype.addSource = function(e, t) {
        var n = this;
        return n.peerconnection.localDescription ? (n.peerconnection.addSource(e), void n.modifySources()) : (console.warn("addSource - localDescription not ready yet"), void setTimeout(function() {
            n.addSource(e, t)
        },
        200))
    },
    n.prototype.removeSource = function(e, t) {
        var n = this;
        if (!n.peerconnection.localDescription) return console.warn("removeSource - localDescription not ready yet"),
        void setTimeout(function() {
            n.removeSource(e, t)
        },
        200);
        n.peerconnection.removeSource(e),
        n.modifySources();
        var r = $(e).find("source");
        $(document).trigger("mains.on.stream.removed", [$(e).attr("name"), r.attr("ssrc"), !1])
    },
    n.prototype.getSendersByType = function(e) {
        var t = this,
        n = "video" == e ? t.peerconnection.localVideoSender: t.peerconnection.localAudioSender;
        if (!n) for (var r = t.peerconnection.peerconnection.getSenders(), o = 0; o < r.length; o++) {
            var i = r[o];
            i.track.kind != e || n || (n = i)
        }
        return n
    },
    n.prototype.replaceMediaTrack = function(e, t, n, r) {
        r = "audio" == r ? "audio": "video";
        var o = this,
        i = o.getSendersByType(r);
        if (console.log("============ shall remove sender : ", i), i) {
            o.peerconnection.peerconnection.removeTrack(i),
            e.getTracks().forEach(function(t) {
                var n = o.peerconnection.peerconnection.addTrack(t, e);
                n.track.kind == r && ("video" == r && (o.peerconnection.localVideoSender = n, o.connection.jingle.localVideo = e), "audio" == r && (o.peerconnection.localAudioSender = n, o.connection.jingle.localAudio = e))
            });
            var s = new Event("negotiationneeded");
            o.peerconnection.peerconnection.dispatchEvent(s),
            o.peerconnection.setRemoteDescription(o.peerconnection.remoteDescription,
            function() {
                console.info("set remote description success "),
                o.peerconnection.createAnswer(function(e) {
                    console.log("=============== create answer success : ", e);
                    var t = o.replaceSdpSsrc(o.peerconnection.localDescription.sdp, e.sdp, r);
                    e.sdp = t,
                    console.log("=============== answer modified : ", e),
                    o.peerconnection.setLocalDescription(e,
                    function() {
                        n()
                    },
                    function(e) {
                        console.error("set local description failed", e)
                    })
                },
                function(e) {
                    console.error("create answer failed", e)
                })
            },
            function(e) {
                console.error("set remote description failed : ", e)
            })
        }
    },
    n.prototype.peerconnectionNegotiate = function(e) {
        var t = this,
        n = new Event("negotiationneeded");
        t.peerconnection.peerconnection.dispatchEvent(n),
        t.peerconnection.setRemoteDescription(t.peerconnection.remoteDescription,
        function() {
            console.info("set remote description success "),
            t.peerconnection.createAnswer(function(n) {
                console.log("=============== create answer success : ", n),
                console.log("=============== answer modified : ", n),
                t.peerconnection.setLocalDescription(n,
                function() {
                    e()
                },
                function(e) {
                    console.error("set local description failed", e)
                })
            },
            function(e) {
                console.error("create answer failed", e)
            })
        },
        function(e) {
            console.error("set remote description failed : ", e)
        })
    },
    n.prototype.replaceSdpSsrc = function(e, t, n) {
        console.log("============ oldSdp : ", "\r\n", i.parse(e), "\r\n", n),
        console.log("============ newSdp : ", "\r\n", i.parse(t), "\r\n", n);
        var r = i.parse(e),
        o = [];
        r.media && r.media.length && r.media.forEach(function(e) {
            e.type == n && (o = e.ssrcs.map(function(e) {
                return e.id
            }))
        }),
        console.log("=========== old sdp ", n, " ssrcs : ", o);
        var s = i.parse(t),
        a = [];
        s.media && s.media.length && s.media.forEach(function(e) {
            e.type == n && (a = e.ssrcs.map(function(e) {
                return e.id
            }))
        }),
        console.log("============== new sdp ", n, " ssrcs : ", a);
        for (var c = {},
        d = 0; d < a.length; d++) for (var u = a[d], l = 0; l < o.length; l++) {
            var p = o[l];
            a.indexOf(p) == -1 && o.indexOf(u) == -1 && (c.from = u, c.to = p)
        }
        return console.log("==============  sdp replace to : ", c),
        s.media && s.media.length && s.media.forEach(function(e) {
            if (e.type == n) {
                var t = e.ssrcs.map(function(e) {
                    return e.id == c.from && (e.id = c.to),
                    e
                });
                e.ssrcs = t
            }
        }),
        console.log("============== sdp replaced : ", s),
        i.write(s)
    },
    n.prototype.switchStreams = function(e, t, n) {
        console.log("old stream : ", t, " new stream : ", e);
        var o = this;
        t.getAudioTracks().length && t.getAudioTracks().forEach(function(e) {
            e.stop()
        }),
        t.getVideoTracks().length && t.getVideoTracks().forEach(function(e) {
            e.stop()
        });
        var i = null;
        return o.peerconnection && (o.peerconnection.localDescription && (i = new r(o.peerconnection.localDescription.sdp)), o.peerconnection.removeStream(t, !0), o.peerconnection.addStream(e)),
        o.connection.jingle.localVideo = e,
        o.connection.jingle.localStreams = [],
        o.connection.jingle.localAudio != o.connection.jingle.localVideo && o.connection.jingle.localStreams.push(o.connection.jingle.localAudio),
        o.connection.jingle.localStreams.push(o.connection.jingle.localVideo),
        i && o.peerconnection ? (o.peerconnection.switchstreams = !0, void o.modifySources(function() {
            console.log("modify sources done"),
            n();
            var e = new r(o.peerconnection.localDescription.sdp);
            console.log("SDPs", i, e),
            o.notifyMySSRCUpdate(i, e)
        })) : void n()
    },
    n.prototype.removeScreen = function(e, t) {
        var n = this;
        e.getAudioTracks().length && e.getAudioTracks().forEach(function(e) {
            e.stop()
        }),
        e.getVideoTracks().length && e.getVideoTracks().forEach(function(e) {
            e.stop()
        });
        var o = null;
        return n.peerconnection && (n.peerconnection.localDescription && (o = new r(n.peerconnection.localDescription.sdp)), console.log("AAAAAAAAAAAAAAA peerconnection ", n.peerconnection, n.peerconnection.peerconnection.removeTrack), void 0 != n.peerconnection.peerconnection.removeTrack ? (n.peerconnection.peerconnection.removeTrack(n.screenSender), console.log("AAAAAAAAAAAAAAAA remove screen track", n.screenSender)) : n.peerconnection.removeStream(e, !0)),
        n.connection.jingle.localStreams = [],
        n.connection.jingle.localAudio != n.connection.jingle.localVideo && n.connection.jingle.localStreams.push(n.connection.jingle.localAudio),
        n.connection.jingle.localStreams.push(n.connection.jingle.localVideo),
        o && n.peerconnection ? (n.peerconnection.switchstreams = !0, void n.modifySources(function() {
            console.log("modify sources done"),
            connection.jingle.localScreen = null,
            t({
                code: 200,
                msg: "remove source from connection complete",
                errorCode: s.no_error
            });
            var e = new r(n.peerconnection.localDescription.sdp);
            console.log("SDPs", o, e),
            n.notifyMySSRCUpdate(o, e)
        })) : (connection.jingle.localScreen = null, void t({
            code: 200,
            msg: "remove source from connection complete",
            errorCode: s.no_error
        }))
    },
    n.prototype.addScreen = function(e, t) {
        var n = this,
        o = null;
        if (n.peerconnection) if (n.peerconnection.localDescription && (o = new r(n.peerconnection.localDescription.sdp)), console.log("AAAAAAAAAAAAAAA peerconnection ", n.peerconnection, n.peerconnection.peerconnection.addTrack), void 0 != n.peerconnection.peerconnection.addTrack) {
            var i = e.getVideoTracks()[0],
            a = n.peerconnection.peerconnection.addTrack(i, e);
            n.screenSender = a,
            console.log("AAAAAAAAAAAAAAAA add screen track", a)
        } else n.peerconnection.addStream(e);
        return n.connection.jingle.localScreen = e,
        n.connection.jingle.localStreams = [],
        n.connection.jingle.localAudio != n.connection.jingle.localScreen && n.connection.jingle.localStreams.push(n.connection.jingle.localScreen),
        n.connection.jingle.localStreams.push(n.connection.jingle.localScreen),
        o && n.peerconnection ? (n.peerconnection.switchstreams = !0, void n.modifySources(function() {
            console.log("modify sources done"),
            t({
                code: 200,
                msg: "success add screen source !",
                response: e,
                errorCode: s.no_error
            });
            var i = new r(n.peerconnection.localDescription.sdp);
            console.log("SDPs", o, i),
            n.notifyMySSRCUpdate(o, i),
            $(document).trigger("mains.on.screen.share.start")
        })) : void t({
            code: 402,
            msg: "Conference is not active",
            errorCode: s.conference_room_wait_others
        })
    },
    n.prototype.notifyMySSRCUpdate = function(e, t) {
        var n = (e.getMediaSsrcMap(), t.getMediaSsrcMap(), e.getNewMedia(t)),
        r = t.getNewMedia(e);
        if (Object.keys(r).length > 0 && this.sendSSRCUpdate(r, null, !1), Object.keys(n).length > 0 && this.sendSSRCUpdate(n, null, !0), Object.keys(n).length > 0 && Object.keys(r).length <= 0) {
            console.log("to add", n);
            var i = null;
            Object.keys(n).forEach(function(e) {
                var t = n[e];
                t.ssrcs && Object.keys(t.ssrcs).forEach(function(e) {
                    i = e
                })
            }),
            i && setTimeout(function() {
                o.sendChangeMainBlockSourceMsg(Strophe.getResourceFromJid(connection.jid), i,
                function(e) {
                    console.log("notice set new stream to main complete")
                },
                !0)
            },
            1e3)
        }
        if (Object.keys(n).length <= 0 && Object.keys(r).length > 0) {
            console.log("to remove", r);
            var s = null;
            Object.keys(r).forEach(function(e) {
                var t = r[e];
                t.ssrcs && Object.keys(t.ssrcs).forEach(function(e) {
                    s = e
                })
            }),
            s && o.sendHardRemoveStreamMsg(Strophe.getResourceFromJid(connection.jid), s,
            function(e) {
                console.log("notice hard remove stream complete", e)
            })
        }
    },
    n.prototype.sendSSRCUpdate = function(e, t, n) {},
    n.prototype.sendSSRCUpdateIq = function(e, t, n, r, o) {
        var i = this,
        s = $iq({
            to: r,
            type: "set"
        }).c("jingle", {
            xmlns: "urn:xmpp:jingle:1",
            action: o ? "source-add": "source-remove",
            initiator: n,
            sid: t
        }),
        a = !1;
        Object.keys(e).forEach(function(t) {
            a = !0;
            var n = e[t];
            s.c("content", {
                name: n.mediaType
            }),
            s.c("description", {
                xmlns: "urn:xmpp:jingle:apps:rtp:1",
                media: n.mediaType
            }),
            Object.keys(n.ssrcs).forEach(function(e) {
                var t = n.ssrcs[e];
                s.c("source", {
                    xmlns: "urn:xmpp:jingle:apps:rtp:ssma:0"
                }),
                s.attrs({
                    ssrc: t.ssrc
                }),
                t.lines.forEach(function(e) {
                    var t = e.indexOf(" "),
                    n = e.substr(t + 1);
                    s.c("parameter"),
                    n.indexOf(":") == -1 ? s.attrs({
                        name: n
                    }) : (s.attrs({
                        name: n.split(":", 2)[0]
                    }), s.attrs({
                        value: n.split(":", 2)[1]
                    })),
                    s.up()
                }),
                s.up()
            }),
            n.ssrcGroups.forEach(function(e) {
                0 != e.ssrcs.length && (s.c("ssrc-group", {
                    semantics: e.semantics,
                    xmlns: "urn:xmpp:jingle:apps:rtp:ssma:0"
                }), e.ssrcs.forEach(function(e) {
                    s.c("source", {
                        ssrc: e
                    }).up()
                }), s.up())
            }),
            s.up(),
            s.up()
        }),
        a ? i.connection.sendIQ(s,
        function(e) {
            console.info("got modify result", e)
        },
        function(e) {
            console.error("got modify error", e)
        }) : console.log("modification not necessary")
    },
    n.prototype.isVideoMute = function() {
        for (var e = connection.jingle.localVideo.getVideoTracks(), t = !0, n = 0; n < e.length; ++n) if (e[n].enabled) {
            t = !1;
            break
        }
        return t
    },
    n.prototype.setVideoMute = function(e, t, n) {
        var r;
        if (n ? (r = n.byUser, "undefined" == typeof r && (r = !0)) : r = !0, r) this.videoMuteByUser = e;
        else if (this.videoMuteByUser) return;
        if (e == this.isVideoMute()) {
            var o = t(e);
            o && o()
        } else {
            for (var i = connection.jingle.localVideo.getVideoTracks(), s = 0; s < i.length; ++s) i[s].enabled = !e;
            this.peerconnection && this.peerconnection.hardMuteVideo(e),
            console.log("switch video mute complete and will modify source"),
            1 == window.isUsingScreenStream ? this.modifySources(t(e)) : this.modifySources(function() {
                t(e)
            })
        }
    },
    n.prototype.toggleVideoMute = function(e) {
        setVideoMute(isVideoMute(), e)
    },
    exports = e.exports = n
},
function(e, exports, t) {
    function n(e, t) {
        this.ssrc = e,
        this.type = t,
        this.lines = []
    }
    function r(e, t, n) {
        this.semantics = e,
        this.ssrcs = t
    }
    function o(e, t) {
        this.chNumber = e,
        this.mediaType = t,
        this.ssrcs = {},
        this.ssrcGroups = []
    }
    function i(e) {
        this.media = e.split("\r\nm=");
        for (var t = 1; t < this.media.length; t++) this.media[t] = "m=" + this.media[t],
        t != this.media.length - 1 && (this.media[t] += "\r\n");
        this.session = this.media.shift() + "\r\n",
        this.raw = this.session + this.media.join("")
    }
    var s = t(35);
    i.prototype.getMediaSsrcMap = function() {
        var e = this,
        t = {};
        for (channelNum = 0; channelNum < e.media.length; channelNum++) {
            modified = !0,
            tmp = s.find_lines(e.media[channelNum], "a=ssrc:");
            var i = s.parse_mid(s.find_line(e.media[channelNum], "a=mid:")),
            a = new o(channelNum, i);
            t[channelNum] = a,
            tmp.forEach(function(e) {
                var t = e.substring(7).split(" ")[0];
                a.ssrcs[t] || (a.ssrcs[t] = new n(t, i)),
                a.ssrcs[t].lines.push(e)
            }),
            tmp = s.find_lines(e.media[channelNum], "a=ssrc-group:"),
            tmp.forEach(function(e) {
                var t = e.substr(0, idx).substr(13),
                n = e.substr(14 + t.length).split(" ");
                if (0 != n.length) {
                    var o = new r(t, n);
                    a.ssrcGroups.push(o)
                }
            })
        }
        return t
    },
    i.prototype.containsSSRC = function(e) {
        var t = this.getMediaSsrcMap(),
        n = !1;
        return Object.keys(t).forEach(function(r) {
            var o = t[r];
            Object.keys(o.ssrcs).indexOf(e) != -1 && (n = !0)
        }),
        n
    },
    i.prototype.getNewMedia = function(e) {
        function t(e) {
            if (!e) return ! 1;
            if (this.length != e.length) return ! 1;
            for (var t = 0,
            n = this.length; t < n; t++) if (this[t] instanceof Array && e[t] instanceof Array) {
                if (!this[t].equals(e[t])) return ! 1
            } else if (this[t] != e[t]) return ! 1;
            return ! 0
        }
        var n = this.getMediaSsrcMap(),
        r = e.getMediaSsrcMap(),
        i = {};
        return Object.keys(r).forEach(function(e) {
            var s = n[e],
            a = r[e];
            return ! s && a ? void(i[e] = a) : (Object.keys(a.ssrcs).forEach(function(t) {
                Object.keys(s.ssrcs).indexOf(t) === -1 && (i[e] || (i[e] = new o(a.chNumber, a.mediaType)), i[e].ssrcs[t] = a.ssrcs[t])
            }), void a.ssrcGroups.forEach(function(n) {
                for (var r = !1,
                c = 0; c < s.ssrcGroups.length; c++) {
                    var d = s.ssrcGroups[c];
                    if (n.semantics == d.semantics && t.apply(n.ssrcs, [d.ssrcs])) {
                        r = !0;
                        break
                    }
                }
                r || (i[e] || (i[e] = new o(a.chNumber, a.mediaType)), i[e].ssrcGroups.push(n))
            }))
        }),
        i
    },
    i.prototype.mangle = function() {
        var e, t, n, r, o, i;
        for (e = 0; e < this.media.length; e++) if (r = this.media[e].split("\r\n"), r.pop(), n = s.parse_mline(r.shift()), "audio" == n.media) {
            for (i = "", n.fmt.length = 0, t = 0; t < r.length; t++) if ("a=rtpmap:" == r[t].substr(0, 9)) {
                if (o = s.parse_rtpmap(r[t]), "CN" == o.name || "ISAC" == o.name) continue;
                n.fmt.push(o.id),
                i += r[t] + "\r\n"
            } else i += r[t] + "\r\n";
            this.media[e] = s.build_mline(n) + "\r\n",
            this.media[e] += i
        }
        this.raw = this.session + this.media.join("")
    },
    i.prototype.removeSessionLines = function(e) {
        var t = this,
        n = s.find_lines(this.session, e);
        return n.forEach(function(e) {
            t.session = t.session.replace(e + "\r\n", "")
        }),
        this.raw = this.session + this.media.join(""),
        n
    },
    i.prototype.removeMediaLines = function(e, t) {
        var n = this,
        r = s.find_lines(this.media[e], t);
        return r.forEach(function(t) {
            n.media[e] = n.media[e].replace(t + "\r\n", "")
        }),
        this.raw = this.session + this.media.join(""),
        r
    },
    i.prototype.toJingle = function(e, t, n) {
        var r, o, i, a, c, d, u, l;
        if (s.find_line(this.session, "a=group:")) for (l = s.find_lines(this.session, "a=group:"), r = 0; r < l.length; r++) {
            u = l[r].split(" ");
            var p = u.shift().substr(8);
            for (e.c("group", {
                xmlns: "urn:xmpp:jingle:apps:grouping:0",
                semantics: p
            }), o = 0; o < u.length; o++) e.c("content", {
                name: u[o]
            }).up();
            e.up()
        }
        for (r = 0; r < this.media.length; r++) if (a = s.parse_mline(this.media[r].split("\r\n")[0]), "audio" === a.media || "video" === a.media || "application" === a.media) {
            if (c = s.find_line(this.media[r], "a=ssrc:") ? s.find_line(this.media[r], "a=ssrc:").substring(7).split(" ")[0] : !(!n || !n[a.media]) && n[a.media], e.c("content", {
                creator: t,
                name: a.media
            }), s.find_line(this.media[r], "a=mid:")) {
                var f = s.parse_mid(s.find_line(this.media[r], "a=mid:"));
                e.attrs({
                    name: f
                })
            }
            if (s.find_line(this.media[r], "a=rtpmap:").length) {
                for (e.c("description", {
                    xmlns: "urn:xmpp:jingle:apps:rtp:1",
                    media: a.media
                }), c && e.attrs({
                    ssrc: c
                }), o = 0; o < a.fmt.length; o++) {
                    if (d = s.find_line(this.media[r], "a=rtpmap:" + a.fmt[o]), e.c("payload-type", s.parse_rtpmap(d)), s.find_line(this.media[r], "a=fmtp:" + a.fmt[o])) for (u = s.parse_fmtp(s.find_line(this.media[r], "a=fmtp:" + a.fmt[o])), i = 0; i < u.length; i++) e.c("parameter", u[i]).up();
                    this.RtcpFbToJingle(r, e, a.fmt[o]),
                    e.up()
                }
                if (s.find_line(this.media[r], "a=crypto:", this.session)) {
                    e.c("encryption", {
                        required: 1
                    });
                    var h = s.find_lines(this.media[r], "a=crypto:", this.session);
                    h.forEach(function(t) {
                        e.c("crypto", s.parse_crypto(t)).up()
                    }),
                    e.up()
                }
                if (c) {
                    e.c("source", {
                        ssrc: c,
                        xmlns: "urn:xmpp:jingle:apps:rtp:ssma:0"
                    });
                    var m = s.find_lines(this.media[r], "a=ssrc:");
                    if (m.length > 0) m.forEach(function(t) {
                        idx = t.indexOf(" ");
                        var n = t.substr(0, idx).substr(7);
                        n != c && (e.up(), c = n, e.c("source", {
                            ssrc: c,
                            xmlns: "urn:xmpp:jingle:apps:rtp:ssma:0"
                        }));
                        var r = t.substr(idx + 1);
                        e.c("parameter"),
                        r.indexOf(":") == -1 ? e.attrs({
                            name: r
                        }) : (e.attrs({
                            name: r.split(":", 2)[0]
                        }), e.attrs({
                            value: r.split(":", 2)[1]
                        })),
                        e.up()
                    }),
                    e.up();
                    else {
                        e.up(),
                        e.c("source", {
                            ssrc: c,
                            xmlns: "urn:xmpp:jingle:apps:rtp:ssma:0"
                        }),
                        e.c("parameter"),
                        e.attrs({
                            name: "cname",
                            value: Math.random().toString(36).substring(7)
                        }),
                        e.up();
                        var g = null;
                        g = "audio" == a.media ? connection.jingle.localAudio.getAudioTracks()[0].id: connection.jingle.localVideo.getVideoTracks()[0].id,
                        null != g && (g = g.replace(/[\{,\}]/g, ""), e.c("parameter"), e.attrs({
                            name: "msid",
                            value: g
                        }), e.up(), e.c("parameter"), e.attrs({
                            name: "mslabel",
                            value: g
                        }), e.up(), e.c("parameter"), e.attrs({
                            name: "label",
                            value: g
                        }), e.up(), e.up())
                    }
                    var _ = s.find_lines(this.media[r], "a=ssrc-group:");
                    _.forEach(function(t) {
                        idx = t.indexOf(" ");
                        var n = t.substr(0, idx).substr(13),
                        r = t.substr(14 + n.length).split(" ");
                        0 != r.length && (e.c("ssrc-group", {
                            semantics: n,
                            xmlns: "urn:xmpp:jingle:apps:rtp:ssma:0"
                        }), r.forEach(function(t) {
                            e.c("source", {
                                ssrc: t
                            }).up()
                        }), e.up())
                    })
                }
                if (s.find_line(this.media[r], "a=rtcp-mux") && e.c("rtcp-mux").up(), this.RtcpFbToJingle(r, e, "*"), s.find_line(this.media[r], "a=extmap:")) for (l = s.find_lines(this.media[r], "a=extmap:"), o = 0; o < l.length; o++) {
                    if (u = s.parse_extmap(l[o]), e.c("rtp-hdrext", {
                        xmlns: "urn:xmpp:jingle:apps:rtp:rtp-hdrext:0",
                        uri: u.uri,
                        id: u.value
                    }), u.hasOwnProperty("direction")) switch (u.direction) {
                    case "sendonly":
                        e.attrs({
                            senders:
                            "responder"
                        });
                        break;
                    case "recvonly":
                        e.attrs({
                            senders:
                            "initiator"
                        });
                        break;
                    case "sendrecv":
                        e.attrs({
                            senders:
                            "both"
                        });
                        break;
                    case "inactive":
                        e.attrs({
                            senders:
                            "none"
                        })
                    }
                    e.up()
                }
                e.up()
            }
            this.TransportToJingle(r, e),
            s.find_line(this.media[r], "a=sendrecv", this.session) ? e.attrs({
                senders: "both"
            }) : s.find_line(this.media[r], "a=sendonly", this.session) ? e.attrs({
                senders: "initiator"
            }) : s.find_line(this.media[r], "a=recvonly", this.session) ? e.attrs({
                senders: "responder"
            }) : s.find_line(this.media[r], "a=inactive", this.session) && e.attrs({
                senders: "none"
            }),
            "0" == a.port && e.attrs({
                senders: "rejected"
            }),
            e.up()
        }
        return e.up(),
        e
    },
    i.prototype.TransportToJingle = function(e, t) {
        var n, r = e,
        o = this;
        if (t.c("transport"), s.find_line(this.media[e], "a=sctpmap:").length) {
            var i = s.find_line(this.media[r], "a=sctpmap:", o.session);
            if (i) {
                var a = s.parse_sctpmap(i);
                t.c("sctpmap", {
                    xmlns: "urn:xmpp:jingle:transports:dtls-sctp:1",
                    number: a[0],
                    protocol: a[1]
                }),
                a.length > 2 && t.attrs({
                    streams: a[2]
                }),
                t.up()
            }
        }
        var c = s.find_lines(this.media[e], "a=fingerprint:", this.session);
        if (c.forEach(function(r) {
            n = s.parse_fingerprint(r),
            n.xmlns = "urn:xmpp:jingle:apps:dtls:0",
            t.c("fingerprint").t(n.fingerprint),
            delete n.fingerprint,
            r = s.find_line(o.media[e], "a=setup:", o.session),
            r && (n.setup = r.substr(8)),
            t.attrs(n),
            t.up()
        }), n = s.iceparams(this.media[e], this.session), n && (n.xmlns = "urn:xmpp:jingle:transports:ice-udp:1", t.attrs(n), s.find_line(this.media[e], "a=candidate:", this.session))) {
            var d = s.find_lines(this.media[e], "a=candidate:", this.session);
            d.forEach(function(e) {
                t.c("candidate", s.candidateToJingle(e)).up()
            })
        }
        t.up()
    },
    i.prototype.RtcpFbToJingle = function(e, t, n) {
        var r = s.find_lines(this.media[e], "a=rtcp-fb:" + n);
        r.forEach(function(e) {
            var n = s.parse_rtcpfb(e);
            "trr-int" == n.type ? (t.c("rtcp-fb-trr-int", {
                xmlns: "urn:xmpp:jingle:apps:rtp:rtcp-fb:0",
                value: n.params[0]
            }), t.up()) : (t.c("rtcp-fb", {
                xmlns: "urn:xmpp:jingle:apps:rtp:rtcp-fb:0",
                type: n.type
            }), n.params.length > 0 && t.attrs({
                subtype: n.params[0]
            }), t.up())
        })
    },
    i.prototype.RtcpFbFromJingle = function(e, t) {
        var n = "",
        r = e.find('>rtcp-fb-trr-int[xmlns="urn:xmpp:jingle:apps:rtp:rtcp-fb:0"]');
        return r.length && (n += "a=rtcp-fb:* trr-int ", n += r.attr("value") ? r.attr("value") : "0", n += "\r\n"),
        r = e.find('>rtcp-fb[xmlns="urn:xmpp:jingle:apps:rtp:rtcp-fb:0"]'),
        r.each(function() {
            n += "a=rtcp-fb:" + t + " " + $(this).attr("type"),
            $(this).attr("subtype") && (n += " " + $(this).attr("subtype")),
            n += "\r\n"
        }),
        n
    },
    i.prototype.fromJingle = function(e) {
        var t = this;
        this.raw = "v=0\r\no=- 1923518516 2 IN IP4 0.0.0.0\r\ns=-\r\nt=0 0\r\n",
        $(e).find('>group[xmlns="urn:xmpp:jingle:apps:grouping:0"]').length && $(e).find('>group[xmlns="urn:xmpp:jingle:apps:grouping:0"]').each(function(e, n) {
            var r = $(n).find(">content").map(function(e, t) {
                return t.getAttribute("name")
            }).get();
            r.length > 0 && (t.raw += "a=group:" + (n.getAttribute("semantics") || n.getAttribute("type")) + " " + r.join(" ") + "\r\n")
        }),
        this.session = this.raw,
        e.find(">content").each(function() {
            var e = t.jingle2media($(this));
            t.media.push(e)
        }),
        this.raw = this.session + this.media.join("")
    },
    i.prototype.jingle2media = function(e) {
        var t, n = "",
        r = e.find("description"),
        o = (r.attr("ssrc"), this),
        i = e.find('>transport>sctpmap[xmlns="urn:xmpp:jingle:transports:dtls-sctp:1"]');
        if (t = {
            media: r.attr("media")
        },
        t.port = "1", "rejected" == e.attr("senders") && (t.port = "0"), e.find(">transport>fingerprint").length || r.find("encryption").length ? i.length ? t.proto = "DTLS/SCTP": t.proto = "RTP/SAVPF": t.proto = "RTP/AVPF", i.length) {
            n += "m=application 1 DTLS/SCTP " + i.attr("number") + "\r\n",
            n += "a=sctpmap:" + i.attr("number") + " " + i.attr("protocol");
            var a = i.attr("streams");
            n += a ? " " + a + "\r\n": "\r\n"
        } else t.fmt = r.find("payload-type").map(function() {
            return this.getAttribute("id")
        }).get(),
        n += s.build_mline(t) + "\r\n";
        switch (n += "c=IN IP4 0.0.0.0\r\n", i.length || (n += "a=rtcp:1 IN IP4 0.0.0.0\r\n"), t = e.find('>transport[xmlns="urn:xmpp:jingle:transports:ice-udp:1"]'), t.length && (t.attr("ufrag") && (n += s.build_iceufrag(t.attr("ufrag")) + "\r\n"), t.attr("pwd") && (n += s.build_icepwd(t.attr("pwd")) + "\r\n"), t.find(">fingerprint").each(function() {
            n += "a=fingerprint:" + this.getAttribute("hash"),
            n += " " + $(this).text(),
            n += "\r\n",
            this.getAttribute("setup") && (n += "a=setup:" + this.getAttribute("setup") + "\r\n")
        })), e.attr("senders")) {
        case "initiator":
            n += "a=sendonly\r\n";
            break;
        case "responder":
            n += "a=recvonly\r\n";
            break;
        case "none":
            n += "a=inactive\r\n";
            break;
        case "both":
            n += "a=sendrecv\r\n"
        }
        return n += "a=mid:" + e.attr("name") + "\r\n",
        r.find("rtcp-mux").length && (n += "a=rtcp-mux\r\n"),
        r.find("encryption").length && r.find("encryption>crypto").each(function() {
            n += "a=crypto:" + this.getAttribute("tag"),
            n += " " + this.getAttribute("crypto-suite"),
            n += " " + this.getAttribute("key-params"),
            this.getAttribute("session-params") && (n += " " + this.getAttribute("session-params")),
            n += "\r\n"
        }),
        r.find("payload-type").each(function() {
            n += s.build_rtpmap(this) + "\r\n",
            $(this).find(">parameter").length && (n += "a=fmtp:" + this.getAttribute("id") + " ", n += $(this).find("parameter").map(function() {
                return (this.getAttribute("name") ? this.getAttribute("name") + "=": "") + this.getAttribute("value")
            }).get().join("; "), n += "\r\n"),
            n += o.RtcpFbFromJingle($(this), this.getAttribute("id"))
        }),
        n += o.RtcpFbFromJingle(r, "*"),
        t = r.find('>rtp-hdrext[xmlns="urn:xmpp:jingle:apps:rtp:rtp-hdrext:0"]'),
        t.each(function() {
            n += "a=extmap:" + this.getAttribute("id") + " " + this.getAttribute("uri") + "\r\n"
        }),
        e.find('>transport[xmlns="urn:xmpp:jingle:transports:ice-udp:1"]>candidate').each(function() {
            n += s.candidateFromJingle(this)
        }),
        t = e.find('description>ssrc-group[xmlns="urn:xmpp:jingle:apps:rtp:ssma:0"]').each(function() {
            var e = this.getAttribute("semantics"),
            t = $(this).find(">source").map(function() {
                return this.getAttribute("ssrc")
            }).get();
            0 != t.length && (n += "a=ssrc-group:" + e + " " + t.join(" ") + "\r\n")
        }),
        t = e.find('description>source[xmlns="urn:xmpp:jingle:apps:rtp:ssma:0"]'),
        t.each(function() {
            var e = this.getAttribute("ssrc");
            $(this).find(">parameter").each(function() {
                n += "a=ssrc:" + e + " " + this.getAttribute("name"),
                this.getAttribute("value") && this.getAttribute("value").length && (n += ":" + this.getAttribute("value")),
                n += "\r\n"
            })
        }),
        n
    },
    exports = e.exports = i
},
function(e, exports) {
    var SDPUtil = {
        iceparams: function(e, t) {
            var n = null;
            return SDPUtil.find_line(e, "a=ice-ufrag:", t) && SDPUtil.find_line(e, "a=ice-pwd:", t) && (n = {
                ufrag: SDPUtil.parse_iceufrag(SDPUtil.find_line(e, "a=ice-ufrag:", t)),
                pwd: SDPUtil.parse_icepwd(SDPUtil.find_line(e, "a=ice-pwd:", t))
            }),
            n
        },
        parse_iceufrag: function(e) {
            return e.substring(12)
        },
        build_iceufrag: function(e) {
            return "a=ice-ufrag:" + e
        },
        parse_icepwd: function(e) {
            return e.substring(10)
        },
        build_icepwd: function(e) {
            return "a=ice-pwd:" + e
        },
        parse_mid: function(e) {
            return e.substring(6)
        },
        parse_mline: function(e) {
            var t = e.substring(2).split(" "),
            n = {};
            return n.media = t.shift(),
            n.port = t.shift(),
            n.proto = t.shift(),
            "" === t[t.length - 1] && t.pop(),
            n.fmt = t,
            n
        },
        build_mline: function(e) {
            return "m=" + e.media + " " + e.port + " " + e.proto + " " + e.fmt.join(" ")
        },
        parse_rtpmap: function(e) {
            var t = e.substring(9).split(" "),
            n = {};
            return n.id = t.shift(),
            t = t[0].split("/"),
            n.name = t.shift(),
            n.clockrate = t.shift(),
            n.channels = t.length ? t.shift() : "1",
            n
        },
        parse_sctpmap: function(e) {
            var t = e.substring(10).split(" "),
            n = t[0],
            r = t[1],
            o = t.length > 2 ? t[2] : null;
            return [n, r, o]
        },
        build_rtpmap: function(e) {
            var t = "a=rtpmap:" + e.getAttribute("id") + " " + e.getAttribute("name") + "/" + e.getAttribute("clockrate");
            return e.getAttribute("channels") && "1" != e.getAttribute("channels") && (t += "/" + e.getAttribute("channels")),
            t
        },
        parse_crypto: function(e) {
            var t = e.substring(9).split(" "),
            n = {};
            return n.tag = t.shift(),
            n["crypto-suite"] = t.shift(),
            n["key-params"] = t.shift(),
            t.length && (n["session-params"] = t.join(" ")),
            n
        },
        parse_fingerprint: function(e) {
            var t = e.substring(14).split(" "),
            n = {};
            return n.hash = t.shift(),
            n.fingerprint = t.shift(),
            n
        },
        parse_fmtp: function(e) {
            var t, n, r, o = e.split(" "),
            i = [];
            for (o.shift(), o = o.join(" ").split(";"), t = 0; t < o.length; t++) {
                for (n = o[t].split("=")[0]; n.length && " " == n[0];) n = n.substring(1);
                r = o[t].split("=")[1],
                n && r ? i.push({
                    name: n,
                    value: r
                }) : n && i.push({
                    name: "",
                    value: n
                })
            }
            return i
        },
        parse_icecandidate: function(e) {
            var t = {},
            n = e.split(" ");
            t.foundation = n[0].substring(12),
            t.component = n[1],
            t.protocol = n[2].toLowerCase(),
            t.priority = n[3],
            t.ip = n[4],
            t.port = n[5],
            t.type = n[7],
            t.generation = 0;
            for (var r = 8; r < n.length; r += 2) switch (n[r]) {
            case "raddr":
                t["rel-addr"] = n[r + 1];
                break;
            case "rport":
                t["rel-port"] = n[r + 1];
                break;
            case "generation":
                t.generation = n[r + 1];
                break;
            case "tcptype":
                t.tcptype = n[r + 1];
                break;
            default:
                console.log('parse_icecandidate not translating "' + n[r] + '" = "' + n[r + 1] + '"')
            }
            return t.network = "1",
            t.id = Math.random().toString(36).substr(2, 10),
            t
        },
        build_icecandidate: function(e) {
            var t = ["a=candidate:" + e.foundation, e.component, e.protocol, e.priority, e.ip, e.port, "typ", e.type].join(" ");
            switch (t += " ", e.type) {
            case "srflx":
            case "prflx":
            case "relay":
                e.hasOwnAttribute("rel-addr") && e.hasOwnAttribute("rel-port") && (t += "raddr", t += " ", t += e["rel-addr"], t += " ", t += "rport", t += " ", t += e["rel-port"], t += " ")
            }
            return e.hasOwnAttribute("tcptype") && (t += "tcptype", t += " ", t += e.tcptype, t += " "),
            t += "generation",
            t += " ",
            t += e.hasOwnAttribute("generation") ? e.generation: "0"
        },
        parse_ssrc: function(e) {
            for (var t = e.split("\r\n"), n = {},
            r = 0; r < t.length; r++) if ("a=ssrc:" == t[r].substring(0, 7)) {
                var o = t[r].indexOf(" ");
                n[t[r].substr(o + 1).split(":", 2)[0]] = t[r].substr(o + 1).split(":", 2)[1]
            }
            return n
        },
        parse_rtcpfb: function(e) {
            var t = e.substr(10).split(" "),
            n = {};
            return n.pt = t.shift(),
            n.type = t.shift(),
            n.params = t,
            n
        },
        parse_extmap: function(e) {
            var t = e.substr(9).split(" "),
            n = {};
            return n.value = t.shift(),
            n.value.indexOf("/") != -1 ? (n.direction = n.value.substr(n.value.indexOf("/") + 1), n.value = n.value.substr(0, n.value.indexOf("/"))) : n.direction = "both",
            n.uri = t.shift(),
            n.params = t,
            n
        },
        find_line: function(e, t, n) {
            for (var r = e.split("\r\n"), o = 0; o < r.length; o++) if (r[o].substring(0, t.length) == t) return r[o];
            if (!n) return ! 1;
            r = n.split("\r\n");
            for (var i = 0; i < r.length; i++) if (r[i].substring(0, t.length) == t) return r[i];
            return ! 1
        },
        find_lines: function(e, t, n) {
            for (var r = e.split("\r\n"), o = [], i = 0; i < r.length; i++) r[i].substring(0, t.length) == t && o.push(r[i]);
            if (o.length || !n) return o;
            r = n.split("\r\n");
            for (var s = 0; s < r.length; s++) r[s].substring(0, t.length) == t && o.push(r[s]);
            return o
        },
        candidateToJingle: function(e) {
            if (0 === e.indexOf("candidate:")) e = "a=" + e;
            else if ("a=candidate:" != e.substring(0, 12)) return console.log("parseCandidate called with a line that is not a candidate line"),
            console.log(e),
            null;
            "\r\n" == e.substring(e.length - 2) && (e = e.substring(0, e.length - 2));
            var t, n = {},
            r = e.split(" ");
            if ("typ" != r[6]) return console.log("did not find typ in the right place"),
            console.log(e),
            null;
            for (n.foundation = r[0].substring(12), n.component = r[1], n.protocol = r[2].toLowerCase(), n.priority = r[3], n.ip = r[4], n.port = r[5], n.type = r[7], n.generation = "0", t = 8; t < r.length; t += 2) switch (r[t]) {
            case "raddr":
                n["rel-addr"] = r[t + 1];
                break;
            case "rport":
                n["rel-port"] = r[t + 1];
                break;
            case "generation":
                n.generation = r[t + 1];
                break;
            case "tcptype":
                n.tcptype = r[t + 1];
                break;
            default:
                config.debug && console.log('not translating "' + r[t] + '" = "' + r[t + 1] + '"')
            }
            return n.network = "1",
            n.id = Math.random().toString(36).substr(2, 10),
            n
        },
        candidateFromJingle: function(e) {
            var t = "a=candidate:";
            switch (t += e.getAttribute("foundation"), t += " ", t += e.getAttribute("component"), t += " ", t += e.getAttribute("protocol"), t += " ", t += e.getAttribute("priority"), t += " ", t += e.getAttribute("ip"), t += " ", t += e.getAttribute("port"), t += " ", t += "typ", t += " " + e.getAttribute("type"), t += " ", e.getAttribute("type")) {
            case "srflx":
            case "prflx":
            case "relay":
                e.getAttribute("rel-addr") && e.getAttribute("rel-port") && (t += "raddr", t += " ", t += e.getAttribute("rel-addr"), t += " ", t += "rport", t += " ", t += e.getAttribute("rel-port"), t += " ")
            }
            return "tcp" == e.getAttribute("protocol").toLowerCase() && (t += "tcptype", t += " ", t += e.getAttribute("tcptype"), t += " "),
            t += "generation",
            t += " ",
            t += e.getAttribute("generation") || "0",
            t + "\r\n"
        }
    },
    exports = e.exports = SDPUtil
},
function(e, exports) {
    function t() {
        this.logger = new c("SimulcastUtils", 1)
    }
    function n() {
        this.simulcastUtils = new t,
        this.logger = new c("SimulcastReceiver", 1)
    }
    function r() {
        this.simulcastUtils = new t,
        this.logger = new c("SimulcastSender", 1)
    }
    function o() {
        r.call(this)
    }
    function i() {
        r.call(this)
    }
    function s() {
        r.call(this)
    }
    function a() {
        this.simulcastUtils = new t,
        this.simulcastReceiver = new n,
        this.simulcastSender = new s
    }
    function c(e, t) {
        this.name = e,
        this.lvl = t
    }
    t.prototype._emptyCompoundIndex = {},
    t.prototype._replaceVideoSources = function(e, t) {
        var n, r = !1,
        o = -1,
        i = 0;
        for (this.logger.info("Replacing video sources..."), n = 0; n < e.length && (!r || "m=" !== e[n].substring(0, "m=".length)); n++) r || "m=video " !== e[n].substring(0, "m=video ".length) || (r = !0),
        !r || "a=ssrc:" !== e[n].substring(0, "a=ssrc:".length) && "a=ssrc-group:" !== e[n].substring(0, "a=ssrc-group:".length) || (o === -1 && (o = n), i++);
        e.splice.apply(e, [o, i].concat(t))
    },
    t.prototype.isValidDescription = function(e) {
        return e && null != e && e.type && "" != e.type && e.sdp && "" != e.sdp
    },
    t.prototype._getVideoSources = function(e) {
        var t, n = !1,
        r = [];
        for (this.logger.info("Getting video sources..."), t = 0; t < e.length && (!n || "m=" !== e[t].substring(0, "m=".length)); t++) n || "m=video " !== e[t].substring(0, "m=video ".length) || (n = !0),
        n && "a=ssrc:" === e[t].substring(0, "a=ssrc:".length) && r.push(e[t]),
        n && "a=ssrc-group:" === e[t].substring(0, "a=ssrc-group:".length) && r.push(e[t]);
        return r
    },
    t.prototype.parseMedia = function(e, t) {
        var n, r, o, i, s, a, c, d, u, l, p = [],
        f = !0;
        for (this.logger.info("Parsing media sources..."), n = 0; n < e.length; n++)"m=" === e[n].substring(0, "m=".length) ? (r = e[n].substr("m=".length, e[n].indexOf(" ") - "m=".length), f = void 0 !== t && t.indexOf(r) === -1, f || (o = {
            type: r,
            sources: {},
            groups: []
        },
        p.push(o))) : f || "a=ssrc:" !== e[n].substring(0, "a=ssrc:".length) ? f || "a=ssrc-group:" !== e[n].substring(0, "a=ssrc-group:".length) ? f || "a=sendrecv" !== e[n].substring(0, "a=sendrecv".length) && "a=recvonly" !== e[n].substring(0, "a=recvonly".length) && "a=sendonly" !== e[n].substring(0, "a=sendonly".length) && "a=inactive" !== e[n].substring(0, "a=inactive".length) || (o.direction = e[n].substring("a=".length)) : (i = e[n].indexOf(" "), l = e[n].substr(0, i).substr("a=ssrc-group:".length), s = e[n].substr(i).trim().split(" "), u = {
            semantics: l,
            ssrcs: s
        },
        o.groups.push(u)) : (i = e[n].indexOf(" "), c = e[n].substring("a=ssrc:".length, i), void 0 === o.sources[c] && (a = {
            ssrc: c
        },
        o.sources[c] = a), d = e[n].substr(i + 1).split(":", 2)[0], a[d] = e[n].substr(i + 1).split(":", 2)[1], void 0 === o.base && (o.base = a));
        return p
    },
    t.prototype._indexOfArray = function(e, t, n) {
        var r, o, i = t.length;
        for (n || (n = 0), o = n; o < i; o++) if (r = t[o].indexOf(e), r !== -1) return {
            row: o,
            column: r
        };
        return this._emptyCompoundIndex
    },
    t.prototype._removeSimulcastGroup = function(e) {
        var t;
        for (t = e.length - 1; t >= 0; t--) e[t].indexOf("a=ssrc-group:SIM") !== -1 && e.splice(t, 1)
    },
    t.prototype._compileVideoSources = function(e) {
        var t, n = [],
        r = [];
        if (this.logger.info("Compiling video sources..."), e.groups && 0 !== e.groups.length && e.groups.forEach(function(t) {
            t.ssrcs && 0 !== t.ssrcs.length && (n.push([["a=ssrc-group:", t.semantics].join(""), t.ssrcs.join(" ")].join(" ")), t.ssrcs.forEach(function(t) {
                r.push(t),
                n.splice.apply(n, [n.length, 0].concat([["a=ssrc:", t, " cname:", e.sources[t].cname].join(""), ["a=ssrc:", t, " msid:", e.sources[t].msid].join("")]))
            }))
        }), e.sources) for (t in e.sources) r.indexOf(t) === -1 && n.splice.apply(n, [n.length, 0].concat([["a=ssrc:", t, " cname:", e.sources[t].cname].join(""), ["a=ssrc:", t, " msid:", e.sources[t].msid].join("")]));
        return n
    },
    n.prototype._remoteVideoSourceCache = "",
    n.prototype._remoteMaps = {
        msid2Quality: {},
        ssrc2Msid: {},
        msid2ssrc: {},
        receivingVideoStreams: {}
    },
    n.prototype._cacheRemoteVideoSources = function(e) {
        this._remoteVideoSourceCache = this.simulcastUtils._getVideoSources(e)
    },
    n.prototype._restoreRemoteVideoSources = function(e) {
        this.simulcastUtils._replaceVideoSources(e, this._remoteVideoSourceCache)
    },
    n.prototype._ensureGoogConference = function(e) {
        var t;
        this.logger.info("Ensuring x-google-conference flag..."),
        this.simulcastUtils._indexOfArray("a=x-google-flag:conference", e) === this.simulcastUtils._emptyCompoundIndex && (t = this.simulcastUtils._getVideoSources(e), t = ["a=x-google-flag:conference"].concat(t), this.simulcastUtils._replaceVideoSources(e, t))
    },
    n.prototype._restoreSimulcastGroups = function(e) {
        this._restoreRemoteVideoSources(e)
    },
    n.prototype.reverseTransformRemoteDescription = function(e) {
        var t;
        return this.simulcastUtils.isValidDescription(e) ? (config.enableSimulcast && (t = e.sdp.split("\r\n"), this._restoreSimulcastGroups(t), e = new RTCSessionDescription({
            type: e.type,
            sdp: t.join("\r\n")
        })), e) : e
    },
    t.prototype._ensureOrder = function(e) {
        var t, n;
        t = this.parseMedia(e, ["video"])[0],
        n = this._compileVideoSources(t),
        this._replaceVideoSources(e, n)
    },
    n.prototype._updateRemoteMaps = function(e) {
        var t, n, r = this.simulcastUtils.parseMedia(e, ["video"])[0];
        this._remoteMaps.msid2Quality = {},
        this._remoteMaps.ssrc2Msid = {},
        this._remoteMaps.msid2ssrc = {};
        var o = this;
        r && r.groups && 0 !== r.groups.length && r.groups.forEach(function(e) {
            "SIM" === e.semantics && e.ssrcs && 0 !== e.ssrcs.length && (n = 0, e.ssrcs.forEach(function(e) {
                t = r.sources[e],
                o._remoteMaps.msid2Quality[t.msid] = n++,
                o._remoteMaps.ssrc2Msid[t.ssrc] = t.msid,
                o._remoteMaps.msid2ssrc[t.msid] = t.ssrc
            }))
        })
    },
    n.prototype._setReceivingVideoStream = function(e, t) {
        this._remoteMaps.receivingVideoStreams[e] = t
    },
    n.prototype.getReceivingVideoStream = function(e) {
        var t, n, r, o, i = 0,
        s = this;
        if (config.enableSimulcast && (e.getVideoTracks().some(function(t) {
            return Object.keys(s._remoteMaps.receivingVideoStreams).some(function(n) {
                var o = s._remoteMaps.receivingVideoStreams[n],
                i = s._remoteMaps.ssrc2Msid[o];
                if (i == [e.id, t.id].join(" ")) return r = t,
                !0
            })
        }), !r)) for (t = e.getVideoTracks(), n = 0; n < t.length; n++) if (o = [e.id, t[n].id].join(" "), this._remoteMaps.msid2Quality[o] === i) {
            r = t[n];
            break
        }
        return r ? new webkitMediaStream([r]) : e
    },
    n.prototype.getReceivingSSRC = function(e) {
        var t = Strophe.getResourceFromJid(e),
        n = this._remoteMaps.receivingVideoStreams[t];
        if (!n && connection.jingle) {
            var r, o, i, s, a = Object.keys(connection.jingle.sessions);
            for (o = 0; o < a.length; o++) {
                var c = a[o];
                if (n) break;
                if (r = connection.jingle.sessions[c], r.remoteStreams) for (i = 0; i < r.remoteStreams.length; i++) {
                    var d = r.remoteStreams[i];
                    if (n) break;
                    var u = d.getVideoTracks();
                    if (u) for (s = 0; s < u.length; s++) {
                        var l = u[s],
                        p = [d.id, l.id].join(" "),
                        f = this._remoteMaps.msid2ssrc[p],
                        h = ssrc2jid[f],
                        m = this._remoteMaps.msid2Quality[p];
                        if (e == h && 0 == m) {
                            n = f;
                            break
                        }
                    }
                }
            }
        }
        return n
    },
    n.prototype.getReceivingVideoStreamBySSRC = function(e) {
        var t, n, r, o, i;
        if (connection.jingle) {
            var s = Object.keys(connection.jingle.sessions);
            for (r = 0; r < s.length; r++) {
                var a = s[r];
                if (n) break;
                if (t = connection.jingle.sessions[a], t.remoteStreams) for (o = 0; o < t.remoteStreams.length; o++) {
                    var c = t.remoteStreams[o];
                    if (n) break;
                    var d = c.getVideoTracks();
                    if (d) for (i = 0; i < d.length; i++) {
                        var u = d[i],
                        l = [c.id, u.id].join(" "),
                        p = this._remoteMaps.msid2ssrc[l];
                        if (p == e) {
                            n = new webkitMediaStream([u]);
                            break
                        }
                    }
                }
            }
        }
        return {
            session: t,
            stream: n
        }
    },
    n.prototype.getRemoteVideoStreamIdBySSRC = function(e) {
        return this._remoteMaps.ssrc2Msid[e]
    },
    r.prototype.displayedLocalVideoStream = null,
    r.prototype._generateGuid = function() {
        function e() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        }
        return function() {
            return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
        }
    } (),
    r.prototype._generateRandomSSRC = function() {
        var e = 0,
        t = 4294967295;
        return Math.floor(Math.random() * (t - e)) + e
    },
    r.prototype.getLocalVideoStream = function() {
        return null != this.displayedLocalVideoStream ? this.displayedLocalVideoStream: connection.jingle.localVideo
    },
    o.prototype = Object.create(r.prototype),
    o.prototype._localExplosionMap = {},
    o.prototype._isUsingScreenStream = !1,
    o.prototype._localVideoSourceCache = "",
    o.prototype.reset = function() {
        this._localExplosionMap = {},
        this._isUsingScreenStream = isUsingScreenStream
    },
    o.prototype._cacheLocalVideoSources = function(e) {
        this._localVideoSourceCache = this.simulcastUtils._getVideoSources(e)
    },
    o.prototype._restoreLocalVideoSources = function(e) {
        this.simulcastUtils._replaceVideoSources(e, this._localVideoSourceCache)
    },
    o.prototype._appendSimulcastGroup = function(e) {
        var t, n, r, o, i, s = 2;
        for (this.logger.info("Appending simulcast group..."), t = this.simulcastUtils.parseMedia(e, ["video"])[0], n = ["a=ssrc-group:SIM"], i = [], o = 0; o < s; o++) r = this._generateRandomSSRC(),
        n.push(r),
        t.base && i.splice.apply(i, [i.length, 0].concat([["a=ssrc:", r, " cname:", t.base.cname].join(""), ["a=ssrc:", r, " msid:", t.base.msid].join("")])),
        this.logger.info(["Generated substream ", o, " with SSRC ", r, "."].join(""));
        i.splice(0, 0, n.join(" ")),
        this.simulcastUtils._replaceVideoSources(e, i)
    },
    o.prototype._ensureSimulcastGroup = function(e) {
        this.logger.info("Ensuring simulcast group..."),
        this.simulcastUtils._indexOfArray("a=ssrc-group:SIM", e) === this.simulcastUtils._emptyCompoundIndex ? (this._appendSimulcastGroup(e), this._cacheLocalVideoSources(e)) : this._restoreLocalVideoSources(e)
    },
    o.prototype._explodeSimulcastSenderSources = function(e) {
        var t, n, r, o, i, s;
        this.logger.info("Exploding local video sources..."),
        i = this.simulcastUtils.parseMedia(e, ["video"])[0],
        s = this,
        i.groups && 0 !== i.groups.length && i.groups.forEach(function(e) {
            "SIM" === e.semantics && e.ssrcs.forEach(function(e) {
                s._localExplosionMap[e] ? n = s._localExplosionMap[e] : (r = i.sources[e].msid.substring(0, i.sources[e].msid.indexOf(" ")), o = s._generateGuid(), n = [r, o].join(" "), s._localExplosionMap[e] = n),
                i.sources[e].msid = n
            })
        }),
        t = this.simulcastUtils._compileVideoSources(i),
        this.simulcastUtils._replaceVideoSources(e, t)
    },
    o.prototype.getUserMedia = function(e, t, n) {
        navigator.webkitGetUserMedia(e,
        function(e) {
            t(e)
        },
        n)
    },
    o.prototype.reverseTransformLocalDescription = function(e) {
        var t;
        return ! this.simulcastUtils.isValidDescription(e) || this._isUsingScreenStream ? e: (t = e.sdp.split("\r\n"), this._explodeSimulcastSenderSources(t), e = new RTCSessionDescription({
            type: e.type,
            sdp: t.join("\r\n")
        }), this.logger.fine(["Exploded local video sources", e.sdp].join(" ")), e)
    },
    o.prototype.transformAnswer = function(e) {
        if (!this.simulcastUtils.isValidDescription(e) || this._isUsingScreenStream) return e;
        var t = e.sdp.split("\r\n");
        return this._ensureSimulcastGroup(t),
        e = new RTCSessionDescription({
            type: e.type,
            sdp: t.join("\r\n")
        }),
        this.logger.fine(["Transformed answer", e.sdp].join(" ")),
        e
    },
    o.prototype.transformLocalDescription = function(e) {
        return e
    },
    n.prototype.transformRemoteDescription = function(e) {
        if (e && e.sdp) {
            var t = e.sdp.split("\r\n");
            this._updateRemoteMaps(t),
            this._cacheRemoteVideoSources(t),
            this.simulcastUtils._removeSimulcastGroup(t),
            e.sdp.indexOf("a=ssrc-group:SIM") !== -1 && this._ensureGoogConference(t),
            e = new RTCSessionDescription({
                type: e.type,
                sdp: t.join("\r\n")
            }),
            this.logger.fine(["Transformed remote description", e.sdp].join(" "))
        }
        return e
    },
    o.prototype._setLocalVideoStreamEnabled = function(e, t) {},
    o.prototype.constructor = o,
    i.prototype = Object.create(r.prototype),
    i.prototype.localStream = null,
    i.prototype._localMaps = {
        msids: [],
        msid2ssrc: {}
    },
    i.prototype._groupLocalVideoSources = function(e) {
        var t, n, r, o = [];
        this.logger.info("Grouping local video sources..."),
        n = this.simulcastUtils.parseMedia(e, ["video"])[0];
        for (r in n.sources) this._localMaps.msid2ssrc[n.sources[r].msid.split(" ")[1]] = r;
        var i = this;
        this._localMaps.msids.forEach(function(e) {
            o.push(i._localMaps.msid2ssrc[e])
        }),
        n.groups || (n.groups = []),
        n.groups.push({
            semantics: "SIM",
            ssrcs: o
        }),
        t = this.simulcastUtils._compileVideoSources(n),
        this.simulcastUtils._replaceVideoSources(e, t)
    },
    i.prototype.getUserMedia = function(e, t, n) {
        var r = {
            audio: !1,
            video: {
                mandatory: {
                    maxWidth: 320,
                    maxHeight: 180,
                    maxFrameRate: 15
                }
            }
        };
        this.logger.info("HQ constraints: ", e),
        this.logger.info("LQ constraints: ", r);
        var o = this;
        navigator.webkitGetUserMedia(e,
        function(e) {
            o.localStream = e,
            o._localMaps.msids = [],
            o._localMaps.msid2ssrc = {},
            o._localMaps.msids.push(e.getVideoTracks()[0].id),
            navigator.webkitGetUserMedia(r,
            function(e) {
                o.displayedLocalVideoStream = e,
                o._localMaps.msids.splice(0, 0, e.getVideoTracks()[0].id),
                o.localStream.addTrack(e.getVideoTracks()[0]),
                t(o.localStream)
            },
            n)
        },
        n)
    },
    i.prototype.reverseTransformLocalDescription = function(e) {
        var t;
        return this.simulcastUtils.isValidDescription(e) ? (t = e.sdp.split("\r\n"), this._groupLocalVideoSources(t), e = new RTCSessionDescription({
            type: e.type,
            sdp: t.join("\r\n")
        }), this.logger.fine("Grouped local video sources"), this.logger.fine(e.sdp), e) : e
    },
    i.prototype.transformAnswer = function(e) {
        return e
    },
    i.prototype.transformLocalDescription = function(e) {
        var t = e.sdp.split("\r\n");
        return this.simulcastUtils._removeSimulcastGroup(t),
        e = new RTCSessionDescription({
            type: e.type,
            sdp: t.join("\r\n")
        }),
        this.logger.fine("Transformed local description"),
        this.logger.fine(e.sdp),
        e
    },
    i.prototype._setLocalVideoStreamEnabled = function(e, t) {
        var n, r = this;
        this.logger.log(["Requested to", t ? "enable": "disable", e].join(" ")),
        Object.keys(this._localMaps.msid2ssrc).some(function(t) {
            if (r._localMaps.msid2ssrc[t] == e) return n = t,
            !0
        }) && r.localStream.getVideoTracks().some(function(e) {
            if (e.id === n) return e.enabled = t,
            !0
        }) ? (this.logger.log([n, t ? "enabled": "disabled"].join(" ")), $(document).trigger(t ? "simulcastlayerstarted": "simulcastlayerstopped")) : this.logger.error("I don't have a local stream with SSRC " + e)
    },
    i.prototype.constructor = i,
    s.prototype = Object.create(r.prototype),
    s.prototype.getUserMedia = function(e, t, n) {
        navigator.webkitGetUserMedia(e,
        function(e) {
            t(e)
        },
        n)
    },
    s.prototype.reverseTransformLocalDescription = function(e) {
        return e
    },
    s.prototype.transformAnswer = function(e) {
        return e
    },
    s.prototype.transformLocalDescription = function(e) {
        return e
    },
    s.prototype._setLocalVideoStreamEnabled = function(e, t) {},
    s.prototype.constructor = s,
    a.prototype.reverseTransformRemoteDescription = function(e) {
        return this.simulcastReceiver.reverseTransformRemoteDescription(e)
    },
    a.prototype.transformRemoteDescription = function(e) {
        return this.simulcastReceiver.transformRemoteDescription(e)
    },
    a.prototype.getRemoteVideoStreamIdBySSRC = function(e) {
        return this.simulcastReceiver.getRemoteVideoStreamIdBySSRC(e)
    },
    a.prototype.getReceivingVideoStream = function(e) {
        return this.simulcastReceiver.getReceivingVideoStream(e)
    },
    a.prototype.transformLocalDescription = function(e) {
        return this.simulcastSender.transformLocalDescription(e)
    },
    a.prototype.getLocalVideoStream = function() {
        return this.simulcastSender.getLocalVideoStream()
    },
    a.prototype.getUserMedia = function(e, t, n) {
        this.simulcastSender.getUserMedia(e, t, n)
    },
    a.prototype.reverseTransformLocalDescription = function(e) {
        return this.simulcastSender.reverseTransformLocalDescription(e)
    },
    a.prototype.transformAnswer = function(e) {
        return this.simulcastSender.transformAnswer(e)
    },
    a.prototype.getReceivingSSRC = function(e) {
        return this.simulcastReceiver.getReceivingSSRC(e)
    },
    a.prototype.getReceivingVideoStreamBySSRC = function(e) {
        return this.simulcastReceiver.getReceivingVideoStreamBySSRC(e)
    },
    a.prototype.parseMedia = function(e, t) {
        var n = e.sdp.split("\r\n");
        return this.simulcastUtils.parseMedia(n, t)
    },
    a.prototype._setReceivingVideoStream = function(e, t) {
        this.simulcastReceiver._setReceivingVideoStream(e, t)
    },
    a.prototype._setLocalVideoStreamEnabled = function(e, t) {
        this.simulcastSender._setLocalVideoStreamEnabled(e, t)
    },
    a.prototype.resetSender = function() {
        "function" == typeof this.simulcastSender.reset && this.simulcastSender.reset()
    },
    c.prototype.log = function(e) {
        this.lvl && console.log(e)
    },
    c.prototype.info = function(e) {
        this.lvl > 1 && console.info(e)
    },
    c.prototype.fine = function(e) {
        this.lvl > 2 && console.log(e)
    },
    c.prototype.error = function(e) {
        console.error(e)
    };
    var d = new a;
    exports = e.exports = d,
    $(document).bind("simulcastlayerschanged",
    function(e, t) {
        t.forEach(function(e) {
            var t = e.simulcastLayer.primarySSRC;
            d._setReceivingVideoStream(e.endpoint, t)
        })
    }),
    $(document).bind("startsimulcastlayer",
    function(e, t) {
        var n = t.primarySSRC;
        d._setLocalVideoStreamEnabled(n, !0)
    }),
    $(document).bind("stopsimulcastlayer",
    function(e, t) {
        var n = t.primarySSRC;
        d._setLocalVideoStreamEnabled(n, !1)
    })
},
function(e, exports, t) {
    var n = t(38),
    r = t(40);
    exports.write = r,
    exports.parse = n.parse,
    exports.parseFmtpConfig = n.parseFmtpConfig,
    exports.parsePayloads = n.parsePayloads,
    exports.parseRemoteCandidates = n.parseRemoteCandidates
},
function(e, exports, t) {
    var n = function(e) {
        return String(Number(e)) === e ? Number(e) : e
    },
    r = function(e, t, r, o) {
        if (o && !r) t[o] = n(e[1]);
        else for (var i = 0; i < r.length; i += 1) null != e[i + 1] && (t[r[i]] = n(e[i + 1]))
    },
    o = function(e, t, n) {
        var o = e.name && e.names;
        e.push && !t[e.push] ? t[e.push] = [] : o && !t[e.name] && (t[e.name] = {});
        var i = e.push ? {}: o ? t[e.name] : t;
        r(n.match(e.reg), i, e.names, e.name),
        e.push && t[e.push].push(i)
    },
    i = t(39),
    s = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
    exports.parse = function(e) {
        var t = {},
        n = [],
        r = t;
        return e.split(/(\r\n|\r|\n)/).filter(s).forEach(function(e) {
            var t = e[0],
            s = e.slice(2);
            "m" === t && (n.push({
                rtp: [],
                fmtp: []
            }), r = n[n.length - 1]);
            for (var a = 0; a < (i[t] || []).length; a += 1) {
                var c = i[t][a];
                if (c.reg.test(s)) return o(c, r, s)
            }
        }),
        t.media = n,
        t
    };
    var a = function(e, t) {
        var r = t.split(/=(.+)/, 2);
        return 2 === r.length && (e[r[0]] = n(r[1])),
        e
    };
    exports.parseFmtpConfig = function(e) {
        return e.split(/\;\s?/).reduce(a, {})
    },
    exports.parsePayloads = function(e) {
        return e.split(" ").map(Number)
    },
    exports.parseRemoteCandidates = function(e) {
        for (var t = [], r = e.split(" ").map(n), o = 0; o < r.length; o += 3) t.push({
            component: r[o],
            ip: r[o + 1],
            port: r[o + 2]
        });
        return t
    }
},
function(e, exports) {
    var t = e.exports = {
        v: [{
            name: "version",
            reg: /^(\d*)$/
        }],
        o: [{
            name: "origin",
            reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
            names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"],
            format: "%s %s %d %s IP%d %s"
        }],
        s: [{
            name: "name"
        }],
        i: [{
            name: "description"
        }],
        u: [{
            name: "uri"
        }],
        e: [{
            name: "email"
        }],
        p: [{
            name: "phone"
        }],
        z: [{
            name: "timezones"
        }],
        r: [{
            name: "repeats"
        }],
        t: [{
            name: "timing",
            reg: /^(\d*) (\d*)/,
            names: ["start", "stop"],
            format: "%d %d"
        }],
        c: [{
            name: "connection",
            reg: /^IN IP(\d) (\S*)/,
            names: ["version", "ip"],
            format: "IN IP%d %s"
        }],
        b: [{
            push: "bandwidth",
            reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
            names: ["type", "limit"],
            format: "%s:%s"
        }],
        m: [{
            reg: /^(\w*) (\d*) ([\w\/]*)(?: (.*))?/,
            names: ["type", "port", "protocol", "payloads"],
            format: "%s %d %s %s"
        }],
        a: [{
            push: "rtp",
            reg: /^rtpmap:(\d*) ([\w\-\.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
            names: ["payload", "codec", "rate", "encoding"],
            format: function(e) {
                return e.encoding ? "rtpmap:%d %s/%s/%s": e.rate ? "rtpmap:%d %s/%s": "rtpmap:%d %s"
            }
        },
        {
            push: "fmtp",
            reg: /^fmtp:(\d*) ([\S| ]*)/,
            names: ["payload", "config"],
            format: "fmtp:%d %s"
        },
        {
            name: "control",
            reg: /^control:(.*)/,
            format: "control:%s"
        },
        {
            name: "rtcp",
            reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
            names: ["port", "netType", "ipVer", "address"],
            format: function(e) {
                return null != e.address ? "rtcp:%d %s IP%d %s": "rtcp:%d"
            }
        },
        {
            push: "rtcpFbTrrInt",
            reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
            names: ["payload", "value"],
            format: "rtcp-fb:%d trr-int %d"
        },
        {
            push: "rtcpFb",
            reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
            names: ["payload", "type", "subtype"],
            format: function(e) {
                return null != e.subtype ? "rtcp-fb:%s %s %s": "rtcp-fb:%s %s"
            }
        },
        {
            push: "ext",
            reg: /^extmap:([\w_\/]*) (\S*)(?: (\S*))?/,
            names: ["value", "uri", "config"],
            format: function(e) {
                return null != e.config ? "extmap:%s %s %s": "extmap:%s %s"
            }
        },
        {
            push: "crypto",
            reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
            names: ["id", "suite", "config", "sessionConfig"],
            format: function(e) {
                return null != e.sessionConfig ? "crypto:%d %s %s %s": "crypto:%d %s %s"
            }
        },
        {
            name: "setup",
            reg: /^setup:(\w*)/,
            format: "setup:%s"
        },
        {
            name: "mid",
            reg: /^mid:([^\s]*)/,
            format: "mid:%s"
        },
        {
            name: "msid",
            reg: /^msid:(.*)/,
            format: "msid:%s"
        },
        {
            name: "ptime",
            reg: /^ptime:(\d*)/,
            format: "ptime:%d"
        },
        {
            name: "maxptime",
            reg: /^maxptime:(\d*)/,
            format: "maxptime:%d"
        },
        {
            name: "direction",
            reg: /^(sendrecv|recvonly|sendonly|inactive)/
        },
        {
            name: "icelite",
            reg: /^(ice-lite)/
        },
        {
            name: "iceUfrag",
            reg: /^ice-ufrag:(\S*)/,
            format: "ice-ufrag:%s"
        },
        {
            name: "icePwd",
            reg: /^ice-pwd:(\S*)/,
            format: "ice-pwd:%s"
        },
        {
            name: "fingerprint",
            reg: /^fingerprint:(\S*) (\S*)/,
            names: ["type", "hash"],
            format: "fingerprint:%s %s"
        },
        {
            push: "candidates",
            reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
            names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "tcptype", "generation", "network-id", "network-cost"],
            format: function(e) {
                var t = "candidate:%s %d %s %d %s %d typ %s";
                return t += null != e.raddr ? " raddr %s rport %d": "%v%v",
                t += null != e.tcptype ? " tcptype %s": "%v",
                null != e.generation && (t += " generation %d"),
                t += null != e["network-id"] ? " network-id %d": "%v",
                t += null != e["network-cost"] ? " network-cost %d": "%v"
            }
        },
        {
            name: "endOfCandidates",
            reg: /^(end-of-candidates)/
        },
        {
            name: "remoteCandidates",
            reg: /^remote-candidates:(.*)/,
            format: "remote-candidates:%s"
        },
        {
            name: "iceOptions",
            reg: /^ice-options:(\S*)/,
            format: "ice-options:%s"
        },
        {
            push: "ssrcs",
            reg: /^ssrc:(\d*) ([\w_]*)(?::(.*))?/,
            names: ["id", "attribute", "value"],
            format: function(e) {
                var t = "ssrc:%d";
                return null != e.attribute && (t += " %s", null != e.value && (t += ":%s")),
                t
            }
        },
        {
            push: "ssrcGroups",
            reg: /^ssrc-group:(\w*) (.*)/,
            names: ["semantics", "ssrcs"],
            format: "ssrc-group:%s %s"
        },
        {
            name: "msidSemantic",
            reg: /^msid-semantic:\s?(\w*) (\S*)/,
            names: ["semantic", "token"],
            format: "msid-semantic: %s %s"
        },
        {
            push: "groups",
            reg: /^group:(\w*) (.*)/,
            names: ["type", "mids"],
            format: "group:%s %s"
        },
        {
            name: "rtcpMux",
            reg: /^(rtcp-mux)/
        },
        {
            name: "rtcpRsize",
            reg: /^(rtcp-rsize)/
        },
        {
            name: "sctpmap",
            reg: /^sctpmap:([\w_\/]*) (\S*)(?: (\S*))?/,
            names: ["sctpmapNumber", "app", "maxMessageSize"],
            format: function(e) {
                return null != e.maxMessageSize ? "sctpmap:%s %s %s": "sctpmap:%s %s"
            }
        },
        {
            push: "invalid",
            names: ["value"]
        }]
    };
    Object.keys(t).forEach(function(e) {
        var n = t[e];
        n.forEach(function(e) {
            e.reg || (e.reg = /(.*)/),
            e.format || (e.format = "%s")
        })
    })
},
function(e, exports, t) {
    var n = t(39),
    r = /%[sdv%]/g,
    o = function(e) {
        var t = 1,
        n = arguments,
        o = n.length;
        return e.replace(r,
        function(e) {
            if (t >= o) return e;
            var r = n[t];
            switch (t += 1, e) {
            case "%%":
                return "%";
            case "%s":
                return String(r);
            case "%d":
                return Number(r);
            case "%v":
                return ""
            }
        })
    },
    i = function(e, t, n) {
        var r = t.format instanceof Function ? t.format(t.push ? n: n[t.name]) : t.format,
        i = [e + "=" + r];
        if (t.names) for (var s = 0; s < t.names.length; s += 1) {
            var a = t.names[s];
            t.name ? i.push(n[t.name][a]) : i.push(n[t.names[s]])
        } else i.push(n[t.name]);
        return o.apply(null, i)
    },
    s = ["v", "o", "s", "i", "u", "e", "p", "c", "b", "t", "r", "z", "a"],
    a = ["i", "c", "b", "a"];
    e.exports = function(e, t) {
        t = t || {},
        null == e.version && (e.version = 0),
        null == e.name && (e.name = " "),
        e.media.forEach(function(e) {
            null == e.payloads && (e.payloads = "")
        });
        var r = t.outerOrder || s,
        o = t.innerOrder || a,
        c = [];
        return r.forEach(function(t) {
            n[t].forEach(function(n) {
                n.name in e && null != e[n.name] ? c.push(i(t, n, e)) : n.push in e && null != e[n.push] && e[n.push].forEach(function(e) {
                    c.push(i(t, n, e))
                })
            })
        }),
        e.media.forEach(function(e) {
            c.push(i("m", n.m[0], e)),
            o.forEach(function(t) {
                n[t].forEach(function(n) {
                    n.name in e && null != e[n.name] ? c.push(i(t, n, e)) : n.push in e && null != e[n.push] && e[n.push].forEach(function(e) {
                        c.push(i(t, n, e))
                    })
                })
            })
        }),
        c.join("\r\n") + "\r\n"
    }
},
function(e, exports, t) {
    function n(e, n) {
        var r = this;
        this.peerconnection = new RTCPeerConnection(e, n),
        this.updateLog = [],
        this.stats = {},
        this.statsinterval = null,
        this.maxstats = 0;
        var o = t(44).Interop;
        this.interop = new o,
        this.localVideoSender = null,
        this.localAudioSender = null,
        this.resetLocalDescriptionTimes = 0,
        this.negotiationInprogress = !1,
        this.addssrc = [],
        this.removessrc = [],
        this.pendingop = null,
        this.channel = null,
        this.switchstreams = !1,
        this.trace = function(e, t) {
            r.updateLog.push({
                time: new Date,
                type: e,
                value: t || ""
            })
        },
        this.onicecandidate = null,
        this.peerconnection.onicecandidate = function(e) {
            r.trace("onicecandidate", JSON.stringify(e.candidate, null, " ")),
            null !== r.onicecandidate && r.onicecandidate(e)
        },
        this.onaddstream = null,
        this.peerconnection.onaddstream = function(e) {
            r.trace("onaddstream", e.stream.id),
            null !== r.onaddstream && r.onaddstream(e)
        },
        this.onremovestream = null,
        this.peerconnection.onremovestream = function(e) {
            r.trace("onremovestream", e.stream.id),
            null !== r.onremovestream && r.onremovestream(e)
        },
        this.onsignalingstatechange = null,
        this.peerconnection.onsignalingstatechange = function(e) {
            r.trace("onsignalingstatechange", r.signalingState),
            console.info("onsignalingstatechange", r.signalingState),
            null !== r.onsignalingstatechange && r.onsignalingstatechange(e)
        },
        this.oniceconnectionstatechange = null,
        this.peerconnection.oniceconnectionstatechange = function(e) {
            r.trace("oniceconnectionstatechange", r.iceConnectionState),
            console.info("oniceconnectionstatechange", r.iceConnectionState),
            null !== r.oniceconnectionstatechange && r.oniceconnectionstatechange(e)
        },
        this.onnegotiationneeded = null,
        this.peerconnection.onnegotiationneeded = function(e) {
            r.trace("onnegotiationneeded"),
            null !== r.onnegotiationneeded && r.onnegotiationneeded(e)
        },
        r.ondatachannel = null,
        this.peerconnection.ondatachannel = function(e) {
            console.log("+++++++++++++++++++ on data channel : ", e),
            e.channel && (r.channel = e.channel),
            r.trace("ondatachannel", e),
            null !== r.ondatachannel && r.ondatachannel(e)
        },
        !navigator.mozGetUserMedia && this.maxstats && (this.statsinterval = window.setInterval(function() {
            r.peerconnection.getStats(function(e) {
                for (var t = e.result(), n = 0; n < t.length; ++n) {
                    var o = new Date;
                    t[n].names().forEach(function(e) {
                        var i = t[n].id + "-" + e;
                        r.stats[i] || (r.stats[i] = {
                            startTime: o,
                            endTime: o,
                            values: [],
                            times: []
                        }),
                        r.stats[i].values.push(t[n].stat(e)),
                        r.stats[i].times.push(o.getTime()),
                        r.stats[i].values.length > r.maxstats && (r.stats[i].values.shift(), r.stats[i].times.shift()),
                        r.stats[i].endTime = o
                    })
                }
            })
        },
        1e3))
    }
    var r = t(36),
    o = t(34),
    i = t(42),
    s = t(43);
    t(37),
    t(13);
    let dumpSDP = function(e) {
        return "type: " + e.type + "\r\n" + e.sdp
    };
    window.dumpSDP = dumpSDP,
    void 0 !== n.prototype.__defineGetter__ && (n.prototype.__defineGetter__("signalingState",
    function() {
        return this.peerconnection.signalingState
    }), n.prototype.__defineGetter__("iceConnectionState",
    function() {
        return this.peerconnection.iceConnectionState
    }), n.prototype.__defineGetter__("localDescription",
    function() {
        var e = r.reverseTransformLocalDescription(this.peerconnection.localDescription);
        return i.usesUnifiedPlan() && e && (e = this.interop.toPlanB(e)),
        e
    }), n.prototype.__defineGetter__("remoteDescription",
    function() {
        var e = r.reverseTransformRemoteDescription(this.peerconnection.remoteDescription);
        return i.usesUnifiedPlan() && e && (e = this.interop.toPlanB(e)),
        e
    })),
    n.prototype.addStream = function(e) {
        this.trace("addStream", e.id),
        r.resetSender();
        try {
            var t = this;
            e.getTracks().forEach(function(n) {
                var r = t.peerconnection.addTrack(n, e);
                "video" != r.track.kind || t.localVideoSender || (t.localVideoSender = r),
                "audio" != r.track.kind || t.localAudioSender || (t.localAudioSender = r)
            })
        } catch(e) {
            return void console.error(e)
        }
    },
    n.prototype.removeStream = function(e, t) {
        this.trace("removeStream", e.id),
        r.resetSender(),
        t && (e.getAudioTracks().forEach(function(e) {
            e.stop()
        }), e.getVideoTracks().forEach(function(e) {
            e.stop()
        })),
        this.peerconnection.removeStream(e)
    },
    n.prototype.createDataChannel = function(e, t) {
        return this.trace("createDataChannel", e, t),
        this.peerconnection.createDataChannel(e, t)
    },
    n.prototype.setLocalDescription = function(e, t, n) {
        var o = this;
        o.negotiationInprogress = !0,
        e = r.transformLocalDescription(e),
        e.sdp = s.processSdp(e.sdp, !1),
        this.trace("setLocalDescription", dumpSDP(e)),
        i.usesUnifiedPlan() && (e = this.interop.toUnifiedPlan(e)),
        1 == config.debug && console.log("------------------setLocalDescription--------------------", dumpSDP(e)),
        this.peerconnection.setLocalDescription(e,
        function() {
            o.trace("setLocalDescriptionOnSuccess"),
            o.resetLocalDescriptionTimes = 0,
            o.negotiationInprogress = !1,
            t()
        },
        function(r) {
            o.trace("setLocalDescriptionOnFailure", r),
            r.toString().indexOf("Called in wrong state") > -1 && o.resetLocalDescriptionTimes <= 2 ? (o.resetLocalDescriptionTimes = o.resetLocalDescriptionTimes + 1, setTimeout(function() {
                o.setLocalDescription(e, t, n)
            },
            1e3)) : (o.resetLocalDescriptionTimes = 0, n(r), $(document).trigger("manis.on.unknown.error", [r]))
        })
    },
    n.prototype.setRemoteDescription = function(e, t, n) {
        var o = this;
        o.negotiationInprogress = !0,
        e = r.transformRemoteDescription(e),
        e.sdp = s.processSdp(e.sdp, !1),
        i.usesUnifiedPlan() && (e = this.interop.toUnifiedPlan(e)),
        1 == config.debug && console.log("------------------setRemoteDescription--------------------", dumpSDP(e)),
        this.peerconnection.setRemoteDescription(e,
        function() {
            t()
        },
        function(e) {
            n(e),
            $(document).trigger("manis.on.unknown.error", [e])
        })
    },
    n.prototype.hardMuteVideo = function(e) {
        this.pendingop = e ? "mute": "unmute"
    },
    n.prototype.enqueueAddSsrc = function(e, t) {
        this.addssrc[e] || (this.addssrc[e] = ""),
        this.addssrc[e] += t
    },
    n.prototype.addSource = function(e) {
        console.log("addssrc", (new Date).getTime()),
        console.log("ice", this.iceConnectionState);
        var t = new o(this.remoteDescription.sdp),
        n = new o(this.peerconnection.localDescription.sdp),
        r = this;
        $(e).each(function(e, o) {
            var i = $(o).attr("name"),
            s = "";
            tmp = $(o).find('ssrc-group[xmlns="urn:xmpp:jingle:apps:rtp:ssma:0"]').each(function() {
                var e = this.getAttribute("semantics"),
                t = $(this).find(">source").map(function() {
                    return this.getAttribute("ssrc")
                }).get();
                0 != t.length && (s += "a=ssrc-group:" + e + " " + t.join(" ") + "\r\n")
            }),
            tmp = $(o).find('source[xmlns="urn:xmpp:jingle:apps:rtp:ssma:0"]'),
            tmp.each(function() {
                var e = $(this).attr("ssrc");
                return n.containsSSRC(e) ? void console.warn("Got add stream request for my own ssrc: " + e) : void $(this).find(">parameter").each(function() {
                    s += "a=ssrc:" + e + " " + $(this).attr("name"),
                    $(this).attr("value") && $(this).attr("value").length && (s += ":" + $(this).attr("value")),
                    s += "\r\n"
                })
            }),
            t.media.forEach(function(e, n) {
                SDPUtil.find_line(e, "a=mid:" + i) && (t.media[n] += s, r.enqueueAddSsrc(n, s))
            }),
            t.raw = t.session + t.media.join("")
        })
    },
    n.prototype.enqueueRemoveSsrc = function(e, t) {
        this.removessrc[e] || (this.removessrc[e] = ""),
        this.removessrc[e] += t
    },
    n.prototype.removeSource = function(e) {
        console.log("removessrc", (new Date).getTime()),
        console.log("ice", this.iceConnectionState);
        var t = new o(this.remoteDescription.sdp),
        n = new o(this.peerconnection.localDescription.sdp),
        r = this;
        $(e).each(function(e, o) {
            var i = $(o).attr("name"),
            s = "";
            tmp = $(o).find('ssrc-group[xmlns="urn:xmpp:jingle:apps:rtp:ssma:0"]').each(function() {
                var e = this.getAttribute("semantics"),
                t = $(this).find(">source").map(function() {
                    return this.getAttribute("ssrc")
                }).get();
                0 != t.length && (s += "a=ssrc-group:" + e + " " + t.join(" ") + "\r\n")
            }),
            tmp = $(o).find('source[xmlns="urn:xmpp:jingle:apps:rtp:ssma:0"]'),
            tmp.each(function() {
                var e = $(this).attr("ssrc");
                return n.containsSSRC(e) ? void console.error("Got remove stream request for my own ssrc: " + e) : void $(this).find(">parameter").each(function() {
                    s += "a=ssrc:" + e + " " + $(this).attr("name"),
                    $(this).attr("value") && $(this).attr("value").length && (s += ":" + $(this).attr("value")),
                    s += "\r\n"
                })
            }),
            t.media.forEach(function(e, n) {
                SDPUtil.find_line(e, "a=mid:" + i) && (t.media[n] += s, r.enqueueRemoveSsrc(n, s))
            }),
            t.raw = t.session + t.media.join("")
        })
    },
    n.prototype.modifySources = function(e, t) {
        var n = this;
        if ("closed" != this.signalingState) {
            if (! (this.addssrc.length || this.removessrc.length || null !== this.pendingop || this.switchstreams)) return console.warn("There is nothing to do since scheduled job might have been executed by another succeeding call"),
            void(e && e());
            this.switchstreams = !1;
            var r = new o(this.remoteDescription.sdp);
            this.addssrc.forEach(function(e, t) {
                r.media[t] += e
            }),
            this.addssrc = [],
            this.removessrc.forEach(function(e, t) {
                e = e.split("\r\n"),
                e.pop(),
                e.forEach(function(e) {
                    r.media[t] = r.media[t].replace(e + "\r\n", "")
                })
            }),
            this.removessrc = [],
            r.media[0] && (r.media[0] = r.media[0].replace("a=recvonly", "a=sendrecv")),
            r.media[1] && (r.media[1] = r.media[1].replace("a=recvonly", "a=sendrecv")),
            r.raw = r.session + r.media.join(""),
            this.setRemoteDescription(new RTCSessionDescription({
                type: "offer",
                sdp: r.raw
            }),
            function() {
                return "closed" == n.signalingState ? void console.error("createAnswer attempt on closed state") : void(t ? n.createAnswer(function(t) {
                    if (console.log("AAAAAAAAAAAAAAAAA new answer: ", t), null !== n.pendingop) {
                        var r = new o(t.sdp);
                        if (r.media.length > 1) {
                            switch (n.pendingop) {
                            case "mute":
                                r.media[1] = r.media[1].replace("a=sendrecv", "a=recvonly");
                                break;
                            case "unmute":
                                r.media[1] = r.media[1].replace("a=recvonly", "a=sendrecv")
                            }
                            r.raw = r.session + r.media.join(""),
                            t.sdp = r.raw
                        }
                        n.pendingop = null
                    }
                    n.setLocalDescription(t,
                    function() {
                        e && e()
                    },
                    function(e) {
                        console.error("modified setLocalDescription failed", e)
                    })
                },
                function(e) {
                    console.error("modified answer failed", e)
                }) : n.negotiationInprogress = !1)
            },
            function(e) {
                console.error("modify failed", e)
            })
        }
    },
    n.prototype.close = function() {
        this.trace("stop"),
        null !== this.statsinterval && (window.clearInterval(this.statsinterval), this.statsinterval = null),
        this.peerconnection.close()
    },
    n.prototype.createOffer = function(e, t, n) {
        var r = this;
        this.trace("createOffer", JSON.stringify(n, null, " ")),
        this.peerconnection.createOffer(function(t) {
            r.trace("createOfferOnSuccess", dumpSDP(t)),
            e(t)
        },
        function(e) {
            r.trace("createOfferOnFailure", e),
            t(e)
        },
        n)
    },
    n.prototype.createAnswer = function(e, t, n) {
        var o = this;
        this.trace("createAnswer", JSON.stringify(n, null, " ")),
        this.peerconnection.createAnswer(function(t) {
            t = r.transformAnswer(t),
            i.usesUnifiedPlan() && (t = o.interop.toPlanB(t)),
            e(t)
        },
        function(e) {
            o.trace("createAnswerOnFailure", e),
            t(e)
        },
        n)
    },
    n.prototype.addIceCandidate = function(e, t, n) {
        this.trace("addIceCandidate", JSON.stringify(e, null, " ")),
        this.peerconnection.addIceCandidate(e)
    },
    n.prototype.getStats = function(e, t) {
        navigator.mozGetUserMedia ? (t || (t = function() {}), this.peerconnection.getStats(null, e, t)) : i.isSafari() ? this.peerconnection.getStats(null).then(e) : this.peerconnection.getStats(e)
    },
    exports = e.exports = n
},
function(e, exports) {
    function t() {
        var e = n();
        return e ? (l = g.RTC_BROWSER_CHROME, console.log("This appears to be Chrome, ver: " + e), e) : null
    }
    function n() {
        if (navigator.webkitGetUserMedia) {
            var e = navigator.userAgent.toLowerCase(),
            t = parseInt(e.match(/chrome\/(\d+)\./)[1], 10);
            return t
        }
        return null
    }
    function r() {
        var e = navigator.userAgent;
        if (e.match(/Opera|OPR/)) {
            l = g.RTC_BROWSER_OPERA;
            var t = e.match(/(Opera|OPR) ?\/?(\d+)\.?/)[2];
            return console.info("This appears to be Opera, ver: " + t),
            t
        }
        return null
    }
    function o() {
        if (navigator.mozGetUserMedia) {
            l = g.RTC_BROWSER_FIREFOX;
            var e = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);
            return console.log("This appears to be Firefox, ver: " + e),
            e
        }
        return null
    }
    function i() {
        if (/^((?!chrome).)*safari/i.test(navigator.userAgent)) {
            l = g.RTC_BROWSER_SAFARI;
            var e = parseInt(navigator.userAgent.match(/version\/([0-9]+)\./i)[1], 10);
            return console.log("This appears to be Safari, ver: " + e),
            e
        }
        return null
    }
    function s() {
        var e = a();
        return e && (l = g.RTC_BROWSER_IEXPLORER, console.info("This appears to be IExplorer, ver: " + e)),
        e
    }
    function a() {
        var e, t = window.navigator.userAgent,
        n = t.indexOf("MSIE ");
        n > 0 && (e = parseInt(t.substring(n + 5, t.indexOf(".", n)), 10));
        var r = t.indexOf("Trident/");
        if (!e && r > 0) {
            var o = t.indexOf("rv:");
            e = parseInt(t.substring(o + 3, t.indexOf(".", o)), 10)
        }
        var i = t.indexOf("Edge/");
        return ! e && i > 0 && (e = parseInt(t.substring(i + 5, t.indexOf(".", i)), 10)),
        e
    }
    function c() {
        var e = navigator.userAgent;
        if (e.match(/JitsiMeetNW/)) {
            l = g.RTC_BROWSER_NWJS;
            var t = e.match(/JitsiMeetNW\/([\d.]+)/)[1];
            return console.info("This appears to be JitsiMeetNW, ver: " + t),
            t
        }
        return null
    }
    function d() {
        var e, t = navigator.userAgent.match(/\b(react[ \t_-]*native)(?:\/(\S+))?/i);
        if (t || "ReactNative" === navigator.product) {
            l = g.RTC_BROWSER_REACT_NATIVE;
            var n;
            t && t.length > 2 && (n = t[1], e = t[2]),
            n || (n = "react-native"),
            e || (e = "unknown"),
            console.info("This appears to be " + n + ", ver: " + e)
        } else e = null;
        return e
    }
    function u() {
        for (var e, n = [d, c, r, t, o, s, i], a = 0; a < n.length; a++) try {
            if (e = n[a]()) return e
        } catch(e) {
            console.warn("Un detect Browser type, ", e)
        }
        return console.warn("Un detect Browser type, defaults to Safari ver 1"),
        l = g.RTC_BROWSER_SAFARI,
        1
    }
    var l, p, f, h = "",
    m = "",
    g = {
        RTC_BROWSER_CHROME: "rtc_browser.chrome",
        RTC_BROWSER_OPERA: "rtc_browser.opera",
        RTC_BROWSER_FIREFOX: "rtc_browser.firefox",
        RTC_BROWSER_IEXPLORER: "rtc_browser.iexplorer",
        RTC_BROWSER_SAFARI: "rtc_browser.safari",
        RTC_BROWSER_NWJS: "rtc_browser.nwjs",
        RTC_BROWSER_REACT_NATIVE: "rtc_browser.react-native",
        RTC_BROWSER_LBBROWSER: "rtc_browser.lbbrowser",
        RTC_BROWSER_360: "rtc_browser.360",
        RTC_BROWSER_QQ: "rtc_browser.QQ",
        RTC_BROWSER_SOGOU: "rtc_browser.sogou",
        RTC_BROWSER_2345Explorer: "rtc_browser.2345Explorer",
        RTC_BROWSER_Maxthon: "rtc_browser.maxthon",
        getBrowserType: function() {
            return l
        },
        getBrowserName: function() {
            var e = l.split("rtc_browser.")[1];
            return g.isAndroid() && (e = "android"),
            e
        },
        getCoreBrowserName: function() {
            if (h) {
                var e = h.split("rtc_browser.")[1];
                return g.isAndroid() && (e = "android"),
                e
            }
            return ""
        },
        getCoreVersion: function() {
            return m
        },
        isChrome: function() {
            return l === g.RTC_BROWSER_CHROME
        },
        isOpera: function() {
            return l === g.RTC_BROWSER_OPERA
        },
        isFirefox: function() {
            return l === g.RTC_BROWSER_FIREFOX
        },
        isIExplorer: function() {
            return l === g.RTC_BROWSER_IEXPLORER
        },
        isSafari: function() {
            return l === g.RTC_BROWSER_SAFARI
        },
        isNWJS: function() {
            return l === g.RTC_BROWSER_NWJS
        },
        isReactNative: function() {
            return l === g.RTC_BROWSER_REACT_NATIVE
        },
        isTemasysPluginUsed: function() {
            return g.isIExplorer() || g.isSafari()
        },
        isVideoMuteOnConnInterruptedSupported: function() {
            return g.isChrome()
        },
        getFirefoxVersion: function() {
            return g.isFirefox() ? p: null
        },
        getChromeVersion: function() {
            return g.isChrome() ? p: null
        },
        usesPlanB: function() {
            return g.isChrome() || g.isOpera() || g.isTemasysPluginUsed()
        },
        usesUnifiedPlan: function() {
            return g.isFirefox()
        },
        isAndroid: function() {
            return f
        },
        supportsSimulcast: function() {
            return g.isChrome()
        }
    };
    p = u(),
    f = navigator.userAgent.indexOf("Android") != -1,
    g.browserInfo = {
        name: g.getBrowserName(),
        version: p,
        core: g.getCoreBrowserName(),
        coreVersion: g.getCoreVersion()
    },
    e.exports = g
},
function(e, exports, t) {
    var n = t(42),
    r = function() {
        function e(e, t, r) {
            return navigator.mozGetUserMedia || !t ? e: (r && (t.screen ? t.screen < 300 && console.warn("It seems that you are using wrong bandwidth value for screen. Screen sharing is expected to fail.") : console.warn("It seems that you are not using bandwidth for screen. Screen sharing is expected to fail.")), t.screen && r && (e = e.replace(/b=AS([^\r\n]+\r\n)/g, ""), e = e.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + t.screen + "\r\n")), (t.audio || t.video || t.data) && (e = e.replace(/b=AS([^\r\n]+\r\n)/g, "")), t.audio && (e = n.isChrome() && 57 == n.getChromeVersion() ? e.replace(/a=mid:audio\r\n/g, "a=mid:audio\r\nb=AS:" + 1e3 * t.audio + "\r\n") : e.replace(/a=mid:audio\r\n/g, "a=mid:audio\r\nb=AS:" + t.audio + "\r\n")), t.video && (e = n.isChrome() && 57 == n.getChromeVersion() ? e.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + 1e3 * (r ? t.screen: t.video) + "\r\n") : e.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + (r ? t.screen: t.video) + "\r\n")), e)
        }
        function t(e, t, n) {
            return o(e, 0, -1, t, n)
        }
        function o(e, t, n, r, o) {
            for (var i = n !== -1 ? n: e.length, s = t; s < i; ++s) if (0 === e[s].indexOf(r) && (!o || e[s].toLowerCase().indexOf(o.toLowerCase()) !== -1)) return s;
            return null
        }
        function i(e) {
            var t = new RegExp("a=rtpmap:(\\d+) \\w+\\/\\d+"),
            n = e.match(t);
            return n && 2 === n.length ? n[1] : null
        }
        function s(e, n) {
            n = n || {};
            var r, o = n.min,
            s = n.max,
            a = e.split("\r\n"),
            c = t(a, "a=rtpmap", "VP9/90000");
            if (c && (r = i(a[c])), !r) return e;
            var d = t(a, "a=fmtp", "x-google-max-bitrate");
            if (null !== d) {
                var u = "a=fmtp:" + r + " x-google-min-bitrate=" + (o || "228") + "\r\na=fmtp:" + r + " x-google-max-bitrate=" + (s || "228");
                a[d] = u,
                e = a.join("\r\n")
            } else {
                var l = t(a, "a=rtcp-fb", "transport-cc");
                if (null !== l) {
                    var u = "\r\n";
                    u += "a=fmtp:" + r + " x-google-min-bitrate=" + (o || "228") + "\r\na=fmtp:" + r + " x-google-max-bitrate=" + (s || "228"),
                    a[l] = a[l].concat(u),
                    e = a.join("\r\n")
                }
            }
            return e
        }
        function a(e, n) {
            n = n || {};
            var r, o = e.split("\r\n"),
            s = t(o, "a=rtpmap", "opus/48000");
            if (s && (r = i(o[s])), !r) return e;
            var a = t(o, "a=fmtp:" + r.toString());
            if (null === a) return e;
            var c = "";
            return c += "; stereo=" + ("undefined" != typeof n.stereo ? n.stereo: "1"),
            c += "; sprop-stereo=" + ("undefined" != typeof n["sprop-stereo"] ? n["sprop-stereo"] : "1"),
            "undefined" != typeof n.maxaveragebitrate && (c += "; maxaveragebitrate=" + (n.maxaveragebitrate || 128)),
            "undefined" != typeof n.maxplaybackrate && (c += "; maxplaybackrate=" + (n.maxplaybackrate || 128)),
            "undefined" != typeof n.cbr && (c += "; cbr=" + ("undefined" != typeof n.cbr ? n.cbr: "1")),
            "undefined" != typeof n.useinbandfec && (c += "; useinbandfec=" + n.useinbandfec),
            "undefined" != typeof n.usedtx && (c += "; usedtx=" + n.usedtx),
            "undefined" != typeof n.maxptime && (c += "\r\na=maxptime:" + n.maxptime),
            o[a] = o[a].concat(c),
            e = o.join("\r\n")
        }
        function c(e, t) {
            var n = {
                screen: 300,
                audio: config.audioBandwidth,
                video: config.videoBandwidth
            };
            return e = r.setApplicationSpecificBandwidth(e, n, t),
            e = r.setVideoBitrates(e, {
                min: n.video > 128 ? n.video / 8 : n.video,
                max: n.video
            })
        }
        return {
            setApplicationSpecificBandwidth: function(t, n, r) {
                return e(t, n, r)
            },
            setVideoBitrates: function(e, t) {
                return s(e, t)
            },
            setOpusAttributes: function(e, t) {
                return a(e, t)
            },
            processSdp: function(e, t) {
                return c(e, t)
            }
        }
    } ();
    e.exports = r
},
function(e, exports, t) {
    exports.Interop = t(45)
},
function(e, exports, t) {
    "use strict";
    function n() {
        this.cache = {}
    }
    var r = t(46),
    o = t(51);
    e.exports = n,
    n.prototype.getFirstSendingIndexFromAnswer = function(e) {
        if (!this.cache.answer) return null;
        var t = r.parse(this.cache.answer);
        if (t && t.media && Array.isArray(t.media)) for (var n = 0; n < t.media.length; n++) if (t.media[n].type == e && (!t.media[n].direction || "sendrecv" === t.media[n].direction || "sendonly" === t.media[n].direction)) return n;
        return null
    },
    n.prototype.toPlanB = function(e) {
        var t = this;
        if ("object" != typeof e || null === e || "string" != typeof e.sdp) return console.warn("An empty description was passed as an argument."),
        e;
        var n = r.parse(e.sdp);
        if ("undefined" == typeof n.media || !Array.isArray(n.media) || 0 === n.media.length) return console.warn("The description has no media."),
        e;
        if (n.media.length <= 3 && n.media.every(function(e) {
            return ["video", "audio", "data"].indexOf(e.mid) !== -1
        })) return console.warn("This description does not look like Unified Plan."),
        e;
        for (var o = e.sdp,
        i = !1,
        s = 0; s < n.media.length; s++) {
            var a = n.media[s];
            a.rtp.forEach(function(e) {
                if ("NULL" === e.codec) {
                    i = !0;
                    var n = r.parse(t.cache.offer);
                    e.codec = n.media[s].rtp[0].codec
                }
            })
        }
        i && (o = r.write(n)),
        this.cache[e.type] = o;
        var c = n.media;
        n.media = [];
        var d = {},
        u = [];
        c.forEach(function(e) {
            if (("string" != typeof e.rtcpMux || "rtcp-mux" !== e.rtcpMux) && "inactive" !== e.direction) throw new Error("Cannot convert to Plan B because m-lines without the rtcp-mux attribute were found.");
            return "application" === e.type ? (n.media.push(e), void u.push(e.mid)) : ("undefined" == typeof d[e.type] && (d[e.type] = e), "object" == typeof e.sources && Object.keys(e.sources).forEach(function(t) {
                "object" != typeof d[e.type].sources && (d[e.type].sources = {}),
                d[e.type].sources[t] = e.sources[t],
                "undefined" != typeof e.msid && (d[e.type].sources[t].msid = e.msid)
            }), "undefined" != typeof e.ssrcGroups && Array.isArray(e.ssrcGroups) && ("undefined" != typeof d[e.type].ssrcGroups && Array.isArray(d[e.type].ssrcGroups) || (d[e.type].ssrcGroups = []), d[e.type].ssrcGroups = d[e.type].ssrcGroups.concat(e.ssrcGroups)), void(d[e.type] === e && (e.candidates = c[0].candidates, e.iceUfrag = c[0].iceUfrag, e.icePwd = c[0].icePwd, e.fingerprint = c[0].fingerprint, e.mid = e.type, delete e.bundleOnly, delete e.msid, u.push(e.type), n.media.push(e))))
        }),
        n.groups.some(function(e) {
            if ("BUNDLE" === e.type) return e.mids = u.join(" "),
            !0
        }),
        n.msidSemantic = {
            semantic: "WMS",
            token: "*"
        };
        var l = r.write(n);
        return new RTCSessionDescription({
            type: e.type,
            sdp: l
        })
    },
    n.prototype.toUnifiedPlan = function(e) {
        var t = this;
        if ("object" != typeof e || null === e || "string" != typeof e.sdp) return console.warn("An empty description was passed as an argument."),
        e;
        var n = r.parse(e.sdp);
        if ("undefined" == typeof n.media || !Array.isArray(n.media) || 0 === n.media.length) return console.warn("The description has no media."),
        e;
        if (n.media.length > 3 || !n.media.every(function(e) {
            return ["video", "audio", "data"].indexOf(e.mid) !== -1
        })) return console.warn("This description does not look like Plan B."),
        e;
        var i = [];
        n.media.forEach(function(e) {
            i.push(e.mid)
        });
        var s = !1;
        if ("undefined" != typeof n.groups && Array.isArray(n.groups) && (s = n.groups.every(function(e) {
            return "BUNDLE" !== e.type || o.apply(e.mids.sort(), [i.sort()])
        })), !s) throw new Error("Cannot convert to Unified Plan because m-lines that are not bundled were found.");
        var a;
        "undefined" != typeof this.cache[e.type] && (a = r.parse(this.cache[e.type]));
        var c = {
            audio: {},
            video: {}
        },
        d = {};
        if (n.media.forEach(function(t) {
            if (("string" != typeof t.rtcpMux || "rtcp-mux" !== t.rtcpMux) && "inactive" !== t.direction) throw new Error("Cannot convert to Unified Plan because m-lines without the rtcp-mux attribute were found.");
            if ("application" === t.type) return void(d[t.mid] = t);
            var n = t.sources,
            r = t.ssrcGroups,
            o = t.candidates,
            i = t.iceUfrag,
            s = t.icePwd,
            u = t.fingerprint,
            l = t.port;
            delete t.sources,
            delete t.ssrcGroups,
            delete t.candidates,
            delete t.iceUfrag,
            delete t.icePwd,
            delete t.fingerprint,
            delete t.port,
            delete t.mid;
            var p = {};
            "undefined" != typeof r && Array.isArray(r) && r.forEach(function(e) {
                "SIM" !== e.semantics && "undefined" != typeof e.ssrcs && Array.isArray(e.ssrcs) && e.ssrcs.forEach(function(t) {
                    "undefined" == typeof p[t] && (p[t] = []),
                    p[t].push(e)
                })
            });
            var f = {};
            "object" == typeof n && Object.keys(n).forEach(function(r) {
                var h;
                if ("offer" === e.type && !n[r].msid) return void(c[t.type][r] = n[r]);
                if ("undefined" != typeof p[r] && Array.isArray(p[r]) && p[r].some(function(e) {
                    return e.ssrcs.some(function(e) {
                        if ("object" == typeof f[e]) return h = f[e],
                        !0
                    })
                }), "object" == typeof h) h.sources[r] = n[r],
                delete n[r].msid;
                else {
                    if (h = Object.create(t), f[r] = h, "undefined" != typeof n[r].msid && (h.msid = n[r].msid, h.direction = "sendrecv", delete n[r].msid), h.sources = {},
                    h.sources[r] = n[r], h.ssrcGroups = p[r], "undefined" != typeof a && "undefined" != typeof a.media && Array.isArray(a.media) && a.media.forEach(function(e) {
                        "object" == typeof e.sources && Object.keys(e.sources).forEach(function(t) {
                            t === r && (h.mid = e.mid)
                        })
                    }), "undefined" == typeof h.mid) {
                        if ("answer" === e.type) throw new Error("An unmapped SSRC was found.");
                        h.mid = [t.type, "-", r].join("")
                    }
                    h.candidates = o,
                    h.iceUfrag = i,
                    h.icePwd = s,
                    h.fingerprint = u,
                    h.port = l,
                    d[h.mid] = h
                }
            })
        }), n.media = [], i = [], "answer" === e.type) for (var u = 0; u < a.media.length; u++) {
            var l = a.media[u];
            "undefined" == typeof d[l.mid] && (delete l.msid, delete l.sources, delete l.ssrcGroups, l.direction && "sendrecv" !== l.direction ? "sendonly" === l.direction && (l.direction = "inactive") : l.direction = "recvonly"),
            n.media.push(l),
            "string" == typeof l.mid && i.push(l.mid)
        } else "undefined" != typeof a && "undefined" != typeof a.media && Array.isArray(a.media) && a.media.forEach(function(e) {
            i.push(e.mid),
            "undefined" != typeof d[e.mid] ? n.media.push(d[e.mid]) : (delete e.msid, delete e.sources, delete e.ssrcGroups, e.direction && "sendrecv" !== e.direction || (e.direction = "recvonly"), e.direction && "sendonly" !== e.direction || (e.direction = "inactive"), n.media.push(e))
        }),
        Object.keys(d).forEach(function(e) {
            i.indexOf(e) === -1 && (i.push(e), "recvonly" === d[e].direction ? n.media.some(function(t) {
                if (("sendrecv" === t.direction || "sendonly" === t.direction) && t.type === d[e].type) return Object.keys(d[e].sources).forEach(function(n) {
                    t.sources[n] = d[e].sources[n]
                }),
                !0
            }) : n.media.push(d[e]))
        }); ["audio", "video"].forEach(function(e) {
            if (n && n.media && Array.isArray(n.media)) {
                var r = null;
                if (Object.keys(c[e]).length > 0 && (r = t.getFirstSendingIndexFromAnswer(e), null === r)) for (var o = 0; o < n.media.length; o++) if (n.media[o].type === e) {
                    r = o;
                    break
                }
                if (r && n.media.length > r) {
                    var i = n.media[r];
                    Object.keys(c[e]).forEach(function(t) {
                        i.sources && i.sources[t] && console.warn("Replacing an existing SSRC."),
                        i.sources || (i.sources = {}),
                        i.sources[t] = c[e][t]
                    })
                }
            }
        }),
        n.groups.some(function(e) {
            if ("BUNDLE" === e.type) return e.mids = i.join(" "),
            !0
        }),
        n.msidSemantic = {
            semantic: "WMS",
            token: "*"
        };
        var p = r.write(n);
        return this.cache[e.type] = p,
        new RTCSessionDescription({
            type: e.type,
            sdp: p
        })
    }
},
function(e, exports, t) {
    var n = t(47);
    exports.write = function(e, t) {
        return "undefined" != typeof e && "undefined" != typeof e.media && Array.isArray(e.media) && e.media.forEach(function(e) {
            "undefined" != typeof e.sources && 0 !== Object.keys(e.sources).length && (e.ssrcs = [], Object.keys(e.sources).forEach(function(t) {
                var n = e.sources[t];
                Object.keys(n).forEach(function(r) {
                    e.ssrcs.push({
                        id: t,
                        attribute: r,
                        value: n[r]
                    })
                })
            }), delete e.sources),
            "undefined" != typeof e.ssrcGroups && Array.isArray(e.ssrcGroups) && e.ssrcGroups.forEach(function(e) {
                "undefined" != typeof e.ssrcs && Array.isArray(e.ssrcs) && (e.ssrcs = e.ssrcs.join(" "))
            })
        }),
        "undefined" != typeof e && "undefined" != typeof e.groups && Array.isArray(e.groups) && e.groups.forEach(function(e) {
            "undefined" != typeof e.mids && Array.isArray(e.mids) && (e.mids = e.mids.join(" "))
        }),
        n.write(e, t)
    },
    exports.parse = function(e) {
        var t = n.parse(e);
        return "undefined" != typeof t && "undefined" != typeof t.media && Array.isArray(t.media) && t.media.forEach(function(e) {
            "undefined" != typeof e.ssrcs && Array.isArray(e.ssrcs) && (e.sources = {},
            e.ssrcs.forEach(function(t) {
                e.sources[t.id] || (e.sources[t.id] = {}),
                e.sources[t.id][t.attribute] = t.value
            }), delete e.ssrcs),
            "undefined" != typeof e.ssrcGroups && Array.isArray(e.ssrcGroups) && e.ssrcGroups.forEach(function(e) {
                "string" == typeof e.ssrcs && (e.ssrcs = e.ssrcs.split(" "))
            })
        }),
        "undefined" != typeof t && "undefined" != typeof t.groups && Array.isArray(t.groups) && t.groups.forEach(function(e) {
            "string" == typeof e.mids && (e.mids = e.mids.split(" "))
        }),
        t
    }
},
function(e, exports, t) {
    var n = t(48),
    r = t(50);
    exports.write = r,
    exports.parse = n.parse,
    exports.parseFmtpConfig = n.parseFmtpConfig,
    exports.parsePayloads = n.parsePayloads,
    exports.parseRemoteCandidates = n.parseRemoteCandidates
},
function(e, exports, t) {
    var n = function(e) {
        return String(Number(e)) === e ? Number(e) : e
    },
    r = function(e, t, r, o) {
        if (o && !r) t[o] = n(e[1]);
        else for (var i = 0; i < r.length; i += 1) null != e[i + 1] && (t[r[i]] = n(e[i + 1]))
    },
    o = function(e, t, n) {
        var o = e.name && e.names;
        e.push && !t[e.push] ? t[e.push] = [] : o && !t[e.name] && (t[e.name] = {});
        var i = e.push ? {}: o ? t[e.name] : t;
        r(n.match(e.reg), i, e.names, e.name),
        e.push && t[e.push].push(i)
    },
    i = t(49),
    s = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
    exports.parse = function(e) {
        var t = {},
        n = [],
        r = t;
        return e.split(/(\r\n|\r|\n)/).filter(s).forEach(function(e) {
            var t = e[0],
            s = e.slice(2);
            "m" === t && (n.push({
                rtp: [],
                fmtp: []
            }), r = n[n.length - 1]);
            for (var a = 0; a < (i[t] || []).length; a += 1) {
                var c = i[t][a];
                if (c.reg.test(s)) return o(c, r, s)
            }
        }),
        t.media = n,
        t
    };
    var a = function(e, t) {
        var r = t.split("=");
        return 2 === r.length && (e[r[0]] = n(r[1])),
        e
    };
    exports.parseFmtpConfig = function(e) {
        return e.split(/\;\s?/).reduce(a, {})
    },
    exports.parsePayloads = function(e) {
        return e.split(" ").map(Number)
    },
    exports.parseRemoteCandidates = function(e) {
        for (var t = [], r = e.split(" ").map(n), o = 0; o < r.length; o += 3) t.push({
            component: r[o],
            ip: r[o + 1],
            port: r[o + 2]
        });
        return t
    }
},
function(e, exports) {
    var t = e.exports = {
        v: [{
            name: "version",
            reg: /^(\d*)$/
        }],
        o: [{
            name: "origin",
            reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
            names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"],
            format: "%s %s %d %s IP%d %s"
        }],
        s: [{
            name: "name"
        }],
        i: [{
            name: "description"
        }],
        u: [{
            name: "uri"
        }],
        e: [{
            name: "email"
        }],
        p: [{
            name: "phone"
        }],
        z: [{
            name: "timezones"
        }],
        r: [{
            name: "repeats"
        }],
        t: [{
            name: "timing",
            reg: /^(\d*) (\d*)/,
            names: ["start", "stop"],
            format: "%d %d"
        }],
        c: [{
            name: "connection",
            reg: /^IN IP(\d) (\S*)/,
            names: ["version", "ip"],
            format: "IN IP%d %s"
        }],
        b: [{
            push: "bandwidth",
            reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
            names: ["type", "limit"],
            format: "%s:%s"
        }],
        m: [{
            reg: /^(\w*) (\d*) ([\w\/]*)(?: (.*))?/,
            names: ["type", "port", "protocol", "payloads"],
            format: "%s %d %s %s"
        }],
        a: [{
            push: "rtp",
            reg: /^rtpmap:(\d*) ([\w\-]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
            names: ["payload", "codec", "rate", "encoding"],
            format: function(e) {
                return e.encoding ? "rtpmap:%d %s/%s/%s": e.rate ? "rtpmap:%d %s/%s": "rtpmap:%d %s"
            }
        },
        {
            push: "fmtp",
            reg: /^fmtp:(\d*) ([\S| ]*)/,
            names: ["payload", "config"],
            format: "fmtp:%d %s"
        },
        {
            name: "control",
            reg: /^control:(.*)/,
            format: "control:%s"
        },
        {
            name: "rtcp",
            reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
            names: ["port", "netType", "ipVer", "address"],
            format: function(e) {
                return null != e.address ? "rtcp:%d %s IP%d %s": "rtcp:%d"
            }
        },
        {
            push: "rtcpFbTrrInt",
            reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
            names: ["payload", "value"],
            format: "rtcp-fb:%d trr-int %d"
        },
        {
            push: "rtcpFb",
            reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
            names: ["payload", "type", "subtype"],
            format: function(e) {
                return null != e.subtype ? "rtcp-fb:%s %s %s": "rtcp-fb:%s %s"
            }
        },
        {
            push: "ext",
            reg: /^extmap:([\w_\/]*) (\S*)(?: (\S*))?/,
            names: ["value", "uri", "config"],
            format: function(e) {
                return null != e.config ? "extmap:%s %s %s": "extmap:%s %s"
            }
        },
        {
            push: "crypto",
            reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
            names: ["id", "suite", "config", "sessionConfig"],
            format: function(e) {
                return null != e.sessionConfig ? "crypto:%d %s %s %s": "crypto:%d %s %s"
            }
        },
        {
            name: "setup",
            reg: /^setup:(\w*)/,
            format: "setup:%s"
        },
        {
            name: "mid",
            reg: /^mid:([^\s]*)/,
            format: "mid:%s"
        },
        {
            name: "msid",
            reg: /^msid:(.*)/,
            format: "msid:%s"
        },
        {
            name: "ptime",
            reg: /^ptime:(\d*)/,
            format: "ptime:%d"
        },
        {
            name: "maxptime",
            reg: /^maxptime:(\d*)/,
            format: "maxptime:%d"
        },
        {
            name: "direction",
            reg: /^(sendrecv|recvonly|sendonly|inactive)/
        },
        {
            name: "icelite",
            reg: /^(ice-lite)/
        },
        {
            name: "iceUfrag",
            reg: /^ice-ufrag:(\S*)/,
            format: "ice-ufrag:%s"
        },
        {
            name: "icePwd",
            reg: /^ice-pwd:(\S*)/,
            format: "ice-pwd:%s"
        },
        {
            name: "fingerprint",
            reg: /^fingerprint:(\S*) (\S*)/,
            names: ["type", "hash"],
            format: "fingerprint:%s %s"
        },
        {
            push: "candidates",
            reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?/,
            names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "tcptype", "generation"],
            format: function(e) {
                var t = "candidate:%s %d %s %d %s %d typ %s";
                return t += null != e.raddr ? " raddr %s rport %d": "%v%v",
                t += null != e.tcptype ? " tcptype %s": "%v",
                null != e.generation && (t += " generation %d"),
                t
            }
        },
        {
            name: "endOfCandidates",
            reg: /^(end-of-candidates)/
        },
        {
            name: "remoteCandidates",
            reg: /^remote-candidates:(.*)/,
            format: "remote-candidates:%s"
        },
        {
            name: "iceOptions",
            reg: /^ice-options:(\S*)/,
            format: "ice-options:%s"
        },
        {
            push: "ssrcs",
            reg: /^ssrc:(\d*) ([\w_]*):(.*)/,
            names: ["id", "attribute", "value"],
            format: "ssrc:%d %s:%s"
        },
        {
            push: "ssrcGroups",
            reg: /^ssrc-group:(\w*) (.*)/,
            names: ["semantics", "ssrcs"],
            format: "ssrc-group:%s %s"
        },
        {
            name: "msidSemantic",
            reg: /^msid-semantic:\s?(\w*) (\S*)/,
            names: ["semantic", "token"],
            format: "msid-semantic: %s %s"
        },
        {
            push: "groups",
            reg: /^group:(\w*) (.*)/,
            names: ["type", "mids"],
            format: "group:%s %s"
        },
        {
            name: "rtcpMux",
            reg: /^(rtcp-mux)/
        },
        {
            name: "rtcpRsize",
            reg: /^(rtcp-rsize)/
        },
        {
            push: "invalid",
            names: ["value"]
        }]
    };
    Object.keys(t).forEach(function(e) {
        var n = t[e];
        n.forEach(function(e) {
            e.reg || (e.reg = /(.*)/),
            e.format || (e.format = "%s")
        })
    })
},
function(e, exports, t) {
    var n = t(49),
    r = /%[sdv%]/g,
    o = function(e) {
        var t = 1,
        n = arguments,
        o = n.length;
        return e.replace(r,
        function(e) {
            if (t >= o) return e;
            var r = n[t];
            switch (t += 1, e) {
            case "%%":
                return "%";
            case "%s":
                return String(r);
            case "%d":
                return Number(r);
            case "%v":
                return ""
            }
        })
    },
    i = function(e, t, n) {
        var r = t.format instanceof Function ? t.format(t.push ? n: n[t.name]) : t.format,
        i = [e + "=" + r];
        if (t.names) for (var s = 0; s < t.names.length; s += 1) {
            var a = t.names[s];
            t.name ? i.push(n[t.name][a]) : i.push(n[t.names[s]])
        } else i.push(n[t.name]);
        return o.apply(null, i)
    },
    s = ["v", "o", "s", "i", "u", "e", "p", "c", "b", "t", "r", "z", "a"],
    a = ["i", "c", "b", "a"];
    e.exports = function(e, t) {
        t = t || {},
        null == e.version && (e.version = 0),
        null == e.name && (e.name = " "),
        e.media.forEach(function(e) {
            null == e.payloads && (e.payloads = "")
        });
        var r = t.outerOrder || s,
        o = t.innerOrder || a,
        c = [];
        return r.forEach(function(t) {
            n[t].forEach(function(n) {
                n.name in e && null != e[n.name] ? c.push(i(t, n, e)) : n.push in e && null != e[n.push] && e[n.push].forEach(function(e) {
                    c.push(i(t, n, e))
                })
            })
        }),
        e.media.forEach(function(e) {
            c.push(i("m", n.m[0], e)),
            o.forEach(function(t) {
                n[t].forEach(function(n) {
                    n.name in e && null != e[n.name] ? c.push(i(t, n, e)) : n.push in e && null != e[n.push] && e[n.push].forEach(function(e) {
                        c.push(i(t, n, e))
                    })
                })
            })
        }),
        c.join("\r\n") + "\r\n"
    }
},
function(e, exports) {
    e.exports = function e(t) {
        if (!t) return ! 1;
        if (this.length != t.length) return ! 1;
        for (var n = 0,
        r = this.length; n < r; n++) if (this[n] instanceof Array && t[n] instanceof Array) {
            if (!e.apply(this[n], [t[n]])) return ! 1
        } else if (this[n] != t[n]) return ! 1;
        return ! 0
    }
},
function(e, exports) {
    Strophe.addConnectionPlugin("roster", {
        init: function(e) {
            this._connection = e,
            this._callbacks = [],
            this.items = [],
            ver = null;
            var t, n = this,
            r = e.connect,
            o = e.attach,
            i = function(r) {
                if (r == Strophe.Status.ATTACHED || r == Strophe.Status.CONNECTED) try {
                    e.addHandler(n._onReceivePresence.bind(n), null, "presence", null, null, null),
                    e.addHandler(n._onReceiveIQ.bind(n), Strophe.NS.ROSTER, "iq", "set", null, null)
                } catch(e) {
                    Strophe.error(e)
                }
                t && r == Strophe.Status.CONNECTED && t.apply(this, arguments)
            };
            e.connect = function(n, o, s, a, c) {
                t || (t = s),
                "undefined" == typeof n && (n = null),
                "undefined" == typeof o && (o = null),
                s = i,
                r.apply(e, [n, o, s, a, c])
            },
            e.attach = function(n, r, s, a, c, d, u) {
                t || (t = a),
                "undefined" == typeof n && (n = null),
                "undefined" == typeof r && (r = null),
                "undefined" == typeof s && (s = null),
                a = i,
                o.apply(e, [n, r, s, a, c, d, u])
            },
            Strophe.addNamespace("ROSTER_VER", "urn:xmpp:features:rosterver"),
            Strophe.addNamespace("NICK", "http://jabber.org/protocol/nick"),
            console.log("strophe plugin: roster enabled")
        },
        supportVersioning: function() {
            return this._connection.features && this._connection.features.getElementsByTagName("ver").length > 0
        },
        get: function(e, t, n) {
            var r = {
                xmlns: Strophe.NS.ROSTER
            };
            this.supportVersioning() && (r.ver = t || "", this.items = n || []);
            var o = $iq({
                type: "get",
                id: this._connection.getUniqueId("roster")
            }).c("query", r);
            return this._connection.sendIQ(o, this._onReceiveRosterSuccess.bind(this, e), this._onReceiveRosterError.bind(this, e))
        },
        registerCallback: function(e) {
            this._callbacks.push(e)
        },
        findItem: function(e) {
            if (this.items) for (var t = 0; t < this.items.length; t++) if (this.items[t] && this.items[t].jid == e) return this.items[t];
            return ! 1
        },
        removeItem: function(e) {
            for (var t = 0; t < this.items.length; t++) if (this.items[t] && this.items[t].jid == e) return this.items.splice(t, 1),
            !0;
            return ! 1
        },
        subscribe: function(e, t, n) {
            var r = $pres({
                to: e,
                type: "subscribe"
            });
            t && "" !== t && r.c("status").t(t).up(),
            n && "" !== n && r.c("nick", {
                xmlns: Strophe.NS.NICK
            }).t(n).up(),
            this._connection.send(r)
        },
        unsubscribe: function(e, t) {
            var n = $pres({
                to: e,
                type: "unsubscribe"
            });
            t && "" !== t && n.c("status").t(t),
            this._connection.send(n)
        },
        authorize: function(e, t) {
            var n = $pres({
                to: e,
                type: "subscribed"
            });
            t && "" !== t && n.c("status").t(t),
            this._connection.send(n)
        },
        unauthorize: function(e, t) {
            var n = $pres({
                to: e,
                type: "unsubscribed"
            });
            t && "" !== t && n.c("status").t(t),
            this._connection.send(n)
        },
        add: function(e, t, n, r) {
            for (var o = $iq({
                type: "set"
            }).c("query", {
                xmlns: Strophe.NS.ROSTER
            }).c("item", {
                jid: e,
                name: t
            }), i = 0; i < n.length; i++) o.c("group").t(n[i]).up();
            this._connection.sendIQ(o, r, r)
        },
        update: function(e, t, n, r) {
            var o = this.findItem(e);
            if (!o) throw "item not found";
            for (var i = t || o.name,
            s = n || o.groups,
            a = $iq({
                type: "set"
            }).c("query", {
                xmlns: Strophe.NS.ROSTER
            }).c("item", {
                jid: o.jid,
                name: i
            }), c = 0; c < s.length; c++) a.c("group").t(s[c]).up();
            return this._connection.sendIQ(a, r, r)
        },
        remove: function(e, t) {
            var n = this.findItem(e);
            if (!n) throw "item not found";
            var r = $iq({
                type: "set"
            }).c("query", {
                xmlns: Strophe.NS.ROSTER
            }).c("item", {
                jid: n.jid,
                subscription: "remove"
            });
            this._connection.sendIQ(r, t, t)
        },
        _onReceiveRosterSuccess: function(e, t) {
            this._updateItems(t),
            e && e(this.items)
        },
        _onReceiveRosterError: function(e, t) {
            e(this.items)
        },
        isSelf: function(e) {
            return Strophe.getBareJidFromJid(e) === Strophe.getBareJidFromJid(this._connection.jid)
        },
        _onReceivePresence: function(e) {
            var t = e.getAttribute("from"),
            n = Strophe.getBareJidFromJid(t);
            e.getElementsByTagName("x");
            if (this.isSelf(n)) return ! 0;
            var r = !1;
            for (i = 0; i < e.childNodes.length; i++) if (e.childNodes[i].getAttribute) {
                var o = e.childNodes[i].getAttribute("xmlns");
                o && (o.match(Strophe.NS.MUC) || o.match("urn:xmpp:rayo")) && (r = !0)
            }
            if ("rayo-" == t.substring(0, 5)) return ! 0;
            if ("Jitsi" == t.substring(0, 5)) return ! 0;
            if (r) return ! 0;
            var s = this.findItem(n);
            s || (s = {
                name: Strophe.getNodeFromJid(t),
                jid: n,
                subscription: "both",
                ask: null,
                groups: [],
                resources: {}
            },
            this.items.push(s));
            var a = e.getAttribute("type");
            if ("unavailable" == a) delete s.resources[Strophe.getResourceFromJid(t)];
            else {
                if (a) return ! 0;
                s.resources[Strophe.getResourceFromJid(t)] = {
                    show: 0 !== e.getElementsByTagName("show").length ? Strophe.getText(e.getElementsByTagName("show")[0]) : "",
                    status: 0 !== e.getElementsByTagName("status").length ? Strophe.getText(e.getElementsByTagName("status")[0]) : "",
                    priority: 0 !== e.getElementsByTagName("priority").length ? Strophe.getText(e.getElementsByTagName("priority")[0]) : ""
                }
            }
            return ! 0
        },
        _call_backs: function(e, t) {
            for (var n = 0; n < this._callbacks.length; n++) this._callbacks[n](e, t)
        },
        _onReceiveIQ: function(e) {
            var t = e.getAttribute("id"),
            n = e.getAttribute("from");
            if (n && "" !== n && n != this._connection.jid && n != Strophe.getBareJidFromJid(this._connection.jid)) return ! 0;
            var r = $iq({
                type: "result",
                id: t,
                from: this._connection.jid
            });
            return this._connection.send(r),
            this._updateItems(e),
            !0
        },
        _updateItems: function(e) {
            var t = e.getElementsByTagName("query");
            if (0 !== t.length) {
                this.ver = t.item(0).getAttribute("ver");
                var n = this;
                Strophe.forEachChild(t.item(0), "item",
                function(e) {
                    n._updateItem(e)
                })
            }
            this._call_backs(this.items)
        },
        _updateItem: function(e) {
            var t = e.getAttribute("jid"),
            n = e.getAttribute("name"),
            r = e.getAttribute("subscription"),
            o = e.getAttribute("ask"),
            i = [];
            return Strophe.forEachChild(e, "group",
            function(e) {
                i.push(Strophe.getText(e))
            }),
            "remove" == r ? void this.removeItem(t) : (e = this.findItem(t), void(e ? (e.name = n, e.subscription = r, e.ask = o, e.groups = i) : this.items.push({
                name: n,
                jid: t,
                subscription: r,
                ask: o,
                groups: i,
                resources: {}
            })))
        }
    })
},
function(e, exports, t) {
    var n = t(54),
    r = t(30),
    o = t(26),
    i = t(27),
    s = !1;
    Strophe.addConnectionPlugin("ofmuc", {
        connection: null,
        roomJid: null,
        members: {},
        sharePDF: null,
        shareApp: null,
        shareLink: "",
        linkSharer: !1,
        pdfPage: "1",
        recordingToken: null,
        isRecording: !1,
        urls: [],
        bookmarks: [],
        appRunning: !1,
        enableCursor: !0,
        video: null,
        appStartFrom: null,
        init: function(e) {
            this.connection = e,
            this.connection.addHandler(this.onMessage.bind(this), null, "message"),
            this.connection.addHandler(this.onPresence.bind(this), null, "presence"),
            this.connection.addHandler(this.onPresenceUnavailable.bind(this), null, "presence", "unavailable");
            var t = this;
            t.shareLink = "",
            window.addEventListener("message",
            function(e) {
                e.data && ("ofmeetLoaded" == e.data.type && t.appReady(), "ofmeetSendMessage" == e.data.type && t.appMessage(e.data.msg))
            })
        },
        resize: function() {
            $("#presentation>iframe") && ($("#presentation>iframe").width(this.getPresentationWidth()), $("#presentation>iframe").height(this.getPresentationHeight()))
        },
        getPresentationWidth: function() {
            var e = .6 * window.innerWidth;
            return e - 10
        },
        getPresentationHeight: function() {
            var e = $("#remoteVideos");
            return window.innerHeight - 40 - (e[0].scrollHeight - e.outerHeight()) - 120
        },
        onPresence: function(e) {
            var t = e.getAttribute("from"),
            n = e.getAttribute("type");
            if (null != n) return ! 0;
            1 == config.debug && console.log("ofmuc on presence", e, t, n);
            var r = {};
            return r.jid = t,
            void 0 === this.members[t] && (this.members[t] = r, this.shareApp && this.appShare("create", this.shareApp)),
            !0
        },
        onParticipantLeave: function(e) {
            return delete this.members[e],
            !0
        },
        onPresenceUnavailable: function(e) {
            var t = e.getAttribute("from");
            return ! this.roomJid || (this.onParticipantLeave(t), !0)
        },
        onMessage: function(e) {
            if ("electron-client" != window.clientType) {
                var t = this,
                n = e.getAttribute("from"),
                r = e.getAttribute("type"),
                o = Strophe.getResourceFromJid(n);
                return "chat" == r && "error" != r ? ($(e).find("remotecontrol").each(function() {
                    var e = $(this).attr("action"),
                    r = Strophe.getResourceFromJid(n);
                    if (console.log("remote control message", e, r), "request" == e) {
                        var o = $msg({
                            to: n,
                            type: "chat"
                        }); ! isUsingScreenStream || remoteControlled ? (o.c("remotecontrol", {
                            xmlns: "http://igniterealtime.org/protocol/remotecontrol",
                            action: "rejected"
                        }).up(), t.connection.send(o)) : $.prompt(r + " would like to control your desktop?", {
                            title: "Desktop Remote Control",
                            persistent: !1,
                            buttons: {
                                Permit: !0,
                                Deny: !1
                            },
                            defaultButton: 1,
                            loaded: function(e) {},
                            submit: function(e, n, i, s) {
                                n ? (o.c("remotecontrol", {
                                    xmlns: "http://igniterealtime.org/protocol/remotecontrol",
                                    action: "accepted"
                                }).up(), remoteControlled = !0, remoteController = r, window.postMessage({
                                    type: "ofmeetSetRequestorOn",
                                    id: r
                                },
                                "*")) : o.c("remotecontrol", {
                                    xmlns: "http://igniterealtime.org/protocol/remotecontrol",
                                    action: "rejected"
                                }).up(),
                                t.connection.send(o)
                            }
                        })
                    } else "terminate" == e ? (remoteControlled = !1, remoteController = null, window.postMessage({
                        type: "ofmeetSetRequestorOff"
                    },
                    "*")) : "rejected" == e ? $.prompt("Your request was rejected", {
                        title: "Desktop Remote Control",
                        persistent: !1
                    }) : "accepted" == e ? (isRemoteControl = !0, $.prompt("You now have remote desktop control of " + r, {
                        title: "Desktop Remote Control",
                        persistent: !1
                    })) : "terminated" == e && (isRemoteControl = !1)
                }), $(e).find("body").each(function() {
                    var e = $("<div/>").text($(this).text()).html();
                    0 == e.indexOf("https://") && e.indexOf("/ofmeet/?b=") > 0 && $(document).trigger("ofmuc.meeting.invite", [e, Strophe.getBareJidFromJid(n)])
                }), !0) : (o || (o = Strophe.getResourceFromJid(n)), t.roomJid || (t.roomJid = Strophe.getBareJidFromJid(n)), $(e).find("appshare").each(function() {
                    var e = $(this).attr("action"),
                    r = $(this).attr("url");
                    Strophe.getResourceFromJid(n) != Strophe.getResourceFromJid(t.connection.jid) && t.handleAppShare(e, r, o)
                }), $(e).find("pdfshare").each(function() {
                    var e = $(this).attr("action"),
                    r = $(this).attr("url");
                    Strophe.getResourceFromJid(n) != Strophe.getResourceFromJid(t.connection.jid) && t.handlePdfShare(e, r, o)
                }), $(e).find("linkshare").each(function() {
                    var e = $(this).attr("action"),
                    r = $(this).attr("url");
                    Strophe.getResourceFromJid(n) != Strophe.getResourceFromJid(t.connection.jid) && t.handleLinkShare(e, r, o)
                }), $(e).find("avatarshare").each(function() {
                    t.members[n].avatar = $(this).text(),
                    Avatar.setUserAvatar(n)
                }), !0)
            }
        },
        appSave: function(e) {
            console.log("ofmuc.appSave");
            var t = !1;
            try {
                t = this.appFrame && this.appFrame.contentWindow.ManisMeetings && this.appFrame.contentWindow.ManisMeetings.getContent
            } catch(t) {
                e && e()
            }
            if (t) {
                var r = this.appFrame.contentWindow.ManisMeetings.getContent();
                if (null != r) {
                    var o = n.compressToBase64(r),
                    i = this.shareApp + "/" + this.roomJid,
                    s = $iq({
                        to: manisConfg.messageServer,
                        type: "set"
                    });
                    s.c("query", {
                        xmlns: "jabber:iq:private"
                    }).c("ofmeet-application", {
                        xmlns: i
                    }).t(o),
                    this.connection.sendIQ(s,
                    function(t) {
                        e && e()
                    },
                    function(e) {
                        $.prompt("Application save...", {
                            title: e,
                            persistent: !1
                        })
                    })
                } else e && e()
            } else e && e()
        },
        appPrint: function() {
            var e = !1;
            try {
                e = this.appFrame && this.appFrame.contentWindow.ManisMeetings && this.appFrame.contentWindow.ManisMeetings.getPrintContent
            } catch(e) {}
            if (e) {
                var t = this.appFrame.contentWindow.ManisMeetings.getPrintContent(),
                n = window.open();
                n.document.write(t),
                n.print(),
                n.close()
            }
        },
        appEnableCursor: function(e) {
            this.enableCursor = e
        },
        appReady: function() {
            if (!this.appRunning) {
                if ($.prompt.close(), this.setPresentationVisible(!0), this.shareApp) {
                    var e = this,
                    t = this.shareApp + "/" + this.roomJid,
                    o = $iq({
                        to: manisConfg.messageServer,
                        type: "get"
                    });
                    o.c("query", {
                        xmlns: "jabber:iq:private"
                    }).c("ofmeet-application", {
                        xmlns: t
                    }),
                    this.connection.sendIQ(o,
                    function(t) {
                        $(t).find("ofmeet-application").each(function() {
                            try {
                                if (e.appFrame && e.appFrame.contentWindow.ManisMeetings && e.appFrame.contentWindow.ManisMeetings.setContent) {
                                    var t = n.decompressFromBase64($(this).text());
                                    e.appFrame.contentWindow.ManisMeetings.setContent(t)
                                }
                            } catch(e) {}
                        })
                    },
                    function(e) {
                        $.prompt("Application data retrieve...", {
                            title: e,
                            persistent: !1
                        })
                    }),
                    this.appShare("create", this.shareApp)
                } else {
                    var i = $msg({
                        to: this.roomJid,
                        type: "groupchat"
                    });
                    i.c("appshare", {
                        xmlns: "http://igniterealtime.org/protocol/appshare",
                        action: "message",
                        url: '{"type": "joined"}'
                    }).up(),
                    this.connection.send(i)
                }
                this.appRunning = !0,
                this.appFrame && this.appFrame.contentWindow.postMessage({
                    type: "ofmeetEnableCursor",
                    flag: this.enableCursor
                },
                "*"),
                this.appFrame && (this.appFrame.contentWindow.__isadmin = r.isAdmin(), r.isAdmin() || this.appFrame.contentWindow.DisableInput())
            }
        },
        appShare: function(e, t) {
            this.roomJid = window.parent.connection.emuc.roomjid;
            var n = $msg({
                to: this.roomJid,
                type: "groupchat"
            });
            n.c("appshare", {
                xmlns: "http://igniterealtime.org/protocol/appshare",
                action: e,
                url: t
            }).up(),
            console.log("xxxxxxxxxxxxx", n.tree()),
            this.connection.send(n)
        },
        appStart: function(e, t, n) {
            __isshow = !1,
            this.roomJid || (this.roomJid = window.parent.connection.emuc.roomjid),
            this.enableCursor = !0,
            $("#presentation").html('<iframe id="appViewer" src="' + e + "?room=" + roomName + "&user=" + self.nickname + '"></iframe>'),
            this.appFrame = document.getElementById("appViewer"),
            $(".media-container").addClass("hidden"),
            $(".whiteboard-container").removeClass("hidden"),
            $(document).trigger("resizeWhiteboardContainer"),
            $.prompt("Please wait....", {
                title: "Application Loader",
                persistent: !1
            }),
            n && n({
                code: o.code_200,
                msg: o.share_app_completed,
                errorCode: i.no_error,
                response: !0
            });
            var r = this;
            $(document).bind("app.share.endpoint.left",
            function(e, t) {
                t == r.appStartFrom && r.appStop()
            })
        },
        appStop: function(e) {
            __isshow = !0,
            this.setPresentationVisible(!1),
            this.appFrame && (this.appFrame.contentWindow.location.href = "about:blank", this.appFrame = null, this.appRunning = !1, $("#presentation").html(""), $(".whiteboard-container").addClass("hidden"), $(".media-container").removeClass("hidden"))
        },
        appMessage: function(e) {
            this.appFrame && this.appShare("message", JSON.stringify(e))
        },
        handleAppShare: function(e, t, n) {
            if (null == this.shareApp && (null == this.appFrame ? ("create" == e && this.appStart(t, !1), this.appStartFrom = n) : "destroy" == e && this.appStop(t)), this.appFrame && this.appFrame.contentWindow) {
                this.enableCursor && this.appFrame.contentWindow.postMessage({
                    type: "ofmeetSetMessage",
                    json: t,
                    from: n
                },
                "*");
                try {
                    this.appFrame.contentWindow.ManisMeetings && this.appFrame.contentWindow.ManisMeetings.handleAppMessage && "message" == e && this.appFrame.contentWindow.ManisMeetings.handleAppMessage(t, n)
                } catch(e) {}
            }
        },
        openAppsDialog: function(e, t, n) {
            var r = this,
            o = !1,
            i = !1;
            try {
                o = this.appFrame && this.appFrame.contentWindow.ManisMeetings && this.appFrame.contentWindow.ManisMeetings.getPrintContent,
                i = this.appFrame && this.appFrame.contentWindow.ManisMeetings && this.appFrame.contentWindow.ManisMeetings.setContent
            } catch(e) {}
            var a = window.localStorage.getItem("defaultLanguage") || "zh";
            if ("en" == a) var c = {
                Close: 1
            },
            d = {
                Confirm: 1
            };
            else var c = {
                "关闭": 1
            },
            d = {
                "确定": 1
            };
            if (o && ("en" == a ? (c.Print = 2, d.Print = 2) : (c["打印"] = 2, d["打印"] = 2)), i && ("en" == a ? c.Save = 3 : c["保存"] = 3), e) this.shareApp && r.appSave(function() {
                r.appShare("destroy", r.shareApp),
                r.appStop(r.shareApp),
                r.shareApp = null
            });
            else if (this.shareApp) if (0 == this.isPresentationVisible()) this.setPresentationVisible(!0);
            else {
                if ("en" == a) var u = "Do you want to close the Shared application ",
                l = "Stop whiteboard share ";
                else var u = "您是否想要关闭共享的应用程序",
                l = "关闭应用程序共享";
                $.prompt(u, {
                    title: l,
                    buttons: c,
                    defaultButton: 1,
                    submit: function(e, t, o, i) {
                        1 == t ? r.appDestory(n) : 3 == t ? r.appSave() : 2 == t && r.appPrint()
                    }
                })
            } else null != this.appFrame ? 0 == this.isPresentationVisible() ? this.setPresentationVisible(!0) : $.prompt("其他成员正在共享应用程序或文档. 在同一时刻此会议仅允许一个共享的应用程序", {
                f: "共享应用程序",
                buttons: d,
                defaultButton: 0,
                submit: function(e, t, n, o) {
                    1 == t || 2 == t && r.appPrint()
                }
            }) : (r.shareApp = t ? t: "apps/drawing", r.appStart(r.shareApp, !0, n), s = !0)
        },
        appDestory: function(e) {
            var t = this; (t.shareApp || s) && (t.appSave(function() {
                t.appShare("destroy", t.shareApp),
                t.appStop(t.shareApp),
                t.shareApp = null,
                s = !1
            }), e && e({
                code: o.code_200,
                errorCode: i.no_error,
                msg: o.share_app_completed,
                response: !1
            }))
        },
        setPresentationVisible: function(e) {
            e ? $("#largeVideo").fadeOut(300,
            function() {
                $("#presentation>iframe").fadeIn(300,
                function() {
                    $("#presentation>iframe").css({
                        opacity: "1"
                    })
                })
            }) : "1" == $("#presentation>iframe").css("opacity") && $("#presentation>iframe").fadeOut(300,
            function() {
                $("#presentation>iframe").css({
                    opacity: "0"
                })
            })
        },
        isPresentationVisible: function() {
            return null != $("#presentation>iframe") && 1 == $("#presentation>iframe").css("opacity")
        },
        validURL: function(e) {
            var t = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
            return e.match(t)
        },
        iframeURL: function(e) {
            return e.indexOf("<iframe src=") > -1
        }
    })
},
function(e, exports) {
    var t = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        _f: String.fromCharCode,
        compressToBase64: function(e) {
            if (null == e) return "";
            var n, r, o, i, s, a, c, d = "",
            u = 0;
            for (e = t.compress(e); u < 2 * e.length;) u % 2 == 0 ? (n = e.charCodeAt(u / 2) >> 8, r = 255 & e.charCodeAt(u / 2), o = u / 2 + 1 < e.length ? e.charCodeAt(u / 2 + 1) >> 8 : NaN) : (n = 255 & e.charCodeAt((u - 1) / 2), (u + 1) / 2 < e.length ? (r = e.charCodeAt((u + 1) / 2) >> 8, o = 255 & e.charCodeAt((u + 1) / 2)) : r = o = NaN),
            u += 3,
            i = n >> 2,
            s = (3 & n) << 4 | r >> 4,
            a = (15 & r) << 2 | o >> 6,
            c = 63 & o,
            isNaN(r) ? a = c = 64 : isNaN(o) && (c = 64),
            d = d + t._keyStr[i] + t._keyStr[s] + t._keyStr[a] + t._keyStr[c];
            return d
        },
        decompressFromBase64: function(e) {
            if (null == e) return "";
            var n, r, o, i, s, a, c, d, u = "",
            l = 0,
            p = 0,
            f = t._f;
            for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); p < e.length;) s = t._keyStr.indexOf(e[p++]),
            a = t._keyStr.indexOf(e[p++]),
            c = t._keyStr.indexOf(e[p++]),
            d = t._keyStr.indexOf(e[p++]),
            r = s << 2 | a >> 4,
            o = (15 & a) << 4 | c >> 2,
            i = (3 & c) << 6 | d,
            l % 2 == 0 ? (n = r << 8, 64 != c && (u += f(n | o)), 64 != d && (n = i << 8)) : (u += f(n | r), 64 != c && (n = o << 8), 64 != d && (u += f(n | i))),
            l += 3;
            return t.decompress(u)
        },
        compressToUTF16: function(e) {
            if (null == e) return "";
            var n, r, o, i = "",
            s = 0,
            a = t._f;
            for (e = t.compress(e), n = 0; n < e.length; n++) switch (r = e.charCodeAt(n), s) {
            case 0:
                i += a((r >> 1) + 32),
                o = (1 & r) << 14,
                s++;
                break;
            case 14:
                i += a(o + (r >> 15) + 32, (32767 & r) + 32),
                s = 0;
                break;
            default:
                i += a(o + (r >> s + 1) + 32),
                o = (r & (2 << s) - 1) << 14 - s,
                s++
            }
            return i + a(o + 32)
        },
        decompressFromUTF16: function(e) {
            if (null == e) return "";
            for (var n, r, o = "",
            i = 0,
            s = 0,
            a = t._f; s < e.length;) {
                switch (r = e.charCodeAt(s) - 32, i++) {
                case 0:
                    n = r << 1;
                    break;
                case 1:
                    o += a(n | r >> 14),
                    n = (16383 & r) << 2;
                    break;
                case 2:
                    o += a(n | r >> 13),
                    n = (8191 & r) << 3;
                    break;
                case 3:
                    o += a(n | r >> 12),
                    n = (4095 & r) << 4;
                    break;
                case 4:
                    o += a(n | r >> 11),
                    n = (2047 & r) << 5;
                    break;
                case 5:
                    o += a(n | r >> 10),
                    n = (1023 & r) << 6;
                    break;
                case 6:
                    o += a(n | r >> 9),
                    n = (511 & r) << 7;
                    break;
                case 7:
                    o += a(n | r >> 8),
                    n = (255 & r) << 8;
                    break;
                case 8:
                    o += a(n | r >> 7),
                    n = (127 & r) << 9;
                    break;
                case 9:
                    o += a(n | r >> 6),
                    n = (63 & r) << 10;
                    break;
                case 10:
                    o += a(n | r >> 5),
                    n = (31 & r) << 11;
                    break;
                case 11:
                    o += a(n | r >> 4),
                    n = (15 & r) << 12;
                    break;
                case 12:
                    o += a(n | r >> 3),
                    n = (7 & r) << 13;
                    break;
                case 13:
                    o += a(n | r >> 2),
                    n = (3 & r) << 14;
                    break;
                case 14:
                    o += a(n | r >> 1),
                    n = (1 & r) << 15;
                    break;
                case 15:
                    o += a(n | r),
                    i = 0
                }
                s++
            }
            return t.decompress(o)
        },
        compressToUint8Array: function(e) {
            for (var n = t.compress(e), r = new Uint8Array(2 * n.length), o = 0, i = n.length; o < i; o++) {
                var s = n.charCodeAt(o);
                r[2 * o] = s >>> 8,
                r[2 * o + 1] = s % 256
            }
            return r
        },
        decompressFromUint8Array: function(e) {
            if (null === e || void 0 === e) return t.decompress(e);
            for (var n = new Array(e.length / 2), r = 0, o = n.length; r < o; r++) n[r] = 256 * e[2 * r] + e[2 * r + 1];
            return t.decompress(String.fromCharCode.apply(null, n))
        },
        compressToEncodedURIComponent: function(e) {
            return t.compressToBase64(e).replace(/=/g, "$").replace(/\//g, "-")
        },
        decompressFromEncodedURIComponent: function(e) {
            return e && (e = e.replace(/$/g, "=").replace(/-/g, "/")),
            t.decompressFromBase64(e)
        },
        compress: function(e) {
            if (null == e) return "";
            var n, r, o, i = {},
            s = {},
            a = "",
            c = "",
            d = "",
            u = 2,
            l = 3,
            p = 2,
            f = "",
            h = 0,
            m = 0,
            g = t._f;
            for (o = 0; o < e.length; o += 1) if (a = e[o], Object.prototype.hasOwnProperty.call(i, a) || (i[a] = l++, s[a] = !0), c = d + a, Object.prototype.hasOwnProperty.call(i, c)) d = c;
            else {
                if (Object.prototype.hasOwnProperty.call(s, d)) {
                    if (d.charCodeAt(0) < 256) {
                        for (n = 0; n < p; n++) h <<= 1,
                        15 == m ? (m = 0, f += g(h), h = 0) : m++;
                        for (r = d.charCodeAt(0), n = 0; n < 8; n++) h = h << 1 | 1 & r,
                        15 == m ? (m = 0, f += g(h), h = 0) : m++,
                        r >>= 1
                    } else {
                        for (r = 1, n = 0; n < p; n++) h = h << 1 | r,
                        15 == m ? (m = 0, f += g(h), h = 0) : m++,
                        r = 0;
                        for (r = d.charCodeAt(0), n = 0; n < 16; n++) h = h << 1 | 1 & r,
                        15 == m ? (m = 0, f += g(h), h = 0) : m++,
                        r >>= 1
                    }
                    u--,
                    0 == u && (u = Math.pow(2, p), p++),
                    delete s[d]
                } else for (r = i[d], n = 0; n < p; n++) h = h << 1 | 1 & r,
                15 == m ? (m = 0, f += g(h), h = 0) : m++,
                r >>= 1;
                u--,
                0 == u && (u = Math.pow(2, p), p++),
                i[c] = l++,
                d = String(a)
            }
            if ("" !== d) {
                if (Object.prototype.hasOwnProperty.call(s, d)) {
                    if (d.charCodeAt(0) < 256) {
                        for (n = 0; n < p; n++) h <<= 1,
                        15 == m ? (m = 0, f += g(h), h = 0) : m++;
                        for (r = d.charCodeAt(0), n = 0; n < 8; n++) h = h << 1 | 1 & r,
                        15 == m ? (m = 0, f += g(h), h = 0) : m++,
                        r >>= 1
                    } else {
                        for (r = 1, n = 0; n < p; n++) h = h << 1 | r,
                        15 == m ? (m = 0, f += g(h), h = 0) : m++,
                        r = 0;
                        for (r = d.charCodeAt(0), n = 0; n < 16; n++) h = h << 1 | 1 & r,
                        15 == m ? (m = 0, f += g(h), h = 0) : m++,
                        r >>= 1
                    }
                    u--,
                    0 == u && (u = Math.pow(2, p), p++),
                    delete s[d]
                } else for (r = i[d], n = 0; n < p; n++) h = h << 1 | 1 & r,
                15 == m ? (m = 0, f += g(h), h = 0) : m++,
                r >>= 1;
                u--,
                0 == u && (u = Math.pow(2, p), p++)
            }
            for (r = 2, n = 0; n < p; n++) h = h << 1 | 1 & r,
            15 == m ? (m = 0, f += g(h), h = 0) : m++,
            r >>= 1;
            for (;;) {
                if (h <<= 1, 15 == m) {
                    f += g(h);
                    break
                }
                m++
            }
            return f
        },
        decompress: function(e) {
            if (null == e) return "";
            if ("" == e) return null;
            var n, r, o, i, s, a, c, d, u = [],
            l = 4,
            p = 4,
            f = 3,
            h = "",
            m = "",
            g = t._f,
            _ = {
                string: e,
                val: e.charCodeAt(0),
                position: 32768,
                index: 1
            };
            for (r = 0; r < 3; r += 1) u[r] = r;
            for (i = 0, a = Math.pow(2, 2), c = 1; c != a;) s = _.val & _.position,
            _.position >>= 1,
            0 == _.position && (_.position = 32768, _.val = _.string.charCodeAt(_.index++)),
            i |= (s > 0 ? 1 : 0) * c,
            c <<= 1;
            switch (n = i) {
            case 0:
                for (i = 0, a = Math.pow(2, 8), c = 1; c != a;) s = _.val & _.position,
                _.position >>= 1,
                0 == _.position && (_.position = 32768, _.val = _.string.charCodeAt(_.index++)),
                i |= (s > 0 ? 1 : 0) * c,
                c <<= 1;
                d = g(i);
                break;
            case 1:
                for (i = 0, a = Math.pow(2, 16), c = 1; c != a;) s = _.val & _.position,
                _.position >>= 1,
                0 == _.position && (_.position = 32768, _.val = _.string.charCodeAt(_.index++)),
                i |= (s > 0 ? 1 : 0) * c,
                c <<= 1;
                d = g(i);
                break;
            case 2:
                return ""
            }
            for (u[3] = d, o = m = d;;) {
                if (_.index > _.string.length) return "";
                for (i = 0, a = Math.pow(2, f), c = 1; c != a;) s = _.val & _.position,
                _.position >>= 1,
                0 == _.position && (_.position = 32768, _.val = _.string.charCodeAt(_.index++)),
                i |= (s > 0 ? 1 : 0) * c,
                c <<= 1;
                switch (d = i) {
                case 0:
                    for (i = 0, a = Math.pow(2, 8), c = 1; c != a;) s = _.val & _.position,
                    _.position >>= 1,
                    0 == _.position && (_.position = 32768, _.val = _.string.charCodeAt(_.index++)),
                    i |= (s > 0 ? 1 : 0) * c,
                    c <<= 1;
                    u[p++] = g(i),
                    d = p - 1,
                    l--;
                    break;
                case 1:
                    for (i = 0, a = Math.pow(2, 16), c = 1; c != a;) s = _.val & _.position,
                    _.position >>= 1,
                    0 == _.position && (_.position = 32768, _.val = _.string.charCodeAt(_.index++)),
                    i |= (s > 0 ? 1 : 0) * c,
                    c <<= 1;
                    u[p++] = g(i),
                    d = p - 1,
                    l--;
                    break;
                case 2:
                    return m
                }
                if (0 == l && (l = Math.pow(2, f), f++), u[d]) h = u[d];
                else {
                    if (d !== p) return null;
                    h = o + o[0]
                }
                m += h,
                u[p++] = o + h[0],
                l--,
                o = h,
                0 == l && (l = Math.pow(2, f), f++)
            }
        }
    };
    exports = e.exports = t
},
function(e, exports, t) {
    function n(e, t, n) {
        e && (window.currentAudioInputDeviceId = e),
        t && (window.currentVideoInputDeviceId = t),
        n && (window.currentAudioOutputDeviceId = e),
        navigator.mediaDevices.enumerateDevices().then(o).
        catch(r)
    }
    function r(e) {
        console.log("navigator.getUserMedia error: ", e)
    }
    function o(e) {
        for (var t = 0; t !== e.length; ++t) {
            var n = e[t];
            1 == config.debug && console.log(n),
            "videoinput" != n.kind || window.currentVideoInputDeviceId ? "audioinput" != n.kind || window.currentAudioInputDeviceId || (window.currentAudioInputDeviceId = n.deviceId) : window.currentVideoInputDeviceId = n.deviceId
        }
    }
    function i(e) {
        var t = {
            audio: {},
            video: {}
        };
        if (1 == e) t.video = !1;
        else {
            if (config.resolution) {
                var n = config.resolution;
                switch (n) {
                case 1080:
                case "1080":
                    t.video = X,
                    config.videoBandwidth = 4096 == config.videoBandwidth ? config.videoBandwidth: 2048;
                    break;
                case 720:
                case "720":
                    t.video = W,
                    config.videoBandwidth = 2048 == config.videoBandwidth ? config.videoBandwidth: 1024;
                    break;
                case 768:
                case "768":
                    t.video = K,
                    config.videoBandwidth = 2048 == config.videoBandwidth ? config.videoBandwidth: 1024;
                    break;
                case 540:
                case "540":
                    t.video = z,
                    config.videoBandwidth = 1024 == config.videoBandwidth ? config.videoBandwidth: 512;
                    break;
                case 480:
                case "480":
                    t.video = Q,
                    config.videoBandwidth = 1024 == config.videoBandwidth ? config.videoBandwidth: 512;
                    break;
                case 240:
                case "240":
                    t.video = Y,
                    config.videoBandwidth = 512 == config.videoBandwidth ? config.videoBandwidth: 256;
                    break;
                case 180:
                case "180":
                    t.video = G,
                    config.videoBandwidth = 512 == config.videoBandwidth ? config.videoBandwidth: 256;
                    break;
                default:
                    t.video = W,
                    config.videoBandwidth = 2048 == config.videoBandwidth ? config.videoBandwidth: 1024
                }
            }
            t.video && window.currentVideoInputDeviceId && (t.video.deviceId = window.currentVideoInputDeviceId ? {
                exact: window.currentVideoInputDeviceId
            }: void 0)
        }
        return window.currentAudioInputDeviceId && (t.audio.deviceId = window.currentAudioInputDeviceId ? {
            exact: window.currentAudioInputDeviceId
        }: void 0),
        window.constraints = t,
        t
    }
    function s(e) {
        console.log("get create room in ctl response :", e)
    }
    function a(e) {
        console.log("get grant admin response :", e)
    }
    function c(e) {
        console.log("valid room response :", e)
    }
    function d(e) {
        console.log("fetch admin response:", e)
    }
    function u() {
        var e = $iq({
            to: roomName,
            type: "set"
        });
        e.c("conference", {
            xmlns: "http://jitsi.org/protocol/focus",
            room: roomName,
            type: "leave"
        }),
        e.up(),
        connection.sendIQ(e,
        function(e) {
            console.log("leave room complete : ", e)
        },
        function(e) {
            console.log("leave room failed : ", e)
        })
    }
    function l(e, t) {
        var n = $iq({
            to: e.focusJid,
            type: "set",
            from: connection.jid
        });
        return n.c("conference", {
            xmlns: "http://jitsi.org/protocol/focus",
            room: e.r ? e.r + "@conference." + manisConfg.messageServer: null
        }),
        void 0 !== e.vb && n.c("property", {
            name: "bridge",
            value: e.vb
        }).up(),
        void 0 !== e.autoRecord && n.c("property", {
            name: "autoRecord",
            value: e.autoRecord
        }).up(),
        void 0 !== config.channelLastN && n.c("property", {
            name: "channelLastN",
            value: config.channelLastN
        }).up(),
        void 0 !== config.adaptiveLastN && n.c("property", {
            name: "adaptiveLastN",
            value: config.adaptiveLastN
        }).up(),
        void 0 !== config.adaptiveSimulcast && n.c("property", {
            name: "adaptiveSimulcast",
            value: config.adaptiveSimulcast
        }).up(),
        void 0 !== config.openSctp && n.c("property", {
            name: "openSctp",
            value: config.openSctp
        }).up(),
        void 0 !== config.enableFirefoxSupport && n.c("property", {
            name: "enableFirefoxHacks",
            value: config.enableFirefoxSupport
        }).up(),
        void 0 !== connection.resource && n.c("property", {
            name: "endPoint",
            value: connection.resource
        }).up(),
        void 0 !== config.nat && n.c("property", {
            name: "nat",
            value: config.nat
        }).up(),
        n.c("property", {
            name: "simulcastMode",
            value: "rewriting"
        }).up(),
        e.audioEncoding && n.c("property", {
            name: "audioEncoding",
            value: e.audioEncoding
        }).up(),
        e.videoEncoding && n.c("property", {
            name: "videoEncoding",
            value: e.videoEncoding
        }).up(),
        config.nickname && n.c("property", {
            name: "nick",
            value: config.nickname
        }).up(),
        n.c("property", {
            name: "action",
            value: t ? "join": ""
        }).up(),
        n.up(),
        n
    }
    function p(e, t, n, r, o) {
        var i = l(e, !0);
        console.log("generate create room iq : ", i.tree()),
        connection.sendIQ(i,
        function(i) {
            if (console.info("send iq complete : ", i), "true" != $(i).find("conference").attr("ready")) return void setTimeout(function() {
                p(e, t, n, r, o)
            },
            1e3);
            var s = $(i).attr("from");
            window.focusJid = s,
            f(t, n, r, o, e)
        },
        function(i) {
            console.error("send iq failure : ", i),
            setTimeout(function() {
                p(e, t, n, r, o)
            },
            1e3)
        })
    }
    function f(e, t, n, r, o) {
        try {
            var i = roomName + "/" + connection.resource;
            connection.emuc.doJoin(i),
            connection.emuc.addAudioInfoToPresence(0 == r.audio),
            connection.emuc.addVideoInfoToPresence(0 == r.video);
            var s = Strophe.getResourceFromJid(connection.jid),
            a = {
                info: {
                    nickname: config.nickname ? config.nickname: manisConfg.mUsername,
                    resource: s,
                    roomNumber: o.r,
                    roomPassword: config.roomPassword ? config.roomPassword: "",
                    jid: connection.jid
                },
                stream: n,
                status: O.generateStatusNode(s),
                constraints: r,
                roomName: o.r,
                hands_up: !1,
                is_moderator: connection.jid == config.moderatorJid,
                audio_only: 0 == r.video,
                video_muted: 0 == r.video
            };
            e({
                code: D.code_200,
                msg: D.join_room_success,
                response: a,
                errorCode: L.no_error
            })
        } catch(e) {
            t({
                code: D.code_500,
                msg: D.join_room_failed,
                errorCode: L.conference_room_participant_failed
            })
        }
    }
    function h(e, t, n) {
        I.getMedia(e,
        function(n) {
            config.currentResolution = e.video ? e.video.height.exact: null,
            t(n)
        },
        function(r) {
            if ("DevicesNotFoundError" == r.name || "DevicesNotFoundError" == r.constructor.name) return void n({
                code: D.code_404,
                msg: D.without_usefull_video_device,
                errorCode: L.media_device_except
            });
            if ("OverconstrainedError" != r.name && "OverconstrainedError" != r.constructor.name) return void n({
                code: D.code_400,
                msg: D.get_user_media_failed,
                error: r,
                errorCode: L.media_device_get_local_media_failed
            });
            if (e.video) {
                if (! (e.video.height.exact > 180)) return void n({
                    code: D.code_402,
                    msg: D.out_of_video_device_resolution,
                    errorCode: L.media_device_resolution_nonsupport
                });
                if (1080 == e.video.height.exact) {
                    config.resolution = "720";
                    var o = i(0 == e.video);
                    h(o, t, n)
                } else if (720 == e.video.height.exact) {
                    config.resolution = "768";
                    var o = i(0 == e.video);
                    h(o, t, n)
                } else if (768 == e.video.height.exact) {
                    config.resolution = "540";
                    var o = i(0 == e.video);
                    h(o, t, n)
                } else if (540 == e.video.height.exact) {
                    config.resolution = "480";
                    var o = i(0 == e.video);
                    h(o, t, n, e)
                } else if (480 == e.video.height.exact) {
                    config.resolution = "240";
                    var o = i(0 == e.video);
                    h(o, t, n, e)
                } else if (240 == e.video.height.exact) {
                    config.resolution = "180";
                    var o = i(0 == e.video);
                    h(o, t, n, e)
                }
            }
        })
    }
    function m(e, t, n, r, o) {
        var s = connection.jid == config.moderatorJid;
        if (O.setAdmin(s), connection.emuc.addConfigRoleToPresence(config.role), connection.emuc.addIsModeratorToPresence(s), connection.emuc.addAvartarToPresence(config.photo || ""), "p2p" == window.connectType) N.join(e.r, t, n);
        else if (o) {
            if (window.webkitMediaStream) {
                for (var a = new webkitMediaStream,
                c = new webkitMediaStream,
                d = o.getAudioTracks(), u = o.getVideoTracks(), l = 0; l < d.length; l++) a.addTrack(d[l]);
                for (l = 0; l < u.length; l++) c.addTrack(u[l]);
                connection.jingle.localAudio = a,
                connection.jingle.localVideo = c
            } else connection.jingle.localAudio = o,
            connection.jingle.localVideo = o;
            o.ssrc = window.localStreamSSRC,
            p(e, t, n, o, {})
        } else {
            var f = i(r);
            h(f,
            function(r) {
                if (window.webkitMediaStream) {
                    for (var o = new webkitMediaStream,
                    i = new webkitMediaStream,
                    s = r.getAudioTracks(), a = r.getVideoTracks(), c = 0; c < s.length; c++) o.addTrack(s[c]);
                    for (c = 0; c < a.length; c++) i.addTrack(a[c]);
                    connection.jingle.localAudio = o,
                    connection.jingle.localVideo = i
                } else connection.jingle.localAudio = r,
                connection.jingle.localVideo = r;
                r.ssrc = window.localStreamSSRC,
                p(e, t, n, r, f)
            },
            function(i) {
                return r ? (console.error(i), void n(i)) : (console.log("get local video media stream failed, try audio only model"), $(document).trigger("manis.on.switch.to.audio.model", [!r]), void m(e, t, n, !0, o))
            })
        }
    }
    function g(e, t, n, r, o, i, s) {
        try {
            $.ajax({
                url: s,
                dataType: "jsonp",
                jsonpCallback: "createRoomInCtlCallback",
                data: {
                    u: e,
                    j: t,
                    p: n,
                    op: r
                },
                type: "GET",
                async: !1,
                timeout: 2e3,
                success: function(e, t, r) {
                    if (4 == r.readyState && 200 == r.status) {
                        if (500 == e.code) console.info("room exist in ctl do join: ", e),
                        S(e.obj.r, n, o, i);
                        else if (200 == e.code) {
                            if (O.setAdmin(!0), console.info("create room in ctl success: ", e), void 0 != e.obj.moderator) {
                                var s = "true" == e.obj.moderator;
                                connection.emuc.addIsModeratorToPresence(s)
                            }
                            config.gw = e.obj.gw,
                            config.title = e.obj.title,
                            window.roomName = e.obj.r + "@conference." + manisConfg.messageServer,
                            window.config.focusUserJid = "focus@" + manisConfg.messageServer,
                            m(e.obj, o, i)
                        }
                    } else i({
                        code: D.code_403,
                        msg: D.out_of_source_limit
                    })
                },
                error: function(e, t) {
                    console.error("xOptions : ", e, "textStatus : ", t),
                    i({
                        code: D.code_500,
                        msg: D.create_room_failed
                    })
                }
            })
        } catch(e) {
            console.error("xhr request failure with error : ", e),
            i({
                code: D.code_500,
                msg: D.create_room_failed
            })
        }
    }
    function _(e, t, n, r, o) {
        var i = P.createHash("md5");
        i.update(n);
        var s = i.digest("hex");
        $.ajax({
            url: window.serverPath + V,
            dataType: "json",
            data: {
                r: t,
                j: e.jid,
                p: s
            },
            type: "GET",
            timeout: 2e3,
            success: function(t, n, i) {
                if (200 == t.code) {
                    O.setAdmin(!0);
                    var s = $msg({
                        to: e.jid,
                        type: "chat"
                    });
                    s.c("body", {
                        xmlns: "http://igniterealtime.org/protocol/grantAdmin",
                        jid: e.jid
                    }).t("true").up(),
                    window.connection.send(s),
                    window.connection.emuc.addConfigRoleToPresence(config.role),
                    window.connection.emuc.addIsModeratorToPresence(O.isAdmin()),
                    window.connection.emuc.sendPresence(),
                    r({
                        code: D.code_200,
                        msg: D.fetch_compere_success,
                        errorCode: L.no_error
                    })
                } else o({
                    code: D.code_400,
                    msg: D.fetch_compere_error,
                    errorCode: L.fetch_admin_failed
                })
            },
            error: function(e, t) {
                o({
                    code: D.code_500,
                    msg: D.network_error,
                    errorCode: L.api_fetch_failed
                })
            }
        })
    }
    function v(e, t, n, r) {
        $.ajax({
            url: window.serverPath + F,
            dataType: "json",
            data: {
                r: t,
                j: e.jid,
                i: config.mUserId
            },
            type: "GET",
            timeout: 2e3,
            success: function(t) {
                if (200 == t.code) {
                    O.setAdmin(!1);
                    var o = window.connection.emuc.roomjid + "/" + Strophe.getResourceFromJid(e.jid),
                    i = $msg({
                        to: o,
                        type: "chat"
                    });
                    i.c("body", {
                        xmlns: "http://igniterealtime.org/protocol/grantAdmin",
                        jid: o
                    }).t("true").up(),
                    window.connection.send(i),
                    window.connection.emuc.addConfigRoleToPresence(config.role),
                    window.connection.emuc.addIsModeratorToPresence(O.isAdmin()),
                    window.connection.emuc.sendPresence();
                    for (var s = 0; s < window.participants.length; s++) {
                        var a = window.participants[s];
                        a.jid == connection.jid && (a.is_moderator = O.isAdmin(), window.participants[s] = a)
                    }
                    n({
                        code: D.code_200,
                        msg: D.transferc_compere_success,
                        errorCode: L.no_error
                    })
                } else r({
                    code: D.code_400,
                    msg: D.transferc_compere_failed,
                    errorCode: L.grant_admin_participant_failed
                })
            },
            error: function(e, t) {
                r({
                    code: D.code_500,
                    msg: D.network_error,
                    errorCode: L.api_fetch_failed
                })
            }
        })
    }
    function y(e, t, n, r) {
        var o = O.getUserByResource(e),
        i = $iq({
            to: window.focusJid,
            type: "set"
        }).c("mute", {
            xmlns: "http://jitsi.org/jitmeet/audio",
            jid: o.jid,
            userjid: o.jid
        }).t(t.toString()).up();
        window.connection.sendIQ(i,
        function(e) {
            o.jid == window.self.jid && O.setAudioMute(t),
            n({
                code: D.code_200,
                msg: D.manage_set_audio_mute_success,
                response: t,
                errorCode: L.no_error
            })
        },
        function(e) {
            r({
                code: D.code_400,
                msg: D.manage_set_audio_mute_failed,
                errorCode: L.operate_someone_audio_failed
            })
        })
    }
    function w(e, t, n, r) {
        var o = O.getUserByResource(e),
        i = $iq({
            to: window.focusJid,
            type: "set"
        }).c("mute", {
            xmlns: "http://jitsi.org/jitmeet/video",
            jid: o.jid,
            userjid: o.jid
        }).t(t.toString()).up();
        window.connection.sendIQ(i,
        function(e) {
            o.jid == window.self.jid && (O.setVideoMute(t), $(document).trigger("onmute.video.muc", t)),
            n({
                code: D.code_200,
                msg: D.manage_set_audio_mute_success,
                response: t,
                errorCode: L.no_error
            })
        },
        function(e) {
            r({
                code: D.code_400,
                msg: D.manage_set_audio_mute_failed,
                errorCode: L.operate_someone_video_failed
            })
        })
    }
    function b(e, t, n) {
        try {
            var r = $msg({
                to: e.jid,
                type: "chat"
            });
            r.c("body", {
                xmlns: "http://igniterealtime.org/protocol/eject",
                jid: e.jid
            }).t("true").up(),
            window.connection.send(r),
            t({
                code: D.code_200,
                msg: D.remove_participant_complete,
                errorCode: L.no_error
            })
        } catch(e) {
            n({
                code: D.code_400,
                msg: D.remove_participant_failed,
                errorCode: L.eject_participant_failed
            })
        }
    }
    function S(e, t, n, r) {
        try {
            $.ajax({
                url: window.serverPath + U,
                dataType: "jsonp",
                jsonpCallback: "validRoomCallBack",
                data: {
                    r: e,
                    p: t,
                    u: manisConfg.mUserId,
                    j: connection.jid
                },
                type: "GET",
                async: !0,
                timeout: 2e3,
                success: function(t, o, i) {
                    if (4 == i.readyState && 200 == i.status) if (200 == t.code) {
                        console.log("success join room :", e, t);
                        var s = t.obj.moderator ? t.obj.moderator == connection.jid: O.isAdmin();
                        void 0 != t.obj.moderator && (connection.emuc.addIsModeratorToPresence(s), connection.emuc.sendPresence()),
                        window.roomName = e + "@conference." + manisConfg.messageServer;
                        var a = t;
                        a.r = e,
                        a.vb = t.obj.vb,
                        config.gw = t.obj.gw,
                        config.title = t.obj.title,
                        O.setAdmin(s),
                        m(a, n, r)
                    } else 401 == t.code ? r({
                        code: D.code_422,
                        msg: D.room_password_expect
                    }) : 403 == t.code && r({
                        code: D.code_405,
                        msg: D.room_locked
                    });
                    else r({
                        code: D.code_500,
                        msg: D.join_room_failed
                    })
                },
                error: function(e, t) {
                    r({
                        code: D.code_500,
                        msg: D.join_room_failed
                    })
                }
            })
        } catch(e) {
            errorCallBack({
                code: D.code_500,
                msg: D.join_room_failed
            })
        }
    }
    function C(e, t, n, r) {
        x(e, t, n, r)
    }
    function x(e, t, n, r) {
        try {
            $.ajax({
                url: window.serverPath + B,
                dataType: "jsonp",
                jsonpCallback: "checkResourcesCallBack",
                data: {
                    r: e,
                    j: connection.jid,
                    u: manisConfg.mUserId
                },
                type: "GET",
                async: !0,
                timeout: 2e3,
                success: function(o, i, s) {
                    if (4 == s.readyState && 200 == s.status) if (200 == o.code) {
                        var a = t;
                        if (void 0 != a && "" != a && null != a) {
                            console.log("room resources check success.");
                            var c = P.createHash("md5");
                            c.update(t),
                            a = c.digest("hex")
                        }
                        S(e, a, n, r)
                    } else r({
                        code: D.code_403,
                        msg: D.out_of_source_limit
                    });
                    else r({
                        code: D.code_500,
                        msg: D.join_room_failed
                    })
                },
                error: function(e, t) {
                    r({
                        code: D.code_500,
                        msg: D.join_room_failed
                    })
                }
            })
        } catch(e) {
            r({
                code: D.code_500,
                msg: D.join_room_failed
            })
        }
    }
    function T(e, t) {
        var n = !(!e || "true" != e.toString());
        try {
            var r = manisConfg.mUserId,
            o = roomName.split("@")[0];
            $.ajax({
                url: window.serverPath + "/conference/lock?i=" + r + "&r=" + o + "&l=" + n,
                dataType: "jsonp",
                processData: !1,
                type: "get",
                success: function(e) {
                    200 == e.code && (window.lock = n, O.broadcastRoomLockStatus(n), t({
                        code: D.code_200,
                        msg: D.lock_or_unlock_room_completed,
                        response: n,
                        errorCode: L.no_error
                    }))
                }
            })
        } catch(e) {
            t({
                code: D.code_500,
                msg: D.lock_or_unlock_room_failed,
                errorCode: L.api_fetch_failed
            })
        }
    }
    function k(e, t, n) {
        $.ajax({
            url: window.serverPath + "/user/join?j=" + connection.jid + "&r=" + e.r,
            dataType: "jsonp",
            processData: !1,
            type: "get",
            async: !1,
            success: function(r) {
                200 == r.code ? m(e, t, n) : n({
                    code: D.code_403,
                    msg: D.out_of_source_limit
                })
            },
            error: function(e, t, r) {
                n({
                    code: D.code_500,
                    msg: D.out_of_source_limit
                })
            }
        })
    }
    function R(e, t, n) {
        $.ajax({
            url: window.serverPath + "/user/valid?i=" + connection.username + "&r=" + e.r + "&j=" + connection.jid,
            dataType: "jsonp",
            processData: !1,
            type: "get",
            success: function(r) {
                200 == r.code ? k(e, t, n) : 401 == r.code || 403 == r.code ? (n({
                    code: D.code_400,
                    msg: D.join_room_failed
                }), window.location.href = r.msg) : 4030 == r.code ? (n({
                    code: D.code_400,
                    msg: D.room_locked
                }), window.location.href = r.msg) : n({
                    code: D.code_400,
                    msg: D.join_room_failed
                })
            }
        })
    }
    function A(e, t, n, r, o, i, s) {
        var a = window.localStorage.getItem("defaultLanguage") || "zh";
        $.ajax({
            url: window.serverPath + q,
            dataType: "json",
            data: {
                r: e,
                j: connection.jid,
                u: manisConfg.mUserId,
                p: t,
                op: n,
                lang: a
            },
            type: "GET",
            timeout: 2e3,
            success: function(e) {
                switch (console.info("create or join room in room controller result : ", e), e.code) {
                case 200:
                    window.roomName = e.obj.r + "@conference." + manisConfg.messageServer,
                    config.gw = e.obj.gw,
                    config = Object.assign(config, e.obj),
                    config.roomPassword = t,
                    config.storeResolution = config.resolution,
                    m(e.obj, r, o, i, s);
                    break;
                case 401:
                    o({
                        code:
                        D.code_401,
                        msg: D.room_password_expect,
                        errorCode: L.conference_room_not_exist
                    });
                    break;
                case 403:
                    o({
                        code:
                        D.code_403,
                        msg: D.room_locked,
                        errorCode: L.conference_room_locked
                    });
                    break;
                case 404:
                    o({
                        code:
                        D.code_404,
                        msg: D.conference_focus_except,
                        errorCode: L.conference_room_focus_except
                    });
                    break;
                case 405:
                    o({
                        code:
                        D.code_405,
                        msg: D.conference_vb_except,
                        errorCode: L.conference_room_vb_except
                    });
                    break;
                case 4031:
                    o({
                        code:
                        D.code_403,
                        msg: D.out_of_source_limit,
                        errorCode: L.conference_room_source_limit
                    });
                    break;
                case 4032:
                    o({
                        code:
                        D.code_408,
                        msg: D.conference_participant_time_error,
                        errorCode: L.conference_room_participant_out_time
                    });
                    break;
                default:
                    o({
                        code:
                        D.code_500,
                        msg: D.join_room_failed,
                        errorCode: e.code
                    })
                }
            },
            error: function(e, t) {
                console.error("xOptions : ", e, "textStatus : ", t),
                o({
                    code: D.code_500,
                    msg: D.join_room_failed,
                    errorCode: L.api_fetch_failed
                })
            }
        })
    }
    function j(e, t, n, r) {
        try {
            var o = window.localStorage.getItem("defaultLanguage") || "zh";
            $.ajax({
                url: window.serverPath + q,
                dataType: "jsonp",
                jsonpCallback: "createOrJoinConferenceCallBack",
                data: {
                    r: e,
                    j: connection.jid,
                    u: manisConfg.mUserId,
                    p: t,
                    op: null,
                    lang: o
                },
                type: "GET",
                async: !0,
                timeout: 2e3,
                success: function(e, o, i) {
                    switch (console.info("create or join room in room controller result : ", e), e.code) {
                    case 200:
                        window.roomName = e.obj.r + "@conference." + manisConfg.messageServer,
                        config.gw = e.obj.gw,
                        config = Object.assign(config, e.obj),
                        config.roomPassword = t;
                        var s = connection.jid == config.moderatorJid;
                        O.setAdmin(s),
                        connection.emuc.addConfigRoleToPresence(config.role),
                        connection.emuc.addIsModeratorToPresence(s),
                        p(e.obj, r, r, n, {});
                        break;
                    case 401:
                        r({
                            code:
                            D.code_401,
                            msg: D.room_password_expect,
                            errorCode: L.conference_room_not_exist
                        });
                        break;
                    case 403:
                        r({
                            code:
                            D.code_403,
                            msg: D.room_locked,
                            errorCode: L.conference_room_locked
                        });
                        break;
                    case 404:
                        r({
                            code:
                            D.code_404,
                            msg: D.conference_focus_except,
                            errorCode: L.conference_room_focus_except
                        });
                        break;
                    case 405:
                        r({
                            code:
                            D.code_405,
                            msg: D.conference_vb_except,
                            errorCode: L.conference_room_vb_except
                        });
                        break;
                    case 4031:
                        r({
                            code:
                            D.code_403,
                            msg: D.out_of_source_limit,
                            errorCode: L.conference_room_source_limit
                        });
                        break;
                    case 4032:
                        r({
                            code:
                            D.code_408,
                            msg: D.conference_participant_time_error,
                            errorCode: L.conference_room_participant_out_time
                        });
                        break;
                    default:
                        r({
                            code:
                            D.code_500,
                            msg: D.join_room_failed,
                            errorCode: L.conference_room_participant_failed_unknown_response_code
                        })
                    }
                },
                error: function(e, t) {
                    console.error("xOptions : ", e, "textStatus : ", t),
                    r({
                        code: D.code_500,
                        msg: D.join_room_failed,
                        errorCode: L.api_fetch_failed
                    })
                }
            })
        } catch(e) {
            console.error("xhr request failure with error : ", e),
            r({
                code: D.code_500,
                msg: D.join_room_failed,
                errorCode: L.unknown_error
            })
        }
    }
    function E(e, t) {
        $.ajax({
            url: window.serverPath + H + config.r,
            data: {
                userId: config.mUserId,
                lengthTime: e
            },
            type: "GET",
            timeout: 2e3,
            success: function(e) {
                1 == config.debug && console.log("delay room success", e),
                t({
                    code: D.code_200,
                    msg: D.room_extend_time_success,
                    errorCode: L.no_error
                })
            },
            error: function(e, n) {
                1 == config.debug && console.error("delay room failed: ", e, n),
                t({
                    code: D.code_403,
                    msg: D.room_extend_time_failed,
                    errorCode: L.conference_delay_failed
                })
            }
        })
    }
    function M(e) {
        $.ajax({
            url: window.serverPath + J,
            data: {
                roomNuber: config.r,
                userJid: connection.jid
            },
            type: "GET",
            timeout: 2e3,
            success: function(t) {
                if (1 == config.debug && console.log("update gw config resource", t), 200 == t.code) {
                    var n = t.obj.gw ? t.obj.gw: config.gw;
                    e(n)
                } else console.error("update gw config resource failed: ", t)
            },
            error: function(e, t) {
                1 == config.debug && console.error("update gw config resource failed: ", e, t)
            }
        })
    }
    var I = t(12),
    P = (t(56), t(59)),
    O = t(30),
    D = t(26),
    L = t(27),
    N = t(28);
    const B = "/user/join",
    U = "/user/joinConferenceClient",
    F = "/user/grantAdmin",
    V = "/user/getModerator",
    q = "/clientApi/createOrJoinConference",
    H = "/clientApi/conferences/extend/",
    J = "/clientApi/conference/resources",
    G = {
        width: {
            exact: 320
        },
        height: {
            exact: 180
        }
    },
    z = {
        width: {
            exact: 960
        },
        height: {
            exact: 540
        }
    },
    W = {
        width: {
            exact: 1280
        },
        height: {
            exact: 720
        }
    },
    X = {
        width: {
            exact: 1920
        },
        height: {
            exact: 1080
        }
    },
    Y = {
        width: {
            exact: 320
        },
        height: {
            exact: 240
        }
    },
    Q = {
        width: {
            exact: 640
        },
        height: {
            exact: 480
        }
    },
    K = {
        width: {
            exact: 1024
        },
        height: {
            exact: 768
        }
    };
    var Z = {
        video: X,
        audio: {}
    };
    window.constraints = Z,
    window.validRoomCallBack = c,
    window.fetchAdminCallBack = d,
    window.createRoomInCtlCallback = s,
    window.grantAdminCallBack = a,
    e.exports = {
        createOrJoinRoom: A,
        createRoom: g,
        fetchAdmin: _,
        grantAdmin: v,
        setAudioMute: y,
        setVideoMute: w,
        eject: b,
        joinConferenceRoom: C,
        lockRoom: T,
        roomValidCheck: R,
        joinRoom: m,
        leaveConferenceRoom: u,
        initDefaultInputDevices: n,
        joinConferenceWithMedia: j,
        roomDelay: E,
        updateGWConfig: M
    }
},
function(e, exports, t) {
    function n(e, t) {
        $(e).find('media[xmlns="http://estos.de/ns/mjs"]>source').each(function(e, n) {
            var r = n.getAttribute("ssrc");
            ssrc2jid[r] = t;
            var o = n.getAttribute("type");
            ssrc2videoType[r] = o
        }),
        r(e, t)
    }
    function r(e, t) {
        var n = $(e).find("stats");
        if (n.length) {
            var r = {};
            Strophe.forEachChild(n[0], "stat",
            function(e) {
                r[e.getAttribute("name")] = e.getAttribute("value")
            });
            var o = null,
            i = $(e).find("media");
            i.length && Strophe.forEachChild(i[0], "source",
            function(e) {
                var t = e.getAttribute("type");
                "video" == t && (o = e.getAttribute("ssrc"))
            }),
            f.updateRemoteStats(t, r, o)
        }
    }
    function o() {
        1 == window.sendOnly && l.sendOnlyChannelMsg(function(e) {
            200 != e.code && (console.log("resent sendonly msg again after 1 second, mabay channel not ok"), setTimeout(o, 1e3))
        })
    }
    function i(e, t) {
        console.info("wait for pressnce ; data : ", e, " sid : ", t);
        var n, r = connection.jingle.sessions[t];
        if (e.stream.id && e.stream.id.indexOf("mixedmslabel") === -1) {
            var o = a.find_lines(r.peerconnection.remoteDescription.sdp, "a=ssrc:");
            if (console.log("========== ssrclines: ", o), o = o.filter(function(t) {
                return t.indexOf("msid:" + e.stream.id) !== -1
            }), o.length) {
                console.log("========== new ssrclines: ", o);
                for (var d = 0; d < o.length; d++) {
                    if (n = o[d].substring(7).split(" ")[0], console.log("============ get ssrclines : ", o, " ssrc2jid : ", ssrc2jid, " thessrc : ", n), !ssrc2jid[n]) return void setTimeout(function(e, t) {
                        return function() {
                            i(e, t)
                        }
                    } (e, t), 250);
                    console.log("associated jid", ssrc2jid[n], e.peerjid),
                    ssrc2jid[n] && (e.peerjid = ssrc2jid[n])
                }
            }
        }
        var u = new c(e, t, n),
        l = e.peerjid || connection.emuc.myroomjid;
        mediaStreams[l] || (mediaStreams[l] = {}),
        mediaStreams[l][u.type] = u;
        var f;
        "mixedmslabel" !== e.stream.id && "default" !== e.stream.id && console.log("can not associate stream", e.stream.id, "with a participant"),
        e.stream.ssrc = n;
        var h = !1;
        document.querySelector("#stream_" + e.stream.ssrc) || Strophe.getResourceFromJid(l) == Strophe.getResourceFromJid(connection.jid) ? f = document.querySelector("#stream_" + e.stream.ssrc) : (h = !0, f = document.createElement("video"), f.id = "stream_" + e.stream.ssrc),
        f && (f.autoplay = !0, f.srcObject = e.stream);
        var m = e.stream.getVideoTracks().length > 0,
        g = e.stream.getAudioTracks().length > 0;
        if (m && h) {
            var _ = {
                info: p.getUserInfoByJid(l),
                stream: e.stream,
                status: p.generateStatusNode(Strophe.getResourceFromJid(l)),
                hands_up: !1
            };
            console.log(" video source added : ", e, t, (new Date).getTime()),
            $(document).trigger("manis.room.someone.joined", [_])
        }
        g && $(document).trigger("manis.room.someone.audio.added", [{
            info: p.getUserInfoByJid(l),
            stream: e.stream,
            type: "audio"
        }]),
        m && e.peerjid && r.peerjid === e.peerjid && 0 === e.stream.getVideoTracks().length && connection.jingle.localVideo.getVideoTracks().length > 0 && window.setTimeout(function() {
            s(r.peerconnection)
        },
        3e3)
    }
    function s(e) {
        console.log("sendkeyframe", e.iceConnectionState),
        "connected" === e.iceConnectionState && e.setRemoteDescription(e.remoteDescription,
        function() {
            e.createAnswer(function(t) {
                e.setLocalDescription(t,
                function() {},
                function(e) {
                    console.error("triggerKeyframe setLocalDescription failed", e)
                })
            },
            function(e) {
                console.error("triggerKeyframe createAnswer failed", e)
            })
        },
        function(e) {
            console.error("triggerKeyframe setRemoteDescription failed", e)
        })
    }
    var a = t(35),
    c = t(57),
    d = t(58),
    u = t(36),
    l = t(7),
    p = t(30),
    f = t(8);
    $(document).bind("moderatored.muc",
    function(e, t, n) {
        for (var r = !1,
        o = 0; o < window.participants.length; o++) {
            var i = window.participants[o];
            i.resource == Strophe.getResourceFromJid(t) && (i.is_moderator = n),
            i.is_moderator && (r = !0)
        }
    }),
    $(document).bind("manis.been.stop.screen.share",
    function(e) {
        window.removeScreenInprogress = !0,
        window.isUsingScreenStream = !1,
        l.removeScreenSourceFromConnection(function(e) {
            console.info("someone share screen replaced my share"),
            $(document).trigger("mains.on.screen.share.end")
        })
    }),
    $(document).bind("entered.muc",
    function(e, t, n, r) {
        if (console.log("entered", t, n), t.indexOf("recorder") > -1) return ! 1;
        if (t.indexOf("focus") === -1) var o = {
            nickname: n.displayName,
            jid: n.jid,
            resource: Strophe.getResourceFromJid(n.jid),
            audio_muted: !1,
            video_muted: !1,
            is_moderator: connection.jid == config.moderatorJid
        };
        else var o = {
            nickname: config.nickname ? config.nickname: manisConfg.mUserName,
            jid: connection.jid,
            resource: Strophe.getResourceFromJid(connection.jid),
            audio_muted: !1,
            video_muted: !1,
            is_moderator: connection.jid == config.moderatorJid
        };
        if (window.participants.length > 0) {
            for (var i = !1,
            s = 0; s < window.participants.length; s++) {
                var a = window.participants[s];
                a.resource === o.resource && (i = !0)
            }
            i || window.participants.push(o)
        } else window.participants.push(o);
        return n.isFocus ? (window.focusJid = t, void console.info("Ignore focus: " + t + ", real JID: " + n.jid)) : void 0
    }),
    $(document).bind("left.muc",
    function(e, t) {
        delete jid2Ssrc[t],
        void 0 != connection.jingle && connection.jingle.terminateByJid(t);
        var n = !1;
        if (window.participants.length > 0) for (var r = 0; r <= window.participants.length; r++) {
            var o = window.participants[r];
            o && o.resource === Strophe.getResourceFromJid(t) && (window.participants.splice(r, 1), n = !0)
        }
        n ? ($(document).trigger("manis.room.someone.left", {
            resource: Strophe.getResourceFromJid(t)
        }), $(document).trigger("app.share.endpoint.left", [Strophe.getResourceFromJid(t)])) : console.log("some one sign out:", Strophe.getResourceFromJid(t)),
        t.indexOf("recorder") > -1 && $(document).trigger("manis.recorder.status.change", [!1, t])
    }),
    $(document).bind("presence.status",
    function(e, t) {
        try {
            var r = {},
            o = {},
            i = $(t),
            s = i.attr("from"),
            a = i.find("configRole").text() || "NONE",
            c = i.find("nick").text() || "",
            d = i.find("audiomuted").text() || !1,
            u = i.find("videomuted").text() || !1,
            l = i.find('stats[xmlns="http://jitsi.org/jitmeet/stats"]'),
            p = i.find('media[xmlns="http://estos.de/ns/mjs"]');
            $.each(l.find("stat"),
            function(e, t) {
                if ("bitrate_download" == $(t).attr("name")) {
                    var n = $(t).attr("value") || "0";
                    o.downloadBitrate = n
                } else if ("bitrate_upload" == $(t).attr("name")) {
                    var r = $(t).attr("value") || "0";
                    o.uploadBitrate = r
                } else if ("packetLoss_download" == $(t).attr("name")) {
                    var i = $(t).attr("value") || "0";
                    o.packageDownloadLost = i
                } else if ("packetLoss_upload" == $(t).attr("name")) {
                    var s = $(t).attr("value") || "0";
                    o.packageUploadLost = s
                }
            }),
            $.each(p.find("source"),
            function(e, t) {
                "audio" == $(t).attr("type") ? r.audioSSRC = $(t).attr("ssrc") : "video" == $(t).attr("type") ? r.videoSSRC = $(t).attr("ssrc") : "screen" == $(t).attr("type") && (r.screenSSRC = $(t).attr("ssrc"))
            });
            var f = {
                from: s,
                nickName: c,
                configRole: a,
                audioMuted: d,
                videoMuted: u,
                status: o,
                resources: r
            };
            $(document).trigger("manis.participant.status.update", [f]),
            n(t, s)
        } catch(e) {
            console.error("on presence.status error", e)
        }
    }),
    $(document).bind("presence.muc",
    function(e, t, r, o) {
        if (Object.keys(ssrc2jid).forEach(function(e) {
            ssrc2jid[e] == t && delete ssrc2jid[e]
        }), n(o, t), window.participants.length > 0) for (var i = 0; i <= window.participants.length; i++) {
            var s = window.participants[i];
            s && s.resource === Strophe.getResourceFromJid(t) && (window.participants[i].nickname = r.displayName, window.participants[i].jid = t)
        }
    }),
    $(document).bind("remotestreamadded.jingle",
    function(e, t, n) {
        i(t, n),
        console.info("wait for pressnce ; data : ", t, " sid : ", n),
        1 == window.sendOnly && $(document).trigger("sendonlydatachannelmsg.on.sourceadd")
    }),
    $(document).bind("sendonlydatachannelmsg.on.sourceadd",
    function(e) {
        o()
    }),
    $(document).bind("callincoming.jingle",
    function(e, t) {
        var n = connection.jingle.sessions[t];
        activecall = n,
        l.startRtpStatsCollector(),
        config.openSctp && d.bindDataChannelListener(n.peerconnection),
        console.log("emuc data for", n.peerjid, connection.emuc.members[n.peerjid]),
        n.usedrip = !0,
        n.sendAnswer(),
        n.accept()
    }),
    $(document).bind("setLocalDescription.jingle",
    function(e, t) {
        var n = connection.jingle.sessions[t],
        r = [],
        o = u.parseMedia(n.peerconnection.localDescription);
        if (o.forEach(function(e) {
            Object.keys(e.sources).length > 0 ? Object.keys(e.sources).forEach(function(t) {
                r.push({
                    ssrc: t,
                    type: e.type,
                    direction: e.direction
                })
            }) : n.localStreamsSSRC && n.localStreamsSSRC[e.type] && r.push({
                ssrc: n.localStreamsSSRC[e.type],
                type: e.type,
                direction: e.direction
            })
        }), console.log("new ssrcs : ", r), connection.emuc.clearPresenceMedia(), r.length > 0) {
            window.localSSRCS.length <= 0 && (window.localSSRCS = r);
            for (var i = 1; i <= r.length; i++) {
                var s = r[i - 1];
                if (s.isOriginalExist = !1, window.localSSRCS.length) for (var a = 0; a < window.localSSRCS.length; a++) {
                    var c = window.localSSRCS[a];
                    c.ssrc == s.ssrc && (s.isOriginalExist = !0, s.type = c.type, "video" == s.type && (window.localStreamSSRC = s.ssrc, $(document).trigger("manis.local.stream.ssrc.update", [s.ssrc, s.type])))
                }
                0 == s.isOriginalExist && isUsingScreenStream && (s.type = "screen"),
                connection.emuc.addMediaToPresence(i, s.type, s.ssrc, s.direction)
            }
            connection.emuc.sendPresence()
        }
        state = !1
    })
},
function(e, exports) {
    var t = function() {
        function e(e, n, r) {
            this.stream = e.stream,
            this.peerjid = e.peerjid,
            this.ssrc = r,
            this.session = connection.jingle.sessions[n],
            this.type = this.stream.getVideoTracks().length > 0 ? t.VIDEO_TYPE: t.AUDIO_TYPE,
            this.muted = !1
        }
        return e
    } ();
    t.VIDEO_TYPE = "Video",
    t.AUDIO_TYPE = "Audio",
    exports = e.exports = t
},
function(e, exports) {
    function t(e) {
        var t = e.channel;
        t.onerror = function(e) {
            console.error("Data Channel Error:", e, t)
        },
        t.onmessage = function(e) {
            if (!config.onStage) {
                var n, r = e.data;
                try {
                    n = JSON.parse(r)
                } catch(e) {
                    console.error("Failed to parse data channel message as JSON: ", r, t)
                }
                if ("undefined" != typeof n && null !== n) {
                    var o = n.colibriClass;
                    if ("DominantSpeakerEndpointChangeEvent" === o) {
                        var i = n.dominantSpeakerEndpoint;
                        console.info("Data channel new dominant speaker event: ", i)
                    } else if ("InLastNChangeEvent" === o) {
                        var s, a = n.oldValue,
                        c = n.newValue;
                        "boolean" != (s = typeof a) && (a = "string" === s ? "true" == a: new Boolean(a).valueOf()),
                        "boolean" != (s = typeof c) && (c = "string" === s ? "true" == c: new Boolean(c).valueOf()),
                        $(document).trigger("inlastnchanged", [a, c])
                    } else if ("LastNEndpointsChangeEvent" === o) {
                        var d = n.lastNEndpoints,
                        u = n.endpointsEnteringLastN,
                        l = n.stream;
                        console.log("Data channel new last-n event: ", d, u, n),
                        $(document).trigger("lastnchanged", [d, u, l])
                    } else "SimulcastLayersChangedEvent" === o ? $(document).trigger("simulcastlayerschanged", [n.endpointSimulcastLayers]) : "SimulcastLayersChangingEvent" === o ? $(document).trigger("simulcastlayerschanging", [n.endpointSimulcastLayers]) : "StartSimulcastLayerEvent" === o ? $(document).trigger("startsimulcastlayer", n.simulcastLayer) : "StopSimulcastLayerEvent" === o ? $(document).trigger("stopsimulcastlayer", n.simulcastLayer) : console.debug("Data channel JSON-formatted message: ", n)
                }
            }
        },
        t.onclose = function() {
            console.info("The Data Channel closed", t);
            var e = _dataChannels.indexOf(t);
            e > -1 && (_dataChannels = _dataChannels.splice(e, 1))
        },
        _dataChannels.push(t)
    }
    exports.bindDataChannelListener = function(e) {
        e.ondatachannel = t
    }
},
function(e, exports, t) { (function(n) {
        function r() {
            var e = [].slice.call(arguments).join(" ");
            throw new Error([e, "we accept pull requests", "http://github.com/dominictarr/crypto-browserify"].join("\n"))
        }
        function o(e, t) {
            for (var n in e) t(e[n], n)
        }
        var i = t(64);
        exports.createHash = t(66),
        exports.createHmac = t(79),
        exports.randomBytes = function(e, t) {
            if (!t || !t.call) return new n(i(e));
            try {
                t.call(this, void 0, new n(i(e)))
            } catch(e) {
                t(e)
            }
        },
        exports.getHashes = function() {
            return ["sha1", "sha256", "sha512", "md5", "rmd160"]
        };
        var s = t(80)(exports);
        exports.pbkdf2 = s.pbkdf2,
        exports.pbkdf2Sync = s.pbkdf2Sync,
        t(82)(exports, e.exports),
        o(["createCredentials", "createSign", "createVerify", "createDiffieHellman"],
        function(e) {
            exports[e] = function() {
                r("sorry,", e, "is not implemented yet")
            }
        })
    }).call(exports, t(60).Buffer)
},
function(e, exports, t) { (function(e) {
        /*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
        "use strict";
        function n() {
            try {
                var e = new Uint8Array(1);
                return e.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42
                    }
                },
                42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
            } catch(e) {
                return ! 1
            }
        }
        function r() {
            return i.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }
        function o(e, t) {
            if (r() < t) throw new RangeError("Invalid typed array length");
            return i.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t), e.__proto__ = i.prototype) : (null === e && (e = new i(t)), e.length = t),
            e
        }
        function i(e, t, n) {
            if (! (i.TYPED_ARRAY_SUPPORT || this instanceof i)) return new i(e, t, n);
            if ("number" == typeof e) {
                if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
                return d(this, e)
            }
            return s(this, e, t, n)
        }
        function s(e, t, n, r) {
            if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? p(e, t, n, r) : "string" == typeof t ? u(e, t, n) : f(e, t)
        }
        function a(e) {
            if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
            if (e < 0) throw new RangeError('"size" argument must not be negative')
        }
        function c(e, t, n, r) {
            return a(t),
            t <= 0 ? o(e, t) : void 0 !== n ? "string" == typeof r ? o(e, t).fill(n, r) : o(e, t).fill(n) : o(e, t)
        }
        function d(e, t) {
            if (a(t), e = o(e, t < 0 ? 0 : 0 | h(t)), !i.TYPED_ARRAY_SUPPORT) for (var n = 0; n < t; ++n) e[n] = 0;
            return e
        }
        function u(e, t, n) {
            if ("string" == typeof n && "" !== n || (n = "utf8"), !i.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
            var r = 0 | g(t, n);
            e = o(e, r);
            var s = e.write(t, n);
            return s !== r && (e = e.slice(0, s)),
            e
        }
        function l(e, t) {
            var n = t.length < 0 ? 0 : 0 | h(t.length);
            e = o(e, n);
            for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
            return e
        }
        function p(e, t, n, r) {
            if (t.byteLength, n < 0 || t.byteLength < n) throw new RangeError("'offset' is out of bounds");
            if (t.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
            return t = void 0 === n && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, n) : new Uint8Array(t, n, r),
            i.TYPED_ARRAY_SUPPORT ? (e = t, e.__proto__ = i.prototype) : e = l(e, t),
            e
        }
        function f(e, t) {
            if (i.isBuffer(t)) {
                var n = 0 | h(t.length);
                return e = o(e, n),
                0 === e.length ? e: (t.copy(e, 0, 0, n), e)
            }
            if (t) {
                if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || Y(t.length) ? o(e, 0) : l(e, t);
                if ("Buffer" === t.type && Z(t.data)) return l(e, t.data)
            }
            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
        }
        function h(e) {
            if (e >= r()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + r().toString(16) + " bytes");
            return 0 | e
        }
        function m(e) {
            return + e != e && (e = 0),
            i.alloc( + e)
        }
        function g(e, t) {
            if (i.isBuffer(e)) return e.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
            "string" != typeof e && (e = "" + e);
            var n = e.length;
            if (0 === n) return 0;
            for (var r = !1;;) switch (t) {
            case "ascii":
            case "latin1":
            case "binary":
                return n;
            case "utf8":
            case "utf-8":
            case void 0:
                return J(e).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return 2 * n;
            case "hex":
                return n >>> 1;
            case "base64":
                return W(e).length;
            default:
                if (r) return J(e).length;
                t = ("" + t).toLowerCase(),
                r = !0
            }
        }
        function _(e, t, n) {
            var r = !1;
            if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
            if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
            if (n >>>= 0, t >>>= 0, n <= t) return "";
            for (e || (e = "utf8");;) switch (e) {
            case "hex":
                return I(this, t, n);
            case "utf8":
            case "utf-8":
                return A(this, t, n);
            case "ascii":
                return E(this, t, n);
            case "latin1":
            case "binary":
                return M(this, t, n);
            case "base64":
                return R(this, t, n);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return P(this, t, n);
            default:
                if (r) throw new TypeError("Unknown encoding: " + e);
                e = (e + "").toLowerCase(),
                r = !0
            }
        }
        function v(e, t, n) {
            var r = e[t];
            e[t] = e[n],
            e[n] = r
        }
        function y(e, t, n, r, o) {
            if (0 === e.length) return - 1;
            if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = o ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {
                if (o) return - 1;
                n = e.length - 1
            } else if (n < 0) {
                if (!o) return - 1;
                n = 0
            }
            if ("string" == typeof t && (t = i.from(t, r)), i.isBuffer(t)) return 0 === t.length ? -1 : w(e, t, n, r, o);
            if ("number" == typeof t) return t &= 255,
            i.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : w(e, [t], n, r, o);
            throw new TypeError("val must be string, number or Buffer")
        }
        function w(e, t, n, r, o) {
            function i(e, t) {
                return 1 === s ? e[t] : e.readUInt16BE(t * s)
            }
            var s = 1,
            a = e.length,
            c = t.length;
            if (void 0 !== r && (r = String(r).toLowerCase(), "ucs2" === r || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                if (e.length < 2 || t.length < 2) return - 1;
                s = 2,
                a /= 2,
                c /= 2,
                n /= 2
            }
            var d;
            if (o) {
                var u = -1;
                for (d = n; d < a; d++) if (i(e, d) === i(t, u === -1 ? 0 : d - u)) {
                    if (u === -1 && (u = d), d - u + 1 === c) return u * s
                } else u !== -1 && (d -= d - u),
                u = -1
            } else for (n + c > a && (n = a - c), d = n; d >= 0; d--) {
                for (var l = !0,
                p = 0; p < c; p++) if (i(e, d + p) !== i(t, p)) {
                    l = !1;
                    break
                }
                if (l) return d
            }
            return - 1
        }
        function b(e, t, n, r) {
            n = Number(n) || 0;
            var o = e.length - n;
            r ? (r = Number(r), r > o && (r = o)) : r = o;
            var i = t.length;
            if (i % 2 !== 0) throw new TypeError("Invalid hex string");
            r > i / 2 && (r = i / 2);
            for (var s = 0; s < r; ++s) {
                var a = parseInt(t.substr(2 * s, 2), 16);
                if (isNaN(a)) return s;
                e[n + s] = a
            }
            return s
        }
        function S(e, t, n, r) {
            return X(J(t, e.length - n), e, n, r)
        }
        function C(e, t, n, r) {
            return X(G(t), e, n, r)
        }
        function x(e, t, n, r) {
            return C(e, t, n, r)
        }
        function T(e, t, n, r) {
            return X(W(t), e, n, r)
        }
        function k(e, t, n, r) {
            return X(z(t, e.length - n), e, n, r)
        }
        function R(e, t, n) {
            return 0 === t && n === e.length ? Q.fromByteArray(e) : Q.fromByteArray(e.slice(t, n))
        }
        function A(e, t, n) {
            n = Math.min(e.length, n);
            for (var r = [], o = t; o < n;) {
                var i = e[o],
                s = null,
                a = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
                if (o + a <= n) {
                    var c, d, u, l;
                    switch (a) {
                    case 1:
                        i < 128 && (s = i);
                        break;
                    case 2:
                        c = e[o + 1],
                        128 === (192 & c) && (l = (31 & i) << 6 | 63 & c, l > 127 && (s = l));
                        break;
                    case 3:
                        c = e[o + 1],
                        d = e[o + 2],
                        128 === (192 & c) && 128 === (192 & d) && (l = (15 & i) << 12 | (63 & c) << 6 | 63 & d, l > 2047 && (l < 55296 || l > 57343) && (s = l));
                        break;
                    case 4:
                        c = e[o + 1],
                        d = e[o + 2],
                        u = e[o + 3],
                        128 === (192 & c) && 128 === (192 & d) && 128 === (192 & u) && (l = (15 & i) << 18 | (63 & c) << 12 | (63 & d) << 6 | 63 & u, l > 65535 && l < 1114112 && (s = l))
                    }
                }
                null === s ? (s = 65533, a = 1) : s > 65535 && (s -= 65536, r.push(s >>> 10 & 1023 | 55296), s = 56320 | 1023 & s),
                r.push(s),
                o += a
            }
            return j(r)
        }
        function j(e) {
            var t = e.length;
            if (t <= ee) return String.fromCharCode.apply(String, e);
            for (var n = "",
            r = 0; r < t;) n += String.fromCharCode.apply(String, e.slice(r, r += ee));
            return n
        }
        function E(e, t, n) {
            var r = "";
            n = Math.min(e.length, n);
            for (var o = t; o < n; ++o) r += String.fromCharCode(127 & e[o]);
            return r
        }
        function M(e, t, n) {
            var r = "";
            n = Math.min(e.length, n);
            for (var o = t; o < n; ++o) r += String.fromCharCode(e[o]);
            return r
        }
        function I(e, t, n) {
            var r = e.length; (!t || t < 0) && (t = 0),
            (!n || n < 0 || n > r) && (n = r);
            for (var o = "",
            i = t; i < n; ++i) o += H(e[i]);
            return o
        }
        function P(e, t, n) {
            for (var r = e.slice(t, n), o = "", i = 0; i < r.length; i += 2) o += String.fromCharCode(r[i] + 256 * r[i + 1]);
            return o
        }
        function O(e, t, n) {
            if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
            if (e + t > n) throw new RangeError("Trying to access beyond buffer length")
        }
        function D(e, t, n, r, o, s) {
            if (!i.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (t > o || t < s) throw new RangeError('"value" argument is out of bounds');
            if (n + r > e.length) throw new RangeError("Index out of range")
        }
        function L(e, t, n, r) {
            t < 0 && (t = 65535 + t + 1);
            for (var o = 0,
            i = Math.min(e.length - n, 2); o < i; ++o) e[n + o] = (t & 255 << 8 * (r ? o: 1 - o)) >>> 8 * (r ? o: 1 - o)
        }
        function N(e, t, n, r) {
            t < 0 && (t = 4294967295 + t + 1);
            for (var o = 0,
            i = Math.min(e.length - n, 4); o < i; ++o) e[n + o] = t >>> 8 * (r ? o: 3 - o) & 255
        }
        function B(e, t, n, r, o, i) {
            if (n + r > e.length) throw new RangeError("Index out of range");
            if (n < 0) throw new RangeError("Index out of range")
        }
        function U(e, t, n, r, o) {
            return o || B(e, t, n, 4, 3.4028234663852886e38, -3.4028234663852886e38),
            K.write(e, t, n, r, 23, 4),
            n + 4
        }
        function F(e, t, n, r, o) {
            return o || B(e, t, n, 8, 1.7976931348623157e308, -1.7976931348623157e308),
            K.write(e, t, n, r, 52, 8),
            n + 8
        }
        function V(e) {
            if (e = q(e).replace(te, ""), e.length < 2) return "";
            for (; e.length % 4 !== 0;) e += "=";
            return e
        }
        function q(e) {
            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
        }
        function H(e) {
            return e < 16 ? "0" + e.toString(16) : e.toString(16)
        }
        function J(e, t) {
            t = t || 1 / 0;
            for (var n, r = e.length,
            o = null,
            i = [], s = 0; s < r; ++s) {
                if (n = e.charCodeAt(s), n > 55295 && n < 57344) {
                    if (!o) {
                        if (n > 56319) { (t -= 3) > -1 && i.push(239, 191, 189);
                            continue
                        }
                        if (s + 1 === r) { (t -= 3) > -1 && i.push(239, 191, 189);
                            continue
                        }
                        o = n;
                        continue
                    }
                    if (n < 56320) { (t -= 3) > -1 && i.push(239, 191, 189),
                        o = n;
                        continue
                    }
                    n = (o - 55296 << 10 | n - 56320) + 65536
                } else o && (t -= 3) > -1 && i.push(239, 191, 189);
                if (o = null, n < 128) {
                    if ((t -= 1) < 0) break;
                    i.push(n)
                } else if (n < 2048) {
                    if ((t -= 2) < 0) break;
                    i.push(n >> 6 | 192, 63 & n | 128)
                } else if (n < 65536) {
                    if ((t -= 3) < 0) break;
                    i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                } else {
                    if (! (n < 1114112)) throw new Error("Invalid code point");
                    if ((t -= 4) < 0) break;
                    i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                }
            }
            return i
        }
        function G(e) {
            for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
            return t
        }
        function z(e, t) {
            for (var n, r, o, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) n = e.charCodeAt(s),
            r = n >> 8,
            o = n % 256,
            i.push(o),
            i.push(r);
            return i
        }
        function W(e) {
            return Q.toByteArray(V(e))
        }
        function X(e, t, n, r) {
            for (var o = 0; o < r && !(o + n >= t.length || o >= e.length); ++o) t[o + n] = e[o];
            return o
        }
        function Y(e) {
            return e !== e
        }
        var Q = t(61),
        K = t(62),
        Z = t(63);
        exports.Buffer = i,
        exports.SlowBuffer = m,
        exports.INSPECT_MAX_BYTES = 50,
        console.log(e)
        i.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT: n(),
        exports.kMaxLength = r(),
        i.poolSize = 8192,
        i._augment = function(e) {
            return e.__proto__ = i.prototype,
            e
        },
        i.from = function(e, t, n) {
            return s(null, e, t, n)
        },
        i.TYPED_ARRAY_SUPPORT && (i.prototype.__proto__ = Uint8Array.prototype, i.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && i[Symbol.species] === i && Object.defineProperty(i, Symbol.species, {
            value: null,
            configurable: !0
        })),
        i.alloc = function(e, t, n) {
            return c(null, e, t, n)
        },
        i.allocUnsafe = function(e) {
            return d(null, e)
        },
        i.allocUnsafeSlow = function(e) {
            return d(null, e)
        },
        i.isBuffer = function(e) {
            return ! (null == e || !e._isBuffer)
        },
        i.compare = function(e, t) {
            if (!i.isBuffer(e) || !i.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
            if (e === t) return 0;
            for (var n = e.length,
            r = t.length,
            o = 0,
            s = Math.min(n, r); o < s; ++o) if (e[o] !== t[o]) {
                n = e[o],
                r = t[o];
                break
            }
            return n < r ? -1 : r < n ? 1 : 0
        },
        i.isEncoding = function(e) {
            switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return ! 0;
            default:
                return ! 1
            }
        },
        i.concat = function(e, t) {
            if (!Z(e)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === e.length) return i.alloc(0);
            var n;
            if (void 0 === t) for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
            var r = i.allocUnsafe(t),
            o = 0;
            for (n = 0; n < e.length; ++n) {
                var s = e[n];
                if (!i.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                s.copy(r, o),
                o += s.length
            }
            return r
        },
        i.byteLength = g,
        i.prototype._isBuffer = !0,
        i.prototype.swap16 = function() {
            var e = this.length;
            if (e % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var t = 0; t < e; t += 2) v(this, t, t + 1);
            return this
        },
        i.prototype.swap32 = function() {
            var e = this.length;
            if (e % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var t = 0; t < e; t += 4) v(this, t, t + 3),
            v(this, t + 1, t + 2);
            return this
        },
        i.prototype.swap64 = function() {
            var e = this.length;
            if (e % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var t = 0; t < e; t += 8) v(this, t, t + 7),
            v(this, t + 1, t + 6),
            v(this, t + 2, t + 5),
            v(this, t + 3, t + 4);
            return this
        },
        i.prototype.toString = function() {
            var e = 0 | this.length;
            return 0 === e ? "": 0 === arguments.length ? A(this, 0, e) : _.apply(this, arguments)
        },
        i.prototype.equals = function(e) {
            if (!i.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
            return this === e || 0 === i.compare(this, e)
        },
        i.prototype.inspect = function() {
            var e = "",
            t = exports.INSPECT_MAX_BYTES;
            return this.length > 0 && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")),
            "<Buffer " + e + ">"
        },
        i.prototype.compare = function(e, t, n, r, o) {
            if (!i.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
            if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length: 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), t < 0 || n > e.length || r < 0 || o > this.length) throw new RangeError("out of range index");
            if (r >= o && t >= n) return 0;
            if (r >= o) return - 1;
            if (t >= n) return 1;
            if (t >>>= 0, n >>>= 0, r >>>= 0, o >>>= 0, this === e) return 0;
            for (var s = o - r,
            a = n - t,
            c = Math.min(s, a), d = this.slice(r, o), u = e.slice(t, n), l = 0; l < c; ++l) if (d[l] !== u[l]) {
                s = d[l],
                a = u[l];
                break
            }
            return s < a ? -1 : a < s ? 1 : 0
        },
        i.prototype.includes = function(e, t, n) {
            return this.indexOf(e, t, n) !== -1
        },
        i.prototype.indexOf = function(e, t, n) {
            return y(this, e, t, n, !0)
        },
        i.prototype.lastIndexOf = function(e, t, n) {
            return y(this, e, t, n, !1)
        },
        i.prototype.write = function(e, t, n, r) {
            if (void 0 === t) r = "utf8",
            n = this.length,
            t = 0;
            else if (void 0 === n && "string" == typeof t) r = t,
            n = this.length,
            t = 0;
            else {
                if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                t |= 0,
                isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
            }
            var o = this.length - t;
            if ((void 0 === n || n > o) && (n = o), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            r || (r = "utf8");
            for (var i = !1;;) switch (r) {
            case "hex":
                return b(this, e, t, n);
            case "utf8":
            case "utf-8":
                return S(this, e, t, n);
            case "ascii":
                return C(this, e, t, n);
            case "latin1":
            case "binary":
                return x(this, e, t, n);
            case "base64":
                return T(this, e, t, n);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return k(this, e, t, n);
            default:
                if (i) throw new TypeError("Unknown encoding: " + r);
                r = ("" + r).toLowerCase(),
                i = !0
            }
        },
        i.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        };
        var ee = 4096;
        i.prototype.slice = function(e, t) {
            var n = this.length;
            e = ~~e,
            t = void 0 === t ? n: ~~t,
            e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n),
            t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n),
            t < e && (t = e);
            var r;
            if (i.TYPED_ARRAY_SUPPORT) r = this.subarray(e, t),
            r.__proto__ = i.prototype;
            else {
                var o = t - e;
                r = new i(o, void 0);
                for (var s = 0; s < o; ++s) r[s] = this[s + e]
            }
            return r
        },
        i.prototype.readUIntLE = function(e, t, n) {
            e |= 0,
            t |= 0,
            n || O(e, t, this.length);
            for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256);) r += this[e + i] * o;
            return r
        },
        i.prototype.readUIntBE = function(e, t, n) {
            e |= 0,
            t |= 0,
            n || O(e, t, this.length);
            for (var r = this[e + --t], o = 1; t > 0 && (o *= 256);) r += this[e + --t] * o;
            return r
        },
        i.prototype.readUInt8 = function(e, t) {
            return t || O(e, 1, this.length),
            this[e]
        },
        i.prototype.readUInt16LE = function(e, t) {
            return t || O(e, 2, this.length),
            this[e] | this[e + 1] << 8
        },
        i.prototype.readUInt16BE = function(e, t) {
            return t || O(e, 2, this.length),
            this[e] << 8 | this[e + 1]
        },
        i.prototype.readUInt32LE = function(e, t) {
            return t || O(e, 4, this.length),
            (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
        },
        i.prototype.readUInt32BE = function(e, t) {
            return t || O(e, 4, this.length),
            16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
        },
        i.prototype.readIntLE = function(e, t, n) {
            e |= 0,
            t |= 0,
            n || O(e, t, this.length);
            for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256);) r += this[e + i] * o;
            return o *= 128,
            r >= o && (r -= Math.pow(2, 8 * t)),
            r
        },
        i.prototype.readIntBE = function(e, t, n) {
            e |= 0,
            t |= 0,
            n || O(e, t, this.length);
            for (var r = t,
            o = 1,
            i = this[e + --r]; r > 0 && (o *= 256);) i += this[e + --r] * o;
            return o *= 128,
            i >= o && (i -= Math.pow(2, 8 * t)),
            i
        },
        i.prototype.readInt8 = function(e, t) {
            return t || O(e, 1, this.length),
            128 & this[e] ? (255 - this[e] + 1) * -1 : this[e]
        },
        i.prototype.readInt16LE = function(e, t) {
            t || O(e, 2, this.length);
            var n = this[e] | this[e + 1] << 8;
            return 32768 & n ? 4294901760 | n: n
        },
        i.prototype.readInt16BE = function(e, t) {
            t || O(e, 2, this.length);
            var n = this[e + 1] | this[e] << 8;
            return 32768 & n ? 4294901760 | n: n
        },
        i.prototype.readInt32LE = function(e, t) {
            return t || O(e, 4, this.length),
            this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
        },
        i.prototype.readInt32BE = function(e, t) {
            return t || O(e, 4, this.length),
            this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
        },
        i.prototype.readFloatLE = function(e, t) {
            return t || O(e, 4, this.length),
            K.read(this, e, !0, 23, 4)
        },
        i.prototype.readFloatBE = function(e, t) {
            return t || O(e, 4, this.length),
            K.read(this, e, !1, 23, 4)
        },
        i.prototype.readDoubleLE = function(e, t) {
            return t || O(e, 8, this.length),
            K.read(this, e, !0, 52, 8)
        },
        i.prototype.readDoubleBE = function(e, t) {
            return t || O(e, 8, this.length),
            K.read(this, e, !1, 52, 8)
        },
        i.prototype.writeUIntLE = function(e, t, n, r) {
            if (e = +e, t |= 0, n |= 0, !r) {
                var o = Math.pow(2, 8 * n) - 1;
                D(this, e, t, n, o, 0)
            }
            var i = 1,
            s = 0;
            for (this[t] = 255 & e; ++s < n && (i *= 256);) this[t + s] = e / i & 255;
            return t + n
        },
        i.prototype.writeUIntBE = function(e, t, n, r) {
            if (e = +e, t |= 0, n |= 0, !r) {
                var o = Math.pow(2, 8 * n) - 1;
                D(this, e, t, n, o, 0)
            }
            var i = n - 1,
            s = 1;
            for (this[t + i] = 255 & e; --i >= 0 && (s *= 256);) this[t + i] = e / s & 255;
            return t + n
        },
        i.prototype.writeUInt8 = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || D(this, e, t, 1, 255, 0),
            i.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
            this[t] = 255 & e,
            t + 1
        },
        i.prototype.writeUInt16LE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || D(this, e, t, 2, 65535, 0),
            i.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : L(this, e, t, !0),
            t + 2
        },
        i.prototype.writeUInt16BE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || D(this, e, t, 2, 65535, 0),
            i.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : L(this, e, t, !1),
            t + 2
        },
        i.prototype.writeUInt32LE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || D(this, e, t, 4, 4294967295, 0),
            i.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : N(this, e, t, !0),
            t + 4
        },
        i.prototype.writeUInt32BE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || D(this, e, t, 4, 4294967295, 0),
            i.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : N(this, e, t, !1),
            t + 4
        },
        i.prototype.writeIntLE = function(e, t, n, r) {
            if (e = +e, t |= 0, !r) {
                var o = Math.pow(2, 8 * n - 1);
                D(this, e, t, n, o - 1, -o)
            }
            var i = 0,
            s = 1,
            a = 0;
            for (this[t] = 255 & e; ++i < n && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + i - 1] && (a = 1),
            this[t + i] = (e / s >> 0) - a & 255;
            return t + n
        },
        i.prototype.writeIntBE = function(e, t, n, r) {
            if (e = +e, t |= 0, !r) {
                var o = Math.pow(2, 8 * n - 1);
                D(this, e, t, n, o - 1, -o)
            }
            var i = n - 1,
            s = 1,
            a = 0;
            for (this[t + i] = 255 & e; --i >= 0 && (s *= 256);) e < 0 && 0 === a && 0 !== this[t + i + 1] && (a = 1),
            this[t + i] = (e / s >> 0) - a & 255;
            return t + n
        },
        i.prototype.writeInt8 = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || D(this, e, t, 1, 127, -128),
            i.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
            e < 0 && (e = 255 + e + 1),
            this[t] = 255 & e,
            t + 1
        },
        i.prototype.writeInt16LE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || D(this, e, t, 2, 32767, -32768),
            i.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : L(this, e, t, !0),
            t + 2
        },
        i.prototype.writeInt16BE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || D(this, e, t, 2, 32767, -32768),
            i.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : L(this, e, t, !1),
            t + 2
        },
        i.prototype.writeInt32LE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || D(this, e, t, 4, 2147483647, -2147483648),
            i.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : N(this, e, t, !0),
            t + 4
        },
        i.prototype.writeInt32BE = function(e, t, n) {
            return e = +e,
            t |= 0,
            n || D(this, e, t, 4, 2147483647, -2147483648),
            e < 0 && (e = 4294967295 + e + 1),
            i.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : N(this, e, t, !1),
            t + 4
        },
        i.prototype.writeFloatLE = function(e, t, n) {
            return U(this, e, t, !0, n)
        },
        i.prototype.writeFloatBE = function(e, t, n) {
            return U(this, e, t, !1, n)
        },
        i.prototype.writeDoubleLE = function(e, t, n) {
            return F(this, e, t, !0, n)
        },
        i.prototype.writeDoubleBE = function(e, t, n) {
            return F(this, e, t, !1, n)
        },
        i.prototype.copy = function(e, t, n, r) {
            if (n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && r < n && (r = n), r === n) return 0;
            if (0 === e.length || 0 === this.length) return 0;
            if (t < 0) throw new RangeError("targetStart out of bounds");
            if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
            if (r < 0) throw new RangeError("sourceEnd out of bounds");
            r > this.length && (r = this.length),
            e.length - t < r - n && (r = e.length - t + n);
            var o, s = r - n;
            if (this === e && n < t && t < r) for (o = s - 1; o >= 0; --o) e[o + t] = this[o + n];
            else if (s < 1e3 || !i.TYPED_ARRAY_SUPPORT) for (o = 0; o < s; ++o) e[o + t] = this[o + n];
            else Uint8Array.prototype.set.call(e, this.subarray(n, n + s), t);
            return s
        },
        i.prototype.fill = function(e, t, n, r) {
            if ("string" == typeof e) {
                if ("string" == typeof t ? (r = t, t = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === e.length) {
                    var o = e.charCodeAt(0);
                    o < 256 && (e = o)
                }
                if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                if ("string" == typeof r && !i.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
            } else "number" == typeof e && (e &= 255);
            if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
            if (n <= t) return this;
            t >>>= 0,
            n = void 0 === n ? this.length: n >>> 0,
            e || (e = 0);
            var s;
            if ("number" == typeof e) for (s = t; s < n; ++s) this[s] = e;
            else {
                var a = i.isBuffer(e) ? e: J(new i(e, r).toString()),
                c = a.length;
                for (s = 0; s < n - t; ++s) this[s + t] = a[s % c]
            }
            return this
        };
        var te = /[^+\/0-9A-Za-z-_]/g
    }).call(exports,
    function() {
        return this
    } ())
},
function(e, exports) {
    "use strict";
    function t(e) {
        var t = e.length;
        if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var n = e.indexOf("=");
        n === -1 && (n = t);
        var r = n === t ? 0 : 4 - n % 4;
        return [n, r]
    }
    function n(e) {
        var n = t(e),
        r = n[0],
        o = n[1];
        return 3 * (r + o) / 4 - o
    }
    function r(e, t, n) {
        return 3 * (t + n) / 4 - n
    }
    function o(e) {
        for (var n, o = t(e), i = o[0], s = o[1], a = new u(r(e, i, s)), c = 0, l = s > 0 ? i - 4 : i, p = 0; p < l; p += 4) n = d[e.charCodeAt(p)] << 18 | d[e.charCodeAt(p + 1)] << 12 | d[e.charCodeAt(p + 2)] << 6 | d[e.charCodeAt(p + 3)],
        a[c++] = n >> 16 & 255,
        a[c++] = n >> 8 & 255,
        a[c++] = 255 & n;
        return 2 === s && (n = d[e.charCodeAt(p)] << 2 | d[e.charCodeAt(p + 1)] >> 4, a[c++] = 255 & n),
        1 === s && (n = d[e.charCodeAt(p)] << 10 | d[e.charCodeAt(p + 1)] << 4 | d[e.charCodeAt(p + 2)] >> 2, a[c++] = n >> 8 & 255, a[c++] = 255 & n),
        a
    }
    function i(e) {
        return c[e >> 18 & 63] + c[e >> 12 & 63] + c[e >> 6 & 63] + c[63 & e]
    }
    function s(e, t, n) {
        for (var r, o = [], s = t; s < n; s += 3) r = (e[s] << 16 & 16711680) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2]),
        o.push(i(r));
        return o.join("")
    }
    function a(e) {
        for (var t, n = e.length,
        r = n % 3,
        o = [], i = 16383, a = 0, d = n - r; a < d; a += i) o.push(s(e, a, a + i > d ? d: a + i));
        return 1 === r ? (t = e[n - 1], o.push(c[t >> 2] + c[t << 4 & 63] + "==")) : 2 === r && (t = (e[n - 2] << 8) + e[n - 1], o.push(c[t >> 10] + c[t >> 4 & 63] + c[t << 2 & 63] + "=")),
        o.join("")
    }
    exports.byteLength = n,
    exports.toByteArray = o,
    exports.fromByteArray = a;
    for (var c = [], d = [], u = "undefined" != typeof Uint8Array ? Uint8Array: Array, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", p = 0, f = l.length; p < f; ++p) c[p] = l[p],
    d[l.charCodeAt(p)] = p;
    d["-".charCodeAt(0)] = 62,
    d["_".charCodeAt(0)] = 63
},
function(e, exports) {
    exports.read = function(e, t, n, r, o) {
        var i, s, a = 8 * o - r - 1,
        c = (1 << a) - 1,
        d = c >> 1,
        u = -7,
        l = n ? o - 1 : 0,
        p = n ? -1 : 1,
        f = e[t + l];
        for (l += p, i = f & (1 << -u) - 1, f >>= -u, u += a; u > 0; i = 256 * i + e[t + l], l += p, u -= 8);
        for (s = i & (1 << -u) - 1, i >>= -u, u += r; u > 0; s = 256 * s + e[t + l], l += p, u -= 8);
        if (0 === i) i = 1 - d;
        else {
            if (i === c) return s ? NaN: (f ? -1 : 1) * (1 / 0);
            s += Math.pow(2, r),
            i -= d
        }
        return (f ? -1 : 1) * s * Math.pow(2, i - r)
    },
    exports.write = function(e, t, n, r, o, i) {
        var s, a, c, d = 8 * i - o - 1,
        u = (1 << d) - 1,
        l = u >> 1,
        p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        f = r ? 0 : i - 1,
        h = r ? 1 : -1,
        m = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
        for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, s = u) : (s = Math.floor(Math.log(t) / Math.LN2), t * (c = Math.pow(2, -s)) < 1 && (s--, c *= 2), t += s + l >= 1 ? p / c: p * Math.pow(2, 1 - l), t * c >= 2 && (s++, c /= 2), s + l >= u ? (a = 0, s = u) : s + l >= 1 ? (a = (t * c - 1) * Math.pow(2, o), s += l) : (a = t * Math.pow(2, l - 1) * Math.pow(2, o), s = 0)); o >= 8; e[n + f] = 255 & a, f += h, a /= 256, o -= 8);
        for (s = s << o | a, d += o; d > 0; e[n + f] = 255 & s, f += h, s /= 256, d -= 8);
        e[n + f - h] |= 128 * m
    }
},
function(e, exports) {
    var t = {}.toString;
    e.exports = Array.isArray ||
    function(e) {
        return "[object Array]" == t.call(e)
    }
},
function(e, exports, t) { (function(n, r) { !
        function() {
            var o = ("undefined" == typeof window ? n: window) || {};
            _crypto = o.crypto || o.msCrypto || t(65),
            e.exports = function(e) {
                if (_crypto.getRandomValues) {
                    var t = new r(e);
                    return _crypto.getRandomValues(t),
                    t
                }
                if (_crypto.randomBytes) return _crypto.randomBytes(e);
                throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")
            }
        } ()
    }).call(exports,
    function() {
        return this
    } (), t(60).Buffer)
},
function(e, exports) {},
function(e, exports, t) { (function(n) {
        function r(e) {
            return function() {
                var t = [],
                r = {
                    update: function(e, r) {
                        return n.isBuffer(e) || (e = new n(e, r)),
                        t.push(e),
                        this
                    },
                    digest: function(r) {
                        var o = n.concat(t),
                        i = e(o);
                        return t = null,
                        r ? i.toString(r) : i
                    }
                };
                return r
            }
        }
        var o = t(67),
        i = r(t(76)),
        s = r(t(78));
        e.exports = function(e) {
            return "md5" === e ? new i: "rmd160" === e ? new s: o(e)
        }
    }).call(exports, t(60).Buffer)
},
function(e, exports, t) {
    var exports = e.exports = function(e) {
        var t = exports[e];
        if (!t) throw new Error(e + " is not supported (we accept pull requests)");
        return new t
    },
    n = t(60).Buffer,
    r = t(68)(n);
    exports.sha1 = t(69)(n, r),
    exports.sha256 = t(74)(n, r),
    exports.sha512 = t(75)(n, r)
},
function(e, exports) {
    e.exports = function(e) {
        function t(t, n) {
            this._block = new e(t),
            this._finalSize = n,
            this._blockSize = t,
            this._len = 0,
            this._s = 0
        }
        return t.prototype.init = function() {
            this._s = 0,
            this._len = 0
        },
        t.prototype.update = function(t, n) {
            "string" == typeof t && (n = n || "utf8", t = new e(t, n));
            for (var r = this._len += t.length,
            o = this._s = this._s || 0,
            i = 0,
            s = this._block; o < r;) {
                for (var a = Math.min(t.length, i + this._blockSize - o % this._blockSize), c = a - i, d = 0; d < c; d++) s[o % this._blockSize + d] = t[d + i];
                o += c,
                i += c,
                o % this._blockSize === 0 && this._update(s)
            }
            return this._s = o,
            this
        },
        t.prototype.digest = function(e) {
            var t = 8 * this._len;
            this._block[this._len % this._blockSize] = 128,
            this._block.fill(0, this._len % this._blockSize + 1),
            t % (8 * this._blockSize) >= 8 * this._finalSize && (this._update(this._block), this._block.fill(0)),
            this._block.writeInt32BE(t, this._blockSize - 4);
            var n = this._update(this._block) || this._hash();
            return e ? n.toString(e) : n
        },
        t.prototype._update = function() {
            throw new Error("_update must be implemented by subclass")
        },
        t
    }
},
function(e, exports, t) {
    var n = t(70).inherits;
    e.exports = function(e, t) {
        function r() {
            return h.length ? h.pop().init() : this instanceof r ? (this._w = f, t.call(this, 64, 56), this._h = null, void this.init()) : new r
        }
        function o(e, t, n, r) {
            return e < 20 ? t & n | ~t & r: e < 40 ? t ^ n ^ r: e < 60 ? t & n | t & r | n & r: t ^ n ^ r
        }
        function i(e) {
            return e < 20 ? 1518500249 : e < 40 ? 1859775393 : e < 60 ? -1894007588 : -899497514
        }
        function s(e, t) {
            return e + t | 0
        }
        function a(e, t) {
            return e << t | e >>> 32 - t
        }
        var c = 0,
        d = 4,
        u = 8,
        l = 12,
        p = 16,
        f = new("undefined" == typeof Int32Array ? Array: Int32Array)(80),
        h = [];
        return n(r, t),
        r.prototype.init = function() {
            return this._a = 1732584193,
            this._b = 4023233417,
            this._c = 2562383102,
            this._d = 271733878,
            this._e = 3285377520,
            t.prototype.init.call(this),
            this
        },
        r.prototype._POOL = h,
        r.prototype._update = function(e) {
            var t, n, r, c, d, u, l, p, f, h;
            t = u = this._a,
            n = l = this._b,
            r = p = this._c,
            c = f = this._d,
            d = h = this._e;
            for (var m = this._w,
            g = 0; g < 80; g++) {
                var _ = m[g] = g < 16 ? e.readInt32BE(4 * g) : a(m[g - 3] ^ m[g - 8] ^ m[g - 14] ^ m[g - 16], 1),
                v = s(s(a(t, 5), o(g, n, r, c)), s(s(d, _), i(g)));
                d = c,
                c = r,
                r = a(n, 30),
                n = t,
                t = v
            }
            this._a = s(t, u),
            this._b = s(n, l),
            this._c = s(r, p),
            this._d = s(c, f),
            this._e = s(d, h)
        },
        r.prototype._hash = function() {
            h.length < 100 && h.push(this);
            var t = new e(20);
            return t.writeInt32BE(0 | this._a, c),
            t.writeInt32BE(0 | this._b, d),
            t.writeInt32BE(0 | this._c, u),
            t.writeInt32BE(0 | this._d, l),
            t.writeInt32BE(0 | this._e, p),
            t
        },
        r
    }
},
function(e, exports, t) { (function(e, n) {
        function r(e, t) {
            var n = {
                seen: [],
                stylize: i
            };
            return arguments.length >= 3 && (n.depth = arguments[2]),
            arguments.length >= 4 && (n.colors = arguments[3]),
            h(t) ? n.showHidden = t: t && exports._extend(n, t),
            w(n.showHidden) && (n.showHidden = !1),
            w(n.depth) && (n.depth = 2),
            w(n.colors) && (n.colors = !1),
            w(n.customInspect) && (n.customInspect = !0),
            n.colors && (n.stylize = o),
            a(n, e, n.depth)
        }
        function o(e, t) {
            var n = r.styles[t];
            return n ? "[" + r.colors[n][0] + "m" + e + "[" + r.colors[n][1] + "m": e
        }
        function i(e, t) {
            return e
        }
        function s(e) {
            var t = {};
            return e.forEach(function(e, n) {
                t[e] = !0
            }),
            t
        }
        function a(e, t, n) {
            if (e.customInspect && t && T(t.inspect) && t.inspect !== exports.inspect && (!t.constructor || t.constructor.prototype !== t)) {
                var r = t.inspect(n, e);
                return v(r) || (r = a(e, r, n)),
                r
            }
            var o = c(e, t);
            if (o) return o;
            var i = Object.keys(t),
            h = s(i);
            if (e.showHidden && (i = Object.getOwnPropertyNames(t)), x(t) && (i.indexOf("message") >= 0 || i.indexOf("description") >= 0)) return d(t);
            if (0 === i.length) {
                if (T(t)) {
                    var m = t.name ? ": " + t.name: "";
                    return e.stylize("[Function" + m + "]", "special")
                }
                if (b(t)) return e.stylize(RegExp.prototype.toString.call(t), "regexp");
                if (C(t)) return e.stylize(Date.prototype.toString.call(t), "date");
                if (x(t)) return d(t)
            }
            var g = "",
            _ = !1,
            y = ["{", "}"];
            if (f(t) && (_ = !0, y = ["[", "]"]), T(t)) {
                var w = t.name ? ": " + t.name: "";
                g = " [Function" + w + "]"
            }
            if (b(t) && (g = " " + RegExp.prototype.toString.call(t)), C(t) && (g = " " + Date.prototype.toUTCString.call(t)), x(t) && (g = " " + d(t)), 0 === i.length && (!_ || 0 == t.length)) return y[0] + g + y[1];
            if (n < 0) return b(t) ? e.stylize(RegExp.prototype.toString.call(t), "regexp") : e.stylize("[Object]", "special");
            e.seen.push(t);
            var S;
            return S = _ ? u(e, t, n, h, i) : i.map(function(r) {
                return l(e, t, n, h, r, _)
            }),
            e.seen.pop(),
            p(S, g, y)
        }
        function c(e, t) {
            if (w(t)) return e.stylize("undefined", "undefined");
            if (v(t)) {
                var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                return e.stylize(n, "string")
            }
            return _(t) ? e.stylize("" + t, "number") : h(t) ? e.stylize("" + t, "boolean") : m(t) ? e.stylize("null", "null") : void 0
        }
        function d(e) {
            return "[" + Error.prototype.toString.call(e) + "]"
        }
        function u(e, t, n, r, o) {
            for (var i = [], s = 0, a = t.length; s < a; ++s) E(t, String(s)) ? i.push(l(e, t, n, r, String(s), !0)) : i.push("");
            return o.forEach(function(o) {
                o.match(/^\d+$/) || i.push(l(e, t, n, r, o, !0))
            }),
            i
        }
        function l(e, t, n, r, o, i) {
            var s, c, d;
            if (d = Object.getOwnPropertyDescriptor(t, o) || {
                value: t[o]
            },
            d.get ? c = d.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : d.set && (c = e.stylize("[Setter]", "special")), E(r, o) || (s = "[" + o + "]"), c || (e.seen.indexOf(d.value) < 0 ? (c = m(n) ? a(e, d.value, null) : a(e, d.value, n - 1), c.indexOf("\n") > -1 && (c = i ? c.split("\n").map(function(e) {
                return "  " + e
            }).join("\n").substr(2) : "\n" + c.split("\n").map(function(e) {
                return "   " + e
            }).join("\n"))) : c = e.stylize("[Circular]", "special")), w(s)) {
                if (i && o.match(/^\d+$/)) return c;
                s = JSON.stringify("" + o),
                s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2), s = e.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), s = e.stylize(s, "string"))
            }
            return s + ": " + c
        }
        function p(e, t, n) {
            var r = 0,
            o = e.reduce(function(e, t) {
                return r++,
                t.indexOf("\n") >= 0 && r++,
                e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
            },
            0);
            return o > 60 ? n[0] + ("" === t ? "": t + "\n ") + " " + e.join(",\n  ") + " " + n[1] : n[0] + t + " " + e.join(", ") + " " + n[1]
        }
        function f(e) {
            return Array.isArray(e)
        }
        function h(e) {
            return "boolean" == typeof e
        }
        function m(e) {
            return null === e
        }
        function g(e) {
            return null == e
        }
        function _(e) {
            return "number" == typeof e
        }
        function v(e) {
            return "string" == typeof e
        }
        function y(e) {
            return "symbol" == typeof e
        }
        function w(e) {
            return void 0 === e
        }
        function b(e) {
            return S(e) && "[object RegExp]" === R(e)
        }
        function S(e) {
            return "object" == typeof e && null !== e
        }
        function C(e) {
            return S(e) && "[object Date]" === R(e)
        }
        function x(e) {
            return S(e) && ("[object Error]" === R(e) || e instanceof Error)
        }
        function T(e) {
            return "function" == typeof e
        }
        function k(e) {
            return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e
        }
        function R(e) {
            return Object.prototype.toString.call(e)
        }
        function A(e) {
            return e < 10 ? "0" + e.toString(10) : e.toString(10)
        }
        function j() {
            var e = new Date,
            t = [A(e.getHours()), A(e.getMinutes()), A(e.getSeconds())].join(":");
            return [e.getDate(), O[e.getMonth()], t].join(" ")
        }
        function E(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        var M = /%[sdj%]/g;
        exports.format = function(e) {
            if (!v(e)) {
                for (var t = [], n = 0; n < arguments.length; n++) t.push(r(arguments[n]));
                return t.join(" ")
            }
            for (var n = 1,
            o = arguments,
            i = o.length,
            s = String(e).replace(M,
            function(e) {
                if ("%%" === e) return "%";
                if (n >= i) return e;
                switch (e) {
                case "%s":
                    return String(o[n++]);
                case "%d":
                    return Number(o[n++]);
                case "%j":
                    try {
                        return JSON.stringify(o[n++])
                    } catch(e) {
                        return "[Circular]"
                    }
                default:
                    return e
                }
            }), a = o[n]; n < i; a = o[++n]) s += m(a) || !S(a) ? " " + a: " " + r(a);
            return s
        },
        exports.deprecate = function(t, r) {
            function o() {
                if (!i) {
                    if (n.throwDeprecation) throw new Error(r);
                    n.traceDeprecation ? console.trace(r) : console.error(r),
                    i = !0
                }
                return t.apply(this, arguments)
            }
            if (w(e.process)) return function() {
                return exports.deprecate(t, r).apply(this, arguments)
            };
            if (n.noDeprecation === !0) return t;
            var i = !1;
            return o
        };
        var I, P = {};
        exports.debuglog = function(e) {
            if (w(I) && (I = n.env.NODE_DEBUG || ""), e = e.toUpperCase(), !P[e]) if (new RegExp("\\b" + e + "\\b", "i").test(I)) {
                var t = n.pid;
                P[e] = function() {
                    var n = exports.format.apply(exports, arguments);
                    console.error("%s %d: %s", e, t, n)
                }
            } else P[e] = function() {};
            return P[e]
        },
        exports.inspect = r,
        r.colors = {
            bold: [1, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            white: [37, 39],
            grey: [90, 39],
            black: [30, 39],
            blue: [34, 39],
            cyan: [36, 39],
            green: [32, 39],
            magenta: [35, 39],
            red: [31, 39],
            yellow: [33, 39]
        },
        r.styles = {
            special: "cyan",
            number: "yellow",
            boolean: "yellow",
            undefined: "grey",
            null: "bold",
            string: "green",
            date: "magenta",
            regexp: "red"
        },
        exports.isArray = f,
        exports.isBoolean = h,
        exports.isNull = m,
        exports.isNullOrUndefined = g,
        exports.isNumber = _,
        exports.isString = v,
        exports.isSymbol = y,
        exports.isUndefined = w,
        exports.isRegExp = b,
        exports.isObject = S,
        exports.isDate = C,
        exports.isError = x,
        exports.isFunction = T,
        exports.isPrimitive = k,
        exports.isBuffer = t(72);
        var O = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        exports.log = function() {
            console.log("%s - %s", j(), exports.format.apply(exports, arguments))
        },
        exports.inherits = t(73),
        exports._extend = function(e, t) {
            if (!t || !S(t)) return e;
            for (var n = Object.keys(t), r = n.length; r--;) e[n[r]] = t[n[r]];
            return e
        }
    }).call(exports,
    function() {
        return this
    } (), t(71))
},
function(e, exports) {
    function t() {
        throw new Error("setTimeout has not been defined")
    }
    function n() {
        throw new Error("clearTimeout has not been defined")
    }
    function r(e) {
        if (d === setTimeout) return setTimeout(e, 0);
        if ((d === t || !d) && setTimeout) return d = setTimeout,
        setTimeout(e, 0);
        try {
            return d(e, 0)
        } catch(t) {
            try {
                return d.call(null, e, 0)
            } catch(t) {
                return d.call(this, e, 0)
            }
        }
    }
    function o(e) {
        if (u === clearTimeout) return clearTimeout(e);
        if ((u === n || !u) && clearTimeout) return u = clearTimeout,
        clearTimeout(e);
        try {
            return u(e)
        } catch(t) {
            try {
                return u.call(null, e)
            } catch(t) {
                return u.call(this, e)
            }
        }
    }
    function i() {
        h && p && (h = !1, p.length ? f = p.concat(f) : m = -1, f.length && s())
    }
    function s() {
        if (!h) {
            var e = r(i);
            h = !0;
            for (var t = f.length; t;) {
                for (p = f, f = []; ++m < t;) p && p[m].run();
                m = -1,
                t = f.length
            }
            p = null,
            h = !1,
            o(e)
        }
    }
    function a(e, t) {
        this.fun = e,
        this.array = t
    }
    function c() {}
    var d, u, l = e.exports = {}; !
    function() {
        try {
            d = "function" == typeof setTimeout ? setTimeout: t
        } catch(e) {
            d = t
        }
        try {
            u = "function" == typeof clearTimeout ? clearTimeout: n
        } catch(e) {
            u = n
        }
    } ();
    var p, f = [],
    h = !1,
    m = -1;
    l.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        f.push(new a(e, t)),
        1 !== f.length || h || r(s)
    },
    a.prototype.run = function() {
        this.fun.apply(null, this.array)
    },
    l.title = "browser",
    l.browser = !0,
    l.env = {},
    l.argv = [],
    l.version = "",
    l.versions = {},
    l.on = c,
    l.addListener = c,
    l.once = c,
    l.off = c,
    l.removeListener = c,
    l.removeAllListeners = c,
    l.emit = c,
    l.prependListener = c,
    l.prependOnceListener = c,
    l.listeners = function(e) {
        return []
    },
    l.binding = function(e) {
        throw new Error("process.binding is not supported")
    },
    l.cwd = function() {
        return "/"
    },
    l.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    },
    l.umask = function() {
        return 0
    }
},
function(e, exports) {
    e.exports = function(e) {
        return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8
    }
},
function(e, exports) {
    "function" == typeof Object.create ? e.exports = function(e, t) {
        e.super_ = t,
        e.prototype = Object.create(t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        })
    }: e.exports = function(e, t) {
        e.super_ = t;
        var n = function() {};
        n.prototype = t.prototype,
        e.prototype = new n,
        e.prototype.constructor = e
    }
},
function(e, exports, t) {
    var n = t(70).inherits;
    e.exports = function(e, t) {
        function r() {
            this.init(),
            this._w = f,
            t.call(this, 64, 56)
        }
        function o(e, t) {
            return e >>> t | e << 32 - t
        }
        function i(e, t) {
            return e >>> t
        }
        function s(e, t, n) {
            return e & t ^ ~e & n
        }
        function a(e, t, n) {
            return e & t ^ e & n ^ t & n
        }
        function c(e) {
            return o(e, 2) ^ o(e, 13) ^ o(e, 22)
        }
        function d(e) {
            return o(e, 6) ^ o(e, 11) ^ o(e, 25)
        }
        function u(e) {
            return o(e, 7) ^ o(e, 18) ^ i(e, 3)
        }
        function l(e) {
            return o(e, 17) ^ o(e, 19) ^ i(e, 10)
        }
        var p = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
        f = new Array(64);
        return n(r, t),
        r.prototype.init = function() {
            return this._a = 1779033703,
            this._b = -1150833019,
            this._c = 1013904242,
            this._d = -1521486534,
            this._e = 1359893119,
            this._f = -1694144372,
            this._g = 528734635,
            this._h = 1541459225,
            this._len = this._s = 0,
            this
        },
        r.prototype._update = function(e) {
            var t, n, r, o, i, f, h, m, g, _, v = this._w;
            t = 0 | this._a,
            n = 0 | this._b,
            r = 0 | this._c,
            o = 0 | this._d,
            i = 0 | this._e,
            f = 0 | this._f,
            h = 0 | this._g,
            m = 0 | this._h;
            for (var y = 0; y < 64; y++) {
                var w = v[y] = y < 16 ? e.readInt32BE(4 * y) : l(v[y - 2]) + v[y - 7] + u(v[y - 15]) + v[y - 16];
                g = m + d(i) + s(i, f, h) + p[y] + w,
                _ = c(t) + a(t, n, r),
                m = h,
                h = f,
                f = i,
                i = o + g,
                o = r,
                r = n,
                n = t,
                t = g + _
            }
            this._a = t + this._a | 0,
            this._b = n + this._b | 0,
            this._c = r + this._c | 0,
            this._d = o + this._d | 0,
            this._e = i + this._e | 0,
            this._f = f + this._f | 0,
            this._g = h + this._g | 0,
            this._h = m + this._h | 0
        },
        r.prototype._hash = function() {
            var t = new e(32);
            return t.writeInt32BE(this._a, 0),
            t.writeInt32BE(this._b, 4),
            t.writeInt32BE(this._c, 8),
            t.writeInt32BE(this._d, 12),
            t.writeInt32BE(this._e, 16),
            t.writeInt32BE(this._f, 20),
            t.writeInt32BE(this._g, 24),
            t.writeInt32BE(this._h, 28),
            t
        },
        r
    }
},
function(e, exports, t) {
    var n = t(70).inherits;
    e.exports = function(e, t) {
        function r() {
            this.init(),
            this._w = c,
            t.call(this, 128, 112)
        }
        function o(e, t, n) {
            return e >>> n | t << 32 - n
        }
        function i(e, t, n) {
            return e & t ^ ~e & n
        }
        function s(e, t, n) {
            return e & t ^ e & n ^ t & n
        }
        var a = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591],
        c = new Array(160);
        return n(r, t),
        r.prototype.init = function() {
            return this._a = 1779033703,
            this._b = -1150833019,
            this._c = 1013904242,
            this._d = -1521486534,
            this._e = 1359893119,
            this._f = -1694144372,
            this._g = 528734635,
            this._h = 1541459225,
            this._al = -205731576,
            this._bl = -2067093701,
            this._cl = -23791573,
            this._dl = 1595750129,
            this._el = -1377402159,
            this._fl = 725511199,
            this._gl = -79577749,
            this._hl = 327033209,
            this._len = this._s = 0,
            this
        },
        r.prototype._update = function(e) {
            var t, n, r, c, d, u, l, p, f, h, m, g, _, v, y, w, b = this._w;
            t = 0 | this._a,
            n = 0 | this._b,
            r = 0 | this._c,
            c = 0 | this._d,
            d = 0 | this._e,
            u = 0 | this._f,
            l = 0 | this._g,
            p = 0 | this._h,
            f = 0 | this._al,
            h = 0 | this._bl,
            m = 0 | this._cl,
            g = 0 | this._dl,
            _ = 0 | this._el,
            v = 0 | this._fl,
            y = 0 | this._gl,
            w = 0 | this._hl;
            for (var S = 0; S < 80; S++) {
                var C, x, T = 2 * S;
                if (S < 16) C = b[T] = e.readInt32BE(4 * T),
                x = b[T + 1] = e.readInt32BE(4 * T + 4);
                else {
                    var k = b[T - 30],
                    R = b[T - 30 + 1],
                    A = o(k, R, 1) ^ o(k, R, 8) ^ k >>> 7,
                    j = o(R, k, 1) ^ o(R, k, 8) ^ o(R, k, 7);
                    k = b[T - 4],
                    R = b[T - 4 + 1];
                    var E = o(k, R, 19) ^ o(R, k, 29) ^ k >>> 6,
                    M = o(R, k, 19) ^ o(k, R, 29) ^ o(R, k, 6),
                    I = b[T - 14],
                    P = b[T - 14 + 1],
                    O = b[T - 32],
                    D = b[T - 32 + 1];
                    x = j + P,
                    C = A + I + (x >>> 0 < j >>> 0 ? 1 : 0),
                    x += M,
                    C = C + E + (x >>> 0 < M >>> 0 ? 1 : 0),
                    x += D,
                    C = C + O + (x >>> 0 < D >>> 0 ? 1 : 0),
                    b[T] = C,
                    b[T + 1] = x
                }
                var L = s(t, n, r),
                N = s(f, h, m),
                B = o(t, f, 28) ^ o(f, t, 2) ^ o(f, t, 7),
                U = o(f, t, 28) ^ o(t, f, 2) ^ o(t, f, 7),
                F = o(d, _, 14) ^ o(d, _, 18) ^ o(_, d, 9),
                V = o(_, d, 14) ^ o(_, d, 18) ^ o(d, _, 9),
                q = a[T],
                H = a[T + 1],
                J = i(d, u, l),
                G = i(_, v, y),
                z = w + V,
                W = p + F + (z >>> 0 < w >>> 0 ? 1 : 0);
                z += G,
                W = W + J + (z >>> 0 < G >>> 0 ? 1 : 0),
                z += H,
                W = W + q + (z >>> 0 < H >>> 0 ? 1 : 0),
                z += x,
                W = W + C + (z >>> 0 < x >>> 0 ? 1 : 0);
                var X = U + N,
                Y = B + L + (X >>> 0 < U >>> 0 ? 1 : 0);
                p = l,
                w = y,
                l = u,
                y = v,
                u = d,
                v = _,
                _ = g + z | 0,
                d = c + W + (_ >>> 0 < g >>> 0 ? 1 : 0) | 0,
                c = r,
                g = m,
                r = n,
                m = h,
                n = t,
                h = f,
                f = z + X | 0,
                t = W + Y + (f >>> 0 < z >>> 0 ? 1 : 0) | 0
            }
            this._al = this._al + f | 0,
            this._bl = this._bl + h | 0,
            this._cl = this._cl + m | 0,
            this._dl = this._dl + g | 0,
            this._el = this._el + _ | 0,
            this._fl = this._fl + v | 0,
            this._gl = this._gl + y | 0,
            this._hl = this._hl + w | 0,
            this._a = this._a + t + (this._al >>> 0 < f >>> 0 ? 1 : 0) | 0,
            this._b = this._b + n + (this._bl >>> 0 < h >>> 0 ? 1 : 0) | 0,
            this._c = this._c + r + (this._cl >>> 0 < m >>> 0 ? 1 : 0) | 0,
            this._d = this._d + c + (this._dl >>> 0 < g >>> 0 ? 1 : 0) | 0,
            this._e = this._e + d + (this._el >>> 0 < _ >>> 0 ? 1 : 0) | 0,
            this._f = this._f + u + (this._fl >>> 0 < v >>> 0 ? 1 : 0) | 0,
            this._g = this._g + l + (this._gl >>> 0 < y >>> 0 ? 1 : 0) | 0,
            this._h = this._h + p + (this._hl >>> 0 < w >>> 0 ? 1 : 0) | 0
        },
        r.prototype._hash = function() {
            function t(e, t, r) {
                n.writeInt32BE(e, r),
                n.writeInt32BE(t, r + 4)
            }
            var n = new e(64);
            return t(this._a, this._al, 0),
            t(this._b, this._bl, 8),
            t(this._c, this._cl, 16),
            t(this._d, this._dl, 24),
            t(this._e, this._el, 32),
            t(this._f, this._fl, 40),
            t(this._g, this._gl, 48),
            t(this._h, this._hl, 56),
            n
        },
        r
    }
},
function(e, exports, t) {
    function n(e, t) {
        e[t >> 5] |= 128 << t % 32,
        e[(t + 64 >>> 9 << 4) + 14] = t;
        for (var n = 1732584193,
        r = -271733879,
        d = -1732584194,
        u = 271733878,
        l = 0; l < e.length; l += 16) {
            var p = n,
            f = r,
            h = d,
            m = u;
            n = o(n, r, d, u, e[l + 0], 7, -680876936),
            u = o(u, n, r, d, e[l + 1], 12, -389564586),
            d = o(d, u, n, r, e[l + 2], 17, 606105819),
            r = o(r, d, u, n, e[l + 3], 22, -1044525330),
            n = o(n, r, d, u, e[l + 4], 7, -176418897),
            u = o(u, n, r, d, e[l + 5], 12, 1200080426),
            d = o(d, u, n, r, e[l + 6], 17, -1473231341),
            r = o(r, d, u, n, e[l + 7], 22, -45705983),
            n = o(n, r, d, u, e[l + 8], 7, 1770035416),
            u = o(u, n, r, d, e[l + 9], 12, -1958414417),
            d = o(d, u, n, r, e[l + 10], 17, -42063),
            r = o(r, d, u, n, e[l + 11], 22, -1990404162),
            n = o(n, r, d, u, e[l + 12], 7, 1804603682),
            u = o(u, n, r, d, e[l + 13], 12, -40341101),
            d = o(d, u, n, r, e[l + 14], 17, -1502002290),
            r = o(r, d, u, n, e[l + 15], 22, 1236535329),
            n = i(n, r, d, u, e[l + 1], 5, -165796510),
            u = i(u, n, r, d, e[l + 6], 9, -1069501632),
            d = i(d, u, n, r, e[l + 11], 14, 643717713),
            r = i(r, d, u, n, e[l + 0], 20, -373897302),
            n = i(n, r, d, u, e[l + 5], 5, -701558691),
            u = i(u, n, r, d, e[l + 10], 9, 38016083),
            d = i(d, u, n, r, e[l + 15], 14, -660478335),
            r = i(r, d, u, n, e[l + 4], 20, -405537848),
            n = i(n, r, d, u, e[l + 9], 5, 568446438),
            u = i(u, n, r, d, e[l + 14], 9, -1019803690),
            d = i(d, u, n, r, e[l + 3], 14, -187363961),
            r = i(r, d, u, n, e[l + 8], 20, 1163531501),
            n = i(n, r, d, u, e[l + 13], 5, -1444681467),
            u = i(u, n, r, d, e[l + 2], 9, -51403784),
            d = i(d, u, n, r, e[l + 7], 14, 1735328473),
            r = i(r, d, u, n, e[l + 12], 20, -1926607734),
            n = s(n, r, d, u, e[l + 5], 4, -378558),
            u = s(u, n, r, d, e[l + 8], 11, -2022574463),
            d = s(d, u, n, r, e[l + 11], 16, 1839030562),
            r = s(r, d, u, n, e[l + 14], 23, -35309556),
            n = s(n, r, d, u, e[l + 1], 4, -1530992060),
            u = s(u, n, r, d, e[l + 4], 11, 1272893353),
            d = s(d, u, n, r, e[l + 7], 16, -155497632),
            r = s(r, d, u, n, e[l + 10], 23, -1094730640),
            n = s(n, r, d, u, e[l + 13], 4, 681279174),
            u = s(u, n, r, d, e[l + 0], 11, -358537222),
            d = s(d, u, n, r, e[l + 3], 16, -722521979),
            r = s(r, d, u, n, e[l + 6], 23, 76029189),
            n = s(n, r, d, u, e[l + 9], 4, -640364487),
            u = s(u, n, r, d, e[l + 12], 11, -421815835),
            d = s(d, u, n, r, e[l + 15], 16, 530742520),
            r = s(r, d, u, n, e[l + 2], 23, -995338651),
            n = a(n, r, d, u, e[l + 0], 6, -198630844),
            u = a(u, n, r, d, e[l + 7], 10, 1126891415),
            d = a(d, u, n, r, e[l + 14], 15, -1416354905),
            r = a(r, d, u, n, e[l + 5], 21, -57434055),
            n = a(n, r, d, u, e[l + 12], 6, 1700485571),
            u = a(u, n, r, d, e[l + 3], 10, -1894986606),
            d = a(d, u, n, r, e[l + 10], 15, -1051523),
            r = a(r, d, u, n, e[l + 1], 21, -2054922799),
            n = a(n, r, d, u, e[l + 8], 6, 1873313359),
            u = a(u, n, r, d, e[l + 15], 10, -30611744),
            d = a(d, u, n, r, e[l + 6], 15, -1560198380),
            r = a(r, d, u, n, e[l + 13], 21, 1309151649),
            n = a(n, r, d, u, e[l + 4], 6, -145523070),
            u = a(u, n, r, d, e[l + 11], 10, -1120210379),
            d = a(d, u, n, r, e[l + 2], 15, 718787259),
            r = a(r, d, u, n, e[l + 9], 21, -343485551),
            n = c(n, p),
            r = c(r, f),
            d = c(d, h),
            u = c(u, m)
        }
        return Array(n, r, d, u)
    }
    function r(e, t, n, r, o, i) {
        return c(d(c(c(t, e), c(r, i)), o), n)
    }
    function o(e, t, n, o, i, s, a) {
        return r(t & n | ~t & o, e, t, i, s, a)
    }
    function i(e, t, n, o, i, s, a) {
        return r(t & o | n & ~o, e, t, i, s, a)
    }
    function s(e, t, n, o, i, s, a) {
        return r(t ^ n ^ o, e, t, i, s, a)
    }
    function a(e, t, n, o, i, s, a) {
        return r(n ^ (t | ~o), e, t, i, s, a)
    }
    function c(e, t) {
        var n = (65535 & e) + (65535 & t),
        r = (e >> 16) + (t >> 16) + (n >> 16);
        return r << 16 | 65535 & n
    }
    function d(e, t) {
        return e << t | e >>> 32 - t
    }
    var u = t(77);
    e.exports = function(e) {
        return u.hash(e, n, 16)
    }
},
function(e, exports, t) { (function(t) {
        function n(e, n) {
            if (e.length % i !== 0) {
                var r = e.length + (i - e.length % i);
                e = t.concat([e, s], r)
            }
            for (var o = [], a = n ? e.readInt32BE: e.readInt32LE, c = 0; c < e.length; c += i) o.push(a.call(e, c));
            return o
        }
        function r(e, n, r) {
            for (var o = new t(n), i = r ? o.writeInt32BE: o.writeInt32LE, s = 0; s < e.length; s++) i.call(o, e[s], 4 * s, !0);
            return o
        }
        function o(e, o, i, s) {
            t.isBuffer(e) || (e = new t(e));
            var c = o(n(e, s), e.length * a);
            return r(c, i, s)
        }
        var i = 4,
        s = new t(i);
        s.fill(0);
        var a = 8;
        e.exports = {
            hash: o
        }
    }).call(exports, t(60).Buffer)
},
function(e, exports, t) { (function(t) {
        function n(e, t, n) {
            return e ^ t ^ n
        }
        function r(e, t, n) {
            return e & t | ~e & n
        }
        function o(e, t, n) {
            return (e | ~t) ^ n
        }
        function i(e, t, n) {
            return e & n | t & ~n
        }
        function s(e, t, n) {
            return e ^ (t | ~n)
        }
        function a(e, t) {
            return e << t | e >>> 32 - t
        }
        function c(e) {
            var n = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
            "string" == typeof e && (e = new t(e, "utf8"));
            var r = m(e),
            o = 8 * e.length,
            i = 8 * e.length;
            r[o >>> 5] |= 128 << 24 - o % 32,
            r[(o + 64 >>> 9 << 4) + 14] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8);
            for (var s = 0; s < r.length; s += 16) _(n, r, s);
            for (var s = 0; s < 5; s++) {
                var a = n[s];
                n[s] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8)
            }
            var c = g(n);
            return new t(c)
        }
        e.exports = c;
        /** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	
	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
        var d = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
        u = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
        l = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
        p = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11],
        f = [0, 1518500249, 1859775393, 2400959708, 2840853838],
        h = [1352829926, 1548603684, 1836072691, 2053994217, 0],
        m = function(e) {
            for (var t = [], n = 0, r = 0; n < e.length; n++, r += 8) t[r >>> 5] |= e[n] << 24 - r % 32;
            return t
        },
        g = function(e) {
            for (var t = [], n = 0; n < 32 * e.length; n += 8) t.push(e[n >>> 5] >>> 24 - n % 32 & 255);
            return t
        },
        _ = function(e, t, c) {
            for (var m = 0; m < 16; m++) {
                var g = c + m,
                _ = t[g];
                t[g] = 16711935 & (_ << 8 | _ >>> 24) | 4278255360 & (_ << 24 | _ >>> 8)
            }
            var v, y, w, b, S, C, x, T, k, R;
            C = v = e[0],
            x = y = e[1],
            T = w = e[2],
            k = b = e[3],
            R = S = e[4];
            for (var A, m = 0; m < 80; m += 1) A = v + t[c + d[m]] | 0,
            A += m < 16 ? n(y, w, b) + f[0] : m < 32 ? r(y, w, b) + f[1] : m < 48 ? o(y, w, b) + f[2] : m < 64 ? i(y, w, b) + f[3] : s(y, w, b) + f[4],
            A |= 0,
            A = a(A, l[m]),
            A = A + S | 0,
            v = S,
            S = b,
            b = a(w, 10),
            w = y,
            y = A,
            A = C + t[c + u[m]] | 0,
            A += m < 16 ? s(x, T, k) + h[0] : m < 32 ? i(x, T, k) + h[1] : m < 48 ? o(x, T, k) + h[2] : m < 64 ? r(x, T, k) + h[3] : n(x, T, k) + h[4],
            A |= 0,
            A = a(A, p[m]),
            A = A + R | 0,
            C = R,
            R = k,
            k = a(T, 10),
            T = x,
            x = A;
            A = e[1] + w + k | 0,
            e[1] = e[2] + b + R | 0,
            e[2] = e[3] + S + C | 0,
            e[3] = e[4] + v + x | 0,
            e[4] = e[0] + y + T | 0,
            e[0] = A
        }
    }).call(exports, t(60).Buffer)
},
function(e, exports, t) { (function(n) {
        function r(e, t) {
            if (! (this instanceof r)) return new r(e, t);
            this._opad = c,
            this._alg = e;
            var s = "sha512" === e ? 128 : 64;
            t = this._key = n.isBuffer(t) ? t: new n(t),
            t.length > s ? t = o(e).update(t).digest() : t.length < s && (t = n.concat([t, i], s));
            for (var a = this._ipad = new n(s), c = this._opad = new n(s), d = 0; d < s; d++) a[d] = 54 ^ t[d],
            c[d] = 92 ^ t[d];
            this._hash = o(e).update(a)
        }
        var o = t(66),
        i = new n(128);
        i.fill(0),
        e.exports = r,
        r.prototype.update = function(e, t) {
            return this._hash.update(e, t),
            this
        },
        r.prototype.digest = function(e) {
            var t = this._hash.digest();
            return o(this._alg).update(this._opad).update(t).digest(e)
        }
    }).call(exports, t(60).Buffer)
},
function(e, exports, t) {
    var n = t(81);
    e.exports = function(e, exports) {
        exports = exports || {};
        var t = n(e);
        return exports.pbkdf2 = t.pbkdf2,
        exports.pbkdf2Sync = t.pbkdf2Sync,
        exports
    }
},
function(e, exports, t) { (function(t) {
        e.exports = function(e) {
            function n(e, t, n, o, i, s) {
                if ("function" == typeof i && (s = i, i = void 0), "function" != typeof s) throw new Error("No callback provided to pbkdf2");
                setTimeout(function() {
                    var a;
                    try {
                        a = r(e, t, n, o, i)
                    } catch(e) {
                        return s(e)
                    }
                    s(void 0, a)
                })
            }
            function r(n, r, o, i, s) {
                if ("number" != typeof o) throw new TypeError("Iterations not a number");
                if (o < 0) throw new TypeError("Bad iterations");
                if ("number" != typeof i) throw new TypeError("Key length not a number");
                if (i < 0) throw new TypeError("Bad key length");
                s = s || "sha1",
                t.isBuffer(n) || (n = new t(n)),
                t.isBuffer(r) || (r = new t(r));
                var a, c, d, u = 1,
                l = new t(i),
                p = new t(r.length + 4);
                r.copy(p, 0, 0, r.length);
                for (var f = 1; f <= u; f++) {
                    p.writeUInt32BE(f, r.length);
                    var h = e.createHmac(s, n).update(p).digest();
                    if (!a && (a = h.length, d = new t(a), u = Math.ceil(i / a), c = i - (u - 1) * a, i > (Math.pow(2, 32) - 1) * a)) throw new TypeError("keylen exceeds maximum length");
                    h.copy(d, 0, 0, a);
                    for (var m = 1; m < o; m++) {
                        h = e.createHmac(s, n).update(h).digest();
                        for (var g = 0; g < a; g++) d[g] ^= h[g]
                    }
                    var _ = (f - 1) * a,
                    v = f == u ? c: a;
                    d.copy(l, _, 0, v)
                }
                return l
            }
            return {
                pbkdf2: n,
                pbkdf2Sync: r
            }
        }
    }).call(exports, t(60).Buffer)
},
function(e, exports, t) {
    e.exports = function(e, exports) {
        function n() {
            return Object.keys(i)
        }
        exports = exports || {};
        var r = t(83)(e);
        exports.createCipher = r.createCipher,
        exports.createCipheriv = r.createCipheriv;
        var o = t(121)(e);
        exports.createDecipher = o.createDecipher,
        exports.createDecipheriv = o.createDecipheriv;
        var i = t(112);
        exports.listCiphers = n
    }
},
function(e, exports, t) { (function(n) {
        function r(e, t, a) {
            return this instanceof r ? (s.call(this), this._cache = new o, this._cipher = new i.AES(t), this._prev = new n(a.length), a.copy(this._prev), void(this._mode = e)) : new r(e, t, a)
        }
        function o() {
            return this instanceof o ? void(this.cache = new n("")) : new o
        }
        var i = t(84),
        s = t(85),
        a = t(88),
        c = t(112),
        d = t(113),
        u = t(114);
        a(r, s),
        r.prototype._transform = function(e, t, n) {
            this._cache.add(e);
            for (var r, o; r = this._cache.get();) o = this._mode.encrypt(this, r),
            this.push(o);
            n()
        },
        r.prototype._flush = function(e) {
            var t = this._cache.flush();
            this.push(this._mode.encrypt(this, t)),
            this._cipher.scrub(),
            e()
        },
        o.prototype.add = function(e) {
            this.cache = n.concat([this.cache, e])
        },
        o.prototype.get = function() {
            if (this.cache.length > 15) {
                var e = this.cache.slice(0, 16);
                return this.cache = this.cache.slice(16),
                e
            }
            return null
        },
        o.prototype.flush = function() {
            for (var e = 16 - this.cache.length,
            t = new n(e), r = -1; ++r < e;) t.writeUInt8(e, r);
            var o = n.concat([this.cache, t]);
            return o
        };
        var l = {
            ECB: t(115),
            CBC: t(116),
            CFB: t(118),
            OFB: t(119),
            CTR: t(120)
        };
        e.exports = function(e) {
            function t(e, t, o) {
                var i = c[e];
                if (!i) throw new TypeError("invalid suite type");
                if ("string" == typeof o && (o = new n(o)), "string" == typeof t && (t = new n(t)), t.length !== i.key / 8) throw new TypeError("invalid key length " + t.length);
                if (o.length !== i.iv) throw new TypeError("invalid iv length " + o.length);
                return "stream" === i.type ? new u(l[i.mode], t, o) : new r(l[i.mode], t, o)
            }
            function o(n, r) {
                var o = c[n];
                if (!o) throw new TypeError("invalid suite type");
                var i = d(e, r, o.key, o.iv);
                return t(n, i.key, i.iv)
            }
            return {
                createCipher: o,
                createCipheriv: t
            }
        }
    }).call(exports, t(60).Buffer)
},
function(e, exports, t) { (function(e) {
        function t(e) {
            var t, n;
            return t = e > s || e < 0 ? (n = Math.abs(e) % s, e < 0 ? s - n: n) : e
        }
        function n(e) {
            var t, n, r;
            for (t = n = 0, r = e.length; 0 <= r ? n < r: n > r; t = 0 <= r ? ++n: --n) e[t] = 0;
            return ! 1
        }
        function r() {
            var e;
            this.SBOX = [],
            this.INV_SBOX = [],
            this.SUB_MIX = function() {
                var t, n;
                for (n = [], e = t = 0; t < 4; e = ++t) n.push([]);
                return n
            } (),
            this.INV_SUB_MIX = function() {
                var t, n;
                for (n = [], e = t = 0; t < 4; e = ++t) n.push([]);
                return n
            } (),
            this.init(),
            this.RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]
        }
        function o(e) {
            for (var t = e.length / 4,
            n = new Array(t), r = -1; ++r < t;) n[r] = e.readUInt32BE(4 * r);
            return n
        }
        function i(e) {
            this._key = o(e),
            this._doReset()
        }
        var s = Math.pow(2, 32);
        r.prototype.init = function() {
            var e, t, n, r, o, i, s, a, c, d;
            for (e = function() {
                var e, n;
                for (n = [], t = e = 0; e < 256; t = ++e) t < 128 ? n.push(t << 1) : n.push(t << 1 ^ 283);
                return n
            } (), o = 0, c = 0, t = d = 0; d < 256; t = ++d) n = c ^ c << 1 ^ c << 2 ^ c << 3 ^ c << 4,
            n = n >>> 8 ^ 255 & n ^ 99,
            this.SBOX[o] = n,
            this.INV_SBOX[n] = o,
            i = e[o],
            s = e[i],
            a = e[s],
            r = 257 * e[n] ^ 16843008 * n,
            this.SUB_MIX[0][o] = r << 24 | r >>> 8,
            this.SUB_MIX[1][o] = r << 16 | r >>> 16,
            this.SUB_MIX[2][o] = r << 8 | r >>> 24,
            this.SUB_MIX[3][o] = r,
            r = 16843009 * a ^ 65537 * s ^ 257 * i ^ 16843008 * o,
            this.INV_SUB_MIX[0][n] = r << 24 | r >>> 8,
            this.INV_SUB_MIX[1][n] = r << 16 | r >>> 16,
            this.INV_SUB_MIX[2][n] = r << 8 | r >>> 24,
            this.INV_SUB_MIX[3][n] = r,
            0 === o ? o = c = 1 : (o = i ^ e[e[e[a ^ i]]], c ^= e[e[c]]);
            return ! 0
        };
        var a = new r;
        i.blockSize = 16,
        i.prototype.blockSize = i.blockSize,
        i.keySize = 32,
        i.prototype.keySize = i.keySize,
        i.ivSize = i.blockSize,
        i.prototype.ivSize = i.ivSize,
        i.prototype._doReset = function() {
            var e, t, n, r, o, i, s, c;
            for (n = this._key, t = n.length, this._nRounds = t + 6, o = 4 * (this._nRounds + 1), this._keySchedule = [], r = s = 0; 0 <= o ? s < o: s > o; r = 0 <= o ? ++s: --s) this._keySchedule[r] = r < t ? n[r] : (i = this._keySchedule[r - 1], r % t === 0 ? (i = i << 8 | i >>> 24, i = a.SBOX[i >>> 24] << 24 | a.SBOX[i >>> 16 & 255] << 16 | a.SBOX[i >>> 8 & 255] << 8 | a.SBOX[255 & i], i ^= a.RCON[r / t | 0] << 24) : t > 6 && r % t === 4 ? i = a.SBOX[i >>> 24] << 24 | a.SBOX[i >>> 16 & 255] << 16 | a.SBOX[i >>> 8 & 255] << 8 | a.SBOX[255 & i] : void 0, this._keySchedule[r - t] ^ i);
            for (this._invKeySchedule = [], e = c = 0; 0 <= o ? c < o: c > o; e = 0 <= o ? ++c: --c) r = o - e,
            i = this._keySchedule[r - (e % 4 ? 0 : 4)],
            this._invKeySchedule[e] = e < 4 || r <= 4 ? i: a.INV_SUB_MIX[0][a.SBOX[i >>> 24]] ^ a.INV_SUB_MIX[1][a.SBOX[i >>> 16 & 255]] ^ a.INV_SUB_MIX[2][a.SBOX[i >>> 8 & 255]] ^ a.INV_SUB_MIX[3][a.SBOX[255 & i]];
            return ! 0
        },
        i.prototype.encryptBlock = function(t) {
            t = o(new e(t));
            var n = this._doCryptBlock(t, this._keySchedule, a.SUB_MIX, a.SBOX),
            r = new e(16);
            return r.writeUInt32BE(n[0], 0),
            r.writeUInt32BE(n[1], 4),
            r.writeUInt32BE(n[2], 8),
            r.writeUInt32BE(n[3], 12),
            r
        },
        i.prototype.decryptBlock = function(t) {
            t = o(new e(t));
            var n = [t[3], t[1]];
            t[1] = n[0],
            t[3] = n[1];
            var r = this._doCryptBlock(t, this._invKeySchedule, a.INV_SUB_MIX, a.INV_SBOX),
            i = new e(16);
            return i.writeUInt32BE(r[0], 0),
            i.writeUInt32BE(r[3], 4),
            i.writeUInt32BE(r[2], 8),
            i.writeUInt32BE(r[1], 12),
            i
        },
        i.prototype.scrub = function() {
            n(this._keySchedule),
            n(this._invKeySchedule),
            n(this._key)
        },
        i.prototype._doCryptBlock = function(e, n, r, o) {
            var i, s, a, c, d, u, l, p, f, h, m, g;
            for (a = e[0] ^ n[0], c = e[1] ^ n[1], d = e[2] ^ n[2], u = e[3] ^ n[3], i = 4, s = m = 1, g = this._nRounds; 1 <= g ? m < g: m > g; s = 1 <= g ? ++m: --m) l = r[0][a >>> 24] ^ r[1][c >>> 16 & 255] ^ r[2][d >>> 8 & 255] ^ r[3][255 & u] ^ n[i++],
            p = r[0][c >>> 24] ^ r[1][d >>> 16 & 255] ^ r[2][u >>> 8 & 255] ^ r[3][255 & a] ^ n[i++],
            f = r[0][d >>> 24] ^ r[1][u >>> 16 & 255] ^ r[2][a >>> 8 & 255] ^ r[3][255 & c] ^ n[i++],
            h = r[0][u >>> 24] ^ r[1][a >>> 16 & 255] ^ r[2][c >>> 8 & 255] ^ r[3][255 & d] ^ n[i++],
            a = l,
            c = p,
            d = f,
            u = h;
            return l = (o[a >>> 24] << 24 | o[c >>> 16 & 255] << 16 | o[d >>> 8 & 255] << 8 | o[255 & u]) ^ n[i++],
            p = (o[c >>> 24] << 24 | o[d >>> 16 & 255] << 16 | o[u >>> 8 & 255] << 8 | o[255 & a]) ^ n[i++],
            f = (o[d >>> 24] << 24 | o[u >>> 16 & 255] << 16 | o[a >>> 8 & 255] << 8 | o[255 & c]) ^ n[i++],
            h = (o[u >>> 24] << 24 | o[a >>> 16 & 255] << 16 | o[c >>> 8 & 255] << 8 | o[255 & d]) ^ n[i++],
            [t(l), t(p), t(f), t(h)]
        },
        exports.AES = i
    }).call(exports, t(60).Buffer)
},
function(e, exports, t) { (function(n) {
        function r() {
            o.call(this)
        }
        var o = t(86).Transform,
        i = t(88);
        e.exports = r,
        i(r, o),
        r.prototype.update = function(e, t, r) {
            this.write(e, t);
            for (var o, i = new n(""); o = this.read();) i = n.concat([i, o]);
            return r && (i = i.toString(r)),
            i
        },
        r.prototype.final = function(e) {
            this.end();
            for (var t, r = new n(""); t = this.read();) r = n.concat([r, t]);
            return e && (r = r.toString(e)),
            r
        }
    }).call(exports, t(60).Buffer)
},
function(e, exports, t) {
    function n() {
        r.call(this)
    }
    e.exports = n;
    var r = t(87).EventEmitter,
    o = t(88);
    o(n, r),
    n.Readable = t(89),
    n.Writable = t(108),
    n.Duplex = t(109),
    n.Transform = t(110),
    n.PassThrough = t(111),
    n.Stream = n,
    n.prototype.pipe = function(e, t) {
        function n(t) {
            e.writable && !1 === e.write(t) && d.pause && d.pause()
        }
        function o() {
            d.readable && d.resume && d.resume()
        }
        function i() {
            u || (u = !0, e.end())
        }
        function s() {
            u || (u = !0, "function" == typeof e.destroy && e.destroy())
        }
        function a(e) {
            if (c(), 0 === r.listenerCount(this, "error")) throw e
        }
        function c() {
            d.removeListener("data", n),
            e.removeListener("drain", o),
            d.removeListener("end", i),
            d.removeListener("close", s),
            d.removeListener("error", a),
            e.removeListener("error", a),
            d.removeListener("end", c),
            d.removeListener("close", c),
            e.removeListener("close", c)
        }
        var d = this;
        d.on("data", n),
        e.on("drain", o),
        e._isStdio || t && t.end === !1 || (d.on("end", i), d.on("close", s));
        var u = !1;
        return d.on("error", a),
        e.on("error", a),
        d.on("end", c),
        d.on("close", c),
        e.on("close", c),
        e.emit("pipe", d),
        e
    }
},
function(e, exports) {
    function t() {
        this._events && Object.prototype.hasOwnProperty.call(this, "_events") || (this._events = v(null), this._eventsCount = 0),
        this._maxListeners = this._maxListeners || void 0
    }
    function n(e) {
        return void 0 === e._maxListeners ? t.defaultMaxListeners: e._maxListeners
    }
    function r(e, t, n) {
        if (t) e.call(n);
        else for (var r = e.length,
        o = f(e, r), i = 0; i < r; ++i) o[i].call(n)
    }
    function o(e, t, n, r) {
        if (t) e.call(n, r);
        else for (var o = e.length,
        i = f(e, o), s = 0; s < o; ++s) i[s].call(n, r)
    }
    function i(e, t, n, r, o) {
        if (t) e.call(n, r, o);
        else for (var i = e.length,
        s = f(e, i), a = 0; a < i; ++a) s[a].call(n, r, o)
    }
    function s(e, t, n, r, o, i) {
        if (t) e.call(n, r, o, i);
        else for (var s = e.length,
        a = f(e, s), c = 0; c < s; ++c) a[c].call(n, r, o, i)
    }
    function a(e, t, n, r) {
        if (t) e.apply(n, r);
        else for (var o = e.length,
        i = f(e, o), s = 0; s < o; ++s) i[s].apply(n, r)
    }
    function c(e, t, r, o) {
        var i, s, a;
        if ("function" != typeof r) throw new TypeError('"listener" argument must be a function');
        if (s = e._events, s ? (s.newListener && (e.emit("newListener", t, r.listener ? r.listener: r), s = e._events), a = s[t]) : (s = e._events = v(null), e._eventsCount = 0), a) {
            if ("function" == typeof a ? a = s[t] = o ? [r, a] : [a, r] : o ? a.unshift(r) : a.push(r), !a.warned && (i = n(e), i && i > 0 && a.length > i)) {
                a.warned = !0;
                var c = new Error("Possible EventEmitter memory leak detected. " + a.length + ' "' + String(t) + '" listeners added. Use emitter.setMaxListeners() to increase limit.');
                c.name = "MaxListenersExceededWarning",
                c.emitter = e,
                c.type = t,
                c.count = a.length,
                "object" == typeof console && console.warn && console.warn("%s: %s", c.name, c.message)
            }
        } else a = s[t] = r,
        ++e._eventsCount;
        return e
    }
    function d() {
        if (!this.fired) switch (this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length) {
        case 0:
            return this.listener.call(this.target);
        case 1:
            return this.listener.call(this.target, arguments[0]);
        case 2:
            return this.listener.call(this.target, arguments[0], arguments[1]);
        case 3:
            return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);
        default:
            for (var e = new Array(arguments.length), t = 0; t < e.length; ++t) e[t] = arguments[t];
            this.listener.apply(this.target, e)
        }
    }
    function u(e, t, n) {
        var r = {
            fired: !1,
            wrapFn: void 0,
            target: e,
            type: t,
            listener: n
        },
        o = w.call(d, r);
        return o.listener = n,
        r.wrapFn = o,
        o
    }
    function l(e) {
        var t = this._events;
        if (t) {
            var n = t[e];
            if ("function" == typeof n) return 1;
            if (n) return n.length
        }
        return 0
    }
    function p(e, t) {
        for (var n = t,
        r = n + 1,
        o = e.length; r < o; n += 1, r += 1) e[n] = e[r];
        e.pop()
    }
    function f(e, t) {
        for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
        return n
    }
    function h(e) {
        for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
        return t
    }
    function m(e) {
        var t = function() {};
        return t.prototype = e,
        new t
    }
    function g(e) {
        var t = [];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
        return n
    }
    function _(e) {
        var t = this;
        return function() {
            return t.apply(e, arguments)
        }
    }
    var v = Object.create || m,
    y = Object.keys || g,
    w = Function.prototype.bind || _;
    e.exports = t,
    t.EventEmitter = t,
    t.prototype._events = void 0,
    t.prototype._maxListeners = void 0;
    var b, S = 10;
    try {
        var C = {};
        Object.defineProperty && Object.defineProperty(C, "x", {
            value: 0
        }),
        b = 0 === C.x
    } catch(e) {
        b = !1
    }
    b ? Object.defineProperty(t, "defaultMaxListeners", {
        enumerable: !0,
        get: function() {
            return S
        },
        set: function(e) {
            if ("number" != typeof e || e < 0 || e !== e) throw new TypeError('"defaultMaxListeners" must be a positive number');
            S = e
        }
    }) : t.defaultMaxListeners = S,
    t.prototype.setMaxListeners = function(e) {
        if ("number" != typeof e || e < 0 || isNaN(e)) throw new TypeError('"n" argument must be a positive number');
        return this._maxListeners = e,
        this
    },
    t.prototype.getMaxListeners = function() {
        return n(this)
    },
    t.prototype.emit = function(e) {
        var t, n, c, d, u, l, p = "error" === e;
        if (l = this._events) p = p && null == l.error;
        else if (!p) return ! 1;
        if (p) {
            if (arguments.length > 1 && (t = arguments[1]), t instanceof Error) throw t;
            var f = new Error('Unhandled "error" event. (' + t + ")");
            throw f.context = t,
            f
        }
        if (n = l[e], !n) return ! 1;
        var h = "function" == typeof n;
        switch (c = arguments.length) {
        case 1:
            r(n, h, this);
            break;
        case 2:
            o(n, h, this, arguments[1]);
            break;
        case 3:
            i(n, h, this, arguments[1], arguments[2]);
            break;
        case 4:
            s(n, h, this, arguments[1], arguments[2], arguments[3]);
            break;
        default:
            for (d = new Array(c - 1), u = 1; u < c; u++) d[u - 1] = arguments[u];
            a(n, h, this, d)
        }
        return ! 0
    },
    t.prototype.addListener = function(e, t) {
        return c(this, e, t, !1)
    },
    t.prototype.on = t.prototype.addListener,
    t.prototype.prependListener = function(e, t) {
        return c(this, e, t, !0)
    },
    t.prototype.once = function(e, t) {
        if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
        return this.on(e, u(this, e, t)),
        this
    },
    t.prototype.prependOnceListener = function(e, t) {
        if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
        return this.prependListener(e, u(this, e, t)),
        this
    },
    t.prototype.removeListener = function(e, t) {
        var n, r, o, i, s;
        if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
        if (r = this._events, !r) return this;
        if (n = r[e], !n) return this;
        if (n === t || n.listener === t) 0 === --this._eventsCount ? this._events = v(null) : (delete r[e], r.removeListener && this.emit("removeListener", e, n.listener || t));
        else if ("function" != typeof n) {
            for (o = -1, i = n.length - 1; i >= 0; i--) if (n[i] === t || n[i].listener === t) {
                s = n[i].listener,
                o = i;
                break
            }
            if (o < 0) return this;
            0 === o ? n.shift() : p(n, o),
            1 === n.length && (r[e] = n[0]),
            r.removeListener && this.emit("removeListener", e, s || t)
        }
        return this
    },
    t.prototype.removeAllListeners = function(e) {
        var t, n, r;
        if (n = this._events, !n) return this;
        if (!n.removeListener) return 0 === arguments.length ? (this._events = v(null), this._eventsCount = 0) : n[e] && (0 === --this._eventsCount ? this._events = v(null) : delete n[e]),
        this;
        if (0 === arguments.length) {
            var o, i = y(n);
            for (r = 0; r < i.length; ++r) o = i[r],
            "removeListener" !== o && this.removeAllListeners(o);
            return this.removeAllListeners("removeListener"),
            this._events = v(null),
            this._eventsCount = 0,
            this
        }
        if (t = n[e], "function" == typeof t) this.removeListener(e, t);
        else if (t) for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
        return this
    },
    t.prototype.listeners = function(e) {
        var t, n, r = this._events;
        return r ? (t = r[e], n = t ? "function" == typeof t ? [t.listener || t] : h(t) : []) : n = [],
        n
    },
    t.listenerCount = function(e, t) {
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : l.call(e, t)
    },
    t.prototype.listenerCount = l,
    t.prototype.eventNames = function() {
        return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : []
    }
},
function(e, exports) {
    "function" == typeof Object.create ? e.exports = function(e, t) {
        e.super_ = t,
        e.prototype = Object.create(t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        })
    }: e.exports = function(e, t) {
        e.super_ = t;
        var n = function() {};
        n.prototype = t.prototype,
        e.prototype = new n,
        e.prototype.constructor = e
    }
},
function(e, exports, t) {
    exports = e.exports = t(90),
    exports.Stream = exports,
    exports.Readable = exports,
    exports.Writable = t(101),
    exports.Duplex = t(100),
    exports.Transform = t(106),
    exports.PassThrough = t(107)
},
function(e, exports, t) { (function(n, r) {
        "use strict";
        function o(e) {
            return N.from(e)
        }
        function i(e) {
            return N.isBuffer(e) || e instanceof B
        }
        function s(e, t, n) {
            return "function" == typeof e.prependListener ? e.prependListener(t, n) : void(e._events && e._events[t] ? O(e._events[t]) ? e._events[t].unshift(n) : e._events[t] = [n, e._events[t]] : e.on(t, n))
        }
        function a(e, n) {
            P = P || t(100),
            e = e || {};
            var r = n instanceof P;
            this.objectMode = !!e.objectMode,
            r && (this.objectMode = this.objectMode || !!e.readableObjectMode);
            var o = e.highWaterMark,
            i = e.readableHighWaterMark,
            s = this.objectMode ? 16 : 16384;
            o || 0 === o ? this.highWaterMark = o: r && (i || 0 === i) ? this.highWaterMark = i: this.highWaterMark = s,
            this.highWaterMark = Math.floor(this.highWaterMark),
            this.buffer = new H,
            this.length = 0,
            this.pipes = null,
            this.pipesCount = 0,
            this.flowing = null,
            this.ended = !1,
            this.endEmitted = !1,
            this.reading = !1,
            this.sync = !0,
            this.needReadable = !1,
            this.emittedReadable = !1,
            this.readableListening = !1,
            this.resumeScheduled = !1,
            this.destroyed = !1,
            this.defaultEncoding = e.defaultEncoding || "utf8",
            this.awaitDrain = 0,
            this.readingMore = !1,
            this.decoder = null,
            this.encoding = null,
            e.encoding && (q || (q = t(105).StringDecoder), this.decoder = new q(e.encoding), this.encoding = e.encoding)
        }
        function c(e) {
            return P = P || t(100),
            this instanceof c ? (this._readableState = new a(e, this), this.readable = !0, e && ("function" == typeof e.read && (this._read = e.read), "function" == typeof e.destroy && (this._destroy = e.destroy)), void L.call(this)) : new c(e)
        }
        function d(e, t, n, r, i) {
            var s = e._readableState;
            if (null === t) s.reading = !1,
            m(e, s);
            else {
                var a;
                i || (a = l(s, t)),
                a ? e.emit("error", a) : s.objectMode || t && t.length > 0 ? ("string" == typeof t || s.objectMode || Object.getPrototypeOf(t) === N.prototype || (t = o(t)), r ? s.endEmitted ? e.emit("error", new Error("stream.unshift() after end event")) : u(e, s, t, !0) : s.ended ? e.emit("error", new Error("stream.push() after EOF")) : (s.reading = !1, s.decoder && !n ? (t = s.decoder.write(t), s.objectMode || 0 !== t.length ? u(e, s, t, !1) : v(e, s)) : u(e, s, t, !1))) : r || (s.reading = !1)
            }
            return p(s)
        }
        function u(e, t, n, r) {
            t.flowing && 0 === t.length && !t.sync ? (e.emit("data", n), e.read(0)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), t.needReadable && g(e)),
            v(e, t)
        }
        function l(e, t) {
            var n;
            return i(t) || "string" == typeof t || void 0 === t || e.objectMode || (n = new TypeError("Invalid non-string/buffer chunk")),
            n
        }
        function p(e) {
            return ! e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length)
        }
        function f(e) {
            return e >= z ? e = z: (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++),
            e
        }
        function h(e, t) {
            return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e !== e ? t.flowing && t.length ? t.buffer.head.data.length: t.length: (e > t.highWaterMark && (t.highWaterMark = f(e)), e <= t.length ? e: t.ended ? t.length: (t.needReadable = !0, 0))
        }
        function m(e, t) {
            if (!t.ended) {
                if (t.decoder) {
                    var n = t.decoder.end();
                    n && n.length && (t.buffer.push(n), t.length += t.objectMode ? 1 : n.length)
                }
                t.ended = !0,
                g(e)
            }
        }
        function g(e) {
            var t = e._readableState;
            t.needReadable = !1,
            t.emittedReadable || (V("emitReadable", t.flowing), t.emittedReadable = !0, t.sync ? I.nextTick(_, e) : _(e))
        }
        function _(e) {
            V("emit readable"),
            e.emit("readable"),
            x(e)
        }
        function v(e, t) {
            t.readingMore || (t.readingMore = !0, I.nextTick(y, e, t))
        }
        function y(e, t) {
            for (var n = t.length; ! t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark && (V("maybeReadMore read 0"), e.read(0), n !== t.length);) n = t.length;
            t.readingMore = !1
        }
        function w(e) {
            return function() {
                var t = e._readableState;
                V("pipeOnDrain", t.awaitDrain),
                t.awaitDrain && t.awaitDrain--,
                0 === t.awaitDrain && D(e, "data") && (t.flowing = !0, x(e))
            }
        }
        function b(e) {
            V("readable nexttick read 0"),
            e.read(0)
        }
        function S(e, t) {
            t.resumeScheduled || (t.resumeScheduled = !0, I.nextTick(C, e, t))
        }
        function C(e, t) {
            t.reading || (V("resume read 0"), e.read(0)),
            t.resumeScheduled = !1,
            t.awaitDrain = 0,
            e.emit("resume"),
            x(e),
            t.flowing && !t.reading && e.read(0)
        }
        function x(e) {
            var t = e._readableState;
            for (V("flow", t.flowing); t.flowing && null !== e.read(););
        }
        function T(e, t) {
            if (0 === t.length) return null;
            var n;
            return t.objectMode ? n = t.buffer.shift() : !e || e >= t.length ? (n = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.head.data: t.buffer.concat(t.length), t.buffer.clear()) : n = k(e, t.buffer, t.decoder),
            n
        }
        function k(e, t, n) {
            var r;
            return e < t.head.data.length ? (r = t.head.data.slice(0, e), t.head.data = t.head.data.slice(e)) : r = e === t.head.data.length ? t.shift() : n ? R(e, t) : A(e, t),
            r
        }
        function R(e, t) {
            var n = t.head,
            r = 1,
            o = n.data;
            for (e -= o.length; n = n.next;) {
                var i = n.data,
                s = e > i.length ? i.length: e;
                if (o += s === i.length ? i: i.slice(0, e), e -= s, 0 === e) {
                    s === i.length ? (++r, n.next ? t.head = n.next: t.head = t.tail = null) : (t.head = n, n.data = i.slice(s));
                    break
                }++r
            }
            return t.length -= r,
            o
        }
        function A(e, t) {
            var n = N.allocUnsafe(e),
            r = t.head,
            o = 1;
            for (r.data.copy(n), e -= r.data.length; r = r.next;) {
                var i = r.data,
                s = e > i.length ? i.length: e;
                if (i.copy(n, n.length - e, 0, s), e -= s, 0 === e) {
                    s === i.length ? (++o, r.next ? t.head = r.next: t.head = t.tail = null) : (t.head = r, r.data = i.slice(s));
                    break
                }++o
            }
            return t.length -= o,
            n
        }
        function j(e) {
            var t = e._readableState;
            if (t.length > 0) throw new Error('"endReadable()" called on non-empty stream');
            t.endEmitted || (t.ended = !0, I.nextTick(E, t, e))
        }
        function E(e, t) {
            e.endEmitted || 0 !== e.length || (e.endEmitted = !0, t.readable = !1, t.emit("end"))
        }
        function M(e, t) {
            for (var n = 0,
            r = e.length; n < r; n++) if (e[n] === t) return n;
            return - 1
        }
        var I = t(91);
        e.exports = c;
        var P, O = t(92);
        c.ReadableState = a;
        var D = (t(87).EventEmitter,
        function(e, t) {
            return e.listeners(t).length
        }),
        L = t(93),
        N = t(94).Buffer,
        B = n.Uint8Array ||
        function() {},
        U = t(95);
        U.inherits = t(88);
        var F = t(96),
        V = void 0;
        V = F && F.debuglog ? F.debuglog("stream") : function() {};
        var q, H = t(97),
        J = t(99);
        U.inherits(c, L);
        var G = ["error", "close", "destroy", "pause", "resume"];
        Object.defineProperty(c.prototype, "destroyed", {
            get: function() {
                return void 0 !== this._readableState && this._readableState.destroyed
            },
            set: function(e) {
                this._readableState && (this._readableState.destroyed = e)
            }
        }),
        c.prototype.destroy = J.destroy,
        c.prototype._undestroy = J.undestroy,
        c.prototype._destroy = function(e, t) {
            this.push(null),
            t(e)
        },
        c.prototype.push = function(e, t) {
            var n, r = this._readableState;
            return r.objectMode ? n = !0 : "string" == typeof e && (t = t || r.defaultEncoding, t !== r.encoding && (e = N.from(e, t), t = ""), n = !0),
            d(this, e, t, !1, n)
        },
        c.prototype.unshift = function(e) {
            return d(this, e, null, !0, !1)
        },
        c.prototype.isPaused = function() {
            return this._readableState.flowing === !1
        },
        c.prototype.setEncoding = function(e) {
            return q || (q = t(105).StringDecoder),
            this._readableState.decoder = new q(e),
            this._readableState.encoding = e,
            this
        };
        var z = 8388608;
        c.prototype.read = function(e) {
            V("read", e),
            e = parseInt(e, 10);
            var t = this._readableState,
            n = e;
            if (0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended)) return V("read: emitReadable", t.length, t.ended),
            0 === t.length && t.ended ? j(this) : g(this),
            null;
            if (e = h(e, t), 0 === e && t.ended) return 0 === t.length && j(this),
            null;
            var r = t.needReadable;
            V("need readable", r),
            (0 === t.length || t.length - e < t.highWaterMark) && (r = !0, V("length less than watermark", r)),
            t.ended || t.reading ? (r = !1, V("reading or ended", r)) : r && (V("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, t.reading || (e = h(n, t)));
            var o;
            return o = e > 0 ? T(e, t) : null,
            null === o ? (t.needReadable = !0, e = 0) : t.length -= e,
            0 === t.length && (t.ended || (t.needReadable = !0), n !== e && t.ended && j(this)),
            null !== o && this.emit("data", o),
            o
        },
        c.prototype._read = function(e) {
            this.emit("error", new Error("_read() is not implemented"))
        },
        c.prototype.pipe = function(e, t) {
            function n(e, t) {
                V("onunpipe"),
                e === p && t && t.hasUnpiped === !1 && (t.hasUnpiped = !0, i())
            }
            function o() {
                V("onend"),
                e.end()
            }
            function i() {
                V("cleanup"),
                e.removeListener("close", d),
                e.removeListener("finish", u),
                e.removeListener("drain", g),
                e.removeListener("error", c),
                e.removeListener("unpipe", n),
                p.removeListener("end", o),
                p.removeListener("end", l),
                p.removeListener("data", a),
                _ = !0,
                !f.awaitDrain || e._writableState && !e._writableState.needDrain || g()
            }
            function a(t) {
                V("ondata"),
                v = !1;
                var n = e.write(t); ! 1 !== n || v || ((1 === f.pipesCount && f.pipes === e || f.pipesCount > 1 && M(f.pipes, e) !== -1) && !_ && (V("false write response, pause", p._readableState.awaitDrain), p._readableState.awaitDrain++, v = !0), p.pause())
            }
            function c(t) {
                V("onerror", t),
                l(),
                e.removeListener("error", c),
                0 === D(e, "error") && e.emit("error", t)
            }
            function d() {
                e.removeListener("finish", u),
                l()
            }
            function u() {
                V("onfinish"),
                e.removeListener("close", d),
                l()
            }
            function l() {
                V("unpipe"),
                p.unpipe(e)
            }
            var p = this,
            f = this._readableState;
            switch (f.pipesCount) {
            case 0:
                f.pipes = e;
                break;
            case 1:
                f.pipes = [f.pipes, e];
                break;
            default:
                f.pipes.push(e)
            }
            f.pipesCount += 1,
            V("pipe count=%d opts=%j", f.pipesCount, t);
            var h = (!t || t.end !== !1) && e !== r.stdout && e !== r.stderr,
            m = h ? o: l;
            f.endEmitted ? I.nextTick(m) : p.once("end", m),
            e.on("unpipe", n);
            var g = w(p);
            e.on("drain", g);
            var _ = !1,
            v = !1;
            return p.on("data", a),
            s(e, "error", c),
            e.once("close", d),
            e.once("finish", u),
            e.emit("pipe", p),
            f.flowing || (V("pipe resume"), p.resume()),
            e
        },
        c.prototype.unpipe = function(e) {
            var t = this._readableState,
            n = {
                hasUnpiped: !1
            };
            if (0 === t.pipesCount) return this;
            if (1 === t.pipesCount) return e && e !== t.pipes ? this: (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, n), this);
            if (!e) {
                var r = t.pipes,
                o = t.pipesCount;
                t.pipes = null,
                t.pipesCount = 0,
                t.flowing = !1;
                for (var i = 0; i < o; i++) r[i].emit("unpipe", this, n);
                return this
            }
            var s = M(t.pipes, e);
            return s === -1 ? this: (t.pipes.splice(s, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, n), this)
        },
        c.prototype.on = function(e, t) {
            var n = L.prototype.on.call(this, e, t);
            if ("data" === e) this._readableState.flowing !== !1 && this.resume();
            else if ("readable" === e) {
                var r = this._readableState;
                r.endEmitted || r.readableListening || (r.readableListening = r.needReadable = !0, r.emittedReadable = !1, r.reading ? r.length && g(this) : I.nextTick(b, this))
            }
            return n
        },
        c.prototype.addListener = c.prototype.on,
        c.prototype.resume = function() {
            var e = this._readableState;
            return e.flowing || (V("resume"), e.flowing = !0, S(this, e)),
            this
        },
        c.prototype.pause = function() {
            return V("call pause flowing=%j", this._readableState.flowing),
            !1 !== this._readableState.flowing && (V("pause"), this._readableState.flowing = !1, this.emit("pause")),
            this
        },
        c.prototype.wrap = function(e) {
            var t = this,
            n = this._readableState,
            r = !1;
            e.on("end",
            function() {
                if (V("wrapped end"), n.decoder && !n.ended) {
                    var e = n.decoder.end();
                    e && e.length && t.push(e)
                }
                t.push(null)
            }),
            e.on("data",
            function(o) {
                if (V("wrapped data"), n.decoder && (o = n.decoder.write(o)), (!n.objectMode || null !== o && void 0 !== o) && (n.objectMode || o && o.length)) {
                    var i = t.push(o);
                    i || (r = !0, e.pause())
                }
            });
            for (var o in e) void 0 === this[o] && "function" == typeof e[o] && (this[o] = function(t) {
                return function() {
                    return e[t].apply(e, arguments)
                }
            } (o));
            for (var i = 0; i < G.length; i++) e.on(G[i], this.emit.bind(this, G[i]));
            return this._read = function(t) {
                V("wrapped _read", t),
                r && (r = !1, e.resume())
            },
            this
        },
        Object.defineProperty(c.prototype, "readableHighWaterMark", {
            enumerable: !1,
            get: function() {
                return this._readableState.highWaterMark
            }
        }),
        c._fromList = T
    }).call(exports,
    function() {
        return this
    } (), t(71))
},
function(e, exports, t) { (function(t) {
        "use strict";
        function n(e, n, r, o) {
            if ("function" != typeof e) throw new TypeError('"callback" argument must be a function');
            var i, s, a = arguments.length;
            switch (a) {
            case 0:
            case 1:
                return t.nextTick(e);
            case 2:
                return t.nextTick(function() {
                    e.call(null, n)
                });
            case 3:
                return t.nextTick(function() {
                    e.call(null, n, r)
                });
            case 4:
                return t.nextTick(function() {
                    e.call(null, n, r, o)
                });
            default:
                for (i = new Array(a - 1), s = 0; s < i.length;) i[s++] = arguments[s];
                return t.nextTick(function() {
                    e.apply(null, i)
                })
            }
        } ! t.version || 0 === t.version.indexOf("v0.") || 0 === t.version.indexOf("v1.") && 0 !== t.version.indexOf("v1.8.") ? e.exports = {
            nextTick: n
        }: e.exports = t
    }).call(exports, t(71))
},
function(e, exports) {
    var t = {}.toString;
    e.exports = Array.isArray ||
    function(e) {
        return "[object Array]" == t.call(e)
    }
},
function(e, exports, t) {
    e.exports = t(87).EventEmitter
},
function(e, exports, t) {
    function n(e, t) {
        for (var n in e) t[n] = e[n]
    }
    function r(e, t, n) {
        return i(e, t, n)
    }
    var o = t(60),
    i = o.Buffer;
    i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? e.exports = o: (n(o, exports), exports.Buffer = r),
    n(i, r),
    r.from = function(e, t, n) {
        if ("number" == typeof e) throw new TypeError("Argument must not be a number");
        return i(e, t, n)
    },
    r.alloc = function(e, t, n) {
        if ("number" != typeof e) throw new TypeError("Argument must be a number");
        var r = i(e);
        return void 0 !== t ? "string" == typeof n ? r.fill(t, n) : r.fill(t) : r.fill(0),
        r
    },
    r.allocUnsafe = function(e) {
        if ("number" != typeof e) throw new TypeError("Argument must be a number");
        return i(e)
    },
    r.allocUnsafeSlow = function(e) {
        if ("number" != typeof e) throw new TypeError("Argument must be a number");
        return o.SlowBuffer(e)
    }
},
function(e, exports, t) { (function(e) {
        function t(e) {
            return Array.isArray ? Array.isArray(e) : "[object Array]" === m(e)
        }
        function n(e) {
            return "boolean" == typeof e
        }
        function r(e) {
            return null === e
        }
        function o(e) {
            return null == e
        }
        function i(e) {
            return "number" == typeof e
        }
        function s(e) {
            return "string" == typeof e
        }
        function a(e) {
            return "symbol" == typeof e
        }
        function c(e) {
            return void 0 === e
        }
        function d(e) {
            return "[object RegExp]" === m(e)
        }
        function u(e) {
            return "object" == typeof e && null !== e
        }
        function l(e) {
            return "[object Date]" === m(e)
        }
        function p(e) {
            return "[object Error]" === m(e) || e instanceof Error
        }
        function f(e) {
            return "function" == typeof e
        }
        function h(e) {
            return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e
        }
        function m(e) {
            return Object.prototype.toString.call(e)
        }
        exports.isArray = t,
        exports.isBoolean = n,
        exports.isNull = r,
        exports.isNullOrUndefined = o,
        exports.isNumber = i,
        exports.isString = s,
        exports.isSymbol = a,
        exports.isUndefined = c,
        exports.isRegExp = d,
        exports.isObject = u,
        exports.isDate = l,
        exports.isError = p,
        exports.isFunction = f,
        exports.isPrimitive = h,
        exports.isBuffer = e.isBuffer
    }).call(exports, t(60).Buffer)
},
function(e, exports) {},
function(e, exports, t) {
    "use strict";
    function n(e, t) {
        if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    function r(e, t, n) {
        e.copy(t, n)
    }
    var o = t(94).Buffer,
    i = t(98);
    e.exports = function() {
        function e() {
            n(this, e),
            this.head = null,
            this.tail = null,
            this.length = 0
        }
        return e.prototype.push = function(e) {
            var t = {
                data: e,
                next: null
            };
            this.length > 0 ? this.tail.next = t: this.head = t,
            this.tail = t,
            ++this.length
        },
        e.prototype.unshift = function(e) {
            var t = {
                data: e,
                next: this.head
            };
            0 === this.length && (this.tail = t),
            this.head = t,
            ++this.length
        },
        e.prototype.shift = function() {
            if (0 !== this.length) {
                var e = this.head.data;
                return 1 === this.length ? this.head = this.tail = null: this.head = this.head.next,
                --this.length,
                e
            }
        },
        e.prototype.clear = function() {
            this.head = this.tail = null,
            this.length = 0
        },
        e.prototype.join = function(e) {
            if (0 === this.length) return "";
            for (var t = this.head,
            n = "" + t.data; t = t.next;) n += e + t.data;
            return n
        },
        e.prototype.concat = function(e) {
            if (0 === this.length) return o.alloc(0);
            if (1 === this.length) return this.head.data;
            for (var t = o.allocUnsafe(e >>> 0), n = this.head, i = 0; n;) r(n.data, t, i),
            i += n.data.length,
            n = n.next;
            return t
        },
        e
    } (),
    i && i.inspect && i.inspect.custom && (e.exports.prototype[i.inspect.custom] = function() {
        var e = i.inspect({
            length: this.length
        });
        return this.constructor.name + " " + e
    })
},
function(e, exports) {},
function(e, exports, t) {
    "use strict";
    function n(e, t) {
        var n = this,
        r = this._readableState && this._readableState.destroyed,
        s = this._writableState && this._writableState.destroyed;
        return r || s ? (t ? t(e) : !e || this._writableState && this._writableState.errorEmitted || i.nextTick(o, this, e), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(e || null,
        function(e) { ! t && e ? (i.nextTick(o, n, e), n._writableState && (n._writableState.errorEmitted = !0)) : t && t(e)
        }), this)
    }
    function r() {
        this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1),
        this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
    }
    function o(e, t) {
        e.emit("error", t)
    }
    var i = t(91);
    e.exports = {
        destroy: n,
        undestroy: r
    }
},
function(e, exports, t) {
    "use strict";
    function n(e) {
        return this instanceof n ? (c.call(this, e), d.call(this, e), e && e.readable === !1 && (this.readable = !1), e && e.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, e && e.allowHalfOpen === !1 && (this.allowHalfOpen = !1), void this.once("end", r)) : new n(e)
    }
    function r() {
        this.allowHalfOpen || this._writableState.ended || i.nextTick(o, this)
    }
    function o(e) {
        e.end()
    }
    var i = t(91),
    s = Object.keys ||
    function(e) {
        var t = [];
        for (var n in e) t.push(n);
        return t
    };
    e.exports = n;
    var a = t(95);
    a.inherits = t(88);
    var c = t(90),
    d = t(101);
    a.inherits(n, c);
    for (var u = s(d.prototype), l = 0; l < u.length; l++) {
        var p = u[l];
        n.prototype[p] || (n.prototype[p] = d.prototype[p])
    }
    Object.defineProperty(n.prototype, "writableHighWaterMark", {
        enumerable: !1,
        get: function() {
            return this._writableState.highWaterMark
        }
    }),
    Object.defineProperty(n.prototype, "destroyed", {
        get: function() {
            return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed)
        },
        set: function(e) {
            void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e)
        }
    }),
    n.prototype._destroy = function(e, t) {
        this.push(null),
        this.end(),
        i.nextTick(t, e)
    }
},
function(e, exports, t) { (function(n, r, o) {
        "use strict";
        function i(e) {
            var t = this;
            this.next = null,
            this.entry = null,
            this.finish = function() {
                R(t, e)
            }
        }
        function s(e) {
            return O.from(e)
        }
        function a(e) {
            return O.isBuffer(e) || e instanceof D
        }
        function c() {}
        function d(e, n) {
            j = j || t(100),
            e = e || {};
            var r = n instanceof j;
            this.objectMode = !!e.objectMode,
            r && (this.objectMode = this.objectMode || !!e.writableObjectMode);
            var o = e.highWaterMark,
            s = e.writableHighWaterMark,
            a = this.objectMode ? 16 : 16384;
            o || 0 === o ? this.highWaterMark = o: r && (s || 0 === s) ? this.highWaterMark = s: this.highWaterMark = a,
            this.highWaterMark = Math.floor(this.highWaterMark),
            this.finalCalled = !1,
            this.needDrain = !1,
            this.ending = !1,
            this.ended = !1,
            this.finished = !1,
            this.destroyed = !1;
            var c = e.decodeStrings === !1;
            this.decodeStrings = !c,
            this.defaultEncoding = e.defaultEncoding || "utf8",
            this.length = 0,
            this.writing = !1,
            this.corked = 0,
            this.sync = !0,
            this.bufferProcessing = !1,
            this.onwrite = function(e) {
                v(n, e)
            },
            this.writecb = null,
            this.writelen = 0,
            this.bufferedRequest = null,
            this.lastBufferedRequest = null,
            this.pendingcb = 0,
            this.prefinished = !1,
            this.errorEmitted = !1,
            this.bufferedRequestCount = 0,
            this.corkedRequestsFree = new i(this)
        }
        function u(e) {
            return j = j || t(100),
            N.call(u, this) || this instanceof j ? (this._writableState = new d(e, this), this.writable = !0, e && ("function" == typeof e.write && (this._write = e.write), "function" == typeof e.writev && (this._writev = e.writev), "function" == typeof e.destroy && (this._destroy = e.destroy), "function" == typeof e.final && (this._final = e.final)), void P.call(this)) : new u(e)
        }
        function l(e, t) {
            var n = new Error("write after end");
            e.emit("error", n),
            A.nextTick(t, n)
        }
        function p(e, t, n, r) {
            var o = !0,
            i = !1;
            return null === n ? i = new TypeError("May not write null values to stream") : "string" == typeof n || void 0 === n || t.objectMode || (i = new TypeError("Invalid non-string/buffer chunk")),
            i && (e.emit("error", i), A.nextTick(r, i), o = !1),
            o
        }
        function f(e, t, n) {
            return e.objectMode || e.decodeStrings === !1 || "string" != typeof t || (t = O.from(t, n)),
            t
        }
        function h(e, t, n, r, o, i) {
            if (!n) {
                var s = f(t, r, o);
                r !== s && (n = !0, o = "buffer", r = s)
            }
            var a = t.objectMode ? 1 : r.length;
            t.length += a;
            var c = t.length < t.highWaterMark;
            if (c || (t.needDrain = !0), t.writing || t.corked) {
                var d = t.lastBufferedRequest;
                t.lastBufferedRequest = {
                    chunk: r,
                    encoding: o,
                    isBuf: n,
                    callback: i,
                    next: null
                },
                d ? d.next = t.lastBufferedRequest: t.bufferedRequest = t.lastBufferedRequest,
                t.bufferedRequestCount += 1
            } else m(e, t, !1, a, r, o, i);
            return c
        }
        function m(e, t, n, r, o, i, s) {
            t.writelen = r,
            t.writecb = s,
            t.writing = !0,
            t.sync = !0,
            n ? e._writev(o, t.onwrite) : e._write(o, i, t.onwrite),
            t.sync = !1
        }
        function g(e, t, n, r, o) {--t.pendingcb,
            n ? (A.nextTick(o, r), A.nextTick(T, e, t), e._writableState.errorEmitted = !0, e.emit("error", r)) : (o(r), e._writableState.errorEmitted = !0, e.emit("error", r), T(e, t))
        }
        function _(e) {
            e.writing = !1,
            e.writecb = null,
            e.length -= e.writelen,
            e.writelen = 0
        }
        function v(e, t) {
            var n = e._writableState,
            r = n.sync,
            o = n.writecb;
            if (_(n), t) g(e, n, r, t, o);
            else {
                var i = S(n);
                i || n.corked || n.bufferProcessing || !n.bufferedRequest || b(e, n),
                r ? E(y, e, n, i, o) : y(e, n, i, o)
            }
        }
        function y(e, t, n, r) {
            n || w(e, t),
            t.pendingcb--,
            r(),
            T(e, t)
        }
        function w(e, t) {
            0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"))
        }
        function b(e, t) {
            t.bufferProcessing = !0;
            var n = t.bufferedRequest;
            if (e._writev && n && n.next) {
                var r = t.bufferedRequestCount,
                o = new Array(r),
                s = t.corkedRequestsFree;
                s.entry = n;
                for (var a = 0,
                c = !0; n;) o[a] = n,
                n.isBuf || (c = !1),
                n = n.next,
                a += 1;
                o.allBuffers = c,
                m(e, t, !0, t.length, o, "", s.finish),
                t.pendingcb++,
                t.lastBufferedRequest = null,
                s.next ? (t.corkedRequestsFree = s.next, s.next = null) : t.corkedRequestsFree = new i(t),
                t.bufferedRequestCount = 0
            } else {
                for (; n;) {
                    var d = n.chunk,
                    u = n.encoding,
                    l = n.callback,
                    p = t.objectMode ? 1 : d.length;
                    if (m(e, t, !1, p, d, u, l), n = n.next, t.bufferedRequestCount--, t.writing) break
                }
                null === n && (t.lastBufferedRequest = null)
            }
            t.bufferedRequest = n,
            t.bufferProcessing = !1
        }
        function S(e) {
            return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
        }
        function C(e, t) {
            e._final(function(n) {
                t.pendingcb--,
                n && e.emit("error", n),
                t.prefinished = !0,
                e.emit("prefinish"),
                T(e, t)
            })
        }
        function x(e, t) {
            t.prefinished || t.finalCalled || ("function" == typeof e._final ? (t.pendingcb++, t.finalCalled = !0, A.nextTick(C, e, t)) : (t.prefinished = !0, e.emit("prefinish")))
        }
        function T(e, t) {
            var n = S(t);
            return n && (x(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"))),
            n
        }
        function k(e, t, n) {
            t.ending = !0,
            T(e, t),
            n && (t.finished ? A.nextTick(n) : e.once("finish", n)),
            t.ended = !0,
            e.writable = !1
        }
        function R(e, t, n) {
            var r = e.entry;
            for (e.entry = null; r;) {
                var o = r.callback;
                t.pendingcb--,
                o(n),
                r = r.next
            }
            t.corkedRequestsFree ? t.corkedRequestsFree.next = e: t.corkedRequestsFree = e
        }
        var A = t(91);
        e.exports = u;
        var j, E = !n.browser && ["v0.10", "v0.9."].indexOf(n.version.slice(0, 5)) > -1 ? r: A.nextTick;
        u.WritableState = d;
        var M = t(95);
        M.inherits = t(88);
        var I = {
            deprecate: t(104)
        },
        P = t(93),
        O = t(94).Buffer,
        D = o.Uint8Array ||
        function() {},
        L = t(99);
        M.inherits(u, P),
        d.prototype.getBuffer = function() {
            for (var e = this.bufferedRequest,
            t = []; e;) t.push(e),
            e = e.next;
            return t
        },
        function() {
            try {
                Object.defineProperty(d.prototype, "buffer", {
                    get: I.deprecate(function() {
                        return this.getBuffer()
                    },
                    "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                })
            } catch(e) {}
        } ();
        var N;
        "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (N = Function.prototype[Symbol.hasInstance], Object.defineProperty(u, Symbol.hasInstance, {
            value: function(e) {
                return !! N.call(this, e) || this === u && (e && e._writableState instanceof d)
            }
        })) : N = function(e) {
            return e instanceof this
        },
        u.prototype.pipe = function() {
            this.emit("error", new Error("Cannot pipe, not readable"))
        },
        u.prototype.write = function(e, t, n) {
            var r = this._writableState,
            o = !1,
            i = !r.objectMode && a(e);
            return i && !O.isBuffer(e) && (e = s(e)),
            "function" == typeof t && (n = t, t = null),
            i ? t = "buffer": t || (t = r.defaultEncoding),
            "function" != typeof n && (n = c),
            r.ended ? l(this, n) : (i || p(this, r, e, n)) && (r.pendingcb++, o = h(this, r, i, e, t, n)),
            o
        },
        u.prototype.cork = function() {
            var e = this._writableState;
            e.corked++
        },
        u.prototype.uncork = function() {
            var e = this._writableState;
            e.corked && (e.corked--, e.writing || e.corked || e.finished || e.bufferProcessing || !e.bufferedRequest || b(this, e))
        },
        u.prototype.setDefaultEncoding = function(e) {
            if ("string" == typeof e && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + e);
            return this._writableState.defaultEncoding = e,
            this
        },
        Object.defineProperty(u.prototype, "writableHighWaterMark", {
            enumerable: !1,
            get: function() {
                return this._writableState.highWaterMark
            }
        }),
        u.prototype._write = function(e, t, n) {
            n(new Error("_write() is not implemented"))
        },
        u.prototype._writev = null,
        u.prototype.end = function(e, t, n) {
            var r = this._writableState;
            "function" == typeof e ? (n = e, e = null, t = null) : "function" == typeof t && (n = t, t = null),
            null !== e && void 0 !== e && this.write(e, t),
            r.corked && (r.corked = 1, this.uncork()),
            r.ending || r.finished || k(this, r, n)
        },
        Object.defineProperty(u.prototype, "destroyed", {
            get: function() {
                return void 0 !== this._writableState && this._writableState.destroyed
            },
            set: function(e) {
                this._writableState && (this._writableState.destroyed = e)
            }
        }),
        u.prototype.destroy = L.destroy,
        u.prototype._undestroy = L.undestroy,
        u.prototype._destroy = function(e, t) {
            this.end(),
            t(e)
        }
    }).call(exports, t(71), t(102).setImmediate,
    function() {
        return this
    } ())
},
function(e, exports, t) { (function(e) {
        function n(e, t) {
            this._id = e,
            this._clearFn = t
        }
        var r = "undefined" != typeof e && e || "undefined" != typeof self && self || window,
        o = Function.prototype.apply;
        exports.setTimeout = function() {
            return new n(o.call(setTimeout, r, arguments), clearTimeout)
        },
        exports.setInterval = function() {
            return new n(o.call(setInterval, r, arguments), clearInterval)
        },
        exports.clearTimeout = exports.clearInterval = function(e) {
            e && e.close()
        },
        n.prototype.unref = n.prototype.ref = function() {},
        n.prototype.close = function() {
            this._clearFn.call(r, this._id)
        },
        exports.enroll = function(e, t) {
            clearTimeout(e._idleTimeoutId),
            e._idleTimeout = t
        },
        exports.unenroll = function(e) {
            clearTimeout(e._idleTimeoutId),
            e._idleTimeout = -1
        },
        exports._unrefActive = exports.active = function(e) {
            clearTimeout(e._idleTimeoutId);
            var t = e._idleTimeout;
            t >= 0 && (e._idleTimeoutId = setTimeout(function() {
                e._onTimeout && e._onTimeout()
            },
            t))
        },
        t(103),
        exports.setImmediate = "undefined" != typeof self && self.setImmediate || "undefined" != typeof e && e.setImmediate || this && this.setImmediate,
        exports.clearImmediate = "undefined" != typeof self && self.clearImmediate || "undefined" != typeof e && e.clearImmediate || this && this.clearImmediate
    }).call(exports,
    function() {
        return this
    } ())
},
function(e, exports, t) { (function(e, t) { !
        function(e, n) {
            "use strict";
            function r(e) {
                "function" != typeof e && (e = new Function("" + e));
                for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++) t[n] = arguments[n + 1];
                var r = {
                    callback: e,
                    args: t
                };
                return m[h] = r,
                f(h),
                h++
            }
            function o(e) {
                delete m[e]
            }
            function i(e) {
                var t = e.callback,
                r = e.args;
                switch (r.length) {
                case 0:
                    t();
                    break;
                case 1:
                    t(r[0]);
                    break;
                case 2:
                    t(r[0], r[1]);
                    break;
                case 3:
                    t(r[0], r[1], r[2]);
                    break;
                default:
                    t.apply(n, r)
                }
            }
            function s(e) {
                if (g) setTimeout(s, 0, e);
                else {
                    var t = m[e];
                    if (t) {
                        g = !0;
                        try {
                            i(t)
                        } finally {
                            o(e),
                            g = !1
                        }
                    }
                }
            }
            function a() {
                f = function(e) {
                    t.nextTick(function() {
                        s(e)
                    })
                }
            }
            function c() {
                if (e.postMessage && !e.importScripts) {
                    var t = !0,
                    n = e.onmessage;
                    return e.onmessage = function() {
                        t = !1
                    },
                    e.postMessage("", "*"),
                    e.onmessage = n,
                    t
                }
            }
            function d() {
                var t = "setImmediate$" + Math.random() + "$",
                n = function(n) {
                    n.source === e && "string" == typeof n.data && 0 === n.data.indexOf(t) && s( + n.data.slice(t.length))
                };
                e.addEventListener ? e.addEventListener("message", n, !1) : e.attachEvent("onmessage", n),
                f = function(n) {
                    e.postMessage(t + n, "*")
                }
            }
            function u() {
                var e = new MessageChannel;
                e.port1.onmessage = function(e) {
                    var t = e.data;
                    s(t)
                },
                f = function(t) {
                    e.port2.postMessage(t)
                }
            }
            function l() {
                var e = _.documentElement;
                f = function(t) {
                    var n = _.createElement("script");
                    n.onreadystatechange = function() {
                        s(t),
                        n.onreadystatechange = null,
                        e.removeChild(n),
                        n = null
                    },
                    e.appendChild(n)
                }
            }
            function p() {
                f = function(e) {
                    setTimeout(s, 0, e)
                }
            }
            if (!e.setImmediate) {
                var f, h = 1,
                m = {},
                g = !1,
                _ = e.document,
                v = Object.getPrototypeOf && Object.getPrototypeOf(e);
                v = v && v.setTimeout ? v: e,
                "[object process]" === {}.toString.call(e.process) ? a() : c() ? d() : e.MessageChannel ? u() : _ && "onreadystatechange" in _.createElement("script") ? l() : p(),
                v.setImmediate = r,
                v.clearImmediate = o
            }
        } ("undefined" == typeof self ? "undefined" == typeof e ? this: e: self)
    }).call(exports,
    function() {
        return this
    } (), t(71))
},
function(e, exports) { (function(t) {
        function n(e, t) {
            function n() {
                if (!o) {
                    if (r("throwDeprecation")) throw new Error(t);
                    r("traceDeprecation") ? console.trace(t) : console.warn(t),
                    o = !0
                }
                return e.apply(this, arguments)
            }
            if (r("noDeprecation")) return e;
            var o = !1;
            return n
        }
        function r(e) {
            try {
                if (!t.localStorage) return ! 1
            } catch(e) {
                return ! 1
            }
            var n = t.localStorage[e];
            return null != n && "true" === String(n).toLowerCase()
        }
        e.exports = n
    }).call(exports,
    function() {
        return this
    } ())
},
function(e, exports, t) {
    "use strict";
    function n(e) {
        if (!e) return "utf8";
        for (var t;;) switch (e) {
        case "utf8":
        case "utf-8":
            return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return "utf16le";
        case "latin1":
        case "binary":
            return "latin1";
        case "base64":
        case "ascii":
        case "hex":
            return e;
        default:
            if (t) return;
            e = ("" + e).toLowerCase(),
            t = !0
        }
    }
    function r(e) {
        var t = n(e);
        if ("string" != typeof t && (_.isEncoding === v || !v(e))) throw new Error("Unknown encoding: " + e);
        return t || e
    }
    function o(e) {
        this.encoding = r(e);
        var t;
        switch (this.encoding) {
        case "utf16le":
            this.text = l,
            this.end = p,
            t = 4;
            break;
        case "utf8":
            this.fillLast = c,
            t = 4;
            break;
        case "base64":
            this.text = f,
            this.end = h,
            t = 3;
            break;
        default:
            return this.write = m,
            void(this.end = g)
        }
        this.lastNeed = 0,
        this.lastTotal = 0,
        this.lastChar = _.allocUnsafe(t)
    }
    function i(e) {
        return e <= 127 ? 0 : e >> 5 === 6 ? 2 : e >> 4 === 14 ? 3 : e >> 3 === 30 ? 4 : e >> 6 === 2 ? -1 : -2
    }
    function s(e, t, n) {
        var r = t.length - 1;
        if (r < n) return 0;
        var o = i(t[r]);
        return o >= 0 ? (o > 0 && (e.lastNeed = o - 1), o) : --r < n || o === -2 ? 0 : (o = i(t[r]), o >= 0 ? (o > 0 && (e.lastNeed = o - 2), o) : --r < n || o === -2 ? 0 : (o = i(t[r]), o >= 0 ? (o > 0 && (2 === o ? o = 0 : e.lastNeed = o - 3), o) : 0))
    }
    function a(e, t, n) {
        if (128 !== (192 & t[0])) return e.lastNeed = 0,
        "�";
        if (e.lastNeed > 1 && t.length > 1) {
            if (128 !== (192 & t[1])) return e.lastNeed = 1,
            "�";
            if (e.lastNeed > 2 && t.length > 2 && 128 !== (192 & t[2])) return e.lastNeed = 2,
            "�"
        }
    }
    function c(e) {
        var t = this.lastTotal - this.lastNeed,
        n = a(this, e, t);
        return void 0 !== n ? n: this.lastNeed <= e.length ? (e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (e.copy(this.lastChar, t, 0, e.length), void(this.lastNeed -= e.length))
    }
    function d(e, t) {
        var n = s(this, e, t);
        if (!this.lastNeed) return e.toString("utf8", t);
        this.lastTotal = n;
        var r = e.length - (n - this.lastNeed);
        return e.copy(this.lastChar, 0, r),
        e.toString("utf8", t, r)
    }
    function u(e) {
        var t = e && e.length ? this.write(e) : "";
        return this.lastNeed ? t + "�": t
    }
    function l(e, t) {
        if ((e.length - t) % 2 === 0) {
            var n = e.toString("utf16le", t);
            if (n) {
                var r = n.charCodeAt(n.length - 1);
                if (r >= 55296 && r <= 56319) return this.lastNeed = 2,
                this.lastTotal = 4,
                this.lastChar[0] = e[e.length - 2],
                this.lastChar[1] = e[e.length - 1],
                n.slice(0, -1)
            }
            return n
        }
        return this.lastNeed = 1,
        this.lastTotal = 2,
        this.lastChar[0] = e[e.length - 1],
        e.toString("utf16le", t, e.length - 1)
    }
    function p(e) {
        var t = e && e.length ? this.write(e) : "";
        if (this.lastNeed) {
            var n = this.lastTotal - this.lastNeed;
            return t + this.lastChar.toString("utf16le", 0, n)
        }
        return t
    }
    function f(e, t) {
        var n = (e.length - t) % 3;
        return 0 === n ? e.toString("base64", t) : (this.lastNeed = 3 - n, this.lastTotal = 3, 1 === n ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - n))
    }
    function h(e) {
        var t = e && e.length ? this.write(e) : "";
        return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t
    }
    function m(e) {
        return e.toString(this.encoding)
    }
    function g(e) {
        return e && e.length ? this.write(e) : ""
    }
    var _ = t(94).Buffer,
    v = _.isEncoding ||
    function(e) {
        switch (e = "" + e, e && e.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
            return ! 0;
        default:
            return ! 1
        }
    };
    exports.StringDecoder = o,
    o.prototype.write = function(e) {
        if (0 === e.length) return "";
        var t, n;
        if (this.lastNeed) {
            if (t = this.fillLast(e), void 0 === t) return "";
            n = this.lastNeed,
            this.lastNeed = 0
        } else n = 0;
        return n < e.length ? t ? t + this.text(e, n) : this.text(e, n) : t || ""
    },
    o.prototype.end = u,
    o.prototype.text = d,
    o.prototype.fillLast = function(e) {
        return this.lastNeed <= e.length ? (e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), void(this.lastNeed -= e.length))
    }
},
function(e, exports, t) {
    "use strict";
    function n(e, t) {
        var n = this._transformState;
        n.transforming = !1;
        var r = n.writecb;
        if (!r) return this.emit("error", new Error("write callback called multiple times"));
        n.writechunk = null,
        n.writecb = null,
        null != t && this.push(t),
        r(e);
        var o = this._readableState;
        o.reading = !1,
        (o.needReadable || o.length < o.highWaterMark) && this._read(o.highWaterMark)
    }
    function r(e) {
        return this instanceof r ? (s.call(this, e), this._transformState = {
            afterTransform: n.bind(this),
            needTransform: !1,
            transforming: !1,
            writecb: null,
            writechunk: null,
            writeencoding: null
        },
        this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), void this.on("prefinish", o)) : new r(e)
    }
    function o() {
        var e = this;
        "function" == typeof this._flush ? this._flush(function(t, n) {
            i(e, t, n)
        }) : i(this, null, null)
    }
    function i(e, t, n) {
        if (t) return e.emit("error", t);
        if (null != n && e.push(n), e._writableState.length) throw new Error("Calling transform done when ws.length != 0");
        if (e._transformState.transforming) throw new Error("Calling transform done when still transforming");
        return e.push(null)
    }
    e.exports = r;
    var s = t(100),
    a = t(95);
    a.inherits = t(88),
    a.inherits(r, s),
    r.prototype.push = function(e, t) {
        return this._transformState.needTransform = !1,
        s.prototype.push.call(this, e, t)
    },
    r.prototype._transform = function(e, t, n) {
        throw new Error("_transform() is not implemented")
    },
    r.prototype._write = function(e, t, n) {
        var r = this._transformState;
        if (r.writecb = n, r.writechunk = e, r.writeencoding = t, !r.transforming) {
            var o = this._readableState; (r.needTransform || o.needReadable || o.length < o.highWaterMark) && this._read(o.highWaterMark)
        }
    },
    r.prototype._read = function(e) {
        var t = this._transformState;
        null !== t.writechunk && t.writecb && !t.transforming ? (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform)) : t.needTransform = !0
    },
    r.prototype._destroy = function(e, t) {
        var n = this;
        s.prototype._destroy.call(this, e,
        function(e) {
            t(e),
            n.emit("close")
        })
    }
},
function(e, exports, t) {
    "use strict";
    function n(e) {
        return this instanceof n ? void r.call(this, e) : new n(e)
    }
    e.exports = n;
    var r = t(106),
    o = t(95);
    o.inherits = t(88),
    o.inherits(n, r),
    n.prototype._transform = function(e, t, n) {
        n(null, e)
    }
},
function(e, exports, t) {
    e.exports = t(101)
},
function(e, exports, t) {
    e.exports = t(100)
},
function(e, exports, t) {
    e.exports = t(89).Transform
},
function(e, exports, t) {
    e.exports = t(89).PassThrough
},
function(e, exports) {
    exports["aes-128-ecb"] = {
        cipher: "AES",
        key: 128,
        iv: 0,
        mode: "ECB",
        type: "block"
    },
    exports["aes-192-ecb"] = {
        cipher: "AES",
        key: 192,
        iv: 0,
        mode: "ECB",
        type: "block"
    },
    exports["aes-256-ecb"] = {
        cipher: "AES",
        key: 256,
        iv: 0,
        mode: "ECB",
        type: "block"
    },
    exports["aes-128-cbc"] = {
        cipher: "AES",
        key: 128,
        iv: 16,
        mode: "CBC",
        type: "block"
    },
    exports["aes-192-cbc"] = {
        cipher: "AES",
        key: 192,
        iv: 16,
        mode: "CBC",
        type: "block"
    },
    exports["aes-256-cbc"] = {
        cipher: "AES",
        key: 256,
        iv: 16,
        mode: "CBC",
        type: "block"
    },
    exports.aes128 = exports["aes-128-cbc"],
    exports.aes192 = exports["aes-192-cbc"],
    exports.aes256 = exports["aes-256-cbc"],
    exports["aes-128-cfb"] = {
        cipher: "AES",
        key: 128,
        iv: 16,
        mode: "CFB",
        type: "stream"
    },
    exports["aes-192-cfb"] = {
        cipher: "AES",
        key: 192,
        iv: 16,
        mode: "CFB",
        type: "stream"
    },
    exports["aes-256-cfb"] = {
        cipher: "AES",
        key: 256,
        iv: 16,
        mode: "CFB",
        type: "stream"
    },
    exports["aes-128-ofb"] = {
        cipher: "AES",
        key: 128,
        iv: 16,
        mode: "OFB",
        type: "stream"
    },
    exports["aes-192-ofb"] = {
        cipher: "AES",
        key: 192,
        iv: 16,
        mode: "OFB",
        type: "stream"
    },
    exports["aes-256-ofb"] = {
        cipher: "AES",
        key: 256,
        iv: 16,
        mode: "OFB",
        type: "stream"
    },
    exports["aes-128-ctr"] = {
        cipher: "AES",
        key: 128,
        iv: 16,
        mode: "CTR",
        type: "stream"
    },
    exports["aes-192-ctr"] = {
        cipher: "AES",
        key: 192,
        iv: 16,
        mode: "CTR",
        type: "stream"
    },
    exports["aes-256-ctr"] = {
        cipher: "AES",
        key: 256,
        iv: 16,
        mode: "CTR",
        type: "stream"
    }
},
function(e, exports, t) { (function(t) {
        e.exports = function(e, n, r, o) {
            r /= 8,
            o = o || 0;
            for (var i, s, a, c = 0,
            d = 0,
            u = new t(r), l = new t(o), p = 0;;) {
                if (i = e.createHash("md5"), p++>0 && i.update(s), i.update(n), s = i.digest(), a = 0, r > 0) for (;;) {
                    if (0 === r) break;
                    if (a === s.length) break;
                    u[c++] = s[a],
                    r--,
                    a++
                }
                if (o > 0 && a !== s.length) for (;;) {
                    if (0 === o) break;
                    if (a === s.length) break;
                    l[d++] = s[a],
                    o--,
                    a++
                }
                if (0 === r && 0 === o) break
            }
            for (a = 0; a < s.length; a++) s[a] = 0;
            return {
                key: u,
                iv: l
            }
        }
    }).call(exports, t(60).Buffer)
},
function(e, exports, t) { (function(n) {
        function r(e, t, s, a) {
            return this instanceof r ? (i.call(this), this._cipher = new o.AES(t), this._prev = new n(s.length), this._cache = new n(""), this._secCache = new n(""), this._decrypt = a, s.copy(this._prev), void(this._mode = e)) : new r(e, t, s)
        }
        var o = t(84),
        i = t(85),
        s = t(88);
        s(r, i),
        e.exports = r,
        r.prototype._transform = function(e, t, n) {
            n(null, this._mode.encrypt(this, e, this._decrypt))
        },
        r.prototype._flush = function(e) {
            this._cipher.scrub(),
            e()
        }
    }).call(exports, t(60).Buffer)
},
function(e, exports) {
    exports.encrypt = function(e, t) {
        return e._cipher.encryptBlock(t)
    },
    exports.decrypt = function(e, t) {
        return e._cipher.decryptBlock(t)
    }
},
function(e, exports, t) {
    var n = t(117);
    exports.encrypt = function(e, t) {
        var r = n(t, e._prev);
        return e._prev = e._cipher.encryptBlock(r),
        e._prev
    },
    exports.decrypt = function(e, t) {
        var r = e._prev;
        e._prev = t;
        var o = e._cipher.decryptBlock(t);
        return n(o, r)
    }
},
function(e, exports, t) { (function(t) {
        function n(e, n) {
            for (var r = Math.min(e.length, n.length), o = new t(r), i = -1; ++i < r;) o.writeUInt8(e[i] ^ n[i], i);
            return o
        }
        e.exports = n
    }).call(exports, t(60).Buffer)
},
function(e, exports, t) { (function(e) {
        function n(t, n, o) {
            var i = n.length,
            s = r(n, t._cache);
            return t._cache = t._cache.slice(i),
            t._prev = e.concat([t._prev, o ? n: s]),
            s
        }
        var r = t(117);
        exports.encrypt = function(t, r, o) {
            for (var i, s = new e(""); r.length;) {
                if (0 === t._cache.length && (t._cache = t._cipher.encryptBlock(t._prev), t._prev = new e("")), !(t._cache.length <= r.length)) {
                    s = e.concat([s, n(t, r, o)]);
                    break
                }
                i = t._cache.length,
                s = e.concat([s, n(t, r.slice(0, i), o)]),
                r = r.slice(i)
            }
            return s
        }
    }).call(exports, t(60).Buffer)
},
function(e, exports, t) { (function(e) {
        function n(e) {
            return e._prev = e._cipher.encryptBlock(e._prev),
            e._prev
        }
        var r = t(117);
        exports.encrypt = function(t, o) {
            for (; t._cache.length < o.length;) t._cache = e.concat([t._cache, n(t)]);
            var i = t._cache.slice(0, o.length);
            return t._cache = t._cache.slice(o.length),
            r(o, i)
        }
    }).call(exports, t(60).Buffer)
},
function(e, exports, t) { (function(e) {
        function n(e) {
            var t = e._cipher.encryptBlock(e._prev);
            return r(e._prev),
            t
        }
        function r(e) {
            for (var t, n = e.length; n--;) {
                if (t = e.readUInt8(n), 255 !== t) {
                    t++,
                    e.writeUInt8(t, n);
                    break
                }
                e.writeUInt8(0, n)
            }
        }
        var o = t(117);
        exports.encrypt = function(t, r) {
            for (; t._cache.length < r.length;) t._cache = e.concat([t._cache, n(t)]);
            var i = t._cache.slice(0, r.length);
            return t._cache = t._cache.slice(r.length),
            o(r, i)
        }
    }).call(exports, t(60).Buffer)
},
function(e, exports, t) { (function(n) {
        function r(e, t, i) {
            return this instanceof r ? (a.call(this), this._cache = new o, this._last = void 0, this._cipher = new s.AES(t), this._prev = new n(i.length), i.copy(this._prev), void(this._mode = e)) : new r(e, t, i)
        }
        function o() {
            return this instanceof o ? void(this.cache = new n("")) : new o
        }
        function i(e) {
            var t = e[15];
            if (16 !== t) return e.slice(0, 16 - t)
        }
        var s = t(84),
        a = t(85),
        c = t(88),
        d = t(112),
        u = t(114),
        l = t(113);
        c(r, a),
        r.prototype._transform = function(e, t, n) {
            this._cache.add(e);
            for (var r, o; r = this._cache.get();) o = this._mode.decrypt(this, r),
            this.push(o);
            n()
        },
        r.prototype._flush = function(e) {
            var t = this._cache.flush();
            return t ? (this.push(i(this._mode.decrypt(this, t))), void e()) : e
        },
        o.prototype.add = function(e) {
            this.cache = n.concat([this.cache, e])
        },
        o.prototype.get = function() {
            if (this.cache.length > 16) {
                var e = this.cache.slice(0, 16);
                return this.cache = this.cache.slice(16),
                e
            }
            return null
        },
        o.prototype.flush = function() {
            if (this.cache.length) return this.cache
        };
        var p = {
            ECB: t(115),
            CBC: t(116),
            CFB: t(118),
            OFB: t(119),
            CTR: t(120)
        };
        e.exports = function(e) {
            function t(e, t, o) {
                var i = d[e];
                if (!i) throw new TypeError("invalid suite type");
                if ("string" == typeof o && (o = new n(o)), "string" == typeof t && (t = new n(t)), t.length !== i.key / 8) throw new TypeError("invalid key length " + t.length);
                if (o.length !== i.iv) throw new TypeError("invalid iv length " + o.length);
                return "stream" === i.type ? new u(p[i.mode], t, o, !0) : new r(p[i.mode], t, o)
            }
            function o(n, r) {
                var o = d[n];
                if (!o) throw new TypeError("invalid suite type");
                var i = l(e, r, o.key, o.iv);
                return t(n, i.key, i.iv)
            }
            return {
                createDecipher: o,
                createDecipheriv: t
            }
        }
    }).call(exports, t(60).Buffer)
},
function(e, exports, t) {
    function n(e, t) {
        a(["screen"], e, t)
    }
    function r() {
        return config.chromeExtensionUrl
    }
    function o(e) {
        e($("#ofmeet-extension-installed").length > 0)
    }
    function i(e, t) {
        var n = window.setTimeout(function() {},
        1e3);
        window.postMessage({
            type: "ofmeetGetScreen",
            id: n,
            server: config.messageServer + ": " + config.messageServerPort,
            resource: Strophe.getResourceFromJid(connection.jid)
        },
        "*"),
        window.addEventListener("message",
        function(n) {
            n.origin == window.location.origin && ("ofmeetGotScreen" == n.data.type ? "" === n.data.sourceId ? w = !1 : a(["desktop"],
            function(t) {
                e(t)
            },
            t, null, null, null, n.data.sourceId) : "ofmeetGetScreenPending" == n.data.type && window.clearTimeout(n.data.id))
        })
    }
    function s(e, t) {
        o(function(n) {
            n ? i(e, t) : (window.open(r(), "_blank"), console.error("Error", "Install manually and reload webpage"), t({
                errorCode: v.share_screen_extended_plugin_except
            }))
        })
    }
    function a(e, t, n, r, o, i, s) {
        var a = {
            audio: !1,
            video: !1
        };
        if (e.indexOf("desktop") >= 0 && (a.video = {
            mandatory: {
                chromeMediaSource: "desktop",
                chromeMediaSourceId: s,
                maxWidth: window.screen.width,
                maxHeight: window.screen.height,
                maxFrameRate: 3
            },
            optional: []
        },
        a.video.optional.push({
            bandwidth: o ? o: 2048
        })), a.audio && a.audio.optional.push({
            googEchoCancellation: !0
        },
        {
            googAutoGainControl: !0
        },
        {
            googNoiseSupression: !0
        },
        {
            googHighpassFilter: !0
        },
        {
            googNoisesuppression2: !0
        },
        {
            googEchoCancellation2: !0
        },
        {
            googAutoGainControl2: !0
        }), a.video && a.video.optional.push({
            googNoiseReduction: !1
        }), a.video) {
            var c = navigator.userAgent.indexOf("Android") != -1;
            switch ((r && !a.video || c) && (a.video = {
                mandatory: {},
                optional: []
            }), r) {
            case "1080":
            case "fullhd":
                a.video.mandatory.minWidth = 1920,
                a.video.mandatory.minHeight = 1080;
                break;
            case "720":
            case "hd":
                a.video.mandatory.minWidth = 1280,
                a.video.mandatory.minHeight = 720;
                break;
            case "360":
                a.video.mandatory.minWidth = 640,
                a.video.mandatory.minHeight = 360;
                break;
            case "180":
                a.video.mandatory.minWidth = 320,
                a.video.mandatory.minHeight = 180;
                break;
            case "960":
                a.video.mandatory.minWidth = 960,
                a.video.mandatory.minHeight = 720;
                break;
            case "640":
            case "vga":
                a.video.mandatory.minWidth = 640,
                a.video.mandatory.minHeight = 480;
                break;
            case "320":
                a.video.mandatory.minWidth = 320,
                a.video.mandatory.minHeight = 240;
                break;
            default:
                c && (a.video.mandatory.minWidth = 320, a.video.mandatory.minHeight = 240, a.video.mandatory.maxFrameRate = 15)
            }
        }
        a.video && (a.video.mandatory.minWidth && (a.video.mandatory.maxWidth = a.video.mandatory.minWidth), a.video.mandatory.minHeight && (a.video.mandatory.maxHeight = a.video.mandatory.minHeight)),
        o && (a.video || (a.video = {
            mandatory: {},
            optional: []
        }), a.video.optional.push({
            bandwidth: o
        })),
        a.video || (a.video = {
            mandatory: {},
            optional: []
        }),
        a.video.mandatory.maxFrameRate = 30,
        a.video.mandatory.minFrameRate = i ? i: 20;
        var d = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
        try {
            config.enableSimulcast && a.video && "screen" !== a.video.chromeMediaSource && "desktop" !== a.video.chromeMediaSource && !c && !d ? simulcast.getUserMedia(a,
            function(e) {
                console.log("onUserMediaSuccess", a),
                t(e)
            },
            function(o) {
                console.warn("Failed to get access to local media. Error ", o),
                n && n(o, r, e, t)
            }) : h.getMedia(a,
            function(e) {
                console.log("onUserMediaSuccess", a),
                t(e)
            },
            function(e) {
                console.warn("Failed to get access to local media. Error ", e)
            })
        } catch(o) {
            console.error("GUM failed: ", o),
            n && n(o, r, e, t)
        }
    }
    function c() {
        if (null === S) if (b === s) {
            var e = navigator.userAgent.toLowerCase(),
            t = parseInt(e.match(/chrome\/(\d+)\./)[1], 10);
            console.log("Chrome version" + e, t),
            S = t >= 34
        } else S = b === n;
        return S
    }
    function d(e) {
        navigator.webkitGetUserMedia ? "ext" == e ? (b = s, console.info("Using Chrome extension for desktop sharing")) : "webrtc" == e && (b = n, console.info("Using Chrome WebRTC for desktop sharing")) : (b = null, console.info("Desktop sharing disabled")),
        S = null
    }
    function u() {
        $("link[rel=chrome-webstore-item]").attr("href", r())
    }
    function l() {
        w = !1
    }
    function p(e, t) {
        return w || !b ? void console.warn("Switch in progress or no method defined") : (w = !0, void(y || b(function(t) {
            "undefined" != typeof t.active && (t.oninactive = function() {
                window.isUsingScreenStream = !1,
                w = !1,
                window.removeScreenInprogress ? window.removeScreenInprogress = !1 : g.removeScreenSourceFromConnection(function() {
                    $(document).trigger("mains.on.screen.share.end")
                })
            }),
            e({
                code: _.code_200,
                msg: _.share_screen_success,
                response: f(t),
                errorCode: v.no_error
            })
        },
        function(e) {
            t({
                code: _.code_400,
                msg: _.share_screen_failed,
                errorCode: e.errorCode ? e.errorCode: v.share_screen_fetch_stream_failed
            })
        })))
    }
    function f(e) {
        var t = Strophe.getResourceFromJid(connection.jid),
        n = {
            info: {
                nickname: config.nickname ? config.nickname: manisConfg.mUsername,
                resource: t
            },
            stream: e,
            status: m.generateStatusNode(t)
        };
        return n
    }
    var h = t(12),
    m = t(30),
    g = t(7),
    _ = t(26),
    v = t(27),
    y = !1,
    w = !1,
    b = null,
    S = null;
    e.exports = {
        toggleScreenSharing: p,
        streamSwitchDone: l,
        initInlineInstalls: u,
        setDesktopSharing: d,
        isDesktopSharingEnabled: c
    }
}]);
window.Manis = Manis;
console.log(window.Manis)
export default Manis
