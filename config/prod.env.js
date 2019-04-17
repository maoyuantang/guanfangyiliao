'use strict'
process.env.WSS_PATH = "wss://demo.chuntaoyisheng.com:10001/chat"
process.env.HTTPS_PATH = "https://demo.chuntaoyisheng.com:10001"
process.env.IMG_PREFIX = "https://demo.chuntaoyisheng.com:10001"
module.exports = {
  NODE_ENV: '"production"',

  //开发
  // WSS_PATH: '"wss://demo.chuntaoyisheng.com:10002/chat"',
  // HTTPS_PATH: '"https://demo.chuntaoyisheng.com:10002"',
  // IMG_PREFIX: '"https://demo.chuntaoyisheng.com:10002"',

  //测试
  WSS_PATH: '"wss://demo.chuntaoyisheng.com:10001/chat"',
  HTTPS_PATH: '"https://demo.chuntaoyisheng.com:10001"',
  IMG_PREFIX: '"https://demo.chuntaoyisheng.com:10001"',

  //线上
  // WSS_PATH: '"wss://cms.chuntaoyisheng.com/chat"',
  // HTTPS_PATH: '"https://cms.chuntaoyisheng.com"',
  // IMG_PREFIX: '"https://cms.chuntaoyisheng.com"'


  
}
