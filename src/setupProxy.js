// TODO require, import 차이 정리하기
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {createProxyMiddleware} = require('http-proxy-middleware');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = function (app){
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  )
}

