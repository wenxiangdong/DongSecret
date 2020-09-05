// 云函数入口文件
const cloud = require('wx-server-sdk');
const TcbRouter = require('tcb-router');
const ROUTES = require('./constants/routes');
const env = require('./constants/envs');

cloud.init({ env: env });

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event });
  const { OPENID, ENV } = cloud.getWXContext();

  app.use(async (ctx, next) => {
    console.log('openid', OPENID);
    console.log('env', ENV);
    console.log('event', event);
    await next();
    console.log('result', ctx.body);
  });

  app.router(ROUTES.AUTH, async (ctx, next) => {
    const { auth } = require('./services/user');
    ctx.body = await Response.handle(() => auth(OPENID));
  });

  /========  密码项相关 =========/;
  /** 更新新增 */
  app.router(ROUTES.UPSERT_SECRET, async (ctx, next) => {
    const { upsertSecret } = require('./services/secret');
    const { secret, key } = event;
    secret._openid = OPENID;
    ctx.body = await Response.handle(() => upsertSecret(secret, key));
  });
  /** 获取全部 */
  app.router(ROUTES.GET_SECRETS, async ctx => {
    const { getSecrets } = require('./services/secret');
    ctx.body = await Response.handle(() => getSecrets(OPENID));
  });
  /** 删除 */
  app.router(ROUTES.DELETE_SECRET, async ctx => {
    const { deleteSecrets } = require('./services/secret');
    const { ids } = event;
    ctx.body = await Response.handle(() => deleteSecrets(ids));
  });

  /=======  one password相关  ========/;
  app.router(ROUTES.DECODE_PASSWORD, async ctx => {
    const { decodePassword } = require('./services/password');
    const { password, key } = event;
    ctx.body = await Response.handle(() => decodePassword(password, key));
  });

  app.router(ROUTES.SET_ONE_PASSWORD, async ctx => {
    const { setOnePassword } = require('./services/password');
    const { oldKey, newKey } = event;
    ctx.body = await Response.handle(() =>
      setOnePassword(OPENID, newKey, oldKey)
    );
  });

  return app.serve();
};

class Response {
  static success(data) {
    return new Response(data, 200, 'success');
  }

  static error(code, message) {
    return new Response(null, code || 500, message);
  }

  /**
   * @description 一个能用处理 服务调用 并生成 response的方法
   * @static
   * @param {Function} fn
   * @returns {Response}
   * @memberof Response
   */
  static async handle(fn) {
    let response;
    try {
      const result = await fn();
      response = this.success(result);
    } catch (error) {
      response = this.error(error.code, error.message);
    }
    return response;
  }

  constructor(data, code, message) {
    this.data = data;
    this.code = code;
    this.message = message;
  }
}
