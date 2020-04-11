
module.exports = {
  APIError: function (code, message) {
      this.code = code || 'internal:unknown_error';
      this.message = message || '';
      log.error(`[API] ${this.code}: ${this.message}`);
  },
  restify: (pathPrefix) => {
      // REST API前缀，默认为/api/:
      pathPrefix = pathPrefix || '/api/';
      return async (ctx, next) => {
          // 是否是REST API前缀?
          if (ctx.request.path.startsWith(pathPrefix)) {
              // 绑定rest()方法:
              ctx.rest = (data) => {
                  ctx.response.type = 'application/json';
                  ctx.response.body = data;
              }
              try {
                  await next();
              } catch (e) {
                  // 返回错误:
                  ctx.response.status = 400;
                  ctx.response.type = 'application/json';
                  ctx.response.body = {
                      code: e.code || 'internal:unknown_error',
                      message: e.message || ''
                  };
                  log.error(`[API] ${e.code}: ${e.message}`);
              }
          } else {
              await next();
          }
      };
  }
};
