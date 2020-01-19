// 云函数入口文件
const cloud = require('wx-server-sdk');
const TcbRouter = require('tcb-router');
const ROUTES = require('./routes');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event });

  app.use(async (ctx, next) => {
    const wxContext = cloud.getWXContext();
    console.log('app', wxContext);
    ctx.data = {
      openid: wxContext.OPENID
    };
    await next();
  });

  app.router(ROUTES.AUTH, async (ctx, next) => {
    const { auth } = require('./user');
    const {
      data: { openid }
    } = ctx;
    let response;
    try {
      const user = await auth(openid);
      response = Response.success(user);
    } catch (error) {
      response = Response.error(error.code, error.message);
    }
    ctx.body = response;
  });

  return app.serve();
};

class Response {
  static success(data) {
    return new Response(data, 200, 'success');
  }

  static error(code, message) {
    return new Response(null, code, message);
  }

  constructor(data, code, message) {
    this.data = data;
    this.code = code;
    this.message = message;
  }
}
