'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var http = _interopDefault(require('http'));

function lift() {
  let {
    port,
    host
  } = this.config;
  port = port || 1337; // eslint-disable-next-line no-multi-assign

  const server = this.server = http.createServer(this.app.callback());
  server.listen(port, host);
  server.on('error', onError);
  server.on('listening', () => {
    onListening();
    this.emit('listening');
  });

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    let bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
      case 'EACCES':
        bind += ' requires elevated privileges';
        logger.error(bind);
        process.exit(1);
        break;

      case 'EADDRINUSE':
        bind += ' is already in use';
        logger.error(bind);
        process.exit(1);
        break;

      default:
        throw error;
    }
  }

  function onListening() {
    const addr = server.address();
    let bind = '';

    if (typeof addr === 'string') {
      bind = `'pipe ${addr}`;
    } else {
      if (addr.address === '::') {
        bind += `${addr.family} `;
        addr.address = '127.0.0.1';
      }

      bind += `http://${addr.address}:${addr.port}`;
    }

    logger.debug(`Listening on: ${bind}`);
  }
}

function lower() {
  return new Promise((resolve, reject) => {
    this.server.close(err => {
      return err ? reject(err) : resolve();
    });
  });
}

var index = {
  lift,
  lower
};

module.exports = index;
//# sourceMappingURL=bundle.cjs.js.map
