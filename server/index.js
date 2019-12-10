// 此处的代码 会用babel处理
import React from "react"
import { renderToString } from "react-dom/server"
import path from 'path';
import Koa from "koa"
const Router = require('koa-router');
const router = new Router();

import Static from 'koa-static'

import App from "../src/App"

const app = new Koa()
const port = process.env.PORT || 8888;

// koa 静态资源 使用
app.use(Static(path.join(process.cwd(), 'public')));

app.use((ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
   next()
})

router.get("/", (ctx, next) => {
  // const Page = <App titile=""></App>
  const content = renderToString(App)
  ctx.response.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>react-ssr-demo</title>
      </head>
        <body>
          <div id="root">${content}</div>
          <script src="/bundle.js"></script>
        </body>
    </html>
  `
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(port, () => {
  console.log(`施主，莫急，${port}号技师为您服务！！！`)
})
