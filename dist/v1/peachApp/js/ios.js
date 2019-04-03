/**
 * Created by tangyu on 2017/11/16.
 */
// method:方法名   parameter：参数
function ios(method,parameter) {
    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
    setupWebViewJavascriptBridge(function(bridge) {

        /* Initialize your app here */

        bridge.registerHandler(method, function(data, responseCallback) {
            console.log("JS Echo called with:", data);
            responseCallback(userid);
            $.alert("a");
        })
        bridge.callHandler(method,parameter, function responseCallback(responseData) {
            console.log("JS received response:", responseData)
            $.alert("b");
        })
    })
}