// console.log('test')
// console.log(process.env.IMG_PREFIX)
// module.exports =  {
//     // developmentEnvironment:"https://demo.chuntaoyisheng.com:10001",//测试环境
//     //  developmentEnvironment:"https://demo.chuntaoyisheng.com:10002",//开发环境
//     developmentEnvironment:"https://demo.chuntaoyisheng.com:10002",//测试环境
//     // onlineEnvironment:"https://api.chuntaoyisheng.com",//线上环境
//     wsDevelopment:'wss://demo.chuntaoyisheng.com:10002',
//     // wstestEnvironment:'',
//     imgBaseUrl:process.env.IMG_PREFIX,//图片基础路径      
// }
module.exports =  {
    // developmentEnvironment:"https://demo.chuntaoyisheng.com:10001",//测试环境
    //  developmentEnvironment:"https://demo.chuntaoyisheng.com:10002",//开发环境
    developmentEnvironment:process.env.HTTPS_PATH,
    // onlineEnvironment:"https://api.chuntaoyisheng.com",//线上环境
    wsDevelopment:process.env.WSS_PATH,
    // wstestEnvironment:'',
    imgBaseUrl:process.env.IMG_PREFIX,//图片基础路径      
}
