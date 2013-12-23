var utils = require('../../../util/utils');

module.exports = function(){
  return new EchoRemote();
};

var EchoRemote = function(){
};

EchoRemote.prototype.echo = function(args, cb) {
  utils.invokeCallback(cb, null, 200);
};

