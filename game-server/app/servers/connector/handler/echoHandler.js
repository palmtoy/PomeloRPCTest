var utils = require('../../../util/utils');
var uuid = require('node-uuid');

var maxNum = 9970;
var curNum = 0;
var rpcLogDict = {};

module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

Handler.prototype.echo = function(msg, session, next) {
  var self = this;
  var idx = uuid.v1();
  if(curNum >= maxNum) {
    rpcLogDict[idx] = Date.now();
  }
  this.app.rpc.echo.echoRemote.echo(session, msg,
    function(err, ret) {
      ++curNum;
      if(curNum > maxNum && rpcLogDict[idx]) {
        console.error('%s : %d ~ A RPC costTime = %d(ms)', self.app.getServerId(), curNum, (Date.now() - rpcLogDict[idx]));
      }
      next(null, {c: ret});
    });
 };

