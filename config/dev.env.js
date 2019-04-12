'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
process.env.IMG_PREFIX = '"https://demo.chuntaoyisheng.com:10002"'
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  WSS_PATH: '"wss://demo.chuntaoyisheng.com:10002/chat"',
  HTTPS_PATH: '"https://demo.chuntaoyisheng.com:10002"',
  // IMG_PREFIX: '"https://demo.chuntaoyisheng.com:10002"'
})
