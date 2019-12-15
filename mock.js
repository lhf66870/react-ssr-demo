// 此处的代码 会用babel处理
const Koa = require("koa");
const Router = require("koa-router");
const router = new Router();

const app = new Koa();
const port = process.env.PORT || 9090;

app.use(async (ctx, next) => {
  console.log(`HTTP ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

router.get("/api/course/list", async (ctx, next) => {
  // ctx.set("Access-Control-Allow-Origin", "*");
  // ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  // ctx.set("Content-Type", "application/json;charset=utf-8");
  ctx.body = {
    code: 0,
    list: [
      {
        id: 1,
        name: "网吧"
      },
      {
        id: 2,
        name: "酒吧"
      },
      {
        id: 3,
        name: "茶吧"
      }
    ]
  };
  // await next();
});

router.get("/api/user/info", async (ctx, next) => {
  // ctx.set("Access-Control-Allow-Origin", "*");
  // ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  // ctx.set("Content-Type", "application/json;charset=utf-8");
  ctx.body = {
    code: 0,
    data: {
      name: "Revision",
      base: "JAVASCRIPT之禅"
    }
  };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`${port}号服务已启动！！！`);
});
