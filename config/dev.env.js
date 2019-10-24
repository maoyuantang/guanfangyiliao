'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
process.env.WSS_PATH = "wss://demo.chuntaoyisheng.com:10002/chat"
process.env.HTTPS_PATH = "https://demo.chuntaoyisheng.com:10002"
process.env.IMG_PREFIX = "https://demo.chuntaoyisheng.com:10002"
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  WSS_PATH: '"wss://demo.chuntaoyisheng.com:10002/chat"',
  HTTPS_PATH: '"https://demo.chuntaoyisheng.com:10002"',
  IMG_PREFIX: '"https://demo.chuntaoyisheng.com:10002"' 
  // WSS_PATH: '"wss://192.168.8.203:30021/chat"',
  // HTTPS_PATH: '"http://192.168.8.203:30021"',
  // IMG_PREFIX: '"http://192.168.8.203:30021"'
})
