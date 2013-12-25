var utils = require('../../../util/utils');

var maxNum = 19900;
var curNum = 0;

module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

Handler.prototype.echo = function(msg, session, next) {
  var beginTime = Date.now();
  this.app.rpc.echo.echoRemote.echo(session, msg,
    function(err, ret) {
      ++curNum;
      if(curNum >= maxNum) {
        console.error('%d ~ A RPC costTime = %d(ms)', curNum, (Date.now() - beginTime));
      }
      next(null, {c: ret});
    });
 };

