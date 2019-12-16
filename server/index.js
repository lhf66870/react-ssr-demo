// 此处的代码 会用babel处理
import React from "react";
import axios from "axios";
import path from "path";
import Koa from "koa";
import Router from "koa-router";
import Static from "koa-static";
import { renderToString } from "react-dom/server";
import httpProxy from "http-proxy-middleware";
import k2c from "koa2-connect";
import bodyparser from "koa-bodyparser";
import { StaticRouter, matchPath, Route } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "../src/App";
import { getServerStore } from "../src/Store/store";
import Header from "../src/component/Header";

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 8888;
const store = getServerStore();

// koa 静态资源 使用
app.use(Static(path.join(process.cwd(), "public")));

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);

// 捕捉被 reject 但没有被添加 .catch 回调的 Promise,
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
// 捕捉到已被抛出到最顶层调用栈的异常，不退出进程（不推荐使用）
process.on("uncaughtException", err => {
  console.error(err);
});

// url拦截后拼接完整地址发送
router.get("/api/*", async (ctx, next) => {
  const baseURL = "http://localhost:9090";
  const { data } = await axios({
    method: ctx.method,
    url: `${baseURL}${ctx.url}`
  });
  ctx.body = data;
});

router.get("*", async ctx => {
  // 匹配以 /api 开头的地址通过 axios拼接地址后重新发送
  // if (ctx.url.startsWith("/api")) {
  //   const baseURL = "http://localhost:9090";
  //   const res = await axios({
  //     method: ctx.method,
  //     url: `${baseURL}${ctx.url}`
  //   });
  //   return (ctx.body = res.data);
  // }
  // 存储网络请求
  const promises = [];
  routes.some(route => {
    const match = matchPath(ctx.path, route);
    if (match) {
      const { loadData } = route.component;
      if (loadData) {
        return promises.push(loadData(store));
      }
    }
  });
  // 将传入promise.all的数组进行遍历，如果catch住reject结果，直接返回，这样就可以在最后结果中将所有结果都获取到
  await Promise.all(
    promises.map(function(promiseItem) {
      return promiseItem.catch(function(err) {
        return err;
      });
    })
  );
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={ctx.request.url}>
        <Header></Header>
        {routes.map(route => (
          <Route {...route}></Route>
        ))}
      </StaticRouter>
    </Provider>
  );
  ctx.body = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>react-ssr-demo</title>
        </head>
          <body>
            <div id="root">${content}</div>
            <script>
              window.__context = ${JSON.stringify(store.getState())}
            </script>
            <script src="/bundle.js"></script>
          </body>
      </html>
    `;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`施主，莫急，${port}号技师为您服务！！！`);
});
