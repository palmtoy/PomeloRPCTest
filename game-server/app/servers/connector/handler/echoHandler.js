var utils = require('../../../util/utils');

var isFirstCall = true;
var beginTime = null;
var maxNum = 20000;
var curNum = 0;

module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

Handler.prototype.echo = function(msg, session, next) {
  if(isFirstCall) {
    beginTime = Date.now();
    isFirstCall = false;
  }
  this.app.rpc.echo.echoRemote.echo(session, msg,
    function(err, ret) {
      ++curNum;
      if(curNum >= maxNum) {
        console.error('%d : costTime = %d(s)', curNum, (Date.now() - beginTime)/1000.0);
      }
      next(null, {c: ret});
    });
 };

