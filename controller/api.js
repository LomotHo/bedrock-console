const APIError = require('../util/rest').APIError;

module.exports = {
  'GET /api/v1/sendcmd': async (ctx, next) => {
    // console.log(ctx.query.cmd);
    if (ctx.query.cmd) {
      BDS.writeCmd(ctx.query.cmd);
      log.info(`[API] sendcmd: ${ctx.query.cmd}`);
      ctx.rest({
        "status": "OK"
      });
    }
    else {
      throw new APIError("syntax", "cmd empty");
    }
  }
}
