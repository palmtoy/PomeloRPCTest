var utils = require('../../../util/utils');

module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

Handler.prototype.echo = function(msg, session, next) {
  this.app.rpc.echo.echoRemote.echo(session, msg,
    function(err, ret) {
      next(null, {c: ret});
    });
 };

