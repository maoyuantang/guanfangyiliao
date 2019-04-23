/**
 * 计算用户权限
 * 传入参数：用户 rooter manager hasAuth
 * 四个角色,返回数组，用字符a，b，c表示：超级管理员，用'a'表示；医院管理员，用'b'吧表示；医生，用'c'表示；既是医生又是医院管理员，用'bc'表示
 * 弃用 需求修改了 没有既是医生又是医院管理员的身份
 */
"use strict"
export default (userInfo,data) =>{
    if(userInfo.rooter)return {ok:true,root:'root'};
    return {
        
    }
    if(userInfo.hasAuth.find(item=>item.type===data)){
        return {ok:true}
    }
    
}




// export default data => {
//     let root;
//     if(data.rooter){
//         root = ['a']
//     }else if (data.manager){
//         root=data.hasAuth.find(i=>i.type==='2')?['b','c']:['b'];
//     }else{
//         root = ['c']
//     }
//     return root;
// }