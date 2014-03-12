var pomelo = require('pomelo');
var zmq = require('pomelo-rpc-zeromq');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'PomeloRPCTest');

// app configuration
app.configure('production|development', 'connector', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 30,
      useDict : true,
      useProtobuf : true
    });

  app.set('proxyConfig', {
    rpcClient: zmq.client
  });

  app.set('remoteConfig', {
    rpcServer: zmq.server
  });
});

// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});

